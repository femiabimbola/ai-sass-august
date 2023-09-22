## The Github

https://github.com/AntonioErdeljac/next13-ai-saas

### The Layout

> Layout generally adjust the setting of the whole page

- The react-hook-form is for creating forms in React

### The Zod

### The Task

Update the openai package to v4

2:48:30 for the api secret

- Learn how to use webhook

### Using Prisma

You will do npm install prisma </br>
Then do npx prisma init

Then install @prisma/client

```
import {PrismaClient } from "@prisma/client"

declare global {
  var prisma : PrismaClient | undefined;
};

// global variable is allowing it for the globalThis

const prismadb = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;

export default prismadb;
```

- Then create your schema prisma
- Push the schema to the database using `npx prisma db push`
- Everytime you modified your schema prisma, you have to push
- Do npx prisma generate to generate abd models to node-modules
- `npx prisma studio` let you see the model in real time

### npm ERR! code ENOENT

Solve the error by creating a file on \AppData\Roaming\npm
