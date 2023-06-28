import express, { Express, Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
app.use(cors<Request>());
app.use(express.json());
const port = 4000;

const prisma = new PrismaClient();

export type Member = {
  name: string;
  role: string;
  image: string;
};

const codeologyMembers: Member[] = [
  {
    name: "Kerrine",
    role: "Tech Director",
    image: "kerrine.jpg",
  },
  {
    name: "Euhan",
    role: "Tech Director",
    image: "euhan.jpg",
  },
  {
    name: "Ergun",
    role: "Project Leader",
    image: "ergun.jpg",
  },
  {
    name: "Avo",
    role: "Avocado",
    image: "avo.jpg",
  },
  {
    name: "Esther",
    role: "Project Leader",
    image: "esther.jpg",
  },
  {
    name: "Andrew",
    role: "Project Leader",
    image: "andrew.jpg",
  },
];

// API Endpoints
app.get("/", (req: Request, res: Response) => {
  res.send("Hi!");
});

app.get("/members", async (req: Request, res: Response) => {
  res.send(codeologyMembers);
  // res.send(await prisma.user.findMany());
});

app.post("/members", async (req: Request, res: Response) => {
  codeologyMembers.push(req.body as Member);
  // await prisma.user.create({
  //   data: req.body as Member,
  // });
  res.send("OK");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
