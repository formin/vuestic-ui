<template>
  <div
    class="va-card__title"
    :style="titleStyles"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'

import { useColors } from '../../composables/useColor'

export default defineComponent({
  name: 'VaCardTitle',
  props: {
    textColor: { type: String as PropType<string> },
  },
  setup (props) {
    const { getColor } = useColors()

    return {
      titleStyles: computed(() => ({
        color: props.textColor ? getColor(props.textColor) : '',
      })),
    }
  },
})
</script>
