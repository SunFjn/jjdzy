package com.teamtop.system.taoyuanSworn;

import java.util.Comparator;

import com.teamtop.system.taoyuanSworn.model.SortTemplate;

/**
 * 申请成员排序比较器
 */
public class ApplyMemberComparator implements Comparator<SortTemplate> {

	@Override
	public int compare(SortTemplate o1, SortTemplate o2) {
		if(o1.getTime() > o2.getTime()){//比较申请时间
			return 1;
		}else if(o1.getTime() < o2.getTime()){
			return -1;
		}else {
			return 0;
		}
	}

}
