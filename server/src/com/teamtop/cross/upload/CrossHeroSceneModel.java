package com.teamtop.cross.upload;

import java.util.Map;

import com.teamtop.system.scene.Scene;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 可行走的玩家数据
 * @author Administrator
 *
 */
public class CrossHeroSceneModel extends CrossHeroBaseModel{
	@FieldOrder(order = 1)
	private Scene scene;
	/**
	 * 称号，key为称号id，value为添加称号的时间
	 */
	@FieldOrder(order = 3)
	private Map<Integer,Integer> titleInfo;
	
	public Map<Integer, Integer> getTitleInfo() {
		return titleInfo;
	}
	public void setTitleInfo(Map<Integer, Integer> titleInfo) {
		this.titleInfo = titleInfo;
	}
	public Scene getScene() {
		return scene;
	}
	public void setScene(Scene scene) {
		this.scene = scene;
	}
	
}
