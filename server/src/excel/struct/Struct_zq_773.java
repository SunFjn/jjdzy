package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_773_坐骑表.xlsx
 */
public class Struct_zq_773 {
    /**id*/
    private int id;
    /**激活升星消耗
	 * 0类型：坐骑卡激活
	 * 1类型：普通坐骑星级激活*/
    private int[][] activation;
    /**模型*/
    private int model;
    /**升星上限*/
    private int max;
    /**品质*/
    private int quality;
    /**骑乘条件
	 * 0类型：达到指定星级
	 * 1类型：达到指定阶数*/
    private int tiaojian;
    /**类型
	 * 0 普通坐骑
	 * 1 幻化坐骑*/
    private int type;
    /**移速
	 * 0类型：不读此移速
	 * 1类型：移速*/
    private int speed;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 激活升星消耗
	 * 0类型：坐骑卡激活
	 * 1类型：普通坐骑星级激活
     */
    public int[][] getActivation() {
        return activation;
    }
    /**
     * 模型
     */
    public int getModel() {
        return model;
    }
    /**
     * 升星上限
     */
    public int getMax() {
        return max;
    }
    /**
     * 品质
     */
    public int getQuality() {
        return quality;
    }
    /**
     * 骑乘条件
	 * 0类型：达到指定星级
	 * 1类型：达到指定阶数
     */
    public int getTiaojian() {
        return tiaojian;
    }
    /**
     * 类型
	 * 0 普通坐骑
	 * 1 幻化坐骑
     */
    public int getType() {
        return type;
    }
    /**
     * 移速
	 * 0类型：不读此移速
	 * 1类型：移速
     */
    public int getSpeed() {
        return speed;
    }
    public Struct_zq_773(int id,String activation,int model,int max,int quality,int tiaojian,int type,int speed) {
        this.id = id;
        this.activation = ExcelJsonUtils.toObj(activation,int[][].class);
        this.model = model;
        this.max = max;
        this.quality = quality;
        this.tiaojian = tiaojian;
        this.type = type;
        this.speed = speed;
    }
}