"use strict";

console.log("👥 School Connect — Roles.js chargé.");

const Roles = {

    ECOLE: "ecole",
    PARENT: "parent",
    ENSEIGNANT: "enseignant",
    ELEVE: "eleve",
    ADMIN: "admin",

    liste: function () {
        return [
            this.ECOLE,
            this.PARENT,
            this.ENSEIGNANT,
            this.ELEVE,
            this.ADMIN
        ];
    },

    existe: function (role) {
        return this.liste().includes(String(role).toLowerCase());
    },

    nom: function (role) {
        const noms = {
            ecole: "🏫 École",
            parent: "👨‍👩‍👧 Parent",
            enseignant: "👩‍🏫 Enseignant",
            eleve: "🎓 Élève",
            admin: "🛡️ Administrateur"
        };

        return noms[String(role).toLowerCase()] || "❓ Rôle inconnu";
    }
};

console.log("📋 Rôles disponibles :", Roles.liste());
console.log("✅ School Connect — Roles.js prêt.");

if (typeof module !== "undefined" && module.exports) {
    module.exports = Roles;
}