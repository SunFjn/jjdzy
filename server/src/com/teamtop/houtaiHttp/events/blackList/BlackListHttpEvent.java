package com.teamtop.houtaiHttp.events.blackList;

import java.util.ArrayList;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.M_OldPlayer;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.OldPlayerDao;
import com.teamtop.system.event.backstage.events.backstage.oldPlayer.ZonesInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 中央服黑名单处理
 * @author hzp
 *
 */
public class BlackListHttpEvent extends AbsHouTaiHttpEvent {
	private static BlackListHttpEvent ins = null;
	
	public static BlackListHttpEvent getIns(){
		if(ins == null){
			ins = new BlackListHttpEvent();
		}
		return ins;
	}
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			String typeStr = paramMap.get("type");
			if(typeStr == null){
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int type = Integer.parseInt(typeStr);
			String pf = paramMap.get("pf");
			if (pf == null) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			JSONObject data = new JSONObject();
			data.put("type", type);
			data.put("pf", pf);
			if(type == 1){
				//拉入黑名单
				StringBuilder uList = new StringBuilder();
				String list = paramMap.get("cond");
				if(list == null){
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				String[] listArr = list.split(";");
				String openid = null;
				boolean handleResult = true;
				for(int i=0; i<listArr.length; i++){
					openid = listArr[i];
					M_OldPlayer oldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
					if(oldPlayer == null){
						continue;
					}
					ArrayList<ZonesInfo> zoneids = oldPlayer.getZoneids();
					boolean result = BlackListIO.getIns().setBlackList(openid, zoneids, type, pf);
					if (!result) {
						uList.append(openid).append(";");
						handleResult = false;
					}
				}
				if (handleResult) {
					if (uList.length() > 0) {
						uList.setLength(uList.length() - 1);
					}
					data.put("cond", uList.toString());
					HoutaiResponseUtil.responseSucc(ctx, "黑名单设置成功", data);
				} else {
					HoutaiResponseUtil.responseSucc(ctx);
				}
			}else if(type == 2){
				//删除黑名单
				String list = paramMap.get("cond");
				if (list == null) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				String[] listArr = list.split(";");
				String openid = null;
				for (int i = 0; i < listArr.length; i++) {
					openid = listArr[i];
					M_OldPlayer oldPlayer = OldPlayerDao.getIns().findByOpenid(openid);
					if (oldPlayer == null) {
						continue;
					}
					ArrayList<ZonesInfo> zoneids = oldPlayer.getZoneids();
					BlackListIO.getIns().setBlackList(openid, zoneids, type, pf);
				}
				HoutaiResponseUtil.responseSucc(ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, BlackListHttpEvent.class, "BlackListHttpEvent has error!");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
