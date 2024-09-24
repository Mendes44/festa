# 🎉 Confirmação de Presença 🎉

Este projeto é um sistema de confirmação de presença para eventos, permitindo que os convidados confirmem sua presença e se irão beber. Os dados são armazenados em uma planilha do Google Sheets, facilitando o gerenciamento das informações.

## 🚀 Funcionalidades

- **Confirmação de Presença**: Os usuários podem confirmar se vão ao evento e se irão beber.
- **Listagem de Confirmados**: Visualize a lista de pessoas que confirmaram presença.
- **Validação de Dados**: Validação das entradas para garantir que os dados sejam inseridos corretamente.
- **Armazenamento em Google Sheets**: Todas as confirmações são armazenadas em uma planilha do Google, permitindo fácil acesso e gerenciamento.

## 📦 Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para construir APIs.
- **Google APIs**: Para interação com o Google Sheets.
- **dotenv**: Para gerenciar variáveis de ambiente.

## 🔧 Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu_usuario/confirmação-presenca.git
   cd confirmacao-presenca

2. Instale as dependências:
    ```
    npm install

3. Configure suas variáveis de ambiente no arquivo .env:
    ```
    GOOGLE_TYPE=service_account
    GOOGLE_PROJECT_ID=seu_projeto_id
    GOOGLE_PRIVATE_KEY_ID=seu_private_key_id
    GOOGLE_PRIVATE_KEY="sua_private_key"
    GOOGLE_CLIENT_EMAIL=seu_client_email
    GOOGLE_CLIENT_ID=seu_client_id
    SPREADSHEET_ID=seu_spreadsheet_id

4. Inicie o servidor:
    ```
    node server.js


5. Acesse a aplicação em http://localhost:3000

🛠️ Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

