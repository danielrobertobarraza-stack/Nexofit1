(() => {
  const library = [
    ['Pecho', 'Press plano con barra', 'barbell-bench-press', 'Pectorales', 'Apoya los pies y junta suavemente los omóplatos. Baja la barra al centro del pecho con control; usa un compañero de asistencia si lo necesitas.'],
    ['Pecho', 'Press inclinado con barra', 'incline-barbell-bench-press', 'Pectoral superior', 'Inclina el banco moderadamente y baja la barra hacia la parte alta del pecho sin perder el apoyo.'],
    ['Pecho', 'Press plano con mancuernas', 'dumbbell-bench-press', 'Pectorales', 'Mantén las muñecas alineadas y baja las mancuernas junto al pecho con control.'],
    ['Pecho', 'Press inclinado con mancuernas', 'incline-dumbbell-press', 'Pectoral superior', 'Usa una inclinación moderada; sube las mancuernas sobre el pecho y controla la bajada.'],
    ['Pecho', 'Aperturas con mancuernas', 'dumbbell-fly', 'Pectorales', 'En banco plano, conserva una leve flexión de codos y abre hasta un rango cómodo.'],
    ['Pecho', 'Aperturas inclinadas con mancuernas', 'incline-dumbbell-flyes', 'Pectoral superior', 'Mantén los codos suavemente flexionados y evita bajar más allá de un estiramiento cómodo.'],
    ['Pecho', 'Flexiones de brazos', 'push-up', 'Pectorales y tríceps', 'Alinea cabeza, tronco y cadera; apoya rodillas si necesitas una variante más accesible.'],
    ['Pecho', 'Press de pecho en máquina', 'lever-chest-press', 'Pectorales', 'Ajusta el asiento para que las empuñaduras queden a la altura del pecho.'],
    ['Espalda', 'Remo inclinado con barra', 'barbell-bent-over-row', 'Espalda media', 'Inclina el torso desde la cadera, mantén la espalda firme y lleva la barra hacia el abdomen.'],
    ['Espalda', 'Remo a una mano con mancuerna', 'one-arm-dumbbell-row', 'Dorsales', 'Apoya una mano en un banco y lleva el codo hacia la cadera sin girar el tronco.'],
    ['Espalda', 'Jalón al pecho en polea', 'wide-grip-lat-pulldown', 'Dorsales', 'Lleva la barra hacia la parte alta del pecho; evita tirar detrás de la nuca.'],
    ['Espalda', 'Remo sentado en polea', 'cable-seated-row', 'Espalda media', 'Siéntate erguido y acerca el agarre al torso sin balancearte.'],
    ['Piernas', 'Sentadilla con barra', 'barbell-squat', 'Cuádriceps y glúteos', 'Empieza con una carga que controles; si usas barra, entrena en rack con seguros ajustados.'],
    ['Piernas', 'Peso muerto rumano con mancuernas', 'dumbbell-romanian-deadlift', 'Isquiotibiales y glúteos', 'Lleva la cadera hacia atrás y conserva la espalda neutra; baja hasta donde mantengas el control.'],
    ['Piernas', 'Prensa de piernas', 'leg-press', 'Cuádriceps y glúteos', 'Baja con control hasta donde la espalda siga apoyada y evita bloquear las rodillas.'],
    ['Piernas', 'Extensión de cuádriceps', 'leg-extension', 'Cuádriceps', 'Alinea la rodilla con el eje de la máquina y mueve el peso suavemente.'],
    ['Piernas', 'Zancada con mancuernas', 'dumbbell-lunge', 'Piernas y glúteos', 'Da un paso estable y baja solo hasta donde mantengas equilibrio y comodidad.'],
    ['Hombros', 'Press unilateral con mancuerna', 'dumbbell-one-arm-shoulder-press', 'Deltoides', 'Mantén el abdomen firme y empuja sin arquear la espalda; completa ambos lados.'],
    ['Hombros', 'Elevación lateral con mancuernas', 'dumbbell-seated-lateral-raise', 'Deltoides laterales', 'Usa poco impulso y eleva hasta una altura cómoda, cerca de los hombros.'],
    ['Brazos', 'Curl de bíceps con mancuernas', 'dumbbell-bicep-curl', 'Bíceps', 'Mantén los codos cerca del cuerpo y baja el peso lentamente.'],
    ['Brazos', 'Extensión de tríceps en polea', 'cable-triceps-pushdown-v-bar', 'Tríceps', 'Con los codos junto al torso, extiende los brazos sin inclinarte sobre el agarre.'],
    ['Core', 'Plancha', 'plank', 'Abdominales y zona media', 'Mantén el cuerpo alineado y respira; acorta el tiempo si se pierde la postura.'],
    ['Cardio', 'Caminata en cinta', '', 'Resistencia cardiovascular', 'Comienza suave y aumenta el ritmo gradualmente. Mantén una postura natural.'],
    ['Cardio', 'Bicicleta fija', '', 'Resistencia cardiovascular', 'Ajusta el asiento y pedalea a un ritmo sostenible.']
  ].map(([group, name, slug, muscle, tip]) => ({group,name,slug,muscle,tip,sets:'3 series · 8–12 repeticiones'}));
  const gifBase = 'https://d3d2ynhodh9o1z.cloudfront.net/exercises/';
  const section = document.querySelector('#rutinas');
  const mealPage = document.querySelector('#comidas');
  if (!section || !mealPage) return;

  document.querySelectorAll('[data-page="comidas"]').forEach(b => { b.innerHTML = b.innerHTML.replace('Comidas', b.closest('.mobilebar') ? 'Plan' : 'Plan alimentación'); });
  const brand = document.querySelector('.brand'); if (brand) brand.innerHTML = '<span class="brandmark">N</span> NexoFit';
  const profileFields = document.querySelector('.formgrid');
  if (profileFields && !document.querySelector('#gender')) profileFields.insertAdjacentHTML('afterbegin','<div class="field"><label>Personalización visual</label><select id="gender"><option value="neutral">Sin preferencia</option><option value="mujer">Mujer</option><option value="hombre">Hombre</option></select></div>');
  function syncGender(){let p={};try{p=JSON.parse(localStorage.getItem('ritmo-profile')||'{}')}catch{}const gender=p.gender||'neutral';document.body.classList.remove('gender-mujer','gender-hombre');if(gender!=='neutral')document.body.classList.add(`gender-${gender}`);const select=document.querySelector('#gender');if(select)select.value=gender;}
  syncGender();
  document.querySelector('#gender')?.addEventListener('change',e=>{let p={};try{p=JSON.parse(localStorage.getItem('ritmo-profile')||'{}')}catch{}p.gender=e.target.value;localStorage.setItem('ritmo-profile',JSON.stringify(p));syncGender();});
  document.querySelector('#saveProfile')?.addEventListener('click',()=>setTimeout(()=>{const gender=document.querySelector('#gender')?.value;if(!gender)return;let p={};try{p=JSON.parse(localStorage.getItem('ritmo-profile')||'{}')}catch{}p.gender=gender;localStorage.setItem('ritmo-profile',JSON.stringify(p));syncGender();},30));
  const oldFilters = section.querySelector('.routinegrid')?.previousElementSibling;
  if (oldFilters?.classList.contains('filters')) oldFilters.remove();
  mealPage.querySelector('.sectionhead h1').textContent = 'Plan de alimentación';
  mealPage.querySelector('.sectionhead .sub').textContent = 'Ideas ricas y accesibles con ingredientes de todos los días.';
  const mealGrid = mealPage.querySelector('.mealgrid');
  mealGrid.innerHTML = [
    ['DESAYUNO · 10 MIN','Avena con banana','Avena, leche o agua, banana y una cucharadita de dulce de leche.','https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=900&q=80','360 kcal aprox.','Ideal para arrancar el día con energía.'],
    ['ALMUERZO · 25 MIN','Pollo con arroz y ensalada','Pollo a la plancha, arroz y ensalada de tomate, zanahoria y lechuga.','https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80','520 kcal aprox.','Ingredientes simples; puedes cambiar el pollo por huevo o legumbres.'],
    ['MERIENDA · 5 MIN','Mate y tostadas con huevo','Mate o infusión, pan común tostado y huevo revuelto o duro.','https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80','300 kcal aprox.','Una opción fácil con alimentos habituales.'],
    ['CENA · 30 MIN','Tortilla de papa y verduras','Papa, huevo, cebolla y la verdura que tengas; acompaña con ensalada.','https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80','480 kcal aprox.','Aprovecha verduras de estación y ajusta la porción a tu apetito.'],
    ['ALMUERZO · 20 MIN','Guiso de lentejas rendidor','Lentejas, cebolla, zanahoria, tomate y papa; prepara varias porciones.','https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80','490 kcal aprox.','Las legumbres secas suelen rendir más y se pueden freezar.'],
    ['CENA · 20 MIN','Tarta de acelga casera','Acelga, huevo, cebolla y masa; acompaña con tomate o lo que haya.','https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=900&q=80','430 kcal aprox.','Puedes usar verduras de estación o congeladas.']
  ].map(([time,name,ingredients,photo,kcal,desc])=>`<article class="foodcard"><div class="foodphoto"><img src="${photo}" loading="lazy" decoding="async" alt="${name}" onerror="this.parentElement.classList.add('photo-unavailable');this.remove()"></div><div class="foodbody"><div class="eyebrow">${time}</div><h3>${name}</h3><p>${ingredients}</p><p>${desc}</p><div class="macro"><span>◉ ${kcal}</span><span>Porciones adaptables</span></div></div></article>`).join('');
  const nutritionCard = mealPage.querySelector('.card[style*="margin-top"]');
  if (nutritionCard) nutritionCard.innerHTML = '<div class="card-title">Una guía flexible <span style="color:var(--lime)">Ajusta a tu hambre y actividad</span></div><p class="sub">Las porciones y necesidades varían entre personas. Prioriza variedad, agua segura y alimentos que te resulten accesibles. Estas ideas son orientativas, no una dieta clínica.</p>';
  const eyebrow = section.querySelector('.sectionhead .eyebrow');
  eyebrow.textContent = 'PLANIFICA A TU MANERA';
  section.querySelector('.sectionhead h1').textContent = 'Rutinas y ejercicios';
  section.querySelector('.sectionhead .sub').textContent = 'Elige una propuesta diaria o arma tu sesión ejercicio por ejercicio.';
  section.querySelector('.routinegrid').insertAdjacentHTML('beforebegin', `
    <div class="card daily-plan" style="margin-bottom:16px"><div class="card-title">Rutina sugerida para hoy <span id="dailyFocus" class="tag"></span></div><p class="sub" id="dailyDesc"></p><button class="primary" id="useDaily">Cargar propuesta de hoy</button></div>
    <div class="card builder" style="margin-bottom:18px"><div class="card-title">Arma tu entrenamiento <span id="selectedCount" class="tag">0 seleccionados</span></div>
      <p class="sub" style="margin-bottom:12px">Primero elige qué quieres trabajar hoy; después marca los ejercicios que prefieras.</p>
      <div class="filters" id="muscleFilters"></div><div class="exercise-builder-grid" id="exerciseLibrary"></div>
      <div class="builder-footer"><div><strong id="workoutSummary">Tu sesión está vacía</strong><p class="sub" id="workoutGroups">Elige ejercicios de la lista.</p></div><button class="primary" id="startSelected">Empezar mi sesión</button></div>
    </div>`);
  section.querySelector('.routinegrid')?.remove();
  const mediaHint=document.createElement('link');mediaHint.rel='preconnect';mediaHint.href='https://d3d2ynhodh9o1z.cloudfront.net';document.head.append(mediaHint);
  const filters = ['Todos', ...new Set(library.map(x=>x.group))];
  let active = 'Todos';
  const selected = new Set();
  const filterRoot = document.querySelector('#muscleFilters');
  const libraryRoot = document.querySelector('#exerciseLibrary');
  function render() {
    filterRoot.innerHTML = filters.map(f=>`<button class="chip ${active===f?'active':''}" data-group="${f}">${f}</button>`).join('');
    filterRoot.querySelectorAll('[data-group]').forEach(b=>b.onclick=()=>{active=b.dataset.group;render();});
    const matches = library.filter(x=>active==='Todos'||x.group===active);
    libraryRoot.innerHTML = matches.map((x)=>{const id=library.indexOf(x);return `<article class="exercise-option ${selected.has(id)?'chosen':''}"><button class="demo-thumb" data-demo="${id}" aria-label="Ampliar movimiento de ${x.name}">${x.slug?`<img src="${gifBase+x.slug}.gif" loading="lazy" decoding="async" alt="Demostración animada: ${x.name}">`:`<span>↗</span>`}</button><div class="exercise-option-body"><span class="eyebrow">${x.group} · ${x.muscle}</span><strong>${x.name}</strong><small>${x.sets}</small><div class="exercise-actions"><span class="sub">GIF visible</span><button class="chip select-ex" data-select="${id}">${selected.has(id)?'✓ Agregado':'+ Agregar'}</button></div></div></article>`;}).join('');
    libraryRoot.querySelectorAll('[data-select]').forEach(b=>b.onclick=()=>{const id=+b.dataset.select;selected.has(id)?selected.delete(id):selected.add(id);render();});
    libraryRoot.querySelectorAll('[data-demo]').forEach(b=>b.onclick=()=>showDemo(+b.dataset.demo));
    libraryRoot.querySelectorAll('.demo-thumb img').forEach(img=>img.onerror=()=>{img.parentElement.innerHTML='<span>Ver guía ↗</span>';img.parentElement.classList.add('no-gif');});
    document.querySelector('#selectedCount').textContent=`${selected.size} seleccionados`;
    document.querySelector('#workoutSummary').textContent=selected.size?`${selected.size} ejercicios en tu sesión`:'Tu sesión está vacía';
    document.querySelector('#workoutGroups').textContent=selected.size?[...new Set([...selected].map(i=>library[i].group))].join(' · '):'Elige ejercicios de la lista.';
  }
  function showDemo(id) {
    const x=library[id];
    let box=document.querySelector('#customDemo');
    if(!box){box=document.createElement('div');box.id='customDemo';box.className='workout-modal';document.body.append(box);}
    const img=x.slug?`<img src="${gifBase+x.slug}.gif" alt="Demostración GIF: ${x.name}" loading="eager" decoding="async">`:`<div class="exercise-placeholder large">↗</div>`;
    box.innerHTML=`<div class="workout-dialog"><div class="demo-stage">${img}<span class="muscle-label">Trabaja: ${x.muscle}</span></div><div class="workout-info"><div class="modal-top"><h2>${x.name}</h2><button class="modal-close" aria-label="Cerrar">×</button></div><p><b>${x.group} · ${x.sets}</b></p><p>${x.tip}</p><small style="color:#a0a5af">Demostración animada de FitFocus; necesita conexión. Si no carga, <a style="color:#ff747e" href="https://www.ffocus.me/exercise/${x.slug}" target="_blank" rel="noreferrer">abre la guía del movimiento</a>.</small></div></div>`;
    const demoImg=box.querySelector('img');if(demoImg)demoImg.onerror=()=>{demoImg.replaceWith(Object.assign(document.createElement('div'),{className:'gif-error',textContent:'No se pudo cargar esta animación. Abre la guía del ejercicio para ver la demostración y las instrucciones.'}));};
    box.classList.add('open');box.querySelector('.modal-close').onclick=()=>box.classList.remove('open');box.onclick=e=>{if(e.target===box)box.classList.remove('open');};
  }
  document.querySelector('#startSelected').onclick=()=>{if(!selected.size){alert('Agrega al menos un ejercicio a tu sesión.');return;}const names=[...selected].map(i=>library[i].name).join(', ');const key='ritmo-custom-workouts';const sessions=JSON.parse(localStorage.getItem(key)||'[]');sessions.push({date:new Date().toISOString(),exercises:[...selected].map(i=>library[i].name)});localStorage.setItem(key,JSON.stringify(sessions));alert(`Sesión lista con ${selected.size} ejercicios:\n${names}`);};
  const daily=[
    ['Pecho y tríceps',[0,2,4,20]],['Espalda y bíceps',[8,9,10,19]],['Piernas y glúteos',[12,13,14,16]],['Hombros y core',[17,18,21]],['Cuerpo completo',[2,9,12,17,21]],['Cardio y movilidad',[22,23]],['Descanso activo',[22]]
  ];
  function todayPlan(){const d=new Date().getDay();return daily[(d+6)%7];}
  function setDaily(){const [focus,ids]=todayPlan();document.querySelector('#dailyFocus').textContent=focus;document.querySelector('#dailyDesc').textContent=ids.map(i=>library[i].name).join(' · ');document.querySelector('#useDaily').onclick=()=>{selected.clear();ids.forEach(i=>selected.add(i));active='Todos';render();document.querySelector('#exerciseLibrary').scrollIntoView({behavior:'smooth',block:'center'});};}
  document.addEventListener('keydown',e=>{if(e.key==='Escape')document.querySelector('#customDemo')?.classList.remove('open');});
  render();setDaily();
  document.querySelector('footer')?.remove();document.body.insertAdjacentHTML('beforeend','<footer class="site-footer"><span class="footer-brand">NexoFit</span><span>Creada por Daniel Roberto Barraza · Todos los derechos reservados © '+new Date().getFullYear()+'</span></footer>');
})();
