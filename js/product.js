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
	const productInBasket = getProductInBasket(product);

	//On affiche le produit de façon dynamique
	displayProduct(product, reduxPrice, lenses);
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
				}
			})
			//On recupere l'erreur si erreur il y a
			.catch(function (error) {
				console.log("error");
				alert(error);
				window.location.href = "index.html";
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

function getProductInBasket(product) {
	const idForm = document.getElementById("optionsForm");
	const buttonBasket = document.getElementById("addToBasket");

	//On enregistre les produits selectionnés au click sur le bouton
	buttonBasket.addEventListener("click", (event) => {
		event.preventDefault();
		//Recup l'option choisit par l'utilisateur dans la selection Lense
		const idForm = document.getElementById("productLensesOptions");
		const choiceForm = idForm.value;
		//On stock les informations produit dans une variable
		let productTab = {
			productName: product.name,
			productId: product._id,
			productOption: choiceForm,
			productQuantity: 1,
			productPrice: product.price / 100,
		};

		//Declaration de la variable dans laquel on va mettre les keys/value du session storage
		let productInSessionStorage = JSON.parse(sessionStorage.getItem("product"));

		//Ajout d'un "product" dans le tableau productTab
		const addProductInSessionStorage = () => {
			productInSessionStorage.push(productTab);
			sessionStorage.setItem("product", JSON.stringify(productInSessionStorage));
		};

		if (productInSessionStorage) {
			//Si SessionStorage possède déja un product alors on rajoute le nouveau a celui si
			addProductInSessionStorage();
		} else {
			//Si SessionStorage vide alors on crée un tableau avec un nouveau product
			productInSessionStorage = [];
			addProductInSessionStorage();
		}
	});
}

// window.localStorage.setItem()
// function addToBasket() {
// 	console.log(product, "yoyoyo");
// 	window.sessionStorage.setItem("produit", JSON.stringify(product));
// }
