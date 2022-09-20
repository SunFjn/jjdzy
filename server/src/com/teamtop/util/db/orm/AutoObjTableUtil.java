package com.teamtop.util.db.orm;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.main.RunServerException;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroExt;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.autoTable.DDLUtil;
import com.teamtop.util.db.trans.TransInnerUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.mail.QQMailCache;
import com.teamtop.util.mail.QQMailEnum;
import com.teamtop.util.mybatis.DaoUtil;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 数据库表格自动工具
 * 
 * @author Administrator
 * 
 */
public class AutoObjTableUtil extends AbsServerEvent{
	private static Logger logger = LoggerFactory.getLogger(AutoObjTableUtil.class);
	/**
	 * 需要自动控制的表
	 */
	public static List<NewTb> newTbList = new ArrayList<NewTb>();
	/**
	 * clazz对应表名
	 */
	private static Map<Class<?>, String> clazzTbNameMap = new HashMap<Class<?>, String>();
	/**
	 * 字段长度记录<br/>
	 * key1:clazz,key2:字段名,value:长度
	 */
	public static Map<Class<?>, Map<String, Integer>> fieldLenMap = new HashMap<Class<?>, Map<String, Integer>>();
	/**
	 * 玩家update时数据太长的记录<br/>
	 * key:rid,value:记录时间
	 */
	private static Map<Long, Integer> tooLongRec = new ConcurrentHashMap<Long, Integer>();

	public static void addTooLong(Object key,String sql) {
		if(key instanceof Long){
			long rid = (long) key;
			tooLongRec.put(rid, TimeDateUtil.getCurrentTime());
		}else{
			
		}
		QQMailCache.sendRed(QQMailEnum.DATA_TOO_LONG,sql);
	}

	public static void handleTooLong(Hero hero) {
		if (hero == null)
			return;
		Long rid = hero.getId();
		// 同步单表系统
		AutoObjTableUtil.updateObjs(hero);
		try {
			Integer time = tooLongRec.get(rid);
			if (time != null) {
				logger.warn(LogTool.getmsg("rid:" + rid + ",find data too long"));
				tooLongRec.remove(rid);
//				HeroFunction.getIns().forbidHero(hero, 60);//屏蔽账号
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, rid, "data too long err"));
		}
	}

	public static void init() throws RunServerException {
		readCheck();
//		MakeAutoSelXml.makeXml();
	}

	/**
	 * 读取配置文件，并进行检查<br/>
	 * 检查此对象是否在hero中，并是否提供setter和getter方法
	 * 
	 * @throws RunServerException
	 */
	private static void readCheck() throws RunServerException {
		try {
			String realFile = DDLUtil.class.getResource("/orm/local/heroExt").getFile();
			realFile = URLDecoder.decode(realFile, "utf-8");
			File file = new File(realFile);
			File[] list = file.listFiles();
			for (File lf : list) {
				SAXReader saxReader = new SAXReader();
				Document doc = saxReader.read(lf);
				Element root = doc.getRootElement();
				Class<?> heroClazz = HeroExt.class;
				for (Iterator<?> it1 = root.elementIterator("tb"); it1.hasNext();) {
					Element step = (Element) it1.next();
					String res = step.attributeValue("model");
					String tbname = step.attributeValue("tbname");
					String fieldName = tbname;

					Field field = heroClazz.getDeclaredField(fieldName);
					if (field == null) {
						throw new Exception("field is null,objname:" + fieldName+" （xml中表名必须和类中字段名一致）");
					}
					Method getMethod = null;
					Class<?> fieldClazz = field.getType();
					if (fieldClazz.isAssignableFrom(boolean.class)) {
						// boolean
						if (fieldName.indexOf(TransInnerUtil.IS) == 0) {
							getMethod = heroClazz.getMethod(TransInnerUtil.toLowerCaseFirstOne(fieldName));
						} else {
							getMethod = heroClazz.getMethod(TransInnerUtil.IS + TransInnerUtil.toUpperCaseFirstOne(fieldName));
						}
					} else {
						if (Character.isLowerCase(fieldName.charAt(0)) && Character.isUpperCase(fieldName.charAt(1))) {
							getMethod = heroClazz.getMethod(TransInnerUtil.GET + fieldName);
						} else {
							getMethod = heroClazz.getMethod(TransInnerUtil.GET + TransInnerUtil.toUpperCaseFirstOne(fieldName));
						}
					}
					if (getMethod == null) {
						throw new Exception("GET method is null,objname:" + fieldName);
					}
					getMethod = heroClazz.getDeclaredMethod(getMethod.getName());
					Method setMethod = null;
					if (field.getType().isAssignableFrom(Boolean.class) || field.getType().isAssignableFrom(boolean.class)) {
						if (fieldName.indexOf(TransInnerUtil.IS) == 0) {
							fieldName = fieldName.substring(2, fieldName.length());
							setMethod = heroClazz.getMethod(TransInnerUtil.SET + TransInnerUtil.toUpperCaseFirstOne(fieldName), field.getType());
						} else {
							setMethod = heroClazz.getMethod(TransInnerUtil.SET + TransInnerUtil.toUpperCaseFirstOne(fieldName), field.getType());
						}
					} else {
						if (Character.isLowerCase(fieldName.charAt(0)) && Character.isUpperCase(fieldName.charAt(1))) {
							setMethod = heroClazz.getMethod(TransInnerUtil.SET + fieldName, field.getType());
						} else {
							setMethod = heroClazz.getMethod(TransInnerUtil.SET + TransInnerUtil.toUpperCaseFirstOne(fieldName), field.getType());
						}
					}
					if (setMethod == null) {
						throw new Exception("SET method is null,objname:" + fieldName);
					}
					setMethod = heroClazz.getDeclaredMethod(setMethod.getName(), field.getType());
					NewTb newTb = new NewTb();
					newTb.setClassName(res);
					newTb.setFieldName(fieldName);
					newTb.setTbName(tbname);
					if (!fieldName.equals(tbname)) {
						throw new Exception("fieldName should be the same with tbname,tbname:" + tbname + ",fieldName:" + fieldName + ",res:" + res);
					}
					newTb.setSetMethod(setMethod);
					newTb.setGetMethod(getMethod);
					newTbList.add(newTb);
					// rec every field len on this res
					Class<?> resClazz = Class.forName(res);
					clazzTbNameMap.put(resClazz, tbname);
					/*Field[] declaredFields = resClazz.getDeclaredFields();
					Field priField = OrmSqlUtil.getPriField(resClazz);
					if (priField == null) {
						throw new RunServerException(null, "initTableModel,not found pri field");
					}
					if (!priField.getName().equals("rid")) {
						throw new RunServerException(null, "initTableModel,pri field should be rid");
					}
					for (Field f : declaredFields) {
						Map<String, Integer> flm = fieldLenMap.get(resClazz);
						if (flm == null) {
							flm = new HashMap<String, Integer>();
							fieldLenMap.put(resClazz, flm);
						}
						int len = OrmSqlUtil.getFieldLen(f);
						if (len > 0) {
							flm.put(f.getName(), len);
						}
					}*/

				}
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e));
			throw new RunServerException(null, "initTableModel");
		}
	}
	
	public void checkDBField() throws RunServerException{
		SAXReader saxReader = new SAXReader();
		File file = new File(GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"fieldwithoutDB.xml");
		Map<String ,Set<String>> fieldWithoutDBMap = new HashMap<>();//不入库配置表
		try {
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			for (Iterator<?> it = root.elementIterator("tb"); it.hasNext();) {
				Element tb = (Element) it.next();
				String classname = tb.attributeValue("classname");
				Set<String> classSet = fieldWithoutDBMap.get(classname);
				if(classSet == null) {
					classSet = new HashSet<>();
					fieldWithoutDBMap.put(classname, classSet);
				}
				
				for (Iterator<?> colIt = tb.elementIterator("col"); colIt.hasNext();) {
					Element col = (Element) colIt.next();
					String field = col.attributeValue("field");
					classSet.add(field);
				}
			}
		} catch (DocumentException e1) {
			throw new RunServerException(e1, "CheckDBField.Exception.");
		}
		
		StringBuilder log = new StringBuilder("CheckDBField.exception:");
		Map<Class<?>, Map<String, Field>> fieldAutoTransObjMap = OrmSqlUtil.fieldAutoTransObjMap;
		Iterator<Entry<Class<?>, Map<String, Field>>> iterator2 = fieldAutoTransObjMap.entrySet().iterator();
		while(iterator2.hasNext()) {
			Entry<Class<?>, Map<String, Field>> next = iterator2.next();
			String allClassName = next.getKey().getName();
			Map<String, Field> toDBFieldsMap = next.getValue();
			
			try {
				String[] split = allClassName.split("\\.");
				String miniClassName = split[split.length-1];
				Set<String> withOutDBFieldSet = fieldWithoutDBMap.get( miniClassName);
				
				Class<?> clazz = Class.forName(allClassName);
				Field[] fieldsSource = clazz.getDeclaredFields();
				StringBuilder logField = new StringBuilder();
				for(Field fieldSource:fieldsSource) {
					String fieldSourceName = fieldSource.getName();
					
					boolean toDB = false;//true:在入库xml中
					for(Field toDBField:toDBFieldsMap.values()) {
						String toDBFieldName = toDBField.getName();
						if(fieldSourceName.equals(toDBFieldName)) {
							toDB = true;
							break;
						}
					}
					if(toDB)
						continue;
					
					if(withOutDBFieldSet!=null&& withOutDBFieldSet.contains(fieldSourceName))//在不入库xml中
						continue;
					
					logField.append(fieldSourceName).append(" ");//两个配置表都没配
				}
				if(logField.length()>0) {
					log.append(" ").append(miniClassName).append("[ ").append(logField).append("]");
				}
			} catch (ClassNotFoundException e) {
				e.printStackTrace();
			}
		}
		if(log.length()>23) {
			LogTool.warn(log.append( " 请检查，不需要入库请配到fieldwithoutDB.xml。").toString(), AutoObjTableUtil.class);
			throw new RunServerException(null, "CheckDBField.Exception.");
		}
	}
	

	/**
	 * 查找单个对象
	 * 
	 * @param rid
	 * @param clazz
	 * @return
	 */
	public static <T> T findObj(Long rid, Class<T> clazz) {
		T t = null;
		try {
			t = AutoObjTableDao.getIns().find(rid, clazz, clazzTbNameMap.get(clazz), CommonUtil.getZoneIdById(rid));
		} catch (SQLException e) {
			logger.error(LogTool.exception(e, rid, "findObj err"));
		}
		return t;
	}

	/**
	 * 查找对象
	 * 
	 * @param hero
	 */
	public static void findObjs(Hero hero,List<String> excludeTbs) {
		long a = System.currentTimeMillis();
		try {
			long rid = hero.getId();
//			List<NewTb> needInsertList = null;
			List<Class<?>> existList = new ArrayList<Class<?>>();
			for (NewTb newtb : newTbList) {
				String tbName = newtb.getTbName();
				if(excludeTbs!=null && excludeTbs.contains(tbName)) continue;
				String className = newtb.getClassName();
				Method setMethod = newtb.getSetMethod();
				try {
					Class<?> clazz = Class.forName(className);
					Object find = AutoObjTableDao.getIns().find(rid, clazz, newtb.getTbName(), CommonUtil.getZoneIdById(rid));
//					if (find == null) {
//						// insert later
//						if (needInsertList == null) {
//							needInsertList = new ArrayList<NewTb>();
//						}
//						needInsertList.add(newtb);
//					}
					if(find!=null){
						existList.add(clazz);
					}
					setMethod.invoke(hero, find);
				} catch (Exception e) {
					logger.error(LogTool.exception(e, rid, "field:" + newtb.getFieldName()));
				}
			}
//			if (needInsertList != null) {
//				insertBatch(rid, needInsertList);
//			}
			hero.getTempVariables().setExistTableList(existList);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "findObjs err"));
		}
		System.err.println(System.currentTimeMillis() - a);
	}
	
	/**
	 * 查找对象
	 * 
	 * @param hero 角色对象
	 * @param includeTbs 包含的heroExt的表
	 */
	public static void findObjsWithInclude(Hero hero, List<String> includeTbs) {
//		long a = System.currentTimeMillis();
		try {
			long rid = hero.getId();
//			List<NewTb> needInsertList = null;
			for (NewTb newtb : newTbList) {
				String tbName = newtb.getTbName();
				if(includeTbs!=null && !includeTbs.isEmpty() && !includeTbs.contains(tbName)) continue;
				String className = newtb.getClassName();
				Method setMethod = newtb.getSetMethod();
				try {
					Object find = AutoObjTableDao.getIns().find(rid, Class.forName(className), newtb.getTbName(), CommonUtil.getZoneIdById(rid));
					if (find == null) {
						// insert later
//						if (needInsertList == null) {
//							needInsertList = new ArrayList<NewTb>();
//						}
//						needInsertList.add(newtb);
					}
					setMethod.invoke(hero, find);
				} catch (Exception e) {
					logger.error(LogTool.exception(e, rid, "field:" + newtb.getFieldName()));
				}
			}
//			if (needInsertList != null) {
//				insertBatch(rid, needInsertList);
//			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, hero.getId(), "findObjs err"));
		}
//		System.err.println(System.currentTimeMillis() - a);
	}

	/**
	 * 入库在创建玩家的时候
	 * 
	 * @param rid
	 */
	public static void insertBatch(Long rid,List<NewTb> tbList) {
		try {
			List<String> insertList = new ArrayList<String>();
			for (NewTb newtb : tbList) {
				try {
					String sql = OrmSqlUtil.makeDefaultInsert(newtb, rid);
					insertList.add(sql);
					if (insertList.size() >= 3) {
						AutoObjTableDao.getIns().insertBatch(insertList, CommonUtil.getZoneIdById(rid));
						insertList.clear();
					}
				} catch (SQLException e) {
					logger.error(LogTool.exception(e));
				}
			}
			if (insertList.size() > 0) {
				AutoObjTableDao.getIns().insertBatch(insertList, CommonUtil.getZoneIdById(rid));
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, rid, "insertOnCreate err"));
		}
	}

	/**
	 * 更新对象
	 * 
	 * @param hero
	 */
	public static void updateObjs(Hero hero) {
		if (hero == null)
			return;
		long rid = hero.getId();
		try {
			List<Object> upList = new ArrayList<Object>();
			for (NewTb newtb : newTbList) {
				String fieldName = newtb.getFieldName();
				Method getMethod = newtb.getGetMethod();
				try {
					Object obj = getMethod.invoke(hero);
					upList.add(obj);
				} catch (Exception e) {
					logger.error(LogTool.exception(e, rid, "field:" + fieldName));
				}
				if (upList.size() >= DaoUtil.batchSize) {
					AutoObjTableDao.getIns().updateBatch(upList, hero);
					upList.clear();
				}
			}
			if (upList.size() > 0) {
				AutoObjTableDao.getIns().updateBatch(upList, hero);
			}
		} catch (Exception e) {
			logger.error(LogTool.exception(e, rid, "updateObjs err"));
		}
	}

	public static void main(String[] args) throws RunServerException {
		/*
		 * NewTb tb = new NewTb();
		 * tb.setClassName("com.game.system.CommonTableUtil.test.Pojo1");
		 * tb.setFieldName("pojo1"); tb.setTbName("pojo1"); long rid =
		 * 10000000001l; String makeDefaultInsert =
		 * AutoSqlUtil.makeDefaultInsert(tb, rid);
		 * System.err.println(makeDefaultInsert);
		 */

		/*
		 * Class clazz = Hero.class; try { clazz.getDeclaredField("pojo1"); }
		 * catch (NoSuchFieldException | SecurityException e) { // TODO
		 * Auto-generated catch block e.printStackTrace(); }
		 */
		readCheck();
	}

	@Override
	public void startServer() throws RunServerException {
		try {			
			init();
			OrmDdlUtil.init();
			checkDBField();
		} catch (RunServerException e) {
			AlarmSystemFunction.getIns().alarmSend(AlarmType.STARTUP_FAIL, 0, new Object[] {});
			throw e;
		}
	}

}
