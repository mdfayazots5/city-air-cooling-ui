export function normalizeRoute(route: string): string {
  const [rawPath] = `${route ?? ''}`.split(/[?#]/);
  const normalized = rawPath.trim().replace(/\/{2,}/g, '/').replace(/\/+$/, '');
  return normalized || '/';
}

export function routeMatches(route: string, candidate: string): boolean {
  const normalizedRoute = normalizeRoute(route);
  const normalizedCandidate = normalizeRoute(candidate);

  if (normalizedRoute === normalizedCandidate) {
    return true;
  }

  return normalizedRoute.startsWith(`${normalizedCandidate}/`)
    || normalizedCandidate.startsWith(`${normalizedRoute}/`);
}
