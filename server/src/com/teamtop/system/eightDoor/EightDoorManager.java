package com.teamtop.system.eightDoor;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bmjs_262;
import excel.config.Config_bmjsrw_262;
import excel.struct.Struct_bmjs_262;
import excel.struct.Struct_bmjsrw_262;

/**
 * 
 * @author jjjjyyy
 *
 */
public class EightDoorManager {
	
	
	private static EightDoorManager ins = null;
	
	public static EightDoorManager getIns(){
		if(ins == null){
			ins = new EightDoorManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			if (!EightDoorFunction.getIns().isOpen()) {
				return;
			}
			EightDoor eightDoor = hero.getEightDoor();
			if (eightDoor==null) {
				LogTool.warn("eightDoor==null", EightDoorManager.class);
				return;
			}
			Object[] tasksinfo=new Object[eightDoor.getTaskRewads().size()];
			int i=0;
			for (Integer key:eightDoor.getTaskRewads().keySet()) {
				Integer[] infos=eightDoor.getTaskRewads().get(key);
				tasksinfo[i]=new Object[]{key,infos[0],infos[1]};
				i++;
			}
			Object[] biggoal=new Object[eightDoor.getBigGoalReward().size()];
			i=0;
			for (Integer key:eightDoor.getBigGoalReward().keySet()) {
				biggoal[i]=new Object[] {key,eightDoor.getBigGoalReward().get(key)};
				i++;
			}
			EightDoorSender.sendCmd_4522(hero.getId(), tasksinfo, biggoal, eightDoor.getRechargenum());
		} catch (Exception e) {
			LogTool.error(e, EightDoorManager.class, "openUi has wrong");
		}
		
	}
	/**
	 * CG 领取大奖 4525
	 * @param bigid| 大奖类型id| int
	 */
	public void gettask(Hero hero, int taskid) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			if (!EightDoorFunction.getIns().isOpen()) {
				return;
			}
			EightDoor eightDoor = hero.getEightDoor();
			if(!eightDoor.getTaskRewads().containsKey(taskid)) {
				return;
			}
			Integer[] reward = eightDoor.getTaskRewads().get(taskid);
			Struct_bmjsrw_262 struct_bmjsrw_262 = Config_bmjsrw_262.getIns().get(taskid);
			if (reward[1]==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, struct_bmjsrw_262.getReward(), false)) {
					reward[1]=GameConst.REWARD_2;
					UseAddUtil.add(hero, struct_bmjsrw_262.getReward(), SourceGoodConst.EIGHTDOOR_TASK, null, true);
					EightDoorSender.sendCmd_4524(hero.getId(),taskid, 0);
				}
			}
			int door=struct_bmjsrw_262.getDoor();
			int bigState=eightDoor.getBigGoalReward().get(door);
			boolean isAllGet=true;
			for (Struct_bmjsrw_262 bmjsrw_262: Config_bmjsrw_262.getIns().getSortList()) {
				if (bmjsrw_262.getDoor()==door) {
					Integer[] rewardstate = eightDoor.getTaskRewads().get(bmjsrw_262.getId());
					if (rewardstate[1]!=GameConst.REWARD_2) {
						isAllGet=false;
					}
				}
			}
			if (isAllGet&&bigState==GameConst.REWARD_0) {
				eightDoor.getBigGoalReward().put(door, GameConst.REWARD_1);
				EightDoorSender.sendCmd_4530(hero.getId(), new Object[] {new Object[] {door,GameConst.REWARD_1}});
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, EightDoorManager.class, "gettask has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param bigid
	 */
	public void getBig(Hero hero, int bigid) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			if (!EightDoorFunction.getIns().isOpen()) {
				return;
			}
			EightDoor eightDoor = hero.getEightDoor();
			if(!eightDoor.getBigGoalReward().containsKey(bigid)) {
				return;
			}
			Integer state = eightDoor.getBigGoalReward().get(bigid);
			if (state==GameConst.REWARD_2) {
				return;
			}
			Struct_bmjs_262 bmjs_262=Config_bmjs_262.getIns().get(bigid);
			boolean isAllGet=true;
			for (Struct_bmjsrw_262 bmjsrw_262: Config_bmjsrw_262.getIns().getSortList()) {
				if (bmjsrw_262.getDoor()==bigid) {
					Integer[] rewardstate = eightDoor.getTaskRewads().get(bmjsrw_262.getId());
					if (rewardstate[1]!=GameConst.REWARD_2) {
						isAllGet=false;
					}
				}
			}
			if (isAllGet&&state==GameConst.REWARD_0) {
				eightDoor.getBigGoalReward().put(bigid, GameConst.REWARD_1);
				state = eightDoor.getBigGoalReward().get(bigid);
			}
			
			if (state==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, bmjs_262.getReward(), false)) {
					eightDoor.getBigGoalReward().put(bigid, GameConst.REWARD_2);
					UseAddUtil.add(hero, bmjs_262.getReward(), SourceGoodConst.EIGHTDOOR_BIG, null, true);
					EightDoorSender.sendCmd_4526(hero.getId(),bigid, 0);
					if (bmjs_262.getItem()[0][1]!=0) {
						//道具
						ChatManager.getIns().broadCast(ChatConst.EIGHTDOOR_BROAD, new Object[] {hero.getNameZoneid(),bigid,bmjs_262.getItem()[0][1],bmjs_262.getItem()[0][2]});
					}else {
						//货币
						ChatManager.getIns().broadCast(ChatConst.EIGHTDOOR_BROAD, new Object[] {hero.getNameZoneid(),bigid,bmjs_262.getItem()[0][0],bmjs_262.getItem()[0][2]});
					}
					return;
				}
			}
			EightDoorSender.sendCmd_4526(hero.getId(),bigid, 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, EightDoorManager.class, "getBig has wrong");
		}
		
	}
	
	
	

}
