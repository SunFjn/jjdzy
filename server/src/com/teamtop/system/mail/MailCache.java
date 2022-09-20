package com.teamtop.system.mail;

import java.util.Iterator;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.backstage.events.flowMail.FlowMailEvent;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.dao.MailDao;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

public class MailCache extends AbsServerEvent{
	
	private static ConcurrentLinkedQueue<Mail> mailQueue = UC.reg("mailmap", new ConcurrentLinkedQueue<Mail>());//邮件发送队列缓存
	// private static ScheduledExecutorService executors =
	// ScheduleUtil.makeThread("mailSendSchedule");
	
	public static ConcurrentLinkedQueue<Mail> getMailQueue() {
		return mailQueue;
	}
	public static void setMailQueue(ConcurrentLinkedQueue<Mail> mailQueue) {
		MailCache.mailQueue = mailQueue;
	}
	//添加要发送的邮件到队列
	public static void addMailQueue(Mail mail) {
		if(mail!=null){
			mailQueue.add(mail);
		}
	}
	@Override
	public void startServer() throws RunServerException {
//		executors.scheduleAtFixedRate(new Runnable() {
//			@Override
//			public void run() {
//				if (getMailQueue().size()>0) {
//					doSend();
//				}
//			}
//		}, 0, 5, TimeUnit.SECONDS);
	}

	/**
	 * 发送
	 */
	public static void doSend() {
		//之前写在MailCache.startServer()
		ConcurrentLinkedQueue<Mail> queue = getMailQueue();
		LogTool.info("mail send start :"+queue.size(), MailCache.class);
		Iterator<Mail> it = queue.iterator();
		MailDao mailDao = MailDao.getIns();
		while(it.hasNext()){
			Mail mail = it.next();
			try {
				try {
					mailDao.insert(mail);
					// 如果系统信件发送成功则立刻通知对方有新邮件到来
					long receiverId=mail.getReceiverId();
					//判断角色是否在线
					boolean isOnline = HeroFunction.getIns().isOnline(receiverId);
					Hero hero;
					if(isOnline) {
						hero = HeroCache.getHero(receiverId);
						if (isOnline && HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_MAIL)) {
							MailSender.sendCmd_302(receiverId);
							MailSender.sendCmd_312(receiverId, mail.getId(), mail.getTitle(), mail.getFlag(),
									mail.getSendTime(), mail.getIsRead(), mail.getIsGetAdj());
						}
					}
					//记录流水
					FlowMailEvent.receive(mail);
				} catch (Exception e) {
					LogTool.error(e, MailCache.class, "send mail fail1: "+mail.getReceiverId()+" flag:"+mail.getFlag()+" Adj:"+mail.getMailAdjuncts());
				}
			   Thread.sleep(10);
			} catch (InterruptedException e) {
				LogTool.error(e, MailCache.class, "send mail fail2: "+mail.getReceiverId()+" flag:"+mail.getFlag()+" Adj:"+mail.getMailAdjuncts());
			}finally{
				it.remove();
			}
		}
		LogTool.info("mail send over :"+queue.size(), MailCache.class);
	}
	
}
