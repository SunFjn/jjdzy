package com.teamtop.houtaiHttp.events.ipWhiteList;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class IpWhiteListHttpEvent extends AbsHouTaiHttpEvent {

	private static IpWhiteListHttpEvent ins;

	private IpWhiteListHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized IpWhiteListHttpEvent getIns() {
		if (ins == null) {
			ins = new IpWhiteListHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*sign	…	验签	是
		pf	quick	渠道code	是
		cmd	45	接口序号	是
		randnum	1234567890	时间戳	是
		type	1	1.查询状态 2.开启 3.关闭 4.设置数量 5添加IP白名单 6删除IP白名单	是
		num	1	设置注册限制数量	type=4 时传输
		ip	1.1.1.1	ip白名单	type=5和6 时传输*/
		int type = -1;
		try {
			String typeStr = paramMap.get("type");
			if (CommonUtil.isNull(typeStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			type = Integer.parseInt(typeStr);
			int num = -1;
			if (type == 4) {
				String numStr = paramMap.get("num");
				if (CommonUtil.isNull(numStr)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
				num = Integer.parseInt(numStr);
			}
			String ip = "";
			if (type == 5 || type == 6) {
				ip = paramMap.get("ip");
				if (CommonUtil.isNull(ip)) {
					HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
					return;
				}
			}
			IpWhiteListIO.getIns().ipWhiteListSet(ctx, ip, num, type);
		} catch (Exception e) {
			LogTool.error(e, IpWhiteListHttpEvent.class, "IpWhiteListHttpEvent type=" + type);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
