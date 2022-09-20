package com.teamtop.cross.connEvent;

import com.teamtop.system.activity.ativitys.dropRedPacket.cross.CrossDropRedPacketCL;
import io.netty.channel.Channel;

public class CrossDropRedPacketConEvent extends CrossConnEvent {

    @Override
    public void conn(Channel channel) {
        CrossDropRedPacketCL.getIns().connEventToLocal(channel);
    }

}
