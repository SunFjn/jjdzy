package com.teamtop.system.battle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.json.JsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_changshu_101;
import excel.struct.Struct_NPC_200;

public class BattleFunction {
	
	private static Logger logger = LoggerFactory.getLogger(BattleFunction.class);
	
	
	public static FinalFightAttr initNPC(int npcid){
		FinalFightAttr battleAttr = new FinalFightAttr();
		Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(npcid);
		battleAttr.setHp(struct_NPC_200.getHp());
		battleAttr.setHpMax(struct_NPC_200.getHp());
		battleAttr.setAtt(struct_NPC_200.getAtt());
		battleAttr.setDef(struct_NPC_200.getDef());
		return battleAttr;
	}
	
	public static FinalFightAttr initHero(Hero hero){
		FinalFightAttr battleAttr = new BattleFightAttr();
		try {
			battleAttr=(FinalFightAttr) CloneUtils.deepClone(hero.getFinalFightAttr());
		} catch (Exception e) {
			LogTool.error(e, BattleFunction.class, "initFinalFightAttrHero haswrong ");
		}
		return battleAttr;
	}
	
	/**
	 * QMboss战斗
	 * 技能秒伤=武将品质基础秒伤/100000+武将品质升星秒伤/100000*星级
	 * 基础=max(A攻击*技能秒伤-D防御,A攻击*0.1)
               命中=(A命中-D闪避)/(A命中-D闪避+命中/闪避常数[20000])+A命中率/100000-D闪避率/100000
               暴击=[(A暴击-D抗暴)/(A暴击-D抗暴+暴击/抗暴常数[20000])+A暴击率/100000-D抗暴率/100000]*(0.5+A爆伤加成/100000-D爆伤减免/100000)
               秒伤=(基础*(1+命中)*(1+暴击)*(1+A伤害加成/100000-D伤害减免/100000)+A真实伤害+五行)/攻速常数[0.5]
               秒伤=基础*(1+命中)*(1+暴击)*(1+A伤害加成/100000-D伤害减免/100000)+A真实伤害   
              五行伤害=max（（A火焰伤害+A冰冻伤害+A爆炸伤害+A毒液伤害+A雷电伤害+A攻击*A五行伤害转化）-（D火焰抗性+D冰冻抗性+D爆炸抗性+D毒液抗性+D雷电抗性+D攻击*D五行抗性转化），0）
              
     少主技能秒伤=少主品质秒伤基础值/100000+少主品质秒伤提升值/100000*少主星级
              少主秒伤=max(A攻击-D防御,A攻击*0.1)*少主技能秒伤
           
              对角色秒伤=(基础秒伤*(1+Apvp 伤害-Dpvp 伤免)+五行)/攻速常数+少主秒伤
               对怪物秒伤=(基础秒伤*(1+Apve 伤害)+五行)/攻速常数 +少主秒伤      
	 * @param att
	 * @param target
	 * @return
	 */
	public static double calcDamg(FinalFightAttr fAtt, FinalFightAttr target, Object... tempAttr) {
		FinalFightAttr att = null;
		if (tempAttr != null && tempAttr.length > 0) {
			int[][] myTempAttr = (int[][]) tempAttr[0];
			FightAttr fightAttr = (FightAttr) tempAttr[1];
			if (fightAttr != null && myTempAttr != null && myTempAttr.length > 0) {
				att = BattleNewFunction.getIns().getTempFinalFightAttr(fightAttr, myTempAttr);
			}
		}
		if (att == null) {
			att = fAtt;
		}
		// 基础伤害
		Integer[] integers = BattleConst.skillHurt.get(att.getType());
		double skillHurt=Config_changshu_101.getIns().get(BattleConst.ATT_SECOND_HUNT_CONST).getNum()/100d;
		boolean ispve=true;
		double Apvp=att.getPvpAddHurt()/100000d;
		double Dpvp=att.getPvpMinuteHurt()/100000d;
		double Apve=att.getPveAddHurt()/100000d;
		if (target.getType()>0&&att.getType()>0) {
			//攻击方和目标都有武将品质 -pvp
			ispve=false;
		}
		if (integers!=null) {
			int baseAtt=Config_changshu_101.getIns().get(integers[0]).getNum();
			int starAtt=Config_changshu_101.getIns().get(integers[1]).getNum();
			skillHurt=baseAtt/100000d+starAtt/100000d*att.getStar();
		}
		double att1=att.getAtt()*skillHurt-target.getDef();
		double base=Math.max(att1,att.getAtt()*0.1);
		//命中率
		double hit=(att.getHit()-target.getEvade())/(att.getHit()-target.getEvade()+Config_changshu_101.getIns().get(BattleConst.HIT_EVADE_CONST).getNum()/100d)+att.getHitRate()/100000d-target.getEvadeRate()/100000d;
		hit = Math.max(hit, -0.5);
		//暴击率
		int a=att.getCritical()-target.getResistCrit();
		double b=att.getCriticalRate()/100000d-target.getResistCritRate()/100000d;
		//暴击伤害的倍数
		double x=0.5+att.getCriticalDamageAdd()/100000d-target.getCriticalDamageDerate()/100000d;
		if (x<0.2) {
			x=0.2;
		}else if (x>2) {
			x=2;
		}
		double y=a/(a+Config_changshu_101.getIns().get(BattleConst.CRIT_RESCRIT_CONST).getNum()/100d)+b;
		if (y<-0.6) {
			y=-0.6;
		}else if (y>0.6) {
			y=0.6;
		}
		//x y 限制暴击伤害和倍数的上下限
        double criticalRate=y*x;
        //double criticalRate=(a/(a+Config_changshu_101.getIns().get(BattleConst.CRIT_RESCRIT_CONST).getNum()/100d)+b)*(0.5+att.getCriticalDamageAdd()/100000d-target.getCriticalDamageDerate()/100000d);
        //五行伤害
        double wuxingAtt=att.getFireDamage()+att.getFrozenDamage()+att.getPoisonDamage()+att.getElectricDamage()+att.getBoomDamage();
		double wuxingDef=target.getFireRes()+target.getFrozenRes()+target.getPoisonRes()+target.getElectricRes()+target.getBoomRes();
	    double elementAddHurt=att.getAtt()*(att.getElementAddHurt()/100000d);
	    double elementMinuteHurt =target.getAtt()*(target.getElementMinuteHurt()/100000d);
		double wuxingDamage=Math.max(wuxingAtt+elementAddHurt-wuxingDef-elementMinuteHurt, 0);
		
		//秒伤=基础*(1+命中)*(1+暴击)*(1+A伤害加成/100000-D伤害减免/100000)+A真实伤害
		double miaoshang=base*(1+hit)*(1+criticalRate)*(1+att.getDamageAdd()/100000d-target.getDamageDerate()/100000d)+att.getDamage();
		double speedNum=Config_changshu_101.getIns().get(BattleConst.ATT_SPEED_CONST).getNum()/100d;
		double totaldamg = 0l;
		//少主秒伤计算
		//少主技能秒伤=少主品质秒伤基础值/100000+少主品质秒伤提升值/100000*技能等级
		double littleSkillMg=att.getLittleLeaderBase()/100000d+att.getLittleLeaderAdd()/100000d*att.getLittleLeaderStarLv();
		//少主秒伤=max(A攻击-D防御,A攻击*0.1)*少主技能秒伤
		double littleMg=Math.max(att.getAtt()-target.getDef(), att.getAtt()*0.1d)*littleSkillMg;
		
		if (ispve) {
			//对怪物秒伤=(基础秒伤*(1+Apve 伤害)+五行)/攻速常数 
			totaldamg=(miaoshang*(1+Apve)+wuxingDamage)/speedNum+littleMg;
		}else {
			// 对角色秒伤=(基础秒伤*(1+Apvp 伤害-Dpvp 伤免)+五行)/攻速常数
			totaldamg=(miaoshang*(1+Apvp-Dpvp)+wuxingDamage)/speedNum+littleMg;
		}
		//logger.info("基础伤害："+base+",命中率："+hit+",暴击率:"+criticalRate+",五行伤害:"+wuxingDamage+",总伤害:"+totaldamg);
		return totaldamg;
	}
	
	public static void setBattleCheckTime(Hero hero){
		hero.getBattleCheckMap().put(BattleConst.OTHER, TimeDateUtil.getCurrentTime());
	}
	/**
	 * 获取最厉害的npcid
	 * @param npcarr 二维数组的npc
	 * @param npcPos npcid位于那个索引
	 * @return
	 */
	public static int getMaxNpcid(int[][] npcarr,int npcPos){
		long maxstrength = 0;
		int maxNpcid = 0;
		for(int[] arr:npcarr){
			int npcid = arr[npcPos];
			Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(npcid);
			long zl = struct_NPC_200.getPower();
			if(maxstrength<=zl){
				maxstrength = zl;
				maxNpcid = npcid;
			}
		}
		return maxNpcid;
	}
	
	/**
	 * 验证关卡战斗(小怪)
	 * 
	 * @param hero
	 * @param npcid
	 * @return
	 */
	public static boolean checkWinGuanqia(Hero hero, int npcid, int ncpNum) {
		boolean checkWin = checkWin(hero, npcid, BattleConst.GUANQIA, ncpNum, false, true, null, false);
		Map<Integer, Integer> battleCheckMap = hero.getBattleCheckMap();
		if (battleCheckMap != null) {
			battleCheckMap.put(BattleConst.GUANQIA, TimeDateUtil.getCurrentTime());
		}
		return checkWin;
	}

	/**
	 * 验证其他战斗
	 * @param hero
	 * @param npcid
	 * @return
	 */
	public static boolean checkWinOther(Hero hero, int npcid, int ncpNum) {
		boolean checkWin = checkWin(hero, npcid, BattleConst.OTHER, ncpNum, false, true, null, false);
		hero.getBattleCheckMap().put(BattleConst.OTHER, TimeDateUtil.getCurrentTime());
		return checkWin;
	}

	/**
	 * 验证战斗（玩家会死亡）
	 * 
	 * @param hero
	 * @param npcid
	 * @param ncpNum
	 * @param fightType
	 * @return
	 */
	public static boolean checkWinHeroCanDead(Hero hero, int npcid, int ncpNum, int fightType, boolean justLiveTime, List<Long> curHp, boolean beforeBattle) {
		boolean checkWin = checkWin(hero, npcid, BattleConst.OTHER, ncpNum, true, justLiveTime, curHp, beforeBattle);
		hero.getBattleCheckMap().put(BattleConst.OTHER, TimeDateUtil.getCurrentTime());
		return checkWin;
	}

	/**
	 * 检测
	 * @param hero
	 * @param npcid
	 * @param sysid
	 * @param ncpNum
	 * @param canHeroDead 玩家是否会死
	 * @param curHp 玩家当前血量
	 * @param justLiveTime true 只检测时间
	 * @param beforeBattle true 战斗前
	 * @return
	 */
	public static boolean checkWin(Hero hero, int npcid, int sysid, int ncpNum, boolean canHeroDead,
			boolean justLiveTime, List<Long> curHp, boolean beforeBattle) {
		Map<Integer, Integer> battleCheckMap = hero.getBattleCheckMap();
		if (battleCheckMap == null) {
			return false;
		}
		Integer calctime = battleCheckMap.get(sysid);
		int now = TimeDateUtil.getCurrentTime();
		if (calctime == null) {
			calctime = now;
			hero.getBattleCheckMap().put(sysid, calctime);
		} else {
			calctime = now - calctime;
		}
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		double maxAttCrit = 0;
		double maxAtt = 0;
		double maxDef = 0;
		double totalHp = 0;
		int count = 0;

		count++;
		totalHp += finalFightAttr.getHpMax();
		if (curHp != null) {
			totalHp = curHp.get(0);
		}
		int critical = finalFightAttr.getCritical();
		if (maxAttCrit < critical) {
			maxAttCrit = critical;
		}
		long def = finalFightAttr.getDef();
		if (maxDef < def) {
			maxDef = def;
		}
		long att = finalFightAttr.getAtt();
		if (maxAtt < att) {
			maxAtt = att;
		}

		long secondDamage = getSecondDamage(finalFightAttr);

		Struct_NPC_200 npc = Config_NPC_200.getIns().get(npcid);

		long operateDamage = 0;
		if (sysid == BattleConst.GUANQIA) {
			operateDamage = hero.getOperateDamage();
		}

		double npctime = (npc.getHp() * ncpNum - operateDamage) / secondDamage;
		double npcDamage = Math.max(npc.getAtt() * ncpNum - maxDef, 1);
		double herotime = totalHp / npcDamage;

		if (!justLiveTime) {
			if (herotime >= npctime) {
				long nowHp = (long) (totalHp - npcDamage * calctime);
				curHp.set(0, nowHp < 0 ? 0 : nowHp);
				curHp.add((long) calctime);
				return true;
			}
		} else {
			if (!canHeroDead) {
				if (sysid == BattleConst.GUANQIA) {
					// 关卡打小怪直接胜利
					return true;
				}
				if (calctime >= npctime) {
					return true;
				}
			} else {
				if (herotime >= npctime) {
					if(!beforeBattle) {		
						if (calctime >= npctime) {
							return true;
						}
					}else {
						return true;
					}
				}
			}
		}
		LogTool.warn("check win false,hid:" + hero.getId() + ",name:" + hero.getNameZoneid() + " npc.getHP:"
				+ npc.getHp() + " maxAtt:" + maxAtt + " maxAttCrit:" + maxAttCrit + " count:" + count + " totalHp:"
				+ totalHp + " npc.getAtt:" + npc.getAtt() + " maxDef:" + maxDef + " npctime:" + npctime + " heroTime:"
				+ herotime + " calctime:" + calctime, BattleFunction.class);
		return false;
	}

	/**
	 * 验证关卡boss战斗
	 * 
	 * @param hero
	 * @param npcid
	 * @return 0:失败，1：成功，2：以前端结果为准
	 */
	public static int checkWinGuanqiaBoss(Hero hero, int npcid, double... npcPercent) {
		int result = checkWinByFight(hero, npcid, BattleConst.GUANQIA, npcPercent);
		Map<Integer, Integer> battleCheckMap = hero.getBattleCheckMap();
		if(battleCheckMap==null){
			battleCheckMap = new HashMap<Integer, Integer>();
			hero.setBattleCheckMap(battleCheckMap);
		}
		hero.getBattleCheckMap().put(BattleConst.GUANQIA, TimeDateUtil.getCurrentTime());
		return result;
	}

	/**
	 * 验证boss战斗
	 * 
	 * @param hero
	 * @param npcid
	 * @param battleType 战斗类型（非特殊都是 BattleBonst.Other）
	 * @return
	 */
	public static int checkWinBoss(Hero hero, int npcid, int battleType) {
		int result = checkWinByFight(hero, npcid, battleType);
		hero.getBattleCheckMap().put(battleType, TimeDateUtil.getCurrentTime());
		return result;
	}
	
	/**
	 * 验证玩家战斗
	 * @param hero
	 * @param enermy
	 * @param battleType 战斗类型（非特殊都是 BattleBonst.Other）
	 * @return
	 */
	public static int checkWinPlayer(Hero hero, Hero enermy, int battleType) {
		int result = checkWinByFight(hero, enermy, battleType);
		hero.getBattleCheckMap().put(battleType, TimeDateUtil.getCurrentTime());
		return result;
	}
	/**
	 * 乱世枭雄（跨服最强王者）战斗
	 * @param AttStrength
	 * @param enermyStrength
	 * @param battleType
	 * @return 0:失败，2：以前端结果为准
	 */
	public static int checkCrossKing(long totalStrength, long enermyStrength) {
		int result = 0;
		double ssConst = (double) Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Const).getNum() / 100;
		int ssValue = Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Value).getNum();
		long loseCheckStrength = (long) Math.min(totalStrength * (1 + (double) ssConst), totalStrength + ssValue);
		if (loseCheckStrength <enermyStrength ) {
			result = 0;
		} else {
			result = 2;
		}
		return result;
	}
	/**
	 * 验证玩家战斗
	 * 
	 * @param hero
	 * @param enermyStrength
	 * @param battleType 战斗类型（非特殊都是 BattleBonst.Other）
	 * @return
	 */
	public static int checkWinPlayer(Hero hero, long enermyStrength, int battleType) {
		int result = checkWinByFight(hero.getTotalStrength(), enermyStrength, battleType);
		hero.getBattleCheckMap().put(battleType, TimeDateUtil.getCurrentTime());
		return result;
	}

	/**
	 * 通过战力比较获得胜负
	 * 
	 * @param hero
	 * @param npcid
	 * @param sysid
	 * @return 0:失败，2：以前端结果为准
	 */
	public static int checkWinByFight(Hero hero, int npcid, int sysid, double... npcPercent) {
		int result = 0;
		long totalStrength = hero.getTotalStrength() + hero.getOperateTempStrength();
		Struct_NPC_200 npc = Config_NPC_200.getIns().get(npcid);
		long zl = npc.getPower();
		if(npcPercent!=null&&npcPercent.length>0) {
			zl = (long)((double)zl * npcPercent[0]);
		}
		double ssConst = (double) Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Const).getNum() / 100;
		int ssValue = Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Value).getNum();
		long loseCheckStrength = (long) Math.min(totalStrength * (1 + (double) ssConst), totalStrength + ssValue);
		if (loseCheckStrength < zl) {
			result = 0;
		} else {
			result = 2;
		}
		return result;
	}

	/**
	 * 通过战力比较获得胜负
	 * 
	 * @param hero
	 * @param npcid
	 * @param sysid
	 * @return 0:失败 2：以前端结果为准
	 */
	public static int checkWinByFight(Hero hero, Hero enermy, int sysid) {
		int result = 0;
		long enermytotalStrength = enermy.getTotalStrength() + enermy.getOperateTempStrength();
		long totalStrength=hero.getTotalStrength()+hero.getOperateTempStrength();
		double ssConst = (double) Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Const).getNum() / 100;
		int ssValue = Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Value).getNum();
		long loseCheckStrength = (long) Math.min(totalStrength * (1 + (double) ssConst), totalStrength + ssValue);
		if (loseCheckStrength < enermytotalStrength) {
			result = 0;
		} else {
			result = 2;
		}
		return result;
	}

	/**
	 * 通过战力比较获得胜负
	 * 
	 * @param hero
	 * @param npcid
	 * @param sysid
	 * @return 0:失败2：以前端结果为准
	 */
	public static int checkWinByFight(long myTotalStrength, long enermyStrength, int sysid) {
		int result = 0;
		double ssConst = (double) Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Const).getNum() / 100;
		int ssValue = Config_changshu_101.getIns().get(BattleConst.Strength_Suppress_Value).getNum();
		long loseCheckStrength = (long) Math.min(myTotalStrength * (1 + (double) ssConst), myTotalStrength + ssValue);
		if (loseCheckStrength < enermyStrength) {
			result = 0;
		} else {
			result = 2;
		}
		return result;
	}
	
	/**
	 * 跨服试炼-通过战力比较获得胜负
	 * 
	 * @param hero
	 * @param npcid
	 * @param sysid
	 * @return 0:失败2：以前端结果为准
	 */
	public static int checkWinByFightForCrossTrial(long myTotalStrength, long enermyStrength, int sysid) {
		int result = 0;
		double ssConst = (double) Config_changshu_101.getIns().get(BattleConst.CROSS_TRIAL_SSC).getNum() / 100;
		int ssValue = Config_changshu_101.getIns().get(BattleConst.CROSS_TRIAL_SSV).getNum();
		long loseCheckStrength = (long) Math.min(myTotalStrength * (1 + (double) ssConst), myTotalStrength + ssValue);
		if (loseCheckStrength < enermyStrength) {
			result = 0;
		} else {
			result = 2;
		}
		return result;
	}

	/**
	 * 打关卡小怪秒伤判断
	 * 
	 * @param finalFightAttr
	 * @return
	 */
	public static long getSecondDamage(FinalFightAttr finalFightAttr) {
		double attHuntConst = (double)Config_changshu_101.getIns().get(BattleConst.ATT_SECOND_HUNT_CONST).getNum()/100;//技能秒伤常数
		double critResCritConst = (double) Config_changshu_101.getIns().get(BattleConst.CRIT_RESCRIT_CONST).getNum()/ 100;// 暴击/抗暴常数
		double attSpeedGap = (double) Config_changshu_101.getIns().get(BattleConst.ATT_SPEED_CONST).getNum()/ 100;// 攻击间隔
		// 基础
		long baseHunt = (long)(finalFightAttr.getAtt()*attHuntConst)-finalFightAttr.getDef();
		int critical = finalFightAttr.getCritical();
		int criticalRate = finalFightAttr.getCriticalRate();
		int resistCritRate = finalFightAttr.getResistCritRate();
		int criticalDamageAdd = finalFightAttr.getCriticalDamageAdd();
		int criticalDamageDerate = finalFightAttr.getCriticalDamageDerate();
		// 暴击
		critical = (int) ((critical / (critical + critResCritConst) + criticalRate + resistCritRate)
				* (0.5 + criticalDamageAdd + criticalDamageDerate));
		// 五行
		int fiveElements = finalFightAttr.getFireDamage() + finalFightAttr.getFrozenDamage()
				+ finalFightAttr.getPoisonDamage() + finalFightAttr.getElectricDamage() + finalFightAttr.getBoomDamage()
				+ finalFightAttr.getFireRes() + finalFightAttr.getFrozenRes() + finalFightAttr.getPoisonRes()
				+ finalFightAttr.getElectricRes() + finalFightAttr.getBoomRes();
		//秒伤
		long secondDamage = (long) ((baseHunt * (1 + critical)
				* (1 + finalFightAttr.getDamageAdd() + finalFightAttr.getDamageDerate()) + finalFightAttr.getDamage()
				+ fiveElements) / attSpeedGap);
		return secondDamage;
	}

	public static String makeBattleHttpModel(Hero left, Hero right) {
		BattleHttpModel battleHttpModel = new BattleHttpModel();
		BattleHttpSide leftSide = makeHeroSide(left);
		BattleHttpSide rightSide = makeHeroSide(right);
		battleHttpModel.setLeft(leftSide);
		battleHttpModel.setRight(rightSide);
		int random = new Random().nextInt(1001);
		battleHttpModel.setRandomseed(random);
		String str = JsonUtils.toStr(battleHttpModel);
		return str;
	}

	/**
	 * 生产Http战斗数据模型
	 * @author lobbyer
	 * @param left
	 * @param right
	 * @param attr 额外属性<1/2,属性>
	 * @param hpMap 双方属性<1/2,<job,hp>>
	 * @return
	 * @date 2017年7月11日
	 */
	public static String makeBattleHttpModelWithExtraAttr(Hero left, Hero right,Map<Integer, int[][]> attr,Map<Integer, Map<Integer, Integer>> hpMap) {
		BattleHttpModel battleHttpModel = new BattleHttpModel();
		BattleHttpSide leftSide = makeHeroSide(left);
		BattleHttpSide rightSide = makeHeroSide(right);
		battleHttpModel.setLeft(leftSide);
		battleHttpModel.setRight(rightSide);
		if(attr.get(1) != null) {
			addAttr(leftSide, attr.get(1), null);
		}
		if(attr.get(2) != null) {
			addAttr(rightSide, attr.get(2), null);
		}
		if(hpMap != null) {
			addAttr(leftSide, null, hpMap.get(1));
			addAttr(rightSide, null, hpMap.get(2));
		}
		int random = new Random().nextInt(1001);
		battleHttpModel.setRandomseed(random);
		String str = JsonUtils.toStr(battleHttpModel);
		return str;
	}

	/**
	 * 设置额外属性添加
	 * @author lobbyer
	 * @param side
	 * @param extraAttr
	 * @param hpMap 当前气血值
	 * @date 2017年7月11日
	 */
	public static void addAttr(BattleHttpSide side,int[][] extraAttr,Map<Integer, Integer> hpMap) {
//		List<BattleHttpAttr> roleList = side.getRoleList();
//		for(BattleHttpAttr battleAttr:roleList) {
//			if(hpMap != null) {
//				Integer hp = hpMap.get(battleAttr.getJob());
//				if(hp != null) battleAttr.setHp(hp);
//			}
//			if(extraAttr != null && extraAttr.length > 0) {
//				for(int[] attr:extraAttr) {
//					int type = attr[0];
//					switch (type) {
//					case GameConst.PVP_DAMGREDU_EXT://PVP伤免 附加属性
//						battleAttr.setDmgReduce(battleAttr.getDmgReduce()+attr[1]);
//						break;
//					case GameConst.PVP_DAMGADD_EXT://PVP伤加 附加属性
//						battleAttr.setDmgAdd(battleAttr.getDmgAdd()+attr[1]);
//						break;
//					default:
//						break;
//					}
//				}
//			}
//		}
	}
	
	public static BattleHttpSide makeHeroSide(Hero hero){
		int sb = 0;
		BattleHttpSide model = new BattleHttpSide(hero.getId(), hero.getNameZoneid(), hero.getLevel(), sb, hero.getTotalStrength(), hero.getRebornlv());
		List<BattleHttpAttr> roleList = new ArrayList<BattleHttpAttr>();
		model.setRoleList(roleList);
		Map<Integer, int[]> skillMap = null;
		Map<Integer, int[]> skillAwakenMap = null;
		FinalFightAttr attr = hero.getFinalFightAttr();
		int sblv = 0;
		int[] is = skillMap.get(hero.getJob());
		int[] as = skillAwakenMap.get(hero.getJob());
		List<BattleHttpSkill> skillList = new ArrayList<BattleHttpSkill>();
		for(int i=0;i<is.length;i++){
			if(as!= null){
				skillList.add(new BattleHttpSkill(is[0], as[0]));
			}else{
				skillList.add(new BattleHttpSkill(is[0], 0));
			}
		}
		BattleHttpAttr battleHttpAttr = new BattleHttpAttr(attr.getUid(), hero.getJob(), sblv, attr.getHpMax(), 
				attr.getAtt(), attr.getDef(), attr.getCritical(), attr.getResistCrit(), attr.getHit(), 
				attr.getEvade(), attr.getDamage(), attr.getCriticalRate(), attr.getResistCritRate(), 
				attr.getHitRate(), attr.getEvadeRate(), attr.getCriticalDamageAdd(), attr.getCriticalDamageDerate(), 
				attr.getDamageAdd(), attr.getDamageDerate(), attr.getFireDamage(), attr.getFrozenDamage(), 
				attr.getPoisonDamage(), attr.getElectricDamage(), attr.getBoomDamage(), attr.getFireRes(), 
				attr.getFrozenRes(), attr.getPoisonRes(), attr.getElectricRes(), attr.getBoomRes(), 
				attr.getStrength(), skillList);
		roleList.add(battleHttpAttr);
		return model;
	}
	
	/**
	 * 生产PVEHttp战斗数据模型
	 * @param hero
	 * @param npcIds
	 * @param attr
	 * @param hpMap
	 */
	public static String makeBattleHttpModelPVE(Hero hero, List<Integer> npcIds, Map<Integer, int[][]> attr,Map<Integer, Map<Integer, Integer>> hpMap){
		BattlePVEHttpModel battleHttpModel = new BattlePVEHttpModel();
		BattleHttpSide player = makeHeroSide(hero);
		battleHttpModel.setPlayer(player);
		battleHttpModel.setNpcs(npcIds);
		if(attr.get(1) != null) {
			addAttr(player, attr.get(1), null);
		}
		if(hpMap != null) {
			addAttr(player, null, hpMap.get(1));
		}
		int random = new Random().nextInt(1001);
		battleHttpModel.setRandomseed(random);
		String str = JsonUtils.toStr(battleHttpModel);
		return str;
	}
	
	public static void main(String[] args) {
		int checkCrossKing = checkCrossKing(14000000, 24000000);
		System.err.println(checkCrossKing);
		/*
		StringBuilder http = new StringBuilder();
		http.append("http://192.168.7.84:3000?cmd=fight1v1&arg={\"randomseed\":100,\"left\":{\"name\":\"egret02\",\"id\":1000100000000089,\"lev");
		http.append("el\":160,\"zs\":4,\"sb\":0,\"roleList\":[{\"id\":1000100000000103,\"sblv\":0,\"skillList\":[{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0}],\"job\":1,\"att\":6414,\"dizz\":0,\"hp\":35128,\"pDef\":3257,\"mD");
		http.append("ef\":3262,\"cirt\":0,\"cirtDmg\":0,\"dizzTime\":0,\"antiDizz\":0,\"str\":182956,\"mp\":80000,\"resCrit\":0,\"dmgAdd\":0,\"dmgReduce\":0,\"pvpDmgAdd\":500,\"pvpDmgReduce\":800,\"ms\":200},{\"id\":1000100000000108,\"sblv\":0,\"skillList\":[{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jx");
		http.append("lv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0}],\"job\":2,\"att\":6414,\"dizz\":0,\"hp\":35128,\"pDef\":3257,\"mDef\":3262,\"cirt\":0,\"cirtDmg\":0,\"dizzTime\":0,\"antiDizz\":0,\"str\":183346,\"mp\":80000,\"resCrit\":0,\"dmgAdd\":0,\"dmgReduce\":0,\"pvpD");
		http.append("mgAdd\":500,\"pvpDmgReduce\":800,\"ms\":200},{\"id\":1000100000000109,\"sblv\":0,\"skillList\":[{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0}],\"job\":3,\"att\":6414,\"dizz\":0,\"hp\":35128,\"pDef\":3257,\"mDef\":3262,\"ci");
		http.append("rt\":0,\"cirtDmg\":0,\"dizzTime\":0,\"antiDizz\":0,\"str\":183346,\"mp\":80000,\"resCrit\":0,\"dmgAdd\":0,\"dmgReduce\":0,\"pvpDmgAdd\":500,\"pvpDmgReduce\":800,\"ms\":200}],\"str\":549648},\"right\":{\"name\":\"egret2\",\"id\":1000100000000002,\"level\":110,\"zs\":5,\"sb\":1,\"role");
		http.append("List\":[{\"id\":1000100000000057,\"sblv\":0,\"skillList\":[{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0}],\"job\":1,\"att\":89667,\"dizz\":1000,\"hp\":456260,\"pDef\":40070,\"mDef\":40100,\"cirt\":0,\"cirtDmg\":0,\"dizz");
		http.append("Time\":2000,\"antiDizz\":1200,\"str\":862094,\"mp\":55000,\"resCrit\":0,\"dmgAdd\":0,\"dmgReduce\":1000,\"pvpDmgAdd\":0,\"pvpDmgReduce\":0,\"ms\":200},{\"id\":1000100000000001,\"sblv\":1,\"skillList\":[{\"lv\":15,\"jxlv\":0},{\"lv\":15,\"jxlv\":0},{\"lv\":15,\"jxlv\":0},{\"lv\":15,\"jx");
		http.append("lv\":0},{\"lv\":15,\"jxlv\":0}],\"job\":2,\"att\":129072,\"dizz\":1000,\"hp\":676683,\"pDef\":62907,\"mDef\":63766,\"cirt\":0,\"cirtDmg\":0,\"dizzTime\":2000,\"antiDizz\":1200,\"str\":1207330,\"mp\":55000,\"resC");
		http.append("rit\":0,\"dmgAdd\":0,\"dmgReduce\":1000,\"pvpDmgAdd\":0,\"pvpDmgReduce\":0,\"ms\":200},{\"id\":1000100000000058,\"sblv\":0,\"skillList\":[{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0},{\"lv\":1,\"jxlv\":0}],\"job\":3,\"att\":93605,\"di");
		http.append("zz\":1000,\"hp\":468499,\"pDef\":41715,\"mDef\":40156,\"cirt\":0,\"cirtDmg\":0,\"dizzTime\":2000,\"antiDizz\":1200,\"str\":886144,\"mp\":55000,\"resCrit\":0,\"dmgAdd\":0,\"dmgReduce\":1000,\"pvpDmgAdd\":0,\"pvpDmgReduce\":0,\"ms\":200}],\"str\":2955568}}");
		System.err.println(System.currentTimeMillis());
		String string = "http://122.152.210.131:5001?cmd=fight1v1&arg={\"randomseed\":102,\"left\":{\"id\":1000,\"name\":\"abc\",\"level\":82,\"sb\":101,\"str\":12355,\"zs\":2,\"roleList\":[{\"id\":1001,\"job\":1,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":1002,\"job\":2,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":1003,\"job\":3,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]}]},\"right\":{\"id\":2000,\"name\":\"abc\",\"level\":82,\"sb\":101,\"str\":12355,\"zs\":2,\"roleList\":[{\"id\":2001,\"job\":1,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":2002,\"job\":2,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]},{\"id\":2003,\"job\":3,\"sblv\":3,\"hp\":10000,\"mp\":3000,\"att\":3000,\"pDef\":1500,\"mDef\":1400,\"crit\":1000,\"resCrit\":500,\"critDmg\":999,\"dmgAdd\":100,\"dmgReduce\":50,\"pvpDmgAdd\":40,\"pvpDmgReduce\":20,\"dizz\":1000,\"dizzTime\":1000,\"antiDizz\":400,\"ms\":200,\"str\":2222,\"skillList\":[{\"lv\":50,\"jxlv\":1},{\"lv\":60,\"jxlv\":2},{\"lv\":70,\"jxlv\":3},{\"lv\":80,\"jxlv\":2},{\"lv\":90,\"jxlv\":1}]}]}}";
		String connect = HttpUtil.connectGet(string);
		try {
			System.err.println(System.currentTimeMillis());
			//HashMap<String, Object> datas= JsonUtils.toMap(connect, String.class, Object.class);
			connect = connect.replace("{", "").replace("}", "").replace("\"", "");
			String[] splits = connect.split(",");
			HashMap<String, Object> data = new HashMap<String, Object>();
			for(String str:splits) {
				String[] value = str.split(":");
				data.put(value[0], value[1]);
				
			}
			System.err.println(System.currentTimeMillis());
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		System.err.println(connect);*/
	}
}
