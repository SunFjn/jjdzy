package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_VIPbc_710;
public class Config_VIPbc_710 extends ConfigBase<Struct_VIPbc_710> {
    private static Config_VIPbc_710 ins = null;
    public static Config_VIPbc_710 getIns(){
        if(ins==null){
            ins = new Config_VIPbc_710();
        }
        return ins;
    }
    private Config_VIPbc_710(){
        put(3,new Struct_VIPbc_710(3,"0"));
        put(4,new Struct_VIPbc_710(4,"0"));
        put(5,new Struct_VIPbc_710(5,"[[1,471002,1],[1,410006,5]]"));
        put(6,new Struct_VIPbc_710(6,"[[1,410102,40],[1,410006,5]]"));
        put(7,new Struct_VIPbc_710(7,"[[1,410102,80],[1,410006,15]]"));
        put(8,new Struct_VIPbc_710(8,"[[1,440009,1],[1,410006,15]]"));
        put(9,new Struct_VIPbc_710(9,"[[1,410109,60],[1,410006,30]]"));
        put(10,new Struct_VIPbc_710(10,"[[1,410109,80],[1,410006,50],[1,400029,4]]"));
        put(11,new Struct_VIPbc_710(11,"[[1,410109,100],[1,410006,75],[1,400030,4]]"));
        put(12,new Struct_VIPbc_710(12,"[[1,410109,120],[1,410006,90],[1,400031,3]]"));
        put(13,new Struct_VIPbc_710(13,"[[1,471009,1],[1,410006,120],[1,400032,3]]"));
        put(14,new Struct_VIPbc_710(14,"[[1,440007,1],[1,431224,1],[1,410006,150],[1,400033,3]]"));
        put(15,new Struct_VIPbc_710(15,"[[1,434008,1],[1,400901,160],[1,410006,180],[1,400034,3]]"));
        put(16,new Struct_VIPbc_710(16,"0"));
        put(17,new Struct_VIPbc_710(17,"0"));
        put(18,new Struct_VIPbc_710(18,"0"));
        put(19,new Struct_VIPbc_710(19,"0"));
        put(20,new Struct_VIPbc_710(20,"0"));
    }
    public void reset(){
        ins = null;
    }
}