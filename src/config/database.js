// src/models/database.js
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.KEY_SUPABASE_PUBLIC,
);

// Teste de conexão
async function testConnection() {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('count', { count: 'exact', head: true });
    if (error) {
      console.warn('Supabase conectado mas com erro:', error.message);
    } else {
      console.log('Supabase conectado com sucesso');
    }
  } catch (error) {
    console.error('Erro na conexão com Supabase:', error.message);
  }
}

testConnection();

module.exports = { supabase };
