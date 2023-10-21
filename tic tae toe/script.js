// fetch variables

const displayCurrPlayer = document.querySelector(".gameinfo");
const boxes = document.querySelectorAll(".box");
const newGame = document.querySelector(".btn");

let cnt=0;
let currplayer = 'X';
let grid=["","","","","","","","",""];
const winnerlist =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]


intializeGame();
//function

function intializeGame(){
    currplayer = 'X';
    displayCurrPlayer.innerText=`Current player : ${currplayer}`;
    let grid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText="";
        box.classList.remove("selected");
        boxes[index].style.pointerEvents = "all";
    })
    newGame.classList.remove("active");
}

function swap(){
    if(currplayer === "X"){
        currplayer = "O";displayCurrPlayer.innerText=`Current player : ${currplayer}`;
    }
    else{
        currplayer = "X";displayCurrPlayer.innerText=`Current player : ${currplayer}`;
    }
}

function applychanges(index){
    if(grid[index] === ""){
        cnt++;
        grid[index] = currplayer;
        boxes[index].innerText=currplayer;
        boxes[index].style.pointerEvents="none";
        swap();
        
        //check game over
        checkwinner();
    }
}

function  checkwinner(){
    let winner= "";

    winnerlist.forEach((position)=>{
        if(grid[position[0]]!== "" && grid[position[1]]!== "" && grid[position[2]]!== "" && grid[position[0]]==grid[position[1]] && grid[position[0]]==grid[position[2]] && grid[position[2]]==grid[position[1]] ){
            winner=grid[position[0]];
            boxes[position[0]].classList.add("selected");
            boxes[position[1]].classList.add("selected");
            boxes[position[2]].classList.add("selected");

             boxes.forEach((box)=>{
                box.style.pointerEvents='none';
            })
        }
    })

    if(winner !== ""){
        displayCurrPlayer.innerText=`Winner : ${winner}`;
        newGame.classList.add("active");
    }
    if(cnt === 9){
        displayCurrPlayer.innerText=`Match Drawn`;
        newGame.classList.add("active");
    }

}

//eventlistner
boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{
        applychanges(index);
        console.log(index);
    });
})

newGame.addEventListener("click",()=>{intializeGame();});
