package com.teamtop.system.mail;
import com.teamtop.system.hero.Hero;

/**
 * MailCG.java
 * 邮件
 */
public class MailCG{

	private static MailCG ins = null;

	public static MailCG getIns(){
		if(ins == null){
			ins = new MailCG();
		}
		return ins;
	}

	/**
	 * 打开UI主界面 303
	 */
	public void openMail_All(Hero hero, Object[] datas){
		MailManager.getIns().openMail_All(hero);
	} 
	/**
	 * 查看一封邮件 305
	 * @param mailID| 邮件唯一ID| long
	 */
	public void openMail_One(Hero hero, Object[] datas){
		long mailID = (long)datas[0];
		MailManager.getIns().openMail_One(hero, mailID);
	} 
	/**
	 * 领取附件 307
	 * @param mailID| 邮件唯一ID| long
	 */
	public void getAdjunct(Hero hero, Object[] datas){
		long mailID = (long)datas[0];
		MailManager.getIns().getAdjunct(hero, mailID);
	} 
	/**
	 * 一键领取所有邮件的附件 309
	 */
	public void getAllAdjunct(Hero hero, Object[] datas){
		MailManager.getIns().getAllAdjunct(hero);
	} 
	/**
	 * 一键删除邮件 313
	 */
	public void deleteAll(Hero hero, Object[] datas){
		MailManager.getIns().deleteAll(hero);
	} 
}