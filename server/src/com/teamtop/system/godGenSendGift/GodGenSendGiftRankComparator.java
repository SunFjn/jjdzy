package com.teamtop.system.godGenSendGift;

import java.util.Comparator;

import com.teamtop.system.godGenSendGift.model.GodGenSendGiftRankModel;

public class GodGenSendGiftRankComparator implements Comparator<GodGenSendGiftRankModel> {

	@Override
	public int compare(GodGenSendGiftRankModel arg0, GodGenSendGiftRankModel arg1) {
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
