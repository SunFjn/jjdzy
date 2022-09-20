package com.teamtop.cross.connEvent;

//import com.teamtop.system.gangCompetition.GangCompetitionEvent;

import io.netty.channel.Channel;

public class GangCompetitionConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		//跨服帮战
//		GangCompetitionEvent.getIns().tellLocal(channel);
	}

}
