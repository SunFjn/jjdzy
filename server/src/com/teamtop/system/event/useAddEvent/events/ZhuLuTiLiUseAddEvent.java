package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.crossZhuLu.QunXiongZhuLuSender;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuEnum;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class ZhuLuTiLiUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return false;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		return 0;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return true;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		return addHuobi(hero, num);
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 群雄逐鹿体力流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.ZHU_LU_TI_LI, hero.getShareCoin(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "ZhuLuTiLiUseAddEvent flowRec error!");
		}
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		return false;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossZhuLuEnum.Hid, hero.getId());
		crossData.putObject(CrossZhuLuEnum.State, new Long(num).intValue());
		CrossData writeBlockData = CrossZhuLuFunction.getIns().sendToCross(hero, CrossConst.CROSS_ZHU_LU_ADD_TI_LI_LC,
				crossData);
		if (writeBlockData == null)
			return 0;
		int tiLi = writeBlockData.getObject(CrossZhuLuEnum.State, Integer.class);
		int maxTiLi = writeBlockData.getObject(CrossZhuLuEnum.Index, Integer.class);
		int updateTiLiTime = writeBlockData.getObject(CrossZhuLuEnum.Type, Integer.class);
		if(tiLi != 0) {
			QunXiongZhuLuSender.sendCmd_8982(hero.getId(), 1, tiLi, maxTiLi, updateTiLiTime, 0);
		}
		return tiLi;
	}

	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 群雄逐鹿体力流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.ZHU_LU_TI_LI, hero.getShareCoin(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "ZhuLuTiLiUseAddEvent flowRecHuobi error!");
		}
	}

}