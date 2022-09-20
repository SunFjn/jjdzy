package com.teamtop.system.activity.ativitys.dropRedPacket.cross;

public enum CrossDropRedPacketEnum {
    redpacketMap, // 红包map
    redpacketNotTimesMap, // 红包map
    send, // 发红包
    sendState, // 更新状态,1:成功,2:跨期失败,3:重复发,0:异常
    type, // 类型
    qs, // 期数,判断期数用
    endTime,// 结束时间
    getState,// 更新状态,1:成功,2:已抢完,3:重复领取,0:异常
    id,// 红包id
    hid,// 玩家id
    name,
    num,
    redPacket,
    serverOpenTime
}
