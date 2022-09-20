package com.teamtop.houtaiHttp.events.mail;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.AnalyzeUtils;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;

import io.netty.channel.ChannelHandlerContext;

/**
 * 发送区服邮件
 * @author hzp
 *
 */
public class ZoneMailHttpEvent extends AbsHouTaiHttpEvent {

	private static ZoneMailHttpEvent zoneMailHttpEvent;

	private ZoneMailHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ZoneMailHttpEvent getIns() {
		if (zoneMailHttpEvent == null) {
			zoneMailHttpEvent = new ZoneMailHttpEvent();
		}
		return zoneMailHttpEvent;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*  pf	quick	渠道code	是
			zoneid	1	区服号,格式 all或1;2-5;9 all表示所有区服，1;2-5;9表示1区，2到5区，9区	是
			cmd	4	接口序号	是
			randnum	1234567890	时间戳	是
			goods	1,10;2,10	物品，格式id,num;id,num	否
			lv	1_10000	等级范围，格式min_max	否
			money	1_10000	充值范围（以元为单位），格式min_max	否
			strength	1_10000	战力范围，格式min_max	否
			title	邮件标题	邮件标题	是
			content	邮件内容	邮件内容	是
		*/
		String zoneidStr = paramMap.get("zoneid");
		String title = paramMap.get("title");
		String content = paramMap.get("content");
		if (CommonUtil.isNull(zoneidStr) || CommonUtil.isNull(title) || CommonUtil.isNull(content)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		
		String lvStr = paramMap.get("lv");
		String moneyStr = paramMap.get("money");
		String strengthStr = paramMap.get("strength");
		String goods = paramMap.get("goods");
		if (lvStr == null) {
			lvStr = "";
		}
		if (moneyStr == null) {
			moneyStr = "";
		}
		if (strengthStr == null) {
			strengthStr = "";
		}
		if (goods == null) {
			goods = "";
		}
		List<Integer> zoneidList = new ArrayList<>();
		if (!"all".equals(zoneidStr)) {
			zoneidList = AnalyzeUtils.getZoneidList(zoneidStr);
			if (zoneidList.size() == 0) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
		}
		boolean result = MailCrossIO.getIns().sendZoneMail(zoneidList, title, content, lvStr, strengthStr, moneyStr,
				goods);
		if (result) {
			HoutaiResponseUtil.responseSucc(ctx);
		} else {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
