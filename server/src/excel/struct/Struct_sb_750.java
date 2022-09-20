package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * S_750_专属神兵表.xlsx
 */
public class Struct_sb_750 {
    /**编号
	 * 
	 * Axxx
	 * A：武将职业  支持两位数
	 * xxx（500）：武将初始神兵*/
    private int bianhao;
    /**职业
	 * 对应武将职业*/
    private int type;
    /**名称*/
    private String name;
    /**神兵激活（升星）
	 * 1,道具ID,数量*/
    private int[][] activation;
    /**玄铁上限
	 * 每升1星+X百炼玄铁上限*/
    private int max1;
    /**陨铁上限
	 * 每升1星提升X天外陨铁上限*/
    private int max2;
    /**神铁上限
	 * 每升1星提升X太初神铁上限
	 * 填0的表示不可以吞噬神铁，不显示神铁吞噬入口*/
    private int max3;
    /**品质*/
    private int pinzhi;
    /**升星上限*/
    private int shengxing;
    /**淬炼上限
	 * 等级*/
    private int cuilian;
    /**
     * 编号
	 * 
	 * Axxx
	 * A：武将职业  支持两位数
	 * xxx（500）：武将初始神兵
     */
    public int getBianhao() {
        return bianhao;
    }
    /**
     * 职业
	 * 对应武将职业
     */
    public int getType() {
        return type;
    }
    /**
     * 名称
     */
    public String getName() {
        return name;
    }
    /**
     * 神兵激活（升星）
	 * 1,道具ID,数量
     */
    public int[][] getActivation() {
        return activation;
    }
    /**
     * 玄铁上限
	 * 每升1星+X百炼玄铁上限
     */
    public int getMax1() {
        return max1;
    }
    /**
     * 陨铁上限
	 * 每升1星提升X天外陨铁上限
     */
    public int getMax2() {
        return max2;
    }
    /**
     * 神铁上限
	 * 每升1星提升X太初神铁上限
	 * 填0的表示不可以吞噬神铁，不显示神铁吞噬入口
     */
    public int getMax3() {
        return max3;
    }
    /**
     * 品质
     */
    public int getPinzhi() {
        return pinzhi;
    }
    /**
     * 升星上限
     */
    public int getShengxing() {
        return shengxing;
    }
    /**
     * 淬炼上限
	 * 等级
     */
    public int getCuilian() {
        return cuilian;
    }
    public Struct_sb_750(int bianhao,int type,String name,String activation,int max1,int max2,int max3,int pinzhi,int shengxing,int cuilian) {
        this.bianhao = bianhao;
        this.type = type;
        this.name = name;
        this.activation = ExcelJsonUtils.toObj(activation,int[][].class);
        this.max1 = max1;
        this.max2 = max2;
        this.max3 = max3;
        this.pinzhi = pinzhi;
        this.shengxing = shengxing;
        this.cuilian = cuilian;
    }
}