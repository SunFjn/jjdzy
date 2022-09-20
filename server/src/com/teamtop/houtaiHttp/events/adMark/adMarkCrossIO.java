package com.teamtop.houtaiHttp.events.adMark;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.event.backstage.events.backstage.adMark.AdMarkDao;
import com.teamtop.system.event.backstage.events.backstage.adMark.M_AdMark;
import com.teamtop.system.event.backstage.events.backstage.adMonitor.AdMonitorConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroDataSaver;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class adMarkCrossIO {
	private static adMarkCrossIO ins = null;

	public static adMarkCrossIO getIns() {
		if (ins == null) {
			ins = new adMarkCrossIO();
		}
		return ins;
	}

	private adMarkCrossIO() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 中央服向子服请求广告号标记处理
	 * 
	 * @param zoneid
	 * @param player
	 * @param condArray
	 * @param ctx
	 */
	public void adMark(int zoneid, int player, String[] condArray, int type, ChannelHandlerContext ctx) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			if (player == 3) {
				Iterator<Integer> iterator = zoneidToChannel.keySet().iterator();
				for (; iterator.hasNext();) {
					Integer tempZoneId = iterator.next();
					CrossData crossData = new CrossData();
					crossData.putObject(adMarkCrossEnum.zoneid, tempZoneId);
					crossData.putObject(adMarkCrossEnum.player, player);
					crossData.putObject(adMarkCrossEnum.condArray, condArray);
					// 1.标记为广告号 2.取消为广告号
					crossData.putObject(adMarkCrossEnum.type, type);
					Channel channel = zoneidToChannel.get(tempZoneId);
					NettyWrite.writeXData(channel, CrossConst.ADMARK, crossData);
					AdMarkDao dao = AdMarkDao.getDao();
					for (String openid : condArray) {
						M_AdMark m_AdMark = dao.findByOpenid(openid);
						if (m_AdMark == null) {
							m_AdMark = new M_AdMark();
							m_AdMark.setOpenid(openid);
							m_AdMark.setTime(TimeDateUtil.getCurrentTime());
							m_AdMark.setState(type);
							dao.insert(m_AdMark);
						} else {
							m_AdMark.setTime(TimeDateUtil.getCurrentTime());
							m_AdMark.setState(type);
							dao.update(m_AdMark);
						}
					}
				}
			} else {
				Channel channel = zoneidToChannel.get(zoneid);
				CrossData crossData = new CrossData();
				crossData.putObject(adMarkCrossEnum.zoneid, zoneid);
				crossData.putObject(adMarkCrossEnum.player, player);
				crossData.putObject(adMarkCrossEnum.condArray, condArray);
				// 1.标记为广告号 2.取消为广告号
				crossData.putObject(adMarkCrossEnum.type, type);
				// NettyWrite.writeXData(channel, CrossConst.ADMARK, crossData);
				NettyWrite.writeXData(channel, CrossConst.ADMARK, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
//						boolean flag = crossData.getObject(adMarkCrossEnum.callbackState, Boolean.class);
//						if (!flag) {
//							HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
//							return;
//						}
						Type jsType = new TypeReference<List<String>>() {
						}.getType();
						List<String> openIdList = crossData.getObject(adMarkCrossEnum.openid.name(), jsType);
						String[] openIdArr = new String[openIdList.size()];
						openIdList.toArray(openIdArr);
						try {
							AdMarkDao dao = AdMarkDao.getDao();
							for (String openid : openIdArr) {
								M_AdMark m_AdMark = dao.findByOpenid(openid);
								if (m_AdMark == null) {
									m_AdMark = new M_AdMark();
									m_AdMark.setOpenid(openid);
									m_AdMark.setTime(TimeDateUtil.getCurrentTime());
									m_AdMark.setState(type);
									dao.insert(m_AdMark);
								} else {
									m_AdMark.setTime(TimeDateUtil.getCurrentTime());
									m_AdMark.setState(type);
									dao.update(m_AdMark);
								}
							}
						} catch (Exception e) {
							LogTool.error(e, adMarkCrossIO.class, "adMarkCrossIO AdMarkDao");
						}
						Iterator<Integer> iterator = zoneidToChannel.keySet().iterator();
						for (; iterator.hasNext();) {
							Integer tempZoneId = iterator.next();
							if (zoneid == tempZoneId) {
								 continue;
							}
							LogTool.info("adMarkCrossIO tempZoneId="+tempZoneId, adMarkCrossIO.class);
							CrossData data = new CrossData();
							data.putObject(adMarkCrossEnum.zoneid, tempZoneId);
							data.putObject(adMarkCrossEnum.player, 3);
							data.putObject(adMarkCrossEnum.condArray, openIdArr);
							// 1.标记为广告号 2.取消为广告号
							data.putObject(adMarkCrossEnum.type, type);
							Channel tempChannel = zoneidToChannel.get(tempZoneId);
							NettyWrite.writeXData(tempChannel, CrossConst.ADMARK, data);
						}
						HoutaiResponseUtil.responseSucc(ctx);
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, adMarkCrossIO.class, "adMarkCrossIO adMark, ");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}

	}

	/**
	 * 子服进行广告号标记处理
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void adMarkHandle(Channel channel, CrossData crossData) {
		int zoneid = crossData.getObject(adMarkCrossEnum.zoneid, Integer.class);
		// 1角色名，2角色id，3平台账号
		int player = crossData.getObject(adMarkCrossEnum.player, Integer.class);
		String[] condArray = crossData.getObject(adMarkCrossEnum.condArray, String[].class);
		// 1.标记为广告号 2.取消为广告号 3.标记广告号嫌疑人 4.取消为广告号嫌疑人
		int type = crossData.getObject(adMarkCrossEnum.type, Integer.class);
		LogTool.info("adMarkCrossIO player="+player+", type="+type+", zoneid="+zoneid, adMarkCrossIO.class);
		long hid = 0;
		try {
			List<String> opList = new ArrayList<>();
			for (String condStr : condArray) {
				if (player == 1) {
					hid = HeroDao.getIns().getHidByName(condStr, zoneid);
				} else if (player == 2) {
					hid = Long.parseLong(condStr);
				} else if (player == 3) {
					Long hidByOpenid = HeroDao.getIns().findHidByOpenid(condStr, zoneid);
					if(hidByOpenid==null) {
						continue;
					}
					hid = hidByOpenid;
				}
				if (hid == 0) {
					continue;
				}
				Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
				if (type == 1) {
					hero.setAdState(AdMonitorConst.STATE_4);
					hero.setIllegalState(ChatConst.STATE_ILLEGAL_JIN_OTHER);
					int time = TimeDateUtil.ONE_DAY_INT * 365 * 10;
					hero.setIllegalTimeout(TimeDateUtil.getCurrentTime() + time);
					hero.setIllegalReason("广告号标记");
				} else if (type == 3) {
					hero.setAdState(AdMonitorConst.STATE_1);
				} else {
					hero.setAdState(AdMonitorConst.STATE_0);
					hero.setIllegalState(ChatConst.STATE_ILLEGAL_NONE);
					hero.setIllegalReason(0 + "");
				}
				opList.add(hero.getOpenid());
				HeroDataSaver.addLogoutSaver(hero);
			}
			if (player != 3) {
				crossData.putObject(adMarkCrossEnum.callbackState, true);
				crossData.putObject(adMarkCrossEnum.openid, opList);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			crossData.putObject(adMarkCrossEnum.callbackState, false);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			LogTool.error(e, adMarkCrossIO.class, "adMarkCrossIO adMarkHandle, ");
		}
	}

	/**
	 * 子服请求中央服获取广告号状态
	 * @param hero
	 */
	public void checkAdMark(Hero hero) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(adMarkCrossEnum.openid.name(), hero.getOpenid());
			Channel channel = Client_1.getIns().getCrossChannel();
			NettyWrite.writeXData(channel, CrossConst.CHECK_ADMARK, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int type = crossData.getObject(adMarkCrossEnum.type, Integer.class);
					LogTool.info("adMarkCrossIO checkAdMark type=" + type, adMarkCrossIO.class);
					if (type == -1) {
						return;
					}
					if (type == 1) {
						hero.setAdState(AdMonitorConst.STATE_4);
						hero.setIllegalState(ChatConst.STATE_ILLEGAL_JIN_OTHER);
						int time = TimeDateUtil.ONE_DAY_INT * 365 * 10;
						hero.setIllegalTimeout(TimeDateUtil.getCurrentTime() + time);
						hero.setIllegalReason("广告号标记");
					} else if (type == 3) {
						hero.setAdState(AdMonitorConst.STATE_1);
					} else {
						hero.setAdState(AdMonitorConst.STATE_0);
						hero.setIllegalState(ChatConst.STATE_ILLEGAL_NONE);
						hero.setIllegalReason(0 + "");
					}
					HeroDataSaver.addLogoutSaver(hero);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, adMarkCrossIO.class, "adMarkCrossIO checkAdMark");
		}
	}

	/**
	 * 中央服返回广告号状态给子服
	 * @param channel
	 * @param crossData
	 */
	public void getAdMark(Channel channel, CrossData crossData) {
		try {
			String openid = crossData.getObject(adMarkCrossEnum.openid.name(), String.class);
			AdMarkDao dao = AdMarkDao.getDao();
			M_AdMark m_AdMark = dao.findByOpenid(openid);
			LogTool.info("adMarkCrossIO getAdMark openid=" + openid, adMarkCrossIO.class);
			int type = -1;
			if (m_AdMark != null) {
				type = m_AdMark.getState();
			}
			LogTool.info("adMarkCrossIO getAdMark type=" + type, adMarkCrossIO.class);
			crossData.putObject(adMarkCrossEnum.type.name(), type);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, adMarkCrossIO.class, "adMarkCrossIO getAdMark");
		}
	}

}
