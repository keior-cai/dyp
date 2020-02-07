import moment from 'moment/moment';
// 时间格式转换
export const formatTime = (time, formatString = 'YYYY-MM-DD HH:mm:ss') => {
  return moment(time).format(formatString);
};

const filters = {
  // 格式化时间
  formatTime: (time, format = 'YYYY-MM-DD HH:mm:ss') => {
    return formatTime(time, format);
  }
};

export default {
  install: Vue => {
    for (let key in filters) {
      Vue.filter(key, filters[key]);
    }
  }
};
