package com.teamtop.houtaiHttp.events.onlineHero;

import io.netty.channel.ChannelHandlerContext;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;

/**
 * 在线人数实时统计
 * @author hepl
 *
 */
public class OnlineNumHttpEvent extends AbsHouTaiHttpEvent{
	private static OnlineNumHttpEvent ins = null;
	
	public static OnlineNumHttpEvent getIns(){
		if(ins == null){
			ins = new OnlineNumHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		String zoneidStr = paramMap.get("zoneid");
		Integer zoneid = null;
		if(zoneidStr != null){
			zoneid = Integer.parseInt(zoneidStr); //区号，没有则表示合服所有区的数据
		}
		int i = 0;
		Hero hero = null;
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
		while(iterator.hasNext()){
			Entry<Long, Hero> next = iterator.next();
			Long hid = next.getKey();
			if(HeroFunction.getIns().isOnline(hid)){
				if(zoneid != null){
					hero = next.getValue();
					if(hero.getZoneid() != zoneid.intValue()){
						continue;
					}
				}
				i++;
			}
		}
		HttpUtil.response(i, ctx);
	}

}
