package com.teamtop.system.activity.ativitys.dropRedPacket.cross.model;

import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;

import java.util.LinkedHashMap;
import java.util.concurrent.atomic.AtomicLong;

public class CrossDropRedPacket {
    /**
     * 红包列表,最大1000
     */
    private LinkedHashMap<Long, DropRedPacketModel> redpacketMap = new LinkedHashMap<>();
    /**
     * 红包列表(没次数),最大50
     */
    private LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap = new LinkedHashMap<>();
    private AtomicLong id = new AtomicLong();
    /**
     * 期数
     */
    private int qs = 0;
    /**
     * 活动结束时间
     */
    private int endTime = 0;

    private int serverOpenTime = 0;


    public CrossDropRedPacket() {
        // TODO Auto-generated constructor stub
    }

    public AtomicLong getId() {
        return id;
    }

    public void setId(AtomicLong id) {
        this.id = id;
    }

    public int getQs() {
        return qs;
    }

    public void setQs(int qs) {
        this.qs = qs;
    }

    public int getEndTime() {
        return endTime;
    }

    public void setEndTime(int endTime) {
        this.endTime = endTime;
    }

    public LinkedHashMap<Long, DropRedPacketModel> getRedpacketMap() {
        return redpacketMap;
    }

    public void setRedpacketMap(LinkedHashMap<Long, DropRedPacketModel> redpacketMap) {
        this.redpacketMap = redpacketMap;
    }

    public int getServerOpenTime() {
        return serverOpenTime;
    }

    public void setServerOpenTime(int serverOpenTime) {
        this.serverOpenTime = serverOpenTime;
    }

	public LinkedHashMap<Long, DropRedPacketModel> getRedpacketNotTimesMap() {
		return redpacketNotTimesMap;
	}

	public void setRedpacketNotTimesMap(LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap) {
		this.redpacketNotTimesMap = redpacketNotTimesMap;
	}
    
    
}
