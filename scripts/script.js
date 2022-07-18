const BASE_URL = 'https://api.exchangerate.host';

let currencyIHave = document.querySelector('.currency-i-have input');
let currencyIWant = document.querySelector('.currency-i-want input');
let currencyMy = document.querySelectorAll('.currency-i-have li');
let currencyChanged = document.querySelectorAll('.currency-i-want li');
currencyIHave.value = '1';


currencyMy.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyMy.forEach(item => {
            item.classList.remove('chosen');
        })
        event.target.classList.add('chosen');
        getCurrencyCourse(true);
    });
});


currencyChanged.forEach(item => {
    item.addEventListener('click', (event) => {
        currencyChanged.forEach(item => {
            item.classList.remove('chosen');
        });
        event.target.classList.add('chosen');
        getCurrencyCourse(true);
    });
});


document.querySelectorAll('input').forEach(item => {
    item.addEventListener('keyup', (event) => {
        if (event.key == 'Enter'){
            if(event.target.classList.contains('currencyIHave') == true) {
                getCurrencyCourse(true);
            } else {
                getCurrencyCourse(false);
            }
        }
    });
}); 


function getCurrencyCourse(isCurrencyIHave = true) {
    let right = document.querySelector('.currency-i-want li.chosen').innerHTML;
    let left = document.querySelector('.currency-i-have li.chosen').innerHTML;


    if (right == left) {
        document.querySelector('.currency-i-have span').innerHTML = `1 ${left} = 1.0000 ${right}`;
        document.querySelector('.currency-i-want span').innerHTML = `1 ${right} = 1.0000 ${left}`;
        currencyIWant.value = currencyIHave.value;
    } else {
        
        fetch(BASE_URL + `/latest?base=${right}&symbols=${left}`)
        .then(response => response.json())
        .then(data => {
            let ratesEl = data.rates[left];


            document.querySelector('.currency-i-have span').innerHTML = `1 ${left} = ${(1 / ratesEl).toFixed(4)} ${right}`;
            document.querySelector('.currency-i-want span').innerHTML = `1 ${right} = ${ratesEl.toFixed(4)} ${left}`;


            if(isCurrencyIHave) {
                return currencyIWant.value = (currencyIHave.value / ratesEl).toFixed(4);
            } else {
                return currencyIHave.value = (currencyIWant.value * ratesEl).toFixed(4);
                }
        })

        .catch(error => {
            alert(`Произошла ошибка: ${error.message}`);
            });
        }
}


getCurrencyCourse(true);
