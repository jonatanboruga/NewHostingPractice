const main = document.querySelector("main"); 
const apodEl = document.querySelector(".apod");
const roverList = document.querySelector(".rover-list");
const errorMsg = document.querySelector("error-msg");
const dateInput = document.querySelector("#date-input");
const submitButton = document.querySelector("#submit")

import { NASA_API } from "./file.js";
const apodURL = `https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`;

// This function tries to fetch the url passed and if it does not work
// it throws an error. It awaits the response and moves it into json.
// Catches an error if it tries and does not succeed by adding a visual message 
async function fetchData(url, handleData) {
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Http error! Status ${response.status}`);
        }
        const data = await res.json();
        handleData(data);
    } catch (error) {
        errorMsg.style.display ="block"
        errorMsg.innerHTML ="There was an error" + error;
    }
}

// This function calls the apod url and glues a few pictures sent from the api.
function handleApodData(data) {
    const html = `
    <img src="${data.url}" alt="apod">
    <p>${data.title}</p>
    `;
    apodEl.insertAdjacentHTML("beforeend", html);
}

// Fetching and displaying apod
fetchData(apodURL, handleApodData);
