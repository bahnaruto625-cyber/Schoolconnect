"use strict";

/* =====================================================
   SCHOOL CONNECT — ESPACE ADMINISTRATEUR
   Devise : Franc guinéen (GNF)
   Orange Money : 614 877 827
===================================================== */

const CONFIG = {
    devise: "GNF",
    orangeMoney: "614 877 827",
    abonnementEcole: 250000,
    abonnementParent: 25000
};


/* =====================================================
   OUTILS
===================================================== */

function getData(key, defaultValue = []) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error("Erreur de lecture :", error);
        return defaultValue;
    }
}


function saveData(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error("Erreur d'enregistrement :", error);
    }
}


function formatMoney(amount) {
    return Number(amount || 0).toLocaleString("fr-FR") + " GNF";
}


function escapeHTML(value) {
    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =====================================================
   RÉCUPÉRATION DES DONNÉES
===================================================== */

function getSchools() {
    return getData("schoolConnect_ecoles", []);
}

function getParents() {
    return getData("schoolConnect_parents", []);
}

function getTeachers() {
    return getData("schoolConnect_enseignants", []);
}

function getStudents() {
    return getData("schoolConnect_eleves", []);
}

function getPayments() {
    return getData("schoolConnect_paiements", []);
}


/* =====================================================
   COMPTEURS
===================================================== */

function updateCounters() {

    const schools = getSchools();
    const parents = getParents();
    const teachers = getTeachers();
    const students = getStudents();

    const schoolCounter = document.getElementById("schoolCount");
    const parentCounter = document.getElementById("parentCount");
    const teacherCounter = document.getElementById("teacherCount");
    const studentCounter = document.getElementById("studentCount");

    if (schoolCounter) {
        schoolCounter.textContent = schools.length;
    }

    if (parentCounter) {
        parentCounter.textContent = parents.length;
    }

    if (teacherCounter) {
        teacherCounter.textContent = teachers.length;
    }

    if (studentCounter) {
        studentCounter.textContent = students.length;
    }
}


/* =====================================================
   ÉCOLES
===================================================== */

function displaySchools() {

    const container = document.getElementById("schoolsList");

    if (!container) return;

    const schools = getSchools();

    if (schools.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <strong>Aucune école pour le moment</strong>
                <br>
                Les écoles inscrites apparaîtront ici.
            </div>
        `;
        return;
    }

    container.innerHTML = schools.map((school, index) => {

        return `
            <div class="admin-item">

                <strong>
                    🏫 ${escapeHTML(
                        school.nom ||
                        school.name ||
                        "École"
                    )}
                </strong>

                <div>
                    📧 ${escapeHTML(
                        school.email ||
                        "Email non renseigné"
                    )}
                </div>

                <div>
                    📞 ${escapeHTML(
                        school.telephone ||
                        school.phone ||
                        "Téléphone non renseigné"
                    )}
                </div>

                <div>
                    Statut :
                    <strong>
                        ${escapeHTML(
                            school.statut ||
                            "En attente"
                        )}
                    </strong>
                </div>

                <button onclick="deleteSchool(${index})">
                    🗑️ Supprimer
                </button>

            </div>
        `;

    }).join("");
}


/* =====================================================
   PARENTS
===================================================== */

function displayParents() {

    const container = document.getElementById("parentsList");

    if (!container) return;

    const parents = getParents();

    if (parents.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <strong>Aucun parent pour le moment</strong>
                <br>
                Les parents inscrits apparaîtront ici.
            </div>
        `;
        return;
    }

    container.innerHTML = parents.map((parent, index) => {

        return `
            <div class="admin-item">

                <strong>
                    👨‍👩‍👧 ${escapeHTML(
                        parent.nom ||
                        parent.name ||
                        "Parent"
                    )}
                </strong>

                <div>
                    📧 ${escapeHTML(
                        parent.email ||
                        "Email non renseigné"
                    )}
                </div>

                <div>
                    📞 ${escapeHTML(
                        parent.telephone ||
                        parent.phone ||
                        "Téléphone non renseigné"
                    )}
                </div>

                <div>
                    Statut :
                    <strong>
                        ${escapeHTML(
                            parent.statut ||
                            "En attente"
                        )}
                    </strong>
                </div>

                <button onclick="deleteParent(${index})">
                    🗑️ Supprimer
                </button>

            </div>
        `;

    }).join("");
}


/* =====================================================
   ENSEIGNANTS
===================================================== */

function displayTeachers() {

    const container = document.getElementById("teachersList");

    if (!container) return;

    const teachers = getTeachers();

    if (teachers.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <strong>
                    Aucun enseignant pour le moment
                </strong>
                <br>
                Les enseignants sont gratuits.
            </div>
        `;
        return;
    }

    container.innerHTML = teachers.map((teacher, index) => {

        return `
            <div class="admin-item">

                <strong>
                    👨‍🏫 ${escapeHTML(
                        teacher.nom ||
                        teacher.name ||
                        "Enseignant"
                    )}
                </strong>

                <div>
                    📧 ${escapeHTML(
                        teacher.email ||
                        "Email non renseigné"
                    )}
                </div>

                <div>
                    📚 Matière :
                    ${escapeHTML(
                        teacher.matiere ||
                        teacher.matiereEnseignee ||
                        "Non renseignée"
                    )}
                </div>

                <div>
                    Statut :
                    <strong>Gratuit</strong>
                </div>

                <button onclick="deleteTeacher(${index})">
                    🗑️ Supprimer
                </button>

            </div>
        `;

    }).join("");
}


/* =====================================================
   ÉLÈVES
===================================================== */

function displayStudents() {

    const container = document.getElementById("studentsList");

    if (!container) return;

    const students = getStudents();

    if (students.length === 0) {
        container.innerHTML = `
            <div class="empty-message">
                <strong>
                    Aucun élève pour le moment
                </strong>
                <br>
                Les élèves sont entièrement gratuits.
            </div>
        `;
        return;
    }

    container.innerHTML = students.map((student, index) => {

        return `
            <div class="admin-item">

                <strong>
                    🎓 ${escapeHTML(
                        student.nom ||
                        student.name ||
                        "Élève"
                    )}
                </strong>

                <div>
                    📧 ${escapeHTML(
                        student.email ||
                        "Email non renseigné"
                    )}
                </div>

                <div>
                    🏫 École :
                    ${escapeHTML(
                        student.ecole ||
                        student.school ||
                        "Non renseignée"
                    )}
                </div>

                <div>
                    Statut :
                    <strong>Gratuit</strong>
                </div>

                <button onclick="deleteStudent(${index})">
                    🗑️ Supprimer
                </button>

            </div>
        `;

    }).join("");
}


/* =====================================================
   PAIEMENTS
===================================================== */

function displayPayments() {

    const container = document.getElementById("paymentsList");

    if (!container) return;

    const payments = getPayments();

    if (payments.length === 0) {

        container.innerHTML = `
            <div class="empty-message">
                <strong>
                    Aucun paiement à vérifier
                </strong>
                <br>
                Les demandes de paiement apparaîtront ici.
            </div>
        `;

        return;
    }

    container.innerHTML = payments.map((payment, index) => {

        const type = payment.type || "école";

        const isParent =
            type.toLowerCase().includes("parent");

        const amount = isParent
            ? CONFIG.abonnementParent
            : CONFIG.abonnementEcole;

        const status =
            payment.statut ||
            payment.status ||
            "En attente";

        return `
            <div class="payment-item">

                <h3>
                    ${isParent
                        ? "👨‍👩‍👧 Abonnement parent"
                        : "🏫 Abonnement école"
                    }
                </h3>

                <p>
                    <strong>Montant :</strong>
                    ${formatMoney(amount)} / mois
                </p>

                <p>
                    <strong>
                        Paiement Orange Money :
                    </strong>
                    ${CONFIG.orangeMoney}
                </p>

                <p>
                    <strong>Référence :</strong>
                    ${escapeHTML(
                        payment.reference ||
                        payment.referencePaiement ||
                        "Non renseignée"
                    )}
                </p>

                <p>
                    <strong>Statut :</strong>
                    ${escapeHTML(status)}
                </p>

                ${
                    status === "En attente"
                    ? `
                        <button
                            class="verify-btn"
                            onclick="verifyPayment(${index})"
                        >
                            ✅ Vérifier
                        </button>

                        <button
                            class="reject-btn"
                            onclick="rejectPayment(${index})"
                        >
                            ❌ Refuser
                        </button>
                    `
                    : ""
                }

            </div>
        `;

    }).join("");
}


/* =====================================================
   VÉRIFIER PAIEMENT
===================================================== */

function verifyPayment(index) {

    const payments = getPayments();

    if (!payments[index]) {
        alert("Paiement introuvable.");
        return;
    }

    payments[index].statut = "Validé";
    payments[index].status = "Validé";
    payments[index].dateValidation =
        new Date().toISOString();

    saveData(
        "schoolConnect_paiements",
        payments
    );

    displayPayments();

    alert("✅ Paiement validé avec succès.");
}


/* =====================================================
   REFUSER PAIEMENT
===================================================== */

function rejectPayment(index) {

    const payments = getPayments();

    if (!payments[index]) {
        alert("Paiement introuvable.");
        return;
    }

    payments[index].statut = "Refusé";
    payments[index].status = "Refusé";
    payments[index].dateRefus =
        new Date().toISOString();

    saveData(
        "schoolConnect_paiements",
        payments
    );

    displayPayments();

    alert("❌ Paiement refusé.");
}


/* =====================================================
   SUPPRESSION ÉCOLE
===================================================== */

function deleteSchool(index) {

    if (!confirm(
        "Voulez-vous supprimer cette école ?"
    )) {
        return;
    }

    const schools = getSchools();

    schools.splice(index, 1);

    saveData(
        "schoolConnect_ecoles",
        schools
    );

    refreshAdmin();
}


/* =====================================================
   SUPPRESSION PARENT
===================================================== */

function deleteParent(index) {

    if (!confirm(
        "Voulez-vous supprimer ce parent ?"
    )) {
        return;
    }

    const parents = getParents();

    parents.splice(index, 1);

    saveData(
        "schoolConnect_parents",
        parents
    );

    refreshAdmin();
}


/* =====================================================
   SUPPRESSION ENSEIGNANT
===================================================== */

function deleteTeacher(index) {

    if (!confirm(
        "Voulez-vous supprimer cet enseignant ?"
    )) {
        return;
    }

    const teachers = getTeachers();

    teachers.splice(index, 1);

    saveData(
        "schoolConnect_enseignants",
        teachers
    );

    refreshAdmin();
}


/* =====================================================
   SUPPRESSION ÉLÈVE
===================================================== */

function deleteStudent(index) {

    if (!confirm(
        "Voulez-vous supprimer cet élève ?"
    )) {
        return;
    }

    const students = getStudents();

    students.splice(index, 1);

    saveData(
        "schoolConnect_eleves",
        students
    );

    refreshAdmin();
}


/* =====================================================
   ACTUALISATION ADMIN
===================================================== */

function refreshAdmin() {

    updateCounters();

    displaySchools();
    displayParents();
    displayTeachers();
    displayStudents();
    displayPayments();
}


/* =====================================================
   DÉMARRAGE
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        console.log(
            "School Connect — Admin chargé."
        );

        refreshAdmin();

    }
);


/* =====================================================
   FONCTIONS DISPONIBLES POUR HTML
===================================================== */

window.verifyPayment = verifyPayment;
window.rejectPayment = rejectPayment;

window.deleteSchool = deleteSchool;
window.deleteParent = deleteParent;
window.deleteTeacher = deleteTeacher;
window.deleteStudent = deleteStudent;

window.refreshAdmin = refreshAdmin;