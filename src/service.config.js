
/* 统一后台接口配置 */

const MOCKSERVERURL = 'http://www.lpj.com/' // mock
const SERVERURL = 'http://localhost:3000/'

export default {
  getSwipeItems: `${MOCKSERVERURL}getSwipeItems`,
  getHotProducts: `${MOCKSERVERURL}getHotProducts`,
  getRecommendProducts: `${MOCKSERVERURL}getRecommendProducts`,

  registUser: `${SERVERURL}user/registUser`,
  loginUser: `${SERVERURL}user/loginUser`,
  getProductTypes: `${SERVERURL}type/getProductTypes`,
  getProductsByType: `${SERVERURL}product/getProductsByType`,
}