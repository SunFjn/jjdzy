package com.teamtop.system.bingfa;


import java.util.HashMap;
import java.util.List;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.wujiang.WuJiangManager;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_baolvskill_214;
import excel.config.Config_book_213;
import excel.config.Config_booklv_213;
import excel.config.Config_booklvskill_213;
import excel.config.Config_booklvskill_215;
import excel.config.Config_booksuit_212;
import excel.config.Config_drug_200;
import excel.config.Config_swordlv_216;
import excel.config.Config_swordlvskill_216;
import excel.config.Config_xtcs_004;
import excel.config.Config_yblv_217;
import excel.config.Config_yblvskill_217;
import excel.struct.Struct_book_213;
import excel.struct.Struct_booklv_213;
import excel.struct.Struct_swordlv_216;
import excel.struct.Struct_yblv_217;

public class BingFaManager {
	private static BingFaManager ins;
	public static BingFaManager getIns(){
		if(ins == null) {
			ins = new BingFaManager();
		}
		return ins;
	}
	
	/**
	 * 获取兵法
	 * @param hero
	 */
	public void getbingfa(Hero hero) {
		try {
			Object[] bingfas=new Object[] {};
			int taozhuangSize=Config_xtcs_004.getIns().get(BingFaConst.TAOZHUANG_NUM).getNum();
			Object[] taozhuang=new Object[taozhuangSize] ;
			int a=0;
			if (hero.getBingfa().getBingfas().size()>0) {
				bingfas=new Object[hero.getBingfa().getBingfas().size()];
				for (BingFaModel bingFaModel:hero.getBingfa().getBingfas().values()) {
					bingfas[a]=new Object[] {bingFaModel.getIndex(),bingFaModel.getStar()};
					a++;
				}
			}
			for (int i = 0; i <taozhuangSize; i++) {
				if (hero.getBingfa().getTaozhuanbfs().get(i+1)!=0) {
					taozhuang[i]=new Object[] {hero.getBingfa().getTaozhuanbfs().get(i+1)};
				}
			}
			taozhuang=CommonUtil.removeNull(taozhuang);
			BingFaSender.sendCmd_900(hero.getId(), bingfas, taozhuang, hero.getDanyao().get(BingFaConst.DAN));
			return;
		} catch (Exception e) {
			LogTool.error(e, BingFaManager.class, hero.getId(), hero.getName(), "getbingfa has wrong");
		}
		
	}
	/**
	 * 激活/升星兵法
	 * @param hero
	 * @param index
	 */
	public void upbingfa(Hero hero, int index) {
		try {
			if (!Config_book_213.getIns().getMap().containsKey(index)) {
				return;
			}
			if (hero.getBingfa().getBingfas().containsKey(index)) {
				BingFaModel bingFaModel=hero.getBingfa().getBingfas().get(index);
				Struct_book_213 struct_book_213 = Config_book_213.getIns().get(index);
				if (bingFaModel.getStar()>=struct_book_213.getStar()) {
					return;
				}
				if (!UseAddUtil.canUse(hero, struct_book_213.getItem())) {
					return;
				}
				UseAddUtil.use(hero, struct_book_213.getItem(), SourceGoodConst.BINGFA_UPSTAR, true);
				bingFaModel.setStar(bingFaModel.getStar()+1);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.BINGFA_UPSTAR,SystemIdConst.BingFa_SYSID);
				BingFaSender.sendCmd_904(hero.getId(), 0, index, bingFaModel.getStar());
				//晋升
				PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.BINGFA_JIHUO, null);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_18, 0);
				if (bingFaModel.getStar()>=struct_book_213.getStar()) {
					//星级已经是最高    觉醒红点
					ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
				}
				return;
			}else {
				Struct_book_213 struct_book_213 = Config_book_213.getIns().get(index);
				if (!UseAddUtil.canUse(hero, struct_book_213.getItem())) {
					return;
				}
				UseAddUtil.use(hero, struct_book_213.getItem(), SourceGoodConst.BINGFA_JIHUO, true);
				//晋升
				PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.BINGFA_JIHUO, null);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_17, 0);
				//激活
				BingFaModel bingFaModel=new BingFaModel();
				bingFaModel.setIndex(index);
				bingFaModel.setStar(1);
				//觉醒之力
				HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
				jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
				bingFaModel.setJueXingSkills(jueXingSkills);
				
				hero.getBingfa().getBingfas().put(index, bingFaModel);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.BINGFA_JIHUO,SystemIdConst.BingFa_SYSID);
				BingFaSender.sendCmd_904(hero.getId(), 0, index, 1);
				if (struct_book_213.getPin()>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_BINGFA,
							new Object[] { hero.getName(), struct_book_213.getId() }); // 全服广播
				}
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, BingFaManager.class, hero.getId(), hero.getName(), "upbingfa has wrong");
		}
		
	}
	/**
	 * 激活/升阶兵法套装 
	 * @param hero
	 * @param index
	 */
	public void upBFtaozhuang(Hero hero, int index) {
		try {
			if (!hero.getBingfa().getTaozhuanbfs().containsKey(index)) {
				return;
			}
			int taozhuangid=hero.getBingfa().getTaozhuanbfs().get(index);
			//升阶套装id
			if (Config_booksuit_212.getIns().get(taozhuangid).getItem()!=null) {
				if (isManZuTiaoJian(hero,taozhuangid)&&UseAddUtil.canUse(hero, Config_booksuit_212.getIns().get(taozhuangid).getItem())) {
					//满足条件
					UseAddUtil.use(hero, Config_booksuit_212.getIns().get(taozhuangid).getItem(), SourceGoodConst.BINGFA_UP_TAOZHUANG, true);
					hero.getBingfa().getTaozhuanbfs().put(index, taozhuangid+1);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.BINGFA_UP_TAOZHUANG,SystemIdConst.BingFa_SYSID);
					BingFaSender.sendCmd_906(hero.getId(), 0, index, taozhuangid+1);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, BingFaManager.class, hero.getId(), hero.getName(), "upBFtaozhuang has wrong");
		}
		
	}
	
	/**
	 * 兵法套装是否满足升阶条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuTiaoJian(Hero hero ,int  nowtaozhuang) {
		boolean isUp=false;
		int[][] condition=Config_booksuit_212.getIns().get(nowtaozhuang).getCondition();
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!hero.getBingfa().getBingfas().containsKey(type)) {
				isUp=false;
				break;
			}else {
				if (star>hero.getBingfa().getBingfas().get(type).getStar()) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
		
	}
	/**
	 * 
	 * @param hero
	 * @param type
	 */
	public void eatDan(Hero hero, int type) {
		try {
			int itemid=Config_drug_200.getIns().get(BingFaConst.DAN).getId();
			int useNum=hero.getDanyao().get(BingFaConst.DAN);
			int maxNum=getMaxDanNum(hero);
			int num=0;
			int canUseNum=0;
			
			if (useNum>=maxNum) {
				canUseNum=0;
				BingFaSender.sendCmd_908(hero.getId(), 1, hero.getDanyao().get(BingFaConst.DAN));
				return;
			}else {
				canUseNum=maxNum-useNum;
			}
			
			int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
			if (hasNum<=0) {
				BingFaSender.sendCmd_908(hero.getId(), 1, hero.getDanyao().get(BingFaConst.DAN));
				return;
			}
			if (type==0) {
				num=1;
			}else {
				if (canUseNum>hasNum) {
					num=hasNum;
				}else {
					num=canUseNum;
				}
			}
			if (UseAddUtil.canUse(hero, GameConst.TOOL, num, itemid)) {
				UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.BINGFA_DAN6, true);
				hero.getDanyao().put(BingFaConst.DAN, hero.getDanyao().get(BingFaConst.DAN)+num);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.BINGFA_DAN6,SystemIdConst.BingFa_SYSID);
				BingFaSender.sendCmd_908(hero.getId(), 0, hero.getDanyao().get(BingFaConst.DAN));	
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, BingFaManager.class, hero.getId(), hero.getName(), "eatDan has wrong");
		}
		
	}
	
	/**
	 * 获得属性丹
	 * @param hero
	 * @return
	 */
	public int getMaxDanNum(Hero hero) {
		int danNums=0;
		for(BingFaModel bingFaModel:hero.getBingfa().getBingfas().values()) {
			danNums=danNums+Config_book_213.getIns().get(bingFaModel.getIndex()).getMax()*bingFaModel.getStar();
		}
		return danNums;
	}
	/**
	 * 获取1神剑2异宝3兵法4宝物5天书 等阶培养/技能培养情况
	 * @param hero
	 * @param type
	 */
	public void getinfobysys(Hero hero, int type) {
		try {
			if (type<1||type>5) {
				return;
			}
			int jie=0;
			int exp=0;
			Object[] skills=null;
			switch (type) {
			case 1:
				//神剑
				Excalibur excalibur=hero.getExcalibur();
				if (excalibur==null) {
					return;
				}
				jie=excalibur.getJieLv();
				exp=excalibur.getJieexp();
				skills=new Object[excalibur.getSkills().size()];
				for (int a = 1; a <=excalibur.getSkills().size(); a++) {
					skills[a-1]=new Object[] {excalibur.getSkills().get(a)};
				}
				break;
			case 2:
				//异宝
				SpecialTreasure specialTreasure=hero.getSpecialTreasure();
				if (specialTreasure==null) {
					return;
				}
				jie=specialTreasure.getJieLv();
				exp=specialTreasure.getJieexp();
				skills=new Object[specialTreasure.getSkills().size()];
				for (int a = 1; a <=specialTreasure.getSkills().size(); a++) {
					skills[a-1]=new Object[] {specialTreasure.getSkills().get(a)};
				}
				break;
			case 3:
				//兵法
				BingFa bingfa=hero.getBingfa();
				if (bingfa==null) {
					return;
				}
				jie=bingfa.getJieLv();
				exp=bingfa.getJieexp();
				skills=new Object[bingfa.getSkills().size()];
				for (int a = 1; a <=bingfa.getSkills().size(); a++) {
					skills[a-1]=new Object[] {bingfa.getSkills().get(a)};
				}
				break;
			case 4:
				//宝物
				TreasureData treasureData =hero.getTreasureData();
				if (treasureData==null) {
					return;
				}
				jie=treasureData.getLevel();
				exp=treasureData.getExp();
				skills=new Object[treasureData.getSkills().size()];
				for (int a = 1; a <=treasureData.getSkills().size(); a++) {
					skills[a-1]=new Object[] {treasureData.getSkills().get(a)};
				}
				break;
			case 5:
				//天书
				GodBook godBook =hero.getGodbook();
				if (godBook==null) {
					return;
				}
				jie=godBook.getLevel();
				exp=godBook.getExp();
				skills=new Object[godBook.getSkills().size()];
				for (int a = 1; a <=godBook.getSkills().size(); a++) {
					skills[a-1]=new Object[] {godBook.getSkills().get(a)};
				}
				break;				
			default:
				break;
			}
			BingFaSender.sendCmd_910(hero.getId(), type, jie, exp, skills);
			return;
		} catch (Exception e) {
			LogTool.error(e, BingFaManager.class, hero.getId(), hero.getName(),  "getinfobysys has wrong"+type);
		}
		
	}
	/**
	 * 升阶 1神剑2异宝3兵法4宝物5天书 等阶培养
	 * @param hero
	 * @param type
	 * @param uptype
	 */
	public void upjiebysys(Hero hero, int type, int uptype) {
		try {
			switch (type) {
			case 1:
				//神剑
				upshenjianJie(hero, uptype);
				break;
			case 2:
				//异宝
				upSpeTreasureJie(hero, uptype);
				break;
			case 3:
				//兵法
				upBingFaJie(hero, uptype);
				break;
			case 4:
				break;
			case 5:
				break;		
			default:
				break;
			}
			
		} catch (Exception e) {
			LogTool.error(e, BingFaManager.class, hero.getId(), hero.getName(),  "upjiebysys has wrong"+type);
		}
		
	}
	
	/**
	 * 神剑升阶
	 * @param hero
	 * @param type
	 */
	public void upshenjianJie(Hero hero, int type) {
		try {
			if(hero.getExcalibur().getJieLv() >= Config_swordlv_216.getIns().size()) {
				hero.getExcalibur().setJieexp(0);
				
				return;
			}
			//普通武将升阶
			if (type==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, BingFaConst.ITEM_SHENJIAN)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, BingFaConst.ITEM_SHENJIAN, SourceGoodConst.SHENJIAN_UP_JIE, true);
					isUpLevel=addshenjianJieExp(hero,  BingFaConst.UP_JIE_EXP);
					BingFaSender.sendCmd_912(hero.getId(), 1,0, hero.getExcalibur().getJieLv(),hero.getExcalibur().getJieexp());
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE19);
				}
				if (isUpLevel) {
					//晋升
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.EXCALIBUR_LEVEL, null);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SHENGJIE,SystemIdConst.Excalibur_SYSID);
				}
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), BingFaConst.ITEM_SHENJIAN);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_swordlv_216.getIns().get(hero.getExcalibur().getJieLv()).getExp()-hero.getExcalibur().getJieexp();
				int needNum=needExp/BingFaConst.UP_JIE_EXP;
				if (needNum<=0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*BingFaConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*BingFaConst.UP_JIE_EXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, BingFaConst.ITEM_SHENJIAN)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, BingFaConst.ITEM_SHENJIAN, SourceGoodConst.SHENJIAN_UP_JIE, true);
					isUpLevel=addshenjianJieExp(hero,addExp);
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE19);
				}
				if (isUpLevel) {
					//晋升
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.EXCALIBUR_LEVEL, null);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SHENGJIE,SystemIdConst.Excalibur_SYSID);
				}
				BingFaSender.sendCmd_912(hero.getId(), 1,0, hero.getExcalibur().getJieLv(),hero.getExcalibur().getJieexp());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangManager.class, hero.getId(),  hero.getName(), "upWuJie has wrong");
		}
	}
	
	/**
	 * add神剑升阶经验升级
	 * @param smelt
	 */
	public boolean addshenjianJieExp(Hero hero,int exp){
		try {
			hero.getExcalibur().setJieexp(hero.getExcalibur().getJieexp() + exp);
			List<Struct_swordlv_216> configs = Config_swordlv_216.getIns().getSortList();
			boolean flag = false;
			for(int i=hero.getExcalibur().getJieLv();i<configs.size() ; i++){
				if(i >= configs.size()) {
					hero.getExcalibur().setJieexp(0);;
					break;
				}
				Struct_swordlv_216 struct = configs.get(i-1);
				int upgradeExp =  struct.getExp();
				if(hero.getExcalibur().getJieexp() >= upgradeExp){
					int defExp = hero.getExcalibur().getJieexp() - upgradeExp;
					hero.getExcalibur().setJieexp(defExp);
					if (struct.getId()+1>configs.size()) {
						hero.getExcalibur().setJieLv(struct.getId());
					}else {
						hero.getExcalibur().setJieLv(struct.getId()+1);
					}
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addshenjianJieExp:"+exp);
		}
		return false;
		
	}
	
	/**
	 * 异宝升阶
	 * @param hero
	 * @param type
	 */
	public void upSpeTreasureJie(Hero hero, int type) {
		try {
			if(hero.getSpecialTreasure().getJieLv() >= Config_yblv_217.getIns().size()) {
				hero.getSpecialTreasure().setJieexp(0);
				return;
			}
			//普通武将升阶
			if (type==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, BingFaConst.ITEM_SPETREASURE)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, BingFaConst.ITEM_SPETREASURE, SourceGoodConst.SPETRESURE_UP_JIE, true);
					isUpLevel=addSpeTreasureJieExp(hero,  BingFaConst.UP_JIE_EXP);
					BingFaSender.sendCmd_912(hero.getId(), 2,0, hero.getSpecialTreasure().getJieLv(),hero.getSpecialTreasure().getJieexp());
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE20);
				}
				if (isUpLevel) {
					//晋升
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.SPECIALTREASURE_LEVEL, null);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SPETREASURE,SystemIdConst.SpeTreasure_SYSID);
				}
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), BingFaConst.ITEM_SPETREASURE);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_yblv_217.getIns().get(hero.getSpecialTreasure().getJieLv()).getExp()-hero.getSpecialTreasure().getJieexp();
				int needNum=needExp/BingFaConst.UP_JIE_EXP;
				if (needNum<=0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*BingFaConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*BingFaConst.UP_JIE_EXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, BingFaConst.ITEM_SPETREASURE)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, BingFaConst.ITEM_SPETREASURE, SourceGoodConst.SPETRESURE_UP_JIE, true);
					isUpLevel=addSpeTreasureJieExp(hero,addExp);
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE20);
				}
				if (isUpLevel) {
					//晋升
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.SPECIALTREASURE_LEVEL, null);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SPETREASURE,SystemIdConst.SpeTreasure_SYSID);
				}
				BingFaSender.sendCmd_912(hero.getId(), 2,0, hero.getSpecialTreasure().getJieLv(),hero.getSpecialTreasure().getJieexp());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangManager.class, hero.getId(),  hero.getName(), "upSpeTreasureJie has wrong");
		}
	}
	
	/**
	 * add异宝升阶经验升级
	 * @param smelt
	 */
	public boolean addSpeTreasureJieExp(Hero hero,int exp){
		try {
			hero.getSpecialTreasure().setJieexp(hero.getSpecialTreasure().getJieexp() + exp);
			List<Struct_yblv_217> configs = Config_yblv_217.getIns().getSortList();
			boolean flag = false;
			for(int i=hero.getSpecialTreasure().getJieLv();i<configs.size() ; i++){
				if(i >= configs.size()) {
					hero.getSpecialTreasure().setJieexp(0);;
					break;
				}
				Struct_yblv_217 struct = configs.get(i-1);
				int upgradeExp =  struct.getExp();
				if(hero.getSpecialTreasure().getJieexp() >= upgradeExp){
					int defExp = hero.getSpecialTreasure().getJieexp() - upgradeExp;
					hero.getSpecialTreasure().setJieexp(defExp);
					if (struct.getId()+1>configs.size()) {
						hero.getSpecialTreasure().setJieLv(struct.getId());
					}else {
						hero.getSpecialTreasure().setJieLv(struct.getId()+1);
					}
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addshenjianJieExp:"+exp);
		}
		return false;
		
	}
	
	/**
	 * 兵法升阶
	 * @param hero
	 * @param type
	 */
	public void upBingFaJie(Hero hero, int type) {
		try {
			if(hero.getBingfa().getJieLv() >= Config_booklv_213.getIns().size()) {
				hero.getBingfa().setJieexp(0);
				return;
			}
			//普通武将升阶
			if (type==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, BingFaConst.ITEM_BINGFA)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, BingFaConst.ITEM_BINGFA, SourceGoodConst.BINGFA_UP_JIE, true);
					isUpLevel=addBingFaJieExp(hero,  BingFaConst.UP_JIE_EXP);
					BingFaSender.sendCmd_912(hero.getId(), 3,0, hero.getBingfa().getJieLv(),hero.getBingfa().getJieexp());
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE21);
				}
				if (isUpLevel) {
					//晋升
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.BINGFA_LEVEL, null);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_BINGFA,SystemIdConst.BingFa_SYSID);
				}
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), BingFaConst.ITEM_BINGFA);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_booklv_213.getIns().get(hero.getBingfa().getJieLv()).getExp()-hero.getBingfa().getJieexp();
				int needNum=needExp/BingFaConst.UP_JIE_EXP;
				if (needNum<=0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*BingFaConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*BingFaConst.UP_JIE_EXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, BingFaConst.ITEM_BINGFA)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, BingFaConst.ITEM_BINGFA, SourceGoodConst.BINGFA_UP_JIE, true);
					isUpLevel=addBingFaJieExp(hero,addExp);
					//每日任务
					DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE21);
				}
				if (isUpLevel) {
					//晋升
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.BINGFA_LEVEL, null);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_BINGFA,SystemIdConst.BingFa_SYSID);
				}
				BingFaSender.sendCmd_912(hero.getId(), 3,0, hero.getBingfa().getJieLv(),hero.getBingfa().getJieexp());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangManager.class, hero.getId(),  hero.getName(), "upBingFaJie has wrong");
		}
	}
	
	/**
	 * add兵法升阶经验升级
	 * @param smelt
	 */
	public boolean addBingFaJieExp(Hero hero,int exp){
		try {
			hero.getBingfa().setJieexp(hero.getBingfa().getJieexp() + exp);
			List<Struct_booklv_213> configs = Config_booklv_213.getIns().getSortList();
			boolean flag = false;
			for(int i=hero.getBingfa().getJieLv();i<configs.size() ; i++){
				if(i >= configs.size()) {
					hero.getBingfa().setJieexp(0);;
					break;
				}
				Struct_booklv_213 struct = configs.get(i-1);
				int upgradeExp =  struct.getExp();
				if(hero.getBingfa().getJieexp() >= upgradeExp){
					int defExp = hero.getBingfa().getJieexp() - upgradeExp;
					hero.getBingfa().setJieexp(defExp);
					if (struct.getId()+1>configs.size()) {
						hero.getBingfa().setJieLv(struct.getId());
					}else {
						hero.getBingfa().setJieLv(struct.getId()+1);
					}
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addBingFaJieExp:"+exp);
		}
		return false;
		
	}
	
	
	
	
	
	
	/**
	 * 
	 * @param hero
	 * @param type
	 * @param index
	 */
	public void upskills(Hero hero, int type, int index) {
		try {
			switch (type) {
			case 1:
				//神剑
				upshenjianskill(hero, index);
				break;
			case 2:
				//异宝
				upSpeTreasureskill(hero, index);
				break;
			case 3:
				//兵法
				upBingFaskill(hero, index);
				break;
			case 4:
				//宝物
				upTreasureskill(hero, index);
				break;
			case 5:
				//天书
				upGodBookskill(hero, index);
				break;		
			default:
				break;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "upskills has wrong");
		}
		
	}

	private void upGodBookskill(Hero hero, int index) {
		if (!hero.getGodbook().getSkills().containsKey(index)) {
			return;
		}
		//升级
		int skillid=hero.getGodbook().getSkills().get(index);
		if(Config_booklvskill_215.getIns().get(skillid).getConsume()==null) {
			return;
		}
		if (Config_booklvskill_215.getIns().get(skillid).getLv()>hero.getGodbook().getLevel()) {
			return;
		}
		if(UseAddUtil.canUse(hero, Config_booklvskill_215.getIns().get(skillid).getConsume())) {
			UseAddUtil.use(hero, Config_booklvskill_215.getIns().get(skillid).getConsume(), SourceGoodConst.GODBOOK_UP_SKILL, true);
			int nextskill=Config_booklvskill_215.getIns().get(skillid).getNext();
			hero.getGodbook().getSkills().put(index, nextskill);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODBOOK_UP_SKILL,SystemIdConst.GodBook_SYSID);
			BingFaSender.sendCmd_914(hero.getId(), 5, 0, index, nextskill);
			return;
		}
		
	}

	private void upTreasureskill(Hero hero, int index) {
		if (!hero.getTreasureData().getSkills().containsKey(index)) {
			return;
		}
		//升级
		int skillid=hero.getTreasureData().getSkills().get(index);
		if(Config_baolvskill_214.getIns().get(skillid).getConsume()==null) {
			return;
		}
		if (Config_baolvskill_214.getIns().get(skillid).getLv()>hero.getTreasureData().getLevel()) {
			return;
		}
		if(UseAddUtil.canUse(hero, Config_baolvskill_214.getIns().get(skillid).getConsume())) {
			UseAddUtil.use(hero, Config_baolvskill_214.getIns().get(skillid).getConsume(), SourceGoodConst.TREASURE_UP_SKILL, true);
			int nextskill=Config_baolvskill_214.getIns().get(skillid).getNext();
			hero.getTreasureData().getSkills().put(index, nextskill);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UP_SKILL,SystemIdConst.Treasure_SYSID);
			BingFaSender.sendCmd_914(hero.getId(), 4, 0, index, nextskill);
			return;
		}

	}

	private void upshenjianskill(Hero hero, int index) {
		if (!hero.getExcalibur().getSkills().containsKey(index)) {
			return;
		}
		//升级
		int skillid=hero.getExcalibur().getSkills().get(index);
		if(Config_swordlvskill_216.getIns().get(skillid).getConsume()==null) {
			return;
		}
		if (Config_swordlvskill_216.getIns().get(skillid).getLv()>hero.getExcalibur().getJieLv()) {
			return;
		}
		if(UseAddUtil.canUse(hero, Config_swordlvskill_216.getIns().get(skillid).getConsume())) {
			UseAddUtil.use(hero, Config_swordlvskill_216.getIns().get(skillid).getConsume(), SourceGoodConst.SHENJIAN_UP_SKILL, true);
			int nextskill=Config_swordlvskill_216.getIns().get(skillid).getNext();
			hero.getExcalibur().getSkills().put(index, nextskill);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SHENJIAN_UP_SKILL,SystemIdConst.Excalibur_SYSID);
			BingFaSender.sendCmd_914(hero.getId(), 1, 0, index, nextskill);
			return;
		}
	}
	
	private void upSpeTreasureskill(Hero hero, int index) {
		if (!hero.getSpecialTreasure().getSkills().containsKey(index)) {
			return;
		}
		//升级
		int skillid=hero.getSpecialTreasure().getSkills().get(index);
		if(Config_yblvskill_217.getIns().get(skillid).getConsume()==null) {
			return;
		}
		if (Config_yblvskill_217.getIns().get(skillid).getLv()>hero.getSpecialTreasure().getJieLv()) {
			return;
		}
		if(UseAddUtil.canUse(hero, Config_yblvskill_217.getIns().get(skillid).getConsume())) {
			UseAddUtil.use(hero, Config_yblvskill_217.getIns().get(skillid).getConsume(), SourceGoodConst.SPETREASURE_UP_SKILL, true);
			int nextskill=Config_yblvskill_217.getIns().get(skillid).getNext();
			hero.getSpecialTreasure().getSkills().put(index, nextskill);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPETREASURE_UP_SKILL,SystemIdConst.SpeTreasure_SYSID);
			BingFaSender.sendCmd_914(hero.getId(), 2, 0, index, nextskill);
			return;
		}
	}

	private void upBingFaskill(Hero hero, int index) {
		if (!hero.getBingfa().getSkills().containsKey(index)) {
			return;
		}
		//升级
		int skillid=hero.getBingfa().getSkills().get(index);
		if(Config_booklvskill_213.getIns().get(skillid).getConsume()==null) {
			return;
		}
		if (Config_booklvskill_213.getIns().get(skillid).getLv()>hero.getBingfa().getJieLv()) {
			return;
		}
		if(UseAddUtil.canUse(hero, Config_booklvskill_213.getIns().get(skillid).getConsume())) {
			UseAddUtil.use(hero, Config_booklvskill_213.getIns().get(skillid).getConsume(), SourceGoodConst.BINGFA_UP_SKILL, true);
			int nextskill=Config_booklvskill_213.getIns().get(skillid).getNext();
			hero.getBingfa().getSkills().put(index, nextskill);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.BINGFA_UP_SKILL,SystemIdConst.BingFa_SYSID);
			BingFaSender.sendCmd_914(hero.getId(), 3, 0, index, nextskill);
			return;
		}
	}
	
}
