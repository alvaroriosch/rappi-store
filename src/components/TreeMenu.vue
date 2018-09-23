<template>
  <div class="tree-menu">
    <b-list-group >
        <b-list-group-item v-if="showNode" @click="onItemClick">{{ cur_item.name }}</b-list-group-item>
        <tree-menu
            class="menu-item"
            v-if="mustShow"
            v-for="item in categories" 
            :key="item.id"
            :cur_item="item" 
            :depth="depth + 1"
            :showChildren="false"
            :categories="item.sublevels"
            :showNode="true"
            @clicked-show-detail="clickedShowDetail"
            @search-item="onSearchEvent"/>
        <b-list-group-item
            v-if="categories == null && showSearch">
            <b-form-input 
                size="sm" 
                class="mr-sm-2" 
                type="text" 
                placeholder="buscar"
                v-model="search"
                />
            <b-button
                variant="light"
                @click="onTextChange">
                Buscar
            </b-button>
        </b-list-group-item>
    </b-list-group>
  </div>
</template>
<script>
  export default { 
    props: ['cur_item' , 'showNode', 'categories', 'depth', 'showChildren'],
    name: 'tree-menu',
    data () {
        return {
            mustShow: this.showChildren,
            search: '',
            showSearch: false
        };
    },
    methods: {
        onItemClick() {
            this.mustShow = !this.mustShow;
            this.showSearch = true;
            this.$emit('clicked-show-detail', {'id':this.cur_item.id, 'isShow': this.mustShow});
        },
        clickedShowDetail(value) {
            this.$emit('clicked-show-detail', value);
        },
        onTextChange() {
            this.$emit('search-item', this.search);
            this.search = '';
        },
        onSearchEvent(value) {
            this.$emit('search-item', value);
        }
    }
  }
</script>

<style lang="stylus" scoped>
    .menu-item
        padding-left 10px
</style>