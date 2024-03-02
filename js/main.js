document.addEventListener('DOMContentLoaded', function() {
    // Получение данных пользователя из localStorage
    const userDataJSON = localStorage.getItem('userData');
    if (userDataJSON) {
        const userData = JSON.parse(userDataJSON);
        // Используйте данные пользователя по вашему усмотрению
        console.log('Данные пользователя:', userData);
    }
});

// Добавление к Сумме число  
function addExpense(button) {
    var row = button.parentNode.parentNode;
    var amountInput = row.querySelector('.amountInput');
    var bankAmount = row.querySelector('.bankAmount');
    var amount = parseFloat(amountInput.value) || 0;

    // Если не было введено значение, не обновляем
    if (amount === 0) {
        return;
    }

    // Обновление суммы в таблице
    bankAmount.textContent = parseFloat(bankAmount.textContent) + amount;
    amountInput.value = "";

    // Обновление чисел под нулями
    updateTotals();
    updateChart();
}

// Удаление к Сумме число  
function subtractExpense(button) {
    var row = button.parentNode.parentNode;
    var amountInput = row.querySelector('.amountInput');
    var bankAmount = row.querySelector('.bankAmount');
    var amount = parseFloat(amountInput.value) || 0;

    // Если не было введено значение, не обновляем
    if (amount === 0) {
        return;
    }

    bankAmount.textContent = parseFloat(bankAmount.textContent) - amount;
    amountInput.value = "";

    // Обновление чисел под нулями
    updateTotals();
    updateChart()
}

// Обновление занчений TotalAllTime TotaYear TotalMonth
function updateTotals() {
    // Получение элементов блока с нулями
    var totalAllTime = document.getElementById('totalAllTime');
    var totalYear = document.getElementById('totalYear');
    var totalMonth = document.getElementById('totalMonth');

    // Получение значений из столбца "Сумма"
    var amounts = document.querySelectorAll('.bankAmount');
    var sumAllTime = 0;
    var sumYear = 0;
    var sumMonth = 0;

    amounts.forEach(function(amount) {
        sumAllTime += parseFloat(amount.textContent) || 0;
        sumYear += parseFloat(amount.textContent) || 0;
        sumMonth += parseFloat(amount.textContent) || 0;
    });

    // Обновление значений
    totalAllTime.querySelector('span').textContent = sumAllTime;
    totalYear.querySelector('span').textContent = sumYear;
    totalMonth.querySelector('span').textContent = sumMonth;
    updateChart()
}

// Обновление значение TotalAllTime TotaYear TotalMonth до 0
function clearTotals() {
    // Получение элементов блока с нулями
    var totalAllTime = document.getElementById('totalAllTime');
    var totalYear = document.getElementById('totalYear');
    var totalMonth = document.getElementById('totalMonth');

    // Обновление значений
    totalAllTime.querySelector('span').textContent = '0';
    totalYear.querySelector('span').textContent = '0';
    totalMonth.querySelector('span').textContent = '0';
    updateTotals(); // Добавим вызов функции updateTotals() для обновления значений Totals
    updateChart(); // Добавим вызов функции updateChart() для обновления диаграммы
}

// Добавление пустой
// function addEmptyRow() {
//     var table = document.getElementById('expenseTable');
//     var newRow = table.insertRow(table.rows.length);
//     addRow()
// }

// Добавление пустой строчки 
function addRow() {
    var table = document.getElementById('expenseTable');
    var newRow = table.insertRow(table.rows.length);
    newRow.classList.add('new-row');

    var cell1 = newRow.insertCell(0);
    var bankInput = document.createElement('input');
    bankInput.type = 'text';
    bankInput.classList.add('bankInput');
    bankInput.placeholder = 'Банк';
    cell1.appendChild(bankInput);

    var cell2 = newRow.insertCell(1);
    cell2.textContent = "0";
    cell2.classList.add('bankAmount');

    var cell3 = newRow.insertCell(2);
    cell3.classList.add('button-container');

    var addButton = document.createElement('button');
    addButton.textContent = '+';
    addButton.classList.add('button');
    addButton.onclick = function() { addExpense(addButton); };
    cell3.appendChild(addButton);

    var amountInput = document.createElement('input');
    amountInput.type = 'number';
    amountInput.classList.add('amountInput');
    amountInput.placeholder = 'Сумма';
    cell3.appendChild(amountInput);

    var subtractButton = document.createElement('button');
    subtractButton.textContent = '-';
    subtractButton.classList.add('button');
    subtractButton.onclick = function() { subtractExpense(subtractButton); };
    cell3.appendChild(subtractButton);

    var deleteButton = document.createElement('button');
    deleteButton.textContent = '🗑';
    deleteButton.classList.add('button');
    deleteButton.onclick = function() { deleteRow(deleteButton); };
    cell3.appendChild(deleteButton);

    setTimeout(function() {
        newRow.style.opacity = 1;
        newRow.style.transform = 'translateY(0)';
    }, 10);
    // updateChart()
}

// Удаление строчки 
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    
    // Запускаем анимацию перед удалением строки
    row.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    setTimeout(function() {
        row.parentNode.removeChild(row);
        updateTotals();
        updateChart();
    }, 300); // Время анимации (в миллисекундах), меньше значения в keyframes
}

// Удаление всех строчек 
function deleteAllRows() {
    var table = document.getElementById('expenseTable');
    var rowCount = table.rows.length;

    // Применяем анимацию к каждой ячейке перед удалением каждой строки
    for (var i = 1; i < rowCount; i++) {
        var row = table.rows[i];

        // Применяем анимацию для каждой ячейки в строке
        for (var j = 0; j < row.cells.length; j++) {
            var cell = row.cells[j];
            cell.style.animation = 'fadeOut 0.3s ease-out forwards';
        }

        // Запускаем анимацию перед удалением строки
        setTimeout(function(currentRow) {
            return function() {
                currentRow.parentNode.removeChild(currentRow);
                updateTotals();
                updateChart();
            };
        }(row), 300); // Время анимации (в миллисекундах), меньше значения в keyframes
    }
    addRow();
}

// Поиск банка
function searchBanks() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("expenseTable");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) { // Начинаем с 1, чтобы пропустить заголовок
        td = tr[i].getElementsByTagName("td")[0]; // Ищем по первой ячейке (банку)
        if (td) {
            txtValue = td.querySelector('.bankInput').value.toUpperCase();
            if (txtValue.indexOf(filter) > -1) {
                tr[i].style.display = ""; // Показываем строку
            } else {
                tr[i].style.display = "none"; // Скрываем строку
            }
        }
    }
    // updateChart()
}

// Обновление диаграммы
function updateChart(containerId, chartType) {
    var data = [];
    var sumByBank = {};

    // Получение данных из таблицы
    var rows = document.querySelectorAll('#expenseTable tr:not(:first-child)');
    rows.forEach(function(row) {
        var bankInput = row.querySelector('.bankInput');
        var bank = bankInput.value.trim().toLowerCase();
        var amount = parseFloat(row.querySelector('.bankAmount').textContent) || 0;

        if (bank !== '' && amount !== 0) {
            sumByBank[bank] = (sumByBank[bank] || 0) + amount;
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
        type: `${chartType}`,
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
        options: {

        }
    });
} 

// Цвета у диааммы Pie
function getBackgroundColor(chartType) {
    switch (chartType) {
        case 'pie':
            return ['#DC143C', '#2F4F4F' , '#EEE8AA', '#C0C0C0', '#FF1493', '#FF4500','#00FFFF', '#FFA500', '#8B008B', '#EEE8AA', '#FFFF00', '#DDA0DD', '#DA70D6', '#FFF8DC', '#0000FF','#FFD700', '#00FFFF', '#808080', '#ADFF2F','#7FFF00', '#808000', '#7B68EE'];
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
    var modal = document.getElementById('modal');
    var modalTitle = document.getElementById('modal-title');

    modalTitle.textContent = title;
    
    modalOverlay.style.display = 'flex';
}

// Скрытие диаграммное окно 
function hideModal() {
    var modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.style.display = 'none';
}

const ctx = document.getElementById('myChart');
var chart;

function showMainTab() {
    document.getElementById('mainTab').style.display = 'block';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'none';
    document.getElementById('course').style.display = 'none';
}
    
function showChartTab() {
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('chartTab').style.display = 'block';
    document.getElementById('aboutTab').style.display = 'none';
    document.getElementById('course').style.display = 'none';
    updateChart();
}
    
function showAboutUsTab(){
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'block';
    document.getElementById('course').style.display = 'none';
}

function showCourseTab(){
    document.getElementById('mainTab').style.display = 'none';
    document.getElementById('chartTab').style.display = 'none';
    document.getElementById('aboutTab').style.display = 'none';
    document.getElementById('course').style.display = 'block';
}