package excel.struct;
/**
 * S_750_专属神兵-打造神兵表.xlsx
 */
public class Struct_sbdz_750 {
    /**编号*/
    private int id;
    /**工匠锤普通奖池
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * */
    private String gjpt;
    /**工匠锤高级奖池
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * */
    private String gjgj;
    /**神匠锤奖池*/
    private String sjjc;
    /**
     * 编号
     */
    public int getId() {
        return id;
    }
    /**
     * 工匠锤普通奖池
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * 
     */
    public String getGjpt() {
        return gjpt;
    }
    /**
     * 工匠锤高级奖池
	 * jingyu:
	 * [[A,B,C,D,E]]
	 * A=道具类型
	 * B=道具id
	 * C=道具数量
	 * D=概率
	 * E=是否公告   0不公告  1公告
	 * 
	 * 
     */
    public String getGjgj() {
        return gjgj;
    }
    /**
     * 神匠锤奖池
     */
    public String getSjjc() {
        return sjjc;
    }
    public Struct_sbdz_750(int id,String gjpt,String gjgj,String sjjc) {
        this.id = id;
        this.gjpt = gjpt;
        this.gjgj = gjgj;
        this.sjjc = sjjc;
    }
}