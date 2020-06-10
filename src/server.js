const express = require("express")
const server = express()

// pegar o banco de dados
const db = require("./database/db")

// Configurar pasta publica
server.use(express.static("ProjetoEcoleta/public"))

// habilita o uso do req.body na nossa aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("ProjetoEcoleta/src/views", {
    express: server,
    noCache: true
})

// Configurar caminho da minha aplicação
// página inicial
// req: requisição
// res: Responta
server.get("/", (req, res) => {
    res.render("index.html")
})

server.get("/creat-point", (req,res) => {

    // req.query: Query Strings da nossa url
    console.log(req.query)

    return res.render("creat-point.html")
})

server.post("/savepoint", (req, res) => {

    //req.body: O corpo do nosso formulário
    //console.log(req.body)

    const query = `
        INSERT INTO places (
            name, 
            address,
            address2,
            state,
            city,
            image,
            items
        )   VALUES(?,?,?,?,?,?,?);
    `
    const values = [
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.image,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log('Cadastrado com sucessso')
        console.log(this)

        return res.render("creat-point.html", { saved: true })
    }
    
    db.run(query, values, afterInsertData)    
})

server.get("/search-results", (req, res) => {
    const searchresults = req.query.search

    if(searchresults == "") {
        return res.render("search-results.html", { total: 0})
    }

    // pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${searchresults}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length

        res.render("search-results.html", { places: rows, total: total })
        
        })
})

// Ligar o servidor
server.listen(3000)