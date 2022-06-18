// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução
import { AudioPlayer } from './music.js'
import { numberToRoman } from './roman.js'
import { restartAnimation } from './restart-animation.js'
import { friendlyFetch } from './friendly-fetch.js'

const API_ENDPOINT = 'https://swapi.dev/api'
const music = {
    audioUrl: './audio/tema-sw.mp3',
    coverImageUrl: './imgs/logo.svg',
    title: 'Intro',
    artist: 'John Williams',
}
const bodyEl = document.querySelector('body')
const audioPlayer = new AudioPlayer(music)
audioPlayer.start(music, bodyEl)
audioPlayer.render

async function getFilmList(isUsingSessioStorage) {
    if (isUsingSessioStorage) {
        const films = await friendlyFetch()
        setFilmList(films)
    }
    else {
        fetch(`${API_ENDPOINT}/films/`)
            .then(response => response.json())
            .then(data => {
                setFilmList(data.results)
            })
    }
}

function setFilmList(data) {
    const filmList = JSON.parse(data);
    filmList.sort((a, b) => {
        return a.episode_id - b.episode_id
    })
    const listUlEl = document.getElementsByTagName('ul')[0]
    filmList.forEach(film => {
        const roman = numberToRoman(film.episode_id).padEnd(3, ' ')
        const title = film.title
        const content = film.opening_crawl

        const liEl = document.createElement('li')
        listUlEl.appendChild(liEl)
        liEl.innerText = `Episode ${roman} - ${title}`
        liEl.addEventListener('click', () => {
            setFilmContent(roman, title, content)
        })

    })
}

function setFilmContent(roman, title, content) {
    const preTextEl = document.getElementsByTagName('pre')[0]
    preTextEl.innerText =
        `
    Episode ${roman}
    ${title}

    ${content}
    `
    restartAnimation(preTextEl)
}

getFilmList(true)