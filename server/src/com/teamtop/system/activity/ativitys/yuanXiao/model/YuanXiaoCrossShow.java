package com.teamtop.system.activity.ativitys.yuanXiao.model;

import com.teamtop.system.hero.ShowModel;

public class YuanXiaoCrossShow {
	//[L:玩家idU:玩家名字L:玩家战力I:武器模型I:人物模型（job）I:坐骑
	private long  hid;
	
	private String name;
	
	private long strength;
	
	private ShowModel model;
	
	private int num;
	
	private int isbot;

	public YuanXiaoCrossShow() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public ShowModel getModel() {
		return model;
	}

	public void setModel(ShowModel model) {
		this.model = model;
	}

	public int getNum() {
		return num;
	}

	public void setNum(int num) {
		this.num = num;
	}

	public int getIsbot() {
		return isbot;
	}

	public void setIsbot(int isbot) {
		this.isbot = isbot;
	}

}
