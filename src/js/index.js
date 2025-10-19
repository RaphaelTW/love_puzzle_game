// CRIAR PARTÍCULAS DE FUNDO
function createBackgroundParticles() {
  const container = document.getElementById('particles')
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.left = Math.random() * 100 + '%'
    particle.style.top = Math.random() * 100 + '%'
    particle.style.animationDelay = Math.random() * 20 + 's'
    particle.style.animationDuration = 15 + Math.random() * 10 + 's'
    container.appendChild(particle)
  }
}

// CONTROLE DE MÚSICA
const musicToggle = document.getElementById('musicToggle')
const bgMusic = document.getElementById('bgMusic')
let isMusicPlaying = false

musicToggle.addEventListener('click', () => {
  if (isMusicPlaying) {
    bgMusic.pause()
    musicToggle.classList.remove('playing')
    isMusicPlaying = false
  } else {
    bgMusic.play().catch(e => console.log('Erro ao reproduzir música:', e))
    musicToggle.classList.add('playing')
    isMusicPlaying = true
  }
})

// DADOS DOS PUZZLES
const puzzles = [
  {
    number: 1,
    title: 'Nosso primeiro filme',
    emoji: '🎬',
    hint: 'É um clássico de época, cheio de orgulho… e também de preconceito.',
    type: 'options',
    options: [
      'Orgulho e Preconceito',
      'A Origem',
      'Titanic',
      'O Poderoso Chefão'
    ],
    answer: 'Orgulho e Preconceito'
  },
  {
    number: 2,
    title: 'O início do nosso amor',
    emoji: '❤️',
    hint: 'O dia em que o "sim" começou no quarto 77 ❤️',
    type: 'options',
    options: ['24/05/2025', '24/05/2024', '25/05/2025', '24/06/2025'],
    answer: '24/05/2025'
  },
  {
    number: 3,
    title: 'O aniversário do amor da sua vida',
    emoji: '🎂',
    hint: 'O dia que o mundo ficou mais bonito, porque eu nasci 😍',
    type: 'options',
    options: ['04/05', '05/04', '04/04', '04/06'],
    answer: '04/05'
  },
  {
    number: 4,
    title: 'Nosso número da sorte',
    emoji: '💍',
    hint: 'É o número das alianças que simboliza o nosso amor 💍',
    type: 'options',
    options: ['7', '12', '17', '21'],
    answer: '17'
  },
  {
    number: 5,
    title: 'Nosso apelido carinhoso',
    emoji: '😘',
    hint: 'É o jeitinho fofo que a gente se chama, e só a gente entende 😘',
    type: 'options',
    options: ['Momo', 'Amor', 'Babe', 'Meu bem'],
    answer: 'Momo'
  },
  {
    number: 6,
    title: 'O nome do herói dela',
    emoji: '⚡',
    hint: 'Ele é quem promete estar sempre com ela, como nos filmes… ⚡',
    type: 'options',
    options: ['Raphael', 'Rafael', 'Rapha', 'Raph'],
    answer: 'Raphael'
  },
  {
    number: 7,
    title: 'Nosso lugar favorito',
    emoji: '🌹',
    hint: 'Onde o amor se fez ainda mais forte? 😉',
    type: 'options',
    options: [
      'Eu e Você juntos',
      'Praia ao pôr do sol',
      'Cinema íntimo',
      'Parquinho do bairro'
    ],
    answer: 'Eu e Você juntos'
  },
  {
    number: 8,
    title: 'Nosso futuro',
    emoji: '💍',
    hint: 'Um dia, esse nome vai deixar de ser só apelido… 💍',
    type: 'options',
    options: ['Noiva', 'Esposa', 'Amante', 'Amiga'],
    answer: 'Noiva'
  },
  {
    number: 9,
    title: 'Nosso sonho de noite perfeita',
    emoji: '🥰',
    hint: 'Friozinho, pipoca, cobertinha e um filme juntos 🥰',
    type: 'options',
    options: [
      'Abraçados',
      'Conversando a noite toda',
      'Dançando na sala',
      'Passeio noturno'
    ],
    answer: 'Abraçados'
  },
  {
    number: 10,
    title: 'O que nunca vai mudar',
    emoji: '❤️',
    hint: 'Pode passar 10, 20, 40 anos… mas isso sempre será igual ❤️',
    type: 'options',
    options: ['Amor Eterno', 'Paixão', 'Saudade', 'Carinho'],
    answer: 'Amor Eterno'
  }
]

let currentPuzzle = 0
let completedPuzzles = 0

puzzles.forEach(p => (p.completed = false))

// INICIALIZAR
function init() {
  createBackgroundParticles()
  renderPuzzles()
  showPuzzle(0)
  updateProgress()
}

// RENDERIZAR PUZZLES
function renderPuzzles() {
  const container = document.getElementById('puzzles-container')
  container.innerHTML = ''

  puzzles.forEach((puzzle, index) => {
    const card = document.createElement('div')
    card.className = 'puzzle-card'
    card.id = `puzzle-${index}`

    let inputHtml = ''
    if (puzzle.type === 'options') {
      const optionsHtml = puzzle.options
        .map((opt, i) => {
          return `
                            <label class="option-label">
                                <input type="radio" name="choice-${index}" value="${opt}" />
                                <span>${opt}</span>
                            </label>
                        `
        })
        .join('')
      inputHtml = `
                        <div class="input-group">
                            <label>Escolha a resposta:</label>
                            <div class="options-container" id="options-${index}">
                                ${optionsHtml}
                            </div>
                            <div class="error-message" id="error-${index}">❌ Resposta incorreta. Tente novamente!</div>
                            <div class="success-message" id="success-${index}">✅ Correto! Próximo desafio...</div>
                        </div>
                    `
    }

    card.innerHTML = `
                    <div class="puzzle-number">Desafio ${
                      puzzle.number
                    } de 10</div>
                    <div class="puzzle-emoji">${puzzle.emoji}</div>
                    <h2 class="puzzle-title">${puzzle.title}</h2>
                    
                    <div class="puzzle-hint">
                        <div class="puzzle-hint-label">Dica:</div>
                        <div>${puzzle.hint}</div>
                    </div>

                    ${inputHtml}

                    <div class="button-group">
                        <button class="btn-prev" onclick="prevPuzzle()" ${
                          index === 0 ? 'disabled' : ''
                        }>← Anterior</button>
                        <button class="btn-submit" onclick="submitAnswer(${index})">Verificar Resposta</button>
                    </div>
                `
    container.appendChild(card)
  })
}

// MOSTRAR PUZZLE
function showPuzzle(index) {
  document.querySelectorAll('.puzzle-card').forEach(card => {
    card.classList.remove('active')
  })
  const card = document.getElementById(`puzzle-${index}`)
  if (!card) return
  card.classList.add('active')

  setTimeout(() => {
    const firstRadio = document.querySelector(
      `#puzzle-${index} input[type="radio"]`
    )
    if (firstRadio) firstRadio.focus()
  }, 100)
}

// NORMALIZAR
const normalize = str => {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

// VERIFICAR RESPOSTA
function submitAnswer(index) {
  const puzzle = puzzles[index]
  const errorMsg = document.getElementById(`error-${index}`)
  const successMsg = document.getElementById(`success-${index}`)

  let userAnswer = ''

  const selected = document.querySelector(
    `input[name="choice-${index}"]:checked`
  )
  if (!selected) {
    errorMsg.textContent = '❌ Selecione uma opção antes de verificar!'
    errorMsg.classList.add('show')
    setTimeout(() => errorMsg.classList.remove('show'), 1500)
    return
  }
  userAnswer = selected.value

  if (normalize(userAnswer) === normalize(puzzle.answer)) {
    if (!puzzle.completed) {
      puzzle.completed = true
      completedPuzzles++
      updateProgress()
    }

    errorMsg.classList.remove('show')
    successMsg.classList.add('show')

    document
      .querySelectorAll(`#options-${index} input[type="radio"]`)
      .forEach(r => (r.disabled = true))

    setTimeout(() => {
      if (completedPuzzles >= puzzles.length) {
        showFinalMessage()
      } else {
        let next = index + 1
        while (next < puzzles.length && puzzles[next].completed) next++
        if (next >= puzzles.length) {
          next = puzzles.findIndex(p => !p.completed)
        }
        if (next >= 0) {
          currentPuzzle = next
          showPuzzle(currentPuzzle)
        }
      }
    }, 1000)
  } else {
    errorMsg.textContent = '❌ Resposta incorreta. Tente novamente!'
    errorMsg.classList.add('show')
    successMsg.classList.remove('show')

    setTimeout(() => errorMsg.classList.remove('show'), 1200)
  }
}

// PUZZLE ANTERIOR
function prevPuzzle() {
  if (currentPuzzle > 0) {
    currentPuzzle--
    showPuzzle(currentPuzzle)
  }
}

// ATUALIZAR PROGRESSO
function updateProgress() {
  const percentage = (completedPuzzles / puzzles.length) * 100
  document.getElementById('progress-fill').style.width = percentage + '%'
  document.getElementById('progress-count').textContent = completedPuzzles
}

// MOSTRAR MENSAGEM FINAL
function showFinalMessage() {
  document.getElementById('puzzles-container').style.display = 'none'
  document.getElementById('final-message').classList.add('show')
  createConfetti()
}

// CRIAR CONFETE MELHORADO
function createConfetti() {
  const colors = [
    '#ff6b6b',
    '#ff8c42',
    '#ffd93d',
    '#6bcf7f',
    '#4d96ff',
    '#ee5a6f',
    '#a29bfe'
  ]
  const hearts = ['💖', '💕', '💗', '💓', '💝']

  // Confete colorido
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div')
    confetti.className = 'confetti'
    confetti.style.left = Math.random() * 100 + '%'
    confetti.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)]
    confetti.style.animation = `fall ${2 + Math.random() * 1}s linear forwards`
    document.body.appendChild(confetti)

    setTimeout(() => confetti.remove(), 3000)
  }

  // Corações caindo
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement('div')
      heart.className = 'confetti heart'
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
      heart.style.left = Math.random() * 100 + '%'
      heart.style.animation = `fall ${3 + Math.random() * 2}s linear forwards`
      document.body.appendChild(heart)

      setTimeout(() => heart.remove(), 5000)
    }, i * 100)
  }
}

// INICIAR
init()
