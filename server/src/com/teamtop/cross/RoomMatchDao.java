package com.teamtop.cross;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RoomMatchDao {
	public static Logger logger = LoggerFactory.getLogger(RoomMatchDao.class);
//	public static void insert(){
//		ArrayList<RoomMatch> roomMatchExcel = CrossCache.getRoomMatchExcel();
//		try {
//			DaoUtil.insertOnDuplicateBatch(roomMatchExcel, RoomMatch.class, RoomMatchMapper.class, GameProperties.getFirstZoneId(), null, DaoUtil.size_100);
//		} catch (Exception e) {
//			logger.error(LogTool.exception(e));
//		}
//	}
	/**
	 * 查找所有房间分配的数据
	 * @return
	 */
//	public static List<RoomMatch> getAll(){
//		SqlSession session = MybatisUtil.getLocalSession();
//		try {
//			RoomMatchMapper mapper = session.getMapper(RoomMatchMapper.class);
//			List<RoomMatch> list = new ArrayList<RoomMatch>();
//			List<Map<String, Object>> findAll = mapper.findAll();
//			if(findAll!=null){
//				for(Map<String, Object> map:findAll){
//					RoomMatch t = OrmSqlUtil.getObjFromDB(map, RoomMatch.class);
//					list.add(t);
//				}
//			}
//			return list;
//		} catch (Exception e) {
//			logger.error(LogTool.exception(e));
//			return null;
//		}finally{
//			MybatisUtil.closeSession(session);
//		}
//	}
	
	
}
