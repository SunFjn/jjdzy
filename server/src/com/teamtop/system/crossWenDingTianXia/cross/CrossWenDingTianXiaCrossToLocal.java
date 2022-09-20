package com.teamtop.system.crossWenDingTianXia.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossWenDingTianXiaCrossToLocal {
	private static CrossWenDingTianXiaCrossToLocal ins = null;
	
	public static CrossWenDingTianXiaCrossToLocal getIns(){
		if(ins == null){
			ins = new CrossWenDingTianXiaCrossToLocal();
		}
		return ins;
	}
	
	/**
	 * 获取所有子服服务器战力与区号
	 */
	public void getAllServerTop10StrengthCL( ){
		ConcurrentHashMap<Channel,List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
		Iterator<Entry<Channel, List<Integer>>> iterator = channelToZoneid.entrySet().iterator();
		CrossData crossData = new CrossData();
		while(iterator.hasNext()) {
			Entry<Channel, List<Integer>> next = iterator.next();
			Channel channel = next.getKey();
			NettyWrite.writeXData(channel, CrossConst.CROSS_WEN_DING_TIAN_XIA_GET_TOP10_STR_CL, crossData, new Callback() {
				
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					//数据同步到排行榜
					int firstZoneId = crossData.getObject( CrossEnum.zoneid, Integer.class);
					long rankTop10Strength = crossData.getObject( CrossEnum.totalStrength, Long.class);
					int openServerTime = crossData.getObject(CrossEnum.time, Integer.class);
					if(rankTop10Strength>0) {
						CrossWenDingTianXiaCrossFunction.getIns().refreshTop10StrengthZIDRank(rankTop10Strength, firstZoneId, openServerTime);
						LogTool.info("WDTX.GetTop10Str1.zid:"+firstZoneId+" str:"+rankTop10Strength, this);
					}else {
						//新区自己一个房间
						CrossWenDingTianXiaCrossCache.addWdtxNewServerList(firstZoneId);
						LogTool.info("WDTX.GetTop10Str2.zid:"+firstZoneId, this);
					}
				}
			});
		}
	}

	/**
	 * 通知子服活动开始
	 */
	public void sendBeginTimeAndStarCL(int zid, int time, int state, String nameYuXi){
		CrossData crossData = new CrossData();
		crossData.putObject( CrossEnum.time, time);
		crossData.putObject( CrossEnum.data1, state);
		if(nameYuXi!=null)
			crossData.putObject( CrossEnum.data2, nameYuXi);
		Channel channel = CrossCache.getChannel(zid);
		NettyWrite.writeXData(channel, CrossConst.CROSS_WEN_DING_TIAN_XIA_BEGIN_CL, crossData);
	}

	/**
	 * 通知子服发放排行奖励
	 * @param  type  0:发排行榜奖励   1斩杀奖励   2楼层奖励
	 */
	public void sendRankAwardsCL(long hid, int rank, int type, int idExcel){
		CrossData crossData = new CrossData();
		crossData.putObject( CrossEnum.hid, hid);
		crossData.putObject( CrossEnum.data1, rank);
		crossData.putObject( CrossEnum.data2, type);
		crossData.putObject( CrossEnum.data3, idExcel);
		int zid = CommonUtil.getZoneIdById(hid);
		Channel channel = CrossCache.getChannel(zid);
		NettyWrite.writeXData(channel, CrossConst.CROSS_WEN_DING_TIAN_XIA_SEND_RANK_AWARDS_CL, crossData);
	}
	
	/**
	 * 保存MVP数据
	 */
	public void saveMvpCL(int zid, String mvpName){
		CrossData crossData = new CrossData();
		crossData.putObject( CrossEnum.data1, mvpName);
		Channel channel = CrossCache.getChannel(zid);
		NettyWrite.writeXData(channel, CrossConst.CROSS_WEN_DING_TIAN_XIA_SAVE_MVP_CL, crossData);
	}

	
}






