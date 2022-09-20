package com.teamtop.houtaiHttp.events.BlockWord;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.illiegalUtil.IlliegalUtil;

public class BlockWordCache extends AbsServerEvent {

	public static String blockWord = "";

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.BLOCK_WORD);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			String readData = FileUtils.readData(GamePath.USER_DIR+GamePath.SEP+"bin/com/teamtop/util/illiegalUtil/keys.txt");
			IlliegalUtil.split = readData.split("、");
		} else {
			blockWord = content;
			IlliegalUtil.split = blockWord.split("、");
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.BLOCK_WORD);
		globalData.setContent(blockWord);
		GlobalCache.doSync(globalData);
	}

}
