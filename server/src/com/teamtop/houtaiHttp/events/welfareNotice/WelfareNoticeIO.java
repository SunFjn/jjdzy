package com.teamtop.houtaiHttp.events.welfareNotice;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.util.common.CommonUtil;

import io.netty.channel.Channel;

public class WelfareNoticeIO {

	private static WelfareNoticeIO welfareNoticeIO;

	private WelfareNoticeIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized WelfareNoticeIO getIns() {
		if (welfareNoticeIO == null) {
			welfareNoticeIO = new WelfareNoticeIO();
		}
		return welfareNoticeIO;
	}

	public void setWelfareNotice(String pf, String content, List<Integer> zoneidList) {
		WelfareNoticeCache.WelfareNotice = content;
		// 同步到子服
		CrossData crossData = new CrossData();
		crossData.putObject(WelfareNoticeEnum.content.name(), content);
		Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
		Set<Integer> zoneidSet = new HashSet<>(map.keySet());
		int size = zoneidList.size();
		if (size == 0) {
			zoneidList.addAll(zoneidSet);
		}
		Iterator<Integer> iterator = zoneidList.iterator();
		int zoneid = 0;
		ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
		for (; iterator.hasNext();) {
			zoneid = iterator.next();
			Channel channel = zoneidToChannel.get(zoneid);
			if (channel == null) {
				continue;
			}
			NettyWrite.writeXData(channel, CrossConst.WELFARE_NOTICE, crossData);
		}
	}

	/**
	 * 接收中央服通知，更新子服公告
	 */
	public void setNotice(Channel channel, CrossData crossData) {
		String content = crossData.getObject(WelfareNoticeEnum.content.name(), String.class);
		if (CommonUtil.isNull(content)) {
			return;
		}
		WelfareNoticeCache.WelfareNotice = content;
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Hero> iterator = heroMap.values().iterator();
		for (; iterator.hasNext();) {
			Hero hero = iterator.next();
			if (hero.isOnline()) {
				HeroSender.sendCmd_170(hero.getId(), content);
			}
		}
	}

}
