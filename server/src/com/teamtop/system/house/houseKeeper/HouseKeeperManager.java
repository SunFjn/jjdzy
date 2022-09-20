package com.teamtop.system.house.houseKeeper;


import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.houseKeeper.model.HouseKeeper;
import com.teamtop.system.houseShopTask.HouseShopTaskConst;
import com.teamtop.system.houseShopTask.HouseShopTaskFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdsj_019;
import excel.config.Config_jdjins_021;
import excel.config.Config_jdsj_021;
import excel.config.Config_jdskill_021;
import excel.struct.Struct_jdjins_021;
import excel.struct.Struct_jdsj_021;
import excel.struct.Struct_jdskill_021;
import io.netty.channel.Channel;

public class HouseKeeperManager {
	private static HouseKeeperManager ins;

	public static HouseKeeperManager getIns() {
		if(ins == null) {
			ins = new HouseKeeperManager();
		}
		return ins;
	}
	
	/**
	 * 打开家丁
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return;
			}
			HouseKeeper HouseKeeper = hero.getHouseKeeper();
			if (HouseKeeper == null) {
				return;
			}
			HouseKeeperSender.sendCmd_11352(hero.getId(), HouseKeeper.getId(), HouseKeeper.getLevel(),
					HouseKeeper.getCurExp());
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}
	
	/**
	 * 晋升家丁
	 * 
	 * @param hero
	 * @param index
	 */
	public void upHouseKeeper(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return;
			}
			HouseKeeper houseKeeper = hero.getHouseKeeper();
			int index = houseKeeper.getId();
			Struct_jdjins_021 struct_jdjins_021 = Config_jdjins_021.getIns().get(index);
			if (struct_jdjins_021.getNext() == 0) {
				// 达到上限
				HouseKeeperSender.sendCmd_11354(hero.getId(), 1, index);
				return;
			}
			if (houseKeeper.getLevel() < struct_jdjins_021.getTiaojian()) {
				// 等级不足
				HouseKeeperSender.sendCmd_11354(hero.getId(), 2, index);
				return;
			}
			if (!UseAddUtil.canUse(hero, struct_jdjins_021.getXiaohao())) {
				// 需要的道具不足
				HouseKeeperSender.sendCmd_11354(hero.getId(), 3, index);
				return;
			}
			UseAddUtil.use(hero, struct_jdjins_021.getXiaohao(), SourceGoodConst.HOUSEKEEPER_UP, true);
			houseKeeper.setId(struct_jdjins_021.getNext());

			FightCalcFunction.setRecalcAll(hero, FightCalcConst.HOUSEKEEPER_UP, SystemIdConst.HOUSEKEEPER);
			HouseKeeperSender.sendCmd_11354(hero.getId(), 0, houseKeeper.getId());
			Struct_jdjins_021 struct_jdjins_0212 = Config_jdjins_021.getIns().get(houseKeeper.getId());
			//府邸任务
			HouseShopTaskFunction.getIns().sccessGoalOneLocal(hero,  HouseShopTaskConst.GOAL_TYPE_402, struct_jdjins_0212.getZhiwei());
			// 刷新中央服家丁数据
			CrossData crossData = new CrossData();
			Channel channel = Client_2.getIns().getCrossChannel();
			crossData.putObject(CrossEnum.data1, houseKeeper.getId());
			crossData.putObject(CrossEnum.data2, hero.getId());
			NettyWrite.writeXData(channel, CrossConst.CROSS_REPLACE_HOUSEKEEPER, crossData);
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperManager.class, hero.getId(), hero.getName(), "upHouseKeeper has wrong");
		}
		
	}
	
	
	
	/**
	 * 家丁升级
	 * 
	 * @param hero
	 * @param id
	 */
	public void upHouseKeeperLevel(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return;
			}
			HouseKeeper houseKeeper = hero.getHouseKeeper();
			if (houseKeeper == null) {
				return;
			}
			int Level = houseKeeper.getLevel();
			Struct_jdsj_021 struct_jdsj_021 = Config_jdsj_021.getIns().get(Level);
			if (Config_jdsj_021.getIns().get(Level + 1) == null) {
				// 级数已满级
				HouseKeeperSender.sendCmd_11356(hero.getId(), 1, houseKeeper.getLevel(),
						houseKeeper.getCurExp());
				return;
			}
			int propId = HouseKeeperConst.PROP_ID;
			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), propId);
			if (canUseNum <= 0) {
				// 材料不足
				HouseKeeperSender.sendCmd_11356(hero.getId(), 2, houseKeeper.getLevel(),
						houseKeeper.getCurExp());
				return;
			}
			int houseLv = hero.getLocalHouse().getHouseLv();
			int jiading = Config_fdsj_019.getIns().get(houseLv).getJiading();
			if ((Level + 1) / 10 > jiading) {
				// 府邸等级不满足要求 
				HouseKeeperSender.sendCmd_11356(hero.getId(), 3, houseKeeper.getLevel(), houseKeeper.getCurExp());
				return;
			}
			int curExp = houseKeeper.getCurExp();
			int needExp = struct_jdsj_021.getExp();
			int needNum = (needExp - curExp) / 10;
			if (type == 1) {
				//升级				
				UseAddUtil.use(hero, GameConst.TOOL, 1, propId, SourceGoodConst.HOUSEKEEPER_UPLEVEL, true);
				houseKeeper.setCurExp(curExp + 10);
				if (houseKeeper.getCurExp() >= needExp) {
					// 足够升一级
					houseKeeper.setLevel(Level + 1);
					houseKeeper.setCurExp(0);
				}
			} else {
				//一键升级
				if (canUseNum >= needNum) {
					// 背包中的道具大于升级所需的道具
					UseAddUtil.use(hero, GameConst.TOOL, needNum, propId, SourceGoodConst.HOUSEKEEPER_UPLEVEL, true);
					houseKeeper.setLevel(Level + 1);
					houseKeeper.setCurExp(0);
				} else {
					// 道具不足升一级
					UseAddUtil.use(hero, GameConst.TOOL, canUseNum, propId, SourceGoodConst.HOUSEKEEPER_UPLEVEL, true);
					houseKeeper.setCurExp(curExp + canUseNum * 10);
				}
			}
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.HOUSEKEEPER_UPLEVEL, SystemIdConst.HOUSEKEEPER);
			HouseKeeperSender.sendCmd_11356(hero.getId(), 0, houseKeeper.getLevel(),
					houseKeeper.getCurExp());
			//府邸任务
			HouseShopTaskFunction.getIns().sccessGoalOneLocal(hero, HouseShopTaskConst.GOAL_TYPE_401, houseKeeper.getLevel());
			//日常
			HouseShopTaskFunction.getIns().successDayTaskLocal(hero,  HouseShopTaskConst.DAYTASK_2);
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperManager.class, hero.getId(), hero.getName(), "upHouseKeeperLevel has wrong");
		}
	}
		
	
	
	/**
	 * 获取家丁技能参数
	 * 
	 * @param hero
	 * @param houseKeeperId
	 *            家丁id
	 */
	public int[] getHouseKeeperSkill(Hero hero, int houseKeeperId) {
		// X%的几率抓捕顺手金库的玩家，府邸币损失降低Y% 对应skillInfo[0] skillInfo[1]
		// 府邸币每10分钟的生产加成X% 对应skillInfo[2]
		int[] skillInfo = new int[] { 0, 0, 0 };
		if (hero == null) {
			return skillInfo;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.HOUSEKEEPER)) {
				return skillInfo;
			}
			HouseKeeper houseKeeper = hero.getHouseKeeper();
			if (houseKeeper == null) {
				return skillInfo;
			}
			Struct_jdjins_021 struct_jdjins_021 = Config_jdjins_021.getIns().get(houseKeeperId);
			int[][] skill = struct_jdjins_021.getSkill();

			for (int i = 0; i < skill.length; i++) {
				int skillId = skill[i][0];
				Struct_jdskill_021 struct_jdskill_021 = Config_jdskill_021.getIns().get(skillId);
				int canshu1 = struct_jdskill_021.getCanshu1();
				int canshu2 = struct_jdskill_021.getCanshu2();
				if (skillId / 1000 == 10) {
					// 护院类技能
					skillInfo[0] = canshu1;
					skillInfo[1] = canshu2;
				}
				if (skillId / 1000 == 11) {
					// 管家类技能
					skillInfo[2] = canshu1;
				}
			}

			/*int randomNumInAreas = RandomUtil.getRandomNumInAreas(0, 100000);
			if (skillInfo[0] >= randomNumInAreas) {
				// X%的几率抓捕顺手金库的玩家，府邸币损失降低Y%
				double num = (100000 - skillInfo[1]) / 100000d;
				int[][] copyArrayAndNumCeil = CommonUtil.copyArrayAndNumCeil(source, num);		
			}*/

			return skillInfo;
		} catch (Exception e) {
			LogTool.error(e, HouseKeeperManager.class, hero.getId(), hero.getName(), "getHouseKeeperSkill has wrong");
		}
		return skillInfo;
	}

}
