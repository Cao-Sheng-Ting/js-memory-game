const startBtn = document.getElementById("start-btn")
const gameBoard = document.getElementById("game-board")
const start = document.getElementById("start")

startBtn.addEventListener('click', function(){
  start.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
})

const fruitArr = ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥥","🥝","🥑","🧅"]
const level1 = 4

function shuffle(array) {
  const arr = [...array];
  for(let i = array.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}  

const selectFruits = shuffle(fruitArr).slice(0,level1).flatMap(x => [x, x]) //隨機挑選水果，並複製一份方便配對
const shuffledCard = shuffle(selectFruits) //將selectFruits洗牌

const cards = document.getElementById("cards")
Array.from({length: shuffledCard.length}, (_, i)=>{
  const cardElements = document.createElement("div")

  const card = document.createElement("div")
  const cardFront = "???"
  const cardBack = shuffledCard[i]
  card.textContent = cardFront
  
  cards.appendChild(cardElements)
  cardElements.appendChild(card)

  card.addEventListener("click", ()=> card.textContent = cardBack)
})
