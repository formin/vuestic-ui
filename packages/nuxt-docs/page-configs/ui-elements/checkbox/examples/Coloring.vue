<template>
  <div>
    <va-checkbox color="primary" v-model="value" label="Primary" />
    <va-checkbox
      color="#990099"
      v-model="value"
      label="Custom color with icon"
      checked-icon="loop"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: true,
    };
  },
};
</script>
