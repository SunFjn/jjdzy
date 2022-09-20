package com.teamtop.houtaiHttp.events.blackList;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.event.backstage.events.backstage.blackList.BlackListDao;
import com.teamtop.system.event.backstage.events.backstage.blackList.M_BlackList;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.ZonesInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroDataSaver;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

/**
 * 中央服通知子服黑名单操作
 * @author hepl
 *
 */
public class BlackListIO {
	private static BlackListIO ins = null;
	
	public static BlackListIO getIns(){
		if(ins == null){
			ins = new BlackListIO();
		}
		return ins;
	}
	
	/**
	 * 中央服通知玩家账号相关子服黑名单操作
	 * @param openid
	 * @param zoneids
	 * @param type 1拉入黑名单，2删除黑名单
	 */
	public boolean setBlackList(String openid, List<ZonesInfo> zoneids, int type, String pf) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int zoneid = 0;
			Channel channel = null;
			for(int i=0; i<zoneids.size(); i++){
				zoneid = zoneids.get(i).getZoneid();
				channel = zoneidToChannel.get(zoneid);
				CrossData crossData = new CrossData();
				crossData.putObject(BlackListEnum.openid, openid);
				crossData.putObject(BlackListEnum.zoneid, zoneid);
				crossData.putObject(BlackListEnum.type, type);
				crossData.putObject(BlackListEnum.pf, pf);
				NettyWrite.writeXData(channel, CrossConst.SET_BLACK_LIST, crossData);
			}
			M_BlackList m_BlackList = BlackListDao.getIns().findByOpenid(openid);
			int state = 0;
			if (type == 1) {
				state = 1;
			}
			if (m_BlackList == null) {
				m_BlackList = new M_BlackList();
				m_BlackList.setAccount("");
				m_BlackList.setOpenid(openid);
				m_BlackList.setState(state);
				m_BlackList.setTime(TimeDateUtil.getCurrentTime());
				BlackListDao.getIns().insert(m_BlackList);
			} else {
				m_BlackList.setState(state);
				m_BlackList.setTime(TimeDateUtil.getCurrentTime());
				BlackListDao.getIns().update(m_BlackList);
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, BlackListIO.class, "BlackListIO setBlackList error! openid:"+openid);
			return false;
		}
	}
	
	/**
	 * 子服根据openid对玩家进行封号操作
	 * @param channel
	 * @param crossData
	 */
	public void setBlackByOpenid(Channel channel, CrossData crossData){
		try {
			String openid = (String) crossData.getObject(BlackListEnum.openid, String.class);
			String pf = (String) crossData.getObject(BlackListEnum.pf, String.class);
			Integer zoneid = (Integer) crossData.getObject(BlackListEnum.zoneid, Integer.class);
			Integer type = (Integer) crossData.getObject(BlackListEnum.type, Integer.class);
			Long hid = HeroDao.getIns().findHidByOpenid(openid, zoneid);
			if(hid != null){
				Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
				if (hero.getPf().indexOf(pf) == -1) {
					LogTool.info("pf diff heroPf=" + hero.getPf() + ", pf=" + pf, BlackListIO.class);
					return;
				}
				if(type == 1){
					//拉入黑名单
					int time = TimeDateUtil.ONE_DAY_INT * 365 * 10;
					hero.setForbidState(HeroConst.STATE_FORBID_FENG_HAO);
					int currentTime = TimeDateUtil.getCurrentTime();
					hero.setForbidTimeout(currentTime + time);
					hero.setForbidReason(5 + "");// 原因为其他
					if (HeroFunction.getIns().isOnline(hid)) {
						// 在线则强制下线
						Channel myChannel = hero.getChannel();
						HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
						myChannel.close();
						Thread.sleep(2000);
					}
					// 清除离线缓存
					HeroDataSaver.removeClearCache(hero);
					HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
					if (hero.getChannel() == null) {
						HeroCache.removeHero(hero.getId());
					}
				}else if(type == 2){
					//删除黑名单
					hero.setForbidState(HeroConst.STATE_FORBID_NORMAL);
					hero.setForbidTimeout(TimeDateUtil.getCurrentTime());
				}else {
					return;
				}
				if(!HeroFunction.getIns().isOnline(hid)){
					//不在线更新
					HeroDao.getIns().updateForbidInfo(hero);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BlackListIO.class, "BlackListIO setBlackByOpenid error!");
		}
	}
	
	/**
	 * 检测是否黑名单
	 * 
	 * @param openid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public boolean checkBlackListLocal(String openid, int zoneid, Channel channel) throws Exception {
		Long hid = HeroDao.getIns().findHidByOpenid(openid, zoneid);
		if (hid != null) {
			Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
			if (hero.getForbidState() == HeroConst.STATE_FORBID_FENG_HAO) {
				int forbidTimeout = hero.getForbidTimeout();
				int currentTime = TimeDateUtil.getCurrentTime();
				if (currentTime > forbidTimeout) {
					hero.setForbidState(HeroConst.STATE_FORBID_NORMAL);
					hero.setForbidTimeout(TimeDateUtil.getCurrentTime());
				} else {
					NettyWrite.writeData(channel, new Object[] { "您的账号存在异常，请联系客服", 2 }, HeroCmd.GC_NoticeMsg_164);
					channel.close();
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * 子服登陆通知中央服验证黑名单
	 * @param openid
	 * @param zoneid
	 */
	public void checkBlackList(String openid, int zoneid, Channel myChannel) {
		Channel channel = Client_1.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(BlackListEnum.openid, openid);
		crossData.putObject(BlackListEnum.zoneid, zoneid);
		NettyWrite.writeXData(channel, CrossConst.CHECK_BLACK_LIST, crossData, new Callback() {
			
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				String openid = (String) crossData.getObject(BlackListEnum.openid, String.class);
				Integer zoneid = (Integer) crossData.getObject(BlackListEnum.zoneid, Integer.class);
				Integer type = (Integer) crossData.getObject(BlackListEnum.type, Integer.class);
				Long hid;
				try {
					hid = HeroDao.getIns().findHidByOpenid(openid, zoneid);
					if(hid != null){
						Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
						if(type == 1){
							//拉入黑名单
							int time = TimeDateUtil.ONE_DAY_INT * 365 * 10;
							hero.setForbidState(HeroConst.STATE_FORBID_FENG_HAO);
							hero.setForbidTimeout(TimeDateUtil.getCurrentTime() + time);
							hero.setForbidReason(5 + "");// 原因为其他
							if (HeroFunction.getIns().isOnline(hid)) {
								// 在线则强制下线
								Channel myChannel = hero.getChannel();
								HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
								myChannel.close();
								Thread.sleep(2000);
							}else {
								//不在线更新
								HeroDao.getIns().updateForbidInfo(hero);
							}
							// 清除离线缓存
//							HeroDataSaver.removeClearCache(hero);
//							HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
							if (hero.getChannel() == null) {
								HeroCache.removeHero(hero.getId());
							}
						}
					}
				} catch (Exception e) {
					LogTool.error(e, BlackListIO.class, "BlackListIO checkBlackList callBack error!");
				}
			}
		});
	}
	
	/**
	 * 中央服验证黑名单
	 * @param channel
	 * @param crossData
	 */
	public void checkBlackListCross(Channel channel, CrossData crossData){
		String openid = (String) crossData.getObject(BlackListEnum.openid, String.class);
		Integer zoneid = (Integer) crossData.getObject(BlackListEnum.zoneid, Integer.class);
		try {
			M_BlackList blackList = BlackListDao.getIns().findByOpenid(openid);
			if (blackList != null && blackList.getState() == 1) {
				//已拉入黑名单，则再通知子服封禁处理
				ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
				channel = zoneidToChannel.get(zoneid);
				crossData.putObject(BlackListEnum.type, 1);// 1为拉入黑名单
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			} else {
				crossData.putObject(BlackListEnum.type, -1);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, BlackListIO.class, "BlackListIO checkBlackListCross error!");
		}
	}
}
