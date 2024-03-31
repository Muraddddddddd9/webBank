<?php

    session_start();
    require_once 'connect.php';

    $full_name = $_POST['full_name'];
    $login = $_POST['login'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $password_confirm = $_POST['password_confirm'];

    // Проверка на заполения поля ФИО 
    if ($full_name == ''){
        $_SESSION['message'] = 'Поле ФИО не заполнено ';
        header('Location: ../register.php');
        exit;
    } 

    // Проверка на заполения поля ЛОГИН
    if ($login == '') {
        $_SESSION['message'] = 'Поле ЛОГИН не заполнено ';
        header('Location: ../register.php');
        exit;
    } else 

    // Проверка на заполения поля ПОЧТА
    if ($email == '') {
        $_SESSION['message'] = 'Поле ПОЧТА не заполнено ';
        header('Location: ../register.php');
        exit;
    } 
    
    // Проверка на загрузку аватарки
    if (!isset($_FILES['avatar']) || $_FILES['avatar']['error'] !== 0) {
        $_SESSION['message'] = 'Файл не выбран или произошла ошибка при загрузке файла';
        header('Location: ../register.php');
        exit;
    }
    
    // Проверка на длинну пароля
    if (strlen($password) < 8) {
        $_SESSION['message'] = 'Пароль должет быть не менее 8 символов';
        header('Location: ../register.php');
        exit;
    } 

    // Проверка наличия login в базе данных
    $login_check_query = "SELECT * FROM `users` WHERE `login`='$login'";
    $result = mysqli_query($connect, $login_check_query);
    if (mysqli_num_rows($result) > 0) {
        $_SESSION['message'] = 'Этот ЛОГИН уже используется';
        header('Location: ../register.php');
        exit;
    }

    // Проверка наличия email в базе данных
    $email_check_query = "SELECT * FROM `users` WHERE `email`='$email'";
    $result = mysqli_query($connect, $email_check_query);
    if (mysqli_num_rows($result) > 0) {
        $_SESSION['message'] = 'ПОЧТА уже используется';
        header('Location: ../register.php');
        exit;
    }
    
    // Регистрация
    if ($password === $password_confirm) {
        $path = 'uploads/' . time() . $_FILES['avatar']['name'];
        if (!move_uploaded_file($_FILES['avatar']['tmp_name'], '../' . $path)) {
            $_SESSION['message'] = 'Ошибка при загрузке сообщения';
            header('Location: ../register.php');
        }

        $password = md5($password);
        mysqli_query($connect, "INSERT INTO `users` (`id`, `full_name`, `login`, `email`, `password`, `avatar`, `usercol`) VALUES (NULL, '$full_name', '$login', '$email', '$password', '$path', '$usercol')");

        $_SESSION['message'] = 'Регистрация прошла успешно!';
        header('Location: ../index.php');
    } else {
        $_SESSION['message'] = 'Пароли не совпадают';
        header('Location: ../register.php');
    }










?>