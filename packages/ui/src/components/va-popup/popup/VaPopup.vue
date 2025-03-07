<script>
import {
  offsetValidator,
  parsePosition,
  positionValidator,
  setPosition,
} from '../utils/popup'
import frameDebounce from '../utils/frame-debounce'
import { getScrollTarget } from '../utils/scroll'
import EscapeKey from '../utils/escape-key'
import ModelToggleMixin from '../mixins/model-toggle'
import { listenOpts, position as eventPosition } from '../utils/event'
import CanRenderMixinMixin from '../mixins/can-render'
import { h } from 'vue'

// HACK Should not be in vuestic 2.0.

// @depecated
export default {
  name: 'VaPopup',
  emits: ['escape-key'],
  mixins: [ModelToggleMixin, CanRenderMixinMixin],
  props: {
    anchor: {
      type: String,
      validator: positionValidator,
      default: 'center middle',
    },
    self: {
      type: String,
      validator: positionValidator,
      default: 'center middle',
    },
    fit: Boolean,
    cover: Boolean,
    persistent: Boolean,
    keepOnScreen: Boolean,
    maxHeight: {
      type: String,
      default: '',
    },
    touchPosition: Boolean,
    anchorClick: {
      /*
        for handling anchor outside of Popover
        example: context menu component
      */
      type: Boolean,
      default: true,
    },
    offset: {
      type: Array,
      validator: offsetValidator,
      default: () => [0, 0],
    },
    noFocus: Boolean,
    noRefocus: Boolean,
    disable: Boolean,
  },
  watch: {
    $route () {
      this.hide()
    },
  },
  computed: {
    horizSide () {
      return 'right'
      // return this.$q.i18n.rtl ? 'right' : 'left'
    },
    anchorOrigin () {
      return parsePosition(
        this.cover
          ? `top ${this.horizSide}`
          : this.anchor || `bottom ${this.horizSide}`,
      )
    },
    selfOrigin () {
      return parsePosition(this.self || `top ${this.horizSide}`)
    },
  },
  render () {
    if (!this.canRender) {
      return
    }

    return h('div', {
      class: 'q-popover scroll',
      ref: 'content',
      attrs: { tabindex: -1 },
      on: {
        click (e) {
          e.stopPropagation()
        },
      },
    }, this.$slots.default())
  },
  mounted () {
    this.__updatePosition = frameDebounce((_, event, animate) => this.reposition(event, animate))
    this.$nextTick(() => {
      this.anchorEl = this.$el.parentNode
      this.anchorEl.removeChild(this.$el)

      if (
        this.anchorEl.classList.contains('q-btn-inner') ||
        this.anchorEl.classList.contains('q-if-inner') ||
        this.anchorEl.classList.contains('no-pointer-events')
      ) {
        this.anchorEl = this.anchorEl.parentNode
      }

      if (this.anchorClick) {
        this.anchorEl.classList.add('cursor-pointer')
        this.anchorEl.addEventListener('click', this.toggle)
        this.anchorEl.addEventListener('keyup', this.__toggleKey)
      }
    })

    this.value && this.show()
  },
  beforeUnmount () {
    this.showing && this.__cleanup()
    if (this.anchorClick && this.anchorEl) {
      this.anchorEl.removeEventListener('click', this.toggle)
      this.anchorEl.removeEventListener('keyup', this.__toggleKey)
    }
  },
  methods: {
    __show (evt) {
      if (!this.noRefocus) {
        this.__refocusTarget = (this.anchorClick && this.anchorEl) || document.activeElement
      }
      document.body.appendChild(this.$el)
      EscapeKey.register(() => {
        this.$emit('escape-key')
        this.hide()
      })
      this.scrollTarget = getScrollTarget(this.anchorEl)
      this.scrollTarget.addEventListener('scroll', this.__updatePosition, listenOpts.passive)
      if (this.scrollTarget !== window) {
        window.addEventListener('scroll', this.__updatePosition, listenOpts.passive)
      }
      window.addEventListener('resize', this.__updatePosition, listenOpts.passive)
      this.__updatePosition(0, evt, true)

      clearTimeout(this.timer)
      if (!this.noFocus && this.$refs.content) {
        this.$refs.content.focus()
      }
      this.timer = setTimeout(() => {
        document.body.addEventListener('mousedown', this.__bodyHide, true)
        document.body.addEventListener('touchstart', this.__bodyHide, true)
        this.showPromise && this.showPromiseResolve()
      }, 0)
    },
    __toggleKey (evt) {
      if (evt.keyCode === 13) {
        this.toggle(evt)
      }
    },
    __bodyHide (evt) {
      if (
        this.persistent || (
          evt && evt.target &&
          (this.$el.contains(evt.target) || this.anchorEl.contains(evt.target))
        )
      ) {
        return
      }

      this.hide(evt)
    },
    __hide () {
      this.__cleanup()
      this.hidePromise && this.hidePromiseResolve()
      if (!this.noRefocus && this.__refocusTarget) {
        this.__refocusTarget.focus()
        !this.__refocusTarget.classList.contains('q-if') && this.__refocusTarget.blur()
      }
    },
    __cleanup () {
      clearTimeout(this.timer)

      document.body.removeEventListener('mousedown', this.__bodyHide, true)
      document.body.removeEventListener('touchstart', this.__bodyHide, true)
      this.scrollTarget.removeEventListener('scroll', this.__updatePosition, listenOpts.passive)
      if (this.scrollTarget !== window) {
        window.removeEventListener('scroll', this.__updatePosition, listenOpts.passive)
      }
      window.removeEventListener('resize', this.__updatePosition, listenOpts.passive)
      EscapeKey.pop()

      this.$el.remove()
    },
    reposition (event, animate) {
      const { top, bottom, left, right } = this.anchorEl.getBoundingClientRect()

      if (
        !this.keepOnScreen &&
        (bottom < 0 || top > window.innerHeight || right < 0 || left > window.innerWidth)
      ) {
        return this.hide()
      }

      if (this.fit || this.cover) {
        const style = window.getComputedStyle(this.anchorEl)
        this.$el.style.minWidth = style.getPropertyValue('width')
        if (this.cover) {
          this.$el.style.minHeight = style.getPropertyValue('height')
        }
      }

      if (animate) {
        if (this.touchPosition) {
          const { top: eventTop, left: eventLeft } = eventPosition(event)
          this.touchOffset = { left: eventLeft - left, top: eventTop - top }
        } else {
          delete this.touchOffset
        }
      }

      setPosition({
        event,
        animate,
        el: this.$el,
        offset: this.offset,
        anchorEl: this.anchorEl,
        anchorOrigin: this.anchorOrigin,
        selfOrigin: this.selfOrigin,
        maxHeight: this.maxHeight,
        anchorClick: this.anchorClick,
        touchPosition: this.touchPosition,
        touchOffset: this.touchOffset,
        cover: this.cover,
      })
    },
  },
}
</script>

<style lang="scss">
@import "../../../styles/resources";

.q-popover {
  position: fixed;
  box-shadow: 0 4px 9.6px 0.4px rgba(74, 227, 135, 0.5);
  border-radius: 3px;
  background: white;
  z-index: var(--va-z-index-teleport-overlay);
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 100vw;
  outline: 0;
  font-family: var(--va-font-family);

  > .q-list:only-child {
    border: none;
  }

  &__container {
    width: 100%;
    overflow: auto;
  }
}

body div .q-popover {
  display: none;
}
</style>
