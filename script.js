const data = {
    association: {
        nom: "La Ressourcerie du Coin",
        slogan: "Ce qu'on jette a toujours une deuxième vie.",
        ville: "Caen",
        maj: "2026-07-14"
    },
    stats: {
        kg_reemployes_mois: 2437,
        objets_sauves_total: 15320,
        adherents: 187,
        benevoles_actifs: 34,
        ateliers_ce_mois: 6
    },
    ateliers: [
        {
            id: "at-01",
            titre: "Réparation de vélos",
            image: "at1.jpg",
            categorie: "Mécanique",
            date: "2026-07-22",
            heure: "18h00 - 20h30",
            lieu: "Atelier Nord - Caen",
            places_restantes: 3,
            description: "Freins, dérailleurs, crevaisons : viens réparer ton vélo avec l'aide de bénévoles mécaniciens."
        },
        {
            id: "at-02",
            titre: "Relooking de meubles en palette",
            image: "at2.jpg",
            categorie: "Bois",
            date: "2026-07-26",
            heure: "14h00 - 17h00",
            lieu: "Hangar Sud - Mondeville",
            places_restantes: 0,
            description: "Ponçage, peinture, assemblage : transforme des palettes récupérées en étagère ou table basse."
        },
        {
            id: "at-03",
            titre: "Petite électroménager : le diagnostic",
            image: "at3.jpg",
            categorie: "Électronique",
            date: "2026-08-02",
            heure: "10h00 - 12h30",
            lieu: "Atelier Nord - Caen",
            places_restantes: 5,
            description: "Grille-pain, bouilloire, mixeur en panne : apprends à identifier la panne avant de jeter."
        },
        {
            id: "at-04",
            titre: "Couture et retouche textile",
            image: "at4.jpg",
            categorie: "Textile",
            date: "2026-08-09",
            heure: "14h00 - 16h30",
            lieu: "Local Textile - Hérouville",
            places_restantes: 7,
            description: "Ourlets, boutons, reprises : redonne vie à des vêtements plutôt que de les remplacer."
        },
        {
            id: "at-05",
            titre: "Création d'objets déco à partir de matériaux recyclés",
            image: "at1.jpg",
            categorie: "Créatif",
            date: "2026-08-16",
            heure: "14h00 - 17h00",
            lieu: "Atelier Nord - Caen",
            places_restantes: 6,
            description: "Donne une seconde vie à des matériaux récupérés en réalisant des objets de décoration uniques : vases, cadres, photophores ou suspensions."
        },
        {
            id: "at-06",
            titre: "Création d'un composteur",
            image: "at1.jpg",
            categorie: "Jardin",
            date: "2026-08-30",
            heure: "10h00 - 12h30",
            lieu: "Hangar Sud - Mondeville",
            places_restantes: 1,
            description: "Apprends à fabriquer un composteur en bois de récupération et découvre les bonnes pratiques pour valoriser tes déchets organiques."
        },
    ],
    points_collecte: [
        {
            nom: "Atelier Nord",
            adresse: "12 rue des Jardins, 14000 Caen",
            lat: 49.1965,
            lng: -0.3708,
            horaires: "Lun-Sam 9h-18h",
            type: "Dépôt général"
        },
        {
            nom: "Hangar Sud",
            adresse: "5 avenue de la Résistance, 14120 Mondeville",
            lat: 49.1571,
            lng: -0.3218,
            horaires: "Mar-Sam 10h-17h",
            type: "Meubles et bois"
        },
        {
            nom: "Local Textile",
            adresse: "8 place du Marché, 14200 Hérouville-Saint-Clair",
            lat: 49.2072,
            lng: -0.3389,
            horaires: "Mer et Sam 9h-13h",
            type: "Textile"
        },
        {
            nom: "Point Électro",
            adresse: "20 rue de Bayeux, 14000 Caen",
            lat: 49.1857,
            lng: -0.3745,
            horaires: "Jeu-Ven 14h-18h",
            type: "Électroménager et électronique"
        }
    ]
};

const ateliers = data.ateliers;
const pointsCollecte = data.points_collecte;


// "2026-07-22" -> "22/07/2026"
function formatDateFr(iso) {
    const [an, mois, jour] = iso.split("-");
    return `${jour}/${mois}/${an}`;
}

// Associe un atelier à son point de collecte via le nom du lieu
function trouverPoint(lieu) {
    return pointsCollecte.find(p => lieu.includes(p.nom));
}


function afficherAteliers(ateliers) {

    const container = document.getElementById("liste-ateliers");
    container.innerHTML = "";

    ateliers.forEach((atelier, index) => {

        const card = document.createElement("div");
        card.classList.add("card");

        const point = trouverPoint(atelier.lieu);

        const decalage = 0.01;
        const carteHTML = point ? `
            <div class="lieu-info">
                <iframe
                    class="mini-carte"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${point.lng - decalage}%2C${point.lat - decalage}%2C${point.lng + decalage}%2C${point.lat + decalage}&layer=mapnik&marker=${point.lat}%2C${point.lng}">
                </iframe>
                <div class="lieu-details">
                    <div class="lieu-adresse">
                        <p><strong>📍 ${point.nom}</strong></p>
                        <p>${point.adresse}</p>
                    </div>
                    <div class="lieu-horaires">
                        🕒 ${point.horaires}
                    </div>
                </div>
            </div>
        ` : "";

        card.innerHTML = `
            <div class="card-contenu">

                <div class="card-info">
                    <h3>${atelier.titre}</h3>
                    <p><strong>Catégorie :</strong> ${atelier.categorie}</p>
                    <p><strong>Date :</strong> ${formatDateFr(atelier.date)}</p>
                    <p><strong>Horaire :</strong> ${atelier.heure}</p>
                    <p><strong>Lieu :</strong> ${atelier.lieu}</p>
                    <p>${atelier.description}</p>

                    <p class="places">
                        ${
                            atelier.places_restantes > 0
                            ? `🟢 ${atelier.places_restantes} places restantes`
                            : `🔴 Complet`
                        }
                    </p>
                    <img src="../photo/${atelier.image}" alt="${atelier.titre}" class="photo-atelier">
                </div>

                ${carteHTML}

            </div>
        `;

        // clic sur la carte (sauf sur la mini carte elle-même)
        card.addEventListener("click", (e) => {

            if (e.target.closest(".mini-carte")) return;

            if (atelier.places_restantes <= 0) {
                afficherMessageComplet(atelier);
                return;
            }

            ouvrirFormulaire(atelier, index);
        });

        container.appendChild(card);

    });
}
function afficherPointsCollecte() {

    const container = document.getElementById("liste-ateliers");
    container.innerHTML = "";

    const decalage = 0.012;

    pointsCollecte.forEach((point) => {

        const card = document.createElement("div");
        card.classList.add("card");

        // Ateliers qui se déroulent à ce point de collecte
        const ateliersAssocies = ateliers.filter(a => a.lieu.includes(point.nom));

        const listeAteliersHTML = ateliersAssocies.length > 0
            ? ateliersAssocies.map(a => `
                <div class="chip-atelier">
                    ${a.titre}
                    <span class="chip-date">${formatDateFr(a.date)}</span>
                </div>
            `).join("")
            : `<p class="aucun-atelier">Aucun atelier prévu ici pour le moment.</p>`;

        card.innerHTML = `
            <div class="card-collecte-contenu">

                <div class="collecte-info">

                    <div class="collecte-header">
                        <h3>📍 ${point.nom}</h3>
                        <span class="type-badge">${point.type}</span>
                    </div>

                    <p>${point.adresse}</p>
                    <p>🕒 ${point.horaires}</p>

                    <div class="ateliers-associes">
                        <p>Ateliers sur place</p>
                        ${listeAteliersHTML}
                    </div>

                </div>

                <iframe
                    class="grande-carte"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=${point.lng - decalage}%2C${point.lat - decalage}%2C${point.lng + decalage}%2C${point.lat + decalage}&layer=mapnik&marker=${point.lat}%2C${point.lng}">
                </iframe>

            </div>
        `;

        container.appendChild(card);

    });
}


function afficherMessageComplet(atelier) {

    const formulaire = document.getElementById("formulaire-inscription");
    const overlay = document.getElementById("overlay-inscription");

    formulaire.style.display = "block";
    overlay.style.display = "block";

    formulaire.innerHTML = `
        <div class="confirmation">
            <h3>🔴 Atelier complet</h3>
            <p>
                L'atelier <strong>${atelier.titre}</strong>
                n'a plus de places disponibles.
            </p>
            <button id="fermer-complet">Retour aux ateliers</button>
        </div>
    `;

    function fermer() {
        formulaire.style.display = "none";
        overlay.style.display = "none";
    }

    document.getElementById("fermer-complet").addEventListener("click", fermer);
    overlay.onclick = fermer;
}


function ouvrirFormulaire(atelier, index) {

    const formulaire = document.getElementById("formulaire-inscription");
    const overlay = document.getElementById("overlay-inscription");

    formulaire.style.display = "block";
    overlay.style.display = "block";

    formulaire.innerHTML = `
        <h3>Inscription : <br>${atelier.titre}</h3>

        <form id="inscriptionForm" novalidate>

            <label for="nom">Prénom</label>
            <input id="nom" type="text" placeholder="Votre prénom" required>

            <label for="email">Email</label>
            <input id="email" type="email" placeholder="Votre email" required>

            <p id="message-formulaire"></p>

            <div class="actions">
                <button type="submit">Confirmer l'inscription</button>
                <button id="annuler" type="button" class="btn-secondaire">Annuler</button>
            </div>

        </form>
    `;

    function fermer() {
        formulaire.style.display = "none";
        overlay.style.display = "none";
    }

    document.getElementById("annuler").addEventListener("click", fermer);
    overlay.onclick = fermer;

    const form = document.getElementById("inscriptionForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const prenom = document.getElementById("nom").value.trim();
        const email = document.getElementById("email").value.trim();

        const regexPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,30}$/;

        if (!regexPrenom.test(prenom)) {
            const message = document.getElementById("message-formulaire");
            message.textContent = "Veuillez saisir un prénom valide.";
            message.className = "message-erreur";
            document.getElementById("nom").focus();
            return;
        }

        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regexEmail.test(email)) {
            const message = document.getElementById("message-formulaire");
            message.textContent = "Veuillez saisir une adresse e-mail valide.";
            message.className = "message-erreur";
            document.getElementById("email").focus();
            return;
        }

        ateliers[index].places_restantes--;

        formulaire.innerHTML = `
            <div class="confirmation">
                <h3>✅ Inscription confirmée !</h3>
                <p>
                    Merci <strong>${prenom}</strong>, votre inscription à
                    <strong>${atelier.titre}</strong>
                    est enregistrée. Vous allez recevoir un courriel de rappel à l'adresse
                    <strong>${email}</strong>.
                </p>
                <button id="fermer-confirmation">Retour aux ateliers</button>
            </div>
        `;

        document
            .getElementById("fermer-confirmation")
            .addEventListener("click", () => {
                fermer();
                afficherAteliers(ateliers);
            });
    });

}


function formatNombre(n) {
    return n.toLocaleString("fr-FR");
}

function afficherStats() {

    const container = document.getElementById("liste-stats");
    if (!container) return;

    const stats = data.stats;

    const items = [
        {
            icone: "♻️",
            valeur: `${formatNombre(stats.kg_reemployes_mois)} kg`,
            label: "réemployés ce mois-ci"
        },
        {
            icone: "📦",
            valeur: formatNombre(stats.objets_sauves_total),
            label: "objets sauvés au total"
        },
        {
            icone: "🧑‍🤝‍🧑",
            valeur: formatNombre(stats.adherents),
            label: "adhérents"
        },
        {
            icone: "🙌",
            valeur: formatNombre(stats.benevoles_actifs),
            label: "bénévoles actifs"
        },
        {
            icone: "🛠️",
            valeur: formatNombre(stats.ateliers_ce_mois),
            label: "ateliers ce mois-ci"
        }
    ];

    container.innerHTML = items.map(item => `
        <div class="stat-card">
            <div class="stat-icone">${item.icone}</div>
            <div class="stat-valeur">${item.valeur}</div>
            <div class="stat-label">${item.label}</div>
        </div>
    `).join("");

    const majEl = document.getElementById("stats-maj");
    if (majEl) {
        majEl.textContent = `Chiffres mis à jour le ${formatDateFr(data.association.maj)}`;
    }
}

afficherStats();


const conteneurListe = document.getElementById("liste-ateliers");

if (conteneurListe) {
    if (conteneurListe.dataset.page === "collecte") {
        afficherPointsCollecte();
    } else {
        afficherAteliers(ateliers);
    }
}
