package com.teamtop.system.activityNotice;

import java.util.Comparator;

import com.teamtop.system.activityNotice.model.ActivityNoticeItemModel;

import excel.config.Config_hdyg_229;
import excel.struct.Struct_hdyg_229;

public class ActivityNoticePriorityComparator implements Comparator<ActivityNoticeItemModel> {

	@Override
	public int compare(ActivityNoticeItemModel o1, ActivityNoticeItemModel o2) {
		// TODO Auto-generated method stub
		Struct_hdyg_229 struct_hdyg_229 = Config_hdyg_229.getIns().get(o1.getId());
		int yx = struct_hdyg_229.getYx();
		Struct_hdyg_229 struct_hdyg_2291 = Config_hdyg_229.getIns().get(o2.getId());
		int yx1 = struct_hdyg_2291.getYx();
		if (yx != yx1) {
			return yx < yx1 ? 1 : -1;
		}
		return 0;
	}

}
