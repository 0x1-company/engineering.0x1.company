import { JSDOM } from "jsdom";
import type { OgpData } from "../types";

/**
 * OGPメタデータの有効なキー
 * @typedef {'title' | 'description' | 'image' | 'url'} OgpKey
 */
type OgpKey = "title" | "description" | "image" | "url";

/**
 * 拡張OGPデータ（ファビコンと画像altテキストを含む）
 * @interface ExtendedOgpData
 * @extends {OgpData}
 * @property {string} [imageAlt] - OGP画像の代替テキスト
 * @property {string} [favicon] - サイトのファビコンURL
 */
interface ExtendedOgpData extends OgpData {
  imageAlt?: string;
  favicon?: string;
}
/**
 * 指定されたURLからOGP情報を取得
 * @param {string} url - OGP情報を取得するURL
 * @returns {Promise<ExtendedOgpData>} OGP情報（取得失敗時は空のデータ）
 * @throws {never} エラーはスローされず、失敗時はフォールバック値を返す
 * @description
 * - JSDOMを使用して指定されたURLからOGPメタデータを抽出
 * - GoogleのFavicon APIを使用してファビコンを取得
 * - 取得失敗時は警告を出力し、空のOGPデータを返す
 * @example
 * const ogpData = await fetchOgp('https://example.com');
 * console.log(ogpData.title); // サイトのタイトル
 * console.log(ogpData.favicon); // ファビコンのURL
 */
export const fetchOgp = async (url: string): Promise<ExtendedOgpData> => {
  const ogp: ExtendedOgpData = {
    title: "",
    description: "",
    image: "",
    url: "",
  };
  try {
    const dom = await JSDOM.fromURL(url);
    const host = new URL(url).host;
    ogp.favicon = `https://www.google.com/s2/favicons?domain=${host}&sz=20`;
    const metas = dom.window.document.getElementsByTagName("meta");

    // biome-ignore lint/complexity/noForEach: <explanation>
    Array.from(metas).forEach((v) => {
      const prop = v.getAttribute("property") || v.getAttribute("name");
      if (!prop) return;
      const key = prop.replace("og:", "");
      if (key === "image:alt") ogp.imageAlt = v.getAttribute("content") || "";
      if (!isOgpKey(key)) return;
      ogp[key] = v.getAttribute("content") || "";
    });

    return ogp;
  } catch (e) {
    console.warn(`[fetchOgp] Warning: Failed to fetch OGP data for ${url}. Using fallback.`);
    return ogp;
  }
};

/**
 * 指定されたキーがOGPキーかどうかを判定
 * @param {unknown} key - 検証するキー
 * @returns {boolean} 有効なOGPキーの場合true
 * @private
 */
function isOgpKey(key: unknown): key is OgpKey {
  return (
    key === "title" ||
    key === "image" ||
    key === "description" ||
    key === "url" ||
    key === "alt"
  );
}
