SEO CHECKLIST: what is done and what only you can do
=====================================================

DONE IN THE FILES
- No noindex tags anywhere. The page says "index, follow".
- Meta title and meta description written (index.html).
- Canonical tag added.
- og:image (images/og-image.jpg, 1200x630) plus Open Graph and Twitter tags, so shared links show a picture.
- Schema markup: business (ProfessionalService) + website in index.html, and FAQ schema built from js/data.js.
- sitemap.xml and robots.txt created.
- One h1 on the page, headings in order (h1 > h2 > h3, nothing skipped).
- Alt text on every meaningful image.
- All photos compressed (about 2.4 MB down to about 1.2 MB). Width/height set to stop layout jumping. Scripts deferred. Hero image preloaded.
- Internal links added between sections.
- Anchor links and image paths checked: none broken.
- Mobile layout checked at phone widths.
- HTTPS: all resources are https and the page asks browsers to upgrade any http request.

STEP 1 (REQUIRED BEFORE LAUNCH): set your real web address
The files contain the placeholder https://YOUR-SITE-URL in: index.html, sitemap.xml, robots.txt.
Fix it in one step:   python3 set-domain.py https://yourname.github.io/your-repo
Or use your editor's Find and Replace on those three files. Use your custom domain if you have one.

STEP 2: turn on HTTPS (GitHub Pages)
Repository > Settings > Pages > tick "Enforce HTTPS".

STEP 3: verify Google Search Console (only you can do this, it needs your Google account)
1. Go to search.google.com/search-console and add your site as a URL-prefix property.
2. Choose "HTML tag", copy the tag Google gives you, paste it into index.html where the comment says so.
3. Publish, click Verify, then submit https://your-address/sitemap.xml under Sitemaps.

STEP 4: backlinks (needs real outreach, nothing to build in code)
- Ask each partner university's international office to list or link to you.
- Create a Google Business Profile and a Facebook page; put your website link on both.
- Add the link to your WhatsApp Business profile, YouTube and Instagram bios.
- Post useful guides (visa steps, costs, scholarships) in Bangladeshi student Facebook groups, with your link.
- List the site in reputable education directories. Avoid paid link schemes; they can get a site penalised.

NOTES
- Page speed and Core Web Vitals: I could not run Google's PageSpeed test from here. After launch, test your address at pagespeed.web.dev and send me the result.
- "Clean URL slugs": there is one page for now, so there is nothing to clean. When we add pages, they will be named like universities.html and tuition-fees.html, and I will add each to sitemap.xml.
