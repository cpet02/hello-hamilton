import puppeteer from "puppeteer";

function extractCoords(mapUrl) {
  if (!mapUrl) return null;
  const match = mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (!match) return null;
  return { lat: parseFloat(match[1]), lng: parseFloat(match[2]) };
}

export async function extract() {
  const url = "https://tourismhamilton.com/events-calendar";
  let browser;

  try {
    console.log("Launching browser...");
    browser = await puppeteer.launch({
      headless: false,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-blink-features=AutomationControlled"
      ]
    });

    const page = await browser.newPage();

    // Pretend to be a real user
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
      "AppleWebKit/537.36 (KHTML, like Gecko) " +
      "Chrome/118.0.0.0 Safari/537.36"
    );

    await page.setViewport({ width: 1280, height: 900 });

    await page.evaluateOnNewDocument(() => {
      Object.defineProperty(navigator, "webdriver", { get: () => false });
    });

    console.log("Navigating to:", url);
    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 60000
    });

    console.log("Waiting for event cards...");
    await page.waitForSelector("li.block--event", { timeout: 20000 });

    console.log("Scraping events...");

    const events = await page.evaluate(() => {
      const blocks = Array.from(document.querySelectorAll("li.block--event"));

      return blocks.map(block => {
        const titleEl = block.querySelector(".block_title a, .block__title a");
        const title = titleEl?.textContent?.trim() || null;
        const url = titleEl?.href || null;

        // Images can be lazy-loaded or regular
        const img =
          block.querySelector("img[data-lazy-src]")?.getAttribute("data-lazy-src") ||
          block.querySelector("img[data-src]")?.getAttribute("data-src") ||
          block.querySelector("img")?.src ||
          null;

        const date =
          block.querySelector(".block_date, .block__date")?.textContent?.trim() ||
          null;

        const description =
          block.querySelector(".block_description p, .block__description p")
            ?.textContent
            ?.trim() || null;

        const mapUrl =
          block.querySelector("a.btn_map, a.btn__map")?.href ||
          null;

        return { title, url, img, date, description, mapUrl };
      });
    });

    console.log("RAW SCRAPED EVENTS:", events);

    await browser.close();

    // --- Format for ingester ---
    return events.map(ev => ({
      source: "tourism-hamilton",
      title: ev.title,
      description: ev.description,
      location: ev.mapUrl ? extractCoords(ev.mapUrl) : null,
      category: null,
      cost: null,
      indoor: null,
      energy: null,
      seasonal: null,
      groupSize: [],
      extra: {
        url: ev.url,
        date: ev.date,
        mapUrl: ev.mapUrl,
        imageUrl: ev.img,   // <-- fixed image naming
        scrapedAt: new Date().toISOString()
      }
    }));
  } catch (err) {
    console.error("SCRAPER ERROR:", err);
    if (browser) await browser.close();
    return [];
  }
}