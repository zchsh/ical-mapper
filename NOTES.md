# Notes

## Next steps

### Split for clear boundary between ICS generation and map viewer

- Idea is this is a "reader" app that would consume `.ics` files... but currently, defined events inline cause it was easier
- Start with script that generates some `.ics` files. [zchsh/calendar-from-text-file](https://github.com/zchsh/calendar-from-text-file) probably usefule here. Make one text file per event host.
- Then get viewer app to read in one of those `.ics` files.
- Later, get viewer app to start with zero events. Drag and drop `.ics` file, or paste `.ics` file URL, to start viewing events.
- [kewisch/ical.js: Javascript parser for ics (rfc5545) and vcard (rfc6350) data](https://github.com/kewisch/ical.js/?tab=readme-ov-file) will probably be useful

### Date filtering

- "Events in the next thirty days" feels like a great starting point
- Could add more refined date filtering controls...

## Basic ideas

These are ideas that feel pretty important to make an iCalendar map-based viewer useful. I'm hopeful I can get these implemented in a rough prototype.

### Show marker clusters for geographically adjacent events

- Event hosts will often have multiple events in the same location, and it's not uncommon for these events to overlap temporally. For example, museums typically have multiple concurrent exhibitions, library branches typically have multiple concurrent storytimes, etc.
- As-is, these markers appear right on top of each other, and it's really hard to distinguish between them. This issue is exacerbated when users are zoomed farther out in the map view.
- Marker "clusters" are a really common and recognizable pattern that helps to mitigate this problem
- Looks like there's a plugin for Leaflet, see [Leaflet.markercluster | Marker Clustering plugin for Leaflet](https://leaflet.github.io/Leaflet.markercluster/). Demo here: <https://leaflet.github.io/Leaflet.markercluster/example/marker-clustering-realworld.388.html>
- Alternative to "clustering" which may actually be more what I'm looking for: [jawj/OverlappingMarkerSpiderfier-Leaflet: Deals with overlapping markers in the Leaflet maps API, Google Earth-style](https://github.com/jawj/OverlappingMarkerSpiderfier-Leaflet/). However, demo is broken, so who knows.
- Yet another option is to approach the problem a little differently... some locations could have _many_ events, so many that a "cluster" or "spidering" approach of the location marker wouldn't make sense anyways. With this in mind... maybe there's some "duplicate location tolerance" setting, and within a certain distance (say 10 metres or something), calendar events are considered to be in the same location, and a _single_ map marker gets added. Of course, would need UI to clearly show this map marker represents multiple events. This may be a more robust solution than clustering or spidering... it may not be as nice when zoomed out, but that might be an okay compromise.

## Future ideas

These are ideas that probably aren't necessary for a basic proof-of-concept... but could be really neat to implement!

### Pick date subset for add-to-calendar link of long-running events

For long-running events, such as gallery exhibitions, right now copying to calendar feels weird, cause it drops in a giant long-running event that feels really cluttery.

It might be nice to be able to choose a subset of the start-end time for the event that gets "exported" via the `Add to calendar` link.

For example, say there's an art exhibit that's running at a museum from October to February. It's mid-November and I'm looking for something to do on Saturday afternoon. What I probably want is to be able to `Add to calendar` the date-time range on Saturday when I'm actually planning to check out the exhibit... but as-is, I can only add the entire exhibit duration as an event, and it's kind of annoying to have a giant four-month blob of an event cluttering up my calendar.

As to which events should have the option to specify a date and time, anything longer than 12 hours is probably a good start. But heck, maybe letting users do this for all events is really the way to go.

### Date scrobbling

- Weather-radar style date scrobbling could be a neat feature
- Would need to think about how this works in concert with other date filtration features

### Map styling customizations

- Leaflet sources from OpenStreetMaps by default. OpenStreetMaps isn't really meant for public use, see their [Tile Usage Policy](https://operations.osmfoundation.org/policies/tiles/).
- Stamen Map Tiles has some really neat artistic effects, see for example [watercolour](https://maps.stamen.com/#watercolor/12/37.7706/-122.3782). Stadia Maps has a hosted version, see [Stamen Watercolor - Stadia Maps Documentation](https://docs.stadiamaps.com/map-styles/stamen-watercolor/), free up to 200,000 tiles per month.
- Alternatives exist out there for self-hosting... see for example [OpenMapTiles](https://openmaptiles.org/). There's a community-maintained list at [Raster tile providers - OpenStreetMap Wiki](https://wiki.openstreetmap.org/wiki/Raster_tile_providers).

## Done for now

### Add to calendar links

- I want something similar to `mailto:` or `tel:` links, but for calendar events, pretty sure this already exists
- Yep, it does, [Webcal - Wikipedia](https://en.wikipedia.org/wiki/Webcal)
- But, seems to support linking to a _file_, so less straightforward than `mailto:` or `tel:` for a single event...
- Could maybe base64 encode a single-event `.ics` file rather than a `webcal:` link? For example, `data:text/calendar;base64,<base64-encoded-ics-file-string>`?
- Prior art in the commercial space, see [AddEvent](https://www.addevent.com/)
- Squarespace does this a bit, see for example <https://www.londoncyclelink.ca/events>, docs are at [Events pages – Squarespace Help Center](https://support.squarespace.com/hc/en-us/articles/206543837-Events-pages)
- 2025-11-02 at 11:38 - managed to get this working _for me_ with a generated `data:text/calendar;` URL that contains an `.ics` string. In theory this should work with other calendar apps... in practice I'm sure it'll be more complicated.
- 2025-11-02 at 11:40 - side note on "Add to calendar" links... for long-running events, such as gallery exhibitions, it might be nice to be able to use the "ical mapper" UI to choose a subset of the start-end time. Eg if I'm actually planning to go to the show in a specific week, or maybe even on opening night, it's kind of annoying to have a giant four-month blob of an event cluttering up my calendar.
