package com.teamtop.system.taoyuanSworn.model;

import java.util.HashMap;
import java.util.Set;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 桃园结义
 */
public class TaoyuanSworn extends CacheModel {
	/** 唯一id */
	@FieldOrder(order = 1)
	private long id;
	/** 义盟名称 */
	@FieldOrder(order = 2)
	private String name;
	/** 义盟活跃度时间*/
	@FieldOrder(order = 3)
	private int time;
	/** 成员 */
	@FieldOrder(order = 4)
	private HashMap<Long,Member> member;
	/**申请玩家*/
	@FieldOrder(order = 5)
	private HashMap<Long,Member> applyMember;
	/**每日重置：完成 桃园结义任务的玩家<任务id,<玩家id>>*/
	@FieldOrder(order = 6)
	private HashMap<Integer,Set<Long>> taskComplete;
	/**每日重置：开启BOSS id : 0.未开启*/ 
	@FieldOrder(order = 7)
	private int bossId;
	/**每日重置：开启桃园结义BOSS玩家名称*/
	@FieldOrder(order = 8)
	private String openBossName;
	/**每日重置：BOSS 当前气血 */
	@FieldOrder(order = 9)
	private long curhp;
	/**所在区*/
	@FieldOrder(order = 10)
	private int zoneid;
	/**boss死亡状态 0.未死亡 1.已死亡*/
	@FieldOrder(order = 11)
	private int dieState;
	
	
	public static TaoyuanSworn valueOf(String name, Member member, int zoneid) {
		TaoyuanSworn result = new TaoyuanSworn();
		result.setName(name);
		int time = TaoyuanSwornFunction.getCurrentTime();
		result.setTime(time);
		HashMap<Long,Member> members = new HashMap<Long, Member>();
		members.put(member.getHid(), member);
		result.setMember(members);
		result.setTaskComplete(new HashMap<Integer, Set<Long>>());
		result.setApplyMember(new HashMap<Long, Member>());
		result.setOpenBossName("");
		result.setZoneid(zoneid);
		return result;
	}
	
	/**刷新义盟成员信息*/
	public static void refreshMember(Hero hero, TaoyuanSworn taoyuanSworn) {
		HashMap<Long, Member> oldMember = taoyuanSworn.getMember();
		Member mb = oldMember.get(hero.getId());
		Member.refresh(hero, mb);
	}
	

	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
	}

	public HashMap<Long, Member> getMember() {
		return member;
	}

	public void setMember(HashMap<Long, Member> member) {
		this.member = member;
	}

	public HashMap<Long, Member> getApplyMember() {
		return applyMember;
	}

	public void setApplyMember(HashMap<Long, Member> applyMember) {
		this.applyMember = applyMember;
	}

	public String getOpenBossName() {
		return openBossName;
	}

	public void setOpenBossName(String openBossName) {
		this.openBossName = openBossName;
	}

	public HashMap<Integer, Set<Long>> getTaskComplete() {
		return taskComplete;
	}

	public void setTaskComplete(HashMap<Integer, Set<Long>> taskComplete) {
		this.taskComplete = taskComplete;
	}

	public long getCurhp() {
		return curhp;
	}

	public void setCurhp(long curhp) {
		this.curhp = curhp;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getDieState() {
		return dieState;
	}

	public void setDieState(int dieState) {
		this.dieState = dieState;
	}

}
