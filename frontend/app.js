const API = 'http://localhost:3000/api';
const list = document.getElementById('list');
const status = document.getElementById('status');

async function api(path, options) {
  const res = await fetch(API + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 ? null : res.json();
}

async function load() {
  try {
    const todos = await api('/todos');
    status.textContent = '';
    list.innerHTML = '';
    for (const t of todos) {
      const li = document.createElement('li');
      if (t.done) li.className = 'done';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = t.done;
      cb.onchange = () => api(`/todos/${t.id}`, { method: 'PATCH', body: JSON.stringify({ done: cb.checked }) }).then(load);
      const span = document.createElement('span');
      span.textContent = t.title;
      const del = document.createElement('button');
      del.textContent = 'Hapus';
      del.onclick = () => api(`/todos/${t.id}`, { method: 'DELETE' }).then(load);
      li.append(cb, span, del);
      list.append(li);
    }
  } catch (e) {
    status.textContent = 'Gagal terhubung ke backend. Pastikan server berjalan di port 3000.';
  }
}

document.getElementById('form').onsubmit = async (e) => {
  e.preventDefault();
  const input = document.getElementById('title');
  await api('/todos', { method: 'POST', body: JSON.stringify({ title: input.value }) });
  input.value = '';
  load();
};

load();
