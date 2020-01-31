let dimensions = 16;
let shading = true;
let gridColor = "#941e00";
let randomColors = true;
init(dimensions);
dimensionDisplay(16);

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
            
        });
        board.appendChild(grid);
    };
};

//function for displaying the current dimensions
function dimensionDisplay(num) {
    const navBar = document.querySelector(".nav");
    if (document.querySelector(".dimensions")) {
        navBar.removeChild(document.querySelector(".dimensions"));
    };
    const dimSpan = document.createElement("span");
    const eraserIcon = document.querySelector(".fa-eraser");
    dimSpan.textContent = `${num} X ${num}`;
    dimSpan.style.float = "right";
    dimSpan.style.marginRight =".5%";
    dimSpan.classList.add("dimensions");
    navBar.insertBefore(dimSpan, eraserIcon);
    navBar.style.textAlign = "center";
};

//function for soft-resetting the board
function softReset() {
    const gridArr = document.querySelectorAll(".grid");

    gridArr.forEach(function(e) {
        e.style.backgroundColor = "#f9f9f9";
    });
};

//function to choose a random color at first, then progressively make the grid-item darker
function color(currentColor) {
    
    //console.log(currentColor);
    if (currentColor == "rgb(249, 249, 249)" && randomColors === true) {
        let r = Math.random() * 255;
        let g = Math.random() * 255;
        let b = Math.random() * 255;
        
        return `rgb(${r}, ${g}, ${b})`;
    } else if (currentColor == "rgb(249, 249, 249)") { 

        return gridColor;

    } else if (shading === true) { //darken the shade
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

//addEventListener for settings button
const settingsButton = document.querySelector("i");
settingsButton.addEventListener("click", setOpen);
//function to open settings window
function setOpen() {
    settingsButton.removeEventListener("click", setOpen);
    const setMenu = document.createElement("div");
    const exit = document.createElement("i");
    const gridForm = document.createElement("form");
    const range = document.createElement("input");
    const rangeLabel = document.createElement("label");
    const shadingInput = setShading();

    rangeLabel.textContent = "Grid Size: ";
    rangeLabel.setAttribute("for", "gridSize");
    range.setAttribute("type", "range");
    range.setAttribute("min", "16");
    range.setAttribute("max", "50");
    range.defaultValue = dimensions;
    range.setAttribute("id", "gridSize");
    range.addEventListener("input", () => changeGrid(range.value));
    range.addEventListener("input", () => dimensionDisplay(range.value));

    gridForm.appendChild(rangeLabel);
    gridForm.appendChild(range);
    gridForm.appendChild(shadingInput);
    gridForm.appendChild(colorPick());
    gridForm.classList.add("gridForm");

    exit.classList.add("fa-times-circle");
    exit.classList.add("fas");
    exit.addEventListener("click", () => setClose(setMenu));
   
    setMenu.classList.add("settings");
    document.querySelector("body").insertBefore(setMenu, document.querySelector("div"));

    setMenu.appendChild(gridForm);
    setMenu.appendChild(exit);
};

//function to change grid size
function changeGrid(num) {
    let gridArr = document.querySelectorAll(".grid");
    gridArr.forEach(function(e) {
        document.querySelector(".board-container").removeChild(e);
    });
    init(num);
    dimensionDisplay(num);
    dimensions = num;
};

//function to close the settings window
function setClose(setMenu) {
    document.querySelector("body").removeChild(setMenu);
    settingsButton.addEventListener("click", setOpen);
};

//function to set up the shading button, returns a span containing label and input
function setShading() {
    const container = document.createElement("span");
    const input = document.createElement("input");
    const label = document.createElement("label");
    label.textContent = "Shading: ";
    label.setAttribute("for", "shading");
    input.setAttribute("id", "shading");
    input.setAttribute("type", "checkbox");
    input.checked = shading;

    input.addEventListener("change", () => {
       
       shading = shading === false ? true : false;
    });

    container.appendChild(label);
    container.appendChild(input);
    return container;
};

//function to create color picker input
function colorPick() {
    const container = document.createElement("span");
    const inputRand = document.createElement("input");
    const inputCol = document.createElement("input");
    const label_1 = document.createElement("label");
    const label_2 = document.createElement("label");
    container.style.display = "block";
    container.classList.add("colorSpan");
    

    label_2.textContent = "||  Color ";
    label_2.setAttribute("for", "colPick");
    inputCol.setAttribute("id", "colPick");
    inputCol.setAttribute("type", "color");
    inputCol.value = gridColor;

    inputCol.addEventListener("input", () => {
        gridColor = inputCol.value;
    });


    label_1.textContent = "Sketch Color: Random";
    label_1.setAttribute("for", "randCheck");
    inputRand.setAttribute("id", "randCheck");
    inputRand.setAttribute("type", "checkbox");
    inputRand.checked = randomColors === true ? true : false;
    inputCol.disabled = randomColors === true ? true : false;

    inputRand.addEventListener("change", () => {
        randomColors = randomColors === false ? true : false;
        inputCol.disabled = inputCol.disabled === false ? true : false;
    });

    container.appendChild(label_1);
    container.appendChild(inputRand);
    container.appendChild(label_2);
    container.appendChild(inputCol);
    return container;
};

