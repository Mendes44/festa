const express = require('express');
const bodyParser = require('body-parser');
const ConfirmacaoService = require('./api/confirmacaoService'); // Corrigido o caminho
const app = express();
const port = 3000;

const confirmacaoService = new ConfirmacaoService();

app.use(bodyParser.json());
app.use(express.static('public'));

// Função para validar os dados recebidos
function validateData(name, attendance, drink) {
    if (!name || typeof name !== 'string' || name.trim() === "") {
        return 'Nome inválido';
    }
    if (attendance !== 'Sim' && attendance !== 'Não') {
        return 'Valor de presença inválido';
    }
    if (drink !== 'Sim' && drink !== 'Não') {
        return 'Valor de bebida inválido';
    }
    return null;
}

// Rota para receber dados do formulário
app.post('/api/submit', async (req, res) => {
    const { name, attendance, drink } = req.body;

    // Validação dos dados
    const error = validateData(name, attendance, drink);
    if (error) {
        return res.status(400).json({ message: error });
    }

    // Verificar se o nome já existe
    if (await confirmacaoService.isDuplicateName(name)) {
        return res.status(400).json({ message: 'Esse nome já foi usado para confirmar presença.' });
    }

    // Adiciona os dados à planilha
    await confirmacaoService.addConfirmation({
        Nome: name,
        Presença: attendance,
        Bebida: drink,
        'Data e Hora': new Date().toLocaleString()
    });

    res.json({ message: 'Confirmação recebida com sucesso!' });
});

// Rota para obter a lista de confirmações
app.get('/api/confirmations', async (req, res) => {
    try {
        const confirmations = await confirmacaoService.getAllConfirmations();
        res.json(confirmations);
    } catch (error) {
        console.error('Erro ao obter confirmações:', error);
        res.status(500).json({ message: 'Erro ao obter confirmações' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
