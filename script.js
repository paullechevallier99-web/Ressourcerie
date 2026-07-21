const ateliers = [
    {
        titre: "Cuisine italienne",
        categorie: "Cuisine",
        date: "25/07/2026",
        heure: "14h00",
        lieu: "Salle A",
        description: "Apprentissage des pâtes fraîches maison.",
        places_restantes: 5
    },
    {
        titre: "Initiation au dessin",
        categorie: "Art",
        date: "28/07/2026",
        heure: "10h00",
        lieu: "Salle B",
        description: "Découverte des bases du dessin.",
        places_restantes: 0
    },
    {
        titre: "Yoga débutant",
        categorie: "Sport",
        date: "02/08/2026",
        heure: "18h00",
        lieu: "Gymnase",
        description: "Séance accessible aux débutants.",
        places_restantes: 8
    }
];


function afficherAteliers(ateliers) {

    const container = document.getElementById("liste-ateliers");

    ateliers.forEach(atelier => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${atelier.titre}</h3>
            <p><strong>Catégorie :</strong> ${atelier.categorie}</p>
            <p><strong>Date :</strong> ${atelier.date}</p>
            <p><strong>Horaire :</strong> ${atelier.heure}</p>
            <p><strong>Lieu :</strong> ${atelier.lieu}</p>
            <p>${atelier.description}</p>

            <p>
                ${
                    atelier.places_restantes > 0
                    ? `🟢 ${atelier.places_restantes} places restantes`
                    : `🔴 Complet`
                }
            </p>
        `;

        container.appendChild(card);
    });
}


afficherAteliers(ateliers);
