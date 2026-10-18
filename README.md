# Sample Fullstack App

Todo app sederhana: **frontend** (HTML/CSS/JS) + **backend** (Node.js + Express).

```
backend/   -> REST API (port 3000)
frontend/  -> UI statis (port 5173)
```

## Menjalankan di PC mana pun

Prasyarat: [Git](https://git-scm.com) dan [Node.js](https://nodejs.org) (v18+).

```bash
git clone <URL-REPO-ANDA>
cd <nama-repo>
npm run setup        # install dependency backend
npm start            # backend -> http://localhost:3000
npm run frontend     # (terminal lain) frontend -> http://localhost:5173
```

## Alur kerja multi-PC

```bash
git pull                      # sebelum mulai bekerja
# ... edit kode ...
git add -A
git commit -m "pesan perubahan"
git push                      # setelah selesai
```

## API

| Method | Path | Keterangan |
|---|---|---|
| GET | /api/health | cek server |
| GET | /api/todos | daftar todo |
| POST | /api/todos | `{ "title": "..." }` |
| PATCH | /api/todos/:id | `{ "done": true }` |
| DELETE | /api/todos/:id | hapus |
