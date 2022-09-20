package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_jrscsxb_334;
public class Config_jrscsxb_334 extends ConfigBase<Struct_jrscsxb_334> {
    private static Config_jrscsxb_334 ins = null;
    public static Config_jrscsxb_334 getIns(){
        if(ins==null){
            ins = new Config_jrscsxb_334();
        }
        return ins;
    }
    private Config_jrscsxb_334(){
        put(1,new Struct_jrscsxb_334(1,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(2,new Struct_jrscsxb_334(2,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(3,new Struct_jrscsxb_334(3,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(4,new Struct_jrscsxb_334(4,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(5,new Struct_jrscsxb_334(5,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(6,new Struct_jrscsxb_334(6,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(7,new Struct_jrscsxb_334(7,"[[4,0,12500]]","[[4,0,15000]]",999,6));
        put(8,new Struct_jrscsxb_334(8,"[[4,0,12500]]","[[4,0,15000]]",999,6));
    }
    public void reset(){
        ins = null;
    }
}