const voltageInput = document.getElementById('voltage');
const currentInput = document.getElementById('current');
const resistanceInput = document.getElementById('resistance');
const calculateBtn = document.getElementById('calculateBtn');
const resetBtn = document.getElementById('resetBtn');
const graphCanvas = document.getElementById('ohmGraph').getContext('2d');

let graphData = {
    labels: [],
    datasets: [{
        label: 'Voltaje (V)',
        borderColor: 'red',
        data: [],
        fill: false
    },
    {
        label: 'Corriente (I)',
        borderColor: 'blue',
        data: [],
        fill: false
    },
    {
        label: 'Resistencia (R)',
        borderColor: 'green',
        data: [],
        fill: false
    }]
};

let chart = new Chart(graphCanvas, {
    type: 'line',
    data: graphData,
    options: {
        responsive: true,
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                    text: 'Número de Cálculo'
                }
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Valores'
                }
            }
        }
    }
});

function calcular() {
    const voltage = parseFloat(voltageInput.value);
    const current = parseFloat(currentInput.value);
    const resistance = parseFloat(resistanceInput.value);
    
    if (!isNaN(voltage) && !isNaN(current)) {
        resistanceInput.value = (voltage / current).toFixed(2);
    } else if (!isNaN(voltage) && !isNaN(resistance)) {
        currentInput.value = (voltage / resistance).toFixed(2);
    } else if (!isNaN(current) && !isNaN(resistance)) {
        voltageInput.value = (current * resistance).toFixed(2);
    }

    updateGraph();
}

function updateGraph() {
    const voltage = parseFloat(voltageInput.value);
    const current = parseFloat(currentInput.value);
    const resistance = parseFloat(resistanceInput.value);
    const calculationNumber = graphData.labels.length + 1;

    if (!isNaN(voltage) && !isNaN(current) && !isNaN(resistance)) {
        graphData.labels.push(calculationNumber);
        graphData.datasets[0].data.push(voltage);
        graphData.datasets[1].data.push(current);
        graphData.datasets[2].data.push(resistance);
        chart.update();
    }
}

function resetear() {
    voltageInput.value = '';
    currentInput.value = '';
    resistanceInput.value = '';
    graphData.labels = [];
    graphData.datasets.forEach(dataset => dataset.data = []);
    chart.update();
}

function toggleInfo(infoId) {
    const infoPopup = document.getElementById(infoId);
    if (infoPopup.style.display === 'none' || infoPopup.style.display === '') {
        infoPopup.style.display = 'block';
    } else {
        infoPopup.style.display = 'none';
    }
}

calculateBtn.addEventListener('click', calcular);
resetBtn.addEventListener('click', resetear);
