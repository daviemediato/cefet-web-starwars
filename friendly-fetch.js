const API_ENDPOINT = 'https://swapi.dev/api'

export async function friendlyFetch() {
    try {
        const films = localStorage.getItem('films')
        const emptyObject = "{}"

        if (films !== emptyObject &&
            films
        ) {
            return films
        }
        else {
            fetch(`${API_ENDPOINT}/films/`)
                .then(response => response.json())
                .then(data => {
                    localStorage.setItem('films', JSON.stringify(data.results))
                    console.log('fetched from localStorage')
                    return data.results
                })
        }
    } catch (error) {
        console.log(error)
    }
}