package com.teamtop.houtaiHttp.events.kickOutHero;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroDataSaver;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class KickOutHeroIO {

	private static KickOutHeroIO ins;

	private KickOutHeroIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KickOutHeroIO getIns() {
		if (ins == null) {
			ins = new KickOutHeroIO();
		}
		return ins;
	}

	/**
	 * 中央服通知子服踢玩家下线
	 * 
	 * @param zoneidList
	 * @param playerType
	 * @param targetList
	 */
	public void kickOutHero(List<Integer> zoneidList, int playerType, List<String> targetList) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(KickOutHeroEnum.targetList, targetList);
			crossData.putObject(KickOutHeroEnum.playerType, playerType);
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int size = zoneidList.size();
			if (size == 0) {
				zoneidList = new ArrayList<>(zoneidToChannel.keySet());
				size = zoneidList.size();
			}
			int zoneid = 0;
			for (int i = 0; i < size; i++) {
				zoneid = zoneidList.get(i);
				crossData.putObject(KickOutHeroEnum.zoneid, zoneid);
				Channel channel = zoneidToChannel.get(zoneid);
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.KICKOUTHERO, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, KickOutHeroIO.class, "KickOutHeroIO kickOutHero fail");
			throw e;
		}
	}

	/** 子服接收到通知踢玩家下线 */
	public void kickOutHeroHandle(Channel channel, CrossData crossData) {
		int playerType = 0;
		try {
			// （不填则踢全服玩家）
			List<String> targetList = crossData.getObject(KickOutHeroEnum.targetList, new TypeReference<List<String>>() {}.getType());
			// 1角色名，2角色id，3平台账号 否
			playerType = crossData.getObject(KickOutHeroEnum.playerType, Integer.class);
			// 区服号,格式 all或1;2-5;9 all表示所有区服，1;2-5;9表示1区，2到5区，9区
			int zoneid = crossData.getObject(KickOutHeroEnum.zoneid, Integer.class);
			int size = targetList.size();
			// if (size == 0) {
			// return;
			// }
			if (size == 0) {// 踢全服
//				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
//				Set<Long> hidSet = new HashSet<>(heroMap.keySet());
//				Iterator<Long> iterator = hidSet.iterator();
//				long hid = 0;
//				for (; iterator.hasNext();) {
//					hid = iterator.next();
//					kickOut(hid);
//				}
				kickOutAll();
			} else {
				for (int i = 0; i < size; i++) {
					String target = targetList.get(i);
					Long hid = 0L;
					if(playerType==1) {
						hid = HeroDao.getIns().getHidByName(target, zoneid);
					} else if (playerType == 2) {
						hid = Long.parseLong(target);
					} else if (playerType == 3) {
						hid = HeroDao.getIns().findHidByOpenid(target, zoneid);
					}
					if (hid != null) {
						kickOut(hid);
					}
				}
			}

		} catch (Exception e) {
			LogTool.error(e, KickOutHeroIO.class, "KickOutHeroIO kickOutHeroHandle fail, playerType=" + playerType);
		}
	}

	// 踢全服
	public void kickOutAll() {
		try {
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Set<Long> hidSet = new HashSet<>(heroMap.keySet());
			Iterator<Long> iterator = hidSet.iterator();
			long hid = 0;
			for (; iterator.hasNext();) {
				hid = iterator.next();
				try {
					Hero hero = heroMap.get(hid);
					if (hero == null) {
						continue;
					}
					if (HeroFunction.getIns().isOnline(hid)) {
						// 在线则强制下线
						Channel channel = hero.getChannel();
						NettyWrite.writeData(channel, new Object[] { "你已被踢下线", 3 }, HeroCmd.GC_NoticeMsg_164);
						HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
						channel.close();
					}
				} catch (Exception e) {
					LogTool.error(e, this, hid, "", "kickOutAll fail");
				}
			}
			Thread.sleep(10000);
			Iterator<Long> iterator2 = hidSet.iterator();
			for (; iterator2.hasNext();) {
				try {
					hid = iterator2.next();
					Hero hero = heroMap.get(hid);
					if (hero == null) {
						continue;
					}
					HeroDataSaver.removeClearCache(hero);
					HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
					if (hero.getChannel() == null) {
						HeroCache.removeHero(hero.getId());
					}
				} catch (Exception e) {
					LogTool.error(e, this, hid, "", "kickOutAll fail");
				}
			}
		} catch (Exception e) {
			LogTool.error(e, KickOutHeroIO.class, "KickOutHeroIO kickOutAll fail");
		}
	}

	public void kickOut(long hid) {
		try {
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Hero hero = heroMap.get(hid);
			if (hero == null) {
				return;
			}
			if (HeroFunction.getIns().isOnline(hid)) {
				// 在线则强制下线
				Channel channel = hero.getChannel();
				NettyWrite.writeData(channel, new Object[] { "你已被踢下线", 3 }, HeroCmd.GC_NoticeMsg_164);
				HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
				channel.close();
				Thread.sleep(2000);
			}
			// 清除离线缓存
//			HeroDataSaver.removeClearCache(hero);
//			HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
			if (hero.getChannel() == null) {
				HeroCache.removeHero(hero.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, KickOutHeroIO.class, "KickOutHeroIO kickOut fail, hid=" + hid);
		}
	}

}
