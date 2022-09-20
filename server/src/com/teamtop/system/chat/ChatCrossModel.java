package com.teamtop.system.chat;

public class ChatCrossModel {
	private long hid;
	/**头像id**/
	private int herdid;
	/**头像框ui**/
	private int herdUi;
	/**等级**/
	private int level;
	/**轮回等级**/
	private int reincarnationLevel;
	/**战力**/
	private long str;
	/**晋升**/
	private int  promotionLv;
	/**转生**/
	private int rebornType;
	/**国家**/
	private int CountryType;
	/**将衔**/
	private int official;
	/**vip**/
	private int vipLv;
	/**称号**/
	private int titleId;
	/**职业时装**/
	private int job;
	/**专属神兵**/
	private int godWeapon;
	/**是否展示**/
	private int isShow;
	/**名字**/
	private String name;
	/**内容**/
	private String msg;
	private int mountId;
	
	public ChatCrossModel() {
		super();
	}
	
	public ChatCrossModel(long hid, int herdid, int herdUi, int level,int reincarnationLevel, long str, int promotionLv, int rebornType,
			int countryType, int official, int vipLv,int titleId,int job,int godWeapon,int isShow, String name, String msg, int mountId) {
		super();
		this.hid = hid;
		this.herdid = herdid;
		this.herdUi = herdUi;
		this.level = level;
		this.reincarnationLevel = reincarnationLevel;
		this.str = str;
		this.promotionLv = promotionLv;
		this.rebornType = rebornType;
		this.CountryType = countryType;
		this.official = official;
		this.vipLv = vipLv;
		this.titleId=titleId;
		this.job=job;
		this.godWeapon=godWeapon;
		this.isShow=isShow;
		this.name = name;
		this.msg = msg;
		this.mountId = mountId;
	}


	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}

	public int getHerdid() {
		return herdid;
	}

	public void setHerdid(int herdid) {
		this.herdid = herdid;
	}

	public int getHerdUi() {
		return herdUi;
	}

	public void setHerdUi(int herdUi) {
		this.herdUi = herdUi;
	}

	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public long getStr() {
		return str;
	}
	public void setStr(long str) {
		this.str = str;
	}
	public int getPromotionLv() {
		return promotionLv;
	}
	public void setPromotionLv(int promotionLv) {
		this.promotionLv = promotionLv;
	}
	public int getRebornType() {
		return rebornType;
	}
	public void setRebornType(int rebornType) {
		this.rebornType = rebornType;
	}
	public int getCountryType() {
		return CountryType;
	}
	public void setCountryType(int countryType) {
		CountryType = countryType;
	}
	public int getOfficial() {
		return official;
	}
	public void setOfficial(int official) {
		this.official = official;
	}
	public int getVipLv() {
		return vipLv;
	}
	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}

	public int getTitleId() {
		return titleId;
	}

	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getIsShow() {
		return isShow;
	}

	public void setIsShow(int isShow) {
		this.isShow = isShow;
	}

	public int getGodWeapon() {
		return godWeapon;
	}

	public void setGodWeapon(int godWeapon) {
		this.godWeapon = godWeapon;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}
	
	

}
