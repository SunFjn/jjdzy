package excel.config;
import com.teamtop.util.excel.ConfigBase;
import excel.struct.Struct_kuafu_200;
public class Config_kuafu_200 extends ConfigBase<Struct_kuafu_200> {
    private static Config_kuafu_200 ins = null;
    public static Config_kuafu_200 getIns(){
        if(ins==null){
            ins = new Config_kuafu_200();
        }
        return ins;
    }
    private Config_kuafu_200(){
        put(10001,new Struct_kuafu_200(10001,"[[1,12]]","test01",11001,0,0));
        put(10002,new Struct_kuafu_200(10002,"[[13,24]]","test01",11002,0,0));
        put(10003,new Struct_kuafu_200(10003,"[[25,36]]","test01",11003,0,0));
        put(10004,new Struct_kuafu_200(10004,"[[37,48]]","test01",11004,0,0));
        put(20001,new Struct_kuafu_200(20001,"[[1,12]]","fxzjsg01",12001,0,0));
        put(20002,new Struct_kuafu_200(20002,"[[13,24]]","fxzjsg01",12002,0,0));
        put(20003,new Struct_kuafu_200(20003,"[[25,36]]","fxzjsg01",12003,0,0));
        put(20004,new Struct_kuafu_200(20004,"[[37,48]]","fxzjsg01",12004,0,0));
        put(20005,new Struct_kuafu_200(20005,"[[49,60]]","fxzjsg01",12005,0,0));
        put(20006,new Struct_kuafu_200(20006,"[[61,72]]","fxzjsg01",12006,0,0));
        put(20007,new Struct_kuafu_200(20007,"[[73,84]]","fxzjsg01",12007,0,0));
        put(20008,new Struct_kuafu_200(20008,"[[85,96]]","fxzjsg01",12008,0,0));
        put(20009,new Struct_kuafu_200(20009,"[[97,108]]","fxzjsg01",12009,0,0));
        put(30001,new Struct_kuafu_200(30001,"[[1,12]]","elbt01",13001,0,0));
        put(30002,new Struct_kuafu_200(30002,"[[13,24]]","elbt01",13002,0,0));
        put(30003,new Struct_kuafu_200(30003,"[[25,36]]","elbt01",13003,0,0));
        put(30004,new Struct_kuafu_200(30004,"[[37,48]]","elbt01",13004,0,0));
        put(30005,new Struct_kuafu_200(30005,"[[49,60]]","elbt01",13005,0,0));
        put(30006,new Struct_kuafu_200(30006,"[[61,72]]","elbt01",13006,0,0));
        put(30007,new Struct_kuafu_200(30007,"[[73,84]]","elbt01",13007,0,0));
        put(30008,new Struct_kuafu_200(30008,"[[85,96]]","elbt01",13008,0,0));
        put(30009,new Struct_kuafu_200(30009,"[[97,108]]","elbt01",13009,0,0));
        put(30010,new Struct_kuafu_200(30010,"[[109,120]]","elbt01",13010,0,0));
        put(30011,new Struct_kuafu_200(30011,"[[121,132]]","elbt01",13011,0,0));
        put(30012,new Struct_kuafu_200(30012,"[[133,144]]","elbt01",13012,0,0));
        put(30013,new Struct_kuafu_200(30013,"[[145,156]]","elbt01",13013,0,0));
        put(30014,new Struct_kuafu_200(30014,"[[157,168]]","elbt01",13014,0,0));
        put(30015,new Struct_kuafu_200(30015,"[[169,180]]","elbt01",13015,0,0));
        put(30016,new Struct_kuafu_200(30016,"[[181,192]]","elbt01",13016,0,0));
        put(30017,new Struct_kuafu_200(30017,"[[193,204]]","elbt01",13017,0,0));
        put(30018,new Struct_kuafu_200(30018,"[[205,216]]","elbt01",13018,0,0));
        put(30019,new Struct_kuafu_200(30019,"[[217,228]]","elbt01",13019,0,0));
        put(30020,new Struct_kuafu_200(30020,"[[229,240]]","elbt01",13020,0,0));
        put(30021,new Struct_kuafu_200(30021,"[[241,252]]","elbt01",13021,0,0));
        put(30022,new Struct_kuafu_200(30022,"[[253,264]]","elbt01",13022,0,0));
        put(30023,new Struct_kuafu_200(30023,"[[265,276]]","elbt01",13023,0,0));
        put(30024,new Struct_kuafu_200(30024,"[[277,288]]","elbt01",13024,0,0));
        put(30025,new Struct_kuafu_200(30025,"[[289,300]]","elbt01",13025,0,0));
        put(30026,new Struct_kuafu_200(30026,"[[301,312]]","elbt01",13026,0,0));
    }
    public void reset(){
        ins = null;
    }
}