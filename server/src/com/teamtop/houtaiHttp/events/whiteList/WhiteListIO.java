package com.teamtop.houtaiHttp.events.whiteList;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.firewall.skyeye.SkyEyeCache;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.account.Account;
import com.teamtop.system.account.AccountDao;
import com.teamtop.system.event.backstage.events.backstage.whiteList.M_WhiteList;
import com.teamtop.system.event.backstage.events.backstage.whiteList.WhiteListDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.TempData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class WhiteListIO {

	private static WhiteListIO whiteListIO;

	private WhiteListIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WhiteListIO getIns() {
		if (whiteListIO == null) {
			whiteListIO = new WhiteListIO();
		}
		return whiteListIO;
	}

	/**
	 * 中央服通知子服设置白名单
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
			crossData.putObject(WhiteListEnum.targetList.name(), targetList);
			crossData.putObject(WhiteListEnum.type.name(), type);
			crossData.putObject(WhiteListEnum.playerType.name(), playerType);
			Iterator<Integer> iterator = zoneids.iterator();
			for (; iterator.hasNext();) {
				zoneid = iterator.next();
				crossData.putObject(WhiteListEnum.zoneid.name(), zoneid);
				channel = zoneidToChannel.get(zoneid);
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.SET_WHITE_LIST, crossData);
				}
			}
			if (playerType == 1) {
				int state = 0;
				if (type == 1) {
					state = 1;
				}
				for (String openid : targetList) {
					M_WhiteList whiteList = WhiteListDao.getIns().findByOpenid(openid);
					if (whiteList != null) {
						whiteList.setState(state);
						whiteList.setTime(TimeDateUtil.getCurrentTime());
						WhiteListDao.getIns().update(whiteList);
					} else {
						M_WhiteList data = new M_WhiteList();
						data.setAccount("");
						data.setOpenid(openid);
						data.setState(state);
						data.setTime(TimeDateUtil.getCurrentTime());
						WhiteListDao.getIns().insert(data);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, WhiteListIO.class,
					"WhiteListIO setWhiteList, playerType=" + playerType + ", type=" + type);
			throw e;
		}
	}

	/**
	 * 子服收到中央服通知设置白名单
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void setWhiteListHandle(Channel channel, CrossData crossData) {
		int playerType = 0;// 1.账号，2.IP 是
		int type = 0;// 1.添加白名单 2.删除白名单 是
		try {
			List<String> targetList = crossData.getObject(WhiteListEnum.targetList, new TypeReference<List<String>>() {}.getType());
			type = crossData.getObject(WhiteListEnum.type.name(), Integer.class);
			playerType = crossData.getObject(WhiteListEnum.playerType.name(), Integer.class);
			int zoneid = crossData.getObject(WhiteListEnum.zoneid.name(), Integer.class);
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
							account.setIsmarket(1);
							AccountDao.getIns().update(account);
						}
					} else if (type == 2) {
						Account account = AccountDao.getIns().find(openid, zoneid);
						if (account != null) {
							account.setIsmarket(0);
							AccountDao.getIns().update(account);
						}
					}
				} else if (playerType == 2) {
					String ip = targetList.get(i);
					if (type == 1) {
						SkyEyeCache.addWhiteIp(ip);
					} else if (type == 2) {
						SkyEyeCache.removeWhiteIp(ip);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, WhiteListIO.class,
					"WhiteListIO setWhiteListHandle， playerType=" + playerType + ", type=" + type);
		}
	}

	/**
	 * 检测白名单用户
	 * 
	 * @param openid
	 * @param zoneid
	 * @return true 是白名单用户
	 * @throws Exception
	 */
	public boolean checkWhiteListLocal(String openid, int zoneid) throws Exception {
		Account account = AccountDao.getIns().find(openid, zoneid);
		if (account != null && account.getIsmarket() == 1) {
			LogTool.info("checkWhiteListLocal account not null", this);
			return true;
		}
		if (account == null) {
			LogTool.info("checkWhiteListLocal account null", this);
			return true;
		}
		return false;
	}

	/**
	 * 检测白名单用户
	 * 
	 * @param openid
	 * @param zoneid
	 * @return true 是白名单用户
	 * @throws Exception
	 */
	public boolean checkWhiteListLocal(Hero hero) throws Exception {
		TempData tempData = hero.getTempData();
		if(tempData!=null) {			
			Account account = tempData.getAccount();
			if (account != null && account.getIsmarket() == 1) {
				LogTool.info("checkWhiteListLocal Hero account not null", this);
				return true;
			}
			if (account == null) {
				LogTool.info("checkWhiteListLocal Hero account null", this);
				return true;
			}
		}else {
			LogTool.info("checkWhiteListLocal Hero tempData null "+hero.isOnline(), this);
		}
		return false;
	}

	/**
	 * 子服登陆通知中央服验证白名单
	 * 
	 * @param openid
	 * @param zoneid
	 */
	public void checkWhiteList(String openid, int zoneid) {
		Channel channel = Client_1.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(WhiteListEnum.openid.name(), openid);
		crossData.putObject(WhiteListEnum.zoneid.name(), zoneid);
		LogTool.info("checkWhiteList openid=" + openid, this);
		NettyWrite.writeXData(channel, CrossConst.CHECK_WHITE_LIST, crossData, new Callback() {

			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				String openid = (String) crossData.getObject(WhiteListEnum.openid.name(), String.class);
				Integer zoneid = (Integer) crossData.getObject(WhiteListEnum.zoneid.name(), Integer.class);
				Integer type = (Integer) crossData.getObject(WhiteListEnum.type.name(), Integer.class);
				try {
					if (type == 1) {
						Account account = AccountDao.getIns().find(openid, zoneid);
						if (account != null) {
							account.setIsmarket(1);
							AccountDao.getIns().update(account);
						}
					}
				} catch (Exception e) {
					LogTool.error(e, WhiteListIO.class, "WhiteListIO checkWhiteList callBack error!");
				}
			}
		});
	}

	/**
	 * 中央服验证白名单
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void checkWhiteListCross(Channel channel, CrossData crossData) {
		String openid = (String) crossData.getObject(WhiteListEnum.openid.name(), String.class);
		Integer zoneid = (Integer) crossData.getObject(WhiteListEnum.zoneid.name(), Integer.class);
		try {
			M_WhiteList whiteList = WhiteListDao.getIns().findByOpenid(openid);
			if (whiteList != null && whiteList.getState() == 1) {
				// 已拉入白名单，则再通知子服
				ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
				channel = zoneidToChannel.get(zoneid);
				crossData.putObject(WhiteListEnum.type.name(), 1);// 1为拉入白名单
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, WhiteListIO.class, "WhiteListIO checkWhiteListCross error!");
		}
	}

}
