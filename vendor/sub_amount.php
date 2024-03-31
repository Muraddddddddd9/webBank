<?php
session_start();
require_once 'connect.php';

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['bank']) && isset($_POST['amount'])) {
    $email = $_SESSION['user']['email'];
    $bank = mysqli_real_escape_string($connect, $_POST['bank']);
    $amount = mysqli_real_escape_string($connect, $_POST['amount']);

    if (!is_numeric($amount)) {
        echo "Введите корректную сумму";
        exit;
    }

    // Update the SQL query to add the new amount to the current value
    $query_bank = mysqli_prepare($connect, "UPDATE `users` SET `$bank` = `$bank` - ? WHERE `email` = ?");
    mysqli_stmt_bind_param($query_bank, 'ss', $amount, $email);
    $result = mysqli_stmt_execute($query_bank);
    
    if ($result) {
        // Update session data with the latest information
        $query_user = mysqli_query($connect, "SELECT * FROM `users` WHERE `email` = '$email'");
        if ($query_user && mysqli_num_rows($query_user) > 0) {
            $user = mysqli_fetch_assoc($query_user);
            $_SESSION['user'] = [
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
                "HOMEBANK" => $user['HOMEBANK']
            ];
            
            echo "Значение успешно обновлено. Новая сумма для $bank: " . ($user[$bank] + $amount);
        } else {
            echo "Ошибка при получении данных о пользователе.";
        }
    } else {
        echo "Ошибка при обновлении значения в базе данных.";
    }
} else {
    echo "Неверный запрос.";
}
?>
