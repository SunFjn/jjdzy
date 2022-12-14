package com.teamtop.system.crossSJMiJing;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BuffConst;
import com.teamtop.system.battleNew.BuffFunction;
import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossSJMiJing.cross.CrossSJMiJingCrossToLocal;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJingBoss;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJingRankModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sjmjfb_258;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_sjmjfb_258;
import excel.struct.Struct_zhuangbei_204;

public class CrossSJMiJingFunction {
	private static CrossSJMiJingFunction ins = null;

	public static CrossSJMiJingFunction getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingFunction();
		}
		return ins;
	}

	/**
	 * ??????????????????
	 */
	public int getTypeByID(int mjID) {
		return mjID/1000;
	}
	
	/**
	 * ???????????????????????????
	 * @param	type  1??????  2?????????????????? 
	 */
	public void sendMyTeamData(long hid, int type) {
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get( hid);
		if( teamIDInt==null)
			return;
		Team team = TeamCache.getTeamMap().get( teamIDInt); 
		if( team==null){
			System.out.println("?????????????????????");
			return;
		}
 
		Object[] sendData = TeamFunction.getIns().getTeamSendDataNotRobot(teamIDInt);
		CrossSJMiJingSender.sendCmd_3766(hid, type, teamIDInt, team.getIdRoom(), sendData);
	}
	
	/**
	 * ???????????????????????????????????????????????????
	 */
	public void sendMyTeamBattleData(Map<Long, TeamMember> members) {
		for( TeamMember temp:members.values()){
			long hidTemp = temp.getHid();
			boolean online = HeroFunction.getIns().isOnline(hidTemp);
			if(!online)
				continue;
			Hero heroTemp = HeroCache.getHero(hidTemp);
			if(heroTemp==null)
				continue;
			for( TeamMember temp2:members.values()){
				long hidTemp2 = temp2.getHid();
				if(hidTemp==hidTemp2)
					continue;
				HeroFunction.getIns().sendBattleHeroAttr(heroTemp, hidTemp2);
			}
		}
	}
	
	/**
	 * ????????????????????????????????????
	 */
	public void initMembersBattleData(Map<Long, TeamMember> members, CrossSJMiJingBoss boss){
		List<CrossSJMiJingRankModel> rankList = boss.getRankList();
		long timeNow = TimeDateUtil.getCurrentTimeInMillis();
		for(TeamMember member:members.values()){
			Hero hero = HeroCache.getHero( member.getHid());
			if(hero==null)
				continue;
			CrossSJMiJingRankModel model = new CrossSJMiJingRankModel();
			model.setHid(hero.getId());
			if(!rankList.contains(model)){
				model.setName(hero.getName());
				rankList.add(model);
			}else{
				model = rankList.get(rankList.indexOf(model));
			}
			FinalFightAttr fightAttr = BattleFunction.initHero(hero);
			model.setAttrmap(fightAttr);
			model.fullHp();
			//???n?????????
			model.setInvincibleTime(timeNow+ BattleConst.ATT_WUDI_BEGIN_CONST*1000);
		}
	}
	
	/**
	 * ????????????????????????????????????
	 * @param noShowUIHid ??????????????????????????????ID(????????????)
	 */
	public void death(int teamID, long hid, long noShowUIHid) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if(team==null){
			LogTool.warn("death.team is null.hid:"+hid, this);
			return;
		}
		CrossSJMiJingBoss boss = CrossSJMiJingCache.getCrossSJMJBossMap().get(teamID);
		if(boss==null){
			LogTool.warn("death.boss is null.hid:"+hid, this);
			return;
		}
		
		long deathID = 0;//?????????ID
//		boolean allDeath = true;
		List<CrossSJMiJingRankModel> rankList = boss.getRankList();
		int size = rankList.size();
		// for(CrossSJMiJingRankModel model:rankList){
		for (int i = 0; i < size; i++) {
			CrossSJMiJingRankModel model = rankList.get(i);
			long hidTemp = model.getHid();
			if(hid != 0&& hid == hidTemp){
				model.setDeath(CrossSJMiJingConst.DEATH_YES);
				deathID = hid;
				break;
			}
		}
//		for(CrossSJMiJingRankModel model:rankList){
//			int death = model.getDeath();
//			if(death==CrossSJMiJingConst.DEATH_NO)
//				allDeath = false;
//		}
		
		Map<Long, TeamMember> members = team.getMembers();
		for(TeamMember member:members.values()){
				CrossSJMiJingSender.sendCmd_3782(member.getHid(), deathID);
//				System.out.println("?????????"+member.getHid()+" ?????????"+deathID+"??????");
//			if( allDeath&& member.getRobotId()==0&& member.getHid()!=noShowUIHid) {
//				GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
//				System.out.println("??????????????????????????????name:"+hero.getName()+" sendID:"+member.getHid());
//			}
		}
	}
	
	/**
	 * ????????????????????????
	 * @return  true:?????????
	 */
	public boolean checkMiJingBattled(Hero hero, int mjID) {
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		int type = getTypeByID(mjID);
		Iterator<Entry<Integer, Integer>> iterator = miJingIDMap.entrySet().iterator();
		while(iterator.hasNext()) {
			Entry<Integer, Integer> next = iterator.next();
			Integer mjIDTemp = next.getKey();
			int typeTemp = getTypeByID(mjIDTemp);
			if(typeTemp != type) {
				continue;
			}
			if(mjIDTemp >= mjID)
				return true;
		}
		return false;
	}

	/**
	 * ???????????????????????????????????????????????????????????????ID
	 * @return  0?????????????????????    id??????ID
	 */
	public int getMiJingNextID(Hero hero, int mjID) {
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		int type = getTypeByID(mjID);
		Iterator<Entry<Integer, Integer>> iterator = miJingIDMap.entrySet().iterator();
		int mjIDNext = 0;
		while(iterator.hasNext()) {
			Entry<Integer, Integer> next = iterator.next();
			Integer mjIDTemp = next.getKey();
			int typeTemp = getTypeByID(mjIDTemp);
			if(typeTemp != type) {
				continue;
			}
			mjIDNext = mjIDTemp + 1;//???????????????
		}
		if(mjIDNext == 0)
			mjIDNext = type * 1000 + 1;//???????????????
		Struct_sjmjfb_258 excel = Config_sjmjfb_258.getIns().get(mjIDNext);
		if(excel!=null) {
			return mjIDNext;
		}else {
			return 0;
		}
	}
	
	/**
	 * ????????????????????????
	 * @param mjID
	 * @param teamID
	 * @return
	 */
	public boolean chackTeamID(int mjID, int teamID) {
		Struct_sjmjfb_258 excel = Config_sjmjfb_258.getIns().get(mjID);
		if(excel==null)
			return false;
		Team team = TeamCache.getTeamById(teamID);
		if(team==null)
			return false;
		int teamType = team.getTeamType();
		if(teamType!=SystemIdConst.CROSS_S_J_MI_JING)
			return false;
		CrossSJMiJingBoss boss = CrossSJMiJingCache.getCrossSJMJBossMap().get(teamID);
		if(boss!=null)
			return false;
		return true;
	}

	/**
	 * ??????????????????boss
	 */
	public void scheduleTeamAttBoss(CrossSJMiJingBoss boss, int teamID) {
		try {
			List<CrossSJMiJingRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//??????boss
				CrossSJMiJingCache.removeCrossSJMJBossMap( teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("SJMJ.scheduleAttQmBoss.team is null.teamID:"+teamID, this);
				CrossSJMiJingCache.removeCrossSJMJBossMap( teamID);
				return;
			}
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			long invincibleTime = boss.getInvincibleTime();
			if( invincibleTime> timeNow) {
//				System.out.println("??????Boss??????");
				return;
			}
			
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			Map<Long, TeamMember> members = team.getMembers();
			for(CrossSJMiJingRankModel model :rank){
				int death = model.getDeath();
				if(death == CrossSJMiJingConst.DEATH_NO){
					FinalFightAttr attMember = model.getAttrmap();
					// buff????????????
					TeamMember teamMember = members.get(model.getHid());
					int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
					Hero hero = HeroCache.getHero(model.getHid());
					FightAttr fightAttr = null;
					if (hero != null) {
						fightAttr = hero.getFightAttr();
					}
					long hurt =(long) Math.max(BattleFunction.calcDamg(attMember, attrBoss, tempAttr, fightAttr),1);
//					LogTool.info("hero hit qmboss id:"+qmboss.getBossId()+" damg:"+damg+",hurt:"+hurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
					double curhp = boss.getHp();
					curhp = Math.max( 0, curhp - hurt);
					boss.setHp(curhp);
//					LogTool.info("SJMJ.????????????boss???bossID:"+boss.getBossId()+" hurt:"+hurt+" hpNow:"+curhp,this);//TODO
					model.setHurt( model.getHurt()+ hurt);
					hurtList.add(new Object[]{model.getName(),model.getHurt()});
					
					if(curhp<=0){
						break;
					}
				}
			}
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					try {					
						//??????????????????????????????????????????
						sendAwards(boss, hurtList, team);
					} catch (Exception e) {
						LogTool.error(e, CrossSJMiJingFunction.class, 0, "???????????????", "");
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.CROSS_SJ_MI_JING;
				}
			});
//			System.out.println("??????????????????????????????,TeamAttBoss TeamID:"+teamID+" bossHp:"+boss.getHp());//TODO 
		} catch (Exception e) {
			LogTool.error(e, CrossSJMiJingFunction.class, "SJMJ.scheduleAttQmBoss has wrong");
		}
	}
	
	/**
	 * ????????????boss??????
	 */
	public void scheduleBossAttTeam(CrossSJMiJingBoss boss, int teamID) {
		try {
			List<CrossSJMiJingRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//??????boss
				CrossSJMiJingCache.removeCrossSJMJBossMap( teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("SJMJ.scheduleBossAttTeam.team is null.teamID:"+teamID, this);
				CrossSJMiJingCache.removeCrossSJMJBossMap( teamID);
				return;
			}
			
			boolean allDeath = true;
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			// ??????buff
			BuffFunction.getIns().checkBuffHandle(timeNow, team);
			int rankSize = rank.size();
			CrossSJMiJingRankModel model = null;
			for(int i=0;i<rankSize;i++){
				model = rank.get(i);
				int death = model.getDeath();
				if(death == CrossSJMiJingConst.DEATH_NO) {
					allDeath = false;
					long invincibleTime = model.getInvincibleTime();
					if( invincibleTime> timeNow) {
//						System.out.println("??????????????????????????????,BossAttTeam?????????,hid:"+model.getHid()+" robotid:"+robotID);
						continue;
					}
				}
				
				if(death == CrossSJMiJingConst.DEATH_NO){
					FinalFightAttr attrMember = model.getAttrmap();
					long hurt =(long) Math.max(BattleFunction.calcDamg(attrBoss, attrMember),1);
//					LogTool.info("hero hit qmboss id:"+qmboss.getBossId()+" damg:"+damg+",hurt:"+hurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
					double curhp = attrMember.getHp();
					curhp = Math.max( 0, curhp - hurt);
//					boss.setHp(curhp);
//					LogTool.info("SJMJ.Boss???????????????memberID:"+model.getHid()+" hurt:"+hurt+" hpNow:"+curhp,this);//TODO
					attrMember.setHp((long) curhp);
					
					if(curhp<=0){
						int buffId = BuffConst.RELIVE_BUFF;
						TeamMember member = team.getMembers().get(model.getHid());
						Hero hero = HeroCache.getHero(model.getHid());
						int lv = 0;
						if (hero != null) {
							lv = ZhenYanFunction.getIns().getZhenXinLevel(hero);
						}
						if (lv > 0) {
							// ????????????
							BuffFunction.getIns().buffEffectHandle(buffId, lv, attrMember, member);
							curhp = attrMember.getHp();
						}
						if (curhp <= 0) {
							model.setDeath(CrossSJMiJingConst.DEATH_YES);
							// ????????????????????????
							death(teamID, model.getHid(), 0);
						}
					}
					hurtList.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
				death = model.getDeath();
				if(death == CrossSJMiJingConst.DEATH_NO)
					allDeath = false;
			}
			//????????????
			Map<Long, TeamMember> members = team.getMembers();
			for(TeamMember member:members.values()) {
				long hid = member.getHid();
				boolean online = HeroFunction.getIns().isOnline(hid);
				if(online)
					CrossSJMiJingSender.sendCmd_3784(hid, hurtList.toArray());
				if(allDeath) {
					GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
				}
			}
			//????????????
			if(allDeath) {
				CrossSJMiJingCache.removeCrossSJMJBossMap(team.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSJMiJingFunction.class, "SJMJ.scheduleAttQmBoss has wrong");
		}
	}
	

	/**
	 * ??????????????????????????????????????????
	 */
	public void sendAwards(CrossSJMiJingBoss boss, List<Object[]> hurtList, Team team){
		int mjID = team.getIdRoom();
		List<CrossSJMiJingRankModel> rank = boss.getRankList();
		Collections.sort(rank, CrossSJMiJingHurtComparator.getIns());
		Map<Long, TeamMember> members = team.getMembers();
		long leader = team.getLeader();
		for(CrossSJMiJingRankModel model :rank){
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				continue;
			if(!members.containsKey(hid))
				continue;
			CrossSJMiJingSender.sendCmd_3780(hid, (long)boss.getHpmax(), (long)boss.getHp(), model.getHurt(), hurtList.toArray());
			//boss?????????
			if(boss.getHp()<=0){
				//????????????
				CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
				List<int[]> dropArr = new ArrayList<int[]>();
				List<Object[]> dropTips = new ArrayList<Object[]>();
				List<Object[]> dropTips2 = new ArrayList<Object[]>();
				List<Object[]> dropChatTips = new ArrayList<Object[]>();//??????
				int miJingNextID = getMiJingNextID(hero, mjID);
				//????????????
				int numHelpAwards = crossSJMiJing.getNumHelpAwards();
				boolean checkMiJingBattled = checkMiJingBattled(hero, mjID);
				int weekCardHelp = WeekCardFunction.getIns().getMJHelpNum(hero);
				int totalHelpNum = CrossSJMiJingConst.NUM_HELP_AWARDS_MAX + weekCardHelp;
				//????????????
				int weekCardAdd = WeekCardFunction.getIns().getMJMopUp(hero);
				int totalNum = CrossSJMiJingConst.SAO_DANG_NUM + weekCardAdd;
				int typeByID = CrossSJMiJingFunction.getIns().getTypeByID(mjID);
				Integer numSaoDang = crossSJMiJing.getSaoDangMap().get(typeByID);
				numSaoDang = numSaoDang == null ? 0 : numSaoDang;
				
				// ??????????????????..??????????????????????????????..?????????????????????
				int sendMjID = -1;
				int sendTypeByID = -1;
				int sendNumHelpAwards = -1;
				int index = 0;
				if (checkMiJingBattled && numHelpAwards < totalHelpNum&&leader!=hid) {
					//?????? ??? ?????????
					//Integer numSaoDang = saoDangMap.get(typeByID);
					//?????????????????????????????????
					List<ProbabilityEventModel> helpList = CrossSJMiJingCache.getHalpAwardsMap().get(mjID);
					int size = helpList.size();
					for (int a = 0; a < size; a++) {
						ProbabilityEventModel pe = helpList.get(a);
						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
						if (js != null) {
							int type = js[0];
							if (type == GameConst.GENDROP) {
								int num = js[2];
								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
								for (int j = 1; j <= num; j++) {
									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_3_WAI});
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_3_WAI });
							}
						}
					}

					//?????? ???????????????
					crossSJMiJing.setNumHelpAwards(numHelpAwards + 1);
					CrossSJMiJingSender.sendCmd_3792(hid, numHelpAwards + 1, totalHelpNum);
					// ????????????????????????????????????1???
					sendNumHelpAwards = 1;
				}else if(miJingNextID == mjID) {
					//????????????
					Struct_sjmjfb_258 excel = Config_sjmjfb_258.getIns().get(mjID);
					int[][] rewardST = excel.getReward2();
					for(int[] reward:rewardST) {
						dropArr.add(reward);
						dropTips.add(new Object[] { reward[0], reward[1], reward[2], GlobalConst.YTPE_2_WAI});
					}
					index = dropTips.size();
//					List<ProbabilityEventModel> frishList = CrossSJMiJingCache.getFristAwardsMap().get(mjID);
//					int size = frishList.size();
//					for (int a = 0; a < size; a++) {
//						ProbabilityEventModel pe = frishList.get(a);
//						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
//						if (js != null) {
//							int type = js[0];
//							if (type == GameConst.GENDROP) {
//								int num = js[2];
//								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
//								for (int j = 1; j <= num; j++) {
//									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
//									dropArr.add(js);
//									dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI});
//								}
//							} else {
//								dropArr.add(js);
//								dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
//							}
//						}
//					}
					//????????????
					List<ProbabilityEventModel> bossList = CrossSJMiJingCache.getBossAwardsMap().get(mjID);
					int size = bossList.size();
					boolean isDoubel = crossSJMiJing.isDouble();
					for (int a = 0; a < size; a++) {
						ProbabilityEventModel pe = bossList.get(a);
						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
						if (js != null) {
							int type = js[0];
							if (type == GameConst.GENDROP) {
								int num = js[2];
								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
								for (int j = 1; j <= num; j++) {
									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI});
									if(isDoubel) {
										dropArr.add(js);
										dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
									}
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
								if(isDoubel) {
									dropArr.add(js);
									dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
								}
							}
							
							if(js[0]==GameConst.EQUIP) {
								Struct_zhuangbei_204 excelEquip = Config_zhuangbei_204.getIns().get(js[1]);
								if(excelEquip!=null) {
									int q = excelEquip.getQ();
									if(q == GameConst.RED) {
										dropChatTips.add( new Object[] { hid, hero.getName(), js[1]});
									}
								}
							}
						}
					}
					Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
					miJingIDMap.remove( mjID-1);
					miJingIDMap.put( mjID, 0);
					//????????????,?????????????????????
					sendMjID = mjID;
				}else if (checkMiJingBattled&& totalNum - numSaoDang > 0&&leader==hid) {
					//????????? ?????? ?????? ??????????????????
					//?????? ???????????????
					List<ProbabilityEventModel> pelist = CrossSJMiJingCache.getBossAwardsMap().get(mjID);
					int size = pelist.size();
					dropTips = new ArrayList<Object[]>();
					boolean isDoubel = crossSJMiJing.isDouble();
					for (int a = 0; a < size; a++) {
						ProbabilityEventModel pe = pelist.get(a);
						int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
						if (js != null) {
							int type = js[0];
							if (type == GameConst.GENDROP) {
								int num = js[2];
								ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
								for (int j = 1; j <= num; j++) {
									js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
									dropArr.add(js);
									dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
									if(isDoubel) {
										dropArr.add(js);
										dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
									}
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
								if(isDoubel) {
									dropArr.add(js);
									dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
								}
							}
							//??????????????????
							if(js[0]==GameConst.EQUIP) {
								Struct_zhuangbei_204 excelEquip = Config_zhuangbei_204.getIns().get(js[1]);
								if(excelEquip!=null) {
									int q = excelEquip.getQ();
									if(q == GameConst.RED) {
										ChatManager.getIns().broadCast(ChatConst.CROSS_S_J_MI_JING_GET_RED_EQUIP, new Object[] { hero.getName(), js[1] });
									}
								}
							}
						}
					}
					
					crossSJMiJing.getSaoDangMap().put(typeByID, numSaoDang + 1);
					//???????????????????????????????????????
					sendTypeByID  = typeByID;
					//dropTips.add(new Object[] { mjID, dropTips.toArray() });
					//int[][] drops = new int[dropArr.size()][];
					//dropArr.toArray(drops);
					//UseAddUtil.add(hero, drops, SourceGoodConst.CROSS_S_J_MI_JING_SAO_DANG, UseAddUtil.getDefaultMail(), true);
					//CrossSJMiJingSender.sendCmd_3788(hero.getId(), 1, dropTips.toArray());
					
				}
				
				if(!dropTips2.isEmpty()) {
					dropTips.addAll(index, dropTips2);
				}
				
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
//				UseAddUtil.add(hero, drops, SourceGoodConst.CROSS_S_J_MI_JING_TIAO_ZHAN, UseAddUtil.getDefaultMail(), true);
				//?????????????????????
				CrossSJMiJingCrossToLocal.getIns().saveBattleDataCL(hero, sendNumHelpAwards, sendMjID, sendTypeByID,
						drops, dropTips, dropChatTips);
				//??????????????????
//				GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
//				CrossSJMiJingManager.getIns().openUI(hero);
				//??????
//				CrossSJMiJingCrossToLocal.getIns().voiceRedEquipCL(dropChatTips);
			}
		}

		//boss?????????
		if(boss.getHp()<=0){
			CrossSJMiJingCache.removeCrossSJMJBossMap( team.getId());
			//????????????
			Iterator<Long> iterator = members.keySet().iterator();
			List<Long> hidList = new ArrayList<>(); 
			while(iterator.hasNext()) {
				long hid = iterator.next();
				hidList.add(hid);
			}
			for(long hid:hidList) {
				Hero hero = HeroCache.getHero(hid);
				CrossSJMiJingManager.getIns().leave(hero);
			}
		}
	}
	
	/**
	 * ??????????????????
	 */
	public void skillAttBoss(double damg,Hero hero){
		if(!CrossZone.isCrossServer()){
			return;
		}
		
		Integer teamID = TeamCache.getHidToTeamIDMap().get( hero.getId());
		if(teamID==null){
			//???????????????
			LogTool.warn("SJMJ.skillAttBoss.teamID is null.hid:"+hero.getId(), this);
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if(team==null){
			LogTool.warn("SJMJ.skillAttBoss.team is null.hid:"+hero.getId(), this);
			return;
		}
		
		CrossSJMiJingBoss boss = CrossSJMiJingCache.getCrossSJMJBossMap().get(teamID);
		if(boss==null){
			LogTool.warn("SJMJ.skillAttBoss.boss is null.hid:"+hero.getId(), this);
			return;
		}
		long curhp = (long) boss.getHp();
		if(curhp<=0) {
			LogTool.warn("SJMJ.skillAttBoss.boss is death.hid:"+hero.getId(), this);
			return;
		}
		curhp = Math.max( 0, curhp - (long)damg);
		boss.setHp(curhp);
		
		List<Object[]> hurtList = new ArrayList<Object[]>();
		List<CrossSJMiJingRankModel> rankList = boss.getRankList();
		for(CrossSJMiJingRankModel model:rankList){
			long hidTemp = model.getHid();
			if(hidTemp==hero.getId()){
				model.setHurt( (long) (model.getHurt()+damg));
				hurtList.add(new Object[]{model.getName(),model.getHurt()});
				//????????????????????????????????????????????????????????????
				long timeNow = TimeDateUtil.getCurrentTimeInMillis();
				model.setInvincibleTime(timeNow+BattleConst.ATT_WUDI_CONST*1000);
				break;
			}
		}

		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				try {					
					CrossSJMiJingFunction.getIns().sendAwards(boss, hurtList, team);
				} catch (Exception e) {
					LogTool.error(e, CrossSJMiJingFunction.class, hero.getId(), hero.getNameZoneid(), "??????????????????");
				}
			}
			@Override
			public Object getSession() {
				return OpTaskConst.CROSS_SJ_MI_JING;
			}
		});
	}
	
	/**
	 * ????????????????????????????????????
	 * 1	????????????
		2	????????????
		3	????????????
		4	????????????
		5	????????????
		6	????????????
		7	????????????
	 */
	public boolean checkJie(Hero hero, int mjID) {
		try {
			Struct_sjmjfb_258 excelMJ = Config_sjmjfb_258.getIns().get(mjID);
			int open = excelMJ.getOpen();
			int type = getTypeByID(mjID);
			int jieLv = 0;
			if(type == 1) {
				WuJiang wujiang = hero.getWujiang();
				jieLv = wujiang.getJieLv();
			}else if(type == 2){
				ZhanJia zhanJia = hero.getZhanJia();
				jieLv = zhanJia.getJieLv();
			}else if(type == 3){
				TreasureData treasureData = hero.getTreasureData();
				jieLv = treasureData.getLevel();
			}else if(type == 4){
				GodBook godbook = hero.getGodbook();
				jieLv = godbook.getLevel();
			}else if(type == 5){
				Excalibur excalibur = hero.getExcalibur();
				jieLv = excalibur.getJieLv();
			}else if(type == 6){
				SpecialTreasure specialTreasure = hero.getSpecialTreasure();
				jieLv = specialTreasure.getJieLv();
			}else if(type == 7){
				BingFa bingfa = hero.getBingfa();
				jieLv = bingfa.getJieLv();
			}
			if(jieLv >= open)
				return true;
		} catch (Exception e) {
			LogTool.info("SJMJ.checkJie.exception.hid:"+hero.getId()+" mjID:"+mjID, this);
		}
		return false;
	}
	
	/**
	 * ????????????????????????
	 * @param hero
	 */
	public void sendRed(Hero hero) {
		if(hero == null) {
			return;
		}
		CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
		Map<Integer, Integer> boxMap = crossSJMiJing.getBoxMap();
		Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
		Iterator<Entry<Integer, Integer>> iterator = miJingIDMap.entrySet().iterator();
		while(iterator.hasNext()) {
			Entry<Integer, Integer> next = iterator.next();
			Integer mjID = next.getKey();
			int typeByID = getTypeByID(mjID);
			int mjIDFrist = typeByID*1000+1;
			for( int i=mjIDFrist; i<=mjID; i++) {
				Integer integer = boxMap.get( i);
				if(integer==null) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.CROSS_S_J_MI_JING, 1, RedPointConst.HAS_RED);
					return;
				}
			}
		}
	}
}
