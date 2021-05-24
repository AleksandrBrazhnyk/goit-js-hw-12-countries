import './styles.css';

import API from './js/fetchCountries';
import countryListTpl from './templates/country-list.hbs'
import countryCardTpl from './templates/country-card.hbs'

import debounce from 'lodash.debounce';
import { error, notice } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
    search: document.querySelector('.search'),
    countriesMrkp: document.querySelector('.countries-js')
};
// const inputRef = document.querySelector('.search'),
// const countriesMrkp = document.querySelector('.countries-js'),


const searchInput = e => {
    const searchQuery = e.target.value;
    refs.countriesMrkp.innerHTML = '';

    if (searchQuery.length < 1)
    return;

    API.fetchCountries(searchQuery)
    .then(dataShow)
    .catch(noticeInfo);
};

const dataShow = countries => {
    if (countries.length > 10) {
        error({
            text: 'Please enter a more specific query!',
            delay: 3000,
        });
    };
    if (countries.length > 1 && countries.length < 10) {
        refs.countriesMrkp.innerHTML = countryListTpl(countries);
    };
    if (countries.length === 1) {
        refs.countriesMrkp.innerHTML = countryCardTpl(...countries);
    };
};
const noticeInfo = () => {
        notice({
            title: 'OOPS!',
            text: 'Invalid entered value. Try again =)',
            delay: 2500,
        });
}

refs.search.addEventListener('input', debounce(searchInput, 500));