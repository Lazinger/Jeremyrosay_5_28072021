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
}

// On recupere un produit unique grace a son id transmis dans l'URL
function getProduct(productId) {
	return (
		fetch(`https://oricamera.herokuapp.com/api/cameras/${productId}`)
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

// On formate le prix en le divisant par 100
function formatedPrice(product) {
	let newPrice = product.price / 100;
	return newPrice;
}

// On recupere la liste des options "lenses"
function getLenses(option) {
	let options = option.lenses;
	for (i = 0; i < options.length; i += 1) {
		return options;
	}
}

//On recupere la valeur de l'ID
function getProductId() {
	//On recup l'id contenue dans la chaine de caractere de l'url
	const queryString_url_id = window.location.search;
	//On retourne la premiere valeur associé au parametre "id"
	const urlSearchParams = new URLSearchParams(queryString_url_id);
	const id = urlSearchParams.get("id");
	return id;
}

// On affiche le produit
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

// Ajoute le produit selectionné au panier au click sur sur le bouton
function addProductInCart(product) {
	const buttonCart = document.getElementById("addToCart");

	buttonCart.addEventListener("click", () => {
		getProductInCart(product);
	});
}

// Une popup apparait pour nous signaler que le click a bien fonctionné et nous demande si on continue les achats ou si on va au panier
const popupConfirm = (product) => {
	const idForm = document.getElementById("productLensesOptions");
	const choiceForm = idForm.value;
	if (
		window.confirm(
			`Le produit ${product.name} avec la lense : ${choiceForm} à bien été ajouté au panier
Ok pour acceder au panier ou ANNULER pour rester sur la page du produit`
		)
	) {
		window.location.href = "cart.html";
	} else {
	}
};

// On recupere les produits mis dans le panier et on les stocks dans le sessionStorage
function getProductInCart(product) {
	const idForm = document.getElementById("productLensesOptions");
	const choiceForm = idForm.value;

	let optionsProduct = {
		name: product.name,
		id: product._id,
		image: product.imageUrl,
		lenses: choiceForm,
		quantity: 1,
		price: product.price / 100,
	};

	let productInSessionStorage = JSON.parse(sessionStorage.getItem("products"));

	// On verifie la quantié, si elle est == a -1 on push le tableau, sinon on ajoute +1 a la quantité et on modifie le prix selon la quantité
	if (productInSessionStorage) {
		let bufferProductIndex = productInSessionStorage.findIndex((p) => {
			return p.id == optionsProduct.id && p.lenses == optionsProduct.lenses;
		});

		if (bufferProductIndex == -1) {
			productInSessionStorage.push(optionsProduct);
		} else {
			productInSessionStorage[bufferProductIndex].quantity = productInSessionStorage[bufferProductIndex].quantity + 1;
			productInSessionStorage[bufferProductIndex].price =
				productInSessionStorage[bufferProductIndex].price + product.price / 100;
		}
		sessionStorage.setItem("products", JSON.stringify(productInSessionStorage));
		popupConfirm(product);
	} else {
		productInSessionStorage = [];
		productInSessionStorage.push(optionsProduct);
		sessionStorage.setItem("products", JSON.stringify(productInSessionStorage));
		popupConfirm(product);
	}
}
