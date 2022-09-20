package com.teamtop.system.robot;

import java.util.concurrent.atomic.AtomicLong;

public class RobotUidCreator {

	private static AtomicLong maxUid = new AtomicLong(1);

	public static long getUid() {
		return maxUid.getAndIncrement();
	}

}
