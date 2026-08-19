// 📅 School Connect - Presence.js

console.log("📅 School Connect — Presence.js chargé.");


const Presence = {

    presences: [],

    ajouterPresence: function(eleve, date, statut) {

        const presence = {
            id: Date.now(),
            eleve: eleve,
            date: date,
            statut: statut
        };

        this.presences.push(presence);

        console.log("✅ Présence ajoutée :", presence);

        return presence;
    },


    rechercherParEleve: function(nom) {

        return this.presences.filter(
            p => p.eleve === nom
        );

    },


    afficher: function() {

        console.log("📅 Présences disponibles :", this.presences);

        return this.presences;

    }

};


console.log("📅 Présences disponibles :");
console.log(Presence);


console.log("✅ School Connect — Presence.js prêt.");