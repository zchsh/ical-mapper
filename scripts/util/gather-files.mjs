import fs from "fs";
import path from "path";

/**
 * Given a directory, and a list of valid file extensions,
 * recursively traverse the directory, looking for files.
 * Return an array with two entries:
 * - [0] An array of valid files
 * - [1] An array of unrecognized files
 *
 * @param {string} dirPath
 * @param {string[]} allowedFileExtensions
 * @returns {[string[], string[]]}
 */
export function gatherFiles(dirPath, allowedFileExtensions) {
	// Recursively read all files in the directory
	const dirEntries = fs.readdirSync(dirPath, { recursive: true });
	// Set up arrays for our valid files, and unrecognized files as well!
	const validFiles = [];
	const mysteryFiles = [];
	for (const fileName of dirEntries) {
		const filePath = path.join(dirPath, fileName);
		const isFile = fs.lstatSync(filePath).isFile();
		// We only care about files, so skip if this isn't a file
		if (!isFile) continue;
		// Grab the file extension
		const extension = path.extname(filePath);
		// Ignore files with empty extensions
		if (extension === "") continue;
		// Push files with valid extensions to the validFiles array,
		// and all other files to the mysteryFiles array
		const isValidExtension = allowedFileExtensions.includes(extension);
		if (isValidExtension) {
			validFiles.push(filePath);
		} else {
			mysteryFiles.push(filePath);
		}
	}
	// Return the gathered valid and mystery files
	return [validFiles, mysteryFiles];
}
