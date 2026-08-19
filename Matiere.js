// 📚 School Connect — Matieres.js

console.log("📚 School Connect — Matieres.js chargé.");


// Gestion des matières
const Matieres = {
    liste: []
};


// Créer une matière
function creerMatiere(nom, coefficient, classe) {

    const matiere = {
        id: Date.now(),
        nom: nom,
        coefficient: coefficient,
        classe: classe,
        dateCreation: new Date().toISOString()
    };

    Matieres.liste.push(matiere);

    console.log("✅ Matière créée :", matiere);

    return matiere;
}


// Rechercher une matière
function rechercherMatiere(nom) {

    return Matieres.liste.filter(
        m => m.nom === nom
    );
}


// Afficher toutes les matières
function afficherMatieres() {

    console.log("📖 Matières disponibles :", Matieres.liste);

    return Matieres.liste;
}


// Supprimer une matière
function supprimerMatiere(id) {

    const index = Matieres.liste.findIndex(
        m => m.id === id
    );

    if (index !== -1) {
        Matieres.liste.splice(index, 1);
        console.log("🗑️ Matière supprimée.");
        return true;
    }

    console.log("❌ Matière introuvable.");
    return false;
}


// Ajouter une matière à une classe
function associerMatiereClasse(idMatiere, nomClasse) {

    const matiere = Matieres.liste.find(
        m => m.id === idMatiere
    );

    if (matiere) {
        matiere.classe = nomClasse;
        console.log("🔗 Matière associée à la classe :", nomClasse);
        return true;
    }

    return false;
}


console.log("📚 Matières disponibles :", Matieres);

console.log("✅ School Connect — Matieres.js prêt.");