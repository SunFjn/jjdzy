package com.teamtop.system.wujiang;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.actGift.ActGiftManager;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActLC;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActLC;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.kingship.KingShipFunction;
import com.teamtop.system.crossCommonRank.cross.CrossCommonRankLC;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankLC;
import com.teamtop.system.equip.EquipCache;
import com.teamtop.system.equip.EquipConst;
import com.teamtop.system.equip.EquipFunction;
import com.teamtop.system.equip.EquipScoreComparator;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.backstage.events.flowEquip.FlowEquipEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothes;
import com.teamtop.system.guardArea.cross.GuardAreaCrossFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.setting.SettingFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankLC;
import com.teamtop.system.skill.SkillConst;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_decompose_204;
import excel.config.Config_drug_200;
import excel.config.Config_godherotf_289;
import excel.config.Config_godheroxl_289;
import excel.config.Config_hero_211;
import excel.config.Config_herogod_211;
import excel.config.Config_herogodskill_211;
import excel.config.Config_herolv_211;
import excel.config.Config_herolvskill_211;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_decompose_204;
import excel.struct.Struct_eqiuplv_204;
import excel.struct.Struct_godherotf_289;
import excel.struct.Struct_godheroxl_289;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_herogod_211;
import excel.struct.Struct_herogodskill_211;
import excel.struct.Struct_herolv_211;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_zhuangbei_204;

public class WuJiangManager {
	
	private static WuJiangManager ins;
	public static WuJiangManager getIns(){
		if(ins == null) {
			ins = new WuJiangManager();
		}
		return ins;
	}
	
	
    public void getWuJiang(Hero hero) {
		try {
			WuJiang wuJiang =hero.getWujiang();
			if (wuJiang==null) {
				return;
			}
			//Object[] wujiangs=new Object[wuJiang.getWujiangs().size()];
			List<Object[]> wujiangs = new ArrayList<Object[]>();
			int jie=wuJiang.getJieLv();
			int exp=wuJiang.getExp();
			Object[] skillid=new Object[wuJiang.getWujiangSkill().size()];
			int num1=hero.getDanyao().get(WuJiangConst.INDEX1);
			int num2=hero.getDanyao().get(WuJiangConst.INDEX2);
			//int i=0;
			for(WuJiangModel wuJiangModel:wuJiang.getWujiangs().values()) {
				int type = wuJiangModel.getType();
				Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
				if(struct_hero_211.getGodhero() == 0) {
					wujiangs.add(new Object[] { wuJiangModel.getType(), wuJiangModel.getStar(),
							wuJiangModel.getGodStar(), wuJiangModel.getGodSkillLevel() });
				}
				//wujiangs[i]=new Object[] {wuJiangModel.getType(),wuJiangModel.getStar(),wuJiangModel.getGodStar()};
				//i++;
			} 
			for (int a = 1; a <=WuJiangConst.SKILLNUM; a++) {
				skillid[a-1]=new Object[] {wuJiang.getWujiangSkill().get(a)};
			}
			WuJiangSender.sendCmd_652(hero.getId(), wujiangs.toArray(), jie, exp, skillid, num1, num2);
			return;
		} catch (Exception e) {
			LogTool.error(e, WuJiangManager.class, hero.getId(), hero.getName(), "getWuJiang has wrong");
		}
		
	}
	/**
	 * 武将升阶
	 * @param hero
	 * @param type
	 */
	public void upWuJie(Hero hero, int type) {
		try {
			if(hero.getWujiang().getJieLv() >= Config_herolv_211.getIns().size()) {
				hero.getWujiang().setExp(0);
				WuJiangSender.sendCmd_654(hero.getId(), 0, hero.getWujiang().getJieLv(), hero.getWujiang().getExp());
				return;
			}
			//普通武将升阶
			if (type==0) {
				boolean isUpLevel=false;
				if (UseAddUtil.canUse(hero, GameConst.TOOL, 1, WuJiangConst.UP_JIE_ITEM)) {
					UseAddUtil.use(hero, GameConst.TOOL, 1, WuJiangConst.UP_JIE_ITEM, SourceGoodConst.WUJIANG_UP_JIE, true);
					isUpLevel=addWuJiangJieExp(hero,  WuJiangConst.UP_JIE_EXP);
					WuJiangSender.sendCmd_654(hero.getId(), 1, hero.getWujiang().getJieLv(), hero.getWujiang().getExp());
				}
				if (isUpLevel) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_JIE,SystemIdConst.WUJIANG_SYSID);
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.GENERAL_LEVEL, null);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_10, 0);
				}
				//每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE5);
			}else {
				boolean isUpLevel=false;
				int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), WuJiangConst.UP_JIE_ITEM);
				if (hasNum==0) {
					return;
				}
				int needExp=Config_herolv_211.getIns().get(hero.getWujiang().getJieLv()).getExp()-hero.getWujiang().getExp();
				int needNum=needExp/WuJiangConst.UP_JIE_EXP;
				if (needNum<=0) {
					needNum=1;
				}
				int addExp=0;
				if (needNum<=hasNum) {
					addExp=needNum*WuJiangConst.UP_JIE_EXP;
				}else {
					needNum=hasNum;
					addExp=hasNum*WuJiangConst.UP_JIE_EXP;
				}
				if (UseAddUtil.canUse(hero, GameConst.TOOL, needNum, WuJiangConst.UP_JIE_ITEM)) {
					UseAddUtil.use(hero, GameConst.TOOL, needNum, WuJiangConst.UP_JIE_ITEM, SourceGoodConst.WUJIANG_UP_JIE, true);
					isUpLevel=addWuJiangJieExp(hero,  addExp);
				}
				if (isUpLevel) {
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_JIE,SystemIdConst.WUJIANG_SYSID);
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.GENERAL_LEVEL, null);
					//任务
					TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_10, 0);
				}
				//每日任务
				DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE5);
				
				WuJiangSender.sendCmd_654(hero.getId(), 1, hero.getWujiang().getJieLv(), hero.getWujiang().getExp());
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, WuJiangManager.class, hero.getId(),  hero.getName(), "upWuJie has wrong");
		}
		
	}

	/**
	 * 加武将升阶经验升级
	 * @param smelt
	 */
	public boolean addWuJiangJieExp(Hero hero,int exp){
		try {
			hero.getWujiang().setExp(hero.getWujiang().getExp() + exp);
			List<Struct_herolv_211> configs = Config_herolv_211.getIns().getSortList();
			boolean flag = false;
			for(int i=hero.getWujiang().getJieLv();i<configs.size() ; i++){
				if(i >= configs.size()) {
					hero.getWujiang().setExp(0);
					break;
				}
				Struct_herolv_211 struct = configs.get(i-1);
				int upgradeExp =  struct.getExp();
				if(hero.getWujiang().getExp() >= upgradeExp){
					int defExp = hero.getWujiang().getExp() - upgradeExp;
					hero.getWujiang().setExp(defExp);
					if (struct.getId()+1>configs.size()) {
						hero.getWujiang().setJieLv(struct.getId());
					}else {
						hero.getWujiang().setJieLv(struct.getId()+1);
					}
					flag = true;
				}else{
					break;
				}
			}
			return flag;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "addWuJiangJieExp:"+exp);
		}
		return false;
		
	}
	/**
	 * 激活技能
	 * @param hero
	 * @param index
	 */
	public void jihuoSkill(Hero hero, int index) {
		try {
			if (!hero.getWujiang().getWujiangSkill().containsKey(index)) {
				return;
			}
			//升级
			int skillid=hero.getWujiang().getWujiangSkill().get(index);
			if(Config_herolvskill_211.getIns().get(skillid).getConsume()==null) {
				return;
			}
			if (Config_herolvskill_211.getIns().get(skillid).getLv()>hero.getWujiang().getJieLv()) {
				return;
			}
			if(UseAddUtil.canUse(hero, Config_herolvskill_211.getIns().get(skillid).getConsume())) {
				UseAddUtil.use(hero, Config_herolvskill_211.getIns().get(skillid).getConsume(), SourceGoodConst.WUJIANG_UP_SKILL, true);
				int nextskill=Config_herolvskill_211.getIns().get(skillid).getNext();
				hero.getWujiang().getWujiangSkill().put(index, nextskill);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_SKILL,SystemIdConst.WUJIANG_SYSID);
				WuJiangSender.sendCmd_656(hero.getId(), 1, index, nextskill);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "jihuoSkill:"+index);
		}
		
	}
	/**
	 * 激活武将
	 * @param hero
	 * @param type
	 */
	public void jihuowj(Hero hero, int type) {
		try {
			if (hero.getWujiang().getWujiangs().containsKey(type)) {
				return;
			}
			if (Config_hero_211.getIns().get(type)==null) {
				return;
			}
			Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(type);
			if (!UseAddUtil.canUse(hero, struct_hero_211.getActivation())) {
				return;
			}
			if(struct_hero_211.getGodhero() == 1) {
				return;
			}
			UseAddUtil.use(hero, struct_hero_211.getActivation(), SourceGoodConst.WUJIANG_JIHUO, true);
			WuJiangModel wuJiangModel=new WuJiangModel();
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
			//神将狂欢
			//SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_15);
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ACTIVATE_GENERAL, null);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_7, 0);
			// 限时礼包
			if (struct_hero_211.getPinzhi() >= GameConst.RED) {
				// 红将品质以上才发给前端
				ActGiftManager.getIns().sendMsg(hero);
			}
			SettingFunction.getIns().generalActivate(hero, type);
			if (struct_hero_211.getPinzhi()>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
				ChatManager.getIns().broadCast(ChatConst.BROCAST_WUJIANG,
						new Object[] { hero.getName(), struct_hero_211.getType() }); // 全服广播
			}
			if (!hero.getFashionClothes().getWujiangClothesId().containsKey(type)) {
				//武将当前时装0
				hero.getFashionClothes().getWujiangClothesId().put(type, 0);
			}

			// 镇守四方
			GuardAreaCrossFunction.getIns().updateRedPoint(hero);

			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "jihuowj:"+type);
		}
		
	}
	/**
	 * 升星武将
	 * @param hero
	 * @param type
	 */
	public void upWJStar(Hero hero, int type) {
		try {
			if (!hero.getWujiang().getWujiangs().containsKey(type)) {
				return;
			}
			if (Config_hero_211.getIns().get(type)==null) {
				return;
			}
			Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(type);
			if (!UseAddUtil.canUse(hero, struct_hero_211.getActivation())) {
				return;
			}
			int star = struct_hero_211.getStar();
			if (hero.getWujiang().getWujiangs().get(type).getStar()>=star) {
				return;
			}
			if(struct_hero_211.getGodhero() == 1) {
				return;
			}
			
			UseAddUtil.use(hero, struct_hero_211.getActivation(), SourceGoodConst.WUJIANG_UP_STAR, true);
			hero.getWujiang().getWujiangs().get(type).setStar(hero.getWujiang().getWujiangs().get(type).getStar()+1);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_STAR,SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_662(hero.getId(), 1, type, hero.getWujiang().getWujiangs().get(type).getStar());
			//神将狂欢
			//SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_15);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_8, 0);
			if (hero.getWujiang().getWujiangs().get(type).getStar()>=star) {
				//觉醒红点
				ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "upWJStar:"+type);
		}
		
	}
	/**
	 * 使用培养丹 资质丹
	 * @param hero
	 * @param goalid
	 * @param type
	 */
	public void useDan(Hero hero, int goalid, int type) {
		try {
			int itemid=0;
			int num=0;
			int useNum=0;
			int maxNum=0;
			int canUseNum=0;
			
			if (goalid==0) {
				//属性丹
				itemid=Config_drug_200.getIns().get(WuJiangConst.INDEX1).getId();
				useNum=hero.getDanyao().get(WuJiangConst.INDEX1);
				maxNum=getMaxDanNum(hero)[0];
			}else {
				//资质丹
				itemid=Config_drug_200.getIns().get(WuJiangConst.INDEX2).getId();
				useNum=hero.getDanyao().get(WuJiangConst.INDEX2);
				maxNum=getMaxDanNum(hero)[1];
			}
			
			if (useNum>=maxNum) {
				canUseNum=0;
				WuJiangSender.sendCmd_664(hero.getId(), 0,hero.getDanyao().get(WuJiangConst.INDEX1), hero.getDanyao().get(WuJiangConst.INDEX2));
				return;
			}else {
				canUseNum=maxNum-useNum;
			}
			
			int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
			if (hasNum<=0) {
				WuJiangSender.sendCmd_664(hero.getId(), 0, hero.getDanyao().get(WuJiangConst.INDEX1), hero.getDanyao().get(WuJiangConst.INDEX2));
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
				if (goalid==0) {
					UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.WUJIANG_DAN1, true);
					hero.getDanyao().put(WuJiangConst.INDEX1, hero.getDanyao().get(WuJiangConst.INDEX1)+num);
					//FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_DAN1,SystemIdConst.HeroFight_SYSID);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_DAN1,SystemIdConst.WUJIANG_SYSID);
				}else {
					UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.WUJIANG_DAN2, true);
					hero.getDanyao().put(WuJiangConst.INDEX2, hero.getDanyao().get(WuJiangConst.INDEX2)+num);
					//FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_DAN2,SystemIdConst.HeroFight_SYSID);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_DAN2,SystemIdConst.WUJIANG_SYSID);
				}
				WuJiangSender.sendCmd_664(hero.getId(), 1,hero.getDanyao().get(WuJiangConst.INDEX1), hero.getDanyao().get(WuJiangConst.INDEX2));
				// 刷新排行
				RankingFunction.getIns().refreshWujiangRankList(hero);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "useDan:"+type);
		}
	}
	/**
	 * 获取培养丹 资质丹上限
	 * @param hero
	 * @return
	 */
	public int[] getMaxDanNum(Hero hero) {
		int[] danNums=new int[2];
		for(WuJiangModel wuJiangModel:hero.getWujiang().getWujiangs().values()) {
			danNums[0]=danNums[0]+Config_hero_211.getIns().get(wuJiangModel.getType()).getMax1()*wuJiangModel.getStar();
			danNums[1]=danNums[1]+Config_hero_211.getIns().get(wuJiangModel.getType()).getMax2()*wuJiangModel.getStar();
		}
		return danNums;
		
	}
	/**
	 * 一键穿戴将印
	 * @param hero
	 */
	public void wearWJEQ(Hero hero) {
		try {
			Map<Integer, Equip> bodyEquip = hero.getOnbodyEquip();
			if(bodyEquip == null){
				return;
			}
			Map<Long, Equip> notOnBodyEquip = hero.getNotOnBodyEquip();
			//将未穿戴的装备分类
			int type = 0;
			ArrayList<Equip> typeList = null;
			HashMap<Integer, ArrayList<Equip>> typeMap = new HashMap<Integer, ArrayList<Equip>>();
			for(Equip e : notOnBodyEquip.values()){
				//判断在背包中
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
			//从身上位置遍历
			ArrayList<Object[]> changeList = new ArrayList<Object[]>();
			boolean isChange = false;
			boolean replace = false;
			ArrayList<Equip> list = null;
			Equip tempEquip = null;
			Equip equip = null;
			EquipScoreComparator comparator = new EquipScoreComparator();
			for(int i=GameConst.INDEX_WUJING_0; i<=GameConst.INDEX_WUJING_9; i++){
				type = i;
				list = typeMap.get(type);
				if(list == null){
					continue;
				}
				//排序，找到评分最高的未穿戴装备
				Collections.sort(list, comparator);
				tempEquip = null;
				for(int j=0; j<list.size(); j++){
					Equip temp = list.get(j);
					//判断穿戴转生 等级
					int[] equipZsLevel = EquipFunction.getEquipZsLevel(temp.getSysId());
					int rebornLv = equipZsLevel[0];
					int level = equipZsLevel[1];
					if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
						continue;
					}
					tempEquip = temp;
					break;
				}
				if(tempEquip == null){
					continue;
				}
				//穿戴装备
				replace = false;
				equip = bodyEquip.get(i);
				if(equip != null){
					//身上有装备，替换
					int strength = EquipFunction.getIns().getEquipStrength( equip.getSysId());
					int strengthTemp = EquipFunction.getIns().getEquipStrength( tempEquip.getSysId());
					if( strength >= strengthTemp){
						continue;
					}
//					equip.setJob(0);
					equip.setState(EquipConst.IN_BAG);
					equip.setBodyIndex(0);
					notOnBodyEquip.put(equip.getId(), equip);
					replace = true;
					list.add(equip); //加入到待穿戴装备分类
				}
				list.remove(tempEquip); //移除穿戴的装备
				//背包处理
				UseAddUtil.useEquip(hero, tempEquip.getId(), false, SourceGoodConst.EQUIP_WEAR, false);
//				tempEquip.setJob(0);
				tempEquip.setState(EquipConst.ON_BODY);
				tempEquip.setBodyIndex(i);
				notOnBodyEquip.remove(tempEquip.getId());
				//更新身上缓存
				bodyEquip.put(i, tempEquip);
				//背包处理
				if(replace){
					long[][] data = new long[1][];
					data[0] = new long[]{equip.getId(),equip.getSysId()};
					UseAddUtil.addEquip(hero, data, SourceGoodConst.EQUIP_UNWEAR, null, false);
				}
				//穿戴在身上的装备信息
				changeList.add(new Object[]{tempEquip.getId(), tempEquip.getSysId(), i});
				isChange = true;
			}
			if(isChange){
				//重新计算战力
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.WEARWUJINGEQUIP,SystemIdConst.WUJIANG_SYSID);
				WuJiangSender.sendCmd_666(hero.getId(), 0,  changeList.toArray());
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "wearWJEQ has wrong");
		}
		
	}
	/**
	 * 合成将印
	 * @param hero
	 * @param part
	 * @param sysid
	 */
	public void hechengJY(Hero hero, int part) {
		try {
			//判断是否是将印位置
			if (part<GameConst.INDEX_WUJING_0||part>GameConst.INDEX_WUJING_9) {
				return;
			}
			Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
			if(onbodyEquip == null){
				return;
			}
			Equip equip = onbodyEquip.get(part);
			if (equip!=null) {
				return;
			}
			//将衔
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(WuJiangConst.JIANGYING);
			int goal=struct_xtcs_004.getOther()[part-GameConst.INDEX_WUJING_0][1];
			if (hero.getOfficial()<goal) {
				return;
			}
			//神装升级
			Struct_eqiuplv_204 struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(part).get(0);
			int nextSysId = struct_eqiuplv_204.getId();
			//判断升级等级
			int[] equipZsLevel = EquipFunction.getEquipZsLevel(nextSysId);
			int level = equipZsLevel[1];
			int rebornLv = equipZsLevel[0];
			if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
				WuJiangSender.sendCmd_668(hero.getId(), 1, part, 0, 0);
				return;
			}
			//判断材料
			int[][] fenjie = struct_eqiuplv_204.getCompose();
			if(!UseAddUtil.canUse(hero, fenjie)){
				WuJiangSender.sendCmd_668(hero.getId(), 2, part, 0, nextSysId);
				return;
			}
			UseAddUtil.use(hero, fenjie, SourceGoodConst.EQUIP_ORANGE_COMPOSE, true);
			//生成装备
			long equipId = EquipFunction.getIns().createEquip(hero, nextSysId, EquipConst.ON_BODY, 0, part);
			String pfcode="";
			String usesys="";
			if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
				pfcode=hero.getTempData().getAccount().getPfcode();
				usesys=hero.getTempData().getAccount().getUsesys();
			}
			//流水
			equip = onbodyEquip.get(part);
			FlowEquipEvent.addEquipFlow(hero.getId(), 0, equip, SourceGoodConst.FLOW_OPER_ADD, SourceGoodConst.EQUIP_WUJIANG_COMPOSE, hero.getZoneid(),pfcode,usesys);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_WUJING_COMPOSE,SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_668(hero.getId(), 0, part,equipId, nextSysId);
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "hechengJY has wrong");
		}
		
	}
	/**
	 * 升级将印
	 * @param hero
	 * @param part
	 */
	public void upJY(Hero hero, int part) {
		try {
			//判断是否是将印位置
			if (part<GameConst.INDEX_WUJING_0||part>GameConst.INDEX_WUJING_9) {
				return;
			}
			Map<Integer, Equip> onbodyEquip = hero.getOnbodyEquip();
			if(onbodyEquip == null){
				return;
			}
			Equip equip = onbodyEquip.get(part);
			if (equip==null) {
				return;
			}
			//武将升级
			Struct_eqiuplv_204 struct_eqiuplv_204=	EquipCache.getGodEquipLvMap().get(part).get(equip.getSysId());
			if (struct_eqiuplv_204==null) {
				WuJiangSender.sendCmd_670(hero.getId(), 5, part, 0, 0);
				return;
			}
			int nextSysId = struct_eqiuplv_204.getId();
			//判断最高级
			if(struct_eqiuplv_204.getId() == struct_eqiuplv_204.getUp()){
				WuJiangSender.sendCmd_670(hero.getId(), 3, part, 0, 0);
				return;
			}
			//判断升级等级
			int[] equipZsLevel = EquipFunction.getEquipZsLevel(nextSysId);
			int level = equipZsLevel[1];
			int rebornLv = equipZsLevel[0];
			if(level > hero.getRealLevel() || rebornLv > hero.getRebornlv()){
				WuJiangSender.sendCmd_670(hero.getId(), 1, part, 0, 0);
				return;
			}
			//判断材料
			int[][] fenjie = struct_eqiuplv_204.getCompose();
			if(!UseAddUtil.canUse(hero, fenjie)){
				WuJiangSender.sendCmd_670(hero.getId(), 2,part, 0, 0);
				return;
			}
			
			UseAddUtil.use(hero, fenjie, SourceGoodConst.EQUIP_WUJIANG_LV, true);
			//升级
			equip.setSysId(nextSysId);
			Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(nextSysId);
			//计算装备评分
			//int score = EquipFunction.getIns().calcEquipScore(nextSysId, 0);
//			equip.setScore(zhuangbei_602.getZhanli());
			String pfcode="";
			String usesys="";
			if (hero.getTempData().getAccount()!=null) {
				pfcode=hero.getTempData().getAccount().getPfcode();
				usesys=hero.getTempData().getAccount().getUsesys();
			}
			//流水
			FlowEquipEvent.addEquipFlow(hero.getId(), 0, equip, SourceGoodConst.FLOW_OPER_ADD, SourceGoodConst.EQUIP_WUJIANG_LV, hero.getZoneid(),pfcode,usesys);
			//重算战力
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.EQUIP_WUJIANG_LV,SystemIdConst.WUJIANG_SYSID);
			//返回前端
			WuJiangSender.sendCmd_670(hero.getId(), 0,part,equip.getId(), equip.getSysId());
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "upJY has wrong");
		}
		
	}
	/**
	 * 分解将印
	 * @param hero
	 * @param uid
	 */
	public void decompose(Hero hero, long uid) {
		try {
			//判断装备是否在缓存
			Equip equip = hero.getNotOnBodyEquip(uid);
			if(equip == null){
				LogTool.warn("hid:"+hero.getId()+", decomposeOrange warn, equip not exists, equipId:"+uid, WuJiangManager.class);
				return;
			}
			int sysId = equip.getSysId();
			int bodyIndex=Config_zhuangbei_204.getIns().get(sysId).getPart();
			//判断是否是神装位置
			if (bodyIndex<GameConst.INDEX_WUJING_0||bodyIndex>GameConst.INDEX_WUJING_9) {
				return;
			}
			Struct_decompose_204 excel = Config_decompose_204.getIns().get(sysId);
			if(excel == null){
				return;
			}
			int[][] hecheng = excel.getConsume();
			if (!UseAddUtil.canUse(hero, hecheng)) {
				WuJiangSender.sendCmd_672(hero.getId(), 1, uid);
				return;
			}
			if (!UseAddUtil.canAdd(hero,excel.getReward(),false)) {
				//返回前端
				WuJiangSender.sendCmd_672(hero.getId(), 1, uid);
				return;
			}
			UseAddUtil.use(hero, hecheng, SourceGoodConst.EQUIP_WUJING_DECOMPOSE, true);
			UseAddUtil.add(hero, excel.getReward(), SourceGoodConst.EQUIP_WUJING_DECOMPOSE, null, true);
			UseAddUtil.useEquip(hero, equip.getId(), true, SourceGoodConst.EQUIP_WUJING_DECOMPOSE, false);
			//返回前端
			WuJiangSender.sendCmd_672(hero.getId(), 0, uid);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "decompose has wrong");
		}
		
	}
	/**
	 * 切换武将
	 * @param hero
	 * @param type
	 */
	public void changeJob(Hero hero, int type) {
		try {
			if(!hero.getWujiang().getWujiangs().containsKey(type)||type==hero.getJob()) {
				return;
			}
			Scene scene=hero.getScene();
			if(scene.getSceneType()==SceneConst.ZCBOSS||scene.getSceneType()==SceneConst.CROSS_ZCBOSS) {
				WuJiangSender.sendCmd_674(hero.getId(), 2, 0, 0);
				return;
			}
			if (CrossZone.isCrossServer()) {
				//跨服
				WuJiangSender.sendCmd_674(hero.getId(), 2, 0, 0);
				return;
			}
			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(type);
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			int skill=struct_hero_211.getSkills()[3][0];
			int level=hero.getWujiang().getWujiangs().get(type).getStar();
			SkillFunction.getIns().changeSkill(hero, SkillConst.skiil_site_4, skill, level);
			if(struct_hero_211.getGodhero() == 1) {//神将天赋技能
				int talentSkill = struct_hero_211.getSkill();
				int talentLevel = wuJiangModel.getTalentLv();
				SkillFunction.getIns().changeSkill(hero, SkillConst.skiil_site_9, talentSkill, talentLevel);
			}
			SkillFunction.getIns().changeJob(hero, type);
			FashionClothes fashionClothes=hero.getFashionClothes();
			Integer wearId = fashionClothes.getWujiangClothesId().get(type);
			hero.getShowModel().setBodyModel(wearId);
			if (wearId>1000) {
				hero.setJob(wearId);
			}else {
				hero.setJob(type);
			}
			RankingFunction.getIns().refreshAll(hero);
			hero.getFinalFightAttr().setStar(wuJiangModel.getStar());
			hero.getFinalFightAttr().setType(struct_hero_211.getPinzhi());

			CountryFunction.getIns().refreshCountryStrengthMap(hero, 0);
			KingShipFunction.getIns().refreshKingShipModelMap(hero, 0);
			CrossEightDoorAppraiseRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossEightDoorAppraiseRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
			CrossShaoZhuQiYuanRankActLC.getIns().addUpdateAppraiseRankListToCen(hero, 0, 3);
			CrossShaoZhuQiYuanRankLC.getIns().updateAppraiseRankListToCen(hero, 0);
			CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, 0, 2);
			KingShipFunction.getIns().updatekingShiplGuardName(hero);
			WuJiangSender.sendCmd_674(hero.getId(), 0, type,wearId);
			CrossCommonRankLC.getIns().updateNameIcon(hero, 2);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_48, 1);
			
			//玩家基础数据
			/*int addition = GuanqiaFunction.getIns().getAddition(hero);
			HeroSender.sendCmd_108(hero.getId(), hero.getId(), hero.getName(),hero.getLevel(),hero.getExp(),
					hero.getJob(), hero.getCountryType(), hero.getYuanbao(), hero.getCoin(), hero.getStarSoul(),
					hero.getSoulFire(), hero.getVipLv(), hero.getZhanGong(), hero.getPrestige(), hero.getTotalStrength(),
					hero.getRebornlv(), hero.getGuanqia().getCurGuanqia(), hero.getTitleId(), hero.getExcaliburId(),
					addition, hero.getPromotionModel().getLevel(),hero.getShowModel().getBodyModel());*/
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "changeJob has wrong");
		}
		
	}
	/**
	 * 神将之力
	 * @param hero
	 * @param wujiangid
	 */
	public void wujiangStrUp(Hero hero, int wujiangid) {
		try {
			if(!hero.getWujiang().getWujiangs().containsKey(wujiangid)) {
				LogTool.warn("wujiangStrUp has wrong ",WuJiangManager.class);
				return;
			}
			Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(wujiangid);
			if(struct_hero_211!=null && struct_hero_211.getGodhero()==1) {
				return;
			}
			
			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(wujiangid);
			int godStar = wuJiangModel.getGodStar();
			int goalindex=wujiangid*100+godStar+1;
			Struct_herogod_211 struct_herogod_211 = Config_herogod_211.getIns().get(goalindex);
			if (struct_herogod_211==null) {
				LogTool.warn("struct_herogod_211==null", WuJiangManager.class);
				return;
			}
			if (wuJiangModel.getStar()<struct_herogod_211.getStar()) {
				LogTool.warn("wuJiangModel.getStar()<struct_herogod_211.getStar() ", WuJiangManager.class);
				return;
			}
			wuJiangModel.setGodStar(godStar+1);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_GODLV,SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_676(hero.getId(), 0, wujiangid, wuJiangModel.getGodStar());
			return;
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "wujiangStrUp has wrong");
		}
		
	}


	/**
	 * 获得神将信息
	 * @param hero
	 */
	public void getShenJiang(Hero hero) {
		try {
			WuJiang wuJiang =hero.getWujiang();
			if (wuJiang==null) {
				return;
			}
			List<Object[]> shenjiangList = new ArrayList<Object[]>();
			for(WuJiangModel wuJiangModel:wuJiang.getWujiangs().values()) {
				int type = wuJiangModel.getType();
				Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
				if(struct_hero_211.getGodhero() == 1) {
					int newXiulianLv = wuJiangModel.getXiulianLv();
					int oldStar = wuJiangModel.getStar();
					if(newXiulianLv==0 && oldStar>1) {
						wuJiangModel.setXiulianLv(oldStar);
						int star = oldStar/10 + 1;
						wuJiangModel.setStar(star);
					}
					int pinzhi = struct_hero_211.getPinzhi(); 
					int starindex = pinzhi*1000+wuJiangModel.getXiulianLv();
					shenjiangList.add(new Object[] {wuJiangModel.getType(),starindex,wuJiangModel.getTalentLv()});
				}
			}
			WuJiangSender.sendCmd_678(hero.getId(), shenjiangList.toArray());
		} catch (Exception e) {
			LogTool.error(e, WuJiangManager.class, hero.getId(), hero.getName(), "getShenJiang has wrong");
		}
		
	}


	/**
	 * 激活神将
	 * @param hero
	 * @param type 神将职业编号
	 */
	public void shenJiangJiHuo(Hero hero, int type) {
		try {
			if (hero.getWujiang().getWujiangs().containsKey(type)) {
				return;
			}
			if (Config_hero_211.getIns().get(type)==null) {
				return;
			}
			Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(type);
			if (!UseAddUtil.canUse(hero, struct_hero_211.getActivation())) {
				WuJiangSender.sendCmd_680(hero.getId(), 0, type);
				return;
			}
			if(struct_hero_211.getGodhero() == 0) {
				return;
			}
			
			int star = 0;//所有武将星级
			HashMap<Integer, WuJiangModel> wjMap = hero.getWujiang().getWujiangs();
			for(WuJiangModel wj : wjMap.values()) {
				Struct_hero_211 hero_211=Config_hero_211.getIns().get(wj.getType());
				if(hero_211.getGodhero() == 0) {
					if(hero_211.getPinzhi() > 5) {//品质大于5的红将
						star += wj.getStar();
					}
				}
			}
			if(star < struct_hero_211.getJh()) {//激活需要红将星级不足
				WuJiangSender.sendCmd_680(hero.getId(), 0, type);
				return;
			}
			
			UseAddUtil.use(hero, struct_hero_211.getActivation(), SourceGoodConst.SHENJIANG_JIHUO, true);
			
			WuJiangModel wuJiangModel=new WuJiangModel();
			wuJiangModel.setType(type);
			wuJiangModel.setTalentLv(1);
			wuJiangModel.setStar(1);//神将默认1星
			
			//只初始化觉醒之力，不要用到
			HashMap<Integer, Integer> jueXingSkills=new HashMap<>();
			jueXingSkills.put(GameConst.JUEXING_SKILL1, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL2, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL3, 0);
			jueXingSkills.put(GameConst.JUEXING_SKILL4, 0);
			wuJiangModel.setJueXingSkills(jueXingSkills);
			
			hero.getWujiang().getWujiangs().put(type, wuJiangModel);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_JIHUO,SystemIdConst.WUJIANG_SYSID);//重算所有战力和属性
			
			PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ACTIVATE_GENERAL, null);
			SettingFunction.getIns().generalActivate(hero, type);//获得将领激活
			
			
			ChatManager.getIns().broadCast(ChatConst.SHENJIANGJIHUO, new Object[] { hero.getName(), struct_hero_211.getType() }); // 全服广播
			
			if (!hero.getFashionClothes().getWujiangClothesId().containsKey(type)) {
				//武将当前时装0
				hero.getFashionClothes().getWujiangClothesId().put(type, 0);
			}
			WuJiangSender.sendCmd_680(hero.getId(), 1, type);

			// 镇守四方
			GuardAreaCrossFunction.getIns().updateRedPoint(hero);
			// 限时礼包
			ActGiftManager.getIns().sendMsg(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "shenJiangJiHuo:"+type);
		}
		
	}


	/**
	 * 突破/升级神将等级 681
	 * @param hero
	 * @param type
	 */
	public void upShenJiangLv(Hero hero, int type) {
		try {
			HashMap<Integer, WuJiangModel> wujiangs = hero.getWujiang().getWujiangs();
			if (!wujiangs.containsKey(type)) {
				return;
			}
			if (Config_hero_211.getIns().get(type)==null) {
				return;
			}
			
			Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(type);
			if(struct_hero_211.getGodhero() == 0) {
				return;
			}
			WuJiangModel wuJiangModel = wujiangs.get(type);
			if(wuJiangModel == null) {
				return;
			}
			int pinzhi = struct_hero_211.getPinzhi(); 
			int starindex = pinzhi*1000+wuJiangModel.getXiulianLv();
			Struct_godheroxl_289 struct_godheroxl_289 = Config_godheroxl_289.getIns().get(starindex);
			
			int nextLv = struct_godheroxl_289.getNext();
			
			if(nextLv<=0 || starindex>=nextLv) {
				WuJiangSender.sendCmd_682(hero.getId(), 0, type, starindex);
				return;
			}
			
			int[][] conmuse = struct_godheroxl_289.getConmuse();
			if(conmuse != null) {
				if (!UseAddUtil.canUse(hero, conmuse)) {
					return;
				}
			}
			int tpNum = struct_godheroxl_289.getTp();
			if(tpNum > 0) {
				if (!UseAddUtil.canUse(hero, struct_hero_211.getActivation(),tpNum)) {
					WuJiangSender.sendCmd_682(hero.getId(), 0, type, starindex);
					return;
				}
				UseAddUtil.use(hero, struct_hero_211.getActivation(),tpNum, SourceGoodConst.UPSHENJIANGLV, true);
			}
			if(conmuse != null) {
				UseAddUtil.use(hero, conmuse, SourceGoodConst.UPSHENJIANGLV, true);
			}
			
			int xiulianLv = nextLv%(pinzhi*1000);
			wuJiangModel.setXiulianLv(xiulianLv);
			int star = xiulianLv/10 + 1;//转为神将重数，即武将星级
			wuJiangModel.setStar(star);
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_8, 0);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_STAR,SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_682(hero.getId(), 1, type, nextLv);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "upShenJiangLv:"+type);
		}
		
	}


	/**
	 * 升级神将天赋
	 * @param hero
	 * @param type
	 */
	public void upShenJiangTf(Hero hero, int type) {
		try {
			HashMap<Integer, WuJiangModel> wujiangs = hero.getWujiang().getWujiangs();
			if (!wujiangs.containsKey(type)) {
				WuJiangSender.sendCmd_684(hero.getId(), 0, type, 0);
				return;
			}
			if (Config_hero_211.getIns().get(type)==null) {
				return;
			}
			
			Struct_hero_211 struct_hero_211=Config_hero_211.getIns().get(type);
			if(struct_hero_211.getGodhero() == 0) {
				return;
			}
			WuJiangModel wuJiangModel = wujiangs.get(type);
			if(wuJiangModel == null) {
				return;
			}
			
			int talentLv = wuJiangModel.getTalentLv();
			
			int pinzhi = struct_hero_211.getPinzhi(); 
			int starindex = pinzhi*1000+wuJiangModel.getXiulianLv();
			
			Struct_godherotf_289 struct_godherotf_289 = Config_godherotf_289.getIns().get(talentLv);
			int nextLv = struct_godherotf_289.getNext();//天赋下一等级
			Struct_godheroxl_289 struct_godheroxl_289 = Config_godheroxl_289.getIns().get(starindex);
			if(nextLv > struct_godheroxl_289.getMax()) {
				WuJiangSender.sendCmd_684(hero.getId(), 0, type, talentLv);
				return;
			}
			
			if(nextLv<=0 || talentLv>=nextLv) {
				WuJiangSender.sendCmd_684(hero.getId(), 0, type, talentLv);
				return;
			}
			
			int[][] conmuse = struct_godherotf_289.getConmuse();
			
			if(conmuse != null) {
				if (!UseAddUtil.canUse(hero, conmuse)) {
					return;
				}
			}
			
			UseAddUtil.use(hero, conmuse, SourceGoodConst.UPSHENJIANGTF, true);
			wuJiangModel.setTalentLv(nextLv);
			int talentSkill = struct_hero_211.getSkill();
			SkillFunction.getIns().changeSkill(hero, SkillConst.skiil_site_9, talentSkill, nextLv);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SHENJIANG_TF,SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_684(hero.getId(), 1, type, nextLv);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "upShenJiangTf:"+type);
		}
		
	}

	public void generalSkillUp(Hero hero, int type) {
		// TODO Auto-generated method stub
		try {
			HashMap<Integer, WuJiangModel> wujiangs = hero.getWujiang().getWujiangs();
			if (!wujiangs.containsKey(type)) {
				//武将未激活
				WuJiangSender.sendCmd_686(hero.getId(), 5, type, 0);
				return;
			}
//			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
//			if (struct_hero_211 != null && struct_hero_211.getGodhero() == 1) {
//				return;
//			}
			WuJiangModel wuJiangModel = wujiangs.get(type);
			int godSkillLevel = wuJiangModel.getGodSkillLevel();
			int nextGodSkillId = WuJiangFunction.getIns().godSkillLvToId(type, godSkillLevel) + 1;
			Struct_herogodskill_211 struct_herogodskill_211 = Config_herogodskill_211.getIns().get(nextGodSkillId);
			if (struct_herogodskill_211 == null) {
				//已达最大阶
				WuJiangSender.sendCmd_686(hero.getId(), 3, type, godSkillLevel);
				return;
			}
			if (wuJiangModel.getGodStar() < struct_herogodskill_211.getStar()) {
				// 对应神将之力等级不足
				WuJiangSender.sendCmd_686(hero.getId(), 2, type, godSkillLevel);
				return;
			}
			int[][] consume = struct_herogodskill_211.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				// 道具不足
				WuJiangSender.sendCmd_686(hero.getId(), 4, type, godSkillLevel);
				return;
			}
			wuJiangModel.setGodSkillLevel(godSkillLevel + 1);
			UseAddUtil.use(hero, consume, SourceGoodConst.GENERALSKILLUP_CONSUME, true);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_GOD_SKILL_UP, SystemIdConst.WUJIANG_SYSID);
			WuJiangSender.sendCmd_686(hero.getId(), 1, type, wuJiangModel.getGodSkillLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), hero.getName(), "generalSkillUp has wrong type:" + type);
		}
	}

}
