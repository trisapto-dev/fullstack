const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory data store (sample only)
let todos = [{ id: 1, title: 'Belajar Git & GitHub', done: false }];
let nextId = 2;

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const title = (req.body.title || '').trim();
  if (!title) return res.status(400).json({ error: 'title wajib diisi' });
  const todo = { id: nextId++, title, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch('/api/todos/:id', (req, res) => {
  const todo = todos.find((t) => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ error: 'tidak ditemukan' });
  if (typeof req.body.done === 'boolean') todo.done = req.body.done;
  if (typeof req.body.title === 'string') todo.title = req.body.title;
  res.json(todo);
});

app.delete('/api/todos/:id', (req, res) => {
  todos = todos.filter((t) => t.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(PORT, () => console.log(`Backend berjalan di http://localhost:${PORT}`));
