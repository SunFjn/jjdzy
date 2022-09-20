package com.teamtop.system.reincarnationGodfate;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFate;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFateInfo;
import com.teamtop.util.log.LogTool;

import excel.config.Config_tm_292;
import excel.config.Config_tmlv_292;
import excel.config.Config_tmpin_292;
import excel.struct.Struct_tm_292;
import excel.struct.Struct_tmlv_292;
import excel.struct.Struct_tmpin_292;

public class ReincarnationGodFateManager {
	private static volatile ReincarnationGodFateManager ins = null;

	public static ReincarnationGodFateManager getIns() {
		if (ins == null) {
			synchronized (ReincarnationGodFateManager.class) {
				if (ins == null) {
					ins = new ReincarnationGodFateManager();
				}
			}
		}
		return ins;
	}

	private ReincarnationGodFateManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION_GODFATE)) {
			return;
		}
		Map<Integer, ReincarnationGodFateInfo> infoMap = hero.getGodFate().getInfoMap();
		List<Struct_tm_292> sortList = Config_tm_292.getIns().getSortList();
		int size = sortList.size();
		List<Object[]> arrayList = new ArrayList<Object[]>(size);
		for (int i = 0; i < size; i++) {
			Struct_tm_292 struct_tm_292 = sortList.get(i);
			int id = struct_tm_292.getId();
			ReincarnationGodFateInfo info = infoMap.get(id);
			if (info == null) {
				arrayList.add(new Object[] { id, 0, 0 });
			} else {
				arrayList.add(new Object[] { id, info.getUpLvId(), info.getUpQualityId() });
			}
		}
		ReincarnationGodFateSender.sendCmd_10592(hero.getId(), arrayList.toArray());
	}

	/**
	 * 升级，升品
	 * 
	 * @param hero
	 * @param id   天命id
	 */
	public void up(Hero hero, int id) {
		// TODO Auto-generated method stub
		ReincarnationGodFate godFate = null;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION_GODFATE)) {
				return;
			}
			Struct_tm_292 struct_tm_292 = Config_tm_292.getIns().get(id);
			if (struct_tm_292 == null) {
				// 不存在该天命
				return;
			}
			if (hero.getId() == 1032300000000002l) {
				System.out.println();
			}
			godFate = hero.getGodFate();
			Map<Integer, ReincarnationGodFateInfo> infoMap = godFate.getInfoMap();
			ReincarnationGodFateInfo info = infoMap.get(id);
			if (info == null) {
				return;
			}
			int upLvId = info.getUpLvId();
			int upQualityId = info.getUpQualityId();
			boolean hasNextQuality = ReincarnationGodFateFunction.getIns().isHasNextQuality(info);
			int[][] consume = null;
			int nextLvId = 0;
			int nextQualityId = 0;
			if (hasNextQuality) {
				Struct_tmpin_292 struct_tmpin_292 = Config_tmpin_292.getIns().get(upQualityId);
				nextQualityId = struct_tmpin_292.getNext();
				consume = struct_tmpin_292.getConsume();
			} else {
				Struct_tmlv_292 struct_tmlv_292 = Config_tmlv_292.getIns().get(upLvId);
				int nextId = struct_tmlv_292.getNext();
				if (nextId == 0) {
					// 已满级
					ReincarnationGodFateSender.sendCmd_10594(hero.getId(), ReincarnationGodFateConst.FAILURE_FULL_LV,
							upLvId, upQualityId, id);
					return;
				}
				nextLvId = struct_tmlv_292.getNext();
				consume = struct_tmlv_292.getConsume();
			}
			if (!UseAddUtil.canUse(hero, consume)) {
				// 道具不足
				ReincarnationGodFateSender.sendCmd_10594(hero.getId(), ReincarnationGodFateConst.FAILURE_NOT_REACH,
						upLvId, upQualityId, id);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.GODFATE_UP_CONSUME, true);
			if (hasNextQuality) {
				info.setUpQualityId(nextQualityId);
			} else {
				info.setUpLvId(nextLvId);
			}
			upLvId = info.getUpLvId();
			upQualityId = info.getUpQualityId();
			ReincarnationGodFateSender.sendCmd_10594(hero.getId(), ReincarnationGodFateConst.SUCCESS, upLvId,
					upQualityId, id);
			// 重算轮回-天命战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.REINCARNATION_GODFATE,
					SystemIdConst.REINCARNATION_GODFATE);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ReincarnationGodFateManager up id:" + id + " godFateStr:" + godFate == null ? ""
							: JSON.toJSONString(godFate));
		}
	}

}
