package com.teamtop.system.event.backstage.events.backstage.serverInfoList;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.util.mybatis.DataBaseProp;
import com.teamtop.util.mybatis.MybatisUtil;

public class ServerInfoDao {

	private static ServerInfoDao ins;

	private ServerInfoDao() {
	}

	public static synchronized ServerInfoDao getIns() {
		if (ins == null) {
			ins = new ServerInfoDao();
		}
		return ins;
	}

	public void insert(M_ServerInfo info) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			mapper.insertData(info);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	public void update(M_ServerInfo info) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			mapper.updateData(info);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	public void deleteAllTables() throws Exception {
		SqlSession session = MybatisUtil.getSession(GameProperties.getFirstZoneId());
		if (session == null) {
			return;
		}
		DataBaseProp dataBaseProp = MybatisUtil.getDataBasePropMap().get(GameProperties.getFirstZoneId());
		String dbName = dataBaseProp.getDbname();
		StringBuilder sb = new StringBuilder();
		sb.append("SELECT concat('DROP TABLE IF EXISTS ', table_name, ';') FROM information_schema.tables WHERE table_schema = '");
		sb.append(dbName);
		sb.append("';");
		try {
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			List<String> allDrop = mapper.selectAllDrop(sb.toString());
			for (String drop : allDrop) {
				mapper.deleteAllTables(drop);
				session.commit();
			}
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 查找所有服务器信息
	 * 
	 * @throws Exception
	 */
	public List<M_ServerInfo> findAll() throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		List<M_ServerInfo> serverList = null;
		try {
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			serverList = mapper.findAll();
		} finally {
			MybatisUtil.closeSession(session);
		}
		return serverList;
	}

	/**
	 * 查找部分服务器信息
	 */
	public List<M_ServerInfo> findByZID( List<Integer> zidList) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return null;
		}
		List<M_ServerInfo> serverList = null;
		try {
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			serverList = mapper.findByZID(zidList);
		} finally {
			MybatisUtil.closeSession(session);
		}
		return serverList;
	}
	
	/**
	 * 更新客户端版本号
	 * 
	 * @param clientVersion
	 * @throws Exception
	 */
	public void updateClientVersionAll(String clientVersion, String pf) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			Map<String, Object> map = new HashMap<>();
			map.put("pf", pf);
			map.put("clientversion", clientVersion);
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			mapper.updateClientVersionAll(map);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 更新客户端版本号
	 * 
	 * @param clientVersion
	 * @throws Exception
	 */
	public void updateClientVersion(String clientVersion, String pf, List<Integer> zoneidList) throws Exception {
		SqlSession session = MybatisUtil.getSession(CrossZone.houtai);
		if (session == null) {
			return;
		}
		try {
			Map<String, Object> map = new HashMap<>();
			map.put("pf", pf);
			map.put("zoneid", zoneidList);
			map.put("clientversion", clientVersion);
			ServerInfoMapper mapper = session.getMapper(ServerInfoMapper.class);
			mapper.updateClientVersion(map);
			session.commit();
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

}
