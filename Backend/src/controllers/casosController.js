const connection = require('../database/connection');
 module.exports = {
     async listarCasos(request, response){
         /**contando quantos casos no total e passando no header da requisição */
       const { page = 1} = request.query;
       const [count] = await connection('casos').count();
       response.header('X-Total-Count', count['count(*)'])

         /**Paginação de 5 em 5 */
       const casos = await connection('casos')
       .join('ongs', 'ong_id', '=', 'casos.ong_id')
       .limit(5)
       .offset((page - 1)* 5)
       .select(['casos.*', 
       'ongs.nome', 
       'ongs.email', 
       'ongs.whatsapp', 
       'ongs.cidade', 
       'ongs.uf'
    ]);
       return response.json(casos);
     },


     /**criando casos */

     async createCaso(request, response){
         const {titulo, descricao, valor } = request.body;
         const ong_id = request.headers.authorization;
        const [id]= await connection('casos').insert({
             titulo,
             descricao,
             valor,
             ong_id,
         })

         return response.json({id});
     },

     async deletarCaso(request, response){
         /**pegando o id da url */
         const {id} = request.params;
         const ong_id = request.headers.authorization;

         const caso = await connection('casos')
         .where('id', id)
         .select('ong_id')
         .first();
         
         if(caso.ong_id != ong_id ){
             return response.status(401).json({ error: 'Não autorizado a fazer essa operação'});
         }
         await connection('casos').where('id', id).delete();

         return response.status(204).send('caso apagado com sucesso');
     }

 }