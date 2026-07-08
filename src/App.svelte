<script lang="ts">
    import { MapLibre, Marker, Popup } from "svelte-maplibre";
    import { LngLat } from "maplibre-gl";
    const charingCross = new LngLat(-0.127641, 51.507478);
    const defaultZoom = 11;

    import { shops } from "./shops";

    function displayDateOrString(d: Date | string | null): string {
        if (d instanceof Date) {
            return d.toDateString();
        } else if (d === null) {
            return "Never";
        } else {
            return d;
        }
    }
</script>

<MapLibre
    style="https://api.maptiler.com/maps/dataviz-v4/style.json?key=AI9tRSBHilptTX23UJbv"
    standardControls
    center={charingCross}
    zoom={defaultZoom}
>
    {#snippet children({ map })}
        {#each shops as shop}
            <Marker lngLat={shop.lngLat}>
                <span class="marker">
                    {shop.lastVisited === null ? "👀" : "🧋"}
                </span>

                <Popup
                    offset={[0, -10]}
                    onopen={() =>
                        map.flyTo({
                            center: shop.lngLat,
                            zoom: Math.max(12, map.getZoom()),
                            speed: 0.5,
                        })}
                >
                    <div class="popup-content">
                        <div class="popup-header">
                            <h3>{shop.name}</h3>
                            <span><a href={shop.address}>Google Maps</a></span>
                        </div>
                        <p>
                            Last visit: {displayDateOrString(shop.lastVisited)}
                        </p>
                        {#if shop.comments}
                            <p>{shop.comments}</p>
                        {/if}
                    </div>
                </Popup>
            </Marker>
        {/each}
    {/snippet}
</MapLibre>

<style>
    :global(.maplibregl-popup-content) {
        padding: 0px 0px !important;
    }

    span.marker {
        font-size: 2.5rem;
    }

    div.popup-content > p {
        margin: 0;
    }

    div.popup-header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;

        * {
            margin: 0;
        }

        h3 {
            margin-right: 20px;
        }
    }
</style>
