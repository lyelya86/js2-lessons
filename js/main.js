//ФЭЙК ЭПИ
const image = 'https://placehold.it/200x150';
const cartImage = 'https://placehold.it/100x80';
const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses'

let app = new Vue ({
	el: '#app',
	data: {
		imgCatalog: 'https://placehold.it/200x150',
		cartCatalog: 'https://placehold.it/100x80',
		products: [],
		cart: [],
		catalogUrl: `/catalogData.json`,
		value: false,
		findText: '',
		filter: []
	},
	methods: {
		getJSON (url) {
			return fetch (url)
				.then (result => result.json ())
				.catch (error => {
					console.log (error)
			})
		}, 
		addProduct (product) {
			let find = this.cart.find (Cartproduct => Cartproduct.id_product === product.id_product)
			
			if (!find) {
				let Cartproduct = {
					product_name: product.product_name,
					id_product: product.id_product,
					price: product.price,
					quantity: 1
				}
				this.cart.push (Cartproduct)
			} else {
				find.quantity++
			}
		},
		chengeValue () {
			this.value === false ? this.value = true : this.value = false
		},
		removeProduct (product) {
			let find = this.cart.find (Cartproduct => Cartproduct.id_product === product.id_product)

			if (find.quantity > 1) {
				find.quantity--
			} else {
				this.cart.splice (this.cart.indexOf(find), 1)
			}
		},
		findProduct () {
	
			let reg = new RegExp (this.findText, 'i')

			this.products.forEach(product => {
				this.filter = this.products.filter(product => reg.test(product.product_name))
			})
		}
	}, 
	mounted () {
		this.getJSON(`${API_URL + this.catalogUrl}`)
			.then (data => {
				for (let el of data) {
					this.products.push (el)
					this.filter.push (el)
				}
			})
	}
})

// var userCart = [];

// class List {
// 	constructor (url, container) {
// 		this.container = container
// 		this.url = url
// 		this.goods = []
// 		this.allProducts = []
// 		//this.filtered = [];
// 		this._init ()
// 	}
// 	_init () {
// 		return false
// 	}
// 	getJSON (url) {
// 		return fetch (url ? url : `${API + this.url}`)
// 			.then (result => result.json ())
// 			.catch (error => {
// 				console.log (error)
// 			})
// 	}
// 	handleData (data) {
// 		this.goods = [...data]
// 		this.render ()
// 	}
// 	render () {
// 		const block = document.querySelector (this.container)
		
// 		for (let product of this.goods) {
// 			const prod = new lists[this.constructor.name] (product)
// 			this.allProducts.push (prod)
// 			block.insertAdjacentHTML ('beforeend', prod.render())
// 		}
// 	}
// }

// class Item {
// 	constructor (el, img = 'https://placehold.it/200x150') {
// 		this.product_name = el.product_name
// 		this.id_product = el.id_product
// 		this.price = el.price
// 		this.img = img
// 	}
// 	render () {
// 		return `<div class="product-item" data-id=${this.id_product}>
//                         <img src="${this.img}" alt="Some img">
//                         <div class="desc">
//                             <h3>${this.product_name}</h3>
//                             <p>${this.price} $</p>
//                             <button class="buy-btn" 
//                             data-name="${this.product_name}"
//                             data-image="${this.img}"
// 							data-price="${this.price}"
// 							data-id="${this.id_product}">Купить</button>
//                         </div>
//                     </div>`
// 	}
// }

// class ProductItem extends Item {} //все записано в родительский класс и более ничего не надо

// class CartItem extends Item {
// 	constructor (el, img = 'https://placehold.it/100x80') {
// 		super (el, img)
// 		this.quantity = el.quantity
// 	}
// 	render () {
// 		return `<div class="cart-item" data-id="${this.id_product}">  
// 				<div class="product-bio">
// 					<img src="${this.img}" alt="Some image">
// 					<div class="product-desc">
// 						<p class="product-title">${this.product_name}</p>
// 						<p class="product-quantity">Quantity: ${this.quantity}</p>
// 						<p class="product-single-price">$${this.price} each</p>
// 					</div>
// 				</div>
// 				<div class="right-block">
// 					<p class="product-price">${this.quantity * this.price}</p>
// 					<button class="del-btn" data-id="${this.id_product}">&times;</button>
// 				</div>
// 			</div>`
// 	}
// }

// class ProductsList extends List {
// 	constructor (cart, url = '/catalogData.json', container = '.products') {
// 		super (url, container);
// 		this.cart = cart;
// 		this.getJSON()
// 			.then (data => this.handleData(data))
// 	}
// 	_init () {
// 		document.querySelector(this.container).addEventListener('click', evt => {
// 			if (evt.target.classList.contains('buy-btn')) {
// 				evt.preventDefault()
// 				this.cart.addProduct (evt.target)
// 			}
// 		})
// 	}
// }

// class Cart extends List {
// 	constructor (url = '/getBasket.json', container = '.cart-block') {
// 		super (url, container);
// 		this.getJSON()
// 			.then (data => this.handleData(data.contents))
// 	}
// 	addProduct (element) {
// 		this.getJSON (`${API}/addToBasket.json`)
// 			.then (data => {
// 				if (data.result) {
// 					let productId = +element.dataset['id'];
// 					let find = this.allProducts.find (product => product.id_product === productId)

// 					if (!find) {
// 						let product = {
// 							product_name: element.dataset['name'],
// 							id_product: productId,
// 							price: +element.dataset['price'],
// 							quantity: 1
// 						}
// 						this.goods = [product];
//                         this.render()
// 					} else {
// 						find.quantity++
// 						this._updateCart(find)
// 					}
// 				} else {
// 					debugger
// 					console.log ('err')
// 				}
// 			})
// 	}
// 	removeProduct (element) {
// 		this.getJSON (`${API}/deleteFromBasket.json`)
// 			.then (data => {
// 				if (data.result) {
// 					let productId = +element.dataset['id'];
// 					let find = this.allProducts.find (product => product.id_product === productId)

// 					if (find.quantity > 1) {
// 						find.quantity--
// 						this._updateCart(find)
// 					} else {
// 						this.allProducts.splice (this.allProducts.indexOf(find), 1)
// 						document.querySelector (`.cart-item[data-id="${productId}"]`).remove ()
// 					}
// 				} else {
// 					console.log ('err')
// 				}
// 			})
// 	}
// 	_updateCart (product) {
// 		let block = document.querySelector(`.cart-item[data-id="${product.id_product}"]`)
// 		block.querySelector('.product-quantity').textContent = `Quantity: ${product.quantity}`
// 		block.querySelector('.product-price').textContent = `${product.quantity} * ${product.price}`
// 	}
// 	_init () {
// 		document.querySelector(this.container).addEventListener('click', evt => {
// 			if (evt.target.classList.contains('del-btn')) {
// 				this.removeProduct (evt.target)
// 			}
// 		})
// 	}
// }

// let lists = {
// 	ProductsList: ProductItem,
// 	Cart: CartItem
// }

// let cart = new Cart ();
// let products = new ProductsList (cart)

// document.querySelector ('.btn-cart').addEventListener ('click', () => {
// 	document.querySelector ('.cart-block').classList.toggle ('invisible')
// })