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
        result.value = data.rates[to].toFixed(2);
        const conversion = {
          from: from,
          to: to,
          amount: amount,
          result: data.rates[to].toFixed(2),
        };
        let conversionHistory =
          JSON.parse(localStorage.getItem("conversionHistory")) || [];
        conversionHistory.unshift(conversion);

        if (conversionHistory.length > 5) {
          conversionHistory.pop();
        }

        localStorage.setItem(
          "conversionHistory",
          JSON.stringify(conversionHistory)
        );
        displayConversionHistory(conversionHistory);
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }

  function displayConversionHistory(conversionHistory) {
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "";

    conversionHistory.forEach((conversion) => {
      const historyItem = document.createElement("div");
      historyItem.textContent = `${conversion.amount} ${conversion.from} = ${conversion.result} ${conversion.to}`;
      historyContainer.appendChild(historyItem);
    });
  }

  // Load conversion history on page load
  const conversionHistory =
    JSON.parse(localStorage.getItem("conversionHistory")) || [];
  displayConversionHistory(conversionHistory);

  // Event listeners for currency conversion
  fromCurrency.addEventListener("change", convertCurrency);
  toCurrency.addEventListener("change", convertCurrency);
  amountInput.addEventListener("input", convertCurrency);

  // Reset button
  document.getElementById("resetBtn").addEventListener("click", () => {
    fromCurrency.value = "";
    toCurrency.value = "";
    amountInput.value = "";
    result.value = "";

    localStorage.removeItem("conversionHistory");
    const historyContainer = document.getElementById("history");
    historyContainer.innerHTML = "";
  });

  // Submit form 
  const submitBtn = document.getElementById("submitBtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();     
    alert("Message sent successfully");

    // Clear input fields
    const nameInput = document.getElementById("Name");
    const emailInput = document.getElementById("Email");
    const messageInput = document.getElementById("Message");

    nameInput.value = "";
    emailInput.value = "";
    messageInput.value = "";
  });
});
