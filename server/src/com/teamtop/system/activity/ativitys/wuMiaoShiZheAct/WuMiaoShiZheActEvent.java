package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

public class WuMiaoShiZheActEvent extends AbsSystemEvent {

    private static volatile WuMiaoShiZheActEvent ins = null;

    public static WuMiaoShiZheActEvent getIns() {
        if (ins == null) {
            synchronized (WuMiaoShiZheActEvent.class) {
                if (ins == null) {
                    ins = new WuMiaoShiZheActEvent();
                }
            }
        }
        return ins;
    }

    private WuMiaoShiZheActEvent() {
    }

    @Override
    public void init(Hero hero) {

    }

    @Override
    public void login(Hero hero) {
        WuMiaoShiZheActFunction.getIns().redPoint(hero, true);
    }

    @Override
    public void zeroHero(Hero hero, int now) {
        WuMiaoShiZheActFunction.getIns().redPoint(hero, false);
    }
}
