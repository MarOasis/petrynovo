import type { MetadataRoute } from "next";

const BASE_URL = "https://www.petrydistribuidora.com.br";

const routes = ["", "/catalogos", "/produtos", "/linhas", "/servicos", "/sobre", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified,
  }));
}
