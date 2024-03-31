<?php
    // $login = $_SESSION['user']['login'];
    // $password = $_SESSION['user']['password'];
    $sberAmount = $_SESSION['user']['SBER'];
    $tinkoffAmount = $_SESSION['user']['TINKOFF'];
    $vtbAmount = $_SESSION['user']['VTB'];
    $alphaAmount = $_SESSION['user']['ALPHA'];
    $gazprombankAmount = $_SESSION['user']['GAZPROMBANK'];
    $mcbAmount = $_SESSION['user']['MCB'];
    $sovcombankAmount = $_SESSION['user']['SOVCOMBANK'];
    $openingAmount = $_SESSION['user']['OPENING'];
    $rosselkhozbankAmount = $_SESSION['user']['ROSSELKHOZBANK'];
    $raiffeisenbankAmount = $_SESSION['user']['RAIFFEISENBANK'];
    $rosbankAmount = $_SESSION['user']['ROSBANK'];
    $domrfAmount = $_SESSION['user']['DOMRF'];
    $unicreditAmount = $_SESSION['user']['UNICREDIT'];
    $postbankAmount = $_SESSION['user']['POSTBANK'];
    $akbarsAmount = $_SESSION['user']['AKBARS'];
    $bspbAmount = $_SESSION['user']['BSPB'];
    $bankrussiyaAmount = $_SESSION['user']['BANKRUSSIYA'];
    $uralsibAmount = $_SESSION['user']['URALSIB'];
    $mtsAmount = $_SESSION['user']['MTS'];
    $novikombankAmount = $_SESSION['user']['NOVIKOMBANK'];
    $rnkbAmount = $_SESSION['user']['RNKB'];
    $goldkroneAmount = $_SESSION['user']['GOLDKRONE'];
    $promsvyazbankAmount = $_SESSION['user']['PROMSVYAZBANK'];
    $homebankAmount = $_SESSION['user']['HOMEBANK'];
?>
    <?php include 'vendor/row.php';?>

    <div id="layout-modal" class="modal-layout" style="display: none;">
        <div class="modal-layout-content">
            <table>
                <tr>
                    <td class="bank">
                        <select class="select-bank" onchange="inf_bank(this)">
                            <option value="BANK">БАНК</option>
                            <option value="SBER">СБЕР</option>
                            <option value="TINKOFF">ТИНЬКОФФ</option>
                            <option value="VTB">ВТБ</option>
                            <option value="ALPHA">АЛЬФА</option>
                            <option value="GAZPROMBANK">ГАЗПРОМБАНК</option>
                            <option value="MCB">МКБ</option>
                            <option value="SOVCOMBANK">СОВКОМБАНК</option>
                            <option value="OPENING">ОТКРЫТИЕ</option>
                            <option value="ROSSELKHOZBANK">РОССЕЛЬХОЗБАНК</option>
                            <option value="RAIFFEISENBANK">РАЙФФАЙЗЕНБАНК</option>
                            <option value="ROSBANK">РОСБАНК</option>
                            <option value="DOMRF">ДОМ.РФ</option>
                            <option value="UNICREDIT">ЮНИКРЕДИТ</option>
                            <option value="POSTBANK">ПОЧТА БАНК</option>
                            <option value="AKBARS">АК БАРС</option>
                            <option value="BSPB">БСП БАНК</option>
                            <option value="BANKRUSSIYA">БАНК РОССИЯ</option>
                            <option value="URALSIB">УРАЛСИБ</option>
                            <option value="MTS">МТС БАНК</option>
                            <option value="NOVIKOMBANK">НОВИКОМБАНК</option>
                            <option value="RNKB">РНКБ</option>
                            <option value="GOLDKRONE">ЗОЛОТАЯ КОРОНА</option>
                            <option value="PROMSVYAZBANK">ПРОМСВЯЗЬБАНК</option>
                            <option value="HOMEBANK">ХОУМ БАНК</option>
                        </select>
                        <div class="img-bank">
                            <img id="bank-image" src="" alt="Банк">
                        </div>
                        <p class="bankAmount"> </p>
                        <input class="amountInput" type="number" placeholder="Сумма">
                        <div class="button-container">
                            <button type="button" class="button" onclick="addExpense(this)">+</button>
                            <button type="button" class="button" onclick="subtractExpense(this)">-</button>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>

<script>
    // Функция с инфой о банках
    function inf_bank() {
        var selectElements = document.querySelectorAll('.select-bank');
        selectElements.forEach(function(selectElement) {
            var imgElement = selectElement.parentElement.querySelector('img');
            var amountElement = selectElement.parentElement.querySelector('.bankAmount');
            var selectedValue = selectElement.value;
            
            switch(selectedValue) {
                case "BANK":
                    imgElement.src = 'Image/Bank.png';
                    amountElement.textContent = "0";
                    break;
                case "SBER":
                    imgElement.src = 'Image/Sber.png';
                    amountElement.textContent = "<?php echo $sberAmount; ?>";
                    break;
                case "TINKOFF":
                    imgElement.src = 'Image/Tinkoff.png';
                    amountElement.textContent = "<?php echo $tinkoffAmount; ?>";
                    break;
                case "VTB":
                    imgElement.src = 'Image/VTB.png';
                    amountElement.textContent = "<?php echo $vtbAmount; ?>";
                    break;
                case "ALPHA":
                    imgElement.src = 'Image/Alpha.png';
                    amountElement.textContent = "<?php echo $alphaAmount; ?>";
                    break;
                case "GAZPROMBANK":
                    imgElement.src = 'Image/Gazprombank.png';
                    amountElement.textContent = "<?php echo $gazprombankAmount; ?>";
                    break;
                case "MCB":
                    imgElement.src = 'Image/MCB.png';
                    amountElement.textContent = "<?php echo $mcbAmount; ?>";
                    break;
                case "SOVCOMBANK":
                    imgElement.src = 'Image/Sovcombank.png';
                    amountElement.textContent = "<?php echo $sovcombankAmount; ?>";
                    break;
                case "OPENING":
                    imgElement.src = 'Image/Opening.png';
                    amountElement.textContent = "<?php echo $openingAmount; ?>";
                    break;
                case "ROSSELKHOZBANK":
                    imgElement.src = 'Image/Rosselkhozbank.png';
                    amountElement.textContent = "<?php echo $rosselkhozbankAmount; ?>";
                    break;
                case "RAIFFEISENBANK":
                    imgElement.src = 'Image/Raiffeisenbank.png';
                    amountElement.textContent = "<?php echo $raiffeisenbankAmount; ?>";
                    break;
                case "ROSBANK":
                    imgElement.src = 'Image/Rosbank.png';
                    amountElement.textContent = "<?php echo $rosbankAmount; ?>";
                    break;
                case "DOMRF":
                    imgElement.src = 'Image/Domrf.png';
                    amountElement.textContent = "<?php echo $domrfAmount; ?>";
                    break;
                case "UNICREDIT":
                    imgElement.src = 'Image/Unicredit.png';
                    amountElement.textContent = "<?php echo $unicreditAmount; ?>";
                    break;
                case "POSTBANK":
                    imgElement.src = 'Image/Postbank.png';
                    amountElement.textContent = "<?php echo $postbankAmount; ?>";
                    break;
                case "AKBARS":
                    imgElement.src = 'Image/Akbars.png';
                    amountElement.textContent = "<?php echo $akbarsAmount; ?>";
                    break;
                case "BSPB":
                    imgElement.src = 'Image/Bspb.png';
                    amountElement.textContent = "<?php echo $bspbAmount; ?>";
                    break;
                case "BANKRUSSIYA":
                    imgElement.src = 'Image/Bankrussiya.png';
                    amountElement.textContent = "<?php echo $bankrussiyaAmount; ?>";
                    break;
                case "URALSIB":
                    imgElement.src = 'Image/Uralsib.png';
                    amountElement.textContent = "<?php echo $uralsibAmount; ?>";
                    break;
                case "MTS":
                    imgElement.src = 'Image/Mts.png';
                    amountElement.textContent = "<?php echo $mtsAmount; ?>";
                    break;
                case "NOVIKOMBANK":
                    imgElement.src = 'Image/Novikombank.png';
                    amountElement.textContent = "<?php echo $novikombankAmount; ?>";
                    break;
                case "RNKB":
                    imgElement.src = 'Image/Rnkb.png';
                    amountElement.textContent = "<?php echo $rnkbAmount; ?>";
                    break;
                case "GOLDKRONE":
                    imgElement.src = 'Image/Goldkrone.png';
                    amountElement.textContent = "<?php echo $goldkroneAmount; ?>";
                    break;
                case "PROMSVYAZBANK":
                    imgElement.src = 'Image/Promsvyazbank.png';
                    amountElement.textContent = "<?php echo $promsvyazbankAmount; ?>";
                    break;
                case "HOMEBANK":
                    imgElement.src = 'Image/Homebank.png';
                    amountElement.textContent = "<?php echo $homebankAmount; ?>";
                    break;
            }
        });
    }

    window.onload = function() {
        inf_bank()
        updateTotals();
    };

</script>
