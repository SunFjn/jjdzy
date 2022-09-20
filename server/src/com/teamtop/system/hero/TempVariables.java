package com.teamtop.system.hero;

import java.util.List;

public class TempVariables {

	/**
	 * 传承冷却时间
	 */
	private int inheritanceCoolDownTime;
	
	/**
	 * 帮会邀请时间
	 */
	private int gangInviteCoolDownTime;
	
	/**
	 * 跨服聊天冷却时间
	 */
	private int crossLengQueShiJian;
	/**
	 * 本服聊天冷却时间
	 */
	private int localLengQueShiJian;
	/**
	 * 国家聊天冷却时间
	 */
	private int countryLengQueShiJian;
	/**
	 * 系统聊天冷却时间
	 */
	private int systemLengQueShiJian;
	/**
	 * 登陆进入场景
	 */
	private boolean loginEnterScene;
	/**
	 * 登录成功标识
	 */
	private boolean loginSuccess;
	/**
	 * 登出标识
	 */
	private boolean logoutState;
	/**
	 * 是否自动攻击
	 */
	private boolean attAuto = true;
	/**
	 * 每周历险指定摇筛点数
	 */
	private int specWeekAdventureGambelPoint;
	/**
	 * 已经有数据放在数据库的表对应的class
	 */
	private List<Class<?>> existTableList = null;
	/**
	 * 跳转场景的类型（如：相同场景跳转）
	 */
	private int changeSceneType = 0;
	/**
	 * 登录处理背包格子离线时间状态
	 */
	private boolean dealBagTime = false;
	/**
	 * 登录零时时间（登录即记录）
	 */
	private int loginTemp;
	/**
	 * 登出零时时间
	 */
	private int logoutTemp;
	/**
	 * 最近一次心跳包同步时间
	 */
	private int lastHeartBeatTime;
	/**
	 * 跨服登陆类型
	 */
	private int crossLoginType;
	/**
	 * 跨服登陆房间id
	 */
	private int crossLoginRoomId;
	/**
	 * 跨服登陆参数
	 */
	private Object[] crossLoginParam;
	/**
	 * 最近几句聊天记录
	 */
	private List<String> talkings;
	/**
	 * 上一句聊天
	 */
	private String chatstr;
	
	public List<String> getTalkings() {
		return talkings;
	}
	public void setTalkings(List<String> talkings) {
		this.talkings = talkings;
	}

	public Object[] getCrossLoginParam() {
		return crossLoginParam;
	}

	public void setCrossLoginParam(Object[] crossLoginParam) {
		this.crossLoginParam = crossLoginParam;
	}
	public int getCrossLoginRoomId() {
		return crossLoginRoomId;
	}
	public void setCrossLoginRoomId(int crossLoginRoomId) {
		this.crossLoginRoomId = crossLoginRoomId;
	}
	public int getCrossLoginType() {
		return crossLoginType;
	}
	public void setCrossLoginType(int crossLoginType) {
		this.crossLoginType = crossLoginType;
	}
	public int getLastHeartBeatTime() {
		return lastHeartBeatTime;
	}
	public void setLastHeartBeatTime(int lastHeartBeatTime) {
		this.lastHeartBeatTime = lastHeartBeatTime;
	}
	public int getLoginTemp() {
		return loginTemp;
	}
	public void setLoginTemp(int loginTemp) {
		this.loginTemp = loginTemp;
	}

	public int getLogoutTemp() {
		return logoutTemp;
	}

	public void setLogoutTemp(int logoutTemp) {
		this.logoutTemp = logoutTemp;
	}

	public boolean isDealBagTime() {
		return dealBagTime;
	}

	public void setDealBagTime(boolean dealBagTime) {
		this.dealBagTime = dealBagTime;
	}

	public int getChangeSceneType() {
		return changeSceneType;
	}

	public void setChangeSceneType(int changeSceneType) {
		this.changeSceneType = changeSceneType;
	}

	public List<Class<?>> getExistTableList() {
		return existTableList;
	}

	public void setExistTableList(List<Class<?>> existTableList) {
		this.existTableList = existTableList;
	}

	public int getSpecWeekAdventureGambelPoint() {
		return specWeekAdventureGambelPoint;
	}

	public void setSpecWeekAdventureGambelPoint(int specWeekAdventureGambelPoint) {
		this.specWeekAdventureGambelPoint = specWeekAdventureGambelPoint;
	}

	public boolean isAttAuto() {
		return attAuto;
	}

	public void setAttAuto(boolean attAuto) {
		this.attAuto = attAuto;
	}

	public int getGangInviteCoolDownTime() {
		return gangInviteCoolDownTime;
	}

	public void setGangInviteCoolDownTime(int gangInviteCoolDownTime) {
		this.gangInviteCoolDownTime = gangInviteCoolDownTime;
	}

	public int getInheritanceCoolDownTime() {
		return inheritanceCoolDownTime;
	}

	public void setInheritanceCoolDownTime(int inheritanceCoolDownTime) {
		this.inheritanceCoolDownTime = inheritanceCoolDownTime;
	}
	
	public boolean isLoginEnterScene() {
		return loginEnterScene;
	}

	public void setLoginEnterScene(boolean loginEnterScene) {
		this.loginEnterScene = loginEnterScene;
	}

	public boolean isLoginSuccess() {
		return loginSuccess;
	}

	public void setLoginSuccess(boolean loginSuccess) {
		this.loginSuccess = loginSuccess;
	}
	public boolean isLogoutState() {
		return logoutState;
	}
	public void setLogoutState(boolean logoutState) {
		this.logoutState = logoutState;
	}
	public int getCrossLengQueShiJian() {
		return crossLengQueShiJian;
	}
	public void setCrossLengQueShiJian(int crossLengQueShiJian) {
		this.crossLengQueShiJian = crossLengQueShiJian;
	}
	public int getLocalLengQueShiJian() {
		return localLengQueShiJian;
	}
	public void setLocalLengQueShiJian(int localLengQueShiJian) {
		this.localLengQueShiJian = localLengQueShiJian;
	}
	public int getCountryLengQueShiJian() {
		return countryLengQueShiJian;
	}
	public void setCountryLengQueShiJian(int countryLengQueShiJian) {
		this.countryLengQueShiJian = countryLengQueShiJian;
	}
	public int getSystemLengQueShiJian() {
		return systemLengQueShiJian;
	}
	public void setSystemLengQueShiJian(int systemLengQueShiJian) {
		this.systemLengQueShiJian = systemLengQueShiJian;
	}
	public String getChatstr() {
		return chatstr;
	}
	public void setChatstr(String chatstr) {
		this.chatstr = chatstr;
	}
	
	
}
