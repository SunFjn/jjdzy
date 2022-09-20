package com.teamtop.system.sevenContinuousConsume;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_lxxf1_737;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxxf1_737;

public class SevenContinuousConsumeManager {
	
	private static SevenContinuousConsumeManager ins;
	public static SevenContinuousConsumeManager getIns(){
		if(ins == null) {
			ins = new SevenContinuousConsumeManager();
		}
		return ins;
	}
	
	public void openUI(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVEN_CONTINUOUS_RECHARGE);
		if( !checkSystemOpen)
			return;
		SevenContinuousConsume data = hero.getSevenContinuousConsume();
		Map<Integer, SevenContinuousConsumeData> dataMap = data.getDataMap();
		List<Object[]> sendData = new ArrayList<>();
		for( int i=1; i<=7; i++){
			SevenContinuousConsumeData dataOneDay = dataMap.get(i);
			if( dataOneDay==null){
				sendData.add( new Object[]{i,0,0});
			}else{
				sendData.add( new Object[]{i,dataOneDay.getMoneySpend(),dataOneDay.getAwardsGet()});
			}
		}
		SevenContinuousConsumeSender.sendCmd_3052(hero.getId(), sendData.toArray(), data.getAwardsBigGet(), data.getAwardsLittleGet());
	}
	
	public void getAwards(Hero hero, int day) {
		SevenContinuousConsume dataAll = hero.getSevenContinuousConsume();
		if(dataAll == null){
			//null
			SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 2, day);
			return;
		}

		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVEN_CONTINUOUS_RECHARGE);
		if( !checkSystemOpen){
			//系统未开启
			SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 3, day);
			return;
		}
		Struct_lxxf1_737 excel = Config_lxxf1_737.getIns().get( day);
		if( excel==null){
			//配置表不存在
			SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 4, day);
			return;
		}
		
		Map<Integer, SevenContinuousConsumeData> dataMap = dataAll.getDataMap();
		SevenContinuousConsumeData dataOneDay = dataMap.get(day);
		if( dataOneDay==null){
			dataOneDay = new SevenContinuousConsumeData();
			dataMap.put( day, dataOneDay);
		}
		int awardsGet = dataOneDay.getAwardsGet();
		if(awardsGet == SevenContinuousConsumeConst.TYPE_AWARD_GET){
			//已领取
			SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 5, day);
			return;
		}
		
		int betweenOpen = TimeDateUtil.betweenOpen();
		int xiaohao = excel.getXiaohao();
		int moneySpend = dataOneDay.getMoneySpend();
		//今日奖励消耗不足
		if(moneySpend < xiaohao && day == betweenOpen){
			//元宝消耗不足
			SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 8, day);
			return;
		}
		int[][] jiangli = excel.getJiangli();
		boolean canAdd = UseAddUtil.canAdd(hero, jiangli, false);
		if(!canAdd){
			//背包已满
			SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 7, day);
			return;
		}
		if(moneySpend < xiaohao && day != betweenOpen){
			//补领以前的奖励
			int[][] buling = excel.getBuling();
			boolean canUse = UseAddUtil.canUse(hero, buling);
			if(!canUse){
				//元宝不足
				SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 6, day);
				return;
			}
			UseAddUtil.use(hero, buling, SourceGoodConst.REWARD_SEVEN_CONTINUE_RECHARGE_SPEND, true, true);
			dataOneDay.setMoneySpend(xiaohao);
		}
		dataOneDay.setAwardsGet( SevenContinuousConsumeConst.TYPE_AWARD_GET);
		UseAddUtil.add(hero, jiangli, SourceGoodConst.REWARD_SEVEN_CONTINUE_RECHARGE_ONE_DAY, UseAddUtil.getDefaultMail(), true);
		SevenContinuousConsumeSender.sendCmd_3054(hero.getId(), 1, day);
		chackRed(hero, 2);
		openUI(hero);
	}
	
	public void getAwardsSevenDay(Hero hero) {
		SevenContinuousConsume dataAll = hero.getSevenContinuousConsume();
		if(dataAll == null){
			//null
			SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 2);
			return;
		}
		int betweenOpen = TimeDateUtil.betweenOpen();
		if(betweenOpen > 7){
			//7天后不能领取
			SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 3);
			return;
		}
		
		int numFinishDay = 0;
		Map<Integer, SevenContinuousConsumeData> dataMap = dataAll.getDataMap();
		for( int i=1; i<=7; i++){
			SevenContinuousConsumeData dataOneDay = dataMap.get(i);
			if(dataOneDay == null){
				continue;
			}
			Struct_lxxf1_737 excel = Config_lxxf1_737.getIns().get(i);
			int xiaohao = excel.getXiaohao();
			int moneySpend = dataOneDay.getMoneySpend();
			int awardsGet = dataOneDay.getAwardsGet();
			if(xiaohao > moneySpend && awardsGet != SevenContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
				continue;
			}
			numFinishDay++;
		}
		
		int typeAwards = 0;//0无  1三天奖励   2七天奖励  
		int awardsLittleGet = dataAll.getAwardsLittleGet();
		int awardsBigGet = dataAll.getAwardsBigGet();
		if(awardsLittleGet != SevenContinuousConsumeConst.TYPE_AWARD_GET&& numFinishDay<3) {
			SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 6);
			return;
		}else if(awardsLittleGet != SevenContinuousConsumeConst.TYPE_AWARD_GET) {
			//可领取第三天
			typeAwards = 1;
		}else if(awardsBigGet != SevenContinuousConsumeConst.TYPE_AWARD_GET&& numFinishDay<7) {
			//未满足7天连续充值条件
			SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 4);
			return;
		}else if(awardsBigGet != SevenContinuousConsumeConst.TYPE_AWARD_GET) {
			//可领取第七天
			typeAwards = 2;
		}else {
			//奖励已领完
			SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 7);
		}

		int[][] other = null;
		if(typeAwards==1) {
			other = Config_xtcs_004.getIns().get(XTCS004Const.SEVEN_CONTINUE_RECHARGE_AWARDS_LITTLE).getOther();
		}else {
			other = Config_xtcs_004.getIns().get(XTCS004Const.SEVEN_CONTINUE_RECHARGE_AWARDS_BIG).getOther();
		}
		boolean canAdd = UseAddUtil.canAdd(hero, other, true);
		if( !canAdd){
			//背包已满
			SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 5);
			return;
		}
		if(typeAwards==1) {
			dataAll.setAwardsLittleGet(SevenContinuousConsumeConst.TYPE_AWARD_GET);
		}else {
			dataAll.setAwardsBigGet(SevenContinuousConsumeConst.TYPE_AWARD_GET);
		}
		UseAddUtil.add(hero, other, SourceGoodConst.REWARD_SEVEN_CONTINUE_RECHARGE_BIG, UseAddUtil.getDefaultMail(), true);
		SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 1);
		chackRed(hero, 2);
	}

	/**
	 * @param hero
	 * @param type  1登录，2定时器更新
	 */
	public void chackRed(Hero hero, int type){
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (betweenOpen<=7) {
			SevenContinuousConsume data = hero.getSevenContinuousConsume();
			Map<Integer, SevenContinuousConsumeData> dataMap = data.getDataMap();
			boolean canGet = true;
			for( int i=1; i<=7; i++){
				SevenContinuousConsumeData dataOneDay = dataMap.get(i);
				Struct_lxxf1_737 excel = Config_lxxf1_737.getIns().get(i);
				int xiaohao = excel.getXiaohao();
				int tianshu = excel.getTianshu();
				if(dataOneDay == null&& tianshu < betweenOpen){
					canGet = false;
					boolean canUse = UseAddUtil.canUse(hero, excel.getBuling());
					if(canUse) {						
						if(type == 1){
							RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
							RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
							return;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
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
				if( awardsGet == SevenContinuousConsumeConst.TYPE_AWARD_GET){
					continue;
				}else if(xiaohao <= moneySpend&& awardsGet != SevenContinuousConsumeConst.TYPE_AWARD_GET){
					//有可领
					if(type == 1){
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					}else{
						RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					}
					return;
				}else if(xiaohao > moneySpend&& awardsGet != SevenContinuousConsumeConst.TYPE_AWARD_GET&& betweenOpen != i){
					//够钱补
					canGet = false;
					boolean canUse = UseAddUtil.canUse(hero, excel.getBuling());
					if(type == 1&& canUse){
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					}
					return;
				}else if(xiaohao > moneySpend && awardsGet != SevenContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
					canGet = false;
					continue;
				}
			}
			
			if(canGet&& data.getAwardsBigGet() != SevenContinuousConsumeConst.TYPE_AWARD_GET){//部分第七天大奖
				if(type == 1){
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}else{
					RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_SEVEN_CONTINUOUS_CONSUME, SevenContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}				
				return;
			}
		}
	}
}
