<template>
  <div>
    <va-button-toggle
      color="primary"
      v-model="model"
      :options="options"
      class="mb-4"
    />

    <va-button-toggle
      color="success"
      v-model="model"
      :options="options"
      class="mb-4"
    />

    <va-button-toggle
      color="warning"
      v-model="model"
      :options="options"
      class="mb-4"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        { label: "One", value: "one" },
        { label: "Two", value: "two" },
        { label: "Three", value: "three" },
      ],
      model: "two",
    };
  },
};
</script>
