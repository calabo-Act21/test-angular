var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.post('/people', createPeople);
router.delete('/people/:id', deletePeople);
router.get('/person/:id', getPerson);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
  res.status(200).send(data.people);
}

function deletePeople(req, res, next) {
  res.status(200).send({ success: true });
}

function createPeople(req, res, next) {
  var result = req.body;
  result.id = 42;
  res.status(200).send(result);
}

function getPerson(req, res, next) {
  var id = +req.params.id;
  var person = data.people.filter(function (p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
}
