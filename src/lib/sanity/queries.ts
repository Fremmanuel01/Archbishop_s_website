import { groq } from "next-sanity";
import { sanityClient } from "./client";

type Locale = "en" | "ig" | "it";

// ── Site Settings ────────────────────────────────────────────────────────────
export async function getSiteSettings() {
  return sanityClient.fetch(
    groq`*[_type == "siteSettings"][0]{
      siteName, logo, favicon, diaryWidgetUrl, livestreamUrl,
      socialLinks, contactInfo, staffContacts
    }`,
    {}, { next: { revalidate: 3600 } }
  );
}

// ── Home Page ────────────────────────────────────────────────────────────────
export async function getHomePage(locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "homePage"][0]{
      "heroHeading":    heroHeading[$locale],
      "heroSubheading": heroSubheading[$locale],
      heroImage, heroVideoUrl,
      "featuredQuotes": featuredQuotes[]{
        "quote": select(
          $locale == "ig" => quoteIg,
          $locale == "it" => quoteIt,
          quoteEn
        ),
        source
      },
      "featuredTeachings": featuredTeachings[]->{
        _id, "title": select($locale=="ig"=>titleIg,$locale=="it"=>titleIt,titleEn),
        category, publishedAt, slug, coverImage, excerpt
      },
      "featuredGallery": featuredGallery[]->{
        _id, image,
        "caption": select($locale=="ig"=>captionIg,$locale=="it"=>captionIt,captionEn)
      }
    }`,
    { locale }, { next: { revalidate: 60 } }
  );
}

// ── Biography ────────────────────────────────────────────────────────────────
export async function getBiography(locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "biography"][0]{
      portraitImage,
      "sections": sections[]{
        "heading": select($locale=="ig"=>headingIg,$locale=="it"=>headingIt,headingEn),
        "body":    select($locale=="ig"=>bodyIg,   $locale=="it"=>bodyIt,   bodyEn),
        image
      },
      "timeline": timeline[] | order(year asc) {
        year,
        "label":       select($locale=="ig"=>labelIg,$locale=="it"=>labelIt,labelEn),
        "description": select($locale=="ig"=>descriptionIg,$locale=="it"=>descriptionIt,descriptionEn),
        highlight
      }
    }`,
    { locale }, { next: { revalidate: 3600 } }
  );
}

// ── Pastoral Letters ─────────────────────────────────────────────────────────
export async function getPastoralLetters(locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "pastoralLetter"] | order(year desc) {
      _id, year, publishedAt, slug, coverImage,
      "title":       select($locale=="ig"=>titleIg,$locale=="it"=>titleIt,titleEn),
      "description": select($locale=="ig"=>descriptionIg,$locale=="it"=>descriptionIt,descriptionEn),
      "pdf": select(
        $locale=="ig" && defined(pdfIg) => pdfIg.asset->url,
        $locale=="it" && defined(pdfIt) => pdfIt.asset->url,
        pdfEn.asset->url
      )
    }`,
    { locale }, { next: { revalidate: 3600 } }
  );
}

// ── Teachings ────────────────────────────────────────────────────────────────
export async function getTeachings(locale: Locale, category?: string) {
  const filter = category
    ? groq`*[_type == "teaching" && category == $category] | order(publishedAt desc)`
    : groq`*[_type == "teaching"] | order(publishedAt desc)`;
  return sanityClient.fetch(
    groq`${filter}{
      _id, category, publishedAt, slug, excerpt, coverImage,
      "title": select($locale=="ig"=>titleIg,$locale=="it"=>titleIt,titleEn),
      "pdf": select(
        $locale=="ig" && defined(pdfIg) => pdfIg.asset->url,
        $locale=="it" && defined(pdfIt) => pdfIt.asset->url,
        pdfEn.asset->url
      )
    }`,
    { locale, category }, { next: { revalidate: 600 } }
  );
}

export async function getTeaching(slug: string, locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "teaching" && slug.current == $slug][0]{
      _id, category, publishedAt, slug, coverImage, excerpt,
      "title": select($locale=="ig"=>titleIg,$locale=="it"=>titleIt,titleEn),
      "body":  select($locale=="ig"=>bodyIg,$locale=="it"=>bodyIt,bodyEn),
      "pdf": select(
        $locale=="ig" && defined(pdfIg) => pdfIg.asset->url,
        $locale=="it" && defined(pdfIt) => pdfIt.asset->url,
        pdfEn.asset->url
      )
    }`,
    { slug, locale }, { next: { revalidate: 600 } }
  );
}

export async function getTeachingSlugs() {
  return sanityClient.fetch<{ slug: string }[]>(
    groq`*[_type == "teaching" && defined(slug.current)]{ "slug": slug.current }`,
    {}, { next: { revalidate: 3600 } }
  );
}

// ── Gallery ──────────────────────────────────────────────────────────────────
export async function getGalleryItems(locale: Locale, album?: string) {
  const filter = album
    ? groq`*[_type == "galleryItem" && album == $album]`
    : groq`*[_type == "galleryItem"]`;
  return sanityClient.fetch(
    groq`${filter} | order(takenAt desc) {
      _id, image, takenAt, album, order,
      "caption": select($locale=="ig"=>captionIg,$locale=="it"=>captionIt,captionEn)
    }`,
    { locale, album }, { next: { revalidate: 3600 } }
  );
}

// ── Videos ───────────────────────────────────────────────────────────────────
export async function getVideos(locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "video"] | order(publishedAt desc) {
      _id, publishedAt, thumbnail, videoUrl, videoFile,
      "title":       select($locale=="ig"=>titleIg,$locale=="it"=>titleIt,titleEn),
      "description": select($locale=="ig"=>descriptionIg,$locale=="it"=>descriptionIt,descriptionEn)
    }`,
    { locale }, { next: { revalidate: 3600 } }
  );
}

// ── Appointment Settings ─────────────────────────────────────────────────────
export async function getAppointmentSettings(locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "appointment"] {
      _id, type, availableSlots,
      "instructions": select($locale=="ig"=>instructionsIg,$locale=="it"=>instructionsIt,instructionsEn)
    }`,
    { locale }, { next: { revalidate: 300 } }
  );
}

// ── Coat of Arms ─────────────────────────────────────────────────────────────
export async function getCoatOfArms(locale: Locale) {
  return sanityClient.fetch(
    groq`*[_type == "coatOfArms"][0]{
      image,
      "motto": {
        "latin":       motto.latin,
        "translation": select($locale=="ig"=>motto.ig,$locale=="it"=>motto.it,motto.en)
      },
      "sections": sections[] | order(order asc) {
        order, focusX, focusY,
        "heading": select($locale=="ig"=>headingIg,$locale=="it"=>headingIt,headingEn),
        "body":    select($locale=="ig"=>bodyIg,$locale=="it"=>bodyIt,bodyEn)
      }
    }`,
    { locale }, { next: { revalidate: 3600 } }
  );
}
