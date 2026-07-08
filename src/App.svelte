<script lang="ts">
    import { MapLibre, Marker, Popup } from "svelte-maplibre";
    import { LngLat } from "maplibre-gl";
    const defaultCentre = new LngLat(-1.5, 53.5);
    const defaultZoom = 6;
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
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

<main>
    <div class="sidebar">
        <h1>Bubble Tea Map</h1>
        <p>
            This map collects bubble tea shops I've been to in the UK, plus a
            bunch of T4 shops I've not been to which I <i>might</i> one day check
            off.
        </p>

        <p>
            If you can't tell, <a href="https://www.t4.co.uk/" target="_blank"
                >T4</a
            > is my go-to for bubble tea. I think the quality is good (not the absolute
            best but I've rarely been disappointed), they're quite common in London,
            and the experience is consistent, which makes it a good reliable source
            for a treat.
        </p>

        <h2>FAQ</h2>
        <b>What's your standard order?</b>
        <p>Jasmine green milk tea, tapioca pearls, no ice, 0% or 25% sugar.</p>

        <b>What about the brown sugar milk tea shops?</b>
        <p>
            Way too sweet for my liking. I really don't enjoy it. If a shop only
            has brown sugar stuff and not normal milk tea, I won't go.
        </p>

        <b>How do you judge quality?</b>
        <p>
            Many of the descriptions have quite vague descriptions of quality.
            Personally, <i>most</i> of my rating is based on the tapioca pearls.
            In some places they're too soft / mushy, and in some places they're too
            hard.
        </p>

        <b>How do you spot a good bubble tea shop?</b>
        <p>
            Usually if it looks Taiwanese I'm willing to give it a go. If it has
            a name that actually means something in English, it's <i>probably</i
            > not right. Also, the menu shouldn't look too colourful.
        </p>

        <b>What's better than T4?</b>
        <p>
            Not much really! I do rate Milksha in Chinatown higher.
        </p>
    </div>
    <MapLibre
        class="map"
        style="https://api.maptiler.com/maps/dataviz-v4/style.json?key=AI9tRSBHilptTX23UJbv"
        standardControls
        center={defaultCentre}
        zoom={defaultZoom}
    >
        {#snippet children({ map })}
            {#each shops as shop}
                <Marker lngLat={shop.lngLat}>
                    <span
                        class={shop.lastVisited === null
                            ? "marker"
                            : "marker-visited"}
                    >
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
                                Last visit: {displayDateOrString(
                                    shop.lastVisited,
                                )}
                            </p>
                            {#if shop.comments}
                                <p class="popup-comments">
                                    {shop.comments}
                                </p>
                            {/if}
                        </div>
                    </Popup>
                </Marker>
            {/each}
        {/snippet}
    </MapLibre>
</main>

<style>
    @import url("https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,200..1000;1,200..1000&display=swap");

    :global(body) {
        margin: 0;
    }
    :global(*, *::before, *::after) {
        box-sizing: border-box;
        font-family: "Mulish", sans-serif;
    }
    main {
        display: flex;
        flex-direction: row;
        height: 100vh;
        width: 100vw;
    }
    div.sidebar {
        width: 350px;
        padding: 0 10px;
        background-color: #f5e6d3;
        border-right: 2px solid #505050;
        overflow-y: auto;
    }

    :global(.map) {
        flex: 1;
        height: 100%;
    }
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
        font-size: 1.5rem;
    }
    span.marker-visited {
        font-size: 2.5rem;
    }
    span.marker:hover,
    span.marker-visited:hover {
        cursor: pointer;
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
