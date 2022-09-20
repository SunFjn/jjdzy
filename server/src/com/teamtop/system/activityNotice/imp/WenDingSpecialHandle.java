package com.teamtop.system.activityNotice.imp;

import com.teamtop.system.activityNotice.ActivityNoticeSpecialHandleInf;
import com.teamtop.system.crossWenDingTianXia.CrossWenDingTianXiaFunction;

/**
 * 问鼎天下特殊处理
 * 
 * @author 13640
 *
 */
public class WenDingSpecialHandle implements ActivityNoticeSpecialHandleInf {

	@Override
	public boolean isOpen() {
		// TODO Auto-generated method stub
		return CrossWenDingTianXiaFunction.getIns().isOpen();
	}

}
