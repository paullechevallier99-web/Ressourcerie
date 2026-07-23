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
      date: "2026-08-09",
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

    formulaire.style.display = "block";


    formulaire.innerHTML = `
        <h2>Inscription : ${atelier.titre}</h2>

        <input id="nom" type="text" placeholder="Votre nom">

        <input id="email" type="email" placeholder="Votre email">

        <button id="valider">
            Confirmer l'inscription
        </button>
    `;


    document.getElementById("valider").addEventListener("click", () => {

        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;


        if(nom === "" || email === "") {
            alert("Veuillez remplir tous les champs");
            return;
        }


        ateliers[index].places_restantes--;

        alert("Inscription confirmée pour " + nom);


        formulaire.style.display = "none";

        afficherAteliers(ateliers);

    });

}



afficherAteliers(ateliers);
