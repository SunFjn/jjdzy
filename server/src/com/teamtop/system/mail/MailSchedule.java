package com.teamtop.system.mail;

import java.util.concurrent.ConcurrentLinkedQueue;

import com.teamtop.system.mail.model.Mail;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

public class MailSchedule extends AbsScheduleExecutor{

	public MailSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		ConcurrentLinkedQueue<Mail> mailQueue = MailCache.getMailQueue();
		if ( mailQueue.size()>0) {
			MailCache.doSend();
		}
	}

}
