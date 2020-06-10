// Importar a depêndencia so sqlite
const sqlite3 = require('sqlite3').verbose();   

// criar o objeto que íra fazer operações no banco de dados
const db = new sqlite3.Database("./ProjetoEcoleta/src/database/database.db");

module.exports = db

// utilizar o objeto de banco de dados, para as operações 
//db.serialize(() => {

    // 1 criar tabela 
    //db.run(`
    //    CREATE TABLE IF NOT EXISTS places (
    //        id INTEGER PRIMARY KEY AUTOINCREMENT,
    //        name TEXT,
    //        address TEXT,
    //        address2 TEXT, 
    //        state TEXT,
    //        city TEXT,
    //        image TEXT,
    //        items TEXT            
    //   );
    //`)

    // 2 inserir dados na tabela
    //const query = `
    //    INSERT INTO places (
    //        name, 
    //        address,
    //        address2,
    //        state,
    //        city,
    //        image,
    //        items
    //    )   VALUES(?,?,?,?,?,?,?);`
    //const values = [
    //    "Papersider",
    //    "Gemballa, Jadim América",
    //    "N°260",
    //    "Santa Catarina",
    //    "Rio do Sul",
    //    "https://cdn.pixabay.com/photo/2017/02/14/07/14/white-male-2064827_960_720.jpg",
    //    "Papéis e Papalã0"
    //]

    //function afterInsertData(err) {
    //    if(err) {
    //        return console.log(err)
    //    }

    //   console.log('Cadastrado com sucessso')
    //    console.log(this)
    //}
    
    //db.run(query, values, afterInsertData)

    // 3 consultar os dados na tabela
    //db.all(`SELECT * FROM places `, function(err, rows) {
    //    if(err) {
    //        return console.log(err)
    //    }
    //    console.log('Aqui estão seus registros')
    //    console.log(rows)
    //})

    // 4 deletar o dado 
    //db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
    //    if(err) {
    //        return console.log(err)
    //    }

     //   console.log('Registro deletado com sucesso')
    //})
//})