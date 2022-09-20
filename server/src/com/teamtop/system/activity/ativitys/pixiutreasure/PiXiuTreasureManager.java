package com.teamtop.system.activity.ativitys.pixiutreasure;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.pixiutreasure.model.PiXiuTreasure;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import excel.config.Config_pxsb_778;
import excel.config.Config_pxsbdj_778;
import excel.struct.Struct_pxsb_778;
import excel.struct.Struct_pxsbdj_778;

import java.util.*;

public class PiXiuTreasureManager extends AbstractActivityManager {
    private static PiXiuTreasureManager ins = null;

    public static PiXiuTreasureManager getIns() {
        if (ins == null) {
            ins = new PiXiuTreasureManager();
        }
        return ins;
    }

    private PiXiuTreasureManager() {
    }

    /**
     * 打开界面
     *
     * @param hero
     */
    @Override
    public void openUI(Hero hero) {
        // TODO Auto-generated method stub
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE)) {
            return;
        }
        PiXiuTreasure pixiuTreasure = (PiXiuTreasure) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.NEW_ACT_PIXIUTREASURE);
        Map<Integer, Byte> bigAwardStateMap = pixiuTreasure.getBigAwardStateMap();
        Map<Integer, Byte> awardStateMap = pixiuTreasure.getAwardStateMap();
        Map<Integer, Integer[]> dayMap = pixiuTreasure.getDayMap();
        int periods = pixiuTreasure.getPeriods();
        Map<Integer, List<Struct_pxsb_778>> awardConfigMap = PiXiuTreasureCache.getAwardConfigMap().get(periods);
        List<Struct_pxsbdj_778> bigAwardConfigList = PiXiuTreasureCache.getBigAwardConfigMap().get(periods);
        List<Object[]> bigAwardList = new ArrayList<>();
        for (Struct_pxsbdj_778 struct_pxsbdj_778 : bigAwardConfigList) {
            int bigId = struct_pxsbdj_778.getId();
            List<Struct_pxsb_778> list = awardConfigMap.get(bigId);
            List<Object[]> awardList = new ArrayList<>();
            for (Struct_pxsb_778 struct_pxsb_778 : list) {
                int id = struct_pxsb_778.getId();
                Byte state = Optional.ofNullable(awardStateMap).map(mapper -> mapper.get(id)).orElse(PiXiuTreasureEnum.NOT_REACH.getCode());
                awardList.add(new Object[]{id, state});
            }
            Byte bigAwardState = Optional.ofNullable(bigAwardStateMap).map(mapper -> mapper.get(bigId)).orElse(PiXiuTreasureEnum.NOT_REACH.getCode());
            Integer day = Optional.ofNullable(dayMap).map(mapper -> mapper.get(bigId)).map(mapper -> mapper[0]).orElse(0);
            bigAwardList.add(new Object[]{bigId, bigAwardState, day, awardList.toArray()});
        }
        int todayConsume = pixiuTreasure.getTodayConsume();
        PiXiuTreasureSender.sendCmd_12100(hero.getId(), bigAwardList.toArray(), todayConsume);
    }

    /**
     * 领取奖励
     *
     * @param hero
     * @param isBigAward
     * @param id
     */
    public void get(Hero hero, int isBigAward, int id) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.NEW_ACT_PIXIUTREASURE)) {
            return;
        }
        PiXiuTreasure pixiuTreasure = (PiXiuTreasure) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.NEW_ACT_PIXIUTREASURE);
        try {
            Byte state;
            int[][] award;
            if (isBigAward == 1) {
                //大奖
                Map<Integer, Byte> bigAwardStateMap = pixiuTreasure.getBigAwardStateMap();
                state = Optional.ofNullable(bigAwardStateMap).map(mapper -> mapper.get(id)).orElse(PiXiuTreasureEnum.NOT_REACH.getCode());
                if (state.equals(PiXiuTreasureEnum.NOT_REACH.getCode())) {
                    LogTool.warn("PiXiuTreasureManager get 0 hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " isBigAward:" + isBigAward + " id:" + id, this);
                    PiXiuTreasureSender.sendCmd_12102(hero.getId(), PiXiuTreasureEnum.FAILURE_NOT_REACH.getCode(), id);
                    return;
                }
                if (state.equals(PiXiuTreasureEnum.GETTED.getCode())) {
                    LogTool.warn("PiXiuTreasureManager get 1 hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " isBigAward:" + isBigAward + " id:" + id, this);
                    PiXiuTreasureSender.sendCmd_12102(hero.getId(), PiXiuTreasureEnum.FAILURE_NOT_REP.getCode(), id);
                    return;
                }
                Struct_pxsbdj_778 struct_pxsbdj_778 = Config_pxsbdj_778.getIns().get(id);
                award = struct_pxsbdj_778.getJl();
                bigAwardStateMap.put(id, PiXiuTreasureEnum.GETTED.getCode());
            } else if (isBigAward == 0) {
                //普通奖励
                Map<Integer, Byte> awardStateMap = pixiuTreasure.getAwardStateMap();
                state = Optional.ofNullable(awardStateMap).map(mapper -> mapper.get(id)).orElse(PiXiuTreasureEnum.NOT_REACH.getCode());
                if (state.equals(PiXiuTreasureEnum.NOT_REACH.getCode())) {
                    LogTool.warn("PiXiuTreasureManager get 2 hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " isBigAward:" + isBigAward + " id:" + id, this);
                    PiXiuTreasureSender.sendCmd_12102(hero.getId(), PiXiuTreasureEnum.FAILURE_NOT_REACH.getCode(), id);
                    return;
                }
                if (state.equals(PiXiuTreasureEnum.GETTED.getCode())) {
                    LogTool.warn("PiXiuTreasureManager get 3 hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " isBigAward:" + isBigAward + " id:" + id, this);
                    PiXiuTreasureSender.sendCmd_12102(hero.getId(), PiXiuTreasureEnum.FAILURE_NOT_REP.getCode(), id);
                    return;
                }
                Struct_pxsb_778 struct_pxsb_778 = Config_pxsb_778.getIns().get(id);
                award = struct_pxsb_778.getJl();
                awardStateMap.put(id, PiXiuTreasureEnum.GETTED.getCode());
            } else {
                LogTool.warn("PiXiuTreasureManager get 4 hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " isBigAward:" + isBigAward + " id:" + id, this);
                return;
            }
            UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_YB_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
            PiXiuTreasureSender.sendCmd_12102(hero.getId(), PiXiuTreasureEnum.SUCCESS.getCode(), id);
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getNameZoneid(), "PiXiuTreasureManager get" + " isBigAward:" + isBigAward + " id:" + id + " pixiuTreasureStr:" + pixiuTreasureToStr(pixiuTreasure));
        }
    }

    public String pixiuTreasureToStr(PiXiuTreasure pixiuTreasure) {
        return pixiuTreasure == null ? "" : JSON.toJSONString(pixiuTreasure);
    }


    @Override
    public void actOpen() {
        // TODO Auto-generated method stub

    }

    @Override
    public void heroActOpen(Hero hero) {
        // TODO Auto-generated method stub
        // 玩家未开启活动,但只要是在活动期间消费就要计算.注意外网当天更新前的消费也要记录
        int oneDayConsume = hero.getOneDayConsume();
        if (oneDayConsume > 0) {
            PiXiuTreasureFunction.getIns().addconsumeYBNum(hero, GameConst.YUANBAO, 0, oneDayConsume);
        }
    }

    @Override
    public void actEnd() {
        // TODO Auto-generated method stub

    }

    @Override
    public void heroActEnd(Hero hero) {
        // TODO Auto-generated method stub
        PiXiuTreasure pixiuTreasure = null;
        try {
            pixiuTreasure = (PiXiuTreasure) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.NEW_ACT_PIXIUTREASURE);
            Map<Integer, Byte> bigAwardStateMap = pixiuTreasure.getBigAwardStateMap();
            Map<Integer, Byte> awardStateMap = pixiuTreasure.getAwardStateMap();
            //发放大奖奖励
            for (Map.Entry<Integer, Byte> bigEntry : bigAwardStateMap.entrySet()) {
                if (bigEntry.getValue().equals(PiXiuTreasureEnum.CAN_GET.getCode())) {
                    Integer id = bigEntry.getKey();
                    Struct_pxsbdj_778 struct_pxsbdj_778 = Config_pxsbdj_778.getIns().get(id);
                    int[][] award = struct_pxsbdj_778.getJl();
                    MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.PIXIUTREASURE_AWARD,
                            new Object[]{MailConst.PIXIUTREASURE_AWARD}, award);
                    bigEntry.setValue(PiXiuTreasureEnum.GETTED.getCode());
                }
            }
            //发放普通奖励
            for (Map.Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
                if (entry.getValue().equals(PiXiuTreasureEnum.CAN_GET.getCode())) {
                    Integer id = entry.getKey();
                    Struct_pxsb_778 struct_pxsb_778 = Config_pxsb_778.getIns().get(id);
                    int[][] award = struct_pxsb_778.getJl();
                    MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.PIXIUTREASURE_AWARD,
                            new Object[]{MailConst.PIXIUTREASURE_AWARD}, award);
                    entry.setValue(PiXiuTreasureEnum.GETTED.getCode());
                }
            }
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getNameZoneid(), "PiXiuTreasureManager heroActEnd" + " pixiuTreasureStr:" + pixiuTreasureToStr(pixiuTreasure));
        }
    }

    @Override
    public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
        // TODO Auto-generated method stub
        PiXiuTreasure pixiuTreasure = new PiXiuTreasure(hero.getId(), activityInfo.getIndex(),
                activityInfo.getActId(), activityInfo.getPeriods());
        pixiuTreasure.setAwardStateMap(new HashMap<>());
        pixiuTreasure.setBigAwardStateMap(new HashMap<>());
        pixiuTreasure.setDayMap(new HashMap<>());
        return pixiuTreasure;
    }

    @Override
    public Class<?> getActivityData() {
        // TODO Auto-generated method stub
        return PiXiuTreasure.class;
    }

    @Override
    public void rechargeHandle(Hero hero, int money, int product_id) {
        // TODO Auto-generated method stub

    }

    @Override
    public AbsSystemEvent getSystemEvent() {
        // TODO Auto-generated method stub
        return PiXiuTreasureEvent.getIns();
    }

}
