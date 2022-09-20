package com.teamtop.system.cdkey;

public class CDkeyConst {
	public static final int CDKEY_SYSTEMID = 4203;

	public static final int CDKEY_LEN = 10; // cdkey长度
	public static final int CDKEY_CREATENUM = 10000; // cdkey每种类型创建数量
	public static final int CDKEY_CREATENUMTM = 10; // cdkey通码创建数量

	public static final int NOT_USED = 0;// 未使用
	public static final int USED = 1;// 已使用

	public static final int CROSS_STATE_SUCCESS = 1;// 中央服验证激活码成功
	public static final int CROSS_STATE_FAULT = 2;// 中央服验证激活码有误
	public static final int CROSS_STATE_USED = 3;// 中央服验证激活码已被使用
	public static final int CDKEY_STATE_OUTOFDATE = 4;// 中央服验证激活码已过期
	public static final int CROSS_STATE_GAINLIMIT = 5;// 中央服验证同类型激活码领取达到上限
	public static final int CROSS_STATE_HAD_USED = 6;// 中央服验证已使用过该通用码

	/**
	 * 领取激活码奖励状态返回
	 */
	public static final int CDKEY_FAULT = 0;// 激活码有误
	public static final int SUCCESS = 1;
	public static final int CDKEY_NULL = 2;// 激活码为空
	public static final int CDKEY_USED = 3;// 激活码已被使用
	public static final int CDKEY_OUTOFDATE = 4;// 激活码已过期
	public static final int CDKEY_GAINLIMIT = 5;// 同类型激活码领取达到上限
	public static final int CDKEY_HAD_USED = 6;// 已使用过该通用码

	/** 通用码*/
	public static final int COMM_TYPE = 1;
}
