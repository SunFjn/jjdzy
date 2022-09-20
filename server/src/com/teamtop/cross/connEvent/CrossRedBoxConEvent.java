package com.teamtop.cross.connEvent;


import com.teamtop.system.redBox.RedBoxCrossIO;

import io.netty.channel.Channel;

public class CrossRedBoxConEvent extends CrossConnEvent{
	
	@Override
    public void conn(Channel channel) {
        RedBoxCrossIO.getIns().connEventToLocal(channel);
    }

}
