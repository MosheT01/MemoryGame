let moveCounter=0;
let matchCounter=0;

let hasFlippedCard=false;
let firstCard,secondCard;
let cards;

let srcArray=["img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png","img8.png","img9.png","img10.png","img11.png","img12.png","img13.png","img14.png","img15.png","img1.png","img2.png","img3.png","img4.png","img5.png","img6.png","img7.png","img8.png","img9.png","img10.png","img11.png","img12.png","img13.png","img14.png","img15.png"];

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

function flipCard(){
    this.classList.add("flip");
    moveCounter++;
    updateScore();
    
    if(!hasFlippedCard){
        //first card click
        hasFlippedCard=true;
        firstCard=this;
        firstCard.removeEventListener("click",flipCard);
    } else{
        //second card click
        hasFlippedCard=false;
        secondCard=this;
        secondCard.removeEventListener("click",flipCard);
        
        

        if(firstCard.children.item("image").src==secondCard.children.item("image").src&&!(firstCard==secondCard)){
            //user made a match
            matchCounter++;
            updateScore();
            firstCard.removeEventListener("click",flipCard);
            secondCard.removeEventListener("click",flipCard);
           
        } else{
            //not a match
            firstCard.addEventListener("click",flipCard);
            secondCard.addEventListener("click",flipCard);
                
            setTimeout(()=>{
                firstCard.classList.remove("flip");
                secondCard.classList.remove("flip");
            },300);

        }
    }
}
function won(){
    alert("You WON!!!!!");
}

function updateScore(){
    let moves=document.getElementById("moves");
    let match=document.getElementById("matches");
    moves.innerHTML = moveCounter;
    match.innerHTML = matchCounter;
    if(matchCounter==15){
        won();
    }

}
function newGame(){
    moveCounter=0;
    matchCounter=0;
    shuffleArray(srcArray);
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        element.removeEventListener("click",flipCard);
        element.classList.remove("flip");
        element.addEventListener("click",flipCard);
        
        element.children.item("image").src=srcArray[index];
    }
    updateScore();

}
function main(){
    shuffleArray(srcArray);
    let newGameBTNN=document.getElementById("newGameBtn");
    newGameBTNN.addEventListener("click",newGame);


    cards=document.querySelectorAll(".grid-item");
    for (let index = 0; index < cards.length; index++) {
        const element = cards[index];
        element.children.item("image").src=srcArray[index];
        element.addEventListener("click",flipCard);
    }
    


}