<template>
  <a
    :id="anchor"
    :style="{ color: colors.primary }"
    :href="`#${anchor}`"
  > #</a>
</template>
<script lang='ts'>
import { defineComponent, PropType, computed } from 'vue'
import { kebabCase } from 'lodash'
import { TranslationString } from '../components/DocsApi/ManualApiOptions'
import { getColors } from '../../../ui/src/main'

export default defineComponent({
  name: 'DocsAnchor',
  props: {
    text: { type: String as PropType<TranslationString> },
  },
  setup: (props) => ({
    anchor: computed(() => kebabCase(props.text)),
    colors: computed(() => getColors()),
  }),
})
</script>
