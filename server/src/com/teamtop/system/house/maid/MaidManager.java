package com.teamtop.system.house.maid;


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.houseKeeper.HouseKeeperSender;
import com.teamtop.system.house.maid.model.Maid;
import com.teamtop.system.house.maid.model.MaidModel;
import com.teamtop.system.houseShopTask.HouseShopTaskCache;
import com.teamtop.system.houseShopTask.HouseShopTaskConst;
import com.teamtop.system.houseShopTask.HouseShopTaskFunction;
import com.teamtop.system.setting.SettingFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdsj_019;
import excel.config.Config_shinv_020;
import excel.config.Config_snsj_020;
import excel.config.Config_snsx_020;
import excel.struct.Struct_fdmb_019;
import excel.struct.Struct_shinv_020;
import excel.struct.Struct_snsj_020;
import excel.struct.Struct_snsx_020;

public class MaidManager {
	private static MaidManager ins;

	public static MaidManager getIns() {
		if(ins == null) {
			ins = new MaidManager();
		}
		return ins;
	}
	
	/**
	 * 打开侍女
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return;
			}
			Maid Maid = hero.getMaid();
			if (Maid == null) {
				return;
			}
			List<Object[]> sendList = new ArrayList<>();
			if (Maid.getMaidMap().size() > 0) {
				for (MaidModel MaidModel : Maid.getMaidMap().values()) {
					sendList.add(new Object[] { MaidModel.getIndex(), MaidModel.getStar(), MaidModel.getLevel(),
							MaidModel.getCurExp() });
				}
			}
			MaidSender.sendCmd_11302(hero.getId(), sendList.toArray(), Maid.getUseMaid());
		} catch (Exception e) {
			LogTool.error(e, MaidManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}
	
	/**
	 * 激活/升星侍女
	 * 
	 * @param hero
	 * @param index
	 */
	public void upMaid(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return;
			}
			if (!Config_shinv_020.getIns().getMap().containsKey(index)) {
				return;
			}
			HashMap<Integer, MaidModel> MaidMap = hero.getMaid().getMaidMap();
			if (MaidMap.containsKey(index)) {
				MaidModel MaidModel = MaidMap.get(index);
				Struct_shinv_020 struct_shinv_020 = Config_shinv_020.getIns().get(index);
				if (MaidModel.getStar() >= struct_shinv_020.getShangxian()) {
					// 达到上限
					MaidSender.sendCmd_11304(hero.getId(), 1, index, MaidModel.getStar());
					return;
				}
				if (!UseAddUtil.canUse(hero, struct_shinv_020.getXiaohao())) {
					// 激活升星需要的道具不足
					MaidSender.sendCmd_11304(hero.getId(), 2, index, MaidModel.getStar());
					return;
				}
				UseAddUtil.use(hero, struct_shinv_020.getXiaohao(), SourceGoodConst.MAID_UPSTAR, true);
				MaidModel.setStar(MaidModel.getStar() + 1);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.MAID_UPSTAR, SystemIdConst.MAID);
				MaidSender.sendCmd_11304(hero.getId(), 0, index, MaidModel.getStar());
				openUI(hero);
				
				//府邸任务
				ConcurrentHashMap<Integer, Struct_fdmb_019> concurrentHashMap = HouseShopTaskCache.getGoalInfoByType().get(HouseShopTaskConst.GOAL_TYPE_302);
				HashMap<Integer, Integer> starAndNum=new HashMap<>();
				for (Struct_fdmb_019 fdmb_019:concurrentHashMap.values()) {
					int goalStarNum=fdmb_019.getCanshu2();
					if (!starAndNum.containsKey(goalStarNum)) {
						starAndNum.put(goalStarNum, 0);
						for (MaidModel maidModel: MaidMap.values()) {
							if (maidModel.getStar()>=goalStarNum) {
								int num=starAndNum.get(goalStarNum)+1;
								starAndNum.put(goalStarNum, num);
							}
						}
					}
					
				}
				for (int key: starAndNum.keySet()) {
					Integer manzunum = starAndNum.get(key);
					if (manzunum>0) {
						//府邸任务
						HouseShopTaskFunction.getIns().sccessGoalLocal(hero,  HouseShopTaskConst.GOAL_TYPE_302, manzunum, key);
					}
				}

				// 增加繁荣度
				int snIndex = struct_shinv_020.getPinzhi() * 1000 + MaidModel.getStar();
				Struct_snsx_020 struct_snsx_020 = Config_snsx_020.getIns().get(snIndex);
				if (struct_snsx_020 != null) {
					int frd = struct_snsx_020.getFrd();
					int[][] add = new int[][] { { GameConst.HOUSE_PROSPERITY, 0, frd } };
					UseAddUtil.add(hero, add, SourceGoodConst.MAID_PROSPERITY_ADD, UseAddUtil.getDefaultMail(), true);
				}
				return;
			}else {
				// 激活
				Struct_shinv_020 struct_shinv_020 = Config_shinv_020.getIns().get(index);
				if (!UseAddUtil.canUse(hero, struct_shinv_020.getXiaohao())) {
					// 激活升星需要的道具不足
					MaidSender.sendCmd_11304(hero.getId(), 2, index, 0);
					return;
				}
				UseAddUtil.use(hero, struct_shinv_020.getXiaohao(), SourceGoodConst.MAID_JIHUO, true);
				MaidModel MaidModel = new MaidModel();
				MaidModel.setIndex(index);
				MaidModel.setStar(1);
				MaidModel.setLevel(0);
				MaidModel.setCurExp(0);
				MaidMap.put(index, MaidModel);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.MAID_JIHUO, SystemIdConst.MAID);
				MaidSender.sendCmd_11304(hero.getId(), 0, index, MaidModel.getStar());
				openUI(hero);

				// 侍女激活获得头像
				SettingFunction.getIns().maidActivate(hero, index);

				//府邸任务
				int size=0;
				for (MaidModel maidModel: MaidMap.values()) {
					Struct_shinv_020 shinv_020 = Config_shinv_020.getIns().get(maidModel.getIndex());
					if (shinv_020.getPinzhi()==struct_shinv_020.getPinzhi()) {
						size++;
					}
				}
				//府邸任务
				HouseShopTaskFunction.getIns().sccessGoalLocal(hero,  HouseShopTaskConst.GOAL_TYPE_301, struct_shinv_020.getPinzhi(), size);

				// 增加繁荣度
				int snIndex = struct_shinv_020.getPinzhi() * 1000 + MaidModel.getStar();
				Struct_snsx_020 struct_snsx_020 = Config_snsx_020.getIns().get(snIndex);
				if (struct_snsx_020 != null) {
					int frd = struct_snsx_020.getFrd();
					int[][] add = new int[][] { { GameConst.HOUSE_PROSPERITY, 0, frd } };
					UseAddUtil.add(hero, add, SourceGoodConst.MAID_PROSPERITY_ADD, UseAddUtil.getDefaultMail(), true);
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, MaidManager.class, hero.getId(), hero.getName(), "upMaid has wrong");
		}
		
	}
	
	
	
	/**
	 * 侍女升级
	 * 
	 * @param hero
	 * @param id
	 */
	public void upMaidLevel(Hero hero, int id, int type) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return;
			}
			MaidModel MaidModel = hero.getMaid().getMaidMap().get(id);
			if (MaidModel == null) {
				// 先激活该侍女
				MaidSender.sendCmd_11306(hero.getId(), 1, id, 0, 0);
				return;
			}
			int Level = MaidModel.getLevel();
			int index = MaidModel.getIndex();
			int Pinzhi = Config_shinv_020.getIns().get(index).getPinzhi();
			int excelIndex = Pinzhi * 10000 + Level;
			Struct_snsj_020 struct_snsj_020 = Config_snsj_020.getIns().get(excelIndex);
			if (Config_snsj_020.getIns().get(excelIndex + 1) == null) {
				// 级数已满级
				MaidSender.sendCmd_11306(hero.getId(), 2, id, MaidModel.getLevel(), MaidModel.getCurExp());
				return;
			}
			int propId = MaidConst.PROP_ID;
			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), propId);
			if (canUseNum <= 0) {
				// 材料不足
				MaidSender.sendCmd_11306(hero.getId(), 3, id, MaidModel.getLevel(), MaidModel.getCurExp());
				return;
			}
			int houseLv = hero.getLocalHouse().getHouseLv();
			int shinv = Config_fdsj_019.getIns().get(houseLv).getShinv();
			if (Level >= shinv) {
				// 府邸等级不满足要求
				HouseKeeperSender.sendCmd_11356(hero.getId(), 4, MaidModel.getLevel(), MaidModel.getCurExp());
				return;
			}
			int curExp = MaidModel.getCurExp();
			int needExp = struct_snsj_020.getXh()[0][2] * 10;
			int needNum = (needExp - curExp) / 10;
			if (type == 1) {
				//升级				
				UseAddUtil.use(hero, GameConst.TOOL, 1, propId, SourceGoodConst.MAID_UPLEVEL, true);
				MaidModel.setCurExp(curExp + 10);
				if (MaidModel.getCurExp() >= needExp) {
					// 足够升一级
					MaidModel.setLevel(Level + 1);
					MaidModel.setCurExp(0);
				}
			} else {
				//一键升级
				if (canUseNum >= needNum) {
					// 背包中的胭脂大于升级所需的胭脂
					UseAddUtil.use(hero, GameConst.TOOL, needNum, propId, SourceGoodConst.MAID_UPLEVEL, true);
					MaidModel.setLevel(Level + 1);
					MaidModel.setCurExp(0);
				} else {
					// 道具不足升一级
					UseAddUtil.use(hero, GameConst.TOOL, canUseNum, propId, SourceGoodConst.MAID_UPLEVEL, true);
					MaidModel.setCurExp(curExp + canUseNum * 10);
				}
			}
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.MAID_UPLEVEL, SystemIdConst.MAID);
			MaidSender.sendCmd_11306(hero.getId(), 0, id, MaidModel.getLevel(), MaidModel.getCurExp());
			//日常
			HouseShopTaskFunction.getIns().successDayTaskLocal(hero, HouseShopTaskConst.DAYTASK_3);
		} catch (Exception e) {
			LogTool.error(e, MaidManager.class, hero.getId(), hero.getName(), "upMaidLevel has wrong");
		}
	}
		
	
	/**
	 * 使用侍女形象
	 * 
	 * @param hero
	 */
	public void useMaid(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return;
			}
			Maid Maid = hero.getMaid();
			if (Maid == null) {
				return;
			}
			HashMap<Integer, MaidModel> maidMap = Maid.getMaidMap();
			if (maidMap.containsKey(id)) {
				// 已激活-设置形象
				MaidModel maidModel = maidMap.get(id);
				/*int dongtai = Config_shinv_020.getIns().get(id).getDongtai();
				if (maidModel.getStar() < dongtai) {
					// 该侍女不满足解锁动态效果
					MaidSender.sendCmd_11308(hero.getId(), 2, id);
					return;
				}*/
				Maid.setUseMaid(id);
				MaidSender.sendCmd_11308(hero.getId(), 0, id);
				return;
			}
			// 先激活该侍女
			MaidSender.sendCmd_11308(hero.getId(), 1, id);
		} catch (Exception e) {
			LogTool.error(e, MaidManager.class, hero.getId(), hero.getName(), "useMaid has wrong");
		}

	}
	
}
