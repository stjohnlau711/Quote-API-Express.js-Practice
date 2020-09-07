const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    let randomQuote = getRandomElement(quotes);
    res.send({quote: randomQuote});
})

app.get('/api/quotes', (req, res, next) => {
    if(req.query.person) {
        let quotePerson = req.query.person;
        let quotesByPerson = [];

        for(let i = 0; i < quotes.length; i++) {
            if(quotes[i].person === quotePerson) {
                quotesByPerson.push(quotes[i]);
            }
        }

        let res1Object = {quotes: quotesByPerson};
        res.send(res1Object);
    } else {
        let res2Object = {quotes: quotes};
        res.send(res2Object);
    }
})

app.post('/api/quotes', (req, res, next) => {
    if(req.query.quote && req.query.person) {
        let text = req.query.quote;
        let name = req.query.person;
        let newQuote = {quote: text, person: name};
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(404).send();
    }
})

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
  });
