// noprotect
// ========================================================
// A JORNADA DO EMPREENDEDOR (Com Feedback Visual no Modal)
// ========================================================

let avatarPos = { x: 0, y: 10 };
let capital = 10000;
let activeModal = null;
let doors = [];
let particles = [];
let confetti = [];
let fireworks = [];
let floatingTexts = [];
let selectedOptionIndex = null;
let feedbackTimer = null;
let screenGlowTimer = 0;
const exitPos = { x: 20, y: 10 };

let topMargin = 50;
let bottomMargin = 140;

const mazeMap = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0],
  [1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const doorPositions = [
  { x: 1, y: 5, type: "question", questionIdx: 0 },
  { x: 3, y: 1, type: "trick_confetti", questionIdx: -1 },
  { x: 7, y: 1, type: "question", questionIdx: 1 },
  { x: 11, y: 7, type: "trick_gift", questionIdx: -1 },
  { x: 13, y: 1, type: "question", questionIdx: 2 },
  { x: 17, y: 5, type: "trick_fireworks", questionIdx: -1 },
  { x: 19, y: 14, type: "question", questionIdx: 3 },
  { x: 11, y: 18, type: "trick_confetti", questionIdx: -1 },
  { x: 3, y: 18, type: "question", questionIdx: 4 }
];

const questionsList = [
  {
    title: "Etapa 1: Planejamento Inicial",
    question: "Você quer abrir uma empresa. Qual é a primeira atitude?",
    options: [
      { text: "A) Alugar um espaço imediatamente.", correct: false },
      { text: "B) Pesquisar o mercado e planejar o negócio.", correct: true },
      { text: "C) Comprar produtos sem saber se terá clientes.", correct: false }
    ]
  },
  {
    title: "Etapa 2: Gestão Financeira",
    question: "A empresa está gastando mais do que recebe. O que fazer?",
    options: [
      { text: "A) Ignorar o problema.", correct: false },
      { text: "B) Fazer um empréstimo sem analisar as condições.", correct: false },
      { text: "C) Analisar os gastos e reduzir despesas desnecessárias.", correct: true }
    ]
  },
  {
    title: "Etapa 3: Formação de Preço",
    question: "Você precisa definir o preço do seu produto. O que você faz?",
    options: [
      { text: "A) Calcula custos de produção e adiciona a margem desejada.", correct: true },
      { text: "B) Chuta um valor bem menor que o concorrente para vender rápido.", correct: false },
      { text: "C) Define o preço baseado apenas no que acha que amigos pagariam.", correct: false }
    ]
  },
  {
    title: "Etapa 4: Reserva de Emergência",
    question: "O caixa da empresa sobrou dinheiro este mês. Qual a melhor atitude?",
    options: [
      { text: "A) Guarda uma parte como fundo de reserva financeira.", correct: true },
      { text: "B) Usa todo o dinheiro para comprar um celular de última geração.", correct: false },
      { text: "C) Distribui o valor imediatamente em bônus, zerando o caixa.", correct: false }
    ]
  },
  {
    title: "Etapa 5: Atendimento ao Cliente",
    question: "Um cliente fez uma reclamação grave nas redes sociais. Como agir?",
    options: [
      { text: "A) Responde de forma educada, entende o problema e busca solução.", correct: true },
      { text: "B) Apaga o comentário dele imediatamente e finge que nada aconteceu.", correct: false },
      { text: "C) Discute publicamente com o cliente para defender a marca.", correct: false }
    ]
  }
];

function setup() {
  let availableHeight = windowHeight - topMargin - bottomMargin;
  let side = min(windowWidth, availableHeight);
  createCanvas(side, side + topMargin + bottomMargin);
  initDoors();
}

function windowResized() {
  let availableHeight = windowHeight - topMargin - bottomMargin;
  let side = min(windowWidth, availableHeight);
  resizeCanvas(side, side + topMargin + bottomMargin);
}

function initDoors() {
  doors = doorPositions.map(pos => ({
    x: pos.x,
    y: pos.y,
    type: pos.type,
    questionIdx: pos.questionIdx,
    state: "locked",
    animProgress: 0
  }));
}

function draw() {
  background(26, 32, 44);
  
  drawMazeIsometric();
  drawExit();
  drawDoors();
  drawPlayer2D();
  
  updateParticles();
  updateConfetti();
  updateFireworks();
  updateFloatingTexts();
  
  drawScreenGlow();
  drawHUD();
  drawDPadArea();
  
  if (activeModal !== null) {
    drawQuestionModal();
  }
}

function getTileSize() {
  return width / 21;
}

function drawScreenGlow() {
  if (screenGlowTimer > 0) {
    push();
    let alphaVal = map(screenGlowTimer, 0, 40, 0, 150);
    let pulse = sin(frameCount * 0.2) * 20;
    
    noFill();
    stroke(46, 204, 113, alphaVal);
    strokeWeight(15 + pulse);
    rect(0, 0, width, height);
    
    fill(46, 204, 113, alphaVal * 0.15);
    noStroke();
    rect(0, 0, width, height);
    pop();
    
    screenGlowTimer--;
  }
}

function drawMazeIsometric() {
  let tileSize = getTileSize();
  let wallHeight = tileSize * 0.35;

  for (let r = 0; r < mazeMap.length; r++) {
    for (let c = 0; c < mazeMap[r].length; c++) {
      let x = c * tileSize;
      let y = topMargin + r * tileSize;
      
      if (mazeMap[r][c] === 1) {
        push();
        fill(10, 15, 22, 180);
        noStroke();
        rect(x + 3, y + 3, tileSize, tileSize + wallHeight, 3);

        fill(44, 62, 80);
        stroke(28, 40, 53);
        strokeWeight(1.2);
        rect(x, y, tileSize, tileSize + wallHeight, 3);

        fill(30, 44, 58);
        rect(x + 2, y + tileSize, tileSize - 4, wallHeight - 2, 2);

        fill(74, 98, 126);
        stroke(100, 125, 155);
        strokeWeight(1);
        rect(x, y, tileSize, tileSize, 3);

        fill(140, 170, 205, 120);
        noStroke();
        rect(x + 2, y + 2, tileSize - 4, tileSize * 0.3, 2);
        pop();
      } else {
        push();
        fill((r + c) % 2 === 0 ? color(34, 44, 60) : color(28, 36, 50));
        stroke(20, 26, 38);
        strokeWeight(1);
        rect(x, y, tileSize, tileSize);

        fill(255, 255, 255, 8);
        noStroke();
        rect(x + 2, y + 2, tileSize - 4, tileSize - 4);
        pop();
      }
    }
  }
}

function drawExit() {
  let tileSize = getTileSize();
  let x = exitPos.x * tileSize;
  let y = topMargin + exitPos.y * tileSize;
  let s = tileSize / 36;
  
  push();
  fill(46, 204, 113, 60);
  stroke(46, 204, 113);
  strokeWeight(2);
  rect(x + 2, y + 2, tileSize - 4, tileSize - 4, 6);
  
  push();
  translate(x + tileSize / 2, y + tileSize / 2);
  
  fill(41, 128, 185);
  stroke(21, 67, 96);
  strokeWeight(1.2 * s);
  rect(-12 * s, -14 * s, 24 * s, 28 * s, 2 * s);
  
  fill(241, 196, 15);
  noStroke();
  rect(-8 * s, -10 * s, 5 * s, 4 * s, 1 * s);
  rect(3 * s, -10 * s, 5 * s, 4 * s, 1 * s);
  rect(-8 * s, -3 * s, 5 * s, 4 * s, 1 * s);
  rect(3 * s, -3 * s, 5 * s, 4 * s, 1 * s);
  
  fill(52, 73, 94);
  stroke(245);
  strokeWeight(1 * s);
  rect(-4 * s, 5 * s, 8 * s, 9 * s, 1 * s);
  
  fill(46, 204, 113);
  noStroke();
  rect(-10 * s, -16 * s, 20 * s, 4 * s, 1 * s);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(max(6, 3 * s));
  textStyle(BOLD);
  text("EMPRESA", 0, -14 * s);

  pop();
  pop();
}

function drawDoors() {
  let tileSize = getTileSize();
  for (let d of doors) {
    if (d.state === "destroyed" || d.state === "open") continue;
    
    let x = d.x * tileSize;
    let y = topMargin + d.y * tileSize;
    
    if (d.state === "opening") {
      d.animProgress += 1 / 40;
      if (d.animProgress >= 1) d.state = "open";
    }
    
    push();
    let currentY = y - (d.state === "opening" ? d.animProgress * tileSize : 0);
    let alphaVal = d.state === "opening" ? 255 * (1 - d.animProgress) : 255;
    
    fill(211, 84, 0, alphaVal);
    stroke(120, 40, 0, alphaVal);
    strokeWeight(2);
    rect(x + 2, currentY + 2, tileSize - 4, tileSize - 4, 6);
    
    fill(241, 196, 15, alphaVal);
    rect(x + 4, currentY + 4, tileSize - 8, tileSize - 8, 4);
    
    fill(255, alphaVal);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(tileSize * 0.45);
    text(d.type === "question" ? "🔒" : "🎁", x + tileSize / 2, currentY + tileSize / 2);
    pop();
  }
}

function drawPlayer2D() {
  let tileSize = getTileSize();
  let cx = (avatarPos.x + 0.5) * tileSize;
  let cy = topMargin + (avatarPos.y + 0.5) * tileSize;

  let bounce = sin(frameCount * 0.15) * 2;
  let py = cy + bounce;

  push();
  fill(0, 0, 0, 140);
  noStroke();
  ellipse(cx, cy + tileSize * 0.35, tileSize * 0.7, tileSize * 0.3);

  let s = tileSize / 36;

  push();
  translate(cx, py - tileSize * 0.1);

  fill(20, 25, 35);
  rect(-7 * s, 10 * s, 5 * s, 6 * s, 2 * s);
  rect(2 * s, 10 * s, 5 * s, 6 * s, 2 * s);

  fill(31, 78, 121);
  stroke(15, 40, 70);
  strokeWeight(1.5 * s);
  rect(-10 * s, -4 * s, 20 * s, 16 * s, 4 * s);

  noStroke();
  fill(245);
  triangle(-4 * s, -4 * s, 4 * s, -4 * s, 0, 4 * s);
  fill(217, 4, 41);
  triangle(-2 * s, -4 * s, 2 * s, -4 * s, 0, 8 * s);

  fill(139, 69, 19);
  stroke(80, 35, 10);
  strokeWeight(1 * s);
  rect(9 * s, 1 * s, 8 * s, 10 * s, 2 * s);
  fill(255, 215, 0);
  noStroke();
  rect(12 * s, 0, 2 * s, 2 * s);

  fill(255, 218, 185);
  stroke(210, 160, 130);
  strokeWeight(1 * s);
  ellipse(0, -12 * s, 22 * s, 20 * s);

  fill(60, 35, 15);
  noStroke();
  arc(0, -14 * s, 23 * s, 16 * s, PI, TWO_PI);
  triangle(-11 * s, -14 * s, -7 * s, -14 * s, -9 * s, -9 * s);

  fill(40);
  ellipse(-4 * s, -12 * s, 2.5 * s, 3.5 * s);
  ellipse(4 * s, -12 * s, 2.5 * s, 3.5 * s);

  noFill();
  stroke(30);
  strokeWeight(1.2 * s);
  rect(-7 * s, -15 * s, 6 * s, 5 * s, 1 * s);
  rect(1 * s, -15 * s, 6 * s, 5 * s, 1 * s);
  line(-1 * s, -13 * s, 1 * s, -13 * s);

  noFill();
  stroke(180, 80, 60);
  strokeWeight(1 * s);
  arc(0, -7 * s, 6 * s, 4 * s, 0, PI);

  pop();
  pop();
}

function drawHUD() {
  push();
  let hudWidth = min(width - 20, 360);
  fill(15, 23, 42, 230);
  stroke(capital > 3000 ? color(46, 204, 113) : color(231, 76, 60), 200);
  strokeWeight(2);
  rect(10, 5, hudWidth, 38, 10);
  
  fill(capital > 3000 ? color(46, 204, 113) : color(231, 76, 60));
  textSize(max(12, width * 0.035));
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  
  let formattedCapital = capital.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  text(`Capital: R$ ${formattedCapital}`, 20, 24);
  
  fill(220);
  textSize(max(10, width * 0.028));
  textAlign(RIGHT, CENTER);
  text("Empresa 🏢", width - 20, 24);
  pop();
}

function drawDPadArea() {
  let mazeBottom = topMargin + getTileSize() * 21;
  
  push();
  fill(18, 24, 38);
  stroke(35, 45, 65);
  strokeWeight(1);
  rect(0, mazeBottom, width, bottomMargin);
  
  let btnSize = 42;
  let cx = width / 2;
  let cy = mazeBottom + bottomMargin / 2;

  textAlign(CENTER, CENTER);
  textSize(20);
  strokeWeight(1.5);

  // Cima
  fill(44, 62, 80); stroke(255, 160);
  rect(cx - btnSize/2, cy - btnSize * 1.25, btnSize, btnSize, 8);
  fill(255); noStroke(); text("▲", cx, cy - btnSize * 0.75);

  // Baixo
  fill(44, 62, 80); stroke(255, 160);
  rect(cx - btnSize/2, cy + btnSize * 0.25, btnSize, btnSize, 8);
  fill(255); noStroke(); text("▼", cx, cy + btnSize * 0.75);

  // Esquerda
  fill(44, 62, 80); stroke(255, 160);
  rect(cx - btnSize * 1.25, cy - btnSize/2, btnSize, btnSize, 8);
  fill(255); noStroke(); text("◄", cx - btnSize * 0.75, cy);

  // Direita
  fill(44, 62, 80); stroke(255, 160);
  rect(cx + btnSize * 0.25, cy - btnSize/2, btnSize, btnSize, 8);
  fill(255); noStroke(); text("►", cx + btnSize * 0.75, cy);

  pop();
}

function keyPressed() {
  if (activeModal !== null) return;
  
  let dx = 0, dy = 0;

  if (key === 'a' || key === 'A' || key === 'ArrowLeft' || keyCode === LEFT_ARROW) dx = -1;
  else if (key === 'd' || key === 'D' || key === 'ArrowRight' || keyCode === RIGHT_ARROW) dx = 1;
  else if (key === 'w' || key === 'W' || key === 'ArrowUp' || keyCode === UP_ARROW) dy = -1;
  else if (key === 's' || key === 'S' || key === 'ArrowDown' || keyCode === DOWN_ARROW) dy = 1;
  
  if (dx !== 0 || dy !== 0) tryMove(dx, dy);
}

// ----------------------------------------------------
// GERENCIADOR UNIFICADO DE INTERAÇÃO (MOUSE E TOUCH)
// ----------------------------------------------------
function mousePressed() {
  handleInteraction(mouseX, mouseY);
}

function touchStarted() {
  let tx = mouseX;
  let ty = mouseY;
  if (touches && touches.length > 0) {
    tx = touches[0].x;
    ty = touches[0].y;
  }
  handleInteraction(tx, ty);
  return false;
}

function handleInteraction(px, py) {
  // Se houver um modal de pergunta aberto, verifica a resposta clicada
  if (activeModal !== null) {
    checkModalClick(px, py);
    return;
  }

  let mazeBottom = topMargin + getTileSize() * 21;
  let btnSize = 42;
  let cx = width / 2;
  let cy = mazeBottom + bottomMargin / 2;
  let tol = btnSize * 0.6;

  // D-Pad Virtual (Rodapé)
  if (dist(px, py, cx, cy - btnSize * 0.75) < tol) { tryMove(0, -1); return; }
  if (dist(px, py, cx, cy + btnSize * 0.75) < tol) { tryMove(0, 1); return; }
  if (dist(px, py, cx - btnSize * 0.75, cy) < tol) { tryMove(-1, 0); return; }
  if (dist(px, py, cx + btnSize * 0.75, cy) < tol) { tryMove(1, 0); return; }

  // Clique direto no Labirinto
  if (py >= topMargin && py <= mazeBottom) {
    let tileSize = getTileSize();
    let playerX = (avatarPos.x + 0.5) * tileSize;
    let playerY = topMargin + (avatarPos.y + 0.5) * tileSize;
    
    let dx = 0, dy = 0;
    if (abs(px - playerX) > abs(py - playerY)) {
      dx = px > playerX ? 1 : -1;
    } else {
      dy = py > playerY ? 1 : -1;
    }
    
    tryMove(dx, dy);
  }
}

// ----------------------------------------------------
// PROCESSAMENTO DA RESPOSTA COM ANIMAÇÃO DE FEEDBACK
// ----------------------------------------------------
function checkModalClick(px, py) {
  if (activeModal === null || feedbackTimer !== null) return;
  
  let q = questionsList[activeModal];
  let mw = min(width - 30, 540);
  let mh = min(height - 40, 430);
  let mx = (width - mw) / 2;
  let my = (height - mh) / 2;
  
  let startBtnY = my + 115;
  let btnHeight = max(45, (mh - 145) / 3);
  let btnGap = 10;
  
  for (let i = 0; i < q.options.length; i++) {
    let btnY = startBtnY + i * (btnHeight + btnGap);
    if (px > mx + 15 && px < mx + mw - 15 && py > btnY && py < btnY + btnHeight) {
      selectedOptionIndex = i; // 1. Acende a cor Verde/Vermelho no botão
      let isCorrect = q.options[i].correct;
      
      playSound(isCorrect ? "correct" : "explosion");
      
      // 2. Aguarda 450ms para o jogador VER o botão aceso antes de fechar o modal
      feedbackTimer = setTimeout(() => {
        handleAnswer(isCorrect);
        selectedOptionIndex = null;
        feedbackTimer = null;
      }, 450);
      break;
    }
  }
}

function handleAnswer(isCorrect) {
  let door = doors.find(d => d.questionIdx === activeModal);
  
  // Limpa o modal ativo após o tempo do feedback
  activeModal = null;

  if (door) {
    if (isCorrect) {
      door.state = "opening";
      screenGlowTimer = 40;
      triggerConfetti(door.x, door.y);
      addFloatingText(door.x, door.y, "✨ ACERTOU!");
    } else {
      capital -= 3000;
      triggerExplosion(door.x, door.y);
      addFloatingText(door.x, door.y, "-R$ 3.000,00");
      door.state = "destroyed";
      
      if (capital <= 0) {
        capital = 0;
        setTimeout(() => {
          alert("💥 FALÊNCIA! Seu capital zerou após erros financeiros.");
          resetGame();
        }, 300);
      }
    }
  }
}

function tryMove(dx, dy) {
  let targetX = avatarPos.x + dx;
  let targetY = avatarPos.y + dy;
  
  if (targetX < 0 || targetX >= 21 || targetY < 0 || targetY >= 21) return;
  if (mazeMap[targetY][targetX] === 1) return;
  
  let door = doors.find(d => d.x === targetX && d.y === targetY);
  if (door && door.state === "locked") {
    if (door.type !== "question") {
      executeTrick(door, targetX, targetY);
      door.state = "opening";
    } else {
      activeModal = door.questionIdx;
      selectedOptionIndex = null;
    }
    return;
  }
  
  if (door && door.state === "opening") return;
  
  avatarPos.x = targetX;
  avatarPos.y = targetY;
  
  if (avatarPos.x === exitPos.x && avatarPos.y === exitPos.y) {
    playSound("win");
    setTimeout(() => {
      let formattedCapital = capital.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      alert(`🎉 PARABÉNS! Você fundou a sua EMPRESA e completou a jornada com R$ ${formattedCapital}!`);
      resetGame();
    }, 300);
  }
}

function executeTrick(door, gx, gy) {
  if (door.type === "trick_confetti") {
    triggerConfetti(gx, gy);
    addFloatingText(gx, gy, "🎉 BÔNUS!");
    playSound("correct");
  } else if (door.type === "trick_fireworks") {
    triggerFireworks(gx, gy);
    addFloatingText(gx, gy, "🎆 SUCESSO!");
    playSound("win");
  } else if (door.type === "trick_gift") {
    capital += 1000;
    triggerConfetti(gx, gy);
    addFloatingText(gx, gy, "🎁 +R$ 1.000,00!");
    playSound("win");
  }
}

function drawQuestionModal() {
  let q = questionsList[activeModal];
  
  push();
  fill(0, 0, 0, 220);
  rect(0, 0, width, height);
  
  let mw = min(width - 30, 540);
  let mh = min(height - 40, 430);
  let mx = (width - mw) / 2;
  let my = (height - mh) / 2;
  
  fill(24, 32, 48);
  stroke(52, 152, 219);
  strokeWeight(3);
  rect(mx, my, mw, mh, 14);
  
  fill(255);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(max(16, mw * 0.04));
  textStyle(BOLD);
  text(q.title, mx + mw / 2, my + 15);
  
  textSize(max(12, mw * 0.028));
  textStyle(NORMAL);
  textLeading(18);
  fill(220, 230, 245);
  rectMode(CORNER);
  text(q.question, mx + 20, my + 45, mw - 40, 60);
  
  let startBtnY = my + 115;
  let btnHeight = max(45, (mh - 145) / 3);
  let btnGap = 10;
  
  for (let i = 0; i < q.options.length; i++) {
    let opt = q.options[i];
    let btnY = startBtnY + i * (btnHeight + btnGap);
    
    // Destaca a opção selecionada com a cor verde ou vermelha antes de fechar
    if (selectedOptionIndex === i) {
      fill(opt.correct ? color(46, 204, 113) : color(231, 76, 60));
      stroke(255);
    } else {
      fill(38, 48, 70);
      stroke(60, 80, 110);
    }
    
    strokeWeight(2);
    rect(mx + 15, btnY, mw - 30, btnHeight, 8);
    
    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(max(11, mw * 0.026));
    textLeading(15);
    text(opt.text, mx + 25, btnY + btnHeight / 2, mw - 50);
  }
  pop();
}

function playSound(type) {
  let ctx = getAudioContext();
  if (ctx.state !== 'running') ctx.resume();
  
  if (type === "explosion") {
    let osc = new p5.Oscillator('sawtooth');
    osc.start();
    osc.freq(150);
    osc.freq(30, 0.3);
    osc.amp(0.4);
    osc.amp(0, 0.35);
    setTimeout(() => osc.stop(), 350);
  } else if (type === "correct") {
    let osc = new p5.Oscillator('sine');
    osc.start();
    osc.freq(523);
    osc.amp(0.2, 0.05);
    setTimeout(() => osc.freq(880), 80);
    setTimeout(() => { osc.amp(0, 0.1); osc.stop(); }, 250);
  } else if (type === "win") {
    let osc = new p5.Oscillator('triangle');
    osc.start();
    osc.freq(440);
    setTimeout(() => osc.freq(554), 80);
    setTimeout(() => osc.freq(659), 160);
    setTimeout(() => osc.freq(880), 240);
    setTimeout(() => { osc.amp(0, 0.1); osc.stop(); }, 400);
  }
}

function triggerExplosion(gx, gy) {
  let tileSize = getTileSize();
  let cx = (gx + 0.5) * tileSize;
  let cy = topMargin + (gy + 0.5) * tileSize;
  for (let i = 0; i < 45; i++) {
    particles.push({
      x: cx, y: cy,
      vx: random(-2.2, 2.2),
      vy: random(-2.2, 2.2),
      size: random(4, 10),
      color: color(random(220, 255), random(40, 90), 0),
      life: 1.0
    });
  }
}

function triggerConfetti(gx, gy) {
  let tileSize = getTileSize();
  let cx = (gx + 0.5) * tileSize;
  let cy = topMargin + (gy + 0.5) * tileSize;
  for (let i = 0; i < 65; i++) {
    confetti.push({
      x: cx, y: cy,
      vx: random(-5, 5), vy: random(-6, -2),
      size: random(4, 8),
      color: color(random(255), random(255), random(255)),
      life: 1.0
    });
  }
}

function triggerFireworks(gx, gy) {
  let tileSize = getTileSize();
  let cx = (gx + 0.5) * tileSize;
  let cy = topMargin + (gy + 0.5) * tileSize;
  for (let i = 0; i < 80; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 7);
    fireworks.push({
      x: cx, y: cy,
      vx: cos(angle) * speed, vy: sin(angle) * speed,
      size: random(3, 6),
      color: color(random(150, 255), random(100, 255), random(200, 255)),
      life: 1.0
    });
  }
}

function addFloatingText(gx, gy, txt) {
  let tileSize = getTileSize();
  floatingTexts.push({
    x: (gx + 0.5) * tileSize,
    y: topMargin + gy * tileSize,
    text: txt,
    life: 1.0
  });
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx; p.y += p.vy; p.vx *= 0.96; p.vy *= 0.96; p.life -= 0.008;
    fill(p.color); noStroke();
    ellipse(p.x, p.y, p.size * p.life);
    if (p.life <= 0) particles.splice(i, 1);
  }
}

function updateConfetti() {
  for (let i = confetti.length - 1; i >= 0; i--) {
    let c = confetti[i];
    c.x += c.vx; c.y += c.vy; c.vy += 0.15; c.life -= 0.018;
    fill(c.color); noStroke();
    rect(c.x, c.y, c.size, c.size * 0.6);
    if (c.life <= 0) confetti.splice(i, 1);
  }
}

function updateFireworks() {
  for (let i = fireworks.length - 1; i >= 0; i--) {
    let f = fireworks[i];
    f.x += f.vx; f.y += f.vy; f.life -= 0.02;
    fill(f.color); noStroke();
    ellipse(f.x, f.y, f.size * f.life);
    if (f.life <= 0) fireworks.splice(i, 1);
  }
}

function updateFloatingTexts() {
  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    let ft = floatingTexts[i];
    ft.y -= 0.8; ft.life -= 0.015;
    push();
    fill(231, 76, 60, ft.life * 255);
    stroke(0, ft.life * 255);
    strokeWeight(2);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text(ft.text, ft.x, ft.y);
    pop();
    if (ft.life <= 0) floatingTexts.splice(i, 1);
  }
}

function resetGame() {
  avatarPos = { x: 0, y: 10 };
  capital = 10000;
  activeModal = null;
  initDoors();
}
