export function rosterUrlWithoutAuthFragment(hash: string, pathname: string, search: string): string | null {
  return hash.startsWith('#token=') ? `${pathname}${search}` : null
}
