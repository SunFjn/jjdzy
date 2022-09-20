package com.teamtop.system.destiny;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActEnum;
import com.teamtop.system.activity.ativitys.warOrderAct.WarOrderActFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.eightDoor.EightDoorConst;
import com.teamtop.system.eightDoor.EightDoorFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.event.backstage.events.backstage.flowAppraise.FlowAppraiseEvent;
import com.teamtop.system.event.backstage.events.backstage.flowDestiny.B_FlowDestinyEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.runeAppraise.RuneAppraiseFunction;
import com.teamtop.system.openDaysSystem.runeCellect.RuneCellectFunction;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bzt_261;
import excel.config.Config_bztfwtz_261;
import excel.config.Config_bztjd_261;
import excel.config.Config_bztluck_261;
import excel.config.Config_bztlv_261;
import excel.config.Config_bztsf_261;
import excel.config.Config_bztzf_261;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_bzt_261;
import excel.struct.Struct_bztfwtz_261;
import excel.struct.Struct_bztjd_261;
import excel.struct.Struct_bztluck_261;
import excel.struct.Struct_bztlv_261;
import excel.struct.Struct_bztsf_261;
import excel.struct.Struct_bztzf_261;
import excel.struct.Struct_xtcs_004;



public class DestinyManager {
	
	private static DestinyManager ins = null;
	public static DestinyManager getIns(){
		if(ins == null){
			ins = new DestinyManager();
		}
		return ins;
	}
	/**
	 * CG请求打开天命界面 
	 */
	public void openUi(Hero hero) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			if (personalDestiny==null) {
				LogTool.warn("openUi has wrong personalDestiny==null"+hero.getNameZoneid(), DestinyManager.class);
				return;
			}
			Object[] bodydestinys=null;
			Object[] bagdestinys=null;
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData = personalDestiny.getBodyData();
			ConcurrentHashMap<Integer, DestinyBagData> bodyDestiny = bodyData.get(0);
			ConcurrentHashMap<Integer, DestinyBagData> bagDatas=personalDestiny.getBagData();
			int bodySize=bodyDestiny.size();
			if (bodySize!=0) {
				bodydestinys=new Object[bodyDestiny.size()];
				int i=0;
				Set<Entry<Integer, DestinyBagData>> entrybodyDestiny = bodyDestiny.entrySet();
				Iterator<Entry<Integer, DestinyBagData>> iterbodyDestiny = entrybodyDestiny.iterator();
				while(iterbodyDestiny.hasNext()){
					Entry<Integer, DestinyBagData> destinyNext = iterbodyDestiny.next();
					DestinyBagData bodyDes = destinyNext.getValue();
					int index = destinyNext.getKey();
					bodydestinys[i] = new Object[]{index, bodyDes.getDestinyId(),bodyDes.getLevel(),bodyDes.getStar(),bodyDes.getLock()};
					i++;
				}
			}
			int bagSize=bagDatas.size();
			if (bagSize!=0) {
				bagdestinys=new Object[bagSize];
				int i=0;
				Set<Entry<Integer, DestinyBagData>> entrybagDestiny = bagDatas.entrySet();
				Iterator<Entry<Integer, DestinyBagData>> iterbagDestiny = entrybagDestiny.iterator();
				while(iterbagDestiny.hasNext()){
					Entry<Integer, DestinyBagData> destinyNext = iterbagDestiny.next();
					DestinyBagData bagDes = destinyNext.getValue();
					int index = destinyNext.getKey();
					bagdestinys[i] = new Object[]{index, bagDes.getDestinyId(),bagDes.getLevel(),bagDes.getStar(),bagDes.getLock()};
					i++;
				}
				
			}
			DestinySender.sendCmd_4402(hero.getId(), bodydestinys, bagdestinys, personalDestiny.getFeelNum(), personalDestiny.getCoinNum(), personalDestiny.getYuanbaoNum(),personalDestiny.getLuckNum()/10);
			
			ConcurrentHashMap<Integer, Integer> godFuChange = personalDestiny.getGodFuChange();
			Object[] changeNum=new Object[Config_bztsf_261.getIns().getMap().size()];
			int a=0;
			for (Struct_bztsf_261 bztsf_261:Config_bztsf_261.getIns().getSortList()) {
				int hasChangeNum =0;
				int destinyid=bztsf_261.getSf();
				if (godFuChange.containsKey(destinyid)) {
					hasChangeNum = godFuChange.get(destinyid);
				}
				changeNum[a]=new Object[] {destinyid,hasChangeNum};
				a++;
			}
			DestinySender.sendCmd_4428(hero.getId(), changeNum);
			//八门金锁
			EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_8, 1);
			return;
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "openDestinyUI has wrong");
			return;
		}
		
	}
	/**
	 * CG 操作天命 4403
	 * @param type| 1.装备 2.卸下| byte
	 * @param destinyId| 天命id| int
	 * @param bagIndex| 该天命在背包的位置| int
	 * @param equipIndex| 要操作的装备位置(位置约定：顺时针1-8)| byte
	 */
	public void useDestiny(Hero hero, int useType, int destinyId, int bagIndex, int gridIndex) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
			int destinyType=struct_bztzf_261.getType();
			if (destinyType==0) {
				return;
			}
			if (useType<0||destinyId<=0||bagIndex<0||gridIndex<=0) {
				LogTool.warn(hero.getNameZoneid()+"useDestiny useType<0||destinyId<0||bagIndex<0||goalId<0||gridIndex<0", DestinyManager.class);
				return;
			}
			if (!DestinyFunction.getIns().isJieSuo(hero, gridIndex)) {
				LogTool.warn(hero.getNameZoneid()+"!DestinyFunction.getIns().isJieSuo(hero, gridIndex)", DestinyManager.class);
				return;
			}
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData = personalDestiny.getBodyData();
			ConcurrentHashMap<Integer, DestinyBagData> bodyDestiny = bodyData.get(0);
			ConcurrentHashMap<Integer, DestinyBagData> bagDatas=personalDestiny.getBagData();
			//装备天命
			if (useType==1) {
				if (!bagDatas.containsKey(bagIndex)) {
					LogTool.warn(hero.getNameZoneid()+"!bagDatas.containsKey(bagIndex)"+bagIndex, DestinyManager.class);
					return;
				}
				
				//检查是否是否解锁
				Struct_bzt_261 excel = Config_bzt_261.getIns().get(gridIndex);
				if(hero.getRealLevel() >= excel.getLv()){
					if (excel.getVip()==0&&excel.getLv()==0) {
						//特殊孔不直接开
					}else {						
						DestinyFunction.getIns().jieSuoDestiny(hero, gridIndex);
					}
				}
				
				DestinyBagData destinyBagData=bagDatas.get(bagIndex);
				if (destinyBagData.getDestinyId()==0) {
					bagDatas.remove(bagIndex);
					LogTool.warn(hero.getNameZoneid()+"destinyBagData.getDestinyId()==0"+bagIndex, DestinyManager.class);
					return;
				}
				if (destinyId!=destinyBagData.getDestinyId()) {
					LogTool.warn(hero.getNameZoneid()+"destinyId!=destinyBagData.getDestinyId()"+destinyId, DestinyManager.class);
					return;
				}
				DestinyBagData bodyDestinyData=bodyDestiny.get(gridIndex);
				if (bodyDestinyData==null) {
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					LogTool.warn(hero.getNameZoneid()+"bodyDestinyData==null"+gridIndex, DestinyManager.class);
					return;
				}
				if (DestinyFunction.getIns().isHaveSameTypeDes(bodyDestiny, destinyType,gridIndex)) {
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					return;
				}
				//判断要装备的位置必须是空的
				if (bodyDestinyData.getDestinyId()==0) {
					
					bodyDestinyData.setDestinyId(destinyBagData.getDestinyId());
					bodyDestinyData.setLevel(destinyBagData.getLevel());
					bodyDestinyData.setStar(destinyBagData.getStar());
					//移除背包里的
					bagDatas.remove(bagIndex);
					
					DestinySender.sendCmd_4404(hero.getId(), 0, useType, bagIndex, gridIndex);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_EQUIP,SystemIdConst.DESTINY_SYSID);
					//八门金锁
					EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_10, 1);
					//八门金锁
					EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_11, 1);
					//符文收集
					RuneCellectFunction.getIns().updateTypeNum(hero);
					//晋升任务
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.DESTINY_LEVEL, null);
					DestinyFunction.getIns().destinyMasterRedPoint(hero,false);
					//符文流水
					B_FlowDestinyEvent.addFlow(hero.getId(), 3, destinyBagData.getDestinyId(), hero.getZoneid());
					return;
				}else {
					//判断要装备的位置不是空的
					//脱下
					DestinyBagData destinyBagData2=new DestinyBagData();
					destinyBagData2.setDestinyId(bodyDestinyData.getDestinyId());
					destinyBagData2.setLevel(bodyDestinyData.getLevel());
					destinyBagData2.setStar(bodyDestinyData.getStar());
					
					bagDatas.put(bagIndex, destinyBagData2);
					//符文流水
					B_FlowDestinyEvent.addFlow(hero.getId(), 4, destinyBagData2.getDestinyId(), hero.getZoneid());
					//装备
					bodyDestinyData.setDestinyId(destinyBagData.getDestinyId());
					bodyDestinyData.setLevel(destinyBagData.getLevel());
					bodyDestinyData.setStar(destinyBagData.getStar());
					//符文流水
					B_FlowDestinyEvent.addFlow(hero.getId(), 3, destinyBagData.getDestinyId(), hero.getZoneid());
					
					DestinySender.sendCmd_4404(hero.getId(), 0, useType, bagIndex, gridIndex);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_EQUIP,SystemIdConst.DESTINY_SYSID);
					//八门金锁
					EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_10, 1);
					//八门金锁
					EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_11, 1);
					//符文收集
					RuneCellectFunction.getIns().updateTypeNum(hero);
					//晋升任务
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.DESTINY_LEVEL, null);
					DestinyFunction.getIns().destinyMasterRedPoint(hero,false);
					return;
					
				}
			}
			//脱掉
			if (useType==2) {
				Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
				if (bagDatas.size()>=struct_xtcs_004.getNum()) {
					LogTool.warn(hero.getNameZoneid()+"bagDatas.size()>=DestinyConst.DESTINY_BAG_SIZE", DestinyManager.class);
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					return;
				}
				DestinyBagData bodyDestinyData=bodyDestiny.get(gridIndex);
				if (bodyDestinyData==null) {
					LogTool.warn(hero.getNameZoneid()+"bodyDestinyData==null "+useType, DestinyManager.class);
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					return;
				}
				if (bodyDestinyData.getDestinyId()==0) {
					LogTool.warn(hero.getNameZoneid()+"bodyDestinyData.getDestinyId()==0 "+useType, DestinyManager.class);
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					return;
				}
				if (bodyDestinyData.getDestinyId()!=destinyId) {
					LogTool.warn(hero.getNameZoneid()+"bodyDestinyData.getDestinyId()!=destinyId) "+useType, DestinyManager.class);
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					return;
				}
				
				if (bagDatas.containsKey(bagIndex)) {
					//要卸下的位置已经被占用了
					//要交换两天命
					DestinySender.sendCmd_4404(hero.getId(), 2, useType, bagIndex, gridIndex);
					return;
				}else {
					//放入
					DestinyBagData destinyBagData =new DestinyBagData();
					destinyBagData.setDestinyId(bodyDestinyData.getDestinyId());
					destinyBagData.setLevel(bodyDestinyData.getLevel());
					destinyBagData.setStar(bodyDestinyData.getStar());
					bagDatas.put(bagIndex, destinyBagData);
					//符文流水
					B_FlowDestinyEvent.addFlow(hero.getId(), 4, destinyBagData.getDestinyId(), hero.getZoneid());
					//脱下
					bodyDestinyData.setDestinyId(0);
					bodyDestinyData.setLevel(0);
					bodyDestinyData.setStar(0);
				
					DestinySender.sendCmd_4404(hero.getId(), 0,useType, bagIndex, gridIndex);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_OFF,SystemIdConst.DESTINY_SYSID);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "useDestiny has wrong");
			return;
		}
		
	}

	
	/**
	 * CG天命升级
	 * @param place 位置标识
	 */
	public void uplevel(Hero hero,  int index) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			//在人物身上
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData = personalDestiny.getBodyData();
			ConcurrentHashMap<Integer, DestinyBagData> goalDestiny = bodyData.get(0);
			
			if (goalDestiny==null) {
				LogTool.warn("uplevel goalDestiny==null has wrong", DestinyManager.class);
				return;
			}
			if (!goalDestiny.containsKey(index)) {
				LogTool.warn("!goalDestiny.containsKey(index) "+index, DestinyManager.class);
				return;
			}
			DestinyBagData bodyDestinyData=goalDestiny.get(index);
			if (bodyDestinyData.getDestinyId()==0) {
				LogTool.warn("bodyDestinyData.getDestinyId()==0 "+index, DestinyManager.class);
				return;
			}
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(bodyDestinyData.getDestinyId());
			int type = struct_bztzf_261.getType();
			if (type==0) {
				LogTool.warn("bodyDestinyData.getDestinyId()==0 "+index, DestinyManager.class);
				return;
			}
			//等级上限=初始等级上限+星级提升等级上限*（星级-1）
			int maxLevel=struct_bztzf_261.getLv1()+(bodyDestinyData.getStar()-1)*struct_bztzf_261.getLv();
			int nowLevel=bodyDestinyData.getLevel();
			if (nowLevel>=maxLevel) {
				LogTool.warn("nowLevel>=maxLevel "+nowLevel, DestinyManager.class);
				return;
			}
			int vip=struct_bztzf_261.getPz();
			Struct_bztlv_261 struct_bztlv_261 = Config_bztlv_261.getIns().get(bodyDestinyData.getLevel());
			int needExp=0;
			switch (vip) {
			case 1:
				//白色
				break;
			case 2:
				//绿色
				needExp=struct_bztlv_261.getExp2();
				break;
			case 3:
				//蓝色
				needExp=struct_bztlv_261.getExp3();
				break;		
			case 4:
				//紫色色
				needExp=struct_bztlv_261.getExp4();
				break;
			case 5:
				//橙色
				needExp=struct_bztlv_261.getExp5();
				break;		
			case 6:
				//红色
				needExp=struct_bztlv_261.getExp6();
				break;
			case 8:
				// 神品质
				needExp = struct_bztlv_261.getExp8();
				break;
			default:
				break;
			}
			if (needExp==0) {
				LogTool.warn("needExp==0"+index, DestinyManager.class);
				return;
			}
			if (UseAddUtil.canUse(hero, GameConst.DESTINYEXP, needExp)) {
				UseAddUtil.use(hero, GameConst.DESTINYEXP, needExp, SourceGoodConst.DESTINY_UP_LEVEL, true);
				bodyDestinyData.setLevel(bodyDestinyData.getLevel()+1);
				DestinySender.sendCmd_4406(hero.getId(), 0, index, bodyDestinyData.getDestinyId(), bodyDestinyData.getLevel());
				//八门金锁
				EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_9, 1);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_LEVEL,SystemIdConst.DESTINY_SYSID);
				//晋升任务
				PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.DESTINY_LEVEL, null);
				//符文流水
				B_FlowDestinyEvent.addFlow(hero.getId(), 2, bodyDestinyData.getDestinyId(), hero.getZoneid());
				return;
			}
			DestinySender.sendCmd_4406(hero.getId(), 1, index, bodyDestinyData.getDestinyId(), bodyDestinyData.getLevel());
			return;
			
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "uplevel has wrong ");
			return;
		}
		
	}
    
	
	public void upstar(Hero hero, int place) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			//在人物身上
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData = personalDestiny.getBodyData();
			ConcurrentHashMap<Integer, DestinyBagData> goalDestiny = bodyData.get(0);
			if (goalDestiny==null) {
				LogTool.warn("uplevel goalDestiny==null has wrong", DestinyManager.class);
				return;
			}
			if (!goalDestiny.containsKey(place)) {
				LogTool.warn("!goalDestiny.containsKey(index) "+place, DestinyManager.class);
				return;
			}
			DestinyBagData bodyDestinyData=goalDestiny.get(place);
			if (bodyDestinyData.getDestinyId()==0) {
				LogTool.warn("bodyDestinyData.getDestinyId()==0 "+place, DestinyManager.class);
				return;
			}
			Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(bodyDestinyData.getDestinyId());
			int type = struct_bztzf_261.getType();
			if (type==0) {
				LogTool.warn("bodyDestinyData.getDestinyId()==0 "+place, DestinyManager.class);
				return;
			}
			int star = bodyDestinyData.getStar();
			if (star>=struct_bztzf_261.getStar()) {
				LogTool.warn("star>=struct_bztzf_261.getStar() "+star, DestinyManager.class);
				return;
			}
			int bagplace=DestinyFunction.getIns().getDestinyFromBag(personalDestiny.getBagData(), bodyDestinyData.getDestinyId());
			if (bagplace>=0) {
				//背包移除消耗的符文
				personalDestiny.getBagData().remove(bagplace);
				star=star+1;
				bodyDestinyData.setStar(star);
				DestinySender.sendCmd_4408(hero.getId(), 0, place, bodyDestinyData.getDestinyId(), bodyDestinyData.getStar(), bagplace);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_STAR,SystemIdConst.DESTINY_SYSID);
				DestinyFunction.getIns().destinyMasterRedPoint(hero,false);
				//符文流水
				B_FlowDestinyEvent.addFlow(hero.getId(), 1, bodyDestinyData.getDestinyId(), hero.getZoneid());
			}else {
				DestinySender.sendCmd_4408(hero.getId(), 1, place, bodyDestinyData.getDestinyId(), bodyDestinyData.getStar(), bagplace);
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "upstar has wrong");
			return;
		}
		
		
	}
	/**
	 * 
     * CG 一键分解 4409
	 * @param  位置| Object[]
	 */
	public void fenjie(Hero hero, Object[] ids) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> bagDatas = personalDestiny.getBagData();
			//◆分解符文经验数量=符文星级*符文分解数量+该符文品质对应升级分解数量
			ArrayList<Integer> removeids=new ArrayList<Integer>();
			long fuwenSumExp=0;
			int[][] maxReward = new int[][] {};
			for (int i = 0; i < ids.length; i++) {
				int bagplace=(int) ids[i];
				int[][] sp = new int[][] {};
				if (bagDatas.containsKey(bagplace)) {
					DestinyBagData destinyBagData = bagDatas.get(bagplace);
					if (destinyBagData.getLock()==0) {
						Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyBagData.getDestinyId());
						long addexp1=destinyBagData.getStar()*struct_bztzf_261.getFj();
						Struct_bztlv_261 struct_bztlv_261 = Config_bztlv_261.getIns().get(destinyBagData.getLevel());
						long addexp2=0;
						switch (struct_bztzf_261.getPz()) {
						case 2:
							//绿色
							addexp2=struct_bztlv_261.getFj2();
							break;
						case 3:
							//蓝色
							addexp2=struct_bztlv_261.getFj3();
							break;		
						case 4:
							//紫色色
							addexp2=struct_bztlv_261.getFj4();
							break;
						case 5:
							//橙色
							addexp2=struct_bztlv_261.getFj5();
							break;		
						case 6:
							//红色
							addexp2=struct_bztlv_261.getFj6();
							sp = CommonUtil.newCopyArrayAndNum(struct_bztzf_261.getSp(), destinyBagData.getStar());
							break;
						case 8:
							// 神品质
							addexp2 = struct_bztlv_261.getFj8();
							sp = CommonUtil.newCopyArrayAndNum(struct_bztzf_261.getSp(), destinyBagData.getStar());
							break;
						default:
							break;
						}
						maxReward = CommonUtil.arrayPlusArraysItems(maxReward, sp);
						fuwenSumExp=fuwenSumExp+addexp1+addexp2;
						bagDatas.remove(bagplace);
						removeids.add(bagplace);
						//符文流水
						B_FlowDestinyEvent.addFlow(hero.getId(), 1, destinyBagData.getDestinyId(), hero.getZoneid());
					}
				}
			}
			if (maxReward != null) {
				UseAddUtil.add(hero, maxReward, SourceGoodConst.DESTINY_ADD, UseAddUtil.getDefaultMail(), true);
			}
			if (fuwenSumExp>0) {
				int size = removeids.size();
				Object[] index=new Object[size];
				for (int i = 0; i < size; i++) {
					index[i]=new Object[] {removeids.get(i)};
				}
				UseAddUtil.add(hero, GameConst.DESTINYEXP, (int)fuwenSumExp, SourceGoodConst.DESTINY_REMOVE_LEVEL, true);
				DestinySender.sendCmd_4410(hero.getId(), 0,  index);
				return;
			}
			DestinySender.sendCmd_4410(hero.getId(), 1, null);
			return;
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "onekeyfenjie has wrong");
			return;
		}
		
	}
	/**
	 * @param type| 类型（0铜钱1元宝）| byte
	 * @param num| 次数（0 1次 1十次）| byte
	 */
	public void buydestiny(Hero hero, int type, int num) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> bagData = personalDestiny.getBagData();
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(DestinyConst.DESTINY_BAG_SIZE);
			int leftNum=struct_xtcs_004.getNum()-bagData.size();
			List<Integer[]> awardIdNoticeList = new ArrayList<Integer[]>();// 抽取的要公布的奖品列表
			List<Object[]>  addfuwenlist=new ArrayList<>();
			List<int[]> awardList = new ArrayList<>();
			int Addnum=1;
			if (num!=0) {
				Addnum=10;
			}
			if (Addnum>leftNum) {
				LogTool.warn("addnum>leftNum "+leftNum, DestinyManager.class);
				return;
			}
			if (type==0) {
				//铜钱
				int coinNum = personalDestiny.getCoinNum();
				Struct_bztjd_261 struct_bztjd_261 = Config_bztjd_261.getIns().get(DestinyConst.LOW);
				if (coinNum>=struct_bztjd_261.getTime()) {
					LogTool.warn("coinNum>=struct_bztjd_261.getTime() "+coinNum, DestinyManager.class);
					return;
				}
				int addnum=0;
				int[][] cost;
				if (num==0) {
					//一次
					addnum=1;
					cost=struct_bztjd_261.getConmuse();
				}else {
					//10次
					addnum=10;
					cost=struct_bztjd_261.getConmuse1();
				}
				int sumNum=coinNum+addnum;
				if (sumNum>struct_bztjd_261.getTime()) {
					LogTool.warn("coinNum>=struct_bztjd_261.getTime() "+coinNum, DestinyManager.class);
					return;
				}
				if (UseAddUtil.canUse(hero, cost)) {
					UseAddUtil.use(hero, cost, SourceGoodConst.DESTINY_COST, true);
					for (int i = 0; i < addnum; i++) {
						int[] genAward = null;
						List<ProbabilityEventModel> list= DestinyCache.getDestinyDropMap().get(DestinyConst.LOW);
						int a=0;
						while (genAward==null||a>=100) {
							for (ProbabilityEventModel pm : list) {
								genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
							}
							a++;
						}
						Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(genAward[1]);
						if (struct_bztzf_261.getPz()>= DestinyConst.NOTICE) {
							awardIdNoticeList.add(new Integer[] {genAward[1]});
						}
						awardList.add(new int[] { genAward[0], genAward[1], genAward[2] });
						DestinyBagData destinyBagData=new DestinyBagData();
						destinyBagData.setDestinyId(genAward[1]);
						destinyBagData.setStar(1);
						destinyBagData.setLevel(0);
						int index = DestinyFunction.getIns().getnullDesFromBag(bagData);
						if (index!=-1) {
							bagData.put(index, destinyBagData);
							addfuwenlist.add(new Object[] {index,destinyBagData.getDestinyId(),1,0});
							//符文流水
							B_FlowDestinyEvent.addFlow(hero.getId(), 0, destinyBagData.getDestinyId(), hero.getZoneid());
							LogTool.info("hid:"+hero.getId()+" name:"+hero.getName()+" index:"+index+" DestinyId:"+destinyBagData.getDestinyId(), DestinyManager.class);
						}else {
							LogTool.warn("index!=-1:id:"+destinyBagData.getDestinyId()+" hid"+hero.getId(), DestinyManager.class);
						}
					}
					personalDestiny.setCoinNum(sumNum);
				}
			}else if(type==1) {
				//元宝
				Struct_bztjd_261 struct_bztjd_261 = Config_bztjd_261.getIns().get(DestinyConst.HIGH);
				int itemid=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), DestinyConst.ITEM_ID);
				int sumnum=0;
				int[][] cost;
				if (num==0) {
					//一次
					sumnum=1;
					cost=struct_bztjd_261.getConmuse();
					if (personalDestiny.getFeelNum()>0) {
						personalDestiny.setFeelNum(0);
					}else if (itemid>=sumnum) {
						UseAddUtil.use(hero, GameConst.TOOL, sumnum, DestinyConst.ITEM_ID, SourceGoodConst.DESTINY_COST_H, true);
					}else if(UseAddUtil.canUse(hero, cost)) {
						UseAddUtil.use(hero,cost, SourceGoodConst.DESTINY_COST_H, true);
					}else {
						return;
					}
				}else {
					//10次
					sumnum=10;
					cost=struct_bztjd_261.getConmuse1();
					if (itemid>=sumnum) {
						UseAddUtil.use(hero, GameConst.TOOL, sumnum, DestinyConst.ITEM_ID, SourceGoodConst.DESTINY_COST_H, true);
					}else if(UseAddUtil.canUse(hero, cost)) {
						UseAddUtil.use(hero,cost, SourceGoodConst.DESTINY_COST_H, true);
					}else {
						return;
					}
				}
				for (int i =1; i <=sumnum; i++) {
					int[] genAward = null;
					personalDestiny.setLuckNum(DestinyConst.ADDLUCK+personalDestiny.getLuckNum());
					int yunbaoNum=(1+personalDestiny.getYuanbaoNum())%10;
					personalDestiny.setYuanbaoNum(yunbaoNum);
					//先判断幸运值
					boolean isaddluckreward=false;
					int size=Config_bztluck_261.getIns().getMap().size();
					for (int j = 1; j <=size; j++) {
						Struct_bztluck_261 struct_bztluck_261 = Config_bztluck_261.getIns().get(j);
						if (struct_bztluck_261.getXingyunzhi()==personalDestiny.getLuckNum()) {
							List<ProbabilityEventModel> list=DestinyCache.getDestinyLuckMap().get(struct_bztluck_261.getId());
							int[] jiangli =null;
							int a=0;
							while (jiangli==null||a>=100) {
								for (ProbabilityEventModel pm : list) {
									jiangli = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
								}
								a++;
							}
							awardList.add(new int[] { jiangli[0], jiangli[1], jiangli[2] });
							DestinyBagData destinyBagData=new DestinyBagData();
							destinyBagData.setDestinyId(jiangli[1]);
							Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyBagData.getDestinyId());
							if (struct_bztzf_261.getPz()>= DestinyConst.NOTICE) {
								awardIdNoticeList.add(new Integer[] {destinyBagData.getDestinyId()});
							}
							destinyBagData.setStar(1);
							destinyBagData.setLevel(0);
							// 成就树
							AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_28, 1,
									jiangli[1]);
							int index = DestinyFunction.getIns().getnullDesFromBag(bagData);
							if (index!=-1) {
								bagData.put(index, destinyBagData);
								LogTool.info("hid:"+hero.getId()+" name:"+hero.getName()+" index:"+index+" DestinyId:"+destinyBagData.getDestinyId(), DestinyManager.class);
								addfuwenlist.add(new Object[] {index,destinyBagData.getDestinyId(),1,0});
								isaddluckreward=true;
								//符文流水
								B_FlowDestinyEvent.addFlow(hero.getId(), 0, destinyBagData.getDestinyId(), hero.getZoneid());
							}else {
								LogTool.warn("index!=-1:id:"+destinyBagData.getDestinyId()+" hid"+hero.getId(), DestinyManager.class);
							}
							if (j==size) {
								//清空幸运值
								personalDestiny.setLuckNum(0);
							}
						}
					}
					if (isaddluckreward) {
						//发过幸运值的奖励
						continue;
					}
					List<ProbabilityEventModel> list;
					if (personalDestiny.getYuanbaoNum()==0) {
						//10次大奖
						list= DestinyCache.getDestinyDropHightMap().get(DestinyConst.HIGH);
					}else {
						list= DestinyCache.getDestinyDropMap().get(DestinyConst.HIGH);
					}
					int a=0;
					while (genAward==null||a>=100) {
						for (ProbabilityEventModel pm : list) {
							genAward = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
						}
						a++;
					}
					Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(genAward[1]);
					if (struct_bztzf_261.getPz()>= DestinyConst.NOTICE) {
						awardIdNoticeList.add(new Integer[] {genAward[1]});
					}
					awardList.add(new int[] { genAward[0], genAward[1], genAward[2] });
					DestinyBagData destinyBagData=new DestinyBagData();
					destinyBagData.setDestinyId(genAward[1]);
					destinyBagData.setStar(1);
					destinyBagData.setLevel(0);
					int index = DestinyFunction.getIns().getnullDesFromBag(bagData);
					if (index!=-1) {
						bagData.put(index, destinyBagData);
						LogTool.info("hid:"+hero.getId()+" name:"+hero.getName()+" index:"+index+" DestinyId:"+destinyBagData.getDestinyId(), DestinyManager.class);
						addfuwenlist.add(new Object[] {index,destinyBagData.getDestinyId(),1,0});
					}else {
						LogTool.warn("index!=-1:id:"+destinyBagData.getDestinyId()+" hid"+hero.getId(), DestinyManager.class);
					}
					// 成就树
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_28, 1, genAward[1]);
				}
				// 符文鉴定系统活动
				RuneAppraiseFunction.getIns().addPerfactAppraise(hero, sumnum);
				//八门金锁
				EightDoorFunction.getIns().reshEightDoor(hero, EightDoorConst.EIGHTDOOR_TYPE_15, sumnum);
				//八门金锁符文完美鉴定次数排名
				CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, sumnum);
				// 鉴定排行(活动)
				CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, sumnum, 0);
				// 每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE25);
				// 三国战令(活动)
				WarOrderActFunction.getIns().updateTaskNum(hero, WarOrderActEnum.GOAL_7, sumnum);
				// 成就树
				AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_13, sumnum, 0);
			}
			if (awardIdNoticeList.size()>0) {
				for (int i = 0; i < awardIdNoticeList.size(); i++) {
					Integer[] integers = awardIdNoticeList.get(i);
					ChatManager.getIns().broadCast(ChatConst.DESTINY, new Object[] { hero.getNameZoneid(), integers[0]});
				}
			}
			DestinySender.sendCmd_4412(hero.getId(), addfuwenlist.toArray(), personalDestiny.getFeelNum(), personalDestiny.getCoinNum(), personalDestiny.getYuanbaoNum(),type,personalDestiny.getLuckNum()/10);
			FlowAppraiseEvent.addM_RoleInfo(hero, num == 0 ? 1 : 10, awardList);
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "buydestiny has wrong");
			return;
		}
		
	}
	/**
	 * 锁 4413
	 * @param pos| 位置| int
	 * @param locked| 加锁1解锁0| byte
	 */
	public void locked(Hero hero, int pos, int locked) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> bagDatas = personalDestiny.getBagData();
			if (bagDatas.containsKey(pos)) {
				DestinyBagData destinyBagData = bagDatas.get(pos);
				if (destinyBagData.getDestinyId()!=0) {
					destinyBagData.setLock(locked);
					DestinySender.sendCmd_4414(hero.getId(), pos, locked);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "locked has wrong");
			return;
		}
	}
	/**
	 * 解锁符文
	 * @param hero
	 * @param index
	 */
	public void jiesuo(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			Struct_bzt_261 struct_bzt_261 = Config_bzt_261.getIns().get(index);
			if (struct_bzt_261==null) {
				return;
			}
			if (struct_bzt_261.getVip()==0&&struct_bzt_261.getLv()==0) {
				//是特殊孔
				PersonalDestiny personalDestiny=hero.getPersonalDestiny();
				//在人物身上
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData = personalDestiny.getBodyData();
				ConcurrentHashMap<Integer, DestinyBagData> goalDestiny = bodyData.get(0);
				int id = struct_bzt_261.getId();
				if (goalDestiny.containsKey(id)) {
					//已经解锁了这个孔
					DestinySender.sendCmd_4416(hero.getId(), 1, index);
					return;
					
				}
				int sumNum=struct_bzt_261.getFw();
				int[][] xh = struct_bzt_261.getXh();
				int getfuwenSumLevel = DestinyFunction.getIns().getfuwenSumLevel(hero);
				if (getfuwenSumLevel>=sumNum&&UseAddUtil.canUse(hero, xh)) {
					UseAddUtil.use(hero, xh, SourceGoodConst.JIESUO_DESTINY, true, true);
					DestinyFunction.getIns().jieSuoDestiny(hero, id);
					DestinySender.sendCmd_4416(hero.getId(), 0, index);
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, DestinyManager.class, "locked has wrong");
			return;
		}
		
	}
	
	/**
	 * 打开符文大师界面
	 * @param hero
	 */
	public void openDestinyMasterUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)) {
			return;
		}
		PersonalDestiny personalDestiny = hero.getPersonalDestiny();
		int destinyMasterId = personalDestiny.getDestinyMasterId();
		int isCanUp = 0;
		// 取得指定品质符文总星级
		int redStar = DestinyFunction.getIns().getfuwenTotalStarByType(hero, GameConst.RED);
		if (destinyMasterId == 0) {
			List<Struct_bztfwtz_261> sortList = Config_bztfwtz_261.getIns().getSortList();
			Struct_bztfwtz_261 struct_bztfwtz_261 = sortList.get(0);
			int star = struct_bztfwtz_261.getLv();
			isCanUp= redStar>=star ? DestinyConst.CAN_JIHUO : DestinyConst.NOT_JIHUO;
		} else {
			Struct_bztfwtz_261 struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(destinyMasterId);
			int nextId = struct_bztfwtz_261.getNext();
			if (nextId == 0) {
				isCanUp = DestinyConst.FULL_LV;
			} else {
				Struct_bztfwtz_261 next_struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(nextId);
				int lv = next_struct_bztfwtz_261.getLv();
				isCanUp = redStar >= lv ? DestinyConst.CAN_LV : DestinyConst.NOT_LV;
			}
		}
		DestinySender.sendCmd_4418(hero.getId(), destinyMasterId, isCanUp, redStar);
	}
	
	/**
	 * 激活或升级
	 * 
	 * @param hero
	 * @param id   符文大师id
	 */
	public void jihuoOrUpLv(Hero hero) {
		// TODO Auto-generated method stub
		int destinyMasterId = 0;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)) {
				return;
			}
			PersonalDestiny personalDestiny = hero.getPersonalDestiny();
			destinyMasterId = personalDestiny.getDestinyMasterId();
			Struct_bztfwtz_261 struct_bztfwtz_261 = null;
			if (destinyMasterId == 0) {
				List<Struct_bztfwtz_261> sortList = Config_bztfwtz_261.getIns().getSortList();
				struct_bztfwtz_261 = sortList.get(0);
			} else {
				Struct_bztfwtz_261 struct_bztfwtz_2612 = Config_bztfwtz_261.getIns().get(destinyMasterId);
				int next = struct_bztfwtz_2612.getNext();
				if (next == 0) {
					//满级
					DestinySender.sendCmd_4420(hero.getId(), DestinyConst.FAILURE, 0, 0, 0);
					return;
				}
				struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(next);
			}
			// 取得指定品质符文总星级
			int redStar = DestinyFunction.getIns().getfuwenTotalStarByType(hero, GameConst.RED);
			int star = struct_bztfwtz_261.getLv();
			if (redStar < star) {
				// 不满足激活或升级条件
				DestinySender.sendCmd_4420(hero.getId(), DestinyConst.FAILURE_NOT_REACH, 0, 0, 0);
				return;
			}

			int id = struct_bztfwtz_261.getId();
			personalDestiny.setDestinyMasterId(id);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.DESTINY_MASTER_JIHUOUP, SystemIdConst.DESTINY_SYSID);
			int nextId = struct_bztfwtz_261.getNext();
			int isCanUp = 0;
			if (nextId != 0) {
				Struct_bztfwtz_261 next_struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(nextId);
				int lv = next_struct_bztfwtz_261.getLv();
				isCanUp = redStar >= lv ? 1 : 0;
			}
			DestinySender.sendCmd_4420(hero.getId(), DestinyConst.SUCCESS, id, nextId, isCanUp);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "jihuoOrUpLv destinyMasterId:" + destinyMasterId);
		}
	}
	
	/**
	 * 按符文的类型分解 
	 * @param hero
	 * @param type
	 */
	public void fenjieBytype(Hero hero, Object[] ids) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.DESTINY_SYSID)){
				return;
			}
			PersonalDestiny personalDestiny=hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> bagDatas = personalDestiny.getBagData();
			//◆分解符文经验数量=符文星级*符文分解数量+该符文品质对应升级分解数量
			ArrayList<Integer> removeids=new ArrayList<Integer>();
			long fuwenSumExp=0;
			int[][] maxReward = new int[][] {};
			for (int key: bagDatas.keySet()) {
				DestinyBagData destinyBagData = bagDatas.get(key);
				for (int i = 0; i < ids.length; i++) {
					int[][] sp = new int[][] {};
					int type=(byte) ids[i];
					if (destinyBagData.getLock()==0&&destinyBagData.getDestinyId()>0) {
						int destinyId=destinyBagData.getDestinyId();
						Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
						if (struct_bztzf_261.getPz()==type) {
							long addexp1=destinyBagData.getStar()*struct_bztzf_261.getFj();
							Struct_bztlv_261 struct_bztlv_261 = Config_bztlv_261.getIns().get(destinyBagData.getLevel());
							long addexp2 = 0;
							switch (struct_bztzf_261.getPz()) {
							case 2:
								//绿色
								addexp2=struct_bztlv_261.getFj2();
								break;
							case 3:
								//蓝色
								addexp2=struct_bztlv_261.getFj3();
								break;		
							case 4:
								//紫色色
								addexp2=struct_bztlv_261.getFj4();
								break;
							case 5:
								//橙色
								addexp2=struct_bztlv_261.getFj5();
								break;		
							case 6:
								//红色
								addexp2=struct_bztlv_261.getFj6();
								sp = CommonUtil.newCopyArrayAndNum(struct_bztzf_261.getSp(), destinyBagData.getStar());
								break;
							case 8:
								// 神品质
								addexp2 = struct_bztlv_261.getFj8();
								sp = CommonUtil.newCopyArrayAndNum(struct_bztzf_261.getSp(), destinyBagData.getStar());
								break;
							default:
								break;
							}
							maxReward = CommonUtil.arrayPlusArraysItems(maxReward, sp);
							fuwenSumExp=fuwenSumExp+addexp1+addexp2;
							bagDatas.remove(key);
							//符文流水
							B_FlowDestinyEvent.addFlow(hero.getId(), 1, destinyBagData.getDestinyId(), hero.getZoneid());
							if (!removeids.contains(type)) {
								removeids.add(type);
							}
						}
					}
				}
			}
			if (maxReward != null) {
				UseAddUtil.add(hero, maxReward, SourceGoodConst.DESTINY_ADD, UseAddUtil.getDefaultMail(), true);
			}
			if (fuwenSumExp>0) {
				int size = removeids.size();
				Object[] index=new Object[size];
				for (int i = 0; i < size; i++) {
					index[i]=new Object[] {removeids.get(i)};
				}
				UseAddUtil.add(hero, GameConst.DESTINYEXP, (int)fuwenSumExp, SourceGoodConst.DESTINY_REMOVE_LEVEL, true);
				DestinySender.sendCmd_4422(hero.getId(), 0, index);
				return;
			}
			DestinySender.sendCmd_4422(hero.getId(), 1, null);
			return;
			
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "type:");
		}
		
	}
	

	/**
	 * 购买
	 * 
	 * @param hero
	 * @param id
	 *            购买的配置表id
	 */
	public void buy(Hero hero, int id) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, DestinyConst.SYSID)) {
				return;
			}
			PersonalDestiny model = hero.getPersonalDestiny();
			ConcurrentHashMap<Integer, DestinyBagData> bagData = model.getBagData();
			Struct_bztsf_261 struct_bztsf_261 = Config_bztsf_261.getIns().get(id);
			if (struct_bztsf_261 == null) {
				// 商品不存在
				DestinySender.sendCmd_4426(hero.getId(), 3, id);
				return;
			}
			ConcurrentHashMap<Integer, Integer> godFuChange = model.getGodFuChange();
			int destinyId=struct_bztsf_261.getSf();
			Integer hasChangeNum =0;
			if (godFuChange.containsKey(destinyId)) {
				hasChangeNum = godFuChange.get(destinyId);
			}
			if (struct_bztsf_261.getShangxian() != 0 && hasChangeNum >= struct_bztsf_261.getShangxian()) {
				//已经达到兑换上限
				DestinySender.sendCmd_4426(hero.getId(), 5, id);
				return;
			}
			// 添加道具
			List<Object[]> addfuwenlist = new ArrayList<>();
			int itemId = struct_bztsf_261.getSf();
			DestinyBagData destinyBagData = new DestinyBagData();
			destinyBagData.setDestinyId(itemId);
			destinyBagData.setStar(1);
			destinyBagData.setLevel(0);
			int index = DestinyFunction.getIns().getnullDesFromBag(bagData);
			if (index != -1) {
				// 背包没满
				int[][] consume = struct_bztsf_261.getConsume();
				if (!UseAddUtil.canUse(hero, consume)) {
					// 神符碎片不足
					DestinySender.sendCmd_4426(hero.getId(), 2, id);
					return;
				}
				// 消耗
				UseAddUtil.use(hero, consume, SourceGoodConst.DESTINYSHOP_BUY, true);
				bagData.put(index, destinyBagData);
				DestinySender.sendCmd_4426(hero.getId(), 1, id);
				addfuwenlist.add(new Object[] { index, destinyBagData.getDestinyId(), 1, 0 });
				DestinySender.sendCmd_4424(hero.getId(), addfuwenlist.toArray(), 0);
				// 成就树
				AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_28, 1, itemId);
				godFuChange.put(destinyId, hasChangeNum+1);
				//符文流水
				B_FlowDestinyEvent.addFlow(hero.getId(), 0, destinyBagData.getDestinyId(), hero.getZoneid());
				LogTool.info("hid:" + hero.getId() + " name:" + hero.getName() + " index:" + index + " DestinyId:"
						+ destinyBagData.getDestinyId(), DestinyManager.class);
				return;
			} else {
				// 背包已满 不能兑换
				DestinySender.sendCmd_4426(hero.getId(), 4, id);
				LogTool.warn("index==-1:id:" + destinyBagData.getDestinyId() + " hid" + hero.getId(),
						DestinyManager.class);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, DestinyManager.class, hid, hero.getName(), "buy id:" + id);
		}
	}

}
