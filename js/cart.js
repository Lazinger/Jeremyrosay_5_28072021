let productInSessionStorage = JSON.parse(sessionStorage.getItem("products"));
let totalCost = JSON.parse(sessionStorage.getItem("totalCost"));

function displayPageCart(productInSessionStorage) {
	// Si le panier est vide, affiche "Votre panier est vide !" avec un bouton "Continuer mes achats"
	if (productInSessionStorage == null || productInSessionStorage.length == 0) {
		const cartTitle = document.getElementById("cartTitle");
		cartTitle.innerHTML = "Votre panier est vide !";

		let cartContent = document.getElementById("cartContent");
		// let formContent = document.getElementById("formContent");
		let parent = document.querySelector(".main");
		parent.removeChild(cartContent);
	} else {
		// Si le panier contient des produits, affiche "Votre panier", la liste des produits et le formulaire de commande
		cartTitle.innerHTML = "Votre panier";

		const div1 = document.getElementById("div1");
		div1.nextElementSibling.remove();
	}
}

// function removeItem() {
// 	let product = JSON.parse(sessionStorage.getItem("product"));
// 	product = product.filter((p) => p.productId !== productId);
// 	// Mettre a jour le prix total
// 	sessionStorage.setItem("product", JSON.stringify(productInSessionStorage));
// 	window.location.reload();
// }

// 	// Mettre a jour le prix total

function displayCartItems(productInSessionStorage, totalCost) {
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
			const cartProductQuantity = document.createElement("div");
			cartProductQuantity.setAttribute("class", "quantity col-2 col-md-6 text-center");
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
			cartProductTotalPrice.innerHTML = product.price * product.quantity + ",00 €";
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

			// Affiche le prix total du panier
			const totalCartPrice = document.getElementById("totalCartPrice");
			totalCartPrice.innerHTML = totalCost / 100 + ",00 €";
		}
	}

	let substractButton = document.getElementsByClassName("subButton");
	let addButton = document.getElementsByClassName("addButton");

	let products = JSON.parse(sessionStorage.getItem("products"));

	// Incremente de 1 à chaque click sur le bouton +

	for (let i = 0; i < addButton.length; i += 1) {
		let button = addButton[i];
		button.addEventListener("click", (event) => {
			let buttonClicked = event.target;
			let divQty = buttonClicked.parentElement.children[1];
			let divQtyValue = products[i].quantity;
			let newQtyValue = (divQtyValue += 1);
			products[i].quantity = newQtyValue;
			sessionStorage.setItem("products", JSON.stringify(products));
			newTotalCost = products[i].productPrice * products[i].quantity;
			console.log(newTotalCost);
			sessionStorage.setItem("totalCost", JSON.stringify(newTotalCost));
			console.log(totalCost);

			document.location.reload();
		});
	}

	// Decremente de 1 a chaque click sur le bouton -

	for (let i = 0; i < substractButton.length; i += 1) {
		let button = substractButton[i];
		button.addEventListener("click", (event) => {
			let buttonClicked = event.target;
			let divQty = buttonClicked.parentElement.children[1];
			let divQtyValue = products[i].quantity;
			let newQtyValue = (divQtyValue -= 1);
			products[i].quantity = newQtyValue;
			sessionStorage.setItem("products", JSON.stringify(products));
			newTotalCost = products[i].productPrice * products[i].quantity;
			console.log(newTotalCost);
			sessionStorage.setItem("totalCost", JSON.stringify(newTotalCost));
			document.location.reload();
		});
	}

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
}

displayPageCart(productInSessionStorage, totalCost);
displayCartItems(productInSessionStorage, totalCost);
