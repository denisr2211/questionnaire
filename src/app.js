import { Questionnaire } from './questionnaire'
import {isValid} from './utils'
import './styles.css' 

const form = document.getElementById('form')
const input = form.querySelector('#questionnaire-input')
const submitBtn = form.querySelector('#submit')


window.addEventListener('load', Questionnaire.renderList)
form.addEventListener('submit', submitFormHandler)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault()

    if (isValid(input.value)) {
        const questionnaire = {
            text: input.value.trim(), // trim - удаляет лишние пробелы
            date: new Date().toJSON()
        }

        submitBtn.disabled = true
        // Async request to server to save question
        Questionnaire.create(questionnaire).then(() => {
            input.value = ''
            input.className = ''
            submitBtn.disabled = false
        })
    }
}