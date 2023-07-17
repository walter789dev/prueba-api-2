import express, { json } from "express";
const app = express();

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  const maxId = Math.max(...notes.map((n) => n.id));
  return maxId + 1;
};

app.use(json());

app.get("/", (req, res) => res.send(notes));

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const note = notes.find((note) => note.id === Number(id));
  note
    ? res.send(note)
    : res.status(404).json({
        error: "404",
      });
});

app.post("/", (req, res) => {
  const body = req.body;

  if (!body.content) return res.status(400).json({ error: "content missing" });

  const note = {
    id: generateId(),
    content: body.content,
    important: body.important || false,
    date: new Date(),
  };

  notes.push(note);
  res.send(note);
});

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  notes = notes.filter((note) => note.id !== Number(id));
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log("Escuchando en el puerto 3001"));
