package com.teamtop.system.event.backstage.events.flowMail;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ScheduledExecutorService;

import com.teamtop.system.event.backstage.BSEnum;
import com.teamtop.system.event.backstage.BSUC;
import com.teamtop.system.mail.MailCache;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.exector.schedule.ScheduleUtil;
public class FlowMailCache {
	private static ConcurrentHashMap<Integer, ConcurrentLinkedQueue<B_FlowMail>> mailReceiveCache = UC.reg("mailReceiveCache", new ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowMail>>());//新邮件
	private static ConcurrentLinkedQueue<B_FlowMail> updateFlowMailState = UC.reg("updateFlowMailState", new ConcurrentLinkedQueue<B_FlowMail>());//邮件阅读状态修改
	private static ConcurrentLinkedQueue<B_FlowMail> updateFlowMailFujianState = UC.reg("updateFlowMailFujianState", new ConcurrentLinkedQueue<B_FlowMail>());//邮件附件状态修改
	
	public static ConcurrentHashMap<Integer,ConcurrentLinkedQueue<B_FlowMail>> getMailReceiveCache(){
		return mailReceiveCache;
	}
	public static ConcurrentLinkedQueue<B_FlowMail> getUpdateFlowMailState(){
		return updateFlowMailState;
	}
	public static ConcurrentLinkedQueue<B_FlowMail> getUpdateFlowMailFujianState(){
		return updateFlowMailFujianState;
	}
	public static void addRec(B_FlowMail fm){
		int zoneid = CommonUtil.getZoneIdById(fm.getId());
		if(zoneid==0) return;
		ConcurrentLinkedQueue<B_FlowMail> queue = mailReceiveCache.get(zoneid);
		if(queue==null){
			queue = new ConcurrentLinkedQueue<B_FlowMail>();
			mailReceiveCache.put(zoneid, queue);
		}
		queue.add(fm);
	}
	public static void addUpdateFlowMailFujianState(B_FlowMail fm){
		updateFlowMailFujianState.add(fm);
	}
	public static void addUpdateFlowMailState(B_FlowMail fm){
		updateFlowMailState.add(fm);
	}
	
}
