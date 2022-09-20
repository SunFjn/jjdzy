package com.teamtop.system.team;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.crossRebornFB.RebornFBManager;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenManager;
import com.teamtop.system.crossTeamFuBen.CrossTeamFubenTeamComparator;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.setting.SettingConst;
import com.teamtop.system.team.model.Team;
import com.teamtop.system.team.model.TeamMember;
import com.teamtop.util.log.LogTool;

import excel.config.Config_NPC_200;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_NPC_200;

/**
 * 队伍功能接口类
 * @author lobbyer
 * @date 2017年4月17日
 */
public class TeamFunction {
	private static TeamFunction ins;
	public static TeamFunction getIns(){
		if(ins == null) {
			ins = new TeamFunction();
		}
		return ins;
	}
	

	/**
	 * 跨服组队/升阶秘境</br>
	 * 获取某等级断的队伍数据  （跨服组队）,优先找队伍未满员的
	 * @param num	需要返回的队伍数量
	 * @param idExcel	系统自己的参数
	 * @param sysID	系统ID
	 * @param teamNum	成员数量
	 * @param partId 跨服分区id
	 */
	public ConcurrentHashMap<Integer, Team> getTeamMapByID(int num, int idExcel, int sysID, int teamNum, int partId) {
		ConcurrentHashMap<Integer, Team> teamMapTemp = new ConcurrentHashMap<Integer, Team>();
		ConcurrentHashMap<Integer, Team> teamMap = TeamCache.getTeamMap();
		Iterator<Team> iterator = teamMap.values().iterator();
		int numAdd = 0;
		while( iterator.hasNext()){
			Team team = iterator.next();
			int teamType = team.getTeamType();
			int idRoomTemp = team.getIdRoom();
			Map<Long, TeamMember> members = team.getMembers();
			int size = members.size();
			if (partId > 0 && partId != team.getPartId()) {
				continue;
			}
			if( teamType==sysID&& idExcel==idRoomTemp&& size< teamNum){
				teamMapTemp.put( team.getId(), team);
				numAdd++;
				if( numAdd>=num)
					return teamMapTemp;
			}
		}
		
		//队伍不够，就找满员
		iterator = teamMap.values().iterator();
		while( iterator.hasNext()){
			Team team = iterator.next();
			int teamType = team.getTeamType();
			int idRoomTemp = team.getIdRoom();
			if (partId > 0 && partId != team.getPartId()) {
				continue;
			}
			if( teamType==sysID&& idExcel==idRoomTemp){
				teamMapTemp.put( team.getId(), team);
				numAdd++;
				if( numAdd>=num)
					break;
			}
		}
		return teamMapTemp;
	}
	
	/**
	 * 帮派副本</br>
	 * 获取 某帮派某等级 断的队伍数据  
	 * @param type  队伍类型 0：整个缓存   1：场景队伍，2：组队大厅  其他：系统开启表ID 
	 * @param num	队伍数量
	 * @param lvRoom	等级段
	 * @return
	 */
	public ConcurrentHashMap<Integer, Team> getTeamMapGang(int type, int num, int lvRoom, long gangID) {
		ConcurrentHashMap<Integer, Team> teamMapTemp = new ConcurrentHashMap<Integer, Team>();
//		ConcurrentHashMap<Integer, Team> teamMap = TeamCache.getTeamMap(0, 0);
//		Iterator<Team> iterator = teamMap.values().iterator();
//		int numAdd = 0;
//		while( iterator.hasNext()){
//			Team team = iterator.next();
//			int teamType = team.getTeamType();
//			int lvRoomTemp = team.getLvRoom();
//			long leader = team.getLeader();
//			Hero heroLeader = HeroCache.getHero( leader);
//			if( heroLeader==null)
//				continue;
//			long gangIdLeader = heroLeader.getGangId();
//			if( teamType==type&& lvRoom==lvRoomTemp&& gangIdLeader==gangID){
//				teamMapTemp.put( team.getId(), team);
//				numAdd++;
//				if( numAdd>=num)
//					break;
//			}
//		}
		return teamMapTemp;
	}
	
	
	/**
	 * 检查是否在同类型的队伍中
	 * @param hid	
	 * @param type	系统开启表的系统ID
	 * @return	1没有队伍  2已经在该系统队伍中  3异常，有队伍，但队伍数据不存在  4不是同类型队伍 
	 */
	public int chackInTeam( long hid,  int type){
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get( hid);
		if( teamIDInt==null)
			return TeamConst.HERO_NO_TEAM;
		
		Team team = TeamCache.getTeamMap().get( teamIDInt);
		if( team==null)
			return TeamConst.HERO_HAD_TEAM_EXCEPTION;
		
		int teamType = team.getTeamType();
		if( teamType==type){
			return TeamConst.HERO_HAD_TEAM;
		}else{
			return TeamConst.HERO_HAD_TEAM_OTHER_TYPE;
		}
	}

	/**
	 * 判断是否在其他系统队伍中，是，则退出队伍 (玩家下线处理统一在TeamEvent.logout中调用)
	 * @param typeIncome	0：强行退出所有队伍。
	 * 						如果传入系统开启表ID:对比玩家队伍系统ID，不一致则退出队伍，一致则不退出队伍
	 * @param typeBattle	默认填0，参考 BattleConst。BattleFactory战斗工程类调用才需要填。暂时没用到
	 */
	public void leaveByType( long hid, int typeIncome, int typeBattle){
		try {
			//不退出队伍的战斗类型
//			if(typeBattle==BattleConst.BTT_GUANQIA_XG){
//				return ;
//			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get( hid);
			if( teamIDInt==null)
				return ;
			Team team = TeamCache.getTeamMap().get( teamIDInt);
			if( team==null)
				return ;
			Hero hero = HeroCache.getHero(hid);
			if( hero==null){
				TeamCache.removeHidToTeamIDMap(hid);//退出队伍
				//TODO member移除
				return;
			}
			
			int typeTeam = team.getTeamType();
			int typeLeave = 0;
			if( typeIncome==0){//强行退出队伍
				typeLeave = typeTeam;
			}else if( typeTeam!=typeIncome){//类型不同，则退出队伍
				typeLeave = typeTeam;
			}else if( typeTeam==typeIncome){//类型相同，不退出队伍
				return;
			}
			
			switch ( typeLeave) {
			case SystemIdConst.FUN_CROSS_TEAM_FU_BEN:
				CrossTeamFubenManager.getIns().leave(hero);
				break;
			case SystemIdConst.REBORN_FB:
				RebornFBManager.getIns().exitTeam(hero);
				break;
//			case OpenFunctionConst.FUN_GANG:
//				GangManager.getIns().leave(hero);
//				break;
//			case OpenFunctionConst.FUN_WENDINGTIANDAO:
//				WenDingTianDaoManager.getIns().leave(hero);
//				break;
//			case OpenFunctionConst.FUN_PET_CATCH:
//				PetCatchManager.getIns().leave(hero);
//				break;
			default:
				break;
			}
		} catch (Exception e) {
			LogTool.warn(LogTool.errmsg(e)+" leave.hid:" + hid+" typeIncome:"+ typeIncome,this);
		}
	}
	
	/**
	 * 离开队伍，修改缓存
	 * @return	需要刷新队伍信息的队员ID
	 */
	public List<Long> leaveAndModifyTeamData( long hid) {
		List<Long> reflashHero = new ArrayList<Long>();
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if( teamIDInt==null){
			//你没在队伍
			return reflashHero;
		}
		Team team = TeamCache.getTeamMap().get( teamIDInt);
		if( team==null){
			//队伍缓存异常
			return reflashHero;
		}
		long leader = team.getLeader();
		boolean isLeader = false;//ture:队长
		if( hid==leader)
			isLeader=true;
		
		Map<Long, TeamMember> members = team.getMembers();
		members.remove( hid);
		TeamCache.removeHidToTeamIDMap(hid);
		
		boolean hadMember = false;//true:有人继承队长
		if( isLeader){
			Iterator<Entry<Long, TeamMember>> iterator = members.entrySet().iterator();
			while( iterator.hasNext()){
				Entry<Long, TeamMember> next = iterator.next();
				long hidTemp = next.getKey();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if( online){//队长离队，把队伍给其他队员
					team.setLeader( hidTemp);
					hadMember = true;
					TeamMember value = next.getValue();
					value.setType(TeamConst.TYPE_LEADER);
					break;
				}
			}
		}
		
		//需要刷新的队友
		if( (isLeader&& hadMember)|| !isLeader){
			Iterator<Long> iterator = members.keySet().iterator();
			while( iterator.hasNext()){
				long hidTemp = iterator.next();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if(online){
					reflashHero.add( hidTemp);
				}
			}
		}else{
			TeamCache.removeTeamMap(teamIDInt);
		}
		return reflashHero;
	}
	
	/**
	 * 离开队伍，修改缓存(包括机器人)
	 * @return	需要刷新队伍信息的队员ID
	 */
	public List<Long> leaveAndModifyTeamData( int teamID, long hid) {
		List<Long> reflashHero = new ArrayList<Long>();
		Team team = TeamCache.getTeamMap().get( teamID);
		if( team==null){
			//队伍缓存异常
			return reflashHero;
		}
		long leader = team.getLeader();
		boolean isLeader = false;//ture:队长
		if( hid==leader)
			isLeader=true;
		
		Map<Long, TeamMember> members = team.getMembers();
		members.remove( hid);
		TeamCache.removeHidToTeamIDMap(hid);
		
		boolean hadMember = false;//true:有人继承队长
		if( isLeader){
			Iterator<Entry<Long, TeamMember>> iterator = members.entrySet().iterator();
			while( iterator.hasNext()){
				Entry<Long, TeamMember> next = iterator.next();
				long hidTemp = next.getKey();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if( online){//队长离队，把队伍给其他队员
					team.setLeader( hidTemp);
					TeamMember value = next.getValue();
					value.setType(TeamConst.TYPE_LEADER);
					hadMember = true;
					break;
				}
			}
		}
		
		//需要刷新的队友
		if( (isLeader&& hadMember)|| !isLeader){
			Iterator<Long> iterator = members.keySet().iterator();
			while( iterator.hasNext()){
				long hidTemp = iterator.next();
				boolean online = HeroFunction.getIns().isOnline(hidTemp);
				if(online){
					reflashHero.add( hidTemp);
				}
			}
		}else{
			TeamCache.removeTeamMap(teamID);
		}
		return reflashHero;
	}
	
	/**
	 * 队伍解散，修改缓存
	 * @return	所有队员ID
	 */
	public List<Long> leaveAllAndModifyTeamData( long hid) {
		List<Long> reflashHero = new ArrayList<Long>();
		Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
		if( teamIDInt==null){
			//你没在队伍
			return reflashHero;
		}
		Team team = TeamCache.getTeamMap().get( teamIDInt);
		if( team==null){
			//队伍缓存异常
			return reflashHero;
		}
		Map<Long, TeamMember> members = team.getMembers();
		//需要刷新的队友
		Iterator<Long> iterator = members.keySet().iterator();
		while( iterator.hasNext()){
			long hidTemp = iterator.next();
//			boolean online = HeroFunction.getIns().isOnline(hidTemp);
//			if(online){
				reflashHero.add( hidTemp);
//			}
		}
		for(long hidTemp:reflashHero) {
			members.remove( hidTemp);
			TeamCache.removeHidToTeamIDMap(hidTemp);
		}
		TeamCache.removeTeamMap(teamIDInt);
		return reflashHero;
	}
	
	/**
	 * 队伍解散，修改缓存
	 * @return	所有队员ID
	 */
	public List<Long> removeAll(int teamId) {
		List<Long> reflashHero = new ArrayList<Long>();
		Team team = TeamCache.getTeamMap().get( teamId);
		if( team==null){
			//队伍缓存异常
			return reflashHero;
		}
		Map<Long, TeamMember> members = team.getMembers();
		//需要刷新的队友
		Iterator<Long> iterator = members.keySet().iterator();
		while( iterator.hasNext()){
			long hidTemp = iterator.next();
//			boolean online = HeroFunction.getIns().isOnline(hidTemp);
//			if(online){
				reflashHero.add( hidTemp);
//			}
		}
		for(long hidTemp:reflashHero) {
			members.remove( hidTemp);
			TeamCache.removeHidToTeamIDMap(hidTemp);
		}
		TeamCache.removeTeamMap(teamId);
		return reflashHero;
	}
	
	/**
	 * 转让队长
	 * @param hero 当前队长
	 * @param member 要转让职位的队员
	 */
	public void changeLeader(Hero hero, Hero member) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			long memberId = member.getId();
			if (hid == memberId) {
				// 不能转让给自己
				return;
			}
			Integer teamIDInt = TeamCache.getHidToTeamIDMap().get(hid);
			if (teamIDInt == null) {
				// 你没在队伍
				return;
			}
			Integer memberteamID = TeamCache.getHidToTeamIDMap().get(memberId);
			if (memberteamID == null) {
				// 不是队员
				return;
			}
			if (!teamIDInt.equals(memberteamID)) {
				// 不是队员
				return;
			}
			Team team = TeamCache.getTeamMap().get(teamIDInt);
			if (team == null) {
				// 队伍缓存异常
				return;
			}
			long leader = team.getLeader();
			if (hid != leader) {
				// 不是队长
				return;
			}
			team.setLeader(memberId);
			TeamMember oldLeader = team.getMembers().get(hid);
			if (oldLeader != null) {
				oldLeader.setType(TeamConst.TYPE_MEMBER);
			}
			TeamMember newLeader = team.getMembers().get(memberId);
			if (newLeader != null) {
				newLeader.setType(TeamConst.TYPE_LEADER);
			}
		} catch (Exception e) {
			LogTool.error(e, TeamFunction.class, hero.getId(), hero.getName(), "TeamFunction changeLeader");
		}
	}

	/**
	 * 获取发给前端的队伍数据(有机器人ID)
	 * @return	[B:类型 1是队长 2是队员U:队员名字L:队员IDI:机器人IDS:头像IDS:头像框IDS:队员等级L:队员战力]
	 */
	public Object[] getTeamSendData( int teamID) {
		Team team = TeamCache.getTeamMap().get( teamID);
		if(team==null)
			return new Object[0];
		List<Object[]> sendData = new ArrayList<Object[]>();
		
		List<TeamMember> memberList = new ArrayList<>();
		Map<Long, TeamMember> members = team.getMembers();
		Iterator<Entry<Long, TeamMember>> iterator = members.entrySet().iterator();
		while( iterator.hasNext()){
			Entry<Long, TeamMember> next = iterator.next();
			TeamMember value = next.getValue();
			memberList.add(value);
		}
		Collections.sort(memberList, CrossTeamFubenTeamComparator.getIns());
		
		int frameId = Config_xtcs_004.getIns().get(SettingConst.BASE_FRAME).getNum();
		for(TeamMember member:memberList) {
			int robotId = member.getRobotId();
			long hidTemp = member.getHid();
			
			if(robotId!=0){//机器人
				Struct_NPC_200 excelNpc = Config_NPC_200.getIns().get(robotId);
				sendData.add( new Object[]{member.getType(), member.getName(), 0, member.getRobotId(), excelNpc.getHead(), frameId, excelNpc.getLv(), excelNpc.getPower()});
			}else{
				Hero heroTemp = HeroCache.getHero( hidTemp);
				if(heroTemp!=null){
					String nameTemp = heroTemp.getNameZoneid();
					int levelTemp = heroTemp.getLevel();
					long totalStrengthTemp = heroTemp.getTotalStrength();
					sendData.add( new Object[]{member.getType(), nameTemp, hidTemp, 0, heroTemp.getIcon(), heroTemp.getFrame(), levelTemp, totalStrengthTemp});
				}else{
					//TODO 玩家离线了，退出队伍
					LogTool.warn("TeamFunction.getTeamSendData.hero is null.hid:"+hidTemp, this);
				}
			}
		}
		return sendData.toArray();
	}
	
	/**
	 * 获取发给前端的队伍数据(无有机器人ID)
	 * @return	[B:类型 1是队长 2是队员U:队员名字L:队员IDS:头像IDS:头像框IDS:队员等级L:队员战力]
	 */
	public Object[] getTeamSendDataNotRobot( int teamID) {
		Team team = TeamCache.getTeamMap().get( teamID);
		if(team==null)
			return new Object[0];
		List<Object[]> sendData = new ArrayList<Object[]>();
		
		List<TeamMember> memberList = new ArrayList<>();
		Map<Long, TeamMember> members = team.getMembers();
		Iterator<Entry<Long, TeamMember>> iterator = members.entrySet().iterator();
		while( iterator.hasNext()){
			Entry<Long, TeamMember> next = iterator.next();
			TeamMember value = next.getValue();
			memberList.add(value);
		}
		Collections.sort(memberList, CrossTeamFubenTeamComparator.getIns());
		
		int frameId = Config_xtcs_004.getIns().get(SettingConst.BASE_FRAME).getNum();
		for(TeamMember member:memberList) {
			int robotId = member.getRobotId();
			long hidTemp = member.getHid();
			
			if(robotId!=0){//机器人
				Struct_NPC_200 excelNpc = Config_NPC_200.getIns().get(robotId);
				sendData.add( new Object[]{member.getType(), member.getName(), 0, excelNpc.getHead(), frameId, excelNpc.getLv(), excelNpc.getPower()});
			}else{
				Hero heroTemp = HeroCache.getHero( hidTemp);
				if(heroTemp!=null){
					String nameTemp = heroTemp.getNameZoneid();
					int levelTemp = heroTemp.getLevel();
					long totalStrengthTemp = heroTemp.getTotalStrength();
					sendData.add( new Object[]{member.getType(), nameTemp, hidTemp, heroTemp.getIcon(), heroTemp.getFrame(), levelTemp, totalStrengthTemp});
				}else{
					//TODO 玩家离线了，退出队伍
					LogTool.warn("TeamFunction.getTeamSendData.hero is null.hid:"+hidTemp, this);
				}
			}
		}
		return sendData.toArray();
	}
}
