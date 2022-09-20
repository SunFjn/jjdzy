package com.teamtop.houtaiHttp.events.onlineHero;
/**
 * 在线玩家分页model
 * @author kyle
 *
 */
public class M_OnlineHeroPage {
	private int page;
	private int totalPage;
	private int totalRole;//在线玩家数量
	private int regRoleNum;//注册玩家数量
	private M_OnlineHeroInfo[] infoArr;
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public int getTotalRole() {
		return totalRole;
	}
	public void setTotalRole(int totalRole) {
		this.totalRole = totalRole;
	}
	public int getRegRoleNum() {
		return regRoleNum;
	}
	public void setRegRoleNum(int regRoleNum) {
		this.regRoleNum = regRoleNum;
	}
	public M_OnlineHeroInfo[] getInfoArr() {
		return infoArr;
	}
	public void setInfoArr(M_OnlineHeroInfo[] infoArr) {
		this.infoArr = infoArr;
	}
}
