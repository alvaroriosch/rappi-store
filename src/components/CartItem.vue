<template>
    <b-col cols="12">
    <b-card 
      :title="item.product.name"
      tag="article">
      <p class="card-text">
          <b-form-input 
            size="sm" 
            class="mr-sm-2" 
            type="number" 
            v-model="qt"/>
      </p>
      <b-button
        variant="danger"
        @click="onDeleteItemClick">
        ELIMINAR
      </b-button>
    </b-card>
    </b-col>
</template>
<script>
export default {
    props: ['item'],
    data () {
        return {
            qt: this.item.qt
        };
    },
    methods: {
        onDeleteItemClick(event) {
            this.$emit('delete-item',this.item.id);
        }
    },
    watch: {
        qt: function(newValue, oldValue){
            this.$emit('change-qt', {
                id: this.item.id,
                qt: this.qt
            });
        }
    }
}
</script>
