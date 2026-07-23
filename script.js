const ateliers = [
    {
        titre: "Réparation de vélos",
        categorie: "Mécanique",
        date: "22/07/2026",
        heure: "18h00 - 20h30",
        lieu: "Atelier Nord - Caen",
        places_restantes: 3,
        description: "Freins, dérailleurs, crevaisons : viens réparer ton vélo avec l'aide de bénévoles mécaniciens."
    },
    {
        titre: "Relooking de meubles en palette",
        categorie: "Bois",
        date: "26/07/2026",
        heure: "14h00 - 17h00",
        lieu: "Hangar Sud - Mondeville",
        places_restantes: 0,
        description: "Ponçage, peinture, assemblage : transforme des palettes récupérées en étagère ou table basse."
    },
    {
        titre: "Petit électroménager : le diagnostic",
        categorie: "Électronique",
        date: "02/08/2026",
        heure: "10h00 - 12h30",
        lieu: "Atelier Nord - Caen",
        places_restantes: 5,
        description: "Grille-pain, bouilloire, mixeur en panne : apprends à identifier la panne avant de jeter."
    },
    {
      titre: "Couture et retouche textile",
      categorie: "Textile",
      date: "09/08/2026",
      heure: "14h00 - 16h30",
      lieu: "Local Textile - Hérouville",
      places_restantes: 7,
      description: "Ourlets, boutons, reprises : redonne vie à des vêtements plutôt que de les remplacer."
    }
];



function afficherAteliers(ateliers) {

    const container = document.getElementById("liste-ateliers");
    container.innerHTML = "";

    ateliers.forEach((atelier, index) => {

        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <h3>${atelier.titre}</h3>
            <p><strong>Catégorie :</strong> ${atelier.categorie}</p>
            <p><strong>Date :</strong> ${atelier.date}</p>
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
        `;


        // clic sur la carte
        card.addEventListener("click", () => {

            if (atelier.places_restantes <= 0) {
                alert("Cet atelier est complet !");
                return;
            }

            ouvrirFormulaire(atelier, index);
        });


        container.appendChild(card);

    });
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
            <input
                id="nom"
                type="text"
                placeholder="Votre prénom"
                required>

            <label for="email">Email</label>
            <input
                id="email"
                type="email"
                placeholder="Votre email"
                required>

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

        // Validation prénom
        const regexPrenom = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,30}$/;

        if (!regexPrenom.test(prenom)) {
            const message = document.getElementById("message-formulaire");

            message.textContent = "Veuillez saisir un prénom valide.";
            message.className = "message-erreur";

            document.getElementById("nom").focus();
            return;

        }

        // Validation email
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
                    est enregistrée. Vous allez recevoir un courriel de rappel à l'adresse mail 
                    <strong>${email}</strong>.
                </p>

                <button id="fermer-confirmation">
                    Retour aux ateliers
                </button>
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


afficherAteliers(ateliers);
