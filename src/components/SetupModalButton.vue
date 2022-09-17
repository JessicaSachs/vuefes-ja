<script lang="ts" setup>
type ButtonType = 'primary' | 'secondary'
const props = withDefaults(defineProps<{
  type?: ButtonType
  iconClass?: string
}>(), {
  type: 'primary',
})

const classes = computed(() => ({
  primary: 'border-purple-600 bg-purple-600 text-white',
  secondary: 'border-purple-300',
}[props.type]))
</script>

<template>
  <button :class="classes" class="text-xl font-bold text-center text-purple-600 rounded-60px hover:ring-purple-300 hover:ring-2px m-2px py-16px min-w-176px  border-1">
    <slot name="icon" /><slot />
  </button>
</template>
