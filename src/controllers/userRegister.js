const { supabase } = require('../config/database.js');
const { hashPassword } = require('../utils/passwordHasher.js');
const { business_hours } = require('../constants/businessDefaults.js');

class CreateAccount {
  // create_account:
  // Responsável por criar conta para um usuário

  constructor(data) {
    this.data = data;
  }

  async register() {
    if (
      typeof this.data === 'object' &&
      this.data !== null &&
      !Array.isArray(this.data)
    ) {
      try {
        // Hash da senha ANTES de inserir
        const hashedPassword = await hashPassword(this.data['password']);

        // Tenta cadastrar um usuário
        const { data, error } = await supabase
          .from('users')
          .insert({
            username: this.data['username'],
            email: this.data['email'],
            password: hashedPassword, // Usa a senha hashada
            business_name: this.data['business_name'],
            business_type: this.data['business_type'],
            phone: this.data['phone'],
            whatsapp: this.data['whatsapp'],
            business_hours: this.data['business_hours'] || business_hours,
            business_slug: this.data['business_slug'],
          })
          .select(); // Adicione .select() para retornar os dados inseridos

        if (error) {
          return {
            success: false,
            message: 'Erro ao criar usuário',
            error: error.message,
          };
        }

        return {
          success: true,
          message: 'Usuário criado com sucesso',
          data: data, // 'data' contém o usuário criado
        };
      } catch (error) {
        console.log('Erro ao tentar cadastrar um usuário:', error);
        return {
          success: false,
          message: 'Erro no processo de registro',
          error: error.message,
        };
      }
    }

    // Se os dados não forem válidos
    return {
      success: false,
      message: 'Dados inválidos para registro',
    };
  }
}

// Exporte CORRETAMENTE
module.exports = { CreateAccount };
