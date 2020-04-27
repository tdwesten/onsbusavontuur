<template>
    <div class="vue-page" v-bind:class="{ 'isLoaded' : spostsAreLoaded }">
        <app-header></app-header>
        <router-view></router-view>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import Header from "./components/header";

    export default {
        data() {
            return {
                loaded: false
            };
        },
        computed: {
            ...mapGetters( {
                spostsAreLoaded: 'spotsIsLoaded',
            } )
        },
        components: {
            appHeader: Header,
        },

        methods: {
            ...mapActions( [
                'selectSpot',
            ] ),
        },
        created() {
        },
        mounted() {
            this.loaded = true;
        }
    };
</script>
