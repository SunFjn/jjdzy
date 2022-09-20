package excel.struct;
/**
 * Z_766_阵眼 - 阵眼效果表.xlsx
 */
public class Struct_zyxg_766 {
    /**效果等级
	 * Axx
	 * A：阵眼id，对应阵眼表
	 * xx阵眼套装等级
	 * 1xx：两仪阵眼
	 * 2xx：四相阵眼
	 * 3xx：九宫阵眼
	 * 4xx：天门阵眼*/
    private int xgdj;
    /**星级要求
	 * 
	 * 对应阵眼升级表id*/
    private int xjyq;
    /**类型
	 * 
	 * 1) 提升红品符文升星上限X；  固定值
	 * 2) 提升红品符文升级上限X；  固定值
	 * 3) 分解符文有X%几率获取双倍经验；  十万分比
	 * 4) 符文升级有X%几率暴击（连升2级） 十万分比
	 * */
    private int lx;
    /**数值*/
    private int sz;
    /**
     * 效果等级
	 * Axx
	 * A：阵眼id，对应阵眼表
	 * xx阵眼套装等级
	 * 1xx：两仪阵眼
	 * 2xx：四相阵眼
	 * 3xx：九宫阵眼
	 * 4xx：天门阵眼
     */
    public int getXgdj() {
        return xgdj;
    }
    /**
     * 星级要求
	 * 
	 * 对应阵眼升级表id
     */
    public int getXjyq() {
        return xjyq;
    }
    /**
     * 类型
	 * 
	 * 1) 提升红品符文升星上限X；  固定值
	 * 2) 提升红品符文升级上限X；  固定值
	 * 3) 分解符文有X%几率获取双倍经验；  十万分比
	 * 4) 符文升级有X%几率暴击（连升2级） 十万分比
	 * 
     */
    public int getLx() {
        return lx;
    }
    /**
     * 数值
     */
    public int getSz() {
        return sz;
    }
    public Struct_zyxg_766(int xgdj,int xjyq,int lx,int sz) {
        this.xgdj = xgdj;
        this.xjyq = xjyq;
        this.lx = lx;
        this.sz = sz;
    }
}