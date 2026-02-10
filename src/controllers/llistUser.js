const { supabase } = require('../config/database.js');


class ListUser{

    constructor(targetEmail){
        this.targetEmail = targetEmail;
    }

    // get
    async searchUser(){
        if (!this.targetEmail){
            return {
            success: false,
            message: 'E-mail não fornecido',
            };
        }

        const {data, error} = await supabase
        .from('users')
        .select('email,username, phone')
        .eq('email', this.targetEmail)
        .single();

        if (error && error.code === 'PGRST116'){
            return {
                success: false,
                message: 'Conta não econtrada'
            };
            
        }

        return {
            success: true,
            message: 200,
            username: data.username,
            email: data.email,
            phone: data.phone
        }
    }

    
}

module.exports = {ListUser}