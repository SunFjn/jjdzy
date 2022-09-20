package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class CelebrationHaoLiZhuanPanCrossToLocal {
	private static CelebrationHaoLiZhuanPanCrossToLocal ins = null;
	
	public static CelebrationHaoLiZhuanPanCrossToLocal getIns(){
		if(ins == null){
			ins = new CelebrationHaoLiZhuanPanCrossToLocal();
		}
		return ins;
	}
	
	/**
	 * 广播信息
	 */
	public void sendRecordCL(CrossData data, int partId) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		while(iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel channel = next.getKey();
			NettyWrite.writeXData(channel, CrossConst.CROSS_CELEBRATION_HAO_LI_ZHUAN_PAN_RECORD_CL, data);
		}
	}

}
