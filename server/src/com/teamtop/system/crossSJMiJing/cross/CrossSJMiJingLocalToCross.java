package com.teamtop.system.crossSJMiJing.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;

import io.netty.channel.Channel;

public class CrossSJMiJingLocalToCross {
	private static CrossSJMiJingLocalToCross ins = null;
	
	public static CrossSJMiJingLocalToCross getIns(){
		if(ins == null){
			ins = new CrossSJMiJingLocalToCross();
		}
		return ins;
	}
	
	/**
	 * 检查队伍是否存在
	 */
	public void checkTeamIDLC(Hero hero, int teamID, int mjID){
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hero.getId());
		crossData.putObject(CrossEnum.teamid, teamID );
		crossData.putObject(CrossEnum.FUBEN_ID, mjID );
		
		NettyWrite.writeXData(channel, CrossConst.CROSS_S_J_MI_JING_CHACK_TEAM_LC, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				long hid = crossData.getObject(CrossEnum.hid, Long.class);
				boolean result = crossData.getObject(CrossEnum.data1, Boolean.class);
				if(!result) {
					CrossSJMiJingSender.sendCmd_3774(hid, 3);
					return;
				}
				CrossFunction.askCross(hero, SystemIdConst.CROSS_S_J_MI_JING);
			}
		});
	}
	
}
