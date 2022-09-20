package com.teamtop.cross.callback;
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;

public class ResponseFuture<V> extends FutureTask<V> {

	public ResponseFuture() {
		super(new Callable<V>() {
			public V call() throws Exception {
				return null;
			}
		});
	}

	public void set(V v) {
		super.set(v);
	}

}
