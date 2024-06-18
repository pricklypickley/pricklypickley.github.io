let csvData = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('insurance.csv')
        .then(response => response.text())
        .then(data => {
            Papa.parse(data, {
                header: true,
                complete: function (results) {
                    csvData = results.data;
                    displayResults(csvData);
                }
            });
        })
        .catch(error => console.error('Error fetching the CSV file:', error));

    const inputFields = document.querySelectorAll('#searchForm input');
    inputFields.forEach(input => {
        input.addEventListener('input', filterData);
    });
});

function filterData() {
    const searchCriteria = {
        age: document.getElementById('age').value.trim(),
        sex: document.getElementById('sex').value.trim().toLowerCase(),
        bmi: document.getElementById('bmi').value.trim(),
        children: document.getElementById('children').value.trim(),
        smoker: document.getElementById('smoker').value.trim().toLowerCase(),
        region: document.getElementById('region').value.trim().toLowerCase(),
        charges: document.getElementById('charges').value.trim()
    };

    const filteredData = csvData.filter(row => {
        // Use || '' to provide a default empty string if the field is undefined
        const rowSex = (row.sex || '').toLowerCase();
        const rowSmoker = (row.smoker || '').trim().toLowerCase();

        // Check if criteria match or are empty
        return (searchCriteria.age === '' || row.age === searchCriteria.age) &&
            (searchCriteria.sex === '' || rowSex === searchCriteria.sex) &&
            (searchCriteria.bmi === '' || row.bmi === searchCriteria.bmi) &&
            (searchCriteria.children === '' || row.children === searchCriteria.children) &&
            (searchCriteria.smoker === '' ||
                (searchCriteria.smoker === 'y' && rowSmoker === 'yes') ||
                (searchCriteria.smoker === 'n' && rowSmoker === 'no')) &&
            (searchCriteria.region === '' || (row.region || '').toLowerCase() === searchCriteria.region) &&
            (searchCriteria.charges === '' || row.charges === searchCriteria.charges);
    });

    displayResults(filteredData);
}

function displayResults(filteredData) {
    const output = document.getElementById('output');
    output.innerHTML = '';
    if (filteredData.length === 0) {
        output.textContent = 'No results found';
    } else {
        filteredData.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.textContent = formatRow(row);
            output.appendChild(rowElement);
        });
    }

    // Always display the full dataset below the filtered results
    const fullDataOutput = document.createElement('div');
    fullDataOutput.id = 'fullDataOutput';
    fullDataOutput.innerHTML = '<h3>All Data:</h3>';
    csvData.forEach(row => {
        const rowElement = document.createElement('div');
        rowElement.textContent = formatRow(row);
        fullDataOutput.appendChild(rowElement);
    });
    output.appendChild(fullDataOutput);
}

function formatRow(row) {
    return `age: ${row.age}, sex: ${row.sex}, bmi: ${row.bmi}, children: ${row.children}, smoker: ${row.smoker}, region: ${row.region}, charges: ${row.charges}`;
}
