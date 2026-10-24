// Answers for the portfolio chatbot.
// Everything is built from the site's own data files, so when you edit
// content.js, projects.js or skills.js the chatbot stays in sync.
// If a question is not about Laxman, the bot answers with `fallback`.
import { profile, stats, experiences, education } from './content'
import { projects } from './projects'
import { skillGroups } from './skills'

export const welcome = {
  text:
    "Hi! I'm Laxman's portfolio assistant. Ask me about his projects, skills, experience, education or how to contact him. I can only answer questions about Laxman.",
  links: [],
}

export const suggestions = ['Who is Laxman?', 'Projects', 'Skills', 'Experience', 'Education', 'Contact']

export const fallback = {
  text:
    "I don't have that information here. I can only answer questions about Laxman. Try asking about his projects, skills, education, experience or how to contact him.",
  links: [],
}

/* ---------- small helpers ---------- */

const norm = s => s.toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim()
const link = (label, href) => ({ label, href })
const bullets = list => list.map(x => `• ${x}`).join('\n')

// true when two words differ by at most one letter (typo tolerance)
function withinOne(a, b) {
  if (a === b) return true
  const la = a.length
  const lb = b.length
  if (Math.abs(la - lb) > 1) return false
  let i = 0
  let j = 0
  let edits = 0
  while (i < la && j < lb) {
    if (a[i] === b[j]) { i++; j++; continue }
    if (++edits > 1) return false
    if (la > lb) i++
    else if (lb > la) j++
    else { i++; j++ }
  }
  return edits + (la - i) + (lb - j) <= 1
}

// phrase hit = 3 points, word hit = 2.
// A small typo on a long word only counts (1 point) when nothing matched exactly.
function score(tokens, padded, keywords) {
  let exact = 0
  let fuzzy = 0
  for (const kw of keywords) {
    if (kw.includes(' ')) {
      if (padded.includes(` ${kw} `)) exact += 3
    } else if (tokens.includes(kw)) {
      exact += 2
    } else if (kw.length >= 6 && tokens.some(t => t.length >= 6 && withinOne(t, kw))) {
      fuzzy = 1
    }
  }
  return exact > 0 ? exact : fuzzy
}

/* ---------- replies ---------- */

function aboutReply() {
  const edu = education[0]
  const exp = experiences[0]
  const parts = []
  if (edu) parts.push(`${profile.name} is studying ${edu.degree} at ${edu.school} (${edu.year}).`)
  parts.push('He builds web apps, AI chatbots and full-stack platforms.')
  if (exp) parts.push(`He is a ${exp.role} at ${exp.company} (${exp.date}).`)
  parts.push(`He is based in ${profile.location}.`)
  return { text: parts.join(' '), links: [link('Projects', '#projects'), link('Contact', '#contact')] }
}

function skillsReply() {
  const text =
    "Here is what Laxman works with:\n" +
    skillGroups.map(g => `${g.title}: ${g.tags.join(', ')}`).join('\n')
  return { text, links: [link('See skills', '#skills')] }
}

function projectsReply() {
  const text =
    `Laxman has ${projects.length} featured projects:\n` +
    bullets(projects.map(p => `${p.title} (${p.category})`)) +
    '\n\nAsk me about any of them for details.'
  return { text, links: [link('View projects', '#projects'), link('GitHub', profile.github)] }
}

function projectReply(p) {
  const text =
    `${p.title}\n${p.desc}\n\n${bullets(p.highlights)}\n\nBuilt with: ${p.stack.join(', ')}.` +
    (p.live ? '' : '\nThis one is not deployed yet, so the live demo says coming soon.')
  const links = []
  if (p.live) links.push(link('Live demo', p.live))
  if (p.github) links.push(link('GitHub', p.github))
  return { text, links }
}

function experienceReply() {
  if (!experiences.length) {
    return { text: "Laxman doesn't have work experience listed yet.", links: [] }
  }
  const text = experiences
    .map(e => `${e.role} at ${e.company}\n${e.date} · ${e.location}\n${bullets(e.bullets.slice(0, 3))}`)
    .join('\n\n')
  return { text, links: [link('Experience', '#experience')] }
}

function educationReply() {
  const cgpa = stats.find(s => /cgpa/i.test(s.label))
  const text =
    education.map(e => `${e.degree}\n${e.school} · ${e.year}`).join('\n\n') +
    (cgpa ? `\n\nCGPA: ${cgpa.value}` : '')
  return { text, links: [link('Education', '#education')] }
}

function contactReply() {
  const text =
    `Email: ${profile.email}\nMobile: ${profile.phone}\n` +
    `GitHub: ${profile.githubLabel}\nLinkedIn: ${profile.linkedinLabel}`
  return {
    text,
    links: [
      link('Email', `mailto:${profile.email}`),
      link('GitHub', profile.github),
      link('LinkedIn', profile.linkedin),
      link('Send a message', '#contact'),
    ],
  }
}

function databasesReply() {
  const g = skillGroups.find(group => /database/i.test(group.title))
  if (!g) return fallback
  return {
    text: `Laxman works with these databases: ${g.tags.join(', ')}.`,
    links: [link('Skills', '#skills')],
  }
}

const locationReply = () => ({ text: `Laxman is based in ${profile.location}.`, links: [] })

const availabilityReply = () => ({
  text: 'Yes, Laxman is open to internships, collaborations and new opportunities. The best way to reach him is the contact section.',
  links: [link('Contact', '#contact')],
})

const resumeReply = () =>
  profile.resume
    ? { text: "Here is Laxman's resume.", links: [link('Open resume', profile.resume)] }
    : {
        text: "Laxman's resume isn't linked on the site yet. Please reach out through the contact section and he can share it.",
        links: [link('Contact', '#contact')],
      }

// Keep in step with the Beyond code section
const hobbiesReply = () => ({
  text: "Away from the keyboard, Laxman enjoys content creation, reading, Sudoku and music.",
  links: [],
})

const helpReply = () => ({
  text: "I can tell you about Laxman's background, projects, skills, experience, education, hobbies and contact details. What would you like to know?",
  links: [],
})

/* ---------- specific projects ---------- */

const projectKeywords = {
  'Student Performance Predictor': [
    'student performance', 'performance predictor', 'score predictor', 'exam score',
    'maths score', 'math score', 'predictor',
  ],
  BookNest: [
    'booknest', 'book nest', 'reading tracker', 'library', 'shelf', 'shelves',
    'lending', 'websocket', 'websockets',
  ],
  'Gesture & Voice Control': [
    'gesture', 'gestures', 'voice', 'hand tracking', 'mediapipe', 'opencv',
    'computer vision', 'webcam',
  ],
  'AI Chatbot': ['chatbot', 'chat bot', 'gemini', 'streamlit'],
  'Employee Management System': ['employee', 'employee management', 'ems', 'oracle'],
  'Airline Management System': [
    'airline', 'airline management', 'flight', 'flights', 'ticket', 'tickets', 'boarding',
  ],
}

const projectIntents = projects.map(p => ({
  keywords: (projectKeywords[p.title] ?? [p.title]).map(norm),
  reply: () => projectReply(p),
}))

/* ---------- technologies (built from skills and project stacks) ---------- */

const techIndex = new Map()

function addTech(name, group, project) {
  let key = norm(name)
  if (key.endsWith(' js')) key = key.slice(0, -3)
  if (!key) return
  if (!techIndex.has(key)) {
    techIndex.set(key, { display: name.replace(/\.js$/i, ''), group: null, used: [] })
  }
  const t = techIndex.get(key)
  if (group && !t.group) t.group = group
  if (project && !t.used.includes(project.title)) t.used.push(project.title)
}

skillGroups.forEach(g => g.tags.forEach(tag => addTech(tag, g.title, null)))
projects.forEach(p => p.stack.forEach(tag => addTech(tag, null, p)))

function bestTech(tokens, padded) {
  let best = null
  let bestScore = 0
  for (const [key, tech] of techIndex) {
    let s = 0
    if (key.includes(' ')) {
      if (padded.includes(` ${key} `)) s = 3
    } else if (tokens.includes(key)) {
      s = 2
    }
    if (s > bestScore) { best = tech; bestScore = s }
  }
  return best ? { tech: best, score: bestScore } : null
}

function techReply(t) {
  const lines = [`Yes, Laxman works with ${t.display}.`]
  if (t.used.length) lines.push(`He has used it in: ${t.used.join(', ')}.`)
  else if (t.group) lines.push(`It is part of his ${t.group.toLowerCase()} skills.`)
  return { text: lines.join('\n'), links: [link('Projects', '#projects'), link('Skills', '#skills')] }
}

/* ---------- general topics (earlier in the list wins a tie) ---------- */

const topic = (keywords, reply) => ({ keywords: keywords.map(norm), reply })

const intents = [
  topic(['skills', 'skill', 'tech stack', 'stack', 'technologies', 'technology', 'tools', 'languages', 'programming', 'expertise', 'proficient', 'good at', 'abilities'], skillsReply),
  topic(['database', 'databases', 'sql', 'nosql'], databasesReply),
  topic(['projects', 'project', 'built', 'build', 'developed', 'made', 'apps', 'applications', 'repos', 'repositories', 'portfolio'], projectsReply),
  topic(['experience', 'internship', 'intern', 'work experience', 'job', 'jobs', 'career', 'skillotech', 'company', 'companies', 'worked', 'working', 'employment'], experienceReply),
  topic(['education', 'student', 'college', 'university', 'degree', 'study', 'studying', 'studies', 'qualification', 'btech', 'b tech', 'cgpa', 'gpa', 'marks', 'school', 'graduate', 'graduating', 'graduation', 'academic'], educationReply),
  topic(['contact', 'email', 'mail', 'phone', 'mobile', 'number', 'call', 'reach', 'linkedin', 'github', 'social', 'connect', 'message'], contactReply),
  topic(['where', 'location', 'live', 'lives', 'based', 'city', 'from', 'cuttack', 'odisha', 'india', 'country', 'address', 'hometown'], locationReply),
  topic(['available', 'availability', 'open to work', 'open to opportunities', 'looking for', 'hire him', 'can i hire', 'hiring', 'internship opportunities', 'job opportunities', 'freelance', 'collaborate', 'collaboration'], availabilityReply),
  topic(['resume', 'cv', 'curriculum vitae'], resumeReply),
  topic(['hobbies', 'hobby', 'interests', 'free time', 'outside work', 'fun', 'passion', 'enjoy', 'enjoys', 'music', 'sudoku', 'reading', 'books'], hobbiesReply),
  topic(['who is laxman', 'who is he', 'who are you', 'about laxman', 'about him', 'about you', 'about me', 'introduce', 'introduction', 'tell me about laxman', 'tell me about him', 'yourself', 'bio', 'summary', 'overview', 'background', 'profile', 'what does he do', 'what do you do', 'your name', 'his name', 'full name'], aboutReply),
  topic(['help', 'what can you do', 'what can i ask', 'how does this work', 'commands'], helpReply),
  topic(['thanks', 'thank you', 'thank', 'thx', 'great', 'awesome', 'nice'], () => ({ text: "You're welcome! Anything else you'd like to know about Laxman?", links: [] })),
  topic(['bye', 'goodbye', 'see you', 'cya'], () => ({ text: 'Bye! Thanks for stopping by. Feel free to reach out to Laxman anytime.', links: [link('Contact', '#contact')] })),
  topic(['hi', 'hii', 'hello', 'hey', 'namaste', 'good morning', 'good afternoon', 'good evening', 'how are you'], () => ({ text: "Hello! Ask me anything about Laxman: his projects, skills, experience, education or contact details.", links: [] })),
]

/* ---------- entry point ---------- */

export function answerFor(raw) {
  const query = norm(raw)
  if (!query) return null

  const tokens = query.split(' ')
  const padded = ` ${query} `

  // Just "Laxman" (or "laxman?") means "tell me about him"
  if (tokens.length <= 2 && tokens.includes('laxman')) return aboutReply()

  let best = null
  let bestScore = 0
  const consider = (s, reply) => {
    if (s > bestScore) { best = reply; bestScore = s }
  }

  for (const it of projectIntents) consider(score(tokens, padded, it.keywords), it.reply)

  const tech = bestTech(tokens, padded)
  if (tech) consider(tech.score, () => techReply(tech.tech))

  for (const it of intents) consider(score(tokens, padded, it.keywords), it.reply)

  return best ? best() : fallback
}