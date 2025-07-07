const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");


for(let select of dropdowns){
    for(currCode in countryList){
        let newOption = document.createElement("option"); //Creating a dropdown of all the countries
        newOption.value = currCode;
        newOption.innerText = `${currCode} - ${countryList[currCode]}`;
        if(select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        else if(select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);
    }
    
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1) {
       amtVal = 1;
       amount.value = "1"; 
    }

    const URL = `BASE_URL`
})

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();

    let amount = document.querySelector(".amount input").value;
    let fromCurrency = dropdowns[0].value.toLowerCase();
    let toCurrency = dropdowns[1].value.toLowerCase();

    try {
        const res = await fetch("https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json");
        const data = await res.json();
        const rates = data["eur"];

        console.log("From:", fromCurrency, "To:", toCurrency);
        console.log("Rates:", rates);

        const fromRate = rates[fromCurrency];
        const toRate = rates[toCurrency];

        if (!fromRate || !toRate) {
            document.querySelector(".final-msg").innerText = "Currency not supported.";
            return;
        }

        const convertedAmount = (amount * (toRate / fromRate)).toFixed(2);
        document.querySelector(".final-msg").innerText =
            `${amount} ${fromCurrency.toUpperCase()} = ${convertedAmount} ${toCurrency.toUpperCase()}`;
    } catch (err) {
        document.querySelector(".final-msg").innerText = "Conversion failed.";
        console.error(err);
    }
});


const swapIcon = document.querySelector(".swap-icon");

swapIcon.addEventListener("click", () => {
    let temp = dropdowns[0].value;
    dropdowns[0].value = dropdowns[1].value;
    dropdowns[1].value = temp;

    updateFlag(dropdowns[0]);
    updateFlag(dropdowns[1]);

    btn.click();
});