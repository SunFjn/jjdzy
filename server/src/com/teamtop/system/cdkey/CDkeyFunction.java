package com.teamtop.system.cdkey;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCmd;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CDkeyFunction {
	private static CDkeyFunction ins = null;

	public static CDkeyFunction getIns() {
		if (ins == null) {
			ins = new CDkeyFunction();
		}
		return ins;
	}

	private CDkeyFunction() {
	}
	
	public void gmHandle(Hero hero, String[] param) {
		try {
			Channel channel = Client_1.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			NettyWrite.writeXData(channel, CrossConst.LOAD_CDKEY, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					NettyWrite.writeData(hero.getId(), new Object[] { "load CDkey success", 0 },
							HeroCmd.GC_NoticeMsg_164);
					LogTool.info("load CDkey success", CDkeyFunction.class);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CDkeyFunction.class, "CDkeyFunction gmHandle");
		}
	}

}
