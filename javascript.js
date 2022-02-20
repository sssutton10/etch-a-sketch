// Global variables
let grid = document.querySelector('.grid-container')
let enableColor = false
let selectedColorSquare = document.querySelector('#default-color')
selectedColorSquare.classList.toggle('selected-color')

let colorList = ['darkred', 'firebrick', 'red', 'redorange', 'orange',
                 'darkorange', 'yellow', 'gold', 'goldenrod', 'darkgoldenrod',
                 'lime', 'green', 'darkgreen', 'turquoise', 'lightskyblue',
                 'deepskyblue', 'dodgerblue', 'blue', 'navy', 'mediumpurple',
                 'purple', 'indigo', 'silver', 'gray', 'black']

grid.addEventListener('mousedown', () => enableColor = true)
grid.addEventListener('mouseup', () => enableColor = false)

function addColor(e){
    if (enableColor || e.type == 'mousedown'){
        this.style.background = selectedColorSquare.style.backgroundColor
    }
}

function populateGrid(n){
    for(let i=0; i < n**2; i++){
        let div = document.createElement('div')
        div.classList.add('grid-square')
        div.style.width = 1/n*100 + '%'
        grid.append(div)
        div.addEventListener('mouseover', addColor)
        div.addEventListener('mousedown', addColor)
    }
}

// Set default gridsize to 4x4
populateGrid(4)

function clearGrid(){
    let squares = document.querySelectorAll('.grid-square')
    squares.forEach(element => {element.remove()});
}

function colorSelect(){
    selectedColorSquare.classList.toggle('selected-color')
    selectedColorSquare = this
    this.classList.toggle('selected-color')
}

let tableCells = document.querySelectorAll('td')
tableCells.forEach(element => element.addEventListener('click', colorSelect))

function populateColors(){
    for(let i = 0; i < 25; i++){
        Array.from(tableCells)[i].style.backgroundColor = colorList[i]
    }
}

populateColors()



