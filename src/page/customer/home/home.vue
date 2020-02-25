<template>
  <div>
    <van-nav-bar :fixed="true" v-show="isShowTitle">
      <div slot="left" v-show="isShow" @click="onClickLeft">
        <van-icon name="arrow-left"></van-icon>
        <span class="back-text">返回</span>
      </div>
      <div class="title" slot="title">{{title}}</div>
      <!-- <van-icon name="search" slot="right" @click="onClickRight" /> -->
    </van-nav-bar>
    <div :class="{
      'body': true,
      'no-margin': noMarginTop
      }">
      <!-- <keep-alive> -->
        <router-view/>
      <!-- </keep-alive> -->
    </div>
    <div class="footer">
      <div style="width:100%;">
        <mu-bottom-nav
          :value.sync="shift"
          shift
          color="#e54847"
          @change="change"
          >
          <mu-bottom-nav-item value="yyList" to="/main/yyList" title="电影院" icon="videocam"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="order" to="/main/order" title="订单" icon="library_books"></mu-bottom-nav-item>
          <mu-bottom-nav-item value="my" to="/main/my" title="我的" icon="person"></mu-bottom-nav-item>
        </mu-bottom-nav>
      </div>
      <!-- <van-tabbar v-model="active" router>
        <van-tabbar-item icon="video-o" to="/main/dyList">电影</van-tabbar-item>
        <van-tabbar-item icon="send-gift-o" to="/main/yyList">影院</van-tabbar-item>
        <van-tabbar-item icon="contact" to="/main/my" info="20">我的</van-tabbar-item>
      </van-tabbar> -->
    </div>
  </div>
</template>

<script>
import DyList from './components/dyList'
export default{
  name: '',
  data () {
    return {
      title: '电影票',
      isShow: false,
      active: 0,
      shift: 'yyList',
      isShowTitle: true,
      noMarginTop: false
    }
  },
  methods: {
    change (active) {
      if (active === 'my') {
        this.isShowTitle = false
        this.noMarginTop = true
      } else {
        this.isShowTitle = true
      }
      this.shift = active
    },
    onClickLeft () {
      this.$router.go(-1)
    }
    // onClickRight () {
    //   this.$toast(111)
    // }
  },
  props: {
  },
  components: {
    DyList
  },
  mounted () {
    let activeName = this.$router.history.current.name
    this.change(activeName)
  }
}
</script>

<style lang="stylus" scoped>
.title
  color #e54847
.back-text
  color #1989fa
.body
  margin-top 2.875rem
  margin-bottom 3.125rem
.no-margin
  margin-top 2.5rem
.footer
  position fixed
  bottom 0rem
  width 100%
</style>
