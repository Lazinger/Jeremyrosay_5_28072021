let productInSessionStorage = JSON.parse(sessionStorage.getItem("products"));
let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));

// ************************************************AFFICHER ZONE PANIER******************************//

function displayPageCart(productInSessionStorage) {
	// Si le panier est vide, affiche "Votre panier est vide !" avec un bouton "Continuer mes achats"
	if (productInSessionStorage == null || productInSessionStorage.length == 0) {
		const cartTitle = document.getElementById("cartTitle");
		cartTitle.innerHTML = "Votre panier est vide !";

		let cartContent = document.getElementById("cartContent");
		let formContent = document.getElementById("formContent");
		let parent = document.querySelector(".main");
		parent.removeChild(cartContent);
		parent.removeChild(formContent);
	} else {
		// Si le panier contient des produits, affiche "Votre panier", la liste des produits et le formulaire de commande
		cartTitle.innerHTML = "Votre panier";

		const div1 = document.getElementById("div1");
		div1.nextElementSibling.remove();
	}
}

// 	// Mettre a jour le prix total

// ************************************************AFFICHER ELEMENT DU PANIER******************************//

function displayCartItems(productInSessionStorage) {
	// ************************************************CREATION AFFICHE PRIX TOTAL******************************//

	let arrayTotalCost = [];
	if (!productInSessionStorage) {
		return;
	}
	productInSessionStorage.forEach((p) => {
		let totalPricePerProduct = p.price * p.quantity;
		arrayTotalCost.push(totalPricePerProduct);
	});

	const reducer = (acc, cur) => acc + cur;
	const totalCost = arrayTotalCost.reduce(reducer, 0);
	sessionStorage.setItem("totalCost", JSON.stringify(totalCost));

	// ************************************************FIN * CREATION AFFICHE PRIX TOTAL * FIN*****************************//

	let cartContainer = document.getElementById("cartContainer");
	// Si le panier contient des produits, il les affiche
	if (productInSessionStorage.length > 0) {
		for (let product of productInSessionStorage) {
			// Crée la div qui contient chaque produit
			const cartItem = document.createElement("div");
			cartItem.setAttribute("class", "row p-3 align-items-center border-bottom");
			cartContainer.appendChild(cartItem);

			// Crée la div qui contient l'image et le nom du produit
			const cartProductDiv = document.createElement("div");
			cartProductDiv.setAttribute("class", "col-12 col-md-4 text-center");
			cartItem.appendChild(cartProductDiv);

			// Affiche l'image du produit
			const cartProductImage = document.createElement("img");
			cartProductImage.setAttribute("src", product.image);
			cartProductImage.setAttribute("class", "img-fluid");
			cartProductImage.setAttribute("style", "max-width: 200px");
			cartProductDiv.appendChild(cartProductImage);

			// Affiche le nom du produit
			const cartProductName = document.createElement("p");
			cartProductName.innerHTML = product.name;
			cartProductDiv.appendChild(cartProductName);

			// Affiche l'option lense choisi
			const cartProductOption = document.createElement("p");
			cartProductOption.setAttribute("class", "productOption col-12 col-md-2 m-0 text-center");
			cartProductOption.innerHTML = product.lenses;
			cartItem.appendChild(cartProductOption);

			// Affiche la div qui contiendra la quantité et les boutons + et -
			const cartProductQuantityContainer = document.createElement("div");
			cartProductQuantityContainer.setAttribute(
				"class",
				"quantityContainer row col-2 col-md-4 flex justify-content-center text-center"
			);
			cartItem.appendChild(cartProductQuantityContainer);

			// Affiche le bouton "-"
			const cartProductQuantitySub = document.createElement("button");
			cartProductQuantitySub.setAttribute("class", "subButton col-2 col-md-2 text-center");
			cartProductQuantitySub.innerHTML = "-";
			cartProductQuantityContainer.appendChild(cartProductQuantitySub);

			// Affiche la quantité
			const cartProductQuantity = document.createElement("input");
			cartProductQuantity.setAttribute("class", "quantity col-2 col-md-6 text-center");
			cartProductQuantity.setAttribute("value", `${product.quantity}`);
			cartProductQuantity.setAttribute("name", "qty");
			cartProductQuantity.setAttribute("id", `quantity-${product.id}-${product.lenses}`);
			cartProductQuantity.innerHTML = product.quantity;
			cartProductQuantityContainer.appendChild(cartProductQuantity);

			// Affiche le bouton "+"
			const cartProductQuantityAdd = document.createElement("button");
			cartProductQuantityAdd.setAttribute("class", "addButton col-2 col-md-2 text-center");
			cartProductQuantityAdd.innerHTML = "+";
			cartProductQuantityContainer.appendChild(cartProductQuantityAdd);

			// Affiche le prix total par produit
			const cartProductTotalPrice = document.createElement("p");
			cartProductTotalPrice.setAttribute("class", "totalPrice col-6 col-md-2 col-lg-2 text-center m-0");
			cartProductTotalPrice.setAttribute("id", `total-${product.id}-${product.lenses}`);
			cartProductTotalPrice.innerHTML = product.price * product.quantity + " €";
			cartItem.appendChild(cartProductTotalPrice);

			// Affiche le bouton poubelle pour la suppression d'un produit
			const divRemoveButton = document.createElement("div");
			divRemoveButton.setAttribute("class", "col-12 text-center");
			cartItem.appendChild(divRemoveButton);
			// Crée le bouton poubelle
			const removeButton = document.createElement("button");
			removeButton.setAttribute("class", "removeButton btn bg-pink btn-outline-dark pl-4 pr-4");
			removeButton.setAttribute("data-item", product.id);
			removeButton.innerHTML += `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`;
			divRemoveButton.appendChild(removeButton);

			//Affiche le prix total du panier
			const totalCartPrice = document.getElementById("totalCartPrice");
			totalCartPrice.innerHTML = totalCost;
		}
	}

	//****************************************CREATION BOUTON INCREMENTATION ET DECREMENTATION*************
	let substractButton = document.getElementsByClassName("subButton");
	let addButton = document.getElementsByClassName("addButton");
	let products = JSON.parse(sessionStorage.getItem("products"));
	let totalCostInSessionStorage = JSON.parse(sessionStorage.getItem("totalCost"));

	// Incremente de 1 à chaque click sur le bouton +
	for (let i = 0; i < addButton.length; i += 1) {
		let button = addButton[i];
		button.addEventListener("click", (event) => {
			let buttonClicked = event.target;
			let input = buttonClicked.parentElement.children[1];
			let inputValue = input.value;
			let newValue = parseInt(inputValue) + 1;

			input.value = newValue;
			products[i].quantity = input.value;
			totalCostInSessionStorage = totalCostInSessionStorage + products[i].price;
			sessionStorage.setItem("products", JSON.stringify(products));
			sessionStorage.setItem("totalCost", JSON.stringify(totalCostInSessionStorage));

			const totalCartPrice = document.getElementById("totalCartPrice");
			totalCartPrice.innerHTML = totalCostInSessionStorage;

			document.getElementById(`total-${products[i].id}-${products[i].lenses}`).innerHTML =
				products[i].price * newValue + " €";

			// document.location.reload();
		});
	}

	// Decremente de 1 a chaque click sur le bouton -

	for (let i = 0; i < substractButton.length; i += 1) {
		let button = substractButton[i];
		button.addEventListener("click", (event) => {
			let buttonClicked = event.target;
			let input = buttonClicked.parentElement.children[1];
			let inputValue = input.value;
			let newValue = parseInt(inputValue) - 1;

			input.value = newValue;
			products[i].quantity = input.value;
			totalCostInSessionStorage = totalCostInSessionStorage - products[i].price;
			sessionStorage.setItem("products", JSON.stringify(products));
			sessionStorage.setItem("totalCost", JSON.stringify(totalCostInSessionStorage));

			const totalCartPrice = document.getElementById("totalCartPrice");
			totalCartPrice.innerHTML = totalCostInSessionStorage;

			document.getElementById(`total-${products[i].id}-${products[i].lenses}`).innerHTML =
				products[i].price * newValue + " €";

			// document.location.reload();
		});
	}

	// ************************************************CREATION BOUTON SUPPRIMER ELEMENT EN COURS******************************//
	let removeButton = document.querySelectorAll(".removeButton");

	for (let i = 0; i < removeButton.length; i += 1) {
		removeButton[i].addEventListener("click", (event) => {
			event.preventDefault();

			let idToDelete = productInSessionStorage[i].lenses;

			productInSessionStorage = productInSessionStorage.filter((el) => el.lenses !== idToDelete);
			console.log(productInSessionStorage);
			sessionStorage.setItem("products", JSON.stringify(productInSessionStorage));
			document.location.reload();
		});
	}

	// ************************************************CREATION BOUTON VIDER LE PANIER******************************//
	let deleteCart = document.getElementById("deleteCart");

	deleteCart.addEventListener("click", (event) => {
		event.preventDefault();

		sessionStorage.clear();
		document.location.reload();
	});
}

// Vérifie les inputs des utilisateurs lorsqu'ils remplissent le formulaire de commande
function checkInputs() {
	// Récupère le bouton "Commander"
	let submitForm = document.getElementById("orderButton");

	// Valide les champs du formulaire au clic sur le bouton "commander"
	submitForm.addEventListener("click", function (e) {
		const lastName = document.getElementById("lastName");
		const lastNameMissing = document.getElementById("lastNameMissing");
		// Vérifie que le nom comporte seulement les caractères attendus
		const lastNameValidation = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;

		// Si le champ "Nom" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
		if (lastName.validity.valueMissing) {
			e.preventDefault();
			lastNameMissing.textContent = "Ce champ est obligatoire";
			lastNameMissing.style.color = "red";
		} else if (lastNameValidation.test(lastName.value) == false) {
			e.preventDefault();
			lastNameMissing.textContent = "Format de saisie invalide";
			lastNameMissing.style.color = "orange";
		} else {
			lastNameMissing.textContent = "";
		}

		const firstName = document.getElementById("firstName");
		const firstNameMissing = document.getElementById("firstNameMissing");
		// Vérifie que le prénom comporte seulement les caractères attendus
		const firstNameValidation = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;

		// Si le champ "Prénom" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
		if (firstName.validity.valueMissing) {
			e.preventDefault();
			firstNameMissing.textContent = "Ce champ est obligatoire";
			firstNameMissing.style.color = "red";
		} else if (firstNameValidation.test(firstName.value) == false) {
			e.preventDefault();
			firstNameMissing.textContent = "Format de saisie invalide";
			firstNameMissing.style.color = "orange";
		} else {
			firstNameMissing.textContent = "";
		}

		const mail = document.getElementById("mail");
		const mailMissing = document.getElementById("mailMissing");
		// Vérifie que le mail comporte seulement les caractères attendus
		const mailValidation = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/;

		// Si le champ "Mail" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
		if (mail.validity.valueMissing) {
			e.preventDefault();
			mailMissing.textContent = "Ce champ est obligatoire";
			mailMissing.style.color = "red";
		} else if (mailValidation.test(mail.value) == false) {
			e.preventDefault();
			mailMissing.textContent = "Format de saisie invalide";
			mailMissing.style.color = "orange";
		} else {
			mailMissing.textContent = "";
		}

		const address = document.getElementById("address");
		const addressMissing = document.getElementById("addressMissing");
		// Vérifie que l'adresse comporte seulement les caractères attendus
		const adressValidation = /^[0-9]{0,10}[-'\s]*[a-zA-Zàâäéèêëïîôöùûüç]{2,}/;

		// Si le champ "Adresse" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
		if (address.validity.valueMissing) {
			e.preventDefault();
			addressMissing.textContent = "Ce champ est obligatoire";
			addressMissing.style.color = "red";
		} else if (adressValidation.test(address.value) == false) {
			e.preventDefault();
			addressMissing.textContent = "Format de saisie invalide";
			addressMissing.style.color = "orange";
		} else {
			addressMissing.textContent = "";
		}

		const zip = document.getElementById("zip");
		const zipMissing = document.getElementById("zipMissing");
		// Vérifie que le code postal comporte seulement les caractères attendus
		const zipValidation = /^[1-9]{1}[0-9]{4}/;

		// Si le champ "Code postal" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
		if (zip.validity.valueMissing) {
			e.preventDefault();
			zipMissing.textContent = "Ce champ est obligatoire";
			zipMissing.style.color = "red";
		} else if (zipValidation.test(zip.value) == false) {
			e.preventDefault();
			zipMissing.textContent = "Format de saisie invalide";
			zipMissing.style.color = "orange";
		} else {
			zipMissing.textContent = "";
		}

		const city = document.getElementById("city");
		const cityMissing = document.getElementById("cityMissing");
		// Vérifie que la ville comporte seulement les caractères attendus
		const cityValidation = /^[a-zA-ZéèêàçîïÉÈÎÏ]{2,}([-'\s][a-zA-ZéèêàçîïÉÈÎÏ]{2,})?/;

		// Si le champ "Ville" est vide ou s'il ne respecte pas la regex, un message d'erreur s'affiche et bloque l'envoi du formulaire
		if (city.validity.valueMissing) {
			e.preventDefault();
			cityMissing.textContent = "Ce champ est obligatoire";
			cityMissing.style.color = "red";
		} else if (cityValidation.test(city.value) == false) {
			e.preventDefault();
			cityMissing.textContent = "Format de saisie invalide";
			cityMissing.style.color = "orange";
		} else {
			cityMissing.textContent = "";
		}
	});
}

// Valide la commande et affiche la page de confirmation de commande
function validateOrder() {
	let orderValidation = document.getElementById("formContent");

	orderValidation.addEventListener("submit", function (e) {
		let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));
		e.preventDefault();

		// Récupère les champs du formulaire
		let firstNameForm = document.getElementById("firstName").value;
		let lastNameForm = document.getElementById("lastName").value;
		let addressForm = document.getElementById("address").value;
		let cityForm = document.getElementById("city").value;
		let mailForm = document.getElementById("mail").value;

		// Tableau de produits envoyé au serveur contenant l'id des produits commandés
		let products = [];
		for (let i = 0; i < productInSessionStorage.length; i++) {
			products.push(productInSessionStorage[i].id);
		}

		// Contient l'objet contact et le tableau produits envoyés au serveur
		let orderContent = {
			contact: {
				firstName: firstNameForm,
				lastName: lastNameForm,
				address: addressForm,
				city: cityForm,
				email: mailForm,
			},
			products: products,
		};

		// Envoi la requête post au serveur
		// fetch("http://localhost:3000/api/cameras/order"
		fetch("http://localhost:3000/api/cameras/order", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(orderContent),
		})
			// Récupère une réponse au format json
			.then(function (response) {
				return response.json();
			})

			// Affiche le résultat sur la page "orderConfirmation.html"
			.then(function (result) {
				window.location.href = `./orderConfirmation.html?price=${totalCost + ",00 €"}&id=${result.orderId}`;
			});
		// Vide le local storage
		localStorage.clear();
	});
}

displayPageCart(productInSessionStorage);
displayCartItems(productInSessionStorage);
checkInputs();
validateOrder();
