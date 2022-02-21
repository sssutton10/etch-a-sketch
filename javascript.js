// Global variables
let grid = document.querySelector('.grid-container')

// Toggleable boolean variables
let enableColor = false
let rainbow = false
let erase = false

// Color picker variables
let selectedColorSquare = document.querySelector('#default-color')
selectedColorSquare.classList.toggle('selected-color')

let colorList = ['darkred', 'firebrick', 'red', 'orangered', 'orange',
                 'darkorange', 'yellow', 'gold', 'goldenrod', 'darkgoldenrod',
                 'lime', 'green', 'darkgreen', 'turquoise', 'lightskyblue',
                 'deepskyblue', 'dodgerblue', 'blue', 'navy', 'mediumpurple',
                 'purple', 'indigo', 'silver', 'gray', 'black']

grid.addEventListener('mousedown', function(e){
    enableColor = true
    e.preventDefault()
})
grid.addEventListener('mouseup', function(e) {
    enableColor = false
    e.preventDefault()
})

function randomInt(min, max){
    return Math.floor(Math.random() * (max-min+1)) + min
}

function randomRGBAColor(){
    let r = randomInt(0,255)
    let g = randomInt(0,255)
    let b = randomInt(0,255)
    let a = Math.random()

    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')'
}

function addColor(e){
    if (erase && (enableColor || e.type == 'mousedown')){
        this.style.background = 'white'
    }
    else if (rainbow && (enableColor || e.type == 'mousedown')){
        if(this.getAttribute('data-passCount') == 0){
            this.style.backgroundColor = randomRGBAColor()
            this.setAttribute('data-passCount', parseInt(this.getAttribute('data-passCount') + 1))
        }
        // else{
        //     tilBlack = 10 - parseInt(this.getAttribute('data-passCount'))

        // }
        
    }
    else if (enableColor || e.type == 'mousedown'){
        this.style.background = selectedColorSquare.style.backgroundColor
    }
}

function populateGrid(n){
    clearGrid()
    for(let i=0; i < n**2; i++){
        let div = document.createElement('div')
        div.classList.add('grid-square')
        div.style.width = 1/n*100 + '%'
        div.setAttribute('data-passCount', 0)
        div.addEventListener('mouseover', addColor)
        div.addEventListener('mousedown', addColor)
        grid.append(div)
    }
}

function resetGrid(){
    let squares = document.querySelectorAll('.grid-square')
    squares.forEach(element => {element.style.backgroundColor = 'white'});
}

function clearGrid(){
    let squares = document.querySelectorAll('.grid-square')
    squares.forEach(element => {element.remove()});
}

function colorSelect(){
    selectedColorSquare.classList.toggle('selected-color')
    selectedColorSquare = this
    this.classList.toggle('selected-color')
    erase = false
    rainbow=false
}

let tableCells = document.querySelectorAll('td')
tableCells.forEach(element => element.addEventListener('click', colorSelect))

function populateColors(){
    for(let i = 0; i < 25; i++){
        Array.from(tableCells)[i].style.backgroundColor = colorList[i]
    }
}
populateColors()

let eraseButton = document.querySelector('.erase')
eraseButton.onclick = function(){
    erase=true
    rainbow=false
}

let resetButton = document.querySelector('.reset')
resetButton.onclick = resetGrid

function sizeChange(e){
    clearGrid()
    populateGrid(this.valueAsNumber)
}

let gridSize = document.querySelector('#grid-size')
gridSize.addEventListener('change', sizeChange)

let rainbowButton = document.querySelector('.rainbow')
rainbowButton.onclick = function(){
    rainbow=true
    erase=false
}

// Set default gridsize to 4x4
populateGrid(16)
