package com.teamtop.system.linglongge;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.linglongge.model.LingLongGeNoticeModel;
import com.teamtop.system.linglongge.model.LingLongGeRankComparator;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.system.linglongge.model.LingLongRankZoneComparator;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class LingLongGeLocalIO {
	
	private static LingLongGeLocalIO ins;
	public static synchronized LingLongGeLocalIO getIns(){
		if(ins == null) {
			ins = new LingLongGeLocalIO();
		}
		return ins;
	}
	
	
	/**
	 * 子服联接中央服成功  发送购买日志和排行
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			int partId = CrossCache.getPartId(channel);
			List<LingLongGeNoticeModel> awardNoticeList = LingLongCrossSysCache.getAwardNoticeList(partId);
			List<LingLongGeRankModel> lingLongGeRankList = LingLongCrossSysCache.getLingLongGeRankList(partId);
			List<LingLongGeRankZoneid> zoneidRankList = LingLongCrossSysCache.getZoneidRankList(partId);
			if (awardNoticeList == null) {
				awardNoticeList = new LinkedList<>();
			}
			if (lingLongGeRankList == null) {
				lingLongGeRankList = new ArrayList<>();
			}
			if (zoneidRankList == null) {
				zoneidRankList = new ArrayList<>();
			}
			crossData.putObject(CrossEnum.listmodel, awardNoticeList);
			crossData.putObject(CrossEnum.listmodel2, lingLongGeRankList);
			crossData.putObject(CrossEnum.listmodel3, zoneidRankList);
			//检查合服战区
			NettyWrite.writeXData(channel,CrossConst.CROSSS_GS_GETALLBUYINFO , crossData,new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					LogTool.info("LingLongGeLocalIO connEvent,matchServer:"+channel, this);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "LingLongGeLocalIO connEvent Exception!");
		}
	}
	
	
	public void LRCAllBuyinfo(Channel channel,CrossData crossData) {
		if (TimeDateUtil.serverOpenOverDays(7)) {
			ArrayList<LingLongGeNoticeModel> noticeList=crossData.getObject(CrossEnum.listmodel, new TypeReference<ArrayList<LingLongGeNoticeModel>>(){}.getType());
			ArrayList<LingLongGeRankModel> rankList=crossData.getObject(CrossEnum.listmodel2, new TypeReference<ArrayList<LingLongGeRankModel>>(){}.getType());
			ArrayList<LingLongGeRankZoneid> rankZoneidList=crossData.getObject(CrossEnum.listmodel3, new TypeReference<ArrayList<LingLongGeRankZoneid>>(){}.getType());
			LingLongGeSysCache.getAwardNoticeList().clear();
			LingLongGeSysCache.getLingLongGeRankList().clear();
			LingLongGeSysCache.getZoneidRankList().clear();
			LingLongGeSysCache.getLingLongGeRankList().addAll(rankList);
			LingLongGeSysCache.getAwardNoticeList().addAll(noticeList);
			LingLongGeSysCache.getZoneidRankList().addAll(rankZoneidList);
		}
	}
	
	
	
	/**
	 * 本地服上传抽奖记录
	 * @param hid
	 * @param score
	 * @param noticeList
	 */
	public void SGBuyinfo(long hid,String name,int score,ArrayList<LingLongGeNoticeModel> noticeList,int zoneid,int zonescore) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.hid, hid);
		crossData.putObject(CrossEnum.num, score);
		crossData.putObject(CrossEnum.type, zonescore);
		crossData.putObject(CrossEnum.name, name);
		crossData.putObject(CrossEnum.listmodel, noticeList);
		crossData.putObject(CrossEnum.zoneid, zoneid);
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSSS_GS_BUY, crossData);
	}
	/**
	 * 中央服收到子服上传抽奖记录 处理后广播全服
	 * @param channel
	 * @param crossData
	 */
	public void GSBuyinfo(Channel channel,CrossData crossData) {
		long hid=crossData.getObject(CrossEnum.hid, Long.class);
		int score=crossData.getObject(CrossEnum.num, Integer.class);
		int zonescore=crossData.getObject(CrossEnum.type, Integer.class);
		int zoneid=crossData.getObject(CrossEnum.zoneid, Integer.class);
		String name=crossData.getObject(CrossEnum.name, String.class);
		int partId = CrossCache.getPartId(channel);
		ArrayList<LingLongGeNoticeModel> noticeList=crossData.getObject(CrossEnum.listmodel, new TypeReference<ArrayList<LingLongGeNoticeModel>>(){}.getType());
		List<LingLongGeNoticeModel> awardNoticeList = LingLongCrossSysCache.getAwardNoticeList(partId);
		if (awardNoticeList == null) {
			awardNoticeList = new LinkedList<>();
			LingLongCrossSysCache.getpAwardNoticeList().put(partId, awardNoticeList);
		}
		for (int i = 0; i < noticeList.size(); i++) {
			LingLongGeNoticeModel noticeModel= noticeList.get(i);
			int size = awardNoticeList.size();
			if (size < LingLongGeConst.AWARD_NOTICE_NUM) {
				awardNoticeList.add(noticeModel);
			} else {
				awardNoticeList.remove(0);
				awardNoticeList.add(noticeModel);
			}
			
		}
		refreshLingLongGeRankList(hid, name, score, 1, partId);
		refreshLingLongGeZoneid(zoneid, zonescore, 1, partId);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		for(Channel localChannel:channelToZoneid.keySet()) {
			NettyWrite.writeXData(localChannel, CrossConst.CROSSS_SG_BUY, crossData);
		}
	}
	
	public void LRCBuyinfo(Channel channel,CrossData crossData) {
		if (TimeDateUtil.serverOpenOverDays(7)) {
			long hid=crossData.getObject(CrossEnum.hid, Long.class);
			int score=crossData.getObject(CrossEnum.num, Integer.class);
			int zonescore=crossData.getObject(CrossEnum.type, Integer.class);
			String name=crossData.getObject(CrossEnum.name, String.class);
			int zoneid=crossData.getObject(CrossEnum.zoneid, Integer.class);
			ArrayList<LingLongGeNoticeModel> noticeList=crossData.getObject(CrossEnum.listmodel, new TypeReference<ArrayList<LingLongGeNoticeModel>>(){}.getType());
			ArrayList<Object> nObjects=new ArrayList<>();
			for (int i = 0; i < noticeList.size(); i++) {
				LingLongGeNoticeModel lingLongGeNoticeModel=noticeList.get(i);
				int size = LingLongGeSysCache.getAwardNoticeList().size();
				if (size < LingLongGeConst.AWARD_NOTICE_NUM) {
					LingLongGeSysCache.getAwardNoticeList().add(lingLongGeNoticeModel);
				} else {
					LingLongGeSysCache.getAwardNoticeList().remove(0);
					LingLongGeSysCache.getAwardNoticeList().add(lingLongGeNoticeModel);
				}
				nObjects.add(new Object[] {lingLongGeNoticeModel.getName(),lingLongGeNoticeModel.getType(),lingLongGeNoticeModel.getAwardId(),lingLongGeNoticeModel.getNum()});
				ChatManager.getIns().broadCast(ChatConst.BROCAST_LINGLONGGE_AWARD, new Object[] {lingLongGeNoticeModel.getName(),
						lingLongGeNoticeModel.getType() == 1 ? lingLongGeNoticeModel.getAwardId() : lingLongGeNoticeModel.getType(), lingLongGeNoticeModel.getNum() }); 
			
				
			}
			if (nObjects.size()!=0) {
				for (long hid1 : HeroCache.getHeroMap().keySet()) {
					LingLongGeSender.sendCmd_2230(hid1, nObjects.toArray(),hid);// 给所有在线玩家推送获奖公告
				
				}
			}
			int partId = CrossCache.getlocalPartId();
			refreshLingLongGeRankList(hid, name, score, 0, partId);
			refreshLingLongGeZoneid(zoneid, zonescore, 0, partId);
		}
		
	}
	
	/**
	 * 刷新区服积分排名
	 * @param zoneid
	 * @param score
	 * @param type 0只是本服 1包括跨服
	 */
	public void refreshLingLongGeZoneid(final int zoneid, final int score, int type, int partId) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					List<LingLongGeRankZoneid> RankList ;
					if(type==1) {
						RankList=LingLongCrossSysCache.getZoneidRankList(partId);
						if (RankList == null) {
							RankList = new ArrayList<>();
							LingLongCrossSysCache.getpZoneidRankList().put(partId, RankList);
						}
					}else {
						RankList=LingLongGeSysCache.getZoneidRankList();
					}
					LingLongGeRankZoneid rankZoneidModel = new LingLongGeRankZoneid();
					rankZoneidModel.setZoneid(zoneid);
					rankZoneidModel.setScore(score);
					rankZoneidModel.setReachTime(TimeDateUtil.getCurrentTime());
					int indexOf = RankList.indexOf(rankZoneidModel);
					if (indexOf < 0) {
						RankList.add(rankZoneidModel);
					} else {
						LingLongGeRankZoneid lingLongGeRankZoneid = RankList.get(indexOf);
						lingLongGeRankZoneid.setScore(rankZoneidModel.getScore());
						lingLongGeRankZoneid.setReachTime(rankZoneidModel.getReachTime());
					}
					sortRankZoneid(RankList);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.LINGLONGGE_SCORERANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "refreshLingLongGeZoneid refreshLingLongGeRankList has wrong");
		}
	}
	
	public void sortRankZoneid(List<LingLongGeRankZoneid> lingLongGeRankList) {
		Collections.sort(lingLongGeRankList, new LingLongRankZoneComparator());
		Iterator<LingLongGeRankZoneid> iterator = lingLongGeRankList.iterator();
		int maxNum = LingLongGeConst.RANK_NUM;
		int i = 1;
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxNum) {
				iterator.remove();
			}
			i++;
		}
	}
	
	
	
	
	/**
	 * 刷新每日全服玩家积分排名
	 * @param hid
	 * @param name
	 * @param score
	 * @param type 0只是本服 1包括跨服
	 */
	public void refreshLingLongGeRankList(final long hid,final String name, final int score,int type, final int partId) {
		try {

			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					List<LingLongGeRankModel> lingLongGeRankList ;
					if(type==1) {
						lingLongGeRankList = LingLongCrossSysCache.getLingLongGeRankList(partId);
						if (lingLongGeRankList == null) {
							lingLongGeRankList = new ArrayList<>();
							LingLongCrossSysCache.getpLingLongGeRankList().put(partId, lingLongGeRankList);
						}
					}else {
						lingLongGeRankList=LingLongGeSysCache.getLingLongGeRankList();
					}
					LingLongGeRankModel lingLongGeRankModel = new LingLongGeRankModel();
					lingLongGeRankModel.setHid(hid);
					lingLongGeRankModel.setName(name);
					lingLongGeRankModel.setScore(score);
					lingLongGeRankModel.setReachTime(TimeDateUtil.getCurrentTime());
					int indexOf = lingLongGeRankList.indexOf(lingLongGeRankModel);
					if (indexOf < 0) {
						lingLongGeRankList.add(lingLongGeRankModel);
					} else {
						LingLongGeRankModel lingLongGeRankModel2 = lingLongGeRankList.get(indexOf);
						lingLongGeRankModel2.setScore(lingLongGeRankModel.getScore());
						lingLongGeRankModel2.setReachTime(lingLongGeRankModel.getReachTime());
					}
					sortRank(lingLongGeRankList);
				}

				@Override
				public Object getSession() {
					return OpTaskConst.LINGLONGGE_SCORERANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "refreshLingLongGeRankList refreshLingLongGeRankList has wrong");
		}
	}
	
	
	public void sortRank(List<LingLongGeRankModel> lingLongGeRankList) {
		Collections.sort(lingLongGeRankList, new LingLongGeRankComparator());
		Iterator<LingLongGeRankModel> iterator = lingLongGeRankList.iterator();
		int maxNum = LingLongGeConst.RANK_NUM;
		int i = 1;
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxNum) {
				iterator.remove();
			}
			i++;
		}
	}

}
