import { faker } from '@faker-js/faker';
import { Like, Post, PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.like.deleteMany({});

  await users();
  await posts();
  await likes();
}

const users = async () => {
  const amountOfUsers = 10;

  const users: User[] = [];
  const roundsOfHashing = 10;

  for (let i = 1; i <= amountOfUsers; i++) {
    const user: User = {
      id: i,
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: await bcrypt.hash('password', roundsOfHashing),
      name: faker.person.firstName(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    users.push(user);
  }

  return await prisma.user.createMany({ data: users });
};

const posts = async () => {
  const amountOfPosts = 100;

  const posts: Post[] = [];

  // Fetch all user IDs from the database
  const allUsers = await prisma.user.findMany();
  const userIds = allUsers.map((user) => user.id);

  for (let i = 1; i <= amountOfPosts; i++) {
    const post: Post = {
      id: i,
      caption: faker.lorem.sentence({ min: 3, max: 5 }),
      tag: faker.lorem.word(),
      image: faker.image.url({ width: 600, height: 600 }),
      published: true,
      authorId: faker.helpers.arrayElement(userIds),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    posts.push(post);
  }

  return await prisma.post.createMany({ data: posts });
};

const likes = async () => {
  const amountOfLikes = 100;

  const likes: Like[] = [];

  const allUsers = await prisma.user.findMany();
  const userIds = allUsers.map((user) => user.id);
  const allPosts = await prisma.post.findMany();
  const postIds = allPosts.map((post) => post.id);

  const usedPairs = new Set<string>(); // To keep track of used pairs (authorId, postId)

  for (let i = 1; i <= amountOfLikes; i++) {
    const postId = faker.helpers.arrayElement(postIds);
    const authorId = faker.helpers.arrayElement(userIds);
    const pairKey = `${authorId}-${postId}`;

    // Check if the pair is already used
    if (!usedPairs.has(pairKey)) {
      const like: Like = {
        id: i,
        postId,
        authorId,
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      };

      likes.push(like);

      // Add the pair to the used set
      usedPairs.add(pairKey);
    } else {
      // If the pair is already used, decrement the loop counter to try again
      i--;
    }
  }

  return await prisma.like.createMany({ data: likes });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
