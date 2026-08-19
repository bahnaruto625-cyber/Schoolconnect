// 📝 School Connect - Devoirs.js

console.log("📝 School Connect — Devoirs.js chargé.");


const Devoirs = {

    devoirs: [],


    ajouterDevoir: function(classe, matiere, enseignant, titre, dateLimite) {

        const devoir = {
            id: Date.now(),
            classe: classe,
            matiere: matiere,
            enseignant: enseignant,
            titre: titre,
            dateLimite: dateLimite
        };

        this.devoirs.push(devoir);

        console.log("✅ Devoir ajouté :", devoir);

        return devoir;
    },


    rechercherParClasse: function(classe) {

        return this.devoirs.filter(
            d => d.classe === classe
        );

    },


    afficher: function() {

        console.log("📝 Devoirs disponibles :", this.devoirs);

        return this.devoirs;

    }

};


console.log("📝 Devoirs disponibles :");
console.log(Devoirs);


console.log("✅ School Connect — Devoirs.js prêt.");