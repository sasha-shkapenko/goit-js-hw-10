import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const listEl = document.querySelector('.country-list');
const divEl = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

function onInputChange(e) {
    outputClear();
    if (e.target.value != '') {
        fetchCountries(e.target.value.trim())
            .then(renderHTML)
            .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error);
      });
    }
};

function outputClear() {
    listEl.innerHTML = '';
    divEl.innerHTML = '';
}

function renderHTML(country) {
     if (country.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            } else if (country.length >= 2 && country.length <= 10){
                renderCountriesList(country);
            } else if (country.length === 1){
                renderCountryCard(country);
            } 
}

function renderCountriesList(countriesArr) {
    const markup = countriesArr.map(({ flags, name }) => {
        return `<li class="country-item">
        <img class="country-flag" src="${flags.svg}" width="50px">
        <p class="country-text">${name.official}</p>
        </li>`;
    }).join('');
    listEl.insertAdjacentHTML('beforeend', markup);
}

function renderCountryCard(country) {
    const markup = country.map(({ flags, name, capital, population, languages }) => {
        return `<div class="country-thumb"><img src="${flags.svg}" width="100px">
        <p class="country-name">${name.official}<p></div>
        <p><span class="bold-text">Capital:</span> ${capital}</p>
        <p><span class="bold-text">Population:</span> ${population}</p>
        <p><span class="bold-text">Languages:</span> ${Object.values(languages).join(', ')}</p>`;
    }).join('');
    divEl.insertAdjacentHTML('beforeend', markup);
}



        
        

