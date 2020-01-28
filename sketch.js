let dimensions = 16;
init(dimensions);

//function to initialize the board
function init(num) {
    const board = document.querySelector(".board-container");
    for (var i = 0; i < num*num; i++){
        let grid = document.createElement("div");
        
        grid.classList.add("grid");
        grid.style.width = `${100/num}%`;
        grid.style.height = `${100/num}%`;
        grid.addEventListener("mouseover", function(){
            let styles = window.getComputedStyle(grid);
            grid.style.backgroundColor = color(styles.getPropertyValue("background-color"));
            //console.log("testing!");
        });
        board.appendChild(grid);
    };
};

//function for soft-resetting the board
function softReset() {
    const board = document.querySelector(".board-container");
    const gridArr = document.querySelectorAll(".grid");

    gridArr.forEach(function(e) {
        e.style.backgroundColor = "#f9f9f9";
    });
};

//function to choose a random color at first, then progressively make the grid-item darker
function color(currentColor) {
    
    console.log(currentColor);
    if (currentColor == "rgb(249, 249, 249)") {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        
        return `rgb(${r}, ${g}, ${b})`;
    } else { //darken the shade
        let shade = 0.8;
        let rgb = rgbGet(currentColor);
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];

        r *= shade;
        g *= shade;
        b *= shade;

        return `rgb(${r}, ${g}, ${b})`;
    };
};

//addEventListener to erase button
const eraser = document.querySelector(".fa-eraser");
eraser.addEventListener("click", softReset);

//function to get rgb values from a string
function rgbGet(currentColor) {
    let str = currentColor.slice(4);
    let r = str.slice(0, str.indexOf(','));
    str = str.slice(str.indexOf(',')+2);
    let g = str.slice(0, str.indexOf(','));
    str = str.slice(str.indexOf(',')+2);
    let b = str.slice(0, str.indexOf(')'));
    
    return [r, g, b];
};