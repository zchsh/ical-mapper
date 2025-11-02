# Notes

## Webcal links

- I want something similar to `mailto:` or `tel:` links, but for calendar events, pretty sure this already exists
- Yep, it does, [Webcal - Wikipedia](https://en.wikipedia.org/wiki/Webcal)
- But, seems to support linking to a _file_, so less straightforward than `mailto:` or `tel:` for a single event...
- Could maybe base64 encode a single-event `.ics` file rather than a `webcal:` link? For example, `data:text/calendar;base64,<base64-encoded-ics-file-string>`
- Prior art in the commercial space, see [AddEvent](https://www.addevent.com/)
- Squarespace does this a bit, see for example <https://www.londoncyclelink.ca/events>, docs are at [Events pages – Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206543837-Events-pages)

## Marker clusters

- Event hosts will often have multiple events in the same location, and it's not uncommon for these events to overlap temporally. For example, museums typically have multiple concurrent exhibitions, library branches typically have multiple concurrent storytimes, etc.
- Marker "clusters" are a really common and recognizable solution to this problem
- [Leaflet.markercluster | Marker Clustering plugin for Leaflet](https://leaflet.github.io/Leaflet.markercluster/)

## Map styling

- Leaflet sources from OpenStreetMaps by default. OpenStreetMaps isn't really meant for public use, see their [Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/).
- Stamen Map Tiles has some really neat artistic effects, see for example [watercolour](https://maps.stamen.com/#watercolor/12/37.7706/-122.3782). Stadia Maps has a hosted version, see [Stamen Watercolor - Stadia Maps Documentation](https://docs.stadiamaps.com/map-styles/stamen-watercolor/), free up to 200,000 tiles per month.
- Alternatives exist out there for self-hosting... see for example [OpenMapTiles](https://openmaptiles.org/). There's a community-maintained list at [Raster tile providers - OpenStreetMap Wiki](https://wiki.openstreetmap.org/wiki/Raster_tile_providers).
