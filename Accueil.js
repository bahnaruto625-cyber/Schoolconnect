"use strict";

/*
 * =========================================================
 * SCHOOL CONNECT
 * Accueil.js
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🏠 School Connect — Accueil chargé.");

    /*
     * -------------------------------------------------------
     * Fonction de navigation
     * -------------------------------------------------------
     */
    function allerVers(page) {
        window.location.href = page;
    }

    /*
     * -------------------------------------------------------
     * Bouton Écoles
     * -------------------------------------------------------
     */
    var ecoles = document.getElementById("btnEcoles");

    if (ecoles) {
        ecoles.addEventListener("click", function () {
            allerVers("Ecole.html");
        });
    }

    /*
     * -------------------------------------------------------
     * Bouton Parents
     * -------------------------------------------------------
     */
    var parents = document.getElementById("btnParents");

    if (parents) {
        parents.addEventListener("click", function () {
            allerVers("Parents.html");
        });
    }

    /*
     * -------------------------------------------------------
     * Bouton Enseignants
     * -------------------------------------------------------
     */
    var enseignants = document.getElementById("btnEnseignants");

    if (enseignants) {
        enseignants.addEventListener("click", function () {
            allerVers("Enseignant.html");
        });
    }

    /*
     * -------------------------------------------------------
     * Bouton Élèves
     * -------------------------------------------------------
     */
    var eleves = document.getElementById("btnEleves");

    if (eleves) {
        eleves.addEventListener("click", function () {
            allerVers("Eleve.html");
        });
    }

    /*
     * -------------------------------------------------------
     * Bouton Paiements
     * -------------------------------------------------------
     */
    var paiements = document.getElementById("btnPaiements");

    if (paiements) {
        paiements.addEventListener("click", function () {
            allerVers("Paiement.html");
        });
    }

    /*
     * -------------------------------------------------------
     * Bouton Connexion
     * -------------------------------------------------------
     */
    var connexion = document.getElementById("btnConnexion");

    if (connexion) {
        connexion.addEventListener("click", function () {
            allerVers("Connexion.html");
        });
    }

    /*
     * -------------------------------------------------------
     * Année automatique
     * -------------------------------------------------------
     */
    var annee = document.getElementById("annee");

    if (annee) {
        annee.textContent = new Date().getFullYear();
    }

    /*
     * -------------------------------------------------------
     * Compteur générique
     * -------------------------------------------------------
     */
    function compter(cle) {

        try {

            var donnees = localStorage.getItem(cle);

            if (!donnees) {
                return 0;
            }

            var liste = JSON.parse(donnees);

            if (Array.isArray(liste)) {
                return liste.length;
            }

            return 0;

        } catch (erreur) {

            console.error(
                "Erreur avec les données : " + cle,
                erreur
            );

            return 0;
        }
    }

    /*
     * -------------------------------------------------------
     * Affichage des compteurs
     * -------------------------------------------------------
     */

    var nombreEcoles = document.getElementById("nombreEcoles");

    if (nombreEcoles) {
        nombreEcoles.textContent = compter("ecoles");
    }

    var nombreParents = document.getElementById("nombreParents");

    if (nombreParents) {
        nombreParents.textContent = compter("parents");
    }

    var nombreEnseignants = document.getElementById("nombreEnseignants");

    if (nombreEnseignants) {
        nombreEnseignants.textContent = compter("enseignants");
    }

    var nombreEleves = document.getElementById("nombreEleves");

    if (nombreEleves) {
        nombreEleves.textContent = compter("eleves");
    }

    /*
     * -------------------------------------------------------
     * Message d'accueil
     * -------------------------------------------------------
     */

    var message = document.getElementById("messageBienvenue");

    if (message) {
        message.textContent = "Bienvenue dans School Connect";
    }

    /*
     * -------------------------------------------------------
     * Fin du fichier
     * -------------------------------------------------------
     */

    console.log("✅ School Connect — Accueil.js prêt.");

});