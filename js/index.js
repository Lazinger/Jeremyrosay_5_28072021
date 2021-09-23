main();

//On passe la fonction en asynchrone
async function main() {
	//On applique await pour attendre le resultat de la promise
	const products = await getProducts();

	products.forEach(displayProducts);
}

//On va recuperer les infos products dans l'API
function getProducts() {
	//On va chercher l'API
	//&
	//On retourne le fetch complet
	return (
		fetch("https://oricamera.herokuapp.com/api/cameras")
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

// Affiche les produits //
function displayProducts(product) {
	// On recup l'element ayant pour id templateProduct et on le stock dans templateElement
	const templateElement = document.getElementById("templateProduct");
	// On stock le contenue de templateElement dans cloneElement
	const cloneElement = document.importNode(templateElement.content, true);

	cloneElement.getElementById("productImage").src = product.imageUrl;
	cloneElement.getElementById("productImageLink").href += `?id=${product._id}`;
	cloneElement.getElementById("productTitle").textContent = product.name;
	cloneElement.getElementById("productPrice").textContent = product.price / 100 + ",00 €";
	cloneElement.getElementById("productLink").href += `?id=${product._id}`;

	document.getElementById("section").appendChild(cloneElement);
}
