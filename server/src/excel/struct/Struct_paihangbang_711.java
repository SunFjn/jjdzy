package excel.struct;
/**
 * P_711_排行榜.xlsx
 */
public class Struct_paihangbang_711 {
    /**类型
	 * 1等级 
	 * 2战力 
	 * 3铜雀台
	 * 4战神
	 * 5装备
	 * 6战甲
	 * 7武将
	 * 8图鉴
	 * 9天书
	 * 10神装
	 * 11神剑
	 * 12兵法
	 * 13宝物*/
    private int TYPE;
    /**第1名称号激活*/
    private int ONE;
    /**2-10称号激活*/
    private int OTHER;
    /**
     * 类型
	 * 1等级 
	 * 2战力 
	 * 3铜雀台
	 * 4战神
	 * 5装备
	 * 6战甲
	 * 7武将
	 * 8图鉴
	 * 9天书
	 * 10神装
	 * 11神剑
	 * 12兵法
	 * 13宝物
     */
    public int getTYPE() {
        return TYPE;
    }
    /**
     * 第1名称号激活
     */
    public int getONE() {
        return ONE;
    }
    /**
     * 2-10称号激活
     */
    public int getOTHER() {
        return OTHER;
    }
    public Struct_paihangbang_711(int TYPE,int ONE,int OTHER) {
        this.TYPE = TYPE;
        this.ONE = ONE;
        this.OTHER = OTHER;
    }
}