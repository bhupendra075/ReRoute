// Minimal mock of leaflet APIs used in MapView for tests
class IconDefault {
  // placeholder for prototype property used by MapView
  constructor() {}
  static mergeOptions(_opts: any) {
    // noop
  }
}

IconDefault.prototype._getIconUrl = undefined

export const Icon = { Default: IconDefault }

export function divIcon(opts: any) {
  return { ...opts }
}

export default {
  Icon,
  divIcon,
}
