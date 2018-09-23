<template>
    <b-container class="bv-example-row">
        <b-row> 
        <Product 
            v-for="product in products"
            v-if="showItem(product)"
            :key="product.id"
            :product="product"
            @add-to-cart="onAddToCart"/>
        </b-row>
    </b-container>
</template>

<script>
import Product from "./Product"
export default {
    props: [
        'products', 
        'category', 
        'avaible_filter', 
        'price_filter',
        'stock_filter',
        'search_filter'
    ],
    components: {
        Product
    },
    methods: {
        showItem(product) {
            if(product.sublevel_id === this.category
                && this.showByAvaibleFilter(product.available)
                && this.showByPriceFilter(product.number_price)
                && this.showByStock(product.quantity)
                && this.showBySearchFilter(product.name)
                ) {
                return true;
            }
            
            return false;
        },

        showByAvaibleFilter(avaible) {
            if(this.avaible_filter === 'all') {
                return true;
            }

            if(this.avaible_filter === 'yes' && avaible) {
                return true;
            }

            if(this.avaible_filter === 'not' && !avaible) {
                return true;
            }

            return false;
        },
        showByPriceFilter(price_number) {

            if(this.price_filter.from === '' && this.price_filter.to === '') {
                return true;
            }

            if( this.price_filter.from <= price_number && this.price_filter.to >= price_number ){
                return true;
            }

            return false;
        },
        showByStock(quantity) {
            
            if( this.stock_filter.type === "less" && this.stock_filter.qt > quantity) {
                return true;
            }

            if( this.stock_filter.type === "big" && this.stock_filter.qt < quantity) {
                return true;
            }

            if( this.stock_filter.type === "equal" && this.stock_filter.qt == quantity) {
                return true;
            }

            return false;
        },
        showBySearchFilter(name) {
            if(this.search_filter.trim() === '') {
                return true;
            }
            if(name.search(this.search_filter.trim()) != -1 ) {
                return true;
            } 
            return false;
        },
        onAddToCart(value) {
            this.$emit('add-to-cart', value);
        }
    }

}
</script>

<style lang="stylus" scoped>

</style>
