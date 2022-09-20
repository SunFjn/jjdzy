package com.teamtop.houtaiHttp.events.activityHandle;

import java.util.Iterator;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.houtaiHttp.HouTaiHttpCache;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;

/**
 * 后台日常活动定时任务
 * @author hepl
 *
 */
public class HoutaiActivitySchedule extends AbsScheduleExecutor {
	private static final Logger logger = LoggerFactory.getLogger(HoutaiActivitySchedule.class);

	public HoutaiActivitySchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		try {
			int prepareTime = 0;
			ConcurrentHashMap<Integer, HoutaiActivity> houtaiActivity = HouTaiHttpCache.getHoutaiActivity();
			Iterator<Entry<Integer, HoutaiActivity>> iterator = houtaiActivity.entrySet().iterator();
			while(iterator.hasNext()){
				Entry<Integer, HoutaiActivity> next = iterator.next();
				Integer key = next.getKey();
				HoutaiActivity activity = next.getValue();
				prepareTime = activity.getPrepareTime();
				if(prepareTime != 0 && prepareTime == now){
					//活动预备
					prepare(key, now);
				}else if(activity.getStartTime() == now){
					//活动开始
					start(key, now);
				}else if(activity.getEndTime() == now){
					//活动结束
					iterator.remove();
					end(key, now);
				}
			}
		} catch (Exception e) {
//			logger.error(LogTool.exception(e, "HoutaiActivitySchedule has error!"));
		}
	}
	
	/**
	 * 活动预备
	 * @param funid 系统id
	 * @param now 当前时间
	 */
	private void prepare(int funid, int now){
		/*switch(funid){
		case OpenFunctionConst.FUN_TURELERACE:
			//小龟赛跑
			TurtleRaceEvent.getIns().turtleRaceReady(now);
			break;
		case OpenFunctionConst.FUN_QUNXIONG:
			//群雄逐鹿
			CompeteHegemonyManager.getIns().open();
			break;
		case OpenFunctionConst.FUN_WORLDBOSS:
			//世界BOSS
			SceneCache.getCopyScene(SceneConst.BOSS_MAP_ID);
			int[] arr = WorldBossManager.getIns().getBossIdByWorldLev(WorldBossConst.BOSS_TYPE);
			WorldBossConst.BOSS_SYS_ID = arr[1];
			WorldBossEvent.getIns().initWorldBoss(arr[0],arr[1]);
			
			WorldBossManager.getIns().showIcon(1);
			WorldBoss worldBoss = WorldBossCache.getWorldBoss(WorldBossConst.BOSSCACHE_KEY);
			worldBoss.setStartChallengeTime(TimeDateUtil.getCurrentTime());
			WorldBossConst.OPEN = true;
			//定时广播
			ScheduleUtil.addTask(ScheduleConst.WORLDBOSS_BROADCAST, new WorldBossBroadcastSchedule(1000, 1000));
			break;
		case OpenFunctionConst.FUN_CS:
			//反恐精英
			if(CSCache.getCSState()!=CSConst.STATE_OVER){
				logger.warn("cs is not over,please set over");
				return;
			}
			CSCache.setCsState(CSConst.STATE_READY);
			//显示图标
			CSEvent.getIns().icon(true);
			ChatManager.getIns().broadCast(ChatConst.ID_BOARD_OPEN, new Object[]{}, ChatConst.BROCAST_TYPE_1);
			break;
		case OpenFunctionConst.FUN_GANGCOMPETITION:
			//帮会竞技
//			GangCompetitionManager.getIns().open();
			CrossData crossData = new CrossData();
			crossData.put(CrossEnum.type.name(), 1);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.GANG_COMPET_GM, crossData);
			break;
		case OpenFunctionConst.FUN_RUNNINGMAN:
			//奔跑兄弟
			//改为跨服，20160903
			if(!CrossZone.isCrossServer()){
				NettyWrite.writeXData(Client_3.getIns().getCrossChannel(), CrossConst.RUNMAN_GM_TO_CROSS, 
						new CrossData(RunManEnun.runActState.name(), 1));
				return;
			}
			break;
		case OpenFunctionConst.FUN_DRAGONBOAT:
			//跨服龙舟
			DragonBoatLocalIO.getIns().gmKnockout(1);
			break;
		}
		logger.info(LogTool.rec("houtai activity prepare,funid:"+funid+",prepareTime:"+now));*/
	}
	
	/**
	 * 活动开始
	 * @param funid 系统id
	 * @param now 当前时间
	 */
	private void start(int funid, int now){
		/*switch(funid){
		case OpenFunctionConst.FUN_TURELERACE:
			//小龟赛跑
			TurtleRaceEvent.getIns().turtleRaceStart(now);
			break;
		case OpenFunctionConst.FUN_RABBIT:
			//兔子变身
			RabbitEvent.getIns().start(now);
			//定时刷新萝卜，5分钟刷新
			ScheduleUtil.addTask(ScheduleConst.RABBIT_LUOBO, new RabbitLuoboSchedule(RabbitConst.REFRESH_TIME, RabbitConst.REFRESH_TIME, false));
			break;
		case OpenFunctionConst.FUN_QUNXIONG:
			//群雄逐鹿
			CompeteHegemonyManager.getIns().start();
			//定时5分钟后刷新NPC
			ScheduledExecutorService executor = Executors.newSingleThreadScheduledExecutor();
			executor.schedule(new Runnable(){
				@Override
				public void run() {
					//刷出npc
					CompeteHegemonyManager.getIns().refreshNpc();
				}
			}, CompeteHegemonyRule.REFRESH_TIME, TimeUnit.SECONDS);
			break;
		case OpenFunctionConst.FUN_WORLDBOSS:
			//世界BOSS
			//关闭广播
			ScheduleUtil.cancelTask(ScheduleConst.WORLDBOSS_BROADCAST);
			WorldBossConst.CHALLENGE = true;
			List<Long> sceneHero = SceneFunction.getIns().getSceneHero(WorldBossConst.SCENEUNITID, SceneConst.BOSS_MAP_ID);
			for (Long long1 : sceneHero) {
				WorldBossSender.sendCmd_1810(long1, WorldBossConst.START);
			}
			break;
		case OpenFunctionConst.FUN_FISH:
			//钓鱼活动
			if(FishCache.activityIsOpen){
				return;
			}
			FishCache.activityIsOpen = true;
			FishCache.initRoom();
			FishFunction.getIns().promptAll();
			FishCache.overTime = now + TimeDateUtil.ONE_HOUR_INT;
			
			//改为跨服，20160819
			List<CrossClient> crossServers = FishCache.getCrossServers();
			for(final CrossClient cc:crossServers){
				NettyWrite.writeXData(cc.getCrossChannel(), CrossConst.FISH_GM_TO_CROSS, 
						new CrossData(FishCrossEnum.fishState.name(), true));
			}
			break;
		case OpenFunctionConst.FUN_SHIPOTIAN:
			//真假石破天
			ShiPoTianManager.getIns().start();
			//刷新怪物，每5分钟
			ScheduleUtil.addTask(ScheduleConst.SHIPOTIAN_NPC, new ShiPoTianNPCSchedule(ShiPoTianRule.REFRESH_TIME, ShiPoTianRule.REFRESH_TIME));
			break;
		case OpenFunctionConst.FUN_CS:
			//反恐精英
			if(CSCache.getCSState()!=CSConst.STATE_READY){
				return;
			}
			CSCache.setCsState(CSConst.STATE_START);
			ScheduleUtil.addTask(ScheduleConst.CS_BUFF, new CSBuffSchedule(CSConst.TIME_REFRESH_BUFF0, CSConst.REFRESH_BUFF_TIME, false));
			ScheduleUtil.addTask(ScheduleConst.CS_EXP, new CSExpSchedule(CSConst.REFRESH_EXP_TIME, CSConst.REFRESH_EXP_TIME, false));
			CSEvent.getIns().icon(true);
			ChatManager.getIns().broadCast(ChatConst.ID_BOARD_OPEN, new Object[]{}, ChatConst.BROCAST_TYPE_1);
			//开服活动
			KaifuActivityFunction.getIns().startACS();
			break;
		case OpenFunctionConst.FUN_GANGCOMPETITION:
			//帮会竞技
//			GangCompetitionManager.getIns().start();
			CrossData crossData = new CrossData();
			crossData.put(CrossEnum.type.name(), 2);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.GANG_COMPET_GM, crossData);
			break;
		case OpenFunctionConst.FUN_CROSS_TEAM_BATTLE:
			//跨服竞技3v3
			CrossData cd = new CrossData();
			cd.put(CrossEnum.type.name(), 1);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.CTB_GM, cd);
			break;
		case OpenFunctionConst.FUN_TRANSPORT_LEVEL_30:
			//运镖日常活动
			TransportEvent.getIns().start();
			break;
		case OpenFunctionConst.FUN_RUNNINGMAN:
			//奔跑兄弟
			//改为跨服，20160903
			if(!CrossZone.isCrossServer()){
				NettyWrite.writeXData(Client_3.getIns().getCrossChannel(), CrossConst.RUNMAN_GM_TO_CROSS, 
						new CrossData(RunManEnun.runActState.name(), 2));
				return;
			}
			break;
		case OpenFunctionConst.FUN_DRAGONBOAT:
			//跨服龙舟
			DragonBoatLocalIO.getIns().gmKnockout(2);
			break;
		}
		logger.info(LogTool.rec("houtai activity start,funid:"+funid+",startTime:"+now));*/
	}
	
	/**
	 * 活动结束
	 * @param funid 系统id
	 * @param now 当前时间
	 */
	public static void end(int funid, int now){
		/*switch(funid){
		case OpenFunctionConst.FUN_TURELERACE:
			//小龟赛跑
			TurtleRaceEvent.getIns().turtleRaceEnd(now);
			break;
		case OpenFunctionConst.FUN_RABBIT:
			//兔子变身
			if(!RabbitConst.OPEN){
				return;
			}
			ScheduleUtil.cancelTask(ScheduleConst.RABBIT_LUOBO);
			RabbitEvent.getIns().end(now);
			break;
		case OpenFunctionConst.FUN_QUNXIONG:
			//群雄逐鹿
			CompeteHegemonyManager.getIns().end();
			break;
		case OpenFunctionConst.FUN_WORLDBOSS:
			//世界BOSS
			WorldBossConst.BOSS_TYPE = -1;
			WorldBossEvent.getIns().endWorldBoss();
			break;
		case OpenFunctionConst.FUN_FISH:
			//钓鱼活动
//			FishCache.endFish();
			
			//改为跨服，20160819
			List<CrossClient> crossServers = FishCache.getCrossServers();
			for(final CrossClient cc:crossServers){
				NettyWrite.writeXData(cc.getCrossChannel(), CrossConst.FISH_GM_TO_CROSS, 
						new CrossData(FishCrossEnum.fishState.name(), false));
			}
			break;
		case OpenFunctionConst.FUN_SHIPOTIAN:
			//真假石破天
			ScheduleUtil.cancelTask(ScheduleConst.SHIPOTIAN_NPC);
			ShiPoTianManager.getIns().end();
			break;
		case OpenFunctionConst.FUN_CS:
			//反恐精英
			if(CSCache.getCSState()==CSConst.STATE_OVER){
				logger.warn("cs is over,please set ready");
				return;
			}
			CSCache.setCsState(CSConst.STATE_OVER);
			//关闭图标
			CSEvent.getIns().icon(false);
			CSFunction.getIns().endReward();
			//死亡状态去除
			for(CSRoom room:CSCache.getRoomMap().values()){
				SceneFunction.getIns().setSceneStateNormal(room.getSceneUid(), CSConst.ID_CS_SCENE);
				SceneFunction.getIns().exitSceneBatch(room.getSceneUid(),CSConst.ID_CS_SCENE);
			}
			ScheduleUtil.cancelTask(ScheduleConst.CS_BUFF);
			ScheduleUtil.cancelTask(ScheduleConst.CS_EXP);
			CSCache.destroy();
			break;
		case OpenFunctionConst.FUN_GANGCOMPETITION:
			//帮会竞技
//			GangCompetitionManager.getIns().end();
			CrossData crossData = new CrossData();
			crossData.put(CrossEnum.type.name(), 3);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.GANG_COMPET_GM, crossData);
			break;
		case OpenFunctionConst.FUN_CROSS_TEAM_BATTLE:
			//跨服竞技3v3
			CrossData cd = new CrossData();
			cd.put(CrossEnum.type.name(), 2);
			NettyWrite.writeXData(Client_1.getIns().getCrossChannel(), CrossConst.CTB_GM, cd);
			break;
		case OpenFunctionConst.FUN_TRANSPORT_LEVEL_30:
			//跑镖活动
			TransportEvent.getIns().end();
			break;
		case OpenFunctionConst.FUN_RUNNINGMAN:
			//奔跑兄弟
			//改为跨服，20160903
			if(!CrossZone.isCrossServer()){
				NettyWrite.writeXData(Client_3.getIns().getCrossChannel(), CrossConst.RUNMAN_GM_TO_CROSS, 
						new CrossData(RunManEnun.runActState.name(), 3));
				return;
			}
			break;
		case OpenFunctionConst.FUN_DRAGONBOAT:
			//跨服龙舟
			DragonBoatLocalIO.getIns().gmKnockout(0);
			break;
		}
		logger.info(LogTool.rec("houtai activity end,funid:"+funid+",endTime:"+now));*/
	}
}
