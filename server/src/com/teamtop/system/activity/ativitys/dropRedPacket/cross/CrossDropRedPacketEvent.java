package com.teamtop.system.activity.ativitys.dropRedPacket.cross;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;
import excel.config.Config_huodong_009;
import excel.config.Config_xitong_001;
import excel.struct.Struct_huodong_009;
import excel.struct.Struct_xitong_001;
import io.netty.channel.Channel;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.concurrent.ConcurrentHashMap;

public class CrossDropRedPacketEvent extends AbsSystemEvent {

    private static volatile CrossDropRedPacketEvent ins = null;

    public static CrossDropRedPacketEvent getIns() {
        if (ins == null) {
            synchronized (CrossDropRedPacketEvent.class) {
                if (ins == null) {
                    ins = new CrossDropRedPacketEvent();
                }
            }
        }
        return ins;
    }

    private CrossDropRedPacketEvent() {
    }

    @Override
    public void init(Hero hero) {
        // TODO Auto-generated method stub

    }

    @Override
    public void login(Hero hero) {
        // TODO Auto-generated method stub

    }

    @Override
    public void zeroPub(int now) {
        DropRedPacketFunction.getIns().initSysConfigMap();
        CrossDropRedPacketSysCache.setSysRedPacketId(0);
        CrossDropRedPacketSysCache.setSysRedPacketTime(0);
        ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
        for (Channel channel : channelToZoneid.keySet()) {
            LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
            synchronized (redpacketMap) {
                //活动结束处理
                actEndHandler(channel);
                int qs = CrossDropRedPacketSysCache.getQs(channel);
                //活动开始处理
                actOpenHandler(channel, qs);
            }
        }
    }

    /**
     * 活动结束处理
     *
     * @param channel
     */
    public void actEndHandler(Channel channel) {
        int endTime = CrossDropRedPacketSysCache.getEndTime(channel);
        if (endTime != 0) {
            int currentTime = TimeDateUtil.getCurrentTime();
            if (currentTime >= endTime) {
                //活动结束
                CrossDropRedPacketSysCache.getRedpacketMap(channel).clear();
                CrossDropRedPacketSysCache.getRedpacketNotTimesMap(channel).clear();
                CrossDropRedPacketSysCache.clearId(channel);
                CrossDropRedPacketSysCache.setEndTime(channel, 0);
                CrossDropRedPacketSysCache.setQs(channel, 0);
            }
        }
    }

    /**
     * 活动开始处理
     *
     * @param channel
     */
    public boolean actOpenHandler(Channel channel, int oldQs) {
        int qs = checkActOpen(channel);
        boolean isOpenNext = false;
        if (qs != 0 && qs != oldQs) {
            //活动开始处理
            CrossDropRedPacketSysCache.setQs(channel, qs);
            Integer newEndTime = CrossDropRedPacketSysCache.getQsStartEndTimeMap().get(qs)[1];
            CrossDropRedPacketSysCache.setEndTime(channel, newEndTime);
			CrossDropRedPacketSysCache.getRedpacketMap(channel).clear();
			CrossDropRedPacketSysCache.getRedpacketNotTimesMap(channel).clear();
            CrossDropRedPacketSysCache.clearId(channel);
            isOpenNext = true;
        }
        return isOpenNext;
    }


    public int checkActOpen(Channel channel) {
        int serverOpenTime = CrossDropRedPacketSysCache.getServerOpenTime(channel);
        int between = DropRedPacketFunction.getIns().betweenOpen(serverOpenTime);
        Struct_xitong_001 struct_xitong_001 = Config_xitong_001.getIns().get(ActivitySysId.DROPREDPACKET_NEWACT);
        int day = struct_xitong_001.getDay();
        if (between < day) {
            return 0;
        }
        Map<Integer, Integer[]> qsStartEndTimeMap = CrossDropRedPacketSysCache.getQsStartEndTimeMap();
        int currentTime = TimeDateUtil.getCurrentTime();
        for (Map.Entry<Integer, Integer[]> entry : qsStartEndTimeMap.entrySet()) {
            int startTime = entry.getValue()[0];
            int endTime = entry.getValue()[1];
            if (currentTime >= startTime && currentTime < endTime) {
                Integer qs = entry.getKey();
                return qs;
            }
        }
        return 0;
    }

    @Override
    public void fixTime(int cmdId, int now) {
        // TODO Auto-generated method stub
        if (cmdId == 1) {
            // 中央服向各个子服同步缓存数据
            CrossDropRedPacketCL.getIns().updateCache();
        } else if (cmdId == 2) {
            boolean isSend = sysRedPacketIdHandler();
            if (isSend) {
                int sysRedPacketId = CrossDropRedPacketSysCache.getSysRedPacketId();
				// 发系统红包
                CrossDropRedPacketCL.getIns().sendSysRedPacket(sysRedPacketId);
            }
        }
    }

	/**
	 * 判断是否发系统红包
	 * 
	 * @return
	 */
	public boolean sysRedPacketIdHandler() {
        int sysRedPacketTime = CrossDropRedPacketSysCache.getSysRedPacketTime();
        int currentTime = TimeDateUtil.getCurrentTime();
        if (sysRedPacketTime != 0 && !TimeDateUtil.compareTimeForSameDay(sysRedPacketTime, currentTime)) {
        	DropRedPacketFunction.getIns().initSysConfigMap();
        	CrossDropRedPacketSysCache.setSysRedPacketId(0);
            CrossDropRedPacketSysCache.setSysRedPacketTime(0);
        }
        TreeMap<Integer, Integer> sysConfigMap = CrossDropRedPacketSysCache.getSysConfigMap();
        int size = sysConfigMap.size();
        boolean isSend = false;
        for (int i = 0; i < size; i++) {
            int sysRedPacketId = CrossDropRedPacketSysCache.getSysRedPacketId();
            sysRedPacketId++;
            Integer time = sysConfigMap.get(sysRedPacketId);
            if (time == null) {
                break;
            }
            if (currentTime >= time) {
                CrossDropRedPacketSysCache.setSysRedPacketId(sysRedPacketId);
                CrossDropRedPacketSysCache.setSysRedPacketTime(time);
                if (i == 0) {
                    isSend = true;
                }
            } else {
                break;
            }
        }
        return isSend;
    }


}
