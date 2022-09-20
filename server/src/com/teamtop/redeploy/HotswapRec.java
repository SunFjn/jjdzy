package com.teamtop.redeploy;

import com.teamtop.util.cache.CacheModel;

/**
 * 热更记录
 * @author Administrator
 *
 */
public class HotswapRec extends CacheModel{
	/**
	 * id
	 */
	private int id;
	/**
	 * 时间
	 */
	private int time;
	/**
	 * 描述
	 */
	private String zhushi;
	/**
	 * 涉及类
	 */
	private String classinfo;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getTime() {
		return time;
	}
	public void setTime(int time) {
		this.time = time;
	}
	
	public String getClassinfo() {
		return classinfo;
	}
	public void setClassinfo(String classinfo) {
		this.classinfo = classinfo;
	}
	public String getZhushi() {
		return zhushi;
	}
	public void setZhushi(String zhushi) {
		this.zhushi = zhushi;
	}
	public HotswapRec(int time, String zhushi, String classinfo) {
		super();
		this.time = time;
		this.zhushi = zhushi;
		this.classinfo = classinfo;
	}
	
	
}
