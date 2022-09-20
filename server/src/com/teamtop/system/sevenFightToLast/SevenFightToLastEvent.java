package com.teamtop.system.sevenFightToLast;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xzbc_023;
import excel.struct.Struct_xzbc_023;

public class SevenFightToLastEvent extends AbsSystemEvent {

	private static SevenFightToLastEvent ins;
	public static SevenFightToLastEvent getIns(){
		if(ins == null) {
			ins = new SevenFightToLastEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		if (hero.getSevenFightToLast()==null) {
			SevenFightToLast sevenFightToLast=new SevenFightToLast();
			sevenFightToLast.setHid(hero.getId());
			sevenFightToLast.setFloorNum(0);
			hero.setSevenFightToLast(sevenFightToLast);
		}
		
	}

	@Override
	public void login(Hero hero) {
		//7.9-7.16
		int openDayZero = TimeDateUtil.getOneDayZeroTime(GameProperties.serverOpenTime);
		int beginTime   = TimeDateUtil.getTimeIntByStr("2019-07-09 02:00:00");
		int overTime   = TimeDateUtil.getTimeIntByStr("2019-07-16 23:59:50");
		if (openDayZero>beginTime&&openDayZero<overTime) {
			if (hero.getSevenFightToLast().getIsBuChang()==0) {
				int floorNum = hero.getSevenFightToLast().getFloorNum();
				if (floorNum>0) {
					for (int i = 1; i <=floorNum; i++) {
						Struct_xzbc_023 struct_xzbc_023 = Config_xzbc_023.getIns().get(i);
						if (struct_xzbc_023!=null&&struct_xzbc_023.getBuchang()!=null) {
							//发补偿邮件
							MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.BUFA_BOOL_LAST, new Object[] {MailConst.BUFA_BOOL_LAST,i}, struct_xzbc_023.getBuchang());
						}
					}
				}
				hero.getSevenFightToLast().setIsBuChang(1);
			}
		}
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENFIGHTTOLAST)) return;
		SevenFightToLastManager.getIns().openUi(hero);
	}

}
