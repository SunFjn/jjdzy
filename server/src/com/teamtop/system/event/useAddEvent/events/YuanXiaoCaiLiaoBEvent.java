package com.teamtop.system.event.useAddEvent.events;

import java.util.HashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.yuanXiao.YuanXiaoConst;
import com.teamtop.system.activity.ativitys.yuanXiao.YuanXiaoCrossIO;
import com.teamtop.system.activity.ativitys.yuanXiao.YuanXiaoLocal;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class YuanXiaoCaiLiaoBEvent extends AbsUseAddEvent {
	
	@Override
	public boolean canUse(Hero hero, int num, int id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return false;
		}
		return false;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		//绝不在本地使用 在做元宵的时候使用
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return 0;
		}
		YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
		long SoulFire =yuanXiaoLocal.getCailiaoMap().get(YuanXiaoConst.CAILIAO_2) - num;
		return SoulFire;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return false;
		}
		YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
		if (yuanXiaoLocal==null) {
			return false;
		}
		return yuanXiaoLocal.getCailiaoMap().get(YuanXiaoConst.CAILIAO_2) + num <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		//添加去中央服
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return 0;
		}
		YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
		if (yuanXiaoLocal==null) {
			return 0;
		}
		HashMap<Integer, Integer> addCaiLiao=new HashMap<>();
		addCaiLiao.put(YuanXiaoConst.CAILIAO_2, num);
		YuanXiaoCrossIO.getIns().LTCaddcailiao(yuanXiaoLocal, addCaiLiao);
		
		return yuanXiaoLocal.getCailiaoMap().get(YuanXiaoConst.CAILIAO_2);
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return ;
			}
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			if (yuanXiaoLocal==null) {
				return ;
			}
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), YuanXiaoConst.CAILIAO_2,
					yuanXiaoLocal.getCailiaoMap().get(YuanXiaoConst.CAILIAO_2), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "YuanXiaoCaiLiaoAEvent flowRec error!");
		}
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return false;
		}
		YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
		if (yuanXiaoLocal==null) {
			return false;
		}
		
		return false;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		//添加去中央服
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
			return 0;
		}
		YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
		if (yuanXiaoLocal==null) {
			return 0;
		}
		HashMap<Integer, Integer> addCaiLiao=new HashMap<>();
		addCaiLiao.put(YuanXiaoConst.CAILIAO_2, (int)num);
		YuanXiaoCrossIO.getIns().LTCaddcailiao(yuanXiaoLocal, addCaiLiao);
		return yuanXiaoLocal.getCailiaoMap().get(YuanXiaoConst.CAILIAO_2);
	}

	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_YUANXIAO)) {
				return ;
			}
			YuanXiaoLocal yuanXiaoLocal = (YuanXiaoLocal)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_YUANXIAO);
			if (yuanXiaoLocal==null) {
				return ;
			}
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), YuanXiaoConst.CAILIAO_2,
					yuanXiaoLocal.getCailiaoMap().get(YuanXiaoConst.CAILIAO_2), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "YuanXiaoCaiLiaoAEvent flowRec error!");
		}
	}

}
