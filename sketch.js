// noprotect
// ========================================================
// A JORNADA DO EMPREENDEDOR (Caminho Único + Empresário 2D)
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
let screenGlowTimer = 0; // Temporizador para o efeito animado na tela ao acertar
const exitPos = { x: 20, y: 10 };

// Matriz 21x21 do labirinto com CAMINHO ÚNICO (0 = Caminho, 1 = Parede)
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

// Portas ao longo do caminho
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
  createCanvas(800, 750);
  initDoors();
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
  
  drawScreenGlow(); // Efeito de brilho animado na tela ao acertar
  
  drawHUD();
  if (activeModal !== null) {
    drawQuestionModal();
  }
}

// ----------------------------------------------------
// ANIMAÇÃO DE TELA (GLOW AO ACERTAR)
// ----------------------------------------------------
function drawScreenGlow() {
  if (screenGlowTimer > 0) {
    push();
    let alphaVal = map(screenGlowTimer, 0, 40, 0, 150);
    let pulse = sin(frameCount * 0.2) * 20;
    
    noFill();
    stroke(46, 204, 113, alphaVal);
    strokeWeight(15 + pulse);
    rect(0, 0, width, height);
    
    // Brilho verde suave por toda a tela
    fill(46, 204, 113, alphaVal * 0.15);
    noStroke();
    rect(0, 0, width, height);
    pop();
    
    screenGlowTimer--;
  }
}

// ----------------------------------------------------
// RENDERIZAÇÃO ESTILO BOMBERMAN 3D / RELEVOS
// ----------------------------------------------------
function drawMazeIsometric() {
  let tileSize = getTileSize();
  let wallHeight = tileSize * 0.35;

  for (let r = 0; r < mazeMap.length; r++) {
    for (let c = 0; c < mazeMap[r].length; c++) {
      let x = c * tileSize;
      let y = r * tileSize;
      
      if (mazeMap[r][c] === 1) {
        push();
        // Sombra Projetada
        fill(10, 15, 22, 180);
        noStroke();
        rect(x + 5, y + 5, tileSize, tileSize + wallHeight, 4);

        // Face Frontal / Lateral (Profundidade Bomberman)
        fill(44, 62, 80);
        stroke(28, 40, 53);
        strokeWeight(1.5);
        rect(x, y, tileSize, tileSize + wallHeight, 4);

        // Textura da Parede Frontal
        fill(30, 44, 58);
        rect(x + 2, y + tileSize, tileSize - 4, wallHeight - 2, 2);

        // Topo do Bloco 3D
        fill(74, 98, 126);
        stroke(100, 125, 155);
        strokeWeight(1);
        rect(x, y, tileSize, tileSize, 4);

        // Brilho Superior (Bevel)
        fill(140, 170, 205, 120);
        noStroke();
        rect(x + 2, y + 2, tileSize - 4, tileSize * 0.3, 2);
        pop();
      } else {
        // Chão Estilizado
        push();
        fill((r + c) % 2 === 0 ? color(34, 44, 60) : color(28, 36, 50));
        stroke(20, 26, 38);
        strokeWeight(1);
        rect(x, y, tileSize, tileSize);

        // Detalhe central no chão
        fill(255, 255, 255, 8);
        noStroke();
        rect(x + 4, y + 4, tileSize - 8, tileSize - 8);
        pop();
      }
    }
  }
}

function drawExit() {
  let tileSize = getTileSize();
  let x = exitPos.x * tileSize;
  let y = exitPos.y * tileSize;
  
  push();
  fill(46, 204, 113, 80);
  stroke(46, 204, 113);
  strokeWeight(2);
  rect(x + 2, y + 2, tileSize - 4, tileSize - 4, 8);
  
  textSize(tileSize * 0.65);
  textAlign(CENTER, CENTER);
  text("🏁", x + tileSize / 2, y + tileSize / 2);
  pop();
}

function drawDoors() {
  let tileSize = getTileSize();
  for (let d of doors) {
    if (d.state === "destroyed" || d.state === "open") continue;
    
    let x = d.x * tileSize;
    let y = d.y * tileSize;
    
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
    rect(x + 5, currentY + 5, tileSize - 10, tileSize - 10, 4);
    
    fill(255, alphaVal);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(tileSize * 0.5);
    text(d.type === "question" ? "🔒" : "🎁", x + tileSize / 2, currentY + tileSize / 2);
    pop();
  }
}

// ----------------------------------------------------
// PERSONAGEM 2D EMPRESÁRIO (ESTILO BOMBERMAN)
// ----------------------------------------------------
function drawPlayer2D() {
  let tileSize = getTileSize();
  let cx = (avatarPos.x + 0.5) * tileSize;
  let cy = (avatarPos.y + 0.5) * tileSize;

  // Animação de respiração / caminhada
  let bounce = sin(frameCount * 0.15) * 2;
  let py = cy + bounce;

  push();
  // Sombra 2D no chão
  fill(0, 0, 0, 140);
  noStroke();
  ellipse(cx, cy + tileSize * 0.35, tileSize * 0.7, tileSize * 0.3);

  // Escala base do personagem
  let s = tileSize / 36;

  push();
  translate(cx, py - tileSize * 0.1);

  // 1. Pernas / Sapatos Executivos
  fill(20, 25, 35);
  rect(-7 * s, 10 * s, 5 * s, 6 * s, 2 * s);
  rect(2 * s, 10 * s, 5 * s, 6 * s, 2 * s);

  // 2. Corpo / Terno Azul Marinho
  fill(31, 78, 121);
  stroke(15, 40, 70);
  strokeWeight(1.5 * s);
  rect(-10 * s, -4 * s, 20 * s, 16 * s, 4 * s);

  // 3. Camisa Social Branca & Gravata Vermelha
  noStroke();
  fill(245);
  triangle(-4 * s, -4 * s, 4 * s, -4 * s, 0, 4 * s);
  fill(217, 4, 41);
  triangle(-2 * s, -4 * s, 2 * s, -4 * s, 0, 8 * s);

  // 4. Maleta Executiva de Couro (Mão Direita)
  fill(139, 69, 19);
  stroke(80, 35, 10);
  strokeWeight(1 * s);
  rect(9 * s, 1 * s, 8 * s, 10 * s, 2 * s);
  fill(255, 215, 0);
  noStroke();
  rect(12 * s, 0, 2 * s, 2 * s);

  // 5. Cabeça (Tom de Pele)
  fill(255, 218, 185);
  stroke(210, 160, 130);
  strokeWeight(1 * s);
  ellipse(0, -12 * s, 22 * s, 20 * s);

  // 6. Cabelo Executivo Castanho
  fill(60, 35, 15);
  noStroke();
  arc(0, -14 * s, 23 * s, 16 * s, PI, TWO_PI);
  triangle(-11 * s, -14 * s, -7 * s, -14 * s, -9 * s, -9 * s);

  // 7. Olhos & Óculos
  fill(40);
  ellipse(-4 * s, -12 * s, 2.5 * s, 3.5 * s);
  ellipse(4 * s, -12 * s, 2.5 * s, 3.5 * s);

  noFill();
  stroke(30);
  strokeWeight(1.2 * s);
  rect(-7 * s, -15 * s, 6 * s, 5 * s, 1 * s);
  rect(1 * s, -15 * s, 6 * s, 5 * s, 1 * s);
  line(-1 * s, -13 * s, 1 * s, -13 * s);

  // 8. Sorriso
  noFill();
  stroke(180, 80, 60);
  strokeWeight(1 * s);
  arc(0, -7 * s, 6 * s, 4 * s, 0, PI);

  pop();
  pop();
}

// ----------------------------------------------------
// CONTROLES E REGRAS DO JOGO
// ----------------------------------------------------
function getTileSize() {
  return min(width / 21, height / 21);
}

function keyPressed() {
  if (activeModal !== null) return;
  
  let dx = 0, dy = 0;
  if (keyCode === LEFT_ARROW || key === 'a' || key === 'A') dx = -1;
  if (keyCode === RIGHT_ARROW || key === 'd' || key === 'D') dx = 1;
  if (keyCode === UP_ARROW || key === 'w' || key === 'W') dy = -1;
  if (keyCode === DOWN_ARROW || key === 's' || key === 'S') dy = 1;
  
  tryMove(dx, dy);
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
      alert(`🎉 PARABÉNS! Você completou toda a jornada empresarial com R$ ${formattedCapital}!`);
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

function handleAnswer(isCorrect) {
  let door = doors.find(d => d.questionIdx === activeModal);
  
  if (isCorrect) {
    door.state = "opening";
    screenGlowTimer = 40; // Ativa animação visual verde na tela
    triggerConfetti(door.x, door.y);
    addFloatingText(door.x, door.y, "✨ ACERTOU!");
  } else {
    capital -= 3000; // Dedução de R$ 3.000,00 por erro
    triggerExplosion(door.x, door.y);
    addFloatingText(door.x, door.y, "-R$ 3.000,00");
    door.state = "destroyed";
    
    if (capital <= 0) {
      capital = 0;
      setTimeout(() => {
        alert("💥 FALÊNCIA! Seu capital zerou após erros financeiros.");
        resetGame();
      }, 200);
    }
  }
  activeModal = null;
}

// ----------------------------------------------------
// HUD & MODAL DE PERGUNTAS CORRIGIDO E ALINHADO
// ----------------------------------------------------
function drawHUD() {
  push();
  fill(15, 23, 42, 230);
  stroke(capital > 3000 ? color(46, 204, 113) : color(231, 76, 60), 200);
  strokeWeight(2);
  rect(12, 10, 340, 46, 10);
  
  fill(capital > 3000 ? color(46, 204, 113) : color(231, 76, 60));
  textSize(16);
  textStyle(BOLD);
  textAlign(LEFT, CENTER);
  
  let formattedCapital = capital.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  text(`Capital: R$ ${formattedCapital}`, 25, 33);
  
  fill(220);
  textSize(13);
  textAlign(RIGHT, CENTER);
  text("Objetivo: Chegar à Saída 🏁", width - 20, 33);
  pop();
}

function drawQuestionModal() {
  let q = questionsList[activeModal];
  
  push();
  fill(0, 0, 0, 220);
  rect(0, 0, width, height);
  
  let mw = min(width - 40, 540);
  let mh = 430;
  let mx = (width - mw) / 2;
  let my = (height - mh) / 2;
  
  // Fundo do Modal
  fill(24, 32, 48);
  stroke(52, 152, 219);
  strokeWeight(3);
  rect(mx, my, mw, mh, 14);
  
  // Título da Etapa
  fill(255);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  textStyle(BOLD);
  text(q.title, mx + mw / 2, my + 20);
  
  // Enunciado da Pergunta centralizado e contido na caixa
  textSize(14);
  textStyle(NORMAL);
  textLeading(20);
  fill(220, 230, 245);
  rectMode(CORNER);
  text(q.question, mx + 25, my + 55, mw - 50, 60);
  
  // Botões das Opções
  let startBtnY = my + 130;
  let btnHeight = 65;
  let btnGap = 15;
  
  for (let i = 0; i < q.options.length; i++) {
    let opt = q.options[i];
    let btnY = startBtnY + i * (btnHeight + btnGap);
    
    if (selectedOptionIndex === i) {
      fill(opt.correct ? color(46, 204, 113) : color(231, 76, 60));
      stroke(255);
    } else {
      fill(38, 48, 70);
      stroke(60, 80, 110);
    }
    
    strokeWeight(2);
    rect(mx + 25, btnY, mw - 50, btnHeight, 10);
    
    // Texto da Alternativa Alinhado no Centro do Botão
    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    textLeading(17);
    text(opt.text, mx + 40, btnY + btnHeight / 2, mw - 80);
  }
  pop();
}

function mousePressed() {
  if (activeModal !== null && feedbackTimer === null) {
    let q = questionsList[activeModal];
    let mw = min(width - 40, 540);
    let mx = (width - mw) / 2;
    let mh = 430;
    let my = (height - mh) / 2;
    
    let startBtnY = my + 130;
    let btnHeight = 65;
    let btnGap = 15;
    
    for (let i = 0; i < q.options.length; i++) {
      let btnY = startBtnY + i * (btnHeight + btnGap);
      if (mouseX > mx + 25 && mouseX < mx + mw - 25 && mouseY > btnY && mouseY < btnY + btnHeight) {
        selectedOptionIndex = i;
        let isCorrect = q.options[i].correct;
        
        playSound(isCorrect ? "correct" : "explosion");
        feedbackTimer = setTimeout(() => {
          handleAnswer(isCorrect);
          selectedOptionIndex = null;
          feedbackTimer = null;
        }, 450);
        break;
      }
    }
  }
}

// ----------------------------------------------------
// SONS E PARTÍCULAS
// ----------------------------------------------------
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

// Explosão desacelerada (velocidade reduzida e durabilidade aumentada)
function triggerExplosion(gx, gy) {
  let tileSize = getTileSize();
  let cx = (gx + 0.5) * tileSize;
  let cy = (gy + 0.5) * tileSize;
  for (let i = 0; i < 45; i++) {
    particles.push({
      x: cx, y: cy,
      vx: random(-2.2, 2.2), // Velocidade reduzida
      vy: random(-2.2, 2.2), // Velocidade reduzida
      size: random(5, 12),
      color: color(random(220, 255), random(40, 90), 0),
      life: 1.0
    });
  }
}

function triggerConfetti(gx, gy) {
  let tileSize = getTileSize();
  let cx = (gx + 0.5) * tileSize;
  let cy = (gy + 0.5) * tileSize;
  for (let i = 0; i < 65; i++) {
    confetti.push({
      x: cx, y: cy,
      vx: random(-5, 5), vy: random(-6, -2),
      size: random(5, 10),
      color: color(random(255), random(255), random(255)),
      life: 1.0
    });
  }
}

function triggerFireworks(gx, gy) {
  let tileSize = getTileSize();
  let cx = (gx + 0.5) * tileSize;
  let cy = (gy + 0.5) * tileSize;
  for (let i = 0; i < 80; i++) {
    let angle = random(TWO_PI);
    let speed = random(2, 7);
    fireworks.push({
      x: cx, y: cy,
      vx: cos(angle) * speed, vy: sin(angle) * speed,
      size: random(3, 7),
      color: color(random(150, 255), random(100, 255), random(200, 255)),
      life: 1.0
    });
  }
}

function addFloatingText(gx, gy, txt) {
  let tileSize = getTileSize();
  floatingTexts.push({
    x: (gx + 0.5) * tileSize,
    y: gy * tileSize,
    text: txt,
    life: 1.0
  });
}

// Atualização de partículas mais lenta
function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.x += p.vx; 
    p.y += p.vy; 
    p.vx *= 0.96; // Suave resistência do ar
    p.vy *= 0.96;
    p.life -= 0.008; // Perda de vida mais lenta
    
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
function touchStarted() {
  if (activeModal !== null) return;
  
  let tileSize = getTileSize();
  let px = (avatarPos.x + 0.5) * tileSize;
  let py = (avatarPos.y + 0.5) * tileSize;
  
  // Detecta a direção do toque em relação ao personagem
  let dx = 0, dy = 0;
  if (abs(mouseX - px) > abs(mouseY - py)) {
    dx = mouseX > px ? 1 : -1;
  } else {
    dy = mouseY > py ? 1 : -1;
  }
  
  tryMove(dx, dy);
  return false; // Evita rolagem da página no celular
}