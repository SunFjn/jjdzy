package com.teamtop.system.gm.event;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.events.bsh.BshFunction;
import com.teamtop.houtaiHttp.events.kickOutHero.KickOutHeroIO;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.battleVixens.BattleVixensFunction;
import com.teamtop.system.boss.countryBoss.CountryBossFunction;
import com.teamtop.system.boss.monsterGod.MonsterGodSysCache;
import com.teamtop.system.cdkey.CDkeyFunction;
import com.teamtop.system.country.fightNorthAndSouth.FightNSFunction;
import com.teamtop.system.country.fightNorthAndSouth.FightNSManager;
import com.teamtop.system.country.fightNorthAndSouth.FightNSSender;
import com.teamtop.system.country.fightNorthAndSouth.FightNSSysCache;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSModel;
import com.teamtop.system.country.model.CountryData;
//import com.teamtop.system.country.unifyThreeCountry.UnifyCountryFunction;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.crossHeroesList.HeroesListFunction;
import com.teamtop.system.crossKing.local.CrossKingLocalFunction;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingEvent;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingManager;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenManager;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.crossTrial.CrossTrialFunction;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaCrossFunction;
import com.teamtop.system.crossWenDingTianXia.cross.CrossWenDingTianXiaLocalToCross;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXia;
import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaScoreRank;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.gm.AbsGMEvent;
import com.teamtop.system.gm.GMConst;
import com.teamtop.system.gm.GMSender;
import com.teamtop.system.godOfWar.GodOfWarManager;
import com.teamtop.system.godOfWar.model.GodOfWar;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.huoShaoChiBi.HuoShaoChiBiFunction;
import com.teamtop.system.liuChuQiShan.LiuChuQiShanFunction;
import com.teamtop.system.lvBuRising.LvBuRisingFunction;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.warOrderActive.WarOrderActiveFunction;
import com.teamtop.system.peacockFloor.PeacockFunction;
import com.teamtop.system.restrictedAccess.RestrictedAccessUtil;
import com.teamtop.system.runningMan.RunningManFuntion;
import com.teamtop.system.smelt.SmeltFunction;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.threeHeroFightLvBu.ThreeHeroFightLvBuFunction;
import com.teamtop.system.tigerPass.TigerPassFunction;
import com.teamtop.system.weiXinShare.WeiXinShareFunction;
import com.teamtop.system.weiXinShare.WeiXinShareManager;
import com.teamtop.system.zhuJiangYanWu.ZhuJiangYanWuEvent;
import com.teamtop.util.time.TimeDateSchedule;
import com.teamtop.util.time.TimeDateUtil;
/**
 * ????????????GM??????
 * @author lobbyer
 * @date 2017???3???30???
 */
public class SystemGMEvent extends AbsGMEvent {
	private static SystemGMEvent ins;
	public static SystemGMEvent getIns() {
		if(ins == null) {
			ins = new SystemGMEvent();
		}
		return ins;
	}

	@Override
	public void gm(Hero hero, int type, String[] param) {
		int paramInt1 = 0;
		int paramInt2 = 0;
		switch (type) {
		case 2:
			//???????????????????????????
			MailFunction.getIns().GMMail(hero, type, param);
			break;
		case 3:
			//????????????
			MailFunction.getIns().GMMail(hero, type, param);
			break;
		case 4:
			//??????????????????
			MailFunction.getIns().GMMail(hero, type, param);
			break;
		case 5://???????????????????????? level exp
			SmeltFunction.getIns().GMSmelt(hero, param);
			break;
		case 14:// ???????????????
			GuanqiaFunction.getIns().GMGuanqia(hero, type, param);
			break;
		case 15://?????????gm
			PeacockFunction.getIns().GMPeacock(hero, param);
			break;
		case 16://????????????
			RunningManFuntion.getIns().GM(hero, param);
			break;
		case 17:// ????????????
			BattleVixensFunction.getIns().gmHandle(hero, param);
			break;
		case 18:// ????????????
			DynastyWarriorsFunction.getIns().gmHandle(param);
			break;
		case 19:// ????????????cdkey??????
			CDkeyFunction.getIns().gmHandle(hero, param);
			break;
		case 20:// bsh??????
			BshFunction.getIns().gmHandle(hero, param);
			break;
		case 21:// ????????????
			TaskUserFunction.getIns().gmHandle(hero, param);
			break;
		case 22://???????????????
			type = Integer.parseInt(param[0]);
			if (type==2) {
				//?????????
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				Set<Long> hidSet = new HashSet<>(heroMap.keySet());
				Iterator<Long> iterator = hidSet.iterator();
				long hid = 0;
				for (; iterator.hasNext();) {
					hid = iterator.next();
					KickOutHeroIO.getIns().kickOut(hid);
				}
			}else if (type==1) {
				//???????????????
				long hid = Long.valueOf(param[1]);
				KickOutHeroIO.getIns().kickOut(hid);
			}
			break;
		case 23://??????????????????
			GodOfWar godOfWar = hero.getGodOfWar();
			godOfWar.setChaNum( godOfWar.getChaNum()+ Integer.parseInt(param[0]));
			GodOfWarManager.getIns().openGodOfWar(hero);
			break;
		case 24://????????????????????????
			int num=HeroCache.getHeroMap().size();
			GMSender.sendCmd_98(hero.getId(), GMConst.GM_SYSTEM,Integer.toString(num),24);
			break;
		case 25:// ????????????????????????
			int addScore = Integer.parseInt(param[0]);
			LvBuRisingFunction.getIns().gmHandle(hero, addScore);
			break;
		case 26://????????????????????????????????????
			paramInt1 = Integer.parseInt(param[0]);
			if( paramInt1<1 || paramInt1> TimeDateUtil.MINUTE_IN_DAY){
				GlobalSender.sendCmd_260( hero.getId(), 1, "??????????????? 1-1440");
			}else{
				TimeDateSchedule.setOneDayHowManyMinutes( paramInt1);
				TimeDateSchedule.setAccountSetTimeGM( hero.getOpenid());
			}
			break;
		case 27://??????????????????
			paramInt1 = Integer.parseInt(param[0]);
			CountryData countryData = hero.getCountryData();
			if( countryData==null) return;
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if( fightNSModel==null) return;
			if( hero.getCountryType()==0){
				GlobalSender.sendCmd_260( hero.getId(), 1, "??????????????????");
				return;
			}
			int score = fightNSModel.getScore()+paramInt1;
			if(score<0) score = 1;
			fightNSModel.setScore(score);
			FightNSFunction.getIns().addToPersonalScoreRank(hero, score);
			int myRank = FightNSManager.getIns().getMyRank(hero);
			FightNSSender.sendCmd_1582(hero.getId(), 0, score, myRank, new Object[][] {});
			FightNSFunction.getIns().addToRandomMap(hero, score);
			FightNSSysCache.getCoutryScoreMap().get(hero.getCountryType()).addScore(score);
			break;
		case 28://??????boss+??????
			hero.getCountryBoss().setDayTimes(hero.getCountryBoss().getDayTimes()+1);
			break;
		case 29://?????????????????????
			//???????????????????????????
			GlobalSender.sendCmd_260(hero.getId(), 1, "???????????????????????????");
			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			paramInt1 = Integer.parseInt(param[0]);
			crossTeamFuBen.setTimesBattled(crossTeamFuBen.getTimesBattled()-paramInt1);
			CrossTeamFubenManager.getIns().sendData(hero);
			break;
		case 30:
			//??????????????????
			paramInt1 = Integer.parseInt(param[0]);
			MonsterGodSysCache.getIns().getMonsterGodCache().getGogBoss().setCurhp(paramInt1);
			break;
		case 31:
			//????????????  ??????????????????
			CrossSJMiJingEvent.getIns().zeroHero(hero, 0);
			GlobalSender.sendCmd_260(hero.getId(), 2, "?????????????????????????????????????????????GM  ??(???`v?????)?? YES!!");
			GlobalSender.sendCmd_260(hero.getId(), 2, "?????????????????????????????????????????????GM  ??(???`v?????)?? YES!!");
			GlobalSender.sendCmd_260(hero.getId(), 2, "?????????????????????????????????????????????GM  ??(???`v?????)?? YES!!");
			break;
		case 32:
			//????????????  ??????????????????
			CrossSJMiJing data = hero.getCrossSJMiJing();
			data.getMiJingIDMap().clear();
			data.getBoxMap().clear();
			data.getSaoDangMap().clear();
			CrossSJMiJingManager.getIns().openUI(hero);
			GlobalSender.sendCmd_260(hero.getId(), 2, "?????????????????????????????????????????????GM  ??(???`v?????)?? YES!!");
			GlobalSender.sendCmd_260(hero.getId(), 2, "?????????????????????????????????????????????GM  ??(???`v?????)?? YES!!");
			GlobalSender.sendCmd_260(hero.getId(), 2, "?????????????????????????????????????????????GM  ??(???`v?????)?? YES!!");
			break;
		case 33:
			if(CrossZone.isCrossServer())
				return;
			//??????????????????GM
			paramInt1 = Integer.parseInt(param[0]);
			CrossWenDingTianXiaLocalToCross.getIns().gmLC(paramInt1);
			GlobalSender.sendCmd_260(hero.getId(), 2, "???????????????????????????"+paramInt1);
			break;
		case 34:
			//????????????????????????
			if(!CrossZone.isCrossServer())
				return;
			paramInt1 = Integer.parseInt(param[0]);
			CrossWenDingTianXiaScoreRank heroRankData = CrossWenDingTianXiaCrossFunction.getIns().getHeroRankData(hero.getId());
			if(heroRankData==null) {
				GlobalSender.sendCmd_260(hero.getId(), 2, "???????????????????????????????????????");
				return;
			}
			CrossWenDingTianXiaCrossFunction.getIns().refreshHeroScoreRank(hero, paramInt1);
			CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
			break;
		case 35:
			if(!CrossZone.isCrossServer())
				return;
			paramInt1 = Integer.parseInt(param[0]);
			CrossWenDingTianXia wdtxData = hero.getCrossWenDingTianXia();
			int max = Math.max(0, wdtxData.getNumKillThisLayer() + paramInt1);
			wdtxData.setNumKillThisLayer( max);
			//??????????????????
			CrossWenDingTianXiaCrossFunction.getIns().goToNextLayer(hero);
			CrossWenDingTianXiaCrossFunction.getIns().sendTimeAndScore(hero);
			break;
		case 38:
			//???????????????ID
			paramInt1 = Integer.parseInt(param[0]);
			String gmGetDataByID = RestrictedAccessUtil.gmGetDataByID(hero, paramInt1, 1);
			GlobalSender.sendCmd_260(hero.getId(), 4, "      <font color='#58ff58'>?????????????????? </font>"+paramInt1+"<font color='#58ff58'> ????????????</font>??? ??(???`v?????)?? YES!!\n"+gmGetDataByID);
			break;
		case 41:
			//?????????????????????
			String gmGetAllData = RestrictedAccessUtil.gmGetAllData(hero);
			GlobalSender.sendCmd_260(hero.getId(), 4, gmGetAllData);
			break;
		case 42:
			//????????????ID????????????
			paramInt1 = Integer.parseInt(param[0]);
			paramInt2 = Integer.parseInt(param[1]);
			String setByGM = RestrictedAccessUtil.setByGM(hero, paramInt1, paramInt2);
			GlobalSender.sendCmd_260(hero.getId(), 4, setByGM);
			break;
		case 45:
			//????????????  ????????????
			ZhuJiangYanWuEvent.getIns().zeroPub(0);
			//?????????????????????
			ZhuJiangYanWuEvent.getIns().loginReset(hero, 0);
			break;
		case 46:
			paramInt1 = Integer.parseInt(param[0]);
			/*if (paramInt1==1) {
				//??????????????????
				UnifyCountryFunction.getIns().start();
			}else {
				//??????????????????
				UnifyCountryFunction.getIns().end();
			}*/
			
			break;			
		case 47:
			HeroesListFunction.getIns().gmAddRankList();
			break;
		case 48:
			CrossKingLocalFunction.getIns().gmAddCrossJoiner();
			break;
		case 49:// ????????????gm
			HuoShaoChiBiFunction.getIns().GM(hero, param);
			break;
		case 50:
			WeiXinShareManager.getIns().completeShare(hero);
			break;
		case 51:
			String friendOpenId = param[0];
			int friendZoneId = Integer.valueOf(param[1]);
			if(friendZoneId != 0) {
				if(hero.getOpenid().equals(friendOpenId)) {
					break;
				}
				hero.getWeixinshare().setOpenId(friendOpenId);
				hero.getWeixinshare().setZoneId(friendZoneId);
				WeiXinShareFunction.getIns().noticFriend(hero);
			}
			break;
		case 52:
			LiuChuQiShanFunction.getIns().GM(hero, param);
			break;
		case 53:
			WuJiangGoalFunction.getIns().GM(hero, param);
			break;
		case 54:
			WarOrderActiveFunction.getIns().GM(hero, param);
			break;
		case 55:
			int index = Integer.parseInt(param[0]);
			TigerPassFunction.getIns().gmChargeNum(hero, index);
			break;
		case 56:
			ThreeHeroFightLvBuFunction.getIns().gm(hero, param);
			break;
		case 57:
			AchievementFunction.getIns().GM(hero, param);
			break;
		case 58:
			AchievementTreeFunction.getIns().GM(hero, param);
			break;
		case 59:
			CrossTrialFunction.getIns().gmUploadData();
			break;
		case 60:
			CrossTrialFunction.getIns().gmClearAll();
			break;
		case 61:
			CountryBossFunction.getIns().gm(hero, param);
			break;
		default:
			break;
		}
	}

}
