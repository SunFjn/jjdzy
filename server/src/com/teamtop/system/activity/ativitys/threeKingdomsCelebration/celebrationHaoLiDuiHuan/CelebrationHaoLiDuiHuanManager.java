package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiDuiHuan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_hldh_741;
import excel.struct.Struct_hldh_741;

public class CelebrationHaoLiDuiHuanManager extends AbstractActivityManager  {
	
	private static CelebrationHaoLiDuiHuanManager ins;
	public static CelebrationHaoLiDuiHuanManager getIns(){
		if(ins == null) {
			ins = new CelebrationHaoLiDuiHuanManager();
		}
		return ins;
	}
	
	public void openUI(Hero hero) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
		if( !checkSystemOpen)
			return;
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN)) {
			//活动未开启
			return;
		}
		CelebrationHaoLiDuiHuan data =(CelebrationHaoLiDuiHuan) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
		int periods = data.getPeriods();
		
		Map<Integer, Integer> duiHuanMap = data.getDuiHuanMap();
		List<Object[]> sendData = new ArrayList<>();
		List<Struct_hldh_741> sortList = Config_hldh_741.getIns().getSortList();
		for(Struct_hldh_741 temp:sortList){
			int qishu = temp.getQishu();
			if( qishu!=periods)
				continue;
			int id = temp.getId();
			Integer numBuyed = duiHuanMap.get(id);
			if(numBuyed==null) {
				sendData.add( new Object[]{id,0});
			}else{
				sendData.add( new Object[]{id,numBuyed});
			}
		}
		CelebrationHaoLiDuiHuanSender.sendCmd_4102(hero.getId(), sendData.toArray());
	}
	
	public void duiHuan(Hero hero, int excelID) {
		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
		if( !checkSystemOpen){
			//系统未开启
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 2);
			return;
		}
		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN)) {
			//活动未开启
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 3);
			return;
		}
		Struct_hldh_741 excel = Config_hldh_741.getIns().get( excelID);
		if( excel==null){
			//配置表不存在
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 4);
			return;
		}
		CelebrationHaoLiDuiHuan dataAll =(CelebrationHaoLiDuiHuan) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
		int periods = dataAll.getPeriods();
		int qishu = excel.getQishu();
		if(periods != qishu){
			//非本期奖励ID
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 5);
			return;
		}
		
		Map<Integer, Integer> duiHuanMap = dataAll.getDuiHuanMap();
		Integer numBuyed = duiHuanMap.get(excelID);
		if( numBuyed==null){
			numBuyed = 0;
		}
		int numLimitExcel = excel.getCishu();
		if(numLimitExcel!=0&& numBuyed>=numLimitExcel) {
			//兑换次数已用完
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 6);
			return;
		}

		int[][] spendExcel = excel.getCailiao();
		boolean canUse = UseAddUtil.canUse(hero, spendExcel);
		if(!canUse) {
			//道具不足
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 7);
			return;
		}
		
		int[][] jiangli = excel.getDaoju();
		boolean canAdd = UseAddUtil.canAdd(hero, jiangli, false);
		if(!canAdd){
			//背包已满
			CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 8);
			return;
		}
		duiHuanMap.put(excelID, numBuyed+1);
		UseAddUtil.use(hero, spendExcel, SourceGoodConst.CELEBRATION_HAO_LI_DUI_HUAN, true);
		UseAddUtil.add(hero, jiangli, SourceGoodConst.CELEBRATION_HAO_LI_DUI_HUAN, UseAddUtil.getDefaultMail(), true);
		CelebrationHaoLiDuiHuanSender.sendCmd_4104(hero.getId(), 1);
		openUI(hero);
	}
	/**
	 * 红点
	 * @param	type  1登录  2其他
	 */
//	public void checkRed(Hero hero) {
//		boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
//		if( !checkSystemOpen){
//			//系统未开启
//			return;
//		}
//		if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN)) {
//			//活动未开启
//			return;
//		}
//		
//		CelebrationHaoLiDuiHuan data = (CelebrationHaoLiDuiHuan)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
//		Map<Integer, Integer> awardsMap = data.getAwardsMap();
//		int periods = data.getPeriods();
//		
//		int stateBuy = data.getStateBuy();
//		if(stateBuy!=CelebrationHaoLiDuiHuanConst.TYPE_BUY_JI_JIN) {
//			return;
//		}
//		int loginNum = data.getLoginNum();
//		List<Struct_qdjj_742> sortList = Config_qdjj_742.getIns().getSortList();
//		for(Struct_qdjj_742 excel:sortList){
//			int qishu = excel.getQishu();
//			if(qishu != periods)
//				continue;
//			
//			int id = excel.getId();
//			Integer state = awardsMap.get(id);
//			if(state!=null&& state==CelebrationHaoLiDuiHuanConst.TYPE_AWARD_2) 
//				continue;
//			if(excel.getTianshu()>loginNum)
//				continue;
//			
//			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN, CelebrationHaoLiDuiHuanConst.RED_1, RedPointConst.HAS_RED);
////			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK, OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
//			return;
//		}
//	}
	
	@Override
	public void actOpen() {
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		CelebrationHaoLiDuiHuan dataAll = (CelebrationHaoLiDuiHuan)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.CELEBRATION_HAO_LI_DUI_HUAN);
		dataAll.setDuiHuanMap(new HashMap<Integer, Integer>());
	}

	@Override
	public void actEnd() {
		
	}

	@Override
	public void heroActEnd(Hero hero) {

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		CelebrationHaoLiDuiHuan data = new CelebrationHaoLiDuiHuan();
		data.setDuiHuanMap(new HashMap<>());
		
		data.setPeriods(activityInfo.getPeriods());
		data.setHid(hero.getId());
		data.setActId(activityInfo.getActId());
		data.setIndexId(activityInfo.getIndex());
		return data;
	}

	@Override
	public Class<?> getActivityData() {
		return CelebrationHaoLiDuiHuan.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return CelebrationHaoLiDuiHuanEvent.getIns();
	}

	

}
