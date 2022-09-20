package com.teamtop.system.weiXinShare.model;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.weiXinShare.WeiXinShareMapper;
import com.teamtop.util.mybatis.DaoUtil;

public class WeiXinShareDao {

	private static WeiXinShareDao ins;

	public static WeiXinShareDao getIns() {
		if (ins == null) {
			ins = new WeiXinShareDao();
		}
		return ins;
	}

	/**
	 * 更新
	 * @param e
	 * @param zoneid
	 * @throws Exception
	 */
	public void update(WeiXinShare e) throws Exception {
		DaoUtil.update(e,WeiXinShare.class, WeiXinShareMapper.class, GameProperties.getFirstZoneId());
	}

}
