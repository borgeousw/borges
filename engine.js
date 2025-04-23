
// Ritual Engine — Core Logic

let currentCircle = null;
let ritualData = {};

async function loadRitualStructure() {
  const res = await fetch('circles_structure.json');
  ritualData = await res.json();
  const entry = ritualData.circles.find(c => c.entry);
  if (entry) {
    enterCircle(entry.id);
  }
}

function enterCircle(id) {
  const circle = ritualData.circles.find(c => c.id === id);
  if (!circle) return;
  currentCircle = circle;
  renderCircle(circle);
}

function renderCircle(circle) {
  const container = document.getElementById('circle');
  container.innerHTML = `
    <h1>${circle.name}</h1>
    <p>${circle.text}</p>
    <div id="actions"></div>
  `;
  const actions = document.getElementById('actions');
  if (circle.next.length > 0) {
    circle.next.forEach(n => {
      const btn = document.createElement('button');
      btn.innerText = 'Перейти → ' + n;
      btn.onclick = () => enterCircle(n);
      actions.appendChild(btn);
    });
  } else {
    actions.innerHTML = '<p>Путь окончен.</p>';
  }
}

window.addEventListener('DOMContentLoaded', loadRitualStructure);
