// PostgreSQL Steps:
// psql -U postgres
// pw
// CREATE DATABASE dbname;
// \c dbname;
// ...

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signIn = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'smartbrain',
    database : 'smartbrain'
  }
});

const app = express();

app.use(cors())	//allows communication between web app and server
app.use(bodyParser.json());

app.get('/', (req, res) => { res.send(database.users); })
app.post('/signin', signIn.handleSignIn(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.post('/image', (req, res) => { image.handleImage(req, res, db) })	//app.put?
app.post('/imageurl', (req, res) => { image.handleAPICall(req, res) })

app.listen(3002, () => {
	console.log('app is running on port 3002');
})