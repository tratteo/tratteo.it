import fs from "fs";
import path from "path";
import readline from "readline";
import { convertToJpeg, convertToWebP } from "./src/converter";

// Function to get all image files from a directory
function getImageFiles(directory: string): string[] {
    const validExtensions = [".webp", ".png"];
    const files = fs.readdirSync(directory);

    return files
        .filter((file) => {
            const ext = path.extname(file).toLowerCase();
            return validExtensions.includes(ext);
        })
        .map((file) => path.join(directory, file));
}

// Function to prompt user for confirmation
function askForConfirmation(question: string): Promise<boolean> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            rl.close();
            resolve(answer.toLowerCase().startsWith("y"));
        });
    });
}

// Main function
async function main() {
    // Get the folder path from command line arguments
    const folderPath = process.argv[2];

    if (!folderPath) {
        console.error("Please provide a folder path");
        process.exit(1);
    }

    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
        console.error("Folder does not exist");
        process.exit(1);
    }

    // Get all image files
    const imageFiles = getImageFiles(folderPath);

    if (imageFiles.length === 0) {
        console.log("No images found in the specified folder");
        process.exit(0);
    }

    console.log(`Found ${imageFiles.length} images to convert`);

    // Convert all images
    const convertedFiles: string[] = [];
    for (const file of imageFiles) {
        console.log(`Converting ${path.basename(file)}...`);
        const result = await convertToJpeg(file);
        if (result) convertedFiles.push(result);
    }

    console.log(`\nSuccessfully converted ${convertedFiles.length} out of ${imageFiles.length} images`);

    // Ask for confirmation before deleting
    const shouldDelete = await askForConfirmation("Do you want to delete the original files? (y/n): ");

    if (shouldDelete) {
        convertedFiles.forEach((file) => {
            try {
                fs.unlinkSync(file);
                console.log(`Deleted: ${path.basename(file)}`);
            } catch (error) {
                console.error(`Error deleting ${file}:`, error);
            }
        });
        console.log("Deletion complete");
    } else {
        console.log("Original files preserved");
    }
}

// Run the script
main().catch(console.error);
