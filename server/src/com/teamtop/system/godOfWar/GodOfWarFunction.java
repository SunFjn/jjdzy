package com.teamtop.system.godOfWar;

import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.GodOfWarOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.godOfWar.model.GodOfWar;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_warstore_222;
import excel.struct.Struct_warstore_222;

public class GodOfWarFunction {

	private static GodOfWarFunction godOfWarFunction;

	private GodOfWarFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GodOfWarFunction getIns() {
		if (godOfWarFunction == null) {
			godOfWarFunction = new GodOfWarFunction();
		}
		return godOfWarFunction;
	}

	/**
	 * 加入排行
	 */
	public void addToGodOfWarRank(final Hero hero) {
		OpTaskExecutorService.PublicOrderService.execute(new GodOfWarOpTaskRunnable() {

			@Override
			public void run() {
				addToGodOfWarRankHandle(hero);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.GOD_OF_WAR_KEY;
			}
		});
	}

	/**
	 * 加入排行
	 */
	private void addToGodOfWarRankHandle(Hero hero) {
		try {
			long hid = hero.getId();
			ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = GodOfWarCache.getGodOfWarRankMap();
			if (godOfWarRankMap.containsKey(hid)) {
				return;
			}
			List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
			int ranking = GodOfWarCache.totalRankSize.getAndIncrement();
			GodOfWarRank rank = new GodOfWarRank();
			setRankDataByHero(rank, hero);
			rank.setHid( hero.getId());
			rank.setRanking(ranking);
			godOfWarRankList.add(rank);
			godOfWarRankMap.put(hero.getId(), rank);
			GodOfWarRankDao.getIns().insert(rank, hid, GameProperties.zoneids.get(0));
			hero.getGodOfWar().setPromoteAwardRank(ranking);
		} catch (Exception e) {
			LogTool.error(e, GodOfWarFunction.class, hero.getId(), hero.getName(), "addToGodOfWarRankHandle fail");
		}
	}

	/**
	 * 刷新排行榜对象数据
	 */
	public void setRankDataByHero( GodOfWarRank rank, Hero hero){
		rank.setJob(hero.getJob());
		rank.setLevel(hero.getLevel());
		rank.setVipLevel(hero.getVipLv());
		rank.setName(hero.getName());
		rank.setOfficial(hero.getOfficial());
		rank.setIcon(hero.getSettingData().getIcon());
		rank.setFrame(hero.getSettingData().getFrame());
		rank.setCountry(hero.getCountryType());
		rank.setStrength(hero.getTotalStrength());
		rank.setZoneid(hero.getZoneid());
		rank.setTitleId(hero.getTitleId());
		rank.setBodyid(hero.getShowModel().getBodyModel());
		rank.setCreateJob(hero.getCreateJob());
		rank.setGodWeapon(GodWeaponFunction.getIns().getNowGodWeapon(hero));
		rank.setReincarnationLevel(hero.getReincarnationLevel());
		rank.setMountId(hero.getMountId());
	}
	
	public void updateRankListCacheToDB() {
		try {
			ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = GodOfWarCache.getGodOfWarRankMap();

			GodOfWarRankDao.getIns().insertOnDuplicateBatch(godOfWarRankMap.values(), null,
					GameProperties.zoneids.get(0));
		} catch (Exception e) {
			LogTool.error(e, GodOfWarFunction.class, "GodOfWar updateRankListCacheToDB");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 */
	public void checkRedPointPub(Hero hero) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					boolean redPoint = checkRedPoint(hero);
					if(redPoint) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, GodOfWarConst.SysId, GodOfWarConst.RedPoint,
								RedPointConst.HAS_RED);
					}
					boolean rp = checkStoreRedPoint(hero);
					if(rp) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, GodOfWarConst.SysId, GodOfWarConst.Store_RedPoint,
								RedPointConst.HAS_RED);
					}
				} catch (Exception e) {
					LogTool.error(e, GodOfWarFunction.class, hero.getId(), hero.getName(), "GodOfWarFunction checkRedPointPub");
				}
			}

			@Override
			public Object getSession() {
				return hero.getId();
			}
		});
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				return false;
			}
			GodOfWarManager.getIns().checkCdTime(hero, godOfWar);
			int chaNum = godOfWar.getChaNum();
			if (chaNum > 0) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, GodOfWarFunction.class, hero.getId(), hero.getName(), "GodOfWarFunction checkRedPoint");
		}
		return false;
	}

	public boolean checkStoreRedPoint(Hero hero) {
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				return false;
			}
			Set<Integer> buySet = godOfWar.getBuySet();
			int topRank = godOfWar.getPromoteAwardRank();
			List<Struct_warstore_222> sortList = Config_warstore_222.getIns().getSortList();
			int size = sortList.size();
			Struct_warstore_222 warstore_222 = null;
			for (int i = 0; i < size; i++) {
				warstore_222 = sortList.get(i);
				if (topRank <= warstore_222.getTime() && (!buySet.contains(warstore_222.getId()))) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GodOfWarFunction.class, hero.getId(), hero.getName(),
					"GodOfWarFunction checkStoreRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if(!redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, GodOfWarConst.SysId, GodOfWarConst.RedPoint,
						RedPointConst.NO_RED);
			}
			boolean rp = checkStoreRedPoint(hero);
			if (!rp) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, GodOfWarConst.SysId, GodOfWarConst.Store_RedPoint,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, GodOfWarFunction.class, "GodOfWarFunction updateRedPoint");
		}
	}

	/**
	 * 使用道具添加挑战次数
	 * 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar != null) {
				int chaNum = godOfWar.getChaNum();
				godOfWar.setChaNum(chaNum + num);
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, GodOfWarFunction.class, hid, "", "GodOfWarFunction addChaNum");
		}
		return false;
	}

}
