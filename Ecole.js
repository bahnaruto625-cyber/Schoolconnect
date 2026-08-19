/* =========================================================
   SCHOOL CONNECT — ECOLE.JS
   Gestion de l'espace École
   Devise : GNF
   Abonnement : 250 000 GNF / mois
   Orange Money : 614 877 827
   ========================================================= */

"use strict";

/* =========================
   CONFIGURATION
========================= */

const ECOLE_CONFIG = {
    nomApplication: "School Connect",
    devise: "GNF",
    abonnementMensuel: 250000,
    numeroOrangeMoney: "614 877 827"
};

/* =========================
   OUTILS
========================= */

function obtenirEcoles() {
    try {
        return JSON.parse(localStorage.getItem("schoolConnectEcoles")) || [];
    } catch (erreur) {
        console.error("Erreur lecture écoles :", erreur);
        return [];
    }
}

function enregistrerEcoles(ecoles) {
    localStorage.setItem(
        "schoolConnectEcoles",
        JSON.stringify(ecoles)
    );
}

function genererId() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 8)
    );
}

function afficherMessage(message, type = "info") {
    const ancienne = document.getElementById("ecole-message");

    if (ancienne) {
        ancienne.remove();
    }

    const div = document.createElement("div");

    div.id = "ecole-message";
    div.textContent = message;

    div.style.padding = "12px";
    div.style.margin = "12px 0";
    div.style.borderRadius = "10px";
    div.style.fontWeight = "600";

    if (type === "success") {
        div.style.background = "#dcfce7";
        div.style.color = "#166534";
    } else if (type === "error") {
        div.style.background = "#fee2e2";
        div.style.color = "#991b1b";
    } else {
        div.style.background = "#e0f2fe";
        div.style.color = "#075985";
    }

    document.body.prepend(div);

    setTimeout(() => {
        div.remove();
    }, 5000);
}

/* =========================
   INSCRIPTION ÉCOLE
========================= */

function inscrireEcole(donnees) {

    if (!donnees) {
        afficherMessage(
            "Veuillez remplir les informations de l'école.",
            "error"
        );
        return false;
    }

    const nomEcole = String(donnees.nomEcole || "").trim();
    const responsable = String(donnees.responsable || "").trim();
    const telephone = String(donnees.telephone || "").trim();
    const email = String(donnees.email || "").trim();
    const ville = String(donnees.ville || "").trim();
    const motDePasse = String(donnees.motDePasse || "");

    if (!nomEcole) {
        afficherMessage(
            "Le nom de l'école est obligatoire.",
            "error"
        );
        return false;
    }

    if (!responsable) {
        afficherMessage(
            "Le nom du responsable est obligatoire.",
            "error"
        );
        return false;
    }

    if (!telephone) {
        afficherMessage(
            "Le numéro de téléphone est obligatoire.",
            "error"
        );
        return false;
    }

    if (!motDePasse || motDePasse.length < 4) {
        afficherMessage(
            "Le mot de passe doit contenir au moins 4 caractères.",
            "error"
        );
        return false;
    }

    const ecoles = obtenirEcoles();

    const telephoneExiste = ecoles.some(
        ecole => ecole.telephone === telephone
    );

    if (telephoneExiste) {
        afficherMessage(
            "Une école utilise déjà ce numéro de téléphone.",
            "error"
        );
        return false;
    }

    const nouvelleEcole = {
        id: genererId(),
        nomEcole,
        responsable,
        telephone,
        email,
        ville,
        motDePasse,

        abonnement: {
            montant: ECOLE_CONFIG.abonnementMensuel,
            devise: ECOLE_CONFIG.devise,
            statut: "En attente",
            paiement: "Non payé",
            numeroOrangeMoney: ECOLE_CONFIG.numeroOrangeMoney,
            reference: ""
        },

        dateInscription: new Date().toISOString()
    };

    ecoles.push(nouvelleEcole);

    enregistrerEcoles(ecoles);

    afficherMessage(
        "Inscription de l'école enregistrée avec succès.",
        "success"
    );

    return true;
}

/* =========================
   CONNEXION ÉCOLE
========================= */

function connecterEcole(telephone, motDePasse) {

    telephone = String(telephone || "").trim();
    motDePasse = String(motDePasse || "");

    if (!telephone || !motDePasse) {
        afficherMessage(
            "Veuillez saisir votre téléphone et votre mot de passe.",
            "error"
        );
        return false;
    }

    const ecoles = obtenirEcoles();

    const ecole = ecoles.find(
        element =>
            element.telephone === telephone &&
            element.motDePasse === motDePasse
    );

    if (!ecole) {
        afficherMessage(
            "Numéro de téléphone ou mot de passe incorrect.",
            "error"
        );
        return false;
    }

    localStorage.setItem(
        "schoolConnectEcoleConnectee",
        JSON.stringify(ecole)
    );

    afficherMessage(
        "Connexion réussie. Bienvenue " + ecole.nomEcole + " !",
        "success"
    );

    return ecole;
}

/* =========================
   DÉCONNEXION
========================= */

function deconnecterEcole() {

    localStorage.removeItem(
        "schoolConnectEcoleConnectee"
    );

    afficherMessage(
        "Vous êtes déconnecté.",
        "success"
    );

    return true;
}

/* =========================
   ÉCOLE CONNECTÉE
========================= */

function obtenirEcoleConnectee() {

    try {
        return JSON.parse(
            localStorage.getItem(
                "schoolConnectEcoleConnectee"
            )
        );
    } catch (erreur) {
        return null;
    }
}

/* =========================
   ENVOYER RÉFÉRENCE PAIEMENT
========================= */

function envoyerReferencePaiement(reference) {

    const ecole = obtenirEcoleConnectee();

    if (!ecole) {
        afficherMessage(
            "Veuillez d'abord vous connecter.",
            "error"
        );
        return false;
    }

    reference = String(reference || "").trim();

    if (!reference) {
        afficherMessage(
            "Veuillez saisir la référence du paiement Orange Money.",
            "error"
        );
        return false;
    }

    const ecoles = obtenirEcoles();

    const index = ecoles.findIndex(
        element => element.id === ecole.id
    );

    if (index === -1) {
        afficherMessage(
            "École introuvable.",
            "error"
        );
        return false;
    }

    ecoles[index].abonnement.reference = reference;
    ecoles[index].abonnement.paiement = "Référence envoyée";
    ecoles[index].abonnement.statut = "En attente";

    enregistrerEcoles(ecoles);

    localStorage.setItem(
        "schoolConnectEcoleConnectee",
        JSON.stringify(ecoles[index])
    );

    afficherMessage(
        "Référence envoyée. L'administrateur doit maintenant vérifier le paiement.",
        "success"
    );

    return true;
}

/* =========================
   AFFICHER LES INFORMATIONS
========================= */

function afficherInformationsEcole() {

    const ecole = obtenirEcoleConnectee();

    if (!ecole) {
        return;
    }

    const nom = document.getElementById("nom-ecole-connectee");
    const responsable = document.getElementById("responsable-ecole");
    const telephone = document.getElementById("telephone-ecole");
    const ville = document.getElementById("ville-ecole");
    const statut = document.getElementById("statut-abonnement");
    const reference = document.getElementById("reference-paiement");

    if (nom) {
        nom.textContent = ecole.nomEcole;
    }

    if (responsable) {
        responsable.textContent = ecole.responsable;
    }

    if (telephone) {
        telephone.textContent = ecole.telephone;
    }

    if (ville) {
        ville.textContent = ecole.ville || "Non renseignée";
    }

    if (statut) {
        statut.textContent =
            ecole.abonnement.statut;
    }

    if (reference) {
        reference.value =
            ecole.abonnement.reference || "";
    }
}

/* =========================
   INFORMATIONS ABONNEMENT
========================= */

function obtenirInformationsAbonnement() {

    return {
        montant: ECOLE_CONFIG.abonnementMensuel,
        devise: ECOLE_CONFIG.devise,
        numeroOrangeMoney:
            ECOLE_CONFIG.numeroOrangeMoney,
        statut: "En attente"
    };
}

/* =========================
   INITIALISATION
========================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log(
        "School Connect — Espace école chargé."
    );

    console.log(
        "Abonnement école :",
        ECOLE_CONFIG.abonnementMensuel,
        ECOLE_CONFIG.devise
    );

    console.log(
        "Orange Money :",
        ECOLE_CONFIG.numeroOrangeMoney
    );

    afficherInformationsEcole();
});