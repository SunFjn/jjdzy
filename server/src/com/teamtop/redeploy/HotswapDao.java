package com.teamtop.redeploy;

import com.teamtop.util.mybatis.DaoUtil;

public class HotswapDao {
	private static HotswapDao ins = null;

	public static HotswapDao getIns() {
		if (ins == null) {
			ins = new HotswapDao();
		}
		return ins;
	}

	public void insert(HotswapRec rec ,int zoneid) throws Exception {
		DaoUtil.insert(rec,HotswapMapper.class,zoneid);
	}
}
