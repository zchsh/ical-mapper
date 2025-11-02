import fs from "fs";
import path from "path";
// Local
import { gatherFiles } from "./gather-files.mjs";

/**
 * TODO: write description...
 * Maybe this could be split to separate file?
 *
 * Maybe we don't need to accept "args", and args should be set in another
 * node script that sequences the build?
 */
export function concatDirToFile(inputDirPath, outputFilePath) {
	// Derive the target file extension from the outputFilePath
	const targetExtension = path.extname(outputFilePath);
	// Gather a list of all files within the directory
	const [inputFileList] = gatherFiles(inputDirPath, [targetExtension]);
	const concatFileString = concatFiles(inputFileList);
	// Ensure the output directory exists
	const outputDirPath = path.dirname(outputFilePath);
	if (!fs.existsSync(outputDirPath)) {
		fs.mkdirSync(outputDirPath, { recursive: true });
	}
	// Write the file out to the outputFilePath
	fs.writeFileSync(outputFilePath, concatFileString, "utf-8");
	// Return the output file path
	return outputFilePath;
}

/**
 * Given a list of file paths,
 * read in all the file strings, concatenate them, and
 * Return a single file string that concatenates the provided files
 * in their provided order.
 *
 * @param {string[]} filePathList
 * @returns {string}
 */
function concatFiles(filePathList) {
	// Read in each file, to yield a list of file strings,
	// then join with two newlines to form a single concatenated file string
	return filePathList
		.map((filePath) => {
			return fs.readFileSync(filePath, "utf-8");
		})
		.join("\n\n");
}
