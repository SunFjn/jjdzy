package com.teamtop.system.rankNew;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.archive.ArchiveFunction;
import com.teamtop.system.bingfa.BingFaFunction;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.excalibur.ExcaliburFunction;
import com.teamtop.system.godOfWar.GodOfWarFunction;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.godbook.GodBookFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.rankNew.rankModel.ArchiveRankModel;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.rankNew.rankModel.BingFaRankModel;
import com.teamtop.system.rankNew.rankModel.EquipRankModel;
import com.teamtop.system.rankNew.rankModel.ExcaliburRankModel;
import com.teamtop.system.rankNew.rankModel.GodBookRankModel;
import com.teamtop.system.rankNew.rankModel.GodEquipRankModel;
import com.teamtop.system.rankNew.rankModel.GodOfWarRankModel;
import com.teamtop.system.rankNew.rankModel.HuoShaoChiBiRankModel;
import com.teamtop.system.rankNew.rankModel.LevelRankModel;
import com.teamtop.system.rankNew.rankModel.PeacockRankModel;
import com.teamtop.system.rankNew.rankModel.StrengthRankModel;
import com.teamtop.system.rankNew.rankModel.TreasureRankModel;
import com.teamtop.system.rankNew.rankModel.WuJiangRankModel;
import com.teamtop.system.rankNew.rankModel.ZhanJiaRankModel;
import com.teamtop.system.setting.model.SettingData;
import com.teamtop.system.treasure.TreasureFunction;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class RankingFunction {

	private static Map<Integer, Class<?>> typeModelMap = new HashMap<>();

	private static RankingFunction rankingFunction;

	private RankingFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RankingFunction getIns() {
		if (rankingFunction == null) {
			rankingFunction = new RankingFunction();
		}
		return rankingFunction;
	}


	/**
	 * ???????????????????????????
	 */
	public void refreshAll(Hero hero) {
		try {
			refreshLevelRankList(hero);
			refreshStrengthRankList(hero);
			refreshPeacockRankList(hero);
			refreshGodOfWarRankList(hero);
			refreshEquipRankList(hero);
			refreshZhanjiaRankList(hero);
			refreshWujiangRankList(hero);
			refreshArchiveRankList(hero);
			refreshGodBookRankList(hero);
			refreshGodEquipRankList(hero);
			refreshExcaliburRankList(hero);
			refreshBingFaRankList(hero);
			refreshTreasureRankList(hero);
			refreshHuoShaoChiBiRankList(hero);
		} catch (Exception e) {
			LogTool.error(e, RankingFunction.class, "RankingFunction refreshAll");
		}
	}

	public void refreshRankList(final Hero hero, final int rankType) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				try {					
					refreshRankListHandle(hero, rankType);
				} catch (Exception e) {
					LogTool.error(e, RankingFunction.class, hero.getId(), hero.getName(), "rankType="+rankType);
				}
			}

			@Override
			public Object getSession() {

				return OpTaskConst.RANKING_KEY;
			}
		});
	}

	public void refreshRankListHandle(Hero hero, int rankType) {
		if (hero.getForbidState() != HeroConst.STATE_FORBID_NORMAL) {
			return;
		}
		ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(rankType);
		BaseRankModel model = createBaseRankModel(hero, rankType);
		if (model == null) {
			return;
		}
		if(treeSet==null) {
			return;
		}
		if (treeSet.size() >= RankingConst.RANK_SIZE) {
			BaseRankModel minModel = treeSet.last();// ?????????
			if (rankType == RankingConst.PEACOCK_RANKING) {
				if (((PeacockRankModel) model).getFloorNum() < ((PeacockRankModel) minModel).getFloorNum()) {
					return;
				}
			} else if (rankType == RankingConst.HUOSHAOCHIBI_RANKING) {
				if (((HuoShaoChiBiRankModel) model).getFloorNum() < ((HuoShaoChiBiRankModel) minModel).getFloorNum()) {
					return;
				}
			} else if (rankType == RankingConst.LEVEL_RANKING) {
				List<Struct_lunhui_274> sortList = Config_lunhui_274.getIns().getSortList();
				int modelLevel = ((LevelRankModel) model).getReincarnationLevel();
				int modelTotalAddLevel = 0;
				if(modelLevel>0) {
					for(int i=modelLevel;i>0;i--) {
						modelTotalAddLevel += sortList.get(i-1).getLv();
					}
				}
				int modelRealLevel = ((LevelRankModel) model).getLevel() + modelTotalAddLevel;
				
				int minModelLevel = ((LevelRankModel) minModel).getReincarnationLevel();
				int minModelTotalAddLevel = 0;
				if(minModelLevel>0) {
					for(int i=minModelLevel;i>0;i--) {
						minModelTotalAddLevel += sortList.get(i-1).getLv();
					}
				}
				int minModelRealLevel = ((LevelRankModel) minModel).getLevel() + minModelTotalAddLevel;
				if ( modelRealLevel < minModelRealLevel) {
					return;
				}
			} else {
				if (model.getStrength() < minModel.getStrength()) {
					return;
				}
			}
		}
		Iterator<BaseRankModel> iterator = treeSet.iterator();
		BaseRankModel brm = null;
		BaseRankModel tempBrm = null;
		for (; iterator.hasNext();) {
			tempBrm = iterator.next();
			if (tempBrm.equals(model)) {
				brm = tempBrm;
				iterator.remove();
				break;
			}
		}
		if (brm != null) {
			treeSet.add(model);
		} else {
			treeSet.add(model);
			if (treeSet.size() > RankingConst.RANK_SIZE) {
				// treeSet.remove(treeSet.last());
				treeSet.pollLast();
			}
		}
	    
//		//??????????????????
//		long strengthOld = model.getStrength();
//		int num = 10000*100;//????????????
//		System.out.println("\n????????????"+rankType+" ???????????????"+num+" ?????????");
//	    long time1 = System.currentTimeMillis();
//	    for( int i=0; i<num; i++){
//	    	model.setStrength( model.getStrength()+1);
//	    	Iterator<BaseRankModel> iterator = treeSet.iterator();
//	    	BaseRankModel brm = null;
//	    	BaseRankModel tempBrm = null;
//	    	for (; iterator.hasNext();) {
//	    		tempBrm = iterator.next();
//	    		if (tempBrm.equals(model)) {
//	    			brm = tempBrm;
//	    		}
//	    	}
//	    	if (brm != null) {
//	    		treeSet.remove(brm);
//	    		treeSet.add(model);
//	    	} else {
//	    		treeSet.add(model);
//	    		if (treeSet.size() > RankingConst.RANK_SIZE) {
//	    			treeSet.remove(treeSet.last());
//	    		}
//	    	}
//	    }
//		
//		long time2 = System.currentTimeMillis();
//		List<BaseRankModel> rankTestList = new ArrayList<BaseRankModel>(treeSet);
//    	model.setStrength( strengthOld);
//		long time3 = System.currentTimeMillis();
//		
//	    for( int j=0; j<num; j++){
//	    	model.setStrength( model.getStrength()+1);
//            int index = rankTestList.indexOf(model);
//            if (index >= 0) 
//            	rankTestList.remove(index);
//            rankTestList.add(model);
//	    	int i = 1;
//	    	int maxRank = RankingConst.RANK_SIZE;
//	    	synchronized (rankTestList) {
//	    		Collections.sort(rankTestList, new RankTestComparator());
//	    		Iterator<BaseRankModel> iterator1 = rankTestList.iterator();
//	    		while (iterator1.hasNext()) {
//	    			BaseRankModel model1 = iterator1.next();
//	    			if (i > maxRank) {
//	    				model1.setRank(0);
//	    				iterator1.remove();
//	    			} else {
//	    				model1.setRank(i);
//	    			}
//	    			i++;
//	    		}
//	    	}
//	    }
//        long time4 = System.currentTimeMillis();
//		rankTestList = new ArrayList<BaseRankModel>(treeSet);
//    	model.setStrength( strengthOld);
//    	
//	    for( int j=0; j<num; j++){
//	    	model.setStrength( model.getStrength()+1);
//            int index = rankTestList.indexOf(model);
//            if (index >= 0) 
//            	rankTestList.remove(index);
//            rankTestList.add(model);
//            List<BaseRankModel> result = rankTestList.stream()
//            		.sorted(Comparator.comparing((BaseRankModel p) -> p.getStrength())
//            				.thenComparing(BaseRankModel::getLevel).thenComparing(BaseRankModel::getTotalStrength)
//            				.thenComparing(BaseRankModel::getHid)).collect(Collectors.toList());
//	    }
//        long time5 = System.currentTimeMillis();
//		System.out.println("TreeSet?????????"+(time2-time1));
//        System.out.println("Collections.sort?????????"+(time4-time3));
//        System.out.println("??????????????????"+(time5-time4));
	}

	public static void ss(ConcurrentSkipListSet<BaseRankModel> treeSet, BaseRankModel model) {
		if (model == null) {
			return;
		}
		boolean isFind = false;
		Iterator<BaseRankModel> iterator = treeSet.iterator();
		BaseRankModel brm = null;
		for (; iterator.hasNext();) {
			brm = iterator.next();
			if (brm.equals(model)) {
				isFind = true;
				iterator.remove();
			}
		}
		if (isFind) {
			treeSet.add(model);
		} else {
			if (treeSet.size() >= RankingConst.RANK_SIZE) {
				treeSet.remove(brm);
			}
			treeSet.add(model);
		}
	}

	public static void main(String[] args) {
		// ConcurrentSkipListSet<BaseRankModel> treeSet = new ConcurrentSkipListSet<>();
		// int size = 20;
		// for (int i = 1; i <= size; i++) {
		// BaseRankModel a = new BaseRankModel();
		// a.setHid(i);
		// a.setRanking(RandomUtil.getRandomNumInAreas(0, 1000));
		// treeSet.add(a);
		// }
		// for (BaseRankModel b : treeSet) {
		// System.out.println("hid=" + b.getHid() + ", ranking=" + b.getRanking());
		// }
		// try {
		// Thread.sleep(1000);
		// } catch (InterruptedException e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		//
		// BaseRankModel model = new BaseRankModel();
		// model.setHid(21);
		// model.setRanking(2000);
		// ss(treeSet, model);
		// for (BaseRankModel b : treeSet) {
		// System.err.println("hid=" + b.getHid() + ", ranking=" + b.getRanking());
		// }
		// System.out.println("first=" + treeSet.first().getHid());
		// System.out.println("last=" + treeSet.last().getHid());
	}

	public BaseRankModel createBaseRankModel(Hero hero, int rankType) {
		try {
			Class<?> rankClass = typeModelMap.get(rankType);
			if (rankClass == null) {
				return null;
			}
			BaseRankModel model = (BaseRankModel) rankClass.newInstance();
			model.setHid(hero.getId());
			model.setName(hero.getNameZoneid());
			model.setJob(hero.getJob());
			model.setGodWeapon(GodWeaponFunction.getIns().getNowGodWeapon(hero));
			model.setCreateJob(hero.getCreateJob());
			model.setBodyid(hero.getShowModel().getBodyModel());
			model.setLevel(hero.getLevel());
			model.setReincarnationLevel(hero.getReincarnationLevel());
			model.setVipLv(hero.getVipLv());
			model.setOfficial(hero.getOfficial());
			model.setCountryType(hero.getCountryType());
			model.setTotalStrength(hero.getTotalStrength());
			SettingData settingData = hero.getSettingData();
			model.setIcon(settingData.getIcon());
			model.setFrame(settingData.getFrame());
			model.setTitleId(hero.getTitleId());
			model.setZoneid(hero.getZoneid());
			model.setMountId(hero.getMountId());
			setStrengthByType(hero, rankType, model);
			return model;
		} catch (Exception e) {
			LogTool.error(e, RankingFunction.class, hero.getId(), hero.getName(), "");
		}
		return null;
	}

	public void setStrengthByType(Hero hero, int rankType, BaseRankModel model) {
		long strength = 0;
		if (rankType == RankingConst.LEVEL_RANKING) {// ?????????
			strength = hero.getTotalStrength();
		} else if (rankType == RankingConst.STRENGTH_RANKING) {// ?????????
			strength = hero.getTotalStrength();
		} else if (rankType == RankingConst.PEACOCK_RANKING) {// ????????????
			PeacockRankModel pModel = (PeacockRankModel) model;
			pModel.setFloorNum(hero.getPeacockFloor().getFloorNum());
			strength = hero.getTotalStrength();
		} else if (rankType == RankingConst.GOD_OF_WAR_RANKING) {// ?????????

		} else if (rankType == RankingConst.EQUIP_RANKING) {// ?????????
			strength = EquipFunction.getIns().getEquipTotalStrength(hero);
		} else if (rankType == RankingConst.ZHANJIA_RANKING) {// ?????????
			strength = ZhanJiaFunction.getIns().getZhanJiaTotelStr(hero);
		} else if (rankType == RankingConst.WUJIANG_RANKING) {// ?????????
			strength = WuJiangFunction.getIns().getWuJiangTotelStr(hero);
		} else if (rankType == RankingConst.ARCHIVE_RANKING) {// ?????????
			strength = ArchiveFunction.getIns().getArchiveTotalStrength(hero);
		} else if (rankType == RankingConst.GOD_BOOK_RANKING) {// ?????????
			strength = GodBookFunction.getIns().getZhanJiaTotelStr(hero);
		} else if (rankType == RankingConst.GOD_EQUIP_RANKING) {// ?????????
			strength = EquipFunction.getIns().getGodEquipTotalStrength(hero);
		} else if (rankType == RankingConst.EXCALIBUR_RANKING) {// ?????????
			strength = ExcaliburFunction.getIns().getExcaliburTotalStrength(hero);
		} else if (rankType == RankingConst.BINGFA_RANKING) {// ?????????
			strength = BingFaFunction.getIns().getBingfaTotelStr(hero);
		} else if (rankType == RankingConst.TREASURE_RANKING) {// ?????????
			strength = TreasureFunction.getIns().getTreasureTotalStrength(hero);
		} else if (rankType == RankingConst.HUOSHAOCHIBI_RANKING) {// ???????????????
			HuoShaoChiBiRankModel hModel = (HuoShaoChiBiRankModel) model;
			hModel.setFloorNum(hero.getHuoShaoChiBi().getFloorNum());
			hModel.setAttTime(hero.getHuoShaoChiBi().getAttTime());
			strength = hero.getTotalStrength();
		}

		model.setStrength(strength);
	}

	/**
	 * ??????????????????
	 */
	public void refreshLevelRankList(Hero hero) {
		refreshRankList(hero, RankingConst.LEVEL_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshStrengthRankList(Hero hero) {
		try {
			refreshRankList(hero, RankingConst.STRENGTH_RANKING);
			RankingCache.getUpdateFightMap().put(hero.getId(), hero.getTotalStrength());
		} catch (Exception e) {
			LogTool.error(e, RankingFunction.class, hero.getId(), hero.getName(), "Ranking refreshStrengthRankList");
		}
	}

	/**
	 * ?????????????????????
	 */
	public void refreshPeacockRankList(Hero hero) {
		refreshRankList(hero, RankingConst.PEACOCK_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshGodOfWarRankList(Hero hero) {
		int type = RankingConst.GOD_OF_WAR_RANKING;//???????????????
		GodOfWarRank godOfWarRank = GodOfWarCache.getGodOfWarRankMap().get(hero.getId());
		if (godOfWarRank == null) {
			return;
		}
		
		GodOfWarFunction.getIns().setRankDataByHero(godOfWarRank, hero);
	}

	/**
	 * ??????????????????
	 */
	public void refreshEquipRankList(Hero hero) {
		refreshRankList(hero, RankingConst.EQUIP_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshZhanjiaRankList(Hero hero) {
		refreshRankList(hero, RankingConst.ZHANJIA_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshWujiangRankList(Hero hero) {
		refreshRankList(hero, RankingConst.WUJIANG_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshArchiveRankList(Hero hero) {
		refreshRankList(hero, RankingConst.ARCHIVE_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshGodBookRankList(Hero hero) {
		refreshRankList(hero, RankingConst.GOD_BOOK_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshGodEquipRankList(Hero hero) {
		refreshRankList(hero, RankingConst.GOD_EQUIP_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshExcaliburRankList(Hero hero) {
		refreshRankList(hero, RankingConst.EXCALIBUR_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshBingFaRankList(Hero hero) {
		refreshRankList(hero, RankingConst.BINGFA_RANKING);
	}

	/**
	 * ??????????????????
	 */
	public void refreshTreasureRankList(Hero hero) {
		refreshRankList(hero, RankingConst.TREASURE_RANKING);
	}

	/**
	 * ????????????????????????
	 */
	public void refreshHuoShaoChiBiRankList(Hero hero) {
		refreshRankList(hero, RankingConst.HUOSHAOCHIBI_RANKING);
	}

	static {
		typeModelMap.put(RankingConst.LEVEL_RANKING, LevelRankModel.class);
		typeModelMap.put(RankingConst.STRENGTH_RANKING, StrengthRankModel.class);
		typeModelMap.put(RankingConst.PEACOCK_RANKING, PeacockRankModel.class);
		typeModelMap.put(RankingConst.GOD_OF_WAR_RANKING, GodOfWarRankModel.class);
		typeModelMap.put(RankingConst.EQUIP_RANKING, EquipRankModel.class);
		typeModelMap.put(RankingConst.ZHANJIA_RANKING, ZhanJiaRankModel.class);
		typeModelMap.put(RankingConst.WUJIANG_RANKING, WuJiangRankModel.class);
		typeModelMap.put(RankingConst.ARCHIVE_RANKING, ArchiveRankModel.class);
		typeModelMap.put(RankingConst.GOD_BOOK_RANKING, GodBookRankModel.class);
		typeModelMap.put(RankingConst.GOD_EQUIP_RANKING, GodEquipRankModel.class);
		typeModelMap.put(RankingConst.EXCALIBUR_RANKING, ExcaliburRankModel.class);
		typeModelMap.put(RankingConst.BINGFA_RANKING, BingFaRankModel.class);
		typeModelMap.put(RankingConst.TREASURE_RANKING, TreasureRankModel.class);
		typeModelMap.put(RankingConst.HUOSHAOCHIBI_RANKING, HuoShaoChiBiRankModel.class);
	}

}
