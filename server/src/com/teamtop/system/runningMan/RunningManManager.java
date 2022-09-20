package com.teamtop.system.runningMan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.generalSoul.GeneralSoulFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ggzj_008;
import excel.struct.Struct_ggzj_008;

public class RunningManManager {
	
	private static RunningManManager ins;
	public static RunningManManager getIns(){
		if(ins == null) {
			ins = new RunningManManager();
		}
		return ins;
	}
	
	public void openUi(Hero hero) {
		try {
			Object[] infos=new Object[1];
			infos[0]=new Object[] {1,hero.getRunningMan().getMaxtodaynum(),hero.getRunningMan().getMaxHisnum()};
			RunningManSender.sendCmd_1552(hero.getId(), infos);
		} catch (Exception e) {
			LogTool.error(e, RunningManManager.class, hero.getId(), hero.getName(), "battleType has wrong");
		}
		
	}
	/**
	 * 进入过关斩将
	 * @param hero
	 * @param type
	 */
	public void battleType(Hero hero, int type) {
		try {
			/*if (type>RunningManConst.TYPE_1) {
				int priorNum=type-1;
				int maxnum=hero.getRunningMan().getMaxHisFloor().get(priorNum);
				if (maxnum>0) {
					int num=maxnum%(priorNum*1000);
					if (num!=RunningManConst.MaxNum) {
						RunningManSender.sendCmd_1554(hero.getId(), 1, type, 0, 0);
						return;
					}
				}else {
					RunningManSender.sendCmd_1554(hero.getId(), 1, type, 0, 0);
					return;
				}
			}*/
			type=RunningManConst.TYPE_1;
			RunningMan runningMan = hero.getRunningMan();
			int floornum=runningMan.getMaxtodaynum();
			int goalfloornum;
			if (floornum==0) {
				goalfloornum=type*1000+1;
			}else {
				goalfloornum=Config_ggzj_008.getIns().get(floornum).getNext();
			}
			Struct_ggzj_008 ggzi=Config_ggzj_008.getIns().get(goalfloornum);
			int npcid=ggzi.getBoss();
			int checkWinOther = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			RunningManSender.sendCmd_1554(hero.getId(), 0, type, checkWinOther, goalfloornum);
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE24);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_49, 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, RunningManManager.class, hero.getId(), hero.getName(), "battleType has wrong");
		}
		
	}
	/**
	 * 获取过关斩将奖励
	 * @param hero
	 * @param type
	 */
	public void getreward(Hero hero, int type) {
		try {
			type=RunningManConst.TYPE_1;
			int isfrist=0;
			RunningMan runningMan = hero.getRunningMan();
			int floornum=runningMan.getMaxtodaynum();
			int goalfloornum;
			if (floornum==0) {
				goalfloornum=type*1000+1;
			}else {
				goalfloornum=Config_ggzj_008.getIns().get(floornum).getNext();
			}
			Struct_ggzj_008 ggzi=Config_ggzj_008.getIns().get(goalfloornum);
			int npcid=ggzi.getBoss();
			int checkWinOther = BattleFunction.checkWinGuanqiaBoss(hero, npcid);
			if (checkWinOther==0) {
				RunningManSender.sendCmd_1556(hero.getId(), 1, type,isfrist, goalfloornum, null);
				return;
			}
			List<Object> awards = new ArrayList<Object>();
			if (runningMan.getMaxHisnum()<goalfloornum) {
				isfrist=1;
				//首次通过
				runningMan.setMaxHisnum(goalfloornum); 
				
				/*for(int[] reward:ggzi.getAward()) {
					awards.add(new Object[] {reward[0],reward[1],reward[2]});
				}*/
				UseAddUtil.add(hero, ggzi.getAward(), SourceGoodConst.RUNNINGMAN_DOUBLE, null, true);
				GeneralSoulFunction.getIns().activateGeneralSoul(hero, type, ggzi.getGuan());
			}
			//boss掉落
			List<ProbabilityEventModel> pelist = RunningManCache.getBossDropMap().get(goalfloornum);
			List<int[]> dropArr = new ArrayList<int[]>();
			BagFunction.getIns().getBossDrop(hero,awards,dropArr,pelist);
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			runningMan.setMaxtodaynum(goalfloornum);
			UseAddUtil.add(hero, drops, SourceGoodConst.RUNNINGMAN_REWARD, null, true);
			RunningManSender.sendCmd_1556(hero.getId(), 0, type,isfrist, goalfloornum, awards.toArray());
			if (ggzi.getNext()==0) {
				ChatManager.getIns().broadCast(ChatConst.BROCAST_RUNNINGMAN,
						new Object[] { hero.getName(), type }); // 全服广播
			}
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_13, 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, RunningManManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}
	/**
	 * 一键扫荡
	 * @param hero
	 * @param type
	 */
	public void oneKey(Hero hero, int type) {
		try {
			type=RunningManConst.TYPE_1;
			RunningMan runningMan = hero.getRunningMan();
			int floornum=runningMan.getMaxHisnum();
			int nowFloor=runningMan.getMaxtodaynum();
			int goalfloornum=0;
			if (floornum==0) {
				nowFloor=type*1000+1;
				RunningManSender.sendCmd_1558(hero.getId(), 1, type, null);
				return;
			}else {
				goalfloornum=floornum;
			}
			if (nowFloor==0) {
				nowFloor=type*1000+1;
			}else {
				if (goalfloornum==nowFloor) {
					return;
				}
				nowFloor=Config_ggzj_008.getIns().get(nowFloor).getNext();
			}
			
			List<int[]> dropArr = new ArrayList<int[]>();
			List<Object> awards = new ArrayList<Object>();
			int i=0;
			while (goalfloornum>=nowFloor) {
				//boss掉落
				List<ProbabilityEventModel> pelist = RunningManCache.getBossDropMap().get(nowFloor);
				BagFunction.getIns().getBossDrop(hero,awards,dropArr,pelist);
				nowFloor=Config_ggzj_008.getIns().get(nowFloor).getNext();
				if (nowFloor==0) {
					break;
				}
				i++;
				if (i>2000) {
					break;
				}
			}
			//
			HashMap<Integer, Integer> huobiMap=new HashMap<>();
			HashMap<Integer, Integer> itemMap=new HashMap<>();
			HashMap<Integer, Integer> equipMap=new HashMap<>();
			for (int j = 0; j < dropArr.size(); j++) {
				int[] item = dropArr.get(j);
				if (item[0]==GameConst.EQUIP) {
					//装备
					equipMap.put(item[1], item[2]);
				}else if (item[0]==GameConst.TOOL) {
					//道具
					if (itemMap.containsKey(item[1])) {
						int num=itemMap.get(item[1]);
						itemMap.put(item[1], num+item[2]);
					}else {
						itemMap.put(item[1], item[2]);
					}
				}else {
					//货币
					if (huobiMap.containsKey(item[0])) {
						int num=huobiMap.get(item[0]);
						huobiMap.put(item[0], item[2]+num);
					}else {
						huobiMap.put(item[0], item[2]);
					}
				}
			}
			dropArr = new ArrayList<int[]>();
			awards = new ArrayList<Object>();
			if (equipMap.size()>0) {
				for (int key:equipMap.keySet()) {
					dropArr.add(new int[] {GameConst.EQUIP, key, equipMap.get(key)});
					awards.add(new Object[] {GameConst.EQUIP, key, equipMap.get(key)});
				}
			}
			if (itemMap.size()>0) {
				for (int key:itemMap.keySet()) {
					dropArr.add(new int[] {GameConst.TOOL, key, itemMap.get(key)});
					awards.add(new Object[] {GameConst.TOOL, key, itemMap.get(key)});
				}
			}
			if (huobiMap.size()>0) {
				for (int key:huobiMap.keySet()) {
					dropArr.add(new int[] {key, 0, huobiMap.get(key)});
					awards.add(new Object[] {key, 0, huobiMap.get(key)});
				}
			}
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			runningMan.setMaxtodaynum(goalfloornum);
			UseAddUtil.add(hero, drops, SourceGoodConst.RUNNINGMAN_REWARD, null, true);
			RunningManSender.sendCmd_1558(hero.getId(), 0, type, awards.toArray());
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE24);
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_13, 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, RunningManManager.class, hero.getId(), hero.getName(), "oneKey has wrong");
		}

	}

}
