async function chargerDonnees() {
    try {
        const response = await fetch("donnees.json");

        if (!response.ok) {
            throw new Error("Erreur lors du chargement du JSON");
        }

        const data = await response.json();

        afficherAteliers(data.ateliers);

    } catch (erreur) {
        console.error(erreur);
    }
}

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

chargerDonnees();
