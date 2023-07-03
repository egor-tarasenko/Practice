let array = []
let index = 1

function levels(level) {
    let v = {
        id: 'circle' + index,
        x: 0,
        y: 415,
        level: level,
    }
    index++

    let div = document.createElement('div')
    div.id = v.id
    div.classList.add(level === 1 ? 'elem' : 'elem2')
    document.getElementById('body').append(div)
    array.push(v)
}

function getRandomInterval() {
    const intervals = [3000, 4000, 5000]
    const randomIndex = Math.floor(Math.random() * intervals.length)
    return intervals[randomIndex]
}

function runRandomInterval() {
    function getRandomInt(max) {
        return Math.floor(Math.random() * 2)
    }

    let number = getRandomInt(2)
    if (number === 0) {
        levels(1)
    } else if (number === 1) {
        levels(2)
    }
    const randomInterval = getRandomInterval()
    setTimeout(runRandomInterval, randomInterval)
}

runRandomInterval()


setInterval(function () {
    for (let i = 0; i < array.length; i++) {
        let v = array[i]
        v.x += 20;
        if (v.x > 1300) {
            array.splice(i, 1)
            let div = document.getElementById(v.id)
            if (div) {
                div.remove()
            }
            continue
        }
        let div = document.getElementById(v.id)
        if (div) {
            div.style.right = v.x + 'px'
            div.style.top = v.y + 'px'
            handler(v)
        }
    }
}, 100)

// Jumper
let x = 1050
let y = 455

function setX(x) {
    document.getElementById('block').style.right = x + 'px'
}

function setY(y) {
    document.getElementById('block').style.top = y + 'px'
}

setX(x)
setY(y)


document.addEventListener('keydown', function (click) {
    if (click.code === 'ArrowUp') {
        document.getElementById('block').classList.add('transition')
        y -= 150
        setY(y)

        setTimeout(function () {
            document.getElementById('block').classList.remove('transition')
            y += 150
            setY(y)
        }, 1000)
    }
})
let life = 3


function handler(v) {
    if (x >= v.x - 40 &&
        x <= v.x + 40 &&
        y >= v.y - 40 &&
        y <= v.y + 40) {
        let lifeId = 'life' + life
        let lifeElement = document.getElementById(lifeId)
        if (lifeElement) {
            lifeElement.style.display = 'none'
        }
        life -= 1

        let index = [...array].findIndex((item) => {
            item.id === v.id
        })
        if (index !== -1) {
            array.splice(index, 1)
        }
        let div = document.getElementById(v.id)
        if (div) {
            div.remove()
        }
        if (life === 0) {
            let over = document.querySelector('.game-over-block')
            if (over) {
                over.style.display = 'block'
            }
        }
    }
}

function restart() {
    for (let i = 0; i < array.length; i++){
        let div = document.getElementById(array[i].id)
        if (div) {
            div.remove()
        }
    }
    array = []
    index = 1
    x = 1050
    y = 455
    life = 3

    let life1 = document.getElementById('life1')
    life1.style.display = 'block'

    let life2 = document.getElementById('life2')
    life2.style.display = 'block'

    let life3 = document.getElementById('life3')
    life3.style.display = 'block'

    setX(x)
    setY(y)

    let over = document.querySelector('.game-over-block')
    if (over) {
        over.style.display = 'none'
    }
}

