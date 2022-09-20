package excel.struct;
/**
 * Z_305_诸将演武掉落表.xlsx
 */
public class Struct_zjywdl_005 {
    /**武将模型ID
	 * 读【W_211_武将表.xlsx】-头像*/
    private int mxid;
    /**武将名字*/
    private String name;
    /**复刻血量比例*/
    private int rate;
    /**品质
	 * 1：白
	 * 2、绿
	 * 3、蓝
	 * 4、紫
	 * 5、橙
	 * 6、红*/
    private int quality;
    /**挑战未激活武将消耗演武令*/
    private int cost;
    /**BOSS掉落
	 * 【A,B,C,D]
	 * A=类型
	 * B=id
	 * C=数量
	 * D=概率
	 * */
    private String bd;
    /**
     * 武将模型ID
	 * 读【W_211_武将表.xlsx】-头像
     */
    public int getMxid() {
        return mxid;
    }
    /**
     * 武将名字
     */
    public String getName() {
        return name;
    }
    /**
     * 复刻血量比例
     */
    public int getRate() {
        return rate;
    }
    /**
     * 品质
	 * 1：白
	 * 2、绿
	 * 3、蓝
	 * 4、紫
	 * 5、橙
	 * 6、红
     */
    public int getQuality() {
        return quality;
    }
    /**
     * 挑战未激活武将消耗演武令
     */
    public int getCost() {
        return cost;
    }
    /**
     * BOSS掉落
	 * 【A,B,C,D]
	 * A=类型
	 * B=id
	 * C=数量
	 * D=概率
	 * 
     */
    public String getBd() {
        return bd;
    }
    public Struct_zjywdl_005(int mxid,String name,int rate,int quality,int cost,String bd) {
        this.mxid = mxid;
        this.name = name;
        this.rate = rate;
        this.quality = quality;
        this.cost = cost;
        this.bd = bd;
    }
}