package com.teamtop.system.sevenContinuousConsume;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lxxf1_737;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxxf1_737;

public class SevenContinuousConsumeEvent extends AbsSystemEvent {

	private static SevenContinuousConsumeEvent ins;
	public static SevenContinuousConsumeEvent getIns(){
		if(ins == null) {
			ins = new SevenContinuousConsumeEvent();
		}
		return ins;
	}
	@Override
	public void init(Hero hero) {
		SevenContinuousConsume data = hero.getSevenContinuousConsume();
		if (data == null) {
			data=new SevenContinuousConsume();
			data.setHid(hero.getId());
			hero.setSevenContinuousConsume(data);
		}
		Map<Integer, SevenContinuousConsumeData> dataMap = data.getDataMap();
		if(dataMap == null){
			data.setDataMap(new HashMap<>());
		}
	}
	
	@Override
	public void login(Hero hero) {	
		if (TimeDateUtil.betweenOpen()>7) 
			return;
		SevenContinuousConsumeManager.getIns().chackRed(hero, 1);
	}
	
	public void zeroHero(Hero hero,int now){
		//七天后补发没领取的奖励
		if (TimeDateUtil.betweenOpen()>7) {
			SevenContinuousConsume data = hero.getSevenContinuousConsume();
			Map<Integer, SevenContinuousConsumeData> dataMap = data.getDataMap();

			int numFinishDay = 0;
			for( int i=1; i<=7; i++){
				SevenContinuousConsumeData dataOneDay = dataMap.get(i);
				if(dataOneDay == null){
					continue;
				}
				Struct_lxxf1_737 excel = Config_lxxf1_737.getIns().get(i);
				int xiaohao = excel.getXiaohao();
				int moneySpend = dataOneDay.getMoneySpend();
				int awardsGet = dataOneDay.getAwardsGet();
				if( awardsGet == SevenContinuousConsumeConst.TYPE_AWARD_GET){
				}else if(xiaohao <= moneySpend&& awardsGet != SevenContinuousConsumeConst.TYPE_AWARD_GET){
					LogTool.info("SevenContinuousConsumeEvent.send awards.hid:"+hero.getId()+" day:"+i,this);
					dataOneDay.setAwardsGet(SevenContinuousConsumeConst.TYPE_AWARD_GET);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, excel.getJiangli());
				}else if(xiaohao > moneySpend && awardsGet != SevenContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
					continue;
				}
				numFinishDay++;
			}
			
			if(numFinishDay>=3&& data.getAwardsLittleGet() != SevenContinuousConsumeConst.TYPE_AWARD_GET){//补发第3天大奖
				LogTool.info("SevenContinuousConsumeEvent.send little awards.hid:"+hero.getId(),this);
				data.setAwardsLittleGet(SevenContinuousConsumeConst.TYPE_AWARD_GET);
				int[][] other = Config_xtcs_004.getIns().get(XTCS004Const.SEVEN_CONTINUE_RECHARGE_AWARDS_LITTLE).getOther();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, other);
			}
			if(numFinishDay>=7&& data.getAwardsBigGet() != SevenContinuousConsumeConst.TYPE_AWARD_GET){//补发第3天大奖
				LogTool.info("SevenContinuousConsumeEvent.send big awards.hid:"+hero.getId(),this);
				data.setAwardsBigGet(SevenContinuousConsumeConst.TYPE_AWARD_GET);
				int[][] other = Config_xtcs_004.getIns().get(XTCS004Const.SEVEN_CONTINUE_RECHARGE_AWARDS_BIG).getOther();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, other);
			}
		}
	}
	
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

}
