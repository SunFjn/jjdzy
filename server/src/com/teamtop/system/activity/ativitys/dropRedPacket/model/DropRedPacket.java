package com.teamtop.system.activity.ativitys.dropRedPacket.model;

import com.teamtop.system.activity.model.ActivityData;

import java.util.Map;

public class DropRedPacket extends ActivityData {
    /**
     * 任务
     */
    private Map<Integer, Integer[]> taskMap;

    /**
     * 红包已领次数(每日重置)
     */
    private int gettedTimes;

    public DropRedPacket() {
        // TODO Auto-generated constructor stub
    }

    public DropRedPacket(long hid, int indexId, int actId, int periods) {
        super(hid, indexId, actId, periods);
        // TODO Auto-generated constructor stub
    }

    public Map<Integer, Integer[]> getTaskMap() {
        return taskMap;
    }

    public void setTaskMap(Map<Integer, Integer[]> taskMap) {
        this.taskMap = taskMap;
    }

    public int getGettedTimes() {
        return gettedTimes;
    }

    public void setGettedTimes(int gettedTimes) {
        this.gettedTimes = gettedTimes;
    }
}
