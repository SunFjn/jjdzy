package com.teamtop.system.hero;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.main.RunServerException;
import com.teamtop.system.achievement.AchievementFightEvent;
import com.teamtop.system.archive.ArchiveFightEvent;
import com.teamtop.system.bingfa.BingFaFightEvent;
import com.teamtop.system.chuangGuanYouLi.ChuangGuanYouLiFunction;
import com.teamtop.system.collectTreasury.CollectTreasuryConst;
import com.teamtop.system.collectTreasury.CollectTreasuryFunction;
import com.teamtop.system.country.CountryFunction;
import com.teamtop.system.country.fightNorthAndSouth.FightNSFunction;
import com.teamtop.system.country.kingship.KingShipFunction;
import com.teamtop.system.countrySkill.CountrySkillFightEvent;
import com.teamtop.system.destiny.DestinyFightEvent;
import com.teamtop.system.equip.EquipFightEvent;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.excalibur.ExcaliburFightEvent;
import com.teamtop.system.forge.ForgeFightEvent;
import com.teamtop.system.generalSoul.GeneralSoulFightEvent;
import com.teamtop.system.godWeapon.GodWeaponFightEvent;
import com.teamtop.system.godbook.GodBookFightEvent;
import com.teamtop.system.house.houseKeeper.HouseKeeperFightEvent;
import com.teamtop.system.house.maid.MaidFightEvent;
import com.teamtop.system.house.yard.HouseFightEvent;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderConst;
import com.teamtop.system.littleLeader.LittleLeaderFightEvent;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.monsterSpirit.MonsterSpiritFightEvent;
import com.teamtop.system.mount.MountFightEvent;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetConst;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetFunction;
import com.teamtop.system.qice.QiCeFightEvent;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.reincarnation.ReincarnationFightEvent;
import com.teamtop.system.reincarnationGodfate.ReincarnationGodFateFightEvent;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.system.shaozhuEscort.ShaoZhuEscortFunction;
import com.teamtop.system.sixWay.SixWayFightEvent;
import com.teamtop.system.skill.GodSkillFightEvent;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.smelt.SmeltFightEvent;
import com.teamtop.system.specialAnimalDir.SpecialAnimalDirFightEvent;
import com.teamtop.system.specialTreasure.SpeTreasureFightEvent;
import com.teamtop.system.starPicture.StarPictureFightEvent;
import com.teamtop.system.title.TitleFigntEvent;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.system.treasure.TreasureFightEvent;
import com.teamtop.system.wujiang.WuJiangFightEvent;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.system.zhanjia.ZhanJiaFightEvent;
import com.teamtop.system.zhenYan.ZhenYanFightEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_changshu_101;
import excel.config.Config_hero_211;
import excel.config.Config_son_267;
import excel.struct.Struct_changshu_101;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_son_267;


/**
 * ????????????
 * @author Administrator
 *
 */
public class FightCalcFunction extends AbsServerEvent{
	private static final Logger logger = LoggerFactory.getLogger(FightCalcFunction.class);
	/**
	 * ??????????????????????????????????????????
	 */
	public static IFightAttrEvent[] calcHeroEvents = null;
	/**
	 * ??????id->??????????????????
	 */
	public static Map<Integer,IFightAttrEvent> calcHeroEventMaps=new HashMap<>();
	/**
	 * ??????????????????????????????????????????????????? key:pf value:??????????????????
	 */
	public static Map<String, IFightAttrEvent[]> pf_calcHeroEvents = new HashMap<String, IFightAttrEvent[]>();
	/**
	 * ???????????????????????????
	 * @param hero
	 * @param reason FightCalcConst
	 */
	public static void setRecalcAll(Hero hero, int reason,int sysid){
		if(hero==null) return;
	
		//???????????????????????????
		triggerCalcHeroEvent(hero,sysid);
		long totalStrength = 0;
		Grow grow = HeroCache.getGrow();
		if(hero.getFightAttr()!=null){
			StringBuffer sb = new StringBuffer();
			sb.append(GameConst.s);
			FinalFightAttr finalAttr = hero.getFinalFightAttr();
			FinalFightAttr newFinalAttr = new FinalFightAttr();
			newFinalAttr.setUid(finalAttr.getUid());
			int type=hero.getJob();
			if (hero.getJob()>1000) {
				type=type/1000;
			}
			//??????
			Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(type);
			newFinalAttr.setType(struct_hero_211.getPinzhi());
			WuJiangModel wuJiangModel = hero.getWujiang().getWujiangs().get(type);
			newFinalAttr.setStar(wuJiangModel.getStar());
			//??????
			LittleLeader littleLeader=hero.getLittleLeader();
			int baseNum=0;
			int baseAddNum=0;
			if (littleLeader!=null) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(littleLeader.getWearType());
				if (littleLeaderModel!=null) {
					Struct_son_267 struct_son_267 = Config_son_267.getIns().get(littleLeaderModel.getIndex());
					switch (struct_son_267.getPz()) {
					case 2:
						//???????????????????????????
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_2).getNum();
						//???????????????????????????
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_2).getNum();
						break;
					case 3:
						//???????????????????????????
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_3).getNum();
						//???????????????????????????
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_3).getNum();
						break;
					case 4:
						//???????????????????????????
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_4).getNum();
						//???????????????????????????
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_4).getNum();
						break;
					case 5:
						//???????????????????????????
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_5).getNum();
						//???????????????????????????
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_5).getNum();
						break;
					case 6:
						//???????????????????????????
						baseNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASE_6).getNum();
						//???????????????????????????
						baseAddNum = Config_changshu_101.getIns().get(LittleLeaderConst.BASEADD_6).getNum();
						break;	
					default:
						break;
					}
					//????????????
					newFinalAttr.setLittleLeaderSkillLv(littleLeaderModel.getActivityKillLv());
					newFinalAttr.setLittleLeaderStarLv(littleLeaderModel.getStar());
					newFinalAttr.setLittleLeaderBase(baseNum);
					newFinalAttr.setLittleLeaderAdd(baseAddNum);
				}else {
					//??????????????????
					newFinalAttr.setLittleLeaderSkillLv(0);
					newFinalAttr.setLittleLeaderStarLv(0);
					newFinalAttr.setLittleLeaderBase(baseNum);
					newFinalAttr.setLittleLeaderAdd(baseAddNum);
				}
				
			}
			calcFinalAttr(newFinalAttr,hero.getFightAttr(), grow,hero.getLevel());
			//??????????????????
			int skillStrength=SkillFunction.getIns().getThreeSkillStr(hero);
			newFinalAttr.setStrength(newFinalAttr.getStrength()+skillStrength);
			//????????????????????????
			int littleStr=SkillFunction.getIns().getLittleLeaderKillStr(hero);
			newFinalAttr.setStrength(newFinalAttr.getStrength()+littleStr);
			
			hero.setFinalFightAttr(newFinalAttr);
			hero.setSelfStrength(newFinalAttr.getStrength());
			
			totalStrength += newFinalAttr.getStrength();
			compareChg(sb, finalAttr, newFinalAttr);
			long oldtotalStrength = hero.getTotalStrength();
			hero.setTotalStrength(totalStrength);
			//????????????
			String pfCode=hero.getLoginPf();
			String useSys="";
			if (hero.getTempData()!=null&&hero.getTempData().getAccount()!=null) {
				useSys=hero.getTempData().getAccount().getUsesys();
			}
			FlowHeroEvent.addStrengthFlow(hero.getId(), hero.getLevel(), hero.getRebornlv(), oldtotalStrength,
					totalStrength, reason, pfCode, useSys, hero.getZoneid(), hero.getReincarnationLevel());
			if(oldtotalStrength!=totalStrength){
				RankingFunction.getIns().refreshStrengthRankList(hero);
				CountryFunction.getIns().refreshCountryStrengthMap(hero,1);
				CollectTreasuryFunction.getIns().refreshCTAwardState(hero, CollectTreasuryConst.STRENGTH_COLLECTTREASURY);
				KingShipFunction.getIns().refreshKingShipModelMap(hero,0);
				TitleFunction.getIns().strengthAddTitle(hero, totalStrength);
				//????????????
				//LoginReportEvent.addTypeReport(hero, TXReportConst.set_achievement, "",0,100065);
				//???????????????
				SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_TOTLSTR);
				//????????????
				SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_9);
				//???????????????
				B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
				RankingFunction.getIns().refreshGodOfWarRankList(hero);//?????????????????????
				// ????????????????????????
				FightNSFunction.getIns().refreshRandomMap(hero);
				//????????????
				ChuangGuanYouLiFunction.getIns().checkRed(hero, 2);
				// ????????????-???????????? ????????????  ????????????
				ShaoZhuSevenDayTargetFunction.getIns().updateHandle(hero, new int[] {ShaoZhuSevenDayTargetConst.SHAOZHU_STRENGTH});
				// ????????????
				ShaoZhuEscortFunction.getIns().escortAddCacheHandle(hero, 0, reason == FightCalcConst.LOGIN);
			}
			if(reason !=FightCalcConst.LOGIN){
				HeroSender.sendCmd_120(hero.getId(), sb.toString());
			}
			
		}
	}
	private static void compareChg(StringBuffer sb,FinalFightAttr attr,FinalFightAttr newattr){
		//sb.append(GameConst.y).append(attr.getType()).append(GameConst.y).append(GameConst.m).append(GameConst.s);
		if(attr.getAtt()!=newattr.getAtt()){
			sb.append(GameConst.y).append(FightAttrConst.ATT).append(GameConst.y).append(GameConst.m).append(newattr.getAtt()).append(GameConst.d);
		}
		if(attr.getDef()!=newattr.getDef()){
			sb.append(GameConst.y).append(FightAttrConst.DEF).append(GameConst.y).append(GameConst.m).append(newattr.getDef()).append(GameConst.d);
		}
		if(attr.getHpMax()!=newattr.getHpMax()){
			sb.append(GameConst.y).append(FightAttrConst.HP).append(GameConst.y).append(GameConst.m).append(newattr.getHpMax()).append(GameConst.d);
		}
		if(attr.getCritical()!=newattr.getCritical()){
			sb.append(GameConst.y).append(FightAttrConst.CRIT).append(GameConst.y).append(GameConst.m).append(newattr.getCritical()).append(GameConst.d);
		}
		if(attr.getResistCrit()!=newattr.getResistCrit()){
			sb.append(GameConst.y).append(FightAttrConst.RESCRIT).append(GameConst.y).append(GameConst.m).append(newattr.getResistCrit()).append(GameConst.d);
		}
		if(attr.getHit()!=newattr.getHit()){
			sb.append(GameConst.y).append(FightAttrConst.HIT).append(GameConst.y).append(GameConst.m).append(newattr.getHit()).append(GameConst.d);
		}
		if(attr.getEvade()!=newattr.getEvade()){
			sb.append(GameConst.y).append(FightAttrConst.EVADE).append(GameConst.y).append(GameConst.m).append(newattr.getEvade()).append(GameConst.d);
		}
		if(attr.getDamage()!=newattr.getDamage()){
			sb.append(GameConst.y).append(FightAttrConst.DAMAGE).append(GameConst.y).append(GameConst.m).append(newattr.getDamage()).append(GameConst.d);
		}
		if(attr.getCriticalRate()!=newattr.getCriticalRate()){
			sb.append(GameConst.y).append(FightAttrConst.CRITRATE).append(GameConst.y).append(GameConst.m).append(newattr.getCriticalRate()).append(GameConst.d);
		}
		if(attr.getResistCritRate()!=newattr.getResistCritRate()){
			sb.append(GameConst.y).append(FightAttrConst.RESCRITRATE).append(GameConst.y).append(GameConst.m).append(newattr.getResistCritRate()).append(GameConst.d);
		}
		if(attr.getHitRate()!=newattr.getHitRate()){
			sb.append(GameConst.y).append(FightAttrConst.HITRATE).append(GameConst.y).append(GameConst.m).append(newattr.getHitRate()).append(GameConst.d);
		}
		if(attr.getEvadeRate()!=newattr.getEvadeRate()){
			sb.append(GameConst.y).append(FightAttrConst.EVADERATE).append(GameConst.y).append(GameConst.m).append(newattr.getEvadeRate()).append(GameConst.d);
		}
		if(attr.getCriticalDamageAdd()!=newattr.getCriticalDamageAdd()){
			sb.append(GameConst.y).append(FightAttrConst.CRITDMGADD).append(GameConst.y).append(GameConst.m).append(newattr.getCriticalDamageAdd()).append(GameConst.d);
		}
		if(attr.getCriticalDamageDerate()!=newattr.getCriticalDamageDerate()){
			sb.append(GameConst.y).append(FightAttrConst.CRITDMGDET).append(GameConst.y).append(GameConst.m).append(newattr.getCriticalDamageDerate()).append(GameConst.d);
		}
		if(attr.getDamageAdd()!=newattr.getDamageAdd()){
			sb.append(GameConst.y).append(FightAttrConst.DAMAGEADD).append(GameConst.y).append(GameConst.m).append(newattr.getDamageAdd()).append(GameConst.d);
		}
		if(attr.getDamageDerate()!=newattr.getDamageDerate()){
			sb.append(GameConst.y).append(FightAttrConst.DAMAGEDET).append(GameConst.y).append(GameConst.m).append(newattr.getDamageDerate()).append(GameConst.d);
		}
		if(attr.getFireDamage()!=newattr.getFireDamage()){
			sb.append(GameConst.y).append(FightAttrConst.FIREDMG).append(GameConst.y).append(GameConst.m).append(newattr.getFireDamage()).append(GameConst.d);
		}
		if(attr.getFrozenDamage()!=newattr.getFrozenDamage()){
			sb.append(GameConst.y).append(FightAttrConst.FROZENDMG).append(GameConst.y).append(GameConst.m).append(newattr.getFrozenDamage()).append(GameConst.d);
		}
		if(attr.getPoisonDamage()!=newattr.getPoisonDamage()){
			sb.append(GameConst.y).append(FightAttrConst.POISONDMG).append(GameConst.y).append(GameConst.m).append(newattr.getPoisonDamage()).append(GameConst.d);
		}
		if(attr.getElectricDamage()!=newattr.getElectricDamage()){
			sb.append(GameConst.y).append(FightAttrConst.ELECTRICDMG).append(GameConst.y).append(GameConst.m).append(newattr.getElectricDamage()).append(GameConst.d);
		}
		if(attr.getBoomDamage()!=newattr.getBoomDamage()){
			sb.append(GameConst.y).append(FightAttrConst.BOOMDMG).append(GameConst.y).append(GameConst.m).append(newattr.getBoomDamage()).append(GameConst.d);
		}
		if(attr.getFireRes()!=newattr.getFireRes()){
			sb.append(GameConst.y).append(FightAttrConst.FIRERES).append(GameConst.y).append(GameConst.m).append(newattr.getFireRes()).append(GameConst.d);
		}
		if(attr.getFrozenRes()!=newattr.getFrozenRes()){
			sb.append(GameConst.y).append(FightAttrConst.FROZENRES).append(GameConst.y).append(GameConst.m).append(newattr.getFrozenRes()).append(GameConst.d);
		}
		if(attr.getPoisonRes()!=newattr.getPoisonRes()){
			sb.append(GameConst.y).append(FightAttrConst.POISERES).append(GameConst.y).append(GameConst.m).append(newattr.getPoisonRes()).append(GameConst.d);
		}
		if(attr.getElectricRes()!=newattr.getElectricRes()){
			sb.append(GameConst.y).append(FightAttrConst.ELECTRICRES).append(GameConst.y).append(GameConst.m).append(newattr.getElectricRes()).append(GameConst.d);
		}
		if(attr.getBoomRes()!=newattr.getBoomRes()){
			sb.append(GameConst.y).append(FightAttrConst.BOOMRES).append(GameConst.y).append(GameConst.m).append(newattr.getBoomRes()).append(GameConst.d);
		}
		if (attr.getStar()!=newattr.getStar()) {
			sb.append(GameConst.y).append(FightAttrConst.star).append(GameConst.y).append(GameConst.m).append(newattr.getStar()).append(GameConst.d);
		}
		if (attr.getPvpAddHurt()!=newattr.getPvpAddHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.pvpAddHurt).append(GameConst.y).append(GameConst.m).append(newattr.getPvpAddHurt()).append(GameConst.d);
		}
		if (attr.getPvpMinuteHurt()!=newattr.getPvpMinuteHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.pvpMinuteHurt).append(GameConst.y).append(GameConst.m).append(newattr.getPvpMinuteHurt()).append(GameConst.d);
		}
		if (attr.getPveAddHurt()!=newattr.getPveAddHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.pveAddHurt).append(GameConst.y).append(GameConst.m).append(newattr.getPveAddHurt()).append(GameConst.d);
		}
		
		if (attr.getElementAddHurt()!=newattr.getElementAddHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.elementAddHurt).append(GameConst.y).append(GameConst.m).append(newattr.getElementAddHurt()).append(GameConst.d);
		}
		if (attr.getElementMinuteHurt()!=newattr.getElementMinuteHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.elementMinuteHurt).append(GameConst.y).append(GameConst.m).append(newattr.getElementMinuteHurt()).append(GameConst.d);
		}
		
		if (attr.getHudunAdd()!=newattr.getHudunAdd()) {
			sb.append(GameConst.y).append(FightAttrConst.hudunAdd).append(GameConst.y).append(GameConst.m).append(newattr.getHudunAdd()).append(GameConst.d);
		}
		if (attr.getHpHurt()!=newattr.getHpHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.hphurt).append(GameConst.y).append(GameConst.m).append(newattr.getHpHurt()).append(GameConst.d);
		}
		if (attr.getPveMinuteHurt()!=newattr.getPveMinuteHurt()) {
			sb.append(GameConst.y).append(FightAttrConst.pveMinuteHurt).append(GameConst.y).append(GameConst.m).append(newattr.getPveMinuteHurt()).append(GameConst.d);
		}
		if (attr.getAttBackAnger()!=newattr.getAttBackAnger()) {
			sb.append(GameConst.y).append(FightAttrConst.attBackAnger).append(GameConst.y).append(GameConst.m).append(newattr.getAttBackAnger()).append(GameConst.d);
		}
		if (attr.getCdCutDown()!=newattr.getCdCutDown()) {
			sb.append(GameConst.y).append(FightAttrConst.cdCutDown).append(GameConst.y).append(GameConst.m).append(newattr.getCdCutDown()).append(GameConst.d);
		}
		if (attr.getCureEffect()!=newattr.getCureEffect()) {
			sb.append(GameConst.y).append(FightAttrConst.cureEffect).append(GameConst.y).append(GameConst.m).append(newattr.getPveMinuteHurt()).append(GameConst.d);
		}
		if (attr.getBeControlTimeCutDown()!=newattr.getBeControlTimeCutDown()) {
			sb.append(GameConst.y).append(FightAttrConst.beControlTimeCutDown).append(GameConst.y).append(GameConst.m).append(newattr.getBeControlTimeCutDown()).append(GameConst.d);
		}
		if (attr.getLowerCureEffect()!=newattr.getLowerCureEffect()) {
			sb.append(GameConst.y).append(FightAttrConst.lowerCureEffect).append(GameConst.y).append(GameConst.m).append(newattr.getLowerCureEffect()).append(GameConst.d);
		}
		if (attr.getSzAttDamageAdd()!=newattr.getSzAttDamageAdd()) {
			sb.append(GameConst.y).append(FightAttrConst.szAttDamageAdd).append(GameConst.y).append(GameConst.m).append(newattr.getSzAttDamageAdd()).append(GameConst.d);
		}
		if (attr.getAttDamageAdd()!=newattr.getAttDamageAdd()) {
			sb.append(GameConst.y).append(FightAttrConst.attDamageAdd).append(GameConst.y).append(GameConst.m).append(newattr.getAttDamageAdd()).append(GameConst.d);
		}
		if (attr.getLowerDamage()!=newattr.getLowerDamage()) {
			sb.append(GameConst.y).append(FightAttrConst.lowerDamage).append(GameConst.y).append(GameConst.m).append(newattr.getLowerDamage()).append(GameConst.d);
		}
		if (attr.getExtDamage()!=newattr.getExtDamage()) {
			sb.append(GameConst.y).append(FightAttrConst.extDamage).append(GameConst.y).append(GameConst.m).append(newattr.getExtDamage()).append(GameConst.d);
		}
		sb.append(GameConst.y).append(GameConst.strength).append(GameConst.y).append(GameConst.m).append(newattr.getStrength());
		sb.append(GameConst.e);
	}
	/**
	 * ??????finalAttr
	 * @param attr
	 * @param grow
	 */
	public static void calcFinalAttr(FinalFightAttr finalAttr,FightAttr attr,Grow grow,int lv){
		finalAttr.setHpMax(baseFightCalcLong(0, attr.getHpMaxExt(), attr.getHpMaxAdd()));
		finalAttr.setAtt(baseFightCalc(0, attr.getAttExt(), attr.getAttAdd()));
		finalAttr.setDef(baseFightCalc(0, attr.getDefExt(), attr.getDefAdd()));
		finalAttr.setCritical(baseFightCalc(0, attr.getCriticalExt(), attr.getCriticalAdd()));
		finalAttr.setResistCrit(baseFightCalc(0, attr.getResistCritExt(), attr.getResistCritAdd()));
		finalAttr.setHit(baseFightCalc(0, attr.getHitExt(), attr.getHitAdd()));
		finalAttr.setEvade(baseFightCalc(0, attr.getEvadeExt(), attr.getEvadeAdd()));
		finalAttr.setDamage(baseFightCalc(0, attr.getDamageExt(), attr.getDamageAdd()));
		finalAttr.setCriticalRate(baseFightCalc(0, attr.getCritRateExt(), attr.getCritRateAdd()));
		finalAttr.setResistCritRate(baseFightCalc(0, attr.getResCritRateExt(), attr.getResCritRateAdd()));
		finalAttr.setHitRate(baseFightCalc(0, attr.getHitRateExt(), attr.getHitRateAdd()));
		finalAttr.setEvadeRate(baseFightCalc(0, attr.getEvadeRateExt(), attr.getEvadeRateAdd()));		
		finalAttr.setCriticalDamageAdd(baseFightCalc(0, attr.getCritDmgAddExt(), attr.getCritDmgAddAdd()));		
		finalAttr.setCriticalDamageDerate(baseFightCalc(0, attr.getCritDmgDetExt(), attr.getCritDmgDetAdd()));		
		finalAttr.setDamageAdd(baseFightCalc(0, attr.getDmgAddExt(), attr.getDmgAdditionAdd()));
		finalAttr.setDamageDerate(baseFightCalc(0, attr.getDmgDetExt(), attr.getDmgDetAdd()));
		finalAttr.setFireDamage(baseFightCalc(0, attr.getFireDmgExt(), attr.getFireDmgAdd()));
		finalAttr.setFrozenDamage(baseFightCalc(0, attr.getFrozenDmgExt(), attr.getFrozenDmgAdd()));
		finalAttr.setPoisonDamage(baseFightCalc(0, attr.getPoisonDmgExt(), attr.getPoisonDmgAdd()));
		finalAttr.setElectricDamage(baseFightCalc(0, attr.getElectricDmgExt(), attr.getElectricDmgAdd()));
		finalAttr.setBoomDamage(baseFightCalc(0, attr.getBoomDmgExt(), attr.getBoomDmgAdd()));
		finalAttr.setFireRes(baseFightCalc(0, attr.getFireResExt(), attr.getFireResAdd()));
		finalAttr.setFrozenRes(baseFightCalc(0, attr.getFrozenResExt(), attr.getFrozenResAdd()));
		finalAttr.setPoisonRes(baseFightCalc(0, attr.getPoisonResExt(), attr.getPoisonResAdd()));
		finalAttr.setElectricRes(baseFightCalc(0, attr.getElectricResExt(), attr.getElectricResAdd()));
		finalAttr.setBoomRes(baseFightCalc(0, attr.getBoomResExt(), attr.getBoomResAdd()));
		
		finalAttr.setPvpAddHurt(baseFightCalc(0,attr.getPvpAddHurt(),attr.getPvpAddHurtadd()));
		finalAttr.setPvpMinuteHurt(baseFightCalc(0,attr.getPvpMinuteHurt(), attr.getPvpMinuteHurtadd()));
		finalAttr.setPveAddHurt(baseFightCalc(0,attr.getPveAddHurt(), attr.getPveAddHurtadd()));
		
		finalAttr.setElementAddHurt(baseFightCalc(0,attr.getElementAddHurt(),attr.getElementAddHurtadd()));
		finalAttr.setElementMinuteHurt(baseFightCalc(0,attr.getElementMinuteHurt(),attr.getElementMinuteHurtadd()));
		
		finalAttr.setHudunAdd(baseFightCalc(0,attr.getHudunext(),attr.getHudunadd()));
		finalAttr.setHpHurt(baseFightCalc(0,attr.getHphurtext(),attr.getHphurtextadd()));
		
		finalAttr.setPveMinuteHurt(baseFightCalc(0,attr.getPveMinuteHurt(), attr.getPveMinuteHurtadd()));
		
		finalAttr.setAttBackAnger(baseFightCalc(0,attr.getAttBackAnger(), attr.getAttBackAngeradd()));
		finalAttr.setCdCutDown(baseFightCalc(0,attr.getCdCutDown(), attr.getCdCutDownadd()));
		finalAttr.setCureEffect(baseFightCalc(0,attr.getCureEffect(), attr.getCureEffectadd()));
		finalAttr.setBeControlTimeCutDown(baseFightCalc(0,attr.getBeControlTimeCutDown(), attr.getBeControlTimeCutDownadd()));
		
		finalAttr.setLowerDamage(baseFightCalc(0, attr.getLowerDamage(), attr.getLowerDamageadd()));
		finalAttr.setLowerCureEffect(baseFightCalc(0, attr.getLowerCureEffect(), attr.getLowerCureEffectadd()));
		finalAttr.setSzAttDamageAdd(baseFightCalc(0, attr.getSzAttDamageAdd(), attr.getSzAttDamageAddadd()));
		finalAttr.setAttDamageAdd(baseFightCalc(0, attr.getAttDamageAdd(), attr.getAttDamageAddadd()));

		finalAttr.setExtDamage(baseFightCalc(0, attr.getExtDamage(), attr.getExtDamageAdd()));

		finalAttr.setAppendStrength(attr.getAppendStrength());
		calcStrength(finalAttr);
	}
	/**
	 * ??????????????????
	 * @param attr
	 * @param grow
	 */
	public static void calcEquipAttr(FinalFightAttr finalAttr,FightAttr attr,int lv){
		finalAttr.setHpMax(baseFightCalcLong(0, attr.getHpMaxExt(), attr.getHpMaxAdd()));
		finalAttr.setAtt(baseFightCalc(0, attr.getAttExt(), attr.getAttAdd()));
		finalAttr.setDef(baseFightCalc(0, attr.getDefExt(), attr.getDefAdd()));
		finalAttr.setCritical(baseFightCalc(0, attr.getCriticalExt(), attr.getCriticalAdd()));
		finalAttr.setResistCrit(baseFightCalc(0, attr.getResistCritExt(), attr.getResistCritAdd()));
		finalAttr.setHit(baseFightCalc(0, attr.getHitExt(), attr.getHitAdd()));
		finalAttr.setEvade(baseFightCalc(0, attr.getEvadeExt(), attr.getEvadeAdd()));
		finalAttr.setDamage(baseFightCalc(0, attr.getDamageExt(), attr.getDamageAdd()));
		finalAttr.setCriticalRate(baseFightCalc(0, attr.getCritRateExt(), attr.getCritRateAdd()));
		finalAttr.setResistCritRate(baseFightCalc(0, attr.getResCritRateExt(), attr.getResCritRateAdd()));
		finalAttr.setHitRate(baseFightCalc(0, attr.getHitRateExt(), attr.getHitRateAdd()));
		finalAttr.setEvadeRate(baseFightCalc(0, attr.getEvadeRateExt(), attr.getEvadeRateAdd()));		
		finalAttr.setCriticalDamageAdd(baseFightCalc(0, attr.getCritDmgAddExt(), attr.getCritDmgAddAdd()));		
		finalAttr.setCriticalDamageDerate(baseFightCalc(0, attr.getCritDmgDetExt(), attr.getCritDmgDetAdd()));		
		finalAttr.setDamageAdd(baseFightCalc(0, attr.getDmgAddExt(), attr.getDmgAdditionAdd()));
		finalAttr.setDamageDerate(baseFightCalc(0, attr.getDmgDetExt(), attr.getDmgDetAdd()));
		finalAttr.setFireDamage(baseFightCalc(0, attr.getFireDmgExt(), attr.getFireDmgAdd()));
		finalAttr.setFrozenDamage(baseFightCalc(0, attr.getFrozenDmgExt(), attr.getFrozenDmgAdd()));
		finalAttr.setPoisonDamage(baseFightCalc(0, attr.getPoisonDmgExt(), attr.getPoisonDmgAdd()));
		finalAttr.setElectricDamage(baseFightCalc(0, attr.getElectricDmgExt(), attr.getElectricDmgAdd()));
		finalAttr.setBoomDamage(baseFightCalc(0, attr.getBoomDmgExt(), attr.getBoomDmgAdd()));
		finalAttr.setFireRes(baseFightCalc(0, attr.getFireResExt(), attr.getFireResAdd()));
		finalAttr.setFrozenRes(baseFightCalc(0, attr.getFrozenResExt(), attr.getFrozenResAdd()));
		finalAttr.setPoisonRes(baseFightCalc(0, attr.getPoisonResExt(), attr.getPoisonResAdd()));
		finalAttr.setElectricRes(baseFightCalc(0, attr.getElectricResExt(), attr.getElectricResAdd()));
		finalAttr.setBoomRes(baseFightCalc(0, attr.getBoomResExt(), attr.getBoomResAdd()));
		
		finalAttr.setPvpAddHurt(baseFightCalc(0,attr.getPvpAddHurt(),attr.getPvpAddHurtadd()));
		finalAttr.setPvpMinuteHurt(baseFightCalc(0,attr.getPvpMinuteHurt(), attr.getPvpMinuteHurtadd()));
		finalAttr.setPveAddHurt(baseFightCalc(0,attr.getPveAddHurt(), attr.getPveAddHurtadd()));
		
		finalAttr.setElementAddHurt(baseFightCalc(0,attr.getElementAddHurt(),attr.getElementAddHurtadd()));
		finalAttr.setElementMinuteHurt(baseFightCalc(0,attr.getElementMinuteHurt(),attr.getElementMinuteHurtadd()));
		
		finalAttr.setHudunAdd(baseFightCalc(0,attr.getHudunext(),attr.getHudunadd()));
		finalAttr.setHpHurt(baseFightCalc(0,attr.getHphurtext(),attr.getHphurtextadd()));
		
		finalAttr.setPveMinuteHurt(baseFightCalc(0,attr.getPveMinuteHurt(), attr.getPveMinuteHurtadd()));
		
		finalAttr.setAttBackAnger(baseFightCalc(0,attr.getAttBackAnger(), attr.getAttBackAngeradd()));
		finalAttr.setCdCutDown(baseFightCalc(0,attr.getCdCutDown(), attr.getCdCutDownadd()));
		finalAttr.setCureEffect(baseFightCalc(0,attr.getCureEffect(), attr.getCureEffectadd()));
		finalAttr.setBeControlTimeCutDown(baseFightCalc(0,attr.getBeControlTimeCutDown(), attr.getBeControlTimeCutDownadd()));
		
		finalAttr.setLowerDamage(baseFightCalc(0, attr.getLowerDamage(), attr.getLowerDamageadd()));
		finalAttr.setLowerCureEffect(baseFightCalc(0, attr.getLowerCureEffect(), attr.getLowerCureEffectadd()));
		finalAttr.setSzAttDamageAdd(baseFightCalc(0, attr.getSzAttDamageAdd(), attr.getSzAttDamageAddadd()));
		finalAttr.setAttDamageAdd(baseFightCalc(0, attr.getAttDamageAdd(), attr.getAttDamageAddadd()));

		finalAttr.setExtDamage(baseFightCalc(0, attr.getExtDamage(), attr.getExtDamageAdd()));

		finalAttr.setAppendStrength(attr.getAppendStrength());
		calcStrength(finalAttr);
	}
	/**
	 * ??????????????????
	 * @param baseValue ?????????
	 * @param ext ????????????
	 * @param add ???????????????
	 * @return
	 */
	private static int baseFightCalc(int baseValue, float ext, float add) {
		/**
		 * ???????????????=???????????????+?????????????????????*???1+????????????%???
		 */
		float result = (baseValue +ext) * (1 + add / 100000);
		int attFinalValue = (int) Math.ceil(result);
		if (attFinalValue < 0) {
			attFinalValue = 0;
		}
		return attFinalValue;
	}
	
	/**
	 * ??????????????????
	 * @param baseValue ?????????
	 * @param ext ????????????
	 * @param add ???????????????
	 * @return
	 */
	private static long baseFightCalcLong(int baseValue, double ext, float add) {
		/**
		 * ???????????????=???????????????+?????????????????????*???1+????????????%???
		 */
		double result = (baseValue +ext) * (1 + add / 100000);
		long attFinalValue = (long) Math.ceil(result);
		if (attFinalValue < 0) {
			attFinalValue = 0;
		}
		return attFinalValue;
	}
	/**
	 * ???????????? ??????*??????????????????+??????*??????????????????+??????+????????????*????????????????????????+????????????
	 * @param attr
	 */
	private static void calcStrength(FinalFightAttr attr){
		double rs = attr.getHpMax()*getAttrCalcValue(FightCalcAttrConst.hp)+attr.getAtt()*getAttrCalcValue(FightCalcAttrConst.att)
				+attr.getDef()*getAttrCalcValue(FightCalcAttrConst.def)+attr.getCritical()*getAttrCalcValue(FightCalcAttrConst.crit)
				+attr.getResistCrit()*getAttrCalcValue(FightCalcAttrConst.resistCrit)+attr.getHit()*getAttrCalcValue(FightCalcAttrConst.hit)
				+attr.getEvade()*getAttrCalcValue(FightCalcAttrConst.evade)+attr.getDamage()*getAttrCalcValue(FightCalcAttrConst.damage)
				+attr.getCriticalRate()*getAttrCalcValue(FightCalcAttrConst.criticalRate)+attr.getResistCritRate()*getAttrCalcValue(FightCalcAttrConst.resCritRate)
				+attr.getHitRate()*getAttrCalcValue(FightCalcAttrConst.hitRate)+attr.getEvadeRate()*getAttrCalcValue(FightCalcAttrConst.evadeRate)
				+attr.getCriticalDamageAdd()*getAttrCalcValue(FightCalcAttrConst.critDmgAdd)+attr.getCriticalDamageDerate()*getAttrCalcValue(FightCalcAttrConst.critDmgDet)
				+attr.getDamageAdd()*getAttrCalcValue(FightCalcAttrConst.damageAdd)+attr.getDamageDerate()*getAttrCalcValue(FightCalcAttrConst.damageDet)
				+attr.getFireDamage()*getAttrCalcValue(FightCalcAttrConst.fireDamage)+attr.getFrozenDamage()*getAttrCalcValue(FightCalcAttrConst.frozenDamgae)
				+attr.getPoisonDamage()*getAttrCalcValue(FightCalcAttrConst.poisonDamage)+attr.getElectricDamage()*getAttrCalcValue(FightCalcAttrConst.electricDamage)
				+attr.getBoomDamage()*getAttrCalcValue(FightCalcAttrConst.boomDamage)+attr.getFireRes()*getAttrCalcValue(FightCalcAttrConst.fireRes)
				+attr.getFrozenRes()*getAttrCalcValue(FightCalcAttrConst.frozenRes)+attr.getPoisonRes()*getAttrCalcValue(FightCalcAttrConst.poisonRes)
				+attr.getElectricRes()*getAttrCalcValue(FightCalcAttrConst.electricRes)+attr.getBoomRes()*getAttrCalcValue(FightCalcAttrConst.boomRes)
				+attr.getAppendStrength()*getAttrCalcValue(FightCalcAttrConst.appendStrength);
		long strength = (long) Math.ceil(rs);
		attr.setStrength(strength);
	}
	
	/**????????????????????????????????????????????????*/
	public static double getAttrCalcValue(int attrKey) {
		double value = 0;
		Struct_changshu_101 struct = Config_changshu_101.getIns().get(attrKey);
		if(struct!=null) {			
			value = struct.getNum()/100d;
		}
		return value;
	}
	
	/**
	 * 
	 * @param hero
	 * @param allAttrs 
	 * 
	 */
	/**
	 * ????????????????????????????????????
	 * @param hero
	 * @param allAttrs
	 * @param sysid 0?????????????????? >0??????????????????????????????
	 */
	public static void triggerCalcHeroEvent(Hero hero,int sysid) {
		if (calcHeroEventMaps!=null) {
			if (sysid==0) {
				for (int key:calcHeroEventMaps.keySet()) {
					IFightAttrEvent event=calcHeroEventMaps.get(key);
					try {
						if (event != null) {
							long[][] totalAttr=event.calcHero(hero,hero.getFightAttr());
							if (totalAttr!=null) {
								hero.getFightAttrBySysid().put(key, totalAttr);
							}
						}
					} catch (Exception e) {
						LogTool.error(e, FightCalcFunction.class, hero.getId(), hero.getNameZoneid(), event.getClass().getSimpleName() + "triggerCalcHeroEvent exception");
					}
				}
			}else {
				if (calcHeroEventMaps.containsKey(sysid)) {
					IFightAttrEvent event=calcHeroEventMaps.get(sysid);
					Map<Integer, long[][]> fightAttrMap = hero.getFightAttrBySysid();
					if(fightAttrMap!=null) {
						long[][] partAttr = fightAttrMap.get(sysid);
						if (partAttr!=null) {
							// ?????????????????????
							FightCalcFunction.MinusFightValue(partAttr, hero.getFightAttr());
						}
						long[][] totalAttr=event.calcHero(hero,hero.getFightAttr());
						if (totalAttr!=null) {
							hero.getFightAttrBySysid().put(sysid, totalAttr);
						}else {
							hero.getFightAttrBySysid().remove(sysid);
						}
					}else {
						LogTool.warn("triggerCalcHeroEvent fightAttrMap is null.hid:"+hero.getId()+" sysid:"+sysid, FightCalcFunction.class);
					}
				}else {
					LogTool.warn("triggerCalcHeroEvent has wrong sysid"+sysid, FightCalcFunction.class);
				}
			}
		}
	}
	
	/**
	 * ??????????????????
	 * @param attributes ????????????int[][]???????????????????????????????????????excel????????????????????????[????????????ID,??????????????????]
	 * @param fightAttribute
	 * @param calcPotentail ??????????????????
	 */
	public static void setFightValue(long[][] attributes, FightAttr fightAttribute){
		if(fightAttribute == null){
			logger.error("hero set fight attribute value fail cause of FightAttr is null!");
			return;
		}
		if(attributes == null){
			logger.warn("hero set fight attribute value fail cause of attributes array is null!");
			return;
		}
		for(long[] attribute : attributes){
			setFightValue((int)attribute[0], attribute[1], fightAttribute,true);
		}
	}
	/**
	 * ??????????????????
	 * @param attributes ????????????int[][]???????????????????????????????????????excel????????????????????????[????????????ID,??????????????????]
	 * @param fightAttribute
	 * @param calcPotentail ??????????????????
	 */
	public static void setFightValue(int[][] attributes, FightAttr fightAttribute){
		if(fightAttribute == null){
			logger.error("hero set fight attribute value fail cause of FightAttr is null!");
			return;
		}
		if(attributes == null){
			logger.warn("hero set fight attribute value fail cause of attributes array is null!");
			return;
		}
		for(int[] attribute : attributes){
			setFightValue(attribute[0], attribute[1], fightAttribute,true);
		}
	}
	/**
	 * ????????????
	 * @param attributes ????????????int[][]???????????????????????????????????????excel????????????????????????[????????????ID,??????????????????]
	 * @param fightAttribute
	 * @param calcPotentail ??????????????????
	 */
	public static void MinusFightValue(long[][] attributes, FightAttr fightAttribute){
		if(fightAttribute == null){
			logger.error("hero set fight attribute value fail cause of FightAttr is null!");
			return;
		}
		if(attributes == null){
			logger.warn("hero set fight attribute value fail cause of attributes array is null!");
			return;
		}
		for(long[] attribute : attributes){
			setFightValue((int)attribute[0], attribute[1]*-1, fightAttribute,false);
		}
	}
	/**
	 * ??????????????????
	 * @param attributes ????????????int[][]???????????????????????????????????????excel????????????????????????[????????????ID,??????????????????]
	 * @param fightAttribute
	 * @param multiple ????????????
	 */
	public static void setFightValue(int[][] attributes, FightAttr fightAttribute, float multiple){
		if(fightAttribute == null){
			logger.error("hero set fight attribute value fail cause of FightAttr is null!");
			return;
		}
		if(attributes == null){
			logger.warn("hero set fight attribute value fail cause of attributes array is null!");
			return;
		}
		for(int[] attribute : attributes){
			setFightValue(attribute[0], attribute[1] * multiple, fightAttribute,true);
		}
	}
	/**
	 *  ??????????????????
	 * @param attributeNum
	 * @param addValue
	 * @param fightAttribute
	 * @param isadd ???????????? ture????????????  false????????????
	 */
	public static void setFightValue(int attributeNum, double addValue, FightAttr fightAttribute,boolean isadd) {
		if(fightAttribute == null){
			logger.error("hero set fight attribute value fail cause of FightAttr is null!");
			return;
		}
		if (addValue<0&&isadd) {
			//logger.warn(" hero set fight attribute value fail case of  paramter is vildate,hid:"+fightAttribute.getHid()+",gid:"+fightAttribute.getGid()+",attributeNum=" + attributeNum + ",value=" + value);
			return;
		}
		if (attributeNum == 0||addValue==0) {
			return;
		}
		float value = 0;
		if (attributeNum != GameConst.HP_EXT) {
			value = (float) addValue;
		}
		float finalValue = 0;
		try {
			switch(attributeNum) {
			case GameConst.ATT_EXT://?????? ????????????
				finalValue = fightAttribute.getAttExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setAttExt(finalValue);
				break;
			case GameConst.DEF_EXT://?????? ????????????
				finalValue = fightAttribute.getDefExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDefExt( finalValue);
				break;
			case GameConst.HP_EXT://???????????? ?????????
				double hpValue = fightAttribute.getHpMaxExt() + addValue;
				if (hpValue < 0){
					hpValue = 0;
				}
				fightAttribute.setHpMaxExt(hpValue);
				break;
			case GameConst.CRIT_EXT://?????? ????????????
				finalValue = fightAttribute.getCriticalExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCriticalExt( finalValue);
				break;
			case GameConst.RESCRIT_EXT://?????? ????????????resistCritExt
				finalValue = fightAttribute.getResistCritExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setResistCritExt( finalValue);
				break;
			case GameConst.HIT_EXT://?????? ????????????
				finalValue = fightAttribute.getHitExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHitExt( finalValue);
				break;
			case GameConst.EVADE_EXT://?????? ????????????
				finalValue = fightAttribute.getEvadeExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setEvadeExt( finalValue);
				break;
			case GameConst.DAMAGE_EXT://???????????? ????????????
				finalValue = fightAttribute.getDamageExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDamageExt( finalValue);
				break;
			case GameConst.CRITRATE_EXT://????????? ????????????
				finalValue = fightAttribute.getCritRateExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCritRateExt( finalValue);
				break;
			case GameConst.RESCRITRATE_EXT://????????? ????????????
				finalValue = fightAttribute.getResCritRateExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setResCritRateExt( finalValue);
				break;
			case GameConst.HITRATE_EXT://????????? ????????????
				finalValue = fightAttribute.getHitRateExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHitRateExt( finalValue);
				break;
			case GameConst.EVADERATE_EXT://????????? ????????????
				finalValue = fightAttribute.getEvadeRateExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setEvadeRateExt( finalValue);
				break;
			case GameConst.CRITDMGADD_EXT://???????????? ????????????
				finalValue = fightAttribute.getCritDmgAddExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCritDmgAddExt( finalValue);
				break;
			case GameConst.CRITDMGDET_EXT://???????????? ????????????
				finalValue = fightAttribute.getCritDmgDetExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCritDmgDetExt( finalValue);
				break;
			case GameConst.DAMAGEADD_EXT://???????????? ????????????
				finalValue = fightAttribute.getDmgAddExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDmgAddExt( finalValue);
				break;
			case GameConst.DAMAGEDET_EXT://???????????? ????????????
				finalValue = fightAttribute.getDmgDetExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDmgDetExt( finalValue);
				break;
			case GameConst.FIREDMG_EXT://???????????? ????????????
				finalValue = fightAttribute.getFireDmgExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFireDmgExt( finalValue);
				break;
			case GameConst.FROZENDMG_EXT://???????????? ????????????
				finalValue = fightAttribute.getFrozenDmgExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFrozenDmgExt( finalValue);
				break;
			case GameConst.POISONDMG_EXT://???????????? ????????????
				finalValue = fightAttribute.getPoisonDmgExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPoisonDmgExt( finalValue);
				break;
			case GameConst.ELECTRICDMG_EXT://???????????? ????????????
				finalValue = fightAttribute.getElectricDmgExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setElectricDmgExt( finalValue);
				break;
			case GameConst.BOOMDMG_EXT://???????????? ????????????
				finalValue = fightAttribute.getBoomDmgExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setBoomDmgExt( finalValue);
				break;
			case GameConst.FIRERES_EXT://???????????? ????????????
				finalValue = fightAttribute.getFireResExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFireResExt( finalValue);
				break;
			case GameConst.FROZENRES_EXT://???????????? ????????????
				finalValue = fightAttribute.getFrozenResExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFrozenResExt( finalValue);
				break;
			case GameConst.POISERES_EXT://???????????? ????????????
				finalValue = fightAttribute.getPoisonResExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPoisonResExt( finalValue);
				break;
			case GameConst.ELECTRICRES_EXT://???????????? ????????????
				finalValue = fightAttribute.getElectricResExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setElectricResExt( finalValue);
				break;
			case GameConst.BOOMRES_EXT://???????????? ????????????
				finalValue = fightAttribute.getBoomResExt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setBoomResExt( finalValue);
				break;
			case GameConst.HP_ADD://???????????? ???????????????
				finalValue = fightAttribute.getHpMaxAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHpMaxAdd( finalValue);
				break;
			case GameConst.ATT_ADD://?????? ???????????????
				finalValue = fightAttribute.getAttAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setAttAdd( finalValue);
				break;
			case GameConst.DEF_ADD://?????? ???????????????
				finalValue = fightAttribute.getDefAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDefAdd( finalValue);
				break;
			case GameConst.CRIT_ADD://?????? ???????????????
				finalValue = fightAttribute.getCriticalAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCriticalAdd( finalValue);
				break;
			case GameConst.RESCRIT_ADD://?????? ???????????????
				finalValue = fightAttribute.getHpMaxAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHpMaxAdd( finalValue);
				break;
			case GameConst.HIT_ADD://?????? ???????????????
				finalValue = fightAttribute.getHpMaxAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHpMaxAdd( finalValue);
				break;
			case GameConst.EVADE_ADD://?????? ???????????????
				finalValue = fightAttribute.getHpMaxAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHpMaxAdd( finalValue);
				break;
			case GameConst.DAMAGE_ADD://???????????? ???????????????
				finalValue = fightAttribute.getDamageAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDamageAdd( finalValue);
				break;
			case GameConst.CRITRATE_ADD://????????? ???????????????
				finalValue = fightAttribute.getCritRateAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCritRateAdd( finalValue);
				break;
			case GameConst.RESCRITRATE_ADD://????????? ???????????????
				finalValue = fightAttribute.getResCritRateAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setResCritRateAdd( finalValue);
				break;
			case GameConst.HITRATE_ADD://????????? ???????????????
				finalValue = fightAttribute.getHitRateAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHitRateAdd( finalValue);
				break;
			case GameConst.EVADERATE_ADD://????????? ???????????????
				finalValue = fightAttribute.getEvadeRateAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setEvadeRateAdd( finalValue);
				break;
			case GameConst.CRITDMGADD_ADD://???????????? ???????????????
				finalValue = fightAttribute.getCritDmgAddAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCritDmgAddAdd( finalValue);
				break;
			case GameConst.CRITDMGDET_ADD://???????????? ???????????????
				finalValue = fightAttribute.getCritDmgDetAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCritDmgDetAdd( finalValue);
				break;
			case GameConst.DAMAGEADD_ADD://???????????? ???????????????
				finalValue = fightAttribute.getDmgAdditionAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDmgAdditionAdd( finalValue);
				break;
			case GameConst.DAMAGEDET_ADD://???????????? ???????????????
				finalValue = fightAttribute.getDmgDetAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setDmgDetAdd( finalValue);
				break;
			case GameConst.FIREDMG_ADD://???????????? ???????????????
				finalValue = fightAttribute.getFireDmgAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFireDmgAdd( finalValue);
				break;
			case GameConst.FROZENDMG_ADD://???????????? ???????????????
				finalValue = fightAttribute.getFrozenDmgAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFrozenDmgAdd( finalValue);
				break;
			case GameConst.POISONDMG_ADD://???????????? ???????????????
				finalValue = fightAttribute.getPoisonDmgAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPoisonDmgAdd( finalValue);
				break;
			case GameConst.ELECTRICDMG_ADD://???????????? ???????????????
				finalValue = fightAttribute.getElectricDmgAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setElectricDmgAdd( finalValue);
				break;
			case GameConst.BOOMDMG_ADD://???????????? ???????????????
				finalValue = fightAttribute.getBoomDmgAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setBoomDmgAdd( finalValue);
				break;
			case GameConst.FIRERES_ADD://???????????? ???????????????
				finalValue = fightAttribute.getFireResAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFireResAdd( finalValue);
				break;
			case GameConst.FROZENRES_ADD://???????????? ???????????????
				finalValue = fightAttribute.getFrozenResAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setFrozenResAdd( finalValue);
				break;
			case GameConst.POISERES_ADD://???????????? ???????????????
				finalValue = fightAttribute.getPoisonResAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPoisonResAdd( finalValue);
				break;
			case GameConst.ELECTRICRES_ADD://???????????? ???????????????
				finalValue = fightAttribute.getElectricResAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setElectricResAdd( finalValue);
				break;
			case GameConst.BOOMRES_ADD://???????????? ???????????????
				finalValue = fightAttribute.getBoomResAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setBoomResAdd( finalValue);
				break;
			case GameConst.PVPHURT_ADD://PVP????????????
				finalValue = fightAttribute.getPvpAddHurt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPvpAddHurt(finalValue);
				break;
			case GameConst.PVP_MINUE://PVP????????????
				finalValue = fightAttribute.getPvpMinuteHurt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPvpMinuteHurt(finalValue);
				break;
			case GameConst.PVE_ADD://PVE????????????
				finalValue = fightAttribute.getPveAddHurt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPveAddHurt(finalValue);
				break;
			case FightAttrConst.elementAddHurt://??????????????????
				finalValue = fightAttribute.getElectricDmgAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setElementAddHurt(finalValue);
				break;
			case FightAttrConst.elementMinuteHurt://??????????????????
				finalValue = fightAttribute.getElementMinuteHurt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setElementMinuteHurt(finalValue);
				break;
			case FightAttrConst.hudunAdd://??????
				finalValue = fightAttribute.getHudunext() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHudunext(finalValue);
				break;	
			case FightAttrConst.hphurt://????????????
				finalValue = fightAttribute.getHphurtext() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setHphurtext(finalValue);
				break;
			case FightAttrConst.pveMinuteHurt://PVE????????????
				finalValue = fightAttribute.getPveMinuteHurt() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setPveMinuteHurt(finalValue);
				break;
			case FightAttrConst.attBackAnger://????????????????????????
				finalValue = fightAttribute.getAttBackAnger() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setAttBackAnger(finalValue);
				break;
			case FightAttrConst.cdCutDown://???????????????CD????????????
				finalValue = fightAttribute.getCdCutDown() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCdCutDown(finalValue);
				break;
			case FightAttrConst.cureEffect://????????????????????????
				finalValue = fightAttribute.getCureEffect() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setCureEffect(finalValue);
				break;
			case FightAttrConst.beControlTimeCutDown://??????????????????
				finalValue = fightAttribute.getBeControlTimeCutDown() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setBeControlTimeCutDown(finalValue);
				break;
			case FightAttrConst.lowerDamage://????????????????????????????????????
				finalValue = fightAttribute.getLowerDamage() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setLowerDamage(finalValue);
				break;
			case FightAttrConst.lowerCureEffect://????????????????????????
				finalValue = fightAttribute.getLowerCureEffect() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setLowerCureEffect(finalValue);
				break;
			case FightAttrConst.szAttDamageAdd://?????????????????????????????????
				finalValue = fightAttribute.getSzAttDamageAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setSzAttDamageAdd(finalValue);
				break;
			case FightAttrConst.attDamageAdd://???????????????????????????
				finalValue = fightAttribute.getAttDamageAdd() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setAttDamageAdd(finalValue);
				break;
			case FightAttrConst.extDamage:// ??????????????????
				finalValue = fightAttribute.getExtDamage() + value;
				if (finalValue < 0) {
					finalValue = 0;
				}
				fightAttribute.setExtDamage(finalValue);
				break;
			case FightAttrConst.appendStrength://????????????
				finalValue = fightAttribute.getAppendStrength() + value;
				if (finalValue < 0){
					finalValue = 0;
				}
				fightAttribute.setAppendStrength((int)finalValue);
				break;	
			}
		} catch (Exception e) {
			logger.error("hid:"+fightAttribute+ ",setFightValue error:", e);
		}
	}
	List<IFightAttrEvent> list = new ArrayList<IFightAttrEvent>();
	@Override
	public void startServer() throws RunServerException {
		initEvent();
		calcHeroEvents = new IFightAttrEvent[list.size()];
		list.toArray(calcHeroEvents);
	}
	
	
	
	/**
	 * ?????????????????????
	 */
	private void initEvent(){
		//??????????????????
		calcHeroEventMaps.put(SystemIdConst.WUJIANG_SYSID, new WuJiangFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.SMELT_SYSID, new SmeltFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.EQUIP_SYSID, new EquipFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.FOGER_SYSID, new ForgeFightEvent());//????????????
		calcHeroEventMaps.put(SystemIdConst.TITLE_SYSID, new TitleFigntEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.MonsterSpirit_SYSID, new MonsterSpiritFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.Archive_SYSID, new ArchiveFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.StarPicture_SYSID, new StarPictureFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.zhanjia_SYSID, new ZhanJiaFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.BingFa_SYSID, new BingFaFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.Treasure_SYSID, new TreasureFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.Excalibur_SYSID, new ExcaliburFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.SpeTreasure_SYSID, new SpeTreasureFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.GodBook_SYSID, new GodBookFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.HeroFight_SYSID, new HeroFightAttrEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.GeneralSoul_SYSID, new GeneralSoulFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.GodSkill_SYSID, new GodSkillFightEvent());//????????????
		calcHeroEventMaps.put(SystemIdConst.DESTINY_SYSID, new DestinyFightEvent());//?????????
		calcHeroEventMaps.put(SystemIdConst.LITTLE_LEADER, new LittleLeaderFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.COUNTRYSKILL_SYSID, new CountrySkillFightEvent());//????????????
		calcHeroEventMaps.put(SystemIdConst.GODWEAPONSYSID,new GodWeaponFightEvent());//????????????
		calcHeroEventMaps.put(SystemIdConst.SPECIALANIMALDIR, new SpecialAnimalDirFightEvent());// ?????????
		calcHeroEventMaps.put(SystemIdConst.REINCARNATION, new ReincarnationFightEvent());//????????????
		calcHeroEventMaps.put(SystemIdConst.QICE, new QiCeFightEvent());// ????????????
		calcHeroEventMaps.put(SystemIdConst.ZHEN_YAN, new ZhenYanFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.ACHIEVEMENT, new AchievementFightEvent());// ????????????
		calcHeroEventMaps.put(SystemIdConst.REINCARNATION_GODFATE, new ReincarnationGodFateFightEvent());// ??????-??????
		calcHeroEventMaps.put(SystemIdConst.MOUNT, new MountFightEvent());//??????
		calcHeroEventMaps.put(SystemIdConst.YARD, new HouseFightEvent());// ????????????
		calcHeroEventMaps.put(SystemIdConst.MAID, new MaidFightEvent());// ??????
		calcHeroEventMaps.put(SystemIdConst.HOUSEKEEPER, new HouseKeeperFightEvent());// ??????
		calcHeroEventMaps.put(SystemIdConst.SIXWAY, new SixWayFightEvent());//??????
	}
}
