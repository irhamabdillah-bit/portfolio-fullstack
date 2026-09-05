# Full Stack Portfolio

Website portfolio pribadi yang saya bangun menggunakan React, Node.js,
Express.js, dan MySQL.

Project ini saya buat untuk belajar sekaligus memahami bagaimana frontend,
backend, API, database, dan authentication bekerja dalam satu aplikasi.

# Tech Stack

Frontend
-> React
-> JavaScript
-> React Router
-> CSS

Backend
-> Node.js
-> Express.js
-> REST API
-> JWT Authentication
-> bcrypt

Database
-> MySQL
-> MySQL Workbench

#Features

Public Website
-> Home
-> About
-> Skills
-> Project Showcase
-> Project Detail Modal
-> Contact Form
-> Responsive Design
-> Smooth Scroll
-> Simple Scroll Animation

Admin Dashboard
-> Login Admin
-> Dashboard Statistics
-> Manage Projects
-> Manage Skills
-> View Contact Messages
-> Logout

Backend
-> REST API
-> CRUD Projects
-> CRUD Skills
-> Contact Messages
-> JWT Middleware
-> Protected API
-> Password Hashing

# Project Structure

portfolio-fullstack/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── .env
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── admin/
│       ├── components/
│       ├── pages/
│       ├── routes/
│       └── utils/
│
├── .gitignore
└── README.md

# Cara Menjalankan Project

1. Clone repository
git clone https://github.com/irhamabdillah-bit/portfolio-fullstack.git

2. Masuk ke folder project:
cd portfolio-fullstack

3. Setup Backend
Masuk ke folder backend:
cd backend
Install dependencies:
npm install
Buat file .env:
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
JWT_SECRET=your_secret_key
Jalankan backend:
npm run dev
Backend berjalan di:
http://localhost:5000

4.Setup Frontend
Buka terminal baru dan masuk ke folder frontend:
cd frontend
Install dependencies:
npm install
Jalankan frontend:
npm run dev
Frontend berjalan di:
http://localhost:5173

5.Database
Project ini menggunakan MySQL.

Apa yang saya pelajari di projek ini:

Melalui project ini saya belajar beberapa hal yang sebelumnya masih
belum saya pahami secara mendalam, terutama bagaimana frontend dan
backend saling berkomunikasi.

Beberapa hal yang saya pelajari:
-> Membuat component menggunakan React
-> Menggunakan props dan .map()
-> Menggunakan useState dan useEffect
-> Menggunakan async/await
-> Membuat REST API dengan Express.js
-> Menghubungkan Node.js dengan MySQL
-> Membuat CRUD
-> Membuat authentication dengan JWT
-> Menggunakan bcrypt untuk password hashing
-> Membuat protected route
-> Menghubungkan React dengan API
-> Mengelola data melalui database

# Security
File .env tidak disimpan di repository.
Contoh konfigurasi environment hanya digunakan sebagai referensi:
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
JWT_SECRET=your_secret_key

# Future Improvements

Beberapa hal yang masih ingin saya kembangkan:
-> Deploy frontend dan backend
-> Menggunakan custom domain
-> Upload gambar project melalui Admin Dashboard
-> Menambahkan pagination
-> Meningkatkan responsive design
-> Optimasi performance
-> Menambahkan fitur analytics pada dashboard
