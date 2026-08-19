/* =========================================================
   SCHOOL CONNECT — ESPACE ÉLÈVE
   eleve.js
   ========================================================= */

"use strict";

const SCHOOL_CONNECT = {
    nom: "School Connect",
    devise: "GNF",
    abonnement: 0,
    gratuit: true
};


/* =========================================================
   INITIALISATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🎓 School Connect — Espace élève chargé.");
    console.log("Abonnement élève :", SCHOOL_CONNECT.abonnement, SCHOOL_CONNECT.devise);
    console.log("Statut :", "Gratuit");

    afficherInformationsEleve();
    afficherCours();
    afficherDevoirs();
    afficherNotes();
    afficherProfil();

});


/* =========================================================
   UTILITAIRES
   ========================================================= */

function trouverElement(...ids) {
    for (const id of ids) {
        const element = document.getElementById(id);

        if (element) {
            return element;
        }
    }

    return null;
}


function afficherMessage(message) {
    alert(message);
}


/* =========================================================
   INFORMATIONS DE L'ÉLÈVE
   ========================================================= */

function afficherInformationsEleve() {

    const eleve = JSON.parse(
        localStorage.getItem("schoolConnectEleve") || "null"
    );

    if (!eleve) {
        console.log("ℹ️ Aucun élève enregistré pour le moment.");
        return;
    }

    const nom = trouverElement(
        "nomEleve",
        "eleveNom",
        "profilNom"
    );

    const email = trouverElement(
        "emailEleve",
        "eleveEmail",
        "profilEmail"
    );

    const classe = trouverElement(
        "classeEleve",
        "eleveClasse",
        "profilClasse"
    );

    if (nom) {
        nom.textContent = eleve.nom || "Élève";
    }

    if (email) {
        email.textContent = eleve.email || "Non renseigné";
    }

    if (classe) {
        classe.textContent = eleve.classe || "Non renseignée";
    }
}


/* =========================================================
   COURS
   ========================================================= */

function afficherCours() {

    const zone = trouverElement(
        "listeCours",
        "coursListe",
        "coursesList"
    );

    if (!zone) {
        return;
    }

    const cours = JSON.parse(
        localStorage.getItem("schoolConnectCours") || "[]"
    );

    if (cours.length === 0) {

        zone.innerHTML = `
            <div class="empty-state">
                <strong>📚 Aucun cours pour le moment</strong>
                <p>Les cours apparaîtront ici.</p>
            </div>
        `;

        return;
    }

    zone.innerHTML = "";

    cours.forEach(function (coursItem) {

        const bloc = document.createElement("div");

        bloc.className = "course-card";

        bloc.innerHTML = `
            <h3>📚 ${escapeHTML(coursItem.matiere || "Cours")}</h3>
            <p>${escapeHTML(coursItem.description || "")}</p>
            <small>
                Enseignant : ${escapeHTML(coursItem.enseignant || "Non renseigné")}
            </small>
        `;

        zone.appendChild(bloc);
    });
}


/* =========================================================
   DEVOIRS
   ========================================================= */

function afficherDevoirs() {

    const zone = trouverElement(
        "listeDevoirs",
        "devoirsListe",
        "homeworksList"
    );

    if (!zone) {
        return;
    }

    const devoirs = JSON.parse(
        localStorage.getItem("schoolConnectDevoirs") || "[]"
    );

    if (devoirs.length === 0) {

        zone.innerHTML = `
            <div class="empty-state">
                <strong>📝 Aucun devoir pour le moment</strong>
                <p>Les devoirs donnés par les enseignants apparaîtront ici.</p>
            </div>
        `;

        return;
    }

    zone.innerHTML = "";

    devoirs.forEach(function (devoir) {

        const bloc = document.createElement("div");

        bloc.className = "homework-card";

        bloc.innerHTML = `
            <h3>📝 ${escapeHTML(devoir.titre || "Devoir")}</h3>
            <p>${escapeHTML(devoir.description || "")}</p>
            <p>
                📅 Date limite :
                <strong>${escapeHTML(devoir.date || "Non précisée")}</strong>
            </p>
        `;

        zone.appendChild(bloc);
    });
}


/* =========================================================
   NOTES
   ========================================================= */

function afficherNotes() {

    const zone = trouverElement(
        "listeNotes",
        "notesListe",
        "gradesList"
    );

    if (!zone) {
        return;
    }

    const notes = JSON.parse(
        localStorage.getItem("schoolConnectNotes") || "[]"
    );

    if (notes.length === 0) {

        zone.innerHTML = `
            <div class="empty-state">
                <strong>📊 Aucune note pour le moment</strong>
                <p>Vos notes apparaîtront ici.</p>
            </div>
        `;

        return;
    }

    zone.innerHTML = "";

    notes.forEach(function (note) {

        const bloc = document.createElement("div");

        bloc.className = "note-card";

        bloc.innerHTML = `
            <h3>📊 ${escapeHTML(note.matiere || "Matière")}</h3>
            <p>
                Note :
                <strong>${escapeHTML(String(note.note || "0"))}</strong>
                / ${escapeHTML(String(note.total || "20"))}
            </p>
        `;

        zone.appendChild(bloc);
    });
}


/* =========================================================
   PROFIL
   ========================================================= */

function afficherProfil() {

    const zone = trouverElement(
        "profilEleve",
        "profileEleve",
        "profil"
    );

    if (!zone) {
        return;
    }

    const eleve = JSON.parse(
        localStorage.getItem("schoolConnectEleve") || "null"
    );

    if (!eleve) {

        zone.innerHTML = `
            <p>👤 Aucun profil élève enregistré.</p>
        `;

        return;
    }

    zone.innerHTML = `
        <h3>👤 ${escapeHTML(eleve.nom || "Élève")}</h3>
        <p>📧 ${escapeHTML(eleve.email || "Email non renseigné")}</p>
        <p>🎓 Classe : ${escapeHTML(eleve.classe || "Non renseignée")}</p>
        <p>🏫 École : ${escapeHTML(eleve.ecole || "Non renseignée")}</p>
    `;
}


/* =========================================================
   DÉCONNEXION
   ========================================================= */

function deconnexionEleve() {

    const confirmation = confirm(
        "Voulez-vous vraiment vous déconnecter ?"
    );

    if (!confirmation) {
        return;
    }

    localStorage.removeItem("schoolConnectSession");

    window.location.href = "index.html";
}


/* =========================================================
   SÉCURITÉ — AFFICHAGE DU TEXTE
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

console.log("✅ School Connect — eleve.js prêt.");