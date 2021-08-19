main();

async function main() {
	//On recupere l'ID du produit
	const productId = getProductId();

	//On recupere le produit via l'ID
	const product = await getProduct(productId);

	//On recup le prix et on divise par 100
	const reduxPrice = await formatedPrice(product);

	//On recupere les options
	const lenses = getLenses(product);

	//On recupère les informations du produit selectionné au click du bouton
	const productInCart = addProductInCart(product);

	//On affiche le produit de façon dynamique
	displayProduct(product, reduxPrice, lenses);
	console.log(product);
}

function getProduct(productId) {
	return (
		fetch(`http://localhost:3000/api/cameras/${productId}`)
			.then(function (resProducts) {
				return resProducts.json();
			})
			//On retourne le resultat
			.then(function (dataProducts) {
				if (dataProducts._id) {
					return dataProducts;
				} else {
					window.location.href = "index.html";
				}
			})
	);
}

function formatedPrice(product) {
	let newPrice = product.price / 100;
	return newPrice;
}

function getLenses(option) {
	let options = option.lenses;
	for (i = 0; i < options.length; i += 1) {
		return options;
	}
}

function getProductId() {
	//On recup l'id contenue dans la chaine de caractere de l'url
	const queryString_url_id = window.location.search;
	//On retourne la premiere valeur associé au paramatre "id"
	const urlSearchParams = new URLSearchParams(queryString_url_id);
	const id = urlSearchParams.get("id");
	return id;
}

function displayProduct(product, reduxPrice, lenses) {
	document.getElementById("productImage").src = product.imageUrl;
	document.getElementById("productTitle").textContent = product.name;
	document.getElementById("productDescription").textContent = product.description;
	document.getElementById("productPrice").textContent = `${reduxPrice},00 €`;

	const lensSelect = document.getElementById("productLensesOptions");
	for (i = 0; i < lenses.length; i += 1) {
		const selectLenses = document.createElement("option");
		selectLenses.setAttribute("value", lenses[i]);
		selectLenses.innerHTML = lenses[i];
		lensSelect.appendChild(selectLenses);
	}
}

function addProductInCart(product) {
	const buttonCart = document.getElementById("addToCart");

	buttonCart.addEventListener("click", () => {
		getProductInCart(product);
		totalCost(product);
	});
}

function getProductInCart(product) {
	let productInSessionStorage = [];
	//Recup l'option choisit par l'utilisateur dans la selection Lense
	const idForm = document.getElementById("productLensesOptions");
	const choiceForm = idForm.value;

	if (!sessionStorage.getItem("product")) {
		productInSessionStorage.push({
			productImage: product.imageUrl,
			productName: product.name,
			productId: product._id,
			productOption: choiceForm,
			productQuantity: 1,
			productPrice: product.price,
		});
		sessionStorage.setItem("product", JSON.stringify(productInSessionStorage));
	} else {
		productInSessionStorage = JSON.parse(sessionStorage.getItem("product"));
		let exist = false;

		// Vérifie pour chaque élément du tableau produits que l'élément existe déjà, si c'est le cas ajout de 1 à la quantité du produit
		productInSessionStorage.forEach((element) => {
			if (element.productId == product._id) {
				element.productQuantity++;
				exist = true;
			}
		});
		// let productTempIndex = productInSessionStorage.findIndex((element) => {
		// 	return element.productId == product._id && element.productOption == product.productOption;
		// });
		// Si productIndex == -1 alors j'ajoute un nouveau produit
		// Sinon je modifie le produit concerné

		// if (productTempIndex == -1) {
		// 	productInSessionStorage.push({
		// 		productImage: product.imageUrl,
		// 		productName: product.name,
		// 		productId: product._id,
		// 		productOption: choiceForm,
		// 		productQuantity: 1,
		// 		productPrice: product.price,
		// 	});
		// } else {
		// 	productInSessionStorage[productTempIndex].productQuantity += 1;
		// }

		// Ajoute un produit différent au panier
		if (!exist) {
			productInSessionStorage.push({
				productImage: product.imageUrl,
				productName: product.name,
				productId: product._id,
				productOption: choiceForm,
				productQuantity: 1,
				productPrice: product.price,
			});
		}

		// Met à jour le panier
		sessionStorage.setItem("product", JSON.stringify(productInSessionStorage));
	}
}

function totalCost(product) {
	let cartCost = sessionStorage.getItem("totalCost");

	// Si le prix total du panier n'est pas nul, ajoute le prix du produit à celui du panier
	if (cartCost != null) {
		cartCost = parseInt(cartCost);
		sessionStorage.setItem("totalCost", cartCost + product.price);
	} else {
		// Sinon le prix total du panier correspond au prix du produit
		sessionStorage.setItem("totalCost", product.price);
	}
}
