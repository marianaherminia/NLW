  //Para criar o servidor, preciso de módulos (packing/dependências) extras
  //npm: node packaging
  //npm install express

  const express = require("express") //a função require busca o express
  const server = express() //express agora é uma função e pode começar o servidor
  //server executa a função express
  //server será um objeto

  // Pegar o BD
  const db = require("./database/db")


  //configurar pasta pública
  server.use(express.static("public"))

  // habilitar o uso do req body
  server.use(express.urlencoded({ extended: true }))

  //utilizando template engine
  const nunjucks = require("nunjucks")
  nunjucks.configure("src/views",{
      express: server,
      noCache: true
  })



  //configurar caminhos
  //página inicial
  // req: requisição
  // res: resposta
 //get é um verbo http
   // o "/" via get vai responder uma função 
  server.get("/", (req, res) => {
    return res.render("index.html", { title: "Um título"})
  })

  server.get("/create-point", (req, res) => {
      //req.query: Query strings da url
      //console.log(req.query)




    return res.render("create-point.html", { saved: true })
  })

  server.post("/savepoint", (req, res) => {
      //req.body: o corpo do formulário
      //console.log(req.body)
      //inserir dados no db

      // Insere dados na tabela com comandos SQL
    const query = `
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
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err){
        if(err){
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

  db.run(query, values, afterInsertData)
 
      
  })






server.get("/search", (req, res) => {

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows){
        if(err) {
            return console.log(err)
        }

        const total = rows.length
        //mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows , total: total })
    })  
    
})

  //liga o servidor
  server.listen(3000) //objeto server fica ouvindo a porta 3000

