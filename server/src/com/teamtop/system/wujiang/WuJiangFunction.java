package com.teamtop.system.wujiang;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothes;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.setting.SettingFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_drug_200;
import excel.config.Config_godherotf_289;
import excel.config.Config_godheroxl_289;
import excel.config.Config_hero_211;
import excel.config.Config_herogod_211;
import excel.config.Config_herogodskill_211;
import excel.config.Config_herolv_211;
import excel.config.Config_herolvskill_211;
import excel.config.Config_herostar_211;
import excel.config.Config_herosuit_211;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_sz_739;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_godherotf_289;
import excel.struct.Struct_godheroxl_289;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_herogod_211;
import excel.struct.Struct_herogodskill_211;
import excel.struct.Struct_herostar_211;
import excel.struct.Struct_herosuit_211;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_sz_739;
import excel.struct.Struct_zhuangbei_204;

public class WuJiangFunction {
	
	private static WuJiangFunction ins;
	public static WuJiangFunction getIns(){
		if(ins == null) {
			ins = new WuJiangFunction();
		}
		return ins;
	}
	
	
	/**
	 * 获取武将总战力
	 * @param hero
	 * @return
	 */
	public int getWuJiangTotelStr(Hero hero) {
		int score=0;
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		WuJiang wujiang=hero.getWujiang();
		HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		if (wujiang.getWujiangs()!=null) {
			for (WuJiangModel wuJiangModel:wujiang.getWujiangs().values()) {
				int pinzhi=0;
				//激活武将
				if (Config_hero_211.getIns().get(wuJiangModel.getType())!=null) {
					Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
					pinzhi=struct_hero_211.getPinzhi();

				}
				//武将升星
				int starindex=pinzhi*1000+wuJiangModel.getStar();
				Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
				if(struct_hero_211.getGodhero() == 1) {
					starindex=pinzhi*1000+wuJiangModel.getXiulianLv();
				}
				Struct_herostar_211 struct_herostar_211 = Config_herostar_211.getIns().get(starindex);
				if (struct_herostar_211!=null) {
					int[][] data = CommonUtil.copyDyadicArray(struct_herostar_211.getAttr());
					CommonUtil.arrChargeMap(data, attrMap);
					CommonUtil.arrChargeMap(data, attrMapStarAndlv);
				}
				
				if(struct_hero_211.getGodhero() == 1) {
					//神将激活属性
					CommonUtil.arrChargeMap(struct_hero_211.getAttr(), attrMap);
					//神将天赋
					Struct_godherotf_289 struct_godherotf_289 = Config_godherotf_289.getIns().get(wuJiangModel.getTalentLv());
					if(struct_godherotf_289 != null) {
						CommonUtil.arrChargeMap(struct_godherotf_289.getAttr(), attrMap);
					}
					// 觉醒之力
					HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
					if (jueXingSkills != null && jueXingSkills.size() > 0) {
						for (int i = GameConst.JUEXING_SKILL1; i <= GameConst.JUEXING_SKILL4; i++) {
							if (i != GameConst.JUEXING_SKILL4) {
								// 觉醒技能
								// id=品质id*10000+觉醒技能id*1000+等级
								int goalIndex = pinzhi * 10000 + i * 1000 + jueXingSkills.get(i);
								Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
								if (struct_jx_271 != null) {
									CommonUtil.arrChargeMap(struct_jx_271.getAttr(), attrMap);
								}
							} else {
								// 觉醒之力
								Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(jueXingSkills.get(i));
								if (struct_jxzl_271 != null) {
									CommonUtil.arrChargeMap(struct_jxzl_271.getAttr(), attrMap);
								}

							}
						}
					}
				}else {
					//武将-神将之力
					int godStar = wuJiangModel.getGodStar();
					if (godStar>0) {
						int goalindex=wuJiangModel.getType()*100+godStar+1;
						Struct_herogod_211 struct_herogod_211 = Config_herogod_211.getIns().get(goalindex);
						if (struct_herogod_211!=null) {
							CommonUtil.arrChargeMap(struct_herogod_211.getAttr(), attrMap);
						}
						
					}
					// 武将-神将之力技能进阶
					int godSkillLevel = wuJiangModel.getGodSkillLevel();
					if (godSkillLevel > 0) {
						int goalindex = WuJiangFunction.getIns().godSkillLvToId(wuJiangModel.getType(), godSkillLevel);
						Struct_herogodskill_211 struct_herogodskill_211 = Config_herogodskill_211.getIns()
								.get(goalindex);
						if (struct_herogodskill_211 != null) {
							CommonUtil.arrChargeMap(struct_herogodskill_211.getAttr(), attrMap);
						}

					}
					//觉醒之力
					HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
					if(jueXingSkills!=null && jueXingSkills.size()>0) {
						for (int i = GameConst.JUEXING_SKILL1; i <=GameConst.JUEXING_SKILL4; i++) {
							if (i!=GameConst.JUEXING_SKILL4) {
								//觉醒技能
								//id=品质id*10000+觉醒技能id*1000+等级
								int goalIndex=pinzhi*10000+i*1000+jueXingSkills.get(i);
								Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
								if (struct_jx_271!=null) {
									CommonUtil.arrChargeMap(struct_jx_271.getAttr(), attrMap);
								}
							}else {
								//觉醒之力
								Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(jueXingSkills.get(i));
								if (struct_jxzl_271!=null) {
									CommonUtil.arrChargeMap(struct_jxzl_271.getAttr(), attrMap);
								}
								
							}
						}
					}
				}
			}
		}
		//武将进阶
		if (Config_herolv_211.getIns().get(wujiang.getJieLv())!=null) {
			int[][] attrs = Config_herolv_211.getIns().get(wujiang.getJieLv()).getAttr();
			CommonUtil.arrChargeMap(attrs, attrMap);
			CommonUtil.arrChargeMap(attrs, attrMapStarAndlv);
		}
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		
		int num=Config_xtcs_004.getIns().get(WuJiangConst.TAOZHUANG_NUM).getNum();
		//武将套装表
		for (int i = 1; i <=num; i++) {
			Integer integer = wujiang.getTaozhuangs().get(i);
			if (Config_herosuit_211.getIns().get(integer)!=null) {
				Struct_herosuit_211 struct_herosuit_211 = Config_herosuit_211.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_herosuit_211.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_herosuit_211.getAttr1(), attrMap);
				
				int jc = struct_herosuit_211.getJc();
				double jcx=jc/100000.0000;
				if (jc>0) {
					//套装加强 升星升阶属性万分比
					long[][] newAddAttr=CommonUtil.copyDyadicArray(starAndlvAttr);
					for(long[] d : newAddAttr){
						double x1=d[1]*jcx;
						d[1] =(long) (x1);
					}
					//套装羁绊百分比属性
					CommonUtil.arrChargeMap(newAddAttr, attrMap);
				}
			}
		}
		
		
		//武将技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_herolvskill_211.getIns().get(wujiang.getWujiangSkill().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_herolvskill_211.getIns().get(wujiang.getWujiangSkill().get(i)).getAttr(), attrMap);
			}
		}
		//武将时装
		FashionClothes fashionClothes=hero.getFashionClothes();
		if (fashionClothes.getClothesStar().size()>0) {
			for (int key : fashionClothes.getClothesStar().keySet()) {
				Struct_sz_739 struct_sz_739 = Config_sz_739.getIns().get(key);
				//激活武将时装
				if (struct_sz_739!=null) {
					CommonUtil.arrChargeMap(struct_sz_739.getShuxing(), attrMap);	
				}
				//武将时装升星
				int starNum=fashionClothes.getClothesStar().get(key)-1;
				if (starNum>0) {
					if (struct_sz_739!=null) {
						int[][] data = CommonUtil.copyDyadicArray(struct_sz_739.getShengxing());
						for(int[] d : data){
							d[1] = d[1]*starNum;
						}
						CommonUtil.arrChargeMap(data, attrMap);
					}
				}
			}
		}
		//将印装备
		for (int i = GameConst.INDEX_WUJING_0; i <=GameConst.INDEX_WUJING_9; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attrs = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attrs, attrMap);
			}
		}
		//武将装备
		for (int i = GameConst.INDEX_40; i <=GameConst.INDEX_43; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attrs = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attrs, attrMap);
			}
		}
		//武将属性丹
		int num1=hero.getDanyao().get(WuJiangConst.INDEX1);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(WuJiangConst.INDEX1).getAttr());
			for(int[] d : data1){
				d[1] = d[1]*num1;
			}
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		//武将培养丹
		int num2=hero.getDanyao().get(WuJiangConst.INDEX2);
		if (num2>0) {
			int[][] data2 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(WuJiangConst.INDEX2).getAttr());
			for(int[] d : data2){
				d[1] = d[1]*num2;
			}
			CommonUtil.arrChargeMap(data2, attrMap);
		}
		
		long[][] data=CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}

	public int getWuJiangStrByid(Hero hero,int index) {
		int score=0;
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
		WuJiangModel wuJiangModel=hero.getWujiang().getWujiangs().get(index);
		int pinzhi=0;
		//激活武将
		if (Config_hero_211.getIns().get(wuJiangModel.getType())!=null) {
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
			pinzhi=struct_hero_211.getPinzhi();

		}
		//武将升星
		int starindex=pinzhi*1000+wuJiangModel.getStar();
		Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
		if(struct_hero_211.getGodhero() == 1) {
			starindex=pinzhi*1000+wuJiangModel.getXiulianLv();
		}
		Struct_herostar_211 struct_herostar_211 = Config_herostar_211.getIns().get(starindex);
		if (struct_herostar_211!=null) {
			int[][] data = CommonUtil.copyDyadicArray(struct_herostar_211.getAttr());
			CommonUtil.arrChargeMap(data, attrMap);
		}
		
		if(struct_hero_211 != null) {
			if(struct_hero_211.getGodhero() == 1) {
				//神将激活
				CommonUtil.arrChargeMap(struct_hero_211.getAttr(), attrMap);
				//神将天赋
				Struct_godherotf_289 struct_godherotf_289 = Config_godherotf_289.getIns().get(wuJiangModel.getTalentLv());
				if(struct_godherotf_289 != null) {
					CommonUtil.arrChargeMap(struct_godherotf_289.getAttr(), attrMap);
				}
			}
		}
		
		//激活武将
		/*if (Config_hero_211.getIns().get(wuJiangModel.getType())!=null) {
			CommonUtil.arrChargeMap(Config_hero_211.getIns().get(wuJiangModel.getType()).getAttr(), attrMap);
		}
		//武将升星
		int starNum=wuJiangModel.getStar()-1;
		if (starNum>0) {
			int[][] data = CommonUtil.copyDyadicArray(Config_hero_211.getIns().get(wuJiangModel.getType()).getStarattr());
			for(int[] d : data){
				d[1] = d[1]*starNum;
			}
			CommonUtil.arrChargeMap(data, attrMap);
		}*/
		//武将进阶
		/*if (Config_herolv_211.getIns().get(hero.getWujiang().getJieLv())!=null) {
			CommonUtil.arrChargeMap(Config_herolv_211.getIns().get(hero.getWujiang().getJieLv()).getAttr(), attrMap);
		}*/
		//武将技能
		/*for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_herolvskill_211.getIns().get(hero.getWujiang().getWujiangSkill().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_herolvskill_211.getIns().get(hero.getWujiang().getWujiangSkill().get(i)).getAttr(), attrMap);
			}
		}
		//武将时装
		FashionClothes fashionClothes=hero.getFashionClothes();
		if (fashionClothes.getClothesStar().size()>0) {
			for (int key : fashionClothes.getClothesStar().keySet()) {
				Struct_sz_739 struct_sz_739 = Config_sz_739.getIns().get(key);
				//激活武将时装
				if (struct_sz_739!=null) {
					CommonUtil.arrChargeMap(struct_sz_739.getShuxing(), attrMap);	
				}
				//武将时装升星
				int starNum1=fashionClothes.getClothesStar().get(key)-1;
				if (starNum>0) {
					if (struct_sz_739!=null) {
						int[][] data = CommonUtil.copyDyadicArray(struct_sz_739.getShengxing());
						for(int[] d : data){
							d[1] = d[1]*starNum1;
						}
						CommonUtil.arrChargeMap(data, attrMap);
					}
				}
			}
		}*/
		long[][] data=CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}
	
	/**
	 * 激活武将
	 * 
	 * @param hero
	 * @param 道具id 武将激活道具
	 */
	public void jihuowj(Hero hero, int itemid) {
		int type=0;
		try {
			for (Struct_hero_211 hero_211:Config_hero_211.getIns().getSortList()) {
				if(hero_211.getActivation()[0][1]==itemid) {
					type=hero_211.getType();
				}
			}
			if (hero.getWujiang().getWujiangs().containsKey(type)) {
				return;
			}
			if (Config_hero_211.getIns().get(type) == null) {
				return;
			}
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			if (!UseAddUtil.canUse(hero, struct_hero_211.getActivation())) {
				return;
			}
			UseAddUtil.use(hero, struct_hero_211.getActivation(), SourceGoodConst.WUJIANG_JIHUO, true);
			WuJiangModel wuJiangModel = new WuJiangModel();
			wuJiangModel.setType(type);
			wuJiangModel.setStar(1);
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
			jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
			wuJiangModel.setJueXingSkills(jueXingSkills);
			
			hero.getWujiang().getWujiangs().put(type, wuJiangModel);

			FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_JIHUO,SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_660(hero.getId(), 1, type);
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ACTIVATE_GENERAL, null);
			SettingFunction.getIns().generalActivate(hero, type);
			if (struct_hero_211.getPinzhi()>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
				ChatManager.getIns().broadCast(ChatConst.BROCAST_WUJIANG,
						new Object[] { hero.getName(), struct_hero_211.getType() }); // 全服广播
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "jihuowj:" + type);
		}
	}
	
	public boolean redPonint(Hero hero) {
		/*if (!HeroFunction.getIns().checkSystemOpen(hero, WuJiangConst.SYSID)) {
			return false;
		}
		int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WuJiangConst.UP_JIE_ITEM);
		if (hasNum>0) {
			int needExp=Config_herolv_211.getIns().get(hero.getWujiang().getJieLv()).getExp()-hero.getWujiang().getExp();
			int needNum=needExp/WuJiangConst.UP_JIE_EXP;
			if (needNum<=0) {
				needNum=1;
			}
			//升阶红点
			if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, WuJiangConst.UP_JIE_ITEM)) {
				return true;
			}
		}
	
		//技能红点
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			int skillid=hero.getWujiang().getWujiangSkill().get(i);
			if(Config_herolvskill_211.getIns().get(skillid).getConsume()==null) {
				continue;
			}
			if (Config_herolvskill_211.getIns().get(skillid).getLv()>hero.getWujiang().getJieLv()) {
				continue;
			}
			if(UseAddUtil.canUse(hero, Config_herolvskill_211.getIns().get(skillid).getConsume())) {
				return true;
			}
		}
		//激活武将/升星武将 红点
		for (Struct_hero_211 struct_hero_211:Config_hero_211.getIns().getSortList()) {
			if (hero.getWujiang().getWujiangs().get(struct_hero_211.getType())==null) {
				continue;
			}
			if (hero.getWujiang().getWujiangs().get(struct_hero_211.getType()).getStar()>=WuJiangConst.MAX_STAR) {
				continue;
			}
			if (UseAddUtil.canUse(hero, struct_hero_211.getActivation())) {
				return true;
			}
		}
		//将印红点
		Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
		Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
		int type = 0;
		ArrayList<Equip> typeList = null;
		HashMap<Integer, ArrayList<Equip>> typeMap = new HashMap<Integer, ArrayList<Equip>>();
		for(Equip e : notOnBodyEquip.values()){
			if(e.getState() != EquipConst.IN_BAG){
				continue;
			}
			type = EquipFunction.getIns().getEquipPart( e.getSysId());
			typeList = typeMap.get(type);
			if(typeList == null){
				typeList = new ArrayList<Equip>();
				typeMap.put(type, typeList);
			}
			typeList.add(e);
		}
		ArrayList<Equip> list = null;
		Equip tempEquip = null;
		Equip equip = null;
		EquipScoreComparator comparator = new EquipScoreComparator();
		for(int i=GameConst.INDEX_WUJING_0; i<=GameConst.INDEX_WUJING_9; i++){
			if (hero.getOfficial()<WuJiangConst.jiangYingMap.get(i)) {
				continue;
			}
			type = i;
			list = typeMap.get(type);
			if(list == null){
				continue;
			}
			Collections.sort(list, comparator);
			tempEquip = null;
			for(int j=0; j<list.size(); j++){
				Equip temp = list.get(j);
				int[] equipZsLevel = EquipFunction.getEquipZsLevel(temp.getSysId());
				int rebornLv = equipZsLevel[0];
				int level = equipZsLevel[1];
				if(level > hero.getLevel() || rebornLv > hero.getRebornlv()){
					continue;
				}
				tempEquip = temp;
				break;
			}
			if(tempEquip == null){
				continue;
			}
			equip = bodyEquip.get(i);
			if(equip != null){
				int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
				int strengthTemp = EquipFunction.getIns().getEquipStrength( tempEquip.getSysId());
				if( strength< strengthTemp){
					return true;
				}
			}
		}

		//将印合成红点
		for (int i = GameConst.INDEX_WUJING_0; i <=GameConst.INDEX_WUJING_9; i++) {
			if (hero.getOfficial()<WuJiangConst.jiangYingMap.get(i)) {
				continue;
			}
			equip = bodyEquip.get(i);
			Struct_eqiuplv_204 struct_eqiuplv_204=null;
			if (equip!=null) {
				//合成
				struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(i).get(equip.getSysId());
			}else {
				//神装升级
				struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(i).get(0);
			}
			int nextSysId = struct_eqiuplv_204.getId();
			//判断升级等级
			int[] equipZsLevel = EquipFunction.getEquipZsLevel(nextSysId);
			int level = equipZsLevel[1];
			int rebornLv = equipZsLevel[0];
			if(level > hero.getLevel() || rebornLv > hero.getRebornlv()){
				continue;
			}
			//判断材料
			int[][] fenjie = struct_eqiuplv_204.getCompose();
			if(UseAddUtil.canUse(hero, fenjie)){
				return true;
			}
			
		}*/
		return false;
	}
	
	public Map<Integer, Map<Integer, Integer>> getWujiangAndStarNum(Hero hero){
		Map<Integer, WuJiangModel> wujiangs = hero.getWujiang().getWujiangs();
		Map<Integer, Map<Integer, Integer>> map= new HashMap<>();
		Map<Integer, Integer> wujiangNumMap= new HashMap<>();
		map.put(1, wujiangNumMap);
		Map<Integer, Integer> starNumMap= new HashMap<>();
		map.put(2, starNumMap);
		for(Entry<Integer, WuJiangModel> entry:wujiangs.entrySet()) {
			//获取各品质武将数量
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(entry.getKey());
			int pinzhi = struct_hero_211.getPinzhi();
			Integer wujiangNum = wujiangNumMap.get(pinzhi);
			if(wujiangNum==null) {
				wujiangNumMap.put(pinzhi, 1);
			}else {
				wujiangNumMap.put(pinzhi, wujiangNum+1);
			}
			
			//获取各品质武将星数
			WuJiangModel value = entry.getValue();
			int star = value.getStar();
			Integer starNum = starNumMap.get(pinzhi);
			if(starNum==null) {
				starNumMap.put(pinzhi, star);
			}else {
				starNumMap.put(pinzhi, starNum+star);
			}
		}
		return map;
	}
	
	
	/**
	 * 神将红点
	 * @param hero
	 */
	public void shenJiangRedPonint(Hero hero) {
		try {
			WuJiang wuJiang =hero.getWujiang();
			if (wuJiang==null) {
				return;
			}
			HashMap<Integer, WuJiangModel> wuJiangModelMap = wuJiang.getWujiangs();
			int star = 0;
			for(WuJiangModel wj : wuJiangModelMap.values()) {
				Struct_hero_211 hero_211=Config_hero_211.getIns().get(wj.getType());
				if(hero_211.getGodhero() == 0) {
					star += wj.getStar();
				}
			}
			List<Struct_hero_211> list = Config_hero_211.getIns().getSortList();
			for(Struct_hero_211 struct_hero_211 : list) {
				if(struct_hero_211.getGodhero() == 1) {
					int type = struct_hero_211.getType();
					WuJiangModel wuJiangModel = wuJiangModelMap.get(type);
					if(wuJiangModel == null) {
						//激活
						if(star >= struct_hero_211.getJh()) {
							if (UseAddUtil.canUse(hero, struct_hero_211.getActivation())) {
								RedPointFunction.getIns().addLoginRedPoint(hero, WuJiangConst.SYSID, WuJiangConst.SHENJIANG, RedPointConst.HAS_RED); return;
							}
						}
					}else {
						//神将修炼
						int pinzhi = struct_hero_211.getPinzhi(); 
						int starindex = pinzhi*1000+wuJiangModel.getStar();
						Struct_godheroxl_289 struct_godheroxl_289 = Config_godheroxl_289.getIns().get(starindex);
						int nextLv = struct_godheroxl_289.getNext();
						if(nextLv > 0) {
							boolean bool = true;
							int[][] conmuse = struct_godheroxl_289.getConmuse();
							if(conmuse != null) {
								if (!UseAddUtil.canUse(hero, conmuse)) {
									bool = false;
								}
							}
							if(bool) {
								int tpNum = struct_godheroxl_289.getTp();
								if(tpNum > 0) {
									if (UseAddUtil.canUse(hero, struct_hero_211.getActivation(),tpNum)) {
										RedPointFunction.getIns().addLoginRedPoint(hero, WuJiangConst.SYSID, WuJiangConst.SHENJIANG, RedPointConst.HAS_RED); return;
									}
								}else {
									RedPointFunction.getIns().addLoginRedPoint(hero, WuJiangConst.SYSID, WuJiangConst.SHENJIANG, RedPointConst.HAS_RED); return;
								}
							}
						}
						//神将天赋
						int talentLv = wuJiangModel.getTalentLv();
						if(talentLv < struct_godheroxl_289.getMax()) {
							Struct_godherotf_289 struct_godherotf_289 = Config_godherotf_289.getIns().get(talentLv);
							int lv = struct_godherotf_289.getNext();//天赋下一等级
							if(lv > 0) {
								int[][] conmuse = struct_godherotf_289.getConmuse();
								if(conmuse != null) {
									if (UseAddUtil.canUse(hero, conmuse)) {
										RedPointFunction.getIns().addLoginRedPoint(hero, WuJiangConst.SYSID, WuJiangConst.SHENJIANG, RedPointConst.HAS_RED); return;
									}
								}
							}
						}
						
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RedPointFunction.class, hero.getId(), hero.getName(), "addShenjiangLoginRedPoint");
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		WuJiang wuJiang = hero.getWujiang();
		if (wuJiang == null) {
			return;
		}
		HashMap<Integer, WuJiangModel> wuJiangModelMap = wuJiang.getWujiangs();
		for (Entry<Integer, WuJiangModel> entry : wuJiangModelMap.entrySet()) {
			// 神将神将之力技能进阶
			Integer type = entry.getKey();
			WuJiangModel wuJiangModel = entry.getValue();
			int godSkillLevel = wuJiangModel.getGodSkillLevel();
			int nextGodSkillId = WuJiangFunction.getIns().godSkillLvToId(type, godSkillLevel) + 1;
			Struct_herogodskill_211 struct_herogodskill_211 = Config_herogodskill_211.getIns().get(nextGodSkillId);
			if (struct_herogodskill_211 == null) {
				continue;
			}
			if (wuJiangModel.getGodStar() < struct_herogodskill_211.getStar()) {
				// 对应神将之力等级不足
				continue;
			}
			int[][] consume = struct_herogodskill_211.getConsume();
			if (UseAddUtil.canUse(hero, consume)) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.WUJIANG_SYSID, type,
							RedPointConst.HAS_RED);
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WUJIANG_SYSID, type,
							RedPointConst.HAS_RED);
				}
			}
		}
	}

	public int godSkillLvToId(int type, int godSkillLv) {
		return type * 100 + godSkillLv;
	}

	public int getGodSkillLevel(int job, WuJiang wujiang) {
		if (job > 1000) {
			job /= 1000;
		}
		final int type = job;
		Integer godSkillLevel = Optional.ofNullable(wujiang).map(mapper -> mapper.getWujiangs())
				.map(mapper -> mapper.get(type)).map(model -> model.getGodSkillLevel()).orElse(0);
		return godSkillLevel;
	}

}
