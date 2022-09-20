package com.teamtop.system.event.backstage.events.backstage.oldPlayer;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

/**
 * 滚服玩家子服逻辑处理类
 * @author hepl
 *
 */
public class OldPlayerIO {
	private static OldPlayerIO ins = null;
	
	public static OldPlayerIO getIns(){
		if(ins == null){
			ins = new OldPlayerIO();
		}
		return ins;
	}
	
	private Logger logger = LoggerFactory.getLogger(OldPlayerIO.class);
	
	/**
	 * 子服中判断滚服玩家
	 * @param hero
	 */
	public void checkOldPlayer(Hero hero){
		try {
			int isOldPlayer = hero.getIsOldPlayer();
			if(isOldPlayer == HeroConst.OLD_PLAYER_STATE_0){
				//待查状态则通知中央服检查
				final long hid = hero.getId();
				Channel crossChannel = Client_1.getIns().getCrossChannel();
				CrossData crossData = new CrossData();
				crossData.putObject(OldPlayerEnum.openid, hero.getOpenid());
				crossData.putObject(OldPlayerEnum.zoneid, hero.getZoneid());
				crossData.putObject(OldPlayerEnum.createIp, hero.getCreateIp());
				crossData.putObject(OldPlayerEnum.update, 0);
				
				NettyWrite.writeXData(crossChannel, CrossConst.CHECK_OLD_PLAYER, crossData, new Callback() {
					
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						//中央服传回滚服玩家状态
						Integer state = (Integer) crossData.getObject(OldPlayerEnum.isOldState, Integer.class);
						if(state != null){
							if(HeroFunction.getIns().isOnline(hid)){
								Hero hero = HeroCache.getHero(hid);
								hero.setIsOldPlayer(state);
							}else {
								//不在线则更新玩家滚服状态
								try {
									HeroDao.getIns().updateOldPlayer(hid, state);
								} catch (Exception e) {
									LogTool.error(e, this,"Callback updateOldPlayer error!");
								}
							}
						}
					}
				});
			} else {
				Channel crossChannel = Client_1.getIns().getCrossChannel();
				CrossData crossData = new CrossData();
				crossData.putObject(OldPlayerEnum.openid, hero.getOpenid());
				crossData.putObject(OldPlayerEnum.zoneid, hero.getZoneid());
				crossData.putObject(OldPlayerEnum.createIp, hero.getCreateIp());
				crossData.putObject(OldPlayerEnum.update, 1);

				NettyWrite.writeXData(crossChannel, CrossConst.CHECK_OLD_PLAYER, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, this,"OldPlayerIO checkOldPlayer error!");
		}
	}
	
	/**
	 * 中央服判断滚服玩家
	 * @param channel
	 * @param data
	 */
	public void checkPlayerByCross(Channel channel, CrossData crossData){
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			int isOldState = HeroConst.OLD_PLAYER_STATE_2;
			String openid = (String) crossData.getObject(OldPlayerEnum.openid, String.class);
			Integer zoneid = (Integer) crossData.getObject(OldPlayerEnum.zoneid, Integer.class);
			String createIp = (String) crossData.getObject(OldPlayerEnum.createIp, String.class);
			Integer update = (Integer) crossData.getObject(OldPlayerEnum.update, Integer.class);
			//查找玩家账号的滚服区信息
			M_OldPlayer oldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
			if(oldPlayer == null){
				oldPlayer = new M_OldPlayer();
				oldPlayer.setOpenid(openid);
				ArrayList<ZonesInfo> zoneids = new ArrayList<ZonesInfo>();
				ZonesInfo info = new ZonesInfo();
				info.setZoneid(zoneid);
				info.setLastTime(TimeDateUtil.getCurrentTime());
				zoneids.add(info);
				oldPlayer.setZoneids(zoneids);
				oldPlayer.setCreateIp(createIp);
			}else {
				//如果已经有其他区号，则表示滚服玩家
				if (CommonUtil.isNull(oldPlayer.getCreateIp())) {
					oldPlayer.setCreateIp(createIp);
				}
				ArrayList<ZonesInfo> zoneids = oldPlayer.getZoneids();
				if(!zoneids.isEmpty()){
					isOldState = HeroConst.OLD_PLAYER_STATE_1;
				}
				boolean find = false;
				for (ZonesInfo info : zoneids) {
					if (info.getZoneid() == zoneid) {
						info.setLastTime(TimeDateUtil.getCurrentTime());
						find = true;
						break;
					}
				}
				if (!find) {
					ZonesInfo info = new ZonesInfo();
					info.setZoneid(zoneid);
					info.setLastTime(TimeDateUtil.getCurrentTime());
					zoneids.add(info);
				}
			}
			OldPlayerDao.getIns().insertOrUpdateOldPlayer(oldPlayer);
			if (update == 0) {
				crossData.putObject(OldPlayerEnum.isOldState, isOldState);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, this,"OldPlayerIO checkPlayerByCross error!");
		}
	}
}
