package com.teamtop.houtaiHttp.events.manualOpServer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.events.buyNumZoine.BuyNumZoneid;
import com.teamtop.houtaiHttp.events.buyNumZoine.BuyNumZoneidSys;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.blackList.BlackListDao;
import com.teamtop.system.event.backstage.events.backstage.blackList.M_BlackList;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.M_OldPlayer;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.OldPlayerDao;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.ZonesInfo;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.event.backstage.events.backstage.whiteList.M_WhiteList;
import com.teamtop.system.event.backstage.events.backstage.whiteList.WhiteListDao;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class ServerClientHttpEvent extends AbsHouTaiHttpEvent {

	private static ServerClientHttpEvent ins;

	private ServerClientHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerClientHttpEvent getIns() {
		if (ins == null) {
			ins = new ServerClientHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String pf = paramMap.get("pf");
			String openid = paramMap.get("openid");
			int type = Integer.parseInt(paramMap.get("type"));
			// if (CommonUtil.isNull(pf)) {
			// HttpUtil.responseFail(ctx);
			// return;
			// }
			JSONObject data = new JSONObject();
			if (type == 1) {
				handleTypeSimple(ctx, data, openid, pf);
			} else if (type == 2) {
				handleTypeAll(ctx, data, openid, pf);
			}

			HttpUtil.response(data.toJSONString(), ctx);
		} catch (Exception e) {
			LogTool.error(e, ServerClientHttpEvent.class, "ServerClientHttpEvent fail");
			HttpUtil.responseFail(ctx);
		}
	}

	public void handleTypeSimple(ChannelHandlerContext ctx, JSONObject data, String openid, String pf)
			throws Exception {
		M_WhiteList whiteList = WhiteListDao.getIns().findByOpenid(openid);
		boolean white = false;
		int whiteState = 0;
		if (whiteList != null && whiteList.getState() == 1) {
			white = true;
			whiteState = 1;
		}
		int blackState = 0;
		M_BlackList m_BlackList = BlackListDao.getIns().findByOpenid(openid);
		if (m_BlackList != null && m_BlackList.getState() == 1) {
			blackState = 1;
		}
		int newPlayer = 0;
		M_OldPlayer oldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
		if(oldPlayer==null) {
			newPlayer = 1;
		}
		List<JSONObject> infoList = new ArrayList<>();
		List<JSONObject> recentList = new ArrayList<>();
		List<Integer> recentZoneid = getRecentZoneid(openid);
		if (CommonUtil.isNull(pf)) {
			Map<Integer, M_ServerInfo> tempMap = new HashMap<>();
			int size = ServerInfoCache.pfServerMap.size();
			if (size == 1) {
				int listSize = ServerInfoCache.serverList.size();
				M_ServerInfo m_ServerInfo = null;
				// {"zoneid":2,"alias":"2区","state":2,"port":8002,"v":"V158","ip":"opt003.xmxy.2.net2"}
				for (int i = 0; i < listSize; i++) {
					m_ServerInfo = ServerInfoCache.serverList.get(i);
					// addInfo(m_ServerInfo, infoList, white);
					if (recentZoneid.contains(m_ServerInfo.getZoneid())) {
						tempMap.put(m_ServerInfo.getZoneid(), m_ServerInfo);
					}
				}
				int allSize = infoList.size();
				if (allSize > 0) {
					JSONObject jsonObject = infoList.get(allSize - 1);
					infoList.clear();
					infoList.add(jsonObject);
				}
				int rSize = recentZoneid.size();
				for (int i = 0; i < rSize; i++) {
					int zid = recentZoneid.get(i);
					if (tempMap.keySet().contains(zid)) {
						m_ServerInfo = tempMap.get(zid);
						addInfo(m_ServerInfo, recentList, white);
						if (recentList.size() > 0) {
							break;
						}
					}
				}
			} else {
				HttpUtil.responseFail(ctx);
				return;
			}
		} else {
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			if (map == null) {
				HttpUtil.response(-2, ctx);
				return;
			}
			Set<Integer> zoneidSet = new HashSet<>(map.keySet());
			List<Integer> zoneidList = new ArrayList<>(zoneidSet);
			Collections.sort(zoneidList);
			int zoneid = 0;
			M_ServerInfo m_ServerInfo = null;
			int size = zoneidList.size();
			for (int i = 0; i < size; i++) {
				zoneid = zoneidList.get(i);
				m_ServerInfo = map.get(zoneid);
				addInfo(m_ServerInfo, infoList, white);
			}
			int allSize = infoList.size();
			if (allSize > 0) {
				JSONObject jsonObject = infoList.get(allSize - 1);
				infoList.clear();
				infoList.add(jsonObject);
			}
			int rSize = recentZoneid.size();
			for (int i = 0; i < rSize; i++) {
				int zid = recentZoneid.get(i);
				if (zoneidSet.contains(zid)) {
					m_ServerInfo = map.get(zid);
					addInfo(m_ServerInfo, recentList, white);
					break;
				}
			}
		}
		if (newPlayer==1) {
			//新人
			BuyNumZoneidSys buyNumZoneidSys = ServerInfoCache.getBuyNumZoneidSys();
			Map<String, BuyNumZoneid> pfBuyNumZoneidMap = buyNumZoneidSys.getPfBuyNumZoneidMap();
			BuyNumZoneid buyNumZoneid=pfBuyNumZoneidMap.get(pf);
			if (buyNumZoneid!=null) {
				int zoneid = buyNumZoneid.getZoneid();
				//大于0的数字：指定区服
				if (zoneid>0) {
					Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
					if (map==null) {
						LogTool.warn("map==null"+pf, ServerClientHttpEvent.class);
					}
					M_ServerInfo m_ServerInfo =map.get(zoneid);
					if (m_ServerInfo==null) {
						LogTool.warn("m_ServerInfo==null"+pf+"zoneid"+zoneid, ServerClientHttpEvent.class);
					}
					JSONObject serverInfo = new JSONObject();
					serverInfo.put("zoneid", m_ServerInfo.getZoneid());
					serverInfo.put("alias", m_ServerInfo.getAlias());
					serverInfo.put("port", m_ServerInfo.getPort());
					serverInfo.put("v", 0);
					serverInfo.put("ip", m_ServerInfo.getIp());
					serverInfo.put("state", m_ServerInfo.getState());
					serverInfo.put("clientversion", m_ServerInfo.getClientversion());
					infoList.clear();
					infoList.add(serverInfo);
				}
			}else {
				LogTool.warn("buyNumZoneid!=null has wrong:"+pf, ServerClientHttpEvent.class);
			}
		}
		data.put("formal", infoList);
		data.put("recent", recentList);
		data.put("white", whiteState);
		data.put("black", blackState);
		data.put("newPlayer", newPlayer);
	}

	public void handleTypeAll(ChannelHandlerContext ctx, JSONObject data, String openid, String pf) throws Exception {
		M_WhiteList whiteList = WhiteListDao.getIns().findByOpenid(openid);
		boolean white = false;
		int whiteState = 0;
		if (whiteList != null && whiteList.getState() == 1) {
			white = true;
			whiteState = 1;
		}
		int blackState = 0;
		M_BlackList m_BlackList = BlackListDao.getIns().findByOpenid(openid);
		if (m_BlackList != null && m_BlackList.getState() == 1) {
			blackState = 1;
		}
		List<JSONObject> infoList = new ArrayList<>();
		List<JSONObject> recentList = new ArrayList<>();
		List<Integer> recentZoneid = getRecentZoneid(openid);
		int newPlayer = 0;
		if (CommonUtil.isNull(pf)) {
			Map<Integer, M_ServerInfo> tempMap = new HashMap<>();
			int size = ServerInfoCache.pfServerMap.size();
			if (size == 1) {
				int listSize = ServerInfoCache.serverList.size();
				M_ServerInfo m_ServerInfo = null;
				// {"zoneid":2,"alias":"2区","state":2,"port":8002,"v":"V158","ip":"opt003.xmxy.2.net2"}
				for (int i = 0; i < listSize; i++) {
					m_ServerInfo = ServerInfoCache.serverList.get(i);
					addInfo(m_ServerInfo, infoList, white);
					if (recentZoneid.contains(m_ServerInfo.getZoneid())) {
						tempMap.put(m_ServerInfo.getZoneid(), m_ServerInfo);
					}
				}
				int rSize = recentZoneid.size();
				for (int i = rSize - 1; i >= 0; i--) {
					int zid = recentZoneid.get(i);
					if (tempMap.keySet().contains(zid)) {
						m_ServerInfo = tempMap.get(zid);
						addInfo(m_ServerInfo, recentList, white);
					}
				}
			} else {
				HttpUtil.responseFail(ctx);
				return;
			}
		} else {
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			if (map == null) {
				HttpUtil.response(-2, ctx);
				return;
			}
			Set<Integer> zoneidSet = new HashSet<>(map.keySet());
			List<Integer> zoneidList = new ArrayList<>(zoneidSet);
			Collections.sort(zoneidList);
			int zoneid = 0;
			M_ServerInfo m_ServerInfo = null;
			int size = zoneidList.size();
			for (int i = 0; i < size; i++) {
				zoneid = zoneidList.get(i);
				m_ServerInfo = map.get(zoneid);
				addInfo(m_ServerInfo, infoList, white);
			}
			int rSize = recentZoneid.size();
			for (int i = rSize - 1; i >= 0; i--) {
				int zid = recentZoneid.get(i);
				if (zoneidSet.contains(zid)) {
					m_ServerInfo = map.get(zid);
					addInfo(m_ServerInfo, recentList, white);
				}
			}
		}
		data.put("formal", infoList);
		data.put("recent", recentList);
		data.put("white", whiteState);
		data.put("black", blackState);
		data.put("newPlayer", newPlayer);
	}

	public void addInfo(M_ServerInfo m_ServerInfo, List<JSONObject> infoList, boolean white) {
		int state = m_ServerInfo.getState();
		// if (state > -1) {
		if (!white && (state == ServerInfoConst.OPEN_WHITELIST || state == ServerInfoConst.NOT_OPEN)) {
			return;
		}
		if (!white && m_ServerInfo.getZoneid() == 9999) {
			return;
		}
		JSONObject serverInfo = new JSONObject();
		serverInfo.put("zoneid", m_ServerInfo.getZoneid());
		serverInfo.put("alias", m_ServerInfo.getAlias());
		serverInfo.put("port", m_ServerInfo.getPort());
		serverInfo.put("v", 0);
		serverInfo.put("ip", m_ServerInfo.getIp());
		serverInfo.put("state", m_ServerInfo.getState());
		serverInfo.put("clientversion", m_ServerInfo.getClientversion());
		infoList.add(serverInfo);
		// }
	}

	public List<Integer> getRecentZoneid(String openid) throws Exception {
		List<Integer> zoneidList = new ArrayList<>();
		M_OldPlayer m_OldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
		if (m_OldPlayer != null) {
			List<ZonesInfo> zoneids = new ArrayList<>(m_OldPlayer.getZoneids());
//			Collections.sort(zoneids);
			RecentServerComparator comparator = new RecentServerComparator();
			Collections.sort(zoneids, comparator);
			for (ZonesInfo info : zoneids) {
				System.err.println(info.getZoneid() + "::" + info.getLastTime());
			}
			int size = zoneids.size() - 1;
			for (int i = size; i >= 0; i--) {
				int zoneid = zoneids.get(i).getZoneid();
				if (zoneidList.contains(zoneid)) {
					continue;
				}
				zoneidList.add(zoneid);
				if (zoneidList.size() > 20) {
					break;
				}
			}
		}
		return zoneidList;
	}

}
