"use strict";

console.log("🔐 School Connect — Authentification.js chargé.");

const Authentification = {

    utilisateur: null,

    connecter: function (nom, role) {
        if (!nom || !role) {
            console.log("⚠️ Nom et rôle obligatoires.");
            return false;
        }

        this.utilisateur = {
            nom: String(nom),
            role: String(role),
            connecte: true,
            dateConnexion: new Date().toISOString()
        };

        console.log("✅ Connexion réussie.");
        console.log("👤 Utilisateur :", this.utilisateur.nom);
        console.log("🎭 Rôle :", this.utilisateur.role);

        return true;
    },

    deconnecter: function () {
        if (!this.utilisateur) {
            console.log("ℹ️ Aucun utilisateur connecté.");
            return false;
        }

        console.log("👋 Déconnexion de :", this.utilisateur.nom);

        this.utilisateur = null;

        console.log("✅ Utilisateur déconnecté.");

        return true;
    },

    estConnecte: function () {
        return this.utilisateur !== null;
    },

    obtenirUtilisateur: function () {
        return this.utilisateur;
    },

    verifierRole: function (role) {
        if (!this.utilisateur) {
            console.log("⚠️ Aucun utilisateur connecté.");
            return false;
        }

        return this.utilisateur.role === role;
    }
};

console.log("✅ School Connect — Authentification.js prêt.");

if (typeof module !== "undefined" && module.exports) {
    module.exports = Authentification;
}