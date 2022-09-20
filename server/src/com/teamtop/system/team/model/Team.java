package com.teamtop.system.team.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;

/**
 * 队伍
 */
public class Team implements Comparable<Team>{
	/**	 * 队伍id	 */
//	@FieldOrder(order = 1)
	private int id;
	/**	 * 队长id	 */
//	@FieldOrder(order = 2)
	private long leader;
	/**	 * 队员:按照先后顺序排列，队长排第一位，第二进入在第二位,若人满之后，第二个退出，则后面的玩家前移	 */
//	@FieldOrder(order = 3)
	private Map<Long,TeamMember> members = new HashMap<Long, TeamMember>();
	/**	 * 创建时间	单位：s */
	private int createTime;
	/**	 * 队伍类型 1：xxxx，2：xxxx 或：系统开启表ID	 */
	private int teamType;
	/** 跨服分组id（跨服类型组队用,非跨服填0） */
	private int partId;
	
	
	/**	 * 临时id  使用的系统：跨服组队配置表ID */
	private int idRoom;
//	/**	 * 组队捉宠， 使用道具的队员id: 0是没有使用道具 */
//	private long useHid;
//	/**	 * 副本ID  使用的系统：问鼎天道	 */
//	private int fubenid;
//	/**	 * 组队捉宠，该次队伍打算捕捉的宠物id	 */
//	private int petSysid;
//	/**	 * 阵法	 */
//	private TeamDeploy[] teamDeploy;
//	/**	 * 密码	 */
//	private String pwd;
//	/**	 * 最低战力要求	 */
//	private int minStrength;
//	/**	 * 申请队长的队员id，没有时为0	 */
//	private long applyForLeaderId;	
//	/**	 * 队伍额外数据，用来保存队伍的一些特殊数据	 */
//	private int param;
	

	public Team(int id, int createTime, int teamType, int partId) {
		super();
		this.id = id;
		this.createTime = createTime;
		this.teamType = teamType;
		this.partId = partId;
	}
//	public Team() {
//	}
	
	public long getLeader() {
		return leader;
	}
	public void setLeader(long leader) {
		this.leader = leader;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Map<Long, TeamMember> getMembers() {
		return members;
	}
	public void setMembers(Map<Long, TeamMember> members) {
		this.members = members;
	}
	public Hero getLeaderHero(){
		return HeroCache.getHero(leader);
	}
	public int getCreateTime() {
		return createTime;
	}
	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}
	public int getTeamType() {
		return teamType;
	}
	public void setTeamType(int teamType) {
		this.teamType = teamType;
	}
	public int getIdRoom() {
		return idRoom;
	}
	public void setIdRoom(int idRoom) {
		this.idRoom = idRoom;
	}

	public int getPartId() {
		return partId;
	}

	public void setPartId(int partId) {
		this.partId = partId;
	}

	//	public Hero getMember(long mid){
//		Hero hero = HeroCache.getHero(mid);
//		if(hero==null){
//			hero = members.get(mid).getOfflineHero();
//		}
//		return hero;
//	}
	@Override
	public String toString() {
		return "Team [id=" + id + ", teamType=" + teamType + ", createTime="
				+ createTime + "]";
	}
	@Override
	public int compareTo(Team o) {
		if(o.getId()==this.id) return 0;
		if(o.getId()>this.id) return -1;
		return 1;
	}
}
