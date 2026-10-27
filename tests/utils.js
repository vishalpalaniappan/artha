import { mkdir } from 'node:fs/promises';
import fs from 'node:fs/promises';
import path from 'node:path';

async function ensureDir(dirPath) {
    try {
        await mkdir(dirPath, { recursive: true });
        console.log(`Directory ready at: ${dirPath}`);
    } catch (err) {
        console.error(`Failed to create directory:`, err);
    }
}

async function getFilesAndContent(dirPath) {
    try {
        const entries = await fs.readdir(dirPath, { withFileTypes: true, recursive: true });

        const filePaths = entries
            .filter((entry) => entry.isFile())
            .map((entry) => path.join(entry.parentPath, entry.name));

        return await Promise.all(
            filePaths.map(async (filePath) => {
                return {
                    fullPath: filePath,
                    name: path.basename(filePath),
                    relativePath: path.relative(dirPath, filePath),
                    content: await fs.readFile(filePath, 'utf8')
                };
            })
        );
    } catch (error) {
        console.error('Error reading directory:', error);
    }
}


export { ensureDir, getFilesAndContent }