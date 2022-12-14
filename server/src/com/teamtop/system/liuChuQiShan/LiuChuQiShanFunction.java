package com.teamtop.system.liuChuQiShan;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BuffConst;
import com.teamtop.system.battleNew.BuffFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShan;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShanBoss;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShanRankModel;
import com.teamtop.system.qice.QiCeConst;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_buff_011;
import excel.config.Config_six_279;
import excel.struct.Struct_buff_011;
import excel.struct.Struct_six_279;

public class LiuChuQiShanFunction {
	private static LiuChuQiShanFunction ins = null;

	public static LiuChuQiShanFunction getIns() {
		if (ins == null) {
			ins = new LiuChuQiShanFunction();
		}
		return ins;
	}

	/**
	 * Gm?????????????????????
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		int num = Integer.parseInt(param[0]);
		hero.getLiuChuQiShan().setGqId(num);
		return;
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
			return;
		}
		Object[] sendData = TeamFunction.getIns().getTeamSendDataNotRobot(teamIDInt);
		LiuChuQiShanSender.sendCmd_8206(hid, type, teamIDInt, team.getIdRoom(), sendData);
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
	public void initMembersBattleData(Map<Long, TeamMember> members, LiuChuQiShanBoss boss) {
		List<LiuChuQiShanRankModel> rankList = boss.getRankList();
		long timeNow = TimeDateUtil.getCurrentTimeInMillis();
		for(TeamMember member:members.values()){
			Hero hero = HeroCache.getHero( member.getHid());
			if(hero==null)
				continue;
			LiuChuQiShanRankModel model = new LiuChuQiShanRankModel();
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
	 * 
	 * @param noShowUIHid
	 *            ??????????????????????????????ID
	 */
	public void death(int teamID, long hid, long noShowUIHid) {
		Team team = TeamCache.getTeamById(teamID);
		if(team==null){
			LogTool.warn("death.team is null.hid:"+hid, this);
			return;
		}
		LiuChuQiShanBoss boss = LiuChuQiShanCache.getliuChuQiShanBossMap().get(teamID);
		if(boss==null){
			LogTool.warn("death.boss is null.hid:"+hid, this);
			return;
		}
		
		long deathID = 0;//?????????ID
//		boolean allDeath = true;
		List<LiuChuQiShanRankModel> rankList = boss.getRankList();
		int size = rankList.size();
		// for(LiuChuQiShanRankModel model:rankList){
		for (int i = 0; i < size; i++) {
			LiuChuQiShanRankModel model = rankList.get(i);
			long hidTemp = model.getHid();
			if(hid != 0&& hid == hidTemp){
				model.setDeath(LiuChuQiShanConst.DEATH_YES);
				deathID = hid;
				break;
			}
		}
		// for(LiuChuQiShanRankModel model:rankList){
//			int death = model.getDeath();
		// if(death==LiuChuQiShanConst.DEATH_NO)
//				allDeath = false;
//		}
		
		Map<Long, TeamMember> members = team.getMembers();
		for(TeamMember member:members.values()){
			LiuChuQiShanSender.sendCmd_8220(member.getHid(), deathID);
//				System.out.println("?????????"+member.getHid()+" ?????????"+deathID+"??????");
//			if( allDeath&& member.getRobotId()==0&& member.getHid()!=noShowUIHid) {
//				GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
//				System.out.println("??????????????????????????????name:"+hero.getName()+" sendID:"+member.getHid());
//			}
		}
	}
	

	
	/**
	 * ????????????????????????
	 * @param mjID
	 * @param teamID
	 * @return
	 */
	public boolean chackTeamID(int teamID) {
		Team team = TeamCache.getTeamById(teamID);
		if(team==null)
			return false;
		int teamType = team.getTeamType();
		if (teamType != LiuChuQiShanConst.sysId)
			return false;
		LiuChuQiShanBoss boss = LiuChuQiShanCache.getliuChuQiShanBossMap().get(teamID);
		if(boss!=null)
			return false;
		return true;
	}

	/**
	 * ??????????????????boss
	 */
	public void scheduleTeamAttBoss(LiuChuQiShanBoss boss, int teamID) {
		try {
			List<LiuChuQiShanRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//??????boss
				LiuChuQiShanCache.removeliuChuQiShanBossMap(teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("LCQS.scheduleAttQmBoss.team is null.teamID:" + teamID, this);
				LiuChuQiShanCache.removeliuChuQiShanBossMap(teamID);
				return;
			}
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			long invincibleTime = boss.getInvincibleTime();
			if( invincibleTime> timeNow) {
				return;
			}
			
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			Map<Long, TeamMember> members = team.getMembers();
			for (LiuChuQiShanRankModel model : rank) {
				int death = model.getDeath();
				if (death == LiuChuQiShanConst.DEATH_NO) {
					FinalFightAttr attMember = model.getAttrmap();
					TeamMember teamMember = members.get(model.getHid());
					int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
					Hero hero = HeroCache.getHero(model.getHid());
					FightAttr fightAttr = null;
					if (hero != null) {
						fightAttr = hero.getFightAttr();
					}
					long hurt = (long) Math.max(BattleFunction.calcDamg(attMember, attrBoss, tempAttr, fightAttr), 1);
					double curhp = boss.getHp();
					curhp = Math.max( 0, curhp - hurt);
					boss.setHp(curhp);
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
						LogTool.error(e, LiuChuQiShanFunction.class, 0, "???????????????", "");
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.LIUCHUQISHAN;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanFunction.class, "LCQS.scheduleAttQmBoss has wrong");
		}
	}
	
	/**
	 * ????????????boss??????
	 */
	public void scheduleBossAttTeam(LiuChuQiShanBoss boss, int teamID) {
		try {
			List<LiuChuQiShanRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//??????boss
				LiuChuQiShanCache.removeliuChuQiShanBossMap(teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("LCQS.scheduleBossAttTeam.team is null.teamID:" + teamID, this);
				LiuChuQiShanCache.removeliuChuQiShanBossMap(teamID);
				return;
			}
			// ??????buff
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			BuffFunction.getIns().checkBuffHandle(timeNow, team);
			boolean allDeath = true;
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			int rankSize = rank.size();
			LiuChuQiShanRankModel model = null;
			for(int i=0;i<rankSize;i++){
				model = rank.get(i);
				int death = model.getDeath();
				if (death == LiuChuQiShanConst.DEATH_NO) {
					allDeath = false;
					long invincibleTime = model.getInvincibleTime();
					if( invincibleTime> timeNow) {
						continue;
					}
				}
				
				if (death == LiuChuQiShanConst.DEATH_NO) {
					FinalFightAttr attrMember = model.getAttrmap();
					double hurt = Math.max(BattleFunction.calcDamg(attrBoss, attrMember), 1);
					long cutDownTime = model.getCutDownTime();// ????????????????????????
					if (cutDownTime > timeNow) {
						// ??????????????????
						long hidTemp = model.getHid();
						Map<Long, Hero> roleCache = HeroCache.getHeroMap();
						Hero hero = roleCache.get(hidTemp);
						if (hero != null) {
							QiCe qiCe = hero.getQiCe();
							if (qiCe != null) {
								int taozhuangLv = qiCe.getTaozhuangLv();// ????????????
								Struct_buff_011 struct_buff_011 = Config_buff_011.getIns().get(QiCeConst.index);
								int cundown = struct_buff_011.getXiaoguo()[0][1];// buff????????????
								int cz = struct_buff_011.getCz()[0][1];// ????????????
								hurt = Math.max(1, hurt * (100000 - (cundown + cz * taozhuangLv)) / 100000);
							}
						}
					}
					double curhp = attrMember.getHp();
					curhp = Math.max( 0, curhp - hurt);
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
							model.setDeath(LiuChuQiShanConst.DEATH_YES);
							// ????????????????????????
							death(teamID, model.getHid(), 0);
						}
					}
					hurtList.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
				death = model.getDeath();
				if (death == LiuChuQiShanConst.DEATH_NO)
					allDeath = false;
			}
			//????????????
			Map<Long, TeamMember> members = team.getMembers();
			for(TeamMember member:members.values()) {
				long hid = member.getHid();
				boolean online = HeroFunction.getIns().isOnline(hid);
				if(online)
					LiuChuQiShanSender.sendCmd_8222(hid, hurtList.toArray());
				if(allDeath) {
					GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
				}
			}
			//????????????
			if(allDeath) {
				LiuChuQiShanCache.removeliuChuQiShanBossMap(team.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanFunction.class, "LCQS.scheduleAttQmBoss has wrong");
		}
	}
	

	/**
	 * ??????????????????????????????????????????
	 */
	public void sendAwards(LiuChuQiShanBoss boss, List<Object[]> hurtList, Team team) {
		int lcqsID = team.getIdRoom();
		List<LiuChuQiShanRankModel> rank = boss.getRankList();
		Collections.sort(rank, LiuChuQiShanHurtComparator.getIns());
		Map<Long, TeamMember> members = team.getMembers();
		long leader = team.getLeader();
		boolean isHelp = false;// ??????????????????(??????????????????)
		Set<Long> needHelpSet = new HashSet<>();// ????????????Id??????
		for (LiuChuQiShanRankModel model : rank) {
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				continue;
			if(!members.containsKey(hid))
				continue;
			LiuChuQiShanSender.sendCmd_8218(hid, (long) boss.getHpmax(), (long) boss.getHp(), model.getHurt(),
					hurtList.toArray());
			//boss?????????
			if(boss.getHp()<=0){
				//????????????
				LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
				List<int[]> dropArr = new ArrayList<int[]>();
				List<Object[]> dropTips = new ArrayList<Object[]>();
				//????????????
				int numHelpAwards = liuChuQiShan.getNumHelpAwards();
				int gqId = liuChuQiShan.getGqId();
				if (gqId > lcqsID && numHelpAwards > 0 && leader != hid) {
					//?????????????????????????????????
					List<ProbabilityEventModel> helpList = LiuChuQiShanCache.getHalpAwardsMap().get(lcqsID);
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
					isHelp = true;// ????????????????????????????????????
					if (liuChuQiShan.getNumHelpAwards() > 0) {
						liuChuQiShan.setNumHelpAwards(numHelpAwards - 1);// ?????? ???????????????
					}
					LiuChuQiShanSender.sendCmd_8228(hid, numHelpAwards - 1, LiuChuQiShanConst.NUM_HELP_AWARDS_MAX);
				} else if (gqId == lcqsID) {
					Set<Integer> passSet = liuChuQiShan.getPassSet();
					passSet.add(lcqsID);// ????????????????????????id ????????????????????????
					needHelpSet.add(hid);// ???????????????????????????????????????id
					Struct_six_279 excel = Config_six_279.getIns().get(lcqsID);
					int nextId = excel.getNext();// ???????????????????????????id
					if (nextId != 0) {
						liuChuQiShan.setGqId(nextId);
					}
					// ?????????
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_11, 1, 0);
					// ????????????
					int[][] rewardST = excel.getReward();
					for(int[] reward:rewardST) {
						dropArr.add(reward);
						dropTips.add(new Object[] { reward[0], reward[1], reward[2], GlobalConst.YTPE_2_WAI});
					}
					//????????????
					List<ProbabilityEventModel> bossList = LiuChuQiShanCache.getBossAwardsMap().get(lcqsID);
					int size = bossList.size();
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
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_0_WAI });
							}
						}
					}
				}
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
				UseAddUtil.add(hero, drops, SourceGoodConst.LIUCHUQISHAN_AWARD, UseAddUtil.getDefaultMail(), true);
				//??????????????????
				GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
			}
		}

		//boss?????????
		if(boss.getHp()<=0){
			if (isHelp) {
				// ??????????????????????????????????????? ???????????????????????????????????????
				Iterator<Long> needHelpIdS = needHelpSet.iterator();
				while (needHelpIdS.hasNext()) {
					Long needHelpId = needHelpIdS.next();
					Hero hero1 = HeroCache.getHero(needHelpId);
					LiuChuQiShan liuChuQiShan1 = hero1.getLiuChuQiShan();
					int needHelpNum = liuChuQiShan1.getNeedHelpNum();
					if (liuChuQiShan1.getNeedHelpNum() > 0) {
						liuChuQiShan1.setNeedHelpNum(needHelpNum - 1);
					}
				}
			}
			LiuChuQiShanCache.removeliuChuQiShanBossMap(team.getId());
			//????????????
			Iterator<Long> iterator = members.keySet().iterator();
			List<Long> hidList = new ArrayList<>(); 
			while(iterator.hasNext()) {
				long hid = iterator.next();
				hidList.add(hid);
			}
			for(long hid:hidList) {
				Hero hero = HeroCache.getHero(hid);
				LiuChuQiShanManager.getIns().leave(hero, team.getId());
			}
		}
	}
	
	/**
	 * ??????????????????
	 * @param type ???????????? 0???????????? 1?????? 2????????? 3???????????? ??????????????? 
	 * @param damg ????????????
	 * @param hero
	 */
	public void skillAttBoss(int type,double damg, Hero hero) {
		Integer teamID = TeamCache.getHidToTeamIDMap().get( hero.getId());
		if(teamID==null){
			//???????????????
			LogTool.warn("LCQS.skillAttBoss.teamID is null.hid:" + hero.getId(), this);
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if(team==null){
			LogTool.warn("LCQS.skillAttBoss.team is null.hid:" + hero.getId(), this);
			return;
		}
		
		LiuChuQiShanBoss boss = LiuChuQiShanCache.getliuChuQiShanBossMap().get(teamID);
		if(boss==null){
			LogTool.warn("LCQS.skillAttBoss.boss is null.hid:" + hero.getId(), this);
			return;
		}
		long curhp = (long) boss.getHp();
		if(curhp<=0) {
			LogTool.warn("LCQS.skillAttBoss.boss is death.hid:" + hero.getId(), this);
			return;
		}
		List<Object[]> hurtList = new ArrayList<Object[]>();
		if (type==0) {
			curhp = Math.max( 0, curhp - (long)damg);
			boss.setHp(curhp);
			List<LiuChuQiShanRankModel> rankList = boss.getRankList();
			for (LiuChuQiShanRankModel model : rankList) {
				long hidTemp = model.getHid();
				if(hidTemp==hero.getId()){
					model.setHurt( (long) (model.getHurt()+damg));
					hurtList.add(new Object[]{model.getName(),model.getHurt()});
					long timeNow = TimeDateUtil.getCurrentTimeInMillis();
					model.setInvincibleTime(timeNow+BattleConst.ATT_WUDI_CONST*1000);
					break;
				}
			}
		}else if (type==1) {
			//??????
			List<LiuChuQiShanRankModel> rankList = boss.getRankList();
			for (LiuChuQiShanRankModel model : rankList) {
				long hidTemp = model.getHid();
				if(hidTemp==hero.getId()){
					model.setHurt( (long) (model.getHurt()));
					long nowHp=model.getCurhp();
					long addHp=(long) damg;
					long temphp=nowHp+addHp;
					if (temphp>=model.getAttrmap().getHpMax()) {
						model.fullHp();
					}else {
						model.getAttrmap().setHp(temphp);
					}
					hurtList.add(new Object[]{model.getName(),model.getHurt()});
					long timeNow = TimeDateUtil.getCurrentTimeInMillis();
					model.setInvincibleTime(timeNow+BattleConst.ATT_WUDI_CONST*1000);
					break;
				}
			}
		}else if (type==2) {
			//??????
			List<LiuChuQiShanRankModel> rankList = boss.getRankList();
			for (LiuChuQiShanRankModel model : rankList) {
				long hidTemp = model.getHid();
				if(hidTemp==hero.getId()){
					hurtList.add(new Object[]{model.getName(),model.getHurt()});
					long timeNow = TimeDateUtil.getCurrentTimeInMillis();
					model.setInvincibleTime(timeNow+(long)damg);
					break;
				}
			}
		}else if (type==3) {
			//??????
			List<LiuChuQiShanRankModel> rankList = boss.getRankList();
			for (LiuChuQiShanRankModel model : rankList) {
				long hidTemp = model.getHid();
				if(hidTemp==hero.getId()){
					hurtList.add(new Object[]{model.getName(),model.getHurt()});
					long timeNow = TimeDateUtil.getCurrentTimeInMillis();
					model.setInvincibleTime(timeNow+(long)damg);
					break;
				}
			}
		} else if (type == 4) {
			// ????????????
			List<LiuChuQiShanRankModel> rankList = boss.getRankList();
			for (LiuChuQiShanRankModel model : rankList) {
				long hidTemp = model.getHid();
				if (hidTemp == hero.getId()) {
					hurtList.add(new Object[] { model.getName(), model.getHurt() });
					long timeNow = TimeDateUtil.getCurrentTimeInMillis();
					model.setCutDownTime(timeNow + (long) damg);
					break;
				}
			}
		}
	

		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				try {					
					LiuChuQiShanFunction.getIns().sendAwards(boss, hurtList, team);
				} catch (Exception e) {
					LogTool.error(e, LiuChuQiShanFunction.class, hero.getId(), hero.getNameZoneid(), "??????????????????");
				}
			}
			@Override
			public Object getSession() {
				return OpTaskConst.LIUCHUQISHAN;
			}
		});
	}
	
	
	/**
	 * ????????????????????????
	 * @param hero
	 */
	public void sendRed(Hero hero) {
		if(hero == null) {
			return;
		}
		LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
		if (liuChuQiShan == null) {
			return;
		}
		int saoDangNum = liuChuQiShan.getSaoDangNum();
		if (saoDangNum > 0) {
			RedPointFunction.getIns().addLoginRedPoint(hero, LiuChuQiShanConst.sysId, 1, RedPointConst.HAS_RED);
		}
	}
}
