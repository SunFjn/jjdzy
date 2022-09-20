package com.teamtop.system.openDaysSystem.otherSevenGroupBuy;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_sctg3_730;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_sctg3_730;

public class OtherSevenGroupBuyManager extends AbsOpenDaysManager {

	private static OtherSevenGroupBuyManager ins;
	public static OtherSevenGroupBuyManager getIns(){
		if(ins == null) {
			ins = new OtherSevenGroupBuyManager();
		}
		return ins;
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.Other_SevenGroupBuy)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.Other_SevenGroupBuy);
			/*Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int kaiqi=struct_hdfl_012.getOpen();
			int jieshu=struct_hdfl_012.getEnd();*/
			OtherSevenGroupBuy groupBuy = (OtherSevenGroupBuy) getSystemModel(hero, uid);
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!OtherSevenGroupBuyCache.otherSevenGroupBuyMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherSevenGroupBuyManager.class);
				return;
			}
			HashMap<Integer, Struct_sctg3_730> hashMap = OtherSevenGroupBuyCache.otherSevenGroupBuyMap.get(openFuDay);
			Object[] rewards=new Object[hashMap.size()];
			int a=0;
			for (Struct_sctg3_730 sctg3_730: hashMap.values()) {
				//本人奖励状态
				Integer rewardState = groupBuy.getRewards().get(sctg3_730.getId());
				if (rewardState==GameConst.REWARD_0) {
					if (groupBuy.getIsFristNum()>0) {
						if (sctg3_730.getJine()==1&&OtherSevenGroupBuyCache.fristRechargeNum>=sctg3_730.getRenshu()) {
							//1：充值任意金额
							groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_1);
							rewardState=GameConst.REWARD_1;
						}else if (sctg3_730.getJine()>1&&groupBuy.getTodayRrmb()>=sctg3_730.getJine()&&OtherSevenGroupBuyCache.fristRechargeNum>=sctg3_730.getRenshu()) {
							// x（大于1的具体值）：充值指定金额
							groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_1);
							rewardState=GameConst.REWARD_1;
						}
					}
					if (sctg3_730.getJine()==0&&OtherSevenGroupBuyCache.fristRechargeNum>=sctg3_730.getRenshu()) {
						groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_1);
						rewardState=GameConst.REWARD_1;
					}
				}
				rewards[a]=new Object[] {sctg3_730.getId(),rewardState};
				a++;
			}
			OtherSevenGroupBuySender.sendCmd_7450(hero.getId(), groupBuy.getTodayRrmb(), OtherSevenGroupBuyCache.fristRechargeNum, rewards);
		} catch (Exception e) {
			LogTool.error(e, OtherSevenGroupBuyManager.class, "openUI has wrong");
		}
		
	}
	
	/**
	 * 获取奖励
	 * @param hero
	 * @param rewardindex
	 */
	public void getreward(Hero hero, int rewardindex) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.Other_SevenGroupBuy)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.Other_SevenGroupBuy);
			
			OtherSevenGroupBuy groupBuy = (OtherSevenGroupBuy) getSystemModel(hero, uid);
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!OtherSevenGroupBuyCache.otherSevenGroupBuyMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherSevenGroupBuyManager.class);
				return;
			}
			Integer state = groupBuy.getRewards().get(rewardindex);
			if (state==null) {
				LogTool.warn("hid: "+hero.getId()+" name:"+hero.getName()+" state==null", OtherSevenGroupBuyManager.class);
				return;
			}
			if (state==GameConst.REWARD_1) {
				HashMap<Integer, Struct_sctg3_730> rewardMap = OtherSevenGroupBuyCache.otherSevenGroupBuyMap.get(openFuDay);
				if (rewardMap.containsKey(rewardindex)) {
					Struct_sctg3_730 struct_sctg3_730 = rewardMap.get(rewardindex);
					//发奖励
					if (UseAddUtil.canAdd(hero, struct_sctg3_730.getJiangli(), false)) {
						groupBuy.getRewards().put(struct_sctg3_730.getId(), GameConst.REWARD_2);
						UseAddUtil.add(hero, struct_sctg3_730.getJiangli(), SourceGoodConst.REWARD_FRISTGUY, null, true);
						OtherSevenGroupBuySender.sendCmd_7452(hero.getId(), rewardindex, GameConst.REWARD_2,groupBuy.getTodayRrmb());
						return;
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, OtherSevenGroupBuyManager.class, "getreward has wrong");
		}
		
	}
	
	
	
	

	@Override
	public void handleOpenPub() {
		
		
	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		
		
	}

	@Override
	public void handleEndPub() {
		
		
	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		try {
			OtherSevenGroupBuy groupBuy = (OtherSevenGroupBuy) OtherSevenGroupBuyManager.getIns().getSystemModel(hero, uid);
			if (groupBuy!=null) {
				groupBuy.setIsFristNum(0);
				groupBuy.setTodayRrmb(0);
			}
			for (Struct_sctg3_730 sctg3_730: Config_sctg3_730.getIns().getSortList()) {
				if (groupBuy.getRewards().get(sctg3_730.getId())==GameConst.REWARD_1) {
					groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_2);
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_FRISTGROUP_AWARDS,
							new Object[] { MailConst.MAIL_FRISTGROUP_AWARDS }, sctg3_730.getJiangli());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, "OtherSevenGroupBuyManager handleEnd");
		}
		
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		OtherSevenGroupBuy otherSevenGroupBuy = (OtherSevenGroupBuy)heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (otherSevenGroupBuy==null) {
			otherSevenGroupBuy=new OtherSevenGroupBuy();
			otherSevenGroupBuy.setTodayRrmb(0);
			otherSevenGroupBuy.setIsFristNum(0);
			otherSevenGroupBuy.setRewards(new HashMap<>());
			Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int kaiqi=struct_hdfl_012.getOpen();
			int jieshu=struct_hdfl_012.getEnd();
			for (int i = kaiqi; i <=jieshu; i++) {
				HashMap<Integer, Struct_sctg3_730> hashMap = OtherSevenGroupBuyCache.getOtherSevenGroupBuyMap().get(i);
				if (hashMap!=null) {
					for (Struct_sctg3_730 sctg3_730:hashMap.values()) {
						otherSevenGroupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_0);
					}
				}
				
			}
			if (hero.getOneDayRecharge()>0) {
				//更新当天有充值过
				otherSevenGroupBuy.setIsFristNum(1);
				otherSevenGroupBuy.setTodayRrmb(hero.getOneDayConsmeNum());
				OtherSevenGroupBuyCache.fristRechargeNum=OtherSevenGroupBuyCache.fristRechargeNum+8;
				//openUI(hero);
			
			}
		}
		return otherSevenGroupBuy;
	}

	@Override
	public Class<?> getSystemModel() {
		return OtherSevenGroupBuy.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		
		return OtherSevenGroupBuyEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.Other_SevenGroupBuy)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.Other_SevenGroupBuy);
			int openFuDay = TimeDateUtil.betweenOpen();
			
			OtherSevenGroupBuy groupBuy = (OtherSevenGroupBuy) getSystemModel(hero, uid);
			boolean isaddFristNum=false;
			if(groupBuy.getIsFristNum()==0) {
				if (!OtherSevenGroupBuyCache.otherSevenGroupBuyMap.containsKey(openFuDay)) {
					LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, OtherSevenGroupBuyManager.class);
					return;
				}
				OtherSevenGroupBuyCache.fristRechargeNum=OtherSevenGroupBuyCache.fristRechargeNum+8;
				groupBuy.setIsFristNum(1);
				isaddFristNum=true;
			}
			groupBuy.setTodayRrmb(groupBuy.getTodayRrmb()+money);
			
			HashMap<Integer, Struct_sctg3_730> sctg3_730Map = OtherSevenGroupBuyCache.otherSevenGroupBuyMap.get(openFuDay);
			
			for (Struct_sctg3_730 sctg3_730: sctg3_730Map.values()) {
				//本人奖励状态
				Integer rewardState = groupBuy.getRewards().get(sctg3_730.getId());
				if (rewardState==GameConst.REWARD_0) {
					if (sctg3_730.getJine()==1&&OtherSevenGroupBuyCache.fristRechargeNum==sctg3_730.getRenshu()) {
						//1：充值任意金额
						groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_1);
						OtherSevenGroupBuySender.sendCmd_7452(hero.getId(), sctg3_730.getId(), GameConst.REWARD_1,groupBuy.getTodayRrmb());
						
					}else if (sctg3_730.getJine()>1&&groupBuy.getTodayRrmb()>=sctg3_730.getJine()&&OtherSevenGroupBuyCache.fristRechargeNum==sctg3_730.getRenshu()) {
						// x（大于1的具体值）：充值指定金额
						groupBuy.getRewards().put(sctg3_730.getId(), GameConst.REWARD_1);
						OtherSevenGroupBuySender.sendCmd_7452(hero.getId(), sctg3_730.getId(), GameConst.REWARD_1,groupBuy.getTodayRrmb());
					}
				}
			}
			//OtherSevenGroupBuySender.sendCmd_7452(hero.getId(), 0, 0,groupBuy.getTodayRrmb());
			if (isaddFristNum) {
				for (Hero hero1: HeroCache.getHeroMap().values()) {
					if(HeroFunction.getIns().isOnline(hero1.getId())) {
						OtherSevenGroupBuySender.sendCmd_7454(hero1.getId(), OtherSevenGroupBuyCache.fristRechargeNum);
					}
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, OtherSevenGroupBuyManager.class, "rechargeHandle has wrong");
		}
		
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub
		
	}

	

}
