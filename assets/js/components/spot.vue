<template>
    <div
            class="spot"
            @click="selectSpot(spot)"
            v-bind:class="{'spot--is-active' : spot.isActive }"
            v-observe-visibility="{
            callback: visibilityChanged,
            intersection: {
                root: rootElm,
                rootMargin: rootMargin,
                threshold: threshold,
            },
        }"
    >
        <div class="spot__content">
            <h2 class="spot__title" v-html="spot.title"></h2>
            <span class="spot__meta">
                <span class="spot__meta__item--timeago">{{spot.date | moment('timezone', spot.timezone_id, 'LLLL')}}</span> <a href="https://www.instagram.com/explore/tags/waarsliepenwe/" target="_blank" v-if="'spot' === spot.type">#waarsliepenwe</a>
            </span>
            <div :inner-html.prop="spot.description | formatDescription"></div>
            <img v-if="spot.photo" v-lazy="'/dist/images/' + spot.photo">
        </div>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";
    import * as types from '../store/mutation-types'


    export default {
        data: function () {
            return {
                rootElm: document.getElementById('scroll-container'),
                rootMargin: this.isMobile ? '10px' : '30px',
                threshold: this.isMobile ? 0.3 : 1,

            };
        },
        props: {
            spot: Object,
            isMobile: Boolean
        },
        computed: {
            ...mapGetters( {
                selectedSpot: 'selectedSpot',
                spotsIsLoaded: 'spotsIsLoaded'
            } )
        },
        methods: {
            ...mapActions( [ 'selectSpot' ] ),
            visibilityChanged( isVisible, entry ) {
                if ( isVisible ) {
                    this.spot.event = types.SPOT_SCROLL;
                    this.selectSpot( this.spot );
                }
            }
        },
        mounted() {
        },
    };
</script>
