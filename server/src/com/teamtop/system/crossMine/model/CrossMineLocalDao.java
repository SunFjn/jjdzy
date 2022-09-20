package com.teamtop.system.crossMine.model;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.crossMine.CrossMineLocalMapper;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossMineLocalDao {

	private static CrossMineLocalDao ins;

	public static CrossMineLocalDao getIns() {
		if (ins == null) {
			ins = new CrossMineLocalDao();
		}
		return ins;
	}

	public void updataCrossMine(long hid) throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossMineLocalMapper mapper = session.getMapper(CrossMineLocalMapper.class);
			mapper.updataCrossMine(hid);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
