const BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0";

/**
 * Normaliza un objeto "vulnerability" crudo de la NVD
 * a una forma simple y predecible para el resto de la app.
 */
function normalizeCve(rawItem) {
  const cve = rawItem.cve;
  const description =
    cve.descriptions.find((d) => d.lang === "en")?.value ??
    "Sin descripción disponible.";

  const v31 = cve.metrics?.cvssMetricV31;
  const v30 = cve.metrics?.cvssMetricV30;
  const v2 = cve.metrics?.cvssMetricV2;

  const metrics =
    v31?.find((m) => m.type === "Primary") ??
    v31?.[0] ??
    v30?.find((m) => m.type === "Primary") ??
    v30?.[0] ??
    v2?.find((m) => m.type === "Primary") ??
    v2?.[0];

  const severity =
    metrics?.cvssData?.baseSeverity ?? metrics?.baseSeverity ?? "NONE";
  const score = metrics?.cvssData?.baseScore ?? null;

  return {
    id: cve.id,
    description,
    severity: severity.toLowerCase(),
    score,
    publishedDate: cve.published,
    lastModifiedDate: cve.lastModified,
  };
}

/**
 * Busca CVEs por palabra clave.
 */

export async function searchCves({
  keyword = "",
  resultsPerPage = 20,
  severity = "",
} = {}) {
  const params = new URLSearchParams({
    resultsPerPage: String(resultsPerPage),
  });

  if (keyword.trim()) {
    params.set("keywordSearch", keyword.trim());
  }

  if (severity) {
    params.set("cvssV3Severity", severity);
  }

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error al buscar CVEs: ${response.status}`);
  }

  const data = await response.json();
  //console.log("RAW RESPONSE:", data);
  return data.vulnerabilities.map(normalizeCve);
}

/**
 * Obtiene el detalle de un único CVE por su ID.
 */

export async function getCveById(cveId) {
  const params = new URLSearchParams({ cveId });
  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Error al obtener el CVE: ${response.status}`);
  }

  const data = await response.json();

  if (!data.vulnerabilities || data.vulnerabilities.length === 0) {
    throw new Error("CVE no encontrado.");
  }
  return normalizeCve(data.vulnerabilities[0]);
}
