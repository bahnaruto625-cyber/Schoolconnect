// 📝 School Connect — Notes.js

console.log("📝 School Connect — Notes.js chargé.");


// Gestion des notes
const Notes = {
    liste: []
};


// Ajouter une note
function ajouterNote(eleve, matiere, note, coefficient = 1) {

    const nouvelleNote = {
        id: Date.now(),
        eleve: eleve,
        matiere: matiere,
        note: note,
        coefficient: coefficient,
        date: new Date().toISOString()
    };

    Notes.liste.push(nouvelleNote);

    console.log("✅ Note ajoutée :", nouvelleNote);

    return nouvelleNote;
}


// Calculer la moyenne d'un élève
function calculerMoyenne(eleve) {

    const notesEleve = Notes.liste.filter(
        n => n.eleve === eleve
    );

    if (notesEleve.length === 0) {
        return 0;
    }

    let total = 0;
    let totalCoefficient = 0;

    notesEleve.forEach(n => {
        total += n.note * n.coefficient;
        totalCoefficient += n.coefficient;
    });

    const moyenne = total / totalCoefficient;

    console.log("📊 Moyenne de", eleve, ":", moyenne);

    return moyenne;
}


// Afficher les notes
function afficherNotes() {

    console.log("📝 Notes disponibles :", Notes.liste);

    return Notes.liste;
}


// Rechercher les notes d'un élève
function rechercherNotesEleve(eleve) {

    return Notes.liste.filter(
        n => n.eleve === eleve
    );
}


// Supprimer une note
function supprimerNote(id) {

    const index = Notes.liste.findIndex(
        n => n.id === id
    );

    if (index !== -1) {
        Notes.liste.splice(index, 1);
        console.log("🗑️ Note supprimée.");
        return true;
    }

    console.log("❌ Note introuvable.");
    return false;
}


console.log("📒 Notes disponibles :", Notes);

console.log("✅ School Connect — Notes.js prêt.");