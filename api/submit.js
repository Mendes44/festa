const ConfirmacaoService = require('./confirmacaoService'); // Certifique-se de que o caminho está correto

module.exports = async (req, res) => {
    // Verifica se o método é POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Método não permitido' });
    }

    const { name, attendance, drink } = req.body;

    const service = new ConfirmacaoService();

    try {
        // Verifica duplicatas
        if (await service.isDuplicateName(name)) {
            return res.status(400).json({ message: 'Esse nome já foi usado para confirmar presença.' });
        }

        // Adiciona a confirmação
        await service.addConfirmation({
            Nome: name,
            Presença: attendance,
            Bebida: drink
        });

        res.json({ message: 'Confirmação recebida com sucesso!' });
    } catch (error) {
        console.error('Erro ao processar a confirmação:', error);
        res.status(500).json({ message: 'Erro ao processar a confirmação.' });
    }
};
