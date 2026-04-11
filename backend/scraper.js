const axios = require("axios");
const cheerio = require("cheerio");

async function fetchPolicies() {
  try {
    const { data } = await axios.get("https://prsindia.org/billtrack");

    const $ = cheerio.load(data);

    const policies = [];

    $("h3").each((i, el) => {
      const title = $(el).text().trim();

      if (title && title.length > 10) {
        policies.push({
          title,
          link: "https://prsindia.org/billtrack",
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