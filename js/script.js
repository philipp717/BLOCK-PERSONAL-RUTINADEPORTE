const postsData = [
  {
    id: 'rutina-cardio-30',
    title: 'Cardio HIIT - 30 min',
    difficulty: 'Alta',
    duration: '30 min',
    image: 'assets/images/cardio-hiit.avif',
    excerpt: 'Entrenamiento de alta intensidad para mejorar resistencia y quemar grasa.',
    steps: ['Calentamiento 5 min (trota en el sitio)', '4 rondas: 30s sprint en el lugar / 30s descanso', 'Saltos de tijera 3x30s', 'Burpees 3x10', 'Enfriamiento y estiramientos 5 min']
  },
  {
    id: 'rutina-fuerza-20',
    title: 'Fuerza en casa - 20 min',
    difficulty: 'Media',
    duration: '20 min',
    image: 'assets/images/en-casa.png',
    excerpt: 'Rutina sin equipamiento para fortalecer todo el cuerpo.',
    steps: ['Sentadillas 3x12', 'Flexiones 3x10', 'Fondos en silla 3x12', 'Plancha 3x30s', 'Puente de glúteos 3x15']
  },
  {
    id: 'rutina-yoga-matinal',
    title: 'Yoga matinal - 15 min',
    difficulty: 'Baja',
    duration: '15 min',
    image: 'assets/images/yoga-matinal.webp',
    excerpt: 'Secuencia suave para activar el cuerpo y mejorar movilidad.',
    steps: ['Saludo al sol x3', 'Postura del perro mirando abajo 1 min', 'Guerrero I 30s cada lado', 'Torsión espinal sentada 1 min', 'Respiración consciente 2 min']
  },
  {
    id: 'rutina-core-10',
    title: 'Core express - 10 min',
    difficulty: 'Media',
    duration: '10 min',
    image: 'assets/images/core.jpg',
    excerpt: 'Serie rápida para fortalecer abdominales y lumbares.',
    steps: ['Plancha 40s', 'Bicicleta 3x30s', 'Elevaciones de piernas 3x12', 'Russian twists 3x20', 'Plancha lateral 30s cada lado']
  },
  {
    id: 'rutina-piernas-30',
    title: 'Piernas y resistencia - 30 min',
    difficulty: 'Media-Alta',
    duration: '30 min',
    image: 'assets/images/piernas.avif',
    excerpt: 'Trabajo intenso centrado en cuádriceps, isquiotibiales y glúteos.',
    steps: ['Zancadas caminando 4x12', 'Sentadilla con salto 3x15', 'Peso muerto a una pierna 3x12', 'Steps en escalón 3x20', 'Estiramiento de piernas 5 min']
  }
];

// Render posts to the page
const postsContainer = document.getElementById('posts');
const favoritesList = document.getElementById('favoritesList');
const searchInput = document.getElementById('search');

function createPostCard(post){
  const el = document.createElement('article');
  el.className = 'post';
  el.dataset.id = post.id;
  el.innerHTML = `
    <img src="${post.image}" alt="${post.title}">
    <div class="post-body">
      <div class="meta">
        <span class="badge">${post.duration} • ${post.difficulty}</span>
        <button class="btn heart-btn" title="Agregar a favoritos">❤</button>
      </div>
      <h3>${post.title}</h3>
      <p class="excerpt">${post.excerpt}</p>
      <div class="actions">
        <button class="btn view-steps">Ver pasos</button>
      </div>
      <div class="steps" aria-hidden="true">
        <ol>
          ${post.steps.map(s => `<li>${s}</li>`).join('')}
        </ol>
      </div>
    </div>
  `;

  // events
  const viewBtn = el.querySelector('.view-steps');
  const stepsEl = el.querySelector('.steps');
  const heartBtn = el.querySelector('.heart-btn');

  viewBtn.addEventListener('click', () => {
    const open = stepsEl.classList.toggle('open');
    stepsEl.setAttribute('aria-hidden', String(!open));
    viewBtn.textContent = open ? 'Ocultar pasos' : 'Ver pasos';
  });

  heartBtn.addEventListener('click', () => toggleFavorite(post.id, post));

  // favorite state
  if(isFavorited(post.id)) heartBtn.classList.add('fav');

  return el;
}

function renderPosts(list){
  postsContainer.innerHTML = '';
  list.forEach(p => postsContainer.appendChild(createPostCard(p)));
}

// Search
searchInput.addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase().trim();
  const filtered = postsData.filter(p => {
    return p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.difficulty.toLowerCase().includes(q);
  });
  renderPosts(filtered);
});

// Smooth scroll para favoritos
document.querySelector('.scroll-to-favorites').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelector('#seccion-favoritos').scrollIntoView({
    behavior: 'smooth'
  });
});

// Favorites (localStorage)
function getFavorites(){
  try{
    return JSON.parse(localStorage.getItem('rutina_favs') || '[]');
  }catch(e){
    return [];
  }
}

function saveFavorites(list){
  localStorage.setItem('rutina_favs', JSON.stringify(list));
  renderFavorites();
  
  // Actualizar todos los corazones
  document.querySelectorAll('.heart-btn').forEach(btn => {
    const id = btn.closest('.post').dataset.id;
    btn.classList.toggle('fav', isFavorited(id));
    btn.innerHTML = isFavorited(id) ? '❤️' : '🤍';
  });
}

function isFavorited(id){
  return getFavorites().some(f => f.id === id);
}

function toggleFavorite(id, post){
  let favs = getFavorites();
  if(isFavorited(id)){
    favs = favs.filter(f => f.id !== id);
  }else{
    favs.push({id: post.id, title: post.title, image: post.image});
  }
  saveFavorites(favs);
}

function renderFavorites(){
  const favs = getFavorites();
  
  if (favs.length === 0) {
    favoritesList.innerHTML = `
      <div class="no-favorites">
        <p>No tienes rutinas favoritas aún.<br>Dale ❤️ a las rutinas que quieras guardar.</p>
      </div>
    `;
    return;
  }
  
  favoritesList.innerHTML = favs.map(f => `
    <article class="fav-item" data-id="${f.id}">
      <img src="${f.image}" alt="${f.title}">
      <div class="fav-meta">
        <h3>${f.title}</h3>
        <button class="btn remove-fav" title="Eliminar de favoritos">
          <span class="icon">❌</span>
          <span>Eliminar</span>
        </button>
      </div>
    </article>
  `).join('');

  // attach remove handlers
  favoritesList.querySelectorAll('.remove-fav').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.closest('.fav-item').dataset.id;
      toggleFavorite(id);
    });
  });
}

// Theme toggle
const toggleThemeBtn = document.getElementById('toggleTheme');
function loadTheme(){
  const t = localStorage.getItem('site_theme') || 'light';
  if(t === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  toggleThemeBtn.textContent = t === 'dark' ? 'Modo claro' : 'Modo oscuro';
  toggleThemeBtn.setAttribute('aria-pressed', t === 'dark');
}

toggleThemeBtn.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = cur === 'dark' ? 'light' : 'dark';
  if(next === 'dark') document.documentElement.setAttribute('data-theme', 'dark'); else document.documentElement.removeAttribute('data-theme');
  localStorage.setItem('site_theme', next);
  loadTheme();
});

// Init
renderPosts(postsData);
renderFavorites();
loadTheme();
