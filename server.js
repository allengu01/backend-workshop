const express = require("express");
// CORS (cross-origin resource sharing) allows requests to come from different
// origins - origin = (protocol, hostname, and port) from the URL
const cors = require("cors");

const app = express();
app.use(cors());
app.use(
  express.json({
    type: "*/*",
  })
);
const port = 4000;

// Dummy data
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

app.get("/members", (req, res) => {
  res.send(codeologyMembers);
});

app.post("/members", (req, res) => {
  console.log(req.body.name);
  codeologyMembers.push(req.body);
  res.send("OK");
});

// Start up server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
