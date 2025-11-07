.PHONY: dev
dev:
	npm run build && npm run dev

.PHONY: buildhostcals
buildhostcals:
	node ~/code/calendar-from-text-file/scripts/markdown-to-ics.mjs /Users/zachshilton/code/ical-mapper/src/example-calendars-md/example-calendar-01.md /Users/zachshilton/code/ical-mapper/public/example-calendars-ics/example-calendar-01.ics