// ══════════════════════════════════════
//  READSCORE — JAVASCRIPT
//  Sections:
//  1. State
//  2. Page Navigation
//  3. Auth (Login / Register)
//  4. Assessment Logic
//  5. Results
//  6. Classroom
//  7. Utilities (Toast)
// ══════════════════════════════════════

// ─────────────────────────────────────
//  1. STATE
// ─────────────────────────────────────
const questions = [
  { q: "What percentage of Earth's water is fresh water?",                                                        bloom: "Remember"  },
  { q: "In your own words, why is clean water important for living things?",                                      bloom: "Understand" },
  { q: "What are two specific actions mentioned in the passage that people can do to save water at home?",        bloom: "Remember"  },
  { q: "How does water pollution affect both people and the environment based on the passage?",                   bloom: "Analyze"   },
  { q: "If your community is experiencing a water shortage, what solutions from the passage would you apply and why?", bloom: "Apply" },
];

let currentQ = 0;
let answers   = Array(questions.length).fill('');
const sampleAnswers = [
  "About three percent of Earth's water is fresh water, because most of it is frozen in glaciers and ice caps.",
  "Clean water is essential because living things need it to survive and stay healthy.",
  "Turn off the faucet while brushing teeth, fix leaky pipes, and collect rainwater for plants.",
  "Pollution makes water unsafe and harms both people and the environment.",
  "Repair leaks and gather rainwater when the community faces water shortages."
];

// ─────────────────────────────────────
//  2. PAGE NAVIGATION
// ─────────────────────────────────────
function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo(0, 0);
}

// ─────────────────────────────────────
//  3. AUTH — LOGIN / REGISTER
// ─────────────────────────────────────
function handleLogin() {
  const username = document.querySelector('#page-home input[type="text"]').value.trim().toLowerCase();

  if (username === 'teacher' || username === 'admin') {
    showPage('page-classroom');
  } else {
    showPage('page-reading');
    document.getElementById('reading-fill').style.width = '15%';
  }
}

function handleCodeJoin() {
  const code = document.getElementById('home-class-code').value.trim().toUpperCase();

  if (code === 'RC-4821') {
    showPage('page-reading');
    document.getElementById('reading-fill').style.width = '15%';
    showToast('✓', 'Joined classroom RC-4821!');
  } else {
    showToast('✗', 'Invalid class code. Try RC-4821.');
  }
}

function showStudentCodeEntry() {
  const input = document.getElementById('home-class-code');
  input.focus();
  input.scrollIntoView({ behavior: 'smooth' });
}

function handleRegister() {
  const isTeacher = document.getElementById('role-teacher').classList.contains('active');

  if (isTeacher) {
    showPage('page-classroom');
    showToast('✓', 'Welcome, Teacher! Your classroom is ready.');
  } else {
    showPage('page-reading');
    document.getElementById('reading-fill').style.width = '15%';
    showToast('✓', 'Account created! Time to read.');
  }
}

function setRole(role) {
  document.getElementById('role-teacher').classList.toggle('active', role === 'teacher');
  document.getElementById('role-student').classList.toggle('active', role === 'student');
  document.getElementById('classroom-field').style.display = role === 'teacher' ? 'block' : 'none';
}

// ─────────────────────────────────────
//  4. ASSESSMENT LOGIC
// ─────────────────────────────────────
function initAssessment() {
  currentQ = 0;
  answers  = Array(questions.length).fill('');
  renderQ();
  renderQNav();
}

function renderQ() {
  const q = questions[currentQ];

  document.getElementById('q-text').textContent             = q.q;
  document.getElementById('a-text').value                   = answers[currentQ];
  document.getElementById('qa-progress-label').textContent  = `Question ${currentQ + 1} of ${questions.length}`;
  document.getElementById('word-count').textContent         = wordCount(answers[currentQ]) + ' words';

  const bloomClass = {
    Remember:   'bloom-remember',
    Understand: 'bloom-understand',
    Apply:      'bloom-apply',
    Analyze:    'bloom-analyze',
    Evaluate:   'bloom-evaluate',
    Create:     'bloom-create',
  }[q.bloom] || 'bloom-remember';

  document.getElementById('bloom-badge-wrap').innerHTML =
    `<span class="bloom-badge ${bloomClass}">Bloom's: ${q.bloom}</span>`;

  renderQNav();
}

function renderQNav() {
  const nav = document.getElementById('q-nav');
  nav.innerHTML = '';

  questions.forEach((_, i) => {
    const btn = document.createElement('div');
    btn.className = 'q-num'
      + (i === currentQ  ? ' active'   : '')
      + (answers[i]      ? ' answered' : '');
    btn.textContent = i + 1;
    btn.onclick = () => { currentQ = i; renderQ(); };
    nav.appendChild(btn);
  });
}

function saveAnswer() {
  answers[currentQ] = document.getElementById('a-text').value;
  document.getElementById('word-count').textContent = wordCount(answers[currentQ]) + ' words';
  renderQNav();
}

function wordCount(str) {
  return str.trim() ? str.trim().split(/\s+/).length : 0;
}

function changeQ(dir) {
  saveAnswer();
  currentQ = Math.max(0, Math.min(questions.length - 1, currentQ + dir));
  renderQ();
}

function submitAssessment() {
  saveAnswer();
  const unanswered = answers.filter(a => !a.trim()).length;

  if (unanswered > 0) {
    showToast('⚠', `${unanswered} question(s) still unanswered.`);
    return;
  }

  showPage('page-result');
  showResults();
}

// ─────────────────────────────────────
//  5. RESULTS  (simulated scoring)
// ─────────────────────────────────────
function showResults() {
  const scores = { remember: 90, understand: 82, apply: 74, analyze: 58 };
  const overall = Math.round(
    (scores.remember + scores.understand + scores.apply + scores.analyze) / 4
  );

  let level, levelDesc;
  if (overall >= 80)      { level = 'Independent';  levelDesc = 'Student reads without difficulty'; }
  else if (overall >= 59) { level = 'Instructional'; levelDesc = 'Student needs guided instruction'; }
  else                    { level = 'Frustration';   levelDesc = 'Student struggles significantly'; }

  document.getElementById('res-score').textContent     = overall + '%';
  document.getElementById('res-level').textContent     = level;
  document.getElementById('res-level-desc').textContent = levelDesc;
  document.getElementById('res-bloom-percent').textContent = overall + '%';
  document.getElementById('bar-bloom').style.width = overall + '%';

  renderAnswerPreview(answers.map((text, idx) => text.trim() ? text : sampleAnswers[idx]));

  // Animate bars after paint
  setTimeout(() => {
    setBar('remember',  scores.remember);
    setBar('understand', scores.understand);
    setBar('apply',     scores.apply);
    setBar('analyze',   scores.analyze);
  }, 200);
}

function renderAnswerPreview(answerList) {
  const container = document.getElementById('answer-preview-list');
  container.innerHTML = '';

  answerList.forEach((answer, index) => {
    const item = document.createElement('div');
    item.className = 'preview-item';

    const row = document.createElement('div');
    row.className = 'preview-row';
    row.onclick = () => item.classList.toggle('expanded');

    const title = document.createElement('div');
    title.className = 'preview-title';
    title.innerHTML = `<div class="item-number">${index + 1}</div><span>Student answer preview</span>`;

    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '2');
    icon.setAttribute('stroke-linecap', 'round');
    icon.setAttribute('stroke-linejoin', 'round');
    icon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';

    row.appendChild(title);
    row.appendChild(icon);

    const body = document.createElement('div');
    body.className = 'preview-body';
    body.textContent = answer;

    item.appendChild(row);
    item.appendChild(body);
    container.appendChild(item);
  });
}

function setBar(id, pct) {
  document.getElementById('bar-' + id).style.width    = pct + '%';
  document.getElementById('pct-' + id).textContent    = pct + '%';
}

// ─────────────────────────────────────
//  6. CLASSROOM
// ─────────────────────────────────────
function viewStudentResult(name, score, level) {
  showPage('page-result');
  document.querySelector('#page-result h2').textContent = `Results — ${name}`;
  document.getElementById('res-score').textContent      = score + '%';
  document.getElementById('res-level').textContent      = level;

  const descs = {
    Independent:  'Reads without difficulty',
    Instructional:'Needs guided instruction',
    Frustration:  'Struggles significantly',
  };
  document.getElementById('res-level-desc').textContent = descs[level] || '';
  document.getElementById('res-bloom-percent').textContent = score + '%';
  document.getElementById('bar-bloom').style.width = score + '%';

  renderAnswerPreview(sampleAnswers);

  setTimeout(() => {
    setBar('remember',   85 + Math.round(Math.random() * 10));
    setBar('understand', 70 + Math.round(Math.random() * 15));
    setBar('apply',      55 + Math.round(Math.random() * 20));
    setBar('analyze',    40 + Math.round(Math.random() * 20));
  }, 200);
}

function copyCode() {
  navigator.clipboard?.writeText('RC-4821').catch(() => {});
  showToast('✓', 'Class code RC-4821 copied!');
}

function showNewAssessmentModal() {
  showToast('📋', 'New assessment flow coming soon!');
}

// ─────────────────────────────────────
//  7. UTILITIES — TOAST
// ─────────────────────────────────────
let toastTimer;

function showToast(icon, msg) {
  clearTimeout(toastTimer);
  document.getElementById('toast-icon').textContent = icon;
  document.getElementById('toast-msg').textContent  = msg;
  document.getElementById('toast').classList.add('show');
  toastTimer = setTimeout(() => document.getElementById('toast').classList.remove('show'), 3000);
}
