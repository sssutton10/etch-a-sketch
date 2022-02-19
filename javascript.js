function populateGrid(n){
    let grid = document.querySelector('.grid-container')

    for(let i=0; i < n**2; i++){
        let div = document.createElement('div')
        div.classList.add('grid-square')
        div.style.width = 1/n*100 + '%'
        grid.append(div)
    }
}

function clearGrid(){
    let squares = document.querySelectorAll('.grid-square')
    squares.forEach(element => {element.remove()});
}