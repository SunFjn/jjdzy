package com.teamtop.cross;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.system.crossSelectKing.CrossSelectKingEnum;
import com.teamtop.system.crossSelectKing.cross.CrossSelectKing;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.util.db.trans.crossTrans.CrossTrans;
import com.teamtop.util.zlib.ZipUtils;

public class TestCrossData {

//Collections.synchronizedList(new ArrayList<SuoYaoTaRankModel>())
	
//	public static void main(String[] args) {
//		ConcurrentHashMap<Long, BaseRankModel> concurrentHashMap= new ConcurrentHashMap<Long, BaseRankModel>();
//		BaseRankModel testModelRank = new BaseRankModel();
//		CrossHeroBaseModel testModel = new CrossHeroBaseModel();
//		testModel.setId(1111111111l);testModel.setName("22222222");
//		FinalFightAttr ffa = new FinalFightAttr(); ffa.setAppendStrength(11111111); testModel.setFinalFightAttr(ffa);
//		Map<Integer, Integer> bcm = new HashMap<>(); bcm.put(33, 44);
//		List<Integer> cjjl = new ArrayList<>(); cjjl.add(555); 
//		List<String[]> strList = new ArrayList<>();//旧版本不支持
//		List<CrossHeroBaseModel> modelList = new ArrayList<>();
//		Map<Integer, CrossHeroBaseModel> modelMap = new HashMap<>(); 
//		TreeSet<BaseRankModel> modelSet = new TreeSet<BaseRankModel>(); 
//		for( int i=0; i<100; i++){
//			bcm.put( 1, 1);
//			cjjl.add(i);
//		}
//		for( int i=0; i<10; i++){
//			testModel = new CrossHeroBaseModel();
//			ffa = new FinalFightAttr(); ffa.setAppendStrength(11111111); testModel.setFinalFightAttr(ffa);
//			modelList.add( testModel);
//			testModel.setId( i);
//		}
//		for( int i=0; i<100; i++){
//			testModel = new CrossHeroBaseModel();
//			ffa = new FinalFightAttr(); ffa.setAppendStrength(11111111); testModel.setFinalFightAttr(ffa);
//			testModel.setId( i);
//			modelMap.put( i, testModel);
//		}
//		for( int i=0; i<10; i++){
//			testModelRank = new BaseRankModel();
//			testModelRank.setCountryType( i);
//			testModelRank.setHid(i);
//			modelSet.add(testModelRank);
//		}
//		for( int i=0; i<10; i++){
//			concurrentHashMap= new ConcurrentHashMap<Long, BaseRankModel>();
//			BaseRankModel model = new BaseRankModel();
//			concurrentHashMap.put( (long)i, model);
//		}
//		
//		byte[] testOldWrite = testOldWrite(testModel, bcm, cjjl, strList, modelList, modelMap, modelSet, concurrentHashMap);
//		testOldRead(testOldWrite);
//		byte[] testNewWrite = testNewWrite(testModel, bcm, cjjl, strList, modelList, modelMap, modelSet, concurrentHashMap);
//		testNewReadType(testNewWrite);
//
//		int round = 1;
//		long time1 = System.currentTimeMillis();
//		for( int i=0; i<round; i++){
//			testOldWrite = testOldWrite(testModel, bcm, cjjl, strList, modelList, modelMap, modelSet, concurrentHashMap);
//		}
//		long lengthOld = testOldWrite.length;
//		long time2 = System.currentTimeMillis();
//		for( int i=0; i<round; i++){
//			testOldRead(testOldWrite);
//		}
//		long time3 = System.currentTimeMillis();
//		for( int i=0; i<round; i++){
//			testNewWrite = testNewWrite(testModel, bcm, cjjl, strList, modelList, modelMap, modelSet, concurrentHashMap);
//		}
//		long lengthNew = testNewWrite.length;
//		long time4 = System.currentTimeMillis();
//		for( int i=0; i<round; i++){
//			testNewReadType(testNewWrite);
//		}
//		long time5 = System.currentTimeMillis();
////		for( int i=0; i<round; i++){
////			testNewReadClass(testNewWrite);
////		}
//		long time6 = System.currentTimeMillis();
//		
//		System.out.println("round "+round+" times result,spend time;\n[old write:"+(time2-time1)+" old read:"+(time3-time2)+" alltime:"+(time3-time1)+" old length:"+lengthOld+"] ; \n[new write:"+(time4-time3)+" new read:"+(time5-time4)+" alltime:"+(time5-time3)+" new length:"+lengthNew+"]"+" time2:"+(time6-time5));
//	}
	
//	public static byte[] testOldWrite( CrossHeroBaseModel testModel, Map<Integer, Integer> bcm, List<Integer> cjjl,List<String[]> strList,
//			List<CrossHeroBaseModel> modelList,Map<Integer, CrossHeroBaseModel> modelMap, TreeSet<BaseRankModel> modelSet, ConcurrentHashMap<Long, BaseRankModel> concurrentHashMap){
//		CrossDataOld crossDataOld = new CrossDataOld();
//		crossDataOld.put( CrossEnum.databaseProp.name(), testModel);
//		crossDataOld.put( CrossEnum.fightData.name(), bcm);
//		crossDataOld.put( CrossEnum.zoneidList.name(), cjjl);
//		crossDataOld.put( CrossEnum.byteArrData.name(), modelList);
//		crossDataOld.put( CrossEnum.sceneData.name(), modelMap);
//		crossDataOld.put( CrossEnum.sendToAsPort.name(), modelSet);
//		crossDataOld.put( CrossEnum.chongZhiYuanBao.name(), concurrentHashMap);
//		byte[] writeOld = CrossTrans.write(crossDataOld, CrossDataOld.class);
//		return writeOld;
//	}
//	public static void testOldRead( byte[] writeOld){
//		CrossDataOld crossDataReadOld = CrossTrans.read( writeOld, CrossDataOld.class);
//		CrossHeroBaseModel testOld = (CrossHeroBaseModel) crossDataReadOld.get( CrossEnum.databaseProp.name());
//		Map<Integer, Integer> testMapOld = (Map<Integer, Integer>) crossDataReadOld.get( CrossEnum.fightData.name());
//		List<Integer> testListOld = (List<Integer>) crossDataReadOld.get( CrossEnum.zoneidList.name());
//		List<CrossHeroBaseModel> modelList =(List<CrossHeroBaseModel>) crossDataReadOld.get( CrossEnum.byteArrData.name());
//		Map<Integer, CrossHeroBaseModel> modelMap = (Map<Integer, CrossHeroBaseModel>) crossDataReadOld.get( CrossEnum.sceneData.name());
//		TreeSet<BaseRankModel> modelSet = (TreeSet<BaseRankModel>) crossDataReadOld.get( CrossEnum.sendToAsPort.name());
//		ConcurrentHashMap<Long, BaseRankModel> concurrentHashMap = (ConcurrentHashMap<Long, BaseRankModel>) crossDataReadOld.get( CrossEnum.chongZhiYuanBao.name());
//		@SuppressWarnings("unused")
//		int a=1;
//		
//	}
//	
//	public static byte[] testNewWrite( CrossHeroBaseModel testModel, Map<Integer, Integer> bcm, List<Integer> cjjl,List<String[]> strList,
//			List<CrossHeroBaseModel> modelList,Map<Integer, CrossHeroBaseModel> modelMap, TreeSet<BaseRankModel> modelSet, ConcurrentHashMap<Long, BaseRankModel> concurrentHashMap){
//		CrossData crossDataNew = new CrossData();
//		crossDataNew.putObject( CrossEnum.databaseProp.name(), testModel);
//		crossDataNew.putObject( CrossEnum.fightData.name(), bcm);
//		crossDataNew.putObject( CrossEnum.zoneidList.name(), cjjl);
//		crossDataNew.putObject( CrossEnum.byteArrData.name(), modelList);
//		crossDataNew.putObject( CrossEnum.sceneData.name(), modelMap);
//		crossDataNew.putObject( CrossEnum.sendToAsPort.name(), modelSet);
//		crossDataNew.putObject( CrossEnum.chongZhiYuanBao.name(), concurrentHashMap);
//		String dataStr1 = JSON.toJSONString(crossDataNew);
//		byte[] writeNew = ZipUtils.compress(dataStr1.getBytes(Charset.forName("utf-8")));
//		return writeNew;
//	}
//	public static void testNewReadType( byte[] writeNew){
//		String dataStr2 = new String(ZipUtils.decompress(writeNew), Charset.forName("utf-8"));
//		CrossData crossDataReadNew = JSONObject.parseObject(dataStr2, CrossData.class);
//		CrossHeroBaseModel testNew = crossDataReadNew.getObject( CrossEnum.databaseProp.name(), CrossHeroBaseModel.class);
//		Map<Integer, Integer> testMapNew = crossDataReadNew.getObject( CrossEnum.fightData.name(), new TypeReference<Map<Integer, Integer>>(){}.getType());
//		List<Integer> testListNew = crossDataReadNew.getObject( CrossEnum.zoneidList.name(), new TypeReference<List<Integer>>(){}.getType());
//		List<CrossHeroBaseModel> modelList = crossDataReadNew.getObject( CrossEnum.byteArrData.name(), new TypeReference<List<CrossHeroBaseModel>>(){}.getType());
//		Map<Integer, CrossHeroBaseModel> modelMap = crossDataReadNew.getObject( CrossEnum.sceneData.name(), new TypeReference<Map<Integer, CrossHeroBaseModel>>(){}.getType());
//		TreeSet<BaseRankModel> modelSet = crossDataReadNew.getObject( CrossEnum.sendToAsPort.name(), new TypeReference<TreeSet<BaseRankModel>>(){}.getType());
//		ConcurrentHashMap<Long, BaseRankModel> concurrentHashMap = crossDataReadNew.getObject( CrossEnum.chongZhiYuanBao.name(), new TypeReference<ConcurrentHashMap<Long, BaseRankModel>>(){}.getType());
//		@SuppressWarnings("unused")
//		int a=1;
////		concurrentHashMap = (ConcurrentHashMap<Long, BaseRankModel>) crossDataReadNew.getObjectMap( CrossEnum.chongZhiYuanBao.name(), Long.class, BaseRankModel.class);
//		modelMap = crossDataReadNew.getObjectMap( CrossEnum.sceneData.name(), Integer.class, CrossHeroBaseModel.class);
//		modelList = crossDataReadNew.getObjectList( CrossEnum.byteArrData.name(), CrossHeroBaseModel.class);
//	}
//	public static void testNewReadClass( byte[] writeNew){
//		String dataStr2 = new String(ZipUtils.decompress(writeNew), Charset.forName("utf-8"));
//		CrossData crossDataReadNew = JSONObject.parseObject(dataStr2, CrossData.class);
//		CrossHeroBaseModel testNew = crossDataReadNew.getObject( CrossEnum.databaseProp.name(), CrossHeroBaseModel.class);
//		Map<Integer, Integer> testMapNew = crossDataReadNew.getObject( CrossEnum.fightData.name(), Map.class);
//		List<Integer> testListNew = crossDataReadNew.getObject( CrossEnum.zoneidList.name(), List.class);
//		List<CrossHeroBaseModel> modelList = crossDataReadNew.getObject( CrossEnum.byteArrData.name(), List.class);
//		Map<Integer, CrossHeroBaseModel> modelMap = crossDataReadNew.getObject( CrossEnum.sceneData.name(), Map.class);
//		TreeSet<CrossHeroBaseModel> modelSet = crossDataReadNew.getObject( CrossEnum.sendToAsPort.name(), TreeSet.class);
//		ConcurrentHashMap<Long, BaseRankModel> concurrentHashMap = (ConcurrentHashMap<Long, BaseRankModel>) crossDataReadNew.getObject( CrossEnum.chongZhiYuanBao.name(), Map.class);
//	}
	
	
	//alibaba.fastjson.JSON比豪哥自定义格式比较：
	//传100个List<Integer>和100个Map<Integer,Integer>，豪哥的效率高，但占用内存多
//	round 10000 times result,spend time;
//	[old write:765 old read:1775 alltime:2540 old length:1205] ; 
//	[new write:2760 new read:397 alltime:3157 new length:550]
	//传100个List<对象>，阿里明显效率高，内存小:
//	[old write:20410 old read:45248 alltime:65658 old length:41696] ; 
//	[new write:12021 new read:4527 alltime:16548 new length:1171]
	//穿100个Map<Integer,对象>：
//	[old write:21214 old read:47454 alltime:68668 old length:42231] ; 
//	[new write:13298 new read:4717 alltime:18015 new length:1501]
	//testNewReadType和class:区别不大;

}
