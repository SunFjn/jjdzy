package com.teamtop.netty.firewall.skyeye;

import java.util.ArrayList;
import java.util.List;

/**
 * 收到的协议
 * @author Administrator
 *
 */
public class SkyEyeRec {
	private int cmd;
	private List<Long> time = new ArrayList<Long>();
	private int fixtimes;
	private int counts;//记录到第几次，根据这个数据和fixtimes判断是否清空玩家违规记录
	
	public int getCounts() {
		return counts;
	}
	public void setCounts(int counts) {
		this.counts = counts;
	}
	public int getCmd() {
		return cmd;
	}
	public void setCmd(int cmd) {
		this.cmd = cmd;
	}
	public List<Long> getTime() {
		return time;
	}
	public void setTime(List<Long> time) {
		this.time = time;
	}
	public int getFixtimes() {
		return fixtimes;
	}
	public void setFixtimes(int fixtimes) {
		this.fixtimes = fixtimes;
	}
	
}
