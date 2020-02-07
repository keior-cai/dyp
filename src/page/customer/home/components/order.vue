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
            <van-image lazy-load :src="item.movieUrl" />
          </div>
          <div class="title" slot="title">
            {{item.movieName}}
            <van-tag type="primary" size="medium" plain v-if="item.version">{{item.version}}</van-tag>
           </div>
          <div slot="desc" class="dy-cntent">
            <div class="content-item">{{item.title}}</div>
            <div class="content-item show-info" :title="item.content">{{item.content}}</div>
          </div>
          <div slot="price">{{item.price}} * {{item.num}} = {{item.total}}</div>
          <div slot="num" class="go">
            <van-button round size="mini" type="danger" v-if="item.status == 1">已付款</van-button>
            <van-button round size="mini" type="info" v-if="item.status == 0">
              待支付
            </van-button>
            <van-count-down :time="5 *60 * 1000" v-if="item.status == 0">
              <template v-slot="timeData">
                <span class="item">{{timeData.minutes}}</span>
                <span class="item">{{timeData.seconds}}</span>
              </template>
            </van-count-down>
            <van-button round size="mini" type="info" v-if="item.status == 5">已超时</van-button>
            <van-button round size="mini" type="info" v-if="item.status == 4">已完成</van-button>
            <van-button round size="mini" type="info" v-if="item.status == 3">已过期</van-button>
            <van-button round size="mini" type="info" v-if="item.status == 2">已出票</van-button>
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
      status: '',
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
    outTime (time) {
      return (new Date(time)).getTime()
    },
    onClickItem (id, name) {
      this.go(id, name)
    },
    loadData (reset = false, page = 1, size = 10) {
      this.$Get(this.$API.CUSTOMER.CustomerQueryOrder, {
          page: this.page,
          size: this.size,
          status: this.status
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
  mounted () {
    this.status = this.$route.params.status
    this.loadData()
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
  .item
    display inline-block
    width 1.375rem
    margin-right 0.3125rem
    color #fff
    font-size 0.75rem
    text-align center
    background-color #1989FA
  >>> .underline
    border-bottom 0.03125rem solid #EEEEEE
  >>> .van-card
    color #666666
    background-color #FFFFFF
    margin-top 0rem
</style>
