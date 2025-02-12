import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

interface Dimensions {
    width: number;
    height: number;
}

interface ProcessingResult {
    success: boolean;
    path: string;
    error?: Error;
}

async function processImage(inputPath: string, outputPath: string, { width, height }: Dimensions): Promise<ProcessingResult> {
    try {
        await sharp(inputPath).resize(width, height).toFile(outputPath);

        return {
            success: true,
            path: outputPath,
        };
    } catch (error) {
        return {
            success: false,
            path: inputPath,
            error: error instanceof Error ? error : new Error("Unknown error occurred"),
        };
    }
}

async function isImageFile(filePath: string): Promise<boolean> {
    const validExtensions = new Set([".jpg", ".jpeg", ".png", ".gif", ".webp"]);
    const ext = path.extname(filePath).toLowerCase();
    return validExtensions.has(ext);
}

async function processPath(inputPath: string, dimensions: Dimensions): Promise<ProcessingResult[]> {
    try {
        const stats = await fs.stat(inputPath);
        const results: ProcessingResult[] = [];

        if (stats.isFile()) {
            if (await isImageFile(inputPath)) {
                const ext = path.extname(inputPath);
                const basename = path.basename(inputPath, ext);
                const dirname = path.dirname(inputPath);
                const outputPath = path.join(dirname, `${basename}_${dimensions.width}x${dimensions.height}${ext}`);

                const result = await processImage(inputPath, outputPath, dimensions);
                results.push(result);

                if (result.success) {
                    console.log(`Successfully resized: ${inputPath}`);
                } else {
                    console.error(`Failed to process ${inputPath}:`, result.error);
                }
            }
        } else if (stats.isDirectory()) {
            const files = await fs.readdir(inputPath);

            for (const file of files) {
                const filePath = path.join(inputPath, file);
                const fileStats = await fs.stat(filePath);

                if (fileStats.isFile() && (await isImageFile(filePath))) {
                    const ext = path.extname(file);
                    const basename = path.basename(file, ext);
                    const outputPath = path.join(inputPath, `${basename}_${dimensions.width}x${dimensions.height}${ext}`);

                    const result = await processImage(filePath, outputPath, dimensions);
                    results.push(result);

                    if (result.success) {
                        console.log(`Successfully resized: ${filePath}`);
                    } else {
                        console.error(`Failed to process ${filePath}:`, result.error);
                    }
                }
            }
        }

        return results;
    } catch (error) {
        return [
            {
                success: false,
                path: inputPath,
                error: error instanceof Error ? error : new Error("Unknown error occurred"),
            },
        ];
    }
}

function parseDimensions(dimensionString: string): Dimensions {
    const dimensions = dimensionString.split("x").map(Number);

    if (dimensions.length !== 2 || dimensions.some(isNaN)) {
        throw new Error("Invalid dimensions format. Use widthxheight (e.g., 800x600)");
    }

    const [width, height] = dimensions;
    return { width, height };
}

async function main(): Promise<void> {
    const args = process.argv.slice(2);

    if (args.length !== 2) {
        console.log("Usage: ts-node script.ts <input_path> <width>x<height>");
        console.log("Example: ts-node script.ts ./images 800x600");
        process.exit(1);
    }

    const [inputPath, dimensionString] = args;

    try {
        const dimensions = parseDimensions(dimensionString);
        const results = await processPath(inputPath, dimensions);

        const successCount = results.filter((r) => r.success).length;
        const failureCount = results.filter((r) => !r.success).length;

        console.log("\nProcessing Summary:");
        console.log(`Successfully processed: ${successCount} images`);
        console.log(`Failed to process: ${failureCount} images`);
    } catch (error) {
        console.error("Error:", error instanceof Error ? error.message : "Unknown error occurred");
        process.exit(1);
    }
}

main().catch(console.error);
