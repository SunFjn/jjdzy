package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wuMiaoShiZheAct.model.WuMiaoShiZheAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import excel.config.Config_wmjf_779;
import excel.struct.Struct_wmjf_779;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class WuMiaoShiZheActManager extends AbstractActivityManager {
    private static volatile WuMiaoShiZheActManager ins = null;

    public static WuMiaoShiZheActManager getIns() {
        if (ins == null) {
            synchronized (WuMiaoShiZheActManager.class) {
                if (ins == null) {
                    ins = new WuMiaoShiZheActManager();
                }
            }
        }
        return ins;
    }

    private WuMiaoShiZheActManager() {
    }

    @Override
    public void openUI(Hero hero) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
            return;
        }
        WuMiaoShiZheAct model = (WuMiaoShiZheAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.WUMIAOSHIZHE_ACT);
        int myScore = model.getParameter();
        int myRank = 0;
        Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.WUMIAOSHIZHE_ACT);
        if (openUIObjArray != null) {
            for (Object obj : openUIObjArray) {
                Object[] objArray = (Object[]) obj;
                String name = (String) objArray[1];
                if (hero.getNameZoneid().equals(name)) {
                    myRank = (Integer) objArray[0];
                    if (myScore > 0) {
                        objArray[2] = myScore;
                    }
                }
            }
        }
        WuMiaoShiZheActSender.sendCmd_12200(hero.getId(), openUIObjArray, myRank, myScore);
    }


    public void openTargetAwardUI(Hero hero) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
            return;
        }
        WuMiaoShiZheAct model = (WuMiaoShiZheAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.WUMIAOSHIZHE_ACT);
        int periods = model.getPeriods();
        Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
        List<Struct_wmjf_779> list = WuMiaoShiZheActSysCache.getTargetConfigMap().get(periods);
        ArrayList<Object> awardList = new ArrayList<>();
        int size = list.size();
        for (int i = 0; i < size; i++) {
            Struct_wmjf_779 struct_wmjf_779 = list.get(i);
            int id = struct_wmjf_779.getId();
            Integer state = awardStateMap.get(id);
            if (state == null) {
                awardList.add(new Object[]{id, WuMiaoShiZheActConst.NOT_REACH});
            } else {
                awardList.add(new Object[]{id, state});
            }
        }
        WuMiaoShiZheActSender.sendCmd_12202(hero.getId(), awardList.toArray());
    }

    public void getTargetAward(Hero hero, int awardId) {
        try {
            if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WUMIAOSHIZHE_ACT)) {
                return;
            }
            WuMiaoShiZheAct model = (WuMiaoShiZheAct) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.WUMIAOSHIZHE_ACT);
            int periods = model.getPeriods();
            Struct_wmjf_779 struct_wmjf_779 = Config_wmjf_779.getIns().get(awardId);
            if (struct_wmjf_779 == null) {
                WuMiaoShiZheActSender.sendCmd_12204(hero.getId(), WuMiaoShiZheActConst.FAILURE_NOT_AWARD, awardId);
                return;
            }
            int qs = struct_wmjf_779.getId() / 100;
            if (qs != periods) {
                WuMiaoShiZheActSender.sendCmd_12204(hero.getId(), WuMiaoShiZheActConst.FAILURE_NOT_AWARD, awardId);
                return;
            }
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            Integer state = awardStateMap.get(awardId);
            if (state == null) {
                WuMiaoShiZheActSender.sendCmd_12204(hero.getId(), WuMiaoShiZheActConst.FAILURE_NOT_REACH, awardId);
                return;
            }
            if (state == WuMiaoShiZheActConst.GETTED) {
                WuMiaoShiZheActSender.sendCmd_12204(hero.getId(), WuMiaoShiZheActConst.FAILURE_NOT_REP, awardId);
                return;
            }
            awardStateMap.put(awardId, WuMiaoShiZheActConst.GETTED);
            int[][] reward = struct_wmjf_779.getReward();
            UseAddUtil.add(hero, reward, SourceGoodConst.WUMIAOSHIZHE_ACT_TARGET_REWARD, UseAddUtil.getDefaultMail(),
                    true); // 发放奖励
            WuMiaoShiZheActSender.sendCmd_12204(hero.getId(), WuMiaoShiZheActConst.SUCCESS, awardId);
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(),
                    "WuMiaoShiZheActManager getTargetAward awardId:" + awardId);
        }
    }

    @Override
    public void actOpen() {
        CommonRankFunction.getIns().clearLocalCache(ActivitySysId.WUMIAOSHIZHE_ACT);
    }

    @Override
    public void heroActOpen(Hero hero) {
        WuMiaoShiZheActFunction.getIns().redPoint(hero, false);
    }

    @Override
    public void actEnd() {
    }

    @Override
    public void heroActEnd(Hero hero) {
        // 补发邮件奖励
        Integer awardId = 0;
        try {
            WuMiaoShiZheAct model = (WuMiaoShiZheAct) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.WUMIAOSHIZHE_ACT);
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
                Integer state = entry.getValue();
                if (state == WuMiaoShiZheActConst.CAN_GET) {
                    awardId = entry.getKey();
                    Struct_wmjf_779 struct_wmjf_779 = Config_wmjf_779.getIns().get(awardId);
                    int[][] reward = struct_wmjf_779.getReward();
                    MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.WUMIAOSHIZHE_ACT_TARGET_REWARD,
                            new Object[]{MailConst.WUMIAOSHIZHE_ACT_TARGET_REWARD}, reward);
                    entry.setValue(WuMiaoShiZheActConst.GETTED);
                }
            }

        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(), "WuMiaoShiZheActManager heroActEnd awardId:" + awardId);
        }
    }

    @Override
    public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
        WuMiaoShiZheAct model = new WuMiaoShiZheAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
                activityInfo.getPeriods());
        model.setAwardStateMap(new HashMap<>());
        return model;
    }

    @Override
    public Class<?> getActivityData() {
        return WuMiaoShiZheAct.class;
    }

    @Override
    public void rechargeHandle(Hero hero, int money, int product_id) {
    }

    @Override
    public AbsSystemEvent getSystemEvent() {
        return WuMiaoShiZheActEvent.getIns();
    }

}
