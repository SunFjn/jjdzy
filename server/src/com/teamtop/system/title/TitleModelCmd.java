package com.teamtop.system.title;

/**
 * TitleModelCmd.java
 * 称号系统
 */
public class TitleModelCmd{


	/**
	 * CG请求打开称号界面
	 */
	public final static int CG_OpenTitle_501 = 501;


	/**
	 * GC返回称号界面信息
	 */
	public final static int GC_RetTitleUi_502 = 502;


	/**
	 * CG请求操作称号
	 */
	public final static int CG_HandleTitle_503 = 503;


	/**
	 * GC返回操作称号结果
	 */
	public final static int GC_RetHandle_504 = 504;


	/**
	 * 登录时后端推送角色当前佩戴的称号id
	 */
	public final static int GC_LoginSend_506 = 506;


	/**
	 * GC通知前端称号过期
	 */
	public final static int GC_TellDeadLine_508 = 508;


	/**
	 * 激活称号（永久类型称号）
	 */
	public final static int CG_ActivateTitle_509 = 509;


	/**
	 * 激活称号结果
	 */
	public final static int GC_ActivateTitle_510 = 510;


	/**
	 * 称号升级
	 */
	public final static int GC_UpgradeTitle_514 = 514;


	/**
	 * 升级称号
	 */
	public final static int CG_UpgradeTitle_513 = 513;


	/**
	 * 获得称号
	 */
	public final static int GC_GetTitle_512 = 512;

}