package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_qxzlstore_273;
public class Config_qxzlstore_273 extends ConfigBase<Struct_qxzlstore_273> {
    private static Config_qxzlstore_273 ins = null;
    public static Config_qxzlstore_273 getIns(){
        if(ins==null){
            ins = new Config_qxzlstore_273();
        }
        return ins;
    }
    private Config_qxzlstore_273(){
        put(1,new Struct_qxzlstore_273(1,"[[1,431218,1]]",1,"[[1,416002,60000]]",2));
        put(2,new Struct_qxzlstore_273(2,"[[1,410086,1]]",2,"[[1,416002,25000]]",2));
        put(3,new Struct_qxzlstore_273(3,"[[1,410088,1]]",3,"[[1,416002,2000]]",20));
        put(4,new Struct_qxzlstore_273(4,"[[1,410085,1]]",4,"[[1,416002,800]]",99));
        put(5,new Struct_qxzlstore_273(5,"[[1,410087,1]]",5,"[[1,416002,250]]",99));
        put(6,new Struct_qxzlstore_273(6,"[[1,400176,1]]",6,"[[1,416002,125]]",99));
        put(7,new Struct_qxzlstore_273(7,"[[1,410051,1]]",7,"[[1,416002,125]]",99));
        put(8,new Struct_qxzlstore_273(8,"[[1,411010,10]]",8,"[[1,416002,60]]",99));
    }
    public void reset(){
        ins = null;
    }
}