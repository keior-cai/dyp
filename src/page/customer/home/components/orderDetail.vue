<template>
  <van-list>
    <van-card
      v-for="item in info"
      :key="item.id"
      >
      <div class="title" slot="title">
        <div>{{item.address}}</div>
        <div>{{item.spaceName}}</div>
        <div>{{item.location}}</div>
        <div>{{item.upTime}}-{{item.downTime}}</div>
      </div>
    </van-card>
  </van-list>
</template>

<script>
  export default{
    data: function () {
      return {
        info: []
      }
    },
    methods: {

    },
    mounted () {
      const str = this.$route.params.info
      this.info = JSON.parse(str)
      console.log(this.info)
      this.$forceUpdate()
    }
  }
</script>

<style>
</style>
