package com.teamtop.util.common;

import java.io.Serializable;
import java.util.Collection;
import java.util.Iterator;
import java.util.Set;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 线程安全的HashSet,基于ConcurrentHashMap实现
 */
public class ConcurrentHashSet<T> implements Set<T>,Serializable {

	private static final long serialVersionUID = 1L;
	private ConcurrentHashMap<T, T> map = new ConcurrentHashMap<T, T>();

	@Override
	public boolean add(T e) {
		if (map.containsKey(e)) {
			return false;
		}
		map.put(e, e);
		return true;
	}

	@Override
	public boolean addAll(Collection<? extends T> c) {
		boolean flag = false;
		for (T e : c) {
			map.put(e, e);
			flag = true;
		}
		return flag;
	}

	@Override
	public void clear() {
		map.clear();
	}

	@Override
	public boolean contains(Object o) {
		return map.containsKey(o);
	}

	@Override
	public boolean containsAll(Collection<?> c) {
		return map.keySet().containsAll(c);
	}

	@Override
	public boolean isEmpty() {
		return map.isEmpty();
	}

	@Override
	public Iterator<T> iterator() {
		return map.keySet().iterator();
	}

	@Override
	public boolean remove(Object o) {
		if (!map.containsKey(o))
			return false;

		map.remove(o);
		return true;
	}

	@Override
	public boolean removeAll(Collection<?> c) {
		boolean flag = false;
		for (Object e : c) {
			map.remove(e);
			flag = true;
		}
		return flag;
	}

	@Override
	public boolean retainAll(Collection<?> c) {
		Iterator<Entry<T, T>> it = map.entrySet().iterator();
		Entry<T, T> e;
		boolean flag = false;
		while (it.hasNext()) {
			e = it.next();
			if (!c.contains(e.getKey())) {
				it.remove();
				flag = true;
			}
		}
		return flag;
	}

	@Override
	public int size() {
		return map.keySet().size();
	}

	@Override
	public Object[] toArray() {

		return map.keySet().toArray();
	}

	@Override
	public <E> E[] toArray(E[] a) {
		return map.keySet().toArray(a);
	}

}
