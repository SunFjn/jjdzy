package com.teamtop.system.hero;

import java.util.concurrent.ConcurrentHashMap;

//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;

import com.teamtop.util.cache.union.AbsUCTrigger;
//import com.teamtop.util.log.LogFormat;
/**
 * Hero缓存触发器
 * @author Administrator
 *
 */
public class HeroUCTrigger extends AbsUCTrigger<ConcurrentHashMap<Long, Hero>>{
//	private Logger logger = LoggerFactory.getLogger(HeroUCTrigger.class);
	@Override
	public void syncOne(Object key) {
		/*Hero hero = map.get(key);
		try {
			HeroDao.getIns().update(hero);
		} catch (Exception e) {
			logger.error(LogFormat.exception(e,"syncOne key:"+key));
		}*/
		
		
	}

	@Override
	public void killOne(Object key) {
		map.remove(key);
	}

	@Override
	public void syncAll() {
		/*Iterator<Hero> it = map.values().iterator();
		while(it.hasNext()){
			Hero hero = it.next();
			try {
				HeroDao.getIns().update(hero);
			} catch (Exception e) {
				logger.error(LogFormat.exception(e));
			}
		}*/
	}

	@Override
	public void loadAll() throws Exception{
	}
	
}
