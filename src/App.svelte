<script lang="ts">
    import { MapLibre, Marker, Popup } from "svelte-maplibre";
    import { LngLat } from "maplibre-gl";
    const charingCross = new LngLat(-0.127641, 51.507478);
    const defaultZoom = 11;
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
    import { shops } from "./shops";

    function displayDateOrString(d: Date | string | null): string {
        if (d instanceof Date) {
            // "7 Mar 2025 (Sat)"
            const day = d.toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
            });
            const weekday = d.toLocaleDateString("en-GB", { weekday: "short" });
            return `${day} (${weekday})`;
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
                    offset={[0, -25]}
                    onopen={() =>
                        map.flyTo({
                            center: shop.lngLat,
                            zoom: Math.max(defaultZoom, map.getZoom()),
                            speed: 0.3,
                        })}
                >
                    <div class="popup-content">
                        <div class="popup-header">
                            <h3>{shop.name}</h3>
                            <span
                                ><a href={shop.address} target="_blank"
                                    >Google Maps
                                    <FontAwesomeIcon
                                        icon={faArrowUpRightFromSquare}
                                        size="1x"
                                    />
                                </a></span
                            >
                        </div>
                        <p>
                            Last visit: {displayDateOrString(shop.lastVisited)}
                        </p>
                        {#if shop.comments}
                            <p class="popup-comments">{shop.comments}</p>
                        {/if}
                    </div>
                </Popup>
            </Marker>
        {/each}
    {/snippet}
</MapLibre>

<style>
    :global(.maplibregl-popup-content) {
        padding: 8px 8px !important;
        border-radius: 5px;
        border: 3px solid #505050;
        background-color: #eaeaea;
        max-width: 300px;
    }
    :global(.maplibregl-popup-tip) {
        border-top-color: #505050 !important;
    }

    span.marker {
        font-size: 2.5rem;
    }

    div.popup-content {
        * {
            margin: 0;
        }
        p.popup-comments {
            margin-top: 10px;
        }
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
