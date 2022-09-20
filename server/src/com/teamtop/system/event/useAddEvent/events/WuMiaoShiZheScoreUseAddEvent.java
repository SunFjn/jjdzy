package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.model.WuMiaoShiZheAct;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class WuMiaoShiZheScoreUseAddEvent extends AbsUseAddEvent {

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
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
            return 0;
        }
        CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.WUMIAOSHIZHE_ACT, (int) num, 0);
        CommonActivityRank model = (CommonActivityRank) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.WUMIAOSHIZHE_ACT);
        return model.getParameter();
    }

    @Override
    public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
        try {
            int addFlag = SourceGoodConst.FLOW_OPER_ADD;
            if (!add) {
                addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
            }
            // 武庙积分流水
            String pf = hero.getLoginPf();
            String usesys = hero.getUsesys();
            if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
                return;
            }
            CommonActivityRank model = (CommonActivityRank) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.WUMIAOSHIZHE_ACT);
            FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.WUMIAOSHIZHE_SCORE,
                    model.getParameter(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
                    hero.getReincarnationLevel());
        } catch (Exception e) {
            LogTool.error(e, hero.getId(), "WuMiaoShiZheScoreUseAddEvent flowRec error!");
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
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
            return 0;
        }
        CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.WUMIAOSHIZHE_ACT, (int) num, 0);
        CommonActivityRank model = (CommonActivityRank) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.WUMIAOSHIZHE_ACT);
        return model.getParameter();
    }

    @Override
    public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
        try {
            int addFlag = SourceGoodConst.FLOW_OPER_ADD;
            if (!add) {
                addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
            }
            // 武庙积分流水
            String pf = hero.getLoginPf();
            String usesys = hero.getUsesys();
            if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
                return;
            }
            CommonActivityRank model = (CommonActivityRank) ActivityFunction.getIns().getActivityData(hero, ActivitySysId.WUMIAOSHIZHE_ACT);
            FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.WUMIAOSHIZHE_SCORE,
                    model.getParameter(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
                    hero.getReincarnationLevel());
        } catch (Exception e) {
            LogTool.error(e, hero.getId(), "WuMiaoShiZheScoreUseAddEvent flowRecHuobi error!");
        }
    }

}
