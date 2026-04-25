import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Archbishop Valerian M. Okeke",
    short_name: "Abp Okeke",
    description:
      "Official website of Most Rev. Valerian Maduka Okeke, Archbishop of Onitsha.",
    start_url: "/en",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#0a0f1e",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
