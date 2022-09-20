package com.teamtop.system.battleGoods.model;
/**
 * 粮草争夺 参与者
 * @author jjjjyyy
 *
 */
public class BattleGoodsJoiner {
	
	private long hid;
	/**
	 * 所属大区id
	 */
	private int fristzoneid;
	/**
	 * 所属阵营
	 */
	private int index;
	/**
	 * 当前状态 0自由 1采集 2pvp 3pve 4死亡复活时间
	 */
	private int state;
	/**
	 * 对手id
	 */
	private long enemyId;
	/**
	 * 采集宝箱id
	 */
	private long boxId;
	/**
	 * pve怪物id
	 */
	private long monsterId;
	/**
	 * 状态切换时间
	 */
	private int stateTime;
	/**
	 * 气血
	 */
	private long hp;
	/**
	 * 护盾
	 */
	private long huDun;
	
	public BattleGoodsJoiner() {
		super();
	}
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getFristzoneid() {
		return fristzoneid;
	}
	public void setFristzoneid(int fristzoneid) {
		this.fristzoneid = fristzoneid;
	}
	public int getState() {
		return state;
	}
	public void setState(int state) {
		this.state = state;
	}
	public long getEnemyId() {
		return enemyId;
	}
	public void setEnemyId(long enemyId) {
		this.enemyId = enemyId;
	}
	public long getBoxId() {
		return boxId;
	}
	public void setBoxId(long boxId) {
		this.boxId = boxId;
	}
	public long getMonsterId() {
		return monsterId;
	}
	public void setMonsterId(long monsterId) {
		this.monsterId = monsterId;
	}
	public int getStateTime() {
		return stateTime;
	}
	public void setStateTime(int stateTime) {
		this.stateTime = stateTime;
	}
	public long getHp() {
		return hp;
	}
	public void setHp(long hp) {
		this.hp = hp;
	}
	public long getHuDun() {
		return huDun;
	}
	public void setHuDun(long huDun) {
		this.huDun = huDun;
	}


	public int getIndex() {
		return index;
	}


	public void setIndex(int index) {
		this.index = index;
	}
	
	

}
