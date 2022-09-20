package com.teamtop.synHandleCore;

import java.util.concurrent.BlockingQueue;

public interface IBlockingQueueCreator {
	BlockingQueue<OpTaskRunnable> newQueue();
}
