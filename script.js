// 中文版本引导文字
const prompts = [
  "你叫什么名字？",
  "你最珍贵的回忆是什么？",
  "有什么想记下的重要事情吗？"
];

let currentStep = 0;
let responses = [];

const cardContent = document.getElementById('cardContent');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progress = document.getElementById('progress');
const flipBtn = document.getElementById('flipBtn');
const memoryCard = document.getElementById('memoryCard');

function updateCard() {
  if (currentStep < prompts.length) {
    cardContent.innerHTML = `
      <p class="prompt">${prompts[currentStep]}</p >
      <input type="text" id="responseInput" placeholder="在这里输入你的回答..." />
    `;
    progress.textContent = `${currentStep + 1}/${prompts.length}`;
    prevBtn.disabled = currentStep === 0;
    nextBtn.textContent = currentStep === prompts.length - 1 ? "完成" : "下一步";
  } else {
    showMemoryCard();
  }
}

function showMemoryCard() {
  cardContent.innerHTML = `
    <h3>你的数字记忆卡</h3>
    <p><strong>名字：</strong>${responses[0]}</p >
    <p><strong>珍贵回忆：</strong>${responses[1]}</p >
    <p><strong>重要笔记：</strong>${responses[2]}</p >
    <p class="created-by">用心制作 💌</p >
  `;
  flipBtn.style.display = 'block';
  prevBtn.style.display = 'none';
  nextBtn.style.display = 'none';
  progress.textContent = '';
}

prevBtn.addEventListener('click', () => {
  if (currentStep > 0) {
    currentStep--;
    updateCard();
  }
});

nextBtn.addEventListener('click', () => {
  const input = document.getElementById('responseInput');
  if (input && input.value.trim() !== '') {
    responses[currentStep] = input.value.trim();
    currentStep++;
    updateCard();
  } else if (currentStep < prompts.length) {
    alert('请先输入你的回答哦~');
  }
});

flipBtn.addEventListener('click', () => {
  memoryCard.classList.toggle('flipped');
});

updateCard();
