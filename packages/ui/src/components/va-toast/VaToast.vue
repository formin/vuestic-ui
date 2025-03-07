<template>
  <transition name="va-toast-fade">
    <div
      v-show="visible"
      :class="['va-toast', ...toastClasses]"
      :style="toastStyles"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      @click="onToastClick"
      role="alert"
      ref="rootElement"
    >
      <div class="va-toast__group">
        <h2 v-if="$props.title" class="va-toast__title" v-text="$props.title" />

        <div class="va-toast__content" v-show="$props.message">
          <div v-if="$props.dangerouslyUseHtmlString" v-html="computedMessage" />
          <p v-else v-text="computedMessage" />
        </div>

        <div class="va-toast__content" v-if="$props.render">
          <VaToastRenderer :render="$props.render" />
        </div>

        <va-icon
          v-if="$props.closeable"
          size="small"
          :name="$props.icon"
          class="va-toast__close-icon"
          @click.stop="onToastClose"
        />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, computed, onMounted } from 'vue'

import { useColors } from '../../composables/useColor'
import { useTimer } from '../../composables/useTimer'
import { useTextColor } from '../../composables/useTextColor'
import VaIcon from '../va-icon/VaIcon.vue'

import { NotificationPosition } from './types'

const VaToastRenderer = defineComponent({
  name: 'VaToastRenderer',
  props: {
    render: { type: Function, required: true },
  },
  setup: (props) => () => props.render(),
})

export default defineComponent({
  name: 'VaToast',
  components: { VaIcon, VaToastRenderer },
  emits: ['on-click', 'on-close'],
  props: {
    title: { type: String as PropType<string>, default: '' },
    offsetY: { type: Number as PropType<number>, default: 16 },
    offsetX: { type: Number as PropType<number>, default: 16 },
    message: { type: [String, Function], default: '' },
    dangerouslyUseHtmlString: { type: Boolean as PropType<boolean>, default: false },
    icon: { type: String as PropType<string>, default: 'close' },
    customClass: { type: String as PropType<string>, default: '' },
    duration: { type: Number as PropType<number>, default: 5000 },
    color: { type: String as PropType<string>, default: '' },
    closeable: { type: Boolean as PropType<boolean>, default: true },
    onClose: { type: Function },
    onClick: { type: Function },
    multiLine: { type: Boolean as PropType<boolean>, default: false },
    position: {
      type: String as PropType<NotificationPosition>,
      default: 'top-right',
      validator: (value: string) => ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value),
    },
    render: { type: Function },
  },
  setup (props, { emit }) {
    const { getColor } = useColors()

    const { textColorComputed } = useTextColor(props.color)

    const rootElement = ref<HTMLElement>()

    const visible = ref(false)

    const positionX = computed(() => {
      return props.position.includes('right') ? 'right' : 'left'
    })

    const positionY = computed(() => {
      return props.position.includes('top') ? 'top' : 'bottom'
    })

    const toastClasses = computed(() => [
      props.customClass,
      props.multiLine ? 'va-toast--multiline' : '',
    ])

    const toastStyles = computed(() => ({
      [positionY.value]: `${props.offsetY}px`,
      [positionX.value]: `${props.offsetX}px`,
      backgroundColor: getColor(props.color),
      color: textColorComputed.value,
    }))

    const computedMessage = computed(() => (typeof props.message === 'function') ? props.message() : props.message)

    const destroyElement = () => {
      rootElement.value?.removeEventListener('transitionend', destroyElement)

      rootElement.value?.remove()
    }

    const onToastClick = () => {
      if (typeof props.onClick === 'function') {
        props.onClick()
      } else {
        emit('on-click')
      }
    }

    const onToastClose = () => {
      visible.value = false

      rootElement.value?.addEventListener('transitionend', destroyElement)

      if (typeof props.onClose === 'function') {
        props.onClose()
      } else {
        emit('on-close')
      }
    }

    const timer = useTimer()
    const clearTimer = timer.clear
    const startTimer = () => {
      if (props.duration > 0) {
        timer.start(() => visible.value && onToastClose(), props.duration)
      }
    }

    onMounted(() => {
      visible.value = true

      startTimer()
    })

    return {
      visible,
      toastClasses,
      toastStyles,
      computedMessage,
      onToastClick,
      onToastClose,
      startTimer,
      clearTimer,
    }
  },
})
</script>

<style lang="scss">
@import "../../styles/resources";
@import "variables";

.va-toast {
  position: fixed;
  box-sizing: border-box;
  width: var(--va-toast-width);
  padding: var(--va-toast-padding);
  display: flex;
  align-items: center;
  border-radius: var(--va-toast-border-radius);
  border: 1px solid var(--va-toast-border-color);
  background-color: var(--va-toast-background-color);
  color: var(--va-toast-color);
  box-shadow: var(--va-toast-box-shadow);
  transition: var(--va-toast-transition);
  overflow: hidden;
  z-index: var(--va-toast-z-index);
  font-family: var(--va-font-family);

  &--multiline {
    min-height: 70px;
  }

  &--right {
    right: 16px;
  }

  &--left {
    left: 16px;
  }

  &__group {
    margin-left: var(--va-toast-group-margin-left);
    margin-right: var(--va-toast-group-margin-right);
  }

  &__title {
    font-weight: var(--va-toast-title-font-weight);
    font-size: var(--va-toast-title-font-size);
    color: var(--va-toast-title-color);
    margin: var(--va-toast-title-margin);
  }

  &__content {
    font-size: var(--va-toast-content-font-size);
    line-height: var(--va-toast-content-line-height);
    padding-right: var(--va-toast-content-padding-right);

    p,
    div {
      margin: 0;
    }
  }

  &__icon {
    height: var(--va-toast-icon-height);
    width: var(--va-toast-icon-width);
    font-size: var(--va-toast-icon-font-size);
  }

  &__close-icon {
    position: absolute;
    top: 50%;
    right: var(--va-toast-close-icon-right);
    cursor: pointer;
    transform: translateY(-50%);
    font-size: var(--va-toast-close-icon-font-siz);

    &:hover {
      color: var(--va-toast-hover-color);
    }
  }
}

.va-toast-fade-enter {
  &.right {
    right: 0;
    transform: translateX(100%);
  }

  &.left {
    left: 0;
    transform: translateX(-100%);
  }
}

.va-toast-fade-leave-active {
  opacity: 0;
}
</style>
