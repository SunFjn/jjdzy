package com.teamtop.system.team;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicInteger;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.team.model.Team;
import com.teamtop.util.cache.union.UC;

/**
 * 队伍缓存
 * @author Administrator
 *
 */
public class TeamCache extends AbsServerEvent{
	
	/**  队伍缓存  key:队伍ID   value:队伍对象  **/
	private static ConcurrentHashMap<Integer, Team> teamMap = UC.reg("teamMap",new ConcurrentHashMap< Integer, Team>());
	/**  玩家是否有队伍   key:玩家ID   value:队伍ID  **/
	private static ConcurrentHashMap<Long, Integer> hidToTeamIDMap = UC.reg("hidToTeamIDMap",new ConcurrentHashMap< Long, Integer>());
	/**	 * 队伍ID，自动+1	 */
	private static AtomicInteger teamIdGen = new AtomicInteger();
	
	@Override
	public void startServer() throws RunServerException {
	}
	
	/**
	 * 获取新的队伍id
	 */
	public static int getTeamId(){
		int i = teamIdGen.get();
		if (i >= Integer.MAX_VALUE || i==0) teamIdGen.set(1);
		return teamIdGen.getAndIncrement();
	}
	
	public static ConcurrentHashMap<Integer, Team> getTeamMap() {
		return teamMap;
	}
	
	/**
	 * @param type  队伍类型 ：默认是系统开启表ID  其他：1：场景队伍，2：组队大厅   
	 * @param num	需要抽取的队伍数量，数据无规律
	 * @param partId 跨服分组id(非跨服传入0即可)
	 * @return
	 */
	public static ConcurrentHashMap<Integer, Team> getTeamMapBySystemID(int type, int num, int partId) {
		ConcurrentHashMap<Integer, Team> teamMapTemp = new ConcurrentHashMap<Integer, Team>();
		Iterator<Team> iterator = teamMap.values().iterator();
		int numAdd = 0;
		while( iterator.hasNext()){
			Team team = iterator.next();
			int teamType = team.getTeamType();
			if( teamType==type){
				if (partId > 0 && team.getPartId() != partId) {
					continue;
				}
				teamMapTemp.put( team.getId(), team);
				numAdd++;
				if( numAdd>=num)
					break;
			}
		}
		return teamMapTemp;
	}
	
	public static void setTeamMap(ConcurrentHashMap<Integer, Team> teamMap) {
		TeamCache.teamMap = teamMap;
	}
	public static void setTeamMap( int teamID, Team teamData) {
		teamMap.put( teamID, teamData);
	}
	public static void removeTeamMap( int teamID) {
		teamMap.remove( teamID);
	}
	public static ConcurrentHashMap<Long, Integer> getHidToTeamIDMap() {
		return hidToTeamIDMap;
	}
	public static void setHidToTeamIDMap(ConcurrentHashMap<Long, Integer> hidToTeamIDMap) {
		TeamCache.hidToTeamIDMap = hidToTeamIDMap;
	}
	public static void setHidToTeamIDMap( long hid, int teamID) {
		hidToTeamIDMap.put( hid, teamID);
	}
	public static void removeHidToTeamIDMap( long hid) {
		hidToTeamIDMap.remove(hid);
	}
	public static Team getTeamById(int teamId){
		return teamMap.get(teamId);
	}
}
