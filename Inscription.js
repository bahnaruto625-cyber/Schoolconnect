"use strict";

/* =====================================================
   SCHOOL CONNECT — INSCRIPTION.JS
   Gestion des inscriptions
   Devise : GNF (franc guinéen)
   ===================================================== */

const INSCRIPTION_CONFIG = {
    devise: "GNF",
    nomDevise: "franc guinéen",
    orangeMoney: "614 877 827",

    abonnementEcole: 250000,
    abonnementParent: 25000
};


/* =====================================================
   AFFICHAGE
   ===================================================== */

function afficherInfosInscription() {

    console.log("📝 School Connect - Inscription.js chargé.");
    console.log(
        "💰 Devise : " +
        INSCRIPTION_CONFIG.devise +
        " (" +
        INSCRIPTION_CONFIG.nomDevise +
        ")"
    );

    console.log(
        "📱 Orange Money : " +
        INSCRIPTION_CONFIG.orangeMoney
    );

    console.log(
        "🏫 Abonnement école : " +
        INSCRIPTION_CONFIG.abonnementEcole +
        " GNF"
    );

    console.log(
        "👨‍👩‍👧 Abonnement parent : " +
        INSCRIPTION_CONFIG.abonnementParent +
        " GNF"
    );
}


/* =====================================================
   ENREGISTREMENT D'UNE INSCRIPTION
   ===================================================== */

function enregistrerInscription(type, donnees) {

    const inscriptions =
        JSON.parse(
            localStorage.getItem("schoolConnectInscriptions") || "[]"
        );

    const nouvelleInscription = {
        id: "INS-" + Date.now(),

        type: type,

        donnees: donnees,

        statut: "En attente",

        date: new Date().toISOString()
    };

    inscriptions.push(nouvelleInscription);

    localStorage.setItem(
        "schoolConnectInscriptions",
        JSON.stringify(inscriptions)
    );

    console.log(
        "✅ Inscription enregistrée :",
        nouvelleInscription
    );

    return nouvelleInscription;
}


/* =====================================================
   RÉCUPÉRER LES INSCRIPTIONS
   ===================================================== */

function recupererInscriptions() {

    const inscriptions =
        JSON.parse(
            localStorage.getItem("schoolConnectInscriptions") || "[]"
        );

    console.log(
        "📋 Nombre d'inscriptions :",
        inscriptions.length
    );

    return inscriptions;
}


/* =====================================================
   VALIDATION
   ===================================================== */

function validerInscription(donnees) {

    if (!donnees || typeof donnees !== "object") {
        console.warn("⚠️ Données d'inscription invalides.");
        return false;
    }

    console.log("✅ Données d'inscription valides.");

    return true;
}


/* =====================================================
   INITIALISATION
   ===================================================== */

function initialiserInscription() {

    afficherInfosInscription();

    console.log(
        "📝 Inscription.js prêt."
    );
}


/* =====================================================
   LANCEMENT
   ===================================================== */

if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        initialiserInscription
    );

} else {

    initialiserInscription();
}