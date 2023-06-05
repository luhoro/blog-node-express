// requires precisam ser as primeiras coisas do arquivo
const express = require('express')
const path = require('path')
const fs = require('fs')


const app = express()

// definindo o template engine
app.set('view engine', 'ejs')

/* Definindo os arquivos estáticos
const staticFolder = path.join(__dirname, 'views')
const expressStatic = express.static(staticFolder)
app.use(expressStatic)*/

// Definindo os arquivos públicos
app.use(express.static(path.join(__dirname, 'public')))

// habilita server para receber dados via post (formulário)
app.use(express.urlencoded({ extended: true }))

// Rotas
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home page'
    })
})

app.get('/posts', (req, res) => {
    res.render('posts', {
        title: 'Posts Page',
        posts: [
            {
                title: 'Tech news',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem amet, molestias praesentium rem mollitia cupiditate. Ex fuga quibusdam aspernatur. Deserunt rerum hic, qui quos esse accusantium pariatur accusamus ipsam perspiciatis saepe aliquid officia repellat repellendus eius debitis fugit quia minus, ut ad dignissimos dolore nemo. Unde nemo debitis dicta eligendi, modi fugiat, accusamus, quaerat corrupti sit repellendus labore maiores nulla? Incidunt minima libero at, nulla sequi quasi recusandae id debitis ea minus saepe consectetur labore dolorem in distinctio, amet dolores vel ab voluptas esse aliquam aut explicabo nobis officia! Dolore nobis dignissimos ex, similique quis dolor amet modi deserunt voluptates.',
                stars: 4
            },
            {
                title: 'Pops news',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem amet, molestias praesentium rem mollitia cupiditate. Ex fuga quibusdam aspernatur. Deserunt rerum hic, qui quos esse accusantium pariatur accusamus ipsam perspiciatis saepe aliquid officia repellat repellendus eius debitis fugit quia minus, ut ad dignissimos dolore nemo. Unde nemo debitis dicta eligendi, modi fugiat, accusamus, quaerat corrupti sit repellendus labore maiores nulla? Incidunt minima libero at, nulla sequi quasi recusandae id debitis ea minus saepe consectetur labore dolorem in distinctio, amet dolores vel ab voluptas esse aliquam aut explicabo nobis officia! Dolore nobis dignissimos ex, similique quis dolor amet modi deserunt voluptates.',
                stars: 2
            },
            {
                title: 'Teens news',
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem amet, molestias praesentium rem mollitia cupiditate. Ex fuga quibusdam aspernatur. Deserunt rerum hic, qui quos esse accusantium pariatur accusamus ipsam perspiciatis saepe aliquid officia repellat repellendus eius debitis fugit quia minus, ut ad dignissimos dolore nemo. Unde nemo debitis dicta eligendi, modi fugiat, accusamus, quaerat corrupti sit repellendus labore maiores nulla? Incidunt minima libero at, nulla sequi quasi recusandae id debitis ea minus saepe consectetur labore dolorem in distinctio, amet dolores vel ab voluptas esse aliquam aut explicabo nobis officia! Dolore nobis dignissimos ex, similique quis dolor amet modi deserunt voluptates.',
                stars: 5
            }
        ]
    })
})

app.get('/create-post', (req, res) => {
    const { r } = req.query
    res.render('create-post', {
        title: 'To Post',
        registered: r,
    })
})

app.post('/save-post', (req, res) => {
    const { title, text } = req.body

    const data = fs.readFileSync('./store/posts.json')
    const posts = JSON.parse(data)

    posts.push({
        title,
        text,
    })

    const postsString = JSON.stringify(posts)
    fs.writeFileSync('./store/posts.json', postsString)

    res.redirect('/create-post?r=1')
})

// 404 ERROR (not found)
app.use((req, res) => { // middleware - algo que executa entre uma requisição
    res.send('ERROR 404 - cannot find a thing bro')
})

// Executando o servidor
const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server is listening on port ${port}`))