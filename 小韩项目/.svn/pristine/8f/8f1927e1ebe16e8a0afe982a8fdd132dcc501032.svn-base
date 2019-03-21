<template>
  <div>
    <svg
      :class="{'is-active':isActive}"
      t="1492500959545"
      class="hamburger"
      style=""
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="1691"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="64"
      height="64"
      @click="toggleClick">
      <path d="M191.488 190.464q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l695.296 0q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-695.296 0zM191.488 443.392q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l631.808 0q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-631.808 0zM886.784 569.344q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-695.296 0q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l695.296 0zM823.296 822.272q26.624 0 45.056 18.432t18.432 45.056-18.432 45.056-45.056 18.432l-631.808 0q-26.624 0-45.056-18.432t-18.432-45.056 18.432-45.056 45.056-18.432l631.808 0z" p-id="2446" fill="#ffffff"/>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'Hamburger',
  props: {
    isActive: {
      type: Boolean,
      default: false
    },
    toggleClick: {
      type: Function,
      default: null
    }
  }
}
</script>

<style scoped>
.hamburger {
	display: inline-block;
	cursor: pointer;
	width: 20px;
	height: 20px;
	transform: rotate(90deg);
	transition: .38s;
	transform-origin: 50% 50%;
}
.hamburger.is-active {
	transform: rotate(0deg);
}
</style>
