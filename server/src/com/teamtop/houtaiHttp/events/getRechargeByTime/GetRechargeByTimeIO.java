package com.teamtop.houtaiHttp.events.getRechargeByTime;

import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class GetRechargeByTimeIO {
	
	private static GetRechargeByTimeIO getRechargeByTimeIO;

	private GetRechargeByTimeIO() {
		
	}

	public static synchronized GetRechargeByTimeIO getIns() {
		if (getRechargeByTimeIO == null) {
			getRechargeByTimeIO = new GetRechargeByTimeIO();
		}
		return getRechargeByTimeIO;
	}
	
	
	/**
	 * 获取子服某段时间总充值
	 * @param channel
	 * @param crossData
	 */
	public void LRCGetRechargeByTime(Channel channel, CrossData crossData) {
		try {
			String pfcode = crossData.getObject(GetRechargeEnum.pfcode, String.class);
			int timeInt1=crossData.getObject(GetRechargeEnum.payTime1, Integer.class);
			int timeInt2=crossData.getObject(GetRechargeEnum.payTime2, Integer.class);
			
			/*int timeInt1 = TimeDateUtil.getTimeIntByStr(payTime1);
			int timeInt2 = TimeDateUtil.getTimeIntByStr(payTime2);*/
			
			crossData.finishGet();
			int num=0;
			if (pfcode!=null) {
				num=HeroDao.getIns().getRechargeNumByTimePfcode(timeInt1, timeInt2, pfcode);
			}else {
				num=HeroDao.getIns().getRechargeNumByTime(timeInt1, timeInt2);
			}
			LogTool.info("LRCGetRechargeByTime pfcode"+pfcode+" payTime1"+timeInt1+" payTime2"+timeInt2, GetRechargeByTimeIO.class);
			crossData.putObject(GetRechargeEnum.num,num);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, GetRechargeByTimeIO.class, "LRCGetRechargeByTime has wrong");
		}
	}

}
