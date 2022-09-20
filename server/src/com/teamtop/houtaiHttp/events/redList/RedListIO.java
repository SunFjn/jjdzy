package com.teamtop.houtaiHttp.events.redList;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatSender;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.ZonesInfo;
import com.teamtop.system.event.backstage.events.backstage.redList.M_RedList;
import com.teamtop.system.event.backstage.events.backstage.redList.RedListDao;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

/**
 * 中央服通知子服拉红操作
 * @author hepl
 *
 */
public class RedListIO {
	private static RedListIO ins = null;
	
	public static RedListIO getIns(){
		if(ins == null){
			ins = new RedListIO();
		}
		return ins;
	}
	
	/**
	 * 中央服通知玩家账号相关子服红名单操作
	 * @param openid
	 * @param zoneids
	 * @param type 1拉入红名单，2删除红名单
	 */
	public void setRedList(String openid, List<ZonesInfo> zoneids, int type) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int zoneid = 0;
			Channel channel = null;
			for(int i=0; i<zoneids.size(); i++){
				zoneid = zoneids.get(i).getZoneid();
				channel = zoneidToChannel.get(zoneid);
				CrossData crossData = new CrossData();
				crossData.putObject(RedListEnum.openid, openid);
				crossData.putObject(RedListEnum.zoneid, zoneid);
				crossData.putObject(RedListEnum.type, type);
				NettyWrite.writeXData(channel, CrossConst.SET_RED_LIST, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, this,"RedListIO setRedList error! openid:"+openid);
		}
	}
	
	/**
	 * 子服根据openid对玩家进行禁言操作
	 * @param channel
	 * @param crossData
	 */
	public void setRedByOpenid(Channel channel, CrossData crossData){
		try {
			String openid = (String) crossData.getObject(RedListEnum.openid, String.class);
			Integer zoneid = (Integer) crossData.getObject(RedListEnum.zoneid, Integer.class);
			Integer type = (Integer) crossData.getObject(RedListEnum.type, Integer.class);
			Long hid = HeroDao.getIns().findHidByOpenid(openid, zoneid);
			if(hid != null){
				Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
				if(type == 1){
					//拉入红名单
					hero.setIllegalState(ChatConst.STATE_ILLEGAL_JIN_YAN);
					int time = TimeDateUtil.ONE_DAY_INT * 365 * 10;
					hero.setIllegalTimeout(TimeDateUtil.getCurrentTime() + time);
					hero.setIllegalReason(5 + "");// 原因为其他
				}else if(type == 2){
					//删除红名单
					hero.setIllegalState(ChatConst.STATE_ILLEGAL_NONE);
					hero.setIllegalTimeout(TimeDateUtil.getCurrentTime());
				}else {
					return;
				}
				if(!HeroFunction.getIns().isOnline(hid)){
					//不在线更新
					HeroDao.getIns().updateForbidInfo(hero);
				}else {
					ChatSender.sendCmd_454(hero.getId(), hero.getIllegalState());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this,"RedListIO setRedByOpenid error!");
		}
	}
	
	/**
	 * 子服登陆通知中央服验证红名单
	 * @param openid 玩家账号
	 * @param zoneid 子服区号
	 */
	public void checkRedList(String openid, int zoneid){
		Channel channel = Client_1.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(RedListEnum.openid, openid);
		crossData.putObject(RedListEnum.zoneid, zoneid);
		NettyWrite.writeXData(channel, CrossConst.CHECK_RED_LIST, crossData, new Callback() {
			
			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				String openid = (String) crossData.getObject(RedListEnum.openid, String.class);
				Integer zoneid = (Integer) crossData.getObject(RedListEnum.zoneid, Integer.class);
				Integer type = (Integer) crossData.getObject(RedListEnum.type, Integer.class);
				Long hid;
				try {
					hid = HeroDao.getIns().findHidByOpenid(openid, zoneid);
					if(hid != null){
						Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
						if(type == 1){
							hero.setIllegalState(ChatConst.STATE_ILLEGAL_JIN_YAN);
							int time = TimeDateUtil.ONE_DAY_INT * 365 * 10;
							hero.setIllegalTimeout(TimeDateUtil.getCurrentTime() + time);
							hero.setIllegalReason(5 + "");// 原因为其他
							if(!HeroFunction.getIns().isOnline(hid)){
								//不在线更新
								HeroDao.getIns().updateForbidInfo(hero);
							}else {
								ChatSender.sendCmd_454(hero.getId(), hero.getIllegalState());
							}
						}
					}
				} catch (Exception e) {
					LogTool.error(e, this,"RedListIO checkRedList callBack error!");
				}
			}
		});
	}
	
	/**
	 * 中央服验证红名单
	 * @param channel
	 * @param crossData
	 */
	public void checkRedListCross(Channel channel, CrossData crossData){
		String openid = (String) crossData.getObject(RedListEnum.openid, String.class);
		Integer zoneid = (Integer) crossData.getObject(RedListEnum.zoneid, Integer.class);
		try {
			M_RedList redList = RedListDao.getIns().findByOpenid(openid);
			if(redList != null){
				//已拉入红名单，则再通知子服禁言处理
				ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
				channel = zoneidToChannel.get(zoneid);
				crossData.putObject(RedListEnum.type, 1);//1为拉入红名单
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, this,"RedListIO checkRedListCross error!");
		}
	}
}
