"use strict";

console.log("📋 School Connect — Menu.js chargé.");

// Menu principal de School Connect
const Menu = {
    afficher: function () {
        console.log("");
        console.log("=================================");
        console.log("🏫 SCHOOL CONNECT");
        console.log("=================================");
        console.log("1️⃣ Écoles");
        console.log("2️⃣ Parents");
        console.log("3️⃣ Enseignants");
        console.log("4️⃣ Élèves");
        console.log("5️⃣ Paiements");
        console.log("6️⃣ Inscriptions");
        console.log("7️⃣ Accueil");
        console.log("=================================");
    },

    ouvrir: function (choix) {
        switch (choix) {
            case 1:
                console.log("🏫 Ouverture de l'espace Écoles...");
                break;

            case 2:
                console.log("👨‍👩‍👧 Ouverture de l'espace Parents...");
                break;

            case 3:
                console.log("👩‍🏫 Ouverture de l'espace Enseignants...");
                break;

            case 4:
                console.log("🎓 Ouverture de l'espace Élèves...");
                break;

            case 5:
                console.log("💰 Ouverture de l'espace Paiements...");
                break;

            case 6:
                console.log("📝 Ouverture de l'espace Inscriptions...");
                break;

            case 7:
                console.log("🏠 Retour à l'Accueil...");
                break;

            default:
                console.log("⚠️ Choix invalide.");
        }
    }
};

// Affichage automatique du menu
Menu.afficher();

console.log("✅ School Connect — Menu.js prêt.");

if (typeof module !== "undefined" && module.exports) {
    module.exports = Menu;
}