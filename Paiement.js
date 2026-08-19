"use strict";

const paiement = {
    devise: "GNF",
    nomDevise: "franc guinéen",
    orangeMoney: "614 877 827",

    abonnementEcole: 250000,
    abonnementParent: 25000
};

console.log("School Connect - Paiement.js chargé.");
console.log("Devise : " + paiement.devise + " (" + paiement.nomDevise + ")");
console.log("Orange Money : " + paiement.orangeMoney);
console.log("Abonnement école : " + paiement.abonnementEcole + " GNF");
console.log("Abonnement parent : " + paiement.abonnementParent + " GNF");

function enregistrerPaiement(type, montant, reference) {
    const paiementEnregistre = {
        type: type,
        montant: montant,
        devise: "GNF",
        reference: reference,
        numeroOrangeMoney: "614 877 827",
        statut: "En attente",
        date: new Date().toISOString()
    };

    localStorage.setItem(
        "dernierPaiement",
        JSON.stringify(paiementEnregistre)
    );

    console.log("Paiement enregistré :", paiementEnregistre);

    return paiementEnregistre;
}

function verifierPaiement() {
    const donnees = localStorage.getItem("dernierPaiement");

    if (!donnees) {
        console.log("Aucun paiement à vérifier.");
        return null;
    }

    const paiementEnregistre = JSON.parse(donnees);

    paiementEnregistre.statut = "Vérifié";

    localStorage.setItem(
        "dernierPaiement",
        JSON.stringify(paiementEnregistre)
    );

    console.log("Paiement vérifié :", paiementEnregistre);

    return paiementEnregistre;
}

console.log("Paiement.js prêt.");