<template>
  <b-col cols="12" lg="4">
    <b-card 
      :title="product.name"
      tag="article"
      class="product_card">
      <p class="card-text">
        {{product.price}}
      </p>
      <p class="card-text">
        Cantidad: {{product.quantity}}
      </p>
      <b-button 
        v-if="product.available" 
        @click="onAddToCartClick" 
        variant="primary">
        AGREGAR
      </b-button>
      <p class="card-text" v-if="!product.available">
        Producto no disponible
      </p>
    </b-card>
  </b-col>
</template>

<script>
export default {
  props: ['product' ],
  methods: {
    onAddToCartClick(event) {
      this.$emit('add-to-cart', this.product);
    }
  }
}
</script>

<style lang="stylus" scoped>
  .product_card
    margin-bottom 10px
</style>
