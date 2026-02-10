const { supabase } = require('../config/database.js');

class CreateAccount {
  //create_account:
  // Responsavel por cria cota para um usuario
  constructor(data) {
    this.data = data;
  }

  register() {
    if (
      typeof this.data === 'object' &&
      this.data !== null &&
      !Array.isArray(this.data)
    ) {
      // código
    }
  }
}
