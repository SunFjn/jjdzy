package com.teamtop.system.eightDoor;

import java.util.ArrayList;
import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.destiny.DestinyFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_bmjs_262;
import excel.config.Config_bmjsrw_262;
import excel.struct.Struct_bmjs_262;
import excel.struct.Struct_bmjsrw_262;

public class EightDoorFunction {
	
	private static EightDoorFunction ins = null;
	
	public static EightDoorFunction getIns(){
		if(ins == null){
			ins = new EightDoorFunction();
		}
		return ins;
	}
	
	public boolean isOpen() {
		EightDoorSysModel eightDoorSysModel = EightDoorSysCache.getEightDoorSysModel();
		int nowTime=TimeDateUtil.getCurrentTime();
		if (nowTime<eightDoorSysModel.getOverTime()&&nowTime>eightDoorSysModel.getBeginTime()) {
			return true;
		}
		return false;
		
	}
	
	
	public void reshEightDoor(Hero hero,int type,int num) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			if (!isOpen()) {
				return;
			}
			ArrayList<Object[]> list=new ArrayList<Object[]>();
			EightDoor eightDoor = hero.getEightDoor();
			for(Struct_bmjsrw_262 bmjsrw_262:Config_bmjsrw_262.getIns().getSortList()) {
				int type2 = bmjsrw_262.getType();
				int index = bmjsrw_262.getId();
				int needNum=bmjsrw_262.getCs();
				Integer[] numandstate = eightDoor.getTaskRewads().get(index);
				if (type2==type) {
					switch (type) {
					case EightDoorConst.EIGHTDOOR_TYPE_8:
					    //解锁阵眼总数
						if (numandstate[1]==GameConst.REWARD_0) {
							int jiesuonum = DestinyFunction.getIns().jiesuonum(hero);
							numandstate[0]=jiesuonum;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					case EightDoorConst.EIGHTDOOR_TYPE_9:
						//符文总等级
						if (numandstate[1]==GameConst.REWARD_0) {
							int fuwenSumLevel = DestinyFunction.getIns().getfuwenSumLevel(hero);
							numandstate[0]=fuwenSumLevel;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					case EightDoorConst.EIGHTDOOR_TYPE_10:
						//装备橙品符文个数
						if (numandstate[1]==GameConst.REWARD_0) {
							int Orangenum = DestinyFunction.getIns().getfuwenNumByType(hero,GameConst.Orange);
							numandstate[0]=Orangenum;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					case EightDoorConst.EIGHTDOOR_TYPE_11:
						//装备红品符文个数
						if (numandstate[1]==GameConst.REWARD_0) {
							int Rednum = DestinyFunction.getIns().getfuwenNumByType(hero,GameConst.RED);
							numandstate[0]=Rednum;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					case EightDoorConst.EIGHTDOOR_TYPE_12:
						//铜雀台
						if (numandstate[1]==GameConst.REWARD_0) {
							int FloorNum=hero.getPeacockFloor().getFloorNum();
							numandstate[0]=FloorNum;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					case EightDoorConst.EIGHTDOOR_TYPE_13:
						//过关斩将层数
						if (numandstate[1]==GameConst.REWARD_0) {
							int maxHisfloorNum=hero.getRunningMan().getMaxHisnum();
							numandstate[0]=maxHisfloorNum;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;						
					case EightDoorConst.EIGHTDOOR_TYPE_14:
						//乱世枭雄最高段位
						if (numandstate[1]==GameConst.REWARD_0) {
							numandstate[0]=hero.getCrossKing().getDuanwei();
							if (numandstate[0]!=0&&numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;						
					default:
						if (numandstate[1]==GameConst.REWARD_0) {
							numandstate[0]=numandstate[0]+num;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					}
				}
			}
			if (list.size()>0) {
				EightDoorSender.sendCmd_4528(hero.getId(), list.toArray());
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, EightDoorFunction.class, "reshEightDoor has wrong");
		}
	}
	
	/**
	 * 兼容老号的 八门-解锁符文
	 * @param hero
	 * @param type
	 * @param num
	 */
	public void oldHeroEightDoor(Hero hero,int type,int num) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			if (!isOpen()) {
				return;
			}
			ArrayList<Object[]> list=new ArrayList<Object[]>();
			EightDoor eightDoor = hero.getEightDoor();
			for(Struct_bmjsrw_262 bmjsrw_262:Config_bmjsrw_262.getIns().getSortList()) {
				int type2 = bmjsrw_262.getType();
				int index = bmjsrw_262.getId();
				int needNum=bmjsrw_262.getCs();
				Integer[] numandstate = eightDoor.getTaskRewads().get(index);
				if (type2==type) {
					switch (type) {
					case EightDoorConst.EIGHTDOOR_TYPE_8:
					    //解锁阵眼总数
						if (numandstate[1]==GameConst.REWARD_0) {
							int jiesuonum = DestinyFunction.getIns().jiesuonum(hero);
							numandstate[0]=jiesuonum;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;					
					default:
						if (numandstate[1]==GameConst.REWARD_0) {
							numandstate[0]=numandstate[0]+num;
							if (numandstate[0]>=needNum) {
								numandstate[1]=GameConst.REWARD_1;
							}
							list.add(new Object[]{index,numandstate[0],numandstate[1]});
						}
						break;
					}
				}
			}
			if (list.size()>0) {
				//EightDoorSender.sendCmd_4528(hero.getId(), list.toArray());
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, EightDoorFunction.class, "reshEightDoor has wrong");
		}
	}
	/**
	 * 
	 * @param hero
	 * @param yuanbao
	 */
	public void recharge(Hero hero, int yuanbao) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			if (!EightDoorFunction.getIns().isOpen()) {
				return;
			}
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_5, yuanbao);
			EightDoor eightDoor = hero.getEightDoor();
			eightDoor.setRechargenum(eightDoor.getRechargenum()+yuanbao);
			int rechargenum = eightDoor.getRechargenum();
			ArrayList<Object[]> list=new ArrayList<Object[]>();
			for(Struct_bmjs_262 bmjs_262:Config_bmjs_262.getIns().getSortList()) {
				int door=bmjs_262.getId();
				Integer state = eightDoor.getBigGoalReward().get(bmjs_262.getId());
				if (bmjs_262.getCz()!=0&&rechargenum>=bmjs_262.getCz()&&state==GameConst.REWARD_0) {
					//可快速完成
					for(Struct_bmjsrw_262 bmjsrw_262:Config_bmjsrw_262.getIns().getSortList()) {
						if (door==bmjsrw_262.getDoor()) {
							int taskid=bmjsrw_262.getId();
							Integer[] numandstate = eightDoor.getTaskRewads().get(taskid);
							if (numandstate[1]==GameConst.REWARD_0) {
								numandstate[1]=GameConst.REWARD_1;
								list.add(new Object[]{taskid,numandstate[0],numandstate[1]});
							}
						}
					}
					
				}
			}
			if (list.size()>0) {
				EightDoorSender.sendCmd_4528(hero.getId(), list.toArray());
			}
			EightDoorSender.sendCmd_4532(hero.getId(), rechargenum);
			return;
		} catch (Exception e) {
			LogTool.error(e, EightDoorFunction.class, "recharge has wrong");
		}
		
	}
	/**
	 * 消费
	 * @param hero
	 * @param consmeNum
	 */
	public void consmeNum(Hero hero, int consmeNum) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
				return;
			}
			reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_4, consmeNum);
		} catch (Exception e) {
			LogTool.error(e, EightDoorFunction.class, "consmeNum has wrong");
		}
	}
	/**
	 * 
	 * @param hero
	 */
	public void readPoint(Hero hero) {
		//角色等级小于开启等级
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR)){
			return;
		}
		if (!isOpen()) {
			return;
		}
		//角色等级小于开启等级
		boolean isreadpoint=false;
		int nowDoorNum=1;
		EightDoor eightDoor=hero.getEightDoor();
		HashMap<Integer, Integer> bigGoalReward = eightDoor.getBigGoalReward();
		HashMap<Integer, Integer[]> taskRewads = eightDoor.getTaskRewads();
		for (int i = 1; i <=Config_bmjs_262.getIns().size(); i++) {
			if (bigGoalReward.get(i)==GameConst.REWARD_2) {
				nowDoorNum=i+1;
			}
		}
		if (nowDoorNum<=Config_bmjs_262.getIns().size()) {
			for(Struct_bmjsrw_262 bmjsrw_262:Config_bmjsrw_262.getIns().getSortList()) {
				if (bmjsrw_262.getDoor()==nowDoorNum) {
					Integer[] integers = taskRewads.get(bmjsrw_262.getId());
					if (integers[1]==GameConst.REWARD_1) {
						isreadpoint=true;
					}
				}
				
			}
			if(bigGoalReward.get(nowDoorNum)==GameConst.REWARD_1) {
				isreadpoint=true;
			}
		}
		
		if (isreadpoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.EIGHTDOOR, ArchiveConst.RedPoint,
					RedPointConst.HAS_RED);
		}
		
	}

}
