// car-schemas-interaction.js
// Логика выбора типа кузова через анимированные SVG-карточки.
// Генерирует кастомное событие 'car-tariff-selected' для основной логики.

(function(){
  const grid = document.getElementById('tariffGrid');
  if(!grid) return;

  function selectCard(card){
    grid.querySelectorAll('.car-card').forEach(c=>{
      const pressed = c===card;
      c.setAttribute('aria-pressed', pressed?'true':'false');
    });
    const code = card.getAttribute('data-tariff');
    const price = Number(card.getAttribute('data-price')) || (code==='minivan'?350:300);
    const evt = new CustomEvent('car-tariff-selected',{ detail:{ code, price }});
    window.dispatchEvent(evt);
  }

  grid.addEventListener('click', e => {
    const card = e.target.closest('.car-card');
    if(!card) return;
    selectCard(card);
  });

  // Клавиатурная навигация: Enter / Space
  grid.addEventListener('keydown', e => {
    if(e.key==='Enter' || e.key===' '){
      const card = e.target.closest('.car-card');
      if(card){ e.preventDefault(); selectCard(card); }
    }
  });

})();
