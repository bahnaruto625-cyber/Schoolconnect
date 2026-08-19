// 👥 School Connect — Utilisateurs.js

console.log("👥 School Connect — Utilisateurs.js chargé.");

// Gestion des utilisateurs
const Utilisateurs = {
    comptes: []
};


// Créer un utilisateur
function creerUtilisateur(type, nom, email, motDePasse) {

    const utilisateur = {
        id: Date.now(),
        type: type,
        nom: nom,
        email: email,
        motDePasse: motDePasse,
        dateCreation: new Date().toISOString()
    };

    Utilisateurs.comptes.push(utilisateur);

    console.log("✅ Utilisateur créé :", utilisateur);
    return utilisateur;
}


// Rechercher un utilisateur par email
function rechercherUtilisateur(email) {

    return Utilisateurs.comptes.find(
        utilisateur => utilisateur.email === email
    );
}


// Connexion utilisateur
function connecterUtilisateur(email, motDePasse) {

    const utilisateur = Utilisateurs.comptes.find(
        u => u.email === email && u.motDePasse === motDePasse
    );

    if (utilisateur) {
        console.log("🔓 Connexion réussie :", utilisateur.nom);
        return utilisateur;
    }

    console.log("❌ Connexion refusée.");
    return null;
}


// Supprimer un utilisateur
function supprimerUtilisateur(id) {

    const index = Utilisateurs.comptes.findIndex(
        u => u.id === id
    );

    if (index !== -1) {
        Utilisateurs.comptes.splice(index, 1);
        console.log("🗑️ Utilisateur supprimé.");
        return true;
    }

    return false;
}


// Afficher tous les utilisateurs
function afficherUtilisateurs() {

    console.log("👥 Liste des utilisateurs :", Utilisateurs.comptes);
    return Utilisateurs.comptes;
}


console.log("👥 Utilisateurs disponibles :", Utilisateurs);

console.log("✅ School Connect — Utilisateurs.js prêt.");