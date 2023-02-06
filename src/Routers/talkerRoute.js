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

module.exports = router;
