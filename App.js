"use strict";

/*
 * =========================================================
 * SCHOOL CONNECT
 * App.js
 * Fichier principal de l'application
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", function () {

    console.log("🚀 School Connect — Application chargée.");

    /*
     * -------------------------------------------------------
     * Initialisation générale
     * -------------------------------------------------------
     */

    function initialiserApplication() {

        console.log("⚙️ Initialisation de School Connect...");

        /*
         * Vérification du navigateur
         */
        if (!window.localStorage) {
            console.warn(
                "⚠️ Le stockage local n'est pas disponible."
            );
        }

        /*
         * Vérification de la connexion
         */
        if (navigator.onLine) {
            console.log("🌐 Connexion Internet disponible.");
        } else {
            console.log("📴 Application hors ligne.");
        }

        /*
         * Année actuelle
         */
        var elementsAnnee =
            document.querySelectorAll("[data-annee]");

        elementsAnnee.forEach(function (element) {
            element.textContent = new Date().getFullYear();
        });

        /*
         * Boutons ayant un attribut data-page
         */
        var boutons =
            document.querySelectorAll("[data-page]");

        boutons.forEach(function (bouton) {

            bouton.addEventListener("click", function () {

                var page = bouton.getAttribute("data-page");

                if (page) {
                    window.location.href = page;
                }

            });

        });

        console.log("✅ School Connect — Application prête.");
    }

    /*
     * -------------------------------------------------------
     * Démarrage
     * -------------------------------------------------------
     */

    try {

        initialiserApplication();

    } catch (erreur) {

        console.error(
            "❌ Erreur lors du démarrage de School Connect :",
            erreur
        );

    }

});