<template>
    <div class="page-wrapper" v-bind:style="hh">
        <mapbox
                :spots="spots"
                :isMobile="isMobile()"
                @mapStatusIsSmall="mapStatusIsSmall = $event"
        />
        <list :spots="spots" :isMobile="isMobile()" :mapStatusIsSmall="mapStatusIsSmall"></list>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import list from "../components/list";
    import map from "../components/map";
    import * as types from '../store/mutation-types'

    var VueScrollTo = require( 'vue-scrollto' );

    var scrollOptions = {
        container: '#scroll-container',
        easing: 'ease-in',
        offset: -10,
        force: true,
        cancelable: true,
        x: false,
        y: true
    };

    export default {
        components: {
            "list": list,
            "mapbox": map,
        },
        data() {
            return {
                mapStatusIsSmall: false,
                hh: '',
            };
        },
        methods: {
            ...mapActions( [
                'getSpots',
                'selectSpot',
            ] ),
            headerHeight() {
                var header = document.querySelectorAll( 'header' )[ 0 ];
                console.log( header );
                var height = header.offsetHeight(true);

                this.hh = 'margin-top: ' + height + 'px';

            },
            isMobile() {
                if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent ) ) {
                    return true
                } else {
                    return false
                }
            },
        },
        mounted() {
            this.getSpots();
            this.headerHeight();
        },
        computed: {
            ...mapGetters( {
                spots: "getSpots",
                selectedSpot: 'selectedSpot',
                spostsAreLoaded: 'spotsIsLoaded',
            } ),
        },
        created() {},
        watch: {
            selectedSpot: function ( spot ) {
                if ( spot.event === types.MARKER_SELECT ) {
                    VueScrollTo.scrollTo( document.querySelector( '#' + spot.id ), 500, scrollOptions )
                }
            },
        }
    };
</script>
