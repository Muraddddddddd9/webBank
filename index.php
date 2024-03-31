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

<!-- Форма авторизации -->
    <div class="container">
        <form id="form" action="vendor/signin.php" method="post">
            <input type="hidden" name="action" id="action" value="login"> 
            <h1>Вход</h1>

            <div class="input-control">
                <label for="username">Логин</label>
                <input id="username" type="text" name="login" placeholder="Введите свой логин">
            </div>

            <div class="input-control">
                <label>Пароль</label>
                <input id="password" type="password" name="password" placeholder="Введите пароль">
            </div>

            <button type="submit">Войти</button>
            <div class="RegInLog">
                Ещё нет аккаунта? <a href="register.php"> Регистрация</a>
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