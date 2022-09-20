package excel.struct;
/**
 * S_306_神装洗练表.xlsx
 */
public class Struct_szxl_306 {
    /**阶级
	 * 1xxx:为1阶神装
	 * xxx1：为气血
	 * xxx2：为攻击
	 * xxx3：为防御*/
    private int star;
    /**洗练属性最小值*/
    private int min;
    /**洗练属性最大值*/
    private int max;
    /**
     * 阶级
	 * 1xxx:为1阶神装
	 * xxx1：为气血
	 * xxx2：为攻击
	 * xxx3：为防御
     */
    public int getStar() {
        return star;
    }
    /**
     * 洗练属性最小值
     */
    public int getMin() {
        return min;
    }
    /**
     * 洗练属性最大值
     */
    public int getMax() {
        return max;
    }
    public Struct_szxl_306(int star,int min,int max) {
        this.star = star;
        this.min = min;
        this.max = max;
    }
}