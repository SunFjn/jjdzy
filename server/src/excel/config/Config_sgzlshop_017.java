package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_sgzlshop_017;
public class Config_sgzlshop_017 extends ConfigBase<Struct_sgzlshop_017> {
    private static Config_sgzlshop_017 ins = null;
    public static Config_sgzlshop_017 getIns(){
        if(ins==null){
            ins = new Config_sgzlshop_017();
        }
        return ins;
    }
    private Config_sgzlshop_017(){
        put(1,new Struct_sgzlshop_017(1,1,"[[1,410058,5]]","[[1,412020,100]]",999));
        put(2,new Struct_sgzlshop_017(2,2,"[[1,410059,1]]","[[1,412020,200]]",99));
        put(3,new Struct_sgzlshop_017(3,3,"[[1,410060,1]]","[[1,412020,200]]",99));
        put(4,new Struct_sgzlshop_017(4,4,"[[1,410061,1]]","[[1,412020,200]]",99));
        put(5,new Struct_sgzlshop_017(5,5,"[[1,410062,1]]","[[1,412020,200]]",99));
        put(6,new Struct_sgzlshop_017(6,6,"[[1,410049,1]]","[[1,412020,40]]",999));
        put(7,new Struct_sgzlshop_017(7,7,"[[1,410050,1]]","[[1,412020,300]]",999));
        put(8,new Struct_sgzlshop_017(8,8,"[[1,400919,1]]","[[1,412020,7000]]",6));
        put(9,new Struct_sgzlshop_017(9,9,"[[1,400918,1]]","[[1,412020,15000]]",3));
        put(10,new Struct_sgzlshop_017(10,10,"[[1,400917,1]]","[[1,412021,400]]",2));
        put(11,new Struct_sgzlshop_017(11,11,"[[1,400916,1]]","[[1,412021,1500]]",2));
        put(12,new Struct_sgzlshop_017(12,12,"[[1,400911,1]]","[[1,412021,6000]]",1));
        put(13,new Struct_sgzlshop_017(13,13,"[[1,490021,1]]","[[1,412020,500]]",4));
        put(14,new Struct_sgzlshop_017(14,14,"[[1,490022,1]]","[[1,412020,1000]]",4));
        put(15,new Struct_sgzlshop_017(15,15,"[[1,410053,1]]","[[1,412021,20]]",99));
    }
    public void reset(){
        ins = null;
    }
}