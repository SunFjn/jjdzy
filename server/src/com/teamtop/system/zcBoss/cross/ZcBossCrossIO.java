package com.teamtop.system.zcBoss.cross;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveEnum;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.zcBoss.ZcBoss;
import com.teamtop.system.zcBoss.ZcBossConst;
import com.teamtop.system.zcBoss.ZcBossHero;
import com.teamtop.system.zcBoss.ZcBossLocalCache;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bosszc_010;
import excel.struct.Struct_bosszc_010;
import io.netty.channel.Channel;

public class ZcBossCrossIO {
	
	private static ZcBossCrossIO ins;
	
	public static synchronized ZcBossCrossIO getIns(){
		if(ins == null) {
			ins = new ZcBossCrossIO();
		}
		return ins;
	}
	/**
	 * 子服链接中央服事件 (中央服向子服发数据)
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		try {
			int partId = CrossCache.getPartId(channel);
			ConcurrentHashMap<Integer, ZcBoss> bossMap = ZcBossCrossCache.getIns().getBossMap(partId);
			CrossData crossData = new CrossData();
			crossData.putObject(ZcBossEnum.zcBossMap, bossMap);
			NettyWrite.writeXData(channel, CrossConst.CROSS_ZCBOSS_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "CrossBossFunction connEvent Exception!");
		}
		
	}
	/**
	 * 子服获取
	 * @param channel
	 * @param data
	 */
	public void getZcBossMapCL(Channel channel,CrossData crossData) {
		try {
			ConcurrentHashMap<Integer, ZcBoss> 	bossMap=crossData.getObject(ZcBossEnum.zcBossMap, new TypeReference<ConcurrentHashMap<Integer, ZcBoss>>(){}.getType());
		    ZcBossLocalCache.getIns().setCrossZcBossMap(bossMap);
		} catch (Exception e) {
			LogTool.error(e, this, "getZcBossMapCL has wrong!");
		}
	}
	
	public void noticeState(ConcurrentHashMap<Integer, ZcBoss> bossMap, int partId) {
		CrossData crossData = new CrossData();
		crossData.putObject(ZcBossEnum.zcBossMap, bossMap);
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
		for(Channel channel:channelToZoneid.keySet()) {
			NettyWrite.writeXData(channel, CrossConst.CROSS_ZCBOSS_SATE_CL, crossData);
		}
	}
	
	public void getZcBossStateCL(Channel channel,CrossData crossData) {
		ConcurrentHashMap<Integer, ZcBoss> 	bossMap=crossData.getObject(ZcBossEnum.zcBossMap, new TypeReference<ConcurrentHashMap<Integer, ZcBoss>>(){}.getType());
		ConcurrentHashMap<Integer, ZcBoss> crossZcBossMap = ZcBossLocalCache.getIns().getCrossZcBossMap();
		for (int key: bossMap.keySet()) {
			ZcBoss zcBoss = bossMap.get(key);
			crossZcBossMap.put(key, zcBoss);
			LogTool.info("zcCrossbossId:"+ zcBoss.getIndex()+" state:"+zcBoss.getBossLastState()+" changeTime:"+TimeDateUtil.printTime(zcBoss.getSwitchStateTime()), ZcBossCrossIO.class);
			if (zcBoss.getBossLastState()==ZcBossConst.STATUS_PRE) {
				Struct_bosszc_010 struct_bosszc_010 = Config_bosszc_010.getIns().get(key);
				int[][] tiaojian = struct_bosszc_010.getTiaojian();
				//广播
				ChatManager.getIns().boardCastByReborn(ChatConst.ZCBOSS_BROAD1, new Object[] {key}, tiaojian[0][0], tiaojian[0][1]);
				//提示
				Map<Long, Hero> roleCache = HeroCache.getHeroMap();
				Iterator<Hero> it = roleCache.values().iterator();
				while(it.hasNext()){
					Hero role = it.next();
					int rebornlv = role.getRebornlv();
					if (rebornlv>=tiaojian[0][0]&&rebornlv<=tiaojian[0][1]) {
						GlobalSender.sendCmd_264(role.getId(),SystemIdConst.CROSS_ZCBOSS, key, 1);
					}
				}
			}
		}
	}
	
	public void noticeQuit(Hero hero,int bossindex) {
		CrossData crossData = new CrossData();
		crossData.putObject(ZcBossEnum.hid, hero.getId());
		crossData.putObject(ZcBossEnum.bossindex, bossindex);
		Channel localChannel = CrossCache.getLocalChannel(hero.getId());
		NettyWrite.writeXData(localChannel, CrossConst.CROSS_ZCBOSS_QUIT, crossData);
	}
	
	
	public void getNoticeQuit(Channel channel,CrossData crossData) {
		Long hid = crossData.getObject(ZcBossEnum.hid, Long.class);
		int bossIndex = crossData.getObject(ZcBossEnum.bossindex, Integer.class);
		Hero hero = HeroCache.getHero(hid);
		if (hero!=null) {
			ZcBossHero zcBossHero=hero.getZcBossHero();
			if (zcBossHero.getJoinTime()==null) {
				zcBossHero.setJoinTime(new HashMap<>());
			}
			zcBossHero.getJoinTime().put(bossIndex, TimeDateUtil.getCurrentTime());
		}
	}
	
	
	public void noticeAddFristKill(Hero hero,int bossindex) {
		CrossData crossData = new CrossData();
		crossData.putObject(ZcBossEnum.hid, hero.getId());
		crossData.putObject(ZcBossEnum.bossindex, bossindex);
		Channel localChannel = CrossCache.getLocalChannel(hero.getId());
		NettyWrite.writeXData(localChannel, CrossConst.CROSS_ZCBOSS_NOTICE_KILLER, crossData);
	}
	
	public void getAddFristKill(Channel channel,CrossData crossData) {
		try {
			Long hid = crossData.getObject(ZcBossEnum.hid, Long.class);
			int bossIndex = crossData.getObject(ZcBossEnum.bossindex, Integer.class);
			Hero hero = HeroCache.getHero(hid);
			if (hero != null) {
				ZcBossHero zcBossHero = hero.getZcBossHero();
				if (zcBossHero.getHasKill() == null) {
					zcBossHero.setHasKill(new TreeSet<Integer>());
				}
				zcBossHero.getHasKill().add(bossIndex);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "getAddFristKill has wrong!");
		}
	}
	
	public void noticeAddKill(Hero hero) {
		CrossData crossData = new CrossData();
		crossData.putObject(ZcBossEnum.hid, hero.getId());
		Channel localChannel = CrossCache.getLocalChannel(hero.getId());
		NettyWrite.writeXData(localChannel, CrossConst.CROSS_ZCBOSS_KILLER, crossData);
	}

	public void getAddKill(Channel channel, CrossData crossData) {
		try {
			Long hid = crossData.getObject(ZcBossEnum.hid, Long.class);
			Hero hero = HeroCache.getHero(hid);
			// 三国战令
			WarOrderActiveFunction.getIns().updateTaskNum(hero, WarOrderActiveEnum.GOAL_3, 1);
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_3, 1);
		} catch (Exception e) {
			LogTool.error(e, this, "getAddKill has wrong!");
		}
	}
}
