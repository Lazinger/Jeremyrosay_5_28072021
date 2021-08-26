// Récupère le prix et l'identifiant de la commande
const params = new URLSearchParams(window.location.search);

// Affiche le prix de la commande
const priceOrder = document.getElementById("priceOrder");
priceOrder.innerHTML = params.get("price");

// Affiche l'identifiant de la commande
const idOrder = document.getElementById("idOrder");
idOrder.innerHTML = params.get("id");
