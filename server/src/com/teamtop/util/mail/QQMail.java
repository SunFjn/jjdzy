package com.teamtop.util.mail;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.alarmSystem.AlarmConst;

public class QQMail {
	private static MailSenderInfo qqMail;
	static{
		qqMail = new MailSenderInfo();
		qqMail.setValidate(true);
//		qqMail.setUserName("huzhipeng@aaaa000.com");
//		qqMail.setPassword("Sgzj654321");
//		qqMail.setFromAddress("huzhipeng@aaaa000.com");
	}
	private static Map<String, String> mailAddressMap = new HashMap<>();
	static{
//		mailAddressMap.put(AlarmConst.LUO_YI, "luoyi@aaaa000.com");// 罗毅
//		mailAddressMap.put(AlarmConst.GAO_MING, "gaoming@aaaa000.com");// 高明
//		mailAddressMap.put(AlarmConst.HU_ZHI_PENG, "huzhipeng@aaaa000.com");// 胡志鹏
////		mailAddressMap.put(AlarmConst.YUN_WEI, "yunwei@aaaa000.com");// 运维组
//		mailAddressMap.put(AlarmConst.YUN_WEI, "yunwei_sgzj_warning@aaaa000.com");// 运维组
//		mailAddressMap.put(AlarmConst.YY, "yy@aaaa000.com");// 运营
//		mailAddressMap.put(AlarmConst.NIE_YING_XIA, "nieyingxia@aaaa000.com");// 聂迎霞
//		mailAddressMap.put(AlarmConst.LI_BI_JUN, "libijun@aaaa000.com");// 黎碧君
//		mailAddressMap.put(AlarmConst.KE_FU, "kefu@aaaa000.com");// 客服
	}
	
	public static Map<String, String> getMailAddressMap() {
		return mailAddressMap;
	}
	
	private static void sendMail(String mailAddress,String title, String content) {
		qqMail.setToAddress(mailAddress);
		qqMail.setSubject(title);
		qqMail.setContent(content);
		SimpleMailSender sms = new SimpleMailSender();
		sms.sendTextMail(qqMail);// 发送文体格式
	}
	
	public static void sendMail(String title, String content, List<String> mailAddressList) {
		try {
			for(String mailAddress:mailAddressList){
				qqMail.setToAddress(mailAddress);
				qqMail.setSubject(title);
				qqMail.setContent(content);
				SimpleMailSender sms = new SimpleMailSender();
				sms.sendTextMail(qqMail);// 发送文体格式
//				System.err.println("send to "+mailAddress);
//				Thread.sleep(2000);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static void main(String[] args) {
		
//		QQMailCache.sendWarn(QQMailEnum.DATA_TOO_LONG, "请检查是否有用户发送病毒或者垃圾邮件");
		
//		sendRed("测试测试"+TimeDateUtil.printTime(TimeDateUtil.getCurrentTime()));
		
		for(int i=1;i<2;i++){
			QQMail.sendMail("huzhipeng@aaaa000.com", i + "新增在熔炉中使用50个幸运勋章可合成一个急速英豪打坐形象。", "");
		}
//		QQMailCache.startSchedule();
	}
}
