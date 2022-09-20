package excel.struct;
/**
 * X_500_新活动-擂台比武时间表.xlsx
 */
public class Struct_leitaitime_500 {
    /**场次id*/
    private int id;
    /**开启时间*/
    private String star;
    /**结束时间*/
    private String end;
    /**
     * 场次id
     */
    public int getId() {
        return id;
    }
    /**
     * 开启时间
     */
    public String getStar() {
        return star;
    }
    /**
     * 结束时间
     */
    public String getEnd() {
        return end;
    }
    public Struct_leitaitime_500(int id,String star,String end) {
        this.id = id;
        this.star = star;
        this.end = end;
    }
}