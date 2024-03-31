// Функции для файла nav.html
// Переход по страницам
function showProfileTab(){
    document.getElementById('profile').style.display = 'block';
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('course').style.display = 'none';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'none';
    closeSidebar();
}

function showMainTab() {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('mainTab').style.display = 'block';
    document.getElementById('course').style.display = 'none';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'none';
    closeSidebar();
}
    
function showChartTab(title, containerId) {
    document.getElementById('profile').style.display = 'none';
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('course').style.display = 'none';
    document.getElementById('chartTab').style.display = 'block';
    document.getElementById('aboutTab').style.display = 'none';
    showModal(title, containerId)
    closeSidebar();
    // updateChart();
}

function showCourseTab(){
    document.getElementById('profile').style.display = 'none';
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('course').style.display = 'block';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'none';
    closeSidebar();
}

function showAboutUsTab(){
    document.getElementById('profile').style.display = 'none';
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('course').style.display = 'none';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'block';
    closeSidebar();
}

// Открытие мобильной навигации
function mobileNav() {
    const sidebar = document.querySelector('.sidebar');
    const butNav = document.getElementById('button-nav');

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        butNav.innerHTML = '<span class="material-symbols-outlined" id="icon_nav_text">menu</span>';
    } else {
        sidebar.classList.add('open');
        butNav.innerHTML = '<span class="material-symbols-outlined" id="icon_nav_text">close</span>';
    }
}

// Закрытие мобильной навигации
function closeSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const butNav = document.getElementById('button-nav');
    const spanText = document.getElementById('icon_nav_text');

    if (sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        butNav.innerHTML = '<span class="material-symbols-outlined" id="icon_nav_text">menu</span>';
    }
}


// Функции для файла main-button.php
// Кнопка выхода из окна удаления
var cancelButton = document.getElementById("cancelButton");
// Добавляем обработчик события клика на кнопку "Отмена"

cancelButton.addEventListener("click", function() {
    closeModal();
});

// Функция для открытия модального окна
function openModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Обновление занчений TotalAllTime
function updateTotals() {
    // Получение элементов блока с нулями
    var totalAllTime = document.getElementById('totalAllTime');
    var amounts = document.querySelectorAll('.bankAmount');
    var sumAllTime = 0;

    amounts.forEach(function(amount) {
        sumAllTime += parseFloat(amount.textContent) || 0;
    });

    // Обновление значений
    totalAllTime.querySelector('.ZeroTotalAllTime').textContent = sumAllTime;
    updateChart();
}

// Поиск банка
function searchBanks() {
    // Получаем значение введенное пользователем
    var searchText = document.getElementById("searchInput").value.toUpperCase();

    // Получаем таблицу и её строки
    var table = document.querySelector('.content-table');
    var rows = table.getElementsByTagName('tr');

    // Проходимся по строкам таблицы и скрываем те, которые не соответствуют поисковому запросу
    for (var i = 0; i < rows.length; i++) {
        var bankNameCell = rows[i].getElementsByTagName('td')[0]; // ячейка с названием банка
        if (bankNameCell) {
            var bankName = bankNameCell.textContent || bankNameCell.innerText;
            if (bankName.toUpperCase().indexOf(searchText) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Функция для файла layout_bank.php
// Кнопка удаления строчки
function deleteRow(button) {
    var row = $(button).closest('tr'); // Находим ближайшую строку (tr)
    var bankNameElement = row.find('td:nth-child(1) p');
    if (!bankNameElement.length) {
        console.error("Bank name element not found.");
        return;
    }

    var bankName = bankNameElement.text().trim().toLowerCase(); // Получаем название банка из первой ячейки строки
    if (!bankName) {
        console.error("Bank name not found.");
        return;
    }

    // Отправляем запрос на сервер для удаления строки
    var xhr = new XMLHttpRequest();
    xhr.open('POST', './vendor/delete_value.php', true); // Укажите правильный путь к вашему серверному обработчику
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                row.remove();
                location.reload();
            } else {
                console.error("Request failed: " + xhr.statusText);
            }
        }
    };
    xhr.send('update_value=0&bank=' + encodeURIComponent(bankName)); // Отправляем данные на сервер, указывая название банка и значение для обновления
    updateTotals();
}

// Кнопка удаления всех строчек
function deleteAllRows() {
    var tableContainers = document.querySelectorAll('.table-container'); 
    
    // Проходимся по всем контейнерам таблиц
    tableContainers.forEach(function(tableContainer) {
        var contentTable = tableContainer.querySelector('.content-table'); 
        var tbody = contentTable.querySelectorAll('tbody'); 
        
        // Проходимся по всем tbody и удаляем их
        tbody.forEach(function(tbody) {
            var rows = tbody.querySelectorAll('tr'); // Получаем все строки таблицы

            // Проходимся по всем строкам и удаляем их
            rows.forEach(function(row) {
                row.remove(); // Удаляем найденную строку
    
                // Отправляем запрос на сервер для обновления значения в базе данных
                var xhr = new XMLHttpRequest();
                xhr.open('POST', './vendor/delete_all_value.php', true); // Укажите правильный путь к вашему серверному обработчику
                xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                xhr.onreadystatechange = function() {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            console.log(xhr.responseText);
                            // После успешного обновления, перезагрузить страницу
                            location.reload();
                        } else {
                            console.error("Request failed: " + xhr.statusText);
                        }
                    }
                };
                xhr.send('update_value=0'); // Отправляем данные на сервер, указывая, что значение должно быть обновлено до 0
                closeModal();
            });
        updateTotals();
        });
    });
}

// Открытие макеты банка
function modalCreateBank() {
    var modal = document.getElementById('layout-modal');
    modal.style.display = 'block';
    document.addEventListener('click', closeModalCreateBank);
}

// Закрытие окна макеты банка
function closeModalCreateBank(event) {
    var modal = document.getElementById('layout-modal');
    if (event.target == modal) {
        modal.style.display = 'none';
        document.removeEventListener('click', closeModalCreateBank);
    }
}

// Функция добавления суммы в строчку 
function addExpense(button) {
    var bank = button.closest('.bank').querySelector('.select-bank').value;
    var amount = button.closest('.bank').querySelector('.amountInput').value;
    
    if (bank.trim() == 'BANK') {
        return alert("Выберите банк");
    }

    if (amount.trim() !== '') {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./vendor/add_amount.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    // После успешного обновления, перезагрузить страницу
                    location.reload();
                } else {
                    console.error("Request failed: " + xhr.statusText);
                }
            }
        };
        // Send the request with proper data
        var data = "bank=" + encodeURIComponent(bank) + "&amount=" + encodeURIComponent(amount);
        xhr.send(data);
    } else {
        alert("Введите сумму");
    }
}

// Функция удаления суммы из строчке
function subtractExpense(button) {
    var bank = button.closest('.bank').querySelector('.select-bank').value;
    var amount = button.closest('.bank').querySelector('.amountInput').value;
    
    if (bank.trim() == 'BANK') {
        return alert("Выберите банк");
    }

    if (amount.trim() !== '') {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "./vendor/sub_amount.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    console.log(xhr.responseText);
                    // После успешного обновления, перезагрузить страницу
                    location.reload();
                } else {
                    console.error("Request failed: " + xhr.statusText);
                }
            }
        };
        // Send the request with proper data
        var data = "bank=" + encodeURIComponent(bank) + "&amount=" + encodeURIComponent(amount);
        xhr.send(data);
    } else {
        alert("Введите сумму");
    }
}


// Функция для файла chart.php
// Подключение диаграммы
const ctx = document.getElementById('myChart');
var chart;

// Обновление Bar, Pie, Line Charts
function updateChart(containerId, chartType) {
    var data = [];
    var sumByBank = {};

    // Получение данных из таблицы
    var rows = document.querySelectorAll('.content-table tbody tr');
    rows.forEach(function(row) {
        var bankName = row.querySelector('td:first-child #name_bank').textContent.trim(); // Получаем название банка
        var amount = parseFloat(row.querySelector('.bankAmount').textContent) || 0; // Получаем сумму

        if (bankName !== '' && amount !== 0) {
            sumByBank[bankName] = (sumByBank[bankName] || 0) + amount;
        }
    });

    // Преобразование данных для диаграммы
    Object.keys(sumByBank).forEach(function(bank) {
        data.push({ bank: bank, sum: sumByBank[bank] });
    });

    // Обновление диаграммы
    if (chart) {
        chart.destroy(); // Уничтожаем предыдущий объект диаграммы, если он существует
    }

    var ctx = document.getElementById(containerId).getContext('2d');

    chart = new Chart(ctx, {
        type: chartType,
        data: {
            labels: data.map(item => item.bank),
            datasets: [{
                label: 'Банки',
                data: data.map(item => item.sum),
                borderColor: '#36A2EB',
                backgroundColor: getBackgroundColor(chartType),
                borderWidth: 1
            }]
        },
        options: {}
    });
}
// Цвета у диаграммы Pie
function getBackgroundColor(chartType) {
    switch (chartType) {
        case 'pie':
            return ['#DC143C', '#2F4F4F' , '#EEE8AA', 
                    '#C0C0C0', '#FF1493', '#FF4500', 
                    '#00FFFF', '#FFA500', '#8B008B', 
                    '#EEE8AA', '#FFFF00', '#DDA0DD', 
                    '#DA70D6', '#FFF8DC', '#0000FF', 
                    '#FFD700', '#00FFFF', '#808080', 
                    '#ADFF2F','#7FFF00', '#808000', '#7B68EE'];
    }
}

// Изменение типа диаграммы
function showModal(title, containerId,) {
    var chartType;

    if (title === 'Столбчатая') {
        chartType = 'bar';
    } else if (title === 'Круговая') {
        chartType = 'pie';
    } else if (title === 'Линейная') {
        chartType = 'line';
    } else {
        console.error('Unknown chart type');
        return;
    }

    updateChart(containerId, chartType);
    
    var modalOverlay = document.getElementById('modal-overlay');
    var modalTitle = document.getElementById('modal-title');

    modalTitle.textContent = title;
    
    modalOverlay.style.display = 'flex';
}


// Функция для файла about.html
// Открытие окна OOPSE
function Ooopse(social) {
    var modal = document.getElementById('Ooopse-Modal');
    var socialElement = document.getElementById('social');
    socialElement.textContent = social;
    modal.style.display = 'block';
    document.addEventListener('click', closeModalOutside);
}

// Закрытие окна OOPSE
function closeModalOutside(event) {
    var modal = document.getElementById('Ooopse-Modal');
    if (event.target == modal) {
        modal.style.display = 'none';
        document.removeEventListener('click', closeModalOutside);
    }
}