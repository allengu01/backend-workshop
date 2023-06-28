"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const port = 4000;
const prisma = new client_1.PrismaClient();
const codeologyMembers = [
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
app.get("/", (req, res) => {
    res.send("Hi!");
});
app.get("/members", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   res.send(codeologyMembers);
    res.send(yield prisma.user.findMany());
}));
app.post("/members", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //   codeologyMembers.push(req.body as Member);
    yield prisma.user.create({
        data: req.body,
    });
    res.send("OK");
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
