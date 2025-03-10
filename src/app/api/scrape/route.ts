import { NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: Request) {
  try {
    console.log("API received request:", req.url);

    const { searchParams } = new URL(req.url);
    const url = searchParams.get("url");
    const id = searchParams.get("id");

    if (!url || !id) {
      return NextResponse.json(
        { error: "Missing URL or ID parameter" },
        { status: 400 }
      );
    }

    console.log(`Starting Puppeteer to scrape: ${url}, looking for ID: ${id}`);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // **Wait for the element to appear (timeout after 5 seconds)**
    await page.waitForSelector(`#${id}`, { timeout: 5000 }).catch(() => {
      console.log(`Element with ID '${id}' not found.`);
    });

    // Extract page title
    const pageTitle = await page.title();

    // **Search using querySelector**
    const elementText = await page.evaluate((id) => {
      const element = document.getElementById(id);
      return element && element.textContent
        ? element.textContent.trim()
        : "Element not found";
    }, id);

    await browser.close();

    console.log("Scraped data:", { title: pageTitle, elementText });

    return NextResponse.json({
      title: pageTitle,
      url,
      elementText,
    });
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Failed to scrape data" },
      { status: 500 }
    );
  }
}
