<script lang="ts">
    import { MapLibre } from "svelte-maplibre";
    import { LngLat } from "maplibre-gl";

    // Traditional centre of London...
    const charingCross = new LngLat(-0.127641, 51.507478);
    const defaultZoom = 11;
</script>

<MapLibre
    style="https://api.maptiler.com/maps/dataviz-v4/style.json?key=AI9tRSBHilptTX23UJbv"
    standardControls
    center={charingCross}
    zoom={defaultZoom}
/>
