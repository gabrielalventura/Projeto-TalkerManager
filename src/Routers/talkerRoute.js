const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const validateToken = require('../middleware/validateToken');
const validateName = require('../middleware/validateName');
const validateAge = require('../middleware/validateAge');
const validateTalk = require('../middleware/validateTalk');
const validateWatchedAt = require('../middleware/validateWatchedAt');
const validateRate = require('../middleware/validateRate');

const readDB = path.resolve(__dirname, '..', 'talker.json');

const router = express.Router();

const DB = async () => {
  const talkers = await fs.readFile(readDB, 'utf8');
  return JSON.parse(talkers);
};

const insertDB = async (talkers) => {
  const addTalkers = await fs.writeFile(readDB, JSON.stringify(talkers), 'utf-8');
  return addTalkers;
};

router.get('/', async (req, res) => {
  const getTalkers = await DB();
  if (getTalkers.lenght === 0) {
    return res.status(200).send([]);
  } 
    res.status(200).send(getTalkers);
  });

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await DB();
  const talker = talkers.find((talk) => talk.id === Number(id));

  if (!talker) {
    return res.status(404).json({
      message: 'Pessoa palestrante não encontrada',
    });
  }
  return res.status(200).json(talker);
});

router.post('/', validateToken, validateName, 
validateAge, validateTalk, validateWatchedAt, validateRate, async (req, res) => {
  const newBody = { ...req.body };
  const talkers = await DB();
  const theId = talkers.lenght - 1;
  newBody.id = theId + 1;
  const allTalkers = [...talkers, newBody];
  await insertDB(allTalkers);

  res.status(201).json(newBody);
});

module.exports = router;
