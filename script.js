// Avisa o <head> que o script carregou (senão ele mostra o conteúdo sem animação)
window.portfolioPronto = true;

// ============ Tema claro/escuro ============
const raiz = document.documentElement;
const botaoTema = document.getElementById('tema');
const escuroNoSistema = window.matchMedia('(prefers-color-scheme: dark)');

function temaAtual() {
  return raiz.dataset.theme || (escuroNoSistema.matches ? 'dark' : 'light');
}
function atualizarIcone() {
  raiz.dataset.temaAtual = temaAtual();
}
botaoTema.addEventListener('click', () => {
  const novo = temaAtual() === 'dark' ? 'light' : 'dark';
  raiz.dataset.theme = novo;
  try { localStorage.setItem('tema', novo); } catch (e) {}
  atualizarIcone();
});
escuroNoSistema.addEventListener('change', atualizarIcone);
atualizarIcone();

// ============ Idioma (PT/EN) ============
// Versão em inglês de cada elemento com data-i18n="chave" no index.html.
// O português fica no próprio HTML.
const EN = {
  'nav.sobre': 'About',
  'nav.skills': 'Skills',
  'nav.projetos': 'Projects',
  'nav.experiencia': 'Experience',
  'nav.formacao': 'Education',
  'nav.contato': 'Contact',

  'hero.titulo': 'Hi, I’m Nathália.<br><span class="destaque">Quality is my starting point.</span>',
  'hero.sub': 'For over 5 years I’ve been ensuring quality in consulting projects: test plans, automation with Cypress and Playwright, API testing, and AI applied to testing.',
  'hero.projetos': 'See projects',
  'hero.experiencia': 'See experience',
  'hero.contato': 'Get in touch',
  'num.anos': 'years in QA',
  'num.projetos': 'client projects',
  'num.setores': 'industries served',
  'num.cert': 'ISTQB certifications',
  'hero.remoto': 'Remote',

  'ticket.status': 'Available',
  'ticket.titulo': 'QA talent found for your team',
  'ticket.prioridade': 'Priority',
  'ticket.alta': 'High',
  'ticket.tipo': 'Type',
  'ticket.melhoria': 'Improvement',
  'ticket.ambiente': 'Environment',
  'ticket.producao': 'Production',
  'ticket.responsavel': 'Assignee',
  'ticket.voce': 'You 👋',
  'ticket.passos': 'Steps',
  'ticket.passo1': 'Go to https://nathalialence.github.io',
  'ticket.passo2': 'Browse the page sections',
  'ticket.passo3': 'Click “Contact” in the menu',
  'ticket.passo4': 'Reach out through any of the available channels',
  'ticket.esperado': 'Expected result',
  'ticket.esperadoValor': 'More quality on your team.',
  'ticket.obtido': 'Actual result',
  'ticket.reexecutar': '↻ Run again',

  'sobre.sobretitulo': 'About me',
  'sobre.titulo': 'Testing is caring for the people who will use it.',
  'sobre.p1': 'I hold a degree in Systems Analysis and Development and came to QA through systems support and functional analysis. That path taught me to see the product through the eyes of the people who use it and the people who asked for it.',
  'sobre.p2': 'Today I lead quality on projects for different clients: I analyze requirements, build test plans, run manual and automated tests, validate APIs, prepare data and environments, and own regression, always side by side with the development team.',
  'sobre.c1t': 'Test automation',
  'sobre.c1': 'Cypress, Playwright, and API testing.',
  'sobre.c2t': 'Business perspective',
  'sobre.c2': 'From functional analysis: clear requirements before code.',
  'sobre.c3t': 'User focus',
  'sobre.c3': 'From support: understanding the user’s pain and solving it in practice.',

  'skills.titulo': 'My tool suite',
  'skills.sub': 'What I use to plan, run, and report tests.',
  'skills.automacao': 'Automation',
  'skills.linguagens': 'Languages',
  'skills.dados': 'Data',
  'skills.gestao': 'Management and CI',
  'skills.ia': 'AI for testing',
  'skills.tambem': 'Also',
  'skills.acessibilidade': 'Accessibility',

  'projetos.sobretitulo': 'Projects',
  'projetos.titulo': 'Test cases I’ve written',
  'projetos.sub': 'Each project: the problem, what I did, and the result.',
  'status.passou': '✓ passed',
  'status.andamento': '● in progress',
  'status.concluido': '✓ completed',
  'link.github': 'View on GitHub →',
  'link.documento': 'View document →',

  'exp.sobretitulo': 'Experience',
  'exp.titulo': 'Execution history',
  'exp.qa.data': 'Jan 2021 — present',
  'exp.qa.cargo': 'QA/Test Analyst',
  'exp.qa.1': 'Worked on <strong>20+ client projects</strong> across many industries: retail, logistics, health and safety, HR, engineering, ERP, mobile apps, and AI (RAG) solutions.',
  'exp.qa.2': 'Tested an international system with <strong>12+ modules</strong>, used in several countries and available in <strong>15+ languages</strong>.',
  'exp.qa.3': 'Built an E2E automation project <strong>from scratch</strong> with Cypress and Playwright in JavaScript, with <strong>about 50 automated scenarios</strong>.',
  'exp.qa.4': 'API testing with Postman and Swagger, validating responses and <strong>business rules</strong>.',
  'exp.qa.5': 'Developed an <strong>AI-powered system</strong> (via API) that generates test scenarios in Gherkin. I also use AI daily to review and generate automation scripts and to document tests.',
  'exp.qa.6': 'Created the <strong>test scenario template</strong> and helped define the User Story template, standardizing documentation across teams.',
  'exp.qa.7': '<strong>Mentored new QAs and POs</strong> and took an active part in refinement sessions and in writing acceptance criteria.',
  'exp.af.data': 'Nov 2020 — Jan 2021',
  'exp.af.cargo': 'Functional Analyst',
  'exp.af.1': 'Business analysis meetings and requirements gathering directly with clients.',
  'exp.af.2': 'Functional documentation for Mobile and Web projects.',
  'exp.ti.data': 'Oct 2019 — Nov 2020',
  'exp.ti.cargo': 'IT Assistant',
  'exp.ti.1': 'Support and training for <strong>300+ users</strong> on the company’s systems.',
  'exp.ti.2': 'Wrote <strong>procedure documentation</strong> for specific support tickets, standardizing how they were handled.',
  'exp.ti.3': 'Worked with software vendors and managed user access and network usage.',

  'formacao.titulo': 'Education',
  'formacao.h2': 'Always learning',
  'formacao.cursos': 'Degrees',
  'formacao.pgats': 'Postgraduate Specialization in Software Test Automation (PGATS)',
  'formacao.mba': 'MBA in Software Engineering',
  'formacao.ads': 'Technology Degree in Systems Analysis and Development',
  'cert.titulo': 'Certifications and courses',
  'cert.scrum': 'Scrum fundamentals',
  'idiomas.titulo': 'Languages and study abroad',
  'idiomas.pt': 'Portuguese',
  'idiomas.nativo': 'Native',
  'idiomas.en': 'English',
  'idiomas.nivel': 'Level A2',
  'idiomas.intercambio': 'Study abroad in Dublin, Ireland',
  'idiomas.curso': 'General English Course · ISI Dublin · 1 month',


  'contato.sobretitulo': 'Contact',
  'contato.titulo': 'Shall we test something together?',
  'contato.sub': 'Open to new opportunities, conversations, and software quality projects.',
  'contato.local': 'Piracicaba, Brazil · Remote work',
  'rodape.build': 'build #001 · all tests passed ✓',
};

// Textos que o script escreve na hora (não ficam no HTML)
const TEXTOS = {
  pt: {
    executando: '⏳ executando…', passou: '✓ igual ao esperado',
    copiar: 'Copiar', copiado: 'Copiado ✓', erroCopiar: 'Não deu :(',
    botaoIdioma: 'EN', rotuloIdioma: 'Switch to English',
    rotuloTema: 'Alternar tema claro/escuro', rotuloMenu: 'Abrir menu',
    descricao: 'Portfólio de Nathália Leite, QA Automation Engineer.',
  },
  en: {
    executando: '⏳ running…', passou: '✓ matches expected',
    copiar: 'Copy', copiado: 'Copied ✓', erroCopiar: 'Couldn’t copy :(',
    botaoIdioma: 'PT', rotuloIdioma: 'Mudar para português',
    rotuloTema: 'Toggle light/dark theme', rotuloMenu: 'Open menu',
    descricao: 'Portfolio of Nathália Leite, QA Automation Engineer.',
  },
};

const elementosTraduziveis = document.querySelectorAll('[data-i18n]');
const originalPT = new Map();
elementosTraduziveis.forEach(el => originalPT.set(el, el.innerHTML));

let idioma = 'pt';
const texto = chave => TEXTOS[idioma][chave];

function aplicarIdioma(novo) {
  idioma = novo;
  elementosTraduziveis.forEach(el => {
    const ingles = EN[el.dataset.i18n];
    el.innerHTML = idioma === 'en' && ingles ? ingles : originalPT.get(el);
  });
  raiz.lang = idioma === 'en' ? 'en' : 'pt-BR';
  document.querySelector('meta[name="description"]').content = texto('descricao');
  const botaoIdioma = document.getElementById('idioma');
  botaoIdioma.textContent = texto('botaoIdioma');
  botaoIdioma.setAttribute('aria-label', texto('rotuloIdioma'));
  botaoTema.setAttribute('aria-label', texto('rotuloTema'));
  document.getElementById('menu-toggle').setAttribute('aria-label', texto('rotuloMenu'));
  document.getElementById('copiar').textContent = texto('copiar');
  atualizarResultado();
}

document.getElementById('idioma').addEventListener('click', () => {
  const novo = idioma === 'pt' ? 'en' : 'pt';
  try { localStorage.setItem('idioma', novo); } catch (e) {}
  aplicarIdioma(novo);
});

// ============ Menu no celular ============
const menu = document.getElementById('menu');
const botaoMenu = document.getElementById('menu-toggle');
botaoMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  botaoMenu.setAttribute('aria-expanded', aberto);
});
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.classList.remove('aberto');
  botaoMenu.setAttribute('aria-expanded', 'false');
}));

// ============ Ticket: "executa" os passos um a um ============
const passos = document.querySelectorAll('#passos li');
const resultado = document.getElementById('resultado');
let timers = [];
let ticketConcluido = false;

function atualizarResultado() {
  resultado.textContent = texto(ticketConcluido ? 'passou' : 'executando');
}

function executarTicket() {
  timers.forEach(clearTimeout);
  timers = [];
  ticketConcluido = false;
  passos.forEach(p => p.classList.remove('feito'));
  atualizarResultado();
  passos.forEach((p, i) => {
    timers.push(setTimeout(() => p.classList.add('feito'), 600 + i * 550));
  });
  timers.push(setTimeout(() => {
    ticketConcluido = true;
    atualizarResultado();
  }, 600 + passos.length * 550));
}
document.getElementById('reexecutar').addEventListener('click', executarTicket);

// Só executa quando o ticket aparece na tela (no celular ele fica mais abaixo)
new IntersectionObserver((entradas, obs) => {
  if (entradas[0].isIntersecting) {
    executarTicket();
    obs.disconnect();
  }
}, { threshold: 0.4 }).observe(document.querySelector('.ticket'));

// ============ Animação ao rolar ============
const observador = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visivel');
      observador.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.revelar').forEach(el => observador.observe(el));

// ============ Copiar e-mail ============
const botaoCopiar = document.getElementById('copiar');
botaoCopiar.addEventListener('click', async () => {
  const email = document.getElementById('email').textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    botaoCopiar.textContent = texto('copiado');
  } catch (e) {
    botaoCopiar.textContent = texto('erroCopiar');
  }
  setTimeout(() => (botaoCopiar.textContent = texto('copiar')), 2000);
});

// ============ Ano no rodapé ============
document.getElementById('ano').textContent = new Date().getFullYear();

// ============ Idioma inicial ============
// Usa o idioma salvo; se não houver, inglês para navegadores que não estão em português.
let idiomaSalvo = null;
try { idiomaSalvo = localStorage.getItem('idioma'); } catch (e) {}
const idiomaNavegador = (navigator.language || 'pt').toLowerCase().startsWith('pt') ? 'pt' : 'en';
aplicarIdioma(idiomaSalvo || idiomaNavegador);
