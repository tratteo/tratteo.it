export async function download(blob: Blob | undefined | null, name: string) {
    if (!blob) return;
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
}
export async function share(blob: Blob | undefined | null, name: string) {
    if (!blob) return;
    const file = new File([blob], name, { type: blob.type });
    await navigator.share({
        files: [file],
    });
}
export async function downloadUrl(dataUrl: string, name: string) {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = name;
    link.click();
    URL.revokeObjectURL(link.href);
}
