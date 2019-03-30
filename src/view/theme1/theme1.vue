<template>
    <div>
      <Button @click="tiao">500</Button>
      <Button @click="hao">401</Button>
      <Button @click="lll">set</Button>
    </div>
</template>
<script>
export default {
  methods: {
    tiao () {
      console.log('error_500')
      this.$router.push({
        name: 'error_500'
      })
    },
    hao () {
      console.log('error_401')
      this.$router.push({
        name: 'error_401'
      })
    },
    lll () {
      console.log('set')
      this.$router.push({
        name: 'all_site'
      })
    }
  }
}
</script>
<style lang="less" scope>

</style>
