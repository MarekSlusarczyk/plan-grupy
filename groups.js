function setCookie(name, value) {
    const date = new Date();
    let expiryDate;

    const currentYear = date.getFullYear();
    const nextYear = currentYear + 1;
    const september1st = new Date(currentYear, 8, 1);
    const june30th = new Date(nextYear, 5, 30);
    const august31st = new Date(currentYear, 7, 31);

    if (date >= september1st && date <= june30th) {
        expiryDate = june30th; 
    } else if (date >= new Date(currentYear, 5, 30) && date <= august31st) {
        expiryDate = august31st;
    } else {
        expiryDate = new Date(nextYear, 5, 30);
    }

    document.cookie = `${name}=${value};expires=${expiryDate.toUTCString()};path=/`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    const cookie = cookies.find(cookie => cookie.startsWith(name + "="));
    return cookie ? cookie.substring((name + "=").length) : null;
}

function saveCheckboxState(name, isChecked) {
    setCookie(name, isChecked ? "checked" : "unchecked");
}

function restoreCheckboxState(name) {
    const state = getCookie(name);
    return state === "checked";
}

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
        })

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
    checkboxesBox.innerHTML+=`<input type="checkbox" name="${e}">Ukryj ${e}<br>`;
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(e => {
    const isChecked = restoreCheckboxState(e.name);
    e.checked = isChecked;

    if (isChecked) {
        groupSubjects.forEach(group => {
            if (e.name == group.innerHTML.slice(-3)) {
                group.style.display = 'none';
                const n = group.nextElementSibling;
                const s = n.nextElementSibling;
                if (s.nextElementSibling !== null) {
                    s.nextElementSibling.style.display = 'none';
                }

                n.style.display = 'none';
                s.style.display = 'none';
            }
        });
    }
});

checkboxes.forEach(e => {
    e.addEventListener('change', function() {
        saveCheckboxState(e.name, e.checked);

        if (e.checked) {
            groupSubjects.forEach(group => {
                if (e.name == group.innerHTML.slice(-3)) {
                    group.style.display = 'none';
                    const n = group.nextElementSibling;
                    const s = n.nextElementSibling;
                    if (s.nextElementSibling !== null) {
                        s.nextElementSibling.style.display = 'none';
                    }

                    n.style.display = 'none';
                    s.style.display = 'none';
                }
            });
        } else {
            groupSubjects.forEach(group => {
                if (e.name == group.innerHTML.slice(-3)) {
                    group.style.display = 'inline-block';
                    const n = group.nextElementSibling;
                    const s = n.nextElementSibling;
                    if (s.nextElementSibling !== null) {
                        s.nextElementSibling.style.display = 'block';
                    }

                    n.style.display = 'inline-block';
                    s.style.display = 'inline-block';
                }
            });
        }
    });
});