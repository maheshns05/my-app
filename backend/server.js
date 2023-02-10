const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');    
//const logger = require('./middleware/logger');
const config = require('config');
const courses = require('./routes/courses');

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://admin:password@localhost:27017/npm-demo', {
    useNewUrlParser: true,
    authSource:"admin"
})
  .then(() => console.log('Connected to DB!'))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.static('public'))
app.use('/api/courses', courses);
//app.use(logger);

if(app.get('env') === 'development') {
    app.use(morgan('tiny'));
}

//console.log(config.get('mail.password'));

app.get('/', (req, res) => {
    res.send('Hello World adssad!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})