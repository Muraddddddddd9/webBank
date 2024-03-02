const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt'); // Добавлено для хеширования паролей
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'your_host',
    user: 'your_user',
    password: 'your_pass',
    database: 'your_db'
});

connection.connect((err) => {
    if (err) {
        console.error('Ошибка подключения к базе данных:', err);
        return;
    }
    console.log('Подключение к базе данных успешно!');
});

app.post('/submit', async (req, res) => {
    const { username, email, password } = req.body;
    const action = req.query.action;
    // Хеширование пароля перед сохранением
    // const hashedPassword = await bcrypt.hash(password, 10);

    if (action === 'registration') {
        const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        const insertUserValues = [username, email, password];

        connection.query(insertUserQuery, insertUserValues, (err, results) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    // Отправка сообщения о существующем пользователе
                    res.status(400).send('Пользователь с таким email уже существует.');
                } else {
                    console.error('Ошибка при вставке данных в базу данных:', err);
                    res.status(500).send('Внутренняя ошибка сервера');
                }
                return;
            }
    
            res.send('Данные успешно получены на сервере и добавлены в базу данных.');
        });
    } else if (action === 'login') {
        // Проверка пользователя в БД при входе
        const selectUserQuery = 'SELECT * FROM users WHERE email = ?';
        const selectUserValues = [email];

        connection.query(selectUserQuery, selectUserValues, async (err, results) => {
            if (err) {
                console.error('Ошибка при запросе к базе данных:', err);
                res.status(500).send('Внутренняя ошибка сервера');
                return;
            }
            if (results.length === 0) {
                res.status(404).send('Пользователь с таким email не найден.');
            } else {
                const user = results[0];
                if (user.password === password) {
                    res.status(200).send('Успешный вход');
                } else {
                    res.status(401).send('Неверный пароль');
                }
            }
        });
    } else {
        res.status(400).send('Недопустимое действие');
    }

    
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
