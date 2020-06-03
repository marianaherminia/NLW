
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados") //é uma promessa
    .then( (res) => { return res.json() }) //pega a resposta e retun transformada em json
    // poderia escrever res => res.json() pq só tem um de cada lado
    .then( states => {
       
        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            //ufSelect.innerHTML + para deixar o texto que estava e adicionar
        }
        
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value //evento (que é mudar) target (onde foi executado, no select)

    const indexOfSelectedState = event.target.SelectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
        }

        citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]") //seçeciona o select name uf
    .addEventListener("change", getCities) 