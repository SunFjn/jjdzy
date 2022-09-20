package com.teamtop.system.battleVixens;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.battleVixens.model.BattleVixensRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_yiqi_007;
import excel.struct.Struct_yiqi_007;

public class BattleVixensCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_yiqi_007>> hardTypeMap = UC.reg("battleVixensHardTypeMap", new HashMap<Integer, List<Struct_yiqi_007>>());

	private static Map<Integer, List<Struct_yiqi_007>> awardMap = UC.reg("battleVixensAwardMap", new HashMap<Integer, List<Struct_yiqi_007>>());
	
	/**
	 * 排行榜
	 */
	private static List<BattleVixensRank> rankList = UC.reg("battleVixensrankList", Collections.synchronizedList(new ArrayList<BattleVixensRank>()));

	public static Map<Integer, List<Struct_yiqi_007>> getHardTypeMap() {
		return hardTypeMap;
	}

	public static void setHardTypeMap(Map<Integer, List<Struct_yiqi_007>> hardTypeMap) {
		BattleVixensCache.hardTypeMap = hardTypeMap;
	}

	public static List<Struct_yiqi_007> getAwardList(int hardType) {
		return awardMap.get(hardType);
	}

	public static List<BattleVixensRank> getRankList() {
		return rankList;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			List<BattleVixens> initRank = BattleVixensDao.getIns().initRank();
			List<BattleVixensRank> rankList = getRankList();
			if (initRank != null) {
				for (BattleVixens fb : initRank) {
					BattleVixensRank rank = new BattleVixensRank();
					rank.setHid(fb.getHid());
					if (fb.getHid() == 0)
						continue;
					Hero findBasic = HeroDao.getIns().findBasic(fb.getHid());
					if (findBasic == null)
						continue;
					String name = findBasic.getName();
					if (name == null || name.equals(""))
						continue;
					rank.setName(findBasic.getNameZoneid());
					rank.setStrength(findBasic.getTotalStrength());
					rank.setHardType(fb.getHardType());
					rank.setMaxPassId(fb.getMaxPassId());
					rankList.add(rank);
				}
			}
			Collections.sort(rankList, BattleVixensComparator.getIns());
		} catch (Exception e) {
			throw new RunServerException(e, "guanqia init rank err");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_yiqi_007> sortList = Config_yiqi_007.getIns().getSortList();
		int size = sortList.size();
		Struct_yiqi_007 yiqi = null;
		for (int i = 0; i < size; i++) {
			yiqi = sortList.get(i);
			int type = yiqi.getType();
			List<Struct_yiqi_007> list = hardTypeMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				hardTypeMap.put(type, list);
			}
			list.add(yiqi);
			if (yiqi.getAward() != null) {
				List<Struct_yiqi_007> awardList = awardMap.get(type);
				if(awardList==null) {
					awardList = new ArrayList<>();
					awardMap.put(type, awardList);
				}
				awardList.add(yiqi);
			}
		}
	}

}
