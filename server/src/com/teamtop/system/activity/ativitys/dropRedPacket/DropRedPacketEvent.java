package com.teamtop.system.activity.ativitys.dropRedPacket;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacket;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;
import excel.config.Config_xtcs_004;

import java.util.TreeMap;

public class DropRedPacketEvent extends AbsSystemEvent {

    private static volatile DropRedPacketEvent ins = null;

    public static DropRedPacketEvent getIns() {
        if (ins == null) {
            synchronized (DropRedPacketEvent.class) {
                if (ins == null) {
                    ins = new DropRedPacketEvent();
                }
            }
        }
        return ins;
    }

    private DropRedPacketEvent() {
    }

    @Override
    public void init(Hero hero) {
        // TODO Auto-generated method stub

    }

    @Override
    public void login(Hero hero) {
        // TODO Auto-generated method stub
        DropRedPacketFunction.getIns().redPoint(hero, true);
    }

    @Override
    public void zeroHero(Hero hero, int now) {
        loginReset(hero, now);
        DropRedPacketFunction.getIns().redPoint(hero, false);
    }

    @Override
    public void loginReset(Hero hero, int now) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.DROPREDPACKET_NEWACT)) {
            return;
        }
        DropRedPacket model = (DropRedPacket) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.DROPREDPACKET_NEWACT);
        model.setGettedTimes(0);
    }

    @Override
    public void zeroPub(int now) {
        DropRedPacketFunction.getIns().initSysConfigMap();
        DropRedPacketSysCache.setSysRedPacketId(0);
    }

    @Override
    public void fixTime(int cmdId, int now) {
        if (CrossZone.isCrossServer()) {
            return;
        }
        if (cmdId == 1) {
            // 系统红包Id处理,用来界面显示下一次系统红包时间
            if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.DROPREDPACKET_NEWACT)) {
                return;
            }
            TreeMap<Integer, Integer> sysConfigMap = DropRedPacketSysCache.getSysConfigMap();
            int size = sysConfigMap.size();
            for (int i = 0; i < size; i++) {
                int sysRedPacketId = DropRedPacketSysCache.getSysRedPacketId();
                sysRedPacketId++;
                Integer time = sysConfigMap.get(sysRedPacketId);
                if (time == null) {
                    break;
                }
                int currentTime = TimeDateUtil.getCurrentTime();
                if (currentTime >= time) {
                    DropRedPacketSysCache.setSysRedPacketId(sysRedPacketId);
                } else {
                    break;
                }
            }
        }
    }
}
