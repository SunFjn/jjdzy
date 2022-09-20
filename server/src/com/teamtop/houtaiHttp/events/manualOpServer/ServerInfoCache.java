package com.teamtop.houtaiHttp.events.manualOpServer;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.houtaiHttp.events.buyNumZoine.BuyNumZoneidSys;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainEnum;
import com.teamtop.houtaiHttp.events.serverSelfMotion.ServerSelfMotionCache;
import com.teamtop.houtaiHttp.request.SynOpenServerInfo;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.ServerInfoDao;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class ServerInfoCache extends AbsServerEvent {

	public static List<M_ServerInfo> serverList = new ArrayList<>();

	public static Map<String, Map<Integer, M_ServerInfo>> pfServerMap = UC.reg("pfServerMap", new HashMap<>());
    
	public static BuyNumZoneidSys buyNumZoneidSys;
	
	public static BuyNumZoneidSys getBuyNumZoneidSys() {
		return buyNumZoneidSys;
	}

	public static void setBuyNumZoneidSys(BuyNumZoneidSys buyNumZoneidSys) {
		ServerInfoCache.buyNumZoneidSys = buyNumZoneidSys;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			initAndReflashServer( false);
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.BUYNUMZONEID);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				setBuyNumZoneidSys(new BuyNumZoneidSys());
			} else {
				BuyNumZoneidSys obj = ObjStrTransUtil.toObj(content, BuyNumZoneidSys.class);
				setBuyNumZoneidSys(obj);
			}
		} catch (Exception e) {
			LogTool.error(e, ServerInfoCache.class, "ServerInfoCache startServer fail");
			throw new RunServerException(e, null);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.BUYNUMZONEID);
			globalData.setContent(ObjStrTransUtil.toStr(ServerInfoCache.getBuyNumZoneidSys()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, ServerInfoCache.class, "shutdownServer has wrong");
		}
		super.shutdownServer();
	}

	/**
	 * @param	reflashServer	true:状态改变的时候同步到子服
	 */
	public static void initAndReflashServer( boolean reflashServer) throws Exception{
		List<M_ServerInfo> list = ServerInfoDao.getIns().findAll();
		if (list != null) {
			Map<String, Map<Integer, M_ServerInfo>> pfServerMapNew = new HashMap<>();
			ServerSelfMotionCache.pfMaxZoneidMap.clear();
			serverList = list;
			int size = list.size();
			M_ServerInfo m_ServerInfo = null;
			String pf = null;
			for (int i = 0; i < size; i++) {
				m_ServerInfo = list.get(i);
				pf = m_ServerInfo.getPf();
				Map<Integer, M_ServerInfo> map = pfServerMapNew.get(pf);
				if (map == null) {
					map = new HashMap<>();
					pfServerMapNew.put(pf, map);
				}
				int zoneid = m_ServerInfo.getZoneid();
				map.put(zoneid, m_ServerInfo);
				if (m_ServerInfo.getState() != ServerInfoConst.NOT_OPEN) {
					Integer zid = ServerSelfMotionCache.pfMaxZoneidMap.get(pf);
					if (zid == null) {
						zid = 0;
					}
					if (zoneid > zid) {
						ServerSelfMotionCache.pfMaxZoneidMap.put(pf, zoneid);
						if(zid>0) {
							Map<Integer, M_ServerInfo> pfMap = ServerInfoCache.pfServerMap.get(pf);
							if(pfMap!=null) {								
								M_ServerInfo oldServerInfo = pfMap.get(zid);
								if(oldServerInfo!=null&&oldServerInfo.getState()==ServerInfoConst.OPEN_NOMAL) {
									oldServerInfo.setState(ServerInfoConst.OPEN_HOT);
									try {
										ServerInfoDao.getIns().update(oldServerInfo);
									} catch (Exception e) {
										LogTool.error(e, ServerInfoCache.class, "zoneid=" + zid);
									}
								}
							}
						}
					}
					int opentime = m_ServerInfo.getOpentime();
					int currentTime = TimeDateUtil.getCurrentTime();
//					if (opentime != 1451577600) {
//						int days = TimeDateUtil.getDaysBetween(opentime, currentTime);
//						if (days >= 8) {
//							int state = m_ServerInfo.getState();
//							if (state == ServerInfoConst.OPEN_NOMAL && state != ServerInfoConst.OPEN_HOT) {
//								state = ServerInfoConst.OPEN_HOT;
//								m_ServerInfo.setState(state);
//								try {
//									ServerInfoDao.getIns().update(m_ServerInfo);
//								} catch (Exception e) {
//									LogTool.error(e, ServerInfoCache.class, "zoneid=" + zoneid);
//								}
//							}
//						} else {
//							int state = m_ServerInfo.getState();
//							if (state == ServerInfoConst.OPEN_HOT) {
//								state = ServerInfoConst.OPEN_NOMAL;
//								m_ServerInfo.setState(state);
//								try {
//									ServerInfoDao.getIns().update(m_ServerInfo);
//								} catch (Exception e) {
//									LogTool.error(e, ServerInfoCache.class, "zoneid=" + zoneid);
//								}
//							}
//						}
//					}
				}
			}
			for(String newPf : ServerSelfMotionCache.pfMaxZoneidMap.keySet()) {
				Integer zid = ServerSelfMotionCache.pfMaxZoneidMap.get(newPf);
				if(zid!=null) {
					Map<Integer, M_ServerInfo> map = pfServerMapNew.get(newPf);
					if(map!=null) {
						M_ServerInfo newServerInfo = map.get(zid);
						int state = newServerInfo.getState();
						if(state!=ServerInfoConst.OPEN_NOMAL&&state!=ServerInfoConst.NOT_OPEN&&state!=ServerInfoConst.OPEN_MAITAIN) {
							newServerInfo.setState(ServerInfoConst.OPEN_NOMAL);
							try {
								ServerInfoDao.getIns().update(newServerInfo);
							} catch (Exception e) {
								LogTool.error(e, ServerInfoCache.class, "zoneid=" + zid);
							}
						}
					}
				}
			}
			
			//检测服务器状态并同步
			if( reflashServer){
				ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
				Set<String> keySet = new HashSet<>(pfServerMapNew.keySet());
				Iterator<String> iterator = keySet.iterator();
				for (; iterator.hasNext();) {
					String pfTemp = iterator.next();
					Map<Integer, M_ServerInfo> map = pfServerMapNew.get(pfTemp);
					if (map == null)
						continue;
					Map<Integer, M_ServerInfo> oldMap = pfServerMap.get(pfTemp);
					for (Integer zoneid : map.keySet()) {
						M_ServerInfo sInfo = map.get(zoneid);
						if (oldMap != null && oldMap.containsKey(zoneid)) {
							M_ServerInfo oldInfo = oldMap.get(zoneid);
							sInfo.setPlayerNum(oldInfo.getPlayerNum());
							if (oldInfo.getState()!=ServerInfoConst.NOT_OPEN&&oldInfo.getClientversion() != null
									&& (!oldInfo.getClientversion().equals(sInfo.getClientversion()))) {
								SynOpenServerInfo.synServerInfo(sInfo);
							}
							if (oldInfo.getState() == sInfo.getState()) {
								continue;
							}
						}
						// 通知子服
						Channel channel = zoneidToChannel.get(zoneid);
						if (channel != null) {
							CrossData crossData = new CrossData();
							crossData.putObject(ServerMaintainEnum.state, sInfo.getState());
							crossData.putObject(ServerMaintainEnum.content, sInfo.getContent());
							NettyWrite.writeXData(channel, CrossConst.SERVER_MAINTAIN, crossData);
						}
					}
				}
			}

			//覆盖缓存
			ServerInfoCache.pfServerMap.clear();
			ServerInfoCache.pfServerMap.putAll(pfServerMapNew);
		}
	}
}
