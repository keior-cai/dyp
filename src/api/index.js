// import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }

// var baseUrl = 'http://localhost:9902/customer'
var baseUrl = 'http://dyp.customer.com:9902/customer'
// var baseUrl = 'http://47.106.78.139/customer'

export const API = {
  CUSTOMER : {
    CustomerQueryMovice: baseUrl + '/movie/queryMovie',
    CustmerQueryYYInfo: baseUrl + '/yy/queryYY',
    CustmerQueryMovieById : baseUrl + '/movie/queryMovieById',
    CustmerChooseYY : baseUrl + '/yy/chooseYY',
    CustmerQueryPSpace : baseUrl + '/space/queryPspace',
    CustmerOrderInsertUpdate : baseUrl + '/order/insertUpdate',
    CustmerPayOrder : baseUrl + '/order/payOrder',
    CustmerInfo : baseUrl + '/my/info',
    CustomerQueryOrder : baseUrl + '/order/queryOrder',
  },
	UPLOADURL : 'http://47.106.78.139:8012/tame/dfs/uploadByFile',
}
