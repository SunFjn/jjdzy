package com.teamtop.houtaiHttp.events.guanka;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;
/**
 * 调关卡
 * @author jjjjyyy
 *
 */
public class GuanKaHttpEvent extends AbsHouTaiHttpEvent {

	private static GuanKaHttpEvent ins = null;

	public static GuanKaHttpEvent getIns() {
		if (ins == null) {
			ins = new GuanKaHttpEvent();
		}
		return ins;
	}
//	player	2	参数类型，1角色名，2角色id，3平台账号
//	cond	11111111	参数值	
//	type	1	设置类型,1关卡
//	content	100	
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		String zoneidStr = paramMap.get("zoneid");
		String player = paramMap.get("player");
		String cond = paramMap.get("cond");
		String typeStr=paramMap.get("type");
		String content=paramMap.get("content");
		if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(player) || CommonUtil.isNull(cond)
				||CommonUtil.isNull(typeStr)||CommonUtil.isNull(content) ) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		try {
			int zoneid = Integer.parseInt(zoneidStr);
			int playerType = Integer.parseInt(player);
			int type=Integer.parseInt(typeStr);
			int guankaNum = Integer.parseInt(content);
			LogTool.info("GuanKaHttpEvent playerType :"+playerType+" cond:"+cond+" guankaNum:"+guankaNum, GuanKaHttpEvent.class);
			if (type==1) {
				//调关卡数
				GuanKaHttpIO.getIns().CTLSetGuanka(cond, zoneid, playerType, guankaNum, ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, GuanKaHttpEvent.class, "GuanKaHttpEvent has wrong");
		}
		
	}

}
