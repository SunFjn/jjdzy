package com.teamtop.system.scene;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;


/**
 * 副本类
 * @name：CopyScene
 * @description：
 * @author：Kyle
 * @date：2012-8-6 上午07:13:47
 * @moidfy：
 * @version 1.0.0
 *
 */
public class CopyScene {
	//对象 npc,怪,采集物品
	private ArrayList<CopySceneItem> items=new ArrayList<CopySceneItem>();
	private Map<Integer,List<CopySceneItem>> waveItems = new TreeMap<Integer,List<CopySceneItem>>();
	
	private int sysId=0; //地图id 
	/**
	 * 加入普通的副本item
	 * @param sceneItem
	 */
	public void addToItems(CopySceneItem sceneItem){
		items.add(sceneItem);
	}
	/**
	 * 加入多波的攻击怪物缓存
	 * @param sceneItem
	 */
	public void addToWaveItems(CopySceneItem sceneItem){
		int wave = sceneItem.getWave();
		if(wave==-1) return;
		List<CopySceneItem> list = waveItems.get(wave);
		if(list==null){
			list = new ArrayList<CopySceneItem>();
			waveItems.put(wave, list);
		}
		list.add(sceneItem);
	}
	public Map<Integer, List<CopySceneItem>> getWaveItems() {
		return waveItems;
	}

	public ArrayList<CopySceneItem> getItems() {
		return items;
	}
	public void setItems(ArrayList<CopySceneItem> items) {
		this.items = items;
	}
	public int getSysId() {
		return sysId;
	}
	public void setSysId(int sysId) {
		this.sysId = sysId;
	}
}
