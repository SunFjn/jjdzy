package com.teamtop.util.file.tail;

public abstract interface LogFileTailerListener {
	 public abstract void newLogFileLine(String line,LogFileTailer tailer);  
}
