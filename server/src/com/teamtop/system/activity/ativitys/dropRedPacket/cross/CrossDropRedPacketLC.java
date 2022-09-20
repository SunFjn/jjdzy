package com.teamtop.system.activity.ativitys.dropRedPacket.cross;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketConst;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketSender;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacket;
import com.teamtop.system.activity.ativitys.dropRedPacket.model.DropRedPacketModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import excel.config.Config_tjhb_296;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_tjhb_296;
import io.netty.channel.Channel;

import java.util.List;

public class CrossDropRedPacketLC {
    private static volatile CrossDropRedPacketLC ins = null;

    public static CrossDropRedPacketLC getIns() {
        if (ins == null) {
            synchronized (CrossDropRedPacketLC.class) {
                if (ins == null) {
                    ins = new CrossDropRedPacketLC();
                }
            }
        }
        return ins;
    }

    private CrossDropRedPacketLC() {
    }

    /**
     * 发红包(子服向中央服)
     *
     * @param hero
     * @param type  红包类型
     * @param model
     */
    public void sendToCen(Hero hero, int type, DropRedPacket model) {
        if (model == null) {
            return;
        }
        DropRedPacketModel redpacketModel = null;
        try {
            CrossData crossData = new CrossData();
            Struct_tjhb_296 struct_tjhb_296 = Config_tjhb_296.getIns().get(type);
            int num = struct_tjhb_296.getSl();
            int[][] hb = struct_tjhb_296.getHb();
//            long redPacketId = DropRedPacketFunction.getIns().createRedPacketId(hero.getId(), type);
			redpacketModel = new DropRedPacketModel(hero.getId(), hero.getNameZoneid(), type, num, hero.getIcon(),
					hero.getFrame());
            crossData.putObject(CrossDropRedPacketEnum.send, redpacketModel);
            Channel crossChannel = Client_2.getIns().getCrossChannel();
            if (crossChannel == null || !crossChannel.isActive()) {
                updateSendFailHandle(hero, type);
                LogTool.warn("CrossDropRedPacketLC sendToCen channel not Active! hid:" + hero.getId()
                        + " name:" + hero.getNameZoneid() + "modelStr:" + JSON.toJSONString(model) + " redpacketModelStr:" + JSON.toJSONString(redpacketModel), this);
                return;
            }
            NettyWrite.writeXData(crossChannel, CrossConst.CROSS_DROPREDPACKET_SEND_LC, crossData,
                    new Callback() {

                        @Override
                        public void dataReci(Channel channel, CrossData crossData) {
                            // TODO Auto-generated method stub
                            OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

                                @Override
                                public void run() {
                                    try {
                                        Integer updateState = crossData
                                                .getObject(CrossDropRedPacketEnum.sendState, Integer.class);
                                        switch (updateState) {
                                            case DropRedPacketConst.SUCCESS:
                                                successSendHandle(hero, crossData);
                                                break;
                                            case DropRedPacketConst.FAILURE_EXCEPT:
                                                updateSendFailHandle(hero, type);
                                                break;
                                        }
                                    } catch (Exception e) {
                                        LogTool.error(e, this, hero.getId(), hero.getName(), "CrossDropRedPacketLC sendToCen dataReci modelStr:" + JSON.toJSONString(model) + " crossDataStr:" + JSON.toJSONString(crossData) + "type:" + type);
                                    }
                                }

                                @Override
                                public Object getSession() {
                                    // TODO Auto-generated method stub
                                    return hero.getId();
                                }
                            });
                        }
                    });
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(), "CrossDropRedPacketLC sendToCen modelStr:" + JSON.toJSONString(model) + " redpacketModelStr:" + redpacketModel == null ? "" : JSON.toJSONString(redpacketModel) + "type:" + type);
        }

    }

    /**
     * 成功处理
     *
     * @param hero
     * @param crossData
     */
    private void successSendHandle(Hero hero, CrossData crossData) {
//        int[][] redPacket = crossData
//                .getObject(CrossDropRedPacketEnum.send, int[][].class);
//        // 发放红包
//        UseAddUtil.add(hero, redPacket, SourceGoodConst.DROPREDPACKET_NEWACT_GET, UseAddUtil.getDefaultMail(),
//                true);
    }

    /**
     * 更新失败处理
     *
     * @param hero
     * @param type
     */
    private void updateSendFailHandle(Hero hero, int type) {
//        List<Integer> randomList = DropRedPacketFunction.getIns().randomRedPacketList(type);
//        int[][] redPacket = DropRedPacketFunction.getIns().randomRedPacket(type, randomList);
//        // 发放红包
//        UseAddUtil.add(hero, redPacket, SourceGoodConst.DROPREDPACKET_NEWACT_GET, UseAddUtil.getDefaultMail(),
//                true);
        LogTool.warn("CrossDropRedPacketLC updateSendFailHandle: hid:" + hero.getId() + " name:" + hero.getNameZoneid() + " type:" + type, this);
    }

    /**
     * 抢红包(子服向中央服)
     *
     * @param hero
     * @param id   红包id
     */
    public void getToCen(Hero hero, long id, DropRedPacket model) {
        try {
            CrossData crossData = new CrossData();
            crossData.putObject(CrossDropRedPacketEnum.hid, hero.getId());
            crossData.putObject(CrossDropRedPacketEnum.name, hero.getNameZoneid());
            crossData.putObject(CrossDropRedPacketEnum.id, id);
            Channel crossChannel = Client_2.getIns().getCrossChannel();
            if (crossChannel == null || !crossChannel.isActive()) {
                updateGetFailHandle(hero, DropRedPacketConst.FAILURE_EXCEPT);
                LogTool.warn("CrossDropRedPacketLC sendToCen channel not Active! hid:" + hero.getId()
                        + " name:" + hero.getNameZoneid() + "modelStr:" + JSON.toJSONString(model) + " id:" + id, this);
                return;
            }
            NettyWrite.writeXData(crossChannel, CrossConst.CROSS_DROPREDPACKET_GET_LC, crossData,
                    new Callback() {

                        @Override
                        public void dataReci(Channel channel, CrossData crossData) {
                            // TODO Auto-generated method stub
                            OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

                                @Override
                                public void run() {
                                    try {
                                        Integer updateState = crossData
                                                .getObject(CrossDropRedPacketEnum.getState, Integer.class);
                                        switch (updateState) {
                                            case DropRedPacketConst.SUCCESS:
                                                successGetHandle(hero, crossData, model);
                                                break;
                                            default:
                                                updateGetFailHandle(hero, updateState);
                                                break;
                                        }
                                    } catch (Exception e) {
                                        LogTool.error(e, this, hero.getId(), hero.getName(), "CrossDropRedPacketLC sendToCen dataReci modelStr:" + JSON.toJSONString(model) + " crossDataStr:" + JSON.toJSONString(crossData) + "id:" + id);
                                    }
                                }

                                @Override
                                public Object getSession() {
                                    // TODO Auto-generated method stub
                                    return hero.getId();
                                }
                            });
                        }
                    });
        } catch (Exception e) {
            LogTool.error(e, this, hero.getId(), hero.getName(), "CrossDropRedPacketLC getToCen modelStr:" + JSON.toJSONString(model) + "id:" + id);
        }

    }

    private void updateGetFailHandle(Hero hero, int state) {
        DropRedPacketSender.sendCmd_11376(hero.getId(), state, 0,0);
		LogTool.warn("CrossDropRedPacketLC updateGetFailHandle: hid:" + hero.getId() + " name:" + hero.getNameZoneid()
				+ " state:" + state, this);
    }

    private void successGetHandle(Hero hero, CrossData crossData, DropRedPacket model) {
        int gettedTimes = model.getGettedTimes();
        model.setGettedTimes(gettedTimes + 1);
        gettedTimes = model.getGettedTimes();
        int everydayTimes = Config_xtcs_004.getIns().get(DropRedPacketConst.EVERYDAYTIMES).getNum();
        int restTimes = everydayTimes - gettedTimes;
        int[][] redPacket = crossData
                .getObject(CrossDropRedPacketEnum.send, int[][].class);
        // 发放红包
        UseAddUtil.add(hero, redPacket, SourceGoodConst.DROPREDPACKET_NEWACT_GET, UseAddUtil.getDefaultMail(),
                false);
        DropRedPacketSender.sendCmd_11376(hero.getId(), DropRedPacketConst.SUCCESS, redPacket[0][2], restTimes);
    }


//    /**
//     * 活动开启发送期数
//     */
//    public void sendQSToCen() {
//        CrossData crossData = new CrossData();
//        Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
//        ActivityInfo activityInfo = activityMap.get(ActivitySysId.DROPREDPACKET_NEWACT);
//        int periods = activityInfo.getPeriods();
//        crossData.putObject(CrossDropRedPacketEnum.qs, periods);
//        Channel crossChannel = Client_2.getIns().getCrossChannel();
//        NettyWrite.writeXData(crossChannel, CrossConst.CROSS_DROPREDPACKET_START_LC, crossData);
//    }

    /**
     * gm清理命令
     */
    public void gmToCen() {
        CrossData crossData = new CrossData();
        Channel crossChannel = Client_2.getIns().getCrossChannel();
        NettyWrite.writeXData(crossChannel, CrossConst.CROSS_DROPREDPACKET_GM_LC, crossData);
    }

}
