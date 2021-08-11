main();

async function main() {
	//On recupere l'ID du produit
	const productId = getProductId();
	//On recupere le produit via l'ID
	const product = await getProduct(productId);
	//On affiche le produit de façon dynamique
	showProduct(product);
}

function getProductId() {
	//On recup l'id contenue dans la chaine de caractere de l'url
	const queryString_url_id = window.location.search;
	//On retourne la premiere valeur associé au paramatre "id"
	const urlSearchParams = new URLSearchParams(queryString_url_id);
	const id = urlSearchParams.get("id");
	return id;
}

function getProduct(productId) {
	return (
		fetch(`http://localhost:3000/api/cameras/${productId}`)
			.then(function (resProducts) {
				return resProducts.json();
			})
			//On retourne le resultat
			.then(function (dataProducts) {
				return dataProducts;
			})
			//On recupere l'erreur si erreur il y a
			.catch(function (error) {
				alert(error);
			})
	);
}

function showProduct(product) {
	document.getElementById("productImage").src = product.imageUrl;
	document.getElementById("productTitle").textContent = product.name;
	document.getElementById("productDescription").textContent = product.description;
	document.getElementById("productPrice").textContent = product.price;
}
