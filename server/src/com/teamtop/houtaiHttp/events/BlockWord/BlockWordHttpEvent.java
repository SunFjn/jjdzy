package com.teamtop.houtaiHttp.events.BlockWord;

import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.ChannelHandlerContext;

public class BlockWordHttpEvent extends AbsHouTaiHttpEvent {

	private static BlockWordHttpEvent ins;

	private BlockWordHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BlockWordHttpEvent getIns() {
		if (ins == null) {
			ins = new BlockWordHttpEvent();
		}
		return ins;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String wordStr = paramMap.get("wordStr");
			if (CommonUtil.isNull(wordStr)) {
				HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_5005, ctx);
				return;
			}
			BlockWordIO.getIns().updateBlockWord(wordStr, ctx);
		} catch (Exception e) {
			LogTool.error(e, BlockWordHttpEvent.class, "BlockWordHttpEvent fail");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

}
