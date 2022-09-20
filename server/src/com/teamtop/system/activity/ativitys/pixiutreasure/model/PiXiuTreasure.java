package com.teamtop.system.activity.ativitys.pixiutreasure.model;

import com.teamtop.system.activity.model.ActivityData;

import java.util.Map;

public class PiXiuTreasure extends ActivityData {
    /**
     * 奖励状态列表 key：配置表id value：0不可领取，1可领取，2已领取
     */
    private Map<Integer, Byte> awardStateMap;
    /**
     * 大奖奖励状态列表 key：大奖配置表id value：0不可领取，1可领取，2已领取
     */
    private Map<Integer, Byte> bigAwardStateMap;

    /**
     * key大奖配置表id，value：[0]达到天数 [1]更新时间
     */
    private Map<Integer, Integer[]> dayMap;

    /**
     * 今日消费数
     */
    private int todayConsume;


    public PiXiuTreasure() {
        // TODO Auto-generated constructor stub
    }

    public PiXiuTreasure(long hid, int indexId, int actId, int periods) {
        super(hid, indexId, actId, periods);
    }

    public Map<Integer, Byte> getAwardStateMap() {
        return awardStateMap;
    }

    public void setAwardStateMap(Map<Integer, Byte> awardStateMap) {
        this.awardStateMap = awardStateMap;
    }

    public Map<Integer, Byte> getBigAwardStateMap() {
        return bigAwardStateMap;
    }

    public void setBigAwardStateMap(Map<Integer, Byte> bigAwardStateMap) {
        this.bigAwardStateMap = bigAwardStateMap;
    }

    public Map<Integer, Integer[]> getDayMap() {
        return dayMap;
    }

    public void setDayMap(Map<Integer, Integer[]> dayMap) {
        this.dayMap = dayMap;
    }

    public int getTodayConsume() {
        return todayConsume;
    }

    public void setTodayConsume(int todayConsume) {
        this.todayConsume = todayConsume;
    }
}
