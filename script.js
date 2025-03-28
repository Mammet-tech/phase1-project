document.addEventListener("DOMContentLoaded", () => {
  const fromCurrency = document.getElementById("Currency");
  const toCurrency = document.getElementById("Currency1");
  const amountInput = document.getElementById("Amount");
  const result = document.getElementById("Amount1");

  // Fetch available currencies
  fetch("https://api.frankfurter.app/currencies")
    .then((response) => response.json())
    .then((data) => {
      const currencies = Object.keys(data);
      currencies.forEach((currency) => {
        const option1 = document.createElement("option");
        option1.textContent = currency;
        option1.value = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.textContent = currency;
        option2.value = currency;
        toCurrency.appendChild(option2);
      });
      fromCurrency.value = "USD";
      toCurrency.value = "EUR";
    })
    .catch((error) => console.error("Error fetching currencies:", error));

  // Function to convert currency
  function convertCurrency() {
    const from = fromCurrency.value;
    const to = toCurrency.value;
    const amount = parseFloat(amountInput.value);

    if (!from || !to || isNaN(amount) || amount <= 0) {
      result.value = "";
      return;
    }

    fetch(
      `https://api.frankfurter.app/latest?from=${from}&to=${to}&amount=${amount}`
    )
      .then((response) => response.json())
      .then((data) => {
        result.value = data.rates[to].toFixed(2); // Automatically update result
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }

  // Event listeners
  fromCurrency.addEventListener("change", convertCurrency);
  toCurrency.addEventListener("change", convertCurrency);
  amountInput.addEventListener("input", convertCurrency);
});
