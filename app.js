const startBtn = document.getElementById("start-btn");
const gameBoard = document.getElementById("game-board");
const startScreen = document.getElementById("start");

const fruits = ["🍎","🍊","🍌","🍉","🍇","🍓","🫐","🍒","🍑","🍍","🥥","🥝","🥑","🧅"];
const Level = [
  {pairs: 4, columns:4, rows: 2},
  {pairs: 8, columns:4, rows: 4},
  {pairs: 12, columns:6, rows: 4},
];
let matchedPairs = null;
const Level_1 = 4;

function shuffle(array) {
  const arr = [...array];
  for(let i = array.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function chechLevelComplete(){}

function loadLevel(currentLevelIndex){
  const{pairs, columns, rows} = Level[currentLevelIndex];

  const selectFruits = shuffle(fruits).slice(0,pairs).flatMap(x => [x, x]); //隨機挑選水果，並複製一份方便配對
  const shuffledCards = shuffle(selectFruits); //將selectFruits洗牌 

  const cardsWrapper = document.getElementById("cards");
  cardsWrapper.innerHTML = "";
  const cardFront = "???";

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

  let firstCard = null;
  let secondCard = null;
  const cards = document.querySelectorAll(".card")

  // 點擊卡片後的判斷邏輯
  cards.forEach((card) => 
    card.addEventListener("click", ()=> {
      card.textContent = card.dataset.fruit
      if(!firstCard)
        {
          firstCard = card
        }else if(!secondCard && card !== firstCard){
          secondCard = card
        }
        console.log(firstCard, secondCard)
        if(firstCard && secondCard){
          if(firstCard.dataset.fruit == secondCard.dataset.fruit){
            firstCard.classList.add("card-hidden")
            secondCard.classList.add("card-hidden")
            firstCard = null
            secondCard = null
            console.log("消除了")
          }else{
            cards.forEach(card => card.style.pointerEvents= "none");
            setTimeout(()=>{
              firstCard.textContent = cardFront
              secondCard.textContent = cardFront
              console.log("不相同")
              firstCard = null
              secondCard = null
              cards.forEach(card => card.style.pointerEvents = "auto")
            },1000)
          }
        }
      }    
    )
  )
}

startBtn.addEventListener('click', function(){
  startScreen.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
  loadLevel(0)
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