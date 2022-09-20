package com.teamtop.system.activity.ativitys.hefuGodGift;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hfkhgod_286;
import excel.struct.Struct_hfkhgod_286;

public class HeFuGodGiftFunction {
	
	private static HeFuGodGiftFunction ins;

	private HeFuGodGiftFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeFuGodGiftFunction getIns() {
		if (ins == null) {
			ins = new HeFuGodGiftFunction();
		}
		return ins;
	}
	
	/**
	 * 活动期间vip升级
	 * @param hero
	 * @param nextLevel
	 */
	public void vipLevelUp(int oldLevel,int nextLevel) {
		try {
			if (!ActivityFunction.getIns().checkSwitch(ActivitySysId.HEFU_GODGIFT)) {
				return;
			}
			ConcurrentHashMap<Integer, Integer> vipGoalNum = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum();
			if (vipGoalNum==null) {
				vipGoalNum=new ConcurrentHashMap<Integer, Integer>();
				HeFuGodGiftSysCache.getHeFuGodGiftCache().setVipGoalNum(vipGoalNum);
				HeFuGodGiftManager.getIns().actOpen();
			}else if (vipGoalNum.size()==0) {
				HeFuGodGiftManager.getIns().actOpen();
			}
			boolean isAddVipNum=false;
			boolean isVipRewardNum=false;
			for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
				if (hfkhgod_286.getDc()==1) {
					//获取档次 百位 十位
					int id = hfkhgod_286.getId();
					int index=id/10;
					int cs1 = hfkhgod_286.getCs1();
					if(nextLevel>=cs1&&oldLevel<cs1) {
						isAddVipNum=true;
						if (id/100==2) {
							isVipRewardNum=true;
						}
						if (vipGoalNum.containsKey(index)) {
							Integer num = vipGoalNum.get(index);
							vipGoalNum.put(index, num+1);
						}else {
							vipGoalNum.put(index, 1);
						}
					}
					
				}
				
			}
		    if (isAddVipNum) {
				//对应vip人数有变化 
				for (Hero hero: HeroCache.getHeroMap().values()) {
					if (hero.isOnline()) {
						//
						boolean checkReadPoint = checkReadPoint(hero);
						if (checkReadPoint||isVipRewardNum) {
							RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.HEFU_GODGIFT, RedPointConst.RED_1, RedPointConst.HAS_RED);
						}
					}
				}
		    	
			}
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftFunction.class, "vipLevelUp has wrong");
		}
		
	}
	
	public boolean checkReadPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.HEFU_GODGIFT)) {
				return false;
			}
			HeFuGodGift heFuGodGift = (HeFuGodGift) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.HEFU_GODGIFT);
			
			boolean isHasPoint=false;
			
			ConcurrentHashMap<Integer, Integer> vipGoalNumMap = HeFuGodGiftSysCache.getHeFuGodGiftCache().getVipGoalNum();
			for (Struct_hfkhgod_286 hfkhgod_286:Config_hfkhgod_286.getIns().getSortList()) {
				//获取档次 百位 十位
				int id = hfkhgod_286.getId();
				int index=id/10;
				int vipGoalNum=vipGoalNumMap.get(index);
				//普通vip奖励
				if (vipGoalNum>=hfkhgod_286.getCs2()&&id/100==1) {
					if (heFuGodGift.getPtReward().get(id)==GameConst.REWARD_1) {
						isHasPoint=true;
					}else if (heFuGodGift.getPtReward().get(id)==GameConst.REWARD_0) {
						if (hfkhgod_286.getTj1()==0&&hfkhgod_286.getTj2()==0) {
							isHasPoint=true;
						}else if (hfkhgod_286.getTj1()>=0&&hero.getVipLv()>=hfkhgod_286.getTj1()) {
							isHasPoint=true;
						}else if(hfkhgod_286.getTj2()>=0&&heFuGodGift.getRecharge()>=hfkhgod_286.getCs2()) {
							isHasPoint=true;
						}
					}
				}
				if (id/100==2) {
					Integer hasGet = heFuGodGift.getVipnumReward().get(id);
					if (hasGet<vipGoalNum) {
						if (hfkhgod_286.getTj1()==0&&hfkhgod_286.getTj2()==0) {
							isHasPoint=true;
							//无条件
						}else if(hfkhgod_286.getTj1()>=0&&hero.getVipLv()>=hfkhgod_286.getTj1()) {
							//vip 额外条件
							isHasPoint=true;
						}else if(hfkhgod_286.getTj2()>=0&&heFuGodGift.getRecharge()>=hfkhgod_286.getCs2()) {
							//充值额外条件
							isHasPoint=true;
						}
					}
				}
				
			}
			return isHasPoint;
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftFunction.class, "checkReadPoint has wrong");
		}
		return false;
		
	}
	
	
	

}
