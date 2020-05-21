<template>
  <div class="page-wrapper">
    <mapbox
      :spots="spots"
      :isMobile="isMobile()"
      @mapStatusIsSmall="mapStatusIsSmall = $event"
    />
    <list
      :spots="spots"
      :isMobile="isMobile()"
      :isScrolling="isScrolling"
      :mapStatusIsSmall="mapStatusIsSmall"
    ></list>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import list from "../components/list";
import map from "../components/map";
import * as types from "../store/mutation-types";

var VueScrollTo = require("vue-scrollto");

export default {
  components: {
    list: list,
    mapbox: map,
  },
  data() {
    return {
      mapStatusIsSmall: false,
      hh: "",
      isScrolling: false,
    };
  },
  methods: {
    ...mapActions(["getSpots", "selectSpot"]),
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    doneScrolling() {
      this.isScrolling = false;
      console.log(this.isScrolling);
    },
  },
  mounted() {
    this.getSpots();
  },
  computed: {
    ...mapGetters({
      spots: "getSpots",
      selectedSpot: "selectedSpot",
      spostsAreLoaded: "spotsIsLoaded",
    }),
  },
  created() {},
  watch: {
    selectedSpot: function(spot) {
      if (spot.event === types.MARKER_SELECT) {
        this.isScrolling = true;
        console.log(this.isScrolling);

        var scrollOptions = {
          container: "#scroll-container",
          easing: "ease-in",
          offset: -20,
          force: true,
          cancelable: true,
          onDone: this.doneScrolling,
          x: false,
          y: true,
        };

        VueScrollTo.scrollTo(
          document.querySelector("#" + spot.id),
          500,
          scrollOptions
        );
      }
    },
  },
};
</script>
