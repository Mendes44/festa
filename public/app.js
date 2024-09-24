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

// Captura o evento de submissão do formulário
document.getElementById('confirmationForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    const name = document.getElementById('name').value;
    const attendance = document.getElementById('attendance').value;
    const drink = document.getElementById('drink').value;

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
