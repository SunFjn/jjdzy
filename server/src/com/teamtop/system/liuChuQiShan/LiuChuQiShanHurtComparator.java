package com.teamtop.system.liuChuQiShan;

import java.util.Comparator;

import com.teamtop.system.liuChuQiShan.model.LiuChuQiShanRankModel;

public class LiuChuQiShanHurtComparator implements Comparator<LiuChuQiShanRankModel> {
	private static LiuChuQiShanHurtComparator ins = null;

	public static LiuChuQiShanHurtComparator getIns() {
		if (ins == null) {
			ins = new LiuChuQiShanHurtComparator();
		}
		return ins;
	}

	@Override
	public int compare(LiuChuQiShanRankModel o1, LiuChuQiShanRankModel o2) {
		if(o1.getHurt()<o2.getHurt()){
			return 1;
		}else if(o1.getHurt()>o2.getHurt()){
			return -1;
		}else{
			if(o1.getHid()<o2.getHid()){
				return 1;
			}else if(o1.getHid()>o2.getHid()){
				return -1;
			}
		}
		return 0;
	}

}
