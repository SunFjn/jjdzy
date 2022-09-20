package com.teamtop.system.rankNew.rankModel;

public class HuoShaoChiBiRankModel extends BaseRankModel {

	private int floorNum;

	// 策划要求 按照通关时间排行
	private int attTime;

	public int getAttTime() {
		return attTime;
	}

	public void setAttTime(int attTime) {
		this.attTime = attTime;
	}

	public int getFloorNum() {
		return floorNum;
	}

	public void setFloorNum(int floorNum) {
		this.floorNum = floorNum;
	}

	@Override
	public int compareTo(BaseRankModel o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (((HuoShaoChiBiRankModel) o).getFloorNum() > this.getFloorNum()) {
			return 1;
		} else if (((HuoShaoChiBiRankModel) o).getFloorNum() < this.getFloorNum()) {
			return -1;
		} else {
			if(((HuoShaoChiBiRankModel) o).getAttTime() < this.getAttTime()) {
				return 1;
			} else if (((HuoShaoChiBiRankModel) o).getAttTime() < this.getAttTime()) {
				return -1;
			}
			if (o.getLevel() < this.getLevel()) {
				return 1;
			} else if (o.getLevel() > this.getLevel()) {
				return -1;
			} else {
				if (o.getTotalStrength() < this.getTotalStrength()) {
					return 1;
				} else if (o.getTotalStrength() > this.getTotalStrength()) {
					return -1;
				} else {
					if (o.getHid() < getHid()) {
						return 1;
					} else if (o.getHid() > getHid()) {
						return -1;
					}
					return 0;
				}
			}
		}
	}


}
