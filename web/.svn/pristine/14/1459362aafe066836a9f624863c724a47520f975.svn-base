import config from './config'
import axios from 'axios'

var qs = require('qs');
//微信分享获取签名
/*export const account_list = (data) => {
  return axios.get(config.account_list, data)
};*/
/* 接口*/
export const login_api = (data)=>{
  return axios.post(config.test_login, createPostParams(data))
}
export const register_api = (data)=>{
  return axios.post(config.test_register, createPostParams(data))
}
//修改密码
export const findPassWord = (data) => {
  return axios.post(config.findPassWord+data)
};
//设置交易密码
export const set_exchange_api = (data) => {
  return axios.post(config.set_exchange+data)
};
//创建账户
export const create_account = (data) => {
  return axios.post(config.create_account, createPostParams(data))
};
//添加积分
export const view_create = (data) => {
  return axios.post(config.view_create+data)
};
//我的积分列表
export const view_balance = (data) => {
  return axios.get(config.view_balance+data)
};
//转赠
export const token_transfer = (data) => {
  return axios.post(config.token_transfer, createPostParams(data))
};
//交易明细列表
export const transfer_list = (data) => {
  return axios.get(config.transfer_list+data)
};


//微信分享获取签名
export const get_signature = (data) => {
  return axios.post(config.get_signature, createPostParams(data))
};

//获取用户微信信息
export const getAuthor_infor = (data) => {
  return axios.post(config.getAuthor_infor, createPostParams(data))
};
//公众号登陆
export const third_login = (data) => {
  return axios.post(config.third_login, createPostParams(data))
};
//用户公众号注册
export const relate_mobile = (data) => {
  return axios.post(config.relate_mobile, createPostParams(data))
};
//手机号登录
export const user_login = (data) => {
  return axios.post(config.user_login, createPostParams(data))
};

//手机号注册
export const regist_user = (data) => {
  return axios.post(config.regist_user, createPostParams(data))
};
//发验证码
export const send_roundstr = (data) => {
  return axios.post(config.send_roundstr, createPostParams(data))
};
//注册完善信息
export const update_register_infor = (data) => {
  return axios.post(config.update_register_infor, createPostParams(data))
};
//更换手机号
export const changePhone = (data) => {
  return axios.post(config.changePhone, createPostParams(data))
};
//获取邀请的人数量
export const get_invite_user = (data) => {
  return axios.post(config.get_invite_user, createPostParams(data))
};


//首页
//轮播图
export const get_home_banner = () => {
  return axios.get(config.get_home_banner);
};

//首页商品分类
export const get_home_classfiy = () => {
  return axios.get(config.get_home_classfiy);
};
//新品推荐
export const get_new_elect = (data) => {
  return axios.post(config.get_new_elect, createPostParams(data))
};
//搜索商品
export const search_goods = (data) => {
  return axios.post(config.search_goods, createPostParams(data))
};

//获取常见问题
export const get_faq_list = (data) => {
  return axios.post(config.get_faq_list, createPostParams(data))
};
//常见问题详情
export const get_faq_detail = (data) => {
  return axios.post(config.get_faq_detail, createPostParams(data))
};
//猜你喜欢
export const get_love_goods = (data) => {
  return axios.post(config.get_love_goods, createPostParams(data))
};


//商品
//抢购商品
export const get_scaregoods = () => {
  return axios.get(config.get_scaregoods);
};
//团购商品
export const get_groupgoods = () => {
  return axios.get(config.get_groupgoods);
};
//抢购商品详情
export const getDetail_scaregoods = (data) => {
  return axios.post(config.getDetail_scaregoods, createPostParams(data))
};
//团购商品详情
export const getDetail_groupgoods = (data) => {
  return axios.post(config.getDetail_groupgoods, createPostParams(data))
};
//商品详情内容
export const get_goods_content = (data) => {
  return axios.post(config.get_goods_content, createPostParams(data))
};
//店长礼包
export const get_giftbag_list = (data) => {
  return axios.post(config.get_giftbag_list, createPostParams(data))
};
//店长礼包详情
export const get_giftbag_detail = (data) => {
  return axios.post(config.get_giftbag_detail, createPostParams(data))
};
//店长礼包-详情-网页内容
export const get_web_gift = (data) => {
  return axios.post(config.get_web_gift, createPostParams(data))
};
//店长礼包下单
export const creat_gift_order = (data) => {
  return axios.post(config.creat_gift_order, createPostParams(data))
};


//分类
// 获取商品中分类
export const getgoods_classify = () => {
  return axios.get(config.getgoods_classify);
};
//按分类检索商品
export const getgoods_byclass = (data) => {
  return axios.post(config.getgoods_byclass, createPostParams(data))
};

//商品详情
export const getDetailGoods = (data) => {
  return axios.post(config.getDetailGoods, createPostParams(data))
};
//获取我的购物车列表
export const getmy_shopping_cart = (data) => {
  return axios.post(config.getmy_shopping_cart, createPostParams(data))
};
//加入购物车
export const add_shopping_cart = (data) => {
  return axios.post(config.add_shopping_cart, createPostParams(data))
};
//更新购物车 物品数量
export const update_goodsnumber = (data) => {
  return axios.post(config.update_goodsnumber, createPostParams(data))
};

//添加到货架
export const add_shelves = (data) => {
  return axios.post(config.add_shelves, createPostParams(data))
};
//获取我的默认地址 和 运费
export const get_default_address = (data) => {
  return axios.post(config.get_default_address, createPostParams(data))
};
//生成普通订单
export const creat_orders = (data) => {
  return axios.post(config.creat_orders, createPostParams(data))
};
//团购下单
export const creat_group_order = (data) => {
  return axios.post(config.creat_group_order, createPostParams(data))
};
//抢购下单
export const scare_add = (data) => {
  return axios.post(config.scare_add, createPostParams(data))
};

//下订单时获取可用优惠券列表
export const get_suit_voucher = (data) => {
  return axios.post(config.get_suit_voucher, createPostParams(data))
};
//下单时获取可用优惠券数量
export const get_suit_count = (data) => {
  return axios.post(config.get_suit_count, createPostParams(data))
};
//订单详情
export const get_order_detail = (data) => {
  return axios.post(config.get_order_detail, createPostParams(data))
};
//再次支付
export const pay_order = (data) => {
  return axios.post(config.pay_order, createPostParams(data))
};
//购物车下单
export const creat_orders_bycart = (data) => {
  return axios.post(config.creat_orders_bycart, createPostParams(data))
};
//退款原因
export const get_order_cancle = () => {
  return axios.get(config.get_order_cancle)
};
//提交退款申请
export const upload_return_order = (data) => {
  return axios.post(config.upload_return_order, createPostParams(data))
};
//删除购物车
export const delete_shopCart = (data) => {
  return axios.post(config.delete_shopCart, createPostParams(data))
};


//提交评分
export const upload_order_comment = (data) => {
  return axios.post(config.upload_order_comment, createPostParams(data))
};
//某个团购订单 实时获取拼团信息
export const get_realgrouporer = (data) => {
  return axios.post(config.get_realgrouporer, createPostParams(data))
};
//团购判断邀请码是否有效，用户是否买，此单是否满员这些信息
export const check_invitecode_effective = (data) => {
  return axios.post(config.check_invitecode_effective, createPostParams(data))
};
//确认收货
export const confirm_receive = (data) => {
  return axios.post(config.confirm_receive, createPostParams(data))
};
//订单查询物流
export const getOrderTracesByJson = (data) => {
  return axios.post(config.getOrderTracesByJson, createPostParams(data))
};
//删除订单
export const delete_order = (data) => {
  return axios.post(config.delete_order, createPostParams(data))
};
//取消订单
export const cancle_order = (data) => {
  return axios.post(config.cancle_order, createPostParams(data))
};


//发现
//发现列表
export const getFind_list = (data) => {
  return axios.post(config.getFind_list, createPostParams(data))
};


//商学院
//最新课件
export const getleatest_material = () => {
  return axios.get(config.getleatest_material);
};
//课件分类
export const get_material_tags = () => {
  return axios.get(config.get_material_tags);
};

//根据分类查找课件
export const getmaterial_bytags = (data) => {
  return axios.post(config.getmaterial_bytags, createPostParams(data))
};
//课件详情
export const readmaterial_detail = (data) => {
  return axios.post(config.readmaterial_detail, createPostParams(data))
};
//论语列表
export const getStudy_article_list = (data) => {
  return axios.post(config.getStudy_article_list, createPostParams(data))
};
//论语详情
export const get_article_detail = (data) => {
  return axios.post(config.get_article_detail, createPostParams(data))
};
//论语／课件确认阅读
export const quer_read = (data) => {
  return axios.post(config.quer_read, createPostParams(data))
};


//店铺
//店铺中精彩活动
export const get_system_activity = () => {
  return axios.get(config.get_system_activity);
};
//获取某个人的货架
export const getMy_shelves = (data) => {
  return axios.post(config.getMy_shelves, createPostParams(data))
};

//活动详情
export const get_detail_activity = (data) => {
  return axios.post(config.get_detail_activity, createPostParams(data))
};
//我的货架 个人信息
export const getmy_shelves_infor = (data) => {
  return axios.post(config.getmy_shelves_infor, createPostParams(data))
};

//获取某个人的下线
export const get_front_person = (data) => {
  return axios.post(config.get_front_person, createPostParams(data))
};
//获取用户信息
export const getPerson_homepageInfo = (data) => {
  return axios.post(config.getPerson_homepageInfo, createPostParams(data))
};

//提现
//获取银行列表
export const getAllBankList = (data) => {
  return axios.post(config.getAllBankList, createPostParams(data))
};
//获取我的上次提现账号列表
export const getPersonWithdraw_cashList = (data) => {
  return axios.post(config.getPersonWithdraw_cashList, createPostParams(data))
};
//提现申请
export const applyforWithdraw_cash = (data) => {
  return axios.post(config.applyforWithdraw_cash, createPostParams(data))
};
//升级成为店长
export const upgrade_shopowner = (data) => {
  return axios.post(config.upgrade_shopowner, createPostParams(data))
};


//地址管理
//添加／修改 收货地址
export const add_Shoping_Adress = (data) => {
  return axios.post(config.add_Shoping_Adress, createPostParams(data))
};
//获取我的收获地址
export const get_my_adress = (data) => {
  return axios.post(config.get_my_adress, createPostParams(data))
};

//删除地址
export const delete_my_address = (data) => {
  return axios.post(config.delete_my_address, createPostParams(data))
};
//设置默认／非默认地址
export const setDefault_address = (data) => {
  return axios.post(config.setDefault_address, createPostParams(data))
};


//我的
//我的订单
export const get_my_orderlist = (data) => {
  return axios.post(config.get_my_orderlist, createPostParams(data))
};
//上传头像
export const uploadheadpic = (data) => {
  return axios.post(config.uploadheadpic, createPostParams(data))
};

//更新用户个人信息
export const update_userSimpleInfo = (data) => {
  return axios.post(config.update_userSimpleInfo, createPostParams(data))
};
//获取用户个人信息
export const getPersonInfo = (data) => {
  return axios.post(config.getPersonInfo, createPostParams(data))
};
//积分明细
export const getPersonScoreList = (data) => {
  return axios.post(config.getPersonScoreList, createPostParams(data))
};
//收支明细
export const getPersonMoneyList = (data) => {
  return axios.post(config.getPersonMoneyList, createPostParams(data))
};
//提现明细
export const get_withdraw_list = (data) => {
  return axios.post(config.get_withdraw_list, createPostParams(data))
};
//积分兑换优惠券列表
export const get_score_voucher = () => {
  return axios.get(config.get_score_voucher)
};
//积分兑换抵用券
export const verb_voucher = (data) => {
  return axios.post(config.verb_voucher, createPostParams(data))
};
//我的抵用券列表
export const get_voucher_list = (data) => {
  return axios.post(config.get_voucher_list, createPostParams(data))
};


//获取首页，新品推荐，分类，商学院轮播图列表
export const get_top_banner = (data) => {
  return axios.post(config.get_top_banner, createPostParams(data))
};


/*
 * 创建Post x-www-form-urlencode请求参数
 * */
function createPostParams(obj) {
  return qs.stringify(obj);
}
