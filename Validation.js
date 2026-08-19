"use strict";

console.log("🛡️ School Connect — Validation.js chargé.");

const Validation = {

    texte: function (valeur, nom = "Champ") {
        if (valeur === undefined || valeur === null) {
            console.log("❌ " + nom + " est obligatoire.");
            return false;
        }

        if (String(valeur).trim() === "") {
            console.log("❌ " + nom + " ne peut pas être vide.");
            return false;
        }

        return true;
    },

    email: function (email) {
        if (!this.texte(email, "Email")) {
            return false;
        }

        const modele = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!modele.test(String(email).trim())) {
            console.log("❌ Adresse email invalide.");
            return false;
        }

        return true;
    },

    telephone: function (telephone) {
        if (!this.texte(telephone, "Téléphone")) {
            return false;
        }

        const propre = String(telephone).replace(/[\s-]/g, "");

        if (!/^\+?[0-9]{8,15}$/.test(propre)) {
            console.log("❌ Numéro de téléphone invalide.");
            return false;
        }

        return true;
    },

    role: function (role) {
        if (typeof Roles !== "undefined" && Roles.existe(role)) {
            return true;
        }

        console.log("❌ Rôle invalide.");
        return false;
    },

    obligatoire: function (objet, champs) {
        if (!objet || typeof objet !== "object") {
            console.log("❌ Données invalides.");
            return false;
        }

        for (let i = 0; i < champs.length; i++) {
            const champ = champs[i];

            if (!this.texte(objet[champ], champ)) {
                return false;
            }
        }

        return true;
    }
};

console.log("✅ School Connect — Validation.js prêt.");

if (typeof module !== "undefined" && module.exports) {
    module.exports = Validation;
}