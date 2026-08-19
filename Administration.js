// Administration.js
// Fonctions administratives

const Administration = {

    obtenirUtilisateurs: function() {
        return JSON.parse(
            localStorage.getItem("school_connect_utilisateurs") || "[]"
        );
    },

    statistiques: function() {
        const utilisateurs = this.obtenirUtilisateurs();

        return {
            total: utilisateurs.length,
            administrateurs: utilisateurs.filter(
                u => u.role === "administrateur"
            ).length,
            enseignants: utilisateurs.filter(
                u => u.role === "enseignant"
            ).length,
            parents: utilisateurs.filter(
                u => u.role === "parent"
            ).length,
            eleves: utilisateurs.filter(
                u => u.role === "eleve"
            ).length
        };
    },

    supprimerUtilisateur: function(id) {
        let utilisateurs = this.obtenirUtilisateurs();

        utilisateurs = utilisateurs.filter(u => u.id !== id);

        localStorage.setItem(
            "school_connect_utilisateurs",
            JSON.stringify(utilisateurs)
        );

        return true;
    }
};

window.Administration = Administration;