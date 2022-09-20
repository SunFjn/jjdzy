package com.teamtop.synHandleCore;

public interface OpTaskRunnable extends Runnable, ExecutorLifeCycle {
	Object getSession();
}
