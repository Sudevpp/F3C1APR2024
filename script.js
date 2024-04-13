// script.js
document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    addSearchToHistory();
});

document.getElementById('search-form').addEventListener('submit', (event) => {
    event.preventDefault();
    getImageOfTheDay();
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImage(currentDate);
}

function getImageOfTheDay() {
    const selectedDate = document.getElementById('search-input').value;
    saveSearch(selectedDate);
    getImage(selectedDate);
}

function getImage(date) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch image');
            }
            return response.json();
        })
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.error('Error:', error);
            // Display error message to user
        });
}

function displayImage(data) {
    const imageContainer = document.getElementById('current-image-container');
    imageContainer.innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.url}" alt="${data.title}">
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.push(date);
    localStorage.setItem('searches', JSON.stringify(searches));
}

function addSearchToHistory() {
    const searchHistory = document.getElementById('search-history');
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searchHistory.innerHTML = '';
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImage(date);
        });
        searchHistory.appendChild(listItem);
    });
}
