<template>
  <div class="components-container">
    <div>
      <tinymce :height="300" v-model="content"/>
    </div>
  </div>
</template>
<script>
import tinymce from '@/components/tinymce'
export default {
  components: { tinymce },
  data() {
    return {
      content: ''
    }
  }
}
</script>

<style>

</style>
