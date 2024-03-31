<?php
    session_start();
    require_once 'connect.php';

    $login = $_POST['login'];
    $password = md5($_POST['password']);

    $check_user = mysqli_query($connect, "SELECT * FROM `users` WHERE `login` = '$login' AND `password` = '$password'");
    if (mysqli_num_rows($check_user) > 0) {
        $user = mysqli_fetch_assoc($check_user);

        $_SESSION['user'] = [
            // Данные профиля
            "id" => $user['id'],
            "full_name" => $user['full_name'],
            "avatar" => $user['avatar'],
            "email" => $user['email'],
           
            "SBER" => $user['SBER'],
            "TINKOFF" => $user['TINKOFF'],
            "VTB" => $user['VTB'],
            "ALPHA" => $user['ALPHA'],
            "GAZPROMBANK" => $user['GAZPROMBANK'],
            "MCB" => $user['MCB'],
            "SOVCOMBANK" => $user['SOVCOMBANK'],
            "OPENING" => $user['OPENING'],
            "ROSSELKHOZBANK" => $user['ROSSELKHOZBANK'],
            "RAIFFEISENBANK" => $user['RAIFFEISENBANK'],
            "ROSBANK" => $user['ROSBANK'],
            "DOMRF" => $user['DOMRF'],
            "UNICREDIT" => $user['UNICREDIT'],
            "POSTBANK" => $user['POSTBANK'],
            "AKBARS" => $user['AKBARS'],
            "BSPB" => $user['BSPB'],
            "BANKRUSSIYA" => $user['BANKRUSSIYA'],
            "URALSIB" => $user['URALSIB'],
            "MTS" => $user['MTS'],
            "NOVIKOMBANK" => $user['NOVIKOMBANK'],
            "RNKB" => $user['RNKB'],
            "GOLDKRONE" => $user['GOLDKRONE'],
            "PROMSVYAZBANK" => $user['PROMSVYAZBANK'],
            "HOMEBANK" => $user['HOMEBANK'],

            // Логин и пароль
            "login" => $login,
            "password" => $password,
        ];

        header('Location: ../profile.php');
    } else {
        $_SESSION['message'] = 'Не верный логин или пароль';
        header('Location: ../index.php');
    }
?>

<pre>
    <?php
    print_r($check_user);
    print_r($user);
    ?>
</pre>
