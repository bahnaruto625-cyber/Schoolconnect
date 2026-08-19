// 📝 School Connect - Examens.js

console.log("📝 School Connect — Examens.js chargé.");


const Examens = {

    examens: [],


    ajouterExamen: function(classe, matiere, enseignant, date, coefficient) {

        const examen = {
            id: Date.now(),
            classe: classe,
            matiere: matiere,
            enseignant: enseignant,
            date: date,
            coefficient: coefficient
        };

        this.examens.push(examen);

        console.log("✅ Examen ajouté :", examen);

        return examen;
    },


    rechercherParClasse: function(classe) {

        return this.examens.filter(
            e => e.classe === classe
        );

    },


    afficher: function() {

        console.log("📝 Examens disponibles :", this.examens);

        return this.examens;

    }

};


console.log("📝 Examens disponibles :");
console.log(Examens);


console.log("✅ School Connect — Examens.js prêt.");