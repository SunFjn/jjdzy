package com.teamtop.system.openDaysSystem.otherContinuousConsume;

import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_lxxf3_737;
import excel.config.Config_lxxfreward3_737;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_lxxf3_737;

public class OtherContinuousConsumeEvent extends AbsSystemEvent {

	private static OtherContinuousConsumeEvent ins;
	public static OtherContinuousConsumeEvent getIns(){
		if(ins == null) {
			ins = new OtherContinuousConsumeEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {

	}
	
	@Override
	public void login(Hero hero) {	
		OtherContinuousConsumeManager.getIns().chackRed(hero, 1);
	}
	
	public void zeroHero(Hero hero,int now){
		//七天后补发没领取的奖励
		if (TimeDateUtil.betweenOpen()>7) {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_CONTINUE_CONSUME);
			OtherContinuousConsume data = (OtherContinuousConsume) OtherContinuousConsumeManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, OtherContinuousConsumeData> dataMap = data.getDataMap();
			int numFinishDay = 0;
			Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int qs = hdfl_012.getQs();
			Map<Integer, Struct_lxxf3_737> qsMap = OtherContinuousConsumeCache.getQsMap().get(qs);
			for( int key:qsMap.keySet()){
				OtherContinuousConsumeData dataOneDay = dataMap.get(key);
				if(dataOneDay == null){
					continue;
				}
				Struct_lxxf3_737 excel = Config_lxxf3_737.getIns().get(key);
				int xiaohao = excel.getXiaohao();
				int moneySpend = dataOneDay.getMoneySpend();
				int awardsGet = dataOneDay.getAwardsGet();
				if( awardsGet == OtherContinuousConsumeConst.TYPE_AWARD_GET){
				}else if(xiaohao <= moneySpend&& awardsGet != OtherContinuousConsumeConst.TYPE_AWARD_GET){
					LogTool.info("OtherContinuousConsumeEvent.send awards.hid:" + hero.getId() + " day:" + key, this);
					dataOneDay.setAwardsGet(OtherContinuousConsumeConst.TYPE_AWARD_GET);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, excel.getJiangli());
				}else if(xiaohao > moneySpend && awardsGet != OtherContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
					continue;
				}
				numFinishDay++;
			}
			
			if(numFinishDay>=3&& data.getAwardsLittleGet() != OtherContinuousConsumeConst.TYPE_AWARD_GET){//补发第3天大奖
				LogTool.info("OtherContinuousConsumeEvent.send little awards.hid:" + hero.getId(), this);
				data.setAwardsLittleGet(OtherContinuousConsumeConst.TYPE_AWARD_GET);
				
				int index = qs*1000+3;
				int[][] other = Config_lxxfreward3_737.getIns().get(index).getReward();
				
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, other);
			}
			if(numFinishDay>=7&& data.getAwardsBigGet() != OtherContinuousConsumeConst.TYPE_AWARD_GET){//补发第7天大奖
				LogTool.info("OtherContinuousConsumeEvent.send big awards.hid:" + hero.getId(), this);
				data.setAwardsBigGet(OtherContinuousConsumeConst.TYPE_AWARD_GET);
				int index = hdfl_012.getQs()*1000+7;
				int[][] other = Config_lxxfreward3_737.getIns().get(index).getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, other);
			}
		}
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
