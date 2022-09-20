package com.teamtop.system.activity.ativitys.themeConsume;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.themeConsume.model.ThemeConsume;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_ztxfb_329;

public class ThemeConsumeManager extends AbstractActivityManager {
	private static ThemeConsumeManager ins = null;

	public static ThemeConsumeManager getIns() {
		if (ins == null) {
			ins = new ThemeConsumeManager();
		}
		return ins;
	}
	private ThemeConsumeManager() {
	}
	
	@Override
	public void openUI(Hero hero) {
		try {
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME))
				return;
			ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
			int recharge = themeConsume.getRecharge();
			int type = themeConsume.getType();
			int consume = themeConsume.getConsume();
			Map<Integer, Integer> stateMap = themeConsume.getStateMap();
			List<Object[]> list = new ArrayList<>();
			for(Entry<Integer,Integer> entry : stateMap.entrySet()) {
				int id = entry.getKey();
				int state = entry.getValue();
				list.add(new Object[] {id,state});
			}
			ThemeConsumeSender.sendCmd_10300(hero.getId(), recharge, type, consume, list.toArray());
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ThemeConsumeManager.openUI 打开主题消费界面 异常");
		}
	}
	
	public void activation(Hero hero, int type) {
		try {
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME))
				return;
			ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
			int themeType = themeConsume.getType();
			if(themeType > 0) {//已激活
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.HAS_ACTIVATED, type);
				return;
			}
			int recharge = themeConsume.getRecharge();
			int sysNum = ThemeConsumeFunction.getIns().getNum();
			if(recharge < sysNum) {//条件不符
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.TIAOJIAN_BUZU, type);
				return;
			}
			int qs = themeConsume.getPeriods(); 
			boolean bool = ThemeConsumeCache.typeSetConfig.get(qs).contains(type);
			if(!bool) {//参数错误
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.NOT_HAVE_NUM, type);
				return;
			}
			themeConsume.setType(type);
			ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.SUCCESS, type);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ThemeConsumeManager.activation 激活主题消费 异常");
		}
	}
	public void getAward(Hero hero, int id) {
		try {
			if (hero == null)
				return;
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_THEMECONSUME))
				return;
			ThemeConsume themeConsume = (ThemeConsume) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.ACT_THEMECONSUME);//个人数据
			int type = themeConsume.getType();
			if(type == 0) {//未激活
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.TIAOJIAN_BUZU, id);
				return;
			}
			int qs = themeConsume.getPeriods();
			Map<Integer, Struct_ztxfb_329> map = ThemeConsumeCache.themeConsumeConfig.get(qs);
			Struct_ztxfb_329 struct_ztxfb_329 = map.get(id);
			if(struct_ztxfb_329 == null) {
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.NOT_HAVE_NUM, id);
				return;
			}
			if(type != struct_ztxfb_329.getLx()) {//参数错误
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.NOT_HAVE_NUM, id);
				return;
			}
			
			Map<Integer, Integer> stateMap = themeConsume.getStateMap();
			Integer state = stateMap.get(id);
			if(state != null) {//已领
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.HAS_ACTIVATED, id);
				return;
			}
			int consume = themeConsume.getConsume();
			if(consume < struct_ztxfb_329.getYb()) {//领取条件不足
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.TIAOJIAN_BUZU, id);
				return;
			}
			
			int[][] award = struct_ztxfb_329.getJl();
			boolean canAdd = UseAddUtil.canAdd(hero, award, false);
			if (!canAdd) {//背包已满
				ThemeConsumeSender.sendCmd_10302(hero.getId(), ThemeConsumeConst.FULL, id);
				return;
			}
			
			stateMap.put(id, 2);
			UseAddUtil.add(hero, award, SourceGoodConst.THEMECONSUME_ADD, UseAddUtil.getDefaultMail(), true);
			
			ThemeConsumeSender.sendCmd_10304(hero.getId(), ThemeConsumeConst.SUCCESS, id);
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "ThemeConsumeManager.getAward 领取主题消费奖励 异常");
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
		ThemeConsumeFunction.getIns().heroActEnd(hero);
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		ThemeConsume themeConsume = new ThemeConsume(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),activityInfo.getPeriods());
		themeConsume.setType(0);
		themeConsume.setRecharge(0);
		themeConsume.setConsume(0);
		themeConsume.setStateMap(new HashMap<Integer, Integer>());
		return themeConsume;
	}

	@Override
	public Class<?> getActivityData() {
		return ThemeConsume.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		ThemeConsumeFunction.getIns().recharge(hero, money);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return ThemeConsumeEvent.getIns();
	}
}
