package com.teamtop.cross.battleVideo.upload.event;

import io.netty.handler.codec.http.HttpHeaders;

import java.io.File;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.util.common.CommonUtil;
/**
 * 战报上传事件
 */
public class BattleVideoUploadEvent extends AbsUploadEvent {
	private static BattleVideoUploadEvent ins = null;

	public static BattleVideoUploadEvent getIns() {
		if (ins == null) {
			ins = new BattleVideoUploadEvent();
		}
		return ins;
	}

//	private Logger logger = LoggerFactory.getLogger(BattleVideoUploadEvent.class);
	@Override
	public File getFile(HttpHeaders headers) {
		int zoneid = CommonUtil.transforObjtoInt(headers.get("zoneid"));
		int battleType = CommonUtil.transforObjtoInt(headers.get("battleType"));
		int bid = CommonUtil.transforObjtoInt(headers.get("bid"));
		int rectime = CommonUtil.transforObjtoInt(headers.get("rectime"));

		String sep = GamePath.SEP;
		File dir = new File(GamePath.USER_DIR + sep + "battleVideo" + sep
				+ "zoneid" + sep + zoneid + sep + "battleType" + sep
				+ battleType);
		if (!dir.exists())
			dir.mkdirs();
		File tempFile = new File(dir, bid + "_" + rectime);
		return tempFile;
	}

}
