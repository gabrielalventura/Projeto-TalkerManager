const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  const { watchedAt, rate } = talk;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (rate === undefined) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  return next();
};

module.exports = validateTalk;