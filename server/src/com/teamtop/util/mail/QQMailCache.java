package com.teamtop.util.mail;

import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.time.TimeDateUtil;


public class QQMailCache {
	private static ScheduledExecutorService executors = null;// ScheduleUtil.makeThread("qqmailSchedule");
	private static ConcurrentLinkedQueue<QQContent> contentQueue = UC.reg("contentQueue", new ConcurrentLinkedQueue<QQContent>());
	static{
		// startSchedule();
	}
	public static void startSchedule(){
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				doSend();
			}
		}, 0, TimeDateUtil.ONE_MINUTE, TimeUnit.SECONDS);
	}
	public static ConcurrentLinkedQueue<QQContent> getQueue(){
		return contentQueue;
	}
	
	private static void addMail(QQContent content){
		if(!GameProperties.gmFlag){
//			getQueue().add(content);
		}
		
	}
	
	/**
	 * 发送报错
	 * @param content
	 */
	public static void sendError(QQMailEnum en,String content){
		addMail(new QQContent("报错"+en.name()+TimeDateUtil.pringNow(), content+",pf:"+GameProperties.platform));
	}
	/**
	 * 发送严重警告
	 * @param content
	 */
	public static void sendRed(QQMailEnum en,String content){
		addMail(new QQContent("严重警告:"+en.name()+TimeDateUtil.pringNow(), content+",pf:"+GameProperties.platform));
	}
	
	public static void sendWarn(QQMailEnum en,String content){
		addMail(new QQContent("普通警告"+en.name()+TimeDateUtil.pringNow(), content+",pf:"+GameProperties.platform));
	}
	
	private static void doSend(){
//		System.err.println("do send");
		ConcurrentLinkedQueue<QQContent> queue = getQueue();
		queue.clear();
		/*Iterator<QQContent> it = queue.iterator();
		while(it.hasNext()){
			QQContent content = it.next();
			try {
				System.err.println("sending mail...");
				QQMail.sendMail(content.getTitle(), content.getContent());
				System.err.println("send done");
				Thread.sleep(1000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}finally{
				it.remove();
			}
		}*/
	}
}
