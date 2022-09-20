package com.teamtop.system.queue;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.util.common.CollectionUtil;
import com.teamtop.util.common.Tools;
import com.teamtop.util.time.TimeDateUtil;

/**
 * 队列管理器
 */
public class QueueManager{
	
	//private static Logger logger = LoggerFactory.getLogger(QueueManager.class);

	/**
	 * 队列列表,队列类型-->ID列表
	 */
	public static Map<Integer, LinkedList<Long>> queueMap = new ConcurrentHashMap<Integer, LinkedList<Long>>();
	/**
	 * 队列数据缓存
	 */
	public static Map<Long, Queue> queueData = new ConcurrentHashMap<Long, Queue>();
	
	private static QueueManager ins = null;
	
	/**
	 * 队列id生成器
	 */
	private static AtomicLong queueAutoId = new AtomicLong(0);

	public static QueueManager getInstance(){
		if(ins == null){
			ins = new QueueManager();
		}

		return ins;
	}

	/**
	 * 添加事务到队列缓存
	 * @param queue
	 */
	private void addQueue(Queue queue) {
		addCacheQueue(queue);
	}
	
	/**
	 * 添加任务到队列
	 * @param queueType
	 * @param startTime
	 * @param endTime
	 * @param params
	 * @return
	 */
	public Queue addQueue(int queueType , Long startTime, Long endTime , Object... params) {	
		if(queueAutoId.get() >= Integer.MAX_VALUE){
			queueAutoId.set(0);
		}
		long id = queueAutoId.incrementAndGet();
		Queue queue = new Queue();
		queue.setId(id);
		queue.setStartTime(startTime);
		queue.setEndTime(endTime);
		queue.setType(queueType);
		queue.setParams(Tools.constructArray2String(Tools.DELIMITER_BETWEEN_ITEMS,params));
		addQueue(queue);
		return queue;
	}
	

	/**
	 * 从事务队列缓存删除事务
	 * @param queueId
	 */
	public void deleteQueue(Long queueId) {
		deleteCacheQueue(queueId);
	}

	/*private List<Queue> getQueueList(List<Long> idList) {
		if (CollectionUtil.isEmpty(idList)) {
			return null;
		}
		List<Queue> result = new ArrayList<Queue>(idList.size());
		for (Long id : idList) {
			Queue queue = getQueue(id);
			if (queue != null) {
				result.add(queue);
			}
		}
		return result;
	}
*/
	/**
	 * 将队列加到缓存
	 * 
	 * @param queue
	 */
	private void addCacheQueue(Queue queue) {
		queueData.put(queue.getId(), queue);
		addQueueMapQueue(queue);
	}

	/**
	 * 清空队列
	 */
	/*public void clearCacheQueue(){
		queueMap.clear();
		queueData.clear();
	}*/
	
	/**
	 * 读取开始执行的队列
	 * @param type
	 * @param time
	 * @return
	 */
	public List<Queue> getReadyQueue(int type, Long time) {
		LinkedList<Long> list = queueMap.get(type);
		if (CollectionUtil.isEmpty(list)) {
			return null;
		}
		List<Queue> result = null;
		synchronized (list) {
			ListIterator<Long> iterator = list.listIterator();
			Queue queue;
			while (iterator.hasNext()) {
				queue = getQueue(iterator.next());
				if (queue == null) {
					iterator.remove();
				} else {
					if (queue.getEndTime() <= time) {	
						if (result == null) {
							result = new ArrayList<Queue>();
						}
						iterator.remove();
						queueData.remove(queue.getId());
						if(!result.contains(queue))
							result.add(queue);
					} else {
						break;
					}
				}

			}
		}
		return result;
	}

	/**
	 * 删除缓存数据
	 * 
	 * @param queueId
	 */
	private Queue deleteCacheQueue(long queueId) {
		Queue queue = queueData.remove(queueId);
		if (queue != null) {
			deleteQueueMapQueue(queue);
			return queue;
		}
		return null;
	}

	/**
	 * 删除队列列表中的ID
	 * 
	 * @param queue
	 */
	private boolean deleteQueueMapQueue(Queue queue) {
		LinkedList<Long> list = queueMap.get(queue.getType());
		if (!CollectionUtil.isEmpty(list)) {
			synchronized (list) {
				return list.remove(queue.getId());
			}
		}
		return true;
	}

	/**
	 * 向队列列表添加ID
	 * 
	 * @param queue
	 */
	private void addQueueMapQueue(Queue queue) {
		LinkedList<Long> list = null;
		synchronized (queueMap) {
			list = queueMap.get(queue.getType());
			if (list == null) {
				list = new LinkedList<Long>();
				queueMap.put(queue.getType(), list);
			}
		}
		synchronized (list) {
			ListIterator<Long> iterator = list.listIterator();
			Queue current;
			while (iterator.hasNext()) {
				current = getQueue(iterator.next());
				if (current == null) {
					iterator.remove();
				} else {
					if (queue.getEndTime() < current.getEndTime()) {
						iterator.previous();
						iterator.add(queue.getId());
						return;
					}
				}
			}
			iterator.add(queue.getId());
		}
	}

	
	/**
	 * 读取任务信息
	 * @param queueId
	 * @return
	 */
	public Queue getQueue(long queueId) {
		return queueData.get(queueId);
	}

	/**
	 * 取消任务
	 * @param queueId
	 * @return
	 */
	public int cancelQueue(Long queueId) {
		Queue queue = getQueue(queueId);
		if (queue == null ) {
			return QueueResultCode.NOT_EXIST_QUEUE;
		}
		deleteQueue(queueId);

		return QueueResultCode.SUCCESS;
	}


	/**
	 * 读取任务的剩余时间
	 * @param queueId
	 * @return
	 */
	public long getQueueRemainTime(int queueId) {
		Queue queue = getQueue(queueId);
		if (queue == null) {
			return 0;
		}
		return queue.getEndTime() - TimeDateUtil.getCurrentTime();
	}

}
