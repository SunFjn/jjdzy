package com.teamtop.util.ui;

import java.awt.Color;

import com.teamtop.gameCommon.ServerProperties;


public class ShowMsgFunction {
	public static void sendMsg(String msg) {
		if(!ServerProperties.showUI) return;
		MainFrame.getInstance().updateInfo(" " + msg + "\n",Color.BLACK);
	}
	public static void sendBlueMsg(String msg) {
		if(!ServerProperties.showUI) return;
		MainFrame.getInstance().updateInfo(" " + msg + "\n",Color.BLUE);
	}
	
	public static void sendErrMsg(String msg) {
		if(!ServerProperties.showUI) return;
		MainFrame.getInstance().updateErrInfo(" " + msg + "\n");
		sendInfoMsg("");
	}
	
	public static void sendInfoMsg(String msg) {
		if(!ServerProperties.showUI) return;
		MainFrame.getInstance().updateInfoLabel(msg);
	}

}
