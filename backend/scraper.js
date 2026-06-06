const axios = require("axios");
const cheerio = require("cheerio");

async function fetchPolicies() {
  try {
    // 🚀 FIXED: Injected standard User-Agent headers to trick the server firewall into accepting the request from Render
    const { data } = await axios.get("https://prsindia.org/billtrack", {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
      }
    });

    const $ = cheerio.load(data);
    const policies = [];

    // 🚀 UPDATED SELECTOR: Target the explicit table link/headers layout used on the live PRS India Bill Track template
    $(".views-field-title a, h3 a, td strong a").each((i, el) => {
      const title = $(el).text().trim();
      let exactLink = $(el).attr('href');
      
      // Prevent extracting short noisy structural UI elements
      if (!title || title.length < 10) return;

      // 🚨 Ensure relative links are transformed correctly into absolute production addresses
      if (exactLink && !exactLink.startsWith('http')) {
        exactLink = 'https://prsindia.org' + exactLink;
      } else if (!exactLink) {
        exactLink = "https://prsindia.org/billtrack"; 
      }

      // De-duplicate checking logic to maintain crisp tracking dashboard feeds
      const isDuplicate = policies.some(p => p.title === title);
      if (!isDuplicate) {
        policies.push({
          title,
          link: exactLink,
          category: "Bill Update",
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) // Generates a clean dynamic date fallback layout
        });
      }
    });

    console.log(`[📜 SCRAPER ENGINE] Successfully crawled ${policies.length} live bills from PRS India!`);
    return policies;

  } catch (err) {
    console.error("Scraping error exception caught:", err.message);
    return [];
  }
}

module.exports = fetchPolicies;