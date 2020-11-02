const connection = require('../database/connections')
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const users = await connection('users').select('*');
    
        return response.json(users);
    }, 

    async create(request, response) {
        const { name, email, tel, cpf } = request.body;

        const id = crypto.randomBytes(4).toString('HEX');

        await connection('users').insert({
            id, 
            name,
            email,
            tel,
            cpf
        })

        return response.json({ id });
    }
};