// 🏫 School Connect — Classes.js

console.log("🏫 School Connect — Classes.js chargé.");


// Gestion des classes
const Classes = {
    liste: []
};


// Créer une classe
function creerClasse(nomClasse, niveau, ecole) {

    const nouvelleClasse = {
        id: Date.now(),
        nom: nomClasse,
        niveau: niveau,
        ecole: ecole,
        eleves: [],
        dateCreation: new Date().toISOString()
    };

    Classes.liste.push(nouvelleClasse);

    console.log("✅ Classe créée :", nouvelleClasse);

    return nouvelleClasse;
}


// Ajouter un élève dans une classe
function ajouterEleveClasse(idClasse, eleve) {

    const classe = Classes.liste.find(
        c => c.id === idClasse
    );

    if (classe) {
        classe.eleves.push(eleve);
        console.log("👨‍🎓 Élève ajouté à la classe.");
        return true;
    }

    console.log("❌ Classe introuvable.");
    return false;
}


// Rechercher une classe
function rechercherClasse(nom) {

    return Classes.liste.filter(
        c => c.nom === nom
    );
}


// Afficher toutes les classes
function afficherClasses() {

    console.log("📚 Classes disponibles :", Classes.liste);

    return Classes.liste;
}


// Supprimer une classe
function supprimerClasse(id) {

    const index = Classes.liste.findIndex(
        c => c.id === id
    );

    if (index !== -1) {
        Classes.liste.splice(index, 1);
        console.log("🗑️ Classe supprimée.");
        return true;
    }

    return false;
}


console.log("📚 Classes disponibles :", Classes);

console.log("✅ School Connect — Classes.js prêt.");