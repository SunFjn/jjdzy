package com.teamtop.cross.protocol;

import com.teamtop.util.communication.io.protocol.ProtocolAssist;

/**
 * InSceneReq.java
 * 进入场景
 */
public class InSceneReq implements ProtocolAssist{

	@Override
	public String[] sortFieldsName() {
		return new String[]{ "sceneId" };
	}


	/**
 	 * 地图ID 	
 	 */
	
	private int sceneId;

	

	public int getSceneId() {
	    return sceneId;
	}

	public void setSceneId(int sceneId) {
	    this.sceneId = sceneId;
	}
}