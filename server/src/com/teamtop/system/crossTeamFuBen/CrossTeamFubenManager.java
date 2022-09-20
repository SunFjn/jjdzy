package com.teamtop.system.crossTeamFuBen;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenCrossToLocal;
import com.teamtop.system.crossTeamFuBen.cross.CrossTeamFuBenLocalToCross;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.crossTeamFuBen.model.CrossTeamFubenBoss;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamConst;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_zdfb_255;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_zdfb_255;

public class CrossTeamFubenManager {
	private static CrossTeamFubenManager ins = null;

	public static CrossTeamFubenManager getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenManager();
		}
		return ins;
	}

	/**
	 * 子服
	 * 
	 * @param hero
	 */
	public void sendData(Hero hero) {
		CrossTeamFuBen crossteam = hero.getCrossTeamFuBen();
		Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.CROSS_TEAM_FUBEN_AWARDS_TIMES);
		int awardsNumMax = excel.getNum() + crossteam.getAddTimes();
		int timesBattled = awardsNumMax - crossteam.getTimesBattled() <= 0 ? 0
				: awardsNumMax - crossteam.getTimesBattled();
		CrossTeamFubenSender.sendCmd_3400(hero.getId(), timesBattled);
	}

	public void openUI(Hero hero, int id) {
		try {
			if (!CrossZone.isCrossServer()) {
				// 请连跨服
				CrossTeamFubenSender.sendCmd_3402(hero.getId(), 4, new Object[] {});
				return;
			}

			Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(id);
			if (excel == null) {
				// 配置表没配该副本
				CrossTeamFubenSender.sendCmd_3402(hero.getId(), 2, new Object[] {});
				return;
			}

			int rebornlv = hero.getRebornlv();
			int zsExcel = excel.getZs();
			if (zsExcel > rebornlv) {
				// 转数等级不够，不能查看
				CrossTeamFubenSender.sendCmd_3402(hero.getId(), 3, new Object[] {});
				return;
			}

			List<Object[]> sendData = new ArrayList<Object[]>();
			int partId = CrossCache.getPartId(hero.getZoneid());
			ConcurrentHashMap<Integer, Team> teamMap = TeamFunction.getIns().getTeamMapByID(TeamConst.TEAM_SHOW_MAX, id,
					SystemIdConst.FUN_CROSS_TEAM_FU_BEN, TeamConst.TEAM_MEMBER_MAX, partId);
			Iterator<Team> iterator = teamMap.values().iterator();
			while (iterator.hasNext()) {
				Team team = iterator.next();
				int teamID = team.getId();
				long leader = team.getLeader();
				Hero heroTemp = HeroCache.getHero(leader);
				if (heroTemp == null)
					continue;
				Map<Long, TeamMember> members = team.getMembers();
				sendData.add(new Object[] { heroTemp.getName(), teamID, heroTemp.getIcon(), heroTemp.getFrame(),
						members.size() });
				if (sendData.size() >= TeamConst.TEAM_SHOW_MAX) {
					break;
				}
			}

			CrossTeamFubenSender.sendCmd_3402(hero.getId(), 1, sendData.toArray());
			sendData(hero);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossTeamFubenManager openUI");
		}
	}

	public void autoJoin(Hero hero, int type, int idExcel) {
		try {
			if (!CrossZone.isCrossServer()) {
				// 请连跨服
				return;
			}

			Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(idExcel);
			if (excel == null) {
				// 配置表没配该副本
				CrossTeamFubenSender.sendCmd_3404(hero.getId(), 3, 0, idExcel, new Object[] {});
				return;
			}

			int rebornlv = hero.getRebornlv();
			int zsExcel = excel.getZs();
			if (zsExcel > rebornlv) {
				// 转数等级不够，不能查看
				CrossTeamFubenSender.sendCmd_3404(hero.getId(), 4, 0, idExcel, new Object[] {});
				return;
			}

			int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.FUN_CROSS_TEAM_FU_BEN);
			if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {// 强行退出其他队伍
				TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.FUN_CROSS_TEAM_FU_BEN, 0);
			}

			ConcurrentHashMap<Long, Integer> hidToTeamIDMap = TeamCache.getHidToTeamIDMap();
			Integer teamIDInt = hidToTeamIDMap.get(hero.getId());
			if (teamIDInt != null) {
				// 你已经有队伍，不能重复加入
				CrossTeamFubenSender.sendCmd_3404(hero.getId(), 5, 0, idExcel, new Object[] {});
				CrossTeamFubenFunction.getIns().sendMyTeamData(hero.getId(), 2);
				return;
			}

			TeamMember member = new TeamMember(hero.getId());
			member.setType(TeamConst.TYPE_MEMBER);
			member.setName(hero.getNameZoneid());
			member.setTimeJoin(TimeDateUtil.getCurrentTime());

			boolean joinIn = false;// true:成功加入别人队伍
			Map<Long, TeamMember> members = null;
			if (type == 2) {
				int partId = CrossCache.getPartId(hero.getBelongZoneid());
				ConcurrentHashMap<Integer, Team> teamMap = TeamFunction.getIns().getTeamMapByID(TeamConst.TEAM_SHOW_MAX,
						idExcel, SystemIdConst.FUN_CROSS_TEAM_FU_BEN, TeamConst.TEAM_MEMBER_MAX, partId);
				Iterator<Team> iterator = teamMap.values().iterator();
				while (iterator.hasNext()) {
					Team team = iterator.next();
					int teamID = team.getId();
					members = team.getMembers();
					long leader = team.getLeader();
					Hero heroLeader = HeroCache.getHero(leader);
					if (heroLeader == null) {
						LogTool.warn("autoJoin.leader is null.leaderID:" + leader, this);
						continue;
					}
					CrossTeamFubenBoss crossTeamFubenBoss = CrossTeamFubenCache.getCrossTeamBossMap().get(teamID);
					if (crossTeamFubenBoss != null) {
						// 队伍已进入战斗，无法加入
						continue;
					}
					if (members.size() < TeamConst.TEAM_MEMBER_MAX) {
						members.put(hero.getId(), member);
						TeamCache.setHidToTeamIDMap(hero.getId(), teamID);
						joinIn = true;
						break;
					}
				}
			}

			if (!joinIn) {
				CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
				if (crossTeamFuBen == null) {
					return;
				}
				int timeBuilTeam = crossTeamFuBen.getTimeBuilTeam();
				int timeNow = TimeDateUtil.getCurrentTime();
				if (timeBuilTeam > timeNow) {
					// 操作太频繁
					CrossTeamFubenSender.sendCmd_3404(hero.getId(), 7, 0, idExcel, new Object[] {});
					return;
				}
				crossTeamFuBen.setTimeBuilTeam(timeNow + 2);

				int teamID = TeamCache.getTeamId();
				int partId = CrossCache.getPartId(hero.getZoneid());
				Team team = new Team(teamID, TimeDateUtil.getCurrentTime(), SystemIdConst.FUN_CROSS_TEAM_FU_BEN,
						partId);
				team.setId(teamID);
				team.setLeader(hero.getId());
				members = new HashMap<Long, TeamMember>();
				member.setType(TeamConst.TYPE_LEADER);
				members.put(hero.getId(), member);
				team.setMembers(members);
				team.setIdRoom(idExcel);
				TeamCache.setTeamMap(teamID, team);
				TeamCache.setHidToTeamIDMap(hero.getId(), teamID);
				int zoneid = hero.getBelongZoneid();
				// 跨服频道发信息
				CrossTeamFuBenCrossToLocal.getIns().sendNewTeamDataCL(idExcel, teamID, hero.getNameZoneid(), partId);
				// ChatManager.getIns().broadCast(ChatConst.BROCAST_CROSS_TEAM_JOIN_TEAM, new
				// Object[]{lv, ChatConst.TYPE_3_ZDFB+":"+hero.getId()+":"+teamID},
				// hero.getName());
			}
			for (TeamMember temp : members.values()) {
				long hidTemp = temp.getHid();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					CrossTeamFubenFunction.getIns().sendMyTeamData(hidTemp, 2);
				}
			}

			// 同步130属性
			CrossTeamFubenFunction.getIns().sendMyTeamBattleData(members);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CrossTeamFubenManager autoJoin, type=" + type + ", idExcel=" + idExcel);
		}
	}

	/**
	 * 踢人
	 */
	public void removeMenber(Hero hero, long hidOth) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
				CrossTeamFubenSender.sendCmd_3406(hid, 2);
				// openFuBen(hero, lv);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
				CrossTeamFubenSender.sendCmd_3406(hid, 3);
				// openFuBen(hero, lv);
				return;
			}
			long leader = team.getLeader();
			if (hid != leader) {
				// 你不是队长
				CrossTeamFubenSender.sendCmd_3406(hid, 4);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();
			TeamMember memberOth = members.get(hidOth);
			if (memberOth == null) {
				// 该队员不存在
				CrossTeamFubenSender.sendCmd_3406(hid, 5);
				return;
			}

			List<Long> reflashHidList = TeamFunction.getIns().leaveAndModifyTeamData(teamIDInt, hidOth);
			boolean online = HeroFunction.getIns().isOnline(hidOth);
			if (online) {
				// 提示玩家被踢出队伍
				CrossTeamFubenSender.sendCmd_3410(hidOth, 4);
				Hero heroOth = HeroCache.getHero(hidOth);
				openUI(heroOth, team.getIdRoom());
			}
			// 刷新队伍数据
			for (long hidTemp : reflashHidList) {
				boolean onlineTemp = HeroFunction.getIns().isOnline(hidTemp);
				if (onlineTemp) {
					CrossTeamFubenFunction.getIns().sendMyTeamData(hidTemp, 2);
				}
			}
			CrossTeamFubenSender.sendCmd_3406(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CrossTeamFubenManager removeMenber, hidOth=" + hidOth);
		}
	}

	public void battle(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamIDInt == null) {
				// 没有队伍
				CrossTeamFubenSender.sendCmd_3408(hero.getId(), 2);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 两个缓存不同步，没有队伍缓存
				CrossTeamFubenSender.sendCmd_3408(hero.getId(), 3);
				return;
			}
			long leader = team.getLeader();
			if (leader != hero.getId()) {
				// 队长才能开始战斗
				CrossTeamFubenSender.sendCmd_3408(hero.getId(), 4);
				return;
			}
			Map<Long, TeamMember> members = team.getMembers();

			// 初始化boss
			Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(team.getIdRoom());
			FinalFightAttr battleFightAttr = BattleFunction.initNPC(excel.getBoss());
			long hp = battleFightAttr.getHp();
			CrossTeamFubenBoss boss = new CrossTeamFubenBoss();
			boss.setBossId(excel.getBoss());
			boss.setHpmax(hp);
			boss.setHp(hp);
			// boss.setRankList(Collections.synchronizedList(new
			// ArrayList<QMBossDamgRankModel>()));
			// boss.setState(1);
			boss.setAttr(battleFightAttr);
			boss.setInvincibleTime(TimeDateUtil.getCurrentTimeInMillis() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
			CrossTeamFubenCache.setCrossTeamBossMap(teamIDInt, boss);
			CrossTeamFubenFunction.getIns().initMembersBattleData(members, boss);

			for (TeamMember member : members.values()) {
				long hidTemp = member.getHid();
				member.getBuffMap().clear();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					CrossTeamFubenSender.sendCmd_3408(hidTemp, 1);
					CrossTeamFuBenCrossToLocal.getIns().battleCL(hidTemp);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossTeamFubenManager battle");
		}

	}

	public void leave(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			long hid = hero.getId();
			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			if (crossTeamFuBen == null)
				return;
			int id = Math.max(1, crossTeamFuBen.getFristId());
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
				CrossTeamFubenSender.sendCmd_3410(hid, 1);
				openUI(hero, id);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
				CrossTeamFubenSender.sendCmd_3410(hid, 1);
				openUI(hero, id);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			if (team.getTeamType() != SystemIdConst.FUN_CROSS_TEAM_FU_BEN) {
				CrossTeamFubenSender.sendCmd_3410(hid, 1);
				return;
			}

			List<Long> memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
			for (long hidMember : memberList) {
				CrossTeamFubenFunction.getIns().sendMyTeamData(hidMember, 2);// 刷新队友数据
			}
			CrossTeamFubenSender.sendCmd_3410(hid, 1);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossTeamFubenManager leave");
		}
	}

	public void joinByTeamID(Hero hero, int teamID, int fubenID) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			int chackInTeam = TeamFunction.getIns().chackInTeam(hero.getId(), SystemIdConst.FUN_CROSS_TEAM_FU_BEN);
			if (chackInTeam == TeamConst.HERO_HAD_TEAM_OTHER_TYPE) {
				TeamFunction.getIns().leaveByType(hero.getId(), SystemIdConst.FUN_CROSS_TEAM_FU_BEN, 0);
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hero.getId());
			if (teamIDInt != null) {
				// 你已经有队伍，不能重复加入
				CrossTeamFubenSender.sendCmd_3412(hero.getId(), 2);
				CrossTeamFubenFunction.getIns().sendMyTeamData(hero.getId(), 2);
				return;
			}
			Team teamOth = TeamCache.getTeamMap().get(teamID);
			if (teamOth == null) {
				// 队伍不存在
				CrossTeamFubenSender.sendCmd_3412(hero.getId(), 3);
				if (fubenID != 0)
					openUI(hero, fubenID);
				return;
			}
			Map<Long, TeamMember> membersOth = teamOth.getMembers();
			if (membersOth.size() >= TeamConst.TEAM_MEMBER_MAX) {
				// 队伍已满
				CrossTeamFubenSender.sendCmd_3412(hero.getId(), 4);
				int idExcel = teamOth.getIdRoom();
				openUI(hero, idExcel);
				return;
			}
			CrossTeamFubenBoss crossTeamFubenBoss = CrossTeamFubenCache.getCrossTeamBossMap().get(teamID);
			if (crossTeamFubenBoss != null) {
				// 队伍已进入战斗，无法加入
				CrossTeamFubenSender.sendCmd_3412(hero.getId(), 6);
				return;
			}

			int idRoom = teamOth.getIdRoom();
			Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(idRoom);
			int rebornlv = hero.getRebornlv();
			int zsExcel = excel.getZs();
			if (zsExcel > rebornlv) {
				// 转数等级不够，不能加入
				CrossTeamFubenSender.sendCmd_3412(hero.getId(), 5);
				return;
			}

			TeamMember member = new TeamMember(hero.getId());
			member.setType(TeamConst.TYPE_MEMBER);
			member.setName(hero.getNameZoneid());
			member.setTimeJoin(TimeDateUtil.getCurrentTime());
			membersOth.put(hero.getId(), member);
			TeamCache.setHidToTeamIDMap(hero.getId(), teamID);

			for (TeamMember temp : membersOth.values()) {
				long hidTemp = temp.getHid();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if (online) {
					CrossTeamFubenFunction.getIns().sendMyTeamData(hidTemp, 2);
				}
			}
			CrossTeamFubenSender.sendCmd_3412(hero.getId(), 1);

			// 同步130属性
			CrossTeamFubenFunction.getIns().sendMyTeamBattleData(membersOth);
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CrossTeamFubenManager joinByTeamID, teamID=" + teamID + ", fubenID=" + fubenID);
		}
	}

	/**
	 * 添加一个机器人
	 * 
	 * @param hero
	 */
	public void addMember(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			long hid = hero.getId();
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// LogTool.info("CrossTeamFuBenManager.addMember.没有队伍",this);
				return;
			}
			Team teamData = TeamCache.getTeamMap().get(teamIDInt);
			if (teamData == null) {
				// LogTool.info("CrossTeamFuBenManager.addMember.缓存数据异常",this);
				return;
			}
			CrossTeamFuBen crossteam = hero.getCrossTeamFuBen();
			if (crossteam == null)
				return;
			int timeAddMember = crossteam.getTimeAddMember();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (timeAddMember != 0 && currentTime - timeAddMember < 4) {
				// LogTool.info("CrossTeamFuBenManager.addMember.请求太频繁了",this);
				return;
			}
			long leader = teamData.getLeader();
			if (hid != leader) {
				// LogTool.info("CrossTeamFuBenManager.addMember.队长才能申请加机器人",this);
				return;
			}

			Map<Long, TeamMember> members = teamData.getMembers();
			if (members.size() >= TeamConst.TEAM_MEMBER_MAX) {
				// 队员人数已满
				return;
			}

			int idRoom = teamData.getIdRoom();
			Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(idRoom);
			int[][] robotIDExcel = excel.getBot();
			int robotNum = robotIDExcel.length;

			List<Integer> randomIndexList = RandomUtil.getMultiRandomNumInArea(0, robotNum, 2);
			for (int indexTemp : randomIndexList) {
				int idTemp = robotIDExcel[0][indexTemp];
				TeamMember teamMember = members.get((long) idTemp);
				if (teamMember == null) {
					TeamMember member = new TeamMember(idTemp);
					member.setType(TeamConst.TYPE_MEMBER);
					member.setRobotId(idTemp);
					String rankName = IlliegalUtil.rankName();
					int zid = RandomUtil.getRandomNumInAreas(1, CrossCache.getZidMax());
					member.setName(rankName);
					member.setTimeJoin(TimeDateUtil.getCurrentTime());
					members.put((long) idTemp, member);
					break;
				}
			}
			Iterator<Entry<Long, TeamMember>> iterator = members.entrySet().iterator();
			while (iterator.hasNext()) {
				long hidTemp = iterator.next().getKey();
				boolean onlineTemp = HeroFunction.getIns().isOnline(hidTemp);
				if (onlineTemp) {
					CrossTeamFubenFunction.getIns().sendMyTeamData(hidTemp, 2);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossTeamFubenManager addMember");
		}
	}

	public void loginCross(Hero hero, int id, int teamID) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			boolean checkSystemOpen = HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.FUN_CROSS_TEAM_FU_BEN);
			if (!checkSystemOpen) {
				return;
			}
			Struct_zdfb_255 excel = Config_zdfb_255.getIns().get(id);
			if (excel == null) {
				// 配置表没配该副本
				CrossTeamFubenSender.sendCmd_3404(hero.getId(), 3, 0, id, new Object[] {});
				return;
			}

			int rebornlv = hero.getRebornlv();
			int zsExcel = excel.getZs();
			if (zsExcel > rebornlv) {
				// 转数等级不够，不能查看
				CrossTeamFubenSender.sendCmd_3404(hero.getId(), 4, 0, id, new Object[] {});
				return;
			}

			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			crossTeamFuBen.setFristId(id);
			crossTeamFuBen.setTeamID(teamID);

			int timeBuilTeam = crossTeamFuBen.getTimeBuilTeam();
			int timeNow = TimeDateUtil.getCurrentTime();
			if (timeBuilTeam > timeNow) {
				// 操作太频繁
				CrossTeamFubenSender.sendCmd_3404(hero.getId(), 7, 0, id, new Object[] {});
				// return;
			}
			crossTeamFuBen.setTimeBuilTeam(timeNow + 2);

			if (teamID != 0) {
				// 判断队伍是否存在
				CrossTeamFuBenLocalToCross.getIns().checkTeamIDLC(hero, teamID, id);
			} else {
				CrossFunction.askCross(hero, SystemIdConst.FUN_CROSS_TEAM_FU_BEN);
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossTeamFubenManager loginCross");
		}
	}

	public void leaveBattle(Hero hero) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			long hid = hero.getId();
//			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
//			int id = Math.max(1, crossTeamFuBen.getFristId());
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍中
//				openUI(hero, id);
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
//				openUI(hero, id);
				TeamCache.removeHidToTeamIDMap(hid);
				return;
			}
			if (team.getTeamType() != SystemIdConst.FUN_CROSS_TEAM_FU_BEN) {
				return;
			}
			// 如果已经进入战斗，设置第三者死亡
//			CrossTeamFubenBoss boss = CrossTeamFubenCache.getCrossTeamBossMap().get(teamIDInt);
//			if(boss!=null){
			CrossTeamFubenFunction.getIns().death(teamIDInt, hero.getId(), 0, hero.getId());
//			}

			List<Long> memberList = TeamFunction.getIns().leaveAndModifyTeamData(hid);
			for (long hidMember : memberList) {
				CrossTeamFubenFunction.getIns().sendMyTeamData(hidMember, 2);// 刷新队友数据
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossTeamFubenManager leaveBattle");
		}
	}

	public void awardsState(Hero hero, int state) {
		CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
		if (crossTeamFuBen == null)
			return;
		crossTeamFuBen.setAwardsState(state);
	}

	// TODO 副本超过指定时间就关闭副本
}
