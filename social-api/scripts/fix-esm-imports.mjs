import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, "..", "dist");

const relativeImportPattern =
	/(import\s+[\s\S]*?\sfrom\s+['"])(\.{1,2}\/[^'"]+)(['"])/g;
const exportFromPattern =
	/(export\s+[\s\S]*?\sfrom\s+['"])(\.{1,2}\/[^'"]+)(['"])/g;
const dynamicImportPattern =
	/(import\(\s*['"])(\.{1,2}\/[^'"]+)(['"]\s*\))/g;

async function collectFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = [];
	for (const entry of entries) {
		const fullPath = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			files.push(...(await collectFiles(fullPath)));
		} else if (entry.isFile() && fullPath.endsWith(".js")) {
			files.push(fullPath);
		}
	}
	return files;
}

function normalizeSpecifier(specifier) {
	if (
		specifier.endsWith(".js") ||
		specifier.endsWith(".json") ||
		specifier.endsWith(".node")
	) {
		return specifier;
	}

	if (
		specifier.endsWith(".ts") ||
		specifier.endsWith(".mts") ||
		specifier.endsWith(".cts")
	) {
		return specifier.replace(/\.(mts|cts|ts)$/i, ".js");
	}

	if (specifier.includes("?") || specifier.includes("#")) {
		return specifier;
	}

	return `${specifier}.js`;
}

function transformContent(content) {
	let updated = content;

	for (const pattern of [
		relativeImportPattern,
		exportFromPattern,
		dynamicImportPattern,
	]) {
		updated = updated.replace(pattern, (_, start, specifier, end) => {
			return `${start}${normalizeSpecifier(specifier)}${end}`;
		});
	}

	return updated;
}

const files = await collectFiles(distDir);
await Promise.all(
	files.map(async filePath => {
		const original = await readFile(filePath, "utf8");
		const transformed = transformContent(original);
		if (transformed !== original) {
			await writeFile(filePath, transformed, "utf8");
		}
	})
);

