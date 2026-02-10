// src/utils/passwordHasher.js
const bcrypt = require('bcrypt');

/**
 * Gera hash de uma senha usando bcrypt
 * @param {string} password - Senha em texto claro
 * @param {number} saltRounds - Número de rounds para o salt (padrão: 10)
 * @returns {Promise<string>} - Senha hashada
 */
async function hashPassword(password, saltRounds = 10) {
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Senha deve ser uma string não vazia');
    }

    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Erro ao gerar hash da senha:', error.message);
    throw error;
  }
}

/**
 * Compara uma senha em texto claro com um hash
 * @param {string} password - Senha em texto claro
 * @param {string} hashedPassword - Senha hashada para comparação
 * @returns {Promise<boolean>} - True se a senha corresponder
 */
async function comparePassword(password, hashedPassword) {
  try {
    if (!password || !hashedPassword) {
      throw new Error('Ambas as senhas são necessárias para comparação');
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error('Erro ao comparar senhas:', error.message);
    throw error;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
};
