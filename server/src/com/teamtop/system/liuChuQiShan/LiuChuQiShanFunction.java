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
	 * Gm调关卡方便测试
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
	 * 发送本队伍所有数据
	 * @param	type  1成功  2刷新队伍数据 
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
	 * 队伍所有成员刷新所有成员的战斗数据
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
	 * 初始化所有队员的战斗数据
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
			//给n秒无敌
			model.setInvincibleTime(timeNow+ BattleConst.ATT_WUDI_BEGIN_CONST*1000);
		}
	}
	
	/**
	 * 有人死亡，刷新缓存、前端
	 * 
	 * @param noShowUIHid
	 *            不显示结算页面的玩家ID
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
		
		long deathID = 0;//死亡者ID
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
//				System.out.println("通知："+member.getHid()+" 这个人"+deathID+"挂了");
//			if( allDeath&& member.getRobotId()==0&& member.getHid()!=noShowUIHid) {
//				GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
//				System.out.println("全部死亡，弹出提示。name:"+hero.getName()+" sendID:"+member.getHid());
//			}
		}
	}
	

	
	/**
	 * 检查队伍是否存在
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
	 * 定时检查人打boss
	 */
	public void scheduleTeamAttBoss(LiuChuQiShanBoss boss, int teamID) {
		try {
			List<LiuChuQiShanRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//结算boss
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
						//更新伤害榜，发奖励，清理缓存
						sendAwards(boss, hurtList, team);
					} catch (Exception e) {
						LogTool.error(e, LiuChuQiShanFunction.class, 0, "定时器触发", "");
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
	 * 定时检查boss打人
	 */
	public void scheduleBossAttTeam(LiuChuQiShanBoss boss, int teamID) {
		try {
			List<LiuChuQiShanRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//结算boss
				LiuChuQiShanCache.removeliuChuQiShanBossMap(teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("LCQS.scheduleBossAttTeam.team is null.teamID:" + teamID, this);
				LiuChuQiShanCache.removeliuChuQiShanBossMap(teamID);
				return;
			}
			// 检测buff
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
					long cutDownTime = model.getCutDownTime();// 新增减伤结束时间
					if (cutDownTime > timeNow) {
						// 爆气减伤存在
						long hidTemp = model.getHid();
						Map<Long, Hero> roleCache = HeroCache.getHeroMap();
						Hero hero = roleCache.get(hidTemp);
						if (hero != null) {
							QiCe qiCe = hero.getQiCe();
							if (qiCe != null) {
								int taozhuangLv = qiCe.getTaozhuangLv();// 套装等级
								Struct_buff_011 struct_buff_011 = Config_buff_011.getIns().get(QiCeConst.index);
								int cundown = struct_buff_011.getXiaoguo()[0][1];// buff基础效果
								int cz = struct_buff_011.getCz()[0][1];// 效果成长
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
							// 复活效果
							BuffFunction.getIns().buffEffectHandle(buffId, lv, attrMember, member);
							curhp = attrMember.getHp();
						}
						if (curhp <= 0) {
							model.setDeath(LiuChuQiShanConst.DEATH_YES);
							// 刷新前端有人死亡
							death(teamID, model.getHid(), 0);
						}
					}
					hurtList.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
				death = model.getDeath();
				if (death == LiuChuQiShanConst.DEATH_NO)
					allDeath = false;
			}
			//刷新前端
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
			//战斗失败
			if(allDeath) {
				LiuChuQiShanCache.removeliuChuQiShanBossMap(team.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, LiuChuQiShanFunction.class, "LCQS.scheduleAttQmBoss has wrong");
		}
	}
	

	/**
	 * 更新伤害榜，发奖励，清理缓存
	 */
	public void sendAwards(LiuChuQiShanBoss boss, List<Object[]> hurtList, Team team) {
		int lcqsID = team.getIdRoom();
		List<LiuChuQiShanRankModel> rank = boss.getRankList();
		Collections.sort(rank, LiuChuQiShanHurtComparator.getIns());
		Map<Long, TeamMember> members = team.getMembers();
		long leader = team.getLeader();
		boolean isHelp = false;// 是否需要求助(扣除求助次数)
		Set<Long> needHelpSet = new HashSet<>();// 求助玩家Id集合
		for (LiuChuQiShanRankModel model : rank) {
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				continue;
			if(!members.containsKey(hid))
				continue;
			LiuChuQiShanSender.sendCmd_8218(hid, (long) boss.getHpmax(), (long) boss.getHp(), model.getHurt(),
					hurtList.toArray());
			//boss被打败
			if(boss.getHp()<=0){
				//奖励提示
				LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
				List<int[]> dropArr = new ArrayList<int[]>();
				List<Object[]> dropTips = new ArrayList<Object[]>();
				//协助次数
				int numHelpAwards = liuChuQiShan.getNumHelpAwards();
				int gqId = liuChuQiShan.getGqId();
				if (gqId > lcqsID && numHelpAwards > 0 && leader != hid) {
					//已通关，可获取协助奖励
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
					isHelp = true;// 开启扣除玩家求助次数条件
					if (liuChuQiShan.getNumHelpAwards() > 0) {
						liuChuQiShan.setNumHelpAwards(numHelpAwards - 1);// 队员 扣协助次数
					}
					LiuChuQiShanSender.sendCmd_8228(hid, numHelpAwards - 1, LiuChuQiShanConst.NUM_HELP_AWARDS_MAX);
				} else if (gqId == lcqsID) {
					Set<Integer> passSet = liuChuQiShan.getPassSet();
					passSet.add(lcqsID);// 每日首通添加关卡id 用于限制当天扫荡
					needHelpSet.add(hid);// 添加需要扣除求助次数的玩家id
					Struct_six_279 excel = Config_six_279.getIns().get(lcqsID);
					int nextId = excel.getNext();// 胜利后存下一关关卡id
					if (nextId != 0) {
						liuChuQiShan.setGqId(nextId);
					}
					// 成就树
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_11, 1, 0);
					// 首通奖励
					int[][] rewardST = excel.getReward();
					for(int[] reward:rewardST) {
						dropArr.add(reward);
						dropTips.add(new Object[] { reward[0], reward[1], reward[2], GlobalConst.YTPE_2_WAI});
					}
					//掉落奖励
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
				//弹出胜利界面
				GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
			}
		}

		//boss被打败
		if(boss.getHp()<=0){
			if (isHelp) {
				// 若队伍存在玩家已通关此副本 则扣去非首通玩家的求助次数
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
			//解散队伍
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
	 * 手动释放技能
	 * @param type 技能类型 0增加伤害 1加血 2是无敌 3自己无敌 对方被控制 
	 * @param damg 技能效果
	 * @param hero
	 */
	public void skillAttBoss(int type,double damg, Hero hero) {
		Integer teamID = TeamCache.getHidToTeamIDMap().get( hero.getId());
		if(teamID==null){
			//不在队伍中
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
			//回血
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
			//无敌
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
			//无敌
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
			// 爆气减伤
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
					LogTool.error(e, LiuChuQiShanFunction.class, hero.getId(), hero.getNameZoneid(), "玩家释放技能");
				}
			}
			@Override
			public Object getSession() {
				return OpTaskConst.LIUCHUQISHAN;
			}
		});
	}
	
	
	/**
	 * 通知前端显示红点
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
