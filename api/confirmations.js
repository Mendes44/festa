const ConfirmacaoService = require('./confirmacaoService');

module.exports = async (req, res) => {
    // Verifica se o método é GET
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    // Verifica a rota da requisição
    const path = req.url; // Captura o URL da requisição

    console.log('Rota /api/confirmations chamada'); // Log para verificar se a rota é acessada.

    try {
        const service = new ConfirmacaoService();

        if (path === '/api/confirmations') {
            // Se a rota for /api/confirmations, retorna todas as confirmações
            const confirmations = await service.getAllConfirmations();
            console.log('Confirmações obtidas com sucesso!', confirmations);
            return res.status(200).json(confirmations);
        } else if (path === '/api/calculations') {
            // Se a rota for /api/calculations, retorna os cálculos
            const { totalConfirmed, totalDrinks } = await service.getCalculations();
            return res.status(200).json({ totalConfirmed, totalDrinks });
        } else {
            return res.status(404).json({ message: 'Rota não encontrada' });
        }
    } catch (error) {
        console.error('Erro ao obter confirmações ou cálculos:', error);
        res.status(500).json({ message: 'Erro ao obter confirmações ou cálculos' });
    }
};



// const ConfirmacaoService = require('./confirmacaoService');

// module.exports = async (req, res) => {

//      // Verifica se o método é GET
//      if (req.method !== 'GET') {
//         return res.status(405).json({ message: 'Método não permitido' });
//     }
    
//     console.log ('Rota /api/confirmations chamada'); //log para verficar se a rota e acessada.

//     try {
//         const service = new ConfirmacaoService();
//         const confirmations = await service.getAllConfirmations();
//         console.log ( 'Confirmações obtidas com sucesso!', confirmations )
//         res.status(200).json(confirmations);
//     } catch (error) {
//         console.error('Erro ao obter confirmações:', error);
//         res.status(500).json({ message: 'Erro ao obter confirmações' });
//     }
// };
