package com.teamtop.houtaiHttp.qqGift;

public class QqGiftConst {
	/**
	 * 用户登录游戏的openid，包括qq登录和微信登录
	 */
	public static final  String openid="openid";
	/**
	 * 礼包对应的id，提交申请文档后，应用宝统一分配（开发商不能自定义）
	 */
	public static final  String taskid="taskid";
	/**
	 * 这个字段已经不需要校验，历史遗留问题
	 */
	public static final  String awardid="awardid";
	/**
	 * 组成方式为YYYYMMDDHHMMSS_dPnCXs_Taskid_Awardid 其中，第二块是随机生成的六位大小写随机码,提供对账
	 */
	public static final  String billno="billno";
	/**
	 * 发请求的时间戳，精确到秒，开发商收到请求后需验证timestamp与当前请求是否超过5分钟，如果超过5分钟，可认为请求无效直接丢弃
	 */
	public static final  String timestamp="timestamp";
	/**
	 * 手Q的appid（如果是用户是微信id，也是用手Qappid）
	 */
	public static final  String appid="appid";
	/**
	 * 包括check、send、check_send三种 check:开发者仅需要查询任务步骤是否完成，返回步骤完成状态 check_send:开发者需要查询任务步骤是否完成，若步骤已完成，直接给用户发货，并返回发货是否成功(暂时只需要开发这个接口)Send:平台通知开发者直接给给用户发货，开发者返回发货是否成功
	 */
	public static final  String action="action";
	/**
	 * 标示用户是qq登录还是微信登录
	 */
	public static final  String area="area";
	/**
	 * 用户生成辅助签名，用户增强任务回调接口安全性。
	 */
	public static final  String pkey="pkey";
	/**
	 * 区号
	 */
	public static final  String partition="partition";
	/**
	 * 请求串的签名，签名方式跟开平签名sig参数一致。
	 */
	public static final  String sig="sig";
	/**
	 * 返回结果
	 * 0：步骤已完成或奖励发放成功
	 */
	public static final int rest_0=0;
	/**
	 * 返回结果
     * 1：请求无效
	 */
	public static final int rest_1=1;
	/**
	 * 返回结果
     * 2：请求参数错误
	 */
	public static final int rest_2=2;
	/**
	 * 返回结果
     * 3:sig参数错误
	 */
	public static final int rest_3=3;
	/**
	 * 返回结果
     * 101：用户尚未在应用创建角色
	 */
	public static final int rest_101=101;
	/**
	 * 返回结果
     * 102：该步骤奖励已发放过
	 */
	public static final int rest_102=102;
	/**
	 * 返回结果
     * 103：奖励发放失败
	 */
	public static final int rest_103=103;
	/**
	 * 返回结果
     * 104：玩家不符合领取条件
	 */
	public static final int rest_104=104;

}
