// Data for unit conversion
const unitData = {
    length: {
        emoji: '📏',
        units: ['meter', 'kilometer', 'centimeter', 'inch', 'foot'],
        conversion: {
            meter: { kilometer: 0.001, centimeter: 100, inch: 39.3701, foot: 3.28084 },
            kilometer: { meter: 1000, centimeter: 100000, inch: 39370.1, foot: 3280.84 },
            centimeter: { meter: 0.01, kilometer: 0.00001, inch: 0.393701, foot: 0.0328084 },
            inch: { meter: 0.0254, kilometer: 0.0000254, centimeter: 2.54, foot: 0.0833333 },
            foot: { meter: 0.3048, kilometer: 0.0003048, centimeter: 30.48, inch: 12 }
        }
    },
    weight: {
        emoji: '⚖️',
        units: ['gram', 'kilogram', 'pound', 'ounce'],
        conversion: {
            gram: { kilogram: 0.001, pound: 0.00220462, ounce: 0.035274 },
            kilogram: { gram: 1000, pound: 2.20462, ounce: 35.274 },
            pound: { gram: 453.592, kilogram: 0.453592, ounce: 16 },
            ounce: { gram: 28.3495, kilogram: 0.0283495, pound: 0.0625 }
        }
    },
    temperature: {
        emoji: '🌡️',
        units: ['celsius', 'fahrenheit', 'kelvin']
    }
};

const tabs = document.querySelectorAll('.tab');
const emojiDiv = document.getElementById('emoji');
const fromUnitSelect = document.getElementById('from-unit');
const toUnitSelect = document.getElementById('to-unit');
const convertButton = document.getElementById('convert-button');
const resultDiv = document.getElementById('result');

function populateUnits(selectedType) {
    const units = unitData[selectedType].units;
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    units.forEach(unit => {
        const option = `<option value="${unit}">${unit.charAt(0).toUpperCase() + unit.slice(1)}</option>`;
        fromUnitSelect.innerHTML += option;
        toUnitSelect.innerHTML += option;
    });
}

function updateTab(selectedType) {
    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.type === selectedType);
    });

    emojiDiv.textContent = unitData[selectedType].emoji;

    populateUnits(selectedType);
}

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const selectedType = tab.dataset.type;
        updateTab(selectedType);
    });
});

function convertValue() {
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const selectedType = document.querySelector('.tab.active').dataset.type;

    if (isNaN(inputValue)) {
        resultDiv.textContent = 'Please enter a valid number';
        return;
    }

    let convertedValue;

    if (selectedType === 'temperature') {
        if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
            convertedValue = (inputValue * 9/5) + 32;
        } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
            convertedValue = inputValue + 273.15;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
            convertedValue = (inputValue - 32) * 5/9;
        } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
            convertedValue = ((inputValue - 32) * 5/9) + 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
            convertedValue = inputValue - 273.15;
        } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
            convertedValue = ((inputValue - 273.15) * 9/5) + 32;
        } else {
            convertedValue = inputValue; // Same unit
        }
    } else {
        const conversionTable = unitData[selectedType].conversion;

        if (fromUnit === toUnit) {
            convertedValue = inputValue;
        } else {
            const factor = conversionTable[fromUnit][toUnit];
            convertedValue = inputValue * factor;
        }
    }

    resultDiv.textContent = `Result: ${convertedValue.toFixed(2)} ${toUnit}`;
}

convertButton.addEventListener('click', convertValue);

updateTab('length');