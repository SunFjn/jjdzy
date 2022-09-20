package com.teamtop.houtaiHttp.events.notice;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.BSUC;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 公告缓存类
 * @author hepl
 *
 */
public class NoticeCache extends AbsServerEvent {
	
	private static Logger logger = LoggerFactory.getLogger(NoticeCache.class);
	//系统公告，在江湖频道发送信息
	private static final int BROADCAST_SYSTEM = 462;
	//间隔时间
	private static final int GAPTIME = 1;
	//定时执行线程
	private static final ScheduledExecutorService service = Executors.newSingleThreadScheduledExecutor();
	//公告缓存
	private static ConcurrentHashMap<Long, M_Notice> noticeCache = 	BSUC.reg("noticeCache", new ConcurrentHashMap<Long, M_Notice>());
	
	
	public static ConcurrentHashMap<Long, M_Notice> getNoticeCache(){
		return noticeCache;
	}
	
	@Override
	public void startServer() throws RunServerException {
		//查找未过期且已审核公告并进行公告
		int currentTime = TimeDateUtil.getCurrentTime();
		ConcurrentHashMap<Long, M_Notice> cache = getNoticeCache();
		List<Integer> zoneids = GameProperties.zoneids;
		for(int i=0; i<zoneids.size(); i++){
			int zoneid = zoneids.get(i);
			try {
			} catch (Exception e) {
				throw new RunServerException(e, "NoticeCache startServer error!zoneid:"+zoneid);
			}
		}
		startNoticeServer();
	}

	/**
	 * 启动广播服务线程
	 */
	private void startNoticeServer(){
		service.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				sendNotice();
			}
		}, GAPTIME, GAPTIME, TimeUnit.SECONDS);
		logger.info("startNoticeServer ....");
	}
	
	/**
	 * 发送全服广播
	 */
	private void sendNotice(){
		ConcurrentHashMap<Long, M_Notice> cache = getNoticeCache();
		if(cache.isEmpty()){
			return;
		}
		int currentTime = TimeDateUtil.getCurrentTime();
		for(M_Notice notice : cache.values()){
			//判断条件
			if(!isSend(notice,currentTime)){
				continue;
			}
			boradCastOnlineRole(notice);
		}
	}
	
	/**
	 * 判断公告是否可发送
	 * @param notice
	 * @return true 可以 发送 false 不能发送
	 */
	private boolean isSend(M_Notice notice, int currentTime){
		int gaptime = currentTime - notice.getBegintime();
		if(gaptime<=0)return false;
		if(notice.getEndtime()<=currentTime){
			getNoticeCache().remove(notice.getId());
			notice.setState(2);
			//更新公告到数据库
			try {
				//HoutaiDao.getIns().updateNotice(notice.getZoneid(), notice);
			} catch (Exception e) {
				logger.error(LogTool.exception(e, "sendNotice update invalid notice error! notice id:"+notice.getId()));
			}
			return false;
		}
		if(gaptime%notice.getSpacetime()==0)return true;
		return false;
	}
	
	/**
	 * 广播在线的玩家
	 * @param notice
	 */
	public static void boradCastOnlineRole(M_Notice notice){
		try {
			//区分普通公告和系统公告
			int type = notice.getType();
			int cmdId = BROADCAST_SYSTEM;
			Object[] content = null;
			if(type == 0){
				//普通公告
//				cmdId = BROADCAST_NORMAL;
				content = new Object[]{notice.getContent(), notice.getLink()};
			}else if(type == 1){
				//系统公告
//				cmdId = BROADCAST_SYSTEM;
				content = new Object[]{notice.getContent()};
			}
			int zoneid = notice.getZoneid();
			String pf = notice.getPf();
			String zsrange = notice.getZsrange();
			String[] zsArr = zsrange.split("_");
			int minzs = Integer.parseInt(zsArr[0]);
			int maxzs = Integer.parseInt(zsArr[1]);
			String levelrange = notice.getLevelrange();
			String moneyrange = notice.getMoneyrange();
			String[] levelArr = levelrange.split("_");
			int minLv = Integer.parseInt(levelArr[0]);
			int maxLv = Integer.parseInt(levelArr[1]);
			String[] moneyArr = moneyrange.split("_");
			long minMoney = Long.parseLong(moneyArr[0]);
			long maxMoney = Long.parseLong(moneyArr[1]);
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Long hid = null;
			Hero hero = null;
			String loginPf = null;
			Iterator<Entry<Long, Hero>> iterator = heroMap.entrySet().iterator();
			while(iterator.hasNext()){
				Entry<Long, Hero> next = iterator.next();
				hid = next.getKey();
				if(!HeroFunction.getIns().isOnline(hid)){
					continue;
				}
				hero = next.getValue();
				//判断区号
				if(zoneid != hero.getZoneid()){
					continue;
				}
				//判断渠道
				loginPf = hero.getLoginPf();
				if(!"all".equals(pf) && !loginPf.equals(pf)){
					continue;
				}
				//判断等级范围
				if(hero.getRealLevel()<minzs*1000+minLv || hero.getRealLevel() > maxzs*1000+maxLv){
					continue;
				}
				//判断充值范围
				if(hero.getChongZhiYuan()<minMoney || hero.getChongZhiYuan()>maxMoney){
					continue;
				}
				//公告广播
				NettyWrite.writeData(hid, content, cmdId);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "boradCastOnlineRole has error! notice is :"+notice.getContent()));
		}
	}
}
