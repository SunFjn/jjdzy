package com.teamtop.system.rankNew.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.rankNew.rankModel.ArchiveRankModel;
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
import com.teamtop.util.mybatis.MybatisUtil;

public class RankingDao {

	private static RankingDao rankingDao;

	private RankingDao() {
		// TODO Auto-generated constructor stub
	}

	public static RankingDao getIns() {
		if (rankingDao == null) {
			rankingDao = new RankingDao();
		}
		return rankingDao;
	}

	/**
	 * 找出玩家等级排行榜数据
	 * @return
	 */
	public List<LevelRankModel> findLevel() {
		List<LevelRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<LevelRankModel> findList = mapper.findLevel();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家战力排行榜数据
	 * @return
	 */
	public List<StrengthRankModel> findStrength() {
		List<StrengthRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<StrengthRankModel> findList = mapper.findStrength();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家铜雀台排行榜数据
	 * @return
	 */
	public List<PeacockRankModel> findPeacock() {
		List<PeacockRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<PeacockRankModel> findList = mapper.findPeacock();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家装备排行榜数据
	 * @return
	 */
	public List<EquipRankModel> findEquip() {
		List<EquipRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<EquipRankModel> findList = mapper.findEquip();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家战甲排行榜数据
	 * @return
	 */
	public List<ZhanJiaRankModel> findZhanJia() {
		List<ZhanJiaRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<ZhanJiaRankModel> findList = mapper.findZhanJia();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家武将排行榜数据
	 * @return
	 */
	public List<WuJiangRankModel> findWuJiang() {
		List<WuJiangRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<WuJiangRankModel> findList = mapper.findWuJiang();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家图鉴排行榜数据
	 * @return
	 */
	public List<ArchiveRankModel> findArchive() {
		List<ArchiveRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<ArchiveRankModel> findList = mapper.findArchive();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家天书排行榜数据
	 * @return
	 */
	public List<GodBookRankModel> findGodBook() {
		List<GodBookRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<GodBookRankModel> findList = mapper.findGodBook();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家神装排行榜数据
	 * @return
	 */
	public List<GodEquipRankModel> findGodEquip() {
		List<GodEquipRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<GodEquipRankModel> findList = mapper.findGodEquip();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家神剑排行榜数据
	 * @return
	 */
	public List<ExcaliburRankModel> findExcalibur() {
		List<ExcaliburRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<ExcaliburRankModel> findList = mapper.findExcalibur();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家兵法排行榜数据
	 * @return
	 */
	public List<BingFaRankModel> findBingFa() {
		List<BingFaRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<BingFaRankModel> findList = mapper.findBingFa();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
	
	/**
	 * 找出玩家宝物排行榜数据
	 * @return
	 */
	public List<TreasureRankModel> findTreasure() {
		List<TreasureRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<TreasureRankModel> findList = mapper.findTreasure();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}

	/**
	 * 找出玩家火烧赤壁排行榜数据
	 * 
	 * @return
	 */
	public List<HuoShaoChiBiRankModel> findHuoShaoChiBi() {
		List<HuoShaoChiBiRankModel> list = new ArrayList<>();
		List<Integer> zoneids = GameProperties.zoneids;
		int zoneid = 0;
		for (int i = 0; i < zoneids.size(); i++) {
			zoneid = zoneids.get(i);
			SqlSession session = MybatisUtil.getSession(zoneid);
			try {
				RankingMapper mapper = session.getMapper(RankingMapper.class);
				List<HuoShaoChiBiRankModel> findList = mapper.findHuoShaoChiBi();
				if (findList != null) {
					list.addAll(findList);
				}
			} finally {
				MybatisUtil.closeSession(session);
			}
		}
		return list;
	}
}
