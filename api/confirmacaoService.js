const { google } = require('googleapis');
require('dotenv').config(); // Carregar as variáveis de ambiente

// Carregar as credenciais a partir de variáveis de ambiente
const credentials = {
    type: process.env.GOOGLE_TYPE,
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    auth_uri: process.env.GOOGLE_AUTH_URI,
    token_uri: process.env.GOOGLE_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL,
    client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL
};

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

// O ID da sua planilha do Google
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

class ConfirmacaoService {
    constructor() {
        this.authClient = null;
    }

    async init() {
        if (!this.authClient) {
            this.authClient = await auth.getClient();
        }
    }

    async addConfirmation(data) {
        try {
            await this.init();
            const sheets = google.sheets({ version: 'v4', auth: this.authClient });
            const request = {
                spreadsheetId: SPREADSHEET_ID,
                range: 'Página1!A:D', // Verifique se 'Página1' é o nome correto da aba
                valueInputOption: 'RAW',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    values: [[data.Nome, data.Presença, data.Bebida, new Date().toLocaleString()]]
                }
            };

            await sheets.spreadsheets.values.append(request);
            console.log('Confirmação adicionada com sucesso!');
        } catch (error) {
            console.error('Erro ao adicionar confirmação:', error);
            throw error; // Re-throw to handle it at a higher level if necessary
        }
    }

    async getAllConfirmations() {
        try {
            await this.init();
            const sheets = google.sheets({ version: 'v4', auth: this.authClient });
            const request = {
                spreadsheetId: SPREADSHEET_ID,
                range: 'Página1!A:D' // O intervalo da planilha de onde os dados serão obtidos
            };

            console.log('Fazendo requisição para obter confirmações:', request);

            const response = await sheets.spreadsheets.values.get(request);
            const rows = response.data.values || [];
            const confirmations = rows.map(row => ({
                Nome: row[0],
                Presença: row[1],
                Bebida: row[2],
                'Data e Hora': row[3]
            }));

            console.log('Confirmações obtidas com sucesso:', confirmations);
            return confirmations;
        } catch (error) {
            console.error('Erro ao obter confirmações:', error);
            throw error; // Re-throw to handle it at a higher level if necessary
        }
    }

    async isDuplicateName(name) {
        const confirmations = await this.getAllConfirmations();
        return confirmations.some(confirmation => confirmation.Nome.toLowerCase() === name.toLowerCase());
    }
}

module.exports = ConfirmacaoService;
