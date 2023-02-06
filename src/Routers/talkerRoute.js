const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const readDB = path.resolve(__dirname, '..', 'talker.json');

const router = express.Router();

const DB = async () => {
  const talkers = await fs.readFile(readDB, 'utf8');
  return JSON.parse(talkers);
};

router.get('/', async (req, res) => {
  const getTalkers = await DB();
  if (getTalkers.lenght === 0) {
    return res.status(200).send([]);
  } 
    res.status(200).send(getTalkers);
  });

module.exports = router;
