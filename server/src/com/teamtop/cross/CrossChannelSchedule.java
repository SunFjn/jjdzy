package com.teamtop.cross;

import java.util.Map;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import com.teamtop.cross.callback.Callback;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.util.exector.schedule.ScheduleUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;
/**
 * 玩家跨服检查线程
 * @author Administrator
 *
 */
public class CrossChannelSchedule extends AbsServerEvent{
	private ScheduledExecutorService executors = ScheduleUtil.makeThread("CrossChannelSchedule");
//	private static Logger logger = LoggerFactory.getLogger(CrossChannelSchedule.class);
	public void check() {
		int now = TimeDateUtil.getCurrentTime();
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for(Hero hero:heroMap.values()){
			try {
				if(hero.getCrossChannel()!=null){
					int compare = now - hero.getCrossChannelSyncTime();
					if(compare > 60){
						LogTool.warn(hero.getId()+ hero.getName()+"check cross hearbeat fail,crossChannelSyncTime:"+hero.getCrossChannelSyncTime()+",compare："+compare, this);
						crossHeroDown(hero);
					}else{
						System.err.println(compare);
					}
				}
			} catch (Exception e) {
				LogTool.error(e, CrossChannelSchedule.class);
			}
		}
	}
	public void getHearbeat() {
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for(final Hero hero:heroMap.values()){
			try {
				if(hero.getCrossChannel()!=null){
					CrossData crossData = new CrossData();
					crossData.putObject(CrossEnum.hid, hero.getId());
					NettyWrite.writeXData(hero.getCrossChannel(), CrossConst.GET_CROSS_HEARTBEAT, crossData, new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							int heartbeat = (int) crossData.getObject(CrossEnum.heartbeat, Integer.class);
							if(heartbeat==0){
								crossHeroDown(hero);
							}
							hero.setCrossChannelSyncTime(TimeDateUtil.getCurrentTime());
						}
					});
				}
			} catch (Exception e) {
				LogTool.error(e, this, "");
			}
		}
	}
	@Override
	public void startServer() throws RunServerException {
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				check();
			}
		}, 0, 1, TimeUnit.MINUTES);
		
		executors.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				getHearbeat();
			}
		}, 10, 10, TimeUnit.SECONDS);
	}
	
	public static void crossHeroDown(Hero hero){
		if(hero == null) return;
		// synchronized (hero) {
			Channel crossChannel = hero.getCrossChannel();
			if(crossChannel!=null){
//				SceneFunction.getIns().setSceneStateNormal(hero);
//				SceneEventFunction.changeToLocalScene(hero);
//				logger.info(LogTool.rec(hero.getId(), hero.getName(), "crossHeroDown,changeToLocalScene"));
				hero.setCrossChannel(null);
				NettyWrite.writeXData(crossChannel, CrossConst.TELL_CROSS_SERVER_CLOSE_CLIENT, new CrossData(CrossEnum.hid, hero.getId()));
			}
		// }
	}

//@Override
//public void startServer() throws RunServerException {
//	// TODO Auto-generated method stub
//	
//}
}
