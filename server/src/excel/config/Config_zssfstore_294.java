package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_zssfstore_294;
public class Config_zssfstore_294 extends ConfigBase<Struct_zssfstore_294> {
    private static Config_zssfstore_294 ins = null;
    public static Config_zssfstore_294 getIns(){
        if(ins==null){
            ins = new Config_zssfstore_294();
        }
        return ins;
    }
    private Config_zssfstore_294(){
        put(1,new Struct_zssfstore_294(1,"[[1,416001,1]]","[[20,0,500000]]",1));
        put(2,new Struct_zssfstore_294(2,"[[1,480004,1]]","[[20,0,20000]]",15));
        put(3,new Struct_zssfstore_294(3,"[[1,416036,1]]","[[20,0,40000]]",2));
        put(4,new Struct_zssfstore_294(4,"[[1,410305,5]]","[[20,0,1000]]",99));
        put(5,new Struct_zssfstore_294(5,"[[1,412017,20]]","[[20,0,300]]",999));
        put(6,new Struct_zssfstore_294(6,"[[1,411013,20]]","[[20,0,300]]",999));
    }
    public void reset(){
        ins = null;
    }
}