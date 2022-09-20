package com.teamtop.util.file.tail;

import java.io.File;

import com.teamtop.redeploy.RedeployCache;
import com.teamtop.util.log.LogTool;

public class Tail implements LogFileTailerListener {
	@Override
	public void newLogFileLine(String line,LogFileTailer tailer) {
		if(line.indexOf(LogTool.getRunCompleteFlagStr())>-1){
			tailer.setTailing(false);
			RedeployCache.removeTailer(tailer);
		}
		System.out.println("newLogFileLine:"+line);
	}

	public static void main(String[] args) throws Exception {
		Tail tail = new Tail();
		LogFileTailer tailer = new LogFileTailer(new File("C:/ssyl/console.log"), 1000, true);
		tailer.setTailing(true);
		tailer.addLogFileTailerListener(tail);
		tailer.start();
	}
}
