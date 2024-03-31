<?php
    // Подключаемся к базе данных
    session_start();
    require_once 'connect.php';

    // Проверяем, был ли отправлен запрос
    if (isset($_POST['update_value']) && $_POST['update_value'] === '0') {
        // Получаем логин пользователя из сессии
        $email = $_SESSION['user']['email'];
        // Получаем название банка из POST-запроса и защищаемся от SQL-инъекций
        $bank = mysqli_real_escape_string($connect, $_POST['bank']);

        switch ($bank) {
            case 'сбер':
                $bank = 'SBER';
                break;
            case 'тинькофф':
                $bank = 'TINKOFF';
                break;
            case 'втб':
                $bank = 'VTB';
                break;
            case 'альфа':
                $bank = 'ALPHA';
                break;
            case 'газпромбанк':
                $bank = 'GAZPROMBANK';
                break;
            case 'мкб':
                $bank = 'MCB';
                break;
            case 'совкомбанк':
                $bank = 'SOVCOMBANK';
                break;
            case 'открытие':
                $bank = 'OPENING';
                break;
            case 'россельхозбанк':
                $bank = 'ROSSELKHOZBANK';
                break;
            case 'райффайзенбанк':
                $bank = 'RAIFFEISENBANK';
                break;
            case 'росбанк':
                $bank = 'ROSBANK';
                break;
            case 'дом.рф':
                $bank = 'DOMRF';
                break;
            case 'юникредит':
                $bank = 'UNICREDIT';
                break;
            case 'почта банк':
                $bank = 'POSTBANK';
                break;
            case 'ак барс':
                $bank = 'AKBARS';
                break;
            case 'бсп банк':
                $bank = 'BSPB';
                break;
            case 'банк россия':
                $bank = 'BANKRUSSIYA';
                break;
            case 'уралсиб':
                $bank = 'URALSIB';
                break;
            case 'мтс банк':
                $bank = 'MTS';
                break;
            case 'новикомбанк':
                $bank = 'NOVIKOMBANK';
                break;
            case 'рнкб':
                $bank = 'RNKB';
                break;
            case 'золотая корона':
                $bank = 'GOLDKRONE';
                break;
            case 'промсвязьбанк':
                $bank = 'PROMSVYAZBANK';
                break;
            case 'хоум банк':
                $bank = 'HOMEBANK';
                break;
            // Добавьте дополнительные случаи по мере необходимости
        }

        // Выполняем запрос на обновление значений в базе данных с использованием подготовленного запроса
        $query_bank = mysqli_prepare($connect, "UPDATE `users` SET `$bank` = 0 WHERE `email` = ?");
        mysqli_stmt_bind_param($query_bank, 's', $email);
        $result = mysqli_stmt_execute($query_bank);
        
        if ($result) {
            // Обновляем данные сессии с актуальной информацией о пользователе
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
                echo "Значение успешно обновлено до 0 для банка $bank.";
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
