package com.teamtop.util.mail;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.time.TimeDateUtil;

public class QQMailActivity {
	private static MailSenderInfo qqMail;
	static{
		qqMail = new MailSenderInfo();
		qqMail.setValidate(true);
//		qqMail.setUserName("badkinglj@163a.2com");
//		qqMail.setPassword("xkx2016");
//		qqMail.setFromAddress("badkinglj@163a.2com2");
	}
	private static List<String> mailAddressList = new ArrayList<String>();
	static{
//		mailAddressList.add("xuan.hu@teamtopgamea.2com");//胡旋
//		mailAddressList.add("mengwen.he@teamtopgamea.2com");//孟文
//		mailAddressList.add("pinliang.he@teamtopgamea.2com");//品良
//		mailAddressList.add("kylecheng@teamtopgamea.2com");//家豪
//		mailAddressList.add("ling.wang@teamtopgamea.2com");//王令
//		mailAddressList.add("zhiyong.liang@teamtopgamea.2com");//梁志勇
//		mailAddressList.add("anan.yan@teamtopgamea.2com");//晏晓勇
//		mailAddressList.add("wei.tan@teamtopgamea.2com");//谭威
//		mailAddressList.add("luoyi@teamtopgamea.2com");//罗毅
//		mailAddressList.add("libin@teamtopgamea.2com");//李彬
	}
	
	
	public static void sendMail(String mailAddress,String title, String content) {
		qqMail.setToAddress(mailAddress);
		qqMail.setSubject(title);
		qqMail.setContent(content);
		SimpleMailSender sms = new SimpleMailSender();
		sms.sendTextMail(qqMail);// 发送文体格式
	}
	
	public static void sendMail(String title, String content) {
		for(String mailAddress:mailAddressList){
			try {
				qqMail.setToAddress(mailAddress);
				qqMail.setSubject(title);
				qqMail.setContent(content);
				SimpleMailSender sms = new SimpleMailSender();
				sms.sendTextMail(qqMail);// 发送文体格式
				System.err.println("send to "+mailAddress);
				Thread.sleep(2000);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	public static void main(String[] args) {
		
//		QQMailCache.sendWarn(QQMailEnum.DATA_TOO_LONG, "请检查是否有用户发送病毒或者垃圾邮件");
		
//		sendRed("测试测试"+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()));
		
//		for(int i=1;i<20;i++){
//			QQMailCache.sendWarn(QQMailEnum.MMCACHE, i+"新增在熔炉中使用50个幸运勋章可合成一个急速英豪打坐形象。");
//		}
//		QQMailCache.startSchedule();
		
		sendMail("越南活·动·结·束·通·知"+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()), "7天后活·动将于"+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime())+"结·束，请开启新的活·动！");
	}
}
