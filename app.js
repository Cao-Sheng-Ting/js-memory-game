const startBtn = document.getElementById("start-btn");
const gameBoard = document.getElementById("game-board");
const startScreen = document.getElementById("start");

const fruits = ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥥","🥝","🥑","🧅"];

const currentLevel = [
  {levelClass : "level-1", pairs : 4 },
  {levelClass : "level-2", pairs : 8 },
  {levelClass : "level-3", pairs : 12 }
];

startBtn.addEventListener('click', function(){
  startScreen.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
  loadLevel(currentLevelIndex)
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

function chechLevelComplete(pairs){
  if(matchedPairs == pairs){
    currentLevelIndex ++;
    console.log(currentLevelIndex)
    loadLevel(currentLevelIndex)
    console.log("過關了")
  }
}

const cardsWrapper = document.getElementById("cards");
let firstCard = null;
let secondCard = null;
const cardFront = "???";


function loadLevel(LevelIndex){
  // const{pairs, columns, rows} = Level[LevelIndex];
  const{levelClass, pairs} = currentLevel[LevelIndex]

  const selectFruits = shuffle(fruits).slice(0,pairs).flatMap(x => [x, x]); //隨機挑選水果，並複製一份方便配對
  const shuffledCards = shuffle(selectFruits); //將selectFruits洗牌 

  matchedPairs = 0;
  cardsWrapper.innerHTML = "";

  //將隨機洗好的卡牌陣列生成對應的DOM結構
  const cardsContent = shuffledCards.map( (fruit) => { 
    const cardContainer = document.createElement("div");
    const card = document.createElement("div");

    card.dataset.fruit = fruit;
    card.textContent = cardFront;
    card.classList.add("card")

    cardContainer.appendChild(card);

    return cardContainer
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
  card.textContent = card.dataset.fruit

  if(!firstCard)
    {
      firstCard = card
    }else if(!secondCard && card !== firstCard){
      secondCard = card
    }
}

// 驗證firstCard和secondCard配對是否成功
function checkMatch(){
  if(firstCard.dataset.fruit == secondCard.dataset.fruit){
    const {pairs} = currentLevel[currentLevelIndex];
    firstCard.classList.add("card-hidden");
    secondCard.classList.add("card-hidden");
    firstCard = null;
    secondCard = null;
    matchedPairs ++;
    console.log("消除了",matchedPairs);
    chechLevelComplete(pairs);
    cardsWrapper.style.pointerEvents = "auto"
  }else{
    resetCards()
  }
}

// 配對失敗卡片重新覆蓋
function resetCards(){
  setTimeout(()=>{
    firstCard.textContent = cardFront;
    secondCard.textContent = cardFront;
    console.log("不相同");
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
    checkMatch();
  }
})


// const selectFruits = shuffle(fruits).slice(0,Level_1).flatMap(x => [x, x]); //隨機挑選水果，並複製一份方便配對
// const shuffledCards = shuffle(selectFruits); //將selectFruits洗牌 

// const cardsWrapper = document.getElementById("cards");
// const cardFront = "???";

// //將隨機洗好的卡牌陣列生成對應的DOM結構
// const cardsContent = shuffledCards.map( (fruit) => { 
//   const cardContainer = document.createElement("div");
//   const card = document.createElement("div");

//   card.dataset.fruit = fruit;

//   card.textContent = cardFront;
//   card.classList.add("card")

//   cardContainer.appendChild(card);

//   return cardContainer
// });
// cardsWrapper.append(...cardsContent);

// let firstCard = null;
// let secondCard = null;
// const cards = document.querySelectorAll(".card")

// // 點擊卡片後的判斷邏輯
// cards.forEach((card) => 
//   card.addEventListener("click", ()=> {
//     card.textContent = card.dataset.fruit
//     if(!firstCard)
//       {
//         firstCard = card
//       }else if(!secondCard && card !== firstCard){
//         secondCard = card
//       }
//       console.log(firstCard, secondCard)
//       if(firstCard && secondCard){
//         if(firstCard.dataset.fruit == secondCard.dataset.fruit){
//           firstCard.classList.add("card-hidden")
//           secondCard.classList.add("card-hidden")
//           firstCard = null
//           secondCard = null
//           console.log("消除了")
//         }else{
//           cards.forEach(card => card.style.pointerEvents= "none");
//           setTimeout(()=>{
//             firstCard.textContent = cardFront
//             secondCard.textContent = cardFront
//             console.log("不相同")
//             firstCard = null
//             secondCard = null
//             cards.forEach(card => card.style.pointerEvents = "auto")
//           },1000)
//         }
//       }
//     }    
//   )
// )