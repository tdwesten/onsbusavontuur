import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
    spots: [],
    spotsIsLoaded: false,
    selectedSpot: false
};

// getters
const getters = {
    getSpots: state => state.spots,
    spotsIsLoaded: state => state.spotsIsLoaded,
    selectedSpot: state => state.selectedSpot,
};

// actions
const actions = {
    getSpots( { commit } ) {
        api.getSpots( spots => {
            commit( types.STORE_FETCHED_SPOTS, { spots } );
            commit( types.SPOTS_LOADED, true );
        } )
    },
    selectSpot( { commit, state }, spot ) {
        if ( state.selectedSpot ) {
            commit( types.TOGGLE_SPOT_ACTIVE_STATE, state.selectedSpot );
        }
        
        commit( types.TOGGLE_SPOT_ACTIVE_STATE, spot );
        commit( types.STORE_SELECTED_SPOT, spot );
    },
};

// mutations
const mutations = {
    [ types.STORE_FETCHED_SPOTS ]( state, { spots } ) {
        state.spots = spots
    },
    [ types.STORE_SELECTED_SPOT ]( state, spot ) {
        if ( spot ) {
            state.selectedSpot = spot
        }
    },
    [ types.TOGGLE_SPOT_ACTIVE_STATE ]( state, spot ) {
        
        if ( spot ) {
         
            if ( 'object' !== typeof spot ) {
                spot = _.find( state.spots, { id: spot } );
            }
            
            var index = _.findIndex( state.spots, function ( o ) { return o.id === spot.id; } );
            Object.assign( state.spots[ index ], { isActive: !spot.isActive } );
        }
    },
    [ types.SPOTS_LOADED ]( state, val ) {
        state.spotsIsLoaded = val
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
