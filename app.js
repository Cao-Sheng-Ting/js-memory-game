const startBtn = document.getElementById("start-btn")
const gameBoard = document.getElementById("game-board")
const start = document.getElementById("start")

startBtn.addEventListener('click', function(){
  start.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
})

const fruitArr = ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥥","🥝","🥑","🧅"]
const level1 = 4

const selectFruits = [...fruitArr].sort(()=> Math.random()- 0.5).slice(0,level1) //隨機挑選水果
const shuffledCard = selectFruits.flatMap(x => [x,x]).sort(() => Math.random() - 0.5) //挑選的水果乘以2後打散

const cards = document.getElementById("cards")
Array.from({length: shuffledCard.length}, (_, i)=>{
  const cardElements = document.createElement("div")
  cardElements.classList.add("card-inner")

  const card = document.createElement("div")
  const cardFront = "???"
  const cardBack = shuffledCard[i]
  card.textContent = cardFront
  
  cards.appendChild(cardElements)
  cardElements.appendChild(card)

  card.addEventListener("click", ()=> card.textContent = cardBack)
})
