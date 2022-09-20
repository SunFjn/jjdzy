package com.teamtop.system.NPC;

import com.teamtop.system.hero.HeroXData;
import com.teamtop.util.common.UpdatePropertyValue;



public class NPC implements Comparable<NPC>{
	/**	 * 唯一ID	 */
	protected long id;
	/**	 * 系统ID	 */
	protected int sysId;
	/**	 * 朝向	 */
	protected int direction;
	/**	 * 坐标X	 */
	protected int posX;
	/**	 * 坐标Y	 */
	protected int posY;
	/**	 * 路径	 */
	protected int route[][];
	/**	 * 场景系统id	 */
	protected int sceneSysId;
	/**	 * 场景唯一id	 */
	protected long sceneUnitId;
	/**	 * npc类型(冗余数据)	 */
	protected int npcType;
	/**	 * 客户端npc类型，只有怪物和非怪物，判断是否可以攻击	 */
	protected int clientNpcType;
	/**	 * 第几波(不一定有)	 */
	protected int wave =-1;
	/**	 * 其他的数据	 */
	protected UpdatePropertyValue otherData;	
	/**	 * 创建时间	 */
	protected int createTime;
	/**	 * 状态 0：正常，1：战斗，2：冻结	 */
	protected int sceneState;
	/**	 * 进入战斗的时间	 */
	protected int timeBattleBegin;
	
	
	public int getSceneState() {
		return sceneState;
	}
	public void setSceneState(int sceneState) {
		this.sceneState = sceneState;
	}
	public int getCreateTime() {
		return createTime;
	}
	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}
	/**
	 * @return the id
	 */
	public long getId() {
		return id;
	}
	/**
	 * @param id the id to set
	 */
	public void setId(long id) {
		this.id = id;
	}
	public int getSysId() {
		return sysId;
	}
	public void setSysId(int sysId) {
		this.sysId = sysId;
	}
	public int getDirection() {
		return direction;
	}
	public void setDirection(int direction) {
		this.direction = direction;
	}
	public int getPosX() {
		return posX;
	}
	public void setPosX(int posX) {
		this.posX = posX;
	}
	public int getPosY() {
		return posY;
	}
	public void setPosY(int posY) {
		this.posY = posY;
	}
	public Object[] getRoute() {
		if(route==null) return null;
		Object[] obj = new Object[route.length];
		int i=0;
		for(int[] pos:route){
			obj[i++] = new Object[]{pos[0],pos[1]};
		}
		return obj;
	}
	public int[][] getRouteIntArr(){
		return this.route;
	}
	public void setRoute(int[][] route) {
		this.route = route;
	}
	public int getSceneSysId() {
		return sceneSysId;
	}
	public void setSceneSysId(int sceneSysId) {
		this.sceneSysId = sceneSysId;
	}
	public long getSceneUnitId() {
		return sceneUnitId;
	}
	public void setSceneUnitId(long sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}
	public int getNpcType() {
		return npcType;
	}
	public void setNpcType(int npcType) {
		this.npcType = npcType;
	}
	public int getWave() {
		return wave;
	}
	public void setWave(int wave) {
		this.wave = wave;
	}
	public int getTimeBattleBegin() {
		return timeBattleBegin;
	}
	public void setTimeBattleBegin(int timeBattleBegin) {
		this.timeBattleBegin = timeBattleBegin;
	}
	@Override
	public int compareTo(NPC o) {
		final long x = this.id;
		final long y = o.getId();
		return (x < y) ? -1 : ((x == y) ? 0 : 1);
	}
	public UpdatePropertyValue getOtherData() {
		if(this.otherData == null){
			this.otherData = new UpdatePropertyValue();
		}
		return this.otherData;
	}
		
	public NPC() {
		super();
	}
	
	public NPC(long id, int sysId, int direction, int posX, int posY,
			int[][] route, int sceneSysId, int sceneUnitId, int clientNpcType,int npcType,
			int wave) {
		super();
		this.id = id;
		this.sysId = sysId;
		this.direction = direction;
		this.posX = posX;
		this.posY = posY;
		this.route = route;
		this.sceneSysId = sceneSysId;
		this.sceneUnitId = sceneUnitId;
		this.npcType = npcType;
		this.clientNpcType = clientNpcType;
		this.wave = wave;
		this.otherData = new UpdatePropertyValue();
		
//		otherData.addProperty("id", id*-1);
//		otherData.addProperty("sysId", sysId);
//		otherData.addProperty("posX", posX);
//		otherData.addProperty("posY", posY);
		otherData.addProperty(HeroXData.id, id*-1);
		otherData.addProperty(HeroXData.sysId, sysId);
		otherData.addProperty(HeroXData.posX, posX);
		otherData.addProperty(HeroXData.posY, posY);
//		otherData.addProperty("sceneSysId", sceneSysId);
//		otherData.addProperty("sceneUnitId", sceneUnitId);
	}
//	public void setOtherData(UpdatePropertyValue otherData) {
//		this.otherData = otherData;
//	}
	public int getClientNpcType() {
		return clientNpcType;
	}
	public void setClientNpcType(int clientNpcType) {
		this.clientNpcType = clientNpcType;
	}
	/**
	 * 添加属性
	 * @param key
	 * @param value
	 */
	public void addAttr(Object key,Object value){
		if(otherData==null) otherData = new UpdatePropertyValue();
		otherData.addProperty(key, value);
	}
}
