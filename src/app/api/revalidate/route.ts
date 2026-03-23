import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const type = body?._type as string | undefined;

  const typeToPath: Record<string, string[]> = {
    homePage:       ["/"],
    biography:      ["/about"],
    pastoralLetter: ["/pastoral-letters"],
    teaching:       ["/teachings"],
    galleryItem:    ["/gallery", "/"],
    video:          ["/gallery"],
    appointment:    ["/appointments"],
    coatOfArms:     ["/coat-of-arms"],
    siteSettings:   ["/"],
  };

  const paths = typeToPath[type ?? ""] ?? ["/"];
  for (const p of paths) {
    revalidatePath(`/en${p}`);
    revalidatePath(`/ig${p}`);
    revalidatePath(`/it${p}`);
  }

  return NextResponse.json({ revalidated: true, paths });
}
