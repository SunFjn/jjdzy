package com.teamtop.system.country.model;

public class CountryStrengthRankModel {
	/** 玩家id */
	private long id;
	/** 玩家名字 */
	private String name;
	/** 官职 */
	private int official;
	/** 头像id */
	private int icon;
	/** 头像框id */
	private int frame;
	/** 玩家战力 */
	private long totalStrength;
	/** 职业 */
	private int job;
	/** 时装 */
	private int bodyId;
	private String showModel;
	/**坐骑*/
	private int mountId;

	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
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

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getBodyId() {
		return bodyId;
	}

	public void setBodyId(int bodyId) {
		this.bodyId = bodyId;
	}

	public String getShowModel() {
		return showModel;
	}

	public void setShowModel(String showModel) {
		this.showModel = showModel;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		CountryStrengthRankModel model = (CountryStrengthRankModel) obj;
		if (this.id != model.getId()) {
			return false;
		}
		return true;
	}

}
