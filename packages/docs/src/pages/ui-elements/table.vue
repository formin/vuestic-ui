<template>
  <docs-content :config="configComputed" />
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import DocsContent from '../../components/DocsContent.vue'
import tableConfig from '../../page-configs/ui-elements/table/page-config'

@Options({
  name: 'DocsStylesTable',
  components: {
    DocsContent,
  },
})
export default class Table extends Vue {
  get configComputed () {
    return tableConfig
  }
}
</script>
