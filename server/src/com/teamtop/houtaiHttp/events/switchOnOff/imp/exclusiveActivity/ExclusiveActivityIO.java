package com.teamtop.houtaiHttp.events.switchOnOff.imp.exclusiveActivity;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySender;
import com.teamtop.system.exclusiveActivity.ExclusiveActivitySysCache;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class ExclusiveActivityIO {

	private static ExclusiveActivityIO ins;

	private ExclusiveActivityIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivityIO getIns() {
		if (ins == null) {
			ins = new ExclusiveActivityIO();
		}
		return ins;
	}

	public void setExclusiveActivityState(int type, ChannelHandlerContext ctx) {
		try {
			ExclusiveActivitySysCache.EXCLUSIVE_STATE = type;
			CrossData data = new CrossData();
			data.putObject(ExclusiveActivityEnum.type.name(), type);
			Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
			for (; iterator.hasNext();) {
				Channel channel = iterator.next();
				if (channel == null) {
					continue;
				}
				NettyWrite.writeXData(channel, CrossConst.EXCLUSIVE_ACT_SWITCH, data);
			}
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, this, "ExclusiveActivityIO setExclusiveActivityState type=" + type);
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	public void setExclusiveActivityStateHandle(Channel channel, CrossData crossData) {
		int cmd = CrossConst.EXCLUSIVE_ACT_SWITCH;
		Integer type = crossData.getObject(ExclusiveActivityEnum.type.name(), Integer.class);
		if (type == 1) {
			ExclusiveActivitySysCache.EXCLUSIVE_STATE = type;
			ExclusiveActivityFunction.getIns().checkExActEnd();
			ExclusiveActivityFunction.getIns().checkExActOpen(true);
		} else {
			ExclusiveActivitySysCache.EXCLUSIVE_STATE = 2;
		}
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			if (hero.isOnline()) {
				ExclusiveActivitySender.sendCmd_7904(hero.getId(), ExclusiveActivitySysCache.EXCLUSIVE_STATE);
			}
		}
	}

}
