package com.teamtop.houtaiHttp.events.serverMaintain;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.ServerInfoDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroDataSaver;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class ServerMaintainIO {

	private static ServerMaintainIO ins;

	private ServerMaintainIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerMaintainIO getIns() {
		if (ins == null) {
			ins = new ServerMaintainIO();
		}
		return ins;
	}

	/** 中央服通知子服 维护设置 */
	public void setServerMaintain(String pf, List<Integer> zoneidList, int type, String content) {
		try {
			int state = ServerInfoConst.OPEN_MAITAIN;
			//1.设置维护 2.取消维护
			if (type == 1) {
				state = ServerInfoConst.OPEN_MAITAIN;
			} else if (type == 2) {
				state = ServerInfoConst.OPEN_NOMAL;
			}
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int size = zoneidList.size();
			if (size == 0) {
				zoneidList = new ArrayList<>(zoneidToChannel.keySet());
			}
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			Iterator<Integer> iterator = zoneidList.iterator();
			for (; iterator.hasNext();) {
				int zoneid = iterator.next();
				M_ServerInfo serverInfo = map.get(zoneid);
				if (serverInfo != null && serverInfo.getState() == -1) {
					iterator.remove();
				}
			}
			size = zoneidList.size();
			// 更新服务器列表状态
			updateState(pf, zoneidList, state, content);
			// 通知子服
			CrossData crossData = new CrossData();
			crossData.putObject(ServerMaintainEnum.state, state);
			crossData.putObject(ServerMaintainEnum.content, content);
			int zoneid = 0;
			for (int i = 0; i < size; i++) {
				zoneid = zoneidList.get(i);
				Channel channel = zoneidToChannel.get(zoneid);
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.SERVER_MAINTAIN, crossData);
					LogTool.info("SetServerMaintain.zoneid:"+zoneid+" state:"+state+" content:"+content, this);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainIO.class, "ServerMaintainIO setServerMaintain");
			throw e;
		}
	}

	public void updateState(String pf, List<Integer> zoneidList, int state, String content) {
		try {
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			if (map != null) {
				int size = zoneidList.size();
				int zoneid = 0;
				M_ServerInfo m_ServerInfo = null;
				for (int i = 0; i < size; i++) {
					zoneid = zoneidList.get(i);
					m_ServerInfo = map.get(zoneid);
					if (m_ServerInfo != null) {
						if (state == ServerInfoConst.OPEN_NOMAL) {
							int opentime = m_ServerInfo.getOpentime();
							int currentTime = TimeDateUtil.getCurrentTime();
							if (opentime != 1451577600) {
								int days = TimeDateUtil.getDaysBetween(opentime, currentTime);
								if (days >= 8) {
									state = ServerInfoConst.OPEN_HOT;
								}
							}
						}
						m_ServerInfo.setState(state);
						if (!CommonUtil.isNull(content)) {
							m_ServerInfo.setContent(content);
						}
						try {
							ServerInfoDao.getIns().update(m_ServerInfo);
						} catch (Exception e) {
							LogTool.error(e, ServerMaintainIO.class, "ServerMaintainIO updateState, zoneid=" + zoneid);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainIO.class, "ServerMaintainIO updateState");
		}
	}

	/**
	 * 更新服务信息
	 * @param pf
	 * @param m_ServerInfo
	 * @param state
	 */
	public void updateServerInfo(String pf, M_ServerInfo m_ServerInfo, int state) {
		try {
			if (m_ServerInfo != null) {
				if (state == ServerInfoConst.OPEN_NOMAL) {
					int opentime = m_ServerInfo.getOpentime();
					int currentTime = TimeDateUtil.getCurrentTime();
					if (opentime != 1451577600) {
						int days = TimeDateUtil.getDaysBetween(opentime, currentTime);
						if (days >= 8) {
							state = ServerInfoConst.OPEN_HOT;
						}
					}
				}
				m_ServerInfo.setState(state);
				try {
					ServerInfoDao.getIns().update(m_ServerInfo);
				} catch (Exception e) {
					LogTool.error(e, ServerMaintainIO.class,
							"ServerMaintainIO updateState, zoneid=" + m_ServerInfo.getZoneid());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainIO.class, "ServerMaintainIO updateState");
		}
	}

	/**
	 * 子服接收中央服通知 维护设置
	 */
	public void setServerMaintainHandle(Channel channel, CrossData crossData) {
		try {
			int state = crossData.getObject(ServerMaintainEnum.state, Integer.class);
			String content = crossData.getObject(ServerMaintainEnum.content, String.class);
			if (state == ServerInfoConst.OPEN_MAITAIN) {
				ServerMaintainCache.MAINTAIN_STATE = state;
				// 服务器维护 踢玩家下线
				// Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				// Set<Long> hidSet = new HashSet<>(heroMap.keySet());
				// Iterator<Long> iterator = hidSet.iterator();
				// long hid = 0;
				// for (; iterator.hasNext();) {
				// hid = iterator.next();
				// kickOut(hid);
				// }
			} else if (state == ServerInfoConst.OPEN_NOMAL) {
				ServerMaintainCache.MAINTAIN_STATE = state;
			} else if (state == ServerInfoConst.OPEN_HOT) {
				ServerMaintainCache.MAINTAIN_STATE = state;
			} else if (state == ServerInfoConst.OPEN_WHITELIST) {
				ServerMaintainCache.MAINTAIN_STATE = state;
			}
			if (!CommonUtil.isNull(content)) {
				ServerMaintainCache.CONTENT = content;
			}
			LogTool.info("SetServerMaintain.state:"+state+" content:"+content, this);
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainIO.class, "ServerMaintainIO setServerMaintainHandle");
		}
	}

	/*public void kickOut(long hid) {
		try {
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Hero hero = heroMap.get(hid);
			if (hero == null) {
				return;
			}
			if (HeroFunction.getIns().isOnline(hid)) {
				// 在线则强制下线
				Channel channel = hero.getChannel();
				HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
				channel.close();
				Thread.sleep(1000);
			}
			// 清除离线缓存
			HeroDataSaver.removeClearCache(hero);
			HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
			if (hero.getChannel() == null) {
				HeroCache.removeHero(hero.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainIO.class, "ServerMaintainIO kickOut fail, hid=" + hid);
		}
	}*/

}
