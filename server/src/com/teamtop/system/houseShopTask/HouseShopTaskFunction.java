package com.teamtop.system.houseShopTask;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.archive.ArchiveConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdmb_019;
import excel.config.Config_fdrc_019;
import excel.config.Config_fdrcbx_019;
import excel.config.Config_fdshop_019;
import excel.struct.Struct_fdmb_019;
import excel.struct.Struct_fdrc_019;
import excel.struct.Struct_fdrcbx_019;
import excel.struct.Struct_fdshop_019;
import io.netty.channel.Channel;

public class HouseShopTaskFunction {
	
	
	private static HouseShopTaskFunction houseShopTaskFunction;

	private HouseShopTaskFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HouseShopTaskFunction getIns() {
		if (houseShopTaskFunction == null) {
			houseShopTaskFunction = new HouseShopTaskFunction();
		}
		return houseShopTaskFunction;
	}
	
	/**
	 * 刷新商店数据
	 * 
	 * @param hero
	 * @param type 商店类型
	 */
	public void refreshShopData(Hero hero) {
		try {
			HouseShopTask houseShopTask = hero.getHouseShopTask();
			houseShopTask.getGoodsMap().clear();
			Map<Integer, ShopInfo> goodsMap = houseShopTask.getGoodsMap();
			ProbabilityEventModel pro = getPro();
			for (int i = 0; i < HouseShopTaskConst.ITEM_NUM; i++) {
				Struct_fdshop_019 fdshop_019 = (Struct_fdshop_019) ProbabilityEventUtil.getEventByProbability(pro);
				ShopInfo shopInfo=new ShopInfo();
				shopInfo.setShopIndex(fdshop_019.getId());
				shopInfo.setHasBuy(0);		
				goodsMap.put(i, shopInfo);
			}
			
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskFunction.class, hero.getId(), hero.getName(), "refreshShopData fail");
		}
	}
	
	
	public ProbabilityEventModel getPro() {
		ProbabilityEventModel probabilityEventModel =new ProbabilityEventModel();
		List<Struct_fdshop_019> sortList = Config_fdshop_019.getIns().getSortList();
		for (Struct_fdshop_019 fdshop_019:sortList) {
			probabilityEventModel.addProbabilityEvent(fdshop_019.getGailv(), fdshop_019);
		}
		return probabilityEventModel;
		
	}
	
	/**
	 * 重置府邸每日任务 以及 宝箱奖励
	 * @param hero
	 */
	public void resetDayTask(Hero hero) {
		Map<Integer, Integer> dayTask = hero.getHouseShopTask().getDayTask();
		List<Struct_fdrc_019> sortList = Config_fdrc_019.getIns().getSortList();
		for (Struct_fdrc_019 fdrc_019: sortList) {
			dayTask.put(fdrc_019.getId(), GameConst.REWARD_0);
		}
		
		Map<Integer, Integer> dayReward = hero.getHouseShopTask().getDayReward();
		List<Struct_fdrcbx_019> sortBoxList = Config_fdrcbx_019.getIns().getSortList();
		for (Struct_fdrcbx_019 fdrcbx_019: sortBoxList) {
			dayReward.put(fdrcbx_019.getBh(), GameConst.REWARD_0);
		}
		
	}
	/**
	 * 
	 * @param hero
	 */
	public void redPoint(Hero hero) {
		try {
			boolean isReadPoint=false;
			Map<Integer, Integer> dayTask = hero.getHouseShopTask().getDayTask();
			List<Struct_fdrc_019> sortList = Config_fdrc_019.getIns().getSortList();
			for (Struct_fdrc_019 fdrc_019: sortList) {
				Integer state = dayTask.get(fdrc_019.getId());
				if (state==GameConst.REWARD_1) {
					isReadPoint=true;
					break;
				}
			}
			Map<Integer, Integer> dayReward = hero.getHouseShopTask().getDayReward();
			List<Struct_fdrcbx_019> sortBoxList = Config_fdrcbx_019.getIns().getSortList();
			for (Struct_fdrcbx_019 fdrcbx_019: sortBoxList) {
				Integer state = dayReward.get(fdrcbx_019.getBh());
				if (state==GameConst.REWARD_1) {
					isReadPoint=true;
					break;
				}
			}
			
			Map<Integer, Integer> goalTaskReward = hero.getHouseShopTask().getGoalTaskMap();
			for (int key:goalTaskReward.keySet()) {
				Integer state = goalTaskReward.get(key);
				if (state==GameConst.REWARD_1) {
					isReadPoint=true;
					break;
				}
			}
			if (isReadPoint) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.HOUSETASK, ArchiveConst.RedPoint,
						RedPointConst.HAS_RED);
			}
			
		} catch (Exception e) {
			LogTool.error(e, this, "redPoint has wrong");
		}
	}
	
	public void CTLSuccessTaskOrGoal(Hero hero,int type,int intdexType,int can1, int can2) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		int zoneid = CommonUtil.getZoneIdById(hero.getId());
		Channel channel = CrossCache.getChannel(zoneid);
		CrossData crossData = new CrossData();
		crossData.putObject(HouseShopTaskEnum.hid, hero.getId());
		crossData.putObject(HouseShopTaskEnum.type, type);
		crossData.putObject(HouseShopTaskEnum.intdexType, intdexType);
		crossData.putObject(HouseShopTaskEnum.can1, can1);
		crossData.putObject(HouseShopTaskEnum.can2, can2);
		NettyWrite.writeXData(channel, CrossConst.CROSS_SUCCRSS_HOUSEGOAL, crossData);
	}
	
	
	public void LRCSuccessTaskOrGoal(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.CROSS_SUCCRSS_HOUSEGOAL;
			
			long hid = crossData.getObject(HouseShopTaskEnum.hid, Long.class);
			int type = crossData.getObject(HouseShopTaskEnum.type, Integer.class);
			int intdexType = crossData.getObject(HouseShopTaskEnum.intdexType, Integer.class);
			int can1 = crossData.getObject(HouseShopTaskEnum.can1, Integer.class);
			int can2 = crossData.getObject(HouseShopTaskEnum.can2, Integer.class);
			
			
			if (HeroFunction.getIns().isOnline(hid)) {
				Hero hero = HeroCache.getHero(hid);
				if (HouseShopTaskConst.INDEXTYPE_1==type) {
					successDayTaskLocal(hero, intdexType);
				}else if (HouseShopTaskConst.INDEXTYPE_2==type) {
					sccessGoalLocal(hero, intdexType, can1, can2);
				}else if(HouseShopTaskConst.INDEXTYPE_3==type){
					sccessGoalOneLocal(hero, intdexType, can1);
				}else if (HouseShopTaskConst.INDEXTYPE_4==type) {
					sccessSpeGoalLocal(hero, intdexType, can1, can2);
				}
			}
			
			
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskFunction.class, "LRCSuccessTaskOrGoal has wrong");
		}
	}
	
	
	/**
	 * 府邸目标生成
	 * @param hero
	 */
	public void initGoalTask(Hero hero) {
		HouseShopTask houseShopTask = hero.getHouseShopTask();
		Map<Integer, Integer> goalTaskMap = houseShopTask.getGoalTaskMap();
		Map<Integer, Integer> goalPlan = houseShopTask.getGoalPlan();
		Map<Integer, Integer> speGoal = houseShopTask.getSpeGoal();
		for (int i = 1; i <=2; i++) {
			speGoal.put(i, 0);
		}
		List<Struct_fdmb_019> sortList = Config_fdmb_019.getIns().getSortList();
		for (Struct_fdmb_019 fdmb_019: sortList) {
			goalTaskMap.put(fdmb_019.getId(), GameConst.REWARD_0);
			int type = fdmb_019.getType();
			if (!goalPlan.containsKey(type)) {
				goalPlan.put(type, fdmb_019.getCsjd());
			}
		}
	}
	/**
	 * 府邸日常完成
	 * @param hero
	 * @param index
	 */
	public void successDayTaskLocal(Hero hero,int index) {
		try {
			Map<Integer, Integer> dayTask = hero.getHouseShopTask().getDayTask();
			if (dayTask.containsKey(index)&&dayTask.get(index)==GameConst.REWARD_0) {
				dayTask.put(index, GameConst.REWARD_1);
				HouseShopTaskSender.sendCmd_11410(hero.getId(), index, GameConst.REWARD_1);
				//宝箱状态
				int successNum=0;
				for (int key:dayTask.keySet()) {
					int value=dayTask.get(key);
					if (value>=GameConst.REWARD_1) {
						successNum++;
					}
				}
				Map<Integer, Integer> dayReward = hero.getHouseShopTask().getDayReward();
				for (Struct_fdrcbx_019 fdrcbx_019:Config_fdrcbx_019.getIns().getSortList()) {
					int bh = fdrcbx_019.getBh();
					if (dayReward.get(bh)==GameConst.REWARD_0&&successNum>=fdrcbx_019.getCs()) {
						dayReward.put(bh, GameConst.REWARD_1);
						HouseShopTaskSender.sendCmd_11412(hero.getId(), bh, GameConst.REWARD_1);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskFunction.class, "successDayTask has wrong");
		}
	}
	/**
	 * 完成府邸目标 两个条件
	 */
	public void sccessGoalLocal(Hero hero,int typeIndex,int can1,int can2) {
		try {
			
			Map<Integer, Integer> goalTaskMap = hero.getHouseShopTask().getGoalTaskMap();
			ConcurrentHashMap<Integer, Struct_fdmb_019> concurrentHashMap = HouseShopTaskCache.getGoalInfoByType().get(typeIndex);
			Map<Integer, Integer> goalPlan =hero.getHouseShopTask().getGoalPlan();
			Integer state = goalPlan.get(typeIndex);
			
			for (Struct_fdmb_019 fdmb_019:concurrentHashMap.values()) {
				if (typeIndex==HouseShopTaskConst.GOAL_TYPE_301) {
					if (goalTaskMap.get(fdmb_019.getId())==GameConst.REWARD_0&&can1==fdmb_019.getCanshu1()&&can2>=fdmb_019.getCanshu2()) {
						goalTaskMap.put(fdmb_019.getId(), GameConst.REWARD_1);
						HouseShopTaskSender.sendCmd_11416(hero.getId(), fdmb_019.getId(), GameConst.REWARD_1);
					}
				}else {
					if (goalTaskMap.get(fdmb_019.getId())==GameConst.REWARD_0&&can1>=fdmb_019.getCanshu1()&&can2>=fdmb_019.getCanshu2()) {
						goalTaskMap.put(fdmb_019.getId(), GameConst.REWARD_1);
						HouseShopTaskSender.sendCmd_11416(hero.getId(), fdmb_019.getId(), GameConst.REWARD_1);
					}
				}
				
			}
			if (typeIndex!=HouseShopTaskConst.GOAL_TYPE_301&&typeIndex!=HouseShopTaskConst.GOAL_TYPE_302) {
				goalPlan.put(typeIndex, state+1);
			}
			
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskFunction.class, "sccessGoal has wrong");
		}
	}
	/**
	 * 完成府邸目标 1个条件
	 */
	public void sccessGoalOneLocal(Hero hero,int typeIndex,int can1) {
		try {
			Map<Integer, Integer> goalTaskMap = hero.getHouseShopTask().getGoalTaskMap();
			ConcurrentHashMap<Integer, Struct_fdmb_019> concurrentHashMap = HouseShopTaskCache.getGoalInfoByType().get(typeIndex);
			for (Struct_fdmb_019 fdmb_019:concurrentHashMap.values()) {
				if (goalTaskMap.get(fdmb_019.getId())==GameConst.REWARD_0&&can1>=fdmb_019.getCanshu1()) {
					goalTaskMap.put(fdmb_019.getId(), GameConst.REWARD_1);
					HouseShopTaskSender.sendCmd_11416(hero.getId(), fdmb_019.getId(), GameConst.REWARD_1);
				}
				Map<Integer, Integer> goalPlan =hero.getHouseShopTask().getGoalPlan();
				goalPlan.put(typeIndex, can1);
				
			}
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskFunction.class, "sccessGoalOne has wrong");
		}
	}
	/**
	 * 特殊任务 
	 * @param hero
	 * @param typeIndex  501举办宴会 
	 * @param can1
	 * @param can2
	 */
	public void sccessSpeGoalLocal(Hero hero,int typeIndex,int can1,int can2) {
		try {
			HouseShopTask houseShopTask = hero.getHouseShopTask();
			Map<Integer, Integer> goalTaskMap =houseShopTask.getGoalTaskMap();
			ConcurrentHashMap<Integer, Struct_fdmb_019> concurrentHashMap = HouseShopTaskCache.getGoalInfoByType().get(typeIndex);
			/*if (typeIndex==HouseShopTaskConst.GOAL_TYPE_501) {
				Integer num = houseShopTask.getSpeGoal().get(can1);
				num=1+num;
				houseShopTask.getSpeGoal().put(can1, num);
				can2=num;
			}else */
			if (typeIndex==HouseShopTaskConst.GOAL_TYPE_502) {
				if (!houseShopTask.getSpeGoal().containsKey(typeIndex)) {
					houseShopTask.getSpeGoal().put(typeIndex, 0);
				}
				Integer num = houseShopTask.getSpeGoal().get(typeIndex);
				num=num+1;
				houseShopTask.getSpeGoal().put(typeIndex, num);
				can1=num;
				Map<Integer, Integer> goalPlan =hero.getHouseShopTask().getGoalPlan();
				goalPlan.put(typeIndex, can1);
			}else if (typeIndex==HouseShopTaskConst.GOAL_TYPE_503) {
				if (!houseShopTask.getSpeGoal().containsKey(typeIndex)) {
					houseShopTask.getSpeGoal().put(typeIndex, 0);
				}
				Integer num = houseShopTask.getSpeGoal().get(typeIndex);
				num=num+1;
				houseShopTask.getSpeGoal().put(typeIndex, num);
				can1=num;
				Map<Integer, Integer> goalPlan =hero.getHouseShopTask().getGoalPlan();
				goalPlan.put(typeIndex, can1);
			}
			
			for (Struct_fdmb_019 fdmb_019:concurrentHashMap.values()) {
				if (goalTaskMap.get(fdmb_019.getId())==GameConst.REWARD_0&&can1>=fdmb_019.getCanshu1()&&can2>=fdmb_019.getCanshu2()) {
					goalTaskMap.put(fdmb_019.getId(), GameConst.REWARD_1);
					HouseShopTaskSender.sendCmd_11416(hero.getId(), fdmb_019.getId(), GameConst.REWARD_1);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HouseShopTaskFunction.class, "sccessGoalOne has wrong");
		}
	}
	

}
