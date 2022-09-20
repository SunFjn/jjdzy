package com.teamtop.netty.firewall.sytstemWatch;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.cache.union.UC;

/**
 * 系统监控
 * @author Administrator
 *
 */
public class SystemWatchCache {
	//邮件
	private static ConcurrentHashMap<Long, Map<Integer,MailWatch>> mails = new ConcurrentHashMap<Long, Map<Integer,MailWatch>>();
	//登出
	private static ConcurrentHashMap<Long, LoginoutWatch> logouts = UC.reg("loginoutWatch",new ConcurrentHashMap<Long, LoginoutWatch>());
	private static Map<Integer, MailWatchRule> unCheckMails = new HashMap<Integer, MailWatchRule>();
	static{
		initUncheckMails();
	}
	private static void initUncheckMails(){
//		unCheckMails.put(MailConst.MAIL_WORKSHOP_ID1,new MailWatchRule(10, 3));//洞天福地帮助好友打怪
//		unCheckMails.put(MailConst.MAILMOVEID,new MailWatchRule(11, 1));//单人boss
//		unCheckMails.put(MailConst.MAILID,new MailWatchRule(20, 1));//好友祝福
//		unCheckMails.put(MailConst.MAIL_SENDGIFT_ID,new MailWatchRule(20, 1));//结婚礼金
	}
	public static MailWatchRule getMailRule(int mailsysId){
		return unCheckMails.get(mailsysId);
	}
	public static ConcurrentHashMap<Long, Map<Integer,MailWatch>> getMails(){
		return mails;
	}
	public static ConcurrentHashMap<Long, LoginoutWatch> getLogouts(){
		return logouts;
	}
}
