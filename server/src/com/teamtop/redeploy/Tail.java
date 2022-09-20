package com.teamtop.redeploy;

import com.teamtop.redeploy.cross.RedeployServerToClient;
import com.teamtop.util.file.tail.LogFileTailer;
import com.teamtop.util.file.tail.LogFileTailerListener;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
/**
 * tail的方式显示服务器启动信息
 * @author Administrator
 *
 */
public class Tail implements LogFileTailerListener {
	private Channel channel;
	@Override
	public void newLogFileLine(String line,LogFileTailer tailer) {
		if(line.indexOf(LogTool.getRunCompleteFlagStr())>-1){
			tailer.setTailing(false);
			RedeployCache.removeTailer(tailer);
		}
		if(line.indexOf("Exception")>-1 ||line.indexOf(".java")>-1){
			RedeployServerToClient.sendError(channel, line);
		}else{
			RedeployServerToClient.sendInfo(channel, line);
		}
	}
	
	public Tail(Channel channel) {
		super();
		this.channel = channel;
	}
}
