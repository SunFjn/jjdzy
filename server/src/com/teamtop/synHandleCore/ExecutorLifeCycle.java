package com.teamtop.synHandleCore;

public interface ExecutorLifeCycle {
	void beforeExecute(Thread thread);

	void afterExecute();

	void onError(Throwable t, ErrorFrom ef);

	public static enum ErrorFrom {
		beforeExecute, afterExecute, run;
	}
}
