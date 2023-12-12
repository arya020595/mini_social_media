export async function getPosts(
  accessToken: string | null,
  skip: number,
  take: number
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/posts?skip=${skip}&take=${take}`;

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function getUserPosts(
  accessToken: string | null,
  skip: number,
  take: number
) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = `${baseURL}/api/posts/user?skip=${skip}&take=${take}`;

    const headers = {
      "Content-Type": "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}

export async function authLogin(username: string, password: string) {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const url = `${baseURL}/api/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: username,
      password: password,
    }),
  });

  return await response.json();
}

export async function createUser(id: number) {
  try {
    const baseURL = import.meta.env.VITE_BASE_URL;
    const url = id ? `${baseURL}/api/posts/${id}` : `${baseURL}/api/posts`;

    const response = await fetch(url); // Use the constructed URL here

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error; // Rethrow the error for the calling code to handle
  }
}
