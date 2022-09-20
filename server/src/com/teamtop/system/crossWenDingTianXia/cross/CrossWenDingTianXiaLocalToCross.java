package com.teamtop.system.crossWenDingTianXia.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class CrossWenDingTianXiaLocalToCross {
	private static CrossWenDingTianXiaLocalToCross ins = null;
	
	public static CrossWenDingTianXiaLocalToCross getIns(){
		if(ins == null){
			ins = new CrossWenDingTianXiaLocalToCross();
		}
		return ins;
	}
	
	/**
	 * GM开启活动
	 */
	public void gmLC(int cmd){
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.data1, cmd);
		NettyWrite.writeXData(channel, CrossConst.CROSS_WEN_DING_TIAN_XIA_GM_GM_GM_LC, crossData);
	}
}
