export class Questionnaire {
    static create(questionnaire) {
        return fetch('https://questionnaire-v1--app-default-rtdb.europe-west1.firebasedatabase.app/questionnaires.json', {
            method: 'POST',
            body: JSON.stringify(questionnaire),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(response => {
                questionnaire.id = response.name
                return questionnaire
            })
            .then(addToLocalStorage)
            .then(Questionnaire.renderList)
    }

    static renderList() {
        const allQuestionnaires = getQuestionnairesFromLocalStorage()

        const html = allQuestionnaires.length
            ? allQuestionnaires.map(toCard).join('')
            : `<div class="mui--text-headline">У вас пока нет заметок</div>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }
}

function addToLocalStorage(questionnaire) {
    const all = getQuestionnairesFromLocalStorage()
    all.push(questionnaire)
    localStorage.setItem('questionnaire', JSON.stringify(all))
}

function getQuestionnairesFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questionnaire') || '[]')
}

function toCard(questionnaire) {
    return `
        <div class="mui--text-black-54">
            ${new Date(questionnaire.date).toLocaleDateString()}
            ${new Date(questionnaire.date).toLocaleTimeString()}
        </div>
        <div>${questionnaire.text}</div>
        <br>
    `
}