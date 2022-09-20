package com.teamtop.system.sixWay;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sixdaolv_505;
import excel.config.Config_sixdaoyj_505;
import excel.struct.Struct_sixdaolv_505;
import excel.struct.Struct_sixdaoyj_505;

public class SixWayManager {
	
	private static SixWayManager ins = null;

	public static SixWayManager getIns() {
		if (ins == null) {
			ins = new SixWayManager();
		}
		return ins;
	}

	private SixWayManager() {
		
	}

	public void openUi(Hero hero) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			Object[] bagEquips=null;
			ConcurrentHashMap<Integer, SixWayEquip> bagData = sixWay.getBagData();
			int size = bagData.size();
			if (size>0) {
				int i=0;
				bagEquips=new Object[size];
				for (int keySet:bagData.keySet()) {
					SixWayEquip sixWayEquip = bagData.get(keySet);
					bagEquips[i]=new Object[] {keySet,sixWayEquip.getSixEquipId(),sixWayEquip.getLevel(),sixWayEquip.getStar(),sixWayEquip.getLock()};
					i++;
				}
			}
			Object[] zuheInfos=null;
			HashMap<Integer, Integer> zuhenum = sixWay.getZuhenum();
			int size2 = zuhenum.size();
			if (size2>0) {
				int i=0;
				zuheInfos=new Object[size2];
				for (int j = 1; j <=6; j++) {
					Integer num = zuhenum.get(j);
					zuheInfos[i]=new Object[] {num};
					i++;
				}
			}
			SixWaySender.sendCmd_11902(hero.getId(), sixWay.getStr(), (int)hero.getHeroCurrencies().getSixyinji(), zuheInfos, bagEquips);
		  
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "openUi has wrong");
		}
		
	}

	public void openOneWay(Hero hero, int index) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			ConcurrentHashMap<Integer,SixWayEquip> bodyData = sixWay.getBodyData();
			Object[] equips=new Object[6];
			int i=0;
			for (int key: bodyData.keySet()) {
				if (key/10==index) {
					SixWayEquip sixWayEquip = bodyData.get(key);
					equips[i]=new Object[] {key,sixWayEquip.getSixEquipId(),sixWayEquip.getLevel(),sixWayEquip.getStar()};
					i++;
				}
			}
			equips=CommonUtil.removeNull(equips);
			SixWaySender.sendCmd_11904(hero.getId(), index, equips);
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "openOneWay has wrong");
		}
		
	}

	public void useYingJi(Hero hero, int type, int eid, int bagIndex, int equipPart) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(eid);
			int yinjiType=struct_sixdaoyj_505.getType();
			if (yinjiType==0) {
				return;
			}
			if (type<=0||eid<=0||bagIndex<=0||equipPart<=0) {
				LogTool.warn(hero.getNameZoneid()+"useYingJi useType<0||destinyId<0||bagIndex<0||goalId<0||gridIndex<0", SixWayManager.class);
				return;
			}
			if (bagIndex>SixWayConst.BGA_SIZE) {
				LogTool.warn(hero.getNameZoneid()+"bagIndex>SixWayConst.BGA_SIZE", SixWayManager.class);
				return;
			}
			if (!SixWayFunction.getIns().isJieSuo(hero, equipPart)) {
				LogTool.warn(hero.getNameZoneid()+"!.isJieSuo(hero, gridIndex)", SixWayManager.class);
				return;
			}
			ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
			ConcurrentHashMap<Integer, SixWayEquip> bagDatas = sixWay.getBagData();
			
			
			
			//装备
			if (type==1) {
				SixWayEquip bagSixWayEquip = bagDatas.get(bagIndex);
				if (bagSixWayEquip.getSixEquipId()==0) {
					bagDatas.remove(bagIndex);
					LogTool.warn(hero.getNameZoneid()+"getSixEquipId==0"+bagIndex, SixWayManager.class);
					return;
				}
				if (eid!=bagSixWayEquip.getSixEquipId()) {
					LogTool.warn(hero.getNameZoneid()+"eid!=sixWayEquip.getSixEquipId()"+eid, SixWayManager.class);
					return;
				}
				SixWayEquip bodySixWayEquip = bodyData.get(equipPart);
				
				if (bodySixWayEquip==null) {
					SixWaySender.sendCmd_11906(hero.getId(), 2, type, bagIndex,equipPart );
					LogTool.warn(hero.getNameZoneid()+"bodySixWayEquip==null"+equipPart, SixWayManager.class);
					return;
				}
				if (equipPart!=yinjiType) {
					SixWaySender.sendCmd_11906(hero.getId(), 1, type, bagIndex,equipPart );
					return;
				}
				
				if (!bagDatas.containsKey(bagIndex)) {
					LogTool.warn(hero.getNameZoneid()+"!bagDatas.containsKey(bagIndex)"+bagIndex, SixWayManager.class);
					return;
				}
				//判断要装备的位置必须是空的
				if (bodySixWayEquip.getSixEquipId()==0) {
					
					bodySixWayEquip.setSixEquipId(bagSixWayEquip.getSixEquipId());
					bodySixWayEquip.setLevel(bagSixWayEquip.getLevel());
					bodySixWayEquip.setStar(bagSixWayEquip.getStar());
					//移除背包里的
					bagDatas.remove(bagIndex);
					SixWaySender.sendCmd_11906(hero.getId(), 0, type, bagIndex,equipPart );
					
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.SIXWAY_EQUIP,SystemIdConst.SIXWAY);
					return;
				}else {
					//判断要装备的位置不是空的
					//脱下
					SixWayEquip sixWayEquip=new SixWayEquip();
					
					sixWayEquip.setSixEquipId(bodySixWayEquip.getSixEquipId());
					sixWayEquip.setLevel(bodySixWayEquip.getLevel());
					sixWayEquip.setStar(bodySixWayEquip.getStar());
					
					bagDatas.put(bagIndex, sixWayEquip);
					//装备
					bodySixWayEquip.setSixEquipId(bagSixWayEquip.getSixEquipId());
					bodySixWayEquip.setLevel(bagSixWayEquip.getLevel());
					bodySixWayEquip.setStar(bagSixWayEquip.getStar());
					SixWaySender.sendCmd_11906(hero.getId(), 0, type, bagIndex,equipPart);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.SIXWAY_CHANGE,SystemIdConst.SIXWAY);
					return;
					
				}
			}
			//脱掉
			if (type==2) {
				if (bagDatas.size()>=SixWayConst.BGA_SIZE) {
					LogTool.warn(hero.getNameZoneid()+"bagDatas.size()>=SixWayConst.BGA_SIZE", SixWayManager.class);
					SixWaySender.sendCmd_11906(hero.getId(), 2, type, bagIndex,equipPart);
					return;
				}
				
				SixWayEquip bodySixWayEquip = bodyData.get(equipPart);
				if (bodySixWayEquip==null) {
					SixWaySender.sendCmd_11906(hero.getId(), 2, type, bagIndex,equipPart );
					LogTool.warn(hero.getNameZoneid()+"bodySixWayEquip==null"+equipPart, SixWayManager.class);
					return;
				}
				if (equipPart!=yinjiType) {
					SixWaySender.sendCmd_11906(hero.getId(), 1, type, bagIndex,equipPart );
					return;
				}
				if (bodySixWayEquip.getSixEquipId()==0) {
					LogTool.warn(hero.getNameZoneid()+"bodySixWayEquip.getSixEquipId()==0"+type, SixWayManager.class);
					SixWaySender.sendCmd_11906(hero.getId(), 2, type, bagIndex,equipPart );
					return;
				}
				if (bodySixWayEquip.getSixEquipId()!=eid) {
					LogTool.warn(hero.getNameZoneid()+"bodySixWayEquip.getSixEquipId()!=eid) "+type, SixWayManager.class);
					SixWaySender.sendCmd_11906(hero.getId(), 2, type, bagIndex,equipPart);
					return;
				}
				
				if (bagDatas.containsKey(bagIndex)) {
					//要卸下的位置已经被占用了
					//要交换两天命
					LogTool.warn(hero.getNameZoneid()+"bagDatas.containsKey(bagIndex) "+type, SixWayManager.class);
					SixWaySender.sendCmd_11906(hero.getId(), 2, type, bagIndex,equipPart);
					return;
				}else {
					//放入
					SixWayEquip newSixWayEquip =new SixWayEquip();
					newSixWayEquip.setSixEquipId(bodySixWayEquip.getSixEquipId());
					newSixWayEquip.setLevel(bodySixWayEquip.getLevel());
					newSixWayEquip.setStar(bodySixWayEquip.getStar());
					bagDatas.put(bagIndex, newSixWayEquip);
					
					//脱下
					bodySixWayEquip.setSixEquipId(0);
					bodySixWayEquip.setLevel(0);
					bodySixWayEquip.setStar(0);
				
					SixWaySender.sendCmd_11906(hero.getId(), 0, type, bagIndex,equipPart);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.SIXWAY_OFF,SystemIdConst.SIXWAY);
					return;
				}
			}
			
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "useYingJi has wrong");
		}
		
	}

	public void uplevel(Hero hero, int equipPlace) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			//在人物身上
			ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
			
			if (bodyData==null) {
				LogTool.warn("uplevel bodyData==null has wrong", SixWayManager.class);
				return;
			}
			if (!bodyData.containsKey(equipPlace)) {
				LogTool.warn("!bodyData.containsKey(equipPlace) "+equipPlace, SixWayManager.class);
				return;
			}
			SixWayEquip sixWayEquip = bodyData.get(equipPlace);
			if (sixWayEquip.getSixEquipId()==0) {
				LogTool.warn("bodyDestinyData.getDestinyId()==0 "+equipPlace, SixWayManager.class);
				return;
			}
			Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixWayEquip.getSixEquipId());
			int type = struct_sixdaoyj_505.getType();
			if (type==0) {
				LogTool.warn("type=0 "+equipPlace, SixWayManager.class);
				return;
			}
			//等级上限=初始等级上限+星级提升等级上限*（星级-1）
			int maxLevel=struct_sixdaoyj_505.getLv()+(sixWayEquip.getStar()-1)*struct_sixdaoyj_505.getLvup();
			int nowLevel=sixWayEquip.getLevel();
			
			if (nowLevel>=maxLevel) {
				LogTool.warn("nowLevel>=maxLevel "+nowLevel, SixWayManager.class);
				return;
			}
			int pz=struct_sixdaoyj_505.getPz();
		    Struct_sixdaolv_505 struct_sixdaolv_505 = Config_sixdaolv_505.getIns().get(nowLevel);
			int needExp=0;
			switch (pz) {
			case 1:
				//白色
				break;
			case 2:
				//绿色
				needExp=struct_sixdaolv_505.getExp2();
				break;
			case 3:
				//蓝色
				needExp=struct_sixdaolv_505.getExp3();
				break;		
			case 4:
				//紫色色
				needExp=struct_sixdaolv_505.getExp4();
				break;
			case 5:
				//橙色
				needExp=struct_sixdaolv_505.getExp5();
				break;		
			case 6:
				//红色
				needExp=struct_sixdaolv_505.getExp6();
				break;
			case 8:
				// 神品质
				needExp = struct_sixdaolv_505.getExp8();
				break;
			default:
				break;
			}
			if (needExp==0) {
				LogTool.warn("needExp==0"+equipPlace, SixWayManager.class);
				return;
			}
			if (UseAddUtil.canUse(hero, GameConst.SIXWAYYINJI, needExp)) {
				UseAddUtil.use(hero, GameConst.SIXWAYYINJI, needExp, SourceGoodConst.SIXWAY_UPLEVEL, true);
				sixWayEquip.setLevel(sixWayEquip.getLevel()+1);
				SixWaySender.sendCmd_11908(hero.getId(), 0, equipPlace, sixWayEquip.getSixEquipId(), sixWayEquip.getLevel());
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.SIXWAY_UPLEVEL,SystemIdConst.SIXWAY);
				return;
			}
			SixWaySender.sendCmd_11908(hero.getId(), 1, equipPlace, sixWayEquip.getSixEquipId(), sixWayEquip.getLevel());
			return;
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "uplevel has wrong");
		}
		
	}

	public void upstar(Hero hero, int place) {
		try {
			//角色等级小于开启等级
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			//在人物身上
			ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
			if (bodyData==null) {
				LogTool.warn("upstar bodyData==null has wrong", SixWayManager.class);
				return;
			}
			if (!bodyData.containsKey(place)) {
				LogTool.warn("!goalDestiny.containsKey(index) "+place, SixWayManager.class);
				return;
			}
			SixWayEquip sixWayEquip = bodyData.get(place);
			
			if (sixWayEquip.getSixEquipId()==0) {
				LogTool.warn("sixWayEquip.getSixEquipId()==0 "+place, SixWayManager.class);
				return;
			}
			Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixWayEquip.getSixEquipId());
			int type = struct_sixdaoyj_505.getType();
			if (type==0) {
				LogTool.warn("type=0 "+place, SixWayManager.class);
				return;
			}
			
			int star = sixWayEquip.getStar();
			if (star>=struct_sixdaoyj_505.getStar()) {
				LogTool.warn("star>=struct_sixdaoyj_505.getStar() "+star, SixWayManager.class);
				return;
			}
			int bagplace=SixWayFunction.getIns().getSameJinjiFromBag(sixWay.getBagData(), sixWayEquip.getSixEquipId());
			
			if (bagplace>=0) {
				//背包移除消耗的符文
				sixWay.getBagData().remove(bagplace);
				star=star+1;
				sixWayEquip.setStar(star);
				
				SixWaySender.sendCmd_11910(hero.getId(), 0, place, sixWayEquip.getSixEquipId(), sixWayEquip.getStar(), bagplace);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.SIXWAY_UPSTAR,SystemIdConst.SIXWAY);
			}else {
				SixWaySender.sendCmd_11910(hero.getId(), 1, place, sixWayEquip.getSixEquipId(), sixWayEquip.getStar(), bagplace);
			}
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "upstar has wrong");
		}
		
	}

	public void fenjie(Hero hero, Object[] ids) {
		try {
			
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay = hero.getSixWay();
			ConcurrentHashMap<Integer, SixWayEquip> bagDatas = sixWay.getBagData();
			//◆分解符文经验数量=符文星级*符文分解数量+该符文品质对应升级分解数量
			//玩家分解所得=印记星级*星级分解数量+印记等级分解数量
			ArrayList<Integer> removeids=new ArrayList<Integer>();
			long fuwenSumExp=0;
			int[][] maxReward = new int[][] {};
			for (int i = 0; i < ids.length; i++) {
				int bagplace=(int) ids[i];
				int[][] sp = new int[][] {};
				if (bagDatas.containsKey(bagplace)) {
					SixWayEquip sixWayEquip = bagDatas.get(bagplace);
					if (sixWayEquip.getLock()==0) {
						Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixWayEquip.getSixEquipId());
						long addexp1=sixWayEquip.getStar()*struct_sixdaoyj_505.getFj();
						
						Struct_sixdaolv_505 struct_sixdaolv_505 = Config_sixdaolv_505.getIns().get(sixWayEquip.getLevel());
						long addexp2=0;
						switch (struct_sixdaoyj_505.getPz()) {
						case 2:
							//绿色
							addexp2=struct_sixdaolv_505.getFj2();
							break;
						case 3:
							//蓝色
							addexp2=struct_sixdaolv_505.getFj3();
							break;		
						case 4:
							//紫色色
							addexp2=struct_sixdaolv_505.getFj4();
							break;
						case 5:
							//橙色
							addexp2=struct_sixdaolv_505.getFj5();
							break;		
						case 6:
							//红色
							addexp2=struct_sixdaolv_505.getFj6();
							break;
						case 8:
							// 神品质
							addexp2 = struct_sixdaolv_505.getFj8();
							break;
						default:
							break;
						}
						fuwenSumExp=fuwenSumExp+addexp1+addexp2;
						bagDatas.remove(bagplace);
						removeids.add(bagplace);
					}
				}
			}
			/*if (maxReward != null) {
				UseAddUtil.add(hero, maxReward, SourceGoodConst.SIXYINJI_ADD, UseAddUtil.getDefaultMail(), true);
			}*/
			if (fuwenSumExp>0) {
				int size = removeids.size();
				Object[] index=new Object[size];
				for (int i = 0; i < size; i++) {
					index[i]=new Object[] {removeids.get(i)};
				}
				UseAddUtil.add(hero, GameConst.SIXWAYYINJI, (int)fuwenSumExp, SourceGoodConst.SIXYINJI_ADD, true);
				SixWaySender.sendCmd_11912(hero.getId(), 0, index);
				return;
			}
			SixWaySender.sendCmd_11912(hero.getId(), 1, null);
			return;
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "fenjie has wrong");
		}
		
	}

	public void fenjieBytype(Hero hero, Object[] ids) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
				return;
			}
			SixWay sixWay=hero.getSixWay();
			
			ConcurrentHashMap<Integer, SixWayEquip> bagDatas = sixWay.getBagData();
			//◆分解符文经验数量=符文星级*符文分解数量+该符文品质对应升级分解数量
			ArrayList<Integer> removeids=new ArrayList<Integer>();
			long fuwenSumExp=0;
			int[][] maxReward = new int[][] {};
			for (int key: bagDatas.keySet()) {
				SixWayEquip sixWayEquip = bagDatas.get(key);
				for (int i = 0; i < ids.length; i++) {
					int[][] sp = new int[][] {};
					int type=(byte) ids[i];
					int sixEquipId = sixWayEquip.getSixEquipId();
					if (sixWayEquip.getLock()==0&&sixEquipId>0) {
						Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixEquipId);
						if (struct_sixdaoyj_505.getPz()==type) {
							long addexp1=sixWayEquip.getStar()*struct_sixdaoyj_505.getFj();
							Struct_sixdaolv_505 struct_sixdaolv_505 = Config_sixdaolv_505.getIns().get(sixWayEquip.getLevel());
							long addexp2 = 0;
							switch (struct_sixdaoyj_505.getPz()) {
							case 2:
								//绿色
								addexp2=struct_sixdaolv_505.getFj2();
								break;
							case 3:
								//蓝色
								addexp2=struct_sixdaolv_505.getFj3();
								break;		
							case 4:
								//紫色色
								addexp2=struct_sixdaolv_505.getFj4();
								break;
							case 5:
								//橙色
								addexp2=struct_sixdaolv_505.getFj5();
								break;		
							case 6:
								//红色
								addexp2=struct_sixdaolv_505.getFj6();
								break;
							case 8:
								// 神品质
								addexp2 = struct_sixdaolv_505.getFj8();
								break;
							default:
								break;
							}
							fuwenSumExp=fuwenSumExp+addexp1+addexp2;
							bagDatas.remove(key);
							//符文流水
							if (!removeids.contains(type)) {
								removeids.add(type);
							}
						}
					}
				}
			}
			if (fuwenSumExp>0) {
				int size = removeids.size();
				Object[] index=new Object[size];
				for (int i = 0; i < size; i++) {
					index[i]=new Object[] {removeids.get(i)};
				}
				UseAddUtil.add(hero, GameConst.SIXWAYYINJI, (int)fuwenSumExp, SourceGoodConst.SIXYINJI_ADD, true);
				SixWaySender.sendCmd_11916(hero.getId(), 0, index);
				return;
			}
			SixWaySender.sendCmd_11916(hero.getId(), 1, null);
			return;
		} catch (Exception e) {
			LogTool.error(e, SixWayManager.class, "fenjieBytype has wrong");
		}
		
	}

}
