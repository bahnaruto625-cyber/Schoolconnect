"use strict";

/* =====================================================
   SCHOOL CONNECT — PARENT.JS
   Abonnement parent : 25 000 GNF / mois
   Orange Money : 614 877 827
   ===================================================== */

const PARENT_CONFIG = {
    nomApplication: "School Connect",
    devise: "GNF",
    abonnementMensuel: 25000,
    numeroOrangeMoney: "614 877 827"
};

/* =========================
   RÉCUPÉRER LES PARENTS
========================= */

function obtenirParents() {
    try {
        return JSON.parse(
            localStorage.getItem("schoolConnectParents")
        ) || [];
    } catch (erreur) {
        console.error("Erreur lecture parents :", erreur);
        return [];
    }
}

/* =========================
   ENREGISTRER LES PARENTS
========================= */

function enregistrerParents(parents) {
    localStorage.setItem(
        "schoolConnectParents",
        JSON.stringify(parents)
    );
}

/* =========================
   GÉNÉRER UN ID
========================= */

function genererIdParent() {
    return (
        Date.now().toString(36) +
        Math.random().toString(36).substring(2, 8)
    );
}

/* =========================
   MESSAGE
========================= */

function afficherMessageParent(message, type = "info") {

    const ancien = document.getElementById(
        "parent-message"
    );

    if (ancien) {
        ancien.remove();
    }

    const messageDiv = document.createElement("div");

    messageDiv.id = "parent-message";
    messageDiv.textContent = message;

    messageDiv.style.padding = "12px";
    messageDiv.style.margin = "12px 0";
    messageDiv.style.borderRadius = "10px";
    messageDiv.style.fontWeight = "600";

    if (type === "success") {
        messageDiv.style.background = "#dcfce7";
        messageDiv.style.color = "#166534";
    } else if (type === "error") {
        messageDiv.style.background = "#fee2e2";
        messageDiv.style.color = "#991b1b";
    } else {
        messageDiv.style.background = "#e0f2fe";
        messageDiv.style.color = "#075985";
    }

    document.body.prepend(messageDiv);

    setTimeout(function () {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

/* =========================
   INSCRIPTION PARENT
========================= */

function inscrireParent(donnees) {

    if (!donnees) {
        afficherMessageParent(
            "Veuillez remplir les informations.",
            "error"
        );
        return false;
    }

    const nom = String(
        donnees.nom || ""
    ).trim();

    const prenom = String(
        donnees.prenom || ""
    ).trim();

    const telephone = String(
        donnees.telephone || ""
    ).trim();

    const email = String(
        donnees.email || ""
    ).trim();

    const motDePasse = String(
        donnees.motDePasse || ""
    );

    if (!nom || !prenom) {
        afficherMessageParent(
            "Veuillez saisir le nom et le prénom.",
            "error"
        );
        return false;
    }

    if (!telephone) {
        afficherMessageParent(
            "Le numéro de téléphone est obligatoire.",
            "error"
        );
        return false;
    }

    if (!motDePasse || motDePasse.length < 4) {
        afficherMessageParent(
            "Le mot de passe doit contenir au moins 4 caractères.",
            "error"
        );
        return false;
    }

    const parents = obtenirParents();

    const existe = parents.some(
        parent => parent.telephone === telephone
    );

    if (existe) {
        afficherMessageParent(
            "Ce numéro de téléphone est déjà inscrit.",
            "error"
        );
        return false;
    }

    const nouveauParent = {

        id: genererIdParent(),

        nom: nom,

        prenom: prenom,

        telephone: telephone,

        email: email,

        motDePasse: motDePasse,

        abonnement: {

            montant:
                PARENT_CONFIG.abonnementMensuel,

            devise:
                PARENT_CONFIG.devise,

            statut: "En attente",

            paiement: "Non payé",

            numeroOrangeMoney:
                PARENT_CONFIG.numeroOrangeMoney,

            reference: ""
        },

        dateInscription:
            new Date().toISOString()
    };

    parents.push(nouveauParent);

    enregistrerParents(parents);

    afficherMessageParent(
        "Inscription parent enregistrée avec succès.",
        "success"
    );

    return true;
}

/* =========================
   CONNEXION PARENT
========================= */

function connecterParent(
    telephone,
    motDePasse
) {

    telephone = String(
        telephone || ""
    ).trim();

    motDePasse = String(
        motDePasse || ""
    );

    if (!telephone || !motDePasse) {

        afficherMessageParent(
            "Veuillez saisir votre téléphone et votre mot de passe.",
            "error"
        );

        return false;
    }

    const parents = obtenirParents();

    const parent = parents.find(
        element =>
            element.telephone === telephone &&
            element.motDePasse === motDePasse
    );

    if (!parent) {

        afficherMessageParent(
            "Numéro de téléphone ou mot de passe incorrect.",
            "error"
        );

        return false;
    }

    localStorage.setItem(
        "schoolConnectParentConnecte",
        JSON.stringify(parent)
    );

    afficherMessageParent(
        "Connexion réussie. Bienvenue " +
        parent.prenom +
        " !",
        "success"
    );

    return parent;
}

/* =========================
   PARENT CONNECTÉ
========================= */

function obtenirParentConnecte() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "schoolConnectParentConnecte"
            )
        );

    } catch (erreur) {

        return null;
    }
}

/* =========================
   DÉCONNEXION
========================= */

function deconnecterParent() {

    localStorage.removeItem(
        "schoolConnectParentConnecte"
    );

    afficherMessageParent(
        "Vous êtes déconnecté.",
        "success"
    );

    return true;
}

/* =========================
   PAIEMENT
========================= */

function envoyerReferencePaiementParent(
    reference
) {

    const parent = obtenirParentConnecte();

    if (!parent) {

        afficherMessageParent(
            "Veuillez d'abord vous connecter.",
            "error"
        );

        return false;
    }

    reference = String(
        reference || ""
    ).trim();

    if (!reference) {

        afficherMessageParent(
            "Veuillez saisir la référence du paiement Orange Money.",
            "error"
        );

        return false;
    }

    const parents = obtenirParents();

    const index = parents.findIndex(
        element =>
            element.id === parent.id
    );

    if (index === -1) {

        afficherMessageParent(
            "Parent introuvable.",
            "error"
        );

        return false;
    }

    parents[index].abonnement.reference =
        reference;

    parents[index].abonnement.paiement =
        "Référence envoyée";

    parents[index].abonnement.statut =
        "En attente";

    enregistrerParents(parents);

    localStorage.setItem(
        "schoolConnectParentConnecte",
        JSON.stringify(parents[index])
    );

    afficherMessageParent(
        "Référence envoyée. L'administrateur doit vérifier le paiement.",
        "success"
    );

    return true;
}

/* =========================
   INFORMATIONS ABONNEMENT
========================= */

function obtenirInformationsAbonnementParent() {

    return {

        montant:
            PARENT_CONFIG.abonnementMensuel,

        devise:
            PARENT_CONFIG.devise,

        numeroOrangeMoney:
            PARENT_CONFIG.numeroOrangeMoney,

        statut:
            "En attente"
    };
}

/* =========================
   INITIALISATION
========================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "School Connect — Espace parent chargé."
        );

        console.log(
            "Abonnement parent :",
            PARENT_CONFIG.abonnementMensuel,
            PARENT_CONFIG.devise
        );

        console.log(
            "Orange Money :",
            PARENT_CONFIG.numeroOrangeMoney
        );
    }
);