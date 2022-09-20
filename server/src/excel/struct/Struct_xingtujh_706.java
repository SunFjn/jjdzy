package excel.struct;
/**
 * X_706_星图激活表.xlsx
 */
public class Struct_xingtujh_706 {
    /**类型
	 * */
    private int type;
    /**激活条件
	 * 对应转生表的key*/
    private int condition;
    /**
     * 类型
	 * 
     */
    public int getType() {
        return type;
    }
    /**
     * 激活条件
	 * 对应转生表的key
     */
    public int getCondition() {
        return condition;
    }
    public Struct_xingtujh_706(int type,int condition) {
        this.type = type;
        this.condition = condition;
    }
}