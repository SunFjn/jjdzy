package com.teamtop.houtaiHttp.events.serverEvent.setServerWarn;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

/**
 * 开服设置定时器检测备份服务器数是否满足设置的预警数目，不满足发邮件
 * 
 * @author jjjjyyy
 *
 */
public class SetServerWarnSchedule extends AbsScheduleExecutor {

	public SetServerWarnSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		// TODO Auto-generated method stub
		SetServerWarnFuntion.getIns().executeSendMail();
	}

}
