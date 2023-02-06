const express = require('express');
// const fs = require('fs/promises');
const crypto = require('crypto');

const router = express.Router();

function getToken() {
  return crypto.randomBytes(8).toString('hex');
}

router.post('/', async (req, res) => {
  const useToken = getToken();
  // const { email, password } = req.body;

  return res.status(200).json({ useToken });
});

module.exports = router;