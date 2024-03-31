// Объекты с курсами
const rates = {};

// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы формы ввода, выбора валюты и поля с результатом
const input = document.querySelector('#input');
const result = document.querySelector('#result');
const selectCoursTo = document.getElementById('to');
const selectCoursFrom = document.getElementById('from');

getCurrencies();

// Функция получения валют и отображения страницы
async function getCurrencies() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    rates.EUR = result.Valute.EUR;
    rates.GBP = result.Valute.GBP;
    rates.AUD = result.Valute.AUD;
    rates.AZN = result.Valute.AZN;
    rates.AMD = result.Valute.AMD;
    rates.BYN = result.Valute.BYN;
    rates.BGN = result.Valute.BGN;
    rates.BRL = result.Valute.BRL;
    rates.HUF = result.Valute.HUF;
    rates.VND = result.Valute.VND;
    rates.HKD = result.Valute.HKD;
    rates.GEL = result.Valute.GEL;
    rates.DKK = result.Valute.DKK;
    rates.AED = result.Valute.AED;
    rates.EGP = result.Valute.EGP;
    rates.INR = result.Valute.INR;
    rates.IDR = result.Valute.IDR;
    rates.KZT = result.Valute.KZT;
    rates.CAD = result.Valute.CAD;
    rates.QAR = result.Valute.QAR;
    rates.KGS = result.Valute.KGS;
    rates.CNY = result.Valute.CNY;
    rates.MDL = result.Valute.MDL;
    rates.NZD = result.Valute.NZD;
    rates.NOK = result.Valute.NOK;
    rates.PLN = result.Valute.PLN;
    rates.RON = result.Valute.RON;
    rates.XDR = result.Valute.XDR;
    rates.SGD = result.Valute.SGD;
    rates.TJS = result.Valute.TJS;
    rates.THB = result.Valute.THB;
    rates.TRY = result.Valute.TRY;
    rates.TMT = result.Valute.TMT;
    rates.UZS = result.Valute.UZS;
    rates.UAH = result.Valute.UAH;
    rates.CZK = result.Valute.CZK;
    rates.SEK = result.Valute.SEK;
    rates.CHF = result.Valute.CHF;
    rates.RSD = result.Valute.RSD;
    rates.ZAR = result.Valute.ZAR;
    rates.KRW = result.Valute.KRW;
    rates.JPY = result.Valute.JPY;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
}

// Изменение в тексте
selectCoursTo.onchange = convertValue_input;
selectCoursFrom.onchange = convertValue_input;

input.oninput = convertValue_input;
result.oninput = convertValue_result;

function convertValue_input() {
    if (selectCoursFrom.value === selectCoursTo.value) {
        return
    }

    if (selectCoursFrom.value == 'RUB' && selectCoursTo.value !== 'RUB') {
        result.value = ((parseFloat(input.value) * rates[selectCoursTo.value].Nominal) / rates[selectCoursTo.value].Value).toFixed(2);
    } else if (selectCoursFrom.value !== 'RUB' && selectCoursTo.value == 'RUB') {
        result.value = ((parseFloat(input.value) / rates[selectCoursFrom.value].Nominal) * rates[selectCoursFrom.value].Value).toFixed(2);
    } else if (selectCoursFrom.value !== 'RUB' && selectCoursTo.value !== 'RUB') {
        let scfValue = selectCoursFrom.value;
        let sctValue = selectCoursTo.value;

        let value_in_RUB = ((parseFloat(input.value) / rates[scfValue].Nominal) * rates[scfValue].Value).toFixed(2);
        result.value = ((parseFloat(value_in_RUB) / rates[sctValue].Value) * rates[sctValue].Nominal).toFixed(2);

    }
}

function convertValue_result() {
    if (selectCoursFrom.value === selectCoursTo.value) {
        return
    }

    if (selectCoursFrom.value == 'RUB' && selectCoursTo.value !== 'RUB') {
        input.value = ((parseFloat(result.value) / rates[selectCoursTo.value].Nominal) * rates[selectCoursTo.value].Value).toFixed(2);
    } else if (selectCoursFrom.value !== 'RUB' && selectCoursTo.value == 'RUB') {
        input.value = ((parseFloat(result.value) * rates[selectCoursFrom.value].Nominal) / rates[selectCoursFrom.value].Value).toFixed(2);
    } else if (selectCoursFrom.value !== 'RUB' && selectCoursTo.value !== 'RUB') {
        let scfValue = selectCoursFrom.value;
        let sctValue = selectCoursTo.value;

        let value_in_RUB = ((parseFloat(result.value) / rates[sctValue].Nominal) * rates[sctValue].Value).toFixed(2);
        input.value = ((parseFloat(value_in_RUB) / rates[scfValue].Value) * rates[scfValue].Nominal).toFixed(2);

    }
}