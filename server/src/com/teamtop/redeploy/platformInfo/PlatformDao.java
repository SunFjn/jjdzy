package com.teamtop.redeploy.platformInfo;

import java.util.List;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.mybatis.MybatisUtil;

public class PlatformDao {

	private static PlatformDao dao;

	private PlatformDao() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PlatformDao getDao() {
		if (dao == null) {
			dao = new PlatformDao();
		}
		return dao;
	}

	public List<PlatformInfo> findAllPlatform() throws Exception {
		SqlSession session = MybatisUtil.getSession(GameProperties.getFirstZoneId());
		if (session == null) {
			return null;
		}
		List<PlatformInfo> list = null;
		try {
			PlatformMapper mapper = session.getMapper(PlatformMapper.class);
			list = mapper.findPlatformInfo();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return list;
	}

}
