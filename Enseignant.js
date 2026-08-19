"use strict";

/* =========================================================
   SCHOOL CONNECT — ESPACE ENSEIGNANT
   Inscription et utilisation GRATUITES
   ========================================================= */

const SCHOOL_CONNECT_ENSEIGNANT = {
    nom: "School Connect",
    devise: "GNF",
    abonnement: 0,
    statut: "Gratuit"
};


/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("👨‍🏫 School Connect — Espace enseignant chargé.");
    console.log(
        "Abonnement enseignant :",
        SCHOOL_CONNECT_ENSEIGNANT.abonnement,
        SCHOOL_CONNECT_ENSEIGNANT.devise
    );
    console.log(
        "Statut :",
        SCHOOL_CONNECT_ENSEIGNANT.statut
    );

    chargerEnseignant();
    afficherCoursEnseignant();
    afficherDevoirsEnseignant();
});


/* =========================================================
   CHARGER LE PROFIL ENSEIGNANT
   ========================================================= */

function chargerEnseignant() {

    const enseignant = JSON.parse(
        localStorage.getItem("schoolConnectEnseignant") || "null"
    );

    if (!enseignant) {
        console.log("ℹ️ Aucun enseignant enregistré pour le moment.");
        return;
    }

    const nom = document.getElementById("nomEnseignant");
    const email = document.getElementById("emailEnseignant");
    const matiere = document.getElementById("matiereEnseignant");
    const ecole = document.getElementById("ecoleEnseignant");

    if (nom) {
        nom.textContent = enseignant.nom || "Enseignant";
    }

    if (email) {
        email.textContent = enseignant.email || "Non renseigné";
    }

    if (matiere) {
        matiere.textContent = enseignant.matiere || "Non renseignée";
    }

    if (ecole) {
        ecole.textContent = enseignant.ecole || "Non renseignée";
    }
}


/* =========================================================
   COURS
   ========================================================= */

function afficherCoursEnseignant() {

    const zone = document.getElementById("listeCoursEnseignant");

    if (!zone) {
        return;
    }

    const cours = JSON.parse(
        localStorage.getItem("schoolConnectCours") || "[]"
    );

    if (cours.length === 0) {

        zone.innerHTML = `
            <div class="empty-state">
                <strong>📚 Aucun cours</strong>
                <p>Les cours créés par l'enseignant apparaîtront ici.</p>
            </div>
        `;

        return;
    }

    zone.innerHTML = "";

    cours.forEach(function (coursItem) {

        const bloc = document.createElement("div");

        bloc.className = "course-card";

        bloc.innerHTML = `
            <h3>📚 ${escapeHTML(
                coursItem.matiere || "Cours"
            )}</h3>

            <p>${escapeHTML(
                coursItem.description || ""
            )}</p>

            <small>
                Classe :
                ${escapeHTML(
                    coursItem.classe || "Non renseignée"
                )}
            </small>
        `;

        zone.appendChild(bloc);
    });
}


/* =========================================================
   AJOUTER UN COURS
   ========================================================= */

function ajouterCours() {

    const matiereInput =
        document.getElementById("matiereCours");

    const descriptionInput =
        document.getElementById("descriptionCours");

    const classeInput =
        document.getElementById("classeCours");

    if (!matiereInput || !descriptionInput) {

        alert(
            "Les champs du cours ne sont pas disponibles."
        );

        return;
    }

    const matiere = matiereInput.value.trim();
    const description = descriptionInput.value.trim();
    const classe = classeInput
        ? classeInput.value.trim()
        : "";

    if (!matiere || !description) {

        alert(
            "Veuillez remplir la matière et la description du cours."
        );

        return;
    }

    const cours = JSON.parse(
        localStorage.getItem("schoolConnectCours") || "[]"
    );

    cours.push({
        id: Date.now(),
        matiere: matiere,
        description: description,
        classe: classe,
        date: new Date().toISOString()
    });

    localStorage.setItem(
        "schoolConnectCours",
        JSON.stringify(cours)
    );

    matiereInput.value = "";
    descriptionInput.value = "";

    if (classeInput) {
        classeInput.value = "";
    }

    afficherCoursEnseignant();

    alert("✅ Cours ajouté avec succès.");
}


/* =========================================================
   DEVOIRS
   ========================================================= */

function afficherDevoirsEnseignant() {

    const zone =
        document.getElementById("listeDevoirsEnseignant");

    if (!zone) {
        return;
    }

    const devoirs = JSON.parse(
        localStorage.getItem("schoolConnectDevoirs") || "[]"
    );

    if (devoirs.length === 0) {

        zone.innerHTML = `
            <div class="empty-state">
                <strong>📝 Aucun devoir</strong>
                <p>Les devoirs créés apparaîtront ici.</p>
            </div>
        `;

        return;
    }

    zone.innerHTML = "";

    devoirs.forEach(function (devoir) {

        const bloc = document.createElement("div");

        bloc.className = "homework-card";

        bloc.innerHTML = `
            <h3>📝 ${escapeHTML(
                devoir.titre || "Devoir"
            )}</h3>

            <p>${escapeHTML(
                devoir.description || ""
            )}</p>

            <p>
                📅 Date limite :
                <strong>
                    ${escapeHTML(
                        devoir.date || "Non précisée"
                    )}
                </strong>
            </p>
        `;

        zone.appendChild(bloc);
    });
}


/* =========================================================
   AJOUTER UN DEVOIR
   ========================================================= */

function ajouterDevoir() {

    const titreInput =
        document.getElementById("titreDevoir");

    const descriptionInput =
        document.getElementById("descriptionDevoir");

    const dateInput =
        document.getElementById("dateDevoir");

    if (!titreInput || !descriptionInput) {

        alert(
            "Les champs du devoir ne sont pas disponibles."
        );

        return;
    }

    const titre = titreInput.value.trim();
    const description = descriptionInput.value.trim();

    const date = dateInput
        ? dateInput.value
        : "";

    if (!titre || !description) {

        alert(
            "Veuillez remplir le titre et la description du devoir."
        );

        return;
    }

    const devoirs = JSON.parse(
        localStorage.getItem("schoolConnectDevoirs") || "[]"
    );

    devoirs.push({
        id: Date.now(),
        titre: titre,
        description: description,
        date: date
    });

    localStorage.setItem(
        "schoolConnectDevoirs",
        JSON.stringify(devoirs)
    );

    titreInput.value = "";
    descriptionInput.value = "";

    if (dateInput) {
        dateInput.value = "";
    }

    afficherDevoirsEnseignant();

    alert("✅ Devoir ajouté avec succès.");
}


/* =========================================================
   DÉCONNEXION
   ========================================================= */

function deconnexionEnseignant() {

    const confirmation = confirm(
        "Voulez-vous vraiment vous déconnecter ?"
    );

    if (!confirmation) {
        return;
    }

    localStorage.removeItem(
        "schoolConnectSession"
    );

    window.location.href = "index.html";
}


/* =========================================================
   SÉCURITÉ AFFICHAGE TEXTE
   ========================================================= */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   FIN
   ========================================================= */

console.log(
    "✅ School Connect — enseignant.js prêt."
);