<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        @focus="onFocus"
        @blur="onBlur"
        @search="onSearch"
      >
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </form>
    <div class="body">
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
            @click="dyList(item.id)"
            >
            <div class="title" slot="title">
              {{item.name}}<span class="price">38</span><span class="price-q">元起</span>
            </div>
            <div slot="desc" class="dy-cntent">
              <div class="flex line-ellipsis">{{item.address}}</div>
            </div>
            <div slot="tags">
              <van-notice-bar :text="item.yyInfo" left-icon="volume-o" />
            </div>
          </van-card>
          <div slot="loading">
            <van-loading type="spinner" color="#1989fa">玩命加载中...</van-loading>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-overlay :style="{'z-index':2, 'margin-top':'6.375rem'}" :show="show" @click="show = !show" />
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      value: '',
      show: false,
      list: [],
      loading: false,
      finished: false,
      isLoading: false,
      page: 1,
      size: 10
    }
  },
  methods: {
    onSearch () {
      this.page = 1
      this.size = 10
      this.loadData(true)
    },
    onFocus () {
      this.show = true
    },
    onBlur () {
      this.show = false
    },
		loadData(reset = false){
			this.$Get(this.$API.CUSTOMER.CustmerQueryYYInfo, {
        page: this.page,
        size: this.size,
        name: this.value
			})
			.then(res => {
        if(res.data && res.data.length > 0) {
          if(reset){
            this.list = res.data
          }else {
            res.data.forEach(e => {
              this.list.push(e)
            })
          }
        } else {
          this.finished = true
          if (reset) {
            this.list = res.data
          }
        }
        this.loading = false
        this.isLoading = false
			})
		},
    dyList(id){
      this.$router.push(`/main/dyList/${id}`)
    },
    onLoad () {
      this.page++
      this.loadData()
    },
    onRefresh () {
      this.page = 1
      this.size = 10
      this.loadData(true)
    },
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style lang="stylus" scoped>
.title
  font-size 1rem
  color #000000
  height 1.4375rem
  line-height 1.4375rem
  .price
    font-size 1.125rem
    color #F03D37
    line-height 1.5
  .price-q
    margin-left 0.1875rem
    font-size 0.6875rem
    color #F03D37
.flex
  flex 1
  margin-top 0.375rem
.line-ellipsis
  text-overflow ellipsis
  overflow hidden
  white-space nowrap
.tag-footer
  margin-top 0.1875rem
  font-size 0.6875rem
  color #999999
>>> .van-card
  margin-left 0.9375rem
  border-bottom 0.03125rem solid #EEEEEE
  background-color #FFFFFF
  margin-top 0rem
.van-list
  background-color #FFFFFF
</style>
