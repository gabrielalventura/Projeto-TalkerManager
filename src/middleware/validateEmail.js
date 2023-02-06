const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const rightEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i;
  // Regex retirado de: https://www.regular-expressions.info/email.html

  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (!rightEmail.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  } 
  return next();
};

module.exports = validateEmail;