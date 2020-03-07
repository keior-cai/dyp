<template>
  <div class="back-text">
    <van-nav-bar :fixed="true">
      <div class="backtext" slot="left" @click="onClickLeft">
        <van-icon name="arrow-left"></van-icon>
        <span>返回</span>
      </div>
      <div class="header-title" slot="title">{{name}}</div>
    </van-nav-bar>
    <div class="qrcode">
      <van-image
        width="300"
        height="300"
        :src="src"
      />
    </div>
    <div class="middle">
      <van-divider
        content-position="center"
        :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
        共:{{info.length}}张
      </van-divider>
    </div>
    <van-list>
      <van-card
        v-for="item in info"
        :key="item.id"
        >
        <div class="title" slot="title">
          <div class="address">{{item.address}}</div>
          <div class="spaceName">{{item.spaceName}}</div>
          <div class="location">{{item.location}}</div>
          <div class="upTime"><i class="el-icon-time"></i>{{item.upTime}}-<i class="el-icon-time"></i>{{item.downTime}}</div>
        </div>
        <van-divider dashed/>
      </van-card>
    </van-list>
    <div v-if="status == 0">
      <van-button type="info" block @click="pay">支付</van-button>
      <van-button type="danger" block @click="cancel">取消支付</van-button>
    </div>
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
        <div class="total">￥{{total | price(total) }}</div>
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
export default{
  data: function () {
    return {
      info: [],
      src: '',
      name: '',
      size: 0,
      numberShow: false,
      showInput: false,
      showKeyboard: false,
      password: '',
      isShow: true,
      showPopup: false,
      total: 0.00,
      orderSn: '',
      status: 0
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
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
          payPassword: this.password,
          yId: this.$route.params.yId
        }).then(res => {
          this.$toast.success('支付成功')
          this.numberShow = false
          this.showInput = false
          this.status = 1
        })
      }
    },
    pay () {
      this.showPopup = false
      this.showKeyboard = true
      this.showInput = true
      this.numberShow = true
    },
    passwordInput () {
      this.numberShow = true
      this.showKeyboard = true
    },
    onDeleted () {
      this.password = this.password.slice(0, this.password.length - 1)
    },
    cancel () {
      this.$Post(`${this.$API.CUSTOMER.CustomerCancelOrder}/${this.orderSn}/${this.$route.params.yId}`, {}).then(res => {
        this.$toast.success('取消支付成功')
        this.$router.go(-1)
      })
    }
  },
  mounted () {
    const data = {
      'orderSn': this.$route.params.orderSn,
      'yId': this.$route.params.yId
    }
    this.$Get(this.$API.CUSTOMER.CustomerqueryByOrderSn, data).then(res => {
      let order = res.data
      this.info = JSON.parse(res.data.info)
      this.size = this.info.length
      this.src = `${this.$API.QRCODE}/${order.yId}/${order.orderSn}`
      this.name = order.movieName
      this.total = order.total
      this.status = order.status
      this.orderSn = order.orderSn
    })
    this.$forceUpdate()
  }
}
</script>

<style lang="stylus" scoped>
  .qrcode
    text-align center
    margin 0 auto
  .header-title
    color #e54847
  .address
    font-family "arial, helvetica, sans-serif"
    font-size 1.375rem
    font-weight bold
  .spaceName
    font-size 1.125rem
  .location
    color #E6A23C
    font-size 0.9375rem
  .upTime
    font-size 0.9375rem
    color #F56C6C
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
