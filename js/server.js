// Importowanie wymaganych modułów
const http = require('http');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');

// Konfiguracja połączenia z bazą danych MySQL
const db = mysql.createConnection({
    host: 'local_db', // Host bazy danych
    user: 'root', // Nazwa użytkownika bazy danych
    password: 'password', // Hasło użytkownika bazy danych
    database: 'online_shop' // Nazwa bazy danych
});

// Połączenie z bazą danych MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL database');
});

// Utworzenie serwera HTTP
const server = http.createServer((req, res) => {
    // Obsługa żądań GET
    if (req.method === 'GET') {
        if (req.url === '/') {
            // Wysyłanie pliku index.html
            fs.readFile(path.join(__dirname, 'public', 'start.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        } else if (req.url === '/signup.html') {
            // Wysyłanie pliku signup.html
            fs.readFile(path.join(__dirname, 'public', 'signup.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        } else if (req.url === '/login.html') {
            // Wysyłanie pliku login.html
            fs.readFile(path.join(__dirname, 'public', 'login.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        } else if (req.url === '/seller.html') {
            // Wysyłanie pliku seller.html
            fs.readFile(path.join(__dirname, 'public', 'seller.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        } else if (req.url === '/addproduct.html') {
            // Wysyłanie pliku addProduct.html
            fs.readFile(path.join(__dirname, 'public', 'addProduct.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        } else if (req.url === '/404.html') {
            // Wysyłanie pliku 404.html
            fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                if (err) {
                    res.writeHead(500);
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.end(content);
                }
            });
        } else {
            // Obsługa innych żądań GET (np. żądań zasobów statycznych)
            const filePath = path.join(__dirname, 'public', req.url);
            fs.readFile(filePath, (err, content) => {
                if (err) {
                    res.writeHead(404);
                    res.end('File not found');
                } else {
                    res.writeHead(200);
                    res.end(content);
                }
            });
        }
    }

    // Obsługa żądań POST
    else if (req.method === 'POST') {
        if (req.url === '/signup.html') {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                let formData = JSON.parse(body);

                let { name, email, password, number, tac, notification } = formData;

                // Walidacja formularza
                if (name.length < 3) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'alert': 'name must be 3 letters long' }));
                } else if (!email.length) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'alert': 'enter your email' }));
                } else if (password.length < 8) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'alert': 'password should be 8 letters long' }));
                } else if (!number.length) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'alert': 'enter your phone number' }));
                } else if (!Number(number) || number.length < 10) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'alert': 'invalid number, please enter valid one' }));
                } else if (!tac) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'alert': 'you must agree to our terms and conditions' }));
                } else {
                    // Sprawdzenie, czy email już istnieje w bazie danych
                    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
                        if (err) {
                            res.writeHead(500);
                            res.end('Internal Server Error');
                        } else if (results.length > 0) {
                            res.writeHead(400, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({ 'alert': 'email already exists' }));
                        } else {
                            // Wstawienie użytkownika do bazy danych
                            bcrypt.genSalt(10, (err, salt) => {
                                bcrypt.hash(password, salt, (err, hash) => {
                                    if (err) {
                                        res.writeHead(500);
                                        res.end('Internal Server Error');
                                    } else {
                                        db.query('INSERT INTO users (name, email, password, number) VALUES (?, ?, ?, ?)', [name, email, hash, number], (err, results) => {
                                            if (err) {
                                                res.writeHead(500);
                                                res.end('Internal Server Error');
                                            } else {
                                                res.writeHead(200, { 'Content-Type': 'application/json' });
                                                res.end(JSON.stringify({
                                                    name: name,
                                                    email: email,
                                                    seller: false // Możesz ustawić domyślną wartość dla seller, np. false
                                                }));
                                            }
                                        });
                                    }
                                });
                            });
                        }
                    });
                }
            });
        } else {
            res.writeHead(404);
            res.end('Not Found');
        }
    }

    // Obsługa innych metod HTTP
    else {
        res.writeHead(405);
        res.end('Method Not Allowed');
    }
});

// Nasłuch na określonym porcie
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
