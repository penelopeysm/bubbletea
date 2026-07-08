import rawShops from "./data.json";
import { LngLat } from "maplibre-gl";

interface RawShop {
    lngLat: [number, number];
    name: string;
    address: string;
    lastVisited: string;
    comments: string;
}

export interface Shop {
    lngLat: LngLat;
    name: string;
    address: string;
    // Date = known date
    // String = unknown date but I have been there before
    // null = never visited
    lastVisited: Date | string | null;
    comments: string
}

function parseDate(dateString: string): Date | string | null {
    // check if it's YYYY-MM-DD
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return new Date(dateString);
    } else if (dateString === "") {
        return null;
    } else {
        return dateString;

    }
}

function toShop(shop: RawShop): Shop {
    return {
        lastVisited: parseDate(shop.lastVisited),
        name: shop.name,
        address: shop.address,
        lngLat: new LngLat(shop.lngLat[0], shop.lngLat[1]),
        comments: shop.comments,
    }
}

export const shops: Shop[] = rawShops.map(toShop);
