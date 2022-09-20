package excel.struct;
/**
 * L_234_隆中对表.xlsx
 */
public class Struct_lzd_234 {
    /**题目id*/
    private int id;
    /**题目*/
    private String q;
    /**正确答案*/
    private String a;
    /**错误答案1*/
    private String error1;
    /**错误答案2*/
    private String error2;
    /**错误答案3*/
    private String error3;
    /**
     * 题目id
     */
    public int getId() {
        return id;
    }
    /**
     * 题目
     */
    public String getQ() {
        return q;
    }
    /**
     * 正确答案
     */
    public String getA() {
        return a;
    }
    /**
     * 错误答案1
     */
    public String getError1() {
        return error1;
    }
    /**
     * 错误答案2
     */
    public String getError2() {
        return error2;
    }
    /**
     * 错误答案3
     */
    public String getError3() {
        return error3;
    }
    public Struct_lzd_234(int id,String q,String a,String error1,String error2,String error3) {
        this.id = id;
        this.q = q;
        this.a = a;
        this.error1 = error1;
        this.error2 = error2;
        this.error3 = error3;
    }
}