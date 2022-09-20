package com.teamtop.system.crossSJMiJing;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.crossSJMiJing.cross.CrossSJMiJingCrossToLocal;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.util.log.LogTool;
public class CrossSJMiJingEvent extends AbsSystemEvent{
	private static CrossSJMiJingEvent ins = null;

	public static CrossSJMiJingEvent getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		CrossSJMiJing data = hero.getCrossSJMiJing();
		if(data==null){
			data = new CrossSJMiJing();
			hero.setCrossSJMiJing(data);
		}
		data.setHid(hero.getId());
		Map<Integer, Integer> boxMap = data.getBoxMap();
		if(boxMap==null) {
			boxMap = new HashMap<>();
			data.setBoxMap(boxMap);
		}
		Map<Integer, Integer> miJingIDMap = data.getMiJingIDMap();
		if(miJingIDMap==null) {
			miJingIDMap = new HashMap<>();
			data.setMiJingIDMap(miJingIDMap);
		}
		Map<Integer, Integer> saoDangMap = data.getSaoDangMap();
		if(saoDangMap==null) {
			saoDangMap = new HashMap<>();
			data.setSaoDangMap(saoDangMap);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_S_J_MI_JING)) {
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		int numHelpAwards = crossSJMiJing.getNumHelpAwards();
		int mjHelpNum = WeekCardFunction.getIns().getMJHelpNum(hero);
		int totalHelp = mjHelpNum + CrossSJMiJingConst.NUM_HELP_AWARDS_MAX;
		CrossSJMiJingSender.sendCmd_3792(hero.getId(), numHelpAwards, totalHelp);
		CrossSJMiJingFunction.getIns().sendRed(hero);
		RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CROSS_S_J_MI_JING, 1, RedPointConst.HAS_RED);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		//奖励找回处理(重置前)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.CROSS_S_J_MI_JING,0);
		CrossSJMiJing data = hero.getCrossSJMiJing();
		Map<Integer, Integer> saoDangMap = data.getSaoDangMap();
		Iterator<Entry<Integer, Integer>> iterator = saoDangMap.entrySet().iterator();
		while(iterator.hasNext()) {
			Entry<Integer, Integer> next = iterator.next();
			Integer key = next.getKey();
			saoDangMap.put(key, 0);
		}
		data.setNumHelpAwards(0);
		//奖励找回处理(重置后)
		RewardBackFunction.getIns().handle(hero,SystemIdConst.CROSS_S_J_MI_JING,1);
		LogTool.info("CrossSJMiJingEvent.loginReset.hid:"+hero.getId(), this);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		loginReset(hero, now);
		CrossSJMiJingManager.getIns().openUI(hero);

		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		int numHelpAwards = crossSJMiJing.getNumHelpAwards();
		int mjHelpNum = WeekCardFunction.getIns().getMJHelpNum(hero);
		int totalHelp = mjHelpNum + CrossSJMiJingConst.NUM_HELP_AWARDS_MAX;
		CrossSJMiJingSender.sendCmd_3792(hero.getId(), numHelpAwards, totalHelp);
		//更新跨服秘境的次数
		CrossSJMiJingCrossToLocal.getIns().saveBattleDataLC(hero);
	}

	
}
