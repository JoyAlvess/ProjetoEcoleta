function populateUfs() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {
        for (const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option`
        }
        
    })
}
populateUfs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const url = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for (const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option`
        }
       citySelect.disabled = false
    })
}
document.querySelector("select[name=uf]").addEventListener("change", getCities)

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    // adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    //console.log('item: ', itemId)

    // verificar se existem itens selecionados, sim pegar os itens relacionados
    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    // se ja estiver selecionado,
    if (alreadySelected >= 0) {
        //  tirar a seleção
        const filteredItems = selectedItems.filter( item => {
            const itemsIsDifferent = item != itemId //false
            return itemsIsDifferent
        }) 
        selectedItems = filteredItems
    } else {
        // se não estiver selecionado adiconar a seleção
        selectedItems.push(itemId)
    }

    //console.log('selectedIdItems: ', selectedItems)
    // Atualizar o campo escondido com itens selecionados
    collectedItems.value = selectedItems
}