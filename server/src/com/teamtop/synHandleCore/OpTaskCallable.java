package com.teamtop.synHandleCore;

import java.util.concurrent.Callable;

public interface OpTaskCallable<V> extends Callable<V>, ExecutorLifeCycle {
	Object getSession();
}
