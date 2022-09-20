package com.teamtop.system.battle;

import java.util.HashMap;
import java.util.Iterator;



/**
 * 战斗发送的数据
 * @author Administrator
 *
 */
public class BD extends HashMap<String, Object>{
	private int id;
	private static final long serialVersionUID = 1L;
	public BD() {
		super(5);
	}
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = super.hashCode();
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (getClass() != obj.getClass())
			return false;
		BD other = (BD) obj;
		if (id != other.id)
			return false;
		return true;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public BD put(String k,Object v){
		super.put(k, v);
		return this;
	}
    public String toString() {
        Iterator<Entry<String,Object>> i = entrySet().iterator();
        if (! i.hasNext())
            return "{}";

        StringBuilder sb = new StringBuilder();
        sb.append('{');
        for (;;) {
            Entry<String,Object> e = i.next();
            String key = e.getKey();
            Object value = e.getValue();
            sb.append("\"").append(key).append("\"");
            sb.append(':');
            if(value instanceof String){
            	sb.append("\"").append(value).append("\"");
            }else{
            	sb.append(value);
            }
            if (! i.hasNext())
                return sb.append('}').append("\n").toString();
            sb.append(',');
        }
    }
	public static void main(String[] args) {
		/*BDL l = new BDL();
		for(int i=1;i<=5;i++){
			BD m = new BD();
			m.put("type", "stand");
			m.put("id", 1);
			m.put("force", 2);
			m.put("userid", 1);
			m.put("unitytype", 1);
			m.put("bodyid", 100);
			m.put("pos", i);
			m.put("name", "name");
			Integer[][] route=new Integer[][]{{0,0},{0,0}};
			m.put("route", Arrays.deepToString(route));
			l.add(m);
		}
		BD b = new BD();
		b.put("type", "c_u");
		b.put("results", l);
		operas.add(b);
		
		operas.add(new BD().put("type", "round").put("index", 1));
		operas.add(new BD().put("type", "b_f").put("buffid", 1001).put("results", new BDL().add(
				new BD().put("type", "dmg").put("id", -1).put("dmgVal", 1000).put("targetHp", 2000))));*/
		
		BD c_fbuff = new BD();
		
		BD notice=new BD();
		
		//notice.put(GangRule.NOTICE_TYPE, GangRule.QUIT);
		
		//operas.add(buffL);
		System.err.println(notice.toString());
	}
}

