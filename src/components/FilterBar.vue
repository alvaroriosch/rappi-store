<template>
    <div>
        
    <b-navbar toggleable="md" type="light">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

            <b-collapse is-nav id="nav_collapse">

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto filter-container">
                    <b-nav-item-dropdown text="Filtrar Por" right class="filter-select">
                        <b-dropdown-item href="#" @click="onFilterByAvaibleClick">Disponibilidad</b-dropdown-item>
                        <b-dropdown-item href="#" @click="onFilterByPriceClick">Rango de precios</b-dropdown-item>
                        <b-dropdown-item href="#" @click="onFilterByStockClick">Cantidad en stock</b-dropdown-item>
                    </b-nav-item-dropdown>

                    <b-form-select v-model="order" class="stock_select">
                        <option value="none" selected>Ordenar por ninguno</option>
                        <option value="available_yes">Primero disponibles</option>
                        <option value="available_not">Primero no disponibles</option>
                        <option value="price_less">Ordenar por menor precio</option>
                        <option value="price_big">Ordenar por mayor precio</option>
                        <option value="quantity_less">Ordenar por menor cantidad</option>
                        <option value="quantity_big">Ordenar por mayor cantidad</option>
                    </b-form-select>
                </b-navbar-nav>

            </b-collapse>
        </b-navbar>
        <b-row align-h="center">
            <b-nav-form v-if="showPriceRange">
                <b-form-input 
                    size="sm" 
                    class="mr-sm-2" 
                    type="text" 
                    placeholder="Desde $" 
                    v-model="lowerPrice"/>
                <b-form-input 
                    size="sm" 
                    class="mr-sm-2" 
                    type="text" 
                    placeholder="Hasta $" 
                    v-model="bigPrice"/>
                <b-button  
                    size="sm" 
                    class="my-2 my-sm-0" 
                    type="button"
                    @click="filterByPrice">
                    Buscar
                </b-button>
                <b-button  
                    size="sm" 
                    class="my-2 my-sm-0" 
                    type="button"
                    @click="clearByPrice">
                    Limpiar
                </b-button>
            </b-nav-form>
            <b-nav-form v-if="showAvaible">
                <b-form-radio-group id="radios" v-model="avaible" name="radioSubComponent">
                    <b-form-radio value="yes">Disponibles</b-form-radio>
                    <b-form-radio value="not">Agotados</b-form-radio>
                    <b-form-radio value="all">Todos</b-form-radio>
                </b-form-radio-group>
            </b-nav-form>
            <b-nav-form v-if="showStock">
                <b-form-select v-model="selected" class="stock_select">
                    <option value="big">Mayor a</option>
                    <option value="less">Menor a</option>
                    <option value="equal">Igual a</option>
                </b-form-select>
                <b-form-input 
                    size="sm" 
                    class="mr-sm-2" 
                    type="text" 
                    v-model="stockqt" 
                    placeholder="Cantidad en stock"/>
                <b-button 
                    size="sm" 
                    class="my-2 my-sm-0" 
                    @click="filterByStock">
                    Buscar
                </b-button>
                <b-button 
                    size="sm" 
                    class="my-2 my-sm-0" 
                    @click="clearByStock">
                    Limpiar
                </b-button>
            </b-nav-form>
        </b-row>
    </div>
</template>

<script>
export default {
    data(){
      return {
        'showPriceRange' : false,
        'showAvaible' : false,
        'showStock' : false,
        'selected': 'big',
        'avaible': 'all',
        'lowerPrice': '',
        'bigPrice': '',
        'stockqt': 0,
        'order': 'none'
        }
    },
    methods: {
        hideFilters() {
            this.showPriceRange = false;
            this.showAvaible = false;
            this.showStock = false;
        },
        onFilterByAvaibleClick() {
            this.hideFilters();
            this.showAvaible = true;
        },
        onFilterByStockClick() {
            this.hideFilters();
            this.showStock = true;
        },
        onFilterByPriceClick() {
            this.hideFilters();
            this.showPriceRange = true;
        },
        clickedShowDetail(value) {
            this.$emit('clicked-show-detail', value);
        },
        clearByPrice(event) {
            this.lowerPrice = '';
            this.bigPrice = '';
            this.$emit('filter-by-price', {
                'from': this.lowerPrice,
                'to': this.bigPrice
            });
            return false;
        },
        filterByPrice(event) {
            
            this.$emit('filter-by-price', {
                'from': this.lowerPrice,
                'to': this.bigPrice
            });

            return false;
        },
        clearByStock(event) {
            this.selected = 'big';
            this.stockqt = 0;
            this.$emit('filter-by-stock', {
                'type': this.selected,
                'qt': this.stockqt
            });

            return false;
        },
        filterByStock(event) {
            this.$emit('filter-by-stock', {
                'type': this.selected,
                'qt': this.stockqt
            });

            return false;
        }
    },
    watch: {
        avaible: function (newValue, oldValue) {
            this.$emit('filter-by-avaible', this.avaible);
        },
        order: function (newValue, oldValue) {
            this.$emit('order-by', this.order);
        },
  },
}
</script>

<style lang="stylus" scoped>
    .stock_select
        margin 0 10px
    .filter-container
        width 100%
    .filter-select
        width 50%
</style>
