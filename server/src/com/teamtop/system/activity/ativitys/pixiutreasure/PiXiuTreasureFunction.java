package com.teamtop.system.activity.ativitys.pixiutreasure;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.pixiutreasure.model.PiXiuTreasure;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
import excel.struct.Struct_pxsb_778;
import excel.struct.Struct_pxsbdj_778;

import java.util.List;
import java.util.Map;

public class PiXiuTreasureFunction {
    private static PiXiuTreasureFunction ins = null;

    public static PiXiuTreasureFunction getIns() {
        if (ins == null) {
            ins = new PiXiuTreasureFunction();
        }
        return ins;
    }

    private PiXiuTreasureFunction() {
    }

    /**
     * 增加消耗道具数量
     *
     * @param hero
     */
    public void addconsumeYBNum(Hero hero, int type, int itemId, long num) {
        PiXiuTreasure pixiuTreasure = null;
        try {
            if (ActivityFunction.getIns().getActivityData(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE) != null
                    && type == GameConst.YUANBAO) {
                if (num > Integer.MAX_VALUE) {
                    num = Integer.MAX_VALUE;
                }
                pixiuTreasure = (PiXiuTreasure) ActivityFunction.getIns().getActivityData(hero,
                        ActivitySysId.NEW_ACT_PIXIUTREASURE);
                int todayConsume = pixiuTreasure.getTodayConsume();
                pixiuTreasure.setTodayConsume(todayConsume + (int) num);
                updateAwardStateList(hero, pixiuTreasure);
            }
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getNameZoneid(), "PiXiuTreasureFunction addconsumeYBNum" + " num" + num + " pixiuTreasureStr:" + pixiuTreasureToStr(pixiuTreasure));
        }

    }

    public String pixiuTreasureToStr(PiXiuTreasure pixiuTreasure) {
        return pixiuTreasure == null ? "" : JSON.toJSONString(pixiuTreasure);
    }

    /**
     * 更新奖励状态列表
     *
     * @param hero
     */
    public void updateAwardStateList(Hero hero, PiXiuTreasure pixiuTreasure) {
        int periods = pixiuTreasure.getPeriods();
        Map<Integer, List<Struct_pxsb_778>> awardConfigMap = PiXiuTreasureCache.getAwardConfigMap().get(periods);
        List<Struct_pxsbdj_778> bigAwardConfigList = PiXiuTreasureCache.getBigAwardConfigMap().get(periods);
        int todayConsume = pixiuTreasure.getTodayConsume();
        Map<Integer, Integer[]> dayMap = pixiuTreasure.getDayMap();
        Map<Integer, Byte> bigAwardStateMap = pixiuTreasure.getBigAwardStateMap();
        Map<Integer, Byte> awardStateMap = pixiuTreasure.getAwardStateMap();
        int currentTime = TimeDateUtil.getCurrentTime();
        for (Struct_pxsbdj_778 struct_pxsbdj_778 : bigAwardConfigList) {
            int xf = struct_pxsbdj_778.getXf();
            if (todayConsume >= xf) {
                int bigId = struct_pxsbdj_778.getId();
                Integer[] dayArray = dayMap.get(bigId);
                if (dayArray == null) {
                    dayArray = new Integer[]{0, 0};
                    dayMap.put(bigId, dayArray);
                }
                int day = dayArray[0];
                Integer updateTime = dayArray[1];
                if (!TimeDateUtil.compareTimeForSameDay(currentTime, updateTime)) {
                    dayArray[1] = currentTime;
                    day++;
                    dayArray[0] = day;
                }
                int tj = struct_pxsbdj_778.getTj();
                if (day >= tj && bigAwardStateMap.get(bigId) == null) {
                    bigAwardStateMap.put(bigId, PiXiuTreasureEnum.CAN_GET.getCode());
                }
                List<Struct_pxsb_778> list = awardConfigMap.get(bigId);
                for (Struct_pxsb_778 struct_pxsb_778 : list) {
                    int ts = struct_pxsb_778.getTs();
                    int id = struct_pxsb_778.getId();
                    if (day >= ts && awardStateMap.get(id) == null) {
                        awardStateMap.put(id, PiXiuTreasureEnum.CAN_GET.getCode());
                    }
                }
            }
        }
        redPoint(hero, false);
    }

    public void redPoint(Hero hero, boolean isLogin) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE)) {
            return;
        }
        PiXiuTreasure pixiuTreasure = (PiXiuTreasure) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.NEW_ACT_PIXIUTREASURE);
        Map<Integer, Byte> bigAwardStateMap = pixiuTreasure.getBigAwardStateMap();
        Map<Integer, Byte> awardStateMap = pixiuTreasure.getAwardStateMap();
        boolean redPoint = false;
        for (Map.Entry<Integer, Byte> bigEntry : bigAwardStateMap.entrySet()) {
            if (bigEntry.getValue().equals(PiXiuTreasureEnum.CAN_GET.getCode())) {
                redPoint = true;
                break;
            }
        }
        if (!redPoint) {
            for (Map.Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
                if (entry.getValue().equals(PiXiuTreasureEnum.CAN_GET.getCode())) {
                    redPoint = true;
                    break;
                }
            }
        }
        if (redPoint) {
            if (isLogin) {
                RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
                RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE, 1,
                        RedPointConst.HAS_RED);
            } else {
                RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
                RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE, 1,
                        RedPointConst.HAS_RED);
            }
        }
    }

}
