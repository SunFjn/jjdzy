package com.teamtop.system.bag;

import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.nianMonsterMakeSpring.NianMonsterMakeSpringFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.battleVixens.BattleVixensFunction;
import com.teamtop.system.boss.countryBoss.CountryBossFunction;
import com.teamtop.system.boss.qmboss.QMBossFunction;
import com.teamtop.system.boss.specialAnimalBoss.SpecialAnimalBossFunction;
import com.teamtop.system.crossAttackCity.cross.AttackCityCrossFunction;
import com.teamtop.system.crossBoss.CrossBossFunction;
import com.teamtop.system.crossKing.local.CrossKingLocalFunction;
import com.teamtop.system.crossRebornFB.RebornFBFunction;
import com.teamtop.system.crossSoloRun.SoloRunFunction;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenFunction;
import com.teamtop.system.crossTeamKing.CrossTeamKingFunction;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiFunction;
import com.teamtop.system.destiny.DestinyFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godOfWar.GodOfWarFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.house.yard.cross.CrossHouseFunction;
import com.teamtop.system.material.MaterialFunction;
import com.teamtop.system.setting.SettingFunction;
import com.teamtop.system.sixWay.SixWayFunction;
import com.teamtop.system.threeHeroFightLvBu.ThreeHeroFightLvBuFunction;
import com.teamtop.system.tigerPass.TigerPassFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.system.xuTianHunt.XuTianHuntFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_daoju_204;
import excel.struct.Struct_daoju_204;

/**
 * 背包逻辑处理类
 * @author lobbyer
 * @date 2017年3月27日
 */
public class BagManager{
	//日志记录
	private static BagManager ins;
	public static BagManager getIns() {
		if(ins == null) {
			ins = new BagManager();
		}
		return ins;
	}

	/**
	 * 开启背包格子
	 * @author lobbyer
	 * @param hero
	 * @param num 开启格子数
	 * @date 2017年3月27日
	 */
	public void openGrid(Hero hero, int num) {
		Bag bag = hero.getBag();
		Map<Long, BagGrid> equipData = BagFunction.getIns().getEquipData(hero);
		int grid = BagFunction.getIns().getEquipBagGrid(hero);
		if(equipData.size() >= BagConst.MAX_GRIDCOUNT || grid + num >= BagConst.MAX_GRIDCOUNT) {
			BagSender.sendCmd_202(hero.getId(), 3, bag.getOpenGrid());
			return;
		}
		int baseOpen = 5;
		if(num/baseOpen < 1) return;
		int openGrid = bag.getOpenGrid();
		if(openGrid+num > BagConst.MAX_BUYCOUNT) {
			BagSender.sendCmd_202(hero.getId(), 3, bag.getOpenGrid());
			return;
		}
		int count = num/baseOpen;
		int useMoney = 0;
		for(int i=1;i<=count;i++) {
			useMoney += (int) (Math.floor(((openGrid + i*baseOpen)/baseOpen - 1)/2) + 3);
			
		}
		if(!UseAddUtil.canUse(hero, GameConst.YUANBAO, useMoney)){
			BagSender.sendCmd_202(hero.getId(), 4, openGrid);
			return;
		}
		UseAddUtil.use(hero, GameConst.YUANBAO, useMoney, SourceGoodConst.BAG_OPEN_GRID);
		bag.setOpenGrid(openGrid+num);
		BagSender.sendCmd_202(hero.getId(), 1, bag.getOpenGrid());
	}

	/**
	 * 使用道具物品
	 * @author lobbyer
	 * @param hero
	 * @param id 道具id
	 * @param num 使用数量
	 * @date 2017年3月27日
	 */
	public void useItem(Hero hero, int id, int num) {
		if(id <= 0 || num <= 0) return;
		Struct_daoju_204 struct = Config_daoju_204.getIns().get(id);
		if(struct == null) return;
		Bag bag = hero.getBag();
		BagGrid bagGrid = bag.getItemData().get(id);
		if(bagGrid == null) {
			LogTool.warn("hid:"+hero.getId()+" name:"+hero.getName()+" useInterItem buy bagGrid is null id:"+id, this);
			return;
		}
		if(struct.getLevel() > hero.getRealLevel()) {
			BagSender.sendCmd_208(hero.getId(), 4);
			return;
		}
		if(struct.getFangshi() != GameConst.OPERTYPE_ENABLE) {
			//不能背包直接使用
			BagSender.sendCmd_208(hero.getId(), 6);
			return;
		}
		if(num > bagGrid.getNum()) {
			//物品数量不足
			BagSender.sendCmd_208(hero.getId(), 7);
			return;
		}
		boolean success = false;
		if(!UseAddUtil.canUse(hero, GameConst.TOOL,num,id)) {
			//物品不足
			BagSender.sendCmd_208(hero.getId(), 7);
			return;
		}
		switch (struct.getLeixing()) {
		case GameConst.TYPE_RANDOM:
			int canOpenNum = MaterialFunction.getIns().getCanOpenNum(hero, id, num);
			if (canOpenNum == 0) {
				BagSender.sendCmd_208(hero.getId(), 8);
				return;
			}
			num = canOpenNum;
			success = MaterialFunction.getIns().useGiftTools(hero, id, num);
			break;
		case GameConst.TYPE_TITLE:
			success = TitleFunction.getIns().useItemAddTitle(hero, id, num);
			break;
		case GameConst.TYPE_ICON:
			success = SettingFunction.getIns().activateIconOrFrame(hero, id, num);
			break;
		case GameConst.TYPE_ICON_FRAME:
			success = SettingFunction.getIns().activateIconOrFrame(hero, id, num);
			break;
		case GameConst.TYPE_QMBOSSNUM:
			success = QMBossFunction.getIns().addQMBossNum(hero, id, num);
			break;
		case GameConst.TYPE_TIGEPASS_NUM:
			success = TigerPassFunction.getIns().addTigerPassNum(hero, id, num);
			break;	
		case GameConst.TYPE_RECHARGE:
			if (num>1) {
				num=1;
			}
			success = HeroFunction.getIns().useRechargeCare(hero, id, num);
			break;
		case GameConst.TYPE_UPLEVEL:
			if (num>1) {
				num=1;
			}
			success = HeroFunction.getIns().useUpLevelDan(hero, id, num);
			break;
		case GameConst.TYPE_BATTLEVIXENS:
			success = BattleVixensFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_DESTINY:
			success = DestinyFunction.getIns().addSuiJiDestinyid(hero, id, num);
			break;			
		case GameConst.TYPE_SPECIALANIMAL_BOSS_NUM:
			success = SpecialAnimalBossFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_THREE_HERO_FLB_NUM:
			success = ThreeHeroFightLvBuFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_CROSS_KING__NUM:
			success = CrossKingLocalFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_GODOFWAR_NUM:
			success = GodOfWarFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_COUNTRY_BOSS_NUM:
			success = CountryBossFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_TEAM_FUBEN_NUM:
			success = CrossTeamFubenFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_CROSS_BOSS_NUM:
			success = CrossBossFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_SOLORUN_NUM:
			success = SoloRunFunction.getIns().addChaNum(hero, id, num);
			break;
		case GameConst.TYPE_KING_NUM:
			success = CrossTeamKingFunction.getIns().useItemId(hero, num);
			break;
		case GameConst.TYPE_BOOM:
			success = NianMonsterMakeSpringFunction.getIns().addBoomNum(hero, id, num);
			break;
		case GameConst.TYPE_HUNT_NUM:
			success = XuTianHuntFunction.getIns().addHuntNum(hero, id, num);
			break;
		case GameConst.TYPE_ATTACK_NUM:
			success = AttackCityCrossFunction.getIns().addAttackNum(hero, id, num);
			break;
		case GameConst.TYPE_REBORN_FB_NUM:
			success = RebornFBFunction.getIns().addNum(hero, struct.getLeixing(), num);
			break;
		case GameConst.TYPE_REBORN_FB_HELP_NUM:
			success = RebornFBFunction.getIns().addNum(hero, struct.getLeixing(), num);
			break;
		case GameConst.TYPE_YINGJI:
			success = SixWayFunction.getIns().addSuiJiYingJiid(hero, id, num);
			break;
		case GameConst.TYPE_DENGFENGZAOJINUM:
			success = DengFengZaoJiFunction.getIns().addDengfengzaojiNum(hero, id, num);
			break;
		case GameConst.TYPE_43:
		case GameConst.TYPE_44:
		case GameConst.TYPE_45:
		case GameConst.TYPE_46:
			success = CrossHouseFunction.getIns().addNum(hero, struct.getLeixing(), num);
			break;
		case GameConst.TYPE_47:
			success = WarOrderFunction.getIns().addExp(hero, struct.getSys(), num);
			break;
		/*case GameConst.TYPE_BAO_WU:
			success = SkillBaoWuFunction.getIns().useBaoWuTools(hero, id, num);
			break;
		case GameConst.TYPE_BAO_WU_COUNT:
			success = SkillBaoWuFunction.getIns().useBaoWuCountTools(hero, id, num);
			break;
		case GameConst.TYPE_YUANBAO:
			success = MaterialFunction.getIns().useYuanbaoTools(hero, id, num);
			break;
		case GameConst.TYPE_EXP:
			success = MaterialFunction.getIns().useExpTools(hero, id, num);
			break;*/
		default:
			break;
		}
		if(!success) {
			return;
		}
		UseAddUtil.use(hero, GameConst.TOOL, num, id, SourceGoodConst.USE_MATERIAL);
		BagSender.sendCmd_208(hero.getId(), 1);
	}

	/**
	 * 使用UI多选礼包
	 * @author lobbyer
	 * @param hero
	 * @param id
	 * @param num 数量
	 * @param index 选择索引
	 * @date 2017年3月28日
	 */
	public void useInterItem(Hero hero, int id, int num, int index) {
		if(num == 0 || index < 0) return;
		Struct_daoju_204 struct = Config_daoju_204.getIns().get(id);
		if(struct == null) return;
		if(struct.getLeixing() != GameConst.TYPE_SELECT) return;
		Bag bag = hero.getBag();
		BagGrid bagGrid = bag.getItemData().get(id);
		if(bagGrid == null) {
			LogTool.warn("hid:"+hero.getId()+" name:"+hero.getName()+" useInterItem buy bagGrid is null id:"+id, this);
			return;
		}
		if(struct.getLevel() > hero.getRealLevel()) {
			BagSender.sendCmd_208(hero.getId(), 4);
			return;
		}
		if(num > bagGrid.getNum()) {
			//数量不足
			return;
		}
		if(!UseAddUtil.canUse(hero, GameConst.TOOL, num, id)){
			return;
		}
		if (index>=struct.getReward().length) {
			return;
		}
		boolean success = MaterialFunction.getIns().useCanChangeTool(hero, id, index, num);
		if(!success) {
			return;
		}
		UseAddUtil.use(hero, GameConst.TOOL, num, id, SourceGoodConst.USE_MATERIAL);
	}
	
	
	
}
