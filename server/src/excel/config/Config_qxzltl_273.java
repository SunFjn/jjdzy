package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qxzltl_273;
public class Config_qxzltl_273 extends ConfigBase<Struct_qxzltl_273> {
    private static Config_qxzltl_273 ins = null;
    public static Config_qxzltl_273 getIns(){
        if(ins==null){
            ins = new Config_qxzltl_273();
        }
        return ins;
    }
    private Config_qxzltl_273(){
        put(1,new Struct_qxzltl_273(1,"[[4,0,500]]",50));
        put(2,new Struct_qxzltl_273(2,"[[4,0,500]]",50));
        put(3,new Struct_qxzltl_273(3,"[[4,0,1000]]",50));
        put(4,new Struct_qxzltl_273(4,"[[4,0,1250]]",50));
        put(5,new Struct_qxzltl_273(5,"[[4,0,1500]]",50));
        put(6,new Struct_qxzltl_273(6,"[[4,0,2000]]",50));
        put(7,new Struct_qxzltl_273(7,"[[4,0,2500]]",50));
        put(8,new Struct_qxzltl_273(8,"[[4,0,3250]]",50));
        put(9,new Struct_qxzltl_273(9,"[[4,0,4000]]",50));
        put(10,new Struct_qxzltl_273(10,"[[4,0,5000]]",50));
        put(11,new Struct_qxzltl_273(11,"[[4,0,6000]]",50));
        put(12,new Struct_qxzltl_273(12,"[[4,0,7500]]",50));
        put(13,new Struct_qxzltl_273(13,"[[4,0,10000]]",50));
        put(14,new Struct_qxzltl_273(14,"[[4,0,12500]]",50));
        put(15,new Struct_qxzltl_273(15,"[[4,0,15000]]",50));
    }
    public void reset(){
        ins = null;
    }
}