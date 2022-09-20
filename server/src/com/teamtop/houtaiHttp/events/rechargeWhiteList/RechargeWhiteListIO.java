package com.teamtop.houtaiHttp.events.rechargeWhiteList;

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
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.account.Account;
import com.teamtop.system.account.AccountDao;
import com.teamtop.system.event.backstage.events.backstage.rechargeWhiteList.M_RechargeWhiteList;
import com.teamtop.system.event.backstage.events.backstage.rechargeWhiteList.RechargeWhiteListDao;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class RechargeWhiteListIO {

	private static RechargeWhiteListIO ins;

	private RechargeWhiteListIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RechargeWhiteListIO getIns() {
		if (ins == null) {
			ins = new RechargeWhiteListIO();
		}
		return ins;
	}

	/**
	 * 中央服通知子服设置重置白名单
	 * 
	 * @param targetList
	 * @param type
	 * @param playerType
	 * @throws Exception
	 */
	public void setWhiteList(List<String> targetList, int type, int playerType) throws Exception {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			Set<Integer> zoneids = new HashSet<>(zoneidToChannel.keySet());
			int zoneid = 0;
			Channel channel = null;
			CrossData crossData = new CrossData();
			crossData.putObject(RechargeWhiteListEnum.targetList, targetList);
			crossData.putObject(RechargeWhiteListEnum.type, type);
			crossData.putObject(RechargeWhiteListEnum.playerType, playerType);
			Iterator<Integer> iterator = zoneids.iterator();
			for (; iterator.hasNext();) {
				zoneid = iterator.next();
				crossData.putObject(RechargeWhiteListEnum.zoneid, zoneid);
				channel = zoneidToChannel.get(zoneid);
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.SET_RECHARGE_WHITE_LIST, crossData);
				}
			}
			// 入库
			if (playerType == 1) {
				int state = 0;
				if (type == 1) {
					state = 1;
				}
				for (String openid : targetList) {
					M_RechargeWhiteList whiteList = RechargeWhiteListDao.getIns().findByOpenid(openid);
					if (whiteList != null) {
						whiteList.setState(state);
						whiteList.setTime(TimeDateUtil.getCurrentTime());
						RechargeWhiteListDao.getIns().update(whiteList);
					} else {
						M_RechargeWhiteList data = new M_RechargeWhiteList();
						data.setAccount("");
						data.setOpenid(openid);
						data.setState(state);
						data.setTime(TimeDateUtil.getCurrentTime());
						RechargeWhiteListDao.getIns().insert(data);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListIO.class,
					"RechargeWhiteListIO setWhiteList, playerType=" + playerType + ", type=" + type);
			throw e;
		}
	}

	/**
	 * 子服收到中央服通知设置充值白名单
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void setWhiteListHandle(Channel channel, CrossData crossData) {
		int playerType = 0;// 1.账号，2.IP 是
		int type = 0;// 1.添加白名单 2.删除白名单 是
		try {
			List<String> targetList = crossData.getObject(RechargeWhiteListEnum.targetList,
					new TypeReference<List<String>>() {
					}.getType());
			type = crossData.getObject(RechargeWhiteListEnum.type, Integer.class);
			playerType = crossData.getObject(RechargeWhiteListEnum.playerType, Integer.class);
			int zoneid = crossData.getObject(RechargeWhiteListEnum.zoneid, Integer.class);
			if (targetList.size() == 0) {
				return;
			}
			int size = targetList.size();
			for (int i = 0; i < size; i++) {
				if (playerType == 1) {
					String openid = targetList.get(i);
					if (type == 1) {
						Account account = AccountDao.getIns().find(openid, zoneid);
						if (account != null) {
							account.setRechargeWhite(1);
							AccountDao.getIns().update(account);
						}
					} else if (type == 2) {
						Account account = AccountDao.getIns().find(openid, zoneid);
						if (account != null) {
							account.setRechargeWhite(0);
							AccountDao.getIns().update(account);
						}
					}
				} else if (playerType == 2) {
					String ip = targetList.get(i);
					if (type == 1) {
						RechargeWhiteListCache.addToList(ip);
					} else if (type == 2) {
						RechargeWhiteListCache.removeFromList(ip);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListIO.class,
					"RechargeWhiteListIO setWhiteListHandle， playerType=" + playerType + ", type=" + type);
		}
	}

	/**
	 * 设置充值白名单开关
	 */
	public void setSwitch(String pf, int type) {
		try {
			Map<String, Integer> pfSwitch = RechargeWhiteListCache.getPfSwitch();
			pfSwitch.put(pf, type);
			Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
			Iterator<Integer> iterator = new HashSet<>(map.keySet()).iterator();
			Channel channel = null;
			CrossData crossData = new CrossData();
			crossData.putObject(RechargeWhiteListEnum.switchType.name(), RechargeWhiteListCache.RECHARGE_WL_SWICH);
			// Iterator<Channel> iterator =
			// CrossCache.getChannelToZoneid().keySet().iterator();
			Integer zoneid = 0;
			for (; iterator.hasNext();) {
				zoneid = iterator.next();
				if (zoneid == null) {
					continue;
				}
				channel = CrossCache.getChannel(zoneid);
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.RECHARGE_WHITE_LIST_SWITCH, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListIO.class,
					"RechargeWhiteListIO setSwitch， Switch=" + RechargeWhiteListCache.RECHARGE_WL_SWICH);
			throw e;
		}
	}

	/** 收到中央服通知 更新充值白名单开关状态 */
	public void setSwitchHandle(Channel channel, CrossData crossData) {
		try {
			Integer type = crossData.getObject(RechargeWhiteListEnum.switchType.name(), Integer.class);
			if (type == null) {
				return;
			}
			RechargeWhiteListCache.RECHARGE_WL_SWICH = type;
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListIO.class,
					"RechargeWhiteListIO setSwitchHandle， Switch=" + RechargeWhiteListCache.RECHARGE_WL_SWICH);
		}
	}

	/**
	 * 检测充值白名单用户
	 * 
	 * @param openid
	 * @param zoneid
	 * @return true 是白名单用户
	 * @throws Exception
	 */
	public boolean checkRechargeWhiteList(String openid, int zoneid) throws Exception {
		Account account = AccountDao.getIns().find(openid, zoneid);
		if (RechargeWhiteListCache.RECHARGE_WL_SWICH == 2) {
			return false;
		}
		if (account != null && account.getRechargeWhite() == 1) {
			return true;
		}
		return false;
	}

}
