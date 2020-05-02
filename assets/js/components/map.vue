<template>
    <div class="map__wrapper" v-bind:class="{ 'map__wrapper--small' : mapStatusIsSmall }">
        <div class="map__toggle" @click="toggleMapStatus" v-bind:class="{'map__toggle--min': mapStatusIsSmall }"></div>
        <MglMap
                :accessToken="accessToken"
                :mapStyle="mapStyle"
                :center="coordinates"
                :zoom="zoom"
                @load="mapLoaded"
        >
            <MglMarker :coordinates="spot.lngLat" v-for="(spot, i ) in spots" :key="spot.id">
                <div slot="marker" class="map-marker">
                    <div class="marker__inner" :class="addMarkerClass(spot)" @click="markerClick(spot)"></div>
                </div>
            </MglMarker>
            <MglGeojsonLayer
                    :sourceId="sourceId"
                    :layerId="sourceId"
                    :source="geoJsonSource"
                    :layer="geoJsonlayer"
            />
        </MglMap>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from "vuex";
    import Mapbox from "mapbox-gl";
    import { MglGeojsonLayer, MglMap, MglMarker } from "vue-mapbox";
    import api from "../api";
    import * as types from '../store/mutation-types'

    export default {
        data() {
            return {
                mapStyle: 'mapbox://styles/mapbox/outdoors-v11', // your map style,
                accessToken: 'pk.eyJ1IjoidGR3ZXN0ZW4iLCJhIjoiY2s0cjZzY2dpMG1ncjNtcDU1c2djZmFtMSJ9.LNcjlixQe9Kn4DkKRmxlhQ',
                zoom: 4.495578765572238,
                coordinates: [ 9.751846206610026, 45.61256818447109 ],
                geoJsonSource: false,
                geoJsonlayer: {
                    'id': 'route',
                    'type': 'line',
                    'source': 'route',
                    'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#dc5443',
                        'line-width': 2
                    },
                },
                sourceId: 'route',
                asyncActions: false,
                route: [],
                mapStatusIsSmall: false,
            };
        },
        computed: {
            ...mapGetters( { selectedSpot: 'selectedSpot' } )
        },
        props: {
            spots: Array,
            isMobile: Boolean,
        },
        components: {
            MglMap,
            MglMarker,
            MglGeojsonLayer
        },
        methods: {
            ...mapActions( [ 'selectSpot' ] ),
            mapLoaded( map ) {
                this.map = map;
            },
            toggleMapStatus() {
                if ( typeof this.map === 'object' ) {
                    this.mapStatusIsSmall = !this.mapStatusIsSmall;
                    this.$emit( 'mapStatusIsSmall', this.mapStatusIsSmall );

                    setTimeout( () => {
                        this.map.map.resize();
                    }, 300 );
                }
            },
            addMarkerClass: function ( spot ) {
                var elmClass = 'map-marker--' + spot.type;
                if ( spot.isActive ) {
                    elmClass = elmClass + ' ' + 'map-marker--active';
                }

                return elmClass;

            },
            markerClick( spot ) {
                spot.event = types.MARKER_SELECT;

                this.selectSpot( spot );
            },
            addRouteToMap: function () {
                api.getRoute( route => {
                    this.geoJsonSource = {
                        'type': 'geojson',
                        'data': {
                            'type': 'Feature',
                            'properties': {},
                            'geometry': {
                                'type': 'LineString',
                                'coordinates': route
                            }
                        }
                    };
                } );
            },
        },
        mounted() {
            this.addRouteToMap();
        },
        created() {
            this.mapbox = Mapbox;

            if ( this.isMobile ) {
                this.zoom = 2.75;
            }
        },
        watch: {
            selectedSpot: function ( spot ) {
                if ( typeof this.map === 'object' && spot.event === types.SPOT_SCROLL ) {
                    this.map.map.flyTo( {
                        center: spot.lngLat,
                        zoom: this.isMobile ? 8 : 9,
                        speed: 1
                    } );
                }
            },
        }

    };
</script>
