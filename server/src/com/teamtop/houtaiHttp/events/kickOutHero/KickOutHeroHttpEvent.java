package com.teamtop.houtaiHttp.events.kickOutHero;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class KickOutHeroHttpEvent extends AbsHouTaiHttpEvent {

	private static KickOutHeroHttpEvent ins;

	private KickOutHeroHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KickOutHeroHttpEvent getIns() {
		if (ins == null) {
			ins = new KickOutHeroHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*	pf	quick	渠道code	是
			zoneid	1	区服号,格式 all或1;2-5;9 all表示所有区服，1;2-5;9表示1区，2到5区，9区	是
			cmd	9	接口序号	是
			randnum	1234567890	时间戳	是
			player	3	参数类型，1角色名，2角色id，3平台账号	否（不填则踢全服玩家）
			cond	11111111;22222222	参数值，多个参数用;分隔	否
		 */
		try {
			String zoneidStr = paramMap.get("zoneid");
			String player = paramMap.get("player");
			String cond = paramMap.get("cond");
			if (CommonUtil.isNull(zoneidStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int playerType = 0;
			if (!CommonUtil.isNull(player)) {
				playerType = Integer.parseInt(player);
			}
			List<Integer> zoneidList = new ArrayList<>();
			if (!"all".equals(zoneidStr)) {
				zoneidList = AnalyzeUtils.getZoneidList(zoneidStr);
				if (zoneidList.size() == 0) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
			}
			List<String> targetlist = new ArrayList<>();
			if (!CommonUtil.isNull(cond)) {
				String[] targetArr = cond.split(";");
				targetlist = Arrays.asList(targetArr);
			}
			KickOutHeroIO.getIns().kickOutHero(zoneidList, playerType, targetlist);
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, KickOutHeroHttpEvent.class, "KickOutHeroHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
