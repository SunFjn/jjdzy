package com.teamtop.system.archive.model;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 图鉴信息
 * 
 * @author hzp
 *
 */
public class ArchiveModel {

	/**
	 * 图鉴id
	 */
	@FieldOrder(order = 1)
	private int id;

	/**
	 * 等级索引
	 */
	@FieldOrder(order = 2)
	private int levelIndex;

	/**
	 * 星级索引
	 */
	@FieldOrder(order = 3)
	private int starLevelIndex;

	public ArchiveModel() {
		// TODO Auto-generated constructor stub
	}

	public ArchiveModel(int id, int levelIndex, int starLevelIndex) {
		super();
		this.id = id;
		this.levelIndex = levelIndex;
		this.starLevelIndex = starLevelIndex;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLevelIndex() {
		return levelIndex;
	}

	public void setLevelIndex(int levelIndex) {
		this.levelIndex = levelIndex;
	}

	public int getStarLevelIndex() {
		return starLevelIndex;
	}

	public void setStarLevelIndex(int starLevelIndex) {
		this.starLevelIndex = starLevelIndex;
	}

}
