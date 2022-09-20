package com.teamtop.system.zhanjia;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.bingfa.BingFaModel;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_bao_214;
import excel.config.Config_book_213;
import excel.config.Config_book_215;
import excel.config.Config_clothes_212;
import excel.config.Config_clotheslv_212;
import excel.config.Config_clotheslvskill_212;
import excel.config.Config_clothesstar_212;
import excel.config.Config_clothessuit_212;
import excel.config.Config_drug_200;
import excel.config.Config_godheroxl_289;
import excel.config.Config_hero_211;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_sword_216;
import excel.config.Config_xtcs_004;
import excel.config.Config_yb_217;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_book_213;
import excel.struct.Struct_book_215;
import excel.struct.Struct_clothes_212;
import excel.struct.Struct_clothessuit_212;
import excel.struct.Struct_godheroxl_289;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_sword_216;
import excel.struct.Struct_yb_217;
import excel.struct.Struct_zhuangbei_204;

public class ZhanJiaFunction {

	private static ZhanJiaFunction ins;
	public static ZhanJiaFunction getIns(){
		if(ins == null) {
			ins = new ZhanJiaFunction();
		}
		return ins;
	}

	/**
	 * 获取战甲总战力
	 * @param hero
	 * @return
	 */
	public int getZhanJiaTotelStr(Hero hero) {
		int score=0;
		if (!HeroFunction.getIns().checkSystemOpen(hero, ZhanJiaConst.SYSID)) {
			return score;
		}
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();

		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		if (hero.getZhanJia().getZhanjias()!=null) {
			for (ZhanJiaModel zhanJiaModel:hero.getZhanJia().getZhanjias().values()) {
				//激活
				int pingzhi=0;
				if (Config_clothes_212.getIns().get(zhanJiaModel.getType())!=null) {
					Struct_clothes_212 struct_clothes_212 = Config_clothes_212.getIns().get(zhanJiaModel.getType());
					pingzhi=struct_clothes_212.getPinzhi();
				}
				//升星
				int starindex=pingzhi*1000+zhanJiaModel.getStar();
				int[][] data = Config_clothesstar_212.getIns().get(starindex).getAttr();
				if (data!=null) {
					CommonUtil.arrChargeMap(data, attrMap);
					CommonUtil.arrChargeMap(data, attrMapStarAndlv);
				}
				//觉醒之力
				HashMap<Integer, Integer> jueXingSkills = zhanJiaModel.getJueXingSkills();
				for (int i = GameConst.JUEXING_SKILL1; i <=GameConst.JUEXING_SKILL4; i++) {
					if (i!=GameConst.JUEXING_SKILL4) {
						//觉醒技能
					    //id=品质id*10000+觉醒技能id*1000+等级
					    int goalIndex=pingzhi*10000+i*1000+jueXingSkills.get(i);
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
		//进阶
		if (Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv())!=null) {
			int[][] attr2 = Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv()).getAttr();
			CommonUtil.arrChargeMap(attr2, attrMap);
			CommonUtil.arrChargeMap(attr2, attrMapStarAndlv);
		}


		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int taozhuangSize=Config_xtcs_004.getIns().get(ZhanJiaConst.TAOZHUANGNUM).getNum();
		//兵法套装表
		for (int i = 1; i <=taozhuangSize; i++) {
			Integer integer = hero.getZhanJia().getTaozhuangs().get(i);
			if (Config_clothessuit_212.getIns().get(integer)!=null) {
				Struct_clothessuit_212 struct_clothessuit_212 = Config_clothessuit_212.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_clothessuit_212.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_clothessuit_212.getAttr1(), attrMap);

				int jc = struct_clothessuit_212.getJc();
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
		//技能
		for (int i = 1; i <=ZhanJiaConst.SKILLNUM; i++) {
			if (Config_clotheslvskill_212.getIns().get(hero.getZhanJia().getZhanJiaSkill().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_clotheslvskill_212.getIns().get(hero.getZhanJia().getZhanJiaSkill().get(i)).getAttr(), attrMap);
			}
		}

		//战甲属性丹3
		int num1=hero.getDanyao().get(ZhanJiaConst.DAN3);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(ZhanJiaConst.DAN3).getAttr());
			for(int[] d : data1){
				d[1] = d[1]*num1;
			}
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		//战甲资质丹4
		int num2=hero.getDanyao().get(ZhanJiaConst.DAN4);
		if (num2>0) {
			int[][] data2 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(ZhanJiaConst.DAN4).getAttr());
			for(int[] d : data2){
				d[1] = d[1]*num2;
			}
			CommonUtil.arrChargeMap(data2, attrMap);
		}
		//战甲额外装备
		for (int i = GameConst.INDEX_50; i <=GameConst.INDEX_53; i++) {
			Equip equip = hero.getOnbodyEquip().get(i);
			if (equip!=null) {
				Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				int[][] attrs = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				CommonUtil.arrChargeMap(attrs, attrMap);
			}
		}		
		long[][] data=CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}


	/**
	 * 获取战甲总战力
	 * @param hero
	 * @return
	 */
	public int getZhanJiaStrByid(Hero hero,int index) {
		int score=0;
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		ZhanJia zhanJia=hero.getZhanJia();
		ZhanJiaModel zhanJiaModel=zhanJia.getZhanjias().get(index);
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		//激活
		int pingzhi=0;
		if (Config_clothes_212.getIns().get(zhanJiaModel.getType())!=null) {
			Struct_clothes_212 struct_clothes_212 = Config_clothes_212.getIns().get(zhanJiaModel.getType());
			pingzhi=struct_clothes_212.getPinzhi();
		}
		//升星
		int starindex=pingzhi*1000+zhanJiaModel.getStar();
		int[][] data1 = Config_clothesstar_212.getIns().get(starindex).getAttr();
		if (data1!=null) {
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		//进阶
		/*if (Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv())!=null) {
			CommonUtil.arrChargeMap(Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv()).getAttr(), attrMap);
		}*/

		long[][] data=CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}

	public void redPonint(Hero hero,boolean islogin) {
		/*if (!HeroFunction.getIns().checkSystemOpen(hero, ZhanJiaConst.SYSID)) {
			return;
		}
		//升阶红点
		int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ZhanJiaConst.UP_JIE_ITEM);
		if (hasNum>0) {
			int needExp=Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv()).getExp()-hero.getZhanJia().getExp();
			int needNum=needExp/ZhanJiaConst.UP_JIE_EXP;
			if (needNum<=0) {
				needNum=1;
			}
			if (needNum<=hasNum) {
				if (islogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
				}else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
				}
				return;
			}
		}

		//战甲激活/升星
		for (Struct_clothes_212 struct_clothes_212:Config_clothes_212.getIns().getSortList()) {
			if (UseAddUtil.canUse(hero, struct_clothes_212.getItem())) {
				if (islogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
				}else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
				}
				return;
			}
		}
		//套装
		for (int i = 1; i <=ZhanJiaConst.TAOZHUANGNUM; i++) {
			if (Config_clothessuit_212.getIns().get(hero.getZhanJia().getTaozhuangs().get(i))!=null) {
				int taozhuangid=hero.getZhanJia().getTaozhuangs().get(i);
				if (ZhanJiaManager.getIns().isManZuTiaoJian(hero,taozhuangid)&&UseAddUtil.canUse(hero, Config_clothessuit_212.getIns().get(taozhuangid).getConsume())) {
					if (islogin) {
						RedPointFunction.getIns().addLoginRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
					}else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
					}
					return;
				}
			}
		}
		//技能
		for (int i = 1; i <=ZhanJiaConst.SKILLNUM; i++) {
			if (Config_clotheslvskill_212.getIns().get(hero.getZhanJia().getZhanJiaSkill().get(i))!=null) {
				int skillid=hero.getZhanJia().getZhanJiaSkill().get(i);
				if (Config_clotheslvskill_212.getIns().get(skillid).getLv()>hero.getZhanJia().getJieLv()) {
					continue;
				}
				if(UseAddUtil.canUse(hero, Config_clotheslvskill_212.getIns().get(skillid).getConsume())) {
					if (islogin) {
						RedPointFunction.getIns().addLoginRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
					}else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ZhanJiaConst.SYSID, 1, RedPointConst.HAS_RED);
					}
					return;
				}
			}
		}*/
	}
	/**
	 * 觉醒红点
	 */
	public void jueXingRedPonint(Hero hero,boolean isLogin) {
		for (int index = 1; index <=7; index++) {
			int pingzhi=0;
			HashMap<Integer, Integer> jueXingSkills=null;
			int costId=0;
			boolean ismaxSatr=false;
			switch (index) {
			case 1://1武将
				for (WuJiangModel wuJiangModel: hero.getWujiang().getWujiangs().values()) {
					Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
					if(struct_hero_211.getGodhero() == 1) {
						continue;
					}
					boolean ishasRedPoint=false;
					jueXingSkills=wuJiangModel.getJueXingSkills();
					if (wuJiangModel.getStar()>=struct_hero_211.getStar()) {
						ismaxSatr=true;
					}
					if (struct_hero_211!=null) {
						pingzhi=struct_hero_211.getPinzhi();
						costId= struct_hero_211.getActivation()[0][1];
					}
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
				}
				
				break;
			case 2://2宝物
				for (TreasureModel treasureModel:hero.getTreasureData().getTreasureMap().values()) {
					boolean ishasRedPoint=false;
					jueXingSkills=treasureModel.getJueXingSkills();
					Struct_bao_214 struct_bao_214 = Config_bao_214.getIns().get(treasureModel.getId());
					if (treasureModel.getStarLevel()>=struct_bao_214.getStar()) {
						ismaxSatr=true;
					}
					if (struct_bao_214!=null) {
						pingzhi=struct_bao_214.getPin();
						costId= struct_bao_214.getItem()[0][1];
					}
					
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
				}
				break;
			case 3://3神剑
				for (ExcaliburModel excaliburModel: hero.getExcalibur().getExcaliburMap().values()) {
					jueXingSkills=excaliburModel.getJueXingSkills();
					Struct_sword_216 struct_sword_216 = Config_sword_216.getIns().get(excaliburModel.getId());
					if (excaliburModel.getStarLevel()>=struct_sword_216.getStar()) {
						ismaxSatr=true;
					}
					if (struct_sword_216!=null) {
						pingzhi=struct_sword_216.getPin();
						costId= struct_sword_216.getItem()[0][1];
					}
					boolean ishasRedPoint=false;
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
				}
				
				
				break;
			case 4://4异宝
				for (int key:hero.getSpecialTreasure().getTreasureStar().keySet()) {
					int star = hero.getSpecialTreasure().getTreasureStar().get(key);
					jueXingSkills=hero.getSpecialTreasure().getJueXingSkills().get(key);
					Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(key);
					if (star>=struct_yb_217.getStar()) {
						ismaxSatr=true;
					}
					if (struct_yb_217!=null) {
						pingzhi=struct_yb_217.getPin();
						costId =struct_yb_217.getItem()[0][1];
					}
					boolean ishasRedPoint=false;
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
					
				}
				
				break;
			case 5://5天书
				for (GodBookModel godBookModel:hero.getGodbook().getHasBooks().values()) {
					jueXingSkills=godBookModel.getJueXingSkills();
					Struct_book_215 struct_book_215 = Config_book_215.getIns().get(godBookModel.getId());
					if (godBookModel.getStar()>=struct_book_215.getStar()) {
						ismaxSatr=true;
					}
					if (struct_book_215!=null) {
						pingzhi=struct_book_215.getPin();
						costId =struct_book_215.getItem()[0][1];
					}
					boolean ishasRedPoint=false;
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
					
				}
				break;
			case 6://6兵法
				for (BingFaModel bingFaModel:hero.getBingfa().getBingfas().values()) {
					jueXingSkills=bingFaModel.getJueXingSkills();
					Struct_book_213 struct_book_213 = Config_book_213.getIns().get(bingFaModel.getIndex());
					if (bingFaModel.getStar()>=struct_book_213.getStar()) {
						ismaxSatr=true;
					}
					if (struct_book_213!=null) {
						pingzhi=struct_book_213.getPin();
						costId =struct_book_213.getItem()[0][1];
					}
					
					boolean ishasRedPoint=false;
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
					
				}
				break;
			case 7://7战甲
				for (ZhanJiaModel zhanJiaModel: hero.getZhanJia().getZhanjias().values()) {
					jueXingSkills=zhanJiaModel.getJueXingSkills();
					Struct_clothes_212 struct_clothes_212 = Config_clothes_212.getIns().get(zhanJiaModel.getType());
					if (zhanJiaModel.getStar()>=struct_clothes_212.getStar()) {
						ismaxSatr=true;
					}
					if (struct_clothes_212!=null) {
						pingzhi=struct_clothes_212.getPinzhi();
						costId =struct_clothes_212.getItem()[0][1];
					}
					
					boolean ishasRedPoint=false;
					if (ismaxSatr&&jueXingSkills!=null) {
						ishasRedPoint=isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							//登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index, RedPointConst.HAS_RED);
							break;
						}
					}
				}
				break;
			case 8:// 8神将
				for (WuJiangModel wuJiangModel : hero.getWujiang().getWujiangs().values()) {
					Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
					if (struct_hero_211.getGodhero() != 1) {
						continue;
					}
					boolean ishasRedPoint = false;
					jueXingSkills = wuJiangModel.getJueXingSkills();
					int starindex = struct_hero_211.getPinzhi() * 1000 + wuJiangModel.getXiulianLv();
					Struct_godheroxl_289 struct_godheroxl_289 = Config_godheroxl_289.getIns().get(starindex);

					int nextLv = struct_godheroxl_289.getNext();

					if (nextLv == 0) {
						ismaxSatr = true;
					}
					if (struct_hero_211 != null) {
						pingzhi = struct_hero_211.getPinzhi();
						costId = struct_hero_211.getActivation()[0][1];
					}
					if (ismaxSatr && jueXingSkills != null) {
						ishasRedPoint = isHasRead(hero, jueXingSkills, pingzhi, costId);
					}
					if (ishasRedPoint) {
						if (isLogin) {
							// 登录红点
							RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.JUEXING, index,
									RedPointConst.HAS_RED);
							break;
						} else {
							RedPointFunction.getIns().updateRedPoint(hero, SystemIdConst.JUEXING, index,
									RedPointConst.HAS_RED);
							break;
						}
					}
				}

				break;
			default:
				break;
			}
			
		}
		
	}
	
	
	public boolean isHasRead(Hero hero,HashMap<Integer, Integer> jueXingSkills,int pingzhi,int costId) {
		boolean ishasRedPoint =false;
		
		for (int i =GameConst.JUEXING_SKILL1; i <=GameConst.JUEXING_SKILL4; i++) {
			Integer skilllv = jueXingSkills.get(i);
			if (i==GameConst.JUEXING_SKILL4) {
				//升级觉醒之力
				int nextLv=skilllv+1;
				Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(nextLv);
				if (struct_jxzl_271!=null) {
					boolean isUpLevel=true;
					int needLv = struct_jxzl_271.getLv();
					for (int j = GameConst.JUEXING_SKILL1; j <=GameConst.JUEXING_SKILL3; j++) {
						if (jueXingSkills.get(j)<needLv) {
							isUpLevel=false;
							break;
						}
					}
					if (isUpLevel) {
						//有红点
						ishasRedPoint=true;
					}
				}
			}else {
				//升级觉醒技能
				int nextLv=skilllv+1;
				//id=品质id*10000+觉醒技能id*1000+等级
				int goalIndex=pingzhi*10000+i*1000+nextLv;
			    int thisIndex=pingzhi*10000+i*1000+skilllv;
			    Struct_jx_271 struct_jx_271_this = Config_jx_271.getIns().get(thisIndex);
				Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
				if (struct_jx_271!=null) {
					int consume = struct_jx_271_this.getConsume();
					if (UseAddUtil.canUse(hero, GameConst.TOOL, consume, costId)) {
						//有红点
						ishasRedPoint=true;
					}
					
				}
			}
		}
		return ishasRedPoint;
	}
}
