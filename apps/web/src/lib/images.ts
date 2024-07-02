import { getPlaiceholder } from "plaiceholder";

export const getBase64 = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch image");
  const buffer = await res.arrayBuffer();
  const { base64 } = await getPlaiceholder(Buffer.from(buffer));
  return base64;
};
