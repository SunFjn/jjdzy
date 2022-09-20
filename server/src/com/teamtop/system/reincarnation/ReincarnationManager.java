package com.teamtop.system.reincarnation;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.reincarnationGodfate.ReincarnationGodFateFunction;
import com.teamtop.system.sixWay.SixWayFunction;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class ReincarnationManager {
	private static ReincarnationManager ins = null;

	public static ReincarnationManager getIns() {
		if (ins == null) {
			ins = new ReincarnationManager();
		}
		return ins;
	}

	private ReincarnationManager() {

	}

	public void reincarnation(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION)) {
			return;
		}

		int reincarnationLevel = hero.getReincarnationLevel();

		Struct_lunhui_274 config = Config_lunhui_274.getIns().get(reincarnationLevel);
		if (config == null) {
			// 配置不存在
			return;
		}
		if (config.getNext() <= 0) {
			// 已经满轮回等级
			ReincarnationSender.sendCmd_7102(hero.getId(), 1, hero.getReincarnationLevel());
			return;
		}

		int level = hero.getLevel();
		if (level < config.getLv()) {
			// 等级不足
			ReincarnationSender.sendCmd_7102(hero.getId(), 2, hero.getReincarnationLevel());
			return;
		}

		if (!UseAddUtil.canUse(hero, config.getConmuse())) {
			// 道具不足
			ReincarnationSender.sendCmd_7102(hero.getId(), 3, hero.getReincarnationLevel());
			return;
		}
		UseAddUtil.use(hero, config.getConmuse(), SourceGoodConst.REINCARNATION_COST, true);

		// 轮回成功
		level -= config.getLv();
		if (level <= 0) {
			// 最小回到1级
			level = 1;
		}
		reincarnationLevel++;

		hero.setLevel(level);
		hero.setReincarnationLevel(reincarnationLevel);
		hero.setExp(0);

		UseAddUtil.add(hero, config.getReward(), SourceGoodConst.REINCARNATION_AWARD, UseAddUtil.getDefaultMail(),
				true);

		// 计算角色属性
		ReincarnationSender.sendCmd_7102(hero.getId(), 0, hero.getReincarnationLevel());
		// 激活天命
		ReincarnationGodFateFunction.getIns().activeGodFate(hero, reincarnationLevel, false);
		// 推送等级和经验
		Map<String, Object> dataMap = new HashMap<String, Object>();
		dataMap.put(GameConst.expshow, hero.getExp());
		dataMap.put(GameConst.lv, hero.getLevel());
		HeroFunction.getIns().sendChange120(hero, dataMap);

		// 重算战力
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.REINCARNATION, SystemIdConst.REINCARNATION);

		// 广播轮回
		ChatManager.getIns().broadCast(ChatConst.REINCARNATION_NOTIC,
				new Object[] { hero.getNameZoneid(), reincarnationLevel });
		
		// 排名榜
		RankingFunction.getIns().refreshAll(hero);
		//轮回-六道
		SixWayFunction.getIns().jieSuo(hero);
	}
}
