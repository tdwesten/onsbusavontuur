<template>
    <div class="spot-list" id="scroll-container" v-bind:class="{'spot-list--large': mapStatusIsSmall }">
        <div class="spot spot__startpoint">
            <div class="spot__content">
                <h4>Begin van ons avontuur</h4>
                <span class="spot__meta">
                        <span class="spot__meta__item spot__meta__item--timeago">26 april 2019</span>
                    </span>
            </div>
        </div>
        <div v-for="(spot, i ) in spots" :key="i" v-bind:id="spot.id">
            <spot :spot="spot" :isMobile="isMobile"/>
        </div>
    </div>
</template>

<script>
    import spot from './spot'

    export default {
        components: {
            spot
        },
        props: {
            mapStatusIsSmall: Boolean,
            isMobile: Boolean,
            spots: Array
        },
    };
</script>
