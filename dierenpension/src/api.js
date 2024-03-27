const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require("cors")
const {query} = require("express");
app.use(express.json())    // nodig om inputdata in json te verwerken
app.use(cors("*"))        // Access-Control-Allow-Origin: * en preflight

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dierenpension',
    port: 3308
})

db.connect((err) =>  {     // test connection
    if (err) throw err
    console.log("Database personeel connected")
})
app.get('/', (req, res) => {
    res.send('Zie document Endpoints')
})

// en dit zet je onderaan in je code om de server op te staren
app.get('/api/dieren', (req, res) => {
    let query = `SELECT * FROM dieren`
    if('sort' in req.query) query += ` ORDER BY ${req.query.sort} `
    if('order' in req.query) query += ` Where Soort_id = ${req.query.order} `
    if('limit' in req.query) query += ` LIMIT ${req.query.limit} `
    if('offset' in req.query) query += ` OFFSET ${req.query.offset} `
    console.log('query = ',query)
    db.query(query, 0, (err, rows) => {
        if (err) {console.log(err); return res.status(400).end()}
        if (rows.length == 0) return res.status(404).end()
        res.status(200).send(rows)
    })
})

app.get('/api/dieren/:id', (req, res) => {
    const query = `SELECT * FROM dieren WHERE Dier_Id = ${req.params.id}`
    console.log('query = ',query)
    db.query(query, 0, (err, rows) => {
        if (err) {console.log(err); return res.status(400).end()}
        if (rows.length == 0) return res.status(404).end()
        res.status(200).send(rows)
    })
})

app.post('/api/gebruikers', (req, res) => {
    let n = ''
    Object.keys(req.body).map(el => n += `, ${el}`)
    let v = ''
    Object.keys(req.body).map(el => v += `, "${req.body[el]}"`)
    const query = `INSERT INTO gebruikers (${n.slice(2)}) VALUES (${v.slice(2)})`
    console.log('query = ',query)

    db.query(query, 0, (err, rows) => {
        if (err) {console.log(err); return res.status(400).end()}
        if (rows.affectedRows == 0) return res.status(404).end()
        res.status(201).send("row inserted")
    })
})
app.post('/api/login', async (req, res) => {
    try {
        const { Gebruikersnaam, Wachtwoord } = req.body;

        // Perform database query to check if the user exists
        const result = db.query('SELECT * FROM gebruikers WHERE Gebruikersnaam = ? AND Wachtwoord = ?', [Gebruikersnaam, Wachtwoord], (err, rows) => {
            if (err) {console.log(err); return res.status(400).end()}
            if (rows.length == 0) return res.status(404).end()
            res.status(200).send(rows)

        });
        console.log('SELECT * FROM gebruikers WHERE Gebruikersnaam = ? AND Wachtwoord = ?', [Gebruikersnaam, Wachtwoord])

    } catch (error) {
        console.error(error);}
});


app.all('*', (req, res) => {      // fallback routes
    return res.status(405).end()
})

const server = app.listen(8081, () => {
    const host = server.address().address
    const port = server.address().port
    console.log("Luister op http://%s%s", host, port)
})