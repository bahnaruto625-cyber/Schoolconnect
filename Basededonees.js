// 🗄️ School Connect — BaseDeDonnees.js

console.log("🗄️ School Connect — BaseDeDonnees.js chargé.");

// Base de données principale
const BaseDeDonnees = {
    ecoles: [],
    parents: [],
    enseignants: [],
    eleves: [],
    paiements: [],
    notifications: [],
    rapports: []
};

// Ajouter une donnée
function ajouterDonnee(type, objet) {
    if (BaseDeDonnees[type]) {
        BaseDeDonnees[type].push(objet);
        console.log("✅ Donnée ajoutée dans :", type);
        return true;
    }

    console.log("❌ Type inconnu :", type);
    return false;
}

// Lire les données
function lireDonnees(type) {
    if (BaseDeDonnees[type]) {
        return BaseDeDonnees[type];
    }

    return [];
}

// Supprimer une donnée
function supprimerDonnee(type, index) {
    if (BaseDeDonnees[type] && BaseDeDonnees[type][index]) {
        BaseDeDonnees[type].splice(index, 1);
        console.log("🗑️ Donnée supprimée.");
        return true;
    }

    return false;
}

// Sauvegarde locale
function sauvegarderBase() {
    localStorage.setItem(
        "SchoolConnectDB",
        JSON.stringify(BaseDeDonnees)
    );

    console.log("💾 Base de données sauvegardée.");
}

// Chargement local
function chargerBase() {
    const donnees = localStorage.getItem("SchoolConnectDB");

    if (donnees) {
        Object.assign(BaseDeDonnees, JSON.parse(donnees));
        console.log("📂 Base de données chargée.");
    }
}


// Initialisation
chargerBase();

console.log("📊 Base de données disponible :", BaseDeDonnees);

console.log("✅ School Connect — BaseDeDonnees.js prêt.");