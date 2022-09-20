package com.teamtop.houtaiHttp.events.redList;

import java.util.ArrayList;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.M_OldPlayer;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.OldPlayerDao;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.ZonesInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 中央服红名单拉红处理
 * @author hepl
 *
 */
public class RedListHttpEvent extends AbsHouTaiHttpEvent {
	private static RedListHttpEvent ins = null;
	
	public static RedListHttpEvent getIns(){
		if(ins == null){
			ins = new RedListHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			String typeStr = paramMap.get("type");
			if(typeStr == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			if(type == 1){
				//拉入红名单
				String list = paramMap.get("openidlist");
				if(list == null){
					HttpUtil.responseFail(ctx);
					return;
				}
				String[] listArr = list.split(",");
				String openid = null;
				for(int i=0; i<listArr.length; i++){
					openid = listArr[i];
					M_OldPlayer oldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
					if(oldPlayer == null){
						continue;
					}
					ArrayList<ZonesInfo> zoneids = oldPlayer.getZoneids();
					RedListIO.getIns().setRedList(openid, zoneids, type);
				}
				HttpUtil.responseSucc(ctx);
			}else if(type == 2){
				//删除红名单
				String openid = paramMap.get("openidlist");
				if(openid == null){
					HttpUtil.responseFail(ctx);
					return;
				}
				M_OldPlayer oldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
				if(oldPlayer == null){
					HttpUtil.responseFail(ctx);
					return;
				}
				ArrayList<ZonesInfo> zoneids = oldPlayer.getZoneids();
				RedListIO.getIns().setRedList(openid, zoneids, type);
				HttpUtil.responseSucc(ctx);
			}
		} catch (Exception e) {
			LogTool.error(e,this, "RedListHttpEvent has error!");
		}
	}

}
