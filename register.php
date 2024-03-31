<?php
    session_start();

    if (isset($_SESSION['user'])) { // Проверяем существование ключа 'user' в $_SESSION
        header('Location: profile.php');
        exit(); // Прекращаем выполнение скрипта, так как пользователь уже авторизован
    }

?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Авторизация и регистрация</title>
    <link rel="stylesheet" href="signAndReg.css">
</head>
<body>

    <!-- Форма регистрации -->
    <div class="container">
        <form id="form" action="vendor/signup.php" method="post" enctype="multipart/form-data">
            <input type="hidden" name="action" id="action" value="registration">            
            <h1>Регистрация</h1>
            <div class="input-control">
                <label>ФИО</label>
                <input type="text" name="full_name" placeholder="Введите свое полное имя">
            </div>
            
            <div class="input-control">
                <label>Логин</label>
                <input type="text" name="login" placeholder="Введите свой логин">
            </div>

            <div class="input-control">
                <label>Почта</label>
                <input type="email" name="email" placeholder="Введите адрес своей почты">
            </div>
            
            <div class="input-control">
                <label>Изображение профиля</label>
                <input type="file" name="avatar">
            </div>
            
            <div class="input-control">
                <label>Пароль</label>
                <input type="password" name="password" placeholder="Введите пароль">
            </div>
            
            <div class="input-control">
                <label>Подтверждение пароля</label>
                <input type="password" name="password_confirm" placeholder="Подтвердите пароль">
            </div>
            
            <button type="submit">Зарегистрироваться</button>
            <div class="LogInReg">
                Уже есть аккаунт? <a href="index.php">Вход</a>
            </div>

            <div class="RegInLog">
                <?php
                    if (isset($_SESSION['message'])) {
                        echo '<p class="msg"> ' . $_SESSION['message'] . ' </p>';
                        unset($_SESSION['message']);
                    }
                ?>
            </div>
            
        </form>
    </div>
</body>
</html>