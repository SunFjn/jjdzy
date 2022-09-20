package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cbg2_729;
public class Config_cbg2_729 extends ConfigBase<Struct_cbg2_729> {
    private static Config_cbg2_729 ins = null;
    public static Config_cbg2_729 getIns(){
        if(ins==null){
            ins = new Config_cbg2_729();
        }
        return ins;
    }
    private Config_cbg2_729(){
        put(1,new Struct_cbg2_729(1,200,"[[1,400135,1]]",1,2));
        put(2,new Struct_cbg2_729(2,1000,"[[1,440002,1]]",1,2));
        put(3,new Struct_cbg2_729(3,2000,"[[1,440011,1]]",1,2));
        put(4,new Struct_cbg2_729(4,3000,"[[1,400887,1]]",1,2));
        put(5,new Struct_cbg2_729(5,200,"[[1,400135,1]]",2,3));
        put(6,new Struct_cbg2_729(6,1000,"[[1,440008,1]]",2,3));
        put(7,new Struct_cbg2_729(7,2000,"[[1,440009,1]]",2,3));
        put(8,new Struct_cbg2_729(8,3000,"[[1,400887,1]]",2,3));
        put(9,new Struct_cbg2_729(9,200,"[[1,400135,1]]",3,4));
        put(10,new Struct_cbg2_729(10,1000,"[[1,440002,1]]",3,4));
        put(11,new Struct_cbg2_729(11,2000,"[[1,440006,1]]",3,4));
        put(12,new Struct_cbg2_729(12,3000,"[[1,400887,1]]",3,4));
        put(13,new Struct_cbg2_729(13,200,"[[1,400135,1]]",4,1));
        put(14,new Struct_cbg2_729(14,1000,"[[1,440012,1]]",4,1));
        put(15,new Struct_cbg2_729(15,2000,"[[1,440004,1]]",4,1));
        put(16,new Struct_cbg2_729(16,3000,"[[1,400887,1]]",4,1));
    }
    public void reset(){
        ins = null;
    }
}