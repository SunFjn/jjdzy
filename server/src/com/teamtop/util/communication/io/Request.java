package com.teamtop.util.communication.io;

import java.io.ByteArrayInputStream;
import java.io.DataInputStream;
import java.io.IOException;

/**
 * 请求对象封装
 * @author syp
 *
 */
public class Request{
	
	private ByteArrayInputStream bis = null;
	
	private DataInputStream input = null;

	public Request(byte[] bytes){
		bis = new ByteArrayInputStream(bytes);
		input = new DataInputStream(bis);
	}
	
	public DataInputStream getInputStream(){
		return input;
	}
	
	public void releaseResources(){
		if(bis != null){
			try {
				bis.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		if(input != null){
			try {
				input.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
