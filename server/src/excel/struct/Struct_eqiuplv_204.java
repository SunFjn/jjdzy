package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_204_装备升级表.xlsx
 */
public class Struct_eqiuplv_204 {
    /**装备id
	 * 神装为92开头id
	 * 
	 * 个位数id用作区分装备部位
	 * 0：武器
	 * 1：帽子
	 * 2：衣服
	 * 3：护手
	 * 4：腰带
	 * 5：鞋子
	 * 6：项链
	 * 7：手镯
	 * 8：戒指
	 * 9：饰品
	 * 
	 * 十位数id用作区分装备品质
	 * 123456：白绿蓝紫橙红
	 * 
	 * 百位数以上用作区分装备等级
	 * 000:0级
	 * 100：10级
	 * 200:20级*/
    private int id;
    /**本阶合成所需*/
    private int[][] compose;
    /**部位id*/
    private int buwei;
    /**上一阶*/
    private int up;
    /**
     * 装备id
	 * 神装为92开头id
	 * 
	 * 个位数id用作区分装备部位
	 * 0：武器
	 * 1：帽子
	 * 2：衣服
	 * 3：护手
	 * 4：腰带
	 * 5：鞋子
	 * 6：项链
	 * 7：手镯
	 * 8：戒指
	 * 9：饰品
	 * 
	 * 十位数id用作区分装备品质
	 * 123456：白绿蓝紫橙红
	 * 
	 * 百位数以上用作区分装备等级
	 * 000:0级
	 * 100：10级
	 * 200:20级
     */
    public int getId() {
        return id;
    }
    /**
     * 本阶合成所需
     */
    public int[][] getCompose() {
        return compose;
    }
    /**
     * 部位id
     */
    public int getBuwei() {
        return buwei;
    }
    /**
     * 上一阶
     */
    public int getUp() {
        return up;
    }
    public Struct_eqiuplv_204(int id,String compose,int buwei,int up) {
        this.id = id;
        this.compose = ExcelJsonUtils.toObj(compose,int[][].class);
        this.buwei = buwei;
        this.up = up;
    }
}