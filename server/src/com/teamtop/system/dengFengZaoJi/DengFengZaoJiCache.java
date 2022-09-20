package com.teamtop.system.dengFengZaoJi;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class DengFengZaoJiCache extends AbsServerEvent {
	/**海选：true.开启 false.结束*/
	public static boolean isStart_haixuan = false;
	/**决赛：true.开启 false.结束*/
	public static boolean isStart_juesai = false;
	
	@Override
	public void startServer() throws RunServerException {
	}
}
