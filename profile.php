<?php
    session_start();

    if (!$_SESSION['user']) {
        // Пользователь не авторизован, перенаправляем на страницу входа
        header('Location: /');
        exit; // Важно выйти из скрипта после перенаправления
    }
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Отслеживание Расходов</title>
    <link rel="icon" type="image/png" href="../Image/Icon.png">
    <link rel="stylesheet" href="web/all.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="js/main.js"></script>
</head>
<body>

    <form>
        <!-- Навигация -->
        <?php include 'web/nav/nav.html'; ?>

        <!-- Профиль -->
        <div id="profile" style="display: none;">
            <h2>Профиль</h2>
            <?php include 'web/profile/profile.html'; ?>
        </div>

        <!-- Главное меню -->
        <div class="tabs" id="mainTab" style="display: block;">
            <h2>Расходы</h2>
            <!-- Банки -->
            <div class="main-bank-container">
                <?php include 'web/main-button/main-button.php'; ?>
                <?php include 'web/layout_bank/layout_bank.php'; ?>
            </div>
        </div>

        <!-- Диаграмма -->
        <div class="tabs" id="chartTab" style="display: none;">
            <h2>Диаграмма</h2>
            <?php include 'web/chart/chart.html'; ?>
        </div>
        <!-- Курс -->
        <div id="course" style="display: none;">
            <h2>Курс валют</h2>
            <?php include 'web/course/course.html'; ?>
        </div>

        <!-- Автор -->
        <div class="tabs" id="aboutTab" style="display: none;">
            <h2>Об авторе</h2>
            <?php include 'web/about/about.html'; ?>
        </div>
    </form>
</body>
</html>