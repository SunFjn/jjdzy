package com.teamtop.system.mail;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
/**
 * MailSender.java
 * 邮件
 */
public class MailSender{
		/**
		 * 发：有未读邮件/未领取附件，前端红点提示。不发：没有未读邮件
		**/
		public static void sendCmd_302(long hid ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = null;
			if(!hero.isCanSend(302, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 302);
		}
		/**
		 * 获取所有邮件
		 * @param result 1:成功。2:失败
		 * @param mailNum 邮件数量
		 * @param mailList 邮件详情
		**/
		public static void sendCmd_304(long hid  ,  int  result  ,  int  mailNum  ,   Object[]  mailList ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,mailNum,mailList};
			if(!hero.isCanSend(304, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 304);
		}
		/**
		 * 查看一封邮件
		 * @param result 1:成功。2:失败。3非本人的邮件
		 * @param mailID 邮件唯一ID
		 * @param goodsList 附件信息
		 * @param goodsNum 附件数量（最多只显示5个）
		 * @param content 邮件内容，数据用“_” 隔开,内容表id_内容参数1_内容参数2
		 * @param isRead 邮件读取状态：0 未读。1 已读
		 * @param isGetAdj 附件领取状态：0没有附件。1有附件。2附件已领
		**/
		public static void sendCmd_306(long hid  ,  int  result  ,   long  mailID  ,   Object[]  goodsList  ,  int  goodsNum  ,   String  content  ,  int  isRead  ,  int  isGetAdj ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,mailID,goodsList,goodsNum,content,isRead,isGetAdj};
			if(!hero.isCanSend(306, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 306);
		}
		/**
		 * 领取附件 
		 * @param result 0 失败。1 成功。2邮件不存在。3附件没物品。4背包格子不足。5非本人的邮件  6附件已领取
		 * @param mailID 邮件ID
		**/
		public static void sendCmd_308(long hid  ,  int  result  ,   long  mailID ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result,mailID};
			if(!hero.isCanSend(308, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 308);
		}
		/**
		 * 一键领取附件结果返回
		 * @param result 0失败，1成功领取附件，2背包不足，3已达到金钱上限，4没有可提取的附件
		**/
		public static void sendCmd_310(long hid  ,  int  result ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{result};
			if(!hero.isCanSend(310, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 310);
		}
		/**
		 * 收到邮件
		 * @param mailID 邮件ID
		 * @param title 邮件标题
		 * @param mailFlag 邮件excel表ID
		 * @param time 时间
		 * @param isRead 邮件读取状态
		 * @param isGetAdj 附件领取状态
		**/
		public static void sendCmd_312(long hid  ,   long  mailID  ,   String  title  ,   int  mailFlag  ,   int  time  ,  int  isRead  ,  int  isGetAdj ){
			Hero hero = HeroCache.getHero(hid);
			if(hero==null){
				return;
			}
			Object[] cmdSendData = new Object[]{mailID,title,mailFlag,time,isRead,isGetAdj};
			if(!hero.isCanSend(312, cmdSendData)){
				return;
			}
			NettyWrite.writeData(hero.getChannel() , cmdSendData, 312);
		}
}