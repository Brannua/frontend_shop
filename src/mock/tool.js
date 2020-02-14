import Mock from 'mockjs'
let Random = Mock.Random

/* 生成模拟农机商品数据 */
export function mockProductData() {
  let productList = []
  for (let i = 0; i < 12; i++) {
    productList.push({
      name: Random.ctitle(5, 20),
      img: Random.dataImage('125x125', '农机' + Random.integer(1, 12)),
      price: Random.integer(1000, 10000),
      company: Random.cname(),
      city: Random.city()
    })
  }
  return productList
}

/* 生成模拟轮播图片数据 */
export function mockSwiperImage() {
  let imageList = []
  for (var i = 0; i < 4; i++) {
    imageList.push({
      imgSrc: Random.dataImage('320x180', '农机' + Random.integer(1, 4)),
    })
  }
  return imageList
}