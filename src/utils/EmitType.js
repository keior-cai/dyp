// 全局广播——提示信息
// emit:@/utils/Request.js
// on:@/App.vue
export const ShowToast = 'ShowToast';

// 全局广播——打开加载层
// emit:@/utils/Request.js
// on:@/App.vue
export const ShowLoading = 'ShowLoading';

// 全局广播——关闭加载层
// emit:@/utils/Request.js
// on:@/App.vue
export const CloseLoading = 'CloseLoading';

// 菜品详细页面点击左侧类别，右侧菜品列表跳到对应的类别位置
// emit:page/Food/components/LeftType
// on:page/Food/Food
export const GoToBscroll = 'GoToBscroll'

// 自选菜品详细页面点击左侧类别，右侧菜品列表跳到对应的类别位置
// emit:page/FoodSelf/components/LeftType
// on:page/FoodSelf/components/FoodList
export const GoToSelfBscroll = 'GoToSelfBscroll'

// 通知订单列表页面进行重新请求接口刷新订单列表
// emit:page/OrderConfirm/components/ConfirmBottom   --提交订单后刷新订单列表
//      page/OrderPay/components/PayBottom   --支付成功后刷新订单列表
//      page/OrderList/components/OrderButtom   --退款成功后,取消订单后刷新订单列表
// on:page/OrderList/OrderList
export const RefreshOrderList = 'RefreshOrderList';

// 自选菜品详细页面点击菜品的+打开规格选择组件
// emit:page/ProducSelft/components/ProductList
// on:page/ProducSelft/components/SpecsContainer
export const OpenSelftSpecs ='OpenSelftSpecs'

// 订单详细页面在配送完成状态下点击订单状态下的大按钮时跳到开箱页面
// emit:page/OrderDetail/components/OrderState/ProductList
// on:page/OrderDetail/OrderDetail
export const OrderDetailTabsNumber = 'OrderDetailTabsNumber';

// 检查用户是否第一次使用，若第一次使用则打开查看教程询问框
// emit:page/Login/Login
// on:page/Main/Main
export const CheckUserFirstUse = 'CheckUserFirstUse';