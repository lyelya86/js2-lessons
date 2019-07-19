//заглушки (имитация базы данных)
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

function makeGETRequest(url, callback) {
	let xhr;
  
	if (window.XMLHttpRequest) {
	  xhr = new XMLHttpRequest();
	} else if (window.ActiveXObject) { 
	  xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
  
	xhr.onreadystatechange = function () {
	  if (xhr.readyState === 4) {
		callback(xhr.responseText);
	  }
	}
  
	xhr.open('GET', url, true);
	xhr.send();
}

//Глобальные сущности 
var userCart = [];

// Hardcore Henry
class List {
	constructor (container) {
		this.container = container
		this.goods = []
		this._init ()
		this.allProducts = []
	}

	_init () {
		return false
	}
	_render () {
		const block = document.querySelector (this.container)
		for (let product of this.goods) {
			const prod = new lists[this.constructor.name] (product)
			this.allProducts.push (prod)
			block.insertAdjacentHTML ('beforeend', prod.render())
		}
	}
}

class ProductsList extends List {
	constructor (container = '.products') {
		super (container)
	}


	// Почему то мой json не парсит https://raw.githubusercontent.com/lyelya86/json/master/catalogData.json
	// Подскажите почему? в апи вставляла только https://raw.githubusercontent.com/lyelya86/json/master
	fetchGoods () {
		makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
			this.goods = JSON.parse(goods);
			this._render ()
		})
	}
}

// class Cart extends List {
// 	constructor (container = '.cart-block') {
// 		super (container)
// 		super (handleData (userCart))
// 	}

// 	addProduct (product) { 
// 		let productId = +product.dataset['id']; //у кнопки получаем атрибут id товара, который хотим добавить, приводим к числу
// 		let find = userCart.find (element => element.id === productId) // ищем в массиве корзины объект с id добавляемого товара
// 		//либо find = userCart [?] (obj) || false
	
// 		if (!find) {  // если не находим, в массив корзины добавляем объект с информацией о товаре
// 			userCart.push ({
// 				name: product.dataset['name'],
// 				id: productId,
// 				img: cartImage,
// 				price: +product.dataset['price'],
// 				quantity: 1
// 			})
// 		} else {  // если находим, в объекте с информацией о товаре увеличиваем количество на 1
// 			find.quantity++
// 		}
// 		renderCart ();  // вызываем функцию, создающую корзину
// 	}	
// }

class Item {
	constructor (el, img = 'https://placehold.it/200x150') {
		this.product_name = el.product_name
		this.price = el.price
		this.id_product = el.id
		this.img = img
	}
	render () {
		return `<div class="product-item" data-id=${this.id_product}>
                        <img src="${this.img}" alt="Some img">
                        <div class="desc">
                            <h3>${this.product_name}</h3>
                            <p>${this.price} $</p>
                            <button class="buy-btn" 
                            data-name="${this.product_name}"
                            data-image="${this.img}"
							data-price="${this.price}"
							data-id="${this.id_product}">Купить</button>
                        </div>
                    </div>`
	}
}

class ProductItem extends Item {
	//все записано в родительский класс и более ничего не надо
}

// class CartItem extends Item {
// 	//+дополнительные корзинные штуки

// 	constructor (el, img = cartImage) {
// 		super (img)
// 	}

// 	render () {
// 		return `<div class="cart-item" data-id="${this.id_product}">  
// 				<div class="product-bio">
// 					<img src="${this.img}" alt="Some image">
// 					<div class="product-desc">
// 						<p class="product-title">${this.product_name}</p>
// 						<p class="product-quantity">Quantity: ${item.quantity}</p>
// 						<p class="product-single-price">$${this.price} each</p>
// 					</div>
// 				</div>
// 				<div class="right-block">
// 					<p class="product-price">${item.quantity * this.price}</p>
// 					<button class="del-btn" data-id="${this.id_product}">&times;</button>
// 				</div>
// 			</div>`
// 	}
// }

// ИЗИ СПОСОБ
class Cart {
	constructor (container = '.cart-block') {
		this.container = container
		this.goods = []
		this._init ()
		this.allProducts = []
	}
	handleData (data) {
		this.goods = [...data]
		this._render ()
	}
	_init () {
		return false
	}	
	
	_render () {
		const block = document.querySelector (this.container)
		let blockcontent =''
		for (let product of this.goods) {
			const prod = new lists[this.constructor.name] (product)
			this.allProducts.push (prod)
			blockcontent += prod.render()
		}
		block.innerHTML = blockcontent
	}

	addProduct (product) { 
		let productId = +product.dataset['id']; //у кнопки получаем атрибут id товара, который хотим добавить, приводим к числу
		let find = userCart.find (element => element.id === productId) // ищем в массиве корзины объект с id добавляемого товара
		//либо find = userCart [?] (obj) || false

		if (!find) {  // если не находим, в массив корзины добавляем объект с информацией о товаре
			userCart.push ({
				title: product.dataset['name'],
				id: productId,
				img: cartImage,
				price: +product.dataset['price'],
				quantity: 1
			})
		} else {  // если находим, в объекте с информацией о товаре увеличиваем количество на 1
			find.quantity++
		}
		this.handleData (userCart)
	}	

	removeProduct (product) {
		let productId = +product.dataset['id']; //у кнопки получаем атрибут id товара, который хотим удалить из корзины, приводим к числу
		let find = userCart.find (element => element.id === productId) // ищем в массиве корзины объект с id удаляемого товара
		//либо find = userCart [?] (obj) || false
	
		if (find.quantity > 1) {  //если количество товаров в объекте больше 1, уменьшаем количество на 1
			find.quantity--
		} else {  // если товар один
			userCart.splice (userCart.indexOf(find), 1); // indexOf(find) - получаем индекс удаляемого объекта в массиве корзины, удаляем объект из корзины
			document.querySelector (`.cart-item[data-id="${productId}"]`).remove () //удаляем со страницы из корзины элемент с классом cart-item и атрибутом data-id равному  id товара, который хотим удалить из корзины
		}
		this.handleData (userCart)
	}
}

class CartItem {
	constructor (el, img = 'https://placehold.it/100x80') {
		this.product_name = el.title
		this.price = el.price
		this.id_product = el.id
		this.quantity = el.quantity
		this.img = img
	}
	render () {
		return `<div class="cart-item" data-id="${this.id_product}">  
				<div class="product-bio">
					<img src="${this.img }" alt="Some image">
					<div class="product-desc">
						<p class="product-title">${this.product_name}</p>
						<p class="product-quantity">Quantity: ${this.quantity}</p>
						<p class="product-single-price">$${this.price} each</p>
					</div>
				</div>
				<div class="right-block">
					<p class="product-price">${this.quantity * this.price}</p>
					<button class="del-btn" data-id="${this.id_product}">&times;</button>
				</div>
			</div>`
	}
}

//словарик
let lists = {
	ProductsList: ProductItem,
	Cart: CartItem
} 



document.querySelector ('.btn-cart').addEventListener ('click', () => {
	document.querySelector ('.cart-block').classList.toggle ('invisible')
})

document.querySelector ('.products').addEventListener ('click', (evt) => {
	if (evt.target.classList.contains ('buy-btn')) {
		cart.addProduct (evt.target);
	}
})

document.querySelector ('.cart-block').addEventListener ('click', (evt) => {
	if (evt.target.classList.contains ('del-btn')) {
		cart.removeProduct (evt.target);
	}
})

let list = new ProductsList ()
list.fetchGoods ()
let cart = new Cart()