package excel.struct;
/**
 * C_101_常数配置表.xlsx
 */
public class Struct_changshu_101 {
    /**记录ID*/
    private int id;
    /**常数名*/
    private String changshuming;
    /**常数值
	 * 以下到2001数值要除以100000*/
    private int num;
    /**
     * 记录ID
     */
    public int getId() {
        return id;
    }
    /**
     * 常数名
     */
    public String getChangshuming() {
        return changshuming;
    }
    /**
     * 常数值
	 * 以下到2001数值要除以100000
     */
    public int getNum() {
        return num;
    }
    public Struct_changshu_101(int id,String changshuming,int num) {
        this.id = id;
        this.changshuming = changshuming;
        this.num = num;
    }
}