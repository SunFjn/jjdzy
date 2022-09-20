package com.teamtop.cross.battleVideo.upload.event;

import io.netty.handler.codec.http.HttpHeaders;

import java.io.File;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.util.common.CommonUtil;

/**
 * 天下第一战报上传事件
 * @author lobbyer
 * @date 2016年7月9日
 */
public class PrimaryVideoUploadEvent extends AbsUploadEvent {
	private static PrimaryVideoUploadEvent ins = null;

	public static PrimaryVideoUploadEvent getIns() {
		if (ins == null) {
			ins = new PrimaryVideoUploadEvent();
		}
		return ins;
	}

	@Override
	public File getFile(HttpHeaders headers) {
		int term = CommonUtil.transforObjtoInt(headers.get("term"));
		int bang = CommonUtil.transforObjtoInt(headers.get("bang"));
		int round = CommonUtil.transforObjtoInt(headers.get("round"));
		int ju = CommonUtil.transforObjtoInt(headers.get("ju"));
		long attId = CommonUtil.transforObjtoLong(headers.get("attId"));

		String sep = GamePath.SEP;
		File dir = new File(GamePath.USER_DIR + sep + "primaryVideo" + sep
				+ term + sep + bang + sep + round + sep + ju);
		if (!dir.exists())
			dir.mkdirs();
		File tempFile = new File(dir, ""+attId);
		return tempFile;
	}
}
