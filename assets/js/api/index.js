export default {
    getRoute( cb ) {
        axios
        .get( '/api/route.json' )
        .then( response => {
            cb( response.data.data );
        } )
        .catch( e => {
            cb( e );
        } );
    },
    getSpots( cb ) {
        axios
        .get( '/api/spots.json' )
        .then( response => {
            cb( response.data.data );
        } )
        .catch( e => {
            cb( e );
        } );
    },
};
