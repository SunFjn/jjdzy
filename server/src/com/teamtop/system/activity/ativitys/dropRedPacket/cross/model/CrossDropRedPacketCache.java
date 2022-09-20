package com.teamtop.system.activity.ativitys.dropRedPacket.cross.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CrossDropRedPacketCache {
    /**
     * 系统红包 key:partId
     */
    private Map<Integer, CrossDropRedPacket> cacheMap = new ConcurrentHashMap<>();
    /**
     * 系统红包Id
     */
    private int sysRedPacketId = 0;
    /**
     * 系统红包时间戳
     */
    private int sysRedPacketTime = 0;

    public Map<Integer, CrossDropRedPacket> getCacheMap() {
        return cacheMap;
    }

    public void setCacheMap(Map<Integer, CrossDropRedPacket> cacheMap) {
        this.cacheMap = cacheMap;
    }

    public int getSysRedPacketId() {
        return sysRedPacketId;
    }

    public void setSysRedPacketId(int sysRedPacketId) {
        this.sysRedPacketId = sysRedPacketId;
    }

    public int getSysRedPacketTime() {
        return sysRedPacketTime;
    }

    public void setSysRedPacketTime(int sysRedPacketTime) {
        this.sysRedPacketTime = sysRedPacketTime;
    }
}
