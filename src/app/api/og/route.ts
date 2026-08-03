import { NextResponse } from "next/server";
import sharp from "sharp";
import { promises as fs } from "fs";
import path from "path";

// Кешируем PNG в памяти после первого рендера (через sharp из SVG)
let cachedPng: Buffer | null = null;

export async function GET() {
  try {
    if (cachedPng) {
      return new NextResponse(cachedPng, {
        headers: {
          "Content-Type": "image/png",
          "Cache-Control": "public, max-age=86400, immutable",
        },
      });
    }

    const svgPath = path.join(process.cwd(), "public", "og.svg");
    const svg = await fs.readFile(svgPath);

    const png = await sharp(svg, { density: 144 })
      .resize(1200, 630, { fit: "cover" })
      .png({ quality: 90, compressionLevel: 9 })
      .toBuffer();

    cachedPng = png;

    return new NextResponse(png, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=86400, immutable",
      },
    });
  } catch (err) {
    return new NextResponse(
      err instanceof Error ? err.message : "OG generation failed",
      { status: 500 },
    );
  }
}
