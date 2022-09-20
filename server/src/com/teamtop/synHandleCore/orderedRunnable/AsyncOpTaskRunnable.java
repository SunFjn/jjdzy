package com.teamtop.synHandleCore.orderedRunnable;

import com.teamtop.synHandleCore.OpTaskRunnable;
import com.teamtop.util.log.LogTool;

/**
 * 异步处理用
 * 
 * @author jjjjyyy
 *
 */
public abstract class AsyncOpTaskRunnable implements OpTaskRunnable {

	@Override
	public void beforeExecute(Thread thread) {

	}

	@Override
	public void afterExecute() {

	}

	@Override
	public void onError(Throwable t, ErrorFrom ef) {
		LogTool.error(t, AsyncOpTaskRunnable.class, "");
	}

}
