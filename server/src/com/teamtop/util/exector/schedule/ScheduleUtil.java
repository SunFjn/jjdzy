
package com.teamtop.util.exector.schedule;

import java.io.File;
import java.lang.reflect.Constructor;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.RejectedExecutionHandler;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

import org.apache.commons.lang3.StringUtils;
import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.pf.PfConst;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.event.serverEvent.ScheduleSmodel;
import com.teamtop.system.event.serverEvent.ServerEventFunction;
import com.teamtop.util.file.FileUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;
import com.teamtop.util.ui.ShowMsgFunction;
/**
 * 定时器工具，统一使用这里创建定时任务
 * @author Administrator
 *
 */
public class ScheduleUtil extends AbsServerEvent{
	private static SchedulerBean schedulerBean;
	public static final Map<String, AbsScheduleExecutor> executorEvent = new ConcurrentHashMap<String, AbsScheduleExecutor>();
	private static Map<String, List<ScheduleSmodel>> pfScheduleMap = new HashMap<String, List<ScheduleSmodel>>();
	private static final String scheduleKeyclassName = "com.teamtop.util.exector.schedule.ScheduleConst";
	private static final String pfKeyclassName = "com.teamtop.pf.PfConst";
	private static Logger logger = LoggerFactory.getLogger(ScheduleUtil.class);
	
	/**
	 * 加入到线程池
	 * @param taskId 任务id，填写到ScheduleConst中
	 * @param delay 延迟 毫秒
	 * @param interval 间隔时间 毫秒
	 * @param task 任务
	 */
	public static void addTask(String taskId,final AbsScheduleExecutor executor){
		if(schedulerBean==null){
			schedulerBean = new SchedulerBean();
		}
		long delay = executor.getDelay();
		long interval = executor.getInterval();
		if(executorEvent.containsKey(taskId)){
			logger.warn("ScheduleUtil addTask repeat taskId:"+taskId);
			return;
		}
		executorEvent.put(taskId, executor);
		schedulerBean.submit(taskId, delay, interval, new Runnable(){
			@Override
			public void run() {
				if(!executor.isUseLong()){
					executor.execute(TimeDateUtil.getCurrentTime());
				}else{
					executor.execute(TimeDateUtil.getRealTime());
				}
			}
			
		});
	}
	/**
	 * 取消定时任务
	 * @param taskId 任务id，填写到ScheduleConst中
	 */
	public static void cancelTask(String taskId){
		executorEvent.remove(taskId);
		schedulerBean.cancel(taskId);
	}
	/**
	 * 取消定时任务,并在取消之前执行一次
	 * @param taskId 任务id，填写到ScheduleConst中
	 */
	public static void cancelTaskAndExecuteOneMoreTime(String taskId){
		AbsScheduleExecutor executor = executorEvent.remove(taskId);
		if(executor != null){
			executor.execute(TimeDateUtil.getCurrentTime());
			executor.execute(TimeDateUtil.getRealTime());
		}
		schedulerBean.cancel(taskId);
	}
	/**
	 * GM改时间取消所有的定时事件
	 */
	public static void cancelAllTask() {
		if(executorEvent.isEmpty()) {
			return;
		}
		Iterator<String> iterator = executorEvent.keySet().iterator();
		while(iterator.hasNext()) {
			String taskId = iterator.next();
			schedulerBean.cancel(taskId);
		}
	}
	/**
	 * 主策跨服定时任务
	 * @throws RunServerException 
	 */
	private static void registCrossEvent() throws RunServerException{
		/**指定定时任务*/
		//initEvent(ScheduleConst.QURATZ, new ScheduleFixtime(1000, 1000));
		initScheduleEvent();
	}
	/**
	 * 注册定时事件
	 */
	private static void registEvent() {
		/**指定定时任务*/
		initEvent(ScheduleConst.QURATZ, new ScheduleFixtime(1000, 1000));
	}
	
	public void registSchedule() throws RunServerException {
		long s = System.currentTimeMillis();
		initScheduleEvent();
		long e = System.currentTimeMillis();
		String desc = "serverStart invoke complete"+",total time:"+(e-s)+" ms";
		logger.info(LogTool.showRunComplete(desc));
		ShowMsgFunction.sendBlueMsg(LogTool.showRunComplete(desc));
	}
	
	/**
	 * 初始化任务事件
	 * @author lobbyer
	 * @throws RunServerException
	 * @date 2016年4月28日
	 */
	public static void initScheduleEvent() throws RunServerException {
		try {
			for(String pf:pfScheduleMap.keySet()) {
				if(!pf.equals(PfConst.PF_ALL) && !pf.equals(GameProperties.platform)) continue;
				List<ScheduleSmodel> list = pfScheduleMap.get(pf);
				for(ScheduleSmodel smodel:list){
					long a = System.currentTimeMillis();
					Class<?> clazz = Class.forName(smodel.getClassName());
					Constructor<?> constructor = clazz.getConstructors()[0];
					Class<?>[] parameterTypes = constructor.getParameterTypes();
					AbsScheduleExecutor executor = null;
					Constructor<?> con = null;
					if(parameterTypes.length == 2) {
						con = clazz.getConstructor(new Class[]{long.class,long.class});
						executor = (AbsScheduleExecutor) con.newInstance(smodel.getDelay(),smodel.getInterval());
					} else {
						con = clazz.getConstructor(new Class[]{long.class,long.class,boolean.class});
						executor = (AbsScheduleExecutor) con.newInstance(smodel.getDelay(),smodel.getInterval(), smodel.isUseLong());
					}
					long b = System.currentTimeMillis();
					logger.info(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
					ShowMsgFunction.sendMsg(LogTool.showInitComplete(smodel.getDesc()+",time:"+(b-a)+" ms"));
					initEvent(smodel.getType(), executor);
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "start server exception");
		}
	}
	
	/**
	 * 初始化事件缓存类
	 * @param target 定时key
	 * @param executor 需执行的AbsScheduleExecutor
	 */
	private static void initEvent(String target, AbsScheduleExecutor executor) {
		addTask(target, executor);
		
	}
	/**
	 * 初始化启动服务器时的定时任务
	 */
	public static void initStartServerTask(){
		Iterator<Entry<String,AbsScheduleExecutor>> iterator = executorEvent.entrySet().iterator();
		System.out.println("initStartServerTask:"+executorEvent);
		while(iterator.hasNext()) {
			Entry<String,AbsScheduleExecutor> entry = iterator.next();
			final AbsScheduleExecutor absScheduleExecutor = entry.getValue();
			String target = entry.getKey();
			if(!executorEvent.containsKey(target)){
				executorEvent.put(target, absScheduleExecutor);
			}
			schedulerBean.submit(target, absScheduleExecutor.getDelay(), absScheduleExecutor.getInterval(), new Runnable(){
				@Override
				public void run() {
					if(!absScheduleExecutor.isUseLong()){
						absScheduleExecutor.execute(TimeDateUtil.getCurrentTime());
					}else{
						absScheduleExecutor.execute(TimeDateUtil.getRealTime());
					}
				}
				
			});
		}
		
	}
	@Override
	public void startServer() throws RunServerException {
		schedulerBean = new SchedulerBean();
		schedulerBean.init(Runtime.getRuntime().availableProcessors());
		if(GameProperties.isLocalServer()){
			//注册子服事件
			//registEvent();
			readScheduleConfig("ScheduleEvents.xml");
			registSchedule();
		} else if (GameProperties.isHoutaiServer()) {
			readScheduleConfig("HoutaiScheduleEvents.xml");
			registCrossEvent();
		}else{
			//注册跨服事件
			readScheduleConfig("CentralScheduleEvents.xml");
			registCrossEvent();
		}
		//initStartServerTask();
	}
	/**
	 * 生成独立线程 默然线程数为CPU数
	 * @param name 名字
	 * @return ScheduledExecutorService
	 */ 
	public static ScheduledExecutorService makeThread(String name){
		return makeThread(Runtime.getRuntime().availableProcessors(), name);
	}
	/**
	 * 生成独立线程
	 * @param nthreads 数量
	 * @param name 名字
	 * @return ScheduledExecutorService
	 */
	public static ScheduledExecutorService makeThread(int nthreads,final String name){
		ScheduledExecutorService executors = Executors.newScheduledThreadPool(nthreads,
				new ThreadFactory() {
					AtomicInteger sn = new AtomicInteger();
					public Thread newThread(Runnable r) {
						SecurityManager s = System.getSecurityManager();
						ThreadGroup group = (s != null) ? s.getThreadGroup(): Thread.currentThread().getThreadGroup();
						Thread t = new Thread(group, r);
						t.setName(name+" - " + sn.incrementAndGet());
						return t;
					}
				});
		return executors;
	}
	
	/**
	 * 读取服务器线程配置文件
	 * @throws RunServerException 读取失败跑出异常，同时关闭服务器
	 */
	public static void readScheduleConfig(String xmlName) throws RunServerException{
		try {
			String realFile = FileUtils.getAbsFilePath("com/teamtop/util/exector/schedule/"+xmlName);
			realFile = URLDecoder.decode(realFile,"utf-8");  
			File file = new File(realFile);
			SAXReader saxReader = new SAXReader();
			Document doc = saxReader.read(file);
			Element root = doc.getRootElement();
			Element bean = null;
			String desc = null;
			String key = null;
			String pf = null;
			long delay = 1000;
			long interval = 1000;
			String useLong = null;
			boolean uselong = false;
			for(Iterator<?> it = root.elementIterator("bean");it.hasNext();){
				bean = (Element) it.next();
				key = bean.attributeValue("key");
				pf = bean.attributeValue("pf");
				delay = Long.parseLong(bean.attributeValue("delay"));
				interval = Long.parseLong(bean.attributeValue("interval"));
				useLong = bean.attributeValue("useLong");
				String className = bean.attributeValue("class");
				desc = bean.attributeValue("desc");
				/*String local = bean.attributeValue("local");
				if(local!=null && "1".equals(local)){
					if(!ServerProperties.localmode) continue;
				}*/
				if(!StringUtils.isBlank(useLong) && "true".equals(useLong)) {
					uselong = true;
				}
				if(pf == null) pf = "PF_ALL";
				String type = (String)ServerEventFunction.getClassKey(key,scheduleKeyclassName);
//				System.err.println("classStr:"+className);
				List<?> elements = bean.elements();
				int size = elements.size();
				for(int i=0;i<size;i++){
					Element property = (Element) elements.get(i);
					String methodStr = property.attributeValue("method");
					
					String[] pfSplit = pf.split(PfConst.SPLIT_PF);
					for(String pstr:pfSplit) {
						String p = (String)ServerEventFunction.getClassKey(pstr,pfKeyclassName);
						List<ScheduleSmodel>list = pfScheduleMap.get(p);
						if(list == null) {
							list = new ArrayList<ScheduleSmodel>();
							pfScheduleMap.put(p, list);
						}
						list.add(new ScheduleSmodel(className, desc, p, type, delay, interval, uselong, methodStr));
					}
					
				}
			}
		} catch (Exception e) {
			throw new RunServerException(e, "readConfig exception");
		}
	}
	/**
	 * Demo描述:
	 * 线程池(ThreadPoolExecutor)及其拒绝策略(RejectedExecutionHandler)使用示例
	 * 
	 * 工作原理:
	 * 线程池的工作中主要涉及到:corePoolSize,workQueue,maximumPoolSize,RejectedExecutionHandler
	 * 它们的调用原理:
	 * 1 当线程池中线程数量小于corePoolSize则创建线程,并处理请求
	 * 2 当线程池中线程数量等于corePoolSize则把请求放入workQueue中,线程池中的的空闲线程就从workQueue中取任务并处理
	 * 3 当workQueue已满存放不下新入的任务时则新建线程入池,并处理请求;
	 *   如果线程池中线程数大于maximumPoolSize则用RejectedExecutionHandler使用一定的策略来做拒绝处理
	 * 
	 * 在该机制中还有一个keepAliveTime,文档描述如下:
	 * when the number of threads is greater than the core, 
	 * this is the maximum time that excess idle threads will wait for new tasks before terminating.
	 * 它是什么意思呢？
	 * 比如线程池中一共有5个线程,其中3个为核心线程(core)其余两个为非核心线程.
	 * 当超过一定时间(keepAliveTime)非核心线程仍然闲置(即没有执行任务或者说没有任务可执行)那么该非核心线程就会被终止.
	 * 即线程池中的非核心且空闲线程所能持续的最长时间,超过该时间后该线程被终止.
	 * 
	 * 
	 * RejectedExecutionHandler的四种拒绝策略
	 * 
	 * hreadPoolExecutor.AbortPolicy:
	 * 当线程池中的数量等于最大线程数时抛出java.util.concurrent.RejectedExecutionException异常.
	 * 涉及到该异常的任务也不会被执行.
	 * 
	 * ThreadPoolExecutor.CallerRunsPolicy():
	 * 当线程池中的数量等于最大线程数时,重试添加当前的任务;它会自动重复调用execute()方法
	 * 
	 * ThreadPoolExecutor.DiscardOldestPolicy():
	 * 当线程池中的数量等于最大线程数时,抛弃线程池中工作队列头部的任务(即等待时间最久Oldest的任务),并执行新传入的任务
	 * 
	 * ThreadPoolExecutor.DiscardPolicy():
	 * 当线程池中的数量等于最大线程数时,丢弃不能执行的新加任务
	 * */
	public static void testThreadPool() throws InterruptedException{
		
		ThreadPoolExecutor executor = new ThreadPoolExecutor(Runtime.getRuntime().availableProcessors(), Runtime.getRuntime().availableProcessors()+10, 10, TimeUnit.SECONDS, 
				new ArrayBlockingQueue<Runnable>(300),
				
				new ThreadFactory() {
					AtomicInteger sn = new AtomicInteger();
					public Thread newThread(Runnable r) {
						SecurityManager s = System.getSecurityManager();
						ThreadGroup group = (s != null) ? s.getThreadGroup(): Thread.currentThread().getThreadGroup();
						Thread t = new Thread(group, r);
						t.setName("crossChannelEx - " + sn.incrementAndGet());
						return t;
					}
				},
				
				new RejectedExecutionHandler() {
					
					@Override
					public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
						if (!executor.isShutdown()) {
//							Runnable poll = executor.getQueue().poll();
							System.err.println("remove task:"+r);
//							executor.execute(r);
			            }						
					}
				});
		while(true){
			Runnable runnable = new Runnable() {
				@Override
				public void run() {
					System.err.println("hi:"+Thread.currentThread().getName()+",task:"+this);
				}
			};
//			System.err.println(runnable);
			try {
				executor.execute(runnable);
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				Thread.sleep(5);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void main(String[] args) throws InterruptedException {
		testThreadPool();
	}
}
