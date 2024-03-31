<?php
    // Подключаемся к базе данных
    require_once 'connect.php';

    // Получаем данные о банках и их суммах из сессии
    $banksData = array(
        "sber" => $_SESSION['user']['SBER'],
        "tinkoff" => $_SESSION['user']['TINKOFF'],
        "vtb" => $_SESSION['user']['VTB'],
        "alpha" => $_SESSION['user']['ALPHA'],
        "gazprombank" => $_SESSION['user']['GAZPROMBANK'],
        "mcb" => $_SESSION['user']['MCB'],
        "sovcombank" => $_SESSION['user']['SOVCOMBANK'],
        "opening" => $_SESSION['user']['OPENING'],
        "rosselkhozbank" => $_SESSION['user']['ROSSELKHOZBANK'],
        "raiffeisenbank" => $_SESSION['user']['RAIFFEISENBANK'],
        "rosbank" => $_SESSION['user']['ROSBANK'],
        "domrf" => $_SESSION['user']['DOMRF'],
        "unicredit" => $_SESSION['user']['UNICREDIT'],
        "postbank" => $_SESSION['user']['POSTBANK'],
        "akbars" => $_SESSION['user']['AKBARS'],
        "bspb" => $_SESSION['user']['BSPB'],
        "bankrussiya" => $_SESSION['user']['BANKRUSSIYA'],
        "uralsib" => $_SESSION['user']['URALSIB'],
        "mts" => $_SESSION['user']['MTS'],
        "novikombank" => $_SESSION['user']['NOVIKOMBANK'],
        "rnkb" => $_SESSION['user']['RNKB'],
        "goldkrone" => $_SESSION['user']['GOLDKRONE'],
        "promsvyazbank" => $_SESSION['user']['PROMSVYAZBANK'],
        "homebank" => $_SESSION['user']['HOMEBANK']
    );
?>
    
    <!-- Таблица -->
    <div class="table-container">
        <table class="content-table">
            <thead>
                <tr>
                    <th>Банк</th>
                    <th>Сумма</th>
                    <th>Кнопки</th>
                </tr>
            </thead>
            <tbody id="table-body">
                <?php
                // Добавляем строки в таблицу
                foreach ($banksData as $bank => $amount):
                    if ($amount != 0):
                ?>
                <tr>
                    <td>
                        <img src="./Image/<?= $bank ?>.png" alt="<?= $bank ?> Logo" style="width: 50px; height: auto;">
                        <p id="name_bank">
                            <?php 
                                switch ($bank) {
                                    case 'sber':
                                        echo 'СБЕР';
                                        break;
                                    case 'tinkoff':
                                        echo 'ТИНЬКОФФ';
                                        break;
                                    case 'vtb':
                                        echo 'ВТБ';
                                        break;
                                    case 'alpha':
                                        echo 'АЛЬФА';
                                        break;
                                    case 'gazprombank':
                                        echo 'ГАЗПРОМБАНК';
                                        break;
                                    case 'mcb':
                                        echo 'МКБ';
                                        break;
                                    case 'sovcombank':
                                        echo 'СОВКОМБАНК';
                                        break;
                                    case 'opening':
                                        echo 'ОТКРЫТИЕ';
                                        break;
                                    case 'rosselkhozbank':
                                        echo 'РОССЕЛЬХОЗБАНК';
                                        break;
                                    case 'raiffeisenbank':
                                        echo 'РАЙФФАЙЗЕНБАНК';
                                        break;
                                    case 'rosbank':
                                        echo 'РОСБАНК';
                                        break;
                                    case 'domrf':
                                        echo 'ДОМ.РФ';
                                        break;
                                    case 'unicredit':
                                        echo 'ЮНИКРЕДИТ';
                                        break;
                                    case 'postbank':
                                        echo 'ПОЧТА БАНК';
                                        break;
                                    case 'akbars':
                                        echo 'АК БАРС';
                                        break;
                                    case 'bspb':
                                        echo 'БСП БАНК';
                                        break;
                                    case 'bankrussiya':
                                        echo 'БАНК РОССИЯ';
                                        break;
                                    case 'uralsib':
                                        echo 'УРАЛСИБ';
                                        break;
                                    case 'mts':
                                        echo 'МТС БАНК';
                                        break;
                                    case 'novikombank':
                                        echo 'НОВИКОМБАНК';
                                        break;
                                    case 'rnkb':
                                        echo 'РНКБ';
                                        break;
                                    case 'goldkrone':
                                        echo 'ЗОЛОТАЯ КОРОНА';
                                        break;
                                    case 'promsvyazbank':
                                        echo 'ПРОМСВЯЗЬБАНК';
                                        break;
                                    case 'homebank':
                                        echo 'ХОУМ БАНК';
                                        break;
                                }
                            ?>
                        </p>
                    </td>
                    <td class="bankAmount"><?= $amount ?></td>
                    <td>
                        <button type="button" class="button" onclick="deleteRow(this)">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        <button type="button" class="button">
                            <span class="material-symbols-outlined">edit</span>
                        </button>
                    </td>
                </tr>
                <?php
                    endif;
                endforeach;
                ?>
            </tbody>
        </table>
    </div>
