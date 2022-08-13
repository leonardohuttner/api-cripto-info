const express = require('express')
const cors = require('cors')
const axios = require('axios');

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

const port = process.env.PORT ? process.env.PORT : 3000 

app.get('/health',(req,res) => res.status(200).json({
    data: 'Sistema ativo!'
}))

//busca dados transacao pelo id
app.get('/transacao/:id',async (req,res) => {
    try {
        const txid =  req.params.id
        if(!txid){
            res.status(401).json({ error: 'TxId não informado.'})
        } else {
            const response = await axios.get(`https://explorer.viawallet.com/res/btc/transactions/${txid}`)
            console.log('Transacao: ' + response.status, response.statusText)
            res.json(response.data)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
})

//busca os dados da carteira pelo id
app.get('/carteira/:id',async (req,res) => {
    try {
        const txid =  req.params.id
        if(!txid){
            res.status(401).json({ error: 'TxId não informado.'})
        } else {
            const response = await axios.get(`https://blockchain.info/rawaddr/${txid}`)
            console.log('Carteira: ' + response.status, response.statusText)
            res.json(response.data)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
})

//busca os dados de um bloco pelo id
app.get('/bloco/:id',async (req,res) => {
    try {
        const txid =  req.params.id
        if(!txid){
            res.status(401).json({ error: 'TxId não informado.'})
        } else {
            const response = await axios.get(`https://blockchain.info/rawblock/${txid}`)
            console.log('Bloco: ' + response.status, response.statusText)
            res.json(response.data)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
})

// Busca valor atual das moedas
app.get('/moeda/:pares',async (req,res) => {
    try {
        const pares =  req.params.pares
        if(!pares){
            res.status(401).json({ error: 'par não informado.'})
        } else {
            const response = await axios.get(`https://economia.awesomeapi.com.br/json/last/${pares}`)
            console.log('Cotacao: ' + response.status, response.statusText)
            res.json(response.data)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
})

//Uso de uma api de email
app.post('/send',async (req, res) => {
    try {
        if(!req.body.config || !req.body.mail){
            const response = await axios.post('https://sendmailnode.herokuapp.com/send',req.body)
            console.log('SendMail: ' + response.status, response.statusText)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error
        })
    }
})


app.listen(port,() => console.log(`Rodando na porta ${port}!`))