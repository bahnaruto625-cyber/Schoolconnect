// =====================================================
// 📄 SCHOOL CONNECT — RAPPORT
// =====================================================

console.log("📄 School Connect — Rapport.js chargé.");


// Générer un rapport général
function genererRapport() {

    const rapport = {

        date: new Date().toLocaleString(),

        ecoles: typeof ecoles !== "undefined" ? ecoles.length : 0,

        parents: typeof parents !== "undefined" ? parents.length : 0,

        enseignants: typeof enseignants !== "undefined" ? enseignants.length : 0,

        eleves: typeof eleves !== "undefined" ? eleves.length : 0,

        paiements: typeof paiements !== "undefined" ? paiements.length : 0,

        inscriptions: typeof inscriptions !== "undefined" ? inscriptions.length : 0

    };


    console.log("📄 RAPPORT SCHOOL CONNECT");
    console.log("=========================");
    console.log("📅 Date :", rapport.date);
    console.log("🏫 Écoles :", rapport.ecoles);
    console.log("👨‍👩‍👧 Parents :", rapport.parents);
    console.log("👨‍🏫 Enseignants :", rapport.enseignants);
    console.log("🎓 Élèves :", rapport.eleves);
    console.log("💰 Paiements :", rapport.paiements);
    console.log("📝 Inscriptions :", rapport.inscriptions);


    return rapport;
}


// Afficher le rapport
function afficherRapport() {

    const rapport = genererRapport();

    console.log("✅ Rapport affiché avec succès.");

    return rapport;
}


// Exporter le rapport
function exporterRapport() {

    const rapport = genererRapport();

    console.log("📤 Rapport prêt pour exportation.");

    return JSON.stringify(rapport, null, 2);
}


console.log("📄 Rapport disponible.");

console.log("✅ School Connect — Rapport.js prêt.");