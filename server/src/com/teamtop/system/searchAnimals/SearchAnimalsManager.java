package com.teamtop.system.searchAnimals;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterFunction;
import com.teamtop.system.openDaysSystem.specialAnimalSendGift.SpecialAnimalSendGiftFunction;
import com.teamtop.system.searchAnimals.model.Animals;
import com.teamtop.system.searchAnimals.model.SearchAnimals;
import com.teamtop.system.vip.VipManager;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xsxs_283;
import excel.config.Config_xsxspoint_283;
import excel.config.Config_xsxsreward_283;
import excel.struct.Struct_xsxs_283;
import excel.struct.Struct_xsxspoint_283;
import excel.struct.Struct_xsxsreward_283;

public class SearchAnimalsManager {
	private static SearchAnimalsManager searchAnimalsManager;
	private SearchAnimalsManager() {
		
	}
	public static synchronized SearchAnimalsManager getIns() {
		if (searchAnimalsManager == null) {
			searchAnimalsManager = new SearchAnimalsManager();
		}
		return searchAnimalsManager;
	}
	
	/**
	 * 打开寻兽界面
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SearchAnimalsConst.SysId)) return;
			SearchAnimals data = hero.getSearchAnimals();
			if (data == null) {
				SearchAnimalsEvent.getIns().init(hero);
				data = hero.getSearchAnimals();
			}
			
			List<Object[]> animalsList = new ArrayList<>();
			Map<Integer, Animals> map = data.getAnimals();
			for(Entry<Integer,Animals> entry : map.entrySet()) {
				Integer id = entry.getKey();
				Animals animals = entry.getValue();
				if(animals.getState() == 1) {
					animalsList.add(new Object[] { id, animals.getType(), animals.getId(),animals.getNum()});
				}
			}
			
			List<Object[]> awardsList = new ArrayList<>();
			Map<Integer, Integer> awardsMap = data.getAwards();
			for(Entry<Integer,Integer> entry : awardsMap.entrySet()) {
				Integer id = entry.getKey();
				Integer state = entry.getValue();
				awardsList.add(new Object[] {id, state});
			}
			
			SearchAnimalsSender.sendCmd_8762(hero.getId(), animalsList.toArray(), awardsList.toArray(), data.getScore());
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "SearchAnimalsManager openUI");
		}
	}
	
	/**
	 * 寻兽
	 * @param hero
	 * @param id 寻兽id
	 */
	public void search(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SearchAnimalsConst.SysId)) return;
			SearchAnimals data = hero.getSearchAnimals();
			List<Object[]> animalsList = new ArrayList<>();
			List<Object[]> awardsList = new ArrayList<>();
			int score = data.getScore();
			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(),SearchAnimalsConst.ITEMID);
			Map<Integer, Integer> awardsMap = data.getAwards();
			Struct_xsxsreward_283 struct_xsxsreward_283 = Config_xsxsreward_283.getIns().getSortList().get(0);
			int[][] conmuse = struct_xsxsreward_283.getConmuse();//需消耗元宝
			int num = 0;//需要寻兽的数量
			List<int[]> itemList = new ArrayList<int[]>();
			int resultScore = 0;//寻兽后积分
			Map<Integer, Animals> animalsMap = data.getAnimals();
			if(id > 0) {
				Struct_xsxs_283 struct_xsxs_283 = Config_xsxs_283.getIns().get(id);
				if(struct_xsxs_283 == null) {
					SearchAnimalsSender.sendCmd_8764(hid, SearchAnimalsConst.PARA_FAILURE, animalsList.toArray(), awardsList.toArray(),  score);return;//参数错误
				}
				Map<Integer, Animals> map = data.getAnimals();
				Animals animals = map.get(id);
				if(animals==null) {
					animals = SearchAnimalsFunction.getIns().getAnimals(map);
					map.put(id, animals);
				}
				if(animals.getState() == 1) {
					SearchAnimalsSender.sendCmd_8764(hid, SearchAnimalsConst.HAS_FOUND, animalsList.toArray(), awardsList.toArray(), score);return;//已寻
				}
				num = 1;
				itemList.add(new int[] {animals.getType(), animals.getId(),animals.getNum()});
			}else {//一键寻兽
				for(Entry<Integer,Animals> entry : animalsMap.entrySet()) {
					Animals animals = entry.getValue();
					if(animals.getState() == 0) {
						itemList.add(new int[] {animals.getType(), animals.getId(),animals.getNum()});
						num++;
					}
				}
			}
			
			int[][] items = new int[num][];//要添加的道具
			for(int i=0; i<num; i++) {
				items[i] = itemList.get(i);
			}
			boolean canAdd = UseAddUtil.canAdd(hero, items, false);
			if(!canAdd){//背包已满
				SearchAnimalsSender.sendCmd_8764(hid,SearchAnimalsConst.FULL,  animalsList.toArray(), awardsList.toArray(), score);return;//背包已满
			}
			
			if(canUseNum < num) {//扣除元宝
				if (!UseAddUtil.canUse(hero, conmuse, num)) {
					SearchAnimalsSender.sendCmd_8764(hid, SearchAnimalsConst.LACK_OF_MONEY,animalsList.toArray(), awardsList.toArray(),  score);return;//元宝不足
				}
				UseAddUtil.use(hero, conmuse, num, SourceGoodConst.SEARCHANIMALS_USE, true);
			}else {//扣除道具
				//扣道具
				if(!UseAddUtil.canUse(hero, GameConst.TOOL, SearchAnimalsConst.NUM*num, SearchAnimalsConst.ITEMID)) {
					//没道具扣
					return;
				}
				UseAddUtil.use(hero,GameConst.TOOL, SearchAnimalsConst.NUM*num, SearchAnimalsConst.ITEMID, SourceGoodConst.SEARCHANIMALS_USE2, true);
			}
			
			Animals highAnimals = null;//高级奖励，广播
			if(id > 0) {
				Animals animals = data.getAnimals().get(id);
				if(animals.getRadio() == 1) {
					highAnimals = animals;
				}
				animals.setState((byte)1);
				animalsList.add(new Object[] { id, animals.getType(), animals.getId(),animals.getNum()});
			}else {
				for(Entry<Integer,Animals> entry : animalsMap.entrySet()) {
					Animals animals = entry.getValue();
					if(animals.getState() == 0) {
						if(animals.getRadio() == 1) {
							highAnimals = animals;
						}
						animals.setState((byte)1);
						animalsList.add(new Object[] { entry.getKey(), animals.getType(), animals.getId(),animals.getNum()});
					}
				}
			}
			
			resultScore = score+SearchAnimalsConst.ADDSCORE*num;
			if(resultScore >= SearchAnimalsSysCache.getMaxScore()) {
				data.resetScore(resultScore-SearchAnimalsSysCache.getMaxScore());
			}else {
				data.setScore(resultScore);
			}
			
			List<Struct_xsxspoint_283> sortList = Config_xsxspoint_283.getIns().getSortList();
			for(Struct_xsxspoint_283 struct_xsxspoint_283 : sortList) {
				int pid = struct_xsxspoint_283.getId();
				Integer state = awardsMap.get(pid);
				if(state == null) {
					state = 0;
					awardsMap.put(pid, state);
				}
				int point = struct_xsxspoint_283.getPoint();
				if(score<point && resultScore>=point) {//达成积分奖励
					state = state+1;
					awardsMap.put(pid, state);
				}
				awardsList.add(new Object[] {pid, state});
			}
			UseAddUtil.add(hero, items, SourceGoodConst.SEARCHANIMALS_ADD, UseAddUtil.getDefaultMail(), true);
			SearchAnimalsSender.sendCmd_8764(hid, SearchAnimalsConst.SUCCESS, animalsList.toArray(), awardsList.toArray(), data.getScore());
			SpecialAnimalSendGiftFunction.getIns().taskHandler(hero, 4, num, 0);
			if(highAnimals != null) {
				ChatManager.getIns().broadCast(ChatConst.SEARCHANIMALS,new Object[] {hero.getName(),highAnimals.getId(),highAnimals.getNum()}); // 全服广播
			}
			LogTool.info(hid, hero.getName(), "SearchAnimalsManager search id=" + id, SearchAnimalsManager.class);
			// 万兽之王-仙山寻兽排名
			MonsterKingSearchMonsterFunction.getIns().addNum(hero, num);
			// 三国战令(活动)
			WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_8, num);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_16, num, 0);
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "SearchAnimalsManager search");
		}
	}
	
	/**
	 * 领取积分奖励
	 * @param hero
	 * @param id
	 */
	public void getAward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			SearchAnimals data = hero.getSearchAnimals();
			Map<Integer, Integer> awardsMap = data.getAwards();
			Integer state = awardsMap.get(id);
			if(state == null) {//1.成功 2.积分未达成 3.参数错误 4.已领取 5.背包已满
				SearchAnimalsSender.sendCmd_8766(hid, SearchAnimalsConst.PARA_FAILURE, id, 0); return;//参数错误
			}
			if(state == -1) {
				SearchAnimalsSender.sendCmd_8766(hid, SearchAnimalsConst.HAVE_RECEIVE, id, 0); return;//已领取
			}
			if(state == 0) {
				SearchAnimalsSender.sendCmd_8766(hid, SearchAnimalsConst.DID_NOT_REACH, id, 0); return;//积分未达成
			}
			
			Struct_xsxspoint_283 struct_xsxspoint_283 = Config_xsxspoint_283.getIns().get(id);
			int[][] reward = struct_xsxspoint_283.getReward();
			boolean canAdd = UseAddUtil.canAdd(hero, reward,state, false);
			if(!canAdd){//背包已满
				SearchAnimalsSender.sendCmd_8766(hid, SearchAnimalsConst.FULL, id, 0); return;//背包已满
			}
			
			UseAddUtil.add(hero, reward, SourceGoodConst.SEARCHANIMALS_ADD, UseAddUtil.getDefaultMail(), true);
			if(state > 1) {
				state = state-1;//领取次数递减
			}else {
				state = -1;//标记已领
				int point = struct_xsxspoint_283.getPoint();
				if(data.getScore() < point) {
					state = 0;
				}
			}
			awardsMap.put(id, state);
			SearchAnimalsSender.sendCmd_8766(hid, SearchAnimalsConst.SUCCESS, id, state);
			
//			int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(),SearchAnimalsConst.ITEMID);
//			if(canUseNum <= 0) {
//				boolean notRed = true;//主推取消红点
//				for(Integer s : awardsMap.values()) {
//					if(s >= 1) {
//						notRed = false;
//					}
//				}
//				if(notRed) {
//					RedPointFunction.getIns().fastUpdateRedPoint(hero, SearchAnimalsConst.SysId, SearchAnimalsConst.RED_POINT,RedPointConst.NO_RED);
//				}
//			}
			LogTool.info(hid, hero.getName(), "SearchAnimalsManager getAward id=" +id + " state="+state, SearchAnimalsManager.class);
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "SearchAnimalsManager getAward");
		}
	}
	
	/**
	 * 仙山寻兽重置
	 * @param hero
	 */
	public void reset(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SearchAnimalsConst.SysId)) return;
			SearchAnimals data = hero.getSearchAnimals();
			Map<Integer, Animals> animalsMap = data.getAnimals();
			for(Entry<Integer,Animals> entry : animalsMap.entrySet()) {
				Animals animals = entry.getValue();
				if(animals.getState() == 0) {
					int size = Config_xsxs_283.getIns().size();
					if(size == animalsMap.size()) {
						SearchAnimalsSender.sendCmd_8768(hid, SearchAnimalsConst.NOT_ALL_FIND); return;//未全部寻完不能重置 
					}
				}
			}
			SearchAnimalsFunction.getIns().initAnimals(data);
			SearchAnimalsSender.sendCmd_8768(hid, SearchAnimalsConst.SUCCESS);
		} catch (Exception e) {
			LogTool.error(e, VipManager.class, hid, hero.getName(), "SearchAnimalsManager reset");
		}
	}
}
