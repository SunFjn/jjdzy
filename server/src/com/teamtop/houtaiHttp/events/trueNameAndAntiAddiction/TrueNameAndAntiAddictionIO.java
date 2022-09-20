package com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.trueName.TrueNameSender;
import com.teamtop.system.trueName.model.TrueNameModel;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class TrueNameAndAntiAddictionIO {

	private static TrueNameAndAntiAddictionIO ins;

	private TrueNameAndAntiAddictionIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TrueNameAndAntiAddictionIO getIns() {
		if (ins == null) {
			ins = new TrueNameAndAntiAddictionIO();
		}
		return ins;
	}

	/**
	 * 更新开关状态到游戏服
	 * 
	 * @param type
	 * @param ctx
	 */
	public void updateSwitch(int type, ChannelHandlerContext ctx) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(TrueNameAndAntiAddictionEnum.type.name(), type);
			Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
			for (; iterator.hasNext();) {
				Channel channel = iterator.next();
				NettyWrite.writeXData(channel, CrossConst.TRUENAME_ANTI_SWITCH, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, TrueNameAndAntiAddictionIO.class, "TrueNameAndAntiAddictionIO updateSwitch");
		}
	}

	/**
	 * 收到中央服通知更新开关状态
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateSwitchHandle(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.TRUENAME_ANTI_SWITCH;
			int type = crossData.getObject(TrueNameAndAntiAddictionEnum.type.name(), Integer.class);
			if (type == 1) {
				TrueNameAndAntiAddictionCache.TRUENAME_SWITCH = 1;
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				Iterator<Hero> iterator = heroMap.values().iterator();
				for (; iterator.hasNext();) {
					Hero hero = iterator.next();
					if (hero.isOnline()) {
						// 通知前端 实名开关开启
						TrueNameModel trueNameModel = hero.getTrueNameModel();
						int rewardState = trueNameModel.getReward();
						int checkState = trueNameModel.getCheckState();
						int state = 0;
						if (rewardState == 1) {
							state = 2;
						} else if (checkState == 1) {
							state = 1;
						}
						TrueNameSender.sendCmd_5290(hero.getId(), 1, state);
					}
				}
			}
			if (type == 2) {
				TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH = 1;
			}
			if (type == 3) {
				TrueNameAndAntiAddictionCache.TRUENAME_SWITCH = 0;
				TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH = 0;
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				Iterator<Hero> iterator = heroMap.values().iterator();
				for (; iterator.hasNext();) {
					Hero hero = iterator.next();
					if (hero.isOnline()) {
						// 通知前端 实名开关关闭
						TrueNameModel trueNameModel = hero.getTrueNameModel();
						int rewardState = trueNameModel.getReward();
						int checkState = trueNameModel.getCheckState();
						int state = 0;
						if (rewardState == 1) {
							state = 2;
						} else if (checkState == 1) {
							state = 1;
						}
						TrueNameSender.sendCmd_5290(hero.getId(), 0, state);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, TrueNameAndAntiAddictionIO.class, "TrueNameAndAntiAddictionIO updateSwitchHandle");
		}
	}
	
	/**
	 * 连接上子服，同步实名、防沉迷开关状态到子服
	 */
	public void connSynState(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(TrueNameAndAntiAddictionEnum.truename.name(), TrueNameAndAntiAddictionCache.TRUENAME_SWITCH);
			crossData.putObject(TrueNameAndAntiAddictionEnum.anti.name(), TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH);
			NettyWrite.writeXData(channel, CrossConst.TRUENAME_ANTI_SYN, crossData);
		} catch (Exception e) {
			LogTool.error(e, TrueNameAndAntiAddictionIO.class, "TrueNameAndAntiAddictionIO connSynState");
		}
	}

	public void connSynStateHandle(Channel channel, CrossData crossData) {
		try {
			int trueNameSwitch = crossData.getObject(TrueNameAndAntiAddictionEnum.truename.name(), Integer.class);
			int antiSwitch = crossData.getObject(TrueNameAndAntiAddictionEnum.anti.name(), Integer.class);
			TrueNameAndAntiAddictionCache.TRUENAME_SWITCH = trueNameSwitch;
			TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH = antiSwitch;
		} catch (Exception e) {
			LogTool.error(e, TrueNameAndAntiAddictionIO.class, "TrueNameAndAntiAddictionIO connSynStateHandle");
		}
	}

}
