package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_clear_205;
public class Config_clear_205 extends ConfigBase<Struct_clear_205> {
    private static Config_clear_205 ins = null;
    public static Config_clear_205 getIns(){
        if(ins==null){
            ins = new Config_clear_205();
        }
        return ins;
    }
    private Config_clear_205(){
        put(1,new Struct_clear_205(1,"[[4,0,0]]"));
        put(2,new Struct_clear_205(2,"[[4,0,250]]"));
        put(3,new Struct_clear_205(3,"[[4,0,500]]"));
        put(4,new Struct_clear_205(4,"[[4,0,750]]"));
        put(5,new Struct_clear_205(5,"[[4,0,1000]]"));
        put(6,new Struct_clear_205(6,"[[4,0,1250]]"));
        put(7,new Struct_clear_205(7,"[[4,0,1500]]"));
        put(8,new Struct_clear_205(8,"[[4,0,1750]]"));
        put(9,new Struct_clear_205(9,"[[4,0,2000]]"));
        put(10,new Struct_clear_205(10,"[[4,0,2250]]"));
        put(11,new Struct_clear_205(11,"[[4,0,2500]]"));
        put(12,new Struct_clear_205(12,"[[4,0,2750]]"));
        put(13,new Struct_clear_205(13,"[[4,0,3000]]"));
        put(14,new Struct_clear_205(14,"[[4,0,3250]]"));
        put(15,new Struct_clear_205(15,"[[4,0,3500]]"));
        put(16,new Struct_clear_205(16,"[[4,0,3750]]"));
        put(17,new Struct_clear_205(17,"[[4,0,4000]]"));
        put(18,new Struct_clear_205(18,"[[4,0,4250]]"));
        put(19,new Struct_clear_205(19,"[[4,0,4500]]"));
        put(20,new Struct_clear_205(20,"[[4,0,4750]]"));
        put(21,new Struct_clear_205(21,"[[4,0,5000]]"));
        put(22,new Struct_clear_205(22,"[[4,0,5500]]"));
        put(23,new Struct_clear_205(23,"[[4,0,6000]]"));
        put(24,new Struct_clear_205(24,"[[4,0,6500]]"));
        put(25,new Struct_clear_205(25,"[[4,0,7000]]"));
    }
    public void reset(){
        ins = null;
    }
}