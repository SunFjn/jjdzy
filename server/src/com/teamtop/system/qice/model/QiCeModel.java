package com.teamtop.system.qice.model;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class QiCeModel {
	/**
	 * 奇策id
	 */
	@FieldOrder(order=1)
	private int index;
	/**
	 * 奇策星级
	 */
	@FieldOrder(order=2)
	private int star;
	/**
	 * 奇策阶数
	 */
	@FieldOrder(order = 3)
	private int jieLv;
	/**
	 * 吞噬丹药
	 */
	@FieldOrder(order = 4)
	private HashMap<Integer, Integer> danyao;

	public HashMap<Integer, Integer> getDanyao() {
		return danyao;
	}

	public void setDanyao(HashMap<Integer, Integer> danyao) {
		this.danyao = danyao;
	}
	
	public QiCeModel() {
		super();
	}
	public int getIndex() {
		return index;
	}


	public QiCeModel(int index, int star, int jieLv, HashMap<Integer, Integer> danyao) {
		super();
		this.index = index;
		this.star = star;
		this.jieLv = jieLv;
		this.danyao = danyao;
	}

	public void setIndex(int index) {
		this.index = index;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}

	public int getJieLv() {
		return jieLv;
	}

	public void setJieLv(int jieLv) {
		this.jieLv = jieLv;
	}


	
	
	

}
