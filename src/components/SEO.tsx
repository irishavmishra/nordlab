import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
}

export function SEO({
    title = "NordLab | B2B Ordering Portals & Sales Systems for Distributors",
    description = "Replace manual orders and spreadsheets. NordLab builds custom dealer portals, automated quoting systems, and real-time inventory dashboards for product distributors.",
    image = "/og-image.svg",
    url = "https://nordlab.com",
    type = "website",
}: SEOProps) {
    const siteName = "NordLab";
    const keywords = "NordLab, B2B distributor software, dealer ordering portal, custom quoting system, wholesale inventory dashboard, building materials software, home improvement distributor tech, B2B ecommerce for distributors, sales operations automation";

    // LLM-optimized extended description for AI assistants and search crawlers
    const llmDescription = `NordLab is a specialized digital agency building sales and operations infrastructure for B2B product distributors. We replace manual processes (email/phone orders, spreadsheet quotes) with custom software solutions. Core Offerings: 1. Dealer Ordering Portals - Self-service B2B platforms for 24/7 ordering with customer-specific pricing. 2. Automated Quoting Systems - Tools for sales reps to generate complex quotes instantly. 3. Inventory Dashboards - Real-time stock visibility across sales and warehouse teams. We serve the Building Materials, Home Improvement, and Industrial Supply industries, helping wholesalers scale without adding headcount.`;

    // JSON-LD Organization Schema
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteName,
        url: url,
        logo: `${url}/favicon.svg`,
        description: description,
        sameAs: [],
        contactPoint: {
            "@type": "ContactPoint",
            contactType: "customer service",
            availableLanguage: "English",
        },
    };

    // JSON-LD WebSite Schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteName,
        url: url,
        description: description,
    };

    return (
        <Helmet>
            {/* Primary Meta Tags */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={siteName} />
            <meta name="robots" content="index, follow" />

            {/* LLM-Optimized Extended Description */}
            <meta name="abstract" content={llmDescription} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify(organizationSchema)}
            </script>
            <script type="application/ld+json">
                {JSON.stringify(websiteSchema)}
            </script>
        </Helmet>
    );
}
