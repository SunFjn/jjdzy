package com.teamtop.system.crossTeamFuBen.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;

import io.netty.channel.Channel;

public class CrossTeamFuBenLocalToCross {
	private static CrossTeamFuBenLocalToCross ins = null;
	
	public static CrossTeamFuBenLocalToCross getIns(){
		if(ins == null){
			ins = new CrossTeamFuBenLocalToCross();
		}
		return ins;
	}
	
	/**
	 * 检查队伍是否存在
	 */
	public void checkTeamIDLC(Hero hero, int teamID, int fubenID){
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hero.getId());
		crossData.putObject(CrossEnum.teamid, teamID );
		crossData.putObject(CrossEnum.FUBEN_ID, fubenID );
		
		NettyWrite.writeXData(channel, CrossConst.CROSS_TEAM_FUBEN_CHACK_TEAM_LC, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				long hid = crossData.getObject(CrossEnum.hid, Long.class);
				boolean result = crossData.getObject(CrossEnum.data1, Boolean.class);
				if(!result) {
					CrossTeamFubenSender.sendCmd_3412(hid, 3);
					return;
				}
//				CrossTeamFubenSender.sendCmd_3412(hero.getId(), 1);
				CrossFunction.askCross(hero, SystemIdConst.FUN_CROSS_TEAM_FU_BEN);
			}
		});
			
	}
	
	/**
	 * 刷新调整次数
	 */
	public void reflashNumLC(long hid, int num, int addTimes) {
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, num);
		crossData.putObject(CrossEnum.data2, addTimes);
		NettyWrite.writeXData(channel, CrossConst.CROSS_TEAM_FUBEN_REFLASH_NUM_LC, crossData, new Callback() {
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
			}
		});
	}

	/**
	 * 刷新调整次数
	 */
	public void reflashAddTimesLC(long hid, int addTimes) {
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.data1, addTimes);
		NettyWrite.writeXData(channel, CrossConst.CROSS_TEAM_FUBEN_REFLASH_ADDTIMES_LC, crossData);
	}
}
