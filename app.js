// Mock problem database in case fetching problems.json fails (CORS on file:// protocol)
const fallbackProblems = [
  {
    "id": "10",
    "name": "Suma Cifrelor",
    "difficulty": "Ușoară",
    "topic": "Algoritmi Elementari",
    "description": "Se dă un număr natural $n$. Să se scrie un program care determină și afișează suma cifrelor sale.",
    "timeLimit": "0.1s",
    "memoryLimit": "64MB",
    "constraints": "$0 \\le n \\le 2.000.000.000$",
    "inputFormat": "De la tastatură se citește numărul natural $n$.",
    "outputFormat": "Pe ecran se va afișa suma cifrelor lui $n$.",
    "examples": [
      {
        "input": "1234",
        "output": "10",
        "explanation": "Suma cifrelor numărului 1234 este 1 + 2 + 3 + 4 = 10."
      },
      {
        "input": "0",
        "output": "0",
        "explanation": "Suma cifrelor lui 0 este 0."
      }
    ],
    "templates": {
      "cpp": "#include <iostream>\n\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    \n    // Scrie codul tău aici\n    \n    return 0;\n}",
      "python": "# Citește n de la tastatură\nn = int(input())\n\n# Scrie codul tău aici\n",
      "java": "import java.util.Scanner;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner scanner = new Scanner(System.in);\n        int n = scanner.nextInt();\n        \n        // Scrie codul tău aici\n    }\n}"
    },
    "hints": [
      "Pentru a extrage cifrele unui număr de la dreapta la stânga, poți folosi operatorul modulo `% 10` pentru a lua ultima cifră și operatorul de împărțire întreagă `/ 10` (sau `// 10` în Python) pentru a o elimina la fiecare pas.",
      "Vei avea nevoie de o structură repetitivă (de exemplu un `while` sau `cat timp`) care se execută cât timp numărul tău este mai mare decât 0. La fiecare pas, extragi ultima cifră, o adaugi la o variabilă de sumă (inițializată cu 0) și actualizezi numărul împărțindu-l la 10.",
      "Atenție la cazul special în care $n = 0$! Dacă n este 0, programul tău trebuie să afișeze tot 0. Structura repetitivă `while (n > 0)` nu va rula niciodată pentru $n=0$, dar din fericire suma cifrelor fiind inițializată cu 0, rezultatul final va fi corect. Iată pseudocodul:\n\n```text\nsuma = 0\ncât_timp n > 0 execută\n    suma = suma + n % 10\n    n = n / 10\nsfârșit_cât_timp\nafișează suma\n```"
    ]
  },
  {
    "id": "506",
    "name": "Căutare Binară",
    "difficulty": "Medie",
    "topic": "Căutare și Sortare",
    "description": "Se dă un vector cu $n$ elemente întregi, ordonate strict crescător, și $m$ valori de căutat. Pentru fiecare valoare de căutat, să se determine dacă se află sau nu în vector.",
    "timeLimit": "0.5s",
    "memoryLimit": "128MB",
    "constraints": "$1 \\le n, m \\le 100.000$, elementele vectorului și valorile de căutat sunt în intervalul $[-1.000.000.000, 1.000.000.000]$.",
    "inputFormat": "Programul citește de la tastatură numărul $n$, iar apoi cele $n$ elemente ale vectorului ordonat. Ulterior, se citește numărul $m$ și cele $m$ valori ce trebuie căutate.",
    "outputFormat": "Se vor afișa pe ecran $m$ valori separate prin spațiu: `1` dacă elementul căutat se află în vector, respectiv `0` în caz contrar.",
    "examples": [
      {
        "input": "5\n1 3 5 7 9\n3\n3 4 7",
        "output": "1 0 1",
        "explanation": "Valoarea 3 se află în vector (poziția 2, deci 1).\nValoarea 4 nu se află în vector (deci 0).\nValoarea 7 se află în vector (poziția 4, deci 1)."
      }
    ],
    "templates": {
      "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nint main() {\n    // Optimizare citire\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    int n;\n    cin >> n;\n    vector<int> v(n);\n    for(int i = 0; i < n; i++) {\n        cin >> v[i];\n    }\n    \n    int m;\n    cin >> m;\n    // Scrie algoritmul de căutare binară aici\n    \n    return 0;\n}",
      "python": "import sys\n\ndef main():\n    # Citire rapidă a tuturor datelor\n    input_data = sys.stdin.read().split()\n    if not input_data:\n        return\n    \n    n = int(input_data[0])\n    v = [int(x) for x in input_data[1:n+1]]\n    \n    m = int(input_data[n+1])\n    queries = [int(x) for x in input_data[n+2:]]\n    \n    # Scrie codul tău de căutare binară aici\n\nif __name__ == '__main__':\n    main()",
      "java": "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.util.StringTokenizer;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Scrie codul tău aici\n    }\n}"
    },
    "hints": [
      "Deoarece vectorul este deja sortat, o căutare secvențială (liniară) $\\mathcal{O}(n)$ pentru fiecare query va dura în total $\\mathcal{O}(n \\times m)$ operații. Pentru $n, m = 100.000$, acest lucru înseamnă $10^{10}$ operații, ceea ce va depăși limita de timp de 0.5s. Trebuie să implementezi Căutarea Binară, care face doar $\\mathcal{O}(\\log n)$ operații per căutare.",
      "Căutarea binară funcționează prin înjumătățirea intervalului de căutare. Menții doi indici: `stanga = 0` și `dreapta = n - 1`. Cât timp `stanga <= dreapta`, calculezi mijlocul `mijloc = (stanga + dreapta) / 2`. Dacă `v[mijloc]` este exact valoarea căutată $x$, te oprești și întorci `1`. Dacă `v[mijloc] < x`, înseamnă că elementul poate fi doar în partea dreaptă, deci muți `stanga = mijloc + 1`. Altfel, muți `dreapta = mijloc - 1`.",
      "În C++, citirea rapidă este crucială pentru a evita TLE. Folosește `ios_base::sync_with_stdio(false); cin.tie(NULL);` la începutul funcției `main` și evită folosirea `endl` (folosește `\\n`). Iată structura funcției de căutare binară:\n\n```cpp\nbool cauta_binar(const vector<int>& v, int x) {\n    int st = 0, dr = v.size() - 1;\n    while (st <= dr) {\n        int mij = st + (dr - st) / 2;\n        if (v[mij] == x) return true;\n        if (v[mij] < x) st = mij + 1;\n        else dr = mij - 1;\n    }\n    return false;\n}\n```"
    ]
  },
  {
    "id": "539",
    "name": "DFS - Componente Conexe",
    "difficulty": "Dificilă",
    "topic": "Teoria Grafurilor",
    "description": "Se dă un graf neorientat cu $n$ vârfuri și $m$ muchii. Să se determine numărul de componente conexe ale grafului și să se afișeze vârfurile din fiecare componentă conexă.",
    "timeLimit": "0.2s",
    "memoryLimit": "64MB",
    "constraints": "$1 \\le n \\le 10.000$, $1 \\le m \\le 20.000$. Vârfurile sunt numerotate de la $1$ la $n$.",
    "inputFormat": "Fișierul de intrare conține pe prima linie numerele $n$ și $m$. Următoarele $m$ linii conțin câte două numere $x$ și $y$, reprezentând o muchie între vârfurile $x$ și $y$.",
    "outputFormat": "Pe prima linie se va afișa numărul de componente conexe. Fiecare dintre următoarele linii va conține vârfurile unei componente conexe, ordonate crescător, separate prin spațiu.",
    "examples": [
      {
        "input": "5 3\n1 2\n1 3\n4 5",
        "output": "2\n1 2 3\n4 5",
        "explanation": "Graful are 2 componente conexe:\nPrima componentă conține vârfurile {1, 2, 3}.\nA doua componentă conține vârfurile {4, 5}."
      }
    ],
    "templates": {
      "cpp": "#include <iostream>\n#include <vector>\n#include <algorithm>\n\nusing namespace std;\n\nint n, m;\nvector<vector<int>> adj;\nvector<bool> viz;\n\nvoid dfs(int nod, vector<int>& comp) {\n    // Scrie funcția DFS aici\n}\n\nint main() {\n    cin >> n >> m;\n    adj.resize(n + 1);\n    viz.resize(n + 1, false);\n    \n    for(int i = 0; i < m; i++) {\n        int u, v;\n        cin >> u >> v;\n        adj[u].push_back(v);\n        adj[v].push_back(u);\n    }\n    \n    // Scrie logica de determinare a componentelor conexe\n    \n    return 0;\n}",
      "python": "import sys\n\n# Crește limita pentru recursivitate\nsys.setrecursionlimit(20000)\n\ndef dfs(nod, adj, viz, comp):\n    # Scrie funcția DFS aici\n    pass\n\ndef main():\n    # Scrie codul de citire și parcurgere aici\n    pass\n\nif __name__ == '__main__':\n    main()",
      "java": "import java.io.BufferedReader;\nimport java.io.InputStreamReader;\nimport java.util.StringTokenizer;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        // Scrie codul tău aici\n    }\n}"
    },
    "hints": [
      "Pentru grafuri cu $N = 10.000$, folosirea unei matrice de adiacență de $10.000 \\times 10.000$ elemente ar consuma prea multă memorie (100 MB, depășind limita de 64MB) și timp la parcurgere. Trebuie să folosești liste de adiacență, reprezentate prin `vector<vector<int>> adj` în C++ sau o listă de liste în Python.",
      "O componentă conexă este un subgraf în care există drum între oricare două vârfuri. Parcurgerea în adâncime (DFS) pornită dintr-un nod nevizitat va vizita toate nodurile din componenta sa conexă. Pentru a găsi toate componentele conexe, parcurgi toate nodurile de la $1$ la $n$. Dacă un nod $i$ nu este vizitat, înseamnă că am găsit o nouă componentă. Pornești un DFS din el, colectezi toate nodurile vizitate, le sortezi crescător, și le adaugi la lista finală.",
      "Asigură-te că sortezi elementele din fiecare componentă conexă înainte de afișare. Iată algoritmul DFS simplificat:\n\n```cpp\nvoid dfs(int nod, vector<int>& comp) {\n    viz[nod] = true;\n    comp.push_back(nod);\n    for(int vecin : adj[nod]) {\n        if(!viz[vecin]) {\n            dfs(vecin, comp);\n        }\n    }\n}\n```"
    ]
  }
];

// App State
let problems = [];
let currentProblemIndex = 0;
let currentLanguage = 'cpp';
let editorCodes = {}; // Cache codes as problemId_lang
let chatHistories = {}; // Cache chat history per problem
let hintLevels = {}; // Track current hint level per problem (0 to 3)
let isTyping = false;

// DOM Elements
const problemSelect = document.getElementById('problemSelect');
const difficultyBadge = document.getElementById('difficultyBadge');
const problemTopic = document.getElementById('problemTopic');
const timeLimitSpan = document.getElementById('timeLimitSpan');
const memoryLimitSpan = document.getElementById('memoryLimitSpan');
const constraintsContent = document.getElementById('constraintsContent');
const problemTitle = document.getElementById('problemTitle');
const problemDesc = document.getElementById('problemDesc');
const inputFormatDesc = document.getElementById('inputFormatDesc');
const outputFormatDesc = document.getElementById('outputFormatDesc');
const examplesList = document.getElementById('examplesList');

const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

const langSelect = document.getElementById('langSelect');
const codeTextarea = document.getElementById('codeTextarea');
const lineNumbersDiv = document.getElementById('lineNumbers');
const resetCodeBtn = document.getElementById('resetCodeBtn');
const runCodeBtn = document.getElementById('runCodeBtn');
const submitCodeBtn = document.getElementById('submitCodeBtn');

const chatMessages = document.getElementById('chatMessages');
const chatInputForm = document.getElementById('chatInputForm');
const chatInput = document.getElementById('chatInput');
const resetChatBtn = document.getElementById('resetChatBtn');

const hintBtn = document.getElementById('hintBtn');
const bugBtn = document.getElementById('bugBtn');
const complexityBtn = document.getElementById('complexityBtn');

const resultsConsole = document.getElementById('resultsConsole');

// Initialize App
async function init() {
  try {
    const response = await fetch('problems.json');
    if (response.ok) {
      problems = await response.json();
    } else {
      problems = fallbackProblems;
    }
  } catch (e) {
    console.warn('Could not fetch problems.json, using fallback data.', e);
    problems = fallbackProblems;
  }

  setupProblemDropdown();
  setupEventListeners();
  loadProblem(0);
}

// Populate dropdown
function setupProblemDropdown() {
  problemSelect.innerHTML = '';
  problems.forEach((prob, index) => {
    const opt = document.createElement('option');
    opt.value = index;
    opt.textContent = `#${prob.id} - ${prob.name}`;
    problemSelect.appendChild(opt);
  });
}

// Setup Event Listeners
function setupEventListeners() {
  problemSelect.addEventListener('change', (e) => {
    loadProblem(parseInt(e.target.value));
  });

  langSelect.addEventListener('change', (e) => {
    // Save current code
    const currentProb = problems[currentProblemIndex];
    const key = `${currentProb.id}_${currentLanguage}`;
    editorCodes[key] = codeTextarea.value;

    currentLanguage = e.target.value;
    loadTemplateOrSavedCode();
  });

  // Tab switching
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      switchTab(tabId);
    });
  });

  // Editor line syncing & tab key overrides
  codeTextarea.addEventListener('input', () => {
    updateLineNumbers();
  });
  
  codeTextarea.addEventListener('scroll', () => {
    lineNumbersDiv.scrollTop = codeTextarea.scrollTop;
  });

  codeTextarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = codeTextarea.selectionStart;
      const end = codeTextarea.selectionEnd;
      const val = codeTextarea.value;
      codeTextarea.value = val.substring(0, start) + '    ' + val.substring(end);
      codeTextarea.selectionStart = codeTextarea.selectionEnd = start + 4;
      updateLineNumbers();
    }
  });

  resetCodeBtn.addEventListener('click', () => {
    if (confirm('Sigur vrei să resetezi codul la template-ul inițial?')) {
      const currentProb = problems[currentProblemIndex];
      codeTextarea.value = currentProb.templates[currentLanguage] || '';
      updateLineNumbers();
    }
  });

  // Run and Submit buttons
  runCodeBtn.addEventListener('click', () => runTests(false));
  submitCodeBtn.addEventListener('click', () => runTests(true));

  // Chat submission
  chatInputForm.addEventListener('submit', (e) => {
    e.preventDefault();
    handleUserChatMessage();
  });

  resetChatBtn.addEventListener('click', () => {
    if (confirm('Sigur vrei să ștergi istoricul conversației pentru această problemă?')) {
      const currentProb = problems[currentProblemIndex];
      chatHistories[currentProb.id] = [];
      hintLevels[currentProb.id] = 0;
      chatMessages.innerHTML = '';
      sendWelcomeMessage(currentProb);
    }
  });

  // Quick Action Socratic Buttons
  hintBtn.addEventListener('click', () => handleTutorQuickAction('hint'));
  bugBtn.addEventListener('click', () => handleTutorQuickAction('bug'));
  complexityBtn.addEventListener('click', () => handleTutorQuickAction('complexity'));
}

// Load a specific problem
function loadProblem(index) {
  currentProblemIndex = index;
  const prob = problems[index];

  // Set selectors
  problemSelect.value = index;

  // Metadata
  problemTitle.textContent = `#${prob.id} - ${prob.name}`;
  problemTopic.textContent = prob.topic;
  
  difficultyBadge.textContent = prob.difficulty;
  difficultyBadge.className = `difficulty-badge ${prob.difficulty.toLowerCase()}`;

  timeLimitSpan.innerHTML = `<span>${prob.timeLimit}</span>`;
  memoryLimitSpan.innerHTML = `<span>${prob.memoryLimit}</span>`;
  constraintsContent.innerHTML = formatMathText(prob.constraints);

  // Descriptions
  problemDesc.innerHTML = formatMathText(prob.description);
  inputFormatDesc.innerHTML = formatMathText(prob.inputFormat);
  outputFormatDesc.innerHTML = formatMathText(prob.outputFormat);

  // Examples
  examplesList.innerHTML = '';
  prob.examples.forEach((ex, idx) => {
    const exBox = document.createElement('div');
    exBox.className = 'example-box';
    exBox.innerHTML = `
      <div class="example-header">
        <span>Exemplul ${idx + 1}</span>
      </div>
      <div class="example-content">
        <div class="example-io-col">
          <div class="example-label">Intrare</div>
          <div class="example-data">${ex.input}</div>
        </div>
        <div class="example-io-col">
          <div class="example-label">Ieșire</div>
          <div class="example-data">${ex.output}</div>
        </div>
      </div>
      ${ex.explanation ? `<div class="example-explanation"><strong>Explicație:</strong> ${formatMathText(ex.explanation)}</div>` : ''}
    `;
    examplesList.appendChild(exBox);
  });

  // Language templates / saved code
  loadTemplateOrSavedCode();

  // Chat loading
  if (!chatHistories[prob.id]) {
    chatHistories[prob.id] = [];
    hintLevels[prob.id] = 0;
  }
  
  chatMessages.innerHTML = '';
  if (chatHistories[prob.id].length === 0) {
    sendWelcomeMessage(prob);
  } else {
    chatHistories[prob.id].forEach(msg => {
      displayMessage(msg.sender, msg.text);
    });
  }

  // Switch to problem tab initially
  switchTab('problem');
}

// Load code helper
function loadTemplateOrSavedCode() {
  const currentProb = problems[currentProblemIndex];
  const key = `${currentProb.id}_${currentLanguage}`;
  
  if (editorCodes[key] !== undefined) {
    codeTextarea.value = editorCodes[key];
  } else {
    codeTextarea.value = currentProb.templates[currentLanguage] || '';
  }
  updateLineNumbers();
}

// Sync Editor lines
function updateLineNumbers() {
  const lines = codeTextarea.value.split('\n');
  const count = lines.length;
  let numbersHtml = '';
  for (let i = 1; i <= Math.max(count, 15); i++) {
    numbersHtml += `<div>${i}</div>`;
  }
  lineNumbersDiv.innerHTML = numbersHtml;
}

// Switch Right Pane tab
function switchTab(tabId) {
  tabButtons.forEach(btn => {
    if (btn.getAttribute('data-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  tabPanes.forEach(pane => {
    if (pane.id === `${tabId}Tab`) {
      pane.classList.add('active');
    } else {
      pane.classList.remove('active');
    }
  });
}

// Render Markdown-like patterns and Math symbols (LaTeX inline fallback)
function formatMathText(text) {
  if (!text) return '';
  // Convert basic markdown backticks to code tags and bold asterisks
  let formatted = text
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\$([^\$]+)\$/g, '<span style="font-family: var(--font-code); color: #06B6D4;">$1</span>');
  
  // Format math equations representation (basic rendering helper)
  formatted = formatted
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\times/g, ' × ')
    .replace(/\\mathcal\{O\}/g, 'O')
    .replace(/\\log/g, 'log');

  return formatted;
}

// Display chat message in bubble
function displayMessage(sender, text) {
  const msgWrapper = document.createElement('div');
  msgWrapper.className = `message ${sender}`;
  
  const senderLabel = sender === 'user' ? 'Tu' : 'Tutore AI';
  
  // Format the body text nicely with code block matching
  let htmlContent = formatMathText(text);
  
  // Custom multi-line markdown block simulation
  htmlContent = htmlContent.replace(/```(cpp|python|text)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });

  msgWrapper.innerHTML = `
    <span class="msg-sender">${senderLabel}</span>
    <div class="msg-bubble">${htmlContent}</div>
  `;
  
  chatMessages.appendChild(msgWrapper);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function addMessageToStateAndDisplay(sender, text) {
  const currentProb = problems[currentProblemIndex];
  const msg = { sender, text, timestamp: new Date() };
  chatHistories[currentProb.id].push(msg);
  displayMessage(sender, text);
}

// Socratic typing indicator
function showTypingIndicator() {
  if (isTyping) return;
  isTyping = true;
  
  const indicator = document.createElement('div');
  indicator.id = 'tutorTypingIndicator';
  indicator.className = 'message tutor';
  indicator.innerHTML = `
    <span class="msg-sender">Tutore AI</span>
    <div class="msg-bubble" style="padding: 0.5rem 1rem;">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  chatMessages.appendChild(indicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function hideTypingIndicator() {
  const indicator = document.getElementById('tutorTypingIndicator');
  if (indicator) {
    indicator.remove();
  }
  isTyping = false;
}

// Welcome greeting helper
function sendWelcomeMessage(prob) {
  const welcomeText = `Salut! Eu sunt tutorele tău de programare competitivă.\n\nTe pot ajuta să înțelegi și să rezolvi problema **${prob.name}** (${prob.topic}).\n\nCum vrei să începem? Poți scrie prima ta idee de rezolvare în editor, sau poți folosi butoanele de indicii din partea de jos dacă ai nevoie de îndrumare! 🚀`;
  addMessageToStateAndDisplay('tutor', welcomeText);
}

// Handle User Chat Input
function handleUserChatMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  chatInput.value = '';
  addMessageToStateAndDisplay('user', text);

  // Generate Tutor Socratic response
  showTypingIndicator();
  (async () => {
    const currentCode = codeTextarea.value;
    const tutorResponse = await fetchTutorResponse(text, currentCode);
    hideTypingIndicator();
    addMessageToStateAndDisplay('tutor', tutorResponse);
  })();
}

// Live connection to the local fine-tuned model via Ollama
const MODEL_NAME = "qwen2.5-coder:7b-instruct";

async function fetchTutorResponse(userPrompt, userCode) {
  const prob = problems[currentProblemIndex];
  const system = "Ești un tutore socratic de programare competitivă și răspunzi în limba română. Nu oferi soluția completă gata scrisă. Oferă indicii treptate, pune întrebări care ghidează elevul, explică ideile și complexitatea. Fii concis și clar.";
  const context = "Problema: " + prob.name +
    "\nCerință: " + (prob.description || "") +
    "\n\nCodul curent al elevului (" + (currentLanguage || "cpp") + "):\n" +
    (userCode && userCode.trim() ? userCode : "(editor gol)");
  try {
    const res = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL_NAME,
        stream: false,
        options: { temperature: 0.3 },
        messages: [
          { role: "system", content: system },
          { role: "user", content: context + "\n\nÎntrebarea elevului: " + userPrompt }
        ]
      })
    });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const data = await res.json();
    const reply = data.message && data.message.content ? data.message.content.trim() : "";
    return reply || mockTutorResponse(userPrompt, userCode);
  } catch (error) {
    console.warn("Model indisponibil, folosesc răspuns local:", error);
    return mockTutorResponse(userPrompt, userCode);
  }
}

// Offline fallback (used only if the model is not reachable)
function mockTutorResponse(userPrompt, userCode) {
  const prob = problems[currentProblemIndex];
  const promptLower = userPrompt.toLowerCase();
  
  if (promptLower.includes('complexitate') || promptLower.includes('cat de rapid') || promptLower.includes('timp')) {
    return getComplexityExplanation(prob);
  }
  
  if (promptLower.includes('greseala') || promptLower.includes('bug') || promptLower.includes('eroare') || promptLower.includes('gresit')) {
    return getBugExplanation(prob, userCode);
  }

  if (promptLower.includes('indiciu') || promptLower.includes('ajutor') || promptLower.includes('hint')) {
    return triggerProgressiveHint(prob);
  }

  // General conversational logic based on the active problem
  if (prob.id === "10") { // Suma cifrelor
    if (promptLower.includes('de unde incep') || promptLower.includes('cum fac')) {
      return "Pentru a găsi suma cifrelor, gândește-te cum poți lua cifră cu cifră de la capătul numărului. De exemplu, pentru `1234`, cum putem obține separat cifra `4`?";
    }
    return "Interesantă abordare! În loc să îți dau codul gata scris, gândește-te: dacă facem `n % 10`, ce valoare obținem? Cum ne ajută asta să calculăm suma totală a cifrelor?";
  } 
  
  else if (prob.id === "506") { // Căutare binară
    if (promptLower.includes('liniar') || promptLower.includes('for') || promptLower.includes('cautare normala')) {
      return "Dacă cauți elementul parcurgând vectorul de la stânga la dreapta cu o buclă `for`, complexitatea va fi de $\\mathcal{O}(n)$ per căutare. Din moment ce avem $m$ căutări, complexitatea totală devine $\\mathcal{O}(n \\times m)$. De ce crezi că această metodă ar lua TLE (Time Limit Exceeded) la restricțiile problemei?";
    }
    return "Căutarea binară se bazează pe principiul Divide et Impera. Cum determini la fiecare pas care este jumătatea în care se poate afla elementul căutat, știind că vectorul este ordonat crescător?";
  } 
  
  else { // DFS - Componente conexe
    if (promptLower.includes('matrice') || promptLower.includes('tabel')) {
      return "Dacă folosești o matrice de adiacență pentru $N = 10.000$ noduri, vei aloca o zonă de memorie de $10.000 \\times 10.000 = 100.000.000$ de întregi (aproximativ 400MB), depășind limita de 64MB. Cum crezi că putem stoca conexiunile grafului într-un mod mai eficient, salvând doar muchiile reale?";
    }
    return "DFS-ul funcționează ca un explorator într-un labirint: merge cât mai adânc posibil pe drumul curent, iar când nu mai poate înainta, se întoarce la ultima intersecție. Cum ții evidența camerelor (nodurilor) deja vizitate ca să nu te blochezi într-o buclă infinită?";
  }
}

// Socratic Quick Actions simulation
function handleTutorQuickAction(actionType) {
  const currentProb = problems[currentProblemIndex];
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    let text = "";
    
    if (actionType === 'hint') {
      text = triggerProgressiveHint(currentProb);
    } else if (actionType === 'bug') {
      text = getBugExplanation(currentProb, codeTextarea.value);
    } else if (actionType === 'complexity') {
      text = getComplexityExplanation(currentProb);
    }
    
    addMessageToStateAndDisplay('tutor', text);
  }, 600 + Math.random() * 500);
}

// Progressive hint logic
function triggerProgressiveHint(prob) {
  let currentLevel = hintLevels[prob.id] || 0;
  
  if (currentLevel >= prob.hints.length) {
    return `Ți-am oferit deja toate indiciile disponibile pentru problema **${prob.name}**. Încearcă să rulezi codul tău sau întreabă-mă ceva specific despre bug-urile din algoritmul tău!`;
  }
  
  const hintText = `**[Indiciu ${currentLevel + 1}/${prob.hints.length}]**:\n\n${prob.hints[currentLevel]}`;
  hintLevels[prob.id] = currentLevel + 1;
  return hintText;
}

// Socratic bug analysis simulator
function getBugExplanation(prob, code) {
  const codeClean = code.replace(/\s+/g, '').toLowerCase();
  
  // If the code matches template directly or is too short
  if (codeClean.length < 150) {
    return "Nu ai început încă să scrii codul principal în editor sau codul trimis este incomplet. Încearcă să definești variabilele necesare și să scrii structura logică a algoritmului, iar eu te voi ajuta să corectezi greșelile de implementare!";
  }

  if (prob.id === "10") { // Suma Cifrelor
    if (!codeClean.includes('%10') || !codeClean.includes('/10')) {
      return "În codul tău nu pare să fie prezentă extragerea corectă a cifrelor. Gândește-te: ce operator îți returnează restul împărțirii unui număr la 10? Cum reduci apoi numărul tăind ultima cifră din el?";
    }
    if (codeClean.includes('while(n>0)') && !code.includes('0')) {
      return "Codul tău pare să aibă o logică bună. Întrebare: Ce se întâmplă dacă utilizatorul introduce valoarea `0`? Va intra bucla `while (n > 0)` în execuție? Ce rezultat va afișa programul tău și este el corect în acest caz?";
    }
    return "Implementarea ta pare foarte aproape de soluția optimă! Ai definit corect tipul de date? Numărul $n$ poate fi până la $2.000.000.000$, deci tipul standard `int` din C++ este suficient. Încearcă să rulezi testele!";
  } 
  
  else if (prob.id === "506") { // Cautare Binara
    if (codeClean.includes('for(') && codeClean.match(/for.*cin.*val/) && !codeClean.includes('mij') && !codeClean.includes('st+')) {
      return "Detectez că faci o căutare liniară la fiecare interogare. La $100.000$ de operații, acest lucru va cauza depășirea limitei de timp (TLE). Pentru a rezolva acest bug de performanță, trebuie să implementezi o funcție de căutare binară care înjumătățește intervalul `[st, dr]` la fiecare pas.";
    }
    if (codeClean.includes('st=mij') && !codeClean.includes('st=mij+1')) {
      return "Atenție la modul în care actualizezi limitele în căutarea binară! Dacă folosești `st = mij` în loc de `st = mij + 1`, riști ca bucla `while` să ruleze la infinit (ciclu infinit) atunci când `st` și `dr` devin consecutive. De ce se întâmplă asta la împărțirea întreagă?";
    }
    return "Structura căutării tale binare arată corect! Asigură-te că citești datele eficient. Ai adăugat instrucțiunile de optimizare rapidă pentru `cin` și `cout` la începutul funcției `main`?";
  } 
  
  else { // DFS - Componente conexe
    if (codeClean.includes('adj[10000][10000]') || codeClean.includes('matrice')) {
      return "Observ că încerci să stochezi graful folosind o matrice de adiacență bidimensională statică de dimensiune mare. Acest lucru va consuma prea multă memorie și va cauza 'Memory Limit Exceeded'. Schimbă structura de date într-o listă de adiacență, precum `vector<int> adj[10005]` în C++.";
    }
    if (codeClean.includes('dfs(') && !codeClean.includes('viz[')) {
      return "În funcția ta recursivă `dfs`, nu detectez marcarea nodului curent ca vizitat. Fără o marcare a nodurilor vizitate, recursivitatea va merge în buclă infinită pe noduri vecine, cauzând un 'Stack Overflow' (depășire de stivă). Adaugă `viz[nod] = true` la începutul parcurgerii.";
    }
    return "Implementarea DFS-ului pare structurată corect! Ai sortat nodurile fiecărei componente conexe înainte de afișare? Restricția problemei cere ca nodurile fiecărei componente să fie afișate în ordine crescătoare.";
  }
}

// Socratic complexity analysis helper
function getComplexityExplanation(prob) {
  if (prob.id === "10") {
    return "### Analiză de Complexitate pentru *Suma Cifrelor*:\n\n*   **Complexitate Temporală**: $\\mathcal{O}(\\log_{10} n)$. Numărul total de pași în buclă este egal cu numărul de cifre ale lui $n$. Deoarece împărțim $n$ la 10 la fiecare pas, numărul de cifre este dat de valoarea $\\lfloor \\log_{10} n \\rfloor + 1$. Pentru $n \\le 2 \\times 10^9$, algoritmul va face maximum 10 iterații, rulând instant (mult sub limita de 0.1s).\n*   **Complexitate Spațială**: $\\mathcal{O}(1)$. Folosim doar câteva variabile simple în memorie (`n`, `suma`), deci consumul de memorie este constant.";
  } 
  
  else if (prob.id === "506") {
    return "### Analiză de Complexitate pentru *Căutare Binară*:\n\n*   **Complexitate Temporală**:\n    *   **Căutare liniară (ineficientă)**: $\\mathcal{O}(n \\times m)$. Dacă parcurgem vectorul pentru fiecare query, facem în cel mai rău caz $100.000 \\times 100.000 = 10^{10}$ operații, ceea ce durează în jur de 10-20 de secunde (TLE).\n    *   **Căutare binară (optimă)**: $\\mathcal{O}(m \\log n)$. Fiecare căutare binară durează $\\mathcal{O}(\\log n)$ pași (aproximativ $\\log_2 100.000 \\approx 17$ pași). Totalul de operații va fi în jur de $1.700.000$, rulând în doar 0.05 - 0.1 secunde, încadrându-se cu ușurință în limita de 0.5s.\n*   **Complexitate Spațială**: $\\mathcal{O}(n)$ pentru a păstra cele $n$ elemente ale vectorului în memorie.";
  } 
  
  else {
    return "### Analiză de Complexitate pentru *DFS - Componente Conexe*:\n\n*   **Complexitate Temporală**: $\\mathcal{O}(n + m)$. Fiecare nod și fiecare muchie sunt vizitate de un număr constant de ori pe parcursul DFS-ului general. Pentru $n = 10.000$ și $m = 20.000$, numărul total de iterații este extrem de mic, făcând soluția să ruleze în mai puțin de 0.02 secunde.\n*   **Complexitate Spațială**: $\\mathcal{O}(n + m)$ dacă folosim liste de adiacență, plus stiva de recursivitate care în cel mai rău caz (graf sub formă de linie) poate ajunge la adâncimea $n$. Această structură consumă aproximativ 2-3MB de memorie, fiind mult sub limita restrictivă de 64MB.";
  }
}

// Simulated compiler logic
function runTests(isSubmit = false) {
  const prob = problems[currentProblemIndex];
  const userCode = codeTextarea.value;
  const userCodeClean = userCode.replace(/\s+/g, '').toLowerCase();

  // Save code state
  const key = `${prob.id}_${currentLanguage}`;
  editorCodes[key] = userCode;

  // Switch to Results Tab
  switchTab('results');

  // Reset Results console
  resultsConsole.innerHTML = `
    <div class="results-header">
      <h3>Statut Evaluare</h3>
      <span class="status-badge pending">Compilare...</span>
    </div>
    <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
      <div class="typing-indicator" style="justify-content: center; margin-bottom: 1rem;">
        <div class="typing-dot" style="background-color: var(--clr-primary);"></div>
        <div class="typing-dot" style="background-color: var(--clr-primary);"></div>
        <div class="typing-dot" style="background-color: var(--clr-primary);"></div>
      </div>
      Se rulează testele problemei pe codul tău scris în ${currentLanguage.toUpperCase()}...
    </div>
  `;

  setTimeout(() => {
    let resultStatus = "ACCEPTED";
    let score = 100;
    let explanation = "Toate testele au trecut cu succes!";
    const testCasesRun = [];

    // Custom heuristics based on the selected problem and user's code patterns
    if (prob.id === "10") { // Suma cifrelor
      const hasLoop = userCodeClean.includes('while') || userCodeClean.includes('for') || userCodeClean.includes('do');
      const extractsDigit = userCodeClean.includes('%10');
      const cutsDigit = userCodeClean.includes('/10');

      if (!hasLoop || !extractsDigit || !cutsDigit) {
        resultStatus = "WRONG ANSWER";
        score = 0;
        explanation = "Codul tău nu implementează corect extragerea cifrelor. Încearcă să rulezi un loop!";
      }

      testCasesRun.push({
        name: "Testul 1 (Exemplu)",
        input: "1234",
        expected: "10",
        actual: score === 100 ? "10" : "0",
        status: score === 100 ? "passed" : "failed",
        time: "0.002s",
        mem: "1.2MB"
      });

      testCasesRun.push({
        name: "Testul 2 (Caz particular)",
        input: "0",
        expected: "0",
        actual: score === 100 ? "0" : "0",
        status: score === 100 ? "passed" : "failed",
        time: "0.001s",
        mem: "1.2MB"
      });

      testCasesRun.push({
        name: "Testul 3 (Număr mare)",
        input: "1999999999",
        expected: "82",
        actual: score === 100 ? "82" : "1",
        status: score === 100 ? "passed" : "failed",
        time: "0.002s",
        mem: "1.2MB"
      });
    } 
    
    else if (prob.id === "506") { // Căutare binară
      const hasBinarySearch = userCodeClean.includes('mij') && (userCodeClean.includes('st=mij') || userCodeClean.includes('st=') || userCodeClean.includes('dr='));
      const doesLinearSearch = userCodeClean.includes('for(') && !hasBinarySearch;

      if (doesLinearSearch) {
        resultStatus = "TIME LIMIT EXCEEDED";
        score = 40;
        explanation = "Codul tău folosește o căutare liniară O(N*M) care depășește limita de timp (0.5s) pe teste mari!";
      } else if (!hasBinarySearch) {
        resultStatus = "WRONG ANSWER";
        score = 0;
        explanation = "Algoritmul de căutare nu a fost detectat în cod.";
      }

      testCasesRun.push({
        name: "Testul 1 (Exemplu)",
        input: "5\\n1 3 5 7 9\\n3\\n3 4 7",
        expected: "1 0 1",
        actual: score >= 40 ? "1 0 1" : "0 0 0",
        status: score >= 40 ? "passed" : "failed",
        time: "0.005s",
        mem: "4.5MB"
      });

      testCasesRun.push({
        name: "Testul 2 (Valori extreme)",
        input: "10\\n-100 -50 0 50 100...\\n2\\n-100 99",
        expected: "1 0",
        actual: score >= 40 ? "1 0" : "0 0",
        status: score >= 40 ? "passed" : "failed",
        time: "0.006s",
        mem: "4.5MB"
      });

      testCasesRun.push({
        name: "Testul 3 (Fisier masiv - 100.000 elemente)",
        input: "[100.000 elemente crescătoare]\\n[100.000 valori de căutat]",
        expected: "[100.000 răspunsuri binare]",
        actual: resultStatus === "ACCEPTED" ? "[100.000 răspunsuri binare]" : "TLE (Timeout depășit)",
        status: resultStatus === "ACCEPTED" ? "passed" : "failed",
        time: resultStatus === "ACCEPTED" ? "0.082s" : "0.502s",
        mem: "12.8MB"
      });
    } 
    
    else { // DFS - Componente conexe
      const hasDfs = userCodeClean.includes('dfs(') || userCodeClean.includes('dfs');
      const hasAdjList = userCodeClean.includes('vector') && (userCodeClean.includes('adj') || userCodeClean.includes('graf'));
      const hasMatrix = userCodeClean.includes('[10000][10000]') || userCodeClean.includes('[10005][10005]');

      if (hasMatrix) {
        resultStatus = "MEMORY LIMIT EXCEEDED";
        score = 20;
        explanation = "Codul depășește limita de memorie (64MB) datorită folosirii matricii de adiacență mari.";
      } else if (!hasDfs) {
        resultStatus = "WRONG ANSWER";
        score = 0;
        explanation = "Niciun algoritm de parcurgere recursivă (DFS) nu a fost detectat.";
      }

      testCasesRun.push({
        name: "Testul 1 (Exemplu)",
        input: "5 3\\n1 2\\n1 3\\n4 5",
        expected: "2\\n1 2 3\\n4 5",
        actual: score === 100 ? "2\\n1 2 3\\n4 5" : "0",
        status: score === 100 ? "passed" : "failed",
        time: "0.003s",
        mem: "2.1MB"
      });

      testCasesRun.push({
        name: "Testul 2 (Graf complet conex)",
        input: "4 3\\n1 2\\n2 3\\n3 4",
        expected: "1\\n1 2 3 4",
        actual: score === 100 ? "1\\n1 2 3 4" : "0",
        status: score === 100 ? "passed" : "failed",
        time: "0.002s",
        mem: "2.1MB"
      });

      testCasesRun.push({
        name: "Testul 3 (Graf masiv răsfirat)",
        input: "10.000 noduri\\n20.000 muchii",
        expected: "[152 componente conexe]",
        actual: resultStatus === "ACCEPTED" ? "[152 componente conexe]" : (resultStatus === "MEMORY LIMIT EXCEEDED" ? "MLE (Depășire memorie)" : "WRONG"),
        status: resultStatus === "ACCEPTED" ? "passed" : "failed",
        time: resultStatus === "ACCEPTED" ? "0.024s" : "0.008s",
        mem: resultStatus === "ACCEPTED" ? "4.8MB" : "72.4MB"
      });
    }

    // Build Results HTML
    const badgeClass = resultStatus === "ACCEPTED" ? "accepted" : "rejected";
    let statusTextToShow = resultStatus;
    if (resultStatus === "ACCEPTED") statusTextToShow = `ACCEPTED (${score}p)`;
    else if (resultStatus === "TIME LIMIT EXCEEDED") statusTextToShow = `TLE (${score}p)`;
    else if (resultStatus === "MEMORY LIMIT EXCEEDED") statusTextToShow = `MLE (${score}p)`;
    else statusTextToShow = `WA (${score}p)`;

    let cardsHtml = '';
    testCasesRun.forEach(tc => {
      cardsHtml += `
        <div class="testcase-card ${tc.status}">
          <div class="testcase-card-header">
            <span>${tc.name}</span>
            <span class="testcase-badge">${tc.status.toUpperCase()}</span>
          </div>
          <div class="testcase-body">
            <div class="testcase-io-grid">
              <div class="testcase-meta">
                <p>Timp: <span>${tc.time}</span></p>
                <p>Memorie: <span>${tc.mem}</span></p>
              </div>
              <div class="testcase-io-data">
                <div class="testcase-block" data-label="Intrare">${tc.input.replace(/\\n/g, '<br>')}</div>
                <div class="testcase-block" data-label="Ieșire obținută">${tc.actual.replace(/\\n/g, '<br>')}</div>
                <div class="testcase-block" data-label="Ieșire așteptată">${tc.expected.replace(/\\n/g, '<br>')}</div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    resultsConsole.innerHTML = `
      <div class="results-header">
        <h3>Rezultate Evaluator</h3>
        <span class="status-badge ${badgeClass}">${statusTextToShow}</span>
      </div>
      <p style="font-size: 0.95rem; margin-bottom: 1.5rem; color: ${resultStatus === 'ACCEPTED' ? 'var(--clr-emerald)' : 'var(--clr-red)'}; font-weight: 500;">
        ${explanation}
      </p>
      <div class="result-cases">
        ${cardsHtml}
      </div>
    `;

    // Socratic tutor comments automatically in chat after run!
    setTimeout(() => {
      showTypingIndicator();
      setTimeout(() => {
        hideTypingIndicator();
        let feedback = "";
        if (resultStatus === "ACCEPTED") {
          feedback = `Excelent! Soluția ta pentru problema **${prob.name}** a obținut **100 de puncte**. Ai implementat algoritmul corect și optimizat.\n\nDacă dorești, putem discuta despre cum poți curăța sau rafina codul, sau poți trece la problema următoare din listă selectând-o din meniul de sus! Felicitări! 🎉`;
        } else if (resultStatus === "TIME LIMIT EXCEEDED") {
          feedback = `Am observat că ai obținut doar **${score} puncte** (Limită de Timp Depășită - TLE) pe testele mari.\n\nSă investigăm de ce: ai folosit o căutare liniară în locul uneia binare. Încearcă să îți pui întrebarea: dacă vectorul este deja sortat, cum putem reduce numărul de căutări de la $O(N)$ la $O(\\log N)$? Dacă dorești un indiciu despre cum se structurează intervalul, apasă pe butonul **Indiciu Treptat**!`;
        } else if (resultStatus === "MEMORY LIMIT EXCEEDED") {
          feedback = `Soluția ta a picat din cauza depășirii de memorie (MLE). Acest lucru se întâmplă deoarece o matrice de $10000 \\times 10000$ ocupă mult peste limita de ${prob.memoryLimit}.\n\nCum crezi că am putea înlocui matricea de adiacență cu o structură care consumă spațiu proporțional doar cu muchiile existente (adică listă de adiacență, folosind vectori)?`;
        } else {
          feedback = `Compilatorul a finalizat rularea, dar testele indică o problemă de corectitudine (Wrong Answer - 0 puncte).\n\nVerifică codul pe exemplul simplu. De exemplu, tratează programul tău corect cazul în care numărul de intrare este chiar \`0\` sau cazurile cu o singură muchie? Trimite-mi o întrebare specifică sau apasă pe **Găsește Bug-ul** pentru a te ajuta!`;
        }
        addMessageToStateAndDisplay('tutor', feedback);
      }, 800 + Math.random() * 500);
    }, 600);

  }, 1200 + Math.random() * 600);
}

// Start app loading
window.addEventListener('DOMContentLoaded', init);
