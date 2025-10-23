const startBtn = document.getElementById("start-btn");
const gameBoard = document.getElementById("game-board");
const startScreen = document.getElementById("start");

startBtn.addEventListener('click', function(){
  startScreen.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
})

const fruits = ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥥","🥝","🥑","🧅"];
const Level_1 = 4;

function shuffle(array) {
  const arr = [...array];
  for(let i = array.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const selectFruits = shuffle(fruits).slice(0,Level_1).flatMap(x => [x, x]); //隨機挑選水果，並複製一份方便配對
const shuffledCards = shuffle(selectFruits); //將selectFruits洗牌

const cardsWrapper = document.getElementById("cards");

//將隨機洗好的卡牌陣列生成對應的DOM結構
const cardsContent = shuffledCards.map( (fruit) => { 
  const cardContainer = document.createElement("div");
  const card = document.createElement("div");

  const cardFront = "???";
  card.dataset.fruit = fruit;

  card.textContent = cardFront;

  cardContainer.appendChild(card);

  card.addEventListener("click", ()=> card.textContent = card.dataset.fruit);

  return cardContainer
});

cardsWrapper.append(...cardsContent);