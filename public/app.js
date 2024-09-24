// Função para validar o nome
function validateName(name) {
    const regex = /^[a-zA-Z\s]*$/; // Permite apenas letras e espaços
    return regex.test(name);
}

// Função para carregar confirmações
async function loadConfirmations() {
    try {
        const response = await fetch('/api/confirmations');

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao carregar confirmações: ${errorMessage}`);
        }

        const confirmations = await response.json();
        const confirmationList = document.getElementById('confirmationList');
        confirmationList.innerHTML = '';

        confirmations.forEach(confirmation => {
            const listItem = document.createElement('li');
            listItem.textContent = `${confirmation.Nome} - Presença: ${confirmation.Presença} - Vai Beber: ${confirmation.Bebida}`;
            confirmationList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Erro ao carregar confirmações:', error);
        document.getElementById('responseMessage').innerText = 'Ocorreu um erro ao carregar a lista.';
    }
}

// Captura o evento de input para validar o nome em tempo real
document.getElementById('name').addEventListener('input', (event) => {
    const name = event.target.value;
    if (!validateName(name)) {
        event.target.value = name.replace(/[^a-zA-Z\s]/g, ''); // Remove caracteres não permitidos
    }
});

// Captura o evento de submissão do formulário
document.getElementById('confirmationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value;
    let attendance = document.getElementById('attendance').value;
    let drink = document.getElementById('drink').value;

    // Valida o nome
    if (!validateName(name)) {
        document.getElementById('responseMessage').innerText = 'Nome inválido. Não use caracteres especiais.';
        return;
    }

    // Validação para garantir que apenas "Sim" ou "Não" sejam enviados
    if (attendance !== 'Sim' && attendance !== 'Não') {
        alert('Valor inválido para presença. Alterando para "Sim".');
        document.getElementById('attendance').value = 'Sim'; // Define um valor padrão
        attendance = 'Sim'; // Atualiza a variável para manter a lógica
    }

    if (drink !== 'Sim' && drink !== 'Não') {
        alert('Valor inválido para bebida. Alterando para "Sim".');
        document.getElementById('drink').value = 'Sim'; // Define um valor padrão
        drink = 'Sim'; // Atualiza a variável para manter a lógica
    }

    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                attendance,
                drink
            })
        });

        const result = await response.json();
        document.getElementById('responseMessage').innerText = result.message;
        loadConfirmations(); // Recarrega a lista de confirmações
    } catch (error) {
        console.error('Erro ao enviar confirmação:', error);
        document.getElementById('responseMessage').innerText = 'Ocorreu um erro ao enviar a confirmação.';
    }
});

// Carregar lista de confirmações ao iniciar
document.addEventListener('DOMContentLoaded', loadConfirmations);






// // Função para validar o nome
// function validateName(name) {
//     const regex = /^[a-zA-Z\s]+$/; // Permite apenas letras e espaços
//     return regex.test(name);
// }

// async function loadConfirmations() {
//     try {
//         const response = await fetch('/api/confirmations');
        
//         if (!response.ok) {
//             const errorMessage = await response.text();
//             throw new Error(`Erro ao carregar confirmações: ${errorMessage}`);
//         }

//         const confirmations = await response.json();

//         const confirmationList = document.getElementById('confirmationList');
//         confirmationList.innerHTML = '';

//         confirmations.forEach(confirmation => {
//             const listItem = document.createElement('li');
//             listItem.textContent = `${confirmation.Nome} - Presença: ${confirmation.Presença} - Vai Beber: ${confirmation.Bebida}`;
//             confirmationList.appendChild(listItem);
//         });
//     } catch (error) {
//         console.error('Erro ao carregar confirmações:', error);
//         document.getElementById('responseMessage').innerText = 'Ocorreu um erro ao carregar a lista.';
//     }
// }

// // Captura o evento de submissão do formulário
// document.getElementById('confirmationForm').addEventListener('submit', async (event) => {
//     event.preventDefault(); // Impede o envio padrão do formulário

//     const name = document.getElementById('name').value;
//     const attendance = document.getElementById('attendance').value;
//     const drink = document.getElementById('drink').value;

//     try {
//         const response = await fetch('/api/submit', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name,
//                 attendance,
//                 drink
//             })
//         });

//         const result = await response.json();
//         document.getElementById('responseMessage').innerText = result.message;
//         loadConfirmations(); // Recarrega a lista de confirmações
//     } catch (error) {
//         console.error('Erro ao enviar confirmação:', error);
//         document.getElementById('responseMessage').innerText = 'Ocorreu um erro ao enviar a confirmação.';
//     }
// });

// // Carregar lista de confirmações ao iniciar
// document.addEventListener('DOMContentLoaded', loadConfirmations);
