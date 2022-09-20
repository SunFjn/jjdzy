package com.teamtop.system.activity.ativitys.consumeSmashEgg;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.consumeSmashEgg.model.ConsumeSmashEgg;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_xhdxfzdxfb_320;

public class ConsumeSmashEggFunction {
	private static ConsumeSmashEggFunction ins;

	private ConsumeSmashEggFunction() {
	}

	public static ConsumeSmashEggFunction getIns() {
		if (ins == null) {
			ins = new ConsumeSmashEggFunction();
		}
		return ins;
	}
	
	/**
	 * 获得砸蛋剩余次数
	 */
	public int getNum(ConsumeSmashEgg consumeSmashEgg) {
		int num = 0;//剩余次数
		int consume = consumeSmashEgg.getConsume();//活动期间消费元宝
		int uNum = consumeSmashEgg.getNum();//已砸蛋次数
		int qs = consumeSmashEgg.getPeriods();
		if(consume > 0) {
			int maxNum = 0;//最大次数
			Map<Integer, Struct_xhdxfzdxfb_320> ptList = ConsumeSmashEggCache.ptEggConfig.get(qs);
			for(Struct_xhdxfzdxfb_320 struct_xhdxfzdxfb_320 : ptList.values()) {
				int yb = struct_xhdxfzdxfb_320.getYb();
				if(consume >= yb) {
					maxNum = struct_xhdxfzdxfb_320.getCs();
				}
			}
			num = maxNum-uNum;
		}
		return num;
	}
	
	//设置已领大奖和砸蛋状态
	public void smashEggInfo(ConsumeSmashEgg consumeSmashEgg,List<Object[]> receivedIdList,List<Object[]> stateList) {
		Map<Integer, int[]> map = consumeSmashEgg.getStateMap();
		for(int i=0; i<=ConsumeSmashEggConst.COUNT; i++) {
			int[] state = map.get(i);
			if(state == null) {
				stateList.add(new Object[] {0,0,0});
			}else {
				stateList.add(new Object[] {state[0],state[1],state[2]});
			}
		}
		
		Set<Integer> set = consumeSmashEgg.getReceivedIdSet();
		if(set == null) {
			set = new HashSet<Integer>();
			consumeSmashEgg.setReceivedIdSet(set);
		}
		for(Integer id : set) {
			receivedIdList.add(new Object[] {id});
		}
	}
	
	/**
	 * 登录推送红点
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (hero == null) return;
			boolean bool = isOpen(hero);
			if(bool) {
				RedPointFunction.getIns().addLoginRedPoint(hero,  ActivitySysId.ACT_CONSUMESMASHEGG, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ConsumeSmashEggFunction loginRed 登录推送红点  异常");
		}
	}
	
	/**
	 * 消费记录及推送红点
	 * @param hero
	 */
	public void consume(Hero hero, int consumeNum) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUMESMASHEGG)) return;
			ConsumeSmashEgg consumeSmashEgg = (ConsumeSmashEgg) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONSUMESMASHEGG);//个人数据
			consumeSmashEgg.setConsume(consumeSmashEgg.getConsume()+consumeNum);
			int num = getNum(consumeSmashEgg);
			if(num > 0) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_CONSUMESMASHEGG, RedPointConst.RED_1, RedPointConst.HAS_RED);
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ConsumeSmashEggFunction consumeRed 消费推送红 异常");
		}
	}
	
	//判断是否开放显示红点
	private boolean isOpen(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUMESMASHEGG)) return false;
		
		ConsumeSmashEgg consumeSmashEgg = (ConsumeSmashEgg) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONSUMESMASHEGG);//个人数据
		int num = getNum(consumeSmashEgg);
		if(num > 0) {
			return true;
		}else {
			Map<Integer, int[]> stateMap = consumeSmashEgg.getStateMap();
			if(stateMap.size() >= ConsumeSmashEggConst.COUNT) {
				int flag = 0;
				for(int i=0; i<ConsumeSmashEggConst.COUNT; i++) {
					int[] state = stateMap.get(i);
					if(state[0] == 1) {
						flag++;
					}
				}
				if(flag == ConsumeSmashEggConst.COUNT) {
					return true;
				}
			}
		}
		return false;
	}
}
