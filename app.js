const startBtn = document.getElementById("start-btn")
const gameBoard = document.getElementById("game-board")
const start = document.getElementById("start")

startBtn.addEventListener('click', function(){
  start.classList.add("hidden");       // 隱藏主畫面
  gameBoard.classList.remove("hidden"); // 顯示遊戲畫面
})