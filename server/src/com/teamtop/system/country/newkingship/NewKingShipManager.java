package com.teamtop.system.country.newkingship;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_xwwzdjl_311;
import excel.config.Config_xwwzdnpc_311;
import excel.struct.Struct_xwwzdjl_311;
import excel.struct.Struct_xwwzdnpc_311;

public class NewKingShipManager {
	private static NewKingShipManager newKingShipManager;

	private NewKingShipManager() {

	}

	public static synchronized NewKingShipManager getIns() {
		if (newKingShipManager == null) {
			newKingShipManager = new NewKingShipManager();
		}
		return newKingShipManager;
	}

	public void openUINewKingShip(Hero hero) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			if (NewKingShipCache.getIns().isStartWeek()) {
				String[] openSplit = NewKingShipConst.OPEN_TIME.split(":");
				Integer openHour = Integer.valueOf(openSplit[0]);
				Integer openMin = Integer.valueOf(openSplit[1]);
				int openTime = TimeDateUtil.getOneTime(0, openHour, openMin, 0);

				String[] endSplit = NewKingShipConst.END_TIME.split(":");
				Integer endHour = Integer.valueOf(endSplit[0]);
				Integer endMin = Integer.valueOf(endSplit[1]);
				int endTime = TimeDateUtil.getOneTime(0, endHour, endMin, 0);

				if (currentTime >= openTime && currentTime < endTime) {
					NewKingShipCache.isWWStartTime = true;
				} else {
					NewKingShipCache.isWWStartTime = false;
				}
			} else {
				NewKingShipCache.isWWStartTime = false;
			}
			if (NewKingShipCache.isWWStartTime) {
				if(NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().size()==0){
					NewKingShipEvent.getIns().fixTimeStart();
					NewKingShipCache.updateGlobalData();
					LogTool.info("rest start NewKingShip ", NewKingShipManager.class);
				}else {
					LogTool.info("NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().size()!=0", NewKingShipManager.class);
					int kongsize=0;
					for (int i = 1; i <=3; i++) {
						ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = NewKingShipCache.getNewKingShipSysCache().getJoinerNewKingShiper().get(i);
						if (concurrentHashMap==null||concurrentHashMap.size()==0) {
							kongsize++;
						}
					}
					LogTool.info("kongsize="+kongsize, NewKingShipManager.class);
					if (kongsize==3) {
						LogTool.info("kongsize==3", NewKingShipManager.class);
						NewKingShipEvent.getIns().fixTimeStart();
						NewKingShipCache.updateGlobalData();
					}
				}
				LogTool.info("NewKingShipCache.isWWStartTime true", NewKingShipManager.class);
			}else {
				LogTool.info("NewKingShipCache.isWWStartTime flase", NewKingShipManager.class);
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
			NewKingWar newKingWar=hero.getNewKingWar(); 
			Object[] objectList=new Object[10];
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper = newKingShipSysCache.getJoinerNewKingShiper();
			ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = joinerNewKingShiper.get(hero.getCountryType());
			int state=0;
			int gameEndTime=0;
	        if (NewKingShipCache.isWWStartTime) {
	        	state=1;
				String[] split = NewKingShipConst.END_TIME.split(":");
				Integer hour = Integer.valueOf(split[0]);
				Integer min = Integer.valueOf(split[1]);
				gameEndTime = TimeDateUtil.getOneTime(0, hour, min, 0) - currentTime;
				
			} else {
				state=2;
				String[] split = NewKingShipConst.OPEN_TIME.split(":");
				Integer hour = Integer.valueOf(split[0]);
				Integer min = Integer.valueOf(split[1]);
				int time = 0;
				if (NewKingShipCache.getIns().isStartWeek() && currentTime < TimeDateUtil.getOneTime(0, hour, min, 0)) {
					time = 0;
				} else {
					time =NewKingShipFunction.getIns().calcDistantDay();
				}
				gameEndTime = TimeDateUtil.getOneTime(time, hour, min, 0) - currentTime;
				
			}
			int i=0;
			for (NewKingShip newKingShip:concurrentHashMap.values()) {
				if(newKingShip.getType()==1) {
					long hid = newKingShip.getId();
					Hero hero1=HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
					int sit=newKingShip.getSit()%100;
					objectList[i]=new Object[] {hero1.getId(),0,hero1.getNameZoneid(),hero1.getTotalStrength(),hero1.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(hero1),sit,hero1.getMountId()};
				    i++;
				}else {
					int sit=newKingShip.getSit()%100;
					objectList[i]=new Object[] {0l,(int)newKingShip.getNpcid(),"",0l,0,0,sit,0};
				    i++;
				}
			}
			//新王位争夺数据返回 [L:玩家IDU:玩家名字L:玩家战力I:玩家时装B:玩家位置1魏王2魏相3魏国大将军]列表数据B:活动状态1：开始，2：结束B:是否已领取俸禄B:剩余挑战次数I:挑战结束剩余时间
			objectList=CommonUtil.removeNull(objectList);
			int recoverTime =NewKingShipFunction.getIns().calcrecoverTime(hero); // 刷新挑战次数时间
			//[L:玩家ID 玩家id=0时 为npcI:npc系统idU:玩家名字L:玩家战力I:玩家时装B:玩家位置1魏王2魏相3魏国大将军]列表数据B:活动状态1：开始，2：结束B:是否已领取俸禄B:剩余挑战次数I:挑战结束剩余时间B:膜拜状态，只有结束UI才会使用，是否膜拜，0：没膜拜，1：已膜拜B:已购买次数I:恢复次数时间
			NewKingShipSender.sendCmd_5202(hero.getId(), objectList, state, newKingWar.getIsHasReward(), newKingWar.getBattleNum(), gameEndTime,newKingWar.getMobai(),newKingWar.getBuyChaTimes(),recoverTime);
		    return;
		} catch (Exception e) {
			LogTool.error(e, NewKingShipManager.class, "NewKingShipManager has wrong");
		}
		
	}
	/**
	 * 挑战王位之争对应的位置
	 * @param hero
	 * @param sitid
	 */
	public void battle(Hero hero, int sitid,long roleID) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			if (NewKingShipCache.isWWStartTime) {
				int serverSitid=hero.getCountryType()*100+sitid;
				NewKingWar newKingWar=hero.getNewKingWar(); 
				if (newKingWar.getBattleNum()<=0) {
					newKingWar.setBattleNum(0);
					NewKingShipSender.sendCmd_5204(hero.getId(), 6, sitid);
					return;
				}
				NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
				ConcurrentHashMap<Integer, long[]> battleMap = NewKingShipCache.getBattleMap();
				//检测这个位置是否在战斗
				if (battleMap.containsKey(serverSitid)) {
					long[] battleinfo=battleMap.get(serverSitid);
					int battleTime=(int)battleinfo[2];
					if (TimeDateUtil.getCurrentTime()-battleTime>60) {
						//此位置战斗大于60秒 
						battleMap.remove(serverSitid);
					}else {
						//正在战斗中
						NewKingShipSender.sendCmd_5204(hero.getId(), 2, sitid);
						return;
					}
				}
				//检测本人是否在战斗
				for (int key:battleMap.keySet()) {
					long[] battleinfo = battleMap.get(key);
					long battleA=battleinfo[0];
					long battleB=battleinfo[1];
					if (battleA==hero.getId()||battleB==hero.getId()) {
						//自身正在战斗
						NewKingShipSender.sendCmd_5204(hero.getId(), 3, sitid);
						return;
					}
				}
				
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper = newKingShipSysCache.getJoinerNewKingShiper();
				ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = joinerNewKingShiper.get(hero.getCountryType());
				NewKingShip newKingShip = concurrentHashMap.get(serverSitid);
				if(newKingShip.getId()==hero.getId()) {
					//不能挑战自己
					NewKingShipSender.sendCmd_5204(hero.getId(), 4, sitid);
					openUINewKingShip(hero);
					return;
				}
				if (roleID!=newKingShip.getId()) {
					//挑战位置变化了
					NewKingShipSender.sendCmd_5204(hero.getId(), 7, sitid);
					openUINewKingShip(hero);
					return;
				}
				if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
					//打人
					HeroFunction.getIns().sendBattleHeroAttr(hero, newKingShip.getId());
				}
				long[] battleinfo=new long[] {hero.getId(),newKingShip.getId(),TimeDateUtil.getCurrentTime()};
				battleMap.put(newKingShip.getSit(), battleinfo);
				NewKingShipSender.sendCmd_5204(hero.getId(), 0, sitid);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, NewKingShipManager.class, "battle has wrong");
		}
		
	}

	public void battlerest(Hero hero,  int rest) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			if (NewKingShipCache.isWWStartTime) {
				int serverSitid=0;
				ConcurrentHashMap<Integer, long[]> battleMap = NewKingShipCache.getBattleMap();
				for (int key:battleMap.keySet()) {
					long[] battleinfo = battleMap.get(key);
					long battleA=battleinfo[0];
					if (battleA==hero.getId()) {
						serverSitid=key;
					}
				}
				if (serverSitid==0) {
					LogTool.warn("serverSitid==0"+serverSitid, NewKingShipManager.class);
					return;
				}
				NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper = newKingShipSysCache.getJoinerNewKingShiper();
				ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = joinerNewKingShiper.get(hero.getCountryType());
				int mysit=0;
				NewKingShip myNewKingShip=null;
				for (NewKingShip newKingShip:concurrentHashMap.values()) {
					if (newKingShip.getId()==hero.getId()) {
						mysit=newKingShip.getSit();
						myNewKingShip=newKingShip;
						break;
					}
				}
				
				
				int serverResult = 0;// 服务计算的结果 0：失败，1：胜利，2：以前端结果为准
				NewKingShip newKingShip = concurrentHashMap.get(serverSitid);
				if (newKingShip.getType()==NewKingShipConst.TYPE_0) {
					//机器人
					serverResult = BattleFunction.checkWinGuanqiaBoss(hero, newKingShip.getNpcid());
				}else {
					Hero beHero = HeroCache.getHero(newKingShip.getId(), HeroConst.FIND_TYPE_BATTLE);
					serverResult = BattleFunction.checkWinPlayer(hero, beHero, BattleConst.OTHER);
					HeroFunction.getIns().sendBattleHeroAttr(hero, newKingShip.getId());
				}
				if (serverResult == 2) {
					serverResult = rest;
				}
				if (rest == 2 || rest == 0) {
					serverResult = 0;
				}
				//个人王位之争的数据 
				NewKingWar newKingWar=hero.getNewKingWar(); 
				if (newKingWar.getBattleNum() == NewKingShipConst.BATTLENUM) {
					newKingWar.setRefreshTime(TimeDateUtil.getCurrentTime());
				}
				newKingWar.setBattleNum(newKingWar.getBattleNum()-1);
				newKingWar.setNextBattleTime(TimeDateUtil.getCurrentTime()+NewKingShipConst.BATTLE_CD);
				if (serverResult == 1) {
					//战斗胜利
					int[][] successAwards = Config_xtcs_004.getIns().get(NewKingShipConst.KINGSHIP_SUCCESS_AWARD).getOther();
					UseAddUtil.add(hero, successAwards, SourceGoodConst.KS_CHA_SUCCESS, null, true);
					
					if (mysit!=0&&mysit>=serverSitid) {
						Object[] arrs=new Object[2];
						//交换位置
						concurrentHashMap.put(serverSitid, myNewKingShip);
						myNewKingShip.setSit(serverSitid);
						
						concurrentHashMap.put(mysit, newKingShip);
						newKingShip.setSit(mysit);
						
						if (myNewKingShip.getType()==NewKingShipConst.TYPE_1) {
							arrs[0]=new Object[] {hero.getId(),0,hero.getNameZoneid(),hero.getTotalStrength(),hero.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(hero),serverSitid%100,hero.getMountId()};
						}else {
							arrs[0]=new Object[] {0,(int)myNewKingShip.getId(),"",0,0,0,serverSitid%100,0};
						}
						
						if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
							long hid = newKingShip.getId();
							Hero hero1=HeroCache.getHero(hid, HeroConst.FIND_TYPE_BASIC);
							arrs[1]=new Object[] {hero1.getId(),0,hero1.getNameZoneid(),hero1.getTotalStrength(),hero1.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(hero1),mysit%100,hero1.getMountId()};
							if (HeroFunction.getIns().isOnline(hid)) {
								NewKingShipSender.sendCmd_5216(hero1.getId(), hero.getName(), mysit%100);
							}
						}else {
							arrs[1]=new Object[] {0,(int)newKingShip.getId(),"",0,0,0,mysit%100,0};
						}
						//结束战斗
						battleMap.remove(serverSitid);
						NewKingShipSender.sendCmd_5206(hero.getId(), 0, serverSitid);
						NewKingShipSender.sendCmd_5208(hero.getId(), arrs);
						return;
					}else if (mysit==0) {
						long oldId=0;
						if (newKingShip.getType()==NewKingShipConst.TYPE_1) {
							oldId=newKingShip.getId();
							if (HeroFunction.getIns().isOnline(oldId)) {
								Hero hero1=HeroCache.getHero(oldId);
								NewKingShipSender.sendCmd_5216(hero1.getId(), hero.getName(), 0);
							}
						}
						//上位
						newKingShip.setId(hero.getId());
						newKingShip.setType(NewKingShipConst.TYPE_1);
						newKingShip.setNpcid(0);
						concurrentHashMap.put(serverSitid, newKingShip);
						//结束战斗
						battleMap.remove(serverSitid);
						Object[] arrs=new Object[1];
						arrs[0]=new Object[] {hero.getId(),0,hero.getNameZoneid(),hero.getTotalStrength(),hero.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(hero),serverSitid%100};
						NewKingShipSender.sendCmd_5206(hero.getId(), 0, serverSitid);
						NewKingShipSender.sendCmd_5208(hero.getId(), arrs);
						
						return;
					}else if(mysit<serverSitid) {
						//往下打
						battleMap.remove(serverSitid);
						NewKingShipSender.sendCmd_5206(hero.getId(), 0, serverSitid);
						return;
					}
					
				}else {
					battleMap.remove(serverSitid);
					//战斗失败
					int[][] successAwards =Config_xtcs_004.getIns().get(NewKingShipConst.KINGSHIP_FAILUER_AWARD).getOther();
					UseAddUtil.add(hero, successAwards, SourceGoodConst.KS_CHA_FAIL, null, true);
					NewKingShipSender.sendCmd_5206(hero.getId(), 1, serverSitid);
				}
				
			}else {
				NewKingShipSender.sendCmd_5206(hero.getId(), 2, 0);
				return;
			}
			
		} catch (Exception e) {
			LogTool.error(e, NewKingShipManager.class, "battlerest has wrong");
		}
		
	}
	/**
	 * CG 获取俸禄 5209
	 */
	public void getreward(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			NewKingWar newKingWar=hero.getNewKingWar(); 
			if (newKingWar.getIsHasReward()>0) {
				NewKingShipSender.sendCmd_5210(hero.getId(), 1);
				return;
			}
			NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper = newKingShipSysCache.getJoinerNewKingShiper();
			ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = joinerNewKingShiper.get(hero.getCountryType());
			int mysit=0;
			for (NewKingShip newKingShip:concurrentHashMap.values()) {
				if (newKingShip.getId()==hero.getId()) {
					mysit=newKingShip.getSit();
					break;
				}
			}
			int guanxianId=hero.getCountryType()*1000;
			if (mysit==0) {
				guanxianId=guanxianId+NewKingShipConst.PINGMING;
			}else {
				for (Struct_xwwzdnpc_311 xwwzdnpc_311: Config_xwwzdnpc_311.getIns().getSortList()) {
					if (xwwzdnpc_311.getSite()==mysit) {
						guanxianId=xwwzdnpc_311.getNum();
					}
				}
			}
			Struct_xwwzdjl_311 struct_xwwzdjl_311 = Config_xwwzdjl_311.getIns().get(guanxianId);
			if (struct_xwwzdjl_311==null) {
				LogTool.warn("warn warn warn struct_xwwzdjl_311==null", NewKingShipManager.class);
				return;
			}
			if (UseAddUtil.canAdd(hero, struct_xwwzdjl_311.getReward(), false)) {
				UseAddUtil.add(hero, struct_xwwzdjl_311.getReward(), SourceGoodConst.NEW_KING_WAR, null, true);
				newKingWar.setIsHasReward(1);
				NewKingShipSender.sendCmd_5210(hero.getId(),0);
				return;
			}else {
				NewKingShipSender.sendCmd_5210(hero.getId(),1);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, NewKingShipManager.class, "getreward has wrong");
		}
		
	}
	/**
	 * 获取膜拜奖励
	 * @param hero
	 */
	public void getMobai(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			if (NewKingShipCache.isWWStartTime) {
				NewKingShipSender.sendCmd_5212(hero.getId(), 2);
				return;
			}
			NewKingWar newKingWar=hero.getNewKingWar(); 
			if (newKingWar.getMobai()>0) {
				NewKingShipSender.sendCmd_5212(hero.getId(), 1);
				return;
			}
			int[][] mobaiAwards = Config_xtcs_004.getIns().get(NewKingShipConst.MOBAI).getOther();
			if (UseAddUtil.canAdd(hero, mobaiAwards, false)) {
				UseAddUtil.add(hero, mobaiAwards, SourceGoodConst.KS_MOBAI_AWARDS, null, true);
				newKingWar.setMobai(1);
				NewKingShipSysCache newKingShipSysCache = NewKingShipCache.getNewKingShipSysCache();
				NewKingShipSender.sendCmd_5212(hero.getId(), 0);
				ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, NewKingShip>> joinerNewKingShiper = newKingShipSysCache.getJoinerNewKingShiper();
				ConcurrentHashMap<Integer, NewKingShip> concurrentHashMap = joinerNewKingShiper.get(hero.getCountryType());
				for (NewKingShip newKingShip:concurrentHashMap.values()) {
					if (newKingShip.getType()==NewKingShipConst.TYPE_1&&newKingShip.getId()>0) {
						int[][] beMobaiAwards = Config_xtcs_004.getIns().get(NewKingShipConst.BEIMOBAI).getOther();
						Object[] contentData = new Object[] { MailConst.MAIL_ID_BEMOBAI_AWARD };
						MailFunction.getIns().sendMailWithFujianData2(newKingShip.getId(), MailConst.MAIL_ID_BEMOBAI_AWARD, contentData,beMobaiAwards);
					}
				}
			
			}
		} catch (Exception e) {
			LogTool.error(e, NewKingShipManager.class, "getMobai has wrong");
		}
		
	}
	/**
	 * 购买次数
	 * @param hero
	 * @param num
	 */
	public void buyTime(Hero hero, int num) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, NewKingShipConst.COUNTRY_KINGSHIP)) {
				return;
			}
			if (hero.getCountryType() == 0) {
				return;
			}
			if (num<=0) {
				return;
			}
			NewKingWar newKingWar=hero.getNewKingWar(); 
			if (!NewKingShipCache.isWWStartTime) {
				int recoverTime =NewKingShipFunction.getIns().calcrecoverTime(hero); // 刷新挑战次数时间
				NewKingShipSender.sendCmd_5214(hero.getId(), 2, newKingWar.getBattleNum(), newKingWar.getBattleNum(), recoverTime);
				return;
			}
			
			int canBuyTimes = Config_xtcs_004.getIns().get(NewKingShipConst.KINGSHIP_CANBUGTIMES).getNum();
			int[][] other = Config_xtcs_004.getIns().get(NewKingShipConst.KINGSHIP_BUGTIMES_CONSUME).getOther();
			int recoverTime =NewKingShipFunction.getIns().calcrecoverTime(hero); // 刷新挑战次数时间
			
			int battleNum = newKingWar.getBattleNum();
			int buyChaTimes = newKingWar.getBuyChaTimes();
			if (buyChaTimes + num > canBuyTimes) {
				NewKingShipSender.sendCmd_5214(hero.getId(), 4, newKingWar.getBattleNum(), newKingWar.getBattleNum(), recoverTime);
				return;
			}
//			if (battleNum+num>NewKingShipConst.BATTLENUM) {
//				NewKingShipSender.sendCmd_5214(hero.getId(), 3, newKingWar.getBattleNum(), newKingWar.getBattleNum(), recoverTime);
//				return;
//			}
	
			if (!UseAddUtil.canUse(hero, other, num)) { // 没有足够的元宝
				NewKingShipSender.sendCmd_5214(hero.getId(), 1, newKingWar.getBattleNum(), newKingWar.getBattleNum(), recoverTime);
				return;
			}
			UseAddUtil.use(hero, other, num, SourceGoodConst.KS_BUY_CHA, true);
			newKingWar.setBattleNum(battleNum+num);
			newKingWar.setBuyChaTimes(buyChaTimes + num);
			if (newKingWar.getBattleNum()==NewKingShipConst.BATTLENUM) {
				newKingWar.setRefreshTime(TimeDateUtil.getCurrentTime());
				NewKingShipFunction.getIns().calcrecoverTime(hero);
			}
			NewKingShipSender.sendCmd_5214(hero.getId(), 0, newKingWar.getBattleNum(), newKingWar.getBattleNum(), recoverTime);
		    return;
			
		} catch (Exception e) {
			LogTool.error(e, NewKingShipManager.class, "buyTime has wrong");
		}
		
	}
	
}
