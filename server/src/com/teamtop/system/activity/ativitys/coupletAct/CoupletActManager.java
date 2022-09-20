package com.teamtop.system.activity.ativitys.coupletAct;

import com.alibaba.fastjson.JSON;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.coupletAct.model.CoupletAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import excel.config.Config_ddlreward_297;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_ddlreward_297;

import java.util.*;
import java.util.Map.Entry;

public class CoupletActManager extends AbstractActivityManager {
    private static volatile CoupletActManager ins = null;

    public static CoupletActManager getIns() {
        if (ins == null) {
            synchronized (CoupletActManager.class) {
                if (ins == null) {
                    ins = new CoupletActManager();
                }
            }
        }
        return ins;
    }

    private CoupletActManager() {
    }

    @Override
    public void openUI(Hero hero) {
        // TODO Auto-generated method stub
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
            return;
        }
        CoupletAct model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.COUPLET_ACT);
        int coupletTimes = model.getCoupletTimes();
        int restTime = model.getRestTime();
        int todayTimes = model.getTodayTimes();
        Object[] targetAwardArray = getTargetAwardArray(model);
        ArrayList<Integer> coupletAnswerList = model.getCoupletAnswerList();
        int coupletId = coupletAnswerList.get(0);
        ArrayList<Object[]> answerList = new ArrayList<>();
        int size = coupletAnswerList.size();
        for (int i = 1; i < size; i++) {
            answerList.add(new Object[]{coupletAnswerList.get(i)});
        }
        CoupletActSender.sendCmd_11320(hero.getId(), coupletId, answerList.toArray(), coupletTimes, restTime, todayTimes, targetAwardArray);
    }

    public Object[] getTargetAwardArray(CoupletAct model) {
        // TODO Auto-generated method stub
        int periods = model.getPeriods();
        Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
        List<Struct_ddlreward_297> list = CoupletActSysCache.getTargetConfigMap().get(periods);
        ArrayList<Object[]> awardList = new ArrayList<>();
        int size = list.size();
        for (int i = 0; i < size; i++) {
            Struct_ddlreward_297 struct_ddlreward_297 = list.get(i);
            int id = struct_ddlreward_297.getId();
            Integer state = awardStateMap.get(id);
            if (state == null) {
                awardList.add(new Object[]{id, CoupletActConst.NOT_REACH});
            } else {
                awardList.add(new Object[]{id, state});
            }
        }
        return awardList.toArray();
    }

    public void commit(Hero hero, Object[] list) {
        CoupletAct model = null;
        try {
            if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
                return;
            }
            int length = list.length;
            int coupletCharNum = CoupletActConst.COUPLET_CHAR_NUM;
            if (length != coupletCharNum) {
                CoupletActSender.sendCmd_11322(hero.getId(), 3);
                return;
            }
            model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.COUPLET_ACT);
            int coupletTimes = model.getCoupletTimes();
            boolean isTool = false;
            if (coupletTimes <= 0) {
                int[][] coupletTool = new int[][]{new int[]{GameConst.TOOL, CoupletActConst.COUPLET_TOOL, 1}};
                if (UseAddUtil.canUse(hero, coupletTool)) {
                    UseAddUtil.use(hero, coupletTool, SourceGoodConst.COUPLET_ACT_COUPLET_CONSUME, true);
                    isTool = true;
                } else {
                    CoupletActSender.sendCmd_11322(hero.getId(), 4);
                    return;
                }
            }

            ArrayList<Integer> coupletAnswerList = model.getCoupletAnswerList();
            int coupletId = coupletAnswerList.get(0);
            for (int i = 0; i < length; i++) {
                int heroAnswer = ((Byte) list[i]).intValue();
                if (coupletAnswerList.get(heroAnswer) != i + 1) {
                    boolean repeatWord = CoupletActSysCache.isRepeatWord(coupletId, i + 1, coupletAnswerList.get(heroAnswer));
                    if (repeatWord) {
                        continue;
                    }
                    if (!isTool) {
                        model.setCoupletTimes(coupletTimes - 1);
                    }
                    CoupletActSender.sendCmd_11322(hero.getId(), 2);
                    ArrayList<Integer> randomCoupletAnswerList = CoupletActFunction.getIns().randomCoupletAnswerList();
                    model.setCoupletAnswerList(randomCoupletAnswerList);
                    openUI(hero);
                    return;
                }
            }
            if (!isTool) {
                model.setCoupletTimes(coupletTimes - 1);
            }
            CoupletActSender.sendCmd_11322(hero.getId(), 1);
            ArrayList<Integer> randomCoupletAnswerList = CoupletActFunction.getIns().randomCoupletAnswerList();
            model.setCoupletAnswerList(randomCoupletAnswerList);
            CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, ActivitySysId.COUPLET_ACT, 1, 0);
            int[][] award = Config_xtcs_004.getIns().get(CoupletActConst.COUPLET_CORRECT_AWARD).getOther();
            // 发放奖励
            UseAddUtil.add(hero, award, SourceGoodConst.COUPLET_ACT_CORRECT_AWARD, UseAddUtil.getDefaultMail(), true);
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(),
                    "CoupletActManager commit Object[]:" + Arrays.asList(list) + " modelStr:" + model == null ? "" : JSON.toJSONString(model));
        }
    }


    public void openRankUI(Hero hero) {
        // TODO Auto-generated method stub
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
            return;
        }
        CoupletAct model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.COUPLET_ACT);
        int trueTimes = model.getParameter();
        int myRank = 0;
        Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.COUPLET_ACT);
        if (openUIObjArray != null) {
            for (Object obj : openUIObjArray) {
                Object[] objArray = (Object[]) obj;
                String name = (String) objArray[1];
                if (hero.getNameZoneid().equals(name)) {
                    myRank = (Integer) objArray[0];
                    if (trueTimes > 0) {
                        objArray[2] = trueTimes;
                    }
                }
            }
        }
        CoupletActSender.sendCmd_11324(hero.getId(), openUIObjArray, myRank, trueTimes);
    }


    public void getTargetAward(Hero hero, int awardId) {
        // TODO Auto-generated method stub
        CoupletAct model = null;
        try {
            if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
                return;
            }
            model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.COUPLET_ACT);
            int periods = model.getPeriods();
            Struct_ddlreward_297 struct_ddlreward_297 = Config_ddlreward_297.getIns().get(awardId);
            if (struct_ddlreward_297 == null) {
                CoupletActSender.sendCmd_11326(hero.getId(), CoupletActConst.FAILURE_NOT_AWARD, awardId);
                return;
            }
            int qs = struct_ddlreward_297.getQs();
            if (qs != periods) {
                CoupletActSender.sendCmd_11326(hero.getId(), CoupletActConst.FAILURE_NOT_AWARD, awardId);
                return;
            }
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            Integer state = awardStateMap.get(awardId);
            if (state == null) {
                CoupletActSender.sendCmd_11326(hero.getId(), CoupletActConst.FAILURE_NOT_REACH, awardId);
                return;
            }
            if (state == CoupletActConst.GETTED) {
                CoupletActSender.sendCmd_11326(hero.getId(), CoupletActConst.FAILURE_NOT_REP, awardId);
                return;
            }
            awardStateMap.put(awardId, CoupletActConst.GETTED);
            int[][] reward = struct_ddlreward_297.getReward();
            UseAddUtil.add(hero, reward, SourceGoodConst.COUPLET_ACT_TARGET_REWARD, UseAddUtil.getDefaultMail(),
                    true); // 发放奖励
            CoupletActSender.sendCmd_11326(hero.getId(), CoupletActConst.SUCCESS, awardId);
        } catch (Exception e) {
            // TODO: ha ndle exception
            LogTool.error(e, this, hero.getId(), hero.getName(),
                    "CoupletActManager getTargetAward awardId:" + awardId + " modelStr:" + model == null ? "" : JSON.toJSONString(model));
        }
    }

    @Override
    public void actOpen() {
        // TODO Auto-generated method stub
        CommonRankFunction.getIns().clearLocalCache(ActivitySysId.COUPLET_ACT);
    }

    @Override
    public void heroActOpen(Hero hero) {
        // TODO Auto-generated method stub
    }

    @Override
    public void actEnd() {
        // TODO Auto-generated method stub
    }

    @Override
    public void heroActEnd(Hero hero) {
        // TODO Auto-generated method stub
        // 补发邮件奖励
        Integer awardId = 0;
        CoupletAct model = null;
        try {
            model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                    ActivitySysId.COUPLET_ACT);
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
                Integer state = entry.getValue();
                if (state == CoupletActConst.CAN_GET) {
                    awardId = entry.getKey();
                    Struct_ddlreward_297 struct_ddlreward_297 = Config_ddlreward_297.getIns().get(awardId);
                    int[][] reward = struct_ddlreward_297.getReward();
                    MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.COUPLET_ACT_TARGET_REWARD,
                            new Object[]{MailConst.COUPLET_ACT_TARGET_REWARD}, reward);
                    entry.setValue(CoupletActConst.GETTED);
                }
            }

        } catch (Exception e) {
            // TODO: handle exception
            LogTool.error(e, this, hero.getId(), hero.getName(), "CoupletActManager heroActEnd awardId:" + awardId + " modelStr:" + model == null ? "" : JSON.toJSONString(model));
        }
    }

    @Override
    public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
        // TODO Auto-generated method stub
        CoupletAct model = new CoupletAct(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
                activityInfo.getPeriods());
        model.setCoupletTimes(CoupletActConst.COUPLET_INIT_TIMES);
        model.setAwardStateMap(new HashMap<>());
        return model;
    }

    @Override
    public Class<?> getActivityData() {
        // TODO Auto-generated method stub
        return CoupletAct.class;
    }

    @Override
    public void rechargeHandle(Hero hero, int money, int product_id) {
        // TODO Auto-generated method stub
    }

    @Override
    public AbsSystemEvent getSystemEvent() {
        // TODO Auto-generated method stub
        return CoupletActEvent.getIns();
    }

}
