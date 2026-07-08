<script lang="ts">
    import { MapLibre, DefaultMarker, Popup } from "svelte-maplibre";
    import { LngLat } from "maplibre-gl";
    const charingCross = new LngLat(-0.127641, 51.507478);
    const defaultZoom = 11;

    import { shops } from "./shops";

    import { onMount } from "svelte";
    onMount(() => {
        console.log("Shops data:", shops);
    });

    function displayDateOrString(d: Date | string): string {
        if (d instanceof Date) {
            return d.toDateString();
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
    {#each shops as shop}
        <DefaultMarker lngLat={shop.lngLat}>
            <Popup offset={[0, -10]}>
                <div class="popup-content">
                    <h3>{shop.name}</h3>
                    <p>{shop.address}</p>
                    <p>Last visited: {displayDateOrString(shop.lastVisited)}</p>
                    {#if shop.comments}
                        <p>{shop.comments}</p>
                    {/if}
                </div>
            </Popup>
        </DefaultMarker>
    {/each}
</MapLibre>

<style>
    :global(.maplibregl-popup-content) {
        padding: 0px 0px !important;
    }

    div.popup-content > * {
        margin: 0;
    }
</style>
