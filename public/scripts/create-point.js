
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

    citySelect.innerHTML = "<option>Selecione a Cidade</option>" //limpa o campo
    citySelect.disabled = true //bloqueia de novo

    fetch(url)
    .then( res => res.json() )
    .then( cities => {

        for( const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
           
        }

       citySelect.disabled = false
    } )
}

document
    .querySelector("select[name=uf]") //seleciona o select name uf
    .addEventListener("change", getCities)  //Escuta evento change e executa getCities com a mudança. A função aqui está sem () pois é passada por referência e lá na função é que tem getCities(event). Seria a mesma coisa de não colocar nada la e colocar aqui getCities(event)


// Itens de coleta
// pegar todos os li
const ItensToCollect = document.querySelectorAll(".items-grid li")

for ( let item of ItensToCollect){
    item.addEventListener("click", handleSelectedItem)
}

// campo escondido com os itens selecionados
const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target
    // add or remove a class with JS
    itemLi.classList.toggle("selected")
    // itemLi.classList.remove
    // itemLi.classList.add
    //quando acontecer o evento vai pegar o dataset do id
    const itemId = itemLi.dataset.id
    
    //console.log('ITEM ID: ', itemId)
    
    //verificar se existem item selecionados
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //true (if founded) or false
        return itemFound
    } )
    // se já estiver selecionado, tirar da seleção
    //método procura por um index de array
    if(alreadySelected != -1) { //-1 é quando não está selecionado. Se diferente de -1 (se não está selecionado)
        //tirar da seleção
        const filteredItems = selectedItems.filter ( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        }) //entra no selectedItems e roda a função que escrevemos. Se a função retornar falso, o filter é executado e remove o elemento do array. Se a função retornar true, filter adiciona o elemento no novo array filteredItems
        selectedItems = filteredItems 
    }else{
        //se não estiver selecionado, adicionar à seleção
        //push coloca o elemento no array
        selectedItems.push(itemId)
    } 
    
    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    
    
}