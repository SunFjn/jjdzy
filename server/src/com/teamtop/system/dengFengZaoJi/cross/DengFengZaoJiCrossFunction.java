package com.teamtop.system.dengFengZaoJi.cross;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.dengFengZaoJi.DengFengZaoJiConst;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiCrossModel;
import com.teamtop.system.dengFengZaoJi.model.RankRewardCrossModel;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dfzjjs2_261;
import excel.struct.Struct_dfzjjs2_261;
import io.netty.channel.Channel;

public class DengFengZaoJiCrossFunction {
	private static DengFengZaoJiCrossFunction ins;

	private DengFengZaoJiCrossFunction() {
	}

	public static synchronized DengFengZaoJiCrossFunction getIns() {
		if (ins == null) {
			ins = new DengFengZaoJiCrossFunction();
		}
		return ins;
	}
	
	/**获得排名索引*/
	public int getRankIndex(int type,int i,int size) {
		int index = 0;
		int minNum = 0;
		int maxNum = 0;
		if(type == 0) {
			switch(i) {
			case 1: minNum=1; maxNum=20; break;
			case 2: minNum=21; maxNum=50; break;
			case 3: minNum=21; maxNum=50; break;
			case 4: minNum=51; maxNum=100; break;
			case 5: minNum=51; maxNum=100; break;
			case 6: minNum=51; maxNum=100; break;
			default:
				return -1;
			}
			index = RandomUtil.getRandomNumInAreas(minNum*size, maxNum*size)/100;
			if(index >= size) {
				index = size-1;
			}
		}else {
			if(i == 1) {
				return 0;
			}else {
				Struct_dfzjjs2_261 struct_dfzjjs2_261 = Config_dfzjjs2_261.getIns().get(i-1);
				int[][] fw = struct_dfzjjs2_261.getFw();
				int[] s = fw[0];
				minNum = s[0];
				maxNum = s[1];
				if(minNum>=size) {
					return -1;
				}else if(size>minNum && size<maxNum) {
					maxNum = size;
				}
				index = RandomUtil.getRandomNumInAreas(minNum, maxNum)-1;
			}
		}
		return index;
	}
	
	//排序
	public void sort(List<RankRewardCrossModel> list) {
		Collections.sort(list, new Comparator<RankRewardCrossModel>() {   
			public int compare(RankRewardCrossModel o1, RankRewardCrossModel o2) {    
				if(o2.getScore() > o1.getScore()){
					return 1;
				}else if(o2.getScore() < o1.getScore()){
					return -1;
				}else {
					if(o2.getStrength() > o1.getStrength()){
						return 1;
					}else if(o2.getStrength() < o1.getStrength()){
						return -1;
					}else {
						return 0;
					}
				}
			}
		}); 
	}
		
	/**筛选决赛玩家*/
	public void finalHero() {
		try {
			DengFengZaoJiCrossModel dengFengZaoJiCrossModel = DengFengZaoJiCrossCache.getCache();
			Map<Integer, List<RankRewardCrossModel>> rankRewardCrossModelMap = dengFengZaoJiCrossModel.getRankRewardMap();
			List<RankRewardCrossModel> list = rankRewardCrossModelMap.get(0);
			if(list!=null && list.size()>0) {
				List<RankRewardCrossModel> list2 = new ArrayList<RankRewardCrossModel>();
				int size = DengFengZaoJiConst.JUESAI;
				if(size > list.size()) {
					size = list.size();
				}
				for(int i=0; i<size; i++) {
					RankRewardCrossModel rankRewardCrossModel = list.get(i);
					RankRewardCrossModel newRankRewardCrossModel = RankRewardCrossModel.valueOf(0, rankRewardCrossModel.getStrength(), rankRewardCrossModel.getModel());
					list2.add(newRankRewardCrossModel);
				}
				DengFengZaoJiCrossFunction.getIns().sort(list2);
				rankRewardCrossModelMap.put(1, list2);
			}
		} catch (Exception e) {
			LogTool.error(e, DengFengZaoJiCrossFunction.class, "DengFengZaoJiCrossFunction finalHero");
		}
	}
	
	/**通知所有子服*/
	public void sendBetAwards() {
		DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
		int resetTime = cache.getResetTime();
		if(resetTime > 0) {
			Map<Integer, List<RankRewardCrossModel>> rankRewardCrossModelMap = cache.getRankRewardMap();
			List<RankRewardCrossModel> rankRewardCrossModelList = rankRewardCrossModelMap.get(1);
			if(rankRewardCrossModelList!=null && rankRewardCrossModelList.size()>0) {
				RankRewardCrossModel rankRewardCrossModel = rankRewardCrossModelList.get(0);
				long firstHid = rankRewardCrossModel.getModel().getId();
				
				CrossData crossData = new CrossData(); 
				crossData.putObject(DengFengZaoJiCrossEnum.time.name(), resetTime);
				crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), firstHid);
				ConcurrentHashMap<Channel, List<Integer>> channelToZoneidMap = CrossCache.getChannelToZoneid();
				for(Channel channel : channelToZoneidMap.keySet()) {
					if (channel == null) {
						continue;
					}
					NettyWrite.writeXData(channel, CrossConst.CROSS2LOCAL_SEND_BET_AWARDS, crossData);
				}
			}
		}
	}
	
	/**通知子服发排行奖励*/
	public void sendRankAwards(int type) {
		DengFengZaoJiCrossModel cache = DengFengZaoJiCrossCache.getCache();
		Map<Integer, List<RankRewardCrossModel>> rankRewardMap = cache.getRankRewardMap();
		List<RankRewardCrossModel> list = rankRewardMap.get(type);
		if(list != null) {
			int size = list.size();
			for(int i=0; i<size; i++) {
				RankRewardCrossModel rankRewardCrossModel = list.get(i);
				long hid = rankRewardCrossModel.getModel().getId();
				int myRank = i+1;
				
				CrossData crossData = new CrossData(); 
				crossData.putObject(DengFengZaoJiCrossEnum.hid.name(), hid);
				crossData.putObject(DengFengZaoJiCrossEnum.type.name(), type);
				crossData.putObject(DengFengZaoJiCrossEnum.myRank.name(), myRank);
				
				Channel localChannel = CrossCache.getLocalChannel(hid);
				NettyWrite.writeXData(localChannel, CrossConst.CROSS2LOCAL_SEND_RANK_AWARDS, crossData);
			}
		}
	}
}
