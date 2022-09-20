package com.teamtop.system.crossFireBeacon.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossFireBeaconOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconCache;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconConst;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconFunction;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconSender;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconSysCache;
import com.teamtop.system.crossFireBeacon.model.FireBeacon;
import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconServer;
import com.teamtop.system.crossFireBeacon.model.ZoneScore;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_fhly_254;
import excel.struct.Struct_fhly_254;
import io.netty.channel.Channel;

public class CrossFireBeaconIO {

	private static CrossFireBeaconIO ins;

	private CrossFireBeaconIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossFireBeaconIO getIns() {
		if (ins == null) {
			ins = new CrossFireBeaconIO();
		}
		return ins;
	}

	/**
	 * 请求参加
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void askEnter(Channel channel, CrossData crossData) {
		try {
			int zoneId = crossData.getObject(CrossFireBeaconType.zoneId.name(), Integer.class);
			int partId = CrossCache.getPartId(channel);
			FireBeaconServer fireBeaconServer = CrossFireBeaconSysCache.getZoneDataMap(partId).get(zoneId);
			int size = fireBeaconServer.getMembers().size();
			int result = 1;
			if (size >= CrossFireBeaconConst.JOIN_LIMIT) {
				result = 0;
			}
			crossData.putObject(CrossFireBeaconType.enterResult.name(), result);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO askEnter");
		}
	}

	/**
	 * 子服向中央服获取个人积分
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getScore(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(CrossFireBeaconType.hid.name(), Long.class);
			int partId = CrossCache.getPartId(channel);
			FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			long score = 0;
			if (fireBeaconModel != null) {
				score = fireBeaconModel.getScore();
			}
			crossData.putObject(CrossFireBeaconType.score.name(), score);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO getScore");
		}
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
				return OpTaskConst.FIRE_BEACON_REFRESH_RANK;
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
			int zoneId = crossData.getObject(CrossFireBeaconType.zoneId.name(), Integer.class);
			long strength = crossData.getObject(CrossFireBeaconType.totalStrength.name(), Long.class);
			int openServerTime = crossData.getObject(CrossFireBeaconType.openServerTime.name(), Integer.class);
			if(strength==0) {
				return;
			}
			int partId = CrossCache.getPartId(channel);
			CrossFireBeaconCache fireBeaconCache = CrossFireBeaconSysCache.getFireBeaconCache(partId);
			if (fireBeaconCache == null) {
				fireBeaconCache = new CrossFireBeaconCache();
				CrossFireBeaconSysCache.setFireBeaconCache(partId, fireBeaconCache);
			}
			CrossFireBeaconSysCache.getZoneIds(partId).add(zoneId);
			CrossFireBeaconSysCache.getZoneIdStrength(partId).put(zoneId, strength);
			CrossFireBeaconSysCache.getZoneIdOpenServerTime(partId).put(zoneId, openServerTime);
			int size = CrossFireBeaconSysCache.getZoneIds(partId).size();
			LogTool.info("apply partId="+partId+"chooseZoneId=="+zoneId+", strength="+strength+", size="+size, CrossFireBeaconIO.class);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO apply");
		}
	}
	
	/**
	 * 中央服收到子服同步的领奖数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void awardUpdate(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(CrossFireBeaconType.hid.name(), Long.class);
			int partId = CrossCache.getPartId(channel);
			FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			Type type = new TypeReference<HashSet<Integer>>(){}.getType();
			HashSet<Integer> getAward = crossData.getObject(CrossFireBeaconType.getAward.name(), type);
			if(fireBeaconModel!=null) {
				fireBeaconModel.setAlreadyGet(getAward);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO awardUpdate");
		}
	}
	
	/**
	 * 收到中央服信息，广播提示
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void board(Channel channel, CrossData crossData){
		try {
			int boardType = crossData.getObject(CrossFireBeaconType.boardType.name(), Integer.class);
			Type type = new TypeReference<Object[]>(){}.getType();
			Object[] params = crossData.getObject(CrossFireBeaconType.params.name(), type);
			ChatManager.getIns().broadCast(boardType, params); // 全服广播
			if (boardType == ChatConst.FIREBEACON_START) {
				CrossFireBeaconSysCache.FireBeaconState = CrossFireBeaconConst.FB_OPEN;
			} else if (boardType == ChatConst.FIREBEACON_END) {
				CrossFireBeaconSysCache.FireBeaconState = CrossFireBeaconConst.FB_CLOSE;
			}
			sendActOpen(boardType, null);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO board");
		}
	}

	/**
	 * 更新活动开启状态
	 * 
	 * @param boardType
	 */
	public void sendActOpen(int boardType, List<Object[]> lastScore) {
		try {
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			Hero hero = null;
			long hid = 0;
			for (; iterator.hasNext();) {
				hero = iterator.next();
				if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_FIRE_BEACON)) {
					continue;
				}
				hid = hero.getId();
				if (boardType == ChatConst.FIREBEACON_START) {
					HeroFunction.getIns().sendSystemState(hid, SystemIdConst.CROSS_FIRE_BEACON,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
				} else if (boardType == ChatConst.FIREBEACON_END) {
					// 更新mvp
					if (lastScore == null) {
						lastScore = new ArrayList<>();
					}
					CrossFireBeaconSender.sendCmd_3594(hid, CrossFireBeaconSysCache.LastMvp,
							CrossFireBeaconSysCache.LastMvpIcon, CrossFireBeaconSysCache.LastMvpFrame,
							lastScore.toArray());
					HeroFunction.getIns().sendSystemState(hid, SystemIdConst.CROSS_FIRE_BEACON,
							SystemStateEnum.StateEnum.NOT_OPEN.getState());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO sendActOpen");
		}
	}

	/**
	 * 收到中央服信息，发放排行奖励
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void sendRankAward(Channel channel, CrossData crossData) {
		try {
			CrossFireBeaconSysCache.FireBeaconState = CrossFireBeaconConst.FB_CLOSE;
			LogTool.info("CrossFireBeaconIO sendRankAward start", CrossFireBeaconIO.class);
			Type type = new TypeReference<TreeSet<FireBeaconModel>>(){}.getType();
			TreeSet<FireBeaconModel> personalRank = crossData.getObject(CrossFireBeaconType.personalRank.name(), type);

			Type type1 = new TypeReference<TreeSet<FireBeaconServer>>(){}.getType();
			TreeSet<FireBeaconServer> zoneRank = crossData.getObject(CrossFireBeaconType.zoneRank.name(), type1);
			Iterator<FireBeaconServer> iterator = zoneRank.iterator();
			Type type2 = new TypeReference<Map<Long, Long>>() {
			}.getType();
			Map<Long, Long> members = crossData.getObject(CrossFireBeaconType.members.name(), type2);

			Type type3 = new TypeReference<List<ZoneScore>>() {
			}.getType();
			List<ZoneScore> lastScore = crossData.getObject(CrossFireBeaconType.lastScore.name(), type3);
			int sZoneId = crossData.getObject(CrossFireBeaconType.zoneId.name(), Integer.class);
			CrossFireBeaconSysCache.membersScoreMap.clear();
			// 参数玩家积分
			if (members != null) {
				CrossFireBeaconSysCache.membersScoreMap.putAll(members);
			}
			List<Object[]> zslist = new ArrayList<>();
			Iterator<FireBeaconServer> iterator2 = zoneRank.iterator();
			for (; iterator2.hasNext();) {
				FireBeaconServer server = iterator2.next();
				for (ZoneScore zs : lastScore) {
					if (server.getZoneId() == zs.getZoneId()) {
						server.setTotalScore(zs.getScore());
						zslist.add(new Object[] { zs.getZoneId(), zs.getScore() });
					}
				}
			}
			for (ZoneScore zs : lastScore) {
				// zslist.add(new Object[] { zs.getZoneId(), zs.getScore() });
			}
			// 个人排行奖励发放
			int winZoneId = sZoneId;
			if (zoneRank.size() > 0) {
				FireBeaconServer winServer = zoneRank.first();
				if (winServer != null) {
					winZoneId = winServer.getZoneId();
				}
			}
			int partId = CrossCache.getlocalPartId();
			CrossFireBeaconFunction.getIns().sendPersonalRankAward(personalRank, winZoneId, partId);
			// 通知玩家活动结束
			sendActOpen(ChatConst.FIREBEACON_END, zslist);
			int firstZoneId = GameProperties.getFirstZoneId();
			int ranking = 1;
			boolean isFind = false;
			for (; iterator.hasNext();) {
				int zoneId = iterator.next().getZoneId();
				if (firstZoneId == zoneId) {
					isFind = true;
					break;
				}
				ranking++;
			}
			if (isFind) {
				CrossFireBeaconFunction.getIns().sendServerRankAward(members, ranking);
			}
			LogTool.info("CrossFireBeaconIO sendRankAward finish", CrossFireBeaconIO.class);
			// 子服活动结束处理
			CrossFireBeaconFunction.getIns().actEndHandle();
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO sendRankAward");
		}
	}

	/**
	 * 收到中央服通知，设置离开CD
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void leaveCd(Channel channel, CrossData crossData) {
		try {
			Long hid = crossData.getObject(CrossFireBeaconType.hid.name(), Long.class);
			if (hid == null) {
				return;
			}
			Hero hero = HeroCache.getHero(hid);
			FireBeacon fireBeacon = hero.getFireBeacon();
			fireBeacon.setCdStartTime(TimeDateUtil.getCurrentTime());
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO leaveCd");
		}
	}

	/**
	 * 收到中央服通知，发放征收奖励
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void levyAward(Channel channel, CrossData crossData) {
		Long hid = 0L;
		try {
			hid = crossData.getObject(CrossFireBeaconType.hid.name(), Long.class);
			int cityId = crossData.getObject(CrossFireBeaconType.cityId.name(), Integer.class);
			boolean guardianState = crossData.getObject(CrossFireBeaconType.guardian.name(), Boolean.class);
			if (hid == null) {
				return;
			}
			Hero hero = HeroCache.getHero(hid);
			Struct_fhly_254 struct_fhly_254 = Config_fhly_254.getIns().getMap().get(cityId);
			int[][] reward = struct_fhly_254.getReward();
			if (guardianState) {
				reward = struct_fhly_254.getReward1();
			}
			UseAddUtil.add(hero, reward, SourceGoodConst.FIREBEACON_LEVY, UseAddUtil.getDefaultMail(), true);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO levyAward, hid=" + hid);
		}
	}

	/**
	 * 收到中央服通知，发放占领奖励
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void occupyAward(Channel channel, CrossData crossData) {
		Long hid = 0L;
		try {
			hid = crossData.getObject(CrossFireBeaconType.hid.name(), Long.class);
			int cityId = crossData.getObject(CrossFireBeaconType.cityId.name(), Integer.class);
			if (hid == null) {
				return;
			}
			Hero hero = HeroCache.getHero(hid);
			Struct_fhly_254 struct_fhly_254 = Config_fhly_254.getIns().getMap().get(cityId);
			int[][] reward = struct_fhly_254.getReward1();
			UseAddUtil.add(hero, reward, SourceGoodConst.FIREBEACON_LEVY, UseAddUtil.getDefaultMail(), true);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconIO.class, "CrossFireBeaconIO occupyAward");
		}
	}

}
