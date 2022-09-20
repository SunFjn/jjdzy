package com.teamtop.system.zhanjia;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.bingfa.BingFaModel;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bao_214;
import excel.config.Config_baosuit_214;
import excel.config.Config_book_213;
import excel.config.Config_book_215;
import excel.config.Config_booksuit_215;
import excel.config.Config_clothes_212;
import excel.config.Config_clotheslv_212;
import excel.config.Config_clotheslvskill_212;
import excel.config.Config_clothessuit_212;
import excel.config.Config_drug_200;
import excel.config.Config_godheroxl_289;
import excel.config.Config_hero_211;
import excel.config.Config_herosuit_211;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_sword_216;
import excel.config.Config_swordsuit_216;
import excel.config.Config_xtcs_004;
import excel.config.Config_yb_217;
import excel.config.Config_ybsuit_217;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_baosuit_214;
import excel.struct.Struct_book_213;
import excel.struct.Struct_book_215;
import excel.struct.Struct_booksuit_215;
import excel.struct.Struct_clothes_212;
import excel.struct.Struct_clotheslv_212;
import excel.struct.Struct_godheroxl_289;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_herosuit_211;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_sword_216;
import excel.struct.Struct_swordsuit_216;
import excel.struct.Struct_yb_217;
import excel.struct.Struct_ybsuit_217;


public class ZhanJiaManager {
	
	private static ZhanJiaManager ins;
	public static ZhanJiaManager getIns(){
		if(ins == null) {
			ins = new ZhanJiaManager();
		}
		return ins;
	}
	/**
	 * 获得战甲信息
	 * @param hero
	 */
	public void getZhanJiaUi(Hero hero) {
		try {
			Object[] zhanjias=new Object[] {};
			Object[] taozhuangid=new Object[hero.getZhanJia().getTaozhuangs().size()];
			Object[] skills=new Object[hero.getZhanJia().getZhanJiaSkill().size()];
			int i=0;
			if (hero.getZhanJia().getZhanjias().size()>0) {
				zhanjias=new Object[hero.getZhanJia().getZhanjias().size()];
				for (ZhanJiaModel zhanJiaModel:hero.getZhanJia().getZhanjias().values()) {
					zhanjias[i]=new Object[] {zhanJiaModel.getType(),zhanJiaModel.getStar()};
					i++;
				}
			}
			int taozhuangSize=Config_xtcs_004.getIns().get(ZhanJiaConst.TAOZHUANGNUM).getNum();
			for (int j = 1; j <=taozhuangSize; j++) {
				taozhuangid[j-1]=new Object[]{hero.getZhanJia().getTaozhuangs().get(j)};
			}
			for (int j = 0; j < skills.length; j++) {
				skills[j]=new Object[] {hero.getZhanJia().getZhanJiaSkill().get(j+1)};
			}
			taozhuangid=CommonUtil.removeNull(taozhuangid);
			ZhanJiaSender.sendCmd_802(hero.getId(), hero.getZhanJia().getJieLv(), hero.getZhanJia().getExp(), 
					zhanjias, taozhuangid,skills,hero.getDanyao().get(ZhanJiaConst.DAN3),hero.getDanyao().get(ZhanJiaConst.DAN4),hero.getZhanJia().getShowid());
			return;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "getZhanJiaUi has wrong");
		}
		
	}
	/**
	 * 升阶
	 * @param hero
	 * @param type
	 */
	public void upJie(Hero hero, int type) {
		try {
			if(hero.getZhanJia().getJieLv() >= Config_clotheslv_212.getIns().size()) {
				hero.getZhanJia().setExp(0);
				ZhanJiaSender.sendCmd_804(hero.getId(), 1, hero.getZhanJia().getJieLv(),  hero.getZhanJia().getExp());
				return;
			}
			//普通升阶
			if (type==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, ZhanJiaConst.UP_JIE_ITEM)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, ZhanJiaConst.UP_JIE_ITEM, SourceGoodConst.ZHANJIA_UP_JIE, true);
					isUpLevel=addZhanJiaJieExp(hero,  ZhanJiaConst.UP_JIE_EXP);
					ZhanJiaSender.sendCmd_804(hero.getId(), 0, hero.getZhanJia().getJieLv(),  hero.getZhanJia().getExp());
				}
				if (isUpLevel) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_UP_JIE,SystemIdConst.zhanjia_SYSID);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_11, 0);
				}
				//每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE6);
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ZhanJiaConst.UP_JIE_ITEM);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv()).getExp()-hero.getZhanJia().getExp();
				int needNum=needExp/ZhanJiaConst.UP_JIE_EXP;
				if (needNum<=0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*ZhanJiaConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*ZhanJiaConst.UP_JIE_EXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, ZhanJiaConst.UP_JIE_ITEM)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, ZhanJiaConst.UP_JIE_ITEM, SourceGoodConst.ZHANJIA_UP_JIE, true);
					isUpLevel=addZhanJiaJieExp(hero,  addExp);
				}
				if (isUpLevel) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_UP_JIE,SystemIdConst.zhanjia_SYSID);
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ZHANJIA_LEVEL, null);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_11, 0);
				}
				//每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE6);
				ZhanJiaSender.sendCmd_804(hero.getId(), 0, hero.getZhanJia().getJieLv(),  hero.getZhanJia().getExp());
				return;
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "upJie has wrong");
		}
		
	}
	/**
	 * 加战甲升阶经验升级
	 * @param smelt
	 */
	public boolean addZhanJiaJieExp(Hero hero,int exp){
		try {
			hero.getZhanJia().setExp(hero.getZhanJia().getExp() + exp);
			List<Struct_clotheslv_212> configs = Config_clotheslv_212.getIns().getSortList();
			boolean flag = false;
			for(int i=hero.getZhanJia().getJieLv();i<configs.size() ; i++){
				if(i >= configs.size()) {
					hero.getZhanJia().setExp(0);
					break;
				}
				Struct_clotheslv_212 struct = configs.get(i-1);
				int upgradeExp =  struct.getExp();
				if(hero.getZhanJia().getExp() >= upgradeExp){
					int defExp = hero.getZhanJia().getExp() - upgradeExp;
					hero.getZhanJia().setExp(defExp);
					if (struct.getLv()+1>configs.size()) {
						hero.getZhanJia().setJieLv(struct.getLv());
					}else {
						hero.getZhanJia().setJieLv(struct.getLv()+1);
					}
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addZhanJiaJieExp:"+exp);
		}
		return false;
		
	}
	/**
	 * 战甲激活
	 * @param hero
	 * @param type
	 */
	public void zhanjiastar(Hero hero, int type) {
		try {
			if (Config_clothes_212.getIns().get(type)==null) {
				return;
			}
			Struct_clothes_212 struct_clothes_212=Config_clothes_212.getIns().get(type);
			if (!UseAddUtil.canUse(hero, struct_clothes_212.getItem())) {
				ZhanJiaSender.sendCmd_806(hero.getId(), 1, type);
				return;
			}
			
			if (hero.getZhanJia().getZhanjias().containsKey(type)) {
				//已激活战甲 升星
				if (hero.getZhanJia().getZhanjias().get(type).getStar()>=struct_clothes_212.getStar()) {
					ZhanJiaSender.sendCmd_806(hero.getId(), 1, type);
					return;
				}
				UseAddUtil.use(hero, struct_clothes_212.getItem(), SourceGoodConst.ZHANJIA_UP_STAR, true);
				hero.getZhanJia().getZhanjias().get(type).setStar(hero.getZhanJia().getZhanjias().get(type).getStar()+1);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_UP_STAR,SystemIdConst.zhanjia_SYSID);
				ZhanJiaSender.sendCmd_806(hero.getId(), 0, type);
				//晋升
				PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.ZHANJIA_JIHUO, null);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_10, 0);
				if (hero.getZhanJia().getZhanjias().get(type).getStar()>=struct_clothes_212.getStar()) {
					 //觉醒红点
					 ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
				}
			}else {
				//激活战甲
				UseAddUtil.use(hero, struct_clothes_212.getItem(), SourceGoodConst.ZHANJIA_JIHUO, true);
				ZhanJiaModel zhanJiaModel=new ZhanJiaModel();
				zhanJiaModel.setType(type);
				zhanJiaModel.setStar(1);
				//觉醒之力
				HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
				jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
				jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
				zhanJiaModel.setJueXingSkills(jueXingSkills);
				
				hero.getZhanJia().getZhanjias().put(type, zhanJiaModel);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_JIHUO,SystemIdConst.zhanjia_SYSID);
				hero.getZhanJia().setShowid(type);
				ZhanJiaSender.sendCmd_806(hero.getId(), 0, type);
				ZhanJiaSender.sendCmd_814(hero.getId(), 0, type);
				//晋升
				PromotionFunction.getIns().updatePromotionTask(hero.getId(),  PromotionTaskType.ZHANJIA_JIHUO, null);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_9, 0);
				if (struct_clothes_212.getPinzhi()>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
					ChatManager.getIns().broadCast(ChatConst.BROCAST_ZHANJIA,
							new Object[] { hero.getName(), struct_clothes_212.getId() }); // 全服广播
				}
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "zhanjiastar:"+type);
		}
		
	}
	/**
	 * 激活/升阶战甲套装 807
	 * @param hero
	 * @param taozhuangid
	 */
	public void upZJTZ(Hero hero, int index) {
		try {
			if (!hero.getZhanJia().getTaozhuangs().containsKey(index)) {
				return;
			}
			int taozhuangid=hero.getZhanJia().getTaozhuangs().get(index);
			//升阶套装id
			if (Config_clothessuit_212.getIns().get(taozhuangid).getConsume()!=null) {
				if (isManZuTiaoJian(hero,taozhuangid)&&UseAddUtil.canUse(hero, Config_clothessuit_212.getIns().get(taozhuangid).getConsume())) {
					//满足条件
					UseAddUtil.use(hero, Config_clothessuit_212.getIns().get(taozhuangid).getConsume(), SourceGoodConst.ZHANJIA_UP_TAOZHUANG, true);
					hero.getZhanJia().getTaozhuangs().put(index, taozhuangid+1);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_UP_TAOZHUANG,SystemIdConst.zhanjia_SYSID);
					ZhanJiaSender.sendCmd_808(hero.getId(), 0, index, taozhuangid+1);
					return;
				}else {
					ZhanJiaSender.sendCmd_808(hero.getId(), 1, index, taozhuangid+1);
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "index:"+index);
		}
		
	}
	/**
	 * 战甲是否满足升级条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuTiaoJian(Hero hero ,int  nowtaozhuang) {
		boolean isUp=false;
		int[][] condition=Config_clothessuit_212.getIns().get(nowtaozhuang).getCondition();
		if(condition==null) {
			return false;
		}
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!hero.getZhanJia().getZhanjias().containsKey(type)) {
				isUp=false;
				break;
			}else {
				if (star>hero.getZhanJia().getZhanjias().get(type).getStar()) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
		
	}
	/**
	 * 激活战甲技能 809
	 * @param hero
	 * @param index
	 */
	public void jihuoSkill(Hero hero, int index) {
		try {
			if (!hero.getZhanJia().getZhanJiaSkill().containsKey(index)) {
				return;
			}
			//升级
			int skillid=hero.getZhanJia().getZhanJiaSkill().get(index);
			if(Config_clotheslvskill_212.getIns().get(skillid).getConsume()==null) {
				return;
			}
			if (Config_clotheslvskill_212.getIns().get(skillid).getLv()>hero.getZhanJia().getJieLv()) {
				ZhanJiaSender.sendCmd_810(hero.getId(), 1, index, skillid);
				return;
			}
			if(UseAddUtil.canUse(hero, Config_clotheslvskill_212.getIns().get(skillid).getConsume())) {
				UseAddUtil.use(hero, Config_clotheslvskill_212.getIns().get(skillid).getConsume(), SourceGoodConst.WUJIANG_UP_SKILL, true);
				int nextskill=Config_clotheslvskill_212.getIns().get(skillid).getNext();
				hero.getZhanJia().getZhanJiaSkill().put(index, nextskill);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_UP_SKILL,SystemIdConst.zhanjia_SYSID);
				ZhanJiaSender.sendCmd_810(hero.getId(), 0, index, nextskill);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "jihuoSkill:"+index);
		}
		
	}
	public void useDan(Hero hero, int index, int type) {
		try {
			int itemid=0;
			int num=0;
			int useNum=0;
			int maxNum=0;
			int canUseNum=0;
			if (index==ZhanJiaConst.DAN3) {
				//属性丹
				itemid=Config_drug_200.getIns().get(ZhanJiaConst.DAN3).getId();
				useNum=hero.getDanyao().get(ZhanJiaConst.DAN3);
				maxNum=getMaxDanNum(hero)[0];
			}else {
				//资质丹
				itemid=Config_drug_200.getIns().get(ZhanJiaConst.DAN4).getId();
				useNum=hero.getDanyao().get(ZhanJiaConst.DAN4);
				maxNum=getMaxDanNum(hero)[1];
			}
			
			if (useNum>=maxNum) {
				canUseNum=0;
				ZhanJiaSender.sendCmd_812(hero.getId(), 0,hero.getDanyao().get(ZhanJiaConst.DAN3), hero.getDanyao().get(ZhanJiaConst.DAN4));
				return;
			}else {
				canUseNum=maxNum-useNum;
			}
			
			int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
			if (hasNum<=0) {
				ZhanJiaSender.sendCmd_812(hero.getId(), 0, hero.getDanyao().get(ZhanJiaConst.DAN3), hero.getDanyao().get(ZhanJiaConst.DAN4));
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
				if (index==ZhanJiaConst.DAN3) {
					UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.WUJIANG_DAN3, true);
					hero.getDanyao().put(ZhanJiaConst.DAN3, hero.getDanyao().get(ZhanJiaConst.DAN3)+num);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_DAN3,SystemIdConst.zhanjia_SYSID);
				}else {
					UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.WUJIANG_DAN4, true);
					hero.getDanyao().put(ZhanJiaConst.DAN4, hero.getDanyao().get(ZhanJiaConst.DAN4)+num);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_DAN4,SystemIdConst.zhanjia_SYSID);
				}
				ZhanJiaSender.sendCmd_812(hero.getId(), 0,hero.getDanyao().get(ZhanJiaConst.DAN3), hero.getDanyao().get(ZhanJiaConst.DAN4));
				// 刷新排行榜
				RankingFunction.getIns().refreshZhanjiaRankList(hero);
				//七日武圣榜
				//SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_ZHANJIA);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "useDan:"+index+" type: "+type);
		}
	}
	
	/**
	 * 获取培养丹 资质丹上限
	 * @param hero
	 * @return
	 */
	public int[] getMaxDanNum(Hero hero) {
		int[] danNums=new int[2];
		for(ZhanJiaModel zhanJiaModel:hero.getZhanJia().getZhanjias().values()) {
			danNums[0]=danNums[0]+Config_clothes_212.getIns().get(zhanJiaModel.getType()).getMax1()*zhanJiaModel.getStar();
			danNums[1]=danNums[1]+Config_clothes_212.getIns().get(zhanJiaModel.getType()).getMax2()*zhanJiaModel.getStar();
		}
		return danNums;
		
	}
	/**
	 * 切换战甲
	 * @param hero
	 * @param type
	 */
	public void changeZhanjia(Hero hero, int type) {
		try {
			if (hero.getZhanJia().getZhanjias().containsKey(type)) {
				hero.getZhanJia().setShowid(type);
				ZhanJiaSender.sendCmd_814(hero.getId(), 0, type);
				return;
			}
			ZhanJiaSender.sendCmd_814(hero.getId(), 1, type);
			return;
		} catch (Exception e) {
			LogTool.error(e, ZhanJiaManager.class, hero.getId(), hero.getName(), "changeZhanjia has wrong");
		}
		
	}
	/**
	 * CG 获取5系统激活套装 815
	 * @param type| （1武将2宝物3神剑4异宝5天书6兵法7战甲）| byte
	 */
	public void taozhuangs(Hero hero, int type) {
		try {
			Object[] taozhuangid=new Object[] {};
			int size=0;
			HashMap<Integer, Integer> taozhuangs = null;
			if (type==1) {
				//武将
			    taozhuangs = hero.getWujiang().getTaozhuangs();
				size=taozhuangs.size();
				
			}else if (type==2) {
				//宝物
				 taozhuangs = hero.getTreasureData().getTaozhuangs();
				 size=taozhuangs.size();
			}else if (type==3) {
				//神剑
				 taozhuangs = hero.getExcalibur().getTaozhuangs();
				 size=taozhuangs.size();
			}else if (type==4) {
				//异宝
				 taozhuangs = hero.getSpecialTreasure().getTaozhuangs();
				 size=taozhuangs.size();
			}else if (type==5) {
				//天书
				 taozhuangs = hero.getGodbook().getTaozhuangs();
				 size=taozhuangs.size();
			}
			if (taozhuangs!=null) {
				taozhuangid=new Object[size];
				for (int i = 0; i< taozhuangid.length; i++) {
					taozhuangid[i]=new Object[]{taozhuangs.get(i+1)};
				}
				ZhanJiaSender.sendCmd_816(hero.getId(), type, taozhuangid);
			}
		} catch (Exception e) {
			LogTool.error(e, ZhanJiaManager.class, hero.getId(), hero.getName(), "taozhuangs has wrong");
		}
		
	}
	/**
	 * 5系统激活升级套装 817
	 * @param sys| 系统id| byte
	 * @param type| 激活/升阶套装| byte
	 */
	public void taozhuangsUp(Hero hero, int sys, int type) {
		try {
			HashMap<Integer, Integer> taozhuangs = null;
			if (sys==1) {
				//武将
				taozhuangs = hero.getWujiang().getTaozhuangs();
				if (!taozhuangs.containsKey(type)) {
					return;
				}
				int taozhuangid= taozhuangs.get(type);
				
				Struct_herosuit_211 herosuit_211 = Config_herosuit_211.getIns().get(taozhuangid);
				int[][] item = herosuit_211.getItem();
				if (herosuit_211!=null) {
					if (isManZuWujiang(hero,herosuit_211)&&UseAddUtil.canUse(hero, item)) {
						//满足条件
						UseAddUtil.use(hero, item, SourceGoodConst.WUJIANG_UP_TAOZHUANG, true);
						taozhuangs.put(type, taozhuangid+1);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_TAOZHUANG,SystemIdConst.WUJIANG_SYSID);
						ZhanJiaSender.sendCmd_818(hero.getId(),0, sys, type, taozhuangid+1);
						return;
					}
				}
				
			}else if (sys==2) {
				//宝物
				taozhuangs = hero.getTreasureData().getTaozhuangs();
				if (!taozhuangs.containsKey(type)) {
					return;
				}
				int taozhuangid= taozhuangs.get(type);
				Struct_baosuit_214 struct_baosuit_214 = Config_baosuit_214.getIns().get(taozhuangid);
				int[][] item = struct_baosuit_214.getItem();
				if (struct_baosuit_214!=null) {
					if (isManZuTreasure(hero,struct_baosuit_214)&&UseAddUtil.canUse(hero, item)) {
						//满足条件
						UseAddUtil.use(hero, item, SourceGoodConst.TREASURE_UP_TAOZHUANG, true);
						taozhuangs.put(type, taozhuangid+1);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UP_TAOZHUANG,SystemIdConst.Treasure_SYSID);
						ZhanJiaSender.sendCmd_818(hero.getId(),0, sys, type, taozhuangid+1);
						return;
					}
				}
				
			}else if (sys==3) {
				//神剑
				taozhuangs = hero.getExcalibur().getTaozhuangs();
				if (!taozhuangs.containsKey(type)) {
					return;
				}
				int taozhuangid= taozhuangs.get(type);
				Struct_swordsuit_216 struct_swordsuit_216 = Config_swordsuit_216.getIns().get(taozhuangid);
				int[][] item = struct_swordsuit_216.getItem();
				if (struct_swordsuit_216!=null) {
					if (isManZuExcalibur(hero,struct_swordsuit_216)&&UseAddUtil.canUse(hero, item)) {
						//满足条件
						UseAddUtil.use(hero, item, SourceGoodConst.EXCALIBUR_UP_TAOZHUANG, true);
						taozhuangs.put(type, taozhuangid+1);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.EXCALIBUR_UP_TAOZHUANG,SystemIdConst.Excalibur_SYSID);
						ZhanJiaSender.sendCmd_818(hero.getId(),0, sys, type, taozhuangid+1);
						return;
					}
				}
			}else if (sys==4) {
				//异宝
				taozhuangs = hero.getSpecialTreasure().getTaozhuangs();
				if (!taozhuangs.containsKey(type)) {
					return;
				}
				int taozhuangid= taozhuangs.get(type);
				Struct_ybsuit_217 struct_ybsuit_217 = Config_ybsuit_217.getIns().get(taozhuangid);
				int[][] item = struct_ybsuit_217.getItem();
				if (struct_ybsuit_217!=null) {
					if (isManZuSpeTreasure(hero,struct_ybsuit_217)&&UseAddUtil.canUse(hero, item)) {
						//满足条件
						UseAddUtil.use(hero, item, SourceGoodConst.SPECIALTRESURE_UP_TAOZHUANG, true);
						taozhuangs.put(type, taozhuangid+1);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALTRESURE_UP_TAOZHUANG,SystemIdConst.SpeTreasure_SYSID);
						ZhanJiaSender.sendCmd_818(hero.getId(),0, sys, type, taozhuangid+1);
						return;
					}
				}
			}else if(sys==5) {
				//天书
				taozhuangs = hero.getGodbook().getTaozhuangs();
				if (!taozhuangs.containsKey(type)) {
					return;
				}
				int taozhuangid= taozhuangs.get(type);
				Struct_booksuit_215 struct_booksuit_215 = Config_booksuit_215.getIns().get(taozhuangid);
				int[][] item = struct_booksuit_215.getItem();
				if (struct_booksuit_215!=null) {
					if (isManZuGodBook(hero,struct_booksuit_215)&&UseAddUtil.canUse(hero, item)) {
						//满足条件
						UseAddUtil.use(hero, item, SourceGoodConst.GODBOOK_UP_TAOZHUANG, true);
						taozhuangs.put(type, taozhuangid+1);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.GODBOOK_UP_TAOZHUANG,SystemIdConst.GodBook_SYSID);
						ZhanJiaSender.sendCmd_818(hero.getId(),0, sys, type, taozhuangid+1);
						return;
					}
				}
			}
			ZhanJiaSender.sendCmd_818(hero.getId(),1, sys, type, 0);
			return;
		} catch (Exception e) {
			LogTool.error(e, ZhanJiaManager.class, hero.getId(), hero.getName(), "taozhuangsUp has wrong");
		}
		
	}
	/**
	 * CG获取7系统的觉醒情况1武将2宝物3神剑4异宝5天书6兵法7战甲 819
	 * @param type| 类型| byte
	 */
	public void getJueXin(Hero hero, int type) {
		try {
			Object[] skillinfos = null;
			switch (type) {
			case 1:
				//武将
				WuJiang wujiang = hero.getWujiang();
				HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
				if (wujiangs!=null) {
					int size = 0;
					for(WuJiangModel wuJiangModel : wujiangs.values()) {
						Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
						if(struct_hero_211.getGodhero() == 0) {
							size++;
						}
					}
					skillinfos=new Object[size];
					int i=0;
					for (Integer wuJiangid : wujiangs.keySet()) {
						WuJiangModel wuJiangModel=wujiangs.get(wuJiangid);
						Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
						if(struct_hero_211.getGodhero() == 0) {
							HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
							skillinfos[i]=new Object[] {wuJiangid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
									jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
									jueXingSkills.get(GameConst.JUEXING_SKILL4)};
							i++;
						}
						
					}
					
				}
				break;
			case 2:
				//宝物
				TreasureData  treasureData= hero.getTreasureData();
				Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
				if (treasureMap!=null) {
					skillinfos=new Object[treasureMap.size()];
					int i=0;
					for (Integer treasureid : treasureMap.keySet()) {
						TreasureModel treasureModel = treasureMap.get(treasureid);
						HashMap<Integer, Integer> jueXingSkills = treasureModel.getJueXingSkills();
						skillinfos[i]=new Object[] {treasureid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
								jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
								jueXingSkills.get(GameConst.JUEXING_SKILL4)};
						i++;
						
					}
					
				}
				break;	
			case 3:
				//3神剑
				Excalibur excalibur = hero.getExcalibur();
				Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
				if (excaliburMap!=null) {
					skillinfos=new Object[excaliburMap.size()];
					int i=0;
					for (Integer excaliburid : excaliburMap.keySet()) {
						ExcaliburModel excaliburModel = excaliburMap.get(excaliburid);
						HashMap<Integer, Integer> jueXingSkills = excaliburModel.getJueXingSkills();
						skillinfos[i]=new Object[] {excaliburid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
								jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
								jueXingSkills.get(GameConst.JUEXING_SKILL4)};
						i++;
						
					}
					
				}
				break;
			case 4:
				//4异宝
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				HashMap<Integer, Integer> treasureStar = specialTreasure.getTreasureStar();
				if (treasureStar!=null) {
					skillinfos=new Object[treasureStar.size()];
					int i=0;
					for (Integer specialTreasureid : treasureStar.keySet()) {
						int star = treasureStar.get(specialTreasureid);
						if (star>0) {
							HashMap<Integer, Integer> jueXingSkills = specialTreasure.getJueXingSkills().get(specialTreasureid);
							skillinfos[i]=new Object[] {specialTreasureid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
									jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
									jueXingSkills.get(GameConst.JUEXING_SKILL4)};
							i++;
						}
						
					}
					
				}
				break;
			case 5:
				//5天书
				GodBook godbook = hero.getGodbook();
				HashMap<Integer, GodBookModel> hasBooks = godbook.getHasBooks();
				if (hasBooks!=null) {
					skillinfos=new Object[hasBooks.size()];
					int i=0;
					for (Integer godBookId : hasBooks.keySet()) {
						GodBookModel godBookModel = hasBooks.get(godBookId);
						HashMap<Integer, Integer> jueXingSkills = godBookModel.getJueXingSkills();
						skillinfos[i]=new Object[] {godBookId,jueXingSkills.get(GameConst.JUEXING_SKILL1),
								jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
								jueXingSkills.get(GameConst.JUEXING_SKILL4)};
						i++;
					}


				}
				break;				
			case 6:
				//6兵法
				BingFa bingfa = hero.getBingfa();
				HashMap<Integer, BingFaModel> bingfas = bingfa.getBingfas();
				if (bingfas!=null) {
					skillinfos=new Object[bingfas.size()];
					int i=0;
					for (Integer bingfaid : bingfas.keySet()) {
						BingFaModel bingFaModel = bingfas.get(bingfaid);
						HashMap<Integer, Integer> jueXingSkills = bingFaModel.getJueXingSkills();
						skillinfos[i]=new Object[] {bingfaid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
								jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
								jueXingSkills.get(GameConst.JUEXING_SKILL4)};
						i++;
					}

				}
				break;				
			case 7:
				//7战甲
				ZhanJia zhanJia = hero.getZhanJia();
				HashMap<Integer, ZhanJiaModel> zhanjias = zhanJia.getZhanjias();
				if (zhanjias!=null) {
					skillinfos=new Object[zhanjias.size()];
					int i=0;
					for (Integer zhanjiaid : zhanjias.keySet()) {
						ZhanJiaModel zhanJiaModel = zhanjias.get(zhanjiaid);
						HashMap<Integer, Integer> jueXingSkills = zhanJiaModel.getJueXingSkills();
						skillinfos[i]=new Object[] {zhanjiaid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
								jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
								jueXingSkills.get(GameConst.JUEXING_SKILL4)};
						i++;
					}

				}
				break;
			case 8:
				//神将
				WuJiang shenjiang = hero.getWujiang();
				HashMap<Integer, WuJiangModel> shenjiangs = shenjiang.getWujiangs();
				if (shenjiangs!=null) {
					int size = 0;
					for(WuJiangModel wuJiangModel : shenjiangs.values()) {
						Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
						if(struct_hero_211.getGodhero() == 1) {
							size++;
						}
					}
					skillinfos=new Object[size];
					int i=0;
					for (Integer wuJiangid : shenjiangs.keySet()) {
						WuJiangModel wuJiangModel=shenjiangs.get(wuJiangid);
						Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
						if (struct_hero_211.getGodhero() == 1) {
							HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
							skillinfos[i]=new Object[] {wuJiangid,jueXingSkills.get(GameConst.JUEXING_SKILL1),
									jueXingSkills.get(GameConst.JUEXING_SKILL2),jueXingSkills.get(GameConst.JUEXING_SKILL3),
									jueXingSkills.get(GameConst.JUEXING_SKILL4)};
							i++;
						}
						
					}
					
				}
				break;
			default:
				break;
			}
			ZhanJiaSender.sendCmd_820(hero.getId(), type, skillinfos);
		} catch (Exception e) {
			LogTool.error(e, ZhanJiaManager.class, "getJueXin has wrong");
		}
		
	}
	
	/**
	 * 升级觉醒
	 * @param hero
	 * @param type 7系统的觉醒情况1武将2宝物3神剑4异宝5天书6兵法7战甲 
	 * @param index 对应model
	 * @param skillindex 1-4
	 */
	public void upjuexing(Hero hero, int type, int index, int skillindex) {
		try {
			if (skillindex<GameConst.JUEXING_SKILL1||skillindex>GameConst.JUEXING_SKILL4) {
				return;
			}
			int pingzhi=0;
			HashMap<Integer, Integer> jueXingSkills=null;
			int costId=0;
			int addStrSource=0;
			int addJIeSource=0;
			int sysid=0;
			boolean ismaxSatr=false;
			switch (type) {
			case 1://1武将
				WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(index);
				Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
				if(struct_hero_211.getGodhero() == 1) {//神将无觉醒
					return;
				}
				jueXingSkills=wuJiangModel.getJueXingSkills();
				if (wuJiangModel.getStar()>=struct_hero_211.getStar()) {
					ismaxSatr=true;
				}
				if (struct_hero_211!=null) {
					pingzhi=struct_hero_211.getPinzhi();
					costId= struct_hero_211.getActivation()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV1;
				addJIeSource=FightCalcConst.JUEXING_UPJIE1;
				sysid=SystemIdConst.WUJIANG_SYSID;
				break;
			case 2://2宝物
				TreasureModel treasureModel = hero.getTreasureData().getTreasureMap().get(index);
				jueXingSkills=treasureModel.getJueXingSkills();
				Struct_bao_214 struct_bao_214 = Config_bao_214.getIns().get(index);
				if (treasureModel.getStarLevel()>=struct_bao_214.getStar()) {
					ismaxSatr=true;
				}
				if (struct_bao_214!=null) {
					pingzhi=struct_bao_214.getPin();
					costId= struct_bao_214.getItem()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV2;
				addJIeSource=FightCalcConst.JUEXING_UPJIE2;
				sysid=SystemIdConst.Treasure_SYSID;
				break;
			case 3://3神剑
				ExcaliburModel excaliburModel = hero.getExcalibur().getExcaliburMap().get(index);
				jueXingSkills=excaliburModel.getJueXingSkills();
				Struct_sword_216 struct_sword_216 = Config_sword_216.getIns().get(index);
				if (excaliburModel.getStarLevel()>=struct_sword_216.getStar()) {
					ismaxSatr=true;
				}
				if (struct_sword_216!=null) {
					pingzhi=struct_sword_216.getPin();
					costId= struct_sword_216.getItem()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV3;
				addJIeSource=FightCalcConst.JUEXING_UPJIE3;
				sysid=SystemIdConst.Excalibur_SYSID;
				break;
			case 4://4异宝
				jueXingSkills=hero.getSpecialTreasure().getJueXingSkills().get(index);;
				Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(index);
				Integer star = hero.getSpecialTreasure().getTreasureStar().get(index);
				if (star>=struct_yb_217.getStar()) {
					ismaxSatr=true;
				}
				if (struct_yb_217!=null) {
					pingzhi=struct_yb_217.getPin();
					costId =struct_yb_217.getItem()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV4;
				addJIeSource=FightCalcConst.JUEXING_UPJIE4;
				sysid=SystemIdConst.SpeTreasure_SYSID;
				break;
			case 5://5天书
				GodBookModel godBookModel = hero.getGodbook().getHasBooks().get(index);
				jueXingSkills=godBookModel.getJueXingSkills();
				Struct_book_215 struct_book_215 = Config_book_215.getIns().get(index);
				if (godBookModel.getStar()>=struct_book_215.getStar()) {
					ismaxSatr=true;
				}
				if (struct_book_215!=null) {
					pingzhi=struct_book_215.getPin();
					costId =struct_book_215.getItem()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV5;
				addJIeSource=FightCalcConst.JUEXING_UPJIE5;
				sysid=SystemIdConst.GodBook_SYSID;
				break;
			case 6://6兵法
				BingFaModel bingFaModel = hero.getBingfa().getBingfas().get(index);
				jueXingSkills=bingFaModel.getJueXingSkills();
				Struct_book_213 struct_book_213 = Config_book_213.getIns().get(index);
				if (bingFaModel.getStar()>=struct_book_213.getStar()) {
					ismaxSatr=true;
				}
				if (struct_book_213!=null) {
					pingzhi=struct_book_213.getPin();
					costId =struct_book_213.getItem()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV6;
				addJIeSource=FightCalcConst.JUEXING_UPJIE6;
				sysid=SystemIdConst.BingFa_SYSID;
				break;
			case 7://7战甲
				ZhanJiaModel zhanJiaModel = hero.getZhanJia().getZhanjias().get(index);
				jueXingSkills=zhanJiaModel.getJueXingSkills();
				Struct_clothes_212 struct_clothes_212 = Config_clothes_212.getIns().get(index);
				if (zhanJiaModel.getStar()>=struct_clothes_212.getStar()) {
					ismaxSatr=true;
				}
				if (struct_clothes_212!=null) {
					pingzhi=struct_clothes_212.getPinzhi();
					costId =struct_clothes_212.getItem()[0][1];
				}
				addStrSource=FightCalcConst.JUEXING_UPLV7;
				addJIeSource=FightCalcConst.JUEXING_UPJIE7;
				sysid=SystemIdConst.zhanjia_SYSID;
				break;
			case 8:// 神将
				WuJiangModel shenModel = hero.getWujiang().getWujiangs().get(index);
				Struct_hero_211 hero_211 = Config_hero_211.getIns().get(shenModel.getType());
				if (hero_211.getGodhero() != 1) {// 神将觉醒
					return;
				}
				jueXingSkills = shenModel.getJueXingSkills();
				int pinzhi = hero_211.getPinzhi();
				int starindex = pinzhi * 1000 + shenModel.getXiulianLv();
				Struct_godheroxl_289 struct_godheroxl_289 = Config_godheroxl_289.getIns().get(starindex);

				int nextLv = struct_godheroxl_289.getNext();

				if (nextLv == 0) {
					ismaxSatr = true;
				}
				if (hero_211 != null) {
					pingzhi = hero_211.getPinzhi();
					costId = hero_211.getActivation()[0][1];
				}
				addStrSource = FightCalcConst.JUEXING_UPLV8;
				addJIeSource = FightCalcConst.JUEXING_UPJIE8;
				sysid = SystemIdConst.WUJIANG_SYSID;
				break;
				
			default:
				break;
			}
			if (!ismaxSatr||jueXingSkills==null) {
				LogTool.warn("!ismaxSatr||jueXingSkills==null type "+type+" index:"+index , ZhanJiaManager.class);
				return;
			}
			Integer skilllv = jueXingSkills.get(skillindex);
			Integer thisLv = jueXingSkills.get(GameConst.JUEXING_SKILL4);
			
			if (skillindex>=GameConst.JUEXING_SKILL1&&skillindex<=GameConst.JUEXING_SKILL3) {
				//升级 觉醒技能
			    int nextLv=skilllv+1;
			    //id=品质id*10000+觉醒技能id*1000+等级
			    int goalIndex=pingzhi*10000+skillindex*1000+nextLv;
			    int thisIndex=pingzhi*10000+skillindex*1000+skilllv;
			    Struct_jx_271 struct_jx_271_this = Config_jx_271.getIns().get(thisIndex);
				Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
				int needlv = struct_jx_271_this.getLv();
				if (struct_jx_271!=null&&thisLv>=needlv) {
					int consume = struct_jx_271_this.getConsume();
					if (UseAddUtil.canUse(hero, GameConst.TOOL, consume, costId)) {
						UseAddUtil.use(hero, GameConst.TOOL, consume, costId, SourceGoodConst.JUEXING, true);
						jueXingSkills.put(skillindex, nextLv);
						FightCalcFunction.setRecalcAll(hero, addStrSource,sysid);
						ZhanJiaSender.sendCmd_822(hero.getId(), 0, type, index, skillindex, nextLv);
						return;
					}
					
				}
				
			}else if (skillindex==GameConst.JUEXING_SKILL4) {
				//升级觉醒之力
			    int nextLv=skilllv+1;
			    //品质*100+等级
			    int goalIndex=pingzhi*100+nextLv;
			    Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(goalIndex);
			    if (struct_jxzl_271!=null) {
			    	boolean isUpLevel=true;
			    	int needLv = struct_jxzl_271.getLv();
			    	for (int i = GameConst.JUEXING_SKILL1; i <=GameConst.JUEXING_SKILL3; i++) {
			    		if (jueXingSkills.get(i)<needLv) {
			    			isUpLevel=false;
			    			break;
						}
					}
			    	if (isUpLevel) {
			    		jueXingSkills.put(skillindex, nextLv);
			    		FightCalcFunction.setRecalcAll(hero, addJIeSource,sysid);
			    		ZhanJiaSender.sendCmd_822(hero.getId(), 0, type, index, skillindex, nextLv);
						return;
					}
				}
			}
			
			ZhanJiaSender.sendCmd_822(hero.getId(), 1, type, index, skillindex, skilllv);
			return;
		} catch (Exception e) {
			LogTool.error(e, ZhanJiaManager.class, "upjuexing has wrong");
		}
		
	}
	
	
	/**
	 * 宝物是否满足升级条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuTreasure(Hero hero ,Struct_baosuit_214  struct_baosuit_214) {
		 Map<Integer, TreasureModel> treasureMap = hero.getTreasureData().getTreasureMap();
		boolean isUp=false;
		int[][] condition=struct_baosuit_214.getCondition();
		if(condition==null) {
			return false;
		}
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!treasureMap.containsKey(type)) {
				isUp=false;
				break;
			}else {
				if (star>treasureMap.get(type).getStarLevel()) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
	}
	
	/**
	 * 宝物是否满足升级条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuWujiang(Hero hero ,Struct_herosuit_211  herosuit_211) {
		HashMap<Integer, WuJiangModel> wujiangs = hero.getWujiang().getWujiangs();
		boolean isUp=false;
		int[][] condition=herosuit_211.getCondition();
		if(condition==null) {
			return false;
		}
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!wujiangs.containsKey(type)) {
				isUp=false;
				break;
			}else {
				if (star>wujiangs.get(type).getStar()) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
	}
	
	/**
	 * 神剑是否满足升级条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuExcalibur(Hero hero ,Struct_swordsuit_216 struct_swordsuit_216) {
		Map<Integer, ExcaliburModel> excaliburMap = hero.getExcalibur().getExcaliburMap();
		boolean isUp=false;
		int[][] condition=struct_swordsuit_216.getCondition();
		if(condition==null) {
			return false;
		}
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!excaliburMap.containsKey(type)) {
				isUp=false;
				break;
			}else {
				if (star>excaliburMap.get(type).getStarLevel()) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
	}
	
	
	/**
	 * 异宝是否满足升级条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuSpeTreasure(Hero hero ,Struct_ybsuit_217 struct_ybsuit_217) {
	    HashMap<Integer, Integer> treasureStar = hero.getSpecialTreasure().getTreasureStar();
		boolean isUp=false;
		int[][] condition=struct_ybsuit_217.getCondition();
		if(condition==null) {
			return false;
		}
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!treasureStar.containsKey(type)) {
				isUp=false;
				break;
			}else {
				if (star>treasureStar.get(type)) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
	}
	
	/**
	 * 天书是否满足升级条件
	 * @param hero
	 * @param nowtaozhuang
	 * @return
	 */
	public boolean isManZuGodBook(Hero hero ,Struct_booksuit_215 struct_booksuit_215) {
	    HashMap<Integer, GodBookModel> hasBooks = hero.getGodbook().getHasBooks();
		boolean isUp=false;
		int[][] condition=struct_booksuit_215.getCondition();
		if(condition==null) {
			return false;
		}
		for (int i = 0; i < condition.length; i++) {
			int type=condition[i][0];
			int star=condition[i][1];
			if (!hasBooks.containsKey(type)) {
				isUp=false;
				break;
			}else {
				GodBookModel godBookModel = hasBooks.get(type);
				if (star>godBookModel.getStar()) {
					isUp=false;
					break;
				}
			}
			isUp=true;
		}
		return isUp;
	}

}
