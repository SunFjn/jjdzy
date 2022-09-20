package com.teamtop.util.exector;

import java.util.Set;

import com.teamtop.system.event.systemEvent.ISystemEvent;

public class Fixtime {
	private int starttime;
	private int endtime;
	private Set<Integer> opWeekSet;
	private ISystemEvent event;
	private int cmd;
	private int fixType;//1是fixTime，2是fixtimeSyncPub
	
	public Fixtime(){}
	
	public Fixtime(int starttime, int endtime, Set<Integer> opWeekSet, ISystemEvent event, int cmd, int fixType) {
		super();
		this.starttime = starttime;
		this.endtime = endtime;
		this.opWeekSet = opWeekSet;
		this.event = event;
		this.cmd = cmd;
		this.fixType = fixType;
	}

	
	public int getFixType() {
		return fixType;
	}

	public int getStarttime() {
		return starttime;
	}
	public void setStarttime(int starttime) {
		this.starttime = starttime;
	}

	public int getEndtime() {
		return endtime;
	}

	public void setEndtime(int endtime) {
		this.endtime = endtime;
	}

	public Set<Integer> getOpWeekSet() {
		return opWeekSet;
	}

	public void setOpWeekSet(Set<Integer> opWeekSet) {
		this.opWeekSet = opWeekSet;
	}

	public ISystemEvent getEvent() {
		return event;
	}

	public void setEvent(ISystemEvent event) {
		this.event = event;
	}

	public int getCmd() {
		return cmd;
	}
	public void setCmd(int cmd) {
		this.cmd = cmd;
	}

	public void setFixType(int fixType) {
		this.fixType = fixType;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return event + " : " + cmd;
	}
	public static void main(String[] args) {
		String s = "1,a";
		System.out.println(s.split(",")[1]);
	}

}
