const ConfirmacaoService = require('./confirmacaoService');

module.exports = async (req, res) => {
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
