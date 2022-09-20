package com.teamtop.system.activity.ativitys.coupletAct;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.coupletAct.model.CoupletAct;
import com.teamtop.system.activity.model.HeroActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import excel.config.Config_ddl_297;
import excel.struct.Struct_ddl_297;
import excel.struct.Struct_ddlreward_297;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class CoupletActFunction {

    private static volatile CoupletActFunction ins = null;

    public static CoupletActFunction getIns() {
        if (ins == null) {
            synchronized (CoupletActFunction.class) {
                if (ins == null) {
                    ins = new CoupletActFunction();
                }
            }
        }
        return ins;
    }

    private CoupletActFunction() {
    }

    /**
     * 随机对联答案
     *
     * @return
     */
    public ArrayList<Integer> randomCoupletAnswerList() {
        int coupletCharNum = CoupletActConst.COUPLET_CHAR_NUM;
        ArrayList<Integer> randomCoupletAnswerList = new ArrayList<Integer>(coupletCharNum + 1);
        List<Struct_ddl_297> configList = Config_ddl_297.getIns().getSortList();
        int ddlSize = configList.size();
        int randomIndex = RandomUtil.getRandomNumInAreas(0, ddlSize - 1);
        Struct_ddl_297 struct_ddl_297 = configList.get(randomIndex);
        int id = struct_ddl_297.getId();
        randomCoupletAnswerList.add(id);
        List<Integer> multiRandomNumAnswer = RandomUtil.getMultiRandomNumInArea(1, coupletCharNum, coupletCharNum);
        for (int j = 0; j < coupletCharNum; j++) {
            Integer answerId = multiRandomNumAnswer.get(j);
            randomCoupletAnswerList.add(answerId);
        }
        return randomCoupletAnswerList;
    }

    public void targetHandler(Hero hero, CoupletAct model) {
        // TODO Auto-generated method stub
        try {
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            model.setTodayTimes(model.getTodayTimes() + 1);
			int times = model.getTodayTimes();
            int periods = model.getPeriods();
            List<Struct_ddlreward_297> list = CoupletActSysCache.getTargetConfigMap().get(periods);
            int size = list.size();
            for (int i = 0; i < size; i++) {
                Struct_ddlreward_297 struct_ddlreward_297 = list.get(i);
                int id = struct_ddlreward_297.getId();
                if (times >= struct_ddlreward_297.getNum() && awardStateMap.get(id) == null) {
                    awardStateMap.put(id, CoupletActConst.CAN_GET);
                }
            }

        } catch (Exception e) {
            // TODO: handle exception
            LogTool.error(e, this, hero.getId(), hero.getName(), "CoupletActFunction targetHandler modelStr:" + model == null ? "" : JSON.toJSONString(model));
        }
    }

    public void checkCoupletTimes(Hero hero) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
            return;
        }
		HeroActivityData heroActivityData = hero.getHeroActivityData();
		if (heroActivityData == null) {
			return;
		}
        CoupletAct model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.COUPLET_ACT);
		if (model == null) {
			return;
		}
        boolean isUpdate = model.updateCoupletTimes();
        if (isUpdate) {
            int coupletTimes = model.getCoupletTimes();
            int restTime = 0;
            if (coupletTimes < CoupletActConst.COUPLET_INIT_TIMES) {
                restTime = model.getRestTime();
            }
            CoupletActSender.sendCmd_11328(hero.getId(), coupletTimes, restTime);
        }
    }


    /**
     * 红点发送
     *
     * @param isLogin 是否登录状态
     */
    public void redPoint(Hero hero, boolean isLogin) {
        if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.COUPLET_ACT)) {
            return;
        }
        CoupletAct model = (CoupletAct) ActivityFunction.getIns().getActivityData(hero,
                ActivitySysId.COUPLET_ACT);
        int coupletTimes = model.getCoupletTimes();
        if (coupletTimes > 0) {
            redPoint_f1(hero, isLogin);
        } else {
            Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
            boolean isRedPoint = false;
            for (Integer state : awardStateMap.values()) {
                if (state == CoupletActConst.CAN_GET) {
                    isRedPoint = true;
                    break;
                }
            }
            if (isRedPoint) {
                redPoint_f1(hero, isLogin);
            }
        }
    }

    public void redPoint_f1(Hero hero, boolean isLogin) {
        if (isLogin) {
            RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
            RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.COUPLET_ACT, 1,
                    RedPointConst.HAS_RED);
        } else {
            RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
            RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.COUPLET_ACT, 1,
                    RedPointConst.HAS_RED);
        }
    }

}
