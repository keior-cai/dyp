import Bus from './Bus.js';
import * as EmitType from './EmitType.js';

// 提示文字信息
export const ShowToast = value => {
	Bus.$emit(EmitType.ShowToast, value)
}

// 打开加载层
export const ShowLoading = () => {
	Bus.$emit(EmitType.ShowLoading)
}

// 关闭加载层
export const CloseLoading = () => {
	Bus.$emit(EmitType.CloseLoading)
}

// 询问框
// 使用位置:
// @/page/User/components/UserList
// @/page/Address/Address
// @/page/OpenBox/components/ToolBar
// @/page/Food/components/ShoppingCarList
// @/page/FoodSelf/components/ShoppingCar
// @/page/FoodSelf/components/ShoppingCarList
// @/page/OrderList/components/OrderButtom
// @/page/OrderTypeList/components/OrderButtom