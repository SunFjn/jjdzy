package com.teamtop.main;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;

/**
 * 启动服务器的异常
 * @author kyle
 *
 */
public class RunServerException extends Exception {
	private static final long serialVersionUID = 1L;
	private Logger logger = LoggerFactory.getLogger(RunServerException.class);
	public RunServerException(Exception e,String message) {
		logger.error("RunServerException:"+message);
		if(e!=null){
			e.printStackTrace();
			LogTool.error(e,this,message);
		}
		System.exit(0);
	}
}
