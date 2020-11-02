const connection = require('../database/connections');

module.exports = {
    async create(request, response) {
        const { id } = request.body;

        const user = await connection('users')
            .where('id', id)
            .select('name')
            .first();  
        
        if (!user) {
            return response.status(400).json({error: 'No user found.'})
        }

        return response.json(user);
    }
}