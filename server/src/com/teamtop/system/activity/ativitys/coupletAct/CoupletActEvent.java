package com.teamtop.system.activity.ativitys.coupletAct;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.coupletAct.model.CoupletAct;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class CoupletActEvent extends AbsSystemEvent {

    private static volatile CoupletActEvent ins = null;

    public static CoupletActEvent getIns() {
        if (ins == null) {
            synchronized (CoupletActEvent.class) {
                if (ins == null) {
                    ins = new CoupletActEvent();
                }
            }
        }
        return ins;
    }

    private CoupletActEvent() {
    }

    @Override
    public void init(Hero hero) {
        // TODO Auto-generated method stub

    }

    @Override
    public void login(Hero hero) {
        // TODO Auto-generated method stub
        CoupletActFunction.getIns().redPoint(hero, true);
    }

    @Override
    public void loginReset(Hero hero, int now) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
            return;
        }
        CoupletAct model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.COUPLET_ACT);
        // 补发奖励
        CoupletActManager.getIns().heroActEnd(hero);
        model.getAwardStateMap().clear();
        model.setTodayTimes(0);
    }

    @Override
    public void zeroHero(Hero hero, int now) {
        loginReset(hero, now);
        CoupletActFunction.getIns().redPoint(hero, false);
    }
}
