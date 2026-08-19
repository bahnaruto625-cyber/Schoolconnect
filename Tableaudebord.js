// =====================================================
// 📊 SCHOOL CONNECT — TABLEAU DE BORD
// =====================================================

console.log("📊 School Connect — TableauDeBord.js chargé.");

// Récupération des données globales
function chargerTableauDeBord() {

    const statistiques = {
        ecoles: typeof ecoles !== "undefined" ? ecoles.length : 0,
        parents: typeof parents !== "undefined" ? parents.length : 0,
        enseignants: typeof enseignants !== "undefined" ? enseignants.length : 0,
        eleves: typeof eleves !== "undefined" ? eleves.length : 0,
        paiements: typeof paiements !== "undefined" ? paiements.length : 0,
        inscriptions: typeof inscriptions !== "undefined" ? inscriptions.length : 0
    };

    console.log("📊 Tableau de bord School Connect");
    console.log("--------------------------------");
    console.log("🏫 Écoles :", statistiques.ecoles);
    console.log("👨‍👩‍👧 Parents :", statistiques.parents);
    console.log("👨‍🏫 Enseignants :", statistiques.enseignants);
    console.log("🎓 Élèves :", statistiques.eleves);
    console.log("💰 Paiements :", statistiques.paiements);
    console.log("📝 Inscriptions :", statistiques.inscriptions);

    return statistiques;
}


// Afficher un résumé
function afficherResume() {

    const data = chargerTableauDeBord();

    console.log("✅ Résumé généré avec succès.");

    return data;
}


// Actualisation du tableau de bord
function actualiserTableauDeBord() {

    console.log("🔄 Actualisation du tableau de bord...");

    return chargerTableauDeBord();
}


// Test au chargement
console.log("📊 TableauDeBord disponible.");

console.log("✅ School Connect — TableauDeBord.js prêt.");