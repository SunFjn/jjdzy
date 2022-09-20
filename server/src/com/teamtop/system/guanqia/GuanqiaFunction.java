package com.teamtop.system.guanqia;

import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.actGift.ActGiftManager;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.title.TitleInfo;
import com.teamtop.system.title.TitleModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dgq_205;
import excel.config.Config_kill_205;
import excel.struct.Struct_dgq_205;
import excel.struct.Struct_expup_200;
import excel.struct.Struct_kill_205;

/**
 * 关卡
 *
 */
public class GuanqiaFunction {
	private static GuanqiaFunction ins = null;

	public static GuanqiaFunction getIns() {
		if (ins == null) {
			ins = new GuanqiaFunction();
		}
		return ins;
	}

	public void refreshRank(final Hero hero, final int guanqia) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				List<GuanqiaRank> rankList = GuanqiaCache.getRankList();
				GuanqiaRank model = new GuanqiaRank();
				model.setHid(hero.getId());
				int index = rankList.indexOf(model);
				if (index >= 0) {
					// 在排行榜里
					model = rankList.get(index);
				} else {
					// 不在排行榜
					rankList.add(model);
				}
				model.setGuanqia(guanqia);
				model.setName(hero.getNameZoneid());
				model.setTotalStrength(hero.getTotalStrength());
				int timeTopGuanQia = hero.getGuanqia().getTimeTopGuanQia();
				model.setTimeTopGuanQia( timeTopGuanQia);
				// 刷新排行榜
				Collections.sort(rankList, GuanqiaComparator.getIns());
				while (rankList.size() > GuanqiaConst.RANK_SIZE) {
					rankList.remove(rankList.size() - 1);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return null;
			}
		});
	}
	
	/**
	 * 判断是否通关关卡
	 * @param hero
	 * @param num 关卡数
	 * @return true为开启，false为未开启
	 */
	public boolean checkOpen(Hero hero, int num){
		boolean isOpen = false;
		Guanqia guanqia = hero.getGuanqia();
		if(guanqia.getCurGuanqia() >= num){
			isOpen = true;
		}
		return isOpen;
	}
	
	/**
	 * 关卡GM方法
	 * @param hero
	 * @param type
	 * @param param
	 */
	public void GMGuanqia(Hero hero, int type, String[] param){
		Guanqia guanqia = hero.getGuanqia();
		if(guanqia == null) return;
		switch(type){
		case 14:
			//通过关卡
			int num = Integer.parseInt(param[0]);
			int curGuanqia = guanqia.getCurGuanqia();
			if (num <= curGuanqia) {
				return;
			}
			for (int i = curGuanqia + 1; i <= num; i++) {
				// 触发通关事件
				guanqia.setCurGuanqia(i);
				SystemEventFunction.triggerPassGuanqiaEvent(hero, i);
			}
			GuanqiaSender.sendCmd_1106(hero.getId(), num, null,null);
			int bigGuanqia = GuanqiaFunction.getIns().getBigGuanqia(num);
			if (bigGuanqia < 1) {
				bigGuanqia = 1;
			}
			guanqia.setBigGuanqia(bigGuanqia);
			GuanqiaSystemEvent.getIns().login(hero);
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_43, bigGuanqia);
			ActGiftManager.getIns().sendMsg(hero);
			break;
		}
	}
	/**
	 * 改名同步关卡排行榜
	 * @param hero
	 */
	public synchronized void changeName(Hero hero){
		List<GuanqiaRank> rankList = GuanqiaCache.getRankList();
		for(GuanqiaRank guanqiaRank: rankList){
			if(guanqiaRank.getHid()==hero.getId()){
				guanqiaRank.setName(hero.getNameZoneid());
				break;
			}
		}
	}

	/**
	 * 获取挂机加成
	 * 
	 * @param hero
	 * @return
	 */
	public int getAddition(Hero hero) {
		int addition = 0;
		try {
			TitleModel titleModel = hero.getTitleModel();
			Map<Integer, Map<Integer, Struct_expup_200>> expUpMap = GuanqiaCache.getExpUpMap();
			if (titleModel != null) {
				Map<Integer, Struct_expup_200> map = expUpMap.get(GuanqiaConst.ADD_TYPE1);
				Map<Integer, TitleInfo> titleMap = titleModel.getHasMap();
				Iterator<Integer> iterator = map.keySet().iterator();
				for (; iterator.hasNext();) {
					int titleId = iterator.next();
					if (titleMap.containsKey(titleId)) {
						addition += map.get(titleId).getUp();
					}
				}
			}
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			if (privilegeCardMap != null && privilegeCardMap.size() > 0) {
				Map<Integer, Struct_expup_200> map = expUpMap.get(GuanqiaConst.ADD_TYPE2);
				Set<Integer> cardSet = new HashSet<>(privilegeCardMap.keySet());
				Iterator<Integer> iterator = cardSet.iterator();
				for (; iterator.hasNext();) {
					int id = iterator.next();
					Struct_expup_200 expUp = map.get(id);
					if (expUp != null) {
						addition += expUp.getUp();
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GuanqiaFunction.class, hero.getId(), hero.getName(), "GuanqiaFunction getAddtion");
		}
		return addition;
	}

	/** 更新经验加成到前端 */
	public void updateExpAddition(Hero hero, int type, int titleId) {
		try {
			Map<Integer, Map<Integer, Struct_expup_200>> expUpMap = GuanqiaCache.getExpUpMap();
			if (type == GuanqiaConst.ADD_TYPE1) {
				Map<Integer, Struct_expup_200> map = expUpMap.get(GuanqiaConst.ADD_TYPE1);
				if (!map.containsKey(titleId)) {
					return;
				}
			} else if (type == GuanqiaConst.ADD_TYPE2) {

			} else {
				return;
			}
			HeroFunction.getIns().sendChange120(hero, GameConst.expAdd, getAddition(hero));
		} catch (Exception e) {
			LogTool.error(e, GuanqiaFunction.class, "GuanqiaFunction updateExpAddition");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public int checkRedPoint(Hero hero) {
		try {
			Guanqia guanqia = hero.getGuanqia();
			if(guanqia==null) {
				return -1;
			}
			int killMonsterCount = guanqia.getKillMonsterCount();
			int killAwardIndex = guanqia.getKillAwardIndex();
			int alreadyUseKillNum = 0;
			Map<Integer, Struct_kill_205> map = Config_kill_205.getIns().getMap();
			for (int i = 1; i <= killAwardIndex; i++) {
				alreadyUseKillNum += map.get(i).getNum();
			}
			int curGuanqia = guanqia.getCurGuanqia()-1;
			Set<Integer> bigRewardSet = guanqia.getBigRewardSet();
			List<Struct_dgq_205> sortList = Config_dgq_205.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_dgq_205 dgq_205 = sortList.get(i);
				int[][] range = dgq_205.getGuanqia();
				if (curGuanqia >= range[0][1]) {
					if (!bigRewardSet.contains(dgq_205.getID())) {
						return 3;
					}
				}
			}
			int leftNum = killMonsterCount - alreadyUseKillNum;
			int index = killAwardIndex + 1;
			Struct_kill_205 struct_kill_205 = map.get(index);
			if (struct_kill_205 != null) {
				int tj = struct_kill_205.getTj();
				if (guanqia.getCurGuanqia() < tj) {
					// 通关数不满足条件
					return -1;
				}
				int costNum = struct_kill_205.getNum();
				if (leftNum >= costNum) {
					// 斩杀数未达标无法领取
					return 2;
				}
				int todayMopUp = guanqia.getTodayMopUp();
				if (todayMopUp == 0) {
					return 1;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GuanqiaFunction.class, hero.getId(), hero.getName(), "GuanqiaFunction checkRedPoint");
		}
		return -1;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			int redPoint = checkRedPoint(hero);
			int state = RedPointConst.HAS_RED;
			if (redPoint < 0) {
				state = RedPointConst.NO_RED;
				RedPointFunction.getIns().fastUpdateRedPoint(hero, GuanqiaConst.SysId, 1, state);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, GuanqiaConst.SysId, 2, state);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, GuanqiaConst.SysId, 3, state);
				return;
			}
			RedPointFunction.getIns().fastUpdateRedPoint(hero, GuanqiaConst.SysId, redPoint, state);
		} catch (Exception e) {
			LogTool.error(e, GuanqiaFunction.class, hero.getId(), hero.getName(), "GuanqiaFunction updateRedPoint");
		}
	}

	public int getBigGuanqia(int curGuanqia) {
		List<Struct_dgq_205> sortList = Config_dgq_205.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_dgq_205 dgq_205 = sortList.get(i);
			int[][] guanqia = dgq_205.getGuanqia();
			if (curGuanqia >= guanqia[0][0] && curGuanqia <= guanqia[0][1]) {
				return dgq_205.getID();
			}
		}
		return 0;
	}

}
