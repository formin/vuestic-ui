import type { GlobalConfig } from '../../services/global-config/global-config'
import { defineVuesticPlugin, usePlugin } from '../utils'
import { GlobalConfigPlugin, VaDropdownPlugin, VaToastPlugin, ColorConfigPlugin } from '../vuestic-plugins'
import * as vuesticComponents from '../vuestic-components'
import type { VuesticComponents } from '../global-components'

// Declare all components globally
declare module 'vue' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface GlobalComponents extends VuesticComponents {}
}

/**
 * Globally register all vuestic components and plugins
 * @notice using this method will bundle all vuestic components.
 * Use `createVuesticEssential` if you want tree shaking to work.
 */
export const createVuestic = defineVuesticPlugin((options: { config?: GlobalConfig } = {}) => ({
  install (app) {
    const { config } = options

    Object.entries(vuesticComponents).forEach(([name, component]) => {
      app.component(name, component)
    })

    usePlugin(app, GlobalConfigPlugin(config))
    usePlugin(app, ColorConfigPlugin)
    usePlugin(app, VaDropdownPlugin)
    usePlugin(app, VaToastPlugin)
  },
}))
