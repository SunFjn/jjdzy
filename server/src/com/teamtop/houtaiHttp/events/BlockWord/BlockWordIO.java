package com.teamtop.houtaiHttp.events.BlockWord;

import java.util.Iterator;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.houtaiHttp.HoutaiConst;
import com.teamtop.houtaiHttp.HoutaiResponseUtil;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
import io.netty.channel.ChannelHandlerContext;

public class BlockWordIO {

	private static BlockWordIO ins;

	private BlockWordIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BlockWordIO getIns() {
		if (ins == null) {
			ins = new BlockWordIO();
		}
		return ins;
	}

	/**
	 * 更新屏蔽词
	 * @param wordStr
	 */
	public void updateBlockWord(String wordStr, ChannelHandlerContext ctx) {
		try {
			Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
			CrossData data = new CrossData();
			data.putObject(BlockWordEnum.blockWard.name(), wordStr);
			Channel channel = null;
			for (; iterator.hasNext();) {
				channel = iterator.next();
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.BLOCK_WORD, data);
				}
			}
			HoutaiResponseUtil.responseSucc(ctx);
		} catch (Exception e) {
			LogTool.error(e, BlockWordIO.class, "BlockWordIO updateBlockWord");
			HoutaiResponseUtil.responseFail(HoutaiConst.SendBack_Code_500, ctx);
		}
	}

	/**
	 * 子服接收通知更新屏蔽字库
	 * @param channel
	 * @param crossData
	 */
	public void updateBlockWordHandle(Channel channel, CrossData crossData) {
		int cmd = CrossConst.BLOCK_WORD;
		try {
			String blockWord = crossData.getObject(BlockWordEnum.blockWard.name(), String.class);
			IlliegalUtil.split = blockWord.split("、");
		} catch (Exception e) {
			LogTool.error(e, BlockWordIO.class, "BlockWordIO updateBlockWordHandle");
		}
	}

}
