const adviceInputField = document.getElementById("advice-input-field");
const adviceSearchButton = document.getElementById("advice-search-button");
const adviceClearButton = document.getElementById("advice-clear-button");

const adviceIDField = document.getElementById("advice-id-number");
const adviceText = document.getElementById("advice-text");
const adviceDefaultText = adviceText.innerHTML;

let searchAdviceUrl = `https://api.adviceslip.com/advice/search/`;
let idAdviceUrl = `https://api.adviceslip.com/advice/`;
let randomAdviceUrl = `https://api.adviceslip.com/advice`;

//search button click
adviceSearchButton.onclick = () => {
  let inputValue = adviceInputField.value.trim();
  //if input is a string
  if (isNaN(inputValue) && inputValue != null) {
    searchByText(inputValue);
  }
  // if input is a number
  else {
    let myInt = parseInt(inputValue, 10);
    if (myInt >= 1) {
      searchByID(myInt);
    } else {
      console.log("search is out of bounds");
      displayRandomAdvice("");
    }
  }
};

//clear button click
adviceClearButton.onclick = () => {
  adviceText.innerHTML = adviceDefaultText;
  adviceInputField.value = "";
};

function searchByText(string) {
  fetch(`${searchAdviceUrl}${string}`)
    .then((response) => {
      return response.json();
    })
    .then((searchObject) => {
      if (searchObject.hasOwnProperty("total_results")) {
        let randomNumber = Math.floor(
          Math.random() * searchObject.slips.length
        );
        adviceIDField.innerHTML = `Advice # ${searchObject.slips[randomNumber].id}`;
        adviceText.innerHTML = `"${searchObject.slips[randomNumber].advice}"`;
      } else {
        adviceIDField.innerHTML = `${searchObject.message.type}`;
        adviceText.innerHTML = `"${searchObject.message.text}"`;
      }
    });
  console.log(string);
  //start fetch
}

function searchByID(int) {
  fetch(`${idAdviceUrl}${int}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((slipObject) => {
      if (slipObject.hasOwnProperty("slip")) {
        console.log(slipObject);
        adviceIDField.innerHTML = `Advice # ${slipObject.slip.id}`;
        adviceText.innerHTML = `"${slipObject.slip.advice}"`;
        console.log(slipObject);
      } else {
        adviceIDField.innerHTML = `${slipObject.message.type}`;
        adviceText.innerHTML = `"${slipObject.message.text}"`;
      }
    });
}

function displayRandomAdvice() {
  fetch(`${randomAdviceUrl}`)
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((slipObject) => {
      if (slipObject.hasOwnProperty("slip")) {
        console.log(slipObject);
        adviceIDField.innerHTML = `Advice # ${slipObject.slip.id}`;
        adviceText.innerHTML = `"${slipObject.slip.advice}"`;
        console.log(slipObject);
      } else {
        adviceIDField.innerHTML = `${slipObject.message.type}`;
        adviceText.innerHTML = `"${slipObject.message.text}"`;
      }
    });
}
