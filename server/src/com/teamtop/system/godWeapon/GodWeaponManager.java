package com.teamtop.system.godWeapon;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.magicDiscount.MagicDiscountFunction;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sb_750;
import excel.config.Config_sbcl_750;
import excel.config.Config_sbpf_750;
import excel.config.Config_sbsx_750;
import excel.config.Config_sbsz_750;
import excel.config.Config_sbzs_750;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_sb_750;
import excel.struct.Struct_sbcl_750;
import excel.struct.Struct_sbdzmb_750;
import excel.struct.Struct_sbpf_750;
import excel.struct.Struct_sbsx_750;
import excel.struct.Struct_sbsz_750;
import excel.struct.Struct_sbzs_750;

public class GodWeaponManager {
	
	private static GodWeaponManager ins = null;

	public static GodWeaponManager getIns() {
		if (ins == null) {
			ins = new GodWeaponManager();
		}
		return ins;
	}
	
	
	public void openUi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			GodWeapon godWeapon = hero.getGodWeapon();
			if (godWeapon==null) {
				LogTool.warn("godWeapon==null ", GodWeaponManager.class);
				return;
			}
			Object[] arrs=new Object[] {};
			if (godWeapon.getWeaponIdByWuJiang().size()>0) {
				arrs=new Object[godWeapon.getWeaponIdByWuJiang().size()];
				int i=0;
				for (GodWeaponInfo godWeaponInfo:godWeapon.getWeaponIdByWuJiang().values()) {
					// fix神兵没有皮肤
					List<Struct_sbpf_750> sortList = Config_sbpf_750.getIns().getSortList();
					for (Struct_sbpf_750 sbpf_750 : sortList) {
						int type2 = sbpf_750.getId() / 1000;
						int type = godWeaponInfo.getType();
						if (type2 == type) {
							if (!godWeaponInfo.getFashions().contains(sbpf_750.getId())
									&& godWeaponInfo.getCuilianLevel() >= sbpf_750.getTj()) {
								// 添加初始化神兵皮肤
								godWeaponInfo.getFashions().add(sbpf_750.getId());
								GodWeaponSender.sendCmd_7862(hero.getId(), type, sbpf_750.getId());
							}
						}
					}

					//[B:武将类型I:星级I:当前穿戴武器id[I:已经激活的武器时装][I:1-3神铁、陨铁 玄铁I:吞噬个数]I:专属神兵等级I:淬炼等级
					Set<Integer> fashions = godWeaponInfo.getFashions();
					Object[] fashionObjs=null;
					if (fashions.size()>0) {
						fashionObjs=new Object[fashions.size()];
						int a=0;
						for (int jihuosFashId:fashions) {
							fashionObjs[a]=new Object[] {jihuosFashId};
							a++;
						}
					}
					
					Object[] godZhus=new Object[3];
					HashMap<Integer, Integer> godForges = godWeaponInfo.getGodForges();
					for (int j = 1; j <=3; j++) {
						godZhus[j-1]=new Object[] {j,godForges.get(j)};
					}
					arrs[i]=new Object[] {godWeaponInfo.getType(),godWeaponInfo.getStar(),godWeaponInfo.getWearWeapon(),fashionObjs,godZhus,godWeaponInfo.getZhuanshuLevel(),godWeaponInfo.getCuilianLevel(),godWeaponInfo.getCuilianexp()};
				    i++;
				}
			}
			int leftHightNum=10-godWeapon.getNum()%10;;
			
			GodWeaponSender.sendCmd_7850(hero.getId(), arrs,leftHightNum, godWeapon.getNum(),godWeapon.getQs());
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "openUi has wrong");
		}
		
	}
	
	/**
	 * 激活/升星专属神兵
	 * @param hero
	 * @param type
	 */
	public void upstar(Hero hero, int type) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			GodWeapon godWeapon = hero.getGodWeapon();
			if (godWeapon==null) {
				LogTool.warn("godWeapon==null ", GodWeaponManager.class);
				return;
			}
			if (!hero.getWujiang().getWujiangs().containsKey(type)) {
				GodWeaponSender.sendCmd_7852(hero.getId(), 3, type, 0);
				LogTool.warn("!hero.getWujiang().getWujiangs().containsKey(type) "+type, GodWeaponManager.class);
				return;
			}
			
			GodWeaponInfo godWeaponInfo = godWeapon.getWeaponIdByWuJiang().get(type);
			int fashionid=type*1000;
			Struct_sb_750 struct_sb_750 = Config_sb_750.getIns().get(fashionid);
			if (struct_sb_750==null) {
				LogTool.warn("struct_sb_750==null has wrong fashionid:"+fashionid, GodWeaponManager.class);
				GodWeaponSender.sendCmd_7852(hero.getId(), 1, type, 0);
				return;
			}
			
			//升星属性
			int pinzhi = struct_sb_750.getPinzhi();
			int starNum= 1;
			if(godWeaponInfo != null) {
				starNum= godWeaponInfo.getStar();
			}
			int starindex=pinzhi*1000+starNum;
			Struct_sbsx_750 struct_sbsx_750 = Config_sbsx_750.getIns().getMap().get(starindex);
			if (struct_sbsx_750!=null &&struct_sbsx_750.getNext() == 0) {
				GodWeaponSender.sendCmd_7852(hero.getId(), 1, type, 0);
				return;
			}
			
			if (!UseAddUtil.canUse(hero, struct_sb_750.getActivation())) {
				GodWeaponSender.sendCmd_7852(hero.getId(), 2, type, 0);
				LogTool.warn("!UseAddUtil.canUse(hero, struct_sb_750.getActivation())"+struct_sb_750.getBianhao(), GodWeaponManager.class);
				return;
			}
			
			UseAddUtil.use(hero, struct_sb_750.getActivation(), 1, SourceGoodConst.UP_GODWEAPONSTAR, true);
			
			if (godWeaponInfo==null) {
				//激活
				godWeaponInfo=new GodWeaponInfo();
				godWeaponInfo.setType(type);
				godWeaponInfo.setFashions(new  HashSet<>());
				godWeaponInfo.setStar(1);
				godWeaponInfo.setCuilianLevel(1);
				HashMap<Integer,Integer> godForges=new HashMap<Integer,Integer>();
				godForges.put(1, 0);
				godForges.put(2, 0);
				godForges.put(3, 0);
				godWeaponInfo.setGodForges(godForges);
				godWeaponInfo.setZhuanshuLevel(0);
				godWeapon.getWeaponIdByWuJiang().put(type, godWeaponInfo);
				//添加初始化神兵皮肤
				godWeaponInfo.getFashions().add(fashionid);
			    //广播
				ChatManager.getIns().broadCast(ChatConst.JIHUO_GODWEAPON, new Object[] { hero.getNameZoneid(), fashionid});
				GodWeaponSender.sendCmd_7862(hero.getId(), type, fashionid);
				
				wear(hero, type, fashionid);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_28, 0);
			}else {
				//升星
				godWeaponInfo.setStar(godWeaponInfo.getStar()+1);
			}
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_29, 0);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODWEAPON_UPSTAR,SystemIdConst.GODWEAPONSYSID);
			GodWeaponSender.sendCmd_7852(hero.getId(), 0, type, godWeaponInfo.getStar());
			
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "upstar has wrong");
		}
		
	}
	/**
	 * 穿戴神兵
	 * @param hero
	 * @param type
	 * @param weapon
	 */
	public void wear(Hero hero, int type, int weapon) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			GodWeapon godWeapon = hero.getGodWeapon();
			if (godWeapon==null) {
				LogTool.warn("godWeapon==null ", GodWeaponManager.class);
				return;
			}
			if (!hero.getWujiang().getWujiangs().containsKey(type)) {
				LogTool.warn("!hero.getWujiang().getWujiangs().containsKey(type) "+type, GodWeaponManager.class);
				return;
			}
			GodWeaponInfo godWeaponInfo = godWeapon.getWeaponIdByWuJiang().get(type);
			if (godWeaponInfo==null) {
				LogTool.warn("godWeaponInfo==null "+type, GodWeaponManager.class);
				return;
			}
			if (weapon!=0&&godWeaponInfo.getFashions().contains(weapon)) {
				//穿上神兵时装
				godWeaponInfo.setWearWeapon(weapon);
				GodWeaponSender.sendCmd_7854(hero.getId(), 0, type, weapon);
				CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 2);
				return;
			}
			
			if (weapon==0) {
				//脱下时装
				godWeaponInfo.setWearWeapon(0);
				GodWeaponSender.sendCmd_7854(hero.getId(), 0, type, weapon);
				CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 2);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "wear has wrong");
		}
		
	}
	/**
	 * 神铸
	 * @param hero
	 * @param type
	 * @param type1
	 */
	public void godForge(Hero hero, int type, int type1 ,int type2) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			GodWeapon godWeapon = hero.getGodWeapon();
			if (godWeapon==null) {
				LogTool.warn("godWeapon==null ", GodWeaponManager.class);
				return;
			}
			if (!hero.getWujiang().getWujiangs().containsKey(type)) {
				LogTool.warn("!hero.getWujiang().getWujiangs().containsKey(type) "+type, GodWeaponManager.class);
				return;
			}
			GodWeaponInfo godWeaponInfo = godWeapon.getWeaponIdByWuJiang().get(type);
			if (godWeaponInfo==null) {
				LogTool.warn("godWeaponInfo==null "+type, GodWeaponManager.class);
				return;
			}
			int fashionid=type*1000;
			int maxNum=0;
			int star = godWeaponInfo.getStar();
			Struct_sb_750 struct_sb_750 = Config_sb_750.getIns().get(fashionid);
			
			if (type1==1) {
				maxNum=struct_sb_750.getMax1()*star;
			}else if(type1==2){
				maxNum=struct_sb_750.getMax2()*star;
			}else if (type1==3) {
				maxNum=struct_sb_750.getMax3()*star;
			}
			int nowNum=godWeaponInfo.getGodForges().get(type1);
			if (maxNum==0) {
				GodWeaponSender.sendCmd_7856(hero.getId(), 3, type, type1, nowNum);
				return;
			}
			if (nowNum>=maxNum) {
				GodWeaponSender.sendCmd_7856(hero.getId(), 3, type, type1, nowNum);
				return;
			}
			Struct_sbsz_750 struct_sbsz_750 = Config_sbsz_750.getIns().get(type1);
			
			if (type2==0) {
				if (UseAddUtil.canUse(hero,GameConst.TOOL, 1,struct_sbsz_750.getId())) {
					UseAddUtil.use(hero,GameConst.TOOL,1,struct_sbsz_750.getId(),SourceGoodConst.GODWEAPON_WEAPON,true);
					godWeaponInfo.getGodForges().put(type1, nowNum+1);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODWEAPON_GODFORGE,SystemIdConst.GODWEAPONSYSID);
					GodWeaponSender.sendCmd_7856(hero.getId(), 0, type, type1, nowNum+1);
					return;
				}
			}else {
				int useNum=0;
				int lastNum=maxNum-nowNum;
				int canUseNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(),struct_sbsz_750.getId());
				
				if (canUseNum>lastNum) {
					useNum=lastNum;
				}else {
					useNum=canUseNum;
				}
				if (useNum>0) {
					if (UseAddUtil.canUse(hero,GameConst.TOOL,useNum,struct_sbsz_750.getId())) {
						UseAddUtil.use(hero,GameConst.TOOL,  useNum, struct_sbsz_750.getId(),SourceGoodConst.GODWEAPON_WEAPON, true);
						godWeaponInfo.getGodForges().put(type1, nowNum+useNum);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODWEAPON_GODFORGE,SystemIdConst.GODWEAPONSYSID);
						GodWeaponSender.sendCmd_7856(hero.getId(), 0, type, type1, nowNum+useNum);
						return;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "wear has wrong");
		}
		
	}
	
	/**
	 * 激活/升级专属神兵等级 7857
	 * @param hero
	 * @param type
	 */
	public void actzhuanshuLv(Hero hero, int type) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			GodWeapon godWeapon = hero.getGodWeapon();
			if (godWeapon==null) {
				LogTool.warn("godWeapon==null ", GodWeaponManager.class);
				return;
			}
			if (!hero.getWujiang().getWujiangs().containsKey(type)) {
				LogTool.warn("!hero.getWujiang().getWujiangs().containsKey(type) "+type, GodWeaponManager.class);
				return;
			}
			GodWeaponInfo godWeaponInfo = godWeapon.getWeaponIdByWuJiang().get(type);
			if (godWeaponInfo==null) {
				LogTool.warn("godWeaponInfo==null "+type, GodWeaponManager.class);
				return;
			}
			int fashionid=type*1000;
			int zhuanshuLevel = godWeaponInfo.getZhuanshuLevel();
			int index=fashionid+zhuanshuLevel;
			Struct_sbzs_750 struct_sbzs_750 = Config_sbzs_750.getIns().get(index);
			if (struct_sbzs_750==null) {
				LogTool.warn("struct_sbzs_750==null has wrong"+index, GodWeaponManager.class);
				return; 
			}
			int[][] tiaojian = struct_sbzs_750.getTiaojian();
			if (tiaojian==null) {
				LogTool.warn("tiaojian==null has wrong"+index, GodWeaponManager.class);
				return; 
			}
			int wujiagStar=tiaojian[0][1];
			int weaponStar=tiaojian[1][1];
			
			WuJiangModel wuJiangModel=hero.getWujiang().getWujiangs().get(type);
			if (wuJiangModel.getStar()<wujiagStar||godWeaponInfo.getStar()<weaponStar) {
				//条件不满足
				GodWeaponSender.sendCmd_7858(hero.getId(), 2, type, zhuanshuLevel);
				return;
			}
			zhuanshuLevel=zhuanshuLevel+1;
			godWeaponInfo.setZhuanshuLevel(zhuanshuLevel);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODWEAPON_ZHUANSHULV,SystemIdConst.GODWEAPONSYSID);
			GodWeaponSender.sendCmd_7858(hero.getId(), 0, type, zhuanshuLevel);
			return;
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "actzhuanshuLv has wrong");
		}
		
	}
	/**
	 * 升级神兵淬炼等级
	 * @param hero
	 * @param type
	 */
	public void upcuilianlv(Hero hero, int type, int type1) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			GodWeapon godWeapon = hero.getGodWeapon();
			if (godWeapon==null) {
				LogTool.warn("godWeapon==null ", GodWeaponManager.class);
				return;
			}
			if (!hero.getWujiang().getWujiangs().containsKey(type)) {
				LogTool.warn("!hero.getWujiang().getWujiangs().containsKey(type) "+type, GodWeaponManager.class);
				return;
			}
			GodWeaponInfo godWeaponInfo = godWeapon.getWeaponIdByWuJiang().get(type);
			if (godWeaponInfo==null) {
				LogTool.warn("godWeaponInfo==null "+type, GodWeaponManager.class);
				return;
			}
			int fashionid=type*1000;
			Struct_sb_750 struct_sb_750 = Config_sb_750.getIns().get(fashionid);
			//品质
			int pinzhi = struct_sb_750.getPinzhi();
			int index=pinzhi*10000+godWeaponInfo.getCuilianLevel();
			Struct_sbcl_750 struct_sbcl_750 = Config_sbcl_750.getIns().get(index);
			if (struct_sbcl_750==null) {
				LogTool.warn(hero.getId()+" struct_sbcl_750==null has wrong "+ index, GodWeaponManager.class);
				return;
			}
			
			if (struct_sbcl_750.getExp()==0) {
				LogTool.warn(hero.getId()+" struct_sbcl_750.getExp()==0 "+ index, GodWeaponManager.class);
				//满级了
				return;
			}
			if (godWeaponInfo.getStar()<struct_sbcl_750.getTiaojian()) {
				
				LogTool.warn(hero.getId()+"godWeaponInfo.getStar()<struct_sbcl_750.getTiaojian()"+ index, GodWeaponManager.class);
				//满级了
				return;
			}
			//普通升阶
			if (type1==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, GodWeaponConst.ITEMID)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, GodWeaponConst.ITEMID, SourceGoodConst.GODWEAPON_UP_CUILIAN_LV, true);
					isUpLevel=addGodWeaponInfoExp(hero.getId(),hero.getName(),godWeaponInfo,GodWeaponConst.ADDEXP,pinzhi);
					GodWeaponSender.sendCmd_7860(hero.getId(), 0, type, type1, godWeaponInfo.getCuilianLevel(), godWeaponInfo.getCuilianexp());
				}
				if (isUpLevel) {
					List<Struct_sbpf_750> sortList = Config_sbpf_750.getIns().getSortList();
					for (Struct_sbpf_750 sbpf_750 : sortList) {
						int type2 = sbpf_750.getId()/1000;
						if (type2==type&&godWeaponInfo.getCuilianLevel()==sbpf_750.getTj()) {
							//添加初始化神兵皮肤
							godWeaponInfo.getFashions().add(sbpf_750.getId());
							GodWeaponSender.sendCmd_7862(hero.getId(), type, sbpf_750.getId());
						}
					}
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODWEAPON_ZHUANSHULV,SystemIdConst.GODWEAPONSYSID);
				}
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), GodWeaponConst.ITEMID);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_sbcl_750.getIns().get(index).getExp()-godWeaponInfo.getCuilianexp();
				int needNum=needExp/GodWeaponConst.ADDEXP;
				if (needNum==0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*GodWeaponConst.ADDEXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*GodWeaponConst.ADDEXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, GodWeaponConst.ITEMID)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, GodWeaponConst.ITEMID, SourceGoodConst.GODWEAPON_UP_CUILIAN_LV, true);
					isUpLevel=addGodWeaponInfoExp(hero.getId(),hero.getName(),godWeaponInfo,addExp,pinzhi);
					
				}
				if (isUpLevel) {
					List<Struct_sbpf_750> sortList = Config_sbpf_750.getIns().getSortList();
					for (Struct_sbpf_750 sbpf_750 : sortList) {
						int type2 = sbpf_750.getId()/1000;
						if (type2==type&&godWeaponInfo.getCuilianLevel()==sbpf_750.getTj()) {
							//添加初始化神兵皮肤
							godWeaponInfo.getFashions().add(sbpf_750.getId());
							GodWeaponSender.sendCmd_7862(hero.getId(), type, sbpf_750.getId());
						}
					}
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODWEAPON_ZHUANSHULV,SystemIdConst.GODWEAPONSYSID);
				}
				GodWeaponSender.sendCmd_7860(hero.getId(), 0, type, type1, godWeaponInfo.getCuilianLevel(), godWeaponInfo.getCuilianexp());
			}
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "upcuilianlv has wrong");
		}
		
	}
	
	
	public boolean addGodWeaponInfoExp(Long hid,String name,GodWeaponInfo godWeaponInfo,int exp,int pinzhi){
		try {
			godWeaponInfo.setCuilianexp(godWeaponInfo.getCuilianexp() + exp);
			boolean flag = false;
			int maxNum=GodWeaponCache.getCuiLianLvByTypeMap().get(pinzhi).size();
			for(int i=godWeaponInfo.getCuilianLevel();i<maxNum ; i++){
				if(i >= maxNum) {
					godWeaponInfo.setCuilianexp(0);
					break;
				}
				
				Struct_sbcl_750 struct = Config_sbcl_750.getIns().get(pinzhi*10000+i);
				int upgradeExp =  struct.getExp();
				if(godWeaponInfo.getCuilianexp() >= upgradeExp){
					int defExp = godWeaponInfo.getCuilianexp() - upgradeExp;
					godWeaponInfo.setCuilianexp(defExp);
					godWeaponInfo.setCuilianLevel(godWeaponInfo.getCuilianLevel()+1);
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hid, name, "addGodWeaponInfoExp:"+exp);
		}
		return false;
	}
	
	/**
	 * 锻造神兵
	 * @param hero
	 * @param type
	 */
	public void makeWuqi(Hero hero, int type,int type1) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.GODWEAPONSYSID)) {
				return;
			}
			
			if (type==0) {
				//一次
				if (type1==0) {
					//工匠锤子
					makeWeapon(hero, GodWeaponConst.ITEM_LOW, GodWeaponConst.ONETIME_COST, 1, type1);
				}else {
					//神匠锤子
					makeWeapon(hero, GodWeaponConst.ITEM_HIGH, 0, 1, type1);
				}
			}else {
				//10次
				if (type1==0) {
					makeWeapon(hero, GodWeaponConst.ITEM_LOW, GodWeaponConst.TEMTIME_COST, 10, type1);
				}else {
					//神匠锤子
					makeWeapon(hero, GodWeaponConst.ITEM_HIGH, 0, 10, type1);
				}
				
			}
			
		} catch (Exception e) {
			LogTool.error(e, GodWeaponManager.class, "makeWuqi has wrong");
		}
		
	}
	
	
	public void makeWeapon(Hero hero,int itemid,int sysNum,int addnum,int type1) {
		try {
			
			GodWeapon godWeapon = hero.getGodWeapon();
			
			int canUseNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(),itemid);
			if (itemid==GodWeaponConst.ITEM_LOW) {
				if (canUseNum<addnum) {
					//没有工匠锤子 扣钱  6730
					int[][] other = Config_xtcs_004.getIns().get(sysNum).getOther();
					int[][] price = MagicDiscountFunction.getIns().magicDiscount(hero, other, addnum);//神兵折扣
					if (!UseAddUtil.canUse(hero, price)) {
						//元宝不足
						return;
					}
					UseAddUtil.use(hero, price, SourceGoodConst.MAKE_GODWEAPON, true, null);
				}else {
					//扣道具
					if(!UseAddUtil.canUse(hero, GameConst.TOOL, addnum, itemid)) {
						//没道具扣
						return;
					}
					UseAddUtil.use(hero,GameConst.TOOL, addnum, itemid, SourceGoodConst.MAKE_GODWEAPON, true);
					MagicDiscountFunction.getIns().addNum(hero, addnum);//神兵折扣打造次数
				}
			}else {
				//扣道具
				if(!UseAddUtil.canUse(hero, GameConst.TOOL, addnum, itemid)) {
					//没道具扣
					return;
				}
				UseAddUtil.use(hero,GameConst.TOOL, addnum, itemid, SourceGoodConst.MAKE_GODWEAPON, true);
				
			}
			
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_15, addnum, 0);
			
			int num=godWeapon.getNum();
			List<ProbabilityEventModel> list;
			List<int[]> jianglis=new ArrayList<int[]>();
			List<Integer[]> awardIdNoticeList = new ArrayList<Integer[]>();// 抽取的要公布的奖品列表
			List<Object[]> sendjianglisObj=new ArrayList<>();
			for(int i=1; i<=addnum;i++) {
				if (itemid==GodWeaponConst.ITEM_LOW) {
					num=num+1;
					//工匠锤子
					if (num%10==0) {
						//
						list = GodWeaponCache.getGodWeaponDropMap().get(GodWeaponConst.MAKE_WEAPON_TYPE2);
					}else {
						list = GodWeaponCache.getGodWeaponDropMap().get(GodWeaponConst.MAKE_WEAPON_TYPE1);
					}
					godWeapon.setNum(num);
					int[] jiangli =null;
					int qs = godWeapon.getQs();
					if (qs==0) {
						godWeapon.setQs(1);
					}
					List<Struct_sbdzmb_750> list2 = GodWeaponCache.getMakeWeaponMapByQs().get(qs);
					int maxNum=list2.get(list2.size()-1).getCishu();
					int nextqs=0;
					boolean isHasBiZhong=false;
					for (int j = 0; j < list2.size(); j++) {
						Struct_sbdzmb_750 struct_sbdzmb_750 = list2.get(j);
						int cishu = struct_sbdzmb_750.getCishu();
						if (num==cishu) {
							jiangli=new int[] {struct_sbdzmb_750.getJiangli()[0][0],struct_sbdzmb_750.getJiangli()[0][1],struct_sbdzmb_750.getJiangli()[0][2],0,1};
							isHasBiZhong=true;
							nextqs=struct_sbdzmb_750.getXq();
						}
						
					}
					if (!isHasBiZhong) {
						int a=0;
						while (jiangli==null||a>=100) {
							for (ProbabilityEventModel pm : list) {
								jiangli = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
							}
							a++;
						}
					}else {
						if (num>=maxNum) {
							//更新期数
							num = 0;
							godWeapon.setNum(0);
							godWeapon.setQs(nextqs);
						}
					}
					
					jianglis.add(jiangli);
				}else {
					//神匠锤
					list = GodWeaponCache.getGodWeaponDropMap().get(GodWeaponConst.MAKE_WEAPON_TYPE3);
					int[] jiangli =null;
					int a=0;
					while (jiangli==null||a>=100) {
						for (ProbabilityEventModel pm : list) {
							jiangli = (int[]) ProbabilityEventUtil.getEventByProbability(pm);// 随机奖励
						}
						a++;
					}
					jianglis.add(jiangli);
				}
				
			}
			int[][] rewards=new int[jianglis.size()][];
			for (int i = 0; i < jianglis.size(); i++) {
				int[] js = jianglis.get(i);
				rewards[i]=new int[] {js[0],js[1],js[2]};
				sendjianglisObj.add(new Object[] {js[0],js[1],js[2],js[4]});
				if (js[4]==1) {
					//需要广播
					awardIdNoticeList.add(new Integer[] {js[1],js[2]});
				}
			}
			if (awardIdNoticeList.size()>0) {
				for (int i = 0; i < awardIdNoticeList.size(); i++) {
					Integer[] integers = awardIdNoticeList.get(i);
					ChatManager.getIns().broadCast(ChatConst.MAKE_GODWEAPON, new Object[] { hero.getNameZoneid(), integers[0],integers[1]});
				}
			}
			UseAddUtil.add(hero, rewards, SourceGoodConst.MAKE_GODWEAPON_GET, null, true);
			int leftHightNum=10-godWeapon.getNum()%10;
			GodWeaponSender.sendCmd_7864(hero.getId(), 0, type1, sendjianglisObj.toArray(),leftHightNum, godWeapon.getNum(), godWeapon.getQs());
			return;
		} catch (Exception e) {
			LogTool.error(e, GodWeapon.class, "godWeapon has makeWeapon has wrong");
		}
	}

	/**
	 * 获取专属神兵战力
	 * @param hero
	 * @param godWeaponInfo
	 * @return
	 */
	public long getGodWeaponStrengthByid(Hero hero, GodWeaponInfo godWeaponInfo) {
		if (godWeaponInfo == null) {
			return 0;
		}
		HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();

		int type = godWeaponInfo.getType();
		int index = type * 1000;

		Struct_sb_750 struct_sb_750 = Config_sb_750.getIns().get(index);
		// 升星属性
		int pinzhi = struct_sb_750.getPinzhi();
		int starNum = godWeaponInfo.getStar();
		int starindex = pinzhi * 1000 + starNum;

		int[][] data = Config_sbsx_750.getIns().get(starindex).getAttr();
		if (data != null) {
			CommonUtil.arrChargeMap(data, attrMap);
		}
		long[][] totalAttr = CommonUtil.mapToArr(attrMap);
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		FightCalcFunction.setFightValue(totalAttr, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
		return finalAttr.getStrength();
	}
	
	

}
