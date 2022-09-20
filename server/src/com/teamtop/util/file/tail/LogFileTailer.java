package com.teamtop.util.file.tail;

import java.io.File;
import java.io.IOException;
import java.io.RandomAccessFile;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class LogFileTailer extends Thread {  
    private String inputCharset = "ISO8859_1";
    private String outputCharset = "utf-8";
    private long sampleInterval = 1000;  
 
    private File logfile;  
 
    private boolean startAtBeginning = false;  
 
    private boolean tailing = false;  
 
    @SuppressWarnings("rawtypes")
	private Set listeners = new HashSet();  
 
    public LogFileTailer(File file) {  
        this.logfile = file;  
    }  
    
    public void setInputCharset(String inputCharset) {
		this.inputCharset = inputCharset;
	}

	public void setOutputCharset(String outputCharset) {
		this.outputCharset = outputCharset;
	}

	public LogFileTailer(File file, long sampleInterval,  
            boolean startAtBeginning) {  
        this.logfile = file;  
        this.sampleInterval = sampleInterval;  
        this.startAtBeginning = startAtBeginning;  
    }  
 
    @SuppressWarnings("unchecked")
	public void addLogFileTailerListener(LogFileTailerListener l) {  
        this.listeners.add(l);  
    }  
 
    public void removeLogFileTailerListener(LogFileTailerListener l) {  
        this.listeners.remove(l);  
    }  
 
    @SuppressWarnings("rawtypes")
	protected void fireNewLogFileLine(String line) {  
        for (Iterator i = this.listeners.iterator(); i.hasNext();) {  
            LogFileTailerListener l = (LogFileTailerListener) i.next();  
            l.newLogFileLine(line,this);  
        }  
    }  
 
    public void stopTailing() {  
        this.tailing = false;  
    }  
 
    public void run() {  
        long filePointer = 0;  
 
        if (this.startAtBeginning) {  
            filePointer = 0;  
        } else {  
            filePointer = this.logfile.length();  
        }  
 
        try {  
            RandomAccessFile file = new RandomAccessFile(logfile, "r");  
            while (this.tailing) {
                long fileLength = this.logfile.length();  
                if (fileLength < filePointer) {  
                    file = new RandomAccessFile(logfile, "r");  
                    filePointer = 0;  
                }  
                if (fileLength > filePointer) {  
                    file.seek(filePointer);  
                    String line = file.readLine();  
                    while (line != null) {  
                    	line = new String(line.getBytes(inputCharset), outputCharset);
                        this.fireNewLogFileLine(line); 
                        line = file.readLine();  
                    }  
                    filePointer = file.getFilePointer();  
                }  
                sleep(this.sampleInterval);  
            }  
            file.close();  
        } catch (IOException e) {  
              
        } catch (InterruptedException e) {  
             
        }  
    }  
 
    public void setTailing(boolean tailing) {  
        this.tailing = tailing;  
    }  
 
} 
