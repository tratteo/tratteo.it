import sharp from "sharp";
// Function to convert a single image to WebP
export async function convertToWebP(filepath: string): Promise<string> {
    const outputPath = filepath.replace(/\.(jpg|jpeg|png)$/i, ".webp");

    try {
        await sharp(filepath).webp({ quality: 75 }).toFile(outputPath);
        return filepath;
    } catch (error) {
        console.error(`Error converting ${filepath}:`, error);
        return "";
    }
}
// Function to convert a single image to Jpeg
export async function convertToJpeg(filepath: string): Promise<string> {
    const outputPath = filepath.replace(/\.(webp|png)$/i, ".jpeg");
    try {
        await sharp(filepath).jpeg({ quality: 75 }).toFile(outputPath);
        return filepath;
    } catch (error) {
        console.error(`Error converting ${filepath}:`, error);
        return "";
    }
}
