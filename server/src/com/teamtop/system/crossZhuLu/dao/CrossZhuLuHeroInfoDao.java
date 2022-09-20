package com.teamtop.system.crossZhuLu.dao;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.crossZhuLu.mapper.CrossZhuLuHeroInfoMapper;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuHeroInfo;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class CrossZhuLuHeroInfoDao {
	private static CrossZhuLuHeroInfoDao ins;

	public static CrossZhuLuHeroInfoDao getIns() {
		if (ins == null) {
			ins = new CrossZhuLuHeroInfoDao();
		}
		return ins;
	}

	public CrossZhuLuHeroInfoDao() {

	}

	/**
	 * 查找所有数据 有可能记录为空
	 * 
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<CrossZhuLuHeroInfo> findAllData() throws Exception {
		SqlSession session = MybatisUtil.getLocalSession();
		try {
			CrossZhuLuHeroInfoMapper mapper = session.getMapper(CrossZhuLuHeroInfoMapper.class);
			List<Object> list = mapper.findAllData();
			List<CrossZhuLuHeroInfo> datas = new ArrayList<>();
			for (Object obj : list) {
				Map<String, Object> map = (Map<String, Object>) obj;
				CrossZhuLuHeroInfo t = OrmSqlUtil.getObjFromDB(map, CrossZhuLuHeroInfo.class);
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
	 * @param heroInfo
	 * @throws Exception
	 */
	public void insertHeroInfo(CrossZhuLuHeroInfo heroInfo) throws Exception {
		DaoUtil.insert(heroInfo, CrossZhuLuHeroInfoMapper.class, GameProperties.getFirstZoneId());
	}

	/**
	 * 批量更新数据
	 * 
	 * @param collection
	 * @throws Exception
	 */
	public void updateHeroInfoBatch(Collection<CrossZhuLuHeroInfo> collection) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, CrossZhuLuHeroInfo.class, CrossZhuLuHeroInfoMapper.class,
				GameProperties.getFirstZoneId(), null, DaoUtil.size_100);
	}
}
