let vencimentoCount = 1;

function adicionarVencimento() {
    vencimentoCount++;
    const vencimentosDiv = document.getElementById('vencimentos');
    const newVencimento = document.createElement('div');
    newVencimento.id = `vencimento${vencimentoCount}-container`;
    newVencimento.innerHTML = `<label for="vencimento${vencimentoCount}">${vencimentoCount}º vencimento:</label>
                               <input type="date" id="vencimento${vencimentoCount}" class="vencimento">
                               <button onclick="removerVencimento('vencimento${vencimentoCount}-container')">-</button>`;
    vencimentosDiv.appendChild(newVencimento);
}

function removerVencimento(id) {
    const vencimentoElement = document.getElementById(id);
    vencimentoElement.remove();
    atualizarVencimentos();
}

function atualizarVencimentos() {
    const vencimentosDiv = document.getElementById('vencimentos');
    const vencimentos = vencimentosDiv.querySelectorAll('div');
    vencimentoCount = vencimentos.length;
    vencimentos.forEach((vencimentoDiv, index) => {
        const label = vencimentoDiv.querySelector('label');
        const input = vencimentoDiv.querySelector('input');
        const button = vencimentoDiv.querySelector('button');
        const newId = `vencimento${index + 1}`;
        vencimentoDiv.id = `${newId}-container`;
        label.setAttribute('for', newId);
        label.innerText = `${index + 1}º vencimento:`;
        input.id = newId;
        button.setAttribute('onclick', `removerVencimento('${newId}-container')`);
    });
}

function calcularVencimentos() {
    const dataInicial = new Date(document.getElementById('dataInicial').value);
    const vencimentos = document.querySelectorAll('.vencimento');
    const resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (isNaN(dataInicial.getTime())) {
        resultadoDiv.innerHTML = '<p>Por favor, insira uma data inicial válida.</p>';
        return;
    }

    let hasValidVencimentos = false;

    vencimentos.forEach((vencimentoInput, index) => {
        if (vencimentoInput.value) {
            const vencimentoDate = new Date(vencimentoInput.value);
            
            if (!isNaN(vencimentoDate.getTime())) {
                hasValidVencimentos = true;
                const diffTime = Math.abs(vencimentoDate - dataInicial);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                resultadoDiv.innerHTML += `<p>${index + 1}º vencimento: ${diffDays} dias</p>`;
            } else {
                resultadoDiv.innerHTML += `<p>${index + 1}º vencimento: Data inválida</p>`;
            }
        }
    });

    if (!hasValidVencimentos) {
        resultadoDiv.innerHTML = '<p>Por favor, insira pelo menos uma data de vencimento válida.</p>';
    }
}

// Initialize event listeners when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for buttons if they exist
    const addButton = document.querySelector('button[onclick="adicionarVencimento()"]');
    if (addButton) {
        addButton.removeAttribute('onclick');
        addButton.addEventListener('click', adicionarVencimento);
    }
    
    const calcButton = document.querySelector('button[onclick="calcularVencimentos()"]');
    if (calcButton) {
        calcButton.removeAttribute('onclick');
        calcButton.addEventListener('click', calcularVencimentos);
    }
    
    // Set up event delegation for remove buttons
    document.getElementById('vencimentos').addEventListener('click', function(e) {
        if (e.target.tagName === 'BUTTON' && e.target.textContent === '-') {
            const containerId = e.target.closest('div').id;
            if (containerId) {
                e.preventDefault();
                removerVencimento(containerId);
            }
        }
    });
});