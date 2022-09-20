package com.teamtop.util.cache;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.exector.ExectorUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class GameCacheManager extends AbsServerEvent{
	/**
	 * 默认同步时间
	 */
	public static final int DEFAULT_SYNC_PERIOD = 60 * 30;
	private static Logger logger = LoggerFactory.getLogger(GameCacheManager.class);
	private static List<DBCache<?,?>> cacheDBList = new ArrayList<>();
	private static ScheduledExecutorService es = Executors.newScheduledThreadPool(1);
	/**
	 * 加入同步
	 * @param map
	 */
	public static void putSync(DBCache<?,?> map){
		cacheDBList.add(map);
	}
	private static void syncCache(){
		Iterator<DBCache<?,?>> it = cacheDBList.iterator();
		int currentTime = TimeDateUtil.getCurrentTime();
		while(it.hasNext()){
			DBCache<?,?> dbcache = it.next();
			Map<?, ?> map = dbcache.get();
			Iterator<?> mapIt = map.values().iterator();
			while(mapIt.hasNext()){
				try {
					Object obj = mapIt.next();
					CacheModel m = (CacheModel) obj;
					if(dbcache.remove(m)){
						//sync and remove
						dbcache.sync(m);
						mapIt.remove();
					}else{
						int syncTime = m.getSyncTime();
						if(syncTime==0){
							m.setSyncTime(currentTime+dbcache.getSyncPeriod());
						}else if(currentTime>syncTime){
							//sync to db
							dbcache.sync(m);
							m.setSyncTime(currentTime+dbcache.getSyncPeriod());
						}
					}
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}
	}
	
	@Override
	public void startServer() throws RunServerException {
		es.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				long a = System.currentTimeMillis();
				logger.info("sync cache to db start");
				syncCache();
				long b = System.currentTimeMillis();
				logger.info("sync cache to db end,use time:"+(b-a)+" ms");
			}
		}, 60, 60, TimeUnit.SECONDS);
	}
	@Override
	public void shutdownServer() {
		//close executor
		try {
			ExectorUtil.shutdownAndAwaitTermination(es,"GameCacheManager");
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
		}
		//sync onc more time
		Iterator<DBCache<?,?>> it = cacheDBList.iterator();
		while(it.hasNext()){
			DBCache<?,?> dbcache = it.next();
			Map<?, ?> map = dbcache.get();
			Iterator<?> mapIt = map.values().iterator();
			while(mapIt.hasNext()){
				try {
					Object obj = mapIt.next();
					CacheModel m = (CacheModel) obj;
					dbcache.sync(m);
				} catch (Exception e) {
					logger.error(LogTool.exception(e));
				}
			}
		}
	}
}
