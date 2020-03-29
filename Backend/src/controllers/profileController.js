const connection = require('../database/connection');
module.exports = {
    async listarEspc(request, response){
        const ong_id = request.headers.authorization;

        const caso = await connection('casos')
        .where('ong_id', ong_id)
        .select('*');

        return response.json(caso);
    }
}