package com.teamtop.system.crossZhuLu.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossZhuLu.mapper.CrossZhuLuRoomInfoMapper;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossZhuLuRoomInfoDao {
	private static CrossZhuLuRoomInfoDao ins;

	public static CrossZhuLuRoomInfoDao getIns() {
		if (ins == null) {
			ins = new CrossZhuLuRoomInfoDao();
		}
		return ins;
	}

	public CrossZhuLuRoomInfoDao() {

	}

	/**
	 * 查找所有数据 有可能记录为空
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<CrossZhuLuRoomInfo> findAllData() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossZhuLuRoomInfoMapper mapper = session.getMapper(CrossZhuLuRoomInfoMapper.class);
			List<Object> list = mapper.findAllData();
			List<CrossZhuLuRoomInfo> datas = new ArrayList<>();
			for (Object obj : list) {
				Map<String, Object> map = (Map<String, Object>) obj;
				CrossZhuLuRoomInfo t = OrmSqlUtil.getObjFromDB(map, CrossZhuLuRoomInfo.class);
				datas.add(t);
			}
			return datas;
		} finally {
			MybatisUtil.closeSession(session);
		}
	}

	/**
	 * 插入数据
	 * 
	 * @param roomInfo
	 * @throws Exception
	 */
	public void insertRoomInfo(CrossZhuLuRoomInfo roomInfo) throws Exception {
		DaoUtil.insert(roomInfo, CrossZhuLuRoomInfoMapper.class, GameProperties.getFirstZoneId());
	}

	/**
	 * 批量更新数据
	 * 
	 * @param collection
	 * @throws Exception
	 */
	public void updateRoomInfoBatch(Collection<CrossZhuLuRoomInfo> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossZhuLuRoomInfo.class, CrossZhuLuRoomInfoMapper.class,
				GameProperties.getFirstZoneId(), null, DaoUtil.size_100);
	}
}
