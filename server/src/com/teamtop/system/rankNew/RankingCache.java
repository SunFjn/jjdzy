package com.teamtop.system.rankNew;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.rankNew.dao.RankingDao;
import com.teamtop.system.rankNew.rankModel.ArchiveRankModel;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.rankNew.rankModel.BingFaRankModel;
import com.teamtop.system.rankNew.rankModel.EquipRankModel;
import com.teamtop.system.rankNew.rankModel.ExcaliburRankModel;
import com.teamtop.system.rankNew.rankModel.GodBookRankModel;
import com.teamtop.system.rankNew.rankModel.GodEquipRankModel;
import com.teamtop.system.rankNew.rankModel.HuoShaoChiBiRankModel;
import com.teamtop.system.rankNew.rankModel.LevelRankModel;
import com.teamtop.system.rankNew.rankModel.PeacockRankModel;
import com.teamtop.system.rankNew.rankModel.StrengthRankModel;
import com.teamtop.system.rankNew.rankModel.TreasureRankModel;
import com.teamtop.system.rankNew.rankModel.WuJiangRankModel;
import com.teamtop.system.rankNew.rankModel.ZhanJiaRankModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

public class RankingCache extends AbsServerEvent {

	private static final Map<Integer, ConcurrentSkipListSet<BaseRankModel>> rankingMap = UC.reg("rankingCacheRankingMap", new HashMap<>());// 排行榜缓存

	/**
	 * 待刷新战力玩家集合（定时更新排行榜战力）
	 */
	private static Map<Long, Long> updateFightMap = new ConcurrentHashMap<>();

	public static Map<Long, Long> getUpdateFightMap() {
		return updateFightMap;
	}

	public static void setUpdateFightMap(Map<Long, Long> updateFightMap) {
		RankingCache.updateFightMap = updateFightMap;
	}

	public static Map<Integer, ConcurrentSkipListSet<BaseRankModel>> getRankingmap() {
		return rankingMap;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			// 初始化
			initLevelRank();
			initStrengthRank();
			initPeacockRank();
			initEquipRank();
			initZhanJiaRank();
			initWuJiangRank();
			initArchiveRank();
			initGodBookRank();
			initGodEquipRank();
			initExcaliburRank();
			initBingFaRank();
			initTreasureRank();
			initHuoShaoChiBiRank();
		} catch (Exception e) {
			LogTool.error(e, RankingCache.class, "");
		}
	}

	private static void setNameAddZoneid(List<? extends BaseRankModel> list) {
		if (list == null) {
			return;
		}
		int size = list.size();
		int zoneid = 0;
		String name = "";
		BaseRankModel model = null;
		for (int i = 0; i < size; i++) {
			model = list.get(i);
			zoneid = model.getZoneid();
			name = model.getName();
			if (model.getZoneid() != 0) {
				model.setName(name + ".S" + zoneid);
			}
		}
	}

	/**
	 * 初始化玩家等级排行榜
	 * 
	 * @throws Exception
	 */
	private static void initLevelRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempLevelRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> levelRank = new ConcurrentSkipListSet<>();
		List<LevelRankModel> list = RankingDao.getIns().findLevel();
		setNameAddZoneid(list);
		tempLevelRank.addAll(list);
		if (tempLevelRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempLevelRank) {
				if (levelRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				levelRank.add(model);
			}
		} else {
			levelRank.addAll(tempLevelRank);
		}
		rankingMap.put(RankingConst.LEVEL_RANKING, levelRank);
	}

	/**
	 * 初始化玩家战力排行榜
	 * 
	 * @throws Exception
	 */
	private static void initStrengthRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempStrengthRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> strengthRank = new ConcurrentSkipListSet<>();
		List<StrengthRankModel> list = RankingDao.getIns().findStrength();
		setNameAddZoneid(list);
		tempStrengthRank.addAll(list);
		if (tempStrengthRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempStrengthRank) {
				if (strengthRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				strengthRank.add(model);
			}
		} else {
			strengthRank.addAll(tempStrengthRank);
		}
		rankingMap.put(RankingConst.STRENGTH_RANKING, strengthRank);
	}

	/**
	 * 初始化玩家铜雀台排行榜
	 * 
	 * @throws Exception
	 */
	private static void initPeacockRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempPeacockRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> peacockRank = new ConcurrentSkipListSet<>();
		List<PeacockRankModel> list = RankingDao.getIns().findPeacock();
		setNameAddZoneid(list);
		tempPeacockRank.addAll(list);
		if (tempPeacockRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempPeacockRank) {
				if (peacockRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				peacockRank.add(model);
			}
		} else {
			peacockRank.addAll(tempPeacockRank);
		}
		rankingMap.put(RankingConst.PEACOCK_RANKING, peacockRank);
	}

	/**
	 * 初始化玩家装备排行榜
	 * 
	 * @throws Exception
	 */
	private static void initEquipRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempEquipRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> equipRank = new ConcurrentSkipListSet<>();
		List<EquipRankModel> list = RankingDao.getIns().findEquip();
		setNameAddZoneid(list);
		tempEquipRank.addAll(list);
		if (tempEquipRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempEquipRank) {
				if (equipRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				equipRank.add(model);
			}
		} else {
			equipRank.addAll(tempEquipRank);
		}
		rankingMap.put(RankingConst.EQUIP_RANKING, equipRank);
	}

	/**
	 * 初始化玩家战甲排行榜
	 * 
	 * @throws Exception
	 */
	private static void initZhanJiaRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempZhanJiaRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> zhanJiaRank = new ConcurrentSkipListSet<>();
		List<ZhanJiaRankModel> list = RankingDao.getIns().findZhanJia();
		setNameAddZoneid(list);
		tempZhanJiaRank.addAll(list);
		if (tempZhanJiaRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempZhanJiaRank) {
				if (zhanJiaRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				zhanJiaRank.add(model);
			}
		} else {
			zhanJiaRank.addAll(tempZhanJiaRank);
		}
		rankingMap.put(RankingConst.ZHANJIA_RANKING, zhanJiaRank);
	}

	/**
	 * 初始化玩家武将排行榜
	 * 
	 * @throws Exception
	 */
	private static void initWuJiangRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempWuJiangRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> wuJiangRank = new ConcurrentSkipListSet<>();
		List<WuJiangRankModel> list = RankingDao.getIns().findWuJiang();
		setNameAddZoneid(list);
		tempWuJiangRank.addAll(list);
		if (tempWuJiangRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempWuJiangRank) {
				if (wuJiangRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				wuJiangRank.add(model);
			}
		} else {
			wuJiangRank.addAll(tempWuJiangRank);
		}
		rankingMap.put(RankingConst.WUJIANG_RANKING, wuJiangRank);
	}

	/**
	 * 初始化玩家图鉴排行榜
	 * 
	 * @throws Exception
	 */
	private static void initArchiveRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempArchiveRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> archiveRank = new ConcurrentSkipListSet<>();
		List<ArchiveRankModel> list = RankingDao.getIns().findArchive();
		setNameAddZoneid(list);
		tempArchiveRank.addAll(list);
		if (tempArchiveRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempArchiveRank) {
				if (archiveRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				archiveRank.add(model);
			}
		} else {
			archiveRank.addAll(tempArchiveRank);
		}
		rankingMap.put(RankingConst.ARCHIVE_RANKING, archiveRank);
	}

	/**
	 * 初始化玩家天书排行榜
	 * 
	 * @throws Exception
	 */
	private static void initGodBookRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempGodBookRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> godBookRank = new ConcurrentSkipListSet<>();
		List<GodBookRankModel> list = RankingDao.getIns().findGodBook();
		setNameAddZoneid(list);
		tempGodBookRank.addAll(list);
		if (tempGodBookRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempGodBookRank) {
				if (godBookRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				godBookRank.add(model);
			}
		} else {
			godBookRank.addAll(tempGodBookRank);
		}
		rankingMap.put(RankingConst.GOD_BOOK_RANKING, godBookRank);
	}

	/**
	 * 初始化玩家神装排行榜
	 * 
	 * @throws Exception
	 */
	private static void initGodEquipRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempGodEquipRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> godEquipRank = new ConcurrentSkipListSet<>();
		List<GodEquipRankModel> list = RankingDao.getIns().findGodEquip();
		setNameAddZoneid(list);
		tempGodEquipRank.addAll(list);
		if (tempGodEquipRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempGodEquipRank) {
				if (godEquipRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				godEquipRank.add(model);
			}
		} else {
			godEquipRank.addAll(tempGodEquipRank);
		}
		rankingMap.put(RankingConst.GOD_EQUIP_RANKING, godEquipRank);
	}

	/**
	 * 初始化玩家神剑排行榜
	 * 
	 * @throws Exception
	 */
	private static void initExcaliburRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempExcaliburRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> excaliburRank = new ConcurrentSkipListSet<>();
		List<ExcaliburRankModel> list = RankingDao.getIns().findExcalibur();
		setNameAddZoneid(list);
		tempExcaliburRank.addAll(list);
		if (tempExcaliburRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempExcaliburRank) {
				if (excaliburRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				excaliburRank.add(model);
			}
		} else {
			excaliburRank.addAll(tempExcaliburRank);
		}
		rankingMap.put(RankingConst.EXCALIBUR_RANKING, excaliburRank);
	}

	/**
	 * 初始化玩家兵法排行榜
	 * 
	 * @throws Exception
	 */
	private static void initBingFaRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempBingFaRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> bingFaRank = new ConcurrentSkipListSet<>();
		List<BingFaRankModel> list = RankingDao.getIns().findBingFa();
		setNameAddZoneid(list);
		tempBingFaRank.addAll(list);
		if (tempBingFaRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempBingFaRank) {
				if (bingFaRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				bingFaRank.add(model);
			}
		} else {
			bingFaRank.addAll(tempBingFaRank);
		}
		rankingMap.put(RankingConst.BINGFA_RANKING, bingFaRank);
	}

	/**
	 * 初始化玩家宝物排行榜
	 * 
	 * @throws Exception
	 */
	private static void initTreasureRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempTreasureRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> treasureRank = new ConcurrentSkipListSet<>();
		List<TreasureRankModel> list = RankingDao.getIns().findTreasure();
		setNameAddZoneid(list);
		tempTreasureRank.addAll(list);
		if (tempTreasureRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempTreasureRank) {
				if (treasureRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				treasureRank.add(model);
			}
		} else {
			treasureRank.addAll(tempTreasureRank);
		}
		rankingMap.put(RankingConst.TREASURE_RANKING, treasureRank);
	}

	/**
	 * 初始化玩家火烧赤壁排行榜
	 * 
	 * @throws Exception
	 */
	private static void initHuoShaoChiBiRank() throws Exception {
		ConcurrentSkipListSet<BaseRankModel> tempHuoShaoChiBiRank = new ConcurrentSkipListSet<>();
		ConcurrentSkipListSet<BaseRankModel> huoShaoChiBiRank = new ConcurrentSkipListSet<>();
		List<HuoShaoChiBiRankModel> list = RankingDao.getIns().findHuoShaoChiBi();
		setNameAddZoneid(list);
		tempHuoShaoChiBiRank.addAll(list);
		if (tempHuoShaoChiBiRank.size() > RankingConst.RANK_SIZE) {
			for (BaseRankModel model : tempHuoShaoChiBiRank) {
				if (huoShaoChiBiRank.size() >= RankingConst.RANK_SIZE) {
					break;
				}
				huoShaoChiBiRank.add(model);
			}
		} else {
			huoShaoChiBiRank.addAll(tempHuoShaoChiBiRank);
		}
		rankingMap.put(RankingConst.HUOSHAOCHIBI_RANKING, huoShaoChiBiRank);
	}
}
