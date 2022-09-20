package com.teamtop.houtaiHttp.events.mail;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;

import io.netty.channel.ChannelHandlerContext;

/**
 * 发送个人邮件
 * @author hzp
 *
 */
public class PersonalMailHttpEvent extends AbsHouTaiHttpEvent {

	private static PersonalMailHttpEvent ins;

	private PersonalMailHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PersonalMailHttpEvent getIns() {
		if (ins == null) {
			ins = new PersonalMailHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*  pf	quick	渠道code	是
			zoneid	1	区服号	是
			cmd	3	接口序号	是
			randnum	1234567890	时间戳	是
			player	3	参数类型，1角色名，2角色id，3平台账号	是
			cond	11111111;22222222	参数值，多个参数用;分隔	是
			goods	1,10;2,10	物品，格式id,num;id,num	否
			title	邮件标题	邮件标题	是
			content	邮件内容	邮件内容	是
		*/
		String playerStr = paramMap.get("player");// 参数类型，1角色名，2角色id，3平台账号
		String cond = paramMap.get("cond");// 参数值，多个参数用;分隔
		String goods = paramMap.get("goods");// 物品，格式id,num;id,num
		String title = paramMap.get("title");
		String content = paramMap.get("content");
		String zoneidStr = paramMap.get("zoneid");
		if(playerStr==null||"".equals(playerStr)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		if(cond==null||"".equals(cond)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		if (content == null || "".equals(content)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		if (title == null || "".equals(title)) {
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
			return;
		}
		int zoneid = 0;
		if (zoneidStr != null) {
			zoneid = Integer.parseInt(zoneidStr);
		}
		int playerType = Integer.parseInt(playerStr);
		String[] heroList = cond.split(";");
		MailCrossIO.getIns().sendPersonalMail(playerType, heroList, title, content, goods, zoneid, ctx);
	}

}
