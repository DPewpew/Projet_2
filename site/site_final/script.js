

// --- Données d'exemple ---
const films = [
    { id: 1, titre: "Inception", annee: 2010, image: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg", categorie: "segnior" },
    { id: 2, titre: "Le Roi Lion", annee: 1994, image: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg", categorie: "famille" },
    { id: 3, titre: "Spider-Man: New Generation", annee: 2018, image: "https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg", categorie: "jeune" },
    { id: 4, titre: "Interstellar", annee: 2014, image: "https://image.tmdb.org/t/p/w500/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", categorie: "segnior" },
    { id: 5, titre: "Coco", annee: 2017, image: "https://image.tmdb.org/t/p/w500/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg", categorie: "famille" },
    { id: 6, titre: "Avengers: Endgame", annee: 2019, image: "https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg", categorie: "jeune" }
];

// --- Sidebar ---
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        document.getElementById('main-content').classList.toggle('sidebar-open');
    });
}

// --- Recherche de films ---
const searchForm = document.getElementById('searchForm');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = document.getElementById('searchInput') ? document.getElementById('searchInput').value.trim().toLowerCase() : '';
        if (query.length === 0) return;
        // Stocke la recherche dans le localStorage pour la page search.html
        localStorage.setItem('vod_search_query', query);
        window.location.href = 'search.html';
    });
}

// --- Page search.html : affichage des résultats de recherche et recommandations ---
if (window.location.pathname.endsWith('search.html')) {
    // Récupère la recherche
    const query = localStorage.getItem('vod_search_query') || '';
    const found = films.filter(f => f.titre.toLowerCase().includes(query));
    // Affiche les films trouvés
    const grid = document.getElementById('search-films-grid');
    if (grid) {
        grid.innerHTML = '';
        if (found.length === 0) {
            grid.innerHTML = '<p>Aucun film trouvé.</p>';
        } else {
            found.forEach(film => {
                grid.innerHTML += `
                <div class="film-card" data-id="${film.id}" style="cursor:pointer;">
                    <img src="${film.image}" alt="${film.titre}">
                    <div class="film-info">
                        <h3>${film.titre}</h3>
                        <p>${film.annee}</p>
                    </div>
                </div>`;
            });
            // Event click sur chaque film trouvé
            grid.querySelectorAll('.film-card').forEach(card => {
                card.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    window.location.href = `film.html?id=${id}`;
                });
            });
        }
    }
    // Suggestions de recommandations (films de la même catégorie que le 1er résultat, hors résultats)
    const recoDiv = document.getElementById('search-reco-ligne');
    if (recoDiv && found.length > 0) {
        recoDiv.innerHTML = '';
        // Pour l'exemple, on prend la catégorie du premier résultat
        const cat = found[0].categorie;
        films.filter(f => f.categorie === cat && !found.some(ff => ff.id === f.id)).forEach(filmReco => {
            recoDiv.innerHTML += `
            <div class="reco-film-card" data-id="${filmReco.id}" style="cursor:pointer;">
                <img src="${filmReco.image}" alt="${filmReco.titre}">
                <div class="film-info">
                    <h4>${filmReco.titre}</h4>
                    <p>${filmReco.annee}</p>
                </div>
            </div>`;
        });
        // Event click sur reco
        recoDiv.querySelectorAll('.reco-film-card').forEach(card => {
            card.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                window.location.href = `film.html?id=${id}`;
            });
        });
    }
}

// --- Dark Mode ---
const darkModeBtn = document.getElementById('darkModeBtn');
if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('vod_dark', document.body.classList.contains('dark'));
    });
    // Init dark mode from storage
    if (localStorage.getItem('vod_dark') === 'true') {
        document.body.classList.add('dark');
    }
}

// --- Affichage des films ---
function renderFilmsGrid() {
    const grid = document.getElementById('films-grid');
    if (!grid) return;
    grid.innerHTML = '';
    films.forEach(film => {
        grid.innerHTML += `
        <div class="film-card" data-id="${film.id}" style="cursor:pointer;">
            <img src="${film.image}" alt="${film.titre}">
            <div class="film-info">
                <h3>${film.titre}</h3>
                <p>${film.annee}</p>
            </div>
        </div>`;
    });
    // Ajoute l'event sur chaque carte
    document.querySelectorAll('.film-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `film.html?id=${id}`;
        });
    });
}

// --- Affichage des recommandations ---
function renderRecoLigne(categorie) {
    const recoLigne = document.getElementById('reco-ligne');
    if (!recoLigne) return;
    recoLigne.innerHTML = '';
    films.filter(f => f.categorie === categorie).forEach(film => {
        recoLigne.innerHTML += `
        <div class="reco-film-card" data-id="${film.id}" style="cursor:pointer;">
            <img src="${film.image}" alt="${film.titre}">
            <div class="film-info">
                <h4>${film.titre}</h4>
                <p>${film.annee}</p>
            </div>
        </div>`;
    });
    // Ajoute l'event sur chaque carte reco
    document.querySelectorAll('.reco-film-card').forEach(card => {
        card.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            window.location.href = `film.html?id=${id}`;
        });
    });
}
// --- Page film.html : affichage dynamique des infos du film ---
if (window.location.pathname.endsWith('film.html')) {
    // Récupère l'id du film dans l'URL
    const params = new URLSearchParams(window.location.search);
    const filmId = parseInt(params.get('id'));
    const film = films.find(f => f.id === filmId);
    if (film) {
        // Infos fictives pour illustration
        const fakeDetails = {
            1: { desc: "Un voleur expérimenté, le meilleur dans l'art dangereux de l'extraction d'informations secrètes, est engagé pour implanter une idée dans l'esprit d'un PDG.", budget: "160 000 000 $", rating: "8.8/10", acteurs: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page" },
            2: { desc: "Un lionceau, héritier du trône, doit affronter son destin après la mort de son père.", budget: "45 000 000 $", rating: "8.5/10", acteurs: "Matthew Broderick, Jeremy Irons, James Earl Jones" },
            3: { desc: "Miles Morales devient Spider-Man et rencontre d'autres Spider-héros d'univers parallèles.", budget: "90 000 000 $", rating: "8.4/10", acteurs: "Shameik Moore, Jake Johnson, Hailee Steinfeld" },
            4: { desc: "Des explorateurs voyagent à travers un trou de ver à la recherche d'un nouveau foyer pour l'humanité.", budget: "165 000 000 $", rating: "8.6/10", acteurs: "Matthew McConaughey, Anne Hathaway, Jessica Chastain" },
            5: { desc: "Miguel, jeune musicien, se retrouve au Pays des Morts pour découvrir l'histoire de sa famille.", budget: "175 000 000 $", rating: "8.4/10", acteurs: "Anthony Gonzalez, Gael García Bernal, Benjamin Bratt" },
            6: { desc: "Les Avengers affrontent Thanos dans une bataille décisive pour l'univers.", budget: "356 000 000 $", rating: "8.4/10", acteurs: "Robert Downey Jr., Chris Evans, Mark Ruffalo" }
        };
        const d = fakeDetails[filmId];
        document.getElementById('film-detail-img').src = film.image;
        document.getElementById('film-detail-img').alt = film.titre;
        document.getElementById('film-detail-title').textContent = film.titre;
        document.getElementById('film-detail-desc').textContent = d.desc;
        document.getElementById('film-detail-annee').textContent = film.annee;
        document.getElementById('film-detail-budget').textContent = d.budget;
        document.getElementById('film-detail-rating').textContent = d.rating;
        document.getElementById('film-detail-acteurs').textContent = d.acteurs;
        // Suggestions de films similaires (même catégorie, autre id)
        const recoDiv = document.getElementById('film-reco-ligne');
        if (recoDiv) {
            recoDiv.innerHTML = '';
            films.filter(f => f.categorie === film.categorie && f.id !== film.id).forEach(filmReco => {
                recoDiv.innerHTML += `
                <div class="reco-film-card" data-id="${filmReco.id}" style="cursor:pointer;">
                    <img src="${filmReco.image}" alt="${filmReco.titre}">
                    <div class="film-info">
                        <h4>${filmReco.titre}</h4>
                        <p>${filmReco.annee}</p>
                    </div>
                </div>`;
            });
            // Event click sur reco
            recoDiv.querySelectorAll('.reco-film-card').forEach(card => {
                card.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    window.location.href = `film.html?id=${id}`;
                });
            });
        }
    }
}

// --- Switch catégories reco ---
const recoBtns = document.querySelectorAll('.reco-btn');
if (recoBtns.length) {
    recoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            recoBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderRecoLigne(btn.dataset.categorie);
        });
    });
    // Affiche la première catégorie par défaut
    renderRecoLigne('segnior');
}

// --- Init films grid ---
if (document.getElementById('films-grid')) {
    renderFilmsGrid();
}

// --- Login (démo, pas de backend) ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Connexion fictive réussie !');
        window.location.href = 'index.html';
    });
}
