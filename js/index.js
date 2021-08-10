main();

//On passe la fonction en asynchrone
async function main() {
	//On applique await pour attendre le resultat de la promise
	const products = await getProducts();
	console.log(products);
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

	cloneElement.getElementById("productImage").src = product.imageUrl;
	cloneElement.getElementById("productImageLink").href += `?id=${product._id}`;
	cloneElement.getElementById("productTitle").textContent = product.name;

	cloneElement.getElementById("productPrice").textContent = product.price;
	cloneElement.getElementById("productLink").href += `?id=${product._id}`;

	document.getElementById("section").appendChild(cloneElement);
}
