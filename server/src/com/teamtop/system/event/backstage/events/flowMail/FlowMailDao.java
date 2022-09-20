package com.teamtop.system.event.backstage.events.flowMail;

import java.sql.SQLException;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class FlowMailDao {
private static FlowMailDao ins = null;
	
	public static FlowMailDao getIns() {
		if (ins == null) {
			ins = new FlowMailDao();
		}
		return ins;
	}

	public void updateFlowMailFujianState(B_FlowMail fm) throws SQLException{
		int zoneid = CommonUtil.getZoneIdById(fm.getId());
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			FlowMailMapper mapper = session.getMapper(FlowMailMapper.class);
			mapper.updateFlowMailFujianState(fm);
			session.commit();
		}finally{
			session.close();
		}
	}
	public void updateFlowMailState(B_FlowMail fm) throws SQLException{
		int zoneid = CommonUtil.getZoneIdById(fm.getId());
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			FlowMailMapper mapper = session.getMapper(FlowMailMapper.class);
			mapper.updateFlowMailState(fm);
			session.commit();
		}finally{
			session.close();
		}
	}
}
