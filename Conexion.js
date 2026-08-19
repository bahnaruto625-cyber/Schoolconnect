"use strict";

/* =========================================================
   SCHOOL CONNECT — CONNEXION.JS
   Connexion des :
   🏫 Écoles
   👨‍👩‍👧 Parents
   👩‍🏫 Enseignants
   🎓 Élèves
   ⚙️ Administrateur
   ========================================================= */

const CONNEXION_CONFIG = {
    application: "School Connect",
    devise: "GNF",
    orangeMoney: "614 877 827"
};


/* =========================================================
   DÉMARRAGE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🔐 School Connect — connexion.js prêt.");

    initialiserConnexion();

});


/* =========================================================
   FORMULAIRE DE CONNEXION
   ========================================================= */

function initialiserConnexion() {

    const formulaire = document.querySelector("#formConnexion");

    if (!formulaire) {
        console.log("ℹ️ Aucun formulaire de connexion détecté.");
        return;
    }

    formulaire.addEventListener("submit", function (event) {

        event.preventDefault();

        const email =
            document.querySelector("#connexionEmail")?.value.trim();

        const motDePasse =
            document.querySelector("#connexionMotDePasse")?.value;

        const type =
            document.querySelector("#connexionType")?.value;

        if (!email || !motDePasse || !type) {

            afficherMessage(
                "⚠️ Veuillez remplir tous les champs.",
                "error"
            );

            return;
        }

        connecterUtilisateur(
            email,
            motDePasse,
            type
        );

    });

}


/* =========================================================
   CONNEXION
   ========================================================= */

function connecterUtilisateur(email, motDePasse, type) {

    /*
     * Pour l'instant, ceci est une version FRONT-END.
     * La vraie vérification des comptes sera faite plus tard
     * avec la base de données et le serveur.
     */

    const utilisateur = {

        email: email,

        type: type,

        dateConnexion:
            new Date().toISOString(),

        connecte: true

    };


    localStorage.setItem(
        "schoolConnectUtilisateur",
        JSON.stringify(utilisateur)
    );


    console.log(
        "✅ Connexion réussie :",
        utilisateur
    );


    afficherMessage(
        "✅ Connexion réussie. Bienvenue sur School Connect !",
        "success"
    );


    setTimeout(function () {

        redirigerUtilisateur(type);

    }, 700);

}


/* =========================================================
   REDIRECTION SELON LE TYPE DE COMPTE
   ========================================================= */

function redirigerUtilisateur(type) {

    switch (type) {

        case "admin":

            window.location.href = "admin.html";

            break;


        case "ecole":

            window.location.href = "ecole.html";

            break;


        case "parent":

            window.location.href = "parent.html";

            break;


        case "enseignant":

            window.location.href = "enseignant.html";

            break;


        case "eleve":

            window.location.href = "eleve.html";

            break;


        default:

            console.warn(
                "⚠️ Type de compte inconnu :",
                type
            );

            break;
    }

}


/* =========================================================
   AFFICHER UN MESSAGE
   ========================================================= */

function afficherMessage(message, type) {

    let zone =
        document.querySelector("#messageConnexion");


    /*
     * Si la zone n'existe pas dans index.html,
     * on la crée automatiquement.
     */

    if (!zone) {

        zone = document.createElement("div");

        zone.id = "messageConnexion";

        zone.style.margin = "12px 0";

        zone.style.padding = "10px";

        zone.style.borderRadius = "8px";

        const formulaire =
            document.querySelector("#formConnexion");

        if (formulaire) {

            formulaire.prepend(zone);

        } else {

            document.body.prepend(zone);

        }

    }


    zone.textContent = message;


    if (type === "success") {

        zone.style.background = "#d1fae5";

        zone.style.color = "#065f46";

    } else {

        zone.style.background = "#fee2e2";

        zone.style.color = "#991b1b";

    }

}


/* =========================================================
   VÉRIFIER SI UN UTILISATEUR EST CONNECTÉ
   ========================================================= */

function utilisateurConnecte() {

    const utilisateur =
        localStorage.getItem(
            "schoolConnectUtilisateur"
        );

    if (!utilisateur) {

        return false;

    }

    try {

        const data =
            JSON.parse(utilisateur);

        return data.connecte === true;

    } catch (erreur) {

        console.error(
            "❌ Erreur de lecture de la session.",
            erreur
        );

        return false;

    }

}


/* =========================================================
   RÉCUPÉRER L'UTILISATEUR CONNECTÉ
   ========================================================= */

function obtenirUtilisateurConnecte() {

    const utilisateur =
        localStorage.getItem(
            "schoolConnectUtilisateur"
        );

    if (!utilisateur) {

        return null;

    }

    try {

        return JSON.parse(utilisateur);

    } catch (erreur) {

        console.error(
            "❌ Session invalide.",
            erreur
        );

        return null;

    }

}


/* =========================================================
   DÉCONNEXION
   ========================================================= */

function deconnecterUtilisateur() {

    localStorage.removeItem(
        "schoolConnectUtilisateur"
    );

    console.log(
        "🚪 Utilisateur déconnecté."
    );


    window.location.href = "index.html";

}


/* =========================================================
   INFORMATIONS
   ========================================================= */

console.log(
    "🔐 School Connect — système de connexion chargé."
);

console.log(
    "💰 Devise : GNF (franc guinéen)"
);

console.log(
    "📱 Orange Money : " +
    CONNEXION_CONFIG.orangeMoney
);