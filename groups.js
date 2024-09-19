const spanElement = document.querySelector('.tytulnapis');
const prefix = spanElement ? spanElement.textContent.slice(0, 2) : '';

document.addEventListener('DOMContentLoaded', () => {
    const data = new FormData();
    data.append('get_cookies', 'true');

    fetch('cookies.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.json())
    .then(data => {
        checkboxesData.forEach(e => {
            const cookieName = `${prefix}_${e}`;
            if (data[cookieName] === "checked") {
                const checkbox = document.querySelector(`input[name="${e}"]`);
                checkbox.checked = true;
                setGroup(e, checkbox.checked);
            }
        });
    })
    .catch(error => console.error('Błąd podczas pobierania danych cookie: ', error));
});

const p = document.querySelectorAll('.p');
const checkboxesBox = document.querySelector('.checkboxes');

const groupSubjects = [];
const checkboxesData = [];

p.forEach(e => {
    const lastFourChars = e.innerHTML.slice(-4);
    const lastThreeChars = e.innerHTML.slice(-3);
    let minusChar = lastFourChars[0] == '-' ? true : false;
    let slashChar = lastFourChars[2] == '/' ? true : false;
    if (minusChar && slashChar) {
        groupSubjects.push(e);

        let checkboxesDataCount = 0;
        checkboxesData.forEach(c => {
            if (c !== lastThreeChars) {
                checkboxesDataCount++;
            }
        });

        if (checkboxesDataCount === checkboxesData.length) {
            checkboxesData.push(lastThreeChars);
        }
    }
});

checkboxesData.sort((a, b) => {
    const [a1, a2] = a.split('/').map(Number);
    const [b1, b2] = b.split('/').map(Number);
    
    if (a2 !== b2) {
        return a2 - b2;
    }
    
    return a1 - b1;
});

checkboxesData.forEach(e => {
    checkboxesBox.innerHTML += `<input type="checkbox" name="${e}"> Ukryj ${e}<br>`;
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(e => {
    e.addEventListener('change', function() {
        saveCheckboxState(e.name, e.checked);
        setGroup(e.name, e.checked);
    });
});

function saveCheckboxState(name, isChecked) {
    const cookieName = `${prefix}_${name}`;
    const data = new FormData();
    data.append('cookieName', cookieName);
    data.append('cookieValue', isChecked ? 'checked' : 'unchecked');

    fetch('cookies.php', {
        method: 'POST',
        body: data
    })
    .then(response => response.text())
    .then(data => {
        console.log('Zapisano plik cookie: ', data);
    })
    .catch(error => {
        console.error('Błąd podczas zapisu pliku cookie: ', error);
    });
}

function setGroup(name, checked) {
    let displayValue = checked ? 'none' : 'inline-block';
    groupSubjects.forEach(group => {
        if (name === group.innerHTML.slice(-3)) {
            group.style.display = displayValue;
            const n = group.nextElementSibling;
            const s = n.nextElementSibling;
            if (s.nextElementSibling !== null) {
                s.nextElementSibling.style.display = displayValue;
            }
            n.style.display = displayValue;
            s.style.display = displayValue;
        }
    });
}
