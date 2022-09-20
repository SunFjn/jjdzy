package com.teamtop.system.crossCommonRank.model;

public class CommonRankModel implements Comparable<CommonRankModel> {
	/** 玩家排名 */
	private int rank;
	/** 玩家id */
	private long hid;
	/** 玩家名称 */
	private String name;
	/** 次数,充值金额，消费金额 */
	private int parameter;
	/** 玩家排名达到时间 */
	private int reachTime;
	/** 增加的次数 */
	private int add;

	public CommonRankModel() {
		// TODO Auto-generated constructor stub
	}

	public CommonRankModel(long hid, String name, int parameter) {
		super();
		this.hid = hid;
		this.name = name;
		this.parameter = parameter;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
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

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	public int getAdd() {
		return add;
	}

	public void setAdd(int add) {
		this.add = add;
	}

	public int getParameter() {
		return parameter;
	}

	public void setParameter(int parameter) {
		this.parameter = parameter;
	}

//	@Override
//	public boolean equals(Object obj) {
//		if (this == obj)
//			return true;
//		if (obj == null)
//			return false;
//		CommonRankModel model = (CommonRankModel) obj;
//		if (this.hid != model.getHid()) {
//			return false;
//		}
//		return true;
//	}

	@Override
	public int compareTo(CommonRankModel arg1) {
		// TODO Auto-generated method stub
		if (hid == arg1.getHid()) {
			return 0;
		}
		// 次数
		if (parameter != arg1.getParameter()) {
			return parameter < arg1.getParameter() ? 1 : -1;
		}
		// 比较达到时间
		if (reachTime != arg1.getReachTime()) {
			return reachTime > arg1.getReachTime() ? 1 : -1;
		}
		if (hid != arg1.getHid()) {
			return hid < arg1.getHid() ? 1 : -1;
		}
		return 0;
	}
}
