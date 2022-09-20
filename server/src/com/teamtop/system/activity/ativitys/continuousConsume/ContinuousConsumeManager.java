package com.teamtop.system.activity.ativitys.continuousConsume;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.OverCallbackCLConst;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.sevenContinuousConsume.SevenContinuousConsumeSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lxxf2_737;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxxf2_737;
import excel.struct.Struct_xtcs_004;

public class ContinuousConsumeManager extends AbstractActivityManager  {
	
	private static ContinuousConsumeManager ins;
	public static ContinuousConsumeManager getIns(){
		if(ins == null) {
			ins = new ContinuousConsumeManager();
		}
		return ins;
	}
	
	public void openUI(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CONTINUOUS_RECHARGE);
		if( !checkSystemOpen)
			return;
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.ACT_CONTINUOUS_CONSUME)) {
			//活动未开启
			return;
		}
		ContinuousConsume data =(ContinuousConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME);
//		ContinuousConsume data = (ContinuousConsume)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		int periods = data.getPeriods();
		
		Map<Integer, ContinuousConsumeData> dataMap = data.getDataMap();
		List<Object[]> sendData = new ArrayList<>();
		List<Struct_lxxf2_737> sortList = Config_lxxf2_737.getIns().getSortList();
		for(Struct_lxxf2_737 temp:sortList){
			int qishu = temp.getQishu();
			if( qishu!=periods)
				continue;
			int id = temp.getId();
			ContinuousConsumeData dataOneDay = dataMap.get(id);
			if( dataOneDay==null){
				sendData.add( new Object[]{id,0,0});
			}else{
				sendData.add( new Object[]{id,dataOneDay.getMoneySpend(),dataOneDay.getAwardsGet()});
			}
		}
		int days = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		ContinuousConsumeSender.sendCmd_3072(hero.getId(), periods, sendData.toArray(), data.getAwardsBigGet(), data.getAwardsLittleGet());
	}
	
	public void getAwards(Hero hero, int excelID) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CONTINUOUS_RECHARGE);
		if( !checkSystemOpen){
			//系统未开启
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 3, excelID);
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.ACT_CONTINUOUS_CONSUME)) {
			//活动未开启
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 10, excelID);
			return;
		}
		Struct_lxxf2_737 excel = Config_lxxf2_737.getIns().get( excelID);
		if( excel==null){
			//配置表不存在
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 4, excelID);
			return;
		}
		ContinuousConsume dataAll =(ContinuousConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME);
//		ContinuousConsume dataAll = (ContinuousConsume)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		int periods = dataAll.getPeriods();
		int qishu = excel.getQishu();
		if(periods != qishu){
			//传入ID非本期ID
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 9, excelID);
			return;
		}
		
		Map<Integer, ContinuousConsumeData> dataMap = dataAll.getDataMap();
		ContinuousConsumeData dataOneDay = dataMap.get(excelID);
		if( dataOneDay==null){
			dataOneDay = new ContinuousConsumeData();
			dataMap.put( excelID, dataOneDay);
		}
		int awardsGet = dataOneDay.getAwardsGet();
		if(awardsGet == ContinuousConsumeConst.TYPE_AWARD_GET){
			//已领取
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 5, excelID);
			return;
		}

		int day = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		int tianshu = excel.getTianshu();
		int xiaohao = excel.getXiaohao();
		int moneySpend = dataOneDay.getMoneySpend();
		if(moneySpend < xiaohao && day == tianshu){
			//今日元宝消耗不足
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 8, excelID);
			return;
		}
		int[][] jiangli = excel.getJiangli();
		boolean canAdd = UseAddUtil.canAdd(hero, jiangli, false);
		if(!canAdd){
			//背包已满
			ContinuousConsumeSender.sendCmd_3074(hero.getId(), 7, excelID);
			return;
		}
		if(moneySpend < xiaohao && day != tianshu){
			//补领以前的奖励
			int[][] buling = excel.getBuling();
			boolean canUse = UseAddUtil.canUse(hero, buling);
			if(!canUse){
				//元宝不足
				ContinuousConsumeSender.sendCmd_3074(hero.getId(), 6, excelID);
				return;
			}
			UseAddUtil.use(hero, buling, SourceGoodConst.REWARD_CONTINUE_RECHARGE_SPEND, true, true);
			dataOneDay.setMoneySpend(xiaohao);
		}
		dataOneDay.setAwardsGet( ContinuousConsumeConst.TYPE_AWARD_GET);
		UseAddUtil.add(hero, jiangli, SourceGoodConst.REWARD_CONTINUE_RECHARGE_ONE_DAY, UseAddUtil.getDefaultMail(), true);
		ContinuousConsumeSender.sendCmd_3074(hero.getId(), 1, excelID);
		checkRed(hero, 2);
		openUI(hero);
	}
	
	public void getAwardsSevenDay(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CONTINUOUS_RECHARGE);
		if( !checkSystemOpen){
			//系统未开启
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 2);
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.ACT_CONTINUOUS_CONSUME)) {
			//活动未开启
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 7);
			return;
		}
		ContinuousConsume dataAll = (ContinuousConsume)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		int periods = dataAll.getPeriods();
		
		int numFinishDay = 0;
		Map<Integer, ContinuousConsumeData> dataMap = dataAll.getDataMap();
		List<Struct_lxxf2_737> sortList = Config_lxxf2_737.getIns().getSortList();
		for(Struct_lxxf2_737 excel:sortList){
			int qishu = excel.getQishu();
			if(qishu != periods)
				continue;
			
			int id = excel.getId();
			ContinuousConsumeData dataOneDay = dataMap.get(id);
			if(dataOneDay == null){
				continue;
			}
			int xiaohao = excel.getXiaohao();
			int moneySpend = dataOneDay.getMoneySpend();
			int awardsGet = dataOneDay.getAwardsGet();
			if(xiaohao > moneySpend && awardsGet != ContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
				continue;
			}
			numFinishDay++;
		}
		
		int typeAwards = 0;//0无  1三天奖励   2七天奖励  
		int awardsLittleGet = dataAll.getAwardsLittleGet();
		int awardsBigGet = dataAll.getAwardsBigGet();
		if(awardsLittleGet != ContinuousConsumeConst.TYPE_AWARD_GET&& numFinishDay<3) {
			//未满足3天连续消费条件
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 8);
			return;
		}else if(awardsLittleGet != ContinuousConsumeConst.TYPE_AWARD_GET) {
			//可领取第三天
			typeAwards = 1;
		}else if(awardsBigGet != ContinuousConsumeConst.TYPE_AWARD_GET&& numFinishDay<7) {
			//未满足7天连续消费条件
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 4);
			return;
		}else if(awardsBigGet != ContinuousConsumeConst.TYPE_AWARD_GET) {
			//可领取第七天
			typeAwards = 2;
		}else {
			//奖励已领完
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 9);
			return;
		}
		
		int[][] other = getBigAwards(periods, typeAwards);
		if(other == null){
			//没配这期奖励
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 6);
			return;
		}
		boolean canAdd = UseAddUtil.canAdd(hero, other, true);
		if( !canAdd){
			//背包已满
			ContinuousConsumeSender.sendCmd_3076(hero.getId(), 5);
			return;
		}
		if(typeAwards==1) {
			dataAll.setAwardsLittleGet(ContinuousConsumeConst.TYPE_AWARD_GET);
		}else {
			dataAll.setAwardsBigGet(ContinuousConsumeConst.TYPE_AWARD_GET);
		}
		UseAddUtil.add(hero, other, SourceGoodConst.REWARD_CONTINUE_RECHARGE_BIG, UseAddUtil.getDefaultMail(), true);
		SevenContinuousConsumeSender.sendCmd_3056(hero.getId(), 1);
		checkRed(hero, 2);
	}

	public int[][] getBigAwards(int qiShu, int type){
		int[][] other = null;
		Struct_xtcs_004 excel = null;
		switch (qiShu) {
		case 1:
			if(type==1) {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_LITTLE_AWARDS1);
				other = excel.getOther();
			}else {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_BIG_AWARDS1);
				other = excel.getOther();
			}
			return other;
		case 2:
			if(type==1) {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_LITTLE_AWARDS2);
				other = excel.getOther();
			}else {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_BIG_AWARDS2);
				other = excel.getOther();
			}
			return other;
		case 3:
			if (type == 1) {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_LITTLE_AWARDS3);
				other = excel.getOther();
			} else {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_BIG_AWARDS3);
				other = excel.getOther();
			}
			return other;
		case 4:
			if (type == 1) {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_LITTLE_AWARDS4);
				other = excel.getOther();
			} else {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_BIG_AWARDS4);
				other = excel.getOther();
			}
			return other;
		case 5:
			if (type == 1) {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_LITTLE_AWARDS5);
				other = excel.getOther();
			} else {
				excel = Config_xtcs_004.getIns().get(XTCS004Const.CONTINUE_RECHARGE_BIG_AWARDS5);
				other = excel.getOther();
			}
			return other;
		default:
			break;
		}
		return null;
	}
	
	/**
	 * 红点
	 * @param	type  1登录  2其他
	 */
	public void checkRed(Hero hero, int type) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CONTINUOUS_RECHARGE);
		if( !checkSystemOpen){
			//系统未开启
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.ACT_CONTINUOUS_CONSUME)) {
			//活动未开启
			return;
		}
		ContinuousConsume data =(ContinuousConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME);
		Map<Integer, ContinuousConsumeData> dataMap = data.getDataMap();
		int qishuNow = data.getPeriods();
		int actOpenDay = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		boolean canGet7DayAwards = true;
		
		List<Struct_lxxf2_737> sortList = Config_lxxf2_737.getIns().getSortList();
		for(Struct_lxxf2_737 excel:sortList){
			int qishuExcel = excel.getQishu();
			if(qishuExcel != qishuNow)
				continue;
			
			int id = excel.getId();
			int tianshuExcel = excel.getTianshu();
			ContinuousConsumeData dataByID = dataMap.get(id);
			if(dataByID == null&& tianshuExcel < actOpenDay){
				canGet7DayAwards = false;
				boolean canUse = UseAddUtil.canUse(hero, excel.getBuling());
				if(type == 1&& canUse){
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
					return ;
				}
				continue;
			}else if(dataByID == null){
				canGet7DayAwards = false;
				continue;
			}
			int xiaohao = excel.getXiaohao();
			int moneySpend = dataByID.getMoneySpend();
			int awardsGet = dataByID.getAwardsGet();
			if( awardsGet == ContinuousConsumeConst.TYPE_AWARD_GET){
				continue;
			}else if(xiaohao <= moneySpend&& awardsGet != ContinuousConsumeConst.TYPE_AWARD_GET){
				if(type == 1){
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}else{
					RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}
				return;
			}else if(xiaohao > moneySpend&& awardsGet != ContinuousConsumeConst.TYPE_AWARD_GET&& tianshuExcel!=actOpenDay){
				canGet7DayAwards = false;
				boolean canUse = UseAddUtil.canUse(hero, excel.getBuling());
				if(type == 1&& canUse){
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				}
				return;
			}else if(xiaohao > moneySpend && awardsGet != ContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
				canGet7DayAwards = false;
				continue;
			}
		}
		
		if(canGet7DayAwards&& data.getAwardsBigGet() != ContinuousConsumeConst.TYPE_AWARD_GET){//部分第七天大奖
			if(type == 1){
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
			}else{
				RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.ACT_CONTINUOUS_CONSUME, ContinuousConsumeConst.RED_1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().updateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
			}
			return;
		}
	}
	
	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		ContinuousConsume dataAll = (ContinuousConsume)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		dataAll.setDataMap(new HashMap<Integer, ContinuousConsumeData>());
		dataAll.setAwardsBigGet(0);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		ContinuousConsume data = (ContinuousConsume)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_CONTINUOUS_CONSUME);
		Map<Integer, ContinuousConsumeData> dataMap = data.getDataMap();
		int periods = data.getPeriods();
		
		int numFinishDay = 0;
		List<Struct_lxxf2_737> sortList = Config_lxxf2_737.getIns().getSortList();
		for(Struct_lxxf2_737 excel:sortList){
			int qishu = excel.getQishu();
			if(qishu != periods)
				continue;
			
			int id = excel.getId();
			ContinuousConsumeData dataOneDay = dataMap.get(id);
			if(dataOneDay == null){
				continue;
			}
			int xiaohao = excel.getXiaohao();
			int moneySpend = dataOneDay.getMoneySpend();
			int awardsGet = dataOneDay.getAwardsGet();
			if( awardsGet == ContinuousConsumeConst.TYPE_AWARD_GET){
			}else if(xiaohao <= moneySpend&& awardsGet != ContinuousConsumeConst.TYPE_AWARD_GET){
				dataOneDay.setAwardsGet(ContinuousConsumeConst.TYPE_AWARD_GET);
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, excel.getJiangli());
				LogTool.info("ContinuousConsumeEvent.send awards.hid:"+hero.getId()+" day:"+excel.getTianshu()+" id:"+excel.getId(),this);
			}else if(xiaohao > moneySpend && awardsGet != ContinuousConsumeConst.TYPE_AWARD_GET){//消费不足且没补领的玩家
				continue;
			}
			numFinishDay++;
		}
		
		if(numFinishDay>=3&& data.getAwardsLittleGet() != ContinuousConsumeConst.TYPE_AWARD_GET){//补发第3天大奖
			data.setAwardsLittleGet(ContinuousConsumeConst.TYPE_AWARD_GET);
			int[][] bigAwards = getBigAwards(periods, 1);
			MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, bigAwards);
			LogTool.info("ContinuousConsumeEvent.send little awards.hid:"+hero.getId()+" qishu:"+periods,this);
		}
		if(numFinishDay>=7&& data.getAwardsBigGet() != ContinuousConsumeConst.TYPE_AWARD_GET){//补发第七天大奖
			data.setAwardsBigGet(ContinuousConsumeConst.TYPE_AWARD_GET);
			int[][] bigAwards = getBigAwards(periods, 2);
			MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS, new Object[]{MailConst.MAIL_SEVEN_CONTINUCOUS_CONSUME_AWARDS}, bigAwards);
			LogTool.info("ContinuousConsumeEvent.send big awards.hid:"+hero.getId()+" qishu:"+periods,this);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		ContinuousConsume data = new ContinuousConsume();
		data.setDataMap(new HashMap<>());
		
		data.setPeriods(activityInfo.getPeriods());
		data.setHid(hero.getId());
		data.setActId(activityInfo.getActId());
		return data;
	}

	@Override
	public Class<?> getActivityData() {
		return ContinuousConsume.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return ContinuousConsumeEvent.getIns();
	}

}
