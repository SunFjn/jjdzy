package com.teamtop.system.forge;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.forge.model.Forge;
import com.teamtop.system.forge.model.ForgeModel;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dzgem_209;
import excel.config.Config_dzgemsuit_209;
import excel.config.Config_dzinsoul_209;
import excel.config.Config_dzqianghua_209;
import excel.config.Config_dzqianghuasuit_209;
import excel.config.Config_dzsoul_209;
import excel.config.Config_dzstar_209;
import excel.config.Config_dzstarsuit_209;
import excel.config.Config_zhuanshenglh_256;
import excel.config.Config_zhuanshenglhds_256;
import excel.struct.Struct_dzgem_209;
import excel.struct.Struct_dzqianghua_209;
import excel.struct.Struct_dzsoul_209;
import excel.struct.Struct_zhuanshenglh_256;


public class ForgeManager {
	
	private static ForgeManager forgeManager;

	public static ForgeManager getIns() {
		if (forgeManager == null)
			forgeManager = new ForgeManager();
		return forgeManager;
	}
	/**
	 * 获取装备锻造信息 551
	 * @param hero
	 */
	public void getForges(Hero hero) {
		try {
			Forge forge=hero.getForge();
			if (forge==null) {
				return;
			}
			Object[] forgeModelMap=new Object[10];
			for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
				ForgeModel forgeModel=hero.getForge().getForgeModelMap().get(i);
				Object[] gem=new Object[4];
				for (int j = 0; j < gem.length; j++) {
					gem[j]=new Object[] {(int)forgeModel.getGemLevel()[j]};
				}
				forgeModelMap[i]=new Object[] {(byte)i,forgeModel.getStrengthen(),gem,forgeModel.getStarLevel()
						,forgeModel.getZhuHunLevel(),forgeModel.getZhuHunExp()}; 
				
			}
			Object[] shihunNum=new Object[hero.getForge().getHunLevels().size()];
			for (int i = 0; i < shihunNum.length; i++) {
				shihunNum[i]=new Object[] {hero.getForge().getHunLevels().get(i+1)};
			}
			//int[] dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
			int stength=hero.getForge().getDashi().get(0);
			int baoshi=hero.getForge().getDashi().get(1);
			int star=hero.getForge().getDashi().get(2);
			ForgeSender.sendCmd_552(hero.getId(), forgeModelMap, shihunNum,stength,baoshi,star);
		} catch (Exception e) {
			LogTool.error(e, this, "getForges has wrong");
		}
		
	}
	
	/**
	 * 强化
	 * @param hero
	 * @param id
	 */
	public void strengthen(Hero hero, int part){
		Forge forge = hero.getForge();
		if(forge==null){
			return;
		}
		Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
		if(forgeModelMap==null){
			return;
		}
		long hid = hero.getId();
		ForgeModel forgeModel = forgeModelMap.get(part);
		if (forgeModel==null) {
			return;
		}
		int nowStrengthenLe = forgeModel.getStrengthen();
		Struct_dzqianghua_209 qiangHua=Config_dzqianghua_209.getIns().get(nowStrengthenLe);
		int[][] xiaoHao = qiangHua.getConsume();
		if (xiaoHao==null) {
			ForgeSender.sendCmd_554(hero.getId(), 3, part, nowStrengthenLe);
			return;
		}
		if(!UseAddUtil.canUse(hero, xiaoHao, 1)){
			ForgeSender.sendCmd_554(hero.getId(), 4, part, nowStrengthenLe);
			return;
		}
		UseAddUtil.use(hero, xiaoHao, SourceGoodConst.FORGE_STRENGTHEN, true);
		forgeModel.setStrengthen(nowStrengthenLe+1);
		//重算战力
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_STRENGTHEN,SystemIdConst.FOGER_SYSID);
		//每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE3);
		//任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_2, 0);
		//转生红点
		//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
		ForgeSender.sendCmd_554(hid,  1, part, forgeModel.getStrengthen());
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_INTENSIFY, null);
		// 犒赏三军(活动)
		WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_1, 1);
		// 犒赏三军(开服)
		WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_1, 1);
	}
	
	/**
	 * 一键强化
	 * @param hero
	 */
	public void oneKeyStre(Hero hero) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			int Streng=forgeModelMap.get(0).getStrengthen();
			boolean isSameLv=true;
			for (int i = GameConst.INDEX_EQUIP_1; i <=GameConst.INDEX_EQUIP_9; i++) {
				if(Streng!=forgeModelMap.get(i).getStrengthen()) {
					isSameLv=false;
					break;
				}
			}
			Object[] rest=new Object[10];
			int a=0;
			int count = 0;
			HashMap<Integer, Integer> partUP=new HashMap<Integer, Integer>();
			List<int[]> useSumItemList=new ArrayList<int[]>();
			if (isSameLv) {
				//强化都是相同等级 强化一圈
				for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
					int nowStrengthenLe = forgeModelMap.get(i).getStrengthen();
					Struct_dzqianghua_209 qiangHua=Config_dzqianghua_209.getIns().get(nowStrengthenLe);
					int[][] xiaoHao = qiangHua.getConsume();
					if (xiaoHao==null) {
						break;
					}
					int index = useSumItemList.size() - 1;
					for(int[] arr:xiaoHao) {
						useSumItemList.add(arr);
					}
					if (!UseAddUtil.canUse(hero, useSumItemList)) {
						int size = useSumItemList.size() - 1;
						for (int j = size; j > index; j--) {
							useSumItemList.remove(j);
						}
						break;
					}
					int nowStrengLv=nowStrengthenLe+1;
					count += 1;
					partUP.put(i, nowStrengLv);
					rest[a]=new Object[] {i,nowStrengLv};
					a++;
				}
			}else {
				//强化等级不同 按强化等级从低到高强化一遍
				ArrayList<ForgeModel> list = new ArrayList<ForgeModel>();
				ForgeModelComparator forgeModelComparator=new ForgeModelComparator();
				for (int i = GameConst.INDEX_EQUIP_0; i <=GameConst.INDEX_EQUIP_9; i++) {
					list.add(forgeModelMap.get(i));
				}
				Collections.sort(list, forgeModelComparator);
				
				int maxLv=list.get(list.size()-1).getStrengthen();
				for (int i = 0; i < list.size(); i++) {
					int nowStrengthenLe = list.get(i).getStrengthen();
					int part=list.get(i).getPart();
					if (nowStrengthenLe<maxLv) {
						Struct_dzqianghua_209 qiangHua=Config_dzqianghua_209.getIns().get(nowStrengthenLe);
						int[][] xiaoHao = qiangHua.getConsume();
						if (xiaoHao==null) {
							break;
						}
						int index = useSumItemList.size() - 1;
						for(int[] arr:xiaoHao) {
							useSumItemList.add(arr);
						}
						if (!UseAddUtil.canUse(hero, useSumItemList)) {
							int size = useSumItemList.size()-1;
							for (int j = size; j > index; j--) {
								useSumItemList.remove(j);
							}
							break;
						}
						int nowStrengLv=nowStrengthenLe+1;
						count += 1;
						partUP.put(part, nowStrengLv);
						list.get(i).setStrengthen(nowStrengLv);
						rest[a]=new Object[] {part,nowStrengLv};
						a++;
					}
				}
			}
			if (partUP.size()>0) {
				UseAddUtil.use(hero, useSumItemList, SourceGoodConst.FORGE_ONEKEY_STRENGTHEN, true);
				for(Entry<Integer, Integer> entry:partUP.entrySet()) {
					forgeModelMap.get(entry.getKey()).setStrengthen(entry.getValue());
				}
			}
			rest=CommonUtil.removeNull(rest);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_STRENGTHEN,SystemIdConst.FOGER_SYSID);
			if (rest.length>0) {
				ForgeSender.sendCmd_572(hero.getId(), rest);
				//每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE3);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_2, 0);
				//转生红点
				//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
				// 犒赏三军(活动)
				WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_1, count);
				// 犒赏三军(开服)
				WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_1, count);
			}
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_INTENSIFY, null);
			return;
			
		} catch (Exception e) {
			LogTool.error(e, this, "oneKeyStre has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * 镶嵌宝石
	 * @param hero
	 * @param part
	 * @param index
	 * @param baoshi
	 */
	public void gem(Hero hero, int part, int index, int baoshi) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if (index<0||index>4) {
				return;
			}
			int num=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), baoshi);
			if (num==0) {
				return;
			}
			//判断是不是宝石
			if (!Config_dzgem_209.getIns().getMap().containsKey(baoshi)) {
				return;
			}
			if(Config_dzgem_209.getIns().getMap().get(baoshi).getPosition()!=index) {
				return;
			}
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, baoshi)) {
				return;
			}
			if(forgeModelMap.get(part).getGemLevel()[index-1]==0) {
				UseAddUtil.use(hero, GameConst.TOOL, 1, baoshi, SourceGoodConst.FORGE_GEM, true);
				forgeModelMap.get(part).getGemLevel()[index-1]=baoshi;
				//重算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_GME,SystemIdConst.FOGER_SYSID);
				ForgeSender.sendCmd_556(hero.getId(), 1, part, index, baoshi);
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_GEM, null);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_4, 0);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_1, 0);
				//转生红点
				//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
				return;
			}else {
				//拆除宝石
				int addBaoShi=forgeModelMap.get(part).getGemLevel()[index-1];
				UseAddUtil.add(hero, GameConst.TOOL, 1, addBaoShi, null, SourceGoodConst.FORGE_GEM_CHAI, true);
				//使用宝石
				UseAddUtil.use(hero, GameConst.TOOL, 1, baoshi, SourceGoodConst.FORGE_GEM, true);
				forgeModelMap.get(part).getGemLevel()[index-1]=baoshi;
				//重算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_GME,SystemIdConst.FOGER_SYSID);
				ForgeSender.sendCmd_556(hero.getId(), 1, part, index, baoshi);
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_GEM, null);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_4, 0);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_1, 0);
				//转生红点
				//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, this, "gem has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * 拆除宝石
	 * @param hero
	 * @param part
	 * @param index
	 * @param baoshiid
	 */
	public void chaiBaoShi(Hero hero, int part, int index, int baoshiid) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if (index<0||index>4) {
				return;
			}
			if(forgeModelMap.get(part).getGemLevel()[index-1]==0) {
				return;
			}
			//拆除宝石
			int addBaoShi=forgeModelMap.get(part).getGemLevel()[index-1];
			forgeModelMap.get(part).getGemLevel()[index-1]=0;
			UseAddUtil.add(hero, GameConst.TOOL, 1, addBaoShi, null, SourceGoodConst.FORGE_GEM_CHAI, true);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_GME,SystemIdConst.FOGER_SYSID);
			ForgeSender.sendCmd_558(hero.getId(), 1, part, index, addBaoShi);
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "chaiBaoShi has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * 在背包内合成 559
	 * @param hero
	 * @param baoshiId
	 */
	public void hechengbag(Hero hero, int baoshiId) {
		try {
			//判断是不是宝石
			if (!Config_dzgem_209.getIns().getMap().containsKey(baoshiId)) {
				return;
			}
			Struct_dzgem_209 dzgem_209=Config_dzgem_209.getIns().get(baoshiId);
			
			if(dzgem_209.getNext()==0) {
				//最高等级
				return;
			}
			if(UseAddUtil.canUse(hero, GameConst.TOOL, dzgem_209.getConsume(), baoshiId)) {
				UseAddUtil.use(hero, GameConst.TOOL, dzgem_209.getConsume(), baoshiId, SourceGoodConst.FORGE_GEM_HECHEN, true);
				UseAddUtil.add(hero, GameConst.TOOL, 1, dzgem_209.getNext(), null, SourceGoodConst.FORGE_GEM_HECHEN, true);
				ForgeSender.sendCmd_560(hero.getId(), 1, dzgem_209.getNext());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, this, "hechengbag has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * CG 合成宝石在装备上
	 * @param hero
	 * @param baoshi
	 * @param part
	 * @param index
	 */
	public void hecheng(Hero hero, int baoshi, int part, int index) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if (index<0||index>4) {
				return;
			}
			if(forgeModelMap.get(part).getGemLevel()[index-1]==0) {
				return;
			}
			int goalBaoShiId=forgeModelMap.get(part).getGemLevel()[index-1];
			//判断是不是宝石
			if (!Config_dzgem_209.getIns().getMap().containsKey(goalBaoShiId)) {
				return;
			}
			Struct_dzgem_209 dzgem_209=Config_dzgem_209.getIns().get(goalBaoShiId);
			if(dzgem_209.getNext()==0) {
				//最高等级
				return;
			}
			
			if(UseAddUtil.canUse(hero, GameConst.TOOL, dzgem_209.getConsume()-1, goalBaoShiId)) {
				UseAddUtil.use(hero, GameConst.TOOL, dzgem_209.getConsume()-1, goalBaoShiId, SourceGoodConst.FORGE_GEM_HECHEN, true);
				forgeModelMap.get(part).getGemLevel()[index-1]=dzgem_209.getNext();
				//重算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_GME,SystemIdConst.FOGER_SYSID);
				ForgeSender.sendCmd_562(hero.getId(), 1, part, index, dzgem_209.getNext());
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_GEM, null);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_4, 0);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_1, 0);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, this, "hecheng has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * yijian1
	 * @param hero
	 * @param part
	 */
	public void oneKeyBao(Hero hero,int index) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (index<GameConst.INDEX_EQUIP_0||index>GameConst.INDEX_EQUIP_9) {
				return;
			}
			boolean isChargeBao=false;
			//优先选中部位
			if (ForgeFunction.getIns().oneKeyBaoShi(hero, index)) {
				isChargeBao=true;
			}
			for (int part = GameConst.INDEX_EQUIP_0; part <=GameConst.INDEX_EQUIP_9; part++) {
				if (part!=index) {
					if (ForgeFunction.getIns().oneKeyBaoShi(hero, part)) {
						isChargeBao=true;
					}
				}
			}			
			if (isChargeBao) {
				Object[] baoshi=new Object[10];
				for (int part = GameConst.INDEX_EQUIP_0; part <=GameConst.INDEX_EQUIP_9; part++) {
					Object[] baoshiLevel=new Object[4];
					baoshi[part]= new Object[] {part,baoshiLevel} ;
					for (int i = 0; i < baoshiLevel.length; i++) {
						baoshiLevel[i]=new Object[] {forgeModelMap.get(part).getGemLevel()[i]};
					}
				}
				ForgeSender.sendCmd_564(hero.getId(), baoshi);
				//重算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_GME,SystemIdConst.FOGER_SYSID);
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_GEM, null);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_4, 0);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_1, 0);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "oneKeyBao has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * 升星
	 * @param hero
	 * @param part
	 */
	public void upStar(Hero hero, int part) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if(Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getConsume()==null) {
				//满级
				ForgeSender.sendCmd_566(hero.getId(), 2, part,forgeModelMap.get(part).getStarLevel());
				return;
			}
			if (UseAddUtil.canUse(hero, Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getConsume())) {
				
				UseAddUtil.use(hero, Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getConsume(),
						SourceGoodConst.FORGE_SATR, true);
				int pro = Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getCg();
				int vipPro = VipFunction.getIns().getVipNum(hero, VipAddType.forgeUpstar) * 1000;
				pro += vipPro;
				if (ProbabilityEventUtil.canRunEvent(pro, 100000)) {
					//升星成功
					forgeModelMap.get(part).setStarLevel(forgeModelMap.get(part).getStarLevel()+1);
					//重算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_STARLU,SystemIdConst.FOGER_SYSID);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_3, 0);
					ForgeSender.sendCmd_566(hero.getId(), 1, part,forgeModelMap.get(part).getStarLevel());
				}else {
					ForgeSender.sendCmd_566(hero.getId(), 0, part,forgeModelMap.get(part).getStarLevel());
				}
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_STARLEVEL, null);
				//转生红点
				//HeroFunction.getIns().loginRebornUpReadPoint(hero,false);
				EquipFunction.getIns().getSumEquipStar(hero);
				// 犒赏三军(活动)
				WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_2, 1);
				// 犒赏三军(开服)
				WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_2, 1);
				return;
			}
			ForgeSender.sendCmd_566(hero.getId(), 3, part,forgeModelMap.get(part).getStarLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "upStar has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * 铸魂 (类型0 1 2)
	 * @param hero
	 * @param type
	 */
	public void zhuHun(Hero hero, int type,int part) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if(hero.getForge().getForgeModelMap().get(part).getZhuHunLevel() >= Config_dzsoul_209.getIns().size()) {
				hero.getForge().getForgeModelMap().get(part).setZhuHunExp(0);
				return;
			}
			int num=1;
			int itemid=0;
			int addExp=0;
			switch (type) {
			case 0:
				itemid=ForgeConst.ZHU_ITEM_ID0;
				addExp=ForgeConst.ZHU_EPX_0;
				break;
			case 1:
				itemid=ForgeConst.ZHU_ITEM_ID1;
				addExp=ForgeConst.ZHU_EPX_1;
				break;
			case 2:
				itemid=ForgeConst.ZHU_ITEM_ID2;
				addExp=ForgeConst.ZHU_EPX_2;
				break;	
			default:
				break;
			}
			if (UseAddUtil.canUse(hero, GameConst.TOOL, num, itemid)) {
				UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.FORGE_ZHU_HUN, true);
				boolean isLevelUp=addExp(hero, part, addExp);
				if (isLevelUp) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_ZHUHUN,SystemIdConst.FOGER_SYSID);
				}
				ForgeSender.sendCmd_568(hero.getId(), 1, part, forgeModelMap.get(part).getZhuHunLevel(), forgeModelMap.get(part).getZhuHunExp());
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_5, 0);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, "zhuHun has wrong: "+ hero.getId());
		}
		
	}
	/**
	 * 一键铸魂
	 * @param hero
	 * @param part
	 * @param type
	 */
	public void oneKeyZhuHun(Hero hero, int part, int type) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if(hero.getForge().getForgeModelMap().get(part).getZhuHunLevel() >= Config_dzsoul_209.getIns().size()) {
				hero.getForge().getForgeModelMap().get(part).setZhuHunExp(0);
				return;
			}
			boolean isUpLevel=false;
			int itemid=0;
			int addExp=0;
			int needExp=Config_dzsoul_209.getIns().get(hero.getForge().getForgeModelMap().get(part).getZhuHunLevel()).getExp()-hero.getForge().getForgeModelMap().get(part).getZhuHunExp();
			int addSumExp=0;
			List<int[]> dropArr = new ArrayList<int[]>();
			
			
			for (int i = 0; i <=2; i++) {
				if (addSumExp>=needExp) {
					break;
				}
				switch (i) {
				case 0:
					itemid=ForgeConst.ZHU_ITEM_ID0;
					addExp=ForgeConst.ZHU_EPX_0;
					break;
				case 1:
					itemid=ForgeConst.ZHU_ITEM_ID1;
					addExp=ForgeConst.ZHU_EPX_1;
					break;
				case 2:
					itemid=ForgeConst.ZHU_ITEM_ID2;
					addExp=ForgeConst.ZHU_EPX_2;
					break;	
				default:
					break;
				}
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
				if (hasNum==0) {
					continue;
				}
				int nowneedExp=needExp-addSumExp;
				if (nowneedExp<=0) {
					break;
				}
				int needNum=nowneedExp/addExp;
				int yunum=nowneedExp%addExp;
				if (yunum>0) {
					needNum=needNum+1;
				}
				if (needNum<=hasNum) {
					//足够升级
					addSumExp=needNum*addExp+addSumExp;
				}else {
					//还不够
					needNum=hasNum;
					addSumExp=hasNum*addExp+addSumExp;
				}
				dropArr.add(new int[] {GameConst.TOOL, itemid, needNum});
			}
			if (addSumExp==0) {
				return;
			}
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			if (UseAddUtil.canUse(hero, drops)) {
				UseAddUtil.use(hero, drops, SourceGoodConst.FORGE_ZHU_HUN, true);
				isUpLevel=addExp(hero,part,  addSumExp);
			}
			if (isUpLevel) {
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_ZHUHUN,SystemIdConst.FOGER_SYSID);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_5, 0);
			}
			ForgeSender.sendCmd_574(hero.getId(), 1, part, forgeModelMap.get(part).getZhuHunLevel(), forgeModelMap.get(part).getZhuHunExp());
		    return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "oneKeyZhuHun part:"+part+" type:"+type);
		}
		
	}
	
	/**
	 * 加铸魂经验升级
	 * @param smelt
	 */
	public boolean addExp(Hero hero ,int part,int exp){
		ForgeModel forgeModel = hero.getForge().getForgeModelMap().get(part);
		if(forgeModel == null) return false;
		try {
			forgeModel.setZhuHunExp(forgeModel.getZhuHunExp() + exp);
			List<Struct_dzsoul_209> configs = Config_dzsoul_209.getIns().getSortList();
			boolean flag = false;
			for(int i=forgeModel.getZhuHunLevel();i<configs.size() ; i++){
				if(i >= configs.size()) {
					forgeModel.setZhuHunExp(0);
					break;
				}
				Struct_dzsoul_209 struct = configs.get(i);
				int upgradeExp =  struct.getExp();
				if (upgradeExp==0) {
					//最高级
					forgeModel.setZhuHunExp(0);
					break;
				}
				if(forgeModel.getZhuHunExp() >= upgradeExp){
					int defExp = forgeModel.getZhuHunExp() - upgradeExp;
					forgeModel.setZhuHunExp(defExp);
					forgeModel.setZhuHunLevel(struct.getLv()+1);
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addExp:"+exp+" part:"+part);
		}
		return false;
		
	}
	
	/**
	 * 噬魂
	 * @param hero
	 * @param index
	 * @param type
	 */
	public void shihun(Hero hero, int index, int type) {
		try {
			int[] dashiLv=ForgeFunction.getIns().getZhuHunDaShi(hero);
			int openLv=Config_dzinsoul_209.getIns().get(index).getStart();
			if (dashiLv[3]<openLv) {
				return;
			}
			
			int maxNum=0;
			for (int i = 0; i < Config_dzinsoul_209.getIns().get(index).getNum().length; i++) {
				if (dashiLv[3]>=Config_dzinsoul_209.getIns().get(index).getNum()[i][0]) {
					maxNum=Config_dzinsoul_209.getIns().get(index).getNum()[i][1];
				}
			}
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			int nowNum=forge.getHunLevels().get(index);
			if (nowNum>=maxNum) {
				return;
			}
			if (type==1) {
				//单次噬魂
				if (UseAddUtil.canUse(hero, Config_dzinsoul_209.getIns().get(index).getConsume(), 1)) {
					UseAddUtil.use(hero, Config_dzinsoul_209.getIns().get(index).getConsume(), SourceGoodConst.FORGE_SHI_HUN, true);
					forge.getHunLevels().put(index, nowNum+1);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_SHIHUN,SystemIdConst.FOGER_SYSID);
					ForgeSender.sendCmd_570(hero.getId(), 1, index, nowNum+1);
					return;
				}
			}else {
				int useNum=0;
				int lastNum=maxNum-nowNum;
				//一键噬魂
				int canUseNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(),Config_dzinsoul_209.getIns().get(index).getConsume()[0][1]);
				
				if (canUseNum>lastNum) {
					useNum=lastNum;
				}else {
					useNum=canUseNum;
				}
				if (useNum>0) {
					if (UseAddUtil.canUse(hero, Config_dzinsoul_209.getIns().get(index).getConsume(), useNum)) {
						UseAddUtil.use(hero, Config_dzinsoul_209.getIns().get(index).getConsume(), useNum, SourceGoodConst.FORGE_SHI_HUN, true);
						forge.getHunLevels().put(index, nowNum+useNum);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_SHIHUN,SystemIdConst.FOGER_SYSID);
						ForgeSender.sendCmd_570(hero.getId(), 1, index, nowNum+useNum);
						return;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "shihun index:"+index+" type:"+type);
		}
		
	}
	/**
	 * 一键合成宝石
	 * @param hero
	 * @param sysid
	 */
	public void oneKeyHeBao(Hero hero, int sysid) {
		try {
			//判断是不是宝石
			if (!Config_dzgem_209.getIns().getMap().containsKey(sysid)) {
				return;
			}
			Struct_dzgem_209 dzgem_209=Config_dzgem_209.getIns().get(sysid);
			
			if(dzgem_209.getNext()==0) {
				//最高等级
				return;
			}
			int num=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), sysid);
			if (num>=dzgem_209.getConsume()) {
				int hechengNum=num/dzgem_209.getConsume();
				int lift=num%dzgem_209.getConsume();
				int useNum=num-lift;
				if(UseAddUtil.canUse(hero, GameConst.TOOL, useNum, sysid)) {
					UseAddUtil.use(hero, GameConst.TOOL, useNum, sysid, SourceGoodConst.FORGE_GEM_HECHEN, true);
					UseAddUtil.add(hero, GameConst.TOOL, hechengNum, dzgem_209.getNext(), null, SourceGoodConst.FORGE_GEM_HECHEN, true);
					ForgeSender.sendCmd_576(hero.getId(), 0, sysid);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_4, 0);
					return;
				}
				
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "oneKeyHeBao sysid:"+sysid);
		}
		
	}
	/**
	 * 升级大师
	 * @param hero
	 * @param upSuit
	 */
	public void suitUpgrade(Hero hero, int upSuit) {
		try {
			int index=upSuit-1;
			if (!hero.getForge().getDashi().containsKey(index)) {
				return;
			}
			int[] dashi=ForgeFunction.getIns().getZhuHunDaShi(hero);
			switch (upSuit) {
			case 1:
				int strengthen=hero.getForge().getDashi().get(index)+1;
				if(Config_dzqianghuasuit_209.getIns().get(strengthen)!=null
						&&dashi[index]>=Config_dzqianghuasuit_209.getIns().get(strengthen).getYaoqiu()) {
					hero.getForge().getDashi().put(index, strengthen);
					//重算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_UP_DASHI,SystemIdConst.FOGER_SYSID);	
					ForgeSender.sendCmd_578(hero.getId(), 1, upSuit, strengthen);
					return;
				}
				break;
			case 2:
				int baosi=hero.getForge().getDashi().get(index)+1;
				if(Config_dzgemsuit_209.getIns().get(baosi)!=null
						&&dashi[index]>=Config_dzgemsuit_209.getIns().get(baosi).getLv()) {
					hero.getForge().getDashi().put(index, baosi);
					//重算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_UP_DASHI,SystemIdConst.FOGER_SYSID);
					ForgeSender.sendCmd_578(hero.getId(), 1, upSuit, baosi);
					return;
				}
				break;
			case 3:
				int star=hero.getForge().getDashi().get(index)+1;
				if(Config_dzstarsuit_209.getIns().get(star)!=null
						&&dashi[index]>=Config_dzstarsuit_209.getIns().get(star).getYaoqiu()) {
					hero.getForge().getDashi().put(index, star);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_UP_DASHI,SystemIdConst.FOGER_SYSID);
					ForgeSender.sendCmd_578(hero.getId(), 1, upSuit, star);
					return;
				}
				break;
			default:
				break;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "upSuit sysid:"+upSuit);
		}
		
	}
	/**
	 * 完美升星
	 * @param hero
	 * @param part
	 */
	public void perUpStar(Hero hero, int part) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_EQUIP_0||part>GameConst.INDEX_EQUIP_9) {
				return;
			}
			if(Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getConsume()==null) {
				//满级
				ForgeSender.sendCmd_580(hero.getId(), 2, part,forgeModelMap.get(part).getStarLevel());
				return;
			}
			if (UseAddUtil.canUse(hero, Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getConsume1())) {
				UseAddUtil.use(hero, Config_dzstar_209.getIns().get(forgeModelMap.get(part).getStarLevel()).getConsume1(),
						SourceGoodConst.FORGE_SATR, true);
				//升星成功
				forgeModelMap.get(part).setStarLevel(forgeModelMap.get(part).getStarLevel()+1);
				//重算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.FORGE_STARLU,SystemIdConst.FOGER_SYSID);
				ForgeSender.sendCmd_580(hero.getId(), 1, part,forgeModelMap.get(part).getStarLevel());
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.FORGE_STARLEVEL, null);
				//任务
				TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_3, 0);

				EquipFunction.getIns().getSumEquipStar(hero);
				// 犒赏三军(活动)
				WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_2, 1);
				// 犒赏三军(开服)
				WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_2, 1);
				return;
			}
			ForgeSender.sendCmd_580(hero.getId(), 3, part,forgeModelMap.get(part).getStarLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "perUpStar has wrong");
		}
		
	}
	/**
	 * 获取炼魂数据
	 * @param hero
	 */
	public void lHDaShiLv(Hero hero) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			Object[] arr=new Object[4];
			int a=0;
			for (int i = GameConst.INDEX_REBORN_0; i <=GameConst.INDEX_REBORN_3; i++) {
				ForgeModel forgeModel = forgeModelMap.get(i);
				int lianHunLevel = forgeModel.getLianHunLevel();
				int lianHunExp = forgeModel.getLianHunExp();
				arr[a]=new Object[] {i,lianHunLevel,lianHunExp};
				a++;
			}
			ForgeSender.sendCmd_584(hero.getId(), forge.getDashi().get(3), arr);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "lHDaShiLv has wrong");
		}
		
	}
	/**
	 * 增加炼魂大师等级
	 * @param hero
	 */
	public void addLHDaShiLv(Hero hero) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			int nowDashiLv=forge.getDashi().get(3);
			int nextDaShiLv=nowDashiLv+1;
			int needLv=Config_zhuanshenglhds_256.getIns().get(nextDaShiLv).getLv();
			for (int i = GameConst.INDEX_REBORN_0; i <=GameConst.INDEX_REBORN_3; i++) {
				if (forgeModelMap.get(i).getLianHunLevel()<needLv) {
					return;
				}
			}
			forge.getDashi().put(3, nextDaShiLv);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_BORN_LV,SystemIdConst.FOGER_SYSID);
			
			ForgeSender.sendCmd_586(hero.getId(), 0, nextDaShiLv);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addLHDaShiLv has wrong");
		}
		
	}
	/**
	 * 增加转生装备的炼魂等级
	 * @param hero
	 * @param part
	 * @param type
	 */
	public void addLHLv(Hero hero, int part, int type) {
		try {
			Forge forge = hero.getForge();
			if(forge==null){
				return;
			}
			Map<Integer, ForgeModel> forgeModelMap = forge.getForgeModelMap();
			if(forgeModelMap==null){
				return;
			}
			if (part<GameConst.INDEX_REBORN_0||part>GameConst.INDEX_REBORN_3) {
				return;
			}
			ForgeModel forgeModel = forgeModelMap.get(part);
			
			if(forgeModel.getLianHunLevel() >= Config_zhuanshenglh_256.getIns().size()-1) {
				ForgeSender.sendCmd_588(hero.getId(), 1, part, forgeModel.getLianHunLevel(), forgeModel.getLianHunExp());
				return;
			}
			//普通
			boolean isUpLevel=false;
			if (type==0) {
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, ForgeConst.LIAN_ITEMID)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, ForgeConst.LIAN_ITEMID, SourceGoodConst.REBORN_UP_LV, true);
					isUpLevel=addExp(hero, forgeModel, ForgeConst.UP_JIE_EXP);
					ForgeSender.sendCmd_588(hero.getId(), 0,part, forgeModel.getLianHunLevel(), forgeModel.getLianHunExp());
					if (isUpLevel) {
						//重算战力
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_BORN_LIANHUN,SystemIdConst.FOGER_SYSID);
					}
					return;
				}
			}else {
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ForgeConst.LIAN_ITEMID);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_zhuanshenglh_256.getIns().get(forgeModel.getLianHunLevel()).getExp()-forgeModel.getLianHunExp();
				int needNum=needExp/ForgeConst.UP_JIE_EXP;
				if (needNum<=0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*ForgeConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*ForgeConst.UP_JIE_EXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, ForgeConst.LIAN_ITEMID)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, ForgeConst.LIAN_ITEMID, SourceGoodConst.REBORN_UP_LV, true);
					isUpLevel=addExp(hero, forgeModel, addExp);
				}
				if (isUpLevel) {
					//重算战力
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_BORN_LIANHUN,SystemIdConst.FOGER_SYSID);
				}
				ForgeSender.sendCmd_588(hero.getId(), 0,part, forgeModel.getLianHunLevel(), forgeModel.getLianHunExp());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addLHLv has wrong");
		}
		
	}
	
	/**
	 * 加经验升级
	 * @param smelt
	 */
	public boolean addExp(Hero hero,ForgeModel forgeModel,int exp){
		try {
			forgeModel.setLianHunExp(forgeModel.getLianHunExp() + exp);
			List<Struct_zhuanshenglh_256> configs = Config_zhuanshenglh_256.getIns().getSortList();
			boolean flag = false;
			int maxsize=configs.size()-1;
			for(int i=forgeModel.getLianHunLevel();i<maxsize ; i++){
				if(i >= maxsize) {
					forgeModel.setLianHunExp(0);
					break;
				}
				Struct_zhuanshenglh_256 struct = configs.get(i);
				int upgradeExp =  struct.getExp();
				if(forgeModel.getLianHunExp() >= upgradeExp){
					int defExp = forgeModel.getLianHunExp() - upgradeExp;
					forgeModel.setLianHunExp(defExp);
					forgeModel.setLianHunLevel(struct.getId()+1);
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addExp:"+exp);
		}
		return false;
	}
	
	
	
}





