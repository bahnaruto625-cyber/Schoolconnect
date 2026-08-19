"use strict";

/*
 * =========================================================
 * SCHOOL CONNECT
 * Donnees.js
 * Gestion centralisée des données locales
 * =========================================================
 */

(function () {

    console.log("🗄️ School Connect — Donnees.js chargé.");

    /*
     * -------------------------------------------------------
     * Clés utilisées par School Connect
     * -------------------------------------------------------
     */

    var CLES = {
        ECOLES: "ecoles",
        PARENTS: "parents",
        ENSEIGNANTS: "enseignants",
        ELEVES: "eleves",
        PAIEMENTS: "paiements",
        INSCRIPTIONS: "inscriptions"
    };

    /*
     * -------------------------------------------------------
     * Lire une liste
     * -------------------------------------------------------
     */

    function lire(cle) {

        try {

            var donnees = localStorage.getItem(cle);

            if (!donnees) {
                return [];
            }

            var resultat = JSON.parse(donnees);

            if (Array.isArray(resultat)) {
                return resultat;
            }

            return [];

        } catch (erreur) {

            console.error(
                "❌ Erreur de lecture : " + cle,
                erreur
            );

            return [];
        }
    }

    /*
     * -------------------------------------------------------
     * Enregistrer une liste
     * -------------------------------------------------------
     */

    function enregistrer(cle, donnees) {

        try {

            localStorage.setItem(
                cle,
                JSON.stringify(donnees)
            );

            return true;

        } catch (erreur) {

            console.error(
                "❌ Erreur d'enregistrement : " + cle,
                erreur
            );

            return false;
        }
    }

    /*
     * -------------------------------------------------------
     * Ajouter une donnée
     * -------------------------------------------------------
     */

    function ajouter(cle, element) {

        var liste = lire(cle);

        liste.push(element);

        return enregistrer(cle, liste);
    }

    /*
     * -------------------------------------------------------
     * Supprimer toutes les données d'une catégorie
     * -------------------------------------------------------
     */

    function vider(cle) {

        try {

            localStorage.removeItem(cle);

            return true;

        } catch (erreur) {

            console.error(
                "❌ Erreur de suppression : " + cle,
                erreur
            );

            return false;
        }
    }

    /*
     * -------------------------------------------------------
     * Compter les éléments
     * -------------------------------------------------------
     */

    function compter(cle) {
        return lire(cle).length;
    }

    /*
     * -------------------------------------------------------
     * API globale School Connect
     * -------------------------------------------------------
     */

    window.SchoolConnectData = {

        cles: CLES,

        lire: lire,

        enregistrer: enregistrer,

        ajouter: ajouter,

        vider: vider,

        compter: compter
    };

    /*
     * -------------------------------------------------------
     * Vérification
     * -------------------------------------------------------
     */

    console.log("🗄️ Données School Connect initialisées.");
    console.log("🏫 Écoles :", compter(CLES.ECOLES));
    console.log("👨‍👩‍👧 Parents :", compter(CLES.PARENTS));
    console.log("👩‍🏫 Enseignants :", compter(CLES.ENSEIGNANTS));
    console.log("🎓 Élèves :", compter(CLES.ELEVES));
    console.log("💰 Paiements :", compter(CLES.PAIEMENTS));

    console.log("✅ School Connect — Donnees.js prêt.");

})();