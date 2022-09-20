package com.teamtop.houtaiHttp.events.heroInfo;

import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.event.backstage.events.backstage.BackstageConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroDataSaver;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

/**
 * 清除玩家缓存
 * @author hepl
 *
 */
public class ClearHeroCacheHttpEvent extends AbsHouTaiHttpEvent {
	private static ClearHeroCacheHttpEvent ins = null;
	
	public static ClearHeroCacheHttpEvent getIns(){
		if(ins == null){
			ins = new ClearHeroCacheHttpEvent();
		}
		return ins;
	}
	
	private static final Logger logger = LoggerFactory.getLogger(ClearHeroCacheHttpEvent.class);
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			for(Hero hero:heroMap.values()) {
				if(HeroFunction.getIns().isOnline(hero.getId())){
					//在线则强制下线
					Channel channel = hero.getChannel();
					HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
					channel.close();
					Thread.sleep(2000);
				}
				//清除离线缓存
//				HeroDataSaver.removeClearCache(hero);
//				HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
				if(hero.getChannel()==null){
					HeroCache.removeHero(hero.getId());
				}
				
			}
			logger.info("ClearHero success");
			HttpUtil.responseSucc(ctx);
			/*String hidStr = paramMap.get("hid");
			if(hidStr == null || "".equals(hidStr)){
				HttpUtil.responseFail(ctx);
				return;
			}
			HttpUtil.responseSucc(ctx);
			long hid = Long.parseLong(hidStr);
			Hero hero = HeroCache.getHero(hid);
			if(hero == null){
				return;
			}
			if(HeroFunction.getIns().isOnline(hid)){
				//在线则强制下线
				Channel channel = hero.getChannel();
				HeroFunction.getIns().logout(hero, BackstageConst.M_LOGINOUT_OPER_NORMAL);
				channel.close();
				Thread.sleep(1000);
			}
			//清除离线缓存
			HeroDataSaver.removeClearCache(hero);
			HeroDao.getIns().update(hero, HeroDataSaver.CLEAR);
			if(hero.getChannel()==null){
				HeroCache.removeHero(hero.getId());
			}*/
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "ClearHeroCacheHttpEvent has error!"));
		}
	}

}
