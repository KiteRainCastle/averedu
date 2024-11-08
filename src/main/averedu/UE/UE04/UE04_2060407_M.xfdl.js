(function()
{
    return function()
    {
        if (!this._is_form)
            return;
        
        var obj = null;
        
        this.on_create = function()
        {
            this.set_name("form");
            this.set_titletext("중복지원자현황");
            if (Form == this.constructor)
            {
                this._setFormPosition(1640,800);
            }
            
            // Object(Dataset, ExcelExportObject) Initialize
            obj = new Dataset("ds_input", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"YYYY\" type=\"STRING\" size=\"10\"/><Column id=\"HAKGI\" type=\"STRING\" size=\"10\"/><Column id=\"JANGHAK_DAESANG_GBCD\" type=\"STRING\" size=\"256\"/><Column id=\"IPSI_HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"GYEYEOL_CD\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"256\"/><Column id=\"JEONGONG_CD\" type=\"STRING\" size=\"256\"/></ColumnInfo><Rows><Row/></Rows>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsBaseYyyyHakgi", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"YYYY\" type=\"STRING\" size=\"256\"/><Column id=\"HAKGI\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearchHakgi", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/><Column id=\"REF_1\" type=\"STRING\" size=\"256\"/><Column id=\"ADDR\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearchDaesang", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/><Column id=\"REF_2\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsMaster", this);
            obj.set_useclientlayout("true");
            obj.set_reversesubsum("false");
            obj._setContents("<ColumnInfo><Column id=\"JANGHAK_YYYY\" type=\"STRING\" size=\"4\"/><Column id=\"HAKGI\" type=\"STRING\" size=\"10\"/><Column id=\"GOGAEK_NO\" type=\"STRING\" size=\"10\"/><Column id=\"RES_NO\" type=\"STRING\" size=\"206\"/><Column id=\"HAKSAENG_NM\" type=\"STRING\" size=\"50\"/><Column id=\"HAKNYEON\" type=\"STRING\" size=\"1\"/><Column id=\"HAKGWA_CD\" type=\"STRING\" size=\"10\"/><Column id=\"HAKBEON\" type=\"STRING\" size=\"10\"/><Column id=\"IPHAK_CHAEKJEONG_GEUMAEK\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"SUEOP_CHAEKJEONG_GEUMAEK\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GISEONGHOE_CHAEKJEONG_GEUMAEK\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"CHAEKJEONG_GEUMAEK\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GUKGA1_JIGEUP_AMT\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GUKGA2_JIGEUP_AMT\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"JUNGSO_JIGEUP_AMT\" type=\"STRING\" size=\"17\"/><Column id=\"GYONAE_JANGHAK_CD_1\" type=\"STRING\" size=\"10\"/><Column id=\"GYONAE_JIGEUP_AMT_1\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GYONAE_JANGHAK_CD_2\" type=\"STRING\" size=\"10\"/><Column id=\"GYONAE_JIGEUP_AMT_2\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GYONAE_JANGHAK_CD_3\" type=\"STRING\" size=\"10\"/><Column id=\"GYONAE_JIGEUP_AMT_3\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GYONAE_JANGHAK_CD_4\" type=\"STRING\" size=\"10\"/><Column id=\"GYONAE_JIGEUP_AMT_4\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GYOOE_JANGHAK_CD_1\" type=\"STRING\" size=\"10\"/><Column id=\"GYOOE_JIGEUP_AMT_1\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GYOOE_JANGHAK_CD_2\" type=\"STRING\" size=\"10\"/><Column id=\"GYOOE_JIGEUP_AMT_2\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"GYOOE_JANGHAK_CD_3\" type=\"STRING\" size=\"10\"/><Column id=\"GYOOE_JIGEUP_AMT_3\" type=\"BIGDECIMAL\" size=\"22\"/><Column id=\"BIGO\" type=\"STRING\" size=\"4\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsGyeyeol", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"GBN\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsHakgwa", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"GBN\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"UP_DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"USE_YN\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsJeongong", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"GBN\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"UP_DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"USE_YN\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsGrdHakgwa", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"GBN\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"UP_DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"USE_YN\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsHakgi", this);
            obj._setContents("<ColumnInfo><Column id=\"CODE\" type=\"STRING\" size=\"32\"/><Column id=\"CODE_NM\" type=\"STRING\" size=\"32\"/><Column id=\"REF_1\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsJanghak", this);
            obj.set_enableevent("true");
            obj.getSetter("firefirstcount").set("0");
            obj.getSetter("firenextcount").set("0");
            obj.set_preload("true");
            obj.set_updatecontrol("true");
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"JANGHAK_CD\" type=\"STRING\" size=\"10\"/><Column id=\"GYONAEOE_GBCD\" type=\"STRING\" size=\"2\"/><Column id=\"JANGHAK_NM\" type=\"STRING\" size=\"100\"/><Column id=\"JANGHAK_YAKEO_NM\" type=\"STRING\" size=\"50\"/><Column id=\"JANGHAK_ENG_NM\" type=\"STRING\" size=\"100\"/><Column id=\"JIWON_GBCD\" type=\"STRING\" size=\"2\"/><Column id=\"JANGHAK_GIGWAN_CD\" type=\"STRING\" size=\"10\"/><Column id=\"JANGHAK_DEUNGGEUP_GBCD\" type=\"STRING\" size=\"5\"/><Column id=\"JANGHAK_GYEYEOL_GBCD\" type=\"STRING\" size=\"2\"/><Column id=\"GUKGA_JANGHAK_MAECHING_CD\" type=\"STRING\" size=\"10\"/><Column id=\"YEONSOK_JANGHAK_YN\" type=\"STRING\" size=\"1\"/><Column id=\"JIGEUP_GIGAN_GBCD\" type=\"STRING\" size=\"10\"/><Column id=\"YEONSOK_MAPPING_JANGHAK_CD\" type=\"STRING\" size=\"10\"/><Column id=\"GOJISEO_POHAM_YN\" type=\"STRING\" size=\"1\"/><Column id=\"HOEGYE_BANYEONG_YN\" type=\"STRING\" size=\"1\"/><Column id=\"HOEGYE_GBCD\" type=\"STRING\" size=\"2\"/><Column id=\"JUNGBOK_SUHYE_YN\" type=\"STRING\" size=\"1\"/><Column id=\"JEOKYONG_DAESANG_GBCD\" type=\"STRING\" size=\"20\"/><Column id=\"HAKSAENG_SINCHEONG_YN\" type=\"STRING\" size=\"1\"/><Column id=\"JECHUL_SEORYU\" type=\"STRING\" size=\"1000\"/><Column id=\"USE_YN\" type=\"STRING\" size=\"1\"/></ColumnInfo>");
            this.addChild(obj.name, obj);


            obj = new Dataset("dsSearchHakgwa", this);
            obj.set_useclientlayout("true");
            obj._setContents("<ColumnInfo><Column id=\"GBN\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"UP_DEPT_CD\" type=\"STRING\" size=\"256\"/><Column id=\"DEPT_NM\" type=\"STRING\" size=\"256\"/><Column id=\"USE_YN\" type=\"STRING\" size=\"256\"/></ColumnInfo>");
            this.addChild(obj.name, obj);
            
            // UI Components Initialize
            obj = new Static("stc_09_00","-3","52",null,"22","1458",null,null,null,null,null,this);
            obj.set_taborder("1");
            obj.set_text("중복지원자 현황");
            obj.set_cssclass("sta_WF_Title02");
            this.addChild(obj.name, obj);

            obj = new Static("staRowCnt","127","51",null,"24","1390",null,null,null,null,null,this);
            obj.set_taborder("2");
            obj.set_text("[총 <fc v=\'red\'><b v=\'true\'>0 </b></fc>건]");
            obj.set_usedecorate("true");
            this.addChild(obj.name, obj);

            obj = new Static("Static01","1110","42","100","35",null,null,null,null,null,null,this);
            obj.set_taborder("3");
            obj.set_text("↑\r\n35\r\n↓");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 7pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_00","10","69",null,"8","0",null,null,null,null,null,this);
            obj.set_taborder("4");
            obj.set_text("8");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.addChild(obj.name, obj);

            obj = new Div("divSearch","0","0",null,"42","0",null,null,null,null,null,this);
            obj.set_taborder("0");
            obj.set_cssclass("div_WF_SearchBox");
            obj.set_text("");
            this.addChild(obj.name, obj);

            obj = new Static("Static01_02_00","0","0","27","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("4");
            obj.set_text("27");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_01_00","26","31",null,"9","0",null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("5");
            obj.set_text("9");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_01_00_00_01","20","0",null,"9","0",null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("6");
            obj.set_text("9");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            obj.set_font("normal 8pt/normal \"Arial\"");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_01_01","87","0","10","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("7");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_01_00_00","-14","9","100","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("8");
            obj.set_text("학년도학기");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Spin("spnSearchYYYY","97","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("0");
            obj.set_cssclass("point");
            obj.set_min("0");
            obj.set_max("3000");
            obj.set_value("");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01_00_00","434","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("9");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchHakgi","192","9","70","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("1");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("ADDR");
            obj.set_innerdataset("dsSearchHakgi");
            obj.set_text("");
            obj.set_value("11");
            obj.set_index("-1");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_01_00_00_01_00","538","3","10","33",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("10");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_01_00_00_00_01","281","9","60","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("11");
            obj.set_text("대상");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_01_01_00_00_00_02","344","0","10","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("12");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01_00_00_01","262","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("13");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_01_00_00_00_01_00","458","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("14");
            obj.set_text("입시학과");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchDaesang","354","9","80","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("2");
            obj.set_codecolumn("CODE");
            obj.set_datacolumn("CODE_NM");
            obj.set_innerdataset("dsSearchDaesang");
            obj.set_cssclass("point");
            obj.set_text("");
            obj.set_value("11");
            obj.set_index("-1");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchIpsiHakgwa","548","9","150","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("3");
            obj.set_codecolumn("DEPT_CD");
            obj.set_datacolumn("DEPT_NM");
            obj.set_innerdataset("dsSearchHakgwa");
            obj.set_text("");
            obj.set_value("11");
            obj.set_index("-1");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01_00_00_00","698","0","56","40",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("15");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_01_00_01","718","9","60","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("16");
            obj.set_text("계열");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_00","779","0","10","34",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("17");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchGyeyeol","789","9","150","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("18");
            obj.set_innerdataset("dsGyeyeol");
            obj.set_codecolumn("DEPT_CD");
            obj.set_datacolumn("DEPT_NM");
            obj.set_text("");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_01_00_00_00","960","9","60","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("19");
            obj.set_text("학과");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01_00_00_00_00","939","4","56","36",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("20");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_01_00_00_00_00_00","1020","6","10","33",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("21");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchHakgwa","1030","9","150","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("22");
            obj.set_codecolumn("DEPT_CD");
            obj.set_datacolumn("DEPT_NM");
            obj.set_innerdataset("dsHakgwa");
            obj.set_text("Combo");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_01_01_00_00_00_00_00","1180","4","56","36",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("23");
            obj.set_text("← 56 →");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Combo("cboSearchJeongong","1271","9","150","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("24");
            obj.set_innerdataset("dsJeongong");
            obj.set_codecolumn("DEPT_CD");
            obj.set_datacolumn("DEPT_NM");
            obj.set_text("Combo");
            obj.set_value("1");
            obj.set_index("0");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_01","1202","9","60","22",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("25");
            obj.set_text("전공");
            obj.set_cssclass("sta_WF_SearchLbl");
            obj.set_textAlign("right");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("Static01_02_00_00_00_00_01_00_00_01_00_00_00","1261","3","10","33",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("26");
            obj.set_text("10");
            obj.set_cssclass("sta_GU_space");
            obj.set_visible("false");
            obj.set_background("aqua");
            obj.set_opacity("0.5");
            obj.set_textAlign("center");
            obj.set_wordWrap("char");
            this.divSearch.addChild(obj.name, obj);

            obj = new Static("stc_63","182","10","10","20",null,null,null,null,null,null,this.divSearch.form);
            obj.set_taborder("27");
            obj.set_text("-");
            this.divSearch.addChild(obj.name, obj);

            obj = new Grid("grdMaster","0","78",null,null,"0","0",null,null,null,null,this);
            obj.set_taborder("5");
            obj.set_binddataset("dsMaster");
            obj._setContents("<Formats><Format id=\"default\"><Columns><Column size=\"30\" band=\"left\"/><Column size=\"40\" band=\"left\"/><Column size=\"50\" band=\"left\"/><Column size=\"90\" band=\"left\"/><Column size=\"110\" band=\"left\"/><Column size=\"70\" band=\"left\"/><Column size=\"30\" band=\"left\"/><Column size=\"120\" band=\"left\"/><Column size=\"80\" band=\"left\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"80\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"100\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"140\"/><Column size=\"80\"/><Column size=\"80\"/></Columns><Rows><Row size=\"30\" band=\"head\"/><Row size=\"50\" band=\"head\"/><Row size=\"30\"/></Rows><Band id=\"head\"><Cell rowspan=\"2\" text=\"NO\" textAlign=\"center\"/><Cell col=\"1\" rowspan=\"2\" text=\"년도\" textAlign=\"center\"/><Cell col=\"2\" rowspan=\"2\" text=\"학기\" textAlign=\"center\"/><Cell col=\"3\" rowspan=\"2\" text=\"고객번호\" textAlign=\"center\"/><Cell col=\"4\" rowspan=\"2\" text=\"주민번호\" textAlign=\"center\"/><Cell col=\"5\" rowspan=\"2\" text=\"성명\" textAlign=\"center\"/><Cell col=\"6\" rowspan=\"2\" text=\"학년\" textAlign=\"center\"/><Cell col=\"7\" rowspan=\"2\" text=\"학과\" textAlign=\"center\"/><Cell col=\"8\" rowspan=\"2\" text=\"학번\" textAlign=\"center\"/><Cell col=\"9\" rowspan=\"2\" text=\"입학금\"/><Cell col=\"10\" rowspan=\"2\" text=\"수업료\"/><Cell col=\"11\" rowspan=\"2\" text=\"기성회비\"/><Cell col=\"12\" rowspan=\"2\" text=\"등록금&#13;&#10;(입학금+기성회비&#13;&#10;+수업료)\"/><Cell col=\"13\" colspan=\"3\" text=\"한국장학재단\"/><Cell col=\"16\" colspan=\"8\" textAlign=\"center\" text=\"교내장학금\"/><Cell col=\"24\" colspan=\"6\" textAlign=\"center\" text=\"교외장학금\"/><Cell col=\"30\" rowspan=\"2\" text=\"비고\" textAlign=\"center\"/><Cell row=\"1\" col=\"13\" text=\"국가장학금 1유형\"/><Cell row=\"1\" col=\"14\" text=\"국가장학금 2유형\"/><Cell row=\"1\" col=\"15\" text=\"중소기업취업연계&#13;&#10;장학금\"/><Cell row=\"1\" col=\"16\" textAlign=\"center\" text=\"장학종류1\"/><Cell row=\"1\" col=\"17\" textAlign=\"center\" text=\"장학금액1\"/><Cell row=\"1\" col=\"18\" textAlign=\"center\" text=\"장학종류2\"/><Cell row=\"1\" col=\"19\" textAlign=\"center\" text=\"장학금액2\"/><Cell row=\"1\" col=\"20\" textAlign=\"center\" text=\"장학종류3\"/><Cell row=\"1\" col=\"21\" textAlign=\"center\" text=\"장학금액3\"/><Cell row=\"1\" col=\"22\" textAlign=\"center\" text=\"장학종류4\"/><Cell row=\"1\" col=\"23\" textAlign=\"center\" text=\"장학금액4\"/><Cell row=\"1\" col=\"24\" textAlign=\"center\" text=\"장학종류1\"/><Cell row=\"1\" col=\"25\" textAlign=\"center\" text=\"장학금액1\"/><Cell row=\"1\" col=\"26\" textAlign=\"center\" text=\"장학종류2\"/><Cell row=\"1\" col=\"27\" textAlign=\"center\" text=\"장학금액2\"/><Cell row=\"1\" col=\"28\" textAlign=\"center\" text=\"장학종류3\"/><Cell row=\"1\" col=\"29\" textAlign=\"center\" text=\"장학금액3\"/></Band><Band id=\"body\"><Cell text=\"expr:currow + 1\"/><Cell col=\"1\" text=\"bind:JANGHAK_YYYY\"/><Cell col=\"2\" text=\"bind:HAKGI\" displaytype=\"combotext\" combodataset=\"dsHakgi\" combodatacol=\"CODE_NM\" combocodecol=\"CODE\"/><Cell col=\"3\" text=\"bind:GOGAEK_NO\"/><Cell col=\"4\" text=\"bind:RES_NO\"/><Cell col=\"5\" text=\"bind:HAKSAENG_NM\"/><Cell col=\"6\" text=\"bind:HAKNYEON\" displaytype=\"number\"/><Cell col=\"7\" text=\"bind:HAKGWA_CD\" displaytype=\"combotext\" combodataset=\"dsGrdHakgwa\" combodatacol=\"DEPT_NM\" combocodecol=\"DEPT_CD\" textAlign=\"left\"/><Cell col=\"8\" text=\"bind:HAKBEON\"/><Cell col=\"9\" displaytype=\"normal\" text=\"bind:IPHAK_CHAEKJEONG_GEUMAEK\" textAlign=\"right\"/><Cell col=\"10\" displaytype=\"normal\" text=\"bind:SUEOP_CHAEKJEONG_GEUMAEK\" textAlign=\"right\"/><Cell col=\"11\" displaytype=\"normal\" text=\"bind:GISEONGHOE_CHAEKJEONG_GEUMAEK\" textAlign=\"right\"/><Cell col=\"12\" displaytype=\"normal\" text=\"bind:CHAEKJEONG_GEUMAEK\" textAlign=\"right\"/><Cell col=\"13\" displaytype=\"normal\" text=\"bind:GUKGA1_JIGEUP_AMT\" combodataset=\"dsJanghak\" combocodecol=\"JANGHAK_CD\" combodatacol=\"JANGHAK_NM\" textAlign=\"right\"/><Cell col=\"14\" text=\"bind:GUKGA2_JIGEUP_AMT\" textAlign=\"right\"/><Cell col=\"15\" displaytype=\"normal\" text=\"bind:JUNGSO_JIGEUP_AMT\" textAlign=\"right\"/><Cell col=\"16\" text=\"bind:GYONAE_JANGHAK_CD_1\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"17\" text=\"bind:GYONAE_JIGEUP_AMT_1\" textAlign=\"right\"/><Cell col=\"18\" text=\"bind:GYONAE_JANGHAK_CD_2\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"19\" text=\"bind:GYONAE_JIGEUP_AMT_2\" textAlign=\"right\"/><Cell col=\"20\" text=\"bind:GYONAE_JANGHAK_CD_3\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"21\" text=\"bind:GYONAE_JIGEUP_AMT_3\" textAlign=\"right\"/><Cell col=\"22\" text=\"bind:GYONAE_JANGHAK_CD_4\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"23\" text=\"bind:GYONAE_JIGEUP_AMT_4\" textAlign=\"right\"/><Cell col=\"24\" text=\"bind:GYOOE_JANGHAK_CD_1\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"25\" text=\"bind:GYOOE_JIGEUP_AMT_1\" textAlign=\"right\"/><Cell col=\"26\" text=\"bind:GYOOE_JANGHAK_CD_2\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"27\" text=\"bind:GYOOE_JIGEUP_AMT_2\" textAlign=\"right\"/><Cell col=\"28\" text=\"bind:GYOOE_JANGHAK_CD_3\" displaytype=\"combotext\" textAlign=\"left\" combodataset=\"dsJanghak\" combodatacol=\"JANGHAK_NM\" combocodecol=\"JANGHAK_CD\"/><Cell col=\"29\" text=\"bind:GYOOE_JIGEUP_AMT_3\" textAlign=\"right\"/><Cell col=\"30\" text=\"bind:비고\"/></Band></Format></Formats>");
            this.addChild(obj.name, obj);
            // Layout Functions
            //-- Default Layout : this
            obj = new Layout("default","",1640,800,this,function(p){});
            obj.set_description("중복지원자현황");
            obj.set_mobileorientation("landscape");
            this.addLayout(obj.name, obj);
            
            // BindItem Information
            obj = new BindItem("item0","divSearch.form.spnSearchYYYY","value","ds_input","YYYY");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item1","divSearch.form.cboSearchHakgi","value","ds_input","HAKGI");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item2","divSearch.form.cboSearchDaesang","value","ds_input","JANGHAK_DAESANG_GBCD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item5","divSearch.form.cboSearchIpsiHakgwa","value","ds_input","IPSI_HAKGWA_CD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item6","divSearch.form.cboSearchGyeyeol","value","ds_input","GYEYEOL_CD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item7","divSearch.form.cboSearchHakgwa","value","ds_input","HAKGWA_CD");
            this.addChild(obj.name, obj);
            obj.bind();

            obj = new BindItem("item8","divSearch.form.cboSearchJeongong","value","ds_input","JEONGONG_CD");
            this.addChild(obj.name, obj);
            obj.bind();
            
            // TriggerItem Information

        };
        
        this.loadPreloadList = function()
        {
            this._addPreloadList("data","","dsJanghak");
        };
        
        // User Script
        this.registerScript("UE04_2060407_M.xfdl", function() {
        /**********************************************************************
        * FormID(화면   ID명): UE04_2060407_M.xfdl(중복지원자현황)
        * 작 성         일 명: jiback
        * 작 성         일 자: 2022/08/12
        * 변 경         일 자:
        * 변 경         자 명:
        * 변경 및 수정 로그 : 일자별로 변경자 및 변경사항을 간략히 기술
        */
        /**********************************************************************
                01. 전처리 공통 함수 선언
        ***********************************************************************/
        /**********************************************************************
                02. 폼 변수 정의
        ***********************************************************************/
        this.lvchkColidDs   = "";                        // 필수 입력사항 칼럼ID  예)  "commSmcd$commName"
        this.lvchkColNameDs = "";
        /**********************************************************************
                03. 폼 로드 및 닫을때(폼이 포커스 갈때)
        ***********************************************************************/
        /**
         * 기능 : 폼 로드 완료후 초기값 Setting
         */
        this.form_onload = function(obj,e)
        {
            //폼에 공통으로 로드시 사용하는 함수.
            this.gfn_formOnload(obj.e);
            //사용자 화면  초기화 함수
            this.fn_formInit();
        };

        /**********************************************************************
                04. 공통 코드 및 콤보 데이타 조회
        ***********************************************************************/
        this.fn_formInit = function()
        {
            var strDs    = "dsSearchHakgi|dsSearchDaesang|dsHakgi";                    // 데이터를 받을 데이터셋리스트     예) "DS_CODE01|DS_CODE02|DS_CODE03"
            var strLgcd  = "00022|02014|00022|";                           // 공통코드 중분류 코드, 데이터셋 개수와 같아야 한다. 예) "Z01|Z02|Z03"
            var strComb  = "T|X|X";                                   // 콤보옵션 (T:전체, S:선택, N:공백, X:해당사항없음)
            var strOptn  = "";                                      // 조건문 " AND COMM_IT02 = '" + vip + "'|||";
            var svcId    = "Init";

                // gfn_CmmnMultiComboLoad(데이터셋 리스트, 대분류코드 , 콤보 옵션);
                // 서비스 ID : 코드 조회 실행 후 CALLBACK 함수 지정.

            this.gfn_CmmnMultiComboLoad(strDs
                                      , strLgcd
                                      , strComb
                                      , strOptn
                                      , svcId);

        	// 기준연도학기
            strDs    = "dsBaseYyyyHakgi";        // 데이터를 받을 데이터셋리스트     예) "dsBaseYyyyHakgi"
            svcId    = "baseYyyyHakgiInit";
        	var strEopmuGbcd = "US";
        	var strUseYn     = "1";
            // gfn_BaseYyyyHakgiLoad(데이터셋, svcId , 업무구분, 사용구분);
            // 서비스 ID : 코드 조회 실행 후 CALLBACK 함수 지정.
            this.gfn_BaseYyyyHakgiLoad(strDs
                                      , svcId
                                      , strEopmuGbcd
                                      , strUseYn);

        	// gfn_GyeyeolComboLoad(데이터셋, 콤보 옵션)
        	// 계열콤보
        	strDs       = "dsGyeyeol";
        	strComb     = "T";
        	svcId       = "gyeyeolInit";
        	strUseYn    = "1"; // 사용 여부
        	strJojikGbcd = "20";  // 조직구분 10.행정조직   20.학사조직   30.입시조직
        	strDaehakCd = "";  //
        	this.gfn_GyeyeolComboLoad(this.divSearch.form.cboSearchGyeyeol, strComb, svcId, strUseYn, strJojikGbcd, strDaehakCd , objApp.gv_cutPrgId);

        	// gfn_HakgwaComboLoad(데이터셋, 콤보 옵션)
        	// 학과콤보
        	strDs       = "dsSearchHakgwa";
        	strComb     = "N";
        	svcId       = "searchHakgwaInit";
        	strUseYn    = "1"; // 사용 여부
        	strJojikGbcd = "20";  // 조직구분 10.행정조직   20.학사조직   30.입시조직
        	strUpDeptCd = "all";
        	this.gfn_HakgwaComboLoad(this.divSearch.form.cboSearchIpsiHakgwa, strComb, svcId, strUseYn, strJojikGbcd, strUpDeptCd, objApp.gv_cutPrgId);

        	// 장학코드 조회
        	this.fn_GetJanghak();

        	// 대상구분에 따른 검색조건 뷰 변경
        	this.fn_ChangeJanghakDaesangGbcd();
        };

        this.fn_PostformInit = function()
        {
        	this.dsSearchHakgi.filter("REF_1 == '10'");
        	this.dsSearchHakgi.insertRow(0);
        	this.dsSearchHakgi.setColumn(0, "CODE", "");
        	this.dsSearchHakgi.setColumn(0, "ADDR", "전체");
        	this.divSearch.form.cboSearchHakgi.set_index(0);

        	this.dsSearchDaesang.filter("REF_2 == '1'");
        	this.dsSearchDaesang.insertRow(0);
        	this.dsSearchDaesang.setColumn(0, "CODE", "");
        	this.dsSearchDaesang.setColumn(0, "CODE_NM", "선택");
        	this.divSearch.form.cboSearchDaesang.set_index(0);
        };

        this.fn_PostBaseYyyyHakgiInit = function()
        {
        	if (this.dsBaseYyyyHakgi.rowcount > 0)
        	{
        		this.ds_input.setColumn(0, "YYYY",  this.dsBaseYyyyHakgi.getColumn(0, "YYYY"));
        		this.ds_input.setColumn(0, "HAKGI",  this.dsBaseYyyyHakgi.getColumn(0, "HAKGI"));
        	}
        };

        this.fn_PostGyeyeolInit = function()
        {
        	this.divSearch.form.cboSearchGyeyeol.set_index(0);

        	// 계열 onitemchanged 호출
        	let info = new nexacro.ItemChangeEventInfo;
        	this.divSearch_cboSearchGyeyeol_onitemchanged(this.divSearch.form.cboSearchGyeyeol, info);
        };

        this.fn_PostHakgwaInit = function()
        {
        	this.divSearch.form.cboSearchHakgwa.set_index(0);

        	// 학과 onitemchanged 호출
        	let info = new nexacro.ItemChangeEventInfo;
        	this.divSearch_cboSearchHakgwa_onitemchanged(this.divSearch.cboSearchHakgwa, info);
        };

        this.fn_PostJeongongInit = function()
        {
        	this.divSearch.form.cboSearchJeongong.set_index(0);
        };

        this.fn_PostSearchHakgwaInit = function()
        {
        	this.dsGrdHakgwa.copyData(this.dsSearchHakgwa);
        	this.dsSearchHakgwa.deleteRow(0);
        	this.dsSearchHakgwa.insertRow(0);
        	this.dsSearchHakgwa.setColumn(0, "DEPT_CD", "");
        	this.dsSearchHakgwa.setColumn(0, "DEPT_NM", "전체");
        	this.divSearch.form.cboSearchIpsiHakgwa.set_index(0);
        };

        /**
         * 기능 : 콜백함수(후처리)
         */
        this.fn_callBack = function(sSvcId,nErrorCode, sErrorMsg)
        {
            this.gfn_clearSortAll(this.grdMaster);
            if(nErrorCode != 0)
            {
                this.gfn_alert(sErrorMsg,"에러정보","","error");
                return false;
            }else
            {
                /*sSvcId (Transaction Id)*/
                switch(sSvcId)
                {
                    case "Init":
                            this.fn_PostformInit();
                        break;
        			case "baseYyyyHakgiInit":
        					this.fn_PostBaseYyyyHakgiInit();
        			    break;
        			case "gyeyeolInit":
        			        this.fn_PostGyeyeolInit();
        			    break;
        			case "hakgwaInit":
        			        this.fn_PostHakgwaInit();
        			    break;
        			case "jeongongInit":
        			        this.fn_PostJeongongInit();
        			    break;
        			case "searchHakgwaInit":
        			        this.fn_PostSearchHakgwaInit();
        			    break;
                    case "Ret":
                            this.fn_PostRet();
                        break;
                    default:
                        break;
                }
            }
        };

        /************************************************************************************************;
         * 공통 버튼 호출 영역(공통버튼 사용에만사용);
         ************************************************************************************************/;
        /*;
         * _gfn_btnClick여기서 호출시 버튼을 클릭처릭(개인폼에 모든스크립터 복사함);
         */;
        this.fn_cmmBtnClick = function(sBtn)
        {
            switch(sBtn)
            {
                case "ret" :        // 조회
                        this.fn_Ret();
                    break;
                case "tmp1" :        // 팁
                         this.fn_Tip();
                    break;
                default :
                    break;
            };
        };;

        /**********************************************************************
                05. 조회 함수 선언(마스터 함수)
        ***********************************************************************/
        /**
         * 기능 : 조회 전 실행
         */
        this.fn_PreRet = function()
        {
            // 조회조건 셋팅
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "YYYY")))
        	{
        		this.gfn_alert("학년도를 입력해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "HAKGI")))
        	{
        		this.gfn_alert("학기를 입력해주세요.","입력정보","","warning");
        		return false;
        	}
        	if (this.gfn_isNull(this.ds_input.getColumn(0, "JANGHAK_DAESANG_GBCD")))
        	{
        		this.gfn_alert("대상을 선택해주세요.","입력정보","","warning");
        		return false;
        	}
            return true;
        };

        /**
         * 기능 : 마스터 조회 실행
         */
        this.fn_Ret = function()
        {
            if(!this.fn_PreRet())
            {
                return false;
            }
            var strSvc      = "Ret";
            var strUrl      = "/prj/UE/UE04/Retrieve_2060407_M.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "dsMaster=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //생략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        /**
         * 기능 : 조회 후 실행
         */
        this.fn_PostRet = function()
        {
            this.gfn_getRowCount(this.staRowCnt,this.dsMaster);
        };

        /**********************************************************************
                06. 팁
        ***********************************************************************/
        this.fn_Tip = function()
        {
        	this.alert("도움말 준비중입니다.");
        };

        /**********************************************************************
                07. 각종함수
        ***********************************************************************/
        // 장학코드 조회
        this.fn_GetJanghak = function()
        {
        	var strSvc      = "";
            var strUrl      = "/prj/UE/UE01/Retrieve_2060101_M.do";
            var strInDs     = "ds_input=ds_input";
            var strOutDs    = "dsJanghak=dsMaster";
            var strArg      = "";
            var GBV_MENUID    = objApp.gv_cutPrgId;
            if(! this.gfn_isNull(this.gfn_trim(GBV_MENUID)))
            {
            	strArg += "GBV_MENUID=" + GBV_MENUID + " " + strArg;
            }
            var strCallBack = "fn_callBack";    //공백일시 기본 fn_callBack
            var strASync    = true;             //생략이나 공백일시에는 ASync=true,싱크시는 false로
            this.gfn_Transaction(strSvc
                               , strUrl
                               , strInDs
                               , strOutDs
                               , strArg
                               , strCallBack
                               , strASync);
        };

        // 대상구분에 따른 검색조건 뷰 변경
        this.fn_ChangeJanghakDaesangGbcd = function ()
        {
            var janghakDaesangGbcd = this.divSearch.form.cboSearchDaesang.value; // 대상 (01:신입생, 02:편입생, 11:재학생)

        	// 신입생, 9월입학
            if(janghakDaesangGbcd == '01')
        	{
        	    this.divSearch.form.cboSearchGyeyeol.set_enable(false); // 검색조건 계열
        		this.divSearch.form.cboSearchHakgwa.set_enable(false); // 검색조건 학과
        		this.divSearch.form.cboSearchJeongong.set_enable(false); // 검색조건 전공
        	    this.divSearch.form.cboSearchIpsiHakgwa.set_enable(true); // 검색조건 cbo입시학과

        		this.divSearch.form.cboSearchGyeyeol.set_value(''); // 검색조건 계열 초기화
        		this.divSearch.form.cboSearchHakgwa.set_value(''); // 검색조건 학과 초기화
        		this.divSearch.form.cboSearchJeongong.set_value(''); // 검색조건 전공 초기화
        	}
        	// 편입생, 재학생
        	else if (janghakDaesangGbcd == '02' || janghakDaesangGbcd == '11')
        	{
        	    this.divSearch.form.cboSearchGyeyeol.set_enable(true); // 검색조건 cbo계열
        		this.divSearch.form.cboSearchHakgwa.set_enable(true); // 검색조건 cbo학과
        		this.divSearch.form.cboSearchJeongong.set_enable(true); // 검색조건 cbo전공
        		this.divSearch.form.cboSearchIpsiHakgwa.set_enable(false); // 검색조건 cbo입시학과

        		this.divSearch.form.cboSearchIpsiHakgwa.set_value(''); // 검색조건 입시학과 초기화
        	}
        	// 선택
        	else if(this.gfn_isNull(janghakDaesangGbcd))
        	{
        	    this.divSearch.form.cboSearchGyeyeol.set_enable(false); // 검색조건 계열
        		this.divSearch.form.cboSearchHakgwa.set_enable(false); // 검색조건 학과
        		this.divSearch.form.cboSearchJeongong.set_enable(false); // 검색조건 전공
        		this.divSearch.form.cboSearchIpsiHakgwa.set_enable(false); // 검색조건 cbo입시학과

        		this.divSearch.form.cboSearchIpsiHakgwa.set_value(''); // 검색조건 입시학과 초기화
        		this.divSearch.form.cboSearchGyeyeol.set_value(''); // 검색조건 계열 초기화
        		this.divSearch.form.cboSearchHakgwa.set_value(''); // 검색조건 학과 초기화
        		this.divSearch.form.cboSearchJeongong.set_value(''); // 검색조건 전공 초기화
        	}
        };

        /**********************************************************************
                08. 기타 Control Event
        ***********************************************************************/
        /**
         *      그리드멀티 소트정열
         */
        this.grdMaster_onheaddblclick = function(obj,e)
        {
            this.gfn_gridSort(obj,e);
        };

        // 학과 필터 적용
        this.divSearch_cboSearchGyeyeol_onitemchanged = function(obj,e)
        {
        	// gfn_HakgwaComboLoad(데이터셋, 콤보 옵션)
        	// 학과콤보
        	strDs       = "dsHakgwa";
        	strComb     = "T";
        	svcId       = "hakgwaInit";
        	strUseYn    = "1"; // 사용 여부
        	strJojikGbcd = "20";  // 조직구분 10.행정조직   20.학사조직   30.입시조직

        	if(this.gfn_isNull(e.postvalue))
        		strUpDeptCd = "";
        	else
        		strUpDeptCd = e.postvalue;

        	this.gfn_HakgwaComboLoad(this.divSearch.form.cboSearchHakgwa, strComb, svcId, strUseYn, strJojikGbcd, strUpDeptCd, objApp.gv_cutPrgId);
        };

        // 전공 필터 적용
        this.divSearch_cboSearchHakgwa_onitemchanged = function(obj,e)
        {
        	// gfn_JeongongComboLoad(데이터셋, 콤보 옵션)
        	// 전공콤보
        	strDs       = "dsJeongong";
        	strComb     = "T";
        	svcId       = "jeongongInit";
        	strUseYn    = "1"; // 사용 여부
        	strJojikGbcd = "20";  // 조직구분 10.행정조직   20.학사조직   30.입시조직

        	if(this.gfn_isNull(e.postvalue))
        		strUpDeptCd = "";
        	else
        		strUpDeptCd = e.postvalue;

        	this.gfn_JeongongComboLoad(this.divSearch.form.cboSearchJeongong, strComb, svcId, strUseYn, strJojikGbcd, strUpDeptCd, objApp.gv_cutPrgId);
        };

        /**********************************************************************
                09. 검색창 엔터키 조회
        ***********************************************************************/
        this.fn_Enter = function(obj,e)
        {
        	if(e.keycode == '13') {
        	    this.fn_Ret();
        	}
        }
        });
        
        // Regist UI Components Event
        this.on_initEvent = function()
        {
            this.addEventHandler("onload",this.form_onload,this);
            this.stc_09_00.addEventHandler("onclick",this.stc_09_00_onclick,this);
            this.divSearch.form.spnSearchYYYY.addEventHandler("onkeydown",this.fn_Enter,this);
            this.divSearch.form.cboSearchHakgi.addEventHandler("onkeydown",this.fn_Enter,this);
            this.divSearch.form.cboSearchDaesang.addEventHandler("onkeydown",this.fn_Enter,this);
            this.divSearch.form.cboSearchDaesang.addEventHandler("onitemchanged",this.fn_ChangeJanghakDaesangGbcd,this);
            this.divSearch.form.cboSearchIpsiHakgwa.addEventHandler("onkeydown",this.fn_Enter,this);
            this.divSearch.form.cboSearchGyeyeol.addEventHandler("onitemchanged",this.divSearch_cboSearchGyeyeol_onitemchanged,this);
            this.divSearch.form.cboSearchGyeyeol.addEventHandler("onkeydown",this.fn_Enter,this);
            this.divSearch.form.cboSearchHakgwa.addEventHandler("onitemchanged",this.divSearch_cboSearchHakgwa_onitemchanged,this);
            this.divSearch.form.cboSearchHakgwa.addEventHandler("onkeydown",this.fn_Enter,this);
            this.divSearch.form.cboSearchJeongong.addEventHandler("onkeydown",this.fn_Enter,this);
            this.ds_input.addEventHandler("oncolumnchanged",this.ds_input_oncolumnchanged,this);
            this.dsJanghak.addEventHandler("onrowposchanged",this.dsMaster_onrowposchanged,this);
            this.dsJanghak.addEventHandler("oncolumnchanged",this.dsMaster_oncolumnchanged,this);
        };
        this.loadIncludeScript("UE04_2060407_M.xfdl");
        this.loadPreloadList();
        
        // Remove Reference
        obj = null;
    };
}
)();
