main();

//On passe la fonction en asynchrone
async function main() {
	//On applique await pour attendre le resultat de la promise
	const products = await getProducts();
	console.log(products);
	//displayProduct(products);
	products.forEach(displayProducts);
}

//On va recuperer les infos products dans l'API
function getProducts() {
	//On va chercher l'API
	//&
	//On retourne le fetch complet
	return (
		fetch("http://localhost:3000/api/cameras")
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

function displayProducts(product) {
	const templateElement = document.getElementById("templateProduct");
	const cloneElement = document.importNode(templateElement.content, true);

	cloneElement.getElementById("product__image").src = product.imageUrl;
	cloneElement.getElementById("product__title").textContent = product.name;
	cloneElement.getElementById("product__description").textContent =
		product.description;
	cloneElement.getElementById("product__price").textContent = product.price;

	document.getElementById("section").appendChild(cloneElement);
}
