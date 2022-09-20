package com.teamtop.system.mail;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagConst;
import com.teamtop.system.event.backstage.events.flowMail.FlowMailEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.dao.MailDao;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.system.mail.model.MailAdjunct;
import com.teamtop.system.mail.model.MailTemp;
import com.teamtop.util.log.LogTool;

public class MailManager {
	private static MailManager mailManager;
	public static MailManager getIns() {
		if(mailManager == null) {
			mailManager = new MailManager();
		}
		return mailManager;
	}
	private MailManager(){}
	
	/**
	 * 查看所有邮件
	 * @param hero
	 */
	public void openMail_All(Hero hero) {
		try {
			MailDao mailDao = MailDao.getIns();
			List<Mail> mailList;
			mailList = mailDao.findMailList(hero.getId());
			if(mailList!=null){
				int numMail=mailList.size();
				Object[] retObj = new Object[numMail];
				int index = 0;
				for(Mail mail : mailList) {
					long mailIDTemp = mail.getId();
					String title = mail.getTitle();
					if (title == null) {
						title = "";
					}
					int flag = mail.getFlag();
					int sendTime = mail.getSendTime();
					int isRead = mail.getIsRead();
					int isGetAdj = mail.getIsGetAdj();
					retObj[index] = new Object[] { mailIDTemp, title, flag, sendTime, isRead, isGetAdj };
//					System.out.println("mailIDTemp："+mailIDTemp+" mailIDTemp:"+mailIDTemp+" flag:"+flag+" sendTime:"+sendTime);
					index++;
				}
				MailSender.sendCmd_304(hero.getId(), 1, numMail, retObj);
			}else{
				//没有邮件
				MailSender.sendCmd_304(hero.getId(), 2, 0, new Object[]{});
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 查看一封邮件详情
	 * @param hero
	 * @param mailID
	 */
	public void openMail_One(Hero hero, long mailID)  {
		try {
//			System.out.println("openMail_One.mailID："+mailID);
			MailTemp temp = new MailTemp();
			temp.setReceiverId(hero.getId());
			temp.setId(mailID);
			MailDao mailDao = MailDao.getIns();
			Mail mailFind = mailDao.findMailByHidMailID(hero.getId(), mailID);
			if(mailFind==null){
				MailSender.sendCmd_306(hero.getId(), 2, mailID, new Object[]{}, 0, "邮件不存在", 0,0);
				return ;
			}
			long receiverId = mailFind.getReceiverId();
			if(receiverId!=hero.getId()){
				//非本人的邮件
				MailSender.sendCmd_306(hero.getId(), 3, mailID, new Object[]{}, 0, "非本人的邮件", 0,0);
				return;
			}
			String content = mailFind.getContent();
			int isGetAdj = mailFind.getIsGetAdj();
			MailAdjunct[] mailAdjuncts = mailFind.getMailAdjuncts();
			int numAdj=0;
			int numShow = 10;// 邮件附件显示最大数量
			if(mailAdjuncts!=null){
				numAdj=mailAdjuncts.length>MailConst.MAIL_ADJ_MAX_NUM?MailConst.MAIL_ADJ_MAX_NUM:mailAdjuncts.length;
				ArrayList<Object[]> retObjList = new ArrayList<Object[]>();
				for(MailAdjunct mailAdjunct:mailAdjuncts){
					int type = mailAdjunct.getType();
					int sysId = mailAdjunct.getSysId();
					int num = mailAdjunct.getNum();
					if(type == GameConst.EQUIP || type == GameConst.TOOL) {
						while (num>BagConst.MAX_OVERLY ) {//显示上限
							if(retObjList.size()>=numShow)
								break;
							retObjList.add(new Object[]{type,sysId,BagConst.MAX_OVERLY});
							num=num-BagConst.MAX_OVERLY ;
						}
					}
					
					if(retObjList.size()>=numShow)
						break;
					retObjList.add(new Object[]{type,sysId,num});
				}
				
				MailSender.sendCmd_306(hero.getId(), 1, mailID, retObjList.toArray(), numAdj, content, MailConst.MAIL_READ,isGetAdj);
			}else{
				
				MailSender.sendCmd_306(hero.getId(), 1, mailID, new Object[]{}, numAdj, content, MailConst.MAIL_READ,isGetAdj);
			}
			//修改邮件已读状态
			mailDao.updateMailIsRead(mailID, MailConst.MAIL_READ, hero.getId());
			FlowMailEvent.updateState(mailID, MailConst.MAIL_READ);//流水
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 领取一封邮件的附件 
	 * @param hero
	 * @param mailID
	 */
	public void getAdjunct(Hero hero, long mailID) {
		try {
			long hid=hero.getId();
			MailDao mailDao = MailDao.getIns();
			Mail mailFind = mailDao.findMailByHidMailID(hero.getId(), mailID);
			if( mailFind==null){//邮件不存在
				MailSender.sendCmd_308(hero.getId(), 2,mailID);
				return;
			}
			MailAdjunct[] mailAdjuncts = mailFind.getMailAdjuncts();
			if(mailAdjuncts==null||mailAdjuncts.length==0){//附件没物品
				MailSender.sendCmd_308(hero.getId(), 3,mailID);
				return;
			}
			
			int isGetAdj = mailFind.getIsGetAdj();
			if( isGetAdj==MailConst.ADJ_STATE_2){//已领取
				MailSender.sendCmd_308(hero.getId(), 6,mailID);
				return;
			}
			
			long receiverId = mailFind.getReceiverId();
			if(receiverId!=hero.getId()){//非本人的邮件
				MailSender.sendCmd_308(hero.getId(), 5,mailID);
				return;
			}
			//优化邮件获得原因   [type,id,num,bind]
			int reason = SourceGoodConst.MAIL_FUJIAN;//TODO 类型
			int addResult = getAdjunct(hero, mailFind,reason,null);
			if(addResult==4){
				MailSender.sendCmd_308(hid, 4,mailID);//背包格子不足
				return;
			}else if(addResult==5||addResult==6||addResult==7){
				System.err.println("MailManager.getAdjunct.result:"+addResult);
				return;
			}
			
			//修改附件已读状态
			mailDao.updateMailIsRead(mailID, MailConst.MAIL_READ, hero.getId());
			//修改附件领取状态
			mailDao.updateMailIsGetAdj(mailID, MailConst.ADJ_STATE_2, hero.getId());
			FlowMailEvent.updateFujianState(mailID);//流水
			
			MailSender.sendCmd_308(hid, 1,mailID);
			LogTool.info(hid, hero.getName(), "getAdjunct.mailID:"+mailID, this);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 领取邮件附件的方法抽出来
	 * @param hero
	 * @param mail
	 * @param	setGededMailID	记录已读取，且已领取附件的邮件ID
	 * @return	int：4，空间不足
	 * @throws Exception 
	 */
	private int getAdjunct(Hero hero, Mail mail, int reason, HashSet<Long> setGededMailID) throws Exception {
		try {
			long mailID = mail.getId();
			MailAdjunct[] adjs = mail.getMailAdjuncts();
			if(adjs == null || adjs.length == 0 ){
				System.err.println("异常：附件不能为空1，mailID:"+mailID);
				return 5;
			}
			
			int len = adjs.length;
			int[][] toolAndEquipAndMoney=new int[len][];
			Map<Integer, Integer> addMap = new HashMap<Integer, Integer>();//前端提示
			//发放道具和货币
			for(int i = 0; i < len; i ++) {
				MailAdjunct adj = adjs[i];
				if(adj==null){
					System.err.println("异常：附件不能为空2，mailID:"+mailID);
					return 6;
				}
				if(adj.getNum() <= 0){
					System.err.println("异常：附件数量是0，mailID:"+mailID+" id:"+adj.getSysId());
					return 7;
				}
				toolAndEquipAndMoney[i]=new int[]{adj.getType(), adj.getSysId(), adj.getNum()};
//				int type = adj.getType();
//				if(type == GameConst.TOOL || type == GameConst.EQUIP) {
//				} else{
//					//货币或元宝
//				}
				Integer addNum = addMap.get(adj.getSysId());
				if(addNum == null) addNum = 0;
				addMap.put(adj.getSysId(), addNum + adj.getNum());
			}
			boolean canAdd = UseAddUtil.canAdd(hero, toolAndEquipAndMoney, false);
			if(!canAdd) {
				return 4;
			}
			UseAddUtil.add(hero, toolAndEquipAndMoney, reason, null, true);
			//设置已读+已领附件
			if( setGededMailID!=null)
				setGededMailID.add( mailID);
			return 1;
		} catch (Exception e) {
			LogTool.error(e, this, "getAdjunct fail mailID=" + mail.getId());
			return 6;
		}
	}
	
	/**
	 * 一键领取
	 * @param hero
	 */
	public void getAllAdjunct(Hero hero) {
		try {
			long hid = hero.getId();
			MailDao mailDao = MailDao.getIns();
			List<Mail> mailList = mailDao.findMailList(hero.getId());//最近30封
			if( mailList==null|| mailList.size()==0){
				//没有邮件
				MailSender.sendCmd_310(hid, 4);
				return;
			}
			HashSet<Long> setGededMailID = new HashSet<Long>();//设置领取附件的邮件ID
			HashSet<Long> setReadedMailID = new HashSet<Long>();//设置已读的邮件ID
			int adjunct =0;
			for(int i=0;i<mailList.size();i++){
				//优化邮件获得原因   [type,id,num,bind]
				int reason = SourceGoodConst.MAIL_FUJIAN;//类型
				Mail mail = mailList.get(i);
				int isGetAdj = mail.getIsGetAdj();
				if(isGetAdj==MailConst.ADJ_STATE_2){//附件已领取
					continue;
				}
				MailAdjunct[] adjs = mail.getMailAdjuncts();
				if(adjs==null|| adjs.length==0){
					setReadedMailID.add(mail.getId());
					continue;
				}
				
				int result = getAdjunct(hero, mail, reason, setGededMailID);
				if(result==4){
					setReadedMailID.add(mail.getId());
					adjunct = result;
					continue;
				}else if(result==5||result==6||result==7){
					System.err.println("异常：附件不能为空1，result:"+result);
				}
				setGededMailID.add( mail.getId());
			}
			
			//批量修改邮件附件领取状态+读取状态
			if( setGededMailID.size()>0){
				long[] setGeded=new long[setGededMailID.size()];
				int index=0;
				for( Long mailID:setGededMailID){
					setGeded[index]=mailID;
					index++;
					FlowMailEvent.updateFujianState(mailID);
				}
				mailDao.updateBatchState(setGeded, MailConst.ADJ_STATE_2, MailConst.MAIL_READ, hero.getId(), 3);
			}
			
			//批量修改邮件已读取状态
			if( setReadedMailID.size()>0){
				long[] setReaded=new long[setReadedMailID.size()];
				int index=0;
				for( Long mailID:setReadedMailID){
					setReaded[index]=mailID;
					index++;
					FlowMailEvent.updateState(mailID, MailConst.MAIL_READ);
				}
				mailDao.updateBatchState(setReaded, 0, MailConst.MAIL_READ, hero.getId(), 1);
			}

			openMail_All(hero);
			if(adjunct==4){
				MailSender.sendCmd_310(hid, 2);//背包格子不足
			}else{
				MailSender.sendCmd_310(hid, 1);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 一键删除邮件
	 * */
	public void deleteAll(Hero hero) {
		if(hero==null) {
			return;
		}
		try {
			long hid = hero.getId();
			MailDao mailDao = MailDao.getIns();
			mailDao.oneKeyDeleteMails(hid, MailConst.MAIL_READ, MailConst.ADJ_STATE_2);
			mailDao.oneKeyDeleteMailsReaded(hid, MailConst.MAIL_READ);
			openMail_All(hero);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "one key delete mails fail");
		}
	}

	//TODO 加判断附件字符串长度，验证最大附件
	//TODO 邮件日志保存20天
	//TODO 分别判断装备背包和道具背包
	//TODO 邮件只保存7天 ，玩家下线再清理过期邮件
}
