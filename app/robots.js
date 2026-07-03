import { siteUrl } from "@/utils/structured-data";

// Explicitly welcomes general and AI crawlers, and points them at the sitemap.
export default function robots() {
  const aiCrawlers = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Amazonbot",
    "cohere-ai",
    "Meta-ExternalAgent",
    "DuckAssistBot",
    "YouBot",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: aiCrawlers, allow: "/" },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
