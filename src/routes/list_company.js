const express = require('express');
const router = express.Router();

const { supabase } = require('../config/database.js');

router.get('/', async (req, res) => {
  try {
    console.log('Buscando empresas...');

    // TESTE: Primeiro veja se supabase está carregando
    if (!supabase) {
      console.error('Supabase não inicializado');
      return res.status(500).json({
        error: 'Banco de dados não configurado',
        details: 'Verifique a conexão com Supabase',
      });
    }

    // TESTE: Primeiro tente uma consulta simples
    const { data, error } = await supabase
      .from('users') // Verifique se a tabela existe com esse nome
      .select('*')
      .limit(5); // Limite para teste

    if (error) {
      console.error('Erro do Supabase:', error);
      // Tente listar tabelas disponíveis
      const { data: tables } = await supabase
        .from('users.tables')
        .select('users')
        .limit(10);

      console.log('Tabelas disponíveis:', tables);

      throw error;
    }

    console.log(`${data?.length || 0} empresas encontradas`);
    res.json({
      success: true,
      count: data?.length || 0,
      data: data || [],
    });
  } catch (error) {
    console.error('Erro completo ao listar empresas:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
});

// Rota de teste simples
router.get('/test', (req, res) => {
  res.json({
    message: 'Rota de empresas funcionando!',
    timestamp: new Date().toISOString(),
    supabase: !!supabase,
  });
});

module.exports = router;
