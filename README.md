**LIVE PREVIEW**

https://mini-social-media-eta.vercel.app/

**HOW TO RUN BACKEND**
1. cd backend
2. pnpm install
3. open .env file and put DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/lvior"

   Example: DATABASE_URL="mysql://root:root@localhost:3306/lvior"
5. npx prisma migrate dev
6. npx prisma db seed
7. pnpm start dev

***Collection Postman:***

https://api.postman.com/collections/7412551-fb30cd8e-9b40-4bfe-9490-7922d5db7ee6?access_key=PMAT-01HH8397B0M2A34YK5H4ZR8N92

**HOW TO RUN FRONTEND**
1. cd frontend
2. pnpm install
3. open .env file and put VITE_BASE_URL=http://localhost:3000
4. pnpm dev
