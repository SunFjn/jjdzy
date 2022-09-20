package com.teamtop.hefu;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GamePath;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.hero.HeroExt;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.autoTable.DDLUtil;
import com.teamtop.util.db.orm.FieldOrm;
import com.teamtop.util.db.orm.FieldXml;
import com.teamtop.util.db.orm.NewTb;
import com.teamtop.util.db.orm.OrmSqlUtil;
import com.teamtop.util.db.trans.TransInnerUtil;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.mybatis.DataBaseProp;
import com.teamtop.util.mybatis.MybatisUtil;

/**
 * 合服缓存
 * @author Administrator
 *
 */
public class HefuCache {
	private static Logger logger = LoggerFactory.getLogger(HefuCache.class);
	//合服时间
	private static Map<String,IHefuEvent> events = new HashMap<String, IHefuEvent>();
	//删除hero时需要删除的表数据
	private static List<HefuDel> heroDelTbList = new ArrayList<HefuDel>();
	//重置指定表某字段 设置为"",0等
	private static List<HefuDel> resetByUpdateList = new ArrayList<HefuDel>();
	//需要转移的表
	private static Map<String, List<MoveTb>> movetbList = new HashMap<String, List<MoveTb>>();
	//需要清空的表
	private static List<String> truncateList = new ArrayList<String>();
	private static List<String> truncateOtherList = new ArrayList<String>();
	//合服区
	public static List<Integer> hefuZoneList = new ArrayList<Integer>();
	private static final String INT = "int";//对应的int类型
	private static final String BIGINT = "bigint";//对应的long类型
	private static final String VARCHAR = "varchar";//varchar类型
	private static final String MIDBLOB = "mediumblob";//midblob类型
	private static final String LONGBLOB = "longblob";// longblob类型
	private static final String TEXT = "text";//text类型
	private static final String TRUE = "true";
	private static final String FALSE = "false";
	private static final String PRIKEY = "prikey";//主键
	private static final String UNIQUE = "unique";//唯一索引
	private static final String NORMAL = "normal";//普通索引
	public static  int hefuTime=0;
	
	


	/**
	 * 加载配置文件
	 * @throws RunServerException
	 */
	@SuppressWarnings("unchecked")
	public static void readHefuEventConfig() throws RunServerException{
		try {
			String realFile = FileUtils.getAbsFilePath("com/teamtop/hefu/hefuEvents.xml");
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				bean = (Element) it.next();
				String desc = bean.attributeValue("desc");
				String className = bean.attributeValue("class");
				if(desc==null){
					throw new RunServerException(null, "HefuCache readConfig exception,desc is null,class:"+className);
				}
				Class<IHefuEvent> clazz = (Class<IHefuEvent>) Class.forName(className);
				IHefuEvent e = clazz.newInstance();
				events.put(desc,e);
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readHefuEventConfig exception");
		}
	}
	
	public static void readMovetbListConfig() throws RunServerException{
		try {
			Map<String, List<MoveTb>> fieldMap = getFieldMap();
			String realFile = FileUtils.getAbsFilePath("com/teamtop/hefu/hefuTbConfig.xml");
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				bean = (Element) it.next();
				String desc = bean.attributeValue("desc");
				String tbname = bean.attributeValue("tbname");
				String oper = bean.attributeValue("oper");
				if(desc==null || oper==null || tbname==null){
					throw new RunServerException(null, "HefuCache readMovetbListConfig exception");
				}
				if("move".equals(oper)){
					movetbList.put(tbname, fieldMap.get(tbname));
				}else if("truncate".equals(oper)){
					truncateList.add(tbname);
				}else if("truncateOther".equals(oper)){
					truncateOtherList.add(tbname);
				}else if("del".equals(oper)){
					String key = bean.attributeValue("key");
					heroDelTbList.add(new HefuDel(tbname, key));
				}else if("resetByUpdate".equals(oper)){
					String key = bean.attributeValue("key");
					resetByUpdateList.add(new HefuDel(tbname, key));
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readMovetbListConfig exception");
		}
	}
	/**
	 * 读取合服config文件夹下的配置文件
	 * @throws RunServerException
	 */
	@SuppressWarnings("resource")
	public static void getDBS(String path) throws Exception{
		BufferedReader br = new BufferedReader(new InputStreamReader(new FileInputStream(path)));
		String readLine = null;
//		String username = null;
//		String password = null;
		List<String[]> zoneidinfo = new ArrayList<String[]>();
		while((readLine = br.readLine())!=null){
			if(readLine.indexOf("#")>=0) continue;
			readLine = readLine.trim();
			String[] arr = readLine.split("=");
			String key = arr[0];
			String value = arr[1];
			String[] varr = value.split("&");
//			if("username".equals(key)){
//				username = value;
//			}else if("password".equals(key)){
//				password = value;
//			}else{
//			}
			zoneidinfo.add(new String[]{key,varr[0],varr[1],varr[2]});
		}
//		if(username ==null || password==null){
//			throw new RunServerException(null, "dbs properties not found username or password");
//		}
//		if(zoneidinfo.size()==0){
//			throw new RunServerException(null, "dbs properties not found zoneid");
//		}
		for(String[] info:zoneidinfo){
			int zoneid=Integer.parseInt(info[0]);
			hefuZoneList.add(zoneid);
			DataBaseProp dataBaseProp = new DataBaseProp(zoneid, info[1]+"?useUnicode=true&amp;characterEncoding=utf-8", info[2], info[3]);
			MybatisUtil.getDataBasePropMap().put(zoneid, dataBaseProp);
		}
		Collections.sort(hefuZoneList);
		GameProperties.zoneids = hefuZoneList;
		br.close();
	}
	private static Map<String, List<MoveTb>> getFieldMap() throws Exception{
		File orm = new File(GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"orm"+GamePath.SEP+"local");
		Map<String, List<MoveTb>> fieldMap = new HashMap<String, List<MoveTb>>();
		doGetFieldMap(orm, fieldMap);
		orm = new File(GamePath.USER_DIR+GamePath.SEP+"bin"+GamePath.SEP+"orm"+GamePath.SEP+"global_data.xml");
		doGetFieldMap(orm, fieldMap);
		return fieldMap;
	}
	private static void doGetFieldMap(File file,Map<String, List<MoveTb>> fieldMap) throws Exception{
		if(file.isDirectory()){
			File[] list = file.listFiles();
			for(File f:list){
				doGetFieldMap(f, fieldMap);
			}
		}else{
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			String tbname = null;
			for (Iterator<?> it = root.elementIterator("tb"); it.hasNext();) {
				Element tb = (Element) it.next();
				String model = tb.attributeValue("model");
				Class<?> clazz = Class.forName(model);
				tbname = tb.attributeValue("tbname");
				if(CommonUtil.isNull(tbname) || CommonUtil.isNull(model)){
					throw new RunServerException(null, "tbname or model is null,tbname:"+tbname+",model:"+model);
				}
				final List<FieldOrm> fieldList = new ArrayList<FieldOrm>();
				final List<Field> primaryList = new ArrayList<Field>();
				Map<String, Field> clazzFieldMap = new HashMap<String, Field>();
				List<MoveTb> fields = new ArrayList<MoveTb>();
				String priField = null;
				//索引
				for (Iterator<?> indexIt = tb.elementIterator("index"); indexIt.hasNext();) {
					Element index = (Element) indexIt.next();
					String field = index.attributeValue("field");
					String type = index.attributeValue("type");
					String source = index.attributeValue("source");
//					fields.add(new MoveTb(field, type));
					if(PRIKEY.equals(type)){
						priField = field;
						Field pf = null;
						if("super".equals(source)){
							pf = clazz.getSuperclass().getDeclaredField(field);
						}else{
							pf = clazz.getDeclaredField(field);
						}
						primaryList.add(pf);
					}else if(NORMAL.equals(type) || UNIQUE.equals(type)){
						
					}else{
						throw new RunServerException(null, "tb index invalid,tbname:"+tbname+",index field:"+field+",type:"+type);
					}
				}
				fieldMap.put(tbname, fields);
				
				for (Iterator<?> colIt = tb.elementIterator("col"); colIt.hasNext();) {
					Element col = (Element) colIt.next();
					String field = col.attributeValue("field");
					String type = col.attributeValue("type");
					String len = col.attributeValue("len");
					String isnull = col.attributeValue("isnull");
					String pf = col.attributeValue("pf");
					String comment = col.attributeValue("comment");
					String source = col.attributeValue("source");
					String diyStr = col.attributeValue("diy");
					boolean diy = CommonUtil.isNull(diyStr)?false:true;
					boolean isnullBol = CommonUtil.isNull(isnull)?true:TRUE.equals(isnull)?true:false;
					//检查是否字段类型写错
					String defVal = "";
					int ormUtilType = 0;
					if(INT.equals(type) || BIGINT.equals(type)){
						//int bigint 不需要定义len和isnull
						if(CommonUtil.isNull(len)){
							if(INT.equals(type)){
								len = "10";
							}else if(BIGINT.equals(type)){
								len = "20";
							}
							ormUtilType = OrmSqlUtil.TYPE_ZHENGXING;
						}
						defVal = "0";
					}else if(VARCHAR.equals(type) || TEXT.equals(type)){
						//检查是否有定义长度
						if(VARCHAR.equals(type) && CommonUtil.isNull(len)){
							throw new RunServerException(null, "tb col need define len,tb:"+tbname+",col:"+field);
						}
						ormUtilType = OrmSqlUtil.TYPE_STR;
					}else if(MIDBLOB.equals(type)){
						ormUtilType = OrmSqlUtil.TYPE_STR;
					}else if(LONGBLOB.equals(type)){
						ormUtilType = OrmSqlUtil.TYPE_STR;
					}else{
						throw new RunServerException(null, "tb col type invalid,tb:"+tbname+",col:"+field+",type:"+type);
					}
					//用于自动生成sql语句
					Field declaredField = null;
					try {
						if("super".equals(source)){
							declaredField = clazz.getSuperclass().getDeclaredField(field);
						}else{
							declaredField = clazz.getDeclaredField(field);
						}
					} catch (Exception e) {
						throw new RunServerException(e, "not such field:"+tbname);
					}
					if(!diy){
						fieldList.add(new FieldOrm(declaredField, isnullBol, ormUtilType));
						clazzFieldMap.put(declaredField.getName(), declaredField);
					}else{
					}
					fields.add(new MoveTb(field, type));
				}
				FieldOrm[] fieldOrms = new FieldOrm[fieldList.size()];
				fieldList.toArray(fieldOrms);
				FieldXml fieldXml = new FieldXml(primaryList.get(0), fieldOrms,tbname);
				OrmSqlUtil.fieldXmlMap.put(clazz, fieldXml);
				OrmSqlUtil.fieldAutoTransObjMap.put(clazz, clazzFieldMap);
			}
		}
	}
	
	/**
	 * 读取关联hero删除需要删除的表
	 * @throws RunServerException
	 */
	public static void readHeroExtraTb() throws RunServerException {
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
						throw new Exception("field is null,objname:" + fieldName);
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
					heroDelTbList.add(new HefuDel(tbname, "hid"));
				}
			}
		} catch (Exception e) {
//			logger.error(LogTool.exception(e));
			throw new RunServerException(null, "readHeroExtraTb err");
		}
		
	}
	
	public static Map<String, List<MoveTb>> getMovetbList() {
		return movetbList;
	}

	public static List<String> getTruncateList() {
		return truncateList;
	}
	public static List<String> getTruncateOtherList() {
		return truncateOtherList;
	}
	

	public static Map<String, IHefuEvent> getEvents() {
		return events;
	}

	public static List<HefuDel> getHeroExtraTbList() {
		return heroDelTbList;
	}
	public static List<HefuDel> getResetByUpdateList() {
		return resetByUpdateList;
	}
}
