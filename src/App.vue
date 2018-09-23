<template>
  <b-container>
    <b-row class="header" align-h="between">
        <b-col cols="4">
          <h1>El Baratón</h1>
        </b-col>
        <b-col
          v-if="cart.length > 0"
          cols="4" 
          class="btn_container">
          <b-button variant="light" @click="onShowCartClick">
            Carrito <b-badge variant="light">{{this.cart.length}}</b-badge>
          </b-button>
        </b-col>
      </b-row>
    <div v-if="!showCart">
      <b-row>
        <b-col 	cols="12" lg="3">
          <tree-menu 
            :cur_item="item" 
            :showNode="true" 
            :categories="categories" 
            :depth="0" 
            :showChildren="false"
            @clicked-show-detail="clickedShowDetail"
            @search-item="onSerachItem"
            />
        </b-col>
        <b-col>
          <b-row>
            <b-col>
            <FilterBar 
              class="filter-bar"
              @filter-by-avaible="filterByAvaible"
              @filter-by-price="filterByPrice"
              @filter-by-stock="filterByStock"
              @order-by="orderBy"
              />
            </b-col>
          </b-row>
          <b-row>
            <ProductList 
            :products="products"
            :category="cur_category"
            :avaible_filter="avaible_filter"
            :price_filter="price_filter"
            :stock_filter="stock_filter"
            :search_filter="search_filter"
            @add-to-cart="onAddToCart"/>
          </b-row> 
        </b-col>
      </b-row>
    </div>
    <div v-if="showCart">
      <b-row>
        <CartItem 
          v-for="item in cart"
          :key="item.id"
          :item="item"
          @change-qt="changeCartQt"
          @delete-item="deleteCartItem"
        />
      </b-row>
      <b-row>
        <b-button 
          variant="light" 
          @click="onBackButton">
          Agregar mas productos  
        </b-button>
        <b-button 
          variant="primary" 
          @click="onPayButton"
          v-if="this.cart.length > 0">
          Pagar  
        </b-button>
      </b-row>
    </div>
  </b-container>
</template>

<script>
  import categories from "./assets/data/categories.json"
  import products from "./assets/data/products.json"
  import ProductList from "./components/ProductList.vue"
  import FilterBar from "./components/FilterBar.vue"
  import CartItem from "./components/CartItem.vue"
  export default {
    name: 'app',
    data(){
      return {
        'item': {
          'id': -1,
          'name' : "Categorías",
        },
        'showCart': false,
        'cart': [],
        'categories': categories.categories,
        'products': products.products,
        'original': null,
        'cur_category': 0,
        'avaible_filter': 'all',
        'price_filter': {
          'from': '',
          'to': ''
        },
        'stock_filter': {
          'type': 'big',
          'qt': 0
        },
        'search_filter': '',
        'order': 'none'
      }
    },
    created: function () {
      const $this_products = this.products;
      _.forEach(this.products, function(value, index) {
        $this_products[index]['number_price'] =  parseInt(value.price.replace("$", "").replace(",",""));
      });
      this.original = this.products;
    },
    mounted() {
      if (localStorage.cart) {
        try {
          this.cart = JSON.parse(localStorage.cart);
        } catch(e) {
          localStorage.removeItem('cart');
        }
      }
    },
    components: {
      ProductList,
      FilterBar,
      CartItem
    },
    methods: {
        clickedShowDetail(value) {
          this.search_filter = '';
          this.cur_category = value.id;
        },
        filterByAvaible(value) {
            this.avaible_filter = value;
        },
        filterByPrice(value) {
          this.price_filter = value;
        },
        filterByStock(value) {
          this.stock_filter = value;
        },
        orderBy(value) {
          this.order = value;

          if(this.order === 'none') {
           this.products = this.original;
          }
          if(this.order === 'available_yes') {
           this.products = _.orderBy(this.products, ['available'], ['desc']);
          }
          if(this.order === 'available_not') {
           this.products = _.orderBy(this.products, ['available'], ['asc']);
          }
          if(this.order === 'price_less') {
           this.products = _.orderBy(this.products, ['number_price'], ['asc']);
          }
          if(this.order === 'price_big') {
           this.products = _.orderBy(this.products, ['number_price'], ['desc']);
          }
          if(this.order === 'quantity_less') {
           this.products = _.orderBy(this.products, ['quantity'], ['asc']);
          }
          if(this.order === 'quantity_big') {
           this.products = _.orderBy(this.products, ['quantity'], ['desc']);
          }
        },
        onAddToCart(product){
          this.cart.push({
            'id': this.cart.length,
            'qt': 1,
            'product': product
          });

          this.persist();
        },
        onShowCartClick() {
          this.showCart = true;
        },
        onBackButton() {
          this.showCart = false;
          this.cur_category = -1;
        },
        onPayButton() {
          this.cart = [];
          this.persist();
          this.showCart = false;
        },
        changeCartQt(value) {
          this.cart[value.id].qt = value.qt;
          this.persist();
        },
        deleteCartItem(value) {
          this.cart.splice(value, 1);
          this.persist();
        },
        onSerachItem(value) {
          this.search_filter = value;
        },
        persist() {
          for(var i = 0; i<this.cart.length; i++) {
            this.cart[i].id = i;
          }
          localStorage.cart = JSON.stringify(this.cart);
        }
    }
  }
</script>

<style lang="stylus" scoped>
  .header
    padding 30px 0

  .filter-bar
    margin-bottom 20px

  .btn_container
    text-align right 
</style>
