package com.teamtop.system.battleGoods;

import java.util.Iterator;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossFireBeaconOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.battleGoods.cache.BattleGoodSyscache;
import com.teamtop.system.battleGoods.cache.BattleGoodsCrossPartCaChe;
import com.teamtop.system.battleGoods.cache.BattleGoodsLocalCache;
import com.teamtop.system.battleGoods.event.BattleGoodCrossSysEvent;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class BattleGoodIO {
	
	private static BattleGoodIO ins;

	private BattleGoodIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BattleGoodIO getIns() {
		if (ins == null) {
			ins = new BattleGoodIO();
		}
		return ins;
	}
	
	
	public void apply(Channel channel, CrossData crossData) {
		OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {

			@Override
			public void run() {
				applyHandle(channel, crossData);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.BATTLEGOODS_APPLY;
			}
		});
	}

	/**
	 * 子服向中央服报名参赛
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void applyHandle(Channel channel, CrossData crossData) {
		try {
			int zoneId = crossData.getObject(BattleGoodType.zoneId.name(), Integer.class);
			int partId = CrossCache.getPartId(channel);
			ConcurrentHashMap<Integer, BattleGoodsCrossPartCaChe> battleGoodsCrossPartCaChes = BattleGoodSyscache.getBattleGoodsCrossPartCaChes();
			
			if (battleGoodsCrossPartCaChes.containsKey(partId)) {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = battleGoodsCrossPartCaChes.get(partId);
				battleGoodsCrossPartCaChe.getZoneIds().add(zoneId);
				
			}else {
				BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = new BattleGoodsCrossPartCaChe();
				battleGoodsCrossPartCaChe.setPartId(partId);
				battleGoodsCrossPartCaChe.getZoneIds().add(zoneId);
				battleGoodsCrossPartCaChes.put(partId, battleGoodsCrossPartCaChe);
			}
			LogTool.info("BattleGoodIO apply partId="+partId+"chooseZoneId=="+zoneId,BattleGoodIO.class);
		} catch (Exception e) {
			LogTool.error(e, BattleGoodIO.class, "BattleGoodIO apply");
		}
	}
	/**
	 * 通知子服 玩家退出粮草抢夺的惩罚时间
	 * @param hero
	 * @param outTime
	 */
	public void noticeQuit(Hero hero, int outTime) {
		CrossData crossData = new CrossData();
		crossData.putObject(BattleGoodType.hid, hero.getId());
		crossData.putObject(BattleGoodType.outTime, outTime);
		Channel localChannel = CrossCache.getLocalChannel(hero.getId());
		NettyWrite.writeXData(localChannel, CrossConst.BATTLEGOOD_GS_OUT, crossData);
		
	}
	
	public void outBattleGoods(Channel channel, CrossData crossData) {
		int cmd= CrossConst.BATTLEGOOD_GS_OUT;
		Long hid = crossData.getObject(BattleGoodType.hid.name(), Long.class);
		int outTime=crossData.getObject(BattleGoodType.outTime.name(), Integer.class);
		BattleGoodsLocalCache.getOutTimeByHid().put(hid, outTime);
	}
	
	/**
	 * 通知所有报名子服活动 状态状态
	 * @param hero
	 * @param outTime
	 */
	public void noticeState(int state) {
		CrossData crossData = new CrossData();
		crossData.putObject(BattleGoodType.state, state);
		
		Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
		Channel tempChannel = null;
		for(int partId : keySet) {				
			ConcurrentHashMap<Integer, Channel> map = CrossCache.getZoneidToChannelByPartId(partId);
			Iterator<Channel> channelSetIterator = map.values().iterator();
			for (; channelSetIterator.hasNext();) {
				tempChannel = channelSetIterator.next();
				if (tempChannel == null) {
					continue;
				}
				NettyWrite.writeXData(tempChannel, CrossConst.BATTLEGOOD_GS_STATE, crossData);
			}
		}
	}
	/**
	 * 本地服收到 粮草抢夺活动状态
	 * @param channel
	 * @param crossData
	 */
	public void localReceiveSate(Channel channel, CrossData crossData) {
		int cmd= CrossConst.BATTLEGOOD_GS_STATE;
		int state=crossData.getObject(BattleGoodType.state.name(), Integer.class);
		BattleGoodsLocalCache.setState(state);
		for (Hero hero:HeroCache.getHeroMap().values()) {
			if (hero.isOnline()) {
				BattleGoodsSender.sendCmd_10100(hero.getId(), state);
			}
			
		}
		if (state==BattleGoodConst.ACT_STATE_2) {
			//开启广播
			ChatManager.getIns().broadCast(ChatConst.BATTLE_GOODS_OPEN,new Object[] {}); 
		}
		
	}
	/**
	 * 
	 * @param cmd
	 */
	public void gm(int cmd) {
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(BattleGoodType.cmd, cmd);
		NettyWrite.writeXData(crossChannel, CrossConst.BATTLEGOOD_SG_GM, crossData);
	}
	
	public void RLGmSate(Channel channel, CrossData crossData) {
		int cmd= CrossConst.BATTLEGOOD_SG_GM;
		int state=crossData.getObject(BattleGoodType.cmd.name(), Integer.class);
		switch (state) {
		case 1:
			//准备
			LogTool.info("BattleGood readyHandel start", BattleGoodCrossSysEvent.class);
			BattleGoodSyscache.setState(BattleGoodConst.ACT_STATE_1);
			Set<Integer> keySet = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().keySet();
			for(int partId : keySet) {				
				try {
					BattleGoodsCrossPartCaChe battleGoodsCrossPartCaChe = BattleGoodSyscache.getBattleGoodsCrossPartCaChes().get(partId);
					// 完全随机匹配
					TreeSet<Integer> zoneIdSet = battleGoodsCrossPartCaChe.getZoneIds();
					LogTool.info("BattleGood match start, zoneIdSet size = " + zoneIdSet.size()+", partId="+partId, this);
					BattleGoodCrossSysEvent.getIns().MatchByCrossPart(partId,battleGoodsCrossPartCaChe);
					LogTool.info("BattleGood match start Finish, partId="+partId, this);
				} catch (Exception e) {
					LogTool.error(e, BattleGoodCrossSysEvent.class, "BattleGoodSysEvent ready partId=" + partId);
				}
			}
			break;
		case 2:
			//开启
			LogTool.info("BattleGood act start", BattleGoodCrossSysEvent.class);
		    BattleGoodsFunction.getIns().start();
		    BattleGoodIO.getIns().noticeState(BattleGoodSyscache.getState());
			LogTool.info("BattleGood act start finish", BattleGoodCrossSysEvent.class);
			break;
		case 3:
			//开启
			LogTool.info("BattleGood act end", BattleGoodCrossSysEvent.class);
			BattleGoodsFunction.getIns().end();
		    BattleGoodIO.getIns().noticeState(BattleGoodSyscache.getState());
			LogTool.info("BattleGood act end finish", BattleGoodCrossSysEvent.class);
			break;	
		default:
			break;
		}
		
	}
	
	/**
	 * 通知相应服的mvp
	 * @param hero
	 * @param outTime
	 */
	public void noticeMVP(Integer zoneid,String mvp) {
		CrossData crossData = new CrossData();
		crossData.putObject(BattleGoodType.mvp, mvp);
		Channel channel = CrossCache.getChannel(zoneid);
		NettyWrite.writeXData(channel, CrossConst.BATTLEGOOD_GS_MVP, crossData);
	}
	
	public void localReceiveMvp(Channel channel, CrossData crossData) {
		int cmd= CrossConst.BATTLEGOOD_GS_MVP;
		String mvpName=crossData.getObject(BattleGoodType.mvp.name(), String.class);
		BattleGoodsLocalCache.setMvpName(mvpName);
		BattleGoodsLocalCache.updateGlobalData();
	}
	/**
	 * 广播 杀死boss
	 * @param zoneid
	 * @param broadId
	 */
	public void noticeKillBossBroad(int zoneid,String killername,int bossid) {
		CrossData crossData = new CrossData();
		crossData.putObject(BattleGoodType.name, killername);
		crossData.putObject(BattleGoodType.bossid, bossid);
		Channel channel = CrossCache.getChannel(zoneid);
		NettyWrite.writeXData(channel, CrossConst.BATTLEGOOD_GS_KillBossBroad, crossData);
	}
	public void reKillBossBroad(Channel channel, CrossData crossData) {
		int cmd= CrossConst.BATTLEGOOD_GS_KillBossBroad;
		String name=crossData.getObject(BattleGoodType.name.name(), String.class);
		int bossId=crossData.getObject(BattleGoodType.bossid.name(), Integer.class);
		ChatManager.getIns().broadCast(ChatConst.BATTLE_GOODS_SKILLBOSS,new Object[] {name,bossId}); 
	}
	/**
	 * 广播 93 94
	 * @param zoneid
	 * @param broadId
	 * @param fristZoneid
	 */
	public void noticeBroadById(int zoneid,int broadId,int fristZoneid) {
		CrossData crossData = new CrossData();
		crossData.putObject(BattleGoodType.broadId, broadId);
		crossData.putObject(BattleGoodType.zoneId, fristZoneid);
		Channel channel = CrossCache.getChannel(zoneid);
		NettyWrite.writeXData(channel, CrossConst.BATTLEGOOD_GS_BroadById, crossData);
		
	}
	
	public void receiveBroadById(Channel channel, CrossData crossData) {
		int cmd= CrossConst.BATTLEGOOD_GS_BroadById;
		int broadId=crossData.getObject(BattleGoodType.broadId.name(), Integer.class);
		int fristZoneid=crossData.getObject(BattleGoodType.zoneId.name(), Integer.class);
		ChatManager.getIns().broadCast(broadId,new Object[] {fristZoneid}); 
	}
	

}
