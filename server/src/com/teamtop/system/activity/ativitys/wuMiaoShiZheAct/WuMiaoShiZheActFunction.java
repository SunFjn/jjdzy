package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.model.WuMiaoShiZheAct;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import excel.struct.Struct_wmjf_779;
import excel.struct.Struct_wmsz_779;

import java.util.List;
import java.util.Map;

public class WuMiaoShiZheActFunction {

    private static volatile WuMiaoShiZheActFunction ins = null;

    public static WuMiaoShiZheActFunction getIns() {
        if (ins == null) {
            synchronized (WuMiaoShiZheActFunction.class) {
                if (ins == null) {
                    ins = new WuMiaoShiZheActFunction();
                }
            }
        }
        return ins;
    }

    private WuMiaoShiZheActFunction() {
    }

    public void addTool(Hero hero, int type, int itemId, long num) {
        WuMiaoShiZheAct model = null;
        int score = 0;
        try {
            if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
                return;
            }
            model = (WuMiaoShiZheAct) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.WUMIAOSHIZHE_ACT);
            if (model == null) {
                LogTool.warn("WuMiaoShiZheActFunction addTool hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " type:" + +type + " itemId:" + itemId + " num:" + num, this);
            }
            score = model.getParameter();
            int periods = model.getPeriods();
            Map<Integer, Map<Integer, Struct_wmsz_779>> consumeMap = WuMiaoShiZheActSysCache.getConsumeMap();
            Map<Integer, Struct_wmsz_779> map = consumeMap.get(periods);
            if (itemId == 0) {
                itemId = type;
            }
            Struct_wmsz_779 struct_wmsz_779 = map.get(itemId);
            if (struct_wmsz_779 != null) {
                int addScore = struct_wmsz_779.getPoint() * (int) num;
                LogTool.info("WuMiaoShiZheActFunction addTool hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " type:" + +type + " itemId:" + itemId + " num:" + num, this);
                CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.WUMIAOSHIZHE_ACT, addScore, 0);
            }
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(),
                    "WuMiaoShiZheActFunction addTool score:" + score + " type:" + type + " itemId:" + itemId + " num:" + num);
        }
    }


    public void targetHandler(Hero hero, WuMiaoShiZheAct model) {
        int times = 0;
        try {
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            times = model.getParameter();
            int periods = model.getPeriods();
            List<Struct_wmjf_779> list = WuMiaoShiZheActSysCache.getTargetConfigMap().get(periods);
            int size = list.size();
            for (int i = 0; i < size; i++) {
                Struct_wmjf_779 struct_wmjf_779 = list.get(i);
                int id = struct_wmjf_779.getId();
                if (times >= struct_wmjf_779.getPoint() && awardStateMap.get(id) == null) {
                    awardStateMap.put(id, WuMiaoShiZheActConst.CAN_GET);
                }
            }
            WuMiaoShiZheActFunction.getIns().redPoint(hero, false);
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(), "WuMiaoShiZheActFunction targetHandler times:" + times);
        }
    }

    public void redPoint(Hero hero, boolean isLogin) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
            return;
        }
        WuMiaoShiZheAct model = (WuMiaoShiZheAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.WUMIAOSHIZHE_ACT);
        Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
        boolean redPoint = false;
        for (Map.Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
            Integer state = entry.getValue();
            if (state == WuMiaoShiZheActConst.CAN_GET) {
                redPoint = true;
                break;
            }
        }
        if (redPoint) {
            if (isLogin) {
                RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
                RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.WUMIAOSHIZHE_ACT, 1,
                        RedPointConst.HAS_RED);
            } else {
                RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
                RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WUMIAOSHIZHE_ACT, 1,
                        RedPointConst.HAS_RED);
            }
        } else {
            if (!isLogin) {
                RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.NO_RED);
                RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WUMIAOSHIZHE_ACT, 1,
                        RedPointConst.NO_RED);
            }
        }
    }

}
