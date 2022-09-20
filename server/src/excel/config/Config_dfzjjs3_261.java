package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_dfzjjs3_261;
public class Config_dfzjjs3_261 extends ConfigBase<Struct_dfzjjs3_261> {
    private static Config_dfzjjs3_261 ins = null;
    public static Config_dfzjjs3_261 getIns(){
        if(ins==null){
            ins = new Config_dfzjjs3_261();
        }
        return ins;
    }
    private Config_dfzjjs3_261(){
        put(1,new Struct_dfzjjs3_261(1,"[[4,0,500]]"));
        put(2,new Struct_dfzjjs3_261(2,"[[4,0,1000]]"));
        put(3,new Struct_dfzjjs3_261(3,"[[4,0,1500]]"));
        put(4,new Struct_dfzjjs3_261(4,"[[4,0,1500]]"));
        put(5,new Struct_dfzjjs3_261(5,"[[4,0,2000]]"));
        put(6,new Struct_dfzjjs3_261(6,"[[4,0,2500]]"));
        put(7,new Struct_dfzjjs3_261(7,"[[4,0,3000]]"));
        put(8,new Struct_dfzjjs3_261(8,"[[4,0,4000]]"));
        put(9,new Struct_dfzjjs3_261(9,"[[4,0,4000]]"));
        put(10,new Struct_dfzjjs3_261(10,"[[4,0,5000]]"));
    }
    public void reset(){
        ins = null;
    }
}