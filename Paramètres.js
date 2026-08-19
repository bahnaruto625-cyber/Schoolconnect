// =====================================================
// ⚙️ SCHOOL CONNECT — PARAMETRES
// =====================================================

console.log("⚙️ School Connect — Parametres.js chargé.");


// Paramètres de l'application
const parametres = {

    application: "School Connect",

    version: "1.0.0",

    devise: "GNF (franc guinéen)",

    langue: "Français",

    notifications: true,

    maintenance: false,

    dateCreation: new Date().toISOString()

};


// Afficher les paramètres
function afficherParametres() {

    console.log("⚙️ PARAMÈTRES SCHOOL CONNECT");
    console.log("===========================");
    console.log(parametres);

    return parametres;
}


// Modifier un paramètre
function modifierParametre(cle, valeur) {

    if (!parametres.hasOwnProperty(cle)) {
        console.log("❌ Paramètre inexistant :", cle);
        return false;
    }

    parametres[cle] = valeur;

    console.log("✅ Paramètre modifié :", cle, "=", valeur);

    return true;
}


// Réinitialiser les paramètres
function reinitialiserParametres() {

    parametres.notifications = true;
    parametres.maintenance = false;

    console.log("🔄 Paramètres réinitialisés.");

    return parametres;
}


// Test au chargement
console.log("⚙️ Paramètres disponibles.");

console.log("✅ School Connect — Parametres.js prêt.");