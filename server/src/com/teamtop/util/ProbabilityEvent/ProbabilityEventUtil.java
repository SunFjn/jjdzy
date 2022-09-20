package com.teamtop.util.ProbabilityEvent;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.util.log.LogTool;
/**
 * 获取概率事件
 * @author KyleCheng
 *
 */
public class ProbabilityEventUtil {

	private static Logger logger = LoggerFactory.getLogger(ProbabilityEventUtil.class);
	/**
	 * 随机获取事件
	 * @param pe ProbabilityEventModel对象
	 * @return 随机获取的事件,若报错或pe为null返回null
	 */
	public static Object getEventByProbability(ProbabilityEventModel pe){
		try {
			if(pe==null) return null;
			List<Integer> probabilities = pe.getProbabilities();
			if(probabilities==null || probabilities.size()==0) return null;
			Random random = new Random();
			int compareValue = random.nextInt(probabilities.get(probabilities.size()-1))+1;
//			System.err.println("compareValue:"+compareValue);
			int valueByHalfFind = HalfFind.halfFind(probabilities, compareValue);
			if(valueByHalfFind==-3){
				//大于最大值
				valueByHalfFind = pe.getEvents().size()-1;
			}
			random = null;
			return pe.getEvents().get(valueByHalfFind);
		} catch (Exception e) {
			logger.error(LogTool.exception(e,"pe:"+pe));
			return null;
		}
	}
	/**
	 * 根据概率获取事件
	 * @param pe ProbabilityEventModel对象
	 * @param compareValue 概率
	 * @return 随机获取的事件,若报错或pe为null返回null
	 */
	public static Object getEventByProbability(ProbabilityEventModel pe,int compareValue){
		if(pe==null) return null;
		List<Integer> probabilities = pe.getProbabilities();
		try {
//			System.err.println("compareValue:"+compareValue);
//			if(compareValue==0) compareValue=-1;
			int valueByHalfFind = HalfFind.halfFind(probabilities, compareValue);
			if(valueByHalfFind==-1 || valueByHalfFind==-2){
				return null;
			}else if(valueByHalfFind==-3){
				//大于最大值
				valueByHalfFind = pe.getEvents().size()-1;
			}
			return pe.getEvents().get(valueByHalfFind);
		} catch (Exception e) {
			logger.error(LogTool.exception(e, "probabilities:"+probabilities+",compareValue:"+compareValue));
			return null;
		}
	}
	/**
	 * 根据一个成功概率获取是否能运行<br/>
	 * 参数若参数大于等于100,返回true 
	 * @param canRunprobability 成功运行的概率
	 * @return 是否能运行,true为可以
	 */
	public static boolean canRunEvent(int gailv){
		return canRunEvent(gailv, 100);
	}
	public static boolean canRunEvent(int gailv,int max){
		if(gailv>=max){
			return true;
		}
		int randomNum = RandomUtil.getRandomNumInAreas(1, max);
		if(randomNum<=gailv){
			return true;
		}else{
			return false;
		}
	}
	/**
	 * 多次刷新概率事件，产生的结果是不一样的
	 * 传入的pe会移除掉筛选出来的model
	 * @param copyModel pe
	 * @param refreshNum 刷新次数
	 * @return 刷新结果
	 */
	public static List<Object> getEventByProbabilityRemove(ProbabilityEventModel copyModel,int refreshNum){
		List<Object> list = new ArrayList<Object>();
		for(int i=0;i<refreshNum;i++){
			Object refreshType = ProbabilityEventUtil.getEventByProbability(copyModel);
			list.add(refreshType);
			copyModel.removeProbabilityEvent(refreshType);
		}
		return list;
	}
	/**
	 * 多次刷新概率事件，产生的结果是不一样的
	 * @param oriModel 传入的参数是原始的概率事件对象，可能是公共的缓存
	 * @param refreshNum 刷新次数
	 * @return 刷新结果
	 */
	public static List<Object> getEventByProbabilityNotRemove(ProbabilityEventModel oriModel,int refreshNum){
		ProbabilityEventModel copyModel = ProbabilityEventFactory.getProbabilityEventCopy(oriModel);
		List<Object> list = new ArrayList<Object>();
		for(int i=0;i<refreshNum;i++){
			Object refreshType = ProbabilityEventUtil.getEventByProbability(copyModel);
			if(refreshType!=null){
				list.add(refreshType);
				copyModel.removeProbabilityEvent(refreshType);
			}
		}
		return list;
	}
	/**
	 * 单次刷新，指定不要的事件
	 * @param oriModel 源model
	 * @param notChooseEvent 指定不要的事件数组
	 * @return 刷新结果
	 */
	public static Object getEventByProbabilityWithNotChoose(ProbabilityEventModel oriModel,Object[] notChooseEvent){
		if(notChooseEvent==null || notChooseEvent.length==0){
			return getEventByProbability(oriModel);
		}
		ProbabilityEventModel copyModel = ProbabilityEventFactory.getProbabilityEventCopy(oriModel);
		for(Object obj:notChooseEvent){
			copyModel.removeProbabilityEvent(obj);
		}
		return getEventByProbability(copyModel);
	}
	/**
	 * 一次性对一定数目的概率事件进行排序（相当于洗牌，后抽牌）
	 * @param oriModel oriModel 源model
	 * @param sort    需要
	 * @return
	 */
	public static Object[] sortByProbability(ProbabilityEventModel oriModel,int sort){
		  Object[] result=new Object[sort];
		  for (int i = 0; i < result.length; i++) {
			  result[i]=getEventByProbabilityWithNotChoose(oriModel,result);
			  
		}
		  return result;
		  
		  
	}
	
	/**
	 * 多次刷新概率事件，产生结果(可能是一样的)
	 * @param oriModel 传入的参数是原始的概率事件对象，
	 * @param refreshNum 刷新次数
	 * @return 刷新结果
	 */
	public static List<Object> getManyEventByProbability(ProbabilityEventModel oriModel,int refreshNum){
		ProbabilityEventModel copyModel = ProbabilityEventFactory.getProbabilityEventCopy(oriModel);
		List<Object> list = new ArrayList<Object>();
		for(int i=0;i<refreshNum;i++){
			Object refreshType = (Object) ProbabilityEventUtil.getEventByProbability(copyModel);
			if(refreshType!=null){
				list.add(refreshType);
			}
		}
		return list;
	}
	
}
