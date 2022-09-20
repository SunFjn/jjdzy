package com.teamtop.util.ant;


public class ShowMsgFunction {
	public static void sendMsg(String msg) {
//		mainFrame = MainFrame.getInstance();
//		mainFrame.updateInfo(" " + msg + "\n");
		System.err.println(msg);
	}
	
	public static void sendErrMsg(String msg) {
//		mainFrame = MainFrame.getInstance();
//		mainFrame.updateErrInfo(" " + msg + "\n");
//		sendInfoMsg("");
		System.err.println(msg);
	}
	
	public static void sendInfoMsg(String msg) {
//		mainFrame = MainFrame.getInstance();
//		mainFrame.updateInfoLabel(msg);
		System.err.println(msg);
	}

}
