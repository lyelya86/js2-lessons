class Hamburger {
	
	constructor(size, stuffing, plus) {
		this.size = size
		this.stuffing = stuffing
		this.plus = plus
		this._getCost ()
		this._getCalories ()
	}

	_getSum(arr) {
		let sum = arr[this.size] + arr[this.stuffing]
	
		for (let i = 0; i < this.plus.length; i++) {
			if (arr[this.plus[i]]) {
				sum += arr[this.plus[i]]
			}
		}
		return sum
	}

	_show(container, num) {
		const block = document.querySelector(container)
		block.innerText = num
	}
	
	_getCost() {
		const cost = {
			small: 50,
			big: 100,
			cheese: 10,
			salad: 20,
			potatoes: 15,
			flavoring: 15,
			mayo: 20
		}

		const container = '.cost'

		this._show(container, this._getSum(cost)) 
	}
	
	_getCalories () {
		const calories = {
			small: 20,
			big: 40,
			cheese: 20,
			salad: 5,
			potatoes: 10,
			flavoring: 0,
			mayo: 5
		}
		
		const container = '.calories'

		this._show(container, this._getSum(calories)) 
	}
}


document.querySelector('button').addEventListener('click', function() {
	let size =''
	let stuffing =''
	let plus = []
	event.preventDefault()

	document.querySelectorAll('input[name="size"]').forEach(function(el) {
		if (el.checked) {
			size = el.getAttribute('id')
		}
		
	})

	document.querySelectorAll('input[name="stuffing"]').forEach(function(el) {
		if (el.checked) {
			stuffing = el.getAttribute('id')
		}
		
	})
	
	document.querySelectorAll('input[name="plus"]').forEach(function(el) {
		if (el.checked) {
			 plus.push(el.getAttribute('id'))
		}
		
	})

	let myBurger = new Hamburger(size, stuffing, plus)
})