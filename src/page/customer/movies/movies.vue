<template>
  <div>
    <van-nav-bar :fixed="true" v-show="isShowTitle">
      <div slot="left" v-show="isShow" @click="onClickLeft">
        <van-icon name="arrow-left"></van-icon>
        <span class="back-text">返回</span>
      </div>
      <div class="title" slot="title">{{moviesInfo.name}}</div>
      <!-- <van-icon name="search" slot="right" @click="onClickRight" /> -->
    </van-nav-bar>
    <div class="body">
      <van-card
        :num="moviesInfo.num"
        :desc="moviesInfo.content"
        :title="moviesInfo.title"
        :thumb="moviesInfo.imgUrl"
      >
        <div slot="price">
          <div>{{ moviesInfo.upTime | formatTime('YYYY-MM-DD') }}  上映</div>
          <div>{{ moviesInfo.downTime | formatTime('YYYY-MM-DD') }}  下线</div>
        </div>
      </van-card>
    </div>
    <van-tabs v-model="activeName" @click="onClick">
      <van-tab
        v-for="item in pspaceList"
        :key="item"
        :name="item"
        :title="item | formatTime('MM月DD日')"
      />
    </van-tabs>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的..."
      @load="onLoad"
      >
        <div
          v-for="item in spaceList"
          :key="item.id"
          :class="{'underline':true}"
          @click="onClickItem(item)">
          <div class="item-div name">
            <span class="title">电影场地名称:</span><span class="value">{{item.name}}</span>
          </div>
          <div class="item-div address">
            <span class="title">影院位置:</span><span class="value">{{item.address}}</span>
          </div>
          <div class="item-div price">
            <span class="title">影票单价:</span><span class="red value">{{item.price}}元</span>
            <span class="title vip-price">VIP单价:</span><span class="red value">{{item.vipPrice}}元</span>
          </div>
          <div class="item-div time">
            <span class="title">播放时间:</span><span class="value">{{item.upTime}}</span>
            <span class="title downTime">结束时间:</span><span class="value">{{item.downTime}}</span>
          </div>
        </div>
      <div slot="loading">
        <van-loading type="spinner" color="#1989fa">玩命加载中...</van-loading>
      </div>
    </van-list>
    <van-popup
      v-model="showPopup"
      round
      :style="{'height':'70%'}"
      position="bottom">
      <van-notice-bar :scrollable="false" left-icon="volume-o">
        已选座位: {{size}}   | 购买影票数量: {{size}}
      </van-notice-bar>
      <div class="line fe">屏幕</div>
      <div v-for="(item, index) in spaceLists"
        :key="item"
        :index="index" style="text-align: center;">
        <div v-for="(i, iIndex) in item" :index="iIndex"
          @click="itemClick(index, iIndex, $event)"
          :key="i"
          :class="{
          'infoItem': true,
          'color': i
          }"/>
      <van-submit-bar
        :price="total"
        :disabled="size == 0"
        button-text="提交订单"
        @submit="submitOrder"/>
    </van-popup>
    <van-overlay :show="showInput">
      <div class="passPopup">
        <div class="content">
          <div class="closse">
            <van-icon
              name="cross"
              @click="overLayClick()"
            />
          </div>
          <div class="title">请输入支付密码</div>
        </div>
        <div class="tip">电影票:{{size}}张</div>
        <div class="total">￥{{total /100 }}</div>
        <van-password-input
          v-if="showInput"
          :value="password"
          info="请输入6位密码"
          :focused="showKeyboard"
          @focus="passwordInput"
        />
      </div>
      <van-number-keyboard
        :show="numberShow"
        @input="onInput"
        @delete="onDeleted"
      />
    </van-overlay>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      isShowTitle: true,
      numberShow: false,
      showInput: false,
      showKeyboard: false,
      password: '',
      isShow: true,
      showPopup: false,
      moviesInfo: {},
      pspaceList: [],
      spaceLists: [],
      activeName: '',
      spaceList: [],
      total: 0,
      finished: false,
      loading: true,
      location: [],
      id: '',
      size: 0,
      info: {},
      orderSn: '',
      my: {}
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    onClickRight () {

    },
    overLayClick () {
      this.showInput = false
      this.numberShow = false
    },
    onInput (key) {
      this.password = (this.password + key).slice(0, 6)
      if (this.password.length >= 6) {
        this.numberShow = false
        this.$Post(this.$API.CUSTOMER.CustmerPayOrder, {
          orderSn: this.orderSn,
          payPassword: this.password
        }).then(res => {
          this.$toast.success('支付成功')
          // 下单成功
          this.loadData()
          this.numberShow = false
          this.showInput = false
          this.size = 0
          this.total = 0
          this.location = []
          this.password = ''
        })
      }
    },
    passwordInput () {
      this.numberShow = true
      this.showKeyboard = true
    },
    onDeleted () {
      this.password = this.password.slice(0, this.password.length - 1)
    },
    onClick (name, title) {
      this.onLoad(name)
    },
    onClickItem (item) {
      this.showPopup = true
      this.info = item
      if (this.spaceLists.length <= 0 || item.id != this.id) {
        this.id = item.id
        this.spaceLists = JSON.parse(item.info)
        this.size = 0
      }
    },
    submitOrder () {
      let info = []
      this.$Get(this.$API.CUSTOMER.CustmerInfo, {}).then(res => {
        this.my = res.data
      })
      this.location.forEach(e => {
        info.push({
          id: this.moviesInfo.id,
          movieName: this.info.movieName,
          address: this.info.address,
          spaceName: this.info.name,
          upTime: this.info.upTime,
          downTime: this.info.downTime,
          location: `${e.x + 1}行${e.y + 1}位`
        })
      })
      console.log(this.my)
      let price = this.my.isVip == 1 ? this.info.vipPrice : this.info.price
      let data = {
        psId: this.id,
        movieUrl: this.moviesInfo.imgUrl,
        movieName: this.info.movieName,
        title: this.moviesInfo.title,
        content: this.moviesInfo.content,
        info: JSON.stringify(info),
        mId: this.moviesInfo.id,
        isVip: this.my.isVip,
        num: this.size,
        total: this.total / 100,
        price: price,
        status: 0,
        location: this.location
      }
      this.$Post(this.$API.CUSTOMER.CustmerOrderInsertUpdate, data).then(res => {
        this.showPopup = false
        this.showKeyboard = true
        this.showInput = true
        this.numberShow = true
        this.orderSn = res.data
      })
    },
    onLoad (name = '') {
      if (name === '') {
        name = this.activeName
      }
      this.spaceList = []
      this.finished = false
      this.loading = true
      this.$forceUpdate()
      this.$Get(this.$API.CUSTOMER.CustmerQueryPSpace, {
        mId: this.moviesInfo.id,
        page: 1,
        size: 10000,
        date: name
      }).then(res => {
        this.spaceList = res.data.details
        this.finished = true
        this.loading = false
        this.$forceUpdate()
      })
    },
    itemClick (l, r, elem) {
      let flag = false
      this.location.forEach(e => {
        if (e.x == l && e.y == r) {
          this.size--
          this.total -= this.info.price * 100
          flag = true
        }
      })
      if (this.spaceLists[l][r] == 0) {
        this.size++
        this.total += this.info.price * 100
        this.spaceLists[l][r] = 1
        this.location.push({x: l, y: r})
      }
      if (flag) {
        this.spaceLists[l][r] = 0
        this.location = this.location.filter(e => !(e.x == l && e.y == r))
      }
      this.$forceUpdate()
    },
    loadData () {
      this.$Get(`${this.$API.CUSTOMER.CustmerQueryMovieById}/${this.moviesInfo.id}`, {})
        .then(res => {
          this.moviesInfo = res.data
        })
    },
    loadNav () {
      let date1 = new Date()
      let values = date1.toLocaleDateString().split('/')
      let date = new Date(values[0], values[1], values[2])
      for (var i = 0; i < 5; i++) {
        date.setTime(date1.getTime() + i * 24 * 60 * 60 * 1000)
        if (i === 0) {
          this.activeName = date.toLocaleDateString().replace('/', '-').replace('/', '-')
        }
        this.pspaceList.push(date.toLocaleDateString().replace('/', '-').replace('/', '-'))
      }
    }
  },
  props: {

  },
  mounted () {
    this.moviesInfo = this.$route.params
    this.loadData()
    this.loadNav()
    this.onLoad()
  }
}
</script>

<style scoped lang="stylus">
  .body
    margin-top 2.875rem
    padding 0.625rem 0
    background-color #AAAAAA
    color #FFFFFF
    font-size 0.875rem
  .name
    margin-top 0.75rem
  .item-div
    width 100%
    height 2.375rem
    color #000000
    padding-left 1.5625rem
    background-color #FFFFFF
    .underline
      border 0.0625rem solid #EEEEEE
      margin-top 0.5rem
    .red
      color #F03D37
    .title
      margin-right 0.625rem
    .downTime
      margin-left 1.75rem
    .vip-price
      margin-left 3.375rem
  .fe
    background-color #FFFFFF
    height 5rem
    border 0.0625rem solid #999999
    cursor default
    color #000000
    line-height 5rem
    margin-bottom 1.25rem
  .color
    background-color red
  .infoItem
    width 1.25rem
    height 1.25rem
    cursor pointer
    margin-left 0.1875rem
    border 0.0625rem solid #999999
    display inline-block
    text-align center
    margin-top 0.3125rem
  .line
    clear left
    cursor pointer
    text-align center
    border-radius 0.25rem
    margin 0 auto
    width 80%
    background-color #409EFF
    color #FFFFFF
  .passPopup
    background-color #FFFFFF
    position relative
    top 3.125rem
    width 90%
    margin 0 auto
    font-size 0.875rem
    color #000000
    .content
      position relative
      text-align center
      .closse
        text-align left
        float left
        color #EEEEEE
      .title
        display inline-block
        text-align center
        margin 0 auto
        font-family "arial black"
        font-size 1rem
    .total
      margin 0 auto
      text-align center
      font-family "arial black"
      font-weight bold
      font-size 1.375rem
    .tip
      margin 0 auto
      text-align center
      font-family "arial black"
      font-size 1rem
      color #333333
>>> .van-card
  background-color #AAAAAA
  div
    color #FFFFFF
>>> .van-password-input
    background-color #FFFFFF
    padding 0.625rem
    top 25%
</style>
