let csvData = [];

document.addEventListener('DOMContentLoaded', function () {
    fetch('insurance.csv')
        .then(response => response.text())
        .then(data => {
            Papa.parse(data, {
                header: true, // If your CSV has headers
                complete: function (results) {
                    csvData = results.data; // Store parsed data
                    displayResults(csvData); // Display all data initially
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
        age: document.getElementById('age').value,
        sex: document.getElementById('sex').value.toLowerCase(),
        bmi: document.getElementById('bmi').value,
        children: document.getElementById('children').value,
        smoker: document.getElementById('smoker').value.trim().toLowerCase(), // Trim whitespace
        region: document.getElementById('region').value.toLowerCase(),
        charges: document.getElementById('charges').value
    };

    const filteredData = csvData.filter(row => {
        // Convert row.smoker to lowercase and trim whitespace
        const rowSmoker = (row.smoker || '').trim().toLowerCase();

        // Check if smoker criteria is empty or matches 'yes' or 'no'
        return (searchCriteria.age === '' || row.age == searchCriteria.age) &&
            (searchCriteria.sex === '' || row.sex.toLowerCase() == searchCriteria.sex) &&
            (searchCriteria.bmi === '' || row.bmi == searchCriteria.bmi) &&
            (searchCriteria.children === '' || row.children == searchCriteria.children) &&
            (searchCriteria.smoker === '' || 
                (searchCriteria.smoker === 'y' && rowSmoker === 'yes') || 
                (searchCriteria.smoker === 'n' && rowSmoker === 'no')) &&
            (searchCriteria.region === '' || row.region.toLowerCase() == searchCriteria.region) &&
            (searchCriteria.charges === '' || row.charges == searchCriteria.charges);
    });

    displayResults(filteredData);
}

function displayResults(data) {
    const output = document.getElementById('output');
    output.innerHTML = '';
    if (data.length === 0) {
        output.textContent = 'No results found';
    } else {
        data.forEach(row => {
            const rowElement = document.createElement('div');
            rowElement.textContent = formatRow(row);
            output.appendChild(rowElement);
        });
    }
}

function formatRow(row) {
    return `age: ${row.age}, sex: ${row.sex}, bmi: ${row.bmi}, children: ${row.children}, smoker: ${row.smoker}, region: ${row.region}, charges: ${row.charges}`;
}
