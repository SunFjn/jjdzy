package com.teamtop.system.littleLeader;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetConst;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetFunction;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_changshu_101;
import excel.config.Config_drug_200;
import excel.config.Config_son_267;
import excel.config.Config_sonqm_267;
import excel.config.Config_sonqn_267;
import excel.config.Config_sonshow_267;
import excel.config.Config_sonsixschool_267;
import excel.config.Config_sonskillup_267;
import excel.config.Config_sonstar_267;
import excel.config.Config_sonxl_267;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_drug_200;
import excel.struct.Struct_son_267;
import excel.struct.Struct_sonqm_267;
import excel.struct.Struct_sonqn_267;
import excel.struct.Struct_sonshow_267;
import excel.struct.Struct_sonsix_267;
import excel.struct.Struct_sonsixschool_267;
import excel.struct.Struct_sonskillup_267;
import excel.struct.Struct_sonstar_267;
import excel.struct.Struct_sonxl_267;

public class LittleLeaderManager {
	
	private static LittleLeaderManager ins;
	
	private LittleLeaderManager() {
		
	}
	
	public static synchronized LittleLeaderManager getIns() {
		if (ins == null) {
			ins = new LittleLeaderManager();
		}
		return ins;
	}

	public void openUi(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			int leaderid=littleLeader.getWearType();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			Object[] infos=null;
			int i=0;
			if (hasLittleLeaderModels!=null&&hasLittleLeaderModels.size()>0) {
				infos=new Object[hasLittleLeaderModels.size()];
				for (LittleLeaderModel leaderModel: hasLittleLeaderModels.values()) {
					Object[] othersKills=new Object[] {};
					HashMap<Integer, Integer> otherSkillLv = leaderModel.getOtherSkillLv();
					if (otherSkillLv!=null&&otherSkillLv.size()>0) {
						othersKills=new Object[otherSkillLv.size()];
						for (int j = 0; j < otherSkillLv.size(); j++) {
							Object[] choosesKills=null;
							if (leaderModel.getChooseSkills().containsKey(j)) {
								HashMap<Integer, Integer> chooseSkillMap = leaderModel.getChooseSkills().get(j);
								if (chooseSkillMap!=null&&chooseSkillMap.size()>0) {
									choosesKills=new Object[chooseSkillMap.size()];
									for (int a = 0; a < chooseSkillMap.size(); a++) {
										choosesKills[a]=new Object[] {chooseSkillMap.get(a)};
									}
								}
							}
							othersKills[j]=new Object[] {otherSkillLv.get(j),j,choosesKills};
						}
					}
					Object[] fashids=new Object[]{};
					HashMap<Integer, Integer> clothesStar = leaderModel.getClothesStar();
					if (clothesStar!=null&&clothesStar.size()>0) {
						fashids=new Object[clothesStar.size()];
						int j=0;
						for (int key:clothesStar.keySet()) {
							int star = clothesStar.get(key);
							fashids[j]=new Object[] {key,star};
							j++;
						}
					}
					// I:当前出站少主[I:少主indexI:少主星级I:少主亲密度经验I:少主亲密度等级I:当前选择皮肤idI:主动技能等级[I:当前携带被动技能idB:技能位置[I:备选技能id]][I:皮肤idI:皮肤等级]]
					infos[i]=new Object[] {leaderModel.getIndex(),leaderModel.getIndex()*1000+leaderModel.getStar(),leaderModel.getExp(),leaderModel.getQimiduLv(),leaderModel.getNowFashId(),leaderModel.getActivityKillLv(),othersKills,fashids};
				    i++;
				}
			}
			// I:当前出站少主[I:少主indexI:少主星级I:少主亲密度经验I:少主亲密度等级I:当前选择皮肤idI:主动技能等级[I:当前携带被动技能idB:技能位置[I:备选技能id]][I:皮肤idI:皮肤等级]]
			LittleLeaderSender.sendCmd_5102(hero.getId(), leaderid, infos);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "openUi has wrong");
		}
		
	}
	/**
	 * 激活小主
	 * @param hero
	 * @param index
	 */
	public void jihuo(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (hasLittleLeaderModels.containsKey(index)) {
				LogTool.warn("hasLittleLeaderModels.containsKey(index):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(index);
			Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(0);
			int[][] conmuse = struct_sonstar_267.getConmuse();
			if (!UseAddUtil.canUse(hero, conmuse)) {
				LogTool.warn("!UseAddUtil.canUse(hero, conmuse):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			UseAddUtil.use(hero, conmuse, SourceGoodConst.UPSTARLEADER, true,null);
			LittleLeaderModel littleLeaderModel=new LittleLeaderModel();
			littleLeaderModel.setIndex(index);
			littleLeaderModel.setStar(1);
			littleLeaderModel.setActivityKillLv(1);
			littleLeaderModel.setQimiduLv(1);
			littleLeaderModel.setClothesStar(new HashMap<>());
			littleLeaderModel.setOtherSkillLv(new HashMap<>());
			littleLeaderModel.setChooseSkills(new HashMap<>());
			littleLeaderModel.setWashNumByIndex(new HashMap<>());
			littleLeaderModel.getWashNumByIndex().put(0, 0);
			littleLeaderModel.getOtherSkillLv().put(0, 0);
			hasLittleLeaderModels.put(index, littleLeaderModel);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.JIHUO_LITTLE_LEADER,SystemIdConst.LITTLE_LEADER);
			LittleLeaderSender.sendCmd_5104(hero.getId(), 0, index);
			// 少主活动-七日目标 少主星级 亲密度 少主战力  更新处理
			ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero, new int[] {ShaoZhuSevenDayTargetConst.SHAOZHU_STAR,ShaoZhuSevenDayTargetConst.QINMIDU,ShaoZhuSevenDayTargetConst.SHAOZHU_STRENGTH});
			return;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "jihuo has wrong");
		}
		
	}
	/**
	 * 升星
	 * @param hero
	 * @param index
	 */
	public void upstar(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (!hasLittleLeaderModels.containsKey(index)) {
				LogTool.warn("hasLittleLeaderModels.containsKey(index):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(index);
			
			ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(index);
			Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(littleLeaderModel.getStar());
			if (struct_sonstar_267.getNext()==0) {
				LogTool.warn("struct_sonstar_267.getNext()==0"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			int[][] conmuse = struct_sonstar_267.getConmuse();
			if (!UseAddUtil.canUse(hero, conmuse)) {
				LogTool.warn("!UseAddUtil.canUse(hero, conmuse):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			UseAddUtil.use(hero, conmuse, SourceGoodConst.UPSTARLEADER, true,null);
			littleLeaderModel.setStar(littleLeaderModel.getStar()+1);
			hasLittleLeaderModels.put(index, littleLeaderModel);
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPSTAR_LITTLE_LEADER,SystemIdConst.LITTLE_LEADER);
			int starindex=littleLeaderModel.getIndex()*1000+littleLeaderModel.getStar();
			if (littleLeader.getStarRewardState().containsKey(starindex)) {
				Integer state = littleLeader.getStarRewardState().get(starindex);
				if (state==GameConst.REWARD_0) {
					littleLeader.getStarRewardState().put(starindex, GameConst.REWARD_1);
					//LittleLeaderSender.sendCmd_5126(hero.getId(), starindex, GameConst.REWARD_1);
				}
			}
			LittleLeaderSender.sendCmd_5106(hero.getId(), 0, index, littleLeaderModel.getIndex()*1000+littleLeaderModel.getStar());
			// 少主活动-七日目标 少主星级  更新处理
			ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero, new int[] {ShaoZhuSevenDayTargetConst.SHAOZHU_STAR});
			// 成就
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_33, 0);
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_34, 0);
			AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_35, 0);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "upstar has wrong");
		}
		
	}
	/**
	 * 激活/升阶时装
	 * @param hero
	 * @param fid
	 */
	public void jihuofash(Hero hero, int fid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			
			LittleLeader littleLeader=hero.getLittleLeader();
			Struct_sonshow_267 struct_sonshow_267 = Config_sonshow_267.getIns().get(fid);
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			int sonid = struct_sonshow_267.getSon();
			if (!hasLittleLeaderModels.containsKey(sonid)) {
				LogTool.warn("hasLittleLeaderModels.containsKey(index):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(sonid);
			HashMap<Integer, Integer> clothesStar = littleLeaderModel.getClothesStar();
			if (clothesStar==null) {
				clothesStar=new HashMap<>();
				littleLeaderModel.setClothesStar(clothesStar);
			}
			int star=0;
			if (clothesStar.containsKey(fid)) {
				star = clothesStar.get(fid);
			}
			if (star>=struct_sonshow_267.getMax()) {
				LogTool.warn("star>=struct_sonshow_267.getMax():"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			int[][] conmuse = struct_sonshow_267.getConmuse();
			if (UseAddUtil.canUse(hero, conmuse)) {
				UseAddUtil.use(hero, conmuse, SourceGoodConst.UP_FASHION_LEADER,  true);
				star=star+1;
				clothesStar.put(fid, star);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.UP_LITTLE_LEADER_CLOTH,SystemIdConst.LITTLE_LEADER);
				LittleLeaderSender.sendCmd_5108(hero.getId(), 0, fid, star);
			}
		} catch (Exception e) { 
			LogTool.error(e, LittleLeaderManager.class, "jihuofash has wrong");
		}
		
	}
	/**
	 * 携带小主
	 * @param hero
	 * @param leadid
	 */
	public void chuzhan(Hero hero, int leadid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			
			LittleLeader littleLeader=hero.getLittleLeader();
			if (leadid==0) {
				//不携带小主
				littleLeader.setWearType(leadid);
			}else {
				//携带小主
				HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
				if (!hasLittleLeaderModels.containsKey(leadid)) {
					LogTool.warn("hasLittleLeaderModels.containsKey(index):"+hero.getId(), LittleLeaderManager.class);
					return;
				}
				littleLeader.setWearType(leadid);
			}
			LittleLeaderSender.sendCmd_5110(hero.getId(), 0, leadid);
			
			FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
			int baseNum=0;
			int baseAddNum=0;
			if (littleLeader!=null) {
			    LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(littleLeader.getWearType());
				if (littleLeaderModel!=null) {
					Struct_son_267 struct_son_267 = Config_son_267.getIns().get(littleLeaderModel.getIndex());
					switch (struct_son_267.getPz()) {
					case 2:
						//绿品少主秒伤基础值
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_2).getNum();
						//绿品少主秒伤提升值
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_2).getNum();
						break;
					case 3:
						//蓝品少主秒伤基础值
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_3).getNum();
						//蓝品少主秒伤提升值
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_3).getNum();
						break;
					case 4:
						//紫品少主秒伤基础值
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_4).getNum();
						//紫品少主秒伤提升值
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_4).getNum();
						break;
					case 5:
						//橙品少主秒伤基础值
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_5).getNum();
						//橙品少主秒伤提升值
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_5).getNum();
						break;
					case 6:
						//红品少主秒伤基础值
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_6).getNum();
						//红品少主秒伤提升值
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_6).getNum();
						break;	
					default:
						break;
					}
					//携带少主
					finalFightAttr.setLittleLeaderSkillLv(littleLeaderModel.getActivityKillLv());
					finalFightAttr.setLittleLeaderStarLv(littleLeaderModel.getStar());
					finalFightAttr.setLittleLeaderBase(baseNum);
					finalFightAttr.setLittleLeaderAdd(baseAddNum);
				}else {
					//没有携带少主
					finalFightAttr.setLittleLeaderSkillLv(0);
					finalFightAttr.setLittleLeaderStarLv(0);
					finalFightAttr.setLittleLeaderBase(baseNum);
					finalFightAttr.setLittleLeaderAdd(baseAddNum);
				}
				
			}
			return;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "chuzhan has wrong");
		}
		
	}
	/**
	 * 某个小主穿上时装 
	 * @param hero
	 * @param type
	 * @param fashid
	 */
	public void changefashion(Hero hero, int type, int fashid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (!hasLittleLeaderModels.containsKey(type)) {
				LogTool.warn("!hasLittleLeaderModels.containsKey(type):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(type);
			HashMap<Integer, Integer> clothesStar = littleLeaderModel.getClothesStar();
			if (fashid!=0&&!clothesStar.containsKey(fashid)) {
				LogTool.warn("!clothesStar.containsKey(fashid):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			//切换时装
			littleLeaderModel.setNowFashId(fashid);
			LittleLeaderSender.sendCmd_5112(hero.getId(), 0, type, fashid);
			return;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "changefashion has wrong");
		}
		
	}
	/**
	 * 增加亲密度
	 * @param hero
	 * @param leaderid
	 */
	public void upqimidu(Hero hero, int leaderid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (!hasLittleLeaderModels.containsKey(leaderid)) {
				LogTool.warn("!hasLittleLeaderModels.containsKey(type):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(leaderid);
		
			
			int qimiduLv = littleLeaderModel.getQimiduLv();
			Struct_sonqm_267 struct_sonqm_267 = Config_sonqm_267.getIns().get(qimiduLv);
			if (struct_sonqm_267==null) {
				LogTool.warn("struct_sonqm_267==null"+hero.getId()+" qimiduLv:"+qimiduLv, LittleLeaderManager.class);
				return;
			}
			int nextExp = struct_sonqm_267.getExp();
			if (nextExp==0) {
				LogTool.warn("needExp==0"+hero.getId()+" qimiduLv:"+qimiduLv, LittleLeaderManager.class);
				return;
			}
			int exp=littleLeaderModel.getExp();
			int needExp=nextExp-exp;
			if (needExp<=0) {
				LogTool.warn(hero.getId()+"name "+hero.getNameZoneid()+ "needExp<=0", LittleLeaderManager.class);
				return;
			}
			Struct_son_267 struct_son_267 = Config_son_267.getIns().get(leaderid);
			List<int[]> dropArr = new ArrayList<int[]>();
			int[][] qm = struct_son_267.getQm();
			int addSumExp=0;
			for (int i = 0; i < qm.length; i++) {
				if (addSumExp>=needExp) {
					break;
				}
				int leftNeedExp=needExp-addSumExp;
				int[] js = qm[i];
				int itemid=js[0];
				int addExp=js[1];
				
				int needNum=leftNeedExp/addExp;
				int yunNum=leftNeedExp%addExp;
				if (yunNum>0) {
					needNum=needNum+1;
				}
				int hasNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
				//[type,id,num]
				if (hasNum>0) {
					if (hasNum>=needNum) {
						//道具够了
						addSumExp=addSumExp+needNum*addExp;
						dropArr.add(new int[]{GameConst.TOOL,itemid,needNum});
						
					}else {
						//道具不够
						addSumExp=addSumExp+hasNum*addExp;
						dropArr.add(new int[]{GameConst.TOOL,itemid,hasNum});
					}
				}
			}
			
			if (addSumExp>0) {
				exp=exp+addSumExp;
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				if (UseAddUtil.canUse(hero, drops)) {
					UseAddUtil.use(hero, drops, SourceGoodConst.LITTLE_LEADER_LV, true, true);
					
					int maxSize = Config_sonqm_267.getIns().size();
					//加经验
					littleLeaderModel.setExp(exp);
					for(int i=littleLeaderModel.getQimiduLv();i<maxSize ; i++){
						Struct_sonqm_267 struct = Config_sonqm_267.getIns().get(i);
						int upgradeExp =  struct.getExp();
						if (upgradeExp==0) {
							//最高级
							littleLeaderModel.setExp(0);
							break;
						}
						if(littleLeaderModel.getExp() >= upgradeExp){
							int defExp = littleLeaderModel.getExp() - upgradeExp;
							littleLeaderModel.setExp(defExp);
							littleLeaderModel.setQimiduLv(littleLeaderModel.getQimiduLv()+1);
							//解锁技能栏
							int qimilv=littleLeaderModel.getQimiduLv();
							struct_sonqm_267 = Config_sonqm_267.getIns().get(qimilv);
							int[][] reward = struct_sonqm_267.getReward();
							if (reward!=null) {
								UseAddUtil.add(hero, reward, SourceGoodConst.LITTLE_LEADER_QIMILV, UseAddUtil.getDefaultMail(), true);
							}
							int killNum=struct_sonqm_267.getSkill();
							int sizeNum=littleLeaderModel.getOtherSkillLv().size();
							if (sizeNum<killNum) {
								int yunNum=killNum-sizeNum;
								for (int j = 0; j < yunNum; j++) {
									littleLeaderModel.getOtherSkillLv().put(sizeNum+j, 0);
									littleLeaderModel.getWashNumByIndex().put(sizeNum+j, 0);
								}
							}
							FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPQIMI_LITTLE_LEADER,SystemIdConst.LITTLE_LEADER);
						}else{
							break;
						}
					}
					
				}
				//晋升任务
				//PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.LITTLELEAD_LEVEL, null);
				if (leaderid==1) {
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.LIU_LEALEAD_LEVEL, null);
				}else if (leaderid==2) {
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.CAO_LEALEAD_LEVEL, null);
				}else if (leaderid==3) {
					PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.SUN_LEALEAD_LEVEL, null);
				}
				LittleLeaderSender.sendCmd_5114(hero.getId(), 0, leaderid, littleLeaderModel.getQimiduLv(), littleLeaderModel.getExp());
				// 少主活动-七日目标 亲密度  更新处理
				ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero, new int[] {ShaoZhuSevenDayTargetConst.QINMIDU});
				return;
			}
			LittleLeaderSender.sendCmd_5114(hero.getId(), 1, leaderid, littleLeaderModel.getQimiduLv(), littleLeaderModel.getExp());
			return;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "upqimidu has wrong");
		}
		
	}
	/**
	 * CG 升级小主的主动技能 5115
	 * @param leadid| 小主id| int
	 */
	public void upSkillLv(Hero hero, int leadid) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (!hasLittleLeaderModels.containsKey(leadid)) {
				LogTool.warn("!hasLittleLeaderModels.containsKey(type):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(leadid);
			int star=littleLeaderModel.getStar();
			
			int activityKillLv = littleLeaderModel.getActivityKillLv();
			Struct_sonskillup_267 struct_sonskillup_267 = Config_sonskillup_267.getIns().get(activityKillLv);
			if (struct_sonskillup_267.getNext()==0) {
				//满级
				LogTool.warn("struct_sonskillup_267.getNext()==0 :"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			if (star<struct_sonskillup_267.getStar()) {
				LogTool.warn("star<struct_sonskillup_267.getStar() :"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			Struct_son_267 struct_son_267 = Config_son_267.getIns().get(leadid);
			int pingType=struct_son_267.getPz();
			int[][] consetItem=null;
			switch (pingType) {
			case 2:
				//绿品少主技能升级消耗
				consetItem=struct_sonskillup_267.getLv();
				break;
			case 3:
				//蓝品少主技能升级消耗
				consetItem=struct_sonskillup_267.getLan();
				break;
			case 4:
				//紫品少主技能升级消耗
				consetItem=struct_sonskillup_267.getZi();
				break;
			case 5:
				//橙品少主技能升级消耗
				consetItem=struct_sonskillup_267.getCheng();
				break;
			case 6:
				//红少主技能升级消耗
				consetItem=struct_sonskillup_267.getHong();
				break;	
			default:
				break;
			}
			if (consetItem==null) {
				LogTool.warn("consetItem==null :"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			if (UseAddUtil.canUse(hero, consetItem)) {
				UseAddUtil.use(hero, consetItem, SourceGoodConst.LITTLE_LEADER_SKILLUP, true, true);
				littleLeaderModel.setActivityKillLv(struct_sonskillup_267.getNext());
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPACTKILL_LITTLE_LEADER,SystemIdConst.LITTLE_LEADER);
				LittleLeaderSender.sendCmd_5116(hero.getId(), 0, leadid, struct_sonskillup_267.getNext());
				return;
			}
			LittleLeaderSender.sendCmd_5116(hero.getId(), 1, leadid, activityKillLv);
			return;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "upSkillLv has wrong");
		}
		
	}
	/**
	 * CG洗练小主被动技能 5117
	 * @param leadid| 小主序号| int
	 * @param type| 洗练方式0 1| byte
	 */
	public void wearSkill(Hero hero, int leadid, int index,int type) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			if (index<0||index>5) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (!hasLittleLeaderModels.containsKey(leadid)) {
				LogTool.warn("!hasLittleLeaderModels.containsKey(type):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(leadid);
			int qimilv=littleLeaderModel.getQimiduLv();
			Struct_sonqm_267 struct_sonqm_267 = Config_sonqm_267.getIns().get(qimilv);
			if (struct_sonqm_267==null) {
				LogTool.warn("struct_sonqm_267==null has wrong", LittleLeaderManager.class);
				return;
			}
			//被动技能数量
			int skillNum = struct_sonqm_267.getSkill();
			if (index+1>skillNum) {
				LogTool.warn("index1+1<skillNum index:"+index+" skillNum:"+skillNum, LittleLeaderManager.class);
				return;
			}
			if (!littleLeaderModel.getWashNumByIndex().containsKey(index)) {
				LogTool.warn("!littleLeaderModel.getWashNumByIndex().containsKey(index) index"+index, LittleLeaderManager.class);
				return;
			}
			
			int washNum = littleLeaderModel.getWashNumByIndex().get(index);
			ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
			
			Object[]  skills;
			if (!littleLeaderModel.getChooseSkills().containsKey(index)) {
				littleLeaderModel.getChooseSkills().put(index, new HashMap<Integer, Integer>());
			}
			int washTime=0;
			if (type==0) {
				//洗练一次
				washNum=washNum+1;
				for (Struct_sonxl_267 sonxl_267:Config_sonxl_267.getIns().getSortList()) {
					if (sonxl_267.getTime()[0][1]!=0) {
						if(washNum>=sonxl_267.getTime()[0][0]&&washNum<=sonxl_267.getTime()[0][1]) {
							int[][] skill = sonxl_267.getSkill();
							for (int i = 0; i < skill.length; i++) {
								pm.addProbabilityEvent(skill[i][1], skill[i][0]);
							}
							
						}
					}else {
						if(washNum>=sonxl_267.getTime()[0][0]) {
							int[][] skill = sonxl_267.getSkill();
							for (int i = 0; i < skill.length; i++) {
								pm.addProbabilityEvent(skill[i][1], skill[i][0]);
							}
							
						}
					}
					
				}
				int[][] cost=Config_xtcs_004.getIns().get(LittleLeaderConst.cost1).getOther();
				if (!UseAddUtil.canUse(hero, cost)) {
					LittleLeaderSender.sendCmd_5118(hero.getId(), 1,leadid,index, null);
					return;
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.LITTLE_LEADER_XISKILL, true, true);
				washTime++;
				skills=new Object[1];
				int killid = (Integer) ProbabilityEventUtil.getEventByProbability(pm);//随机被动技能id
				skills[0]=new Object[] {killid};
				littleLeaderModel.getChooseSkills().get(index).clear();
				littleLeaderModel.getChooseSkills().get(index).put(0, killid);
			}else {
				List<ProbabilityEventModel> pmList=new ArrayList<ProbabilityEventModel>();
				for (int j = 0; j < 5; j++) {
					washNum=washNum+1;
					ProbabilityEventModel pmListModel = ProbabilityEventFactory.getProbabilityEvent();
					for (Struct_sonxl_267 sonxl_267:Config_sonxl_267.getIns().getSortList()) {
						if (sonxl_267.getTime()[0][1]!=0) {
							if(washNum>=sonxl_267.getTime()[0][0]&&washNum<=sonxl_267.getTime()[0][1]) {
								int[][] skill = sonxl_267.getSkill();
								for (int i = 0; i < skill.length; i++) {
									pmListModel.addProbabilityEvent(skill[i][1], skill[i][0]);
								}
								break;
								
							}
						}else {
							if(washNum>=sonxl_267.getTime()[0][0]) {
								int[][] skill = sonxl_267.getSkill();
								for (int i = 0; i < skill.length; i++) {
									pmListModel.addProbabilityEvent(skill[i][1], skill[i][0]);
								}
								break;
								
							}
						}
						
					}
					pmList.add(pmListModel);
				}
				int[][] cost=Config_xtcs_004.getIns().get(LittleLeaderConst.cost5).getOther();
				if (!UseAddUtil.canUse(hero, cost)) {
					LittleLeaderSender.sendCmd_5118(hero.getId(), 1,leadid,index, null);
					return;
				}
				UseAddUtil.use(hero, cost, SourceGoodConst.LITTLE_LEADER_XISKILL, true, true);
				washTime +=5;
				skills=new Object[5];
				littleLeaderModel.getChooseSkills().get(index).clear();
				for (int i = 0; i < skills.length; i++) {
					ProbabilityEventModel probabilityEventModel = pmList.get(i);
					int killid = (Integer) ProbabilityEventUtil.getEventByProbability(probabilityEventModel);//随机被动技能id
					skills[i]=new Object[] {killid};
					littleLeaderModel.getChooseSkills().get(index).put(i, killid);
				}
			}
			littleLeaderModel.getWashNumByIndex().put(index, washNum);
			LittleLeaderSender.sendCmd_5118(hero.getId(), 0,leadid,index, skills);
			// 少主活动-七日目标 技能洗练  更新处理
			ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero, new int[] {ShaoZhuSevenDayTargetConst.SKILL_XILIAN},index,washTime);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_21, washTime, 0);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "wearSkill has wrong");
		}
		
	}
	/**
	 * 替换被动技能
	 * @param hero
	 * @param leaderid
	 * @param skillid 小主被动位置（0-4）
	 * @param skillid1 小主被动替换位置
	 */
	public void changeSkills(Hero hero, int leaderid, int index1, int index2) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			if (index1<0||index1>5) {
				return;
			}
			
			if (index2<0||index2>5) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			if (!hasLittleLeaderModels.containsKey(leaderid)) {
				LogTool.warn("!hasLittleLeaderModels.containsKey(type):"+hero.getId(), LittleLeaderManager.class);
				return;
			}
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(leaderid);
			int qimilv=littleLeaderModel.getQimiduLv();
			Struct_sonqm_267 struct_sonqm_267 = Config_sonqm_267.getIns().get(qimilv);
			if (struct_sonqm_267==null) {
				LogTool.warn("struct_sonqm_267==null has wrong", LittleLeaderManager.class);
				return;
			}
			//被动技能数量
			int skillNum = struct_sonqm_267.getSkill();
			if (index1+1>skillNum) {
				LogTool.warn("index1+1<skillNum index:"+index1+" skillNum:"+skillNum, LittleLeaderManager.class);
				return;
			}
			if(!littleLeaderModel.getOtherSkillLv().containsKey(index1)) {
				//这个被动技能栏没有被激活
				LogTool.warn("!littleLeaderModel.getOtherSkillLv().containsKey(index1) "+index1, LittleLeaderManager.class);
				return;
			}
			if (!littleLeaderModel.getChooseSkills().get(index1).containsKey(index2)) {
				LogTool.warn("!littleLeaderModel.getChooseSkills().get(index1).containsKey(index2) "+index1+"index2 "+index2, LittleLeaderManager.class);
				return;
			}
			int changeSkillid=littleLeaderModel.getChooseSkills().get(index1).get(index2);
			if (changeSkillid!=0) {
				littleLeaderModel.getChooseSkills().get(index1).clear();
				littleLeaderModel.getOtherSkillLv().put(index1, changeSkillid);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPBEIKILL_LITTLE_LEADER,SystemIdConst.LITTLE_LEADER);
				LittleLeaderSender.sendCmd_5120(hero.getId(), 0, leaderid, index1, changeSkillid);
				// 少主活动-七日目标 技能星级  更新处理
				ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero, new int[] {ShaoZhuSevenDayTargetConst.SKILL_STAR});
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "changeSkills has wrong");
		}
		
	}

	public void getStarreward(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, Integer> starRewardState = littleLeader.getStarRewardState();
			if (!starRewardState.containsKey(index)) {
				LogTool.warn("!starRewardState.containsKey(index) name:"+hero.getNameZoneid()+" index:"+index, LittleLeaderManager.class);
				return;
			}
			Integer state = starRewardState.get(index);
			if (state==GameConst.REWARD_1) {
				Struct_sonstar_267 struct_sonstar_267 = Config_sonstar_267.getIns().get(index);
				if (UseAddUtil.canAdd(hero, struct_sonstar_267.getReward(), false)) {
					UseAddUtil.add(hero, struct_sonstar_267.getReward(), SourceGoodConst.LITTLELEAD_STARREWARD, null, true);
					starRewardState.put(index, GameConst.REWARD_2);
					LittleLeaderSender.sendCmd_5124(hero.getId(), 0, index, GameConst.REWARD_2);
					return;
				}
			}
			LittleLeaderSender.sendCmd_5124(hero.getId(), 1, index, state);
			return;
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "getStarreward has wrong");
		}
		
	}

	public void starRewardInfo(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, Integer> starRewardState = littleLeader.getStarRewardState();
			int i=0;
			Object[] indexs=new Object[starRewardState.size()];
			for (int key:starRewardState.keySet()) {
				Integer value = starRewardState.get(key);
				indexs[i]=new Object[] {key,value};
				i++;
			}
			LittleLeaderSender.sendCmd_5122(hero.getId(), indexs);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "starRewardInfo has wrong");
		}
		
	}

	public void openSixArtsUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXARTS)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			Object[] sixArtsInfo = null; 
			if(hasLittleLeaderModels!=null && hasLittleLeaderModels.size()>0) {
				int size = hasLittleLeaderModels.size();
				sixArtsInfo = new Object[size];
				int i=0;
				for(LittleLeaderModel littleLeaderModel : hasLittleLeaderModels.values()) {
					int index = littleLeaderModel.getIndex();
					int schoolId = littleLeaderModel.getSchoolId();
					if(schoolId == 0) {
						schoolId = 1;
						littleLeaderModel.setSchoolId(schoolId);
					}
					
					HashMap<Integer, SixArtsModel> sixArts = littleLeaderModel.getSixArts();
					if(sixArts == null) {
						sixArts = new HashMap<Integer, SixArtsModel>();
						littleLeaderModel.setSixArts(sixArts);
					}
					
					Object[] sixArt = new Object[LittleLeaderConst.SIXART];
					for(int j=0; j<LittleLeaderConst.SIXART; j++) {
						int id = j+1;
						SixArtsModel arts = sixArts.get(id);
						if(arts == null) {
							sixArt[j] = new Object[] {id,0,0};
						}else {
							int state = arts.getSchoolId()==schoolId? 1:0;
							sixArt[j] = new Object[] {id,arts.getLevel(),state};
						}
					}
					
					sixArtsInfo[i] = new Object[] {index,schoolId,sixArt};
					i++;
				}
			}
			
			LittleLeaderSender.sendCmd_5126(hero.getId(), sixArtsInfo);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "openSixArtsUI has wrong");
		}
	}

	public void upSixArtsLv(Hero hero, int index, int id) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXARTS)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			LittleLeaderModel LittleLeaderModel = hasLittleLeaderModels.get(index);
			if(LittleLeaderModel == null) {
				LittleLeaderSender.sendCmd_5128(hero.getId(), 2, index, id, 0);
				return;
			}
			if(id<1 || id>LittleLeaderConst.SIXART) {
				LittleLeaderSender.sendCmd_5128(hero.getId(), 2, index, id, 0);
				return;
			}
			int star = LittleLeaderModel.getStar();
			
			HashMap<Integer, SixArtsModel> sixArts = LittleLeaderModel.getSixArts();
			SixArtsModel sixArt = sixArts.get(id);
			if(sixArt == null) {
				sixArt = new SixArtsModel();
				sixArts.put(id, sixArt);
			}
			int level = sixArt.getLevel();
			Struct_sonsix_267 struct_sonsix_267 = LittleLeaderFunction.getIns().getStruct_sonsix_267(id,level);
			int sysStar = struct_sonsix_267.getStar();
			if(star < sysStar) {
				LittleLeaderSender.sendCmd_5128(hero.getId(), 3, index, id, 0);
				return;
			}
			int next = struct_sonsix_267.getNext();
			if(next <= 0) {
				LittleLeaderSender.sendCmd_5128(hero.getId(), 4, index, id, 0);
				return;
			}
			int[][] consume = struct_sonsix_267.getConsume();
			if (UseAddUtil.canUse(hero, consume)) {
				UseAddUtil.use(hero, consume, SourceGoodConst.UP_SIXARTS_LV,  true);
				level++;
				sixArt.setLevel(level);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.UP_SIXARTSLV,SystemIdConst.LITTLE_LEADER);
				LittleLeaderSender.sendCmd_5128(hero.getId(), 1, index, id, level);
			}
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "upSixArtsLv has wrong");
		}
	}

	public void furtherEducation(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXARTS)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			LittleLeaderModel LittleLeaderModel = hasLittleLeaderModels.get(index);
			if(LittleLeaderModel == null) {
				LittleLeaderSender.sendCmd_5130(hero.getId(), 2, index, 0);
				return;
			}
			
			int schoolId = LittleLeaderModel.getSchoolId();
			if(schoolId == 0) {
				schoolId = 1;
			}
			Struct_sonsixschool_267 struct_sonsixschool_267 = Config_sonsixschool_267.getIns().get(schoolId);
			int next = struct_sonsixschool_267.getNext();
			if(next <= 0) {
				LittleLeaderSender.sendCmd_5130(hero.getId(), 4, index, 0);
				return;
			}
			
			HashMap<Integer, SixArtsModel> sixArts = LittleLeaderModel.getSixArts();
			if(sixArts == null) return;
			
			int[][] six = struct_sonsixschool_267.getSix();
			int[] jinxiu = six[0];
			for(int i=0; i<jinxiu.length; i++) {
				int id = jinxiu[i];
				SixArtsModel sixArtsModel = sixArts.get(id);
				if(sixArtsModel == null) {
					LittleLeaderSender.sendCmd_5130(hero.getId(), 3, index, 0);
					return;
				}
				if(schoolId != sixArtsModel.getSchoolId()) {
					LittleLeaderSender.sendCmd_5130(hero.getId(), 3, index, 0);
					return;
				}
			}
			
			LittleLeaderModel.setSchoolId(next);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.UP_FURTHEREDUCATION,SystemIdConst.LITTLE_LEADER);
			
			LittleLeaderSender.sendCmd_5130(hero.getId(), 1, index, next);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "furtherEducation has wrong");
		}
	}

	public void kaoShi(Hero hero, int index, int id) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXARTS)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			LittleLeaderModel littleLeaderModel = hasLittleLeaderModels.get(index);
			if(littleLeaderModel == null) {
				LittleLeaderSender.sendCmd_5132(hero.getId(), 2, 0, index, id);
				return;
			}
			HashMap<Integer, SixArtsModel> sixArtMap = littleLeaderModel.getSixArts();
			SixArtsModel sixArtsModel = sixArtMap.get(id);
			if(sixArtsModel == null) {
				LittleLeaderSender.sendCmd_5132(hero.getId(), 3, 0, index, id);
				return;
			}
			int schoolId = littleLeaderModel.getSchoolId();
			if(schoolId == 0) {
				schoolId = 1;
			}
			Struct_sonsixschool_267 struct_sonsixschool_267 = Config_sonsixschool_267.getIns().get(schoolId);
			int[][] consume = struct_sonsixschool_267.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				LittleLeaderSender.sendCmd_5132(hero.getId(), 3, 0, index, id);
				return;
			}
			int[][] six = struct_sonsixschool_267.getSix();
			boolean bool = true;
			for(int i=0; i<six[0].length; i++) {
				int val = six[0][i];
				if(id == val) {
					bool = false; break;
				}
			}
			if(bool) {
				LittleLeaderSender.sendCmd_5132(hero.getId(), 2, 0, index, id);
				return;
			}
			if(schoolId == sixArtsModel.getSchoolId()) {
				LittleLeaderSender.sendCmd_5132(hero.getId(), 1, 1, index, id);
				return;
			}
			int level = sixArtsModel.getLevel();
			int[][] yq = struct_sonsixschool_267.getYq();
			if(yq == null) {
				LittleLeaderSender.sendCmd_5132(hero.getId(), 3, 0, index, id);
				return;
			}
			for(int i=0; i<yq.length; i++) {
				int[] big = yq[i];
				int sysId = big[0];
				if(id == sysId) {
					int sysLv = big[1];
					if(level < sysLv) {
						LittleLeaderSender.sendCmd_5132(hero.getId(), 3, 0, index, id);
						return;
					}
					
					int[][] ks = struct_sonsixschool_267.getKs();
					for(int j=0; j<ks.length; j++) {
						int[] ksInfo = ks[j];
						if(id == ksInfo[0]) {
							int ksPro = ksInfo[1];
							int flag = 0;//0.不合格 1.合格
							int randomNum = RandomUtil.getRandomNumInAreas(1, 100000);
							if(ksPro >= randomNum) {
								flag = 1;
							}
							UseAddUtil.use(hero, consume, SourceGoodConst.KAOSHI,  true);
							if(flag == 1) {
								sixArtsModel.setSchoolId(schoolId);
							}
							LittleLeaderSender.sendCmd_5132(hero.getId(), 1, flag, index, id);
							return;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "kaoShi has wrong");
		}
	}

	public void openQianNengUI(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			Object[] qnInfo = null; 
			if(hasLittleLeaderModels!=null && hasLittleLeaderModels.size()>0) {
				int size = hasLittleLeaderModels.size();
				qnInfo = new Object[size];
				int i=0;
				for(LittleLeaderModel littleLeaderModel : hasLittleLeaderModels.values()) {
					int index = littleLeaderModel.getIndex();
					int id = littleLeaderModel.getQiannengId();
					if(id == 0) {
						id = LittleLeaderFunction.getIns().getQiannengId(index);
					}
					
					HashMap<Integer, Integer> swallow = littleLeaderModel.getSwallow();
					List<Integer> list = LittleLeaderConst.POTENTIAL_DY_LIST;
					int dySize = list.size();
					Object[] danyao = new Object[dySize];
					int j=0;
					for(Integer dyId : list) {
						Integer num = null;
						if(swallow == null) {
							num = 0;
						}else {
							num = swallow.get(dyId);
							if(num == null) {
								num = 0;
							}
						}
						danyao[j] = new Object[] {dyId,num};
						j++;
					}
						
					qnInfo[i] = new Object[] {index,id,danyao};
					i++;
				}
			}
			
			LittleLeaderSender.sendCmd_5134(hero.getId(), qnInfo);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "openQianNengUI has wrong");
		}
	}

	public void upQianneng(Hero hero, int index) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			LittleLeaderModel LittleLeaderModel = hasLittleLeaderModels.get(index);
			if(LittleLeaderModel == null) {
				LittleLeaderSender.sendCmd_5136(hero.getId(), 2, index, 0);
				return;
			}
			
			int star = LittleLeaderModel.getStar();
			ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(index);
			Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(star);
			if (struct_sonstar_267.getNext() != 0) {
				LittleLeaderSender.sendCmd_5136(hero.getId(), 3, index, 0);
				return;
			}
			
			int id = LittleLeaderModel.getQiannengId();
			if(id == 0) {
				id = LittleLeaderFunction.getIns().getQiannengId(index);
			}
			Struct_sonqn_267 struct_sonqn_267 = Config_sonqn_267.getIns().get(id);
			int next = struct_sonqn_267.getNext();
			if(next <= 0) {
				LittleLeaderSender.sendCmd_5136(hero.getId(), 4, index, id);
				return;
			}
			
			int[][] consume = struct_sonqn_267.getConsume();
			if (!UseAddUtil.canUse(hero, consume)) {
				LittleLeaderSender.sendCmd_5136(hero.getId(), 3, index, id);
				return;
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.UP_QIANNENG,  true);
			LittleLeaderModel.setQiannengId(next);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.UP_QIANNENG,SystemIdConst.LITTLE_LEADER);
			LittleLeaderSender.sendCmd_5136(hero.getId(), 1, index, next);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "upQianneng has wrong");
		}
	}

	public void swallowing(Hero hero, int index, int danyaoId, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.LITTLE_LEADER)) {
				return;
			}
			LittleLeader littleLeader=hero.getLittleLeader();
			HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			LittleLeaderModel LittleLeaderModel = hasLittleLeaderModels.get(index);
			if(LittleLeaderModel == null) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 2, index, danyaoId, num);
				return;
			}
			
			int star = LittleLeaderModel.getStar();
			ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(index);
			Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(star);
			if (struct_sonstar_267.getNext() != 0) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 3, index, danyaoId, num);
				return;
			}
			
			int id = LittleLeaderModel.getQiannengId();
			if(id == 0) {
				id = LittleLeaderFunction.getIns().getQiannengId(index);
			}
			Struct_sonqn_267 struct_sonqn_267 = Config_sonqn_267.getIns().get(id);
			
			Struct_drug_200 struct_drug_200 = Config_drug_200.getIns().get(danyaoId);
			if(struct_drug_200 == null) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 3, index, danyaoId, num);
				return;
			}
			
			List<Integer> list = LittleLeaderConst.POTENTIAL_DY_LIST;
			int constKey = list.indexOf(danyaoId);
			
			if(constKey < 0) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 3, index, danyaoId, num);
				return;
			}
			
			int max = 0;
			if(constKey == 0) {
				max = struct_sonqn_267.getMax1();
			}else if(constKey == 1) {
				max = struct_sonqn_267.getMax2();
			}
			
			if(max == 0) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 3, index, danyaoId, num);
				return;
			}
			
			HashMap<Integer, Integer> swallowMap = LittleLeaderModel.getSwallow();
			if(swallowMap == null) {
				swallowMap = new HashMap<Integer, Integer>();
				LittleLeaderModel.setSwallow(swallowMap);
			}
			Integer useNum = swallowMap.get(danyaoId);
			if(useNum == null) {
				useNum = 0;
			}
			if(useNum >= max) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 5, index, danyaoId, num);
				return;
			}
			
			int consumeNum = num;
			if(num+useNum > max) {
				consumeNum = max-useNum;
			}
			
			int itemId = struct_drug_200.getId();
			if(!UseAddUtil.canUse(hero, GameConst.TOOL, consumeNum, itemId)) {
				LittleLeaderSender.sendCmd_5138(hero.getId(), 4, index, itemId, num);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, consumeNum, itemId, SourceGoodConst.SWALLOW, true);
			swallowMap.put(danyaoId, useNum+consumeNum);
			
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.SWALLOW,SystemIdConst.LITTLE_LEADER);
			
			LittleLeaderSender.sendCmd_5138(hero.getId(), 1, index, danyaoId, useNum+consumeNum);
		} catch (Exception e) {
			LogTool.error(e, LittleLeaderManager.class, "swallowing has wrong");
		}
	}
	
	
}
