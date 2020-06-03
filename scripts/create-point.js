
function populateUFs() {
    //procura o select com name="uf" e coloca na variavel ufSelect
    const ufSelect = document.querySelector("select[name=uf]") 

     //é uma promessa
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    //pega a resposta e retun transformada em json
    // poderia escrever res => res.json() pq só tem um de cada lado - função anônima () => {}
    .then( (res) => { return res.json() }) 
    .then( states => {
       //for mais simples; Para cada state de states, escreva o option o id e nome
        for( const state of states ){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            //ufSelect.innerHTML + para deixar o texto que estava e adicionar
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value //evento (que é mudar) target (onde foi executado, no select)
    //.querySelector("select[name=uf]") 
    //.addEventListener("change", getCities) 

    const indexOfSelectedState = event.target.selectedIndex
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
    .querySelector("select[name=uf]") //seleciona o select name uf
    .addEventListener("change", getCities)  //Escuta evento change e executa getCities com a mudança. A função aqui está sem () pois é passada por referência e lá na função é que tem getCities(event). Seria a mesma coisa de não colocar nada la e colocar aqui getCities(event)