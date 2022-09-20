package com.teamtop.system.equip;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;

import com.teamtop.system.equip.model.Equip;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.mybatis.BaseMapper;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.mybatis.MybatisUtil;

public class EquipDao {
	private static EquipDao equipDao;
	private EquipDao(){}
	public static EquipDao getIns() {
		if(equipDao == null) {
			equipDao = new EquipDao();
		}
		return equipDao;
	}

	/**
	 * 插入一个装备
	 * @param e
	 * @param zoneid
	 * @throws Exception
	 */
	public void insert(Equip e, int zoneid) throws Exception {
		DaoUtil.insert(e, EquipMapper.class, zoneid);
	}
	
	/**
	 * 批量更新装备数据
	 * @param collection
	 * @param zoneid
	 * @throws Exception
	 */
	public void insertIntoBatch(List<Equip> list, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			EquipMapper mapper = session.getMapper(EquipMapper.class);
			mapper.insertIntoBatch(list);
			session.commit();
		}finally{
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 更新
	 * @param e
	 * @param zoneid
	 * @throws Exception
	 */
	public void update(Equip e, int zoneid) throws Exception {
		DaoUtil.update(e,Equip.class, EquipMapper.class, zoneid);
	}
	/**
	 * 根据装备id找到装备
	 * @param id 装备唯一id
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public Equip find(long id, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		Equip t = null;
		try {
			BaseMapper<Equip> mapper = (BaseMapper<Equip>) session.getMapper(EquipMapper.class);
			Map<String,Object> map = mapper.find(OrmSqlUtil.makeFind(Equip.class, id));
			if(map != null){
				t = getEquipByType(map);
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return t;
	}
	
	/**
	 * 根据角色id找到所有装备
	 * @param hid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Equip> findAllEquipByHid(long hid, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<Equip> rsList = null;
		try {
			BaseMapper<Equip> mapper = (BaseMapper<Equip>) session.getMapper(EquipMapper.class);
			List<Object> findMany = mapper.findMany(hid);
			if(findMany!=null){
				for(Object obj:findMany){
					if(rsList==null) rsList = new ArrayList<Equip>();
					Map<String,Object> map = (Map<String, Object>) obj;
					Equip e = getEquipByType(map);
					rsList.add(e);
				}
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}
	/**
	 * 查找在身上的装备
	 * @param hid
	 * @param zoneid
	 * @return
	 * @throws Exception
	 */
	public List<Equip> findOnbodyEquip(long hid, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		List<Equip> rsList = null;
		try {
			EquipMapper mapper = session.getMapper(EquipMapper.class);
			List<Map<String, Object>> findMany = mapper.findOnbodyEquip(hid);
			if(findMany!=null){
				for(Map<String, Object> obj:findMany){
					if(rsList==null) rsList = new ArrayList<Equip>();
					Equip e = getEquipByType(obj);
					rsList.add(e);
				}
			}
		}finally{
			MybatisUtil.closeSession(session);
		}
		return rsList;
	}
	/**
	 * 根据id删除一个装备
	 * @param id
	 * @param zoneid
	 * @throws Exception
	 */
	public void delete(long id, int zoneid) throws Exception {
		DaoUtil.delOne(id, EquipMapper.class, Equip.class, zoneid);
	}
	/**
	 * 根据多个装备的唯一id查找装备数据
	 * PS：暂时不用
	 * @param ids
	 * @param zoneid
	 * @throws Exception
	 */
	public List<Equip> findByIds(String ids, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			EquipMapper mapper = session.getMapper(EquipMapper.class);
			List<Map<String, Object>> list = mapper.findByIds(ids);
			List<Equip> rtnList = new ArrayList<Equip>();
			for(Map<String, Object> map : list){
				rtnList.add(OrmSqlUtil.getObjFromDB(map, Equip.class));
			}
			return rtnList;
		}finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 根据装备唯一id批量删除装备数据
	 * @param ids
	 * @param zoneid
	 * @throws Exception
	 */
	public void delMany(List<Long> ids, int zoneid) throws Exception {
		SqlSession session = MybatisUtil.getSession(zoneid);
		try {
			EquipMapper mapper = session.getMapper(EquipMapper.class);
			mapper.delMany(ids);
			session.commit();
		}finally {
			MybatisUtil.closeSession(session);
		}
	}
	
	/**
	 * 批量更新装备数据
	 * @param collection
	 * @param zoneid
	 * @throws Exception
	 */
	public void updateBatch(Collection<Equip> collection, int zoneid) throws Exception {
		DaoUtil.insertOnDuplicateBatch(collection, Equip.class,EquipMapper.class, zoneid, null,DaoUtil.size_100);
	}
	
	/**
	 * 将数据库查询出来的装备数据转成具体的
	 * @param map
	 * @return
	 * @throws Exception
	 */
	private Equip getEquipByType(Map<String,Object> map) throws Exception{
		Equip e = null;
		e = OrmSqlUtil.getObjFromDB(map, Equip.class,new Equip());
		return e;
	}
}
