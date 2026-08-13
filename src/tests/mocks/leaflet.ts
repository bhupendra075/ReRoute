// Minimal mock of leaflet APIs used in MapView for tests
class IconDefault {
  // placeholder for prototype property used by MapView
  _getIconUrl: string | undefined = undefined
  constructor() {}
  static mergeOptions(_opts: unknown) {
    // noop
  }
}

export const Icon = { Default: IconDefault }

export function divIcon(opts: any) {
  return { ...opts }
}

export default {
  Icon,
  divIcon,
}
