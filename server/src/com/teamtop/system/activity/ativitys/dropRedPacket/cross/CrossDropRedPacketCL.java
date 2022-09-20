package com.teamtop.system.activity.ativitys.dropRedPacket.cross;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.cross.model.CrossDropRedPacket;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.util.log.LogTool;
import excel.config.Config_tjhbsys_296;
import excel.struct.Struct_tjhbsys_296;
import io.netty.channel.Channel;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class CrossDropRedPacketCL {
    private static volatile CrossDropRedPacketCL ins = null;

    public static CrossDropRedPacketCL getIns() {
        if (ins == null) {
            synchronized (CrossDropRedPacketCL.class) {
                if (ins == null) {
                    ins = new CrossDropRedPacketCL();
                }
            }
        }
        return ins;
    }

    private CrossDropRedPacketCL() {
    }

    /**
     * 子服联接中央服成功 中央服向子服发送排行
     *
     * @param channel
     */
    public void connEventToLocal(Channel channel) {
        CrossData crossData = new CrossData();
        LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
        crossData.putObject(CrossDropRedPacketEnum.redpacketMap, redpacketMap);
        LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap = CrossDropRedPacketSysCache.getRedpacketNotTimesMap(channel);
        crossData.putObject(CrossDropRedPacketEnum.redpacketNotTimesMap, redpacketNotTimesMap);
        LogTool.info("CrossDropRedPacketCL connEvent:" + channel, this);
        NettyWrite.writeXData(channel, CrossConst.CROSS_DROPREDPACKET_CON_CL, crossData,
                new Callback() {

                    @Override
                    public void dataReci(Channel channel, CrossData crossData) {
                        // TODO Auto-generated method stub
                        Integer serverOpenTime = crossData
                                .getObject(CrossDropRedPacketEnum.serverOpenTime, Integer.class);
                        if (serverOpenTime == null || serverOpenTime == 0) {
                            return;
                        }
                        synchronized (redpacketMap) {
                            int serverOpenTimePartId = CrossDropRedPacketSysCache.getServerOpenTime(channel);
                            if (serverOpenTimePartId == 0 || serverOpenTime < serverOpenTimePartId) {
                                CrossDropRedPacketSysCache.setServerOpenTime(channel, serverOpenTime);
                            }
                            int crossQs = CrossDropRedPacketSysCache.getQs(channel);
                            boolean isOpenNext = CrossDropRedPacketEvent.getIns().actOpenHandler(channel, crossQs);
                            if (!isOpenNext) {
                                return;
                            }
                        }
                        crossData.finishGet();
                        LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
                        crossData.putObject(CrossDropRedPacketEnum.redpacketMap, redpacketMap);
                        LinkedHashMap<Long, DropRedPacketModel> redpacketNotTimesMap = CrossDropRedPacketSysCache.getRedpacketNotTimesMap(channel);
                        crossData.putObject(CrossDropRedPacketEnum.redpacketNotTimesMap, redpacketNotTimesMap);
                        NettyWrite.writeXData(channel, CrossConst.CROSS_DROPREDPACKET_CON_CL, crossData);
                    }
                });
    }

    /**
     * 中央服向各个子服同步发红包数据
     *
     * @param channel
     * @param model
     */
    public void updateSendToLocal(Channel channel, DropRedPacketModel model) {
        ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		DropRedPacketModel newModel = new DropRedPacketModel(model.getHid(), model.getName(), model.getType(),
				model.getNum(), model.getIcon(), model.getFrame());
        newModel.setId(model.getId());
        for (Channel channel1 : channelToZoneid.keySet()) {
            CrossData crossData = new CrossData();
            crossData.putObject(CrossDropRedPacketEnum.send, newModel);
            NettyWrite.writeXData(channel1, CrossConst.CROSS_DROPREDPACKET_SEND_CL, crossData);
        }
    }
    
    /**
     * 中央服向各个子服同步发系统红包数据
     *
     * @param channel
     * @param model
     */
    public void updateSendSysToLocal(Channel channel, DropRedPacketModel model) {
		DropRedPacketModel newModel = new DropRedPacketModel(model.getHid(), model.getName(), model.getType(),
				model.getNum(), model.getIcon(), model.getFrame());
        newModel.setId(model.getId());
        CrossData crossData = new CrossData();
        crossData.putObject(CrossDropRedPacketEnum.send, newModel);
        NettyWrite.writeXData(channel, CrossConst.CROSS_DROPREDPACKET_SEND_CL, crossData);
    }

    /**
     * 中央服向各个子服同步抢红包数据
     *
     * @param channel
     * @param model
     */
    public void updateGetToLocal(Channel channel, DropRedPacketModel model, Long hid, String name, int[][] redPacket) {
        ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
        for (Channel channel1 : channelToZoneid.keySet()) {
            CrossData crossData = new CrossData();
            crossData.putObject(CrossDropRedPacketEnum.id, model.getId());
            crossData.putObject(CrossDropRedPacketEnum.hid, hid);
            crossData.putObject(CrossDropRedPacketEnum.num, model.getNum());
            crossData.putObject(CrossDropRedPacketEnum.redPacket, redPacket);
            crossData.putObject(CrossDropRedPacketEnum.name, name);
            NettyWrite.writeXData(channel1, CrossConst.CROSS_DROPREDPACKET_GET_CL, crossData);
        }
    }

    /**
     * 中央服向各个子服同步缓存数据
     */
    public void updateCache() {
        ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
        for (Channel channel : channelToZoneid.keySet()) {
            int endTime = CrossDropRedPacketSysCache.getEndTime(channel);
            if (endTime == 0) {
                continue;
            }
            CrossData crossData = new CrossData();
            LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(channel);
            crossData.putObject(CrossDropRedPacketEnum.redpacketMap, redpacketMap);
            NettyWrite.writeXData(channel, CrossConst.CROSS_DROPREDPACKET_CON_CL, crossData);
        }
    }

    /**
     * 发系统红包
     *
     * @param sysRedPacketType
     */
    public void sendSysRedPacket(int sysRedPacketType) {
        ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> pchToZoneMap = CrossCache
                .getPchToZoneMap();
        Struct_tjhbsys_296 struct_tjhbsys_296 = Config_tjhbsys_296.getIns().get(sysRedPacketType);
        int sl = struct_tjhbsys_296.getSl();
        int[][] hb = struct_tjhbsys_296.getHb();
        for (Map.Entry<Integer, ConcurrentHashMap<Channel, List<Integer>>> entry : pchToZoneMap.entrySet()) {
        	Integer partId = entry.getKey();
        	int endTime = CrossDropRedPacketSysCache.getEndTime(partId);
        	if (endTime == 0) {
        		//活动没开，系统红包无法发放
        		continue;
        	}
			
//            long sysRedPacketId = DropRedPacketFunction.getIns().createSysRedPacketId(sysRedPacketType);
            long id = CrossDropRedPacketSysCache.getAddId(partId);
            DropRedPacketModel model = new DropRedPacketModel(0, "", sysRedPacketType, sl, 0, 0);
            model.setId(id);
            List<Integer> randomList = DropRedPacketFunction.getIns().randomRedPacketList(model.getType());
            model.setRandomList(randomList);
            LinkedHashMap<Long, DropRedPacketModel> redpacketMap = CrossDropRedPacketSysCache.getRedpacketMap(partId);
            synchronized (redpacketMap) {
                CrossDropRedPacketIO.getIns().sendRedpacketHandler(redpacketMap, model);
            }
            for (Channel channel1 : entry.getValue().keySet()) {
                CrossDropRedPacketCL.getIns().updateSendSysToLocal(channel1, model);
            }
        }
    }


}
