<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="我是有底线的..."
        @load="onLoad"
        >
        <van-card
          v-for="item in list"
          :key="item.id"
          :class="{'underline':true}"
          @click="onClickItem(item.id, item.name)"
        >
          <div slot="thumb">
            <van-image lazy-load :src="item.imgUrl" />
          </div>
          <div class="title" slot="title">
            {{item.name}}
            <van-tag type="primary" size="medium" plain v-if="item.version">{{item.version}}</van-tag>
           </div>
          <div slot="desc" class="dy-cntent">
            <div class="content-item" v-if="item.sc">观众评分:<span class="pf">{{item.sc}}</span></div>
            <div class="content-item">{{item.title}}</div>
            <div class="content-item">{{item.star}}</div>
            <div class="content-item show-info" :title="item.content">{{item.content}}</div>
          </div>
          <!-- <div slot="price">2</div> -->
          <div slot="num" class="go">
            <van-button round size="mini" @click="go(item.id, item.name)" type="danger" v-if="item.status == 1">购买</van-button>
            <van-button round size="mini" type="info" v-else>预售</van-button>
          </div>
        </van-card>
        <div slot="loading">
          <van-loading type="spinner" color="#1989fa">玩命加载中...</van-loading>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    onLoad () {
      this.page++
      this.loadData()
    },
    onRefresh () {
      this.page = 1
      this.size = 10
      this.loadData(true)
    },
    go (id, name) {
      this.$router.push({
        name: `movies`,
        params: {
          name: name,
          id: id
        }
      })
    },
    onClickItem (id, name) {
      this.go(id, name)
    },
    chooseYY () {
      this.$Post(`${this.$API.CUSTOMER.CustmerChooseYY}/${this.id}`, {}).then(res => {})
    },
    loadData (reset = false, page = 1, size = 10) {
      this.$Get(this.$API.CUSTOMER.CustomerQueryMovice, {
          id: this.id,
          page: this.page,
          size: this.size
        }).then(res => {
          if (res.data.details && res.data.details.length > 0) {
            if (reset) {
              this.list = res.data.details
            } else {
              res.data.details.forEach((e) => {
                this.list.push(e)
              })
            }
          } else {
            this.finished = true
          }
          this.loading = false
          this.isLoading = false
      })
    }
  },
  created () {
    this.id = this.$route.params.id
    this.loadData()
    this.chooseYY()
  }
}
</script>

<style lang="stylus" scoped>
  .title
    font-size 1.0625rem
    font-weight 700
    color #000000
  .dy-cntent div
    margin-top 0.1875rem
    margin-bottom 0.1875rem
    .pf
      color #FAAF00
      font-size 0.9375rem
      font-weight 700
    .content-item
      font-size 0.8125rem
      color #666666
  .go
    position absolute
    top 50%
    right 0.625rem
    transform translateY(-50%)
  >>> .underline
    border-bottom 0.03125rem solid #EEEEEE
  >>> .van-card
    color #666666
    background-color #FFFFFF
    margin-top 0rem
</style>
