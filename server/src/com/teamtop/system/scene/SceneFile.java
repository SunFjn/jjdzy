package com.teamtop.system.scene;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;


public class SceneFile extends AbsServerEvent{

	@Override
	public void startServer() throws RunServerException {
		SceneCache.initBoardCast();
		SceneCache.readSceneFile();
		SceneCache.initSceneUnitId();
		SceneCache.initSceneControlType();
		//HangFBCache.setSceneUid();
	}

}
