const validateAge = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof age !== 'number') {
    return res.status(400).json({ message: 'O campo "age" deve ser do tipo "number"' });
  }
  if (!Number.isInteger(age)) {
    return res.status(400).json({ message: 'O campo "age" deve ser um "number" do tipo inteiro' });
    // documentação isInteger https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
  }
  if (age <= 18) {
    return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }
  return next();
};

module.exports = validateAge;