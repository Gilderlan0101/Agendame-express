const express = require('express');
const router = express.Router();
const { CreateAccount } = require('../controllers/userRegister.js');
const { registerUser } = require('../schemas/schemasRegister.js');

router.post('/', async (req, res) => {
    try {
        // 1. Valida os dados de entrada com o schema
        const { error, value } = registerUser.validate(req.body);
        
        if (error) {
            return res.status(400).json({
                success: false,
                message: 'Dados inválidos',
                errors: error.details.map(detail => detail.message)
            });
        }

        // 2. Cria uma instância do CreateAccount com os dados validados
        const createAccount = new CreateAccount(value);
        
        // 3. Chama o método register
        
        const result = await createAccount.register();
        
        // 4. Retorna a resposta apropriada
        if (result.success) {
            return res.status(201).json(result);
        } else {
            return res.status(400).json(result);
        }

    } catch (error) {
        console.error('Erro na rota de registro:', error);
        
        return res.status(500).json({
            success: false,
            message: 'Erro interno do servidor',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
});

module.exports = router;