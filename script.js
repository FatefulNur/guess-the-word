const container = document.querySelector(".container"),
    scoreArea = container.querySelector(".score"),
    wordRemnantArea = container.querySelector(".words-remaining"),
    scrambleWord = document.getElementById("scramble-word"),
    hints = container.querySelector(".hints"),
    timeContainer = container.querySelector(".time-remaining"),
    inputword = document.getElementById("the-word"),
    refreshBtn = container.querySelector(".refresh"),
    checkBtn = container.querySelector(".check"),
    card = container.querySelector(".card")

let word = "",
    hint = "",
    score = 0,
    trial = 5,
    remainingTrial = trial,
    totalTime = 10,
    time = totalTime,
    remainingTime = totalTime,
    timer = 0

// fetch random data
const getRandomWord = () => {
    let randomDigit = Math.floor(Math.random() * data.length)
    word = data[randomDigit].word.toLowerCase()
    hint = data[randomDigit].hint
    let shuffled = word.split("").sort(() => Math.random() - 0.5).join("")

    if (word == shuffled) {
        return getRandomWord()
    }
    return [shuffled, hint]
}

// initialize data
const initializeData = () => {
    [shuffled, clue] = getRandomWord()
    scoreArea.innerText = `${score} out of ${trial}`
    wordRemnantArea.innerText = remainingTrial
    scrambleWord.innerText = shuffled
    hints.innerText = clue
    timeContainer.innerText = time + "s"

    clearInterval(timer)
    timer = setInterval(() => {
        if (time > 0) {
            time--
            return timeContainer.innerText = `${time}s`
        }
        resetGame()
    }, 1000)
}

// create result message
const createMessage = (msg, type) => {
    let div = document.createElement("div")
    div.setAttribute("id", "marks")
    div.className = type
    div.innerText = msg

    return div
}

// print output of your score
const gameResult = () => {
    let print = ""
    if(score < (trial * 0.33)) {
        print = createMessage(`Sorry you got ${score}`, "red")
    } else if(score < (trial * 0.5)) {
        print = createMessage(`Good you got ${score}`, "yellow")
    } else {
        print = createMessage(`Congratulation your got total ${score}`, "green")
    }
    card.appendChild(print)
}

// end the game
const gameOver = () => {
    clearInterval(timer)
    scoreArea.innerText = `${score} out of ${trial}`
    wordRemnantArea.innerText = 0
    scrambleWord.style.color = "tomato"
    scrambleWord.innerText = `Game is Over`
    hints.innerText = ""
    timeContainer.innerText = 0 + "s"

    inputword.classList.add("disabled")
    document.querySelectorAll("button").forEach(btn => btn.setAttribute("disabled", true))

    return gameResult();
}

const resetGame = () => {
    inputword.value = ""
    time = remainingTime
    initializeData()
    remainingTrial--
    if (remainingTrial < 0) {
        gameOver()
    }
}

// start the game
resetGame()

// input and button clicking events
refreshBtn.addEventListener("click", resetGame)
checkBtn.addEventListener("click", () => {
    if(inputword.value == "") {
        return alert("you must have to input a value")
    } else {
        if (inputword.value.toLowerCase() == word) {
            score++
            alert(`You answered correctly`)
            resetGame()
        } else {
            alert(`Wrong! the answer was ${word}`)
            resetGame()
        }
    }

})
inputword.addEventListener("input", e => {
    checkBtn.setAttribute("disabled", true)
    if (e.target.value.trim()) {
        checkBtn.removeAttribute("disabled")
    }
})