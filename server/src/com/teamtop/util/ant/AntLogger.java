package com.teamtop.util.ant;

import java.io.PrintStream;

import org.apache.tools.ant.BuildEvent;
import org.apache.tools.ant.BuildLogger;

public class AntLogger implements BuildLogger {
	public void buildStarted(BuildEvent event) {
		// TODO Auto-generated method stub
		ShowMsgFunction.sendMsg("准备编译代码...");
	}

	public void buildFinished(BuildEvent event) {
		ShowMsgFunction.sendMsg("编译完成");
		ShowMsgFunction.sendInfoMsg("");

	}

	public void targetStarted(BuildEvent event) {
		ShowMsgFunction.sendMsg("正在编译代码...");

	}

	public void targetFinished(BuildEvent event) {
		ShowMsgFunction.sendMsg("正在结束编译...");

	}

	public void taskStarted(BuildEvent event) {
		// TODO Auto-generated method stub

	}

	public void taskFinished(BuildEvent event) {
		// TODO Auto-generated method stub

	}

	public void messageLogged(BuildEvent event) {
		Throwable e = event.getException();
		if(e != null) {
			ShowMsgFunction.sendErrMsg(e.getMessage());
		}
		String msg = event.getMessage();
		msg = msg.substring(msg.lastIndexOf(" "));
		int len = msg.length();
		if(len > 50) {
			msg = "..." + msg.substring(len - 50, len);
		}
		ShowMsgFunction.sendInfoMsg("正在编译：" + msg);

	}

	public void setMessageOutputLevel(int level) {

	}

	public void setOutputPrintStream(PrintStream output) {
		// TODO Auto-generated method stub

	}

	public void setEmacsMode(boolean emacsMode) {
		// TODO Auto-generated method stub

	}

	public void setErrorPrintStream(PrintStream err) {
		// TODO Auto-generated method stub

	}

}
