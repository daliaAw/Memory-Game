// Get the game board element
const gameBoard = document.getElementById("game-board");
const playerLivesCount = document.getElementById("playerLivesCount");

let playerLives = 20;
playerLivesCount.textContent = playerLives

// Array of images
const images =[
     "./images/a.JPG", "./images/b.JPG", "./images/c.JPG", "./images/d.JPG", "./images/e.JPG", "./images/f.JPG", "./images/g.JPG", "./images/h.JPG",
     "./images/a.JPG", "./images/b.JPG", "./images/c.JPG", "./images/d.JPG", "./images/e.JPG", "./images/f.JPG", "./images/g.JPG", "./images/h.JPG"
];

// Shuffle the images
function shuffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create the game board with shuffled images
function createBoard() {
    const shuffledImages = shuffleImages(images);
    shuffledImages.forEach((image) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");

        card.className = "card";
        face.className = "face";        
        back.className = "back";

        card.setAttribute("data-image", image);
        face.dataset.image = image;
        face.style.backgroundImage = `url(${image})`; 


        card.addEventListener('click', addAudio);
        card.addEventListener("click", flipCard);

        gameBoard.appendChild(card);
        card.appendChild(face);
        setTimeout(() => { card.appendChild(back);}, 3000); 
    });
}

// Flip the cards
let flippedCards = [];
let isFlipping = false;

function flipCard() {
    if (isFlipping || flippedCards.length === 2 || this === flippedCards[0]) return;

    this.classList.add("flipped");
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        isFlipping = true;
        setTimeout(checkMatch, 700);
    }
}
// Check if the flipped cards match
function checkMatch() {
    const image1 = flippedCards[0].getAttribute("data-image");
    const image2 = flippedCards[1].getAttribute("data-image");

    if (image1 === image2) {
        flippedCards.forEach((card) => {
            card.removeEventListener("click", flipCard);
            card.classList.add('shake');
            const isWin=document.querySelectorAll(".flipped");

           //add audio
            var winAudio = document.getElementById('audio2');
            winAudio.play();
            //check if theres a winner
        if(isWin.length === images.length){
            const win = document.createElement("div");
            win.textContent = "Congratulations! You've won the game!";
            win.className = "win";
            gameBoard.appendChild(win);
            var congrats = document.getElementById('audio5');
            congrats.play();
            setTimeout(() => {
                window.location.reload();
            }, 7000);
        }
    });
    } else {
        flippedCards.forEach((card) => {
            var loseAudio = document.getElementById('audio3');
            loseAudio.play();
            card.classList.add('shakeLose');
            setTimeout(() => card.classList.remove("flipped"), 1100);

        });
        playerLives--;
        playerLivesCount.textContent = playerLives;
        if(playerLives === 0){
            var gameOver = document.getElementById('audio4');
            gameOver.play();
            const lose = document.createElement("div");
            lose.textContent = "Game over! Give it another shot";
            lose.className = "lose";     
            gameBoard.appendChild(lose)
            var gameOver = document.getElementById('audio4');
            gameOver.play();
            setTimeout(() => { 
                window.location.reload();
            }, 5200); 
        }}

    

    flippedCards = [];
    isFlipping = false;
}
// Play audio when the image is clicked
function addAudio(){
    var myAudio1 = document.getElementById('audio1');
    myAudio1.play();
}

// Initialize the game
createBoard();


