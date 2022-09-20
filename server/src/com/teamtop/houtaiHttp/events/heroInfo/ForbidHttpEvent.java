package com.teamtop.houtaiHttp.events.heroInfo;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

/**
 * 封号禁言http处理类
 * @author kyle
 *
 */
public class ForbidHttpEvent extends AbsHouTaiHttpEvent {
	private static ForbidHttpEvent ins = null;
	
	public static ForbidHttpEvent getIns(){
		if(ins == null){
			ins = new ForbidHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(ForbidHttpEvent.class);
	/**
	 * 禁言封号接口：
	参数：
	type：1.封号  2.封号处理问题 3.禁言 4.拉红名单 5.解封号 6.解禁言
	hid：玩家hid
	time：禁言封号时间，单位：分钟
	reason：禁言或封号原因
	返回值：操作成功后返回1，失败返回-1
	 * 
	 */
	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		/*	pf	quick	渠道code	是
			zoneid	1	区服号	是
			cmd	2	接口序号	是
			randnum	1234567890	时间戳	是
			player	3	参数类型，1角色名，2角色id，3平台账号	是
			cond	66666666	参数值，多个参数用;分隔	是
			type	1	1.封角色 2.解封角色 3.禁言角色 4.解禁言角色	是
			time	60	封号禁言时间（分钟）	是
			reason		封号禁言原因
		 */
		String player = paramMap.get("player");
		String cond = paramMap.get("cond");
		String typeStr = paramMap.get("type");
		String timeStr = paramMap.get("time");
		String reason = paramMap.get("reason");
		String zoneidStr = paramMap.get("zoneid");
		try {
			if (CommonUtil.isNull(typeStr) || CommonUtil.isNull(reason) || CommonUtil.isNull(player)
					|| CommonUtil.isNull(cond) || CommonUtil.isNull(timeStr) || CommonUtil.isNull(zoneidStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			int playType = Integer.parseInt(player);
			int type = Integer.parseInt(typeStr);
			int time = Integer.parseInt(timeStr);
			int zoneid = Integer.parseInt(zoneidStr);
			String[] targetArr = cond.split(";");
			List<String> targetList = Arrays.asList(targetArr);
			ForbidCrossIO.getIns().forbidOperate(targetList, playType, type, time, reason, zoneid, ctx);
		} catch (Exception e) {
			LogTool.error(e, ForbidHttpEvent.class,
					"ForbidHttpEvent forbidOperate fail, playType=" + player + ", typeStr=" + typeStr);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}
}
