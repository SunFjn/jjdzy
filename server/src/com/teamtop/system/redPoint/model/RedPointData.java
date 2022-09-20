package com.teamtop.system.redPoint.model;

import java.util.HashMap;
import java.util.Map;

public class RedPointData {

	private boolean sendLogin = false;

	// 登录红点
	private Map<Integer, Map<Integer, Integer>> loginRedPointMap = new HashMap<>();

	// 更新红点
	private Map<Integer, Map<Integer, Integer>> updateRedPointMap = new HashMap<>();

	// 快速更新红点
	private Map<Integer, Map<Integer, Integer>> fastRedPointMap = new HashMap<>();

	public Map<Integer, Map<Integer, Integer>> getLoginRedPointMap() {
		return loginRedPointMap;
	}

	public void setLoginRedPointMap(Map<Integer, Map<Integer, Integer>> loginRedPointMap) {
		this.loginRedPointMap = loginRedPointMap;
	}

	public Map<Integer, Map<Integer, Integer>> getUpdateRedPointMap() {
		return updateRedPointMap;
	}

	public void setUpdateRedPointMap(Map<Integer, Map<Integer, Integer>> updateRedPointMap) {
		this.updateRedPointMap = updateRedPointMap;
	}

	public Map<Integer, Map<Integer, Integer>> getFastRedPointMap() {
		return fastRedPointMap;
	}

	public void setFastRedPointMap(Map<Integer, Map<Integer, Integer>> fastRedPointMap) {
		this.fastRedPointMap = fastRedPointMap;
	}

	public boolean isSendLogin() {
		return sendLogin;
	}

	public void setSendLogin(boolean sendLogin) {
		this.sendLogin = sendLogin;
	}

}
