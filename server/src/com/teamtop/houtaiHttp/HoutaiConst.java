package com.teamtop.houtaiHttp;

/**
 * 后台功能相关常量
 * @author hepl
 *
 */
public class HoutaiConst {
	/**
	 * 在线玩家每页人数
	 */
	public static final int ONLINE_HERO_PAGE_SIZE = 29;
	/**
	 * 平台用户ID
	 */
	public static final String uid="uid";
	/**
	 * 角色名字
	 */
	public static final String role_name="role_name";
	/**
	 * 渠道id
	 */
	public static final String channel="channel";
	/**
	 * 渠道代码
	 */
	public static final String pf="pf";
	/**
	 * CP服务器ID 区号
	 */
	public static final String app_server="app_server";
	/**
	 * 游戏服务器生成的订单号
	 */
	public static final String game_order="game_order";
	/**
	 * 平台订单号 sdk
	 */
	public static final String order_num="order_num";
	/**
	 * 订单金额 支付金额（单位分）
	 */
	public static final String money="money";
	/**
	 * 完成支付时间
	 */
	public static final String pay_time="pay_time";
	/**
	 * 支付状态		
	 */
	public static final String status="status";
	/**
	 * 游戏方自定义参数 CP透传参数
	 */
	public static final String passthrough_params="passthrough_params";
	/**
	 * 此条信息签名
	 */
	public static final String sign="sign";
	
	/***
	 * 商品id
	 */
	public static final String  product_id="product_id";
	/***
	 * 商品name
	 */
	public static final String  product_name="product_name";
	/***
	 * 商品购买商品数量
	 */
	public static final String  product_num="product_num";
	/***
	 * cp_order_num : CP订单号
	 */
	public static final String  cp_order_num="cp_order_num";
	/**
	 * midas表示普通订单 非midas表示切支付订单
	 */
	public static final String midas="midas";
	
	/**
	 * 参数 key 用于校验
	 */
	public static final String MD5="key";
	/**
	 * 参数 cmd 用于指派逻辑
	 */
	public static final String CMD="cmd";
	/**
	 * 参数 randnum 用于校验
	 */
	public static final String RANDNUM="randnum";
	/**
	 * 花费的RMB请参数
	 */
	public static final String MONEY="money";
	/**
	 * 充值角色参数
	 */
	public static final String RE_RID="rechargerid";
	/**SDK生成的订单号《小游戏》**/
	public static final String order_no="order_no";
	/**金额《小游戏》**/
	public static final String amount="amount";
	/**游戏方参数**/
	public static final String extras_params="extras_params";
	/* 后台通用接口返回码*/
	/*  200	接口处理成功	适用全部接口
		403	IP不在白名单内,无权访问	适用全部接口
		404	访问接口不存在	适用全部接口
		500	接口内部错误	适用全部接口,通常为代码BUG/数据库连接失败
		5000	接口签名失败	适用全部接口
		5001	接口请求时间与服务器时间检验不符	适用全部接口
		5002	接口维护	适用全部接口
		5003	接口停用	适用全部接口
		5004	请求超时，请等网络恢复后重试	适用全部接口，通常为中央服向子服发送指令发生中断
		5005	API 参数无效，请检查参数是否符合要求，具体可查看错误信息进一步定义哪个字段	适用全部接口
		5006	消息接收方无效，接口通知目标不存在	适用物品邮件、服务器邮件、活动等含有服务目标的接口
	*/
	/** 接口处理成功 适用全部接口 */
	public static final int SendBack_Code_200 = 200;

	/** IP不在白名单内,无权访问 适用全部接口 */
	public static final int SendBack_Code_403 = 403;

	/** 访问接口不存在 适用全部接口 */
	public static final int SendBack_Code_404 = 404;

	/** 接口内部错误 适用全部接口,通常为代码BUG/数据库连接失败 */
	public static final int SendBack_Code_500 = 500;
	/** 接口签名失败 适用全部接口 */
	public static final int SendBack_Code_5000 = 5000;

	/** 接口请求时间与服务器时间检验不符 适用全部接口 */
	public static final int SendBack_Code_5001 = 5001;

	/** 接口维护 适用全部接口 */
	public static final int SendBack_Code_5002 = 5002;

	/** 接口停用 适用全部接口 */
	public static final int SendBack_Code_5003 = 5003;

	/** 请求超时，请等网络恢复后重试 适用全部接口，通常为中央服向子服发送指令发生中断 */
	public static final int SendBack_Code_5004 = 5004;

	/** API 参数无效，请检查参数是否符合要求，具体可查看错误信息进一步定义哪个字段 适用全部接口 */
	public static final int SendBack_Code_5005 = 5005;

	/** 消息接收方无效，接口通知目标不存在 适用物品邮件、服务器邮件、活动等含有服务目标的接口 */
	public static final int SendBack_Code_5006 = 5006;
}
