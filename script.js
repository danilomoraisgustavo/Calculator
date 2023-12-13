document.addEventListener('DOMContentLoaded', function() {
    let display = document.getElementById('display');
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let isCalculated = false;

    // Atualiza o display com o valor fornecido
    function updateDisplay(value) {
        display.textContent = value;
    }

    // Reseta a calculadora para o estado inicial
    function resetCalculator() {
        currentInput = '0';
        previousInput = '';
        operation = null;
        isCalculated = false;
        updateDisplay(currentInput);
    }

    // Realiza o cálculo baseado nos inputs e na operação
    function performCalculation(a, b, op) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (isNaN(a) || isNaN(b)) return 'Error';
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : 'Error';
            default: return 'Error';
        }
    }

    // Adiciona funcionalidade de clique para todos os botões numéricos e ponto
    document.querySelectorAll('.btn:not(.operator, .special)').forEach(function(button) {
        button.addEventListener('click', function() {
            if (isCalculated || currentInput === '0') {
                currentInput = '';
                isCalculated = false;
            }
            if (this.textContent === '.' && currentInput.includes('.')) {
                return; // Evita múltiplos pontos decimais
            }
            currentInput += this.textContent;
            updateDisplay(currentInput);
        });
    });

    // Adiciona funcionalidade de clique para os botões de operação
    document.querySelectorAll('.operator').forEach(function(button) {
        button.addEventListener('click', function() {
            if (previousInput !== '' && currentInput !== '' && operation) {
                previousInput = String(performCalculation(previousInput, currentInput, operation));
                updateDisplay(previousInput);
                currentInput = '';
            } else if (currentInput !== '') {
                previousInput = currentInput;
                currentInput = '';
            }
            operation = this.textContent;
            isCalculated = false;
        });
    });

    // Adiciona funcionalidade de clique para o botão de igualdade
    document.getElementById('equals').addEventListener('click', function() {
        if (operation && previousInput !== '' && currentInput !== '') {
            currentInput = String(performCalculation(previousInput, currentInput, operation));
            updateDisplay(currentInput);
            previousInput = '';
            operation = null;
            isCalculated = true;
        }
    });

    // Adiciona funcionalidade de clique para o botão especial 'AC', que limpa a calculadora
    document.querySelectorAll('.btn.special').forEach(function(button) {
        button.addEventListener('click', function() {
            if (this.textContent === 'AC') {
                resetCalculator();
            }
        });
    });

    // Adiciona funcionalidade para alternar entre os estilos da calculadora
    let styleSelector = document.getElementById('styleSelect');
    styleSelector.addEventListener('change', function() {
        let calculator = document.querySelector('.calculator');
        calculator.className = 'calculator'; // Remove todas as classes existentes
        calculator.classList.add(`calculator-${this.value}`); // Adiciona a nova classe com base na seleção
    });
});

