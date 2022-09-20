package com.teamtop.system.crossTeamFuBen;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BuffConst;
import com.teamtop.system.battleNew.BuffFunction;
import com.teamtop.system.boss.qmboss.QMBossFunction;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenCrossToLocal;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenLocalToCross;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFubenBoss;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFubenRankModel;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_zdfb_255;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_zdfb_255;

public class CrossTeamFubenFunction {
	private static CrossTeamFubenFunction ins = null;

	public static CrossTeamFubenFunction getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenFunction();
		}
		return ins;
	}

	/**
	 * 发送本队伍所有数据
	 * @param	type  1快速加入  2别人退出队伍等其他情况  
	 */
	public void sendMyTeamData(long hid, int type) {
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get( hid);
		if( teamIDInt==null)
			return;
		Team team = TeamCache.getTeamMap().get( teamIDInt); 
		if( team==null){
			System.out.println("这里不应该为空");
			return;
		}
 
		Object[] sendData = TeamFunction.getIns().getTeamSendData(teamIDInt);
		CrossTeamFubenSender.sendCmd_3404(hid, type, teamIDInt, team.getIdRoom(), sendData);
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
				int robotId = temp2.getRobotId();
				if(hidTemp==hidTemp2|| robotId!=0)
					continue;
				HeroFunction.getIns().sendBattleHeroAttr(heroTemp, hidTemp2);
			}
		}
	}
	
	/**
	 * 初始化所有队员的战斗数据
	 */
	public void initMembersBattleData(Map<Long, TeamMember> members, CrossTeamFubenBoss boss){
		List<CrossTeamFubenRankModel> rankList = boss.getRankList();
		long timeNow = TimeDateUtil.getCurrentTimeInMillis();
		for(TeamMember member:members.values()){
			int robotId = member.getRobotId();
			if(robotId>0){
				CrossTeamFubenRankModel model = new CrossTeamFubenRankModel();
				model.setHid(robotId);
				model.setRobotID(robotId);
				if(!rankList.contains(model)){
					model.setName(member.getName());
					rankList.add(model);
				}else{
					model = rankList.get(rankList.indexOf(model));
				}
				FinalFightAttr attrTemp = BattleFunction.initNPC(robotId);
				model.setAttrmap(attrTemp);
				model.fullHp();
				//给3秒无敌
				model.setInvincibleTime(timeNow+ BattleConst.ATT_WUDI_BEGIN_CONST*1000);
			}else{
				Hero hero = HeroCache.getHero( member.getHid());
				if(hero==null)
					continue;
				CrossTeamFubenRankModel model = new CrossTeamFubenRankModel();
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
				//给3秒无敌
				model.setInvincibleTime(timeNow+ BattleConst.ATT_WUDI_BEGIN_CONST*1000);
			}
		}
	}
	
	/**
	 * 定时检查人打boss
	 */
	public void scheduleTeamAttBoss(CrossTeamFubenBoss boss, int teamID) {
		try {
			List<CrossTeamFubenRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//结算boss
				CrossTeamFubenCache.removeCrossTeamBossMap( teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("scheduleAttQmBoss.team is null.teamID:"+teamID, this);
				CrossTeamFubenCache.removeCrossTeamBossMap( teamID);
				return;
			}
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			long invincibleTime = boss.getInvincibleTime();
			if( invincibleTime> timeNow) {
//				System.out.println("无敌Boss时间");
				return;
			}
			
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			Map<Long, TeamMember> members = team.getMembers();
			for(CrossTeamFubenRankModel model :rank){
				int death = model.getDeath();
				if(death == CrossTeamFuBenConst.DEATH_NO){
					FinalFightAttr attMember = model.getAttrmap();
					// buff加成处理
					TeamMember teamMember = members.get(model.getHid());
					int[][] tempAttr = BuffFunction.getIns().getBuffTempAttr(teamMember);
					Hero hero = HeroCache.getHero(model.getHid());
					FightAttr fightAttr = null;
					if (hero != null) {
						fightAttr = hero.getFightAttr();
					}
					long hurt = (long) Math.max(BattleFunction.calcDamg(attMember, attrBoss, tempAttr, fightAttr), 1);
//					LogTool.info("hero hit qmboss id:"+qmboss.getBossId()+" damg:"+damg+",hurt:"+hurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
					double curhp = boss.getHp();
					curhp = Math.max( 0, curhp - hurt);
					boss.setHp(curhp);
//					LogTool.info("队员打boss，bossID:"+boss.getBossId()+" hurt:"+hurt+" hpNow:"+curhp,this);
					model.setHurt( model.getHurt()+ hurt);
					hurtList.add(new Object[]{model.getName(),model.getHurt()});
					
					if(curhp<=0){
						break;
					}
				}
			}
			//更新伤害榜，发奖励，清理缓存
			sendAwards(boss, hurtList, team);
//			System.out.println("检查下气血是不是一样,TeamAttBoss TeamID:"+teamID+" bossHp:"+boss.getHp());//TODO 
		} catch (Exception e) {
			LogTool.error(e, CrossTeamFubenFunction.class, "scheduleAttQmBoss has wrong");
		}
	}
	
	/**
	 * 定时检查boss打人
	 */
	public void scheduleBossAttTeam(CrossTeamFubenBoss boss, int teamID) {
		try {
			List<CrossTeamFubenRankModel> rank = boss.getRankList();
			if(rank.size()<0|| boss.getHp()<=0){
				//结算boss
				CrossTeamFubenCache.removeCrossTeamBossMap( teamID);
				return;
			}
			Team team = TeamCache.getTeamById(teamID);
			if( team==null){
				LogTool.warn("scheduleBossAttTeam.team is null.teamID:"+teamID, this);
				CrossTeamFubenCache.removeCrossTeamBossMap( teamID);
				return;
			}
			
			boolean allDeath = true;
			List<Object[]> hurtList = new ArrayList<Object[]>();
			FinalFightAttr attrBoss = boss.getAttr();
			long timeNow = TimeDateUtil.getCurrentTimeInMillis();
			// 检测buff
			BuffFunction.getIns().checkBuffHandle(timeNow, team);
			for(CrossTeamFubenRankModel model :rank){
				int death = model.getDeath();
				int robotID = model.getRobotID();
				if(death == CrossTeamFuBenConst.DEATH_NO) {
					allDeath = false;
					long invincibleTime = model.getInvincibleTime();
					if( invincibleTime> timeNow) {
//						System.out.println("检查下气血是不是一样,BossAttTeam，无敌,hid:"+model.getHid()+" robotid:"+robotID);
						continue;
					}
				}
				
				if(death == CrossTeamFuBenConst.DEATH_NO){
					FinalFightAttr attrMember = model.getAttrmap();
					long hurt =(long) Math.max(BattleFunction.calcDamg(attrBoss, attrMember),1);
//					LogTool.info("hero hit qmboss id:"+qmboss.getBossId()+" damg:"+damg+",hurt:"+hurt+",hid:"+hero.getId()+",name:"+hero.getName(),this);
					double curhp = attrMember.getHp();
					curhp = Math.max( 0, curhp - hurt);
//					boss.setHp(curhp);
//					LogTool.info("member id:"+boss.getBossId()+" now currhp:"+curhp+" hurt:"+hurt,this);
//					System.out.println("boss攻击，目标id:"+ model.getHid()+" hurt："+hurt+" hpNow:"+(int)curhp);//TODO
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
							model.setDeath(CrossTeamFuBenConst.DEATH_YES);
							// 刷新前端有人死亡
							if (robotID == 0) {
								death(teamID, model.getHid(), 0, 0);
							} else {
								death(teamID, 0, model.getRobotID(), 0);
							}
						}
					}
					hurtList.add(new Object[] { model.getHid(), attrMember.getHp() });
				}
				death = model.getDeath();
				if(death == CrossTeamFuBenConst.DEATH_NO)
					allDeath = false;
			}
			//刷新前端
			Map<Long, TeamMember> members = team.getMembers();
			for(TeamMember member:members.values()) {
				int robotId = member.getRobotId();
				long hid = member.getHid();
				if(robotId> 0)
					continue;
				CrossTeamFubenSender.sendCmd_3424(hid, hurtList.toArray());
				if(allDeath) {
					GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
				}
			}
			//战斗失败
			if(allDeath) {
				CrossTeamFubenFunction.getIns().delAllRobot(team);
				CrossTeamFubenCache.removeCrossTeamBossMap(team.getId());
			}
		} catch (Exception e) {
			LogTool.error(e, QMBossFunction.class, "scheduleAttQmBoss has wrong");
		}
	}
	
	/**
	 * 更新伤害榜，发奖励，清理缓存
	 */
	public void sendAwards(CrossTeamFubenBoss boss, List<Object[]> hurtList, Team team){
		int excelID = team.getIdRoom();
		List<CrossTeamFubenRankModel> rank = boss.getRankList();
		Collections.sort(rank, CrossTeamFubenHurtComparator.getIns());
		Map<Long, TeamMember> members = team.getMembers();
		
		//所有队员都没收益次数就解散队伍
		boolean jieSan = true;
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.CROSS_TEAM_FUBEN_AWARDS_TIMES);
		for(CrossTeamFubenRankModel model :rank){
			int robotID = model.getRobotID();
			if( robotID!=0)
				continue;
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				continue;
			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			if(crossTeamFuBen==null) {
				continue;
			}
			int timesBattled = crossTeamFuBen.getTimesBattled();
			int awardsNumMax = excel.getNum() + crossTeamFuBen.getAddTimes();
			if(timesBattled< awardsNumMax){//有奖励次数
				jieSan = false;
			}
		}
		
		for(CrossTeamFubenRankModel model :rank){
			int robotID = model.getRobotID();
			if( robotID!=0)
				continue;
			long hid = model.getHid();
			Hero hero = HeroCache.getHero(hid);
			if(hero==null)
				continue;
			if(!members.containsKey(hid))
				continue;
			CrossTeamFubenSender.sendCmd_3416(hid, (long)boss.getHpmax(), (long)boss.getHp(), model.getHurt(), hurtList.toArray());

			//boss被打败
			if(boss.getHp()<=0){
				//退出副本  262控制
//				CrossTeamFubenSender.sendCmd_3420(hid);
				CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
				if(crossTeamFuBen==null) {
					LogTool.warn("CrossTeamFubenFunction sendAwards crossTeamFuBen null, hid="+hid, this);
					continue;
				}
				int awardsState = crossTeamFuBen.getAwardsState();
				List<Object[]> dropTips = new ArrayList<Object[]>();
				List<Object[]> dropTips2 = new ArrayList<Object[]>();
				
				int timesBattled = crossTeamFuBen.getTimesBattled();
				if(jieSan){//没奖励次数
					//退出队伍
					CrossTeamFubenManager.getIns().leave(hero);
					//弹出胜利界面
					GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
					continue;
				}
				
				if(awardsState != CrossTeamFuBenConst.AWARDS_GET_STATE) {
					//弹出胜利界面
					GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
					continue;
				}
				
				int awardsNumMax = excel.getNum() + crossTeamFuBen.getAddTimes();
				if (timesBattled >= awardsNumMax) {// 有奖励次数
					// 弹出胜利界面
					GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
					continue;
				}
				//奖励提示
				List<int[]> dropArr = new ArrayList<int[]>();
				//发放奖励
				List<ProbabilityEventModel> pelist = CrossTeamFubenCache.getCommonAwardsMap().get(excelID);
				int size = pelist.size();
				boolean isDoubel = crossTeamFuBen.isDouble();
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
					}
				}
				
				if(!dropTips2.isEmpty()) {
					dropTips.addAll(0, dropTips2);
				}
				
				//指定时间内可以获得额外收益
				boolean hadOthAwards = getOtherAwardsTime();
				if(hadOthAwards) {
					pelist = CrossTeamFubenCache.getOtherAwardsMap().get(excelID);
					size = pelist.size();
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
									dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_1_WAI });
								}
							} else {
								dropArr.add(js);
								dropTips.add(new Object[] { js[0], js[1], js[2], GlobalConst.YTPE_1_WAI });
							}
						}
					}
				}
				int[][] drops = new int[dropArr.size()][];
				dropArr.toArray(drops);
//				if (UseAddUtil.canAdd(hero, drops, false)) {
					UseAddUtil.add(hero, drops, SourceGoodConst.CROSS_TEAM_FUBEN_AWARDS, UseAddUtil.getDefaultMail(), true);
//				}
				GlobalSender.sendCmd_262(hid, 1, dropTips.toArray());
				crossTeamFuBen.setTimesBattled( timesBattled + 1);
				//同步次数到子服
				CrossTeamFuBenCrossToLocal.getIns().saveBattleTimesCL(hero);
				CrossTeamFubenManager.getIns().sendData(hero);
			}
		}
		
		if(boss.getHp()<=0) {
			delAllRobot(team);
			CrossTeamFubenCache.removeCrossTeamBossMap( team.getId());
		}
	}
	
    public static boolean getOtherAwardsTime() {
//        boolean open7Days = TimeDateUtil.serverOpenOverDays(7);
//        if (!open7Days)
//            return true;
//
//        // 2018.7.30 周末狂欢活动 开服7天之后 每周六和周日  奖励翻倍\
//        if (TimeDateUtil.betweenOpen() > 7) {
//            if (TimeDateUtil.getWeek() == 6 || TimeDateUtil.getWeek() == 7) {
//                return true;
//            }
//        }

        int[][] time = CrossTeamFuBenConst.TIME_DOULE_AWARDS;
        int timeNow = TimeDateUtil.getCurrentTime();
        for (int[] timeTemp : time) {
            int begin = TimeDateUtil.getTimeOfTheClock(timeTemp[0]);
            int end = TimeDateUtil.getTimeOfTheClock(timeTemp[1]);
            if (timeNow >= begin && timeNow <= end) {
                return true;
            }
        }
        return false;
    }
    
    //移除队伍中的机器人，刷新队伍
    public void delAllRobot(Team team) {
		List<Long> robotIDList = new ArrayList<>();
		Map<Long, TeamMember> members = team.getMembers();
		for(TeamMember member:members.values()){
			int robotId = member.getRobotId();
			if(robotId>0)
				robotIDList.add((long)robotId);
		}
		for(long rbID:robotIDList)
			TeamFunction.getIns().leaveAndModifyTeamData(team.getId(), rbID);
		for(TeamMember member:members.values()){
			CrossTeamFubenFunction.getIns().sendMyTeamData(member.getHid(), 2);
		}
    }
    
	/**
	 * 手动释放技能
	 */
	public void skillAttBoss(double damg,Hero hero){
		if(!CrossZone.isCrossServer()){
			return;
		}
		
		Integer teamID = TeamCache.getHidToTeamIDMap().get( hero.getId());
		if(teamID==null){
			//不在队伍中
			LogTool.warn("skillAttBoss.teamID is null.hid:"+hero.getId(), this);
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if(team==null){
			LogTool.warn("skillAttBoss.team is null.hid:"+hero.getId(), this);
			return;
		}
		
		CrossTeamFubenBoss boss = CrossTeamFubenCache.getCrossTeamBossMap().get(teamID);
		if(boss==null){
			LogTool.warn("skillAttBoss.boss is null.hid:"+hero.getId(), this);
			return;
		}
		long curhp = (long) boss.getHp();
		if(curhp<=0) {
			LogTool.warn("skillAttBoss.boss is death.hid:"+hero.getId(), this);
			return;
		}
//        long hurt=(long)damg;
//		if(hurt>curhp){
//			hurt = curhp;
//		}
//		curhp = curhp -hurt;
		curhp = Math.max( 0, curhp - (long)damg);
		boss.setHp(curhp);
		
		List<Object[]> hurtList = new ArrayList<Object[]>();
		List<CrossTeamFubenRankModel> rankList = boss.getRankList();
		for(CrossTeamFubenRankModel model:rankList){
			long hidTemp = model.getHid();
			if(hidTemp==hero.getId()){
				model.setHurt( (long) (model.getHurt()+damg));
				hurtList.add(new Object[]{model.getName(),model.getHurt()});
				//角色无敌时间（暂时这么写，后面战斗要改）
				long timeNow = TimeDateUtil.getCurrentTimeInMillis();
				model.setInvincibleTime(timeNow+BattleConst.ATT_WUDI_CONST*1000);
				break;
			}
		}

		CrossTeamFubenFunction.getIns().sendAwards(boss, hurtList, team);
	}
	
	/**
	 * 有人死亡，刷新缓存、前端
	 * @param teamID
	 * @param hid
	 * @param robotID
	 * @param noShowUIHid 不显示结算页面的玩家ID(奇葩需求)
	 */
	public void death(int teamID, long hid, int robotID, long noShowUIHid) {
		if(!CrossZone.isCrossServer()){
			return;
		}
		Team team = TeamCache.getTeamById(teamID);
		if(team==null){
			LogTool.warn("death.team is null.hid:"+hid, this);
			return;
		}
		CrossTeamFubenBoss boss = CrossTeamFubenCache.getCrossTeamBossMap().get(teamID);
		if(boss==null){
			LogTool.warn("death.boss is null.hid:"+hid, this);
			return;
		}
		
		long deathID = 0;//死亡者ID
		boolean allDeath = true;
		List<CrossTeamFubenRankModel> rankList = boss.getRankList();
		for(CrossTeamFubenRankModel model:rankList){
			long hidTemp = model.getHid();
			int robotID2 = model.getRobotID();
			if(hid != 0&& hid == hidTemp){
				model.setDeath(CrossTeamFuBenConst.DEATH_YES);
				deathID = hid;
				break;
			}else if(robotID != 0&& robotID == robotID2){
				model.setDeath(CrossTeamFuBenConst.DEATH_YES);
				deathID = robotID;
				break;
			}
		}
		for(CrossTeamFubenRankModel model:rankList){
			int death = model.getDeath();
			if(death==CrossTeamFuBenConst.DEATH_NO)
				allDeath = false;
		}
		
		Map<Long, TeamMember> members = team.getMembers();
		for(TeamMember member:members.values()){
			int robotIdTemp = member.getRobotId();
			if(robotIdTemp==0){
				CrossTeamFubenSender.sendCmd_3418(member.getHid(), deathID);
//				System.out.println("通知："+member.getHid()+" 这个人"+deathID+"挂了");
			}
//			if( allDeath&& member.getRobotId()==0&& member.getHid()!=noShowUIHid) {
//				GlobalSender.sendCmd_262(member.getHid(), 2, new Object[]{});
//				System.out.println("全部死亡，弹出提示。name:"+hero.getName()+" sendID:"+member.getHid());
//			}
		}
		//移除所有机器人,移除boss
//		if( allDeath) {
//			CrossTeamFubenFunction.getIns().delAllRobot(team);
//			CrossTeamFubenCache.removeCrossTeamBossMap(team.getId());
//		}
//		System.out.println("收到死亡协议。id:"+deathID);
	}
	
	/**
	 * 检查队伍是否存在
	 * @param fubenID
	 * @param teamID
	 * @return
	 */
	public boolean chackTeamID(int fubenID, int teamID) {
		Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(fubenID);
		if(excel==null)
			return false;
		Team team = TeamCache.getTeamById(teamID);
		if(team==null)
			return false;
		int teamType = team.getTeamType();
		if(teamType!=SystemIdConst.FUN_CROSS_TEAM_FU_BEN)
			return false;
		CrossTeamFubenBoss crossTeamFubenBoss = CrossTeamFubenCache.getCrossTeamBossMap().get(teamID);
		if(crossTeamFubenBoss!=null)
			return false;
		return true;
	}

	/**
	 * 增加奖励获得次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		try {
			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			crossTeamFuBen.setAddTimes(crossTeamFuBen.getAddTimes() + num);
			CrossTeamFuBenLocalToCross.getIns().reflashAddTimesLC(hero.getId(), crossTeamFuBen.getAddTimes());
			CrossTeamFubenManager.getIns().sendData(hero);
			return true;
		} catch (Exception e) {
			LogTool.error(e, CrossTeamFubenFunction.class, hero.getId(), hero.getName(),
					"CrossTeamFubenFunction addChaNum=" + num);
			return false;
		}
	}

}
