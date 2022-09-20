package com.teamtop.system.taoyuanSworn.model;

import java.util.HashMap;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 桃园成员
 */
public class Member {
	/** ID */
	@FieldOrder(order = 1)
	private long hid;
	/** 名称 */
	@FieldOrder(order = 2)
	private String name;
	/** 头像 */
	@FieldOrder(order = 3)
	private int icon;
	/** 头像框 */
	@FieldOrder(order = 4)
	private int frame;
	/** 大哥标识：1.大哥  2.二哥 3.三弟 */
	@FieldOrder(order = 5)
	private int flag;
	/** 战力 */
	@FieldOrder(order = 6)
	private long strength;
	/** 计算离线时间 */
	@FieldOrder(order = 7)
	private int logoutTime;
	/** vip等级 */
	@FieldOrder(order = 8)
	private int vipLv;
	/** 申请时间 */
	@FieldOrder(order = 9)
	private int applyTime;
	/** 登录弹出加入提示：1.已提示 */
	@FieldOrder(order = 10)
	private int tips;
	/**等级 */
	@FieldOrder(order = 11)
	private int level;
	
	/**每日重置 桃园结义任务<任务id,任务参数>*/
	@FieldOrder(order = 12)
	private HashMap<Integer,Integer> swornTaskMap;
	
	public static Member valueOf(Hero hero) {
		Member result = new Member();
		result.setHid(hero.getId());
		result.setName(hero.getNameZoneid());
		result.setIcon(hero.getIcon());
		result.setFrame(hero.getFrame());
		result.setStrength(hero.getTotalStrength());
		int time = TaoyuanSwornFunction.getCurrentTime();
		result.setLogoutTime(time);
		result.setVipLv(hero.getVipLv());
		result.setApplyTime(time);
		result.setLevel(hero.getLevel());
		result.setSwornTaskMap(new HashMap<Integer, Integer>());
		return result;
	}
	
	/**刷新成员信息*/
	public static void refresh(Hero hero,Member member) {
		member.setName(hero.getNameZoneid());
		member.setIcon(hero.getIcon());
		member.setFrame(hero.getFrame());
		member.setStrength(hero.getTotalStrength());
		int time = TaoyuanSwornFunction.getCurrentTime();
		member.setLogoutTime(time);
		member.setVipLv(hero.getVipLv());
		member.setLevel(hero.getLevel());
	}
	
	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getIcon() {
		return icon;
	}
	public void setIcon(int icon) {
		this.icon = icon;
	}
	public int getFrame() {
		return frame;
	}
	public void setFrame(int frame) {
		this.frame = frame;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public long getStrength() {
		return strength;
	}
	public void setStrength(long strength) {
		this.strength = strength;
	}
	public int getLogoutTime() {
		return logoutTime;
	}
	public void setLogoutTime(int logoutTime) {
		this.logoutTime = logoutTime;
	}
	public int getVipLv() {
		return vipLv;
	}
	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}
	public int getApplyTime() {
		return applyTime;
	}

	public void setApplyTime(int applyTime) {
		this.applyTime = applyTime;
	}

	public int getTips() {
		return tips;
	}
	public void setTips(int tips) {
		this.tips = tips;
	}

	public HashMap<Integer, Integer> getSwornTaskMap() {
		return swornTaskMap;
	}

	public void setSwornTaskMap(HashMap<Integer, Integer> swornTaskMap) {
		this.swornTaskMap = swornTaskMap;
	}
}
