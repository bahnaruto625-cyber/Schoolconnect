// 🗓️ School Connect - EmploiDuTemps.js

console.log("🗓️ School Connect — EmploiDuTemps.js chargé.");


const EmploiDuTemps = {

    cours: [],


    ajouterCours: function(classe, matiere, enseignant, jour, heure) {

        const cours = {
            id: Date.now(),
            classe: classe,
            matiere: matiere,
            enseignant: enseignant,
            jour: jour,
            heure: heure
        };

        this.cours.push(cours);

        console.log("✅ Cours ajouté :", cours);

        return cours;
    },


    rechercherParClasse: function(classe) {

        return this.cours.filter(
            c => c.classe === classe
        );

    },


    afficher: function() {

        console.log("🗓️ Emploi du temps disponible :", this.cours);

        return this.cours;

    }

};


console.log("🗓️ Emploi du temps disponible :");
console.log(EmploiDuTemps);


console.log("✅ School Connect — EmploiDuTemps.js prêt.");