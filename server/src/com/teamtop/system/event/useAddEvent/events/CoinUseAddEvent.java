package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

/**
 * 银两使用与获得
 * @author hepl
 *
 */
public class CoinUseAddEvent extends AbsUseAddEvent {
	
	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getCoin()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		hero.setCoin(hero.getCoin() - num);
		//记录总消耗银两
		hero.setTotalConsumeSilver(hero.getTotalConsumeSilver()+num);
		return hero.getCoin();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getCoin()+num<=HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getCoin() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		hero.setCoin(temp);
		return hero.getCoin();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add,
			int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			//银两流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.COIN, hero.getCoin(), num, reason,
					hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "SilverUseAddEvent flowRec error!");
		}
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		//触发刷新财富排行榜
		//RankListFunction.getIns().refreshSilverRank(hero);
	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		//触发刷新财富排行榜
		//RankListFunction.getIns().refreshSilverRank(hero);
	}
	
	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		return hero.getCoin()>=num;
	}
	
	@Override
	public long useHuobi(Hero hero, long num,int reason) {
		hero.setCoin(hero.getCoin() - num);
		//记录总消耗银两
		hero.setTotalConsumeSilver(hero.getTotalConsumeSilver()+num);
		return hero.getCoin();
	}
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		return hero.getCoin()+num<=HeroConst.MAX_MONEY;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setCoin(hero.getCoin() + num);
		return hero.getCoin();
	}
	
	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			//银两流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.COIN, hero.getCoin(), num, reason,
					hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "SilverUseAddEvent flowRecHuobi error!");
		}
	}

}
