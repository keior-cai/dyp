<template>
  <div>
    <div class="title-fix">
      我的
    </div>
    <van-row
      class="image"
    >
      <van-col
        span="4"
        offset="1"
      >
        <van-image
          width="90px"
          height="90px"
          :src="info.img"
          :style="{
            'padding-bottom': '10px'
          }"
        >
        <template v-slot:loading>
          <van-loading type="spinner" size="20"></van-loading>
        </template>
        <template v-slot:error>
          <van-icon name="info-o" />
        </template>
      </van-image>
      </van-col>
      <van-col span="6" offset="4">
        <div class="wx-name">
          {{info.wechatName}}
        </div>
      </van-col>
      <van-col span="1" offset="6">
        <van-icon
          name="arrow"
          :style="{
            'line-height': '6rem',
            'color': '#FFFFFF'
          }"
        />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="24">
        <van-grid
          :column-num="4"
          :border="false"
          square
          clickable
        >
          <van-grid-item
            v-for="item in navList"
            :key="item.id"
            @click="click(item.id)"
          >
            <div solt="icon">
              <van-icon :style="{
                'font-size': '2rem',
                'color': item.color ? item.color : '#000000'
              }"
              :name="item.icon"></van-icon>
            </div>
            <div solt="text">{{item.name}}</div>
          </van-grid-item>
        </van-grid>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      info: {},
      navList: [
        {
          id: 1,
          icon: 'coupon-o',
          name: '全部订单',
          color: '#1989fa'
        },
        {
          id: 2,
          icon: 'todo-list-o',
          name: '待付款订单',
          color: '#FF6034'
        },
        {
          id: 3,
          icon: 'balance-list-o',
          name: '已完成订单',
          color: '#00D500'
        },
        {
          id: 4,
          icon: 'like',
          name: '我想看的',
          color: '#e54847'
        },
        {
          id: 5,
          icon: 'shopping-cart-o',
          name: '购物车',
          color: '#EE0A24'
        },
        {
          id: 6,
          icon: 'vip-card-o',
          name: 'VIP',
          color: '#FAAF00'
        },
        {
          id: 7,
          icon: 'chat-o',
          name: '评论',
          color: ''
        },
        {
          id: 8,
          icon: 'location-o',
          name: '我去过的',
          color: 'blue'
        },
        {
          id: 9,
          icon: 'setting-o',
          name: '设置',
          color: ''
        }
      ]
    }
  },
  methods: {
    onClickInfo () {
      this.$router.push('/user/info/' + 2)
    },
    loadData () {
      this.$Get(this.$API.CUSTOMER.CustmerInfo, {}).then(res => {
        this.info = res.data
      })
    },
    click (id) {
      if (id === 7 || id === 5 || id === 8) {
        this.$toast.success('该功能暂未开放')
      } else if (id == 1) {
        this.$router.push({
          name: 'order',
          params: {
            status: ''
          }
        })
        this.$emit('change', ['order'])
      } else if (id == 2) {
        this.$router.push({
          name: 'order',
          params: {
            status: 0
          }
        })
        this.$emit('change', ['order'])
      } else if (id == 3) {
        this.$router.push({
          name: 'order',
          params: {
            status: 4
          }
        })
        this.$emit('change', ['order'])
      }
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="stylus" scoped>
.title-fix
  padding 0.625rem
  height 2.5rem
  width 100%
  color #FFFFFF
  position fixed
  top 0rem
  background-color #e54847
  z-index 2
.image
  background-color #e54847
.body
  margin 0rem
.wx-name
  color #FFFFFF
  margin-top 0.625rem
  font-size 1.25rem
>>>.van-grid-item__content--center
  border-bottom 0.0625rem solid #EEEEEE
  border-left 0.0625rem solid #EEEEEE
</style>
