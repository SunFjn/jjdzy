package com.teamtop.houtaiHttp.events.activityHandle;

import io.netty.channel.ChannelHandlerContext;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HouTaiHttpCache;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 日常活动开关
 * 后台设置日常活动开关需在原定时处理处加上判断是否有后台设定的活动
 * //判断是否后台有定时活动
 * if(HouTaiHttpCache.getHoutaiActivity().containsKey(CSConst.SYS_ID)){return;}
 * @author hepl
 *
 */
public class ActivityHttpEvent extends AbsHouTaiHttpEvent {

	private static ActivityHttpEvent ins = null;
	
	public static ActivityHttpEvent getIns(){
		if(ins == null){
			ins = new ActivityHttpEvent();
		}
		return ins;
	}
	
//	private static Logger logger = LoggerFactory.getLogger(ActivityHttpEvent.class);
	
	@Override
	public void handleGet(Map<String, String> paramMap,
			ChannelHandlerContext ctx) {
		try {
			String operTypeStr = paramMap.get("opertype");
			if(operTypeStr == null){
				HttpUtil.responseFail(ctx);
				return;
			}
			int operType = Integer.parseInt(operTypeStr);
			if(1 == operType){
				//查看所有活动的状态
				//以下所有活动统一返回的活动状态：0关闭，1准备，2开启，3后台已设定
//				M_Activity activity = new M_Activity();
//				activity.setTurtleRaceState(getActivityState(TurtleRaceCache.getTurtleRaceState(), HoutaiActivityConst.KEY_TurtleRace));//小龟赛跑状态 0：结束，1：准备，2：开启
//				activity.setRabbitState(getActivityState(RabbitConst.OPEN?2:0, HoutaiActivityConst.KEY_Rabbit));//兔子挖萝卜状态
//				if(CompeteHegemonyCache.getActivityData() == null){
//					activity.setCompeteHegeState(getActivityState(0, HoutaiActivityConst.KEY_CompeteHegemony));
//				}else {
//					if(CompeteHegemonyCache.getActivityData().getState() == 4){
//						activity.setCompeteHegeState(getActivityState(0, HoutaiActivityConst.KEY_CompeteHegemony));
//					}else {
//						activity.setCompeteHegeState(getActivityState(CompeteHegemonyCache.getActivityData().getState(), HoutaiActivityConst.KEY_CompeteHegemony));//群雄逐鹿，1准备，2开启，4结束
//					}
//				}
//				int worldBoss1 = 0;//上午世界BOSS活动状态，0关闭，1预备，2开启
//				int worldBoss2 = 0;//下午世界BOSS活动状态，0关闭，1预备，2开启
//				if(WorldBossConst.OPEN){
//					if(WorldBossConst.CHALLENGE){
//						if(WorldBossConst.BOSS_TYPE == 0){
//							worldBoss1 = 2;
//						}else if(WorldBossConst.BOSS_TYPE == 1){
//							worldBoss2 = 2;
//						}
//					}else {
//						if(WorldBossConst.BOSS_TYPE == 0){
//							worldBoss1 = 1;
//						}else if(WorldBossConst.BOSS_TYPE == 1){
//							worldBoss2 = 1;
//						}
//					}
//				}
//				activity.setWorldBossState(getActivityState(worldBoss1, HoutaiActivityConst.KEY_WorldBoss));//上午世界BOSS状态
//				activity.setWorldBossStateSecond(getActivityState(worldBoss2, HoutaiActivityConst.KEY_WorldBossSecond));//下午世界BOSS状态
//				activity.setFishState(getActivityState(FishCache.activityIsOpen?2:0, HoutaiActivityConst.KEY_Fish));//钓鱼活动状态
//				activity.setShiPoTianState(getActivityState(ShiPoTianCache.IS_START?2:0, HoutaiActivityConst.KEY_ShiPoTian));//真假石破天状态
//				activity.setCsState(getActivityState(CSCache.getCSState(), HoutaiActivityConst.KEY_CS));//反恐精英状态，0关闭，1准备，2开启
//				if(GangCompetitionCache.getActivityData() == null){
//					activity.setGangCompetitionState(getActivityState(0, HoutaiActivityConst.KEY_GangCompetition));
//				}else {
//					if(GangCompetitionCache.getActivityData().getState() == 3){
//						activity.setGangCompetitionState(getActivityState(0, HoutaiActivityConst.KEY_GangCompetition));
//					}else {
//						activity.setGangCompetitionState(getActivityState(GangCompetitionCache.getActivityData().getState(), HoutaiActivityConst.KEY_GangCompetition));//帮会竞技状态，1准备，2开启，3关闭
//					}
//				}
//				activity.setTransportState(getActivityState(TransportCache.activity_state==1?2:0, HoutaiActivityConst.KEY_Transport));//跑镖活动状态，0关闭，1开启
//				if(RunningManCache.getActivityData() == null){
//					activity.setRunningManState(getActivityState(0, HoutaiActivityConst.KEY_RunningMan));
//				}else {
//					if(RunningManCache.getActivityData().getState().ordinal() == 3){
//						activity.setRunningManState(getActivityState(0, HoutaiActivityConst.KEY_RunningMan));
//					}else {
//						activity.setRunningManState(getActivityState(RunningManCache.getActivityData().getState().ordinal(), HoutaiActivityConst.KEY_RunningMan));//奔跑兄弟状态，1准备，2开启，3关闭
//					}
//				}
//				activity.setDragonBoatState(getActivityState(DragonBoatLocalCache.knockoutState, HoutaiActivityConst.KEY_DragonBoat));//跨服龙舟状态
//				
//				String retStr = JsonUtils.toStr(activity);
//				HttpUtil.response(retStr, ctx);
			}else if(2 == operType){
				//修改活动状态
				String triggerStr = paramMap.get("triggertype");
				String prepareStr = paramMap.get("preparetime");
				String startStr = paramMap.get("starttime");
				String endStr = paramMap.get("endtime");
				if(triggerStr == null || startStr == null || endStr == null){
					HttpUtil.responseFail(ctx);
					return;
				}
				int cmd = Integer.parseInt(triggerStr);
				int prepareTime = 0;
				int startTime = Integer.parseInt(startStr);
				int endTime = Integer.parseInt(endStr);
				if(prepareStr != null){
					prepareTime = Integer.parseInt(prepareStr);
				}
				int currentTime = TimeDateUtil.getCurrentTime();
				//判断时间是否小于当前时间
				if((prepareTime!=0 && prepareTime<currentTime) || startTime<currentTime || endTime<currentTime){
					HttpUtil.responseFail(ctx);
					return;
				}
				HoutaiActivity activity = new HoutaiActivity();
				activity.setPrepareTime(prepareTime);
				activity.setStartTime(startTime);
				activity.setEndTime(endTime);
				//后台日常活动缓存
				ConcurrentHashMap<Integer, HoutaiActivity> houtaiActivity = HouTaiHttpCache.getHoutaiActivity();
				
				int funid = getFunidByType(cmd, true);
				houtaiActivity.put(funid, activity);
//				logger.info(LogTool.rec("change activity state,cmd:"+cmd+",funid:"+funid+",prepareTime:"+prepareTime
//						+",startTime"+startTime+",endTime"+endTime));
				HttpUtil.responseSucc(ctx);
			}else if(3 == operType){
				//关闭指定活动
				String triggerStr = paramMap.get("triggertype");
				if(triggerStr == null){
					HttpUtil.responseFail(ctx);
					return;
				}
				int cmd = Integer.parseInt(triggerStr);
				int funid = getFunidByType(cmd, false);
				ConcurrentHashMap<Integer, HoutaiActivity> houtaiActivity = HouTaiHttpCache.getHoutaiActivity();
				houtaiActivity.remove(funid);
				HoutaiActivitySchedule.end(funid, TimeDateUtil.getCurrentTime());
				HttpUtil.responseSucc(ctx);
			}
		} catch (Exception e) {
//			logger.error(LogTool.exception(e, "ActivityHttpEvent has error!"));
			HttpUtil.responseFail(ctx);
		}
	}

	/**
	 * 根据cmd找到对应的系统id
	 * @param type
	 * @param modify 是否修改活动时查找，true是，false否
	 * @return
	 */
	public int getFunidByType(int type, boolean modify){
		/*int funid = 0;
		switch(type){
		case HoutaiActivityConst.KEY_TurtleRace:
			//小龟赛跑
			funid = OpenFunctionConst.FUN_TURELERACE;
			break;
		case HoutaiActivityConst.KEY_Rabbit:
			//兔子变身
			funid = OpenFunctionConst.FUN_RABBIT;
			break;
		case HoutaiActivityConst.KEY_CompeteHegemony:
			//群雄逐鹿
			funid = OpenFunctionConst.FUN_QUNXIONG;
			break;
		case HoutaiActivityConst.KEY_WorldBoss:
			//上午世界boss
			funid = OpenFunctionConst.FUN_WORLDBOSS;
			if(modify){
				WorldBossConst.BOSS_TYPE = 0;
			}
			break;
		case HoutaiActivityConst.KEY_WorldBossSecond:
			//下午世界boss
			funid = OpenFunctionConst.FUN_WORLDBOSS;
			if(modify){
				WorldBossConst.BOSS_TYPE = 1;
			}
			break;
		case HoutaiActivityConst.KEY_Fish:
			//钓鱼活动
			funid = OpenFunctionConst.FUN_FISH;
			break;
		case HoutaiActivityConst.KEY_ShiPoTian:
			//真假石破天
			funid = OpenFunctionConst.FUN_SHIPOTIAN;
			break;
		case HoutaiActivityConst.KEY_CS:
			//反馈精英
			funid = OpenFunctionConst.FUN_CS;
			break;
		case HoutaiActivityConst.KEY_GangCompetition:
			//帮会竞技
			funid = OpenFunctionConst.FUN_GANGCOMPETITION;
			break;
		case HoutaiActivityConst.KEY_Transport:
			//跑镖活动
			funid = OpenFunctionConst.FUN_TRANSPORT_LEVEL_30;
			break;
		case HoutaiActivityConst.KEY_RunningMan:
			//奔跑兄弟
			funid = OpenFunctionConst.FUN_RUNNINGMAN;
			break;
		case HoutaiActivityConst.KEY_DragonBoat:
			//跨服龙舟
			funid = OpenFunctionConst.FUN_DRAGONBOAT;
			break;
		default:
			break;
		}
		return funid;*/
		return 0;
	}
	
	/**
	 * 后台日常活动状态
	 * @param state 活动状态，0关闭，1准备，2开启
	 * @param key 系统对应key
	 * @return
	 */
	public HoutaiActivity getActivityState(int state, int key){
		//后台日常活动缓存
		/*ConcurrentHashMap<Integer, HoutaiActivity> houtaiActivity = HouTaiHttpCache.getHoutaiActivity();
		int funid = getFunidByType(key, false);
		HoutaiActivity activity = houtaiActivity.get(funid);
		if(activity == null){
			activity = new HoutaiActivity();
			activity.setState(state);
		}else {
			if(key == HoutaiActivityConst.KEY_WorldBoss && WorldBossConst.BOSS_TYPE != 0){
				//上午世界BOSS特殊处理
				activity = new HoutaiActivity();
				activity.setState(state);
			}else if(key == HoutaiActivityConst.KEY_WorldBossSecond && WorldBossConst.BOSS_TYPE != 1){
				//下午世界BOSS特殊处理
				activity = new HoutaiActivity();
				activity.setState(state);
			}else if(state == 0){
				//后台已设定状态
				activity.setState(3);
			}else {
				activity.setState(state);
			}
		}
		return activity;*/
		return null;
	}
	
}
