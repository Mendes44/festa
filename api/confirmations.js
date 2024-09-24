const ConfirmacaoService = require('./confirmacaoService');

module.exports = async (req, res) => {

     // Verifica se o método é GET
     if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método não permitido' });
    }
    
    console.log ('Rota /api/confirmations chamada'); //log para verficar se a rota e acessada.

    try {
        const service = new ConfirmacaoService();
        const confirmations = await service.getAllConfirmations();
        console.log ( 'Confirmações obtidas com sucesso!', confirmations )
        res.status(200).json(confirmations);
    } catch (error) {
        console.error('Erro ao obter confirmações:', error);
        res.status(500).json({ message: 'Erro ao obter confirmações' });
    }
};
