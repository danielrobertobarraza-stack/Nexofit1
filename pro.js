(() => {
  const profileKey = 'ritmo-profile';
  const exercises = [
    { name: 'Press de pecho en máquina', gif: 'https://d3d2ynhodh9o1z.cloudfront.net/exercises/lever-chest-press.gif', sets: '3 × 10–12', tip: 'Ajusta el asiento para que las empuñaduras queden a la altura del pecho. Mantén la espalda apoyada y controla el regreso.' },
    { name: 'Prensa de piernas', gif: 'https://d3d2ynhodh9o1z.cloudfront.net/exercises/leg-press.gif', sets: '3 × 10–12', tip: 'Apoya toda la espalda. Baja solo hasta donde puedas mantener la zona lumbar estable y evita bloquear las rodillas.' },
    { name: 'Jalón al pecho', gif: 'https://d3d2ynhodh9o1z.cloudfront.net/exercises/wide-grip-lat-pulldown.gif', sets: '3 × 10–12', tip: 'Asegura el apoyo de muslos, inclina apenas el torso y lleva la barra hacia la parte alta del pecho.' },
    { name: 'Remo sentado en máquina', gif: 'https://d3d2ynhodh9o1z.cloudfront.net/exercises/lever-narrow-grip-seated-row.gif', sets: '3 × 10–12', tip: 'Mantén el tronco firme, lleva los codos atrás y junta suavemente los omóplatos.' }
  ];
  const modal = document.createElement('div');
  modal.className = 'workout-modal';
  modal.innerHTML = '<div class="workout-dialog" role="dialog" aria-modal="true" aria-label="Demostración del ejercicio"><img alt="Demostración animada del ejercicio"><div class="workout-info"><div class="modal-top"><h2></h2><button class="modal-close" aria-label="Cerrar">×</button></div><p class="sets"></p><p class="tip"></p><div style="display:flex;gap:8px;flex-wrap:wrap" class="exercise-picks"></div><small style="color:#7b8790">Demostraciones GIF: FitFocus</small></div></div>';
  document.body.append(modal);
  let chosen = 0;
  function showExercise(i) {
    chosen = i;
    const exercise = exercises[i];
    modal.querySelector('h2').textContent = exercise.name;
    modal.querySelector('.sets').textContent = exercise.sets + ' · Descansa 60–90 segundos entre series.';
    modal.querySelector('.tip').textContent = exercise.tip;
    const img = modal.querySelector('img');
    img.src = exercise.gif;
    img.alt = `GIF: ${exercise.name} realizado en máquina`;
    img.onerror = () => { img.onerror = null; img.alt = `No se pudo cargar el GIF de ${exercise.name}. Comprueba tu conexión.`; img.src = ''; };
    modal.querySelector('.exercise-picks').innerHTML = exercises.map((e, n) => `<button class="chip ${n === i ? 'active' : ''}" data-exercise="${n}">${e.name}</button>`).join('');
    modal.querySelectorAll('[data-exercise]').forEach(b => b.onclick = () => showExercise(+b.dataset.exercise));
    modal.classList.add('open');
  }
  document.querySelectorAll('.startWorkout').forEach((button, n) => {
    button.onclick = () => showExercise(n === 1 ? 2 : n === 2 ? 1 : 0);
  });
  modal.querySelector('.modal-close').onclick = () => modal.classList.remove('open');
  modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') modal.classList.remove('open'); });

  function greeting() {
    const hour = new Date().getHours();
    return hour >= 5 && hour < 12 ? 'Buenos días' : hour >= 12 && hour < 19 ? 'Buenas tardes' : 'Buenas noches';
  }
  function syncName() {
    let profile = {};
    try { profile = JSON.parse(localStorage.getItem(profileKey) || '{}'); } catch {}
    const name = (profile.name || '').trim();
    const heading = document.querySelector('#inicio .welcome h1');
    if (heading) heading.innerHTML = `${greeting()}${name ? `, ${name.split(/\s+/)[0]}` : ''} <span style="color:var(--lime)">✳</span>`;
    const avatar = document.querySelector('.avatar');
    if (avatar && name) avatar.textContent = name.charAt(0).toUpperCase();
    return name;
  }
  syncName();
  const saveProfile = document.querySelector('#saveProfile');
  if (saveProfile) saveProfile.addEventListener('click', () => setTimeout(syncName, 20));
  const originalSave = document.querySelector('#saveProfile');
  if (!syncName() && originalSave) {
    setTimeout(() => {
      if (localStorage.getItem('ritmo-onboarded') === 'yes') return;
      const dialog = document.createElement('div');
      dialog.className = 'workout-modal open';
      dialog.innerHTML = '<div class="workout-dialog"><div class="workout-info"><div class="eyebrow">BIENVENIDA A NEXOFIT</div><h2>Personalicemos tu espacio</h2><p>Usaremos tu nombre en el saludo y tu elección para adaptar la imagen principal.</p><div class="field"><label>¿Cómo te llamas?</label><input id="welcomeName" autocomplete="given-name" placeholder="Tu nombre"></div><div class="field" style="margin-top:12px"><label>¿Cómo quieres personalizar las imágenes?</label><select id="welcomeGender"><option value="neutral">Prefiero no indicarlo</option><option value="mujer">Mujer</option><option value="hombre">Hombre</option></select></div><button class="primary" id="welcomeSave">Continuar</button></div></div>';
      document.body.append(dialog);
      const field = dialog.querySelector('input'); field.focus();
      function finish() {
        const value = field.value.trim();
        if (!value) { field.focus(); return; }
        let profile = {}; try { profile = JSON.parse(localStorage.getItem(profileKey) || '{}'); } catch {}
        profile.name = value;
        profile.gender = dialog.querySelector('#welcomeGender').value;
        localStorage.setItem(profileKey, JSON.stringify(profile));
        localStorage.setItem('ritmo-onboarded', 'yes');
        document.body.classList.remove('gender-mujer','gender-hombre');
        if (profile.gender !== 'neutral') document.body.classList.add(`gender-${profile.gender}`);
        dialog.remove(); syncName();
        const profileName = document.querySelector('#name'); if (profileName) profileName.value = value;
      }
      dialog.querySelector('#welcomeSave').onclick = finish;
      field.addEventListener('keydown', e => { if (e.key === 'Enter') finish(); });
    }, 450);
  }
})();
