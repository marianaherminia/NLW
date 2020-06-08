//importar a dependência do sqlite3

const sqlite3 = require("sqlite3").verbose() //verbose: qeuro ver msgs no meu terminal

// criar o objeto que irá fazer op no banco de dados 
const db = new sqlite3.Database("./src/database.db")

module.exports = db 






// utiliza o objeto de banco de dados para nossas op
/* db.serialize(() => {
    // Cria uma tabela de nome place com comandos SQL
    //
   /*  db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `) */
    // Insere dados na tabela com comandos SQL
    /* const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Nº 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
    } */

   // db.run(query, values, afterInsertData)
 
    

    // Deletar um dado da tabela com comandos SQL
   /*  db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")

    })
 */
    // Consulta dados na tabela com comandos SQL
     /* db.all(`SELECT name FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros: ")
        console.log(rows)
    }) *//*
}) */