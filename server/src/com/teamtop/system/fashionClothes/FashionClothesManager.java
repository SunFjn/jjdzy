package com.teamtop.system.fashionClothes;

import java.util.HashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.kingship.KingShipFunction;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangManager;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sz_739;
import excel.struct.Struct_sz_739;

public class FashionClothesManager {
	
	private static FashionClothesManager ins;
	public static FashionClothesManager getIns(){
		if(ins == null) {
			ins = new FashionClothesManager();
		}
		return ins;
	}
	
	public void openUi(Hero hero, int wid) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FASHIONCLOTHESID)) return;
			FashionClothes fashionClothes = hero.getFashionClothes();
			int wearid=0;
			if (fashionClothes.getWujiangClothesId().containsKey(wid)) {
				wearid=fashionClothes.getWujiangClothesId().get(wid);
			}
			HashMap<Integer, Integer> clothesStar = fashionClothes.getClothesStar();
			Object[] hasfid=new Object[] {};
			if (clothesStar.size()>0) {
				hasfid=new Object[20];
				int i=0;
				for (Integer key:clothesStar.keySet()) {
	                 if (key/1000==wid) {
	                	 hasfid[i]=new Object[] {key,clothesStar.get(key)};
	                	 i++;
					}
				}

			}
			hasfid=CommonUtil.removeNull(hasfid);
			FashionClothesSender.sendCmd_3502(hero.getId(), wid, wearid, hasfid);
		} catch (Exception e) {
			LogTool.error(e, FashionClothesManager.class, hero.getId(), hero.getName(), "openUi has wrong");
		}
		
	}
	/**
	 *  激活/升阶时装 
	 * @param hero
	 * @param fid
	 */
	public void upfashion(Hero hero, int fid) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FASHIONCLOTHESID)) return;
			int wujiangtype=fid/1000;
			FashionClothes fashionClothes = hero.getFashionClothes();
			WuJiang wuJiang=hero.getWujiang();
			if (!wuJiang.getWujiangs().containsKey(wujiangtype)) {
				FashionClothesSender.sendCmd_3504(hero.getId(), 1, fid, 0);
				return;
			}
			Struct_sz_739 struct_sz_739 = Config_sz_739.getIns().get(fid);
			if (!UseAddUtil.canUse(hero, struct_sz_739.getJihuo())) {
				FashionClothesSender.sendCmd_3504(hero.getId(), 1, fid, 0);
				return;
			}
			int star=0;
			if (fashionClothes.getClothesStar().containsKey(fid)) {
				star=fashionClothes.getClothesStar().get(fid);
			}
			if (star>=struct_sz_739.getShangxian()) {
				FashionClothesSender.sendCmd_3504(hero.getId(), 1, fid, star);
				return;
			}
			UseAddUtil.use(hero, struct_sz_739.getJihuo(), SourceGoodConst.FASHIONCLOTH, true, false);
			fashionClothes.getClothesStar().put(fid, star+1);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_19, 0);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.FASHIONCLOTHES,SystemIdConst.WUJIANG_SYSID);
			FashionClothesSender.sendCmd_3504(hero.getId(), 0, fid, star+1);
			if (fashionClothes.getWujiangClothesId().get(wujiangtype)==0&&star==0) {
				//激活新时装
				fashionClothes.getWujiangClothesId().put(wujiangtype, fid);
				if (fashionClothes.getFashNum()==0) {
					//第一次获得时装
					//切换武将
					WuJiangManager.getIns().changeJob(hero, wujiangtype);
				}
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_20, 0);
				fashionClothes.setFashNum(fashionClothes.getFashNum()+1);
				//通知前段更换形象
				FashionClothesSender.sendCmd_3506(hero.getId(), 0, fid);
			}
			
			return;
			
		} catch (Exception e) {
			LogTool.error(e, FashionClothesManager.class, hero.getId(), hero.getName(), "upfashion has wrong");
		}
		
	}
	/**
	 * 武将穿戴时装
	 * @param hero
	 * @param fid
	 */
	public void wearFashion(Hero hero,int wid, int fid) {
		try {
			if (fid<0) {
				return;
			}
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FASHIONCLOTHESID)) return;
			FashionClothes fashionClothes = hero.getFashionClothes();
			WuJiang wuJiang=hero.getWujiang();
			
			if (!wuJiang.getWujiangs().containsKey(wid)) {
				FashionClothesSender.sendCmd_3506(hero.getId(), 1, fid);
				return;
			}
			if (!fashionClothes.getClothesStar().containsKey(fid)&&fid!=0) {
				FashionClothesSender.sendCmd_3506(hero.getId(), 1, fid);
				return;
			}
			fashionClothes.getWujiangClothesId().put(wid, fid);
			int nowjob=hero.getJob();
			if (nowjob>1000) {
				nowjob=nowjob/1000;
			}
			if (wid==nowjob) {
				//更换当前携带武将的时装
				if (fid==0) {
					//切换原始时装
					hero.setJob(nowjob);
				}else {
					hero.setJob(fid);
				}
				CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
				KingShipFunction.getIns().refreshKingShipModelMap(hero, 0);
				KingShipFunction.getIns().updatekingShiplGuardName(hero);
				CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
				CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
				CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
				CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
				CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 2);
				CrossCommonRankLC.getIns().updateNameIcon(hero, 2);
				hero.getShowModel().setBodyModel(fid);
				RankingFunction.getIns().refreshAll(hero);
			}
			//通知前段更换形象
			FashionClothesSender.sendCmd_3506(hero.getId(), 0, fid);
			
		} catch (Exception e) {
			LogTool.error(e, FashionClothesManager.class, hero.getId(), hero.getName(), "wearFashion has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void init(Hero hero) {
		try {
			FashionClothes fashionClothes = hero.getFashionClothes();
			HashMap<Integer, Integer> clothesStar = fashionClothes.getClothesStar();
			Object[] hasfid=new Object[] {};
			if (clothesStar.size()>0) {
				hasfid=new Object[50];
				int i=0;
				for (Integer key:clothesStar.keySet()) {
					hasfid[i]=new Object[] {key,clothesStar.get(key)};
					i++;
				}
			}
			hasfid=CommonUtil.removeNull(hasfid);
			FashionClothesSender.sendCmd_3508(hero.getId(), hasfid);
		} catch (Exception e) {
			LogTool.error(e, FashionClothesManager.class, hero.getId(), hero.getName(), "init has wrong");
		}
		
	}
	
	
	public int getBodyid(int job,int bodyid) {
		if (bodyid==0) {
			return job;
		}
		return bodyid;
	}

	public void getall(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FASHIONCLOTHESID)) return;
			FashionClothes fashionClothes = hero.getFashionClothes();
			WuJiang wuJiang=hero.getWujiang();
			HashMap<Integer, WuJiangModel> wujiangs = wuJiang.getWujiangs();
			Object[] wujiangfashs=new Object[wujiangs.size()];
			int a=0;
			for (WuJiangModel wuJiangModel:wujiangs.values()) {
				int wid=wuJiangModel.getType();
				int wearid=0;
				if (fashionClothes.getWujiangClothesId().containsKey(wid)) {
					wearid=fashionClothes.getWujiangClothesId().get(wid);
				}
				HashMap<Integer, Integer> clothesStar = fashionClothes.getClothesStar();
				Object[] hasfid=new Object[] {};
				if (clothesStar.size()>0) {
					hasfid=new Object[20];
					int i=0;
					for (Integer key:clothesStar.keySet()) {
		                 if (key/1000==wid) {
		                	 hasfid[i]=new Object[] {key,clothesStar.get(key)};
		                	 i++;
						}
					}

				}
				hasfid=CommonUtil.removeNull(hasfid);
				wujiangfashs[a]=new Object[] {wid, wearid, hasfid};
				a++;
				
			}
			FashionClothesSender.sendCmd_3510(hero.getId(), wujiangfashs);
		} catch (Exception e) {
			LogTool.error(e, FashionClothesManager.class, hero.getId(), hero.getName(), "getall has wrong");
		}
		
	} 
	
	

}
