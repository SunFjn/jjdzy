package excel.struct;
import com.teamtop.util.excel.ExcelJsonUtils;
/**
 * Z_507_坐骑幻化表.xlsx
 */
public class Struct_horse_507 {
    /**id*/
    private int id;
    /**激活条件
	 * 坐骑id，星级*/
    private int[][] jh;
    /**模型*/
    private int model;
    /**品质*/
    private int quality;
    /**骑乘条件
	 * 达到指定阶数*/
    private int tiaojian;
    /**移速*/
    private int speed;
    /**
     * id
     */
    public int getId() {
        return id;
    }
    /**
     * 激活条件
	 * 坐骑id，星级
     */
    public int[][] getJh() {
        return jh;
    }
    /**
     * 模型
     */
    public int getModel() {
        return model;
    }
    /**
     * 品质
     */
    public int getQuality() {
        return quality;
    }
    /**
     * 骑乘条件
	 * 达到指定阶数
     */
    public int getTiaojian() {
        return tiaojian;
    }
    /**
     * 移速
     */
    public int getSpeed() {
        return speed;
    }
    public Struct_horse_507(int id,String jh,int model,int quality,int tiaojian,int speed) {
        this.id = id;
        this.jh = ExcelJsonUtils.toObj(jh,int[][].class);
        this.model = model;
        this.quality = quality;
        this.tiaojian = tiaojian;
        this.speed = speed;
    }
}