const startBtn = document.getElementById("start-btn");
const gameBoard = document.getElementById("game-board");
const startScreen = document.getElementById("start");

const fruits = ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥥","🥝","🥑","🧅"];

const levels = [
  {levelClass : "level-1", pairs : 4 },
  {levelClass : "level-2", pairs : 8 },
  {levelClass : "level-3", pairs : 12 }
];

startBtn.addEventListener('click', function(){
  startScreen.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
  loadLevel(levels[currentLevelIndex]);
})

// Fisher-Yates洗牌演算法
function shuffle(array) {
  const arr = [...array];
  for(let i = arr.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

let currentLevelIndex = 0;
let matchedPairs = 0;

function checkLevelComplete(pairs){
  if(matchedPairs === pairs){
    currentLevelIndex ++;
    if(currentLevelIndex === levels.length){
      alert("恭喜全部過關！！！")
      gameBoard.classList.add("hidden");
      startScreen.classList.remove("hidden");
      return
    }
    alert("過關！！！");
    loadLevel(levels[currentLevelIndex]);
  }
}

const cardsWrapper = document.getElementById("cards");
let firstCard = null;
let secondCard = null;


function loadLevel(levelData){
  const { levelClass, pairs } = levelData;

  const selectFruits = shuffle(fruits).slice(0,pairs).flatMap(x => [x, x]); //隨機挑選水果，並複製一份方便配對
  const shuffledCards = shuffle(selectFruits); //將selectFruits洗牌 

  matchedPairs = 0;
  cardsWrapper.innerHTML = "";

  //將隨機洗好的卡牌陣列生成對應的DOM結構
  const cardsContent = shuffledCards.map( (fruit) => { 
    const card = document.createElement("div");
    const cardInner = document.createElement("div");
    const cardFront = document.createElement("div");
    const cardBack = document.createElement("div")

    card.dataset.fruit = fruit;
    cardBack.textContent = fruit;
    cardFront.textContent = "???";
   
    card.classList.add("card");
    cardInner.classList.add("card-inner", "is-flipped");
    cardFront.classList.add("card-front");
    cardBack.classList.add("card-back");

    setTimeout(()=>{
      cardInner.classList.remove("is-flipped")
    }, 3000);


    cardInner.append(cardFront, cardBack)
    card.appendChild(cardInner);

    return card
  });
  cardsWrapper.append(...cardsContent);
  cardsWrapper.className = levelClass
}

// 驗證是否點擊正確的的卡片
function isValidCard(card){
  if(!card) return false;
  if(card.classList.contains("card-hidden")) return false;
  if(card === firstCard) return false;
  if(firstCard && secondCard) return false;
  return true
}

// 驗證並記錄firstCard和secondCard
function selectCard(card){
  const inner = card.querySelector(".card-inner")
  inner.classList.add("is-flipped");
  if(!firstCard)
    {
      firstCard = card
    }else if(!secondCard && card !== firstCard){
      secondCard = card
    }
}

// 驗證firstCard和secondCard配對是否成功
function checkMatch(){
  if(!firstCard || !secondCard) return
  console.log(firstCard)
  console.log(secondCard)
  cardsWrapper.style.pointerEvents = "none";
  if(firstCard.dataset.fruit === secondCard.dataset.fruit){
    setTimeout(()=>{
      const {pairs} = levels[currentLevelIndex];
      firstCard.classList.add("card-hidden");
      secondCard.classList.add("card-hidden");
      firstCard = null;
      secondCard = null;
      matchedPairs ++;
      checkLevelComplete(pairs);
      cardsWrapper.style.pointerEvents = "auto"
    },1000)
  }else{
    resetCards()
  }
}

// 配對失敗卡片重新覆蓋
function resetCards(){
  console.log("配對失敗")
  const firstInner = firstCard.querySelector(".card-inner");
  const secondInner = secondCard.querySelector(".card-inner");
  cardsWrapper.style.pointerEvents = "none";
  setTimeout(()=>{
    firstInner.classList.remove("is-flipped");
    secondInner.classList.remove("is-flipped");
    firstCard = null;
    secondCard = null;
    cardsWrapper.style.pointerEvents = "auto";
  },1000)
}

// 點擊卡片後的判斷邏輯
cardsWrapper.addEventListener("click", (e)=> {
  const card = e.target.closest(".card")
  if(isValidCard(card)){
    selectCard(card);
    checkMatch();
  }
})