const express = require('express');
const router = express.Router();
const { ListUser } = require('../../controllers/llistUser.js');

// e trazer informaçoes do usuario
router.get('/get/user/:email', async (req, res) => {
  // Buscar com email fornecido no parâmetro
  const targetEmail = req.params.email;
  // Enviar email para o Objeto
  const instance = new ListUser(targetEmail);

  const result = await instance.searchUser();
  if (result) {
    res.status(200).json({
      status: 200,
      data: result,
    });
  } else {
    res.status(404).json({
      status: 404,
      data: 'Nemhum resultado encontrado. Tente novemente com outro E-mail.',
    });
  }
});

module.exports = router;
