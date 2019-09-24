<template>
    <div>
        <slot name="inview" v-bind="{ action, hasEnter, hasLeave }" v-inview:on="inviewAction"></slot>
    </div>
</template>

<script>
export default {
  props: [ 'enter', 'leave' ],
  data () {
    return {
      action: '',
      hasEnter: false,
      hasLeave: false
    }
  },
  methods: {
    inviewAction (act) {
      act.enter = this.elementEnter
      act.exit = this.elementExit
    },
    elementEnter (el) {
      this.action = 'enter'
      if (!this.hasEnter) this.hasEnter = true
      if (this.enter && typeof this.enter === 'function') this.enter(el)
    },
    elementExit (el) {
      this.action = 'leave'
      if (!this.hasLeave) this.hasLeave = true
      if (this.leave && typeof this.leave === 'function') this.leave(el)
    }
  }
}
</script>