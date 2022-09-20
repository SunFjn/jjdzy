package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_cjdj3_010;
public class Config_cjdj3_010 extends ConfigBase<Struct_cjdj3_010> {
    private static Config_cjdj3_010 ins = null;
    public static Config_cjdj3_010 getIns(){
        if(ins==null){
            ins = new Config_cjdj3_010();
        }
        return ins;
    }
    private Config_cjdj3_010(){
        put(1,new Struct_cjdj3_010(1,1,30,"[[1,412001,10]]",49001,1));
        put(2,new Struct_cjdj3_010(2,2,100,"[[1,400135,1]]",49002,1));
        put(3,new Struct_cjdj3_010(3,3,188,"[[1,440002,1]]",49003,1));
        put(4,new Struct_cjdj3_010(4,4,388,"[[1,400029,1]]",49004,1));
        put(5,new Struct_cjdj3_010(5,5,588,"[[1,440006,1]]",49005,1));
        put(6,new Struct_cjdj3_010(6,6,988,"[[1,400136,1]]",49006,1));
        put(7,new Struct_cjdj3_010(7,7,1688,"[[1,400137,1]]",49007,1));
        put(8,new Struct_cjdj3_010(8,8,2688,"[[1,440007,1]]",49008,1));
        put(1001,new Struct_cjdj3_010(1001,1,30,"[[1,412001,10]]",49009,2));
        put(1002,new Struct_cjdj3_010(1002,2,100,"[[1,400135,1]]",49010,2));
        put(1003,new Struct_cjdj3_010(1003,3,188,"[[1,440012,1]]",49011,2));
        put(1004,new Struct_cjdj3_010(1004,4,388,"[[1,400029,1]]",49012,2));
        put(1005,new Struct_cjdj3_010(1005,5,588,"[[1,440009,1]]",49013,2));
        put(1006,new Struct_cjdj3_010(1006,6,988,"[[1,400136,1]]",49014,2));
        put(1007,new Struct_cjdj3_010(1007,7,1688,"[[1,400137,1]]",49015,2));
        put(1008,new Struct_cjdj3_010(1008,8,2688,"[[1,440014,1]]",49016,2));
        put(2001,new Struct_cjdj3_010(2001,1,30,"[[1,412001,10]]",49017,3));
        put(2002,new Struct_cjdj3_010(2002,2,100,"[[1,400135,1]]",49018,3));
        put(2003,new Struct_cjdj3_010(2003,3,188,"[[1,440008,1]]",49019,3));
        put(2004,new Struct_cjdj3_010(2004,4,388,"[[1,400029,1]]",49020,3));
        put(2005,new Struct_cjdj3_010(2005,5,588,"[[1,440011,1]]",49021,3));
        put(2006,new Struct_cjdj3_010(2006,6,988,"[[1,400136,1]]",49022,3));
        put(2007,new Struct_cjdj3_010(2007,7,1688,"[[1,400137,1]]",49023,3));
        put(2008,new Struct_cjdj3_010(2008,8,2688,"[[1,440010,1]]",49024,3));
    }
    public void reset(){
        ins = null;
    }
}