const connection = require('../database/connections');

module.exports = {
    async index(request, response) {
        const { page = 1 } = request.query;

        const [count] = await connection('pacients').count();

        const user_id = request.headers.authorization;
        const pacients = await connection('pacients')
            .limit(5) //faz a paginação
            .offset( (page - 1) * 5 ) //faz a paginação
            .where('user_id', user_id)
            .select('*');
        
        response.header('X-Total-Count', count['count(*)']);

        return response.json(pacients);
    },

    async create(request, response) {
        const { name, bed, type, age, height, weight, gender, admission_date, diagnosis } = request.body;
        const user_id = request.headers.authorization;

        const [id] = await connection('pacients').insert({
            name,
            bed,
            type,
            age,
            height,
            weight,
            gender,
            admission_date,
            diagnosis,
            user_id,
        })

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const user_id = request.headers.authorization;

        const pacient = await connection('pacients')
            .where('id', id)
            .select('user_id')
            .first();
        
        if (pacient.user_id != user_id) {
            return response.status(401).json({ error: 'Operation not permitted.'})
        }

        await connection('pacients').where('id', id).delete();

        return response.status(204).send();
    },
};