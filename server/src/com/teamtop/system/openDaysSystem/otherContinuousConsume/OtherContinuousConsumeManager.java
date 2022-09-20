package com.teamtop.system.openDaysSystem.otherContinuousConsume;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_lxxf3_737;
import excel.config.Config_lxxfreward3_737;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_lxxf3_737;

public class OtherContinuousConsumeManager extends AbsOpenDaysManager {
	
	private static OtherContinuousConsumeManager ins;
	public static OtherContinuousConsumeManager getIns(){
		if(ins == null) {
			ins = new OtherContinuousConsumeManager();
		}
		return ins;
	}
	
	@Override
	public void openUI(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_CONTINUE_CONSUME)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_CONTINUE_CONSUME);
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int open = hdfl_012.getOpen();
		int end = hdfl_012.getEnd();
		int openDays = TimeDateUtil.betweenOpen();
		int days = openDays - open + 1;
		OtherContinuousConsume data = (OtherContinuousConsume) getSystemModel(hero, uid);
		Map<Integer, OtherContinuousConsumeData> dataMap = data.getDataMap();
		List<Object[]> sendData = new ArrayList<>();
		for (int i = open; i <= end; i++) {
			OtherContinuousConsumeData dataOneDay = dataMap.get(i);
			int state = 0;
			if( dataOneDay==null){
				if (i < openDays) {
					state = 2;
				}
				sendData.add(new Object[] { i, 0, state });
			}else{
				state = dataOneDay.getAwardsGet();
				if(i < openDays&& state == 0) {
					state = 2;
				}
				sendData.add(new Object[] { i, dataOneDay.getMoneySpend(), state });
			}
		}
		OtherContinuousConsumeSender.sendCmd_4830(hero.getId(), sendData.toArray(), data.getAwardsBigGet(),
				data.getAwardsLittleGet(), days);
	}
	
	public void getAwards(Hero hero, int day) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_CONTINUE_CONSUME);
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = hdfl_012.getQs();
		OtherContinuousConsume dataAll = (OtherContinuousConsume) getSystemModel(hero, uid);
		if(dataAll == null){
			//null
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 2, day);
			return;
		}

		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_CONTINUE_CONSUME)) {
			//系统未开启
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 3, day);
			return;
		}
		Map<Integer, Struct_lxxf3_737> qsMap = OtherContinuousConsumeCache.getQsMap().get(qs);
		Struct_lxxf3_737 excel = qsMap.get(day);
		if (excel == null) {
			//配置表不存在
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 4, day);
			return;
		}
		/*Struct_lxxf3_737 excel = Config_lxxf3_737.getIns().get(day);
		if( excel==null){
			//配置表不存在
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 4, day);
			return;
		}*/
		
		Map<Integer, OtherContinuousConsumeData> dataMap = dataAll.getDataMap();
		OtherContinuousConsumeData dataOneDay = dataMap.get(day);
		if( dataOneDay==null){
			dataOneDay = new OtherContinuousConsumeData();
			dataMap.put( day, dataOneDay);
		}
		int awardsGet = dataOneDay.getAwardsGet();
		if(awardsGet == OtherContinuousConsumeConst.TYPE_AWARD_GET){
			//已领取
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 5, day);
			return;
		}
		
		int betweenOpen = TimeDateUtil.betweenOpen();
		int xiaohao = excel.getXiaohao();
		int moneySpend = dataOneDay.getMoneySpend();
		if (day > betweenOpen) {
			return;
		}
		//今日奖励消耗不足
		if(moneySpend < xiaohao && day == betweenOpen){
			//元宝消耗不足
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 8, day);
			return;
		}
		int[][] jiangli = excel.getJiangli();
		boolean canAdd = UseAddUtil.canAdd(hero, jiangli, false);
		if(!canAdd){
			//背包已满
			OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 7, day);
			return;
		}
		if(moneySpend < xiaohao && day != betweenOpen){
			//补领以前的奖励
			int[][] buling = excel.getBuling();
			boolean canUse = UseAddUtil.canUse(hero, buling);
			if(!canUse){
				//元宝不足
				OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 6, day);
				return;
			}
			UseAddUtil.use(hero, buling, SourceGoodConst.REWARD_SEVEN_CONTINUE_RECHARGE_SPEND, true, true);
			dataOneDay.setMoneySpend(xiaohao);
		}
		dataOneDay.setAwardsGet( OtherContinuousConsumeConst.TYPE_AWARD_GET);
		UseAddUtil.add(hero, jiangli, SourceGoodConst.REWARD_SEVEN_CONTINUE_RECHARGE_ONE_DAY, UseAddUtil.getDefaultMail(), true);
		OtherContinuousConsumeSender.sendCmd_4832(hero.getId(), 1, day);
		chackRed(hero, 2);
		openUI(hero);
	}
	
	public void getAwardsSevenDay(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_CONTINUE_CONSUME);
		OtherContinuousConsume dataAll = (OtherContinuousConsume) getSystemModel(hero, uid);
		if(dataAll == null){
			//null
			OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 2);
			return;
		}
		int betweenOpen = TimeDateUtil.betweenOpen();
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int end = hdfl_012.getEnd();
		if (betweenOpen > end) {
			// 活动结束不能领取
			OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 3);
			return;
		}
		
		int numFinishDay = 0;
		Map<Integer, OtherContinuousConsumeData> dataMap = dataAll.getDataMap();
		Iterator<Integer> iterator = dataMap.keySet().iterator();
		for (; iterator.hasNext();) {
			Integer id = iterator.next();
			OtherContinuousConsumeData dataOneDay = dataMap.get(id);
			if(dataOneDay == null){
				continue;
			}
			Struct_lxxf3_737 excel = Config_lxxf3_737.getIns().get(id);
			int xiaohao = excel.getXiaohao();
			int moneySpend = dataOneDay.getMoneySpend();
			int awardsGet = dataOneDay.getAwardsGet();
			if(xiaohao > moneySpend && awardsGet != OtherContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
				continue;
			}
			numFinishDay++;
		}
		
		int typeAwards = 0;//0无  1三天奖励   2七天奖励  
		int awardsLittleGet = dataAll.getAwardsLittleGet();
		int awardsBigGet = dataAll.getAwardsBigGet();
		if(awardsLittleGet != OtherContinuousConsumeConst.TYPE_AWARD_GET&& numFinishDay<3) {
			OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 6);
			return;
		}else if(awardsLittleGet != OtherContinuousConsumeConst.TYPE_AWARD_GET) {
			//可领取第三天
			typeAwards = 1;
		}else if(awardsBigGet != OtherContinuousConsumeConst.TYPE_AWARD_GET&& numFinishDay<7) {
			//未满足7天连续充值条件
			OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 4);
			return;
		}else if(awardsBigGet != OtherContinuousConsumeConst.TYPE_AWARD_GET) {
			//可领取第七天
			typeAwards = 2;
		}else {
			//奖励已领完
			OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 7);
		}

		int[][] other = null;
		if(typeAwards==1) {
			int index = hdfl_012.getQs()*1000+3;
			other = Config_lxxfreward3_737.getIns().get(index).getReward();
		}else {
			int index = hdfl_012.getQs()*1000+7;
			other = Config_lxxfreward3_737.getIns().get(index).getReward();
		}
		boolean canAdd = UseAddUtil.canAdd(hero, other, true);
		if( !canAdd){
			//背包已满
			OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 5);
			return;
		}
		if(typeAwards==1) {
			dataAll.setAwardsLittleGet(OtherContinuousConsumeConst.TYPE_AWARD_GET);
		}else {
			dataAll.setAwardsBigGet(OtherContinuousConsumeConst.TYPE_AWARD_GET);
		}
		UseAddUtil.add(hero, other, SourceGoodConst.REWARD_SEVEN_CONTINUE_RECHARGE_BIG, UseAddUtil.getDefaultMail(), true);
		OtherContinuousConsumeSender.sendCmd_4834(hero.getId(), 1);
		chackRed(hero, 2);
	}

	/**
	 * @param hero
	 * @param type  1登录，2定时器更新
	 */
	public void chackRed(Hero hero, int type){
		int betweenOpen = TimeDateUtil.betweenOpen();
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_CONTINUE_CONSUME);
		if (uid == -1) {
			return;
		}
		int end = Config_hdfl_012.getIns().get(uid).getEnd();
		int open = Config_hdfl_012.getIns().get(uid).getOpen();
		if (betweenOpen >= open && betweenOpen <= end) {
			OtherContinuousConsume data = (OtherContinuousConsume) getSystemModel(hero, uid);
			Map<Integer, OtherContinuousConsumeData> dataMap = data.getDataMap();
			Iterator<Integer> iterator = dataMap.keySet().iterator();
			boolean canGet = true;
			int qishuNow = data.getQs();
			for(;iterator.hasNext();){
				Integer id = iterator.next();
				OtherContinuousConsumeData dataOneDay = dataMap.get(id);
				Struct_lxxf3_737 excel = Config_lxxf3_737.getIns().get(id);
				int qishuExcel = excel.getQs();
				if(qishuExcel != qishuNow)
					continue;
				int xiaohao = excel.getXiaohao();
				int tianshu = excel.getTianshu();
				if(dataOneDay == null&& tianshu < betweenOpen){
					canGet = false;
					boolean canUse = UseAddUtil.canUse(hero, excel.getBuling());
					if(canUse) {						
						if(type == 1){
							RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
							RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
							return;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
							RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
							return;
						}
					}
					continue;
				}else if(dataOneDay == null){
					canGet = false;
					continue;
				}
				int moneySpend = dataOneDay.getMoneySpend();
				int awardsGet = dataOneDay.getAwardsGet();
				if( awardsGet == OtherContinuousConsumeConst.TYPE_AWARD_GET){
					continue;
				}else if(xiaohao <= moneySpend&& awardsGet != OtherContinuousConsumeConst.TYPE_AWARD_GET){
					//有可领
					if(type == 1){
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					}else{
						RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					}
					return;
				}else if(xiaohao > moneySpend&& awardsGet != OtherContinuousConsumeConst.TYPE_AWARD_GET&& betweenOpen != id){
					//够钱补
					canGet = false;
					boolean canUse = UseAddUtil.canUse(hero, excel.getBuling());
					if(type == 1&& canUse){
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					}
					return;
				}else if(xiaohao > moneySpend && awardsGet != OtherContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
					canGet = false;
					continue;
				}
			}
			
			if(canGet&& data.getAwardsBigGet() != OtherContinuousConsumeConst.TYPE_AWARD_GET){//部分第七天大奖
				if(type == 1){
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}else{
					RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, OtherContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}				
				return;
			}
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		//七天后补发没领取的奖励
		if (TimeDateUtil.betweenOpen()>7) {
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
				//int[][] other = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_LITTLE_AWARDS1).getOther();
				int index = qs*1000+3;
				int[][] other = Config_lxxfreward3_737.getIns().get(index).getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, other);
			}
			if(numFinishDay>=7&& data.getAwardsBigGet() != OtherContinuousConsumeConst.TYPE_AWARD_GET){//补发第7天大奖
				LogTool.info("OtherContinuousConsumeEvent.send big awards.hid:" + hero.getId(), this);
				data.setAwardsBigGet(OtherContinuousConsumeConst.TYPE_AWARD_GET);
				//int[][] other = Config_xtcs_004.getIns().get(XTCS004Const.SEVEN_CONTINUE_RECHARGE_AWARDS_BIG).getOther();
				int index = hdfl_012.getQs()*1000+7;
				int[][] other = Config_lxxfreward3_737.getIns().get(index).getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, other);
			}
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherContinuousConsume otherContinuousConsume = (OtherContinuousConsume) opSysDataMap.get(uid);
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int qs = struct_hdfl_012.getQs();
		if (otherContinuousConsume == null) {
			otherContinuousConsume = new OtherContinuousConsume();
			otherContinuousConsume.setDataMap(new HashMap<>());
			otherContinuousConsume.setQs(qs);
		}
		return otherContinuousConsume;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return OtherContinuousConsume.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OtherContinuousConsumeEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		chackRed(hero, 2);
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.OTHER_CONTINUE_CONSUME);
		if (!checkSystemOpen) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_CONTINUE_CONSUME);
		OtherContinuousConsume data = (OtherContinuousConsume) getSystemModel(hero, uid);
		int qs = data.getQs();
		Map<Integer, Struct_lxxf3_737> qsMap = OtherContinuousConsumeCache.getQsMap().get(qs);
		int betweenOpen = TimeDateUtil.betweenOpen();
		Struct_lxxf3_737 excel = qsMap.get(betweenOpen);
		if (excel == null) {
			return;
		}
		Map<Integer, OtherContinuousConsumeData> dataMap = data.getDataMap();
		OtherContinuousConsumeData dataOneDay = dataMap.get(betweenOpen);
		if (dataOneDay == null) {
			dataOneDay = new OtherContinuousConsumeData();
			dataMap.put(betweenOpen, dataOneDay);
		}
		int moneySpend = dataOneDay.getMoneySpend();
		dataOneDay.setMoneySpend(moneySpend + consumeNum);
		chackRed(hero, 2);
	}

}
