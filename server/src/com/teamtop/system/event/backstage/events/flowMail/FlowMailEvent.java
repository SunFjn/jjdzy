package com.teamtop.system.event.backstage.events.flowMail;

import java.sql.SQLException;
import java.util.Iterator;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.event.backstage.AbsBackstageEvent;
import com.teamtop.system.event.backstage.dao.BackstageDao;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.system.mail.model.MailAdjunct;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
/**
 * 邮件流水
 * @author Administrator
 *
 */
public class FlowMailEvent extends AbsBackstageEvent {
	
	@Override
	public void executeFiveMin(int currTime) {
		try {
			BackstageDao.insertBatchHasId(FlowMailCache.getMailReceiveCache());
		} catch (Exception e) {
			LogTool.error(e, FlowMailEvent.class);
		}
		ConcurrentLinkedQueue<B_FlowMail> mailUpdateCache = FlowMailCache.getUpdateFlowMailState();
		Iterator<B_FlowMail> it = mailUpdateCache.iterator();
		while(it.hasNext()){
			B_FlowMail fm = it.next();
			try {
				FlowMailDao.getIns().updateFlowMailState(fm);
			} catch (SQLException e) {
				LogTool.error(e, FlowMailEvent.class);
			}finally{
				it.remove();
			}
		}
		ConcurrentLinkedQueue<B_FlowMail> updateFlowMailFujianState = FlowMailCache.getUpdateFlowMailFujianState();
		Iterator<B_FlowMail> it2 = updateFlowMailFujianState.iterator();
		while(it2.hasNext()){
			B_FlowMail fm = it2.next();
			try {
				FlowMailDao.getIns().updateFlowMailFujianState(fm);
			} catch (SQLException e) {
				LogTool.error(e, FlowMailEvent.class);
			}finally{
				it2.remove();
			}
		}
	}
	@Override
	public void shutdownServer() {
		executeFiveMin(TimeDateUtil.getCurrentTime());
	}
	/**
	 * 收到邮件
	 * @param hero
	 * @param mail
	 */
	public static void receive(Mail mail){
		try {
			LogTool.info("mail id:"+mail.getId()+",receiverId:"+mail.getReceiverId()+",flag:"+mail.getFlag()+", time:"+mail.getSendTime(), FlowMailEvent.class);
			B_FlowMail b_FlowMail = new B_FlowMail();
			b_FlowMail.setId(mail.getId());
			b_FlowMail.setReceiver(mail.getReceiver());
			b_FlowMail.setReceiverId(mail.getReceiverId());
			b_FlowMail.setTime(TimeDateUtil.getCurrentTime());
			b_FlowMail.setSendTime(mail.getSendTime());
			b_FlowMail.setZoneid(CommonUtil.getZoneIdById(mail.getReceiverId()));
			b_FlowMail.setContent(mail.getContent());
			b_FlowMail.setIsGetAdj(mail.getIsGetAdj());
			b_FlowMail.setIsRead(mail.getIsRead());
			b_FlowMail.setMailType(mail.getTitle());
			MailAdjunct[] mailAdjuncts = mail.getMailAdjuncts();
			String str = JsonUtils.toStr(mailAdjuncts);
			b_FlowMail.setFujian(str);
			FlowMailCache.addRec(b_FlowMail);
		} catch (Exception e) {
			LogTool.error(e, FlowMailEvent.class);
		}
	}
	
	/**
	 * 邮件状态改变
	 * @param mailid
	 * @param isRead
	 */
	public static void updateState(long mailid,int isRead){
		try {
			LogTool.info("updateState id:"+mailid, FlowMailEvent.class);
			B_FlowMail b_FlowMail = new B_FlowMail();
			b_FlowMail.setId(mailid);
			b_FlowMail.setIsRead(isRead);
			b_FlowMail.setTime(TimeDateUtil.getCurrentTime());
			FlowMailCache.addUpdateFlowMailState(b_FlowMail);
		} catch (Exception e) {
			LogTool.error(e, FlowMailEvent.class);
		}
	}
	
	/**
	 * 领取附件
	 * @param mailid
	 */
	public static void updateFujianState(long mailid){
		try {
			LogTool.info("updateFujianState id:"+mailid, FlowMailEvent.class);
			B_FlowMail b_FlowMail = new B_FlowMail();
			b_FlowMail.setId(mailid);
			b_FlowMail.setIsRead(MailConst.MAIL_READ);
			b_FlowMail.setIsGetAdj(MailConst.ADJ_STATE_2);
			b_FlowMail.setTime(TimeDateUtil.getCurrentTime());
			FlowMailCache.addUpdateFlowMailFujianState(b_FlowMail);
		} catch (Exception e) {
			LogTool.error(e, FlowMailEvent.class);
		}
	}
	
}
