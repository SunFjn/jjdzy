package com.teamtop.cross.callback;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.LinkedBlockingQueue;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.exector.schedule.ScheduleUtil;

public class BlockCallbackFunction {
	private static Logger logger = LoggerFactory.getLogger(BlockCallbackFunction.class);
	private static BlockingQueue<BlockData> pendings = new LinkedBlockingQueue<BlockData>(1024);
	private static ExecutorService executor = ScheduleUtil.makeThread("BlockCallbackFunction");
	static{
		executor.submit(new Runnable() {
			@Override
			public void run() {
				consumeNext();
			}
		});
	}
	public static void consumeNext() {
		executor.submit(new Runnable() {
			public void run() {
				doConsume();
			}
		});
	}
	public static void doConsume() {
		try {
			BlockData blockData = pendings.take();
			if (blockData == null) {
				return;
			}
			NettyWrite.writeXData(blockData.getChannel(), blockData.getCmd(), blockData.getCrossData());

		} catch (InterruptedException e) {
			logger.error("get message:", e);
		} finally {
			consumeNext(); // loop
		}
	}

	public static void addToPending(BlockData blockData) {
		if (blockData == null) {
			return;
		}
		while (!pendings.offer(blockData)) {
			if (logger.isInfoEnabled()) {
				logger.info("addToPending: offer message to cache failed, try remove early cached message.");
			}
			pendings.poll();
		}

	}
}
