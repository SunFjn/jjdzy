package com.teamtop.system.scene;

public class Scene {
	
	private long hid;//角色id
	/**	 * 场景唯一ID 	 */
	private long sceneUnitId;
	/**	 * 场景系统ID	 */
	private int sceneSysId;
	/**	 * 坐标X	 */
	private int posX;
	/**	 * 坐标Y	 */
	private int posY;
	/**	 * 旧位置:每次跳转记录	 */
	private PreLocation preLocation;
	/**	 * 旧位置:每次从补给地图跳转记录	 */
	private PreSupplyLocation preSupplyLocation;
	/**	 * 临时记录的跳转过程的新地点	 */
	private NewLocation newLocation;
	/**	 * 场景类型(冗余数据)	 */
	private int sceneType;
	/**	 * 路径	 */
	private Integer route[][];
	/**	 * 人物朝向	 */
	private int direction;
	/**	 * 终点X	 */
	private int endX;
	/**	 * 终点Y	 */
	private int endY;
	/**	 * 登陆中央服前的场景	 */
	private PreLocation localScene;
	/**	 * 移动速度	 */
	private int moveSpeed;
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getSceneUnitId() {
		return sceneUnitId;
	}
	public void setSceneUnitId(long sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}
	public int getSceneSysId() {
		return sceneSysId;
	}
	public void setSceneSysId(int sceneSysId) {
		this.sceneSysId = sceneSysId;
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
	public PreLocation getPreLocation() {
		return preLocation;
	}
	public void setPreLocation(PreLocation preLocation) {
		this.preLocation = preLocation;
	}
	public PreSupplyLocation getPreSupplyLocation() {
		return preSupplyLocation;
	}
	public void setPreSupplyLocation(PreSupplyLocation preSupplyLocation) {
		this.preSupplyLocation = preSupplyLocation;
	}
	public NewLocation getNewLocation() {
		return newLocation;
	}
	public void setNewLocation(NewLocation newLocation) {
		this.newLocation = newLocation;
	}
	public int getSceneType() {
		return sceneType;
	}
	public void setSceneType(int sceneType) {
		this.sceneType = sceneType;
	}
	public Integer[][] getRoute() {
		return route;
	}
	public void setRoute(Integer[][] route) {
		this.route = route;
	}
	public int getDirection() {
		return direction;
	}
	public void setDirection(int direction) {
		this.direction = direction;
	}
	public int getEndX() {
		return endX;
	}
	public void setEndX(int endX) {
		this.endX = endX;
	}
	public int getEndY() {
		return endY;
	}
	public void setEndY(int endY) {
		this.endY = endY;
	}
	public PreLocation getLocalScene() {
		return localScene;
	}
	public void setLocalScene(PreLocation localScene) {
		this.localScene = localScene;
	}
	public int getMoveSpeed() {
		return moveSpeed;
	}
	public void setMoveSpeed(int moveSpeed) {
		this.moveSpeed = moveSpeed;
	}

}
