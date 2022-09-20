package com.teamtop.system.activity.ativitys.pixiutreasure;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.pixiutreasure.model.PiXiuTreasure;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class PiXiuTreasureEvent extends AbsSystemEvent {
    private static PiXiuTreasureEvent ins = null;

    public static PiXiuTreasureEvent getIns() {
        if (ins == null) {
            ins = new PiXiuTreasureEvent();
        }
        return ins;
    }

    private PiXiuTreasureEvent() {
    }

    @Override
    public void init(Hero hero) {
        // TODO Auto-generated method stub

    }

    @Override
    public void login(Hero hero) {
        // TODO Auto-generated method stub
        PiXiuTreasureFunction.getIns().redPoint(hero, true);
    }

    @Override
    public void loginReset(Hero hero, int now) {
        zeroHero(hero, now);
    }

    @Override
    public void zeroHero(final Hero hero, final int now) {
        // TODO Auto-generated method stub
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE)) {
            return;
        }
        PiXiuTreasure pixiuTreasure = (PiXiuTreasure) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.NEW_ACT_PIXIUTREASURE);
        pixiuTreasure.setTodayConsume(0);
        PiXiuTreasureFunction.getIns().redPoint(hero, false);
    }

    @Override
    public void passGuanqia(Hero hero, int passGuanqia) {
        // TODO Auto-generated method stub
    }

}
