main();

//On passe la fonction en asynchrone
async function main() {
	//On applique await pour attendre le resultat de la promise
	const products = await getProducts();
	console.log(products);
	//displayProduct(products);
	for (let i = 0; i < products.length; i += 1) {
		const product = products[i];
		displayProduct(product);
	}
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

function displayProduct(product) {
	document.querySelector("#section").innerHTML += `
        <div class="row justify-content-center">
            <div class="card col col-lg-8">
				<div class="card-img-top">
					<img class="img" src="${product.imageUrl}" alt="" />
				</div>
				<div class="card-body">
					<div>
						<h2 id="product__title" class="card-title">${product.name}</h2>
						<p id="product__descrption" class="card-text">${product.description}</p>
					</div>
					<div>
						<span id="product__price" class="product__price">${product.price} €</span>
					</div>
				</div>
			</div>
        </div>`;
}
