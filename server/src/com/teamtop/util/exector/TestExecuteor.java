package com.teamtop.util.exector;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

public class TestExecuteor {
	public static void main(String[] args) throws Exception {
		t1();
	}
	public static void t1() throws InterruptedException{
		ScheduledExecutorService es = Executors.newScheduledThreadPool(Runtime.getRuntime().availableProcessors(), new MyThreadFactory());
		ScheduledFuture<?> sf1 = es.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				System.err.println("hehe");
				try {
					Thread.sleep(3000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		}, 0, 2000, TimeUnit.MILLISECONDS);
		
		Thread.sleep(3000);
		ScheduledFuture<?> sf2 = es.scheduleAtFixedRate(new Runnable() {
			@Override
			public void run() {
				System.err.println("hehe2");
			}
		}, 0, 2000, TimeUnit.MILLISECONDS);
		
		sf1.cancel(true);
		Thread.sleep(5000);
		System.err.println(sf2.isDone());
		sf2.cancel(true);
		System.err.println(sf2.isDone());
		
//		es.shutdown();
	}
}

class MyThreadFactory implements ThreadFactory{
    private final ThreadGroup group;
    private final AtomicInteger threadNumber = new AtomicInteger(1);
    private final String namePrefix;

    MyThreadFactory() {
        SecurityManager s = System.getSecurityManager();
        group = (s != null) ? s.getThreadGroup() :
                              Thread.currentThread().getThreadGroup();
        namePrefix = "game thread-";
    }

    public Thread newThread(Runnable r) {
        Thread t = new Thread(group, r,
                              namePrefix + threadNumber.getAndIncrement(),
                              0);
        if (t.isDaemon())
            t.setDaemon(false);
        if (t.getPriority() != Thread.NORM_PRIORITY)
            t.setPriority(Thread.NORM_PRIORITY);
        return t;
    }
}