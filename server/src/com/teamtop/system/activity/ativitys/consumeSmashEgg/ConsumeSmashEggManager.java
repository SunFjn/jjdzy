package com.teamtop.system.activity.ativitys.consumeSmashEgg;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.consumeSmashEgg.model.ConsumeSmashEgg;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_xhdxfzdcjjdb_320;
import excel.struct.Struct_xhdxfzdxfb_320;

public class ConsumeSmashEggManager extends AbstractActivityManager {
	private static ConsumeSmashEggManager ins = null;
	public static ConsumeSmashEggManager getIns() {
		if (ins == null) {
			ins = new ConsumeSmashEggManager();
		}
		return ins;
	}
	private ConsumeSmashEggManager() {
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUMESMASHEGG)) return;
			
			ConsumeSmashEgg consumeSmashEgg = (ConsumeSmashEgg) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONSUMESMASHEGG);//个人数据
			int yuanbao = consumeSmashEgg.getConsume();//活动期间消费元宝
			int uNum = consumeSmashEgg.getNum();//已砸蛋次数
			List<Object[]> receivedIdList = new ArrayList<>();
			List<Object[]> stateList = new ArrayList<>();
			int num = ConsumeSmashEggFunction.getIns().getNum(consumeSmashEgg);
			ConsumeSmashEggFunction.getIns().smashEggInfo(consumeSmashEgg, receivedIdList, stateList);
			
			ConsumeSmashEggSender.sendCmd_9502(hero.getId(), receivedIdList.toArray(), stateList.toArray(), num,uNum, yuanbao);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ConsumeSmashEggManager.openUI 打开消费砸蛋界面 异常");
		}
	}
	
	public void smashEgg(Hero hero, int index) {
		try {
			if (hero == null) return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUMESMASHEGG)) return;
			ConsumeSmashEgg consumeSmashEgg = (ConsumeSmashEgg) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_CONSUMESMASHEGG);//个人数据
			int qs = consumeSmashEgg.getPeriods();
			int yuanbao = consumeSmashEgg.getConsume();//活动期间消费元宝
			int num = ConsumeSmashEggFunction.getIns().getNum(consumeSmashEgg);//剩余次数
			int uNum = consumeSmashEgg.getNum();//已砸蛋次数
			List<Object[]> receivedIdList = new ArrayList<>();
			List<Object[]> stateList = new ArrayList<>();
			if(index<0 || index>=ConsumeSmashEggConst.COUNT) {//参数错误
				ConsumeSmashEggSender.sendCmd_9504(hero.getId(), ConsumeSmashEggConst.PARA_FAILURE, receivedIdList.toArray(), stateList.toArray(), num,uNum, yuanbao);
				return;
			}
			
			Map<Integer, int[]> stateMap = consumeSmashEgg.getStateMap();
			
			int dj = 0;//是否大奖 1.是
			boolean bool = true;//true.超级金蛋
			if(stateMap.size() >= ConsumeSmashEggConst.COUNT) {
				for(int[] s : stateMap.values()) {
					if(s[0] == 0) {
						bool = false;
						break;
					}
				}
			}else {
				bool = false;
			}
			
			int[] genAward = null;
			if(bool) {
				int cs = uNum/ConsumeSmashEggConst.COUNT;
				Map<Integer, Struct_xhdxfzdcjjdb_320> cjList = ConsumeSmashEggCache.cjEggConfig.get(qs);
				Struct_xhdxfzdcjjdb_320 struct_xhdxfzdcjjdb_320 = cjList.get(cs);
				dj = struct_xhdxfzdcjjdb_320.getDj();
				ProbabilityEventModel pm = ConsumeSmashEggCache.cjAwardMap.get(qs).get(cs);
				genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
				index = ConsumeSmashEggConst.COUNT;
			}else {
				int cs = uNum+1;
				int[] state = stateMap.get(index);
				if(state!=null && state[0]==1) {//该蛋已砸
					ConsumeSmashEggSender.sendCmd_9504(hero.getId(), ConsumeSmashEggConst.HAS_SMASH, receivedIdList.toArray(), stateList.toArray(), num,uNum, yuanbao);
					return;
				}
				
				if(num <= 0) {//没有剩余次数
					ConsumeSmashEggSender.sendCmd_9504(hero.getId(), ConsumeSmashEggConst.NOT_HAVE_NUM, receivedIdList.toArray(), stateList.toArray(), num,uNum, yuanbao);
					return;
				}
				
				Map<Integer, Struct_xhdxfzdxfb_320> ptList = ConsumeSmashEggCache.ptEggConfig.get(qs);
				Struct_xhdxfzdxfb_320 struct_xhdxfzdxfb_320 = ptList.get(cs);
				if(struct_xhdxfzdxfb_320 == null) {//参数错误
					ConsumeSmashEggSender.sendCmd_9504(hero.getId(), ConsumeSmashEggConst.PARA_FAILURE, receivedIdList.toArray(), stateList.toArray(), num,uNum, yuanbao);
					return;
				}
				ProbabilityEventModel pm = ConsumeSmashEggCache.ptAwardMap.get(qs).get(cs);
				genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
			}
			
			int[][] items = new int[][] {genAward};
			boolean canAdd = UseAddUtil.canAdd(hero, items, false);
			if(!canAdd){//背包已满
				ConsumeSmashEggSender.sendCmd_9504(hero.getId(), ConsumeSmashEggConst.FULL, receivedIdList.toArray(), stateList.toArray(), num,uNum, yuanbao);
				return;
			}
			
			int syNum = num;
			if(bool) {
				consumeSmashEgg.getReceivedIdSet().add(genAward[1]);
				stateMap.clear();
				stateMap.put(index, genAward);
			}else {
				int[] cjAward = stateMap.get(ConsumeSmashEggConst.COUNT);
				if(cjAward != null) {
					stateMap.remove(ConsumeSmashEggConst.COUNT);
				}
				stateMap.put(index, genAward);
				consumeSmashEgg.setNum(uNum+1);
				syNum = num-1;
			}
			
			UseAddUtil.add(hero, items, SourceGoodConst.CONSUMESMASHEGG_ADD, UseAddUtil.getDefaultMail(), true);
			ConsumeSmashEggFunction.getIns().smashEggInfo(consumeSmashEgg, receivedIdList, stateList);
			
			ConsumeSmashEggSender.sendCmd_9504(hero.getId(), ConsumeSmashEggConst.SUCCESS, receivedIdList.toArray(), stateList.toArray(), syNum,consumeSmashEgg.getNum(), yuanbao);
			if(dj == 1) {
				ChatManager.getIns().broadCast(ChatConst.CONSUMESMASHEGG,new Object[] {hero.getName(),genAward[1],genAward[2]}); // 全服广播
			}
			LogTool.info("hid:"+hero.getId()+" ConsumeSmashEggManager.smashEgg 消费砸蛋活动：  qs:"+qs +" yuanbao:"+yuanbao, this);//日志
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ConsumeSmashEggManager.smashEgg 消费砸蛋 异常");
		}
	}

	@Override
	public void actOpen() {
	}

	@Override
	public void heroActOpen(Hero hero) {
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		ConsumeSmashEgg consumeSmashEgg = new ConsumeSmashEgg(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(), activityInfo.getPeriods());
		consumeSmashEgg.setNum(0);
		consumeSmashEgg.setConsume(0);
		consumeSmashEgg.setStateMap(new HashMap<Integer, int[]>());
		consumeSmashEgg.setReceivedIdSet(new HashSet<Integer>());
		return consumeSmashEgg;
	}

	@Override
	public Class<?> getActivityData() {
		return ConsumeSmashEgg.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return ConsumeSmashEggEvent.getIns();
	}

}
