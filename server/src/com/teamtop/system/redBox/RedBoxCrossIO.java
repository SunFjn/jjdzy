package com.teamtop.system.redBox;

import java.lang.reflect.Type;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossFireBeaconOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.crossTeamKing.CrossTeamKingIO;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.redBox.cross.RedBoxCross;
import com.teamtop.system.redBox.cross.RedBoxCrossCache;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class RedBoxCrossIO {
	
	private static RedBoxCrossIO ins;
	public static synchronized RedBoxCrossIO getIns(){
		if(ins == null) {
			ins = new RedBoxCrossIO();
		}
		return ins;
	}
	
	/**
	 * 连上中央服 中央服同步所有红包信息
	 * @param channel
	 */
	public void connEventToLocal(Channel channel) {
		try {
			//CTLrank(channel);
			CTLRedBoxMapByChannel(channel);
		} catch (Exception e) {
			LogTool.error(e,  CrossTeamKingIO.class, "connEventToLocal  has wrong");
		}
	}
	
	
	public void CTLRedBoxMapByChannel(Channel channel) {
		try {
			int partId = CrossCache.getPartId(channel);
			if (!RedBoxCrossCache.getRedBoxMap().containsKey(partId)) {
				RedBoxCrossCache.getRedBoxMap().put(partId, new ConcurrentHashMap<Long, RedBoxCross>());
			}
			ConcurrentHashMap<Long, RedBoxCross> concurrentHashMap = RedBoxCrossCache.getRedBoxMap().get(partId);
			CrossData crossData = new CrossData();
			crossData.putObject(RedBoxEnum.infomap, concurrentHashMap);
			NettyWrite.writeXData(channel, CrossConst.REDBOX_ALLMAP, crossData);
		} catch (Exception e) {
			LogTool.error(e, RedBoxCrossIO.class, "CTLUpdateRedBoxByChannel has wrong");
		}
	}
	
	public void LRCRedBoxMapByChannel(Channel channel, CrossData crossData) {
		int cmd = CrossConst.REDBOX_ALLMAP;
		try {
			Type classType = new TypeReference<ConcurrentHashMap<Long, RedBoxCross>>() {
			}.getType();
			ConcurrentHashMap<Long, RedBoxCross> redBoxMap=crossData.getObject(RedBoxEnum.infomap, classType);
			RedBoxLocalCache.setRedBoxMap(redBoxMap);
			LogTool.info("LRCRedBoxMapByChannel success num:"+redBoxMap.size(), RedBoxCrossIO.class);
		} catch (Exception e) {
			LogTool.error(e, RedBoxCrossIO.class, "LRCRedBoxMapByChannel has wrong");
		}
		
	}
	
	

	public void LTCfaRedBox(Hero hero, int fanum, String boxname,RedBox redBox) {
		try {
			CrossData crossData = new CrossData();
			Channel channel = Client_2.getIns().getCrossChannel();
			
			crossData.putObject(RedBoxEnum.hid, hero.getId());
			crossData.putObject(RedBoxEnum.num, fanum);
			crossData.putObject(RedBoxEnum.name, hero.getNameZoneid());
			crossData.putObject(RedBoxEnum.boxname, boxname);
			crossData.putObject(RedBoxEnum.icon, hero.getIcon());
			crossData.putObject(RedBoxEnum.frame, hero.getFrame());
			
			if(channel == null || !channel.isOpen()) {
				LogTool.warn("LTCfaRedBox has wrong", RedBoxCrossIO.class);
				return;
			}
			LogTool.info("createRedBox begin: hid:"+hero.getId()+" fanum:"+fanum, this);
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.REDBOXACT_FA_LC,hero.getId(), crossData);
			Integer rest = writeBlockData.getObject(RedBoxEnum.faboxrest, Integer.class);
			if (rest==0) {
				//发送成功
				UseAddUtil.use(hero, GameConst.GOLDYUANBAO_COIN, (int)fanum, SourceGoodConst.GOLDYUANBAO_USE, true);
				redBox.setSendNum(redBox.getSendNum()+1);
				RedBoxSender.sendCmd_11764(hero.getId(), 0);
				return;
			}else {
				LogTool.info("createRedBox begin final: hid:"+hero.getId()+" fanum:"+fanum, this);
			}
		} catch (Exception e) {
			LogTool.error(e, RedBoxCrossIO.class, "hid:"+hero.getId()+"has wrong");
		}
		
	}
	
	public void CRLfaRedBox(Channel channel, CrossData crossData) {
		int cmd = CrossConst.REDBOXACT_FA_LC;
		try {
			long hid = crossData.getObject(RedBoxEnum.hid, Long.class);
			int fanum= crossData.getObject(RedBoxEnum.num, Integer.class);
			String name=crossData.getObject(RedBoxEnum.name, String.class);
			String boxname=crossData.getObject(RedBoxEnum.boxname, String.class);
			int icon=crossData.getObject(RedBoxEnum.icon, Integer.class);
			int frame=crossData.getObject(RedBoxEnum.frame, Integer.class);
			int partid=CrossCache.getPartId(channel);
			
			RedBoxCross createRedBox = RedBoxFunction.getIns().createRedBox(partid,hid,fanum,name,boxname,icon,frame);
			crossData.finishGet();
			if (createRedBox!=null) {
				//发送成功
				crossData.putObject(RedBoxEnum.faboxrest, 0);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			}else {
				crossData.putObject(RedBoxEnum.faboxrest, 1);
				NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
			}
			
		} catch (Exception e) {
			LogTool.error(e, RedBoxCrossIO.class, "CRLfaRedBox has wrong");
		}
		
	}
	/**
	 * 
	 * @param partId
	 * @param redBoxCross
	 * @param type 1添加红包 2红包变化
	 */
	public void  CTLRedBoxMapChange(int partId,RedBoxCross redBoxCross,int type) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(RedBoxEnum.redBoxModel, redBoxCross);
			crossData.putObject(RedBoxEnum.type, type);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			for(Channel channel:channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel, CrossConst.REDBOX_CHANGE, crossData,new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						LogTool.info("CTLRedBoxMapChange tell cross server done,matchServer:"+channel+",zoneids:"+channelToZoneid.get(channel)+"hid:"+redBoxCross.getSendid(), this);
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, RedBoxCross.class, "CTLRedBoxMapChange has wrong");
		}
	}
	
	
	public void LRCRedBoxMapChange(Channel channel, CrossData crossData) {
		int cmd = CrossConst.REDBOX_CHANGE;
		try {
			RedBoxCross redBoxCross = crossData.getObject(RedBoxEnum.redBoxModel, RedBoxCross.class);
			int type=crossData.getObject(RedBoxEnum.type, Integer.class);
			RedBoxLocalCache.getRedBoxMap().put(redBoxCross.getBoxid(), redBoxCross);
			if (type==1) {
				String name=redBoxCross.getName();
				//添加新红包 广播
				for (Hero hero:HeroCache.getHeroMap().values()) {
					RedBoxSender.sendCmd_11768(hero.getId(), name);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RedBoxCross.class, "LRCRedBoxMapChange has wrong");
		}
	}

	public void LTCGetBox(Hero hero, long boxid) {
		try {
			CrossData crossData = new CrossData();
			Channel channel = Client_2.getIns().getCrossChannel();
			crossData.putObject(RedBoxEnum.hid, hero.getId());
			crossData.putObject(RedBoxEnum.name, hero.getNameZoneid());
			crossData.putObject(RedBoxEnum.goalboxid, boxid);
			
			if(channel == null || !channel.isOpen()) {
				LogTool.warn("LTCGetBox has wrong", RedBoxCrossIO.class);
				return;
			}
			LogTool.info("LTCGetBox begin: hid:"+hero.getId()+" boxid:"+boxid, this);
			CrossData writeBlockData = NettyWrite.writeBlockData(channel, CrossConst.REDBOX_GETBOX,hero.getId(), crossData);
			Integer rest = writeBlockData.getObject(RedBoxEnum.getboxRest, Integer.class);
			if (rest==0) {
				//抢红包成功
				Integer addNum = writeBlockData.getObject(RedBoxEnum.robnum, Integer.class);
				UseAddUtil.add(hero, GameConst.YUANBAO, addNum, SourceGoodConst.REDBOX_ADD, true);
				RedBoxSender.sendCmd_11766(hero.getId(), 0, addNum);
				return;
			}else {
				LogTool.info("LTCGetBox begin final: hid:"+hero.getId()+" boxid:"+boxid,this);
			}
		} catch (Exception e) {
			LogTool.error(e, RedBoxCross.class, "LTCGetBox has wrong hid:"+hero.getId());
		}
		
	}
	
	
	public void CRLGetBox(Channel channel, CrossData crossData) {
		int cmd = CrossConst.REDBOX_GETBOX;
		try {
			OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {
				@Override
				public void run() {
					RedBoxFunction.getIns().getRedBox(channel, crossData);
				}
				@Override
				public Object getSession() {
					return OpTaskConst.REDBOX_ROB;
				}
			});
			
		} catch (Exception e) {
			LogTool.error(e, RedBoxCrossIO.class, "CRLfaRedBox has wrong");
		}
	}
	
	

}
