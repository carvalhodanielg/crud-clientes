const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => {
    clearModal()
    document.getElementById('modal').classList.remove('active')
}

const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Client')) ?? []  //armazenar o que está no local storage, se estiver vazio retorna uma string vazia, e transforma a string em JSON



const setLocalStorage = (dbClient) => localStorage.setItem("db_Client",JSON.stringify(dbClient))


const deleteClient = (index) => {
    const dbClient = getLocalStorage()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}

//update

const updateClient = (index, client) => {
    const dbClient = getLocalStorage()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)

}

const isValidFields = () => {
    return document.getElementById('modalForm').reportValidity()
}


const clearModal = () => {
    const modalInputs = document.querySelectorAll('.modalInputs')
    modalInputs.forEach(modalInputs => modalInputs.value = "")
    document.getElementById('modalName').dataset.index = 'new'
}



const saveClient = () => {
    
    if(isValidFields()){
        const client = {     
            nome: document.getElementById('modalName').value,
            email: document.getElementById('modalEmail').value,
            celular: document.getElementById('modalCelular').value,
            cidade: document.getElementById('modalCity').value,
            estado: document.getElementById('modalState').value
        } 
        const index = document.getElementById('modalName').dataset.index
        if(index == 'new'){
            createClient(client)
            updateTable()
            closeModal()
        }else{
            updateClient(index,client)
            updateTable()
            closeModal()
        }



    }

}

const newRow = (client, index) => {
    const newRowInside = document.createElement('tr')
    
    newRowInside.innerHTML = ` 
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>${client.estado}</td>
        <td>
            <button type="button" id="editButton-${index}" class="editButton">Editar</button>
            <button type="button" id="removeButton-${index}" class="removeButton">Remover</button>
        </td>
    
        `
        document.querySelector('#table>tbody').appendChild(newRowInside)
    
}
    


const clearTable = () => {
    const rows = document.querySelectorAll('#table>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))
}


const updateTable = () => {
    const dbClient = getLocalStorage();
    clearTable()
    dbClient.forEach(newRow)
}


const fillFields = (client) => {
    document.getElementById('modalName').value = client.nome
    document.getElementById('modalEmail').value = client.email
    document.getElementById('modalCelular').value = client.celular
    document.getElementById('modalCity').value = client.cidade
    document.getElementById('modalState').value = client.estado

    document.getElementById('modalName').dataset.index = client.index

}





const editClient = (index) => {
    const client = getLocalStorage()[index]
 
    client.index = index
    fillFields(client)
    openModal()
}





const editDelete = (event) => {
    if (event.target.type  == 'button'){

        const[action, index] = event.target.id.split('-')

        if(action == 'editButton'){
            editClient(index)
        }else{
            const client = getLocalStorage()[index]
            const response = confirm(`Excluir o cliente ${client.nome}?`)
            if(response){
                deleteClient(index)
                updateTable()
            }
        }
    }

}

updateTable()

document.getElementById('NovoCliente').addEventListener('click',openModal)
document.getElementById('modalExit').addEventListener('click',closeModal)


document.getElementById('modalSave').addEventListener('click', (e)=> {
    e.preventDefault()
    saveClient()
})

document.getElementById('modalEdit').addEventListener('click',closeModal)

document.querySelector('#table>tbody').addEventListener('click', editDelete)