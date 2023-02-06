const express = require('express');
const crypto = require('crypto');
const validateEmail = require('../middleware/validateEmail');
const validatePassword = require('../middleware/validatePassword');

const router = express.Router();

function getToken() {
  return crypto.randomBytes(8).toString('hex');
}
// pesquisa para função getToken https://www.tabnine.com/code/javascript/functions/crypto/randomBytes

router.post('/', validateEmail, validatePassword, (_req, res) => {
  const token = getToken();

  return res.status(200).json({ token });
});

module.exports = router;