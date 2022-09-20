package com.teamtop.system.mail;

import java.util.List;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.mail.dao.MailDao;
import com.teamtop.system.mail.model.Mail;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class MailEvent extends AbsSystemEvent {
	private static MailEvent ins = null;

	public static MailEvent getIns() {
		if (ins == null) {
			ins = new MailEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		
	}

	@Override
	public void login(Hero hero) {
		try {
			MailDao mailDao = MailDao.getIns();

			List<Mail> mailList = mailDao.findMailList(hero.getId());//最近30封
			if( mailList==null|| mailList.size()==0){
				return;
			}
			for(int i=0;i<mailList.size();i++){
				Mail mail = mailList.get(i);
				int isGetAdj = mail.getIsGetAdj();
				int isRead = mail.getIsRead();
				if(isGetAdj==MailConst.ADJ_STATE_1||isRead==MailConst.MAIL_NOT_READ){
					MailSender.sendCmd_302(hero.getId());
					return;
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void zeroPub(int now) {
		MailFunction.getIns().delOverTimeMail();
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			// 开服第二天9点 全服发 新服加群 邮件
			try {
//				int openDays = TimeDateUtil.betweenOpen();
//				if (openDays != 2) {
//					return;
//				}
//				int mailId = MailConst.MAIL_ID_JOIN_QQ_QUN;
//				int zoneId = GameProperties.getFirstZoneId();
//				List<Long> hidList = HeroDao.getIns().findAllHidByConditions(zoneId, 0, 0, 0, 0, 0, 0);
//				int size = hidList.size();
//				long hid = 0;
//				int[][] fujian = new int[0][];
//				for (int i = 0; i < size; i++) {
//					hid = hidList.get(i);
//					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, fujian);
//				}
			} catch (Exception e) {
				LogTool.error(e, MailEvent.class, "MailEvent send join qq qun");
			}
		}
	}


}
