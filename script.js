let baseUrl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies`;
let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("#msgbox button");
let msgBox = document.querySelector("#msgbox p");
let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
let amount = document.querySelector("#container input");





let optionUpdate = () => {
  for (select of dropdowns) {
    for (currCode in countryList) {
      let option = document.createElement("option");
      option.value = currCode;
      option.innerText = currCode;
      if (select.name == "from" && currCode == "USD") {
        option.selected = "selected";
      } else if (select.name == "to" && currCode == "PKR") {
        option.selected = "selected";
      }
      select.append(option);
    }

    select.addEventListener("change", (evt) => {
      flagUpdate(evt.target);
    });
  }
};

let flagUpdate = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

optionUpdate();

let exchangeRate = async () => {
    
    if (amount.value <= 0 || amount.value == " "){
      amount.value = 1 ;
    }
    let amountval = amount.value;
    
    let URL = `${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();

    let rate = data[toCurr.value.toLowerCase()];
    let finalAmount = amountval * rate;
    let noDecAmount =  Math.floor(finalAmount)
    
    msgBox.innerText = `${amountval.toLocaleString()} ${fromCurr.value} = ${noDecAmount.toLocaleString()} ${toCurr.value}`
};

btn.addEventListener("click", () => {
    exchangeRate();
  });




window.addEventListener("load" , ()=>{
    exchangeRate();
})