/**
 * @description 统一后台接口配置
 * @author Brannua
 */

const MOCKSERVERURL = 'http://www.lpj.com/'
const SERVERURL = 'http://localhost:3000/'

export default {
  getSwipeItems: `${MOCKSERVERURL}getSwipeItems`,
  getHotProducts: `${MOCKSERVERURL}getHotProducts`,
  getRecommendProducts: `${MOCKSERVERURL}getRecommendProducts`,

  registUser: `${SERVERURL}user/registUser`,
  loginUser: `${SERVERURL}user/loginUser`,
  getProductTypes: `${SERVERURL}type/getProductTypes`,
  getProductsByType: `${SERVERURL}product/getProductsByType`,
  getProductDetailById: `${SERVERURL}product/getProductDetailById`,
  addProductToCart: `${SERVERURL}cart/addProductToCart`,
  getCartByUserId: `${SERVERURL}cart/getCartByUserId`,
  deleteProductInCartByProductId: `${SERVERURL}cart/deleteProductInCartByProductId`,
}