package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationJiJin;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qdjj_742;
import excel.config.Config_shop_011;
import excel.struct.Struct_qdjj_742;

public class CelebrationJiJinManager extends AbstractActivityManager  {
	
	private static CelebrationJiJinManager ins;
	public static CelebrationJiJinManager getIns(){
		if(ins == null) {
			ins = new CelebrationJiJinManager();
		}
		return ins;
	}
	
	public void openUI(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_JI_JIN);
		if( !checkSystemOpen)
			return;
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_JI_JIN)) {
			//活动未开启
			return;
		}
		CelebrationJiJin data =(CelebrationJiJin) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.CELEBRATION_JI_JIN);
		int openDay = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.CELEBRATION_JI_JIN);
		int periods = data.getPeriods();
		
		int stateBuy = data.getStateBuy();
//		int loginNum = data.getLoginNum();
		Map<Integer, Integer> awardsMap = data.getAwardsMap();
		List<Object[]> sendData = new ArrayList<>();
		List<Struct_qdjj_742> sortList = Config_qdjj_742.getIns().getSortList();
		for(Struct_qdjj_742 temp:sortList){
			int qishu = temp.getQishu();
			if( qishu!=periods)
				continue;
			int id = temp.getId();
			Integer state = awardsMap.get(id);
			if(stateBuy!=CelebrationJiJinConst.TYPE_BUY_JI_JIN) {
				sendData.add( new Object[]{id,CelebrationJiJinConst.TYPE_AWARD_0});
			}else if( state==null&& openDay<temp.getTianshu()){
				sendData.add( new Object[]{id,CelebrationJiJinConst.TYPE_AWARD_0});
			}else if( state==null&& openDay>=temp.getTianshu()){
				sendData.add( new Object[]{id,CelebrationJiJinConst.TYPE_AWARD_1});
			}else{
				sendData.add( new Object[]{id,state});
			}
		}
//		int days = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.CELEBRATION_JI_JIN);
		CelebrationJiJinSender.sendCmd_4082(hero.getId(), stateBuy, openDay, sendData.toArray());
	}
	
	public void getAwards(Hero hero, int excelID) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_JI_JIN);
		if( !checkSystemOpen){
			//系统未开启
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 2);
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_JI_JIN)) {
			//活动未开启
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 3);
			return;
		}
		Struct_qdjj_742 excel = Config_qdjj_742.getIns().get( excelID);
		if( excel==null){
			//配置表不存在
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 4);
			return;
		}
		CelebrationJiJin dataAll =(CelebrationJiJin) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.CELEBRATION_JI_JIN);
		int periods = dataAll.getPeriods();
		int qishu = excel.getQishu();
		if(periods != qishu){
			//非本期奖励ID
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 5);
			return;
		}
		
		Map<Integer, Integer> awardsMap = dataAll.getAwardsMap();
		Integer state = awardsMap.get(excelID);
		if( state==null){
			state = 0;
		}
		if(state == CelebrationJiJinConst.TYPE_AWARD_2){
			//已领取
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 6);
			return;
		}

		int openDay = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.CELEBRATION_JI_JIN);
		int tianshu = excel.getTianshu();
//		int loginNum = dataAll.getLoginNum();
		if(openDay < tianshu){
			//登录天数不足
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 7);
			return;
		}
		int[][] jiangli = excel.getJiangli();
		boolean canAdd = UseAddUtil.canAdd(hero, jiangli, false);
		if(!canAdd){
			//背包已满
			CelebrationJiJinSender.sendCmd_4084(hero.getId(), 8);
			return;
		}
		awardsMap.put(excelID, CelebrationJiJinConst.TYPE_AWARD_2);
		UseAddUtil.add(hero, jiangli, SourceGoodConst.CELEBRATION_JI_JIN, UseAddUtil.getDefaultMail(), true);
		CelebrationJiJinSender.sendCmd_4084(hero.getId(), 1);
		checkRed(hero);
		openUI(hero);
	}
	
	/**
	 * 红点
	 * @param	type  1登录  2其他
	 */
	public void checkRed(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_JI_JIN);
		if( !checkSystemOpen){
			//系统未开启
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_JI_JIN)) {
			//活动未开启
			return;
		}
		
		CelebrationJiJin data = (CelebrationJiJin)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.CELEBRATION_JI_JIN);
		Map<Integer, Integer> awardsMap = data.getAwardsMap();
		int periods = data.getPeriods();
		
		int stateBuy = data.getStateBuy();
		if(stateBuy!=CelebrationJiJinConst.TYPE_BUY_JI_JIN) {
			return;
		}
		int openDay = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.CELEBRATION_JI_JIN);
//		int loginNum = data.getLoginNum();
		List<Struct_qdjj_742> sortList = Config_qdjj_742.getIns().getSortList();
		for(Struct_qdjj_742 excel:sortList){
			int qishu = excel.getQishu();
			if(qishu != periods)
				continue;
			
			int id = excel.getId();
			Integer state = awardsMap.get(id);
			if(state!=null&& state==CelebrationJiJinConst.TYPE_AWARD_2) 
				continue;
			if(excel.getTianshu()>openDay)
				continue;
			
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.CELEBRATION_JI_JIN, CelebrationJiJinConst.RED_1, RedPointConst.HAS_RED);
//			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
			return;
		}
	}
	
	/**
	 * 累积登录次数
	 */
//	public void checkLoginNum(Hero hero) {
//		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_JI_JIN);
//		if( !checkSystemOpen){
//			//系统未开启
//			return;
//		}
//		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_JI_JIN)) {
//			//活动未开启
//			return;
//		}
//		
//		CelebrationJiJin data = (CelebrationJiJin)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.CELEBRATION_JI_JIN);
//		int loginTime = data.getLoginTime();
//		boolean sameDay = TimeDateUtil.isSameDay(loginTime*1000l, TimeDateUtil.getCurrentTimeInMillis());
//		if(!sameDay) {
//			data.setLoginTime(TimeDateUtil.getCurrentTime());
//			data.setLoginNum( data.getLoginNum()+1);
//		}
//	}
	
	@Override
	public void actOpen() {
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		CelebrationJiJin dataAll = (CelebrationJiJin)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.CELEBRATION_JI_JIN);
		dataAll.setAwardsMap(new HashMap<Integer, Integer>());
//		dataAll.setLoginTime(TimeDateUtil.getCurrentTime());
//		dataAll.setLoginNum(1);
	}

	@Override
	public void actEnd() {
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		CelebrationJiJin data = (CelebrationJiJin)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.CELEBRATION_JI_JIN);
		Map<Integer, Integer> awardsMap = data.getAwardsMap();
		int periods = data.getPeriods();
		
		int stateBuy = data.getStateBuy();
		if(stateBuy!=CelebrationJiJinConst.TYPE_BUY_JI_JIN) {
			LogTool.info("CelebrationJiJin.no buy ji jin.hid:"+hero.getId(), this);
			return;
		}
//		int openDay = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.CELEBRATION_JI_JIN);
//		int loginNum = data.getLoginNum();
		List<Struct_qdjj_742> sortList = Config_qdjj_742.getIns().getSortList();
		for(Struct_qdjj_742 excel:sortList){
			int qishu = excel.getQishu();
			if(qishu != periods)
				continue;
			
			int id = excel.getId();
			Integer state = awardsMap.get(id);
			if(state!=null&& state==CelebrationJiJinConst.TYPE_AWARD_2) 
				continue;
//			if(excel.getTianshu()>openDay)
//				continue;
			
			MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_CELEBRATION_JI_JIN, new Object[]{MailConst.MAIL_CELEBRATION_JI_JIN}, excel.getJiangli());
		}
		LogTool.info("Celebration.send awards.hid:"+hero.getId()+" qishu:"+periods,this);
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CelebrationJiJin data = new CelebrationJiJin();
		data.setAwardsMap(new HashMap<>());
		
		data.setPeriods(activityInfo.getPeriods());
		data.setHid(hero.getId());
		data.setActId(activityInfo.getActId());
		data.setIndexId(activityInfo.getIndex());
		return data;
	}

	@Override
	public Class<?> getActivityData() {
		return CelebrationJiJin.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_JI_JIN);
		if( !checkSystemOpen)
			return;
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_JI_JIN)) {
			//活动未开启
			return;
		}
		int type = Config_shop_011.getIns().get(product_id).getType();
		if(type!=RechargeConst.JI_JIN)
			return;
		CelebrationJiJin data =(CelebrationJiJin) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.CELEBRATION_JI_JIN);
		data.setStateBuy(CelebrationJiJinConst.TYPE_BUY_JI_JIN);
		//设置前面的天数都算已登录
//		int days = ActivityFunction.getIns().getActivityOpenDays(ActivitySysId.CELEBRATION_JI_JIN);
//		data.setLoginTime(TimeDateUtil.getCurrentTime());
//		data.setLoginNum( days);
		
		openUI(hero);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return CelebrationJiJinEvent.getIns();
	}

}
