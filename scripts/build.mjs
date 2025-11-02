import { concatDirToFile } from "./util/concat-dir-to-file.mjs";

build();

function build() {
	// Copy over global CSS file
	/**
	 * NOTE: in theory, could traverse `./src` directory, looking for any
	 * directories that "end in a file extension", and infer the "output file"
	 * using the directory name, replacing `./src` in the path with
	 * `./out`. This would be an additional layer of abstraction on top of
	 * `concatDirToFile`. Maybe rename to `joinedFileFromDir`?
	 */
	concatDirToFile("./src/style/global.css", "./out/style/global.css");
	/**
	 * THOUGHT ON NEXT-MOST-USEFUL-THING:
	 *
	 * @include can be a very useful thing. It's easy to overuse, but in the
	 * right places, it feels really easy to understand and untangle, while
	 * also being very useful at reducing copy-pasted boilerplate.
	 *
	 * I think it'd be neat to somehow implement this in a language-agnostic way.
	 * Namely, with all file paths relative to repo root:
	 *
	 * - In `.html` files, look for <!-- @include /src/path/to/file -->, replace
	 *   with inlined file contents, must be in src dir
	 * - In `.js` files, look for /** @include /src/path/to/file *\/
	 *   (with an actual ending slash, escaped here cause we're in JS)
	 * - In `.css` files, look for /** @include /src/path/to/file *\/
	 *   (again with an actual ending slash, escaped here cause we're in JS
	 *
	 * I think it'd make sense to make this recursive... maybe that's too much?
	 * Either way, would start with:
	 *
	 * resolveIncludesInFileString(fileString, findMatchesFn, replaceMatchFn)
	 * (mostly a wrapper around find-and-replace, function args will be
	 * provided based on file extension)
	 *
	 * resolveIncludes(filePath)
	 * (would use the above function, determine which function args to
	 * pass based on file extension, and would write filePath from `src`
	 * into `out` directory))
	 */
}
