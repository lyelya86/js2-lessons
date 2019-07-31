let filtration = {
    template:  `
                 <form action="#" class="search-form" @submit.prevent="filter">
                    <input type="text" class="search-field" v-model="userSearch">
                    <button class="btn-search" type="submit">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
    `,
    data () {
        return {
            userSearch: ''
        }
    },
    methods: {
        filter () {
            let regExp = new RegExp (this.userSearch, 'i')
			this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter (el => regExp.test (el.product_name))
		}
    }
}