package com.teamtop.system.mail;

/**
 * MailCmd.java
 * 邮件
 */
public class MailCmd{


	/**
	 * 发：有未读邮件/未领取附件，前端红点提示。不发：没有未读邮件
	 */
	public final static int GC_Login_302 = 302;


	/**
	 * 打开UI主界面
	 */
	public final static int CG_OpenMail_All_303 = 303;


	/**
	 * 获取所有邮件
	 */
	public final static int GC_OpenMail_All_304 = 304;


	/**
	 * 查看一封邮件
	 */
	public final static int CG_OpenMail_One_305 = 305;


	/**
	 * 查看一封邮件
	 */
	public final static int GC_OpenMail_One_306 = 306;


	/**
	 * 领取附件
	 */
	public final static int CG_GetAdjunct_307 = 307;


	/**
	 * 领取附件 
	 */
	public final static int GC_GetAdjunct_308 = 308;


	/**
	 * 一键领取所有邮件的附件
	 */
	public final static int CG_GetAllAdjunct_309 = 309;


	/**
	 * 一键领取附件结果返回
	 */
	public final static int GC_GetAllAdjunct_310 = 310;


	/**
	 * 收到邮件
	 */
	public final static int GC_ReceiveMail_312 = 312;


	/**
	 * 一键删除邮件
	 */
	public final static int CG_DeleteAll_313 = 313;

}