const apiKey = '3da22de97cc66db9484668b5'; // Cheia ta API de la ExchangeRate-API
const convertButton = document.getElementById('convert');
const swapButton = document.getElementById('swap');
const resetButton = document.getElementById('reset');
const fromCurrencySelector = document.getElementById('from_currency');
const toCurrencySelector = document.getElementById('to_currency');
const resultText = document.getElementById('result');
const amountInput = document.getElementById("amount");

const currencies = ["USD", "EUR", "RON", "JPY", "GBP", "AUD", "CAD", "CHF", "CNY"];

function populateCurrencyDropdowns() {
    currencies.forEach(currency => {
        let option1 = document.createElement("option");
        option1.value = currency;
        option1.text = currency;
        fromCurrencySelector.appendChild(option1);

        let option2 = document.createElement("option");
        option2.value = currency;
        option2.text = currency;
        toCurrencySelector.appendChild(option2);
    });
}

async function getExchangeRate(fromCurrency, toCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.result === "success") {
            return data.conversion_rates[toCurrency]; 
        } else {
            throw new Error("Nu s-a putut obține rata de schimb.");
        }
    } catch (error) {
        console.error("Eroare la obținerea ratei de schimb:", error);
        alert("A apărut o eroare la obținerea ratei de schimb. Te rog să încerci din nou.");
    }
}

convertButton.addEventListener('click', async function () {
    const amount = amountInput.value; 
    const fromCurrency = fromCurrencySelector.value;
    const toCurrency = toCurrencySelector.value;

    if (amount === "" || isNaN(amount) || amount <= 0) {
        alert("Te rog să introduci o sumă validă mai mare decât 0.");
        return;
    }

    if (fromCurrency === "" || toCurrency === "") {
        alert("Te rog să selectezi atât valuta din care faci conversia cât și valuta în care dorești să convertești.");
        return;
    }

    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);

    if (exchangeRate) {
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        resultText.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    }
});

swapButton.addEventListener('click', function () {
    const fromCurrency = fromCurrencySelector.value;
    const toCurrency = toCurrencySelector.value;

    fromCurrencySelector.value = toCurrency;
    toCurrencySelector.value = fromCurrency;

    resultText.innerText = ''; 
});

resetButton.addEventListener('click', function () {
    amountInput.value = '';
    fromCurrencySelector.selectedIndex = 0; 
    toCurrencySelector.selectedIndex = 0;
    resultText.innerText = ''; 
});

populateCurrencyDropdowns();
