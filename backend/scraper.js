const axios = require("axios");
const cheerio = require("cheerio");

async function fetchPolicies() {
  try {
    const { data } = await axios.get("https://prsindia.org/billtrack");

    const $ = cheerio.load(data);

    const policies = [];

    $("h3").each((i, el) => {
      const title = $(el).text().trim();
      
      // 1. 🚨 Find the anchor <a> tag inside the h3 and grab its href link
      let exactLink = $(el).find('a').attr('href');
      
      // 2. 🚨 PRS India often uses relative links (like "/billtrack/some-bill")
      // So we check if it needs the base website URL added to the front.
      if (exactLink && !exactLink.startsWith('http')) {
        exactLink = 'https://prsindia.org' + exactLink;
      } else if (!exactLink) {
        // Fallback just in case a title doesn't have a link
        exactLink = "https://prsindia.org/billtrack"; 
      }

      if (title && title.length > 10) {
        policies.push({
          title,
          link: exactLink, // 👈 Now this points to the exact, specific policy page!
          category: "Policy Update",
          date: "Latest"
        });
      }
    });

    return policies;

  } catch (err) {
    console.error("Scraping error:", err);
    return [];
  }
}

module.exports = fetchPolicies;