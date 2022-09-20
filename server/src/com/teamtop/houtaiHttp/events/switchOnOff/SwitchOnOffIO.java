package com.teamtop.houtaiHttp.events.switchOnOff;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.system.hero.HeroCache;

import io.netty.channel.Channel;

public class SwitchOnOffIO {

	private static SwitchOnOffIO ins = null;

	public static synchronized SwitchOnOffIO getIns() {
		if (ins == null) {
			ins = new SwitchOnOffIO();
		}
		return ins;
	}

	/**
	 * 子服收到连接事件请求,获取开关状态数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void connFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.SWITCH_CONN;
		Type classType = new TypeReference<HashMap<Integer, Integer>>() {
		}.getType();
		Map<Integer, Integer> onOffCacheCen = crossData.getObject("onOffCache", classType);
		Map<Integer, Integer> onOffCache = HeroCache.getOnOffModel().getOnOffCache();
		onOffCache.clear();
		onOffCache.putAll(onOffCacheCen);
	}
}
