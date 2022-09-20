package com.teamtop.forbid;

import java.util.List;

public class ForbidEventRec {
	/**
	 * 被屏蔽的class类
	 */
	private Class<?> clazz;
	/**
	 * 没有被屏蔽的fun方法
	 */
	private List<String> unForbidFun;
	public Class<?> getClazz() {
		return clazz;
	}
	public void setClazz(Class<?> clazz) {
		this.clazz = clazz;
	}
	public List<String> getUnForbidFun() {
		return unForbidFun;
	}
	public void setUnForbidFun(List<String> unForbidFun) {
		this.unForbidFun = unForbidFun;
	}
	
}
