package com.teamtop.system.rankNew.rankModel;

public class PeacockRankModel extends BaseRankModel {

	private int floorNum;

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
		if (((PeacockRankModel) o).getFloorNum() > this.getFloorNum()) {
			return 1;
		} else if (((PeacockRankModel) o).getFloorNum() < this.getFloorNum()) {
			return -1;
		} else {
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
