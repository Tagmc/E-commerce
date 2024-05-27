const path = {
  PUBLIC: '/',
  HOME: '',
  ALL: '*',
  LOGIN: 'login',
  PRODUCTS__CATEGORY: ':category',
  BLOGS: 'blogs',
  OUR_SERVICES: 'services',
  FAQ: 'faqs',
  DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
  FINAL_REGISTER: 'final-register/:status',
  RESET_PASSWORD: 'reset-password/:token',
  DETAIL_CART: 'my-cart',
  CHECK_OUT: 'checkout',
  PRODUCTS: 'products',

  //admin
  ADMIN: '/admin',
  DASHBOARD: 'dashboard',
  MANAGE_USER: 'manage-user',
  MANAGE_ORDER: 'manage-order',
  MANAGE_PRODUCT: 'manage-products',
  CREATE_PRODUCT: 'create-products',
  
  //Member
  MEMBER: 'member',
  PERSONAL: 'personal',
  MY_CART: 'my-cart',
  HISTORY: 'buy-history',
  WISHLIST: 'wishlist'
}

export default path