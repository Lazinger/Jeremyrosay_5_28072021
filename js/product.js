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
	});
}

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

	if (productInSessionStorage) {
		productInSessionStorage.push(optionsProduct);
		sessionStorage.setItem("products", JSON.stringify(productInSessionStorage));
		popupConfirm(product);
	} else {
		productInSessionStorage = [];
		productInSessionStorage.push(optionsProduct);
		sessionStorage.setItem("products", JSON.stringify(productInSessionStorage));
		popupConfirm(product);
	}
}
