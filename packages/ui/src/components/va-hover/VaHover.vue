<template>
  <div
    class="va-hover"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <slot v-bind="{ hover: valueComputed }" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStateful, useStatefulProps, useStatefulEmits } from '../../composables/useStateful'

export default defineComponent({
  name: 'VaHover',

  props: {
    ...useStatefulProps,
    disabled: { type: Boolean, default: false },
    modelValue: { type: Boolean, default: false },
  },

  emits: useStatefulEmits,

  setup (props, { emit }) {
    const { valueComputed } = useStateful(props, emit)

    const onMouseEnter = () => {
      if (!props.disabled) { valueComputed.value = true }
    }

    const onMouseLeave = () => {
      if (!props.disabled) { valueComputed.value = false }
    }

    return { onMouseEnter, onMouseLeave, valueComputed }
  },
})
</script>
