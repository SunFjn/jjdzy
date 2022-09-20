package com.teamtop.system.guanqia;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_BOSS_205;
import excel.config.Config_expup_200;
import excel.config.Config_kill_205;
import excel.config.Config_xiaoguai_205;
import excel.struct.Struct_BOSS_205;
import excel.struct.Struct_expup_200;
import excel.struct.Struct_kill_205;
import excel.struct.Struct_xiaoguai_205;

/**
 * 关卡
 */
public class GuanqiaCache extends AbsServerEvent{
	/**
	 * 小怪掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> monsterDropMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/**
	 * boss掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> bossDropMap = new HashMap<Integer, List<ProbabilityEventModel>>();
	/**
	 * 挂机经验加成
	 */
	private static Map<Integer, Map<Integer, Struct_expup_200>> expUpMap = new HashMap<>();
	/**
	 * 排行榜
	 */
	private static List<GuanqiaRank> rankList = UC.reg("guanqiaRankrankList", Collections.synchronizedList(new ArrayList<GuanqiaRank>()));

	/**
	 * 斩杀数上限
	 */
	private static int maxKillMosterNum = 0;
	
	public static List<GuanqiaRank> getRankList() {
		return rankList;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getMonsterDropMap() {
		return monsterDropMap;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getBossDropMap() {
		return bossDropMap;
	}

	public static Map<Integer, Map<Integer, Struct_expup_200>> getExpUpMap() {
		return expUpMap;
	}

	public static int getMaxKillMosterNum() {
		return maxKillMosterNum;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			List<Guanqia> initRank = GuanqiaDao.getIns().initRank();
			List<GuanqiaRank> rankList = getRankList();
			if(initRank!=null){
				for(Guanqia fb:initRank){
					GuanqiaRank rank = new GuanqiaRank();
					rank.setHid(fb.getHid());
					if(fb.getHid()==0) continue;
					Hero findBasic = HeroDao.getIns().findBasic(fb.getHid());
					if(findBasic ==null) continue;
					String name = findBasic.getName();
					if( name==null|| name.equals(""))
						continue;
					rank.setName(findBasic.getNameZoneid());
					rank.setTotalStrength(findBasic.getTotalStrength());
					rank.setGuanqia(fb.getCurGuanqia());
					rankList.add(rank);
				}
			}
			Collections.sort(rankList,GuanqiaComparator.getIns());
		} catch (Exception e) {
			throw new RunServerException(e, "guanqia init rank err");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		initDrop();
		initExpUp();
	}
	/**
	 * 初始化单人boss副本掉落
	 */
	public static void initDrop(){
		List<Struct_xiaoguai_205> sortList = Config_xiaoguai_205.getIns().getSortList();
		for (Struct_xiaoguai_205 single : sortList) {
			List<ProbabilityEventModel> monsterDropData = ExcelJsonUtils.getGeneralDropData(single.getDl());
			monsterDropMap.put(single.getBh(), monsterDropData);
		}
		List<Struct_BOSS_205> bossList = Config_BOSS_205.getIns().getSortList();
		for (Struct_BOSS_205 boss : bossList) {
			List<ProbabilityEventModel> bossDropData = ExcelJsonUtils.getGeneralDropData(boss.getBD());
			bossDropMap.put(boss.getGuaiqia(), bossDropData);
		}
		List<Struct_kill_205> killList = Config_kill_205.getIns().getSortList();
		for (Struct_kill_205 kill : killList) {
			maxKillMosterNum += kill.getNum();
		}
	}

	public static void initExpUp() {
		List<Struct_expup_200> sortList = Config_expup_200.getIns().getSortList();
		int size = sortList.size();
		Struct_expup_200 expUp = null;
		int type = 0;
		Map<Integer, Struct_expup_200> map = null;
		for (int i = 0; i < size; i++) {
			expUp = sortList.get(i);
			type = expUp.getType();
			map = expUpMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				expUpMap.put(type, map);
			}
			map.put(expUp.getTj(), expUp);
		}
	}
}
