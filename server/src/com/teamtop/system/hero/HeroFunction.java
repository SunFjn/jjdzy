package com.teamtop.system.hero;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.netty.firewall.sytstemWatch.SystemWatchEvent;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.actGift.ActGiftManager;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActFunction;
import com.teamtop.system.collectTreasury.CollectTreasuryFunction;
import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.consume.ConsumeEventCache;
import com.teamtop.system.dailyDirectBuy.DailyDirectBuyFunction;
import com.teamtop.system.event.backstage.events.backstage.dao.HoutaiDao;
import com.teamtop.system.event.backstage.events.backstage.recharge.B_PayAccount;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.extraValueGiftBag.ExtraValueGiftBagFunction;
import com.teamtop.system.forge.ForgeFunction;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.godWeapon.GodWeaponInfo;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookModel;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.otherDailyDirectBuy.OtherDailyDirectBuyFunction;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.recharge.RechargeEventCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.reincarnation.ReincarnationFunction;
import com.teamtop.system.skill.SkillFunction;
import com.teamtop.system.skill.model.SkillInfo;
import com.teamtop.system.tigerPass.model.TigerPassEmployer;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangFunction;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.system.zcBoss.ZcBossFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_chongzhi_716;
import excel.config.Config_daoju_204;
import excel.config.Config_herogodskill_211;
import excel.config.Config_lv_200;
import excel.config.Config_sbzs_750;
import excel.config.Config_shop_011;
import excel.config.Config_xitong_001;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuansheng_705;
import excel.struct.Struct_chongzhi_716;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_herogodskill_211;
import excel.struct.Struct_lv_200;
import excel.struct.Struct_sbzs_750;
import excel.struct.Struct_shop_011;
import excel.struct.Struct_xitong_001;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

/**
 * ???????????????????????????
 * @author hepl
 *
 */
public class HeroFunction {
	private static HeroFunction ins = null;
	public static HeroFunction getIns(){
		if(ins == null){
			ins = new HeroFunction();
		}
		return ins;
	}
	private Logger logger = LoggerFactory.getLogger(HeroFunction.class);
	
	/**
	 * ???????????????
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean useUpLevelDan(Hero hero, int id, int num) {
		try {
			Struct_daoju_204 struct = Config_daoju_204.getIns().get(id);
			int[][] canshu = struct.getReward();
			if(canshu == null) {
				return false;
			}
			int levelLimit=canshu[0][0];
			int addLevelNum=canshu[0][1];
			int addLevelNum2=canshu[0][2];
			if (hero.getLevel()>=levelLimit) {
				// ?????????????????????
				if(addLevelNum2 > 10000) {
					//?????????
					UseAddUtil.addHuobi(hero, GameConst.EXP, Long.valueOf(addLevelNum2), SourceGoodConst.USE_EXP_DAN, true);
				}else {
					//?????????
					addHeroLevel(hero, addLevelNum2);
				}
			}else {
				//?????????
				addHeroLevel(hero, addLevelNum);
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, HeroFunction.class, hero.getId(), hero.getName(), "useUpLevelDan has wrong");
		}
		return false;
	}

	/**
	 * ????????????????????????
	 * 
	 * @return
	 */
	public int getHeroMaxLevel() {
		int maxLv = Config_lv_200.getIns().getSortList().size();
		return maxLv;
	}

	/**
	 * ??????????????????
	 * @param hero
	 * @param addExp ??????????????????
	 */
	public void addHeroExp(Hero hero, long addExp){
		try {
			if(addExp == 0){
				return;
			}
			int sizeLv=Config_lv_200.getIns().getSortList().size();
			boolean isLevelUp = false;
			boolean flag = true;
			//????????????
			int oriLevel = hero.getLevel();
			int level = oriLevel;
			if(hero.getExp() + addExp <= 0){
				hero.setExp(0);
			}else {
				while(flag){
					Struct_lv_200 jingyan_300 = Config_lv_200.getIns().get(level);
					if (jingyan_300==null) {
						return;
					}
					long levelExp = jingyan_300.getExp();
					
					// ????????????????????????????????????
					levelExp = ReincarnationFunction.getIns().expXiShu(hero, levelExp);
					
					long exp = hero.getExp();
					exp = exp + addExp;
					//78????????????????????????,79????????????????????????
					if(exp >= levelExp && level < sizeLv){
						//??????????????????
						level = level + 1;
						hero.setExp(exp - levelExp);
						addExp = 0;
						isLevelUp = true;
					}else {
						/*if(level >= HeroConst.HERO_LEVEL_UP && exp > jingyan_300.getLeiji()){
							exp = jingyan_300.getLeiji();
						}*/
						hero.setExp(exp);
						flag = false;
					}
				}
			}
			
			//?????????????????????
			Map<String, Object> dataMap = new HashMap<String, Object>();
			dataMap.put(GameConst.expshow, hero.getExp());
//			dataMap.put(GameConst.EXP, hero.getExp());//????????????
			//????????????
			if(isLevelUp){
//				SceneFunction.getIns().boardcastNewState(hero, dataMap, false);
//				NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
				//??????????????????
				for(int i=oriLevel; i<level; i++){
					hero.setLevel(i+1);
					dataMap.put(GameConst.lv, hero.getLevel());
					sendChange120(hero, dataMap);
					SystemEventFunction.triggerLevelUpEvent(hero, i, i + 1);
				}
				//??????????????????
//				FightCalcFunction.checkCalc(hero);
				RankingFunction.getIns().refreshAll(hero);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"hid:"+hero.getId()+",level:"+hero.getLevel()+",addexp:"+addExp));
		}
	}
	
	/**
	 * ??????????????????
	 * @param hero
	 * @param levelNum
	 */
	public void addHeroLevel(Hero hero, int levelNum){
		try {
			if(levelNum == 0){
				return;
			}
			if(levelNum < 0){
				hero.setExp(0);
			}
			int level = hero.getLevel();
			int newLevel = level + levelNum;
			int maxLevel = getHeroMaxLevel();
			if (newLevel > maxLevel) {
				newLevel = maxLevel;
				levelNum = newLevel - level;
			}else if(newLevel < 1){
				newLevel = 1;
			}
			//????????????????????????
			HashMap<String, Object> dataMap = new HashMap<String, Object>(3);
			dataMap.put(GameConst.lv, newLevel);
//			if(levelNum > 0){
//				dataMap.put(HeroXData.levelUpEff, 1);//????????????
//			}
			dataMap.put(GameConst.expshow, hero.getExp());
			sendChange120(hero, dataMap);
			//????????????????????????????????????????????????????????????????????????
			if(levelNum > 0){
				for(int i=0; i<levelNum; i++){
					hero.setLevel(level+i+1);
					SystemEventFunction.triggerLevelUpEvent(hero, level+i, level+i+1);
				}
			}
			hero.setLevel(newLevel);
			if(levelNum>0){
				RankingFunction.getIns().refreshAll(hero);
			}
			//FightCalcFunction.setRecalcAll(hero, FightCalcConst.LEVELUP);
			//???????????????
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"hid:"+hero.getId()));
		}
	}
	/**
	 * ??????????????????
	 * @param hero
	 * @param levelNum
	 */
	public void addHeroRebornLv(Hero hero,int Rebornlv){
		
		//RankListFunction.getIns().refreshAll(hero);
		//????????????????????????
		HashMap<String, Object> dataMap = new HashMap<String, Object>(3);
		dataMap.put(GameConst.rebornlv, hero.getRebornlv());
		dataMap.put(GameConst.xiuwei, hero.getExp());
		dataMap.put(GameConst.lv, hero.getLevel());
		sendChange120(hero, dataMap);
		// ????????????
		ActGiftManager.getIns().sendMsg(hero);
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.REBORN, null);
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.REBORNLV,SystemIdConst.HeroFight_SYSID);
		ZcBossFunction.getIns().isLocalReadPoint(hero,false);
		ZcBossFunction.getIns().isCrossReadPoint(hero,false);
	}
	/**
	 * ??????????????????????????????????????????
	 * @param hero
	 * @param data
	 */
	public void sendChange120(Hero hero, Map<String,Object> data){
		if(data==null) return;
		StringBuffer sb = new StringBuffer();
		sb.append(GameConst.s);
		int size = data.size();
		int i=1;
		Iterator<Entry<String, Object>> it = data.entrySet().iterator();
		while(it.hasNext()){
			Entry<String, Object> next = it.next();
			String key = next.getKey();
			Object value = next.getValue();
			sb.append(GameConst.y).
			append(key).append(GameConst.y).append(GameConst.m);
			if(value instanceof String){
				sb.append(GameConst.y).append(value.toString()).append(GameConst.y);
			}else{
				sb.append(value.toString());
			}
			if(i++<size) sb.append(GameConst.d);
		}
		sb.append(GameConst.e);
		HeroSender.sendCmd_120(hero.getId(), sb.toString());
	}
	
	/**
	 * ??????????????????????????????????????????
	 * @param hero
	 * @param key
	 * @param value
	 */
	public void sendChange120(Hero hero, String key,Object value){
		if(value==null) return;
		if(key==null || "null".equals(key)){
			logger.warn("send120 key is null,key:"+key+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
			return;
		}
		StringBuffer sb = new StringBuffer();
		sb.append(GameConst.s).append(GameConst.y).
		append(key).append(GameConst.y).append(GameConst.m);
		if(value instanceof String){
			sb.append(GameConst.y).append(value.toString()).append(GameConst.y);
		}else{
			sb.append(value.toString());
		}
		sb.append(GameConst.e);
		HeroSender.sendCmd_120(hero.getId(), sb.toString());
//		NettyWrite.writeXData(hero.getId(), HeroCmd.GC_RetChange_118, dataMap);
	}
	
	
	/**
	 * ????????????????????????
	 * @param hid
	 * @return true?????????false?????????
	 */
	public boolean isOnline(long hid){
		Hero hero = HeroCache.getHero(hid);
		if(hero==null){
			return false;
		}else{
			TempData tempData = hero.getTempData();
			if(tempData == null){
				return false;
			}else if(tempData.getChannel()==null || !tempData.getChannel().isActive()){
				return false;
			}
		}
		return true;
	}
	
	/**
	 * ????????????????????????????????????????????????
	 * @param hero ????????????
	 * @param sysId ??????id????????????X_104_?????????????????????id
	 * @return true????????????false????????????
	 */
	// public boolean checkSystemOpenLevel(Hero hero, int sysId){
	// Struct_xitong_001 xitongkaiqi_103 = Config_xitong_001.getIns().get(sysId);
	// if(xitongkaiqi_103 == null){
	// return false;
	// }
	// int my = hero.getLevel();
	// int c1 = xitongkaiqi_103.getClient();
	// int c2 = xitongkaiqi_103.getServer();
	// if(my < c1 || (c1 == 0 && my < c2)){
//			return false;
//		}
	// //??????????????????
	//// if(xitongkaiqi_103.getTianshu()>0&&xitongkaiqi_103.getTianshu()-1>TouZiFunction.getIns().kaiFuDay()){
	//// return false;
	//// }
	// return true;
	// }
	
	/**
	 * ????????????????????????????????????????????????
	 * @param hero
	 * @param sysId
	 * @return
	 */
	// public boolean checkSystemOpenKaiFuDay(Hero hero, int sysId){
//		Struct_xitong_001 xitongkaiqi_103 = Config_xitong_001.getIns().get(sysId);
//		if(xitongkaiqi_103 == null){
//			return false;
//		}
//		int my = hero.getLevel();
//		int c1 = xitongkaiqi_103.getClient();
//		int c2 = xitongkaiqi_103.getServer();
//		//??????????????? ????????????????????? ???????????????????????????
//		if(my < c1 || (c1 == 0 && my < c2)){
//			return false;
//		}
//		//??????????????????
////		if(xitongkaiqi_103.getTianshu()>0&&xitongkaiqi_103.getTianshu()-1>TouZiFunction.getIns().kaiFuDay()){
////			return false;
////		}
	// return true;
	// }
	
	/**
	 * ???????????????????????????????????????????????????
	 * @param hero ????????????
	 * @param sysId ??????id????????????X_104_?????????????????????id
	 * @return true????????????false????????????
	 */
	// public boolean checkSystemInitLevel(Hero hero, int sysId){
	// Struct_xitong_001 xitongkaiqi_103 = Config_xitong_001.getIns().get(sysId);
	// if(xitongkaiqi_103 == null){
	// return false;
	// }
	// int my = hero.getLevel();
	// int c2 = xitongkaiqi_103.getServer();
	// if(my < c2){
	// return false;
	// }
	// return true;
	// }
	
	/***
	 * ???2???????????????
	 * 
	 * @param hero
	 * @param sysId
	 * @return
	 */
	public boolean checkFourTeenSystemOpen(Hero hero, int sysId) {
		try {
			if (CrossZone.isCrossServer()) {
				return true;
			}
			Map<Integer, Integer> sConflictMap = OpenDaysSystemSysCache.getsConflictMap();
			if(!sConflictMap.containsKey(sysId)) {
				return true;
			}
			int openDays = TimeDateUtil.betweenOpen();
//			int limitTime = TimeDateUtil.getTimeIntByStrTime("2019-04-25 00:00:00", "yyyy-MM-dd HH:mm:ss");
//			if (GameProperties.serverOpenTime > limitTime) {
//				return true;
//			}
//			if (openDays > 7 && openDays < 15) {
//				if (fourTeenSet.contains(sysId)) {
//					return false;
//				}
//			}
			Integer actId = sConflictMap.get(sysId);
			if(actId!=null){
				if (ActivitySysCache.getActivityMap().containsKey(actId)) {
					return false;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroFunction.class, "checkFourTeenSystemOpen sysId=" + sysId);
		}
		return true;
	}

	public boolean checkSystemOpenDay(int sysId) {
		Struct_xitong_001 xitongkaiqi_001 = Config_xitong_001.getIns().get(sysId);
		if (xitongkaiqi_001 == null) {
			return false;
		}
		// ????????????????????????????????????????????????
		int day = xitongkaiqi_001.getDay();
		if (day > 0 && (!TimeDateUtil.serverOpenAtOverDays(day)) && day < 1000) {
			// ?????????????????????
			return false;
		}

		if (day >= 1000) {
			int day1 = day % 1000;
			if (TimeDateUtil.serverOpenOverDays(day1)) {
				// ?????????????????????
				return false;
			}
		}
		return true;
	}

	/**
	 * ?????? ??????????????????????????? ??? open???????????? ?????????????????????????????????
	 * @author lobbyer
	 * @param hero
	 * @param sysId ??????id????????????X_001_?????????????????????id
	 * @return true????????????false????????????
	 * @date 2016???6???23???
	 */
	public boolean checkSystemOpen(Hero hero,int sysId) {
		Struct_xitong_001 xitongkaiqi_001 = Config_xitong_001.getIns().get(sysId);
		if(xitongkaiqi_001 == null){
			return false;
		}
		// ????????????????????????????????????????????????
		int day = xitongkaiqi_001.getDay();
		if (day > 0 && (!TimeDateUtil.serverOpenAtOverDays(day))&&day<1000) {
			//?????????????????????
			return false;
		}
		int beginNum=0;
		int overNum=0;
		if (day>=1000&&day<=2000) {
			int day1=day%1000;
			if (TimeDateUtil.serverOpenOverDays(day1)) {
				//?????????????????????
				return false;
			}
		}else if (day==2007) {
			//?????????
			beginNum=8;
			overNum=14;
		}else if (day==3007) {
			//?????????
			beginNum=15;
			overNum=21;
		}else if (day==4007) {
			//?????????
			beginNum=22;
			overNum=28;
		}
		// ????????????
		boolean teenSystemOpen = checkFourTeenSystemOpen(hero, sysId);
		if (!teenSystemOpen) {
			return false;
		}

		// ????????????
//		boolean fourTeenAct = ActivityFunction.getIns().checkOtherWeek(sysId);
		if (beginNum != 0 && overNum != 0) {
			int daysBetween = TimeDateUtil.getDaysBetween(GameProperties.serverOpenTime,  TimeDateUtil.getCurrentTime())+1;
			if (daysBetween<beginNum&&daysBetween>overNum) {
				return false;
			}
		}
		
		int[][] open = xitongkaiqi_001.getServer();
		if (open!=null) {
			for (int[] info : open) {
				switch (info[0]) {
				case 1:
					int curGuanqia = 0;
					if(hero.getGuanqia()!=null) {
						curGuanqia = hero.getGuanqia().getCurGuanqia();
					}
					if (curGuanqia < info[1]) {
						return false;
					}
					break;
				case 2:
					int rebornlv = hero.getRebornlv();
					if (rebornlv < info[1]) {
						return false;
					}
					break;
				case 3:
					if (hero.getRealLevel() < info[1]) {
						return false;
					}
					break;					
				default:
					break;
				}
			}
		}
		return true;
	}
	
	/**
	 * ?????? ??????????????????????????? ??? open???????????? ?????????????????????????????????(????????????????????????)
	 * @author lobbyer
	 * @param hero
	 * @param sysId ??????id????????????X_001_?????????????????????id
	 * @return true????????????false????????????
	 * @date 2016???6???23???
	 */
	public boolean checkSystemOpenSpecialHandleDay(Hero hero,int sysId,int day) {
		Struct_xitong_001 xitongkaiqi_001 = Config_xitong_001.getIns().get(sysId);
		if(xitongkaiqi_001 == null){
			return false;
		}
		// ????????????????????????????????????????????????
		if (day > 0 && (!TimeDateUtil.serverOpenAtOverDays(day))&&day<1000) {
			//?????????????????????
			return false;
		}
		int beginNum=0;
		int overNum=0;
		if (day>=1000&&day<=2000) {
			int day1=day%1000;
			if (TimeDateUtil.serverOpenOverDays(day1)) {
				//?????????????????????
				return false;
			}
		}else if (day==2007) {
			//?????????
			beginNum=8;
			overNum=14;
		}else if (day==3007) {
			//?????????
			beginNum=15;
			overNum=21;
		}else if (day==4007) {
			//?????????
			beginNum=22;
			overNum=28;
		}
		// ????????????
		boolean teenSystemOpen = checkFourTeenSystemOpen(hero, sysId);
		if (!teenSystemOpen) {
			return false;
		}

		// ????????????
//		boolean fourTeenAct = ActivityFunction.getIns().checkOtherWeek(sysId);
		if (beginNum != 0 && overNum != 0) {
			int daysBetween = TimeDateUtil.getDaysBetween(GameProperties.serverOpenTime,  TimeDateUtil.getCurrentTime())+1;
			if (daysBetween<beginNum&&daysBetween>overNum) {
				return false;
			}
		}
		
		int[][] open = xitongkaiqi_001.getServer();
		if (open!=null) {
			for (int[] info : open) {
				switch (info[0]) {
				case 1:
					int curGuanqia = 0;
					if(hero.getGuanqia()!=null) {
						curGuanqia = hero.getGuanqia().getCurGuanqia();
					}
					if (curGuanqia < info[1]) {
						return false;
					}
					break;
				case 2:
					int rebornlv = hero.getRebornlv();
					if (rebornlv < info[1]) {
						return false;
					}
					break;
				case 3:
					if (hero.getRealLevel() < info[1]) {
						return false;
					}
					break;					
				default:
					break;
				}
			}
		}
		return true;
	}
	
	/**
	 * ???????????????????????????id?????????????????????????????????????????????????????????1?????????????????????????????????
	 * @param sysId
	 * @return
	 */
	public boolean checkSystemOpenDelay(int sysId) {
		Struct_xitong_001 xitongkaiqi_001 = Config_xitong_001.getIns().get(sysId);
		if (xitongkaiqi_001 == null) {
			return false;
		}
		// ????????????????????????????????????????????????
		int day = xitongkaiqi_001.getDay();
		if (day > 0 && (!TimeDateUtil.serverOpenAtOverDays(day)) && day < 1000) {
			// ?????????????????????
			return false;
		}

		if (day >= 1000) {
			int day1 = day % 1000 + 1;
			if (TimeDateUtil.serverOpenOverDays(day1)) {
				// ?????????????????????
				return false;
			}

		}
		return true;
	}
	
	/**
	 * ?????? ??????????????????????????? ??? open???????????? ?????????????????????????????????
	 * 
	 * @author lobbyer
	 * @param hero
	 * @param sysId
	 *            ??????id????????????X_001_?????????????????????id
	 * @return true????????????false????????????
	 * @date 2016???6???23???
	 */
	public boolean checkSystemOpenZero(Hero hero, int sysId) {
		Struct_xitong_001 xitongkaiqi_001 = Config_xitong_001.getIns().get(sysId);
		if (xitongkaiqi_001 == null) {
			return false;
		}
		// ????????????????????????????????????????????????
		int day = xitongkaiqi_001.getDay();
		if (day > 0 && (!TimeDateUtil.serverOpenAtOverDays(day)) && day < 1000) {
			// ?????????????????????
			return false;
		}

		// if (day >= 1000) {
		// int day1 = day % 1000 + 1;
		// if (TimeDateUtil.serverOpenOverDays(day1)) {
		// // ?????????????????????
		// return false;
		// }
		//
		// }

		int beginNum = 0;
		int overNum = 0;
		if (day >= 1000 && day <= 2000) {
			int day1 = day % 1000 + 1;
			if (TimeDateUtil.serverOpenOverDays(day1)) {
				// ?????????????????????
				return false;
			}
		} else if (day == 2007) {
			// ?????????
			beginNum = 8;
			overNum = 14;
		} else if (day == 3007) {
			// ?????????
			beginNum = 15;
			overNum = 21;
		} else if (day == 4007) {
			// ?????????
			beginNum = 22;
			overNum = 28;
		}
		// ????????????
		boolean teenSystemOpen = checkFourTeenSystemOpen(hero, sysId);
		if (!teenSystemOpen) {
			return false;
		}

		// ????????????
		// boolean fourTeenAct = ActivityFunction.getIns().checkOtherWeek(sysId);
		if (beginNum != 0 && overNum != 0) {
			int daysBetween = TimeDateUtil.getDaysBetween(GameProperties.serverOpenTime, TimeDateUtil.getCurrentTime()) + 1;
			if (daysBetween < beginNum && daysBetween > overNum) {
				return false;
			}
		}

		int[][] open = xitongkaiqi_001.getServer();
		if (open != null) {
			for (int[] info : open) {
				switch (info[0]) {
				case 1:
					int curGuanqia = 0;
					if (hero.getGuanqia() != null) {
						curGuanqia = hero.getGuanqia().getCurGuanqia();
					}
					if (curGuanqia < info[1]) {
						return false;
					}
					break;
				case 2:
					int rebornlv = hero.getRebornlv();
					if (rebornlv < info[1]) {
						return false;
					}
					break;
				case 3:
					if (hero.getRealLevel() < info[1]) {
						return false;
					}
					break;
				default:
					break;
				}
			}
		}
		return true;
	}

	/**
	 * ??????????????????
	 * 
	 * @param hero
	 * @param sysId
	 * @param sourceType
	 */
/*	public void systemOpenAward(Hero hero) {
		try {
			for(Struct_xitong_001 xitong_001:Config_xitong_001.getIns().getMap().values()) {
				int sysId=xitong_001.getID();
				if (xitong_001.getAward()!=null&&checkSystemOpen(hero, sysId)&&!hero.getOpenSysReward().contains(sysId)) {
					UseAddUtil.add(hero, xitong_001.getAward(), SourceGoodConst.SYS_OPEN, null, true);
					hero.getOpenSysReward().add(sysId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroFunction.class, hero.getId(), hero.getName(), "systemOpenAward has wrong");
		}
	}*/

	public int getZSLV(int[] d){
		return d[1]*1000 + d[0];
	}
	
	
	
	public void logout(Hero hero, int operType){
		if(hero==null){
			logger.warn("hero is null on logout");
			return;
		}
		LogTool.info("Logout start.Important.hid:"+hero.getId(),this);
		hero.getTempVariables().setLogoutState(true);
		if(hero.getCrossChannel()!=null){
			NettyWrite.writeXData(hero.getCrossChannel(), CrossConst.TELL_CROSS_SERVER_CLOSE_CLIENT, new CrossData(CrossEnum.hid, hero.getId()));
		}
		hero.setCanSend(false);
		hero.setCrossChannel(null);
		hero.setLocalChannel(null);
		TempData tempData = hero.getTempData();
		if(tempData==null){
//			logger.warn(LogFormat.rec(hero.getId(),hero.getName(),"hero tempData is null on logout"));
			return;
		}
		hero.getTempVariables().setLogoutTemp(TimeDateUtil.getCurrentTime());
		if(hero.getTempVariables().isLoginSuccess()){
			hero.setLogoutTime(TimeDateUtil.getCurrentTime());
			//??????????????????
			SystemEventFunction.triggerLogoutEvent(hero, false);
			hero.getTempVariables().setLoginSuccess(false);
		}
		SystemWatchEvent.getIns().checkLogout(hero.getId(), operType);
		tempData.setChannel(null);
		hero.setTempData(null);
		//??????????????????????????????
		HeroDataSaver.addLogoutSaver(hero);
		//??????????????????
//		TXReportCache.addReport(hero, TXReportConst.report_quit,new Object[]{hero.getLogoutTime()-hero.getLoginTime(),hero.getLevel()});
		LogTool.info("Logout end.Important.hid:"+hero.getId(),this);
	}
	/**
	 * ????????????????????????
	 * @param hero
	 * @param job ??????
	 * @return true??????
	 */
	public boolean hasGeneral(Hero hero,int job){
//		Map<Integer, General> generalMap = hero.getGeneralMap();
//		for(General g:generalMap.values()){
//			if(g.getJob()==job) return true;
//		}
		return false;
	}
	
	
	/**
	 * ???????????????????????????
	 * @param hero ????????????????????????
	 * @param beHid ??????????????????id
	 */
	public void sendBattleHeroAttr(Hero hero, TigerPassEmployer tigerPassEmployer){
		try {
			
		} catch (Exception e) {
			LogTool.error(e, HeroFunction.class, "sendBattleHeroAttr has wrong");
		}
		Map<Integer, SkillInfo> skillMap = tigerPassEmployer.getSkill().getSkillMap();
		List<Object[]> attrData = new ArrayList<Object[]>();
		FinalFightAttr attr =  tigerPassEmployer.getFinalFightAttr();
		//????????????
		int godSkillLevel = tigerPassEmployer.getGodSkillLevel();
		Map<Integer, Integer> skillHurtAddMap = HeroFunction.getIns().getSkillHurtAddMap(hero,
				tigerPassEmployer.getHid(), godSkillLevel,
				tigerPassEmployer.getJob());
		List<Object[]> skillData = new ArrayList<Object[]>();
		for(Entry<Integer, SkillInfo> entry:skillMap.entrySet()){
			int index=entry.getKey();
			SkillInfo skillInfo=entry.getValue();
			Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
					.orElse(0);
			skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
		}
		ShowModel showModel = hero.getShowModel();
		int fashionID = showModel.getBodyModel();
		//L:??????id???????????????hid??????B:????????????I:??????I:??????I:??????I:??????I:??????I:?????????I:?????????I:????????????I:????????????I:????????????I:pvp????????????I:pvp????????????I:????????????I:??????[S:????????????S:??????????????????]????????????
		List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(attr);
		attrData.add(new Object[] { attr.getUid(), tigerPassEmployer.getJob(), attrSendData.toArray(), skillData.toArray(),fashionID});
		//GC[I:0?????????1id???1?????????1?????????2?????????2???3?????????2?????????4?????????id???5??????????????????6??????????????????]??????????????????
		List<Object[]> extdataList = new ArrayList<>();
		int wearTreasure1 = 0;
		int baowu1Star=0;
		int wearTreasure2 = 0;
		int baowu2Star=0;
		int godBookid=0;
		int godBookStar=0;
		int wujiangStar=0;
		
		
		int godWeapon=tigerPassEmployer.getGodWeapon();
		int godWeaponZhuanShu = tigerPassEmployer.getGodWeaponKill();
		/*TreasureData treasureData = model.getTreasureData();
		if (treasureData!=null) {
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			wearTreasure1 = wearTreasureList.get(0);
			wearTreasure2 = wearTreasureList.get(1);
			if (wearTreasure1!=0&&treasureMap.containsKey(wearTreasure1)) {
				TreasureModel treasureModel = treasureMap.get(wearTreasure1);
				baowu1Star=treasureModel.getStarLevel();
			}
			if (wearTreasure2!=0&&treasureMap.containsKey(wearTreasure2)) {
				TreasureModel treasureModel = treasureMap.get(wearTreasure2);
				baowu2Star=treasureModel.getStarLevel();
			}
		}
		GodBook godBook=model.getGodbook();
		HashMap<Integer, GodBookModel> hasBooks = godBook.getHasBooks();
		if (godBook!=null) {
			godBookid=godBook.getWearid();
			if (godBookid!=0&&hasBooks.containsKey(godBookid)) {
				GodBookModel godBookModel = hasBooks.get(godBookid);
				godBookStar=godBookModel.getStar();
			}
		}
		int nowjob=model.getJob();
		if (nowjob>1000) {
			nowjob=nowjob/1000;
		}
		if (model.getWujiang().getWujiangs().containsKey(nowjob)) {
			wujiangStar=hero.getWujiang().getWujiangs().get(nowjob).getStar();
		}*/
		extdataList.add(new Object[] { wearTreasure1});
		extdataList.add(new Object[] { baowu1Star});
		extdataList.add(new Object[] { wearTreasure2});
		extdataList.add(new Object[] { baowu2Star});
		extdataList.add(new Object[] { godBookid});
		extdataList.add(new Object[] { godBookStar});
		extdataList.add(new Object[] { wujiangStar});
		extdataList.add(new Object[] { godWeapon});
		extdataList.add(new Object[] { godWeaponZhuanShu});
		
		
		//????????????
		int withLeaderId = tigerPassEmployer.getWithLeaderId();
		int withLeaderFid = tigerPassEmployer.getWithLeaderFid();
		int leaderStarId = tigerPassEmployer.getLeaderStarId();
		int leaderSkillId = tigerPassEmployer.getLeaderSkillId();
		//????????????
		HeroSender.sendCmd_130(hero.getId(), tigerPassEmployer.getHid(), tigerPassEmployer.getNameZoneid(), tigerPassEmployer.getOfficial(), tigerPassEmployer.getCountryType(),
				tigerPassEmployer.getTitleId(), tigerPassEmployer.getFightMonsterSpirit(), attrData.toArray(), tigerPassEmployer.getTotalStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
	}
	
	
	/**
	 * ???????????????????????????
	 * @param hero ????????????????????????
	 * @param beHid ??????????????????id
	 */
	public void sendBattleHeroAttr(Hero hero, long beHid){
		Hero beHero = HeroCache.getHero(beHid, HeroConst.FIND_TYPE_BATTLE);
		Map<Integer, SkillInfo> skillMap = beHero.getSkill().getSkillMap();
		List<Object[]> attrData = new ArrayList<Object[]>();
		FinalFightAttr attr =  beHero.getFinalFightAttr();
		int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(beHero.getJob(), beHero.getWujiang());
		Map<Integer, Integer> skillHurtAddMap = getSkillHurtAddMap(hero, beHid, godSkillLevel, beHero.getJob());
		//????????????
		List<Object[]> skillData = new ArrayList<Object[]>();
		for(Entry<Integer, SkillInfo> entry:skillMap.entrySet()){
			int index=entry.getKey();
			SkillInfo skillInfo=entry.getValue();
			Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
					.orElse(0);
			skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
		}
		ShowModel showModel = hero.getShowModel();
		int fashionID = showModel.getBodyModel();
		// ????????????
		MonsterSpiritModel monsterSpiritModel = beHero.getMonsterSpiritModel();
		int fms = 0;
		if (monsterSpiritModel != null) {
			fms = monsterSpiritModel.getFightMonsterSpiri();
		}
		//L:??????id???????????????hid??????B:????????????I:??????I:??????I:??????I:??????I:??????I:?????????I:?????????I:????????????I:????????????I:????????????I:pvp????????????I:pvp????????????I:????????????I:??????[S:????????????S:??????????????????]????????????
		List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(attr);
		attrData.add(new Object[] { attr.getUid(), beHero.getJob(), attrSendData.toArray(), skillData.toArray(),fashionID});
		//GC[I:0?????????1id???1?????????1?????????2?????????2???3?????????2?????????4?????????id???5??????????????????6??????????????????]??????????????????
		List<Object[]> extdataList = new ArrayList<>();
		int wearTreasure1 = 0;
		int baowu1Star=0;
		int wearTreasure2 = 0;
		int baowu2Star=0;
		int godBookid=0;
		int godBookStar=0;
		int wujiangStar=0;
		int godWeapon=0;
		TreasureData treasureData = beHero.getTreasureData();
		if (treasureData!=null) {
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			if(wearTreasureList!=null) {				
				Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
				wearTreasure1 = wearTreasureList.get(0);
				wearTreasure2 = wearTreasureList.get(1);
				if (wearTreasure1!=0&&treasureMap.containsKey(wearTreasure1)) {
					TreasureModel treasureModel = treasureMap.get(wearTreasure1);
					baowu1Star=treasureModel.getStarLevel();
				}
				if (wearTreasure2!=0&&treasureMap.containsKey(wearTreasure2)) {
					TreasureModel treasureModel = treasureMap.get(wearTreasure2);
					baowu2Star=treasureModel.getStarLevel();
				}
			}
		}
		GodBook godBook=beHero.getGodbook();
		if (godBook!=null) {
		HashMap<Integer, GodBookModel> hasBooks = godBook.getHasBooks();
			godBookid=godBook.getWearid();
			if (godBookid!=0&&hasBooks.containsKey(godBookid)) {
				GodBookModel godBookModel = hasBooks.get(godBookid);
				godBookStar=godBookModel.getStar();
			}
		}
		int nowjob=beHero.getJob();
		if (nowjob>1000) {
			nowjob=nowjob/1000;
		}
		WuJiang wujiang = beHero.getWujiang();
		if (wujiang!=null) {
			HashMap<Integer, WuJiangModel> wujiangs = wujiang.getWujiangs();
			if(wujiangs!=null&&wujiangs.containsKey(nowjob)) {				
				wujiangStar=wujiangs.get(nowjob).getStar();
			}
		}
		godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(beHero);
		extdataList.add(new Object[] { wearTreasure1});
		extdataList.add(new Object[] { baowu1Star});
		extdataList.add(new Object[] { wearTreasure2});
		extdataList.add(new Object[] { baowu2Star});
		extdataList.add(new Object[] { godBookid});
		extdataList.add(new Object[] { godBookStar});
		extdataList.add(new Object[] { wujiangStar});
		extdataList.add(new Object[] { godWeapon});
		extdataList.add(new Object[] { GodWeaponFunction.getIns().getNowGodWeaponZhuanShu(beHero)});
		
		//????????????
		int withLeaderId=0;
		int withLeaderFid=0;
		int leaderStarId=0;
		int leaderSkillId=0;
		LittleLeader littleLeader=beHero.getLittleLeader();
		if (littleLeader!=null) {
			withLeaderId=littleLeader.getWearType();
			if (withLeaderId!=0) {
				LittleLeaderModel littleLeaderModel = littleLeader.getHasLittleLeaderModels().get(withLeaderId);
				withLeaderFid=littleLeaderModel.getNowFashId();
				leaderStarId=littleLeaderModel.getStar();
				leaderSkillId=littleLeaderModel.getActivityKillLv();
			}

		}
		//????????????
		HeroSender.sendCmd_130(hero.getId(), beHid, beHero.getNameZoneid(), beHero.getOfficial(),
				beHero.getCountryType(), beHero.getTitleId(), fms, attrData.toArray(), beHero.getTotalStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
	}
	
	/**
	 * ???????????????????????????
	 * @param hero ????????????????????????
	 * @param model ???????????????????????????model
	 */
	public void sendBattleHeroAttr(Hero hero, CrossHeroBaseModel model) {
		long beHid = model.getId();
		Map<Integer, SkillInfo> skillMap = model.getSkill().getSkillMap();
		List<Object[]> attrData = new ArrayList<Object[]>();
		FinalFightAttr attr = model.getFinalFightAttr();
		// ????????????
		int godSkillLevel = WuJiangFunction.getIns().getGodSkillLevel(model.getJob(), model.getWuJiang());
		List<Object[]> skillData = new ArrayList<Object[]>();
		Map<Integer, Integer> skillHurtAddMap = getSkillHurtAddMap(hero, model.getId(), godSkillLevel, model.getJob());
		for (Entry<Integer, SkillInfo> entry : skillMap.entrySet()) {
			int index = entry.getKey();
			SkillInfo skillInfo = entry.getValue();
			Integer skillHurtAdd = Optional.ofNullable(skillHurtAddMap).map(mapper -> mapper.get(skillInfo.getId()))
					.orElse(0);
			skillData.add(new Object[] { index, skillInfo.getId(), skillInfo.getLevel(), skillHurtAdd });
		}
		int fashionID = 0;
		// L:??????id???????????????hid??????B:????????????I:??????I:??????I:??????I:??????I:??????I:?????????I:?????????I:????????????I:????????????I:????????????I:pvp????????????I:pvp????????????I:????????????I:??????[S:????????????S:??????????????????]????????????
		List<Object[]> attrSendData = FightAttrFunction.createAttrSendData(attr);
		attrData.add(
				new Object[] { attr.getUid(), model.getJob(), attrSendData.toArray(), skillData.toArray(), fashionID });
		//GC[I:0?????????1id???1?????????1?????????2?????????2???3?????????2?????????4?????????id???5??????????????????6??????????????????]??????????????????
		List<Object[]> extdataList = new ArrayList<>();
		int wearTreasure1 = 0;
		int baowu1Star=0;
		int wearTreasure2 = 0;
		int baowu2Star=0;
		int godBookid=0;
		int godBookStar=0;
		int wujiangStar=0;
		
		int godWeapon=0;
		// if(model.getGodWeapon() != null) {
		// int type = model.getJob();
		// if(type > 1000) {
		// type /= 1000;
		// }
		// if(model.getGodWeapon().getWeaponIdByWuJiang().get(type)!= null) {
		// godWeapon =
		// model.getGodWeapon().getWeaponIdByWuJiang().get(type).getWearWeapon();
		// }
		// }
		TreasureData treasureData = model.getTreasureData();
		if (treasureData!=null) {
			List<Integer> wearTreasureList = treasureData.getWearTreasureList();
			Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
			wearTreasure1 = wearTreasureList.get(0);
			wearTreasure2 = wearTreasureList.get(1);
			if (wearTreasure1!=0&&treasureMap.containsKey(wearTreasure1)) {
				TreasureModel treasureModel = treasureMap.get(wearTreasure1);
				baowu1Star=treasureModel.getStarLevel();
			}
			if (wearTreasure2!=0&&treasureMap.containsKey(wearTreasure2)) {
				TreasureModel treasureModel = treasureMap.get(wearTreasure2);
				baowu2Star=treasureModel.getStarLevel();
			}
		}
		GodBook godBook = model.getGodBook();
		if (godBook!=null) {
			HashMap<Integer, GodBookModel> hasBooks = godBook.getHasBooks();
			godBookid=godBook.getWearid();
			if (godBookid!=0&&hasBooks.containsKey(godBookid)) {
				GodBookModel godBookModel = hasBooks.get(godBookid);
				godBookStar=godBookModel.getStar();
			}
		}

		// int nowjob=model.getJob();
		// if (nowjob>1000) {
		// nowjob=nowjob/1000;
		// }
		// if (model.getWuJiang().getWujiangs().containsKey(nowjob)) {
		// wujiangStar=hero.getWujiang().getWujiangs().get(nowjob).getStar();
		// }
		extdataList.add(new Object[] { wearTreasure1});
		extdataList.add(new Object[] { baowu1Star});
		extdataList.add(new Object[] { wearTreasure2});
		extdataList.add(new Object[] { baowu2Star});
		extdataList.add(new Object[] { godBookid});
		extdataList.add(new Object[] { godBookStar});
		extdataList.add(new Object[] { wujiangStar});
		extdataList.add(new Object[] { godWeapon});
		
		int godWeaponZhuanShu = 0;
		if(model.getGodWeapon() != null) {
			int type = model.getJob();
			if(type > 1000) {
				type /= 1000;
			}
			GodWeaponInfo info = model.getGodWeapon().getWeaponIdByWuJiang().get(type);
			if (info != null) {
				int taozhuangindex=info.getType()*1000+info.getZhuanshuLevel();
				Struct_sbzs_750 struct_sbzs_750 = Config_sbzs_750.getIns().get(taozhuangindex);
				if (struct_sbzs_750!=null) {
					godWeaponZhuanShu = struct_sbzs_750.getJineng()[0][1];
				}
			}
		}
		
		extdataList.add(new Object[] { godWeaponZhuanShu});
		
		
		//????????????
		int withLeaderId = model.getWithLeaderId();
		int withLeaderFid = model.getWithLeaderFid();
		int leaderStarId = model.getLeaderStarId();
		int leaderSkillId = model.getLeaderSkillId();
		// ????????????
		HeroSender.sendCmd_130(hero.getId(), beHid, model.getNameZoneid(), model.getOfficial(), model.getCountryType(),
				model.getTitleId(), model.getFightMonsterSpirit(), attrData.toArray(), model.getTotalStrength(),extdataList.toArray(),withLeaderId,withLeaderFid,leaderStarId,leaderSkillId);
	}

	public Map<Integer, Integer> getSkillHurtAddMap(Hero hero, long beHid, int godSkillLevel, int job) {
		// ??????-????????????????????????
		Map<Integer, Integer> skillHurtAddMap = null;
		try {
			if (godSkillLevel == 0) {
				return null;
			}
			int type = job;
			if (type > 1000) {
				type /= 1000;
			}
			int godSkillId = WuJiangFunction.getIns().godSkillLvToId(type, godSkillLevel);
			Struct_herogodskill_211 struct_herogodskill_211 = Config_herogodskill_211.getIns().get(godSkillId);
			if (struct_herogodskill_211 != null) {
				int[][] attpg = struct_herogodskill_211.getAttpg();
				skillHurtAddMap = new HashMap<>(attpg.length);
				for (int[] att : attpg) {
					skillHurtAddMap.put(att[0], att[1]);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getNameZoneid(),
					"HeroFunction getSkillHurtAddMap beHid:" + beHid + " job:" + job + " godSkillLevel:"
							+ godSkillLevel);
		}
		return skillHurtAddMap;
	}
	
	/** ??????????????????
	*	???????????????????????????????????????????????????
	*/
	public void rechargeHero(long hid, boolean isGM, long product_id, Map<String, String> paramMap, String parameters) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					recharge(hid, isGM, product_id, paramMap, parameters);
				} catch (Exception e) {
					LogTool.error(e, this, hid, "", "HeroFunction rechargeHero, product_id=" + product_id);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return hid;
			}
		});
	}

	/**
	 * ??????????????????
	 * @param hero ????????????
	 * @param isGM ??????GM?????????true???GM?????????false?????????GM??????
	 */
	public void recharge(long hid, boolean isGM, long product_id, Map<String, String> paramMap, String parameters) {
		Hero hero = HeroCache.getHero(hid);
		boolean hascache = true;
		if(hero==null){
			hascache = false;
			//????????????????????????
			try {
				hero = HeroDao.getIns().find(hid,null);
				HeroCache.removeTempHero(hid);
				HeroCache.putHero(hero);
				SystemEventFunction.triggerInitEvent(hero);
			} catch (Exception e) {
				logger.error(LogTool.exception(e,"id:"+hid));
				return;
			}
	
			
		}
		if(hascache&&(!hero.getTempVariables().isLoginSuccess())&&(!hero.getTempVariables().isLogoutState())) {
			Map<Long, SpecialRechargeInfo> waitRechargeMap = hero.getWaitRechargeMap();
			if (parameters == null) {
				parameters = "";
			}
			byte igm = 0;
			if(isGM) {
				igm = 1;
			}
			long cpOrderNum = TimeDateUtil.getCurrentTimeInMillis();
			if(!isGM) {
				cpOrderNum = Long.parseLong(paramMap.get(HoutaiConst.cp_order_num));
			}
			SpecialRechargeInfo specialRechargeInfo = new SpecialRechargeInfo(hid, igm, product_id, paramMap, parameters);
			waitRechargeMap.put(cpOrderNum, specialRechargeInfo);
			return;
		}
		if (!isGM) {
			try {
				int pay_time=Integer.parseInt(paramMap.get(HoutaiConst.pay_time));
				long cp_order_num=Long.parseLong(paramMap.get(HoutaiConst.cp_order_num));
				String product_sdkid=paramMap.get(HoutaiConst.order_num);
				//0??????????????????1??????????????????
				int order_formType=0;
				//???????????????????????????????????????????????????
				String payType="";
				String[] split = product_sdkid.split("\\.");
				if (split.length>1&&split[1]!=null) {
					payType=split[1];
				}
				B_PayAccount m_PayAccount=HoutaiDao.getIns().getB_PayAccount(cp_order_num, hero.getZoneid());
				String pfCode = m_PayAccount.getPfcode();
				
		        //????????????????????????????????????order_fromType = 0
		        if(pfCode.contains("wxsgzj")) {
		            //????????????????????????????????????????????????????????????
		            if(payType.equals(HoutaiConst.midas)){
		            	order_formType = 0;
		            }else{
		            	order_formType = 1;
		            }
		        }else{
		            //?????????else???????????????????????????????????????????????????????????????????????????
		        	order_formType = 0;
		        }
				// ?????????????????????
				if (m_PayAccount.getPayState() != RechargeConst.RECHARGE_STATE0) {
					LogTool.warn("HeroFunction recharge hid=" + hid + ", cp_order_num=" + cp_order_num, this);
					return;
				}
				//???????????????
				m_PayAccount.setOrder_formType(order_formType);
				m_PayAccount.setPayType(payType);
				m_PayAccount.setProduct_sdkid(product_sdkid);
				m_PayAccount.setSuccessPayNum(hero.getSuccessPayNum()+1);
				m_PayAccount.setPayState(RechargeConst.RECHARGE_STATE1);
				m_PayAccount.setVipLv(hero.getVipLv());
				m_PayAccount.setPayTime(pay_time);
				m_PayAccount.setUpdateTime(TimeDateUtil.getCurrentTime());
				HoutaiDao.getIns().updateB_PayAccount(hero.getZoneid(), m_PayAccount);
				parameters = m_PayAccount.getParameters();
				hero.setSuccessPayNum(hero.getSuccessPayNum()+1);
			} catch (Exception e) {
				logger.error(LogTool.exception(e, hero.getId(),hero.getNameZoneid(), "recharge has error!"));
			}
		}
		try {
			int productId = (int) product_id;
			Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(productId);
			
			double addYuanBao=struct_shop_011.getNum();
			int rechargeType = struct_shop_011.getType();
			//????????????
			if(!UseAddUtil.canAdd(hero, GameConst.YUANBAO, (int)addYuanBao)){
				return;
			}
			double fanbei1=Config_xtcs_004.getIns().get(RechargeConst.DOUBLE_RECHARGE).getNum();
			double fanbei2=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE).getNum();
			
			double doubleNum=fanbei1/100.00;
			double normalNum=fanbei2/100.00;
			
			if (rechargeType == RechargeConst.YB) {
				//??????
				Struct_chongzhi_716 struct_chongzhi_716 = Config_chongzhi_716.getIns().get(productId);
				if (productId==RechargeConst.rechargeItemId_998) {
					fanbei1=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE_998).getNum();
					doubleNum=fanbei1/100.00;
				}else if (productId==RechargeConst.rechargeItemId_1998) {
					fanbei1=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE_1998).getNum();
					doubleNum=fanbei1/100.00;
				}
				int cz = struct_chongzhi_716.getCz();
				Set<Integer> rechargeGrade = hero.getRechargeGrade();
				if (cz == 0) {
					// ??????3???
					addYuanBao = addYuanBao * doubleNum;
				} else if (cz == 1) {
					if (rechargeGrade.contains(productId)) {
						addYuanBao = addYuanBao * normalNum;
					} else {
						// 3???
						addYuanBao = addYuanBao * doubleNum;
					}
					rechargeGrade.add(productId);
				}
				int resetNum = getRechargeResetNum();
				if (rechargeGrade.size() == resetNum) {
					rechargeGrade.clear();
				}
				UseAddUtil.add(hero, GameConst.YUANBAO, (int)addYuanBao, SourceGoodConst.RECHARGE, true);
				LogTool.info("RechargeConst.YB hid"+hid+", addYuanBao="+addYuanBao, this);
			} else if (rechargeType == RechargeConst.TEQUANKA) {
				//????????? 
				UseAddUtil.add(hero, GameConst.YUANBAO, (int)addYuanBao, SourceGoodConst.RECHARGE, true);
			} else if (rechargeType == RechargeConst.FIRST_RECHARGE) {
				// ??????

			} else if (rechargeType == RechargeConst.DAILYDIRECTBUY) {
				// ??????????????????,??????????????????
				DailyDirectBuyFunction.getIns().dailyDirectBuyRechargeHandle(hero, paramMap,parameters);
				DailyDirectBuyActFunction.getIns().dailyDirectBuyRechargeHandle(hero, paramMap, parameters);
				OtherDailyDirectBuyFunction.getIns().dailyDirectBuyRechargeHandle(hero, paramMap, parameters);
			} else if (rechargeType == RechargeConst.WEEK_CARD) {
				// ????????????
				UseAddUtil.add(hero, GameConst.YUANBAO, (int)addYuanBao, SourceGoodConst.RECHARGE, true);
			} else if (rechargeType == RechargeConst.EXTRA_VALUE_GIFT || rechargeType == RechargeConst.EXTRA_VALUE_GIFT_MONTH) {//????????????
				ExtraValueGiftBagFunction.getIns().extraValueGiftBagRechargeHandle(hero,rechargeType, productId);
			} else if(rechargeType == RechargeConst.COLLECT_TREASURY) {//?????????
				CollectTreasuryFunction.getIns().collectTreasuryRechargeHandle(hero, productId);
			}
			int money=struct_shop_011.getRmb()/100;
			//???????????????
			rechargeHandle(hero, money, productId);
			LogTool.info("recharge rechargeHandle end hid="+hid, this);
			hero.setChongZhiYuan(hero.getChongZhiYuan() + money);
			
			//???????????????
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);

			if(hero!=null) {
				if(HeroCache.getHero(hid)==null) {
					HeroCache.putHero(hero);
					LogTool.info("recharge HeroCache.putHero hid="+hid, this);
					hascache = false;
				}
			}
			if(!hero.isOnline()) {
				LogTool.info("recharge not Online hid="+hid, this);
				hascache = false;
			}
			if(!hascache){
				HeroCache.putHero(hero);
				HeroDataSaver.addLogoutSaver(hero);
				LogTool.info("recharge addLogoutSaver hid="+hid, this);
			}
			HeroManager.getIns().openRecharge(hero);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(),hero.getNameZoneid(), "recharge has error!"));
		}
	}
	
	public int getRechargeResetNum() {
		List<Struct_chongzhi_716> sortList = Config_chongzhi_716.getIns().getSortList();
		int size = sortList.size();
		int num = 0;
		for (int i = 0; i < size; i++) {
			if (sortList.get(i).getCz() == 1) {
				num += 1;
			}
		}
		return num;
	}

	/**
	 * ????????????????????????
	 * @param hero
	 * @param money rmb???
	 */
	public void rechargeHandle(Hero hero, int money,int product_id){
		List<AbsRechargeEvent> events = RechargeEventCache.getEvents();
		for(AbsRechargeEvent event:events){
			try {
				event.recharge(hero, money,product_id);
			} catch (Exception e) {
				logger.error(LogTool.exception(e, hero.getId(),hero.getNameZoneid(), "rechargeHandle has error! event:"+event.getClass().getName()));
			}
		}
	}
	
	/**
	 * ???????????????????????? ??????????????????
	 * @author lobbyer
	 * @param hero
	 * @param money
	 * @param reason
	 * @date 2017???6???26???
	 */
	public void consumeHandle(Hero hero, int money,int reason){
		HashMap<Integer, AbsConsumeEvent[]> events = ConsumeEventCache.getEvents();
		Iterator<Entry<Integer, AbsConsumeEvent[]>> it = events.entrySet().iterator();
		while(it.hasNext()){
			Entry<Integer, AbsConsumeEvent[]> next = it.next();
			int type = next.getKey();
			AbsConsumeEvent[] event = next.getValue();
			boolean go = false;
			if(type==ConsumeEventCache.ALL){
				go = true;
			}else{
				//??????????????????
				/*ActivityInfo activityInfo = onProcessInfoMap.get(type);
				if(activityInfo!=null){
					if(ActivityFunction.getIns().isCanOpenActivity(activityInfo.getType())){
						go = true;
					}
				}*/
			}
			if(go){
				try {
					for(AbsConsumeEvent e:event){
						e.consumeHandle(hero, money, reason);
					}
				} catch (Exception e) {
					LogTool.error(e, this, hero.getId(),hero.getNameZoneid(), "consumeHandle has error! event:"+event.getClass().getName());
				}
			}
		}
	}

	/**
	 * ??????????????????????????????
	 */
	public void addLoginSytemState(Hero hero, int sysId, int state) {
		hero.getSystemStateMap().put(sysId, state);
	}

	public void sendSystemState(long hid, int sysId, int state) {
		List<Object[]> sendList = new ArrayList<>();
		sendList.add(new Object[] { sysId, state });
		HeroSender.sendCmd_158(hid, sendList.toArray());
	}
	/**
	 * ??????????????????
	 * @param hero
	 */
	public void loginRebornUpReadPoint(Hero hero,boolean islogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, 4101)) {
			return;
		}
		int nextid=0;
		int[][] tiaojia;
		int[][] reward;
		boolean isUp=false;
		if (Config_zhuansheng_705.getIns().get(hero.getRebornlv())!=null&&
				Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getNextid()!=0) {
			nextid=Config_zhuansheng_705.getIns().get(hero.getRebornlv()).getNextid();
		}else {
			return;
		}
		tiaojia=Config_zhuansheng_705.getIns().get(nextid).getCondition();
		reward=Config_zhuansheng_705.getIns().get(nextid).getAward();
		if (tiaojia==null||reward==null) {
			return;
		}
		for (int i = 0; i < tiaojia.length; i++) {
			int type=tiaojia[i][0];
			int num=tiaojia[i][1];
			switch (type) {
			case 1:
				//??????
				if (hero.getRealLevel()>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;
			case 2:
				//???????????????
				if (ForgeFunction.getIns().maxBaoShiSum(hero)>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;
			case 3:
				//???????????????
				if (ForgeFunction.getIns().maxStrength(hero)>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;
			case 4:
				//???????????????
				if (ForgeFunction.getIns().maxStar(hero)>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;
			case 5:
				//????????????????????????
				if (SkillFunction.getIns().getMaxNum(hero)>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;
			case 6:
				//????????????
				if (hero.getOfficial()>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;
			case 7:
				//??????????????????
				if (hero.getPeacockFloor().getFloorNum()>=num) {
					isUp=true;
				}else {
					isUp=false;
				}
				break;	
			default:
				break;
			}
			if (!isUp) {
				break;
			}
		}
		//??????
		if (isUp&&UseAddUtil.canAdd(hero, reward, false)) {
			if (islogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero,4101, 1, RedPointConst.HAS_RED);
			}/*else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero,4101, 1, RedPointConst.HAS_RED);
			}*/
		}
		
	}

	/**
	 * ?????????????????????
	 * 
	 * @param hero
	 */
	public void sendWaitList(Hero hero) {
		try {
			List<Object[]> waitSendList = hero.getWaitSendList();
			if (waitSendList == null) {
				return;
			}
			hero.setWaitSendList(null);
			Channel channel = hero.getChannel();
			for (Object[] obj : waitSendList) {
//				HeroCache.countSecondCmd((Integer) obj[0], hero.getId());
				NettyWrite.writeData(channel, (Object[]) obj[1], (Integer) obj[0]);
			}
		} catch (Exception e) {
			LogTool.error(e, HeroFunction.class, "HeroFunction sendWaitList");
		}
	}
	/**
	 * ??????????????? 
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean useRechargeCare(Hero hero, int id, int num) {
		Struct_shop_011 struct_shop_011=null;
		for (Struct_shop_011 shop_011:Config_shop_011.getIns().getSortList()) {
			if (shop_011.getDaoju()==id) {
				struct_shop_011=shop_011;
			}
		}
		double addYuanBao=struct_shop_011.getNum();
		//????????????
		if(!UseAddUtil.canAdd(hero, GameConst.YUANBAO, (int)addYuanBao)){
			return false;
		}
		int rechargeType = struct_shop_011.getType();
		int productId = struct_shop_011.getIndex();
		int money=struct_shop_011.getRmb()/100;
		if (rechargeType == RechargeConst.YB) {
			//??????
			double fanbei1=Config_xtcs_004.getIns().get(RechargeConst.DOUBLE_RECHARGE).getNum();
			double fanbei2=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE).getNum();
			
			double doubleNum=fanbei1/100.00;
			double normalNum=fanbei2/100.00;
			
			//??????
			Struct_chongzhi_716 struct_chongzhi_716 = Config_chongzhi_716.getIns().get(productId);
			if (productId==RechargeConst.rechargeItemId_998) {
				fanbei1=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE_998).getNum();
				doubleNum=fanbei1/100.00;
			}else if (productId==RechargeConst.rechargeItemId_1998) {
				fanbei1=Config_xtcs_004.getIns().get(RechargeConst.NORMAL_RECHARGE_1998).getNum();
				doubleNum=fanbei1/100.00;
			}
			
			int cz = struct_chongzhi_716.getCz();
			Set<Integer> rechargeGrade = hero.getRechargeGrade();
			if (cz == 0) {
				// ??????3???
				addYuanBao = addYuanBao * doubleNum;
			} else if (cz == 1) {
				if (rechargeGrade.contains(productId)) {
					addYuanBao = addYuanBao * normalNum;
				} else {
					// 3???
					addYuanBao = addYuanBao * doubleNum;
				}
				rechargeGrade.add(productId);
			}
/*			int resetNum = getRechargeResetNum();
			if (rechargeGrade.size() == resetNum) {
				rechargeGrade.clear();
			}*/
			UseAddUtil.add(hero, GameConst.YUANBAO, (int)addYuanBao, SourceGoodConst.RECHARGE, true);
		} else if (rechargeType == RechargeConst.TEQUANKA) {
			//????????? 
			UseAddUtil.add(hero, GameConst.YUANBAO, (int)addYuanBao, SourceGoodConst.RECHARGE, true);
		} else if (rechargeType == RechargeConst.FIRST_RECHARGE) {
			// ??????

		}else if (rechargeType == RechargeConst.DAILYDIRECTBUY){
			DailyDirectBuyFunction.getIns().daojuRecharge(hero, money, productId);
		} else if (rechargeType == RechargeConst.WEEK_CARD) {
			// ????????????
			UseAddUtil.add(hero, GameConst.YUANBAO, (int)addYuanBao, SourceGoodConst.RECHARGE, true);
		} else if (rechargeType == RechargeConst.SHAO_ZHU_GOLD_PIG) {
			// ????????????-????????????
			
		} else if (rechargeType == RechargeConst.EXTRA_VALUE_GIFT || rechargeType == RechargeConst.EXTRA_VALUE_GIFT_MONTH) {//????????????
			ExtraValueGiftBagFunction.getIns().extraValueGiftBagRechargeHandle(hero, rechargeType, productId);
		} else if(rechargeType == RechargeConst.COLLECT_TREASURY) {//?????????
			CollectTreasuryFunction.getIns().collectTreasuryRechargeHandle(hero, productId);
		}
		//???????????????
		rechargeHandle(hero, money, productId);
		LogTool.info(hero.getId(), hero.getNameZoneid(), "useRechargeCare success: "+id, HeroFunction.class);
		return true;
	}

	public void loginSendVip3(Hero hero){
		int awardsCreateHero = hero.getAwardsCreateHero();
		if(awardsCreateHero == 1)
			return;
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.LOGIN_SEND_VIP3);
		int[][] awards = excel.getOther();
		UseAddUtil.add(hero, awards, SourceGoodConst.REWARD_LOGIN_SEND_VIP3, UseAddUtil.getDefaultMail(), false);
		hero.setAwardsCreateHero(1);
	}
	
	/**
	 * ???????????????????????????????????????string
	 * 
	 * @param hero
	 * @param data
	 */
	public String mapObjDataToStr(Map<Object, Object> data) {
		if (data == null)
			return null;
		StringBuffer sb = new StringBuffer();
		sb.append(GameConst.s);
		int size = data.size();
		int i = 1;
		Iterator<Entry<Object, Object>> it = data.entrySet().iterator();
		while (it.hasNext()) {
			Entry<Object, Object> next = it.next();
			Object key = next.getKey();
			Object value = next.getValue();
			sb.append(GameConst.y).append(key).append(GameConst.y).append(GameConst.m);
			if (value instanceof String) {
				sb.append(GameConst.y).append(value.toString()).append(GameConst.y);
			} else {
				sb.append(value.toString());
			}
			if (i++ < size)
				sb.append(GameConst.d);
		}
		sb.append(GameConst.e);
		return sb.toString();
	}

	/**
	 * ????????????????????????????????????????????????ID
	 */
	public int getCrossSysid(long hid) {
		boolean online = HeroFunction.getIns().isOnline( hid);
		if(!online)
			return 0;
		Hero hero = HeroCache.getHero( hid);
		if(hero==null) 
			return 0;
		int crossLoginType = hero.getTempVariables().getCrossLoginType();
		return crossLoginType;
	}
}
