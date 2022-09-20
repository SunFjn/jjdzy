package com.teamtop.util.exector;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;

public class ExectorUtil {
	private static Logger logger = LoggerFactory.getLogger(ExectorUtil.class);
	/**
	 * 关闭线程
	 * 
	 * @param pool
	 */
	public static void shutdownAndAwaitTermination(ExecutorService pool,String name) {
		if (pool == null)
			return;
		pool.shutdown(); // Disable new tasks from being submitted
		try {
			// Wait a while for existing tasks to terminate
			if (!pool.awaitTermination(10, TimeUnit.SECONDS)) {
				pool.shutdownNow(); // Cancel currently executing tasks
				// Wait a while for tasks to respond to being cancelled
				if (!pool.awaitTermination(10, TimeUnit.SECONDS))
					logger.info("Pool did not terminate");
			}
			logger.info("pool "+name+" close complete");
		} catch (InterruptedException ie) {
			logger.error(LogTool.exception(ie));
			// (Re-)Cancel if current thread also interrupted
			pool.shutdownNow();
			// Preserve interrupt status
			Thread.currentThread().interrupt();
		}
	}
}
