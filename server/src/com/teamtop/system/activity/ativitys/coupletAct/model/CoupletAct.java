package com.teamtop.system.activity.ativitys.coupletAct.model;

import com.teamtop.system.activity.ativitys.coupletAct.CoupletActConst;
import com.teamtop.system.activity.ativitys.coupletAct.CoupletActFunction;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.util.time.TimeDateUtil;
import excel.config.Config_xtcs_004;

import java.util.ArrayList;
import java.util.Map;

public class CoupletAct extends CommonActivityRank {
    /**
     * 剩余对联次数
     */
    private int coupletTimes;
    /**
     * 恢复时间
     */
    private int recoverTime;
    
	/**
	 * 今天正确次数
	 */
	private int todayTimes;
    /**
     * 奖励状态key:配置表id value:1：可领取，2：已领取
     */
    private Map<Integer, Integer> awardStateMap;

    /**
     * 对联答案
     */
    private ArrayList<Integer> coupletAnswerList;

    public CoupletAct() {
        super();
        // TODO Auto-generated constructor stub
    }

    public CoupletAct(long hid, int indexId, int actId, int periods) {
        super(hid, indexId, actId, periods);
        // TODO Auto-generated constructor stub
    }


    public int getCoupletTimes() {
        updateCoupletTimes();
        return this.coupletTimes;
    }

    public boolean updateCoupletTimes() {
        if (this.recoverTime != 0) {
            int configTime = Config_xtcs_004.getIns().get(CoupletActConst.COUPLET_RECOVER_TIME).getNum();
            int recoverTimes = (TimeDateUtil.getCurrentTime() - this.recoverTime) / configTime;
            if (recoverTimes > 0) {
                int totalTimes = recoverTimes + this.coupletTimes;
                if (totalTimes > CoupletActConst.COUPLET_INIT_TIMES) {
                    totalTimes = CoupletActConst.COUPLET_INIT_TIMES;
                    this.recoverTime = 0;
                } else {
                    this.recoverTime = this.recoverTime + recoverTimes * configTime;
                }
                this.coupletTimes = totalTimes;
                return true;
            }
        }
        return false;
    }

    public void setCoupletTimes(int coupletTimes) {
        this.coupletTimes = coupletTimes;
        if (this.coupletTimes < CoupletActConst.COUPLET_INIT_TIMES) {
            if (recoverTime == 0) {
                setRecoverTime(TimeDateUtil.getCurrentTime());
            }
        }
    }

    public int getRecoverTime() {
        return recoverTime;
    }

    public int getRestTime() {
        int configTime = Config_xtcs_004.getIns().get(CoupletActConst.COUPLET_RECOVER_TIME).getNum();
        return recoverTime == 0 ? 0 : configTime - (TimeDateUtil.getCurrentTime() - recoverTime);
    }

    public void setRecoverTime(int recoverTime) {
        this.recoverTime = recoverTime;
    }

    public Map<Integer, Integer> getAwardStateMap() {
        return awardStateMap;
    }

    public void setAwardStateMap(Map<Integer, Integer> awardStateMap) {
        this.awardStateMap = awardStateMap;
    }

    public ArrayList<Integer> getCoupletAnswerList() {
        if (this.coupletAnswerList == null) {
            ArrayList coupletAnswerList = CoupletActFunction.getIns().randomCoupletAnswerList();
            this.coupletAnswerList = coupletAnswerList;
        }
        return this.coupletAnswerList;
    }

    public void setCoupletAnswerList(ArrayList<Integer> coupletAnswerList) {
        this.coupletAnswerList = coupletAnswerList;
    }

	public int getTodayTimes() {
		return todayTimes;
	}

	public void setTodayTimes(int todayTimes) {
		this.todayTimes = todayTimes;
	}
    
    
    
}
