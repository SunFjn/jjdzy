package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.log.LogTool;

/**
 * 非绑定元宝使用和获得事件 
 * @author hepl
 *
 */
public class YuanbaoUseAddEvent extends AbsUseAddEvent{
	
	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getYuanbao()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		hero.setYuanbao(hero.getYuanbao()-num);
		//记录总消耗元宝
		hero.setTotalConsumeGlod(hero.getTotalConsumeGlod()+num);
		// 称号
		TitleFunction.getIns().useYunabaoAddTitle(hero);
		//判断是否有内部发放的元宝
		if(hero.getIndoorGlodNotBind() > 0 && hero.getIndoorGlodNotBind() - hero.getIndoorGlodNotBindUse() > 0){
			//增加内部元宝的消耗
			long leftIndoorGlod = hero.getIndoorGlodNotBind() - hero.getIndoorGlodNotBindUse();
			long useIndoorGlod = 0;
			if(leftIndoorGlod < num){
				useIndoorGlod = leftIndoorGlod;
			}else {
				useIndoorGlod = num;
			}
			hero.setIndoorGlodNotBindTemp(useIndoorGlod);
			hero.setIndoorGlodNotBindUse(hero.getIndoorGlodNotBindUse() + useIndoorGlod);
		}
		//消费额度  （除了市场和邮件、交易花费的元宝其他途径都算）
		if (reason!=SourceGoodConst.USE_HOUTAI &&reason!=SourceGoodConst.USE_ZHAO_CAI_SPEND) {
			HeroFunction.getIns().consumeHandle(hero, num,reason);
		}
		//腾讯上报数据
//		TXReportCache.addReport(hero, TXReportConst.report_consume, (long)num);
		return hero.getYuanbao();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getYuanbao()+num<=HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getYuanbao() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		hero.setYuanbao(temp);
		return hero.getYuanbao();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add,
			int reason) {
		try {
			//元宝流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
				//判断是否有内部元宝消耗
				if(hero.getIndoorGlodNotBindTemp() > 0){
					//如果内部元宝消耗不足，则区分两次流水记录
					if(hero.getIndoorGlodNotBindTemp() < num){
						FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.YUANBAO, hero.getYuanbao(),
								hero.getIndoorGlodNotBindTemp(), reason, hero.getZoneid(), pf, usesys,
								SourceGoodConst.FLOW_OPER_INDOOR_REDUCE, hero.getReincarnationLevel());
						FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.YUANBAO, hero.getYuanbao(),
								num - hero.getIndoorGlodNotBindTemp(), reason, hero.getZoneid(), pf, usesys,
								SourceGoodConst.FLOW_OPER_REDUCE, hero.getReincarnationLevel());
						hero.setIndoorGlodNotBindTemp(0);
						return;
					}else {
						addFlag = SourceGoodConst.FLOW_OPER_INDOOR_REDUCE;
						hero.setIndoorGlodNotBindTemp(0);
					}
				}
				//开服消费
				//KaifuConsumeFunction.getIns().cosume(hero, num, reason);
			}
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.YUANBAO, hero.getYuanbao(), num, reason,
					hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "YuanbaoUseAddEvent flowRec error!");
		}
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		
	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		
	}
	
	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		return hero.getYuanbao()>=num;
	}
	
	@Override
	public long useHuobi(Hero hero, long num,int reason) {
		hero.setYuanbao(hero.getYuanbao()-num);
		//记录总消耗元宝
		hero.setTotalConsumeGlod(hero.getTotalConsumeGlod()+num);
		// 称号
		TitleFunction.getIns().useYunabaoAddTitle(hero);
		//判断是否有内部发放的元宝
		if(hero.getIndoorGlodNotBind() > 0 && hero.getIndoorGlodNotBind() - hero.getIndoorGlodNotBindUse() > 0){
			//增加内部元宝的消耗
			long leftIndoorGlod = hero.getIndoorGlodNotBind() - hero.getIndoorGlodNotBindUse();
			long useIndoorGlod = 0;
			if(leftIndoorGlod < num){
				useIndoorGlod = leftIndoorGlod;
			}else {
				useIndoorGlod = num;
			}
			hero.setIndoorGlodNotBindTemp(useIndoorGlod);
			hero.setIndoorGlodNotBindUse(hero.getIndoorGlodNotBindUse() + useIndoorGlod);
		}
		//消费额度  （除了市场和邮件、交易花费的元宝其他途径都算）
		if (reason!=SourceGoodConst.USE_HOUTAI) {
			HeroFunction.getIns().consumeHandle(hero, (int)num, reason);
		}
		//腾讯上报数据
//		TXReportCache.addReport(hero, TXReportConst.report_consume, num);
		return hero.getYuanbao();
	}
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		return hero.getYuanbao()+num<=HeroConst.MAX_MONEY;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setYuanbao(hero.getYuanbao()+num);
		return hero.getYuanbao();
	}
	
	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			//元宝流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
				//判断是否有内部元宝消耗
				if(hero.getIndoorGlodNotBindTemp() > 0){
					//如果内部元宝消耗不足，则区分两次流水记录
					if(hero.getIndoorGlodNotBindTemp() < num){
						FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.YUANBAO, hero.getYuanbao(),
								hero.getIndoorGlodNotBindTemp(), reason, hero.getZoneid(), pf, usesys,
								SourceGoodConst.FLOW_OPER_INDOOR_REDUCE, hero.getReincarnationLevel());
						FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.YUANBAO, hero.getYuanbao(),
								num - hero.getIndoorGlodNotBindTemp(), reason, hero.getZoneid(), pf, usesys,
								SourceGoodConst.FLOW_OPER_REDUCE, hero.getReincarnationLevel());
						hero.setIndoorGlodNotBindTemp(0);
						return;
					}else {
						addFlag = SourceGoodConst.FLOW_OPER_INDOOR_REDUCE;
						hero.setIndoorGlodNotBindTemp(0);
					}
				}
			}
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.YUANBAO, hero.getYuanbao(), num, reason,
					hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "YuanbaoUseAddEvent flowRecHuobi error!");
		}
	}

}
