<template>
  <span :class="['badge', Type]">
    {{Text}}
  </span>
</template>

<script>
import {computed} from "vue";

export default {
  name: 'AppStatus',
  props: {
    Status: String
  },
  setup(props) {
    const Type = computed(() => {
      if (props.Status === 'active' || props.Status === 'done') return 'primary'
      if (props.Status === 'pending') return 'warning'
      if (props.Status === 'cancelled') return 'danger'
    })
    const Text = computed(() => {
      if (props.Status === 'active') return 'активно'
      if (props.Status === 'pending') return 'Выполняется'
      if (props.Status === 'done') return 'Выполнено'
      if (props.Status === 'cancelled') return 'Отменено'
    })
    return {
      Type, Text
    }
  }
}
</script>