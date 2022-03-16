const openModal = () => document.getElementById('modal').classList.add('active')

const closeModal = () => document.getElementById('modal').classList.remove('active')


const getLocalStorage = () => JSON.parse(localStorage.getItem('db_Client')) ?? []  //armazenar o que está no local storage, se estiver vazio retorna uma string vazia, e transforma a string em JSON

const setLocalStorage = (dbClient) => localStorage.setItem("db_Client",JSON.stringify(dbClient))

const tempClient = {
    nome: "rael",
    email: "armado@belfordroxo.com",
    celular: "33 9 9990 0000",
    cidade: "Belford roxo",
    estado: "mg"
}

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

//read client = get local storage

//update

const updateClient = (client, index) => {
    const dbClient = getLocalStorage()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

//delete

const deleteClient = (index) => {
    const dbClient = getLocalStorage()
    dbClient.splice(index,1)
    setLocalStorage(dbClient)
}












document.getElementById('NovoCliente').addEventListener('click',openModal)
document.getElementById('modalExit').addEventListener('click',closeModal)


document.getElementById('modalSave').addEventListener('click', (e)=> {
    e.preventDefault()
    createClient(tempClient)
})
document.getElementById('modalEdit').addEventListener('click', (e) => {
    e.preventDefault()
    updateClient(tempClient,1)// olhasr

)}


