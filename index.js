
const express = require('express') //importanto o express para o projeto
const uuid = require("uuid") //importando para gerar um id aleatório
const bodyParser = require("body-parser")
const app = express() //criando uma variável para facilitar a utilização do express
app.use(bodyParser.json())
const port = 3002 //porta de acesso

/*  
    -Query params -> meusite.com/users?name=rodolfoage=28
    -Route params -> /users/2  //BUSCAR, DELETAR OU AUALIZAR ALGO ESPECIFICO PELO ID (no caso o id 2)
    -Request body -> {"name": "Rodolfo", "age": 28} //ARRAY

    -GET         -> Buscar informação no back-end e apenas mostrar
    -POST        -> Criar/Adicionar informações no back-end
    -PUT / PATH  -> Alterar/Atualizar informações no back-end 
    -DELETE      -> Deletar informações no back-end

    -Middleware -> INTERCEPTADOR -> tem o poder de parar ou alterar dados de requisição
*/


const users = []

//Middleware - INTERCEPTADOR - deixa codigo de req de PUT e DELETE mais limpo buscando info apenas aqui podendo ser utilizado em outras varias aplicações
const checkUserId = (request, response, next) => {
    const { id } = request.params

        const index = users.findIndex(user => user.id === id)

    if (index < 0) {
        return response.status(404).json({ error: "User not found" })
    }

    request.userIndex = index
    request.userId = id

    next()

}


//GET -> busca e mostra info
app.get('/users', (request, response) => {
    return response.json(users) //retorna arquivo json (JavaScript Object Notation)
})

//POST -> Criar/Adicionar informações
app.post('/users', (request, response) => {
    const { name, age } = request.body
    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user) //retorna arquivo json (JavaScript Object Notation)
})

//PUT/PATH -> Alterar/Atualizar informações
app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    users[index] = updateUser

    return response.json(updateUser) //retorna arquivo json (JavaScript Object Notation)
})

//DELETE -> Deletar informações
app.delete('/users/:id', checkUserId, (request, response) => {
   const index = request.userIndex 
   
    users.splice(index,1)

    return response.status(204).json()

})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
}) //Definindo o numero da porta que vai rodar









/*app.get('/users', (request, response) => {

    const { name, age } = request.query // destructuring assignment: desestruturando objetos. este é a maneira simplificada da operação abaixo

    const name = request.query.name
    const age = request.query.age

    return response.json({ name, age }) //retorna arquivo json (JavaScript Object Notation)
})
//caso seja trocado o nome "/users é necessário parar de rodar o servidor dando um CTRL C no terminal para atualizar ao abrir novamente"


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})//Definindo o numero da porta que vai rodar*/






