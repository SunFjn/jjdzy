package com.teamtop.houtaiHttp.events.loginNotice;

public class LoginNoticeIO {

	private static LoginNoticeIO ins;

	private LoginNoticeIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized LoginNoticeIO getIns() {
		if (ins == null) {
			ins = new LoginNoticeIO();
		}
		return ins;
	}

}
