package com.teamtop.system.activityNotice;

import java.util.Comparator;

import com.teamtop.system.activityNotice.model.ActivityNoticeItemModel;

public class ActivityNoticeStartTimeComparator implements Comparator<ActivityNoticeItemModel> {

	@Override
	public int compare(ActivityNoticeItemModel o1, ActivityNoticeItemModel o2) {
		// TODO Auto-generated method stub
		int startTime = o1.getStartTime();
		int startTime2 = o2.getStartTime();
		if (startTime != startTime2) {
			return startTime > startTime2 ? 1 : -1;
		}
		return 0;
	}

}
