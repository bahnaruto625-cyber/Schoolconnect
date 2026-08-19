"use strict";

console.log("🔔 School Connect — Notifications.js chargé.");

const Notifications = {

    liste: [],

    ajouter: function (message, type = "info") {
        const notification = {
            id: Date.now(),
            message: message,
            type: type,
            date: new Date().toISOString(),
            lue: false
        };

        this.liste.push(notification);

        console.log("🔔 Nouvelle notification :", message);

        return notification;
    },

    afficher: function () {
        console.log("");
        console.log("=================================");
        console.log("🔔 NOTIFICATIONS");
        console.log("=================================");

        if (this.liste.length === 0) {
            console.log("ℹ️ Aucune notification pour le moment.");
            return;
        }

        this.liste.forEach(function (notification, index) {
            console.log(
                (index + 1) + ". " +
                notification.message +
                " [" + notification.type + "]"
            );
        });

        console.log("=================================");
    },

    marquerCommeLue: function (id) {
        const notification = this.liste.find(function (item) {
            return item.id === id;
        });

        if (!notification) {
            console.log("⚠️ Notification introuvable.");
            return false;
        }

        notification.lue = true;
        console.log("✅ Notification marquée comme lue.");

        return true;
    },

    supprimer: function (id) {
        const avant = this.liste.length;

        this.liste = this.liste.filter(function (item) {
            return item.id !== id;
        });

        if (this.liste.length < avant) {
            console.log("🗑️ Notification supprimée.");
            return true;
        }

        console.log("⚠️ Notification introuvable.");
        return false;
    },

    toutEffacer: function () {
        this.liste = [];
        console.log("🗑️ Toutes les notifications ont été supprimées.");
    }
};

Notifications.ajouter(
    "Bienvenue dans School Connect.",
    "info"
);

Notifications.afficher();

console.log("✅ School Connect — Notifications.js prêt.");

if (typeof module !== "undefined" && module.exports) {
    module.exports = Notifications;
}