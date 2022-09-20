package com.teamtop.system.activity.ativitys.godGenSendGiftAct;

import java.util.Comparator;

import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;

public class GodGenSendGiftActRankComparator implements Comparator<GodGenSendGiftActRankModel> {

	@Override
	public int compare(GodGenSendGiftActRankModel arg0, GodGenSendGiftActRankModel arg1) {
		// 抽奖次数
		if (arg0.getTotalTimes() < arg1.getTotalTimes()) {
			return 1;
		} else if (arg0.getTotalTimes() > arg1.getTotalTimes()) {
			return -1;
		} else {
			// 比较达到时间
			if (arg0.getReachTime() > arg1.getReachTime()) {
				return 1;
			} else if (arg0.getReachTime() < arg1.getReachTime()) {
				return -1;
			} else {
				return 0;
			}
		}
	}

}
