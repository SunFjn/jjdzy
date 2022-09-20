package com.teamtop.system.antiAddictionSystem;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionCache;
import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionEnum;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.antiAddictionSystem.model.AntiAddictionModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.trueName.model.TrueNameModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class AntiAddictionFunction {

	private static AntiAddictionFunction ins;

	private AntiAddictionFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AntiAddictionFunction getIns() {
		if (ins == null) {
			ins = new AntiAddictionFunction();
		}
		return ins;
	}

	/**
	 * 检测
	 */
	public void checkAntiAddiction(Hero hero) {
		try {
			long hid = hero.getId();
			if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH == 0) {
				return;
			}
			TrueNameModel trueNameModel = hero.getTrueNameModel();
			if(trueNameModel==null){
				return;
			}
			int checkState = trueNameModel.getCheckState();
			if (TrueNameAndAntiAddictionCache.TRUENAME_SWITCH == 1 && checkState == 0) {
				// 提示实名验证
				// return;
			}
			AntiAddictionModel antiAddictionModel = hero.getAntiAddictionModel();
			int adult = trueNameModel.getAdult();
			if (adult == 1) {
				// 成年人不受防沉迷限制
				antiAddictionModel.setPunishState(0);
				return;
			}
			int onlineTime = antiAddictionModel.getOnlineTime();
			int lastNoticeTime = antiAddictionModel.getLastNoticeTime();
			int loginTime = hero.getLoginTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			int passTime = currentTime - loginTime;
			int totalTime = passTime + onlineTime;
			int noticePass = currentTime - lastNoticeTime;
			// 0-3小时没损失，3-5小时收益减半，5小时后收益为0
			int oneHours = TimeDateUtil.ONE_HOUR_INT;
			int twoHours = TimeDateUtil.ONE_HOUR_INT * 2;
			int threeHours = TimeDateUtil.ONE_HOUR_INT * 3;
			if (totalTime <= twoHours) {
				if (noticePass >= oneHours) {
					// 您累计在线时间已满1小时（2小时）1次/小时
					antiAddictionModel.setLastNoticeTime(currentTime);
					// AntiAddictionSystemSender.sendCmd_5312(hid, 1);
					AntiAddictionSystemSender.sendCmd_5312(hid, totalTime);
				}
				antiAddictionModel.setPunishState(0);
				return;
			}
			if (totalTime <= threeHours) {
				if (noticePass >= oneHours) {
					// 您累计在线时间已满3小时，请您下线休息，做适当身体活动
					antiAddictionModel.setLastNoticeTime(currentTime);
					// AntiAddictionSystemSender.sendCmd_5312(hid, 2);
					AntiAddictionSystemSender.sendCmd_5312(hid, totalTime);
				}
				antiAddictionModel.setPunishState(0);
				return;
			}
			int fiveHours = TimeDateUtil.ONE_HOUR_INT * 5;
			if (totalTime > threeHours && totalTime <= fiveHours) {
				// 1次/30分钟
				if (noticePass >= (oneHours / 2)) {
					// 您已经进入疲劳游戏时间，您的游戏收益将降为正常值的50％，为了您的健康，请尽快下线休息，做适当身体活动，合理安排学习生活
					antiAddictionModel.setLastNoticeTime(currentTime);
					// AntiAddictionSystemSender.sendCmd_5312(hid, 3);
					AntiAddictionSystemSender.sendCmd_5312(hid, totalTime);
				}
				antiAddictionModel.setPunishState(1);
				return;
			}
			if (totalTime > fiveHours) {
				if (noticePass >= (oneHours / 4)) {
					// 1次/15分钟
					// 您已进入不健康游戏时间，为了您的健康，请您立即下线休息。如不下线，您的身体将受到损害，您的收益已降为零，直到您的累计下线时间满5小时后，才能恢复正常。
					int noticeNum = antiAddictionModel.getNoticeNum();
					if (noticeNum < 10) {
						antiAddictionModel.setLastNoticeTime(currentTime);
						antiAddictionModel.setNoticeNum(noticeNum + 1);
						// AntiAddictionSystemSender.sendCmd_5312(hid, 4);
						AntiAddictionSystemSender.sendCmd_5312(hid, totalTime);
					}
				}
				antiAddictionModel.setPunishState(2);
				return;
			}
			antiAddictionModel.setPunishState(0);
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionFunction.class, hero.getId(), hero.getName(),
					"AntiAddictionFunction checkAntiAddiction");
		}
	}

	/**
	 * 获取惩罚削减倍数
	 * 
	 * @param hero
	 * @return 0（无收益），其他：收益/other
	 */
	public int getPunish(Hero hero) {
		try {
			if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWITCH == 0) {
				return 1;
			}
			AntiAddictionModel antiAddictionModel = hero.getAntiAddictionModel();
			int punishState = antiAddictionModel.getPunishState();
			if (punishState == 0) {
				return 1;
			}
			if (punishState == 1) {
				return 2;
			}
			if (punishState == 2) {
				return 0;
			}
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionFunction.class, hero.getId(), hero.getName(),
					"AntiAddictionFunction getPunish");
		}
		return 1;
	}

	/**
	 * 向后台中央服获取账号当前在线时间
	 */
	public void getAccountOnlineTime(Hero hero) {
		try {
			// if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWICH == 0) {
			// return;
			// }
			TrueNameModel trueNameModel = hero.getTrueNameModel();
			int adult = trueNameModel.getAdult();
			if(adult==1) {
				return;
			}
			AntiAddictionModel antiAddictionModel = hero.getAntiAddictionModel();
			CrossData crossData = new CrossData();
			crossData.putObject(TrueNameAndAntiAddictionEnum.openid.name(), hero.getOpenid());
			crossData.putObject(TrueNameAndAntiAddictionEnum.zoneid.name(), hero.getZoneid());
			Channel channel = Client_1.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.ANTI_GET_ONLINE_TIME, crossData, new Callback() {
				
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int onlineTime = crossData.getObject(TrueNameAndAntiAddictionEnum.onlineTime.name(), Integer.class);
					if (onlineTime > 0) {
						antiAddictionModel.setOnlineTime(onlineTime);
						checkAntiAddiction(hero);
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionFunction.class, hero.getId(), hero.getName(),
					"AntiAddictionFunction getAccountOnlineTime");
		}
	}

	/**
	 * 离线通知后台中央服
	 * 
	 * @param hero
	 */
	public void logoutAntiAddiction(Hero hero) {
		try {
			// if (TrueNameAndAntiAddictionCache.ANTI_ADDICTION_SWICH == 0) {
			// return;
			// }
			CrossData crossData = new CrossData();
			crossData.putObject(TrueNameAndAntiAddictionEnum.openid.name(), hero.getOpenid());
			crossData.putObject(TrueNameAndAntiAddictionEnum.zoneid.name(), hero.getZoneid());
			Channel channel = Client_1.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.ANTI_LOGOUT, crossData);
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionFunction.class, hero.getId(), hero.getName(),
					"AntiAddictionFunction logoutAntiAddiction");
		}
	}

}
