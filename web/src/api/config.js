//正式服务器
 let domain='http://47.89.15.157:13500';
 let base = 'http://47.89.15.157:13500/api/v1';
 let appId='wxdd662c0cfcdd3efb';

/*//测试服务器
/*let domain = 'https://wqbang.cn';
let base = domain + '/qPHA/' + 'index.php';
let appId = 'wxa7641616abe7bf5f';*/
export default {
  //服务器网页base地址
  /*  base_url:`${domain}/qPHA/web/index.html`,*/
  domain: `${domain}`,
  appId: `${appId}`,
  //获取账户列表
  account_list: `${base}/account/list`,
  //创建账户
  create_account: `${base}/account/create`,
  //积分
  score_list: `${base}/token/list`,
  //添加积分
  view_create: `${base}/view/create`,
  //我的积分列表
  view_balance: `${base}/view/balance`,
  //转赠
  token_transfer: `${base}/token/transfer`,
  //交易明细
  transfer_list: `${base}/token/transfer/list`,
  test_login: `${domain}/login`, //登录测试  用户登录
  test_register: `${base}/users/create`, //注册调试 创建用户  注册
  //修改密码
  findPassWord: `${base}/users/updatepasswd/`,
  //设置交易面
  set_exchange: `${base}/account/recover/`,



  //微信分享路由重定向
  redirect_url: `${base}/share_url/redirect_url`,
  //微信分享获取签名
  get_signature: `${base}/author/get_signature`,
  //获取用户微信信息
  getAuthor_infor: `${base}/author/getAuthor_infor`,
  //公众号登陆
  third_login: `${base}/login/third_login`,
  //用户公众号注册
  relate_mobile: `${base}/login/relate_mobile`,
  //手机号注册
  regist_user: `${base}/register/regist_user`,
  //发验证码
  send_roundstr: `${base}/register/send_roundstr`,
  //手机号登录
  user_login: `${base}/login/user_login`,
  //忘记密码
  findPassWord: `${base}/register/findPassWord`,
  //注册完善信息
  update_register_infor: `${base}/register/update_register_infor`,
  //更换手机号
  changePhone: `${base}/login/changePhone`,


  //首页
  //轮播图
  get_home_banner: `${base}/goods/get_home_banner`,

  //新品推荐
  get_new_elect: `${base}/goods/get_new_elect`,
  //首页商品分类
  get_home_classfiy: `${base}/goods/get_home_classfiy`,
  //搜索商品
  search_goods: `${base}/goods/search_goods`,

  //获取常见问题
  get_faq_list: `${base}/common/get_faq_list`,
  //常见问题详情
  get_faq_detail: `${base}/common/get_faq_detail`,
  //猜你喜欢
  get_love_goods: `${base}/goods/get_love_goods`,


  //商品
  //抢购商品
  get_scaregoods: `${base}/goods/get_scaregoods`,
  //团购商品
  get_groupgoods: `${base}/goods/get_groupgoods`,
  //抢购商品详情
  getDetail_scaregoods: `${base}/goods/getDetail_scaregoods`,
  //团购商品详情
  getDetail_groupgoods: `${base}/goods/getDetail_groupgoods`,
  //商品详情内容
  get_goods_content: `${base}/goods/get_goods_content`,
  //店长礼包
  get_giftbag_list: `${base}/goods/get_giftbag_list`,
  //店长礼包详情
  get_giftbag_detail: `${base}/goods/get_giftbag_detail`,
  //店长礼包-详情-网页内容
  get_web_gift: `${base}/goods/get_web_gift`,
  //店长礼包下单
  creat_gift_order: `${base}/order/creat_gift_order`,



  //分类
  // 获取商品中分类
  getgoods_classify: `${base}/goods/getgoods_classify`,
  //按分类检索商品
  getgoods_byclass: `${base}/goods/getgoods_byclass`,
  //商品详情
  getDetailGoods: `${base}/goods/getDetailGoods`,
  //获取我的购物车列表
  getmy_shopping_cart: `${base}/goods/getmy_shopping_cart`,
  //加入购物车
  add_shopping_cart: `${base}/goods/add_shopping_cart`,
  //更新购物车 物品数量
  update_goodsnumber: `${base}/goods/update_goodsnumber`,
  //添加到货架、下架
  add_shelves: `${base}/common/add_shelves`,
  //获取我的默认地址 和 运费
  get_default_address: `${base}/common/get_default_address`,
  //生成普通订单
  creat_orders: `${base}/order/creat_orders`,
  //团购下单
  creat_group_order: `${base}/order/creat_group_order`,
  //抢购下单
  scare_add: `${base}/scare_goods/scare_add`,
  //下订单时获取可用优惠券列表
  get_suit_voucher: `${base}/user/get_suit_voucher`,
  //下单时获取可用优惠券数量
  get_suit_count: `${base}/user/get_suit_count`,
  //订单详情
  get_order_detail: `${base}/order/get_order_detail`,
  //再次支付
  pay_order: `${base}/order/pay_order`,
  //购物车下单
  creat_orders_bycart: `${base}/order/creat_orders_bycart`,
  //退款原因
  get_order_cancle: `${base}/order/get_order_cancle`,
  //提交退款申请
  upload_return_order: `${base}/order/upload_return_order`,
  //删除购物车
  delete_shopCart: `${base}/goods/delete_shopCart`,
  //订单查询物流
  getOrderTracesByJson: `${base}/order/getOrderTracesByJson`,
  //删除订单
  delete_order: `${base}/order/delete_order`,
  //取消订单
  cancle_order: `${base}/order/cancle_order`,



  //发现
  //发现列表
  getFind_list: `${base}/findinfo/getFind_list`,
  //店铺中精彩活动
  get_system_activity: `${base}/user/get_system_activity`,
  //获取某个人的货架
  getMy_shelves: `${base}/common/getMy_shelves`,
  //活动详情
  get_detail_activity: `${base}/activitys/get_detail_activity`,
  //我的货架 个人信息
  getmy_shelves_infor: `${base}/user/getmy_shelves_infor`,
  //获取某个人的下线
  get_front_person: `${base}/user/get_front_person`,
  //获取用户信息
  getPerson_homepageInfo: `${base}/user/getPerson_homepageInfo`,
  //获取邀请的人数量
  get_invite_user: `${base}/user/get_invite_user`,


  //店铺
  //获取银行列表
  getAllBankList: `${base}/common/getAllBankList`,
  //获取我的上次提现账号列表
  getPersonWithdraw_cashList: `${base}/user/getPersonWithdraw_cashList`,
  //提现申请
  applyforWithdraw_cash: `${base}/user/applyforWithdraw_cash`,
  //积分明细
  getPersonScoreList: `${base}/user/getPersonScoreList`,
  //收支明细
  getPersonMoneyList: `${base}/user/getPersonMoneyList`,
  //提现明细
  get_withdraw_list: `${base}/user/get_withdraw_list`,
  //升级成为店长
  upgrade_shopowner: `${base}/user/upgrade_shopowner`,


  //商学院
  //最新课件
  getleatest_material: `${base}/study/getleatest_material`,
  //课件分类
  get_material_tags: `${base}/study/get_material_tags`,
  //根据分类查找课件
  getmaterial_bytags: `${base}/study/getmaterial_bytags`,
  //课件详情
  readmaterial_detail: `${base}/study/readmaterial_detail`,
  //论语列表
  getStudy_article_list: `${base}/study/getStudy_article_list`,
  //论语详情
  get_article_detail: `${base}/study/get_article_detail`,
  //论语／课件确认阅读
  quer_read: `${base}/study/quer_read`,


  //地址管理
  //添加／修改 收货地址
  add_Shoping_Adress: `${base}/common/add_Shoping_Adress`,
  //获取我的收获地址
  get_my_adress: `${base}/common/get_my_adress`,
  //删除地址
  delete_my_address: `${base}/common/delete_my_address`,
  //设置默认／非默认地址
  setDefault_address: `${base}/common/setDefault_address`,


  //我的
  //我的订单
  get_my_orderlist: `${base}/order/get_my_orderlist`,
  //上传头像
  uploadheadpic: `${base}/user/uploadheadpic`,
  //更新用户个人信息
  update_userSimpleInfo: `${base}/user/update_userSimpleInfo`,
  //获取用户个人信息
  getPersonInfo: `${base}/user/getPersonInfo`,
  //积分兑换优惠券列表
  get_score_voucher: `${base}/common/get_score_voucher`,
  //积分兑换抵用券
  verb_voucher: `${base}/common/verb_voucher`,
  //我的抵用券列表
  get_voucher_list: `${base}/user/get_voucher_list`,
  //提交评分
  upload_order_comment: `${base}/order/upload_order_comment`,
  //某个团购订单 实时获取拼团信息
  get_realgrouporer: `${base}/order/get_realgrouporer`,
  //团购判断邀请码是否有效，用户是否买，此单是否满员这些信息
  check_invitecode_effective: `${base}/order/check_invitecode_effective`,
  //确认收货
  confirm_receive: `${base}/order/confirm_receive`,


  //获取首页，新品推荐，分类，商学院轮播图列表
  get_top_banner: `${base}/goods/get_top_banner`,


}
