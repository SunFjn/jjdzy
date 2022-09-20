package com.teamtop.system.event.useAddEvent.useHandleEvents;

import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.WuMiaoShiZheActFunction;
import com.teamtop.system.event.useAddEvent.AbsUseHandleEvent;
import com.teamtop.system.hero.Hero;

public class WuMiaoShiZheActUseEvent extends AbsUseHandleEvent {

    @Override
    public void useFunctionHandle(Hero hero, int type, int itemId, long num) {
        WuMiaoShiZheActFunction.getIns().addTool(hero, type, itemId, num);
    }

}
