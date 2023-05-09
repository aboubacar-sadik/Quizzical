import { data } from './data.js'



const container = document.getElementById('container')
const startBtn = document.getElementById('start-btn')
const checkBtn = document.getElementById('check-btn')
const playAgainBtn = document.getElementById('play-again-btn')
const introPage = document.querySelector('.intro-page')
const resultAndScore = document.querySelector('.results-and-score')
const scoreSpan = document.getElementById('score')
const addS = document.getElementById('add-s')

startBtn.addEventListener('click', () => {
    container.classList.add('container-flex')
    introPage.style.display = 'none'
    container.append(renderQuizPage())
    checkBtn.style.display = 'block'
})

playAgainBtn.addEventListener('click', () => {
    score = 0;
    scoreSpan.textContent = score;

    const quizPage = document.querySelector('.questions-page');
    quizPage.remove();

    introPage.style.display = 'block';
    checkBtn.style.display = 'none';
    resultAndScore.style.display = 'none';

    container.classList.remove('container-flex')

    const answersSpanArray = Array.from(document.getElementsByClassName('answer'));
    answersSpanArray.forEach(answer => {
        answer.classList.remove('selected', 'correct', 'incorrect', 'non-selected');
        answer.style.cursor = 'pointer';
    });
});


let score = 0

function renderQuizPage() {
    const quizPage = document.createElement('div')
    quizPage.classList.add('questions-page')

    data.forEach(obj => {
        const questionsGroup = document.createElement('div')
        questionsGroup.classList.add('questions-group')

        const question = document.createElement('h2')
        question.classList.add('question')

        const answersGroup = document.createElement('div')
        answersGroup.classList.add('answers')


        const allAnswers = shuffleArray(obj.incorrect_answers.concat(obj.correct_answer))
        obj.allAnswers = allAnswers

        question.textContent = obj.question

        for (let ans of obj.allAnswers) {
            const answer = document.createElement('span')
            answer.classList.add('answer')
            answer.textContent = ans
            answersGroup.append(answer)
        }

        const answersSpanArray = Array.from(answersGroup.getElementsByTagName("span"));
        answersSpanArray.forEach(answer => {
            answer.addEventListener('click', e => {
                const currentEl = e.target
                const nonSelected = answersSpanArray.filter(el => el !== currentEl)

                currentEl.classList.add('selected')
                nonSelected.forEach(el => el.classList.remove('selected'))
            })
        })

        checkBtn.addEventListener('click', () => {

            answersSpanArray.forEach(answer => {
                answer.addEventListener('click', e => {
                    e.target.classList.remove('selected')
                })

                if (answer.classList.contains('selected') && answer.textContent === obj.correct_answer) {
                    answer.classList.add('correct')
                    score++
                } else if (answer.classList.contains('selected') && answer.textContent !== obj.correct_answer) {
                    answer.classList.add('incorrect')
                } else {
                    answer.classList.add('non-selected')
                    answer.classList.remove('selected')
                }
                answer.style.cursor = 'default'
            })
            score > 1 ? addS.textContent = 's' : addS.textContent = null
            scoreSpan.textContent = score

            checkBtn.style.display = 'none'
            resultAndScore.style.display = 'flex'

            quizPage.append(resultAndScore)
        })

        questionsGroup.append(question, answersGroup)

        quizPage.append(questionsGroup, checkBtn)
    })

    return quizPage
}

function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}



