package com.teamtop.houtaiHttp.events.heroInfo;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 玩家信息查询
 * 
 * @author kyle
 *
 */
public class HeroInfoHttpEvent extends AbsHouTaiHttpEvent {
	private static HeroInfoHttpEvent ins = null;

	public static HeroInfoHttpEvent getIns() {
		if (ins == null) {
			ins = new HeroInfoHttpEvent();
		}
		return ins;
	}

	private static Logger logger = LoggerFactory.getLogger(HeroInfoHttpEvent.class);
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*	pf	    quick	渠道code	是
			zoneid	1	   区服号	是
			cmd	    1	  接口序号	是
			randnum	1234567890	时间戳	是
			player	3	参数类型，1角色名，2角色id，3平台账号	是
			cond	66666666	参数值，多个参数用;分隔	是
		 */
		try {
			String zoneidStr = paramMap.get("zoneid");
			String player = paramMap.get("player");
			String cond = paramMap.get("cond");
			if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(player) || CommonUtil.isNull(cond)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int zoneid = Integer.parseInt(zoneidStr);
			int playerType = Integer.parseInt(player);
			if (CrossZone.isCrossServer()) {
				HeroInfoIO.getIns().getHeroInfo(cond, zoneid, playerType, ctx);
			} else {
				JSONObject heroInfo = HeroInfoIO.getIns().getHeroInfoObject(zoneid, playerType, cond);
				if (heroInfo != null) {
					String message = "获取玩家信息详情成功";
					HoutaiResponseUtil.responseSucc(ctx, message, heroInfo);
				} else {
					String message = "获取玩家信息详情失败";
					JSONObject data = new JSONObject();
					data.put("cond", cond);
					data.put("player", playerType);
					data.put("zoneid", zoneid);
					HoutaiResponseUtil.responseFail(true, HoutaiConst.SendBack_Code_5006, message, data, ctx);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroInfoHttpEvent.class, "HeroInfoHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
}
