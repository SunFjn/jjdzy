package com.teamtop.system.rankNew.rankModel;

public class LevelRankModel extends BaseRankModel {

	@Override
	public int compareTo(BaseRankModel o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		// 轮回等级比较
		if(o.getReincarnationLevel() > this.getReincarnationLevel()) {
			return 1;
		}else if(o.getReincarnationLevel() < this.getReincarnationLevel()) {
			return -1;
		}
		if (o.getLevel() > this.getLevel()) {
			return 1;
		} else if (o.getLevel() < this.getLevel()) {
			return -1;
		} else {
			if (o.getTotalStrength() > this.getTotalStrength()) {
				return 1;
			} else if (o.getTotalStrength() < this.getTotalStrength()) {
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
