package com.teamtop.system.reincarnationGodfate;

import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFate;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFateInfo;
import com.teamtop.util.log.LogTool;

import excel.config.Config_tm_292;
import excel.config.Config_tmlv_292;
import excel.config.Config_tmpin_292;
import excel.struct.Struct_tm_292;
import excel.struct.Struct_tmlv_292;
import excel.struct.Struct_tmpin_292;

public class ReincarnationGodFateFunction {
	private static volatile ReincarnationGodFateFunction ins = null;

	public static ReincarnationGodFateFunction getIns() {
		if (ins == null) {
			synchronized (ReincarnationGodFateFunction.class) {
				if (ins == null) {
					ins = new ReincarnationGodFateFunction();
				}
			}
		}
		return ins;
	}

	private ReincarnationGodFateFunction() {
	}

	/**
	 * 激活天命
	 * 
	 * @param hero
	 * @param lv   轮回等级
	 */
	public void activeGodFate(Hero hero, int lv, boolean isLogin) {
		ReincarnationGodFate godFate = null;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION_GODFATE)) {
				return;
			}
			godFate = hero.getGodFate();
			Map<Integer, ReincarnationGodFateInfo> infoMap = godFate.getInfoMap();
			List<Struct_tm_292> sortList = Config_tm_292.getIns().getSortList();
			boolean isRecalcAll = false;
			for (Struct_tm_292 struct_tm_292 : sortList) {
				int lh = struct_tm_292.getLh();
				int id = struct_tm_292.getId();
				if (lv >= lh && infoMap.get(id) == null) {
					ReincarnationGodFateInfo info = new ReincarnationGodFateInfo();
					Struct_tmlv_292 struct_tmlv_292 = ReincarnationGodFateSysCache.getUpLvConfigMap().get(id).get(0);
					int upLvId = struct_tmlv_292.getId();
					info.setUpLvId(upLvId);
					Struct_tmpin_292 struct_tmpin_292 = ReincarnationGodFateSysCache.getUpQualityConfigMap().get(id)
							.get(0);
					int upQualityId = struct_tmpin_292.getId();
					info.setUpQualityId(upQualityId);
					infoMap.put(id, info);
					isRecalcAll = true;
				}
			}
			if (isRecalcAll) {
				// 重算轮回-天命战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.REINCARNATION_GODFATE,
						SystemIdConst.REINCARNATION_GODFATE);
			}
			if (isLogin) {
				redPoint(hero, isLogin);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ReincarnationGodFateFunction activeGodFate lv:" + lv + " godFateStr:" + godFate == null ? ""
							: JSON.toJSONString(godFate));
		}
	}

	/**
	 * 取得下一品
	 * 
	 * @param info
	 * @return
	 */
	public boolean isHasNextQuality(ReincarnationGodFateInfo info) {
		int upLvId = info.getUpLvId();
		int upLv = lvIdToLv(upLvId);
		int upQualityId = info.getUpQualityId();
		Struct_tmpin_292 struct_tmpin_292 = Config_tmpin_292.getIns().get(upQualityId);
		int next = struct_tmpin_292.getNext();
		int lv = struct_tmpin_292.getLv();
		if (next == 0 || upLv < lv) {
			return false;
		}
		return true;
	}

	public int lvIdToLv(int lvId) {
		return lvId % 100000;
	}

	/**
	 * 添加道具红点处理
	 * 
	 * @param hero
	 * @param itemId
	 */
	public void addToolRedPointHandle(Hero hero, int type, int itemId) {
		try {
			int toolId = 0;
			if (type == GameConst.TOOL) {
				toolId = itemId;
			} else if (itemId == 0) {
				toolId = type;
			}
			if (ReincarnationGodFateSysCache.getToolSet().contains(toolId)) {
				redPoint(hero, false);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "itemId:" + itemId);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION_GODFATE)) {
			return;
		}
		ReincarnationGodFate godFate = hero.getGodFate();
		Map<Integer, ReincarnationGodFateInfo> infoMap = godFate.getInfoMap();
		List<Struct_tm_292> sortList = Config_tm_292.getIns().getSortList();
		boolean flag = false;
		for (Struct_tm_292 struct_tm_292 : sortList) {
			int id = struct_tm_292.getId();
			ReincarnationGodFateInfo info = infoMap.get(id);
			if (info == null) {
				continue;
			}
			boolean hasNextQuality = isHasNextQuality(info);
			int[][] consume = null;
			if (hasNextQuality) {
				int upQualityId = info.getUpQualityId();
				Struct_tmpin_292 struct_tmpin_292 = Config_tmpin_292.getIns().get(upQualityId);
				consume = struct_tmpin_292.getConsume();
			} else {
				int upLvId = info.getUpLvId();
				Struct_tmlv_292 struct_tmlv_292 = Config_tmlv_292.getIns().get(upLvId);
				int nextId = struct_tmlv_292.getNext();
				if (nextId == 0) {
					// 已满级
					continue;
				}
				consume = struct_tmlv_292.getConsume();
			}
			if (UseAddUtil.canUse(hero, consume)) {
				flag = true;
				break;
			}
		}

		if (flag) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.REINCARNATION_GODFATE, 1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REINCARNATION_GODFATE, 1,
						RedPointConst.HAS_RED);
			}
		}

	}

}
